//= require 'jquery.pjax'
//= require 'jquery.magnific-popup'

//
// Utilities
// ----------------------------------

function randFromTo(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


//
// Bokeh
// ----------------------------------

// Collision helper
function isCollide(a, b, clear) {
	var clear = clear ? clear : 0
	var at = a.offset().top;
	var al = a.offset().left;
	var bt = b.offset().top;
	var bl = b.offset().left;
  return !(
    ((at + a.height() + clear) < (bt)) ||
    (at - clear > (bt + b.height())) ||
    ((al + a.width() + clear) < bl) ||
    (al - clear > (bl + b.width()))
  );
}

// Plugin
;(function($) {

  $.fn.randomPositionWithoutCollision = function(options) {
		$bokehs = $('#bokehs');
    var settings = $.extend({
      startOffsetX: 0
    }, options);
  	return this.each(function() {
			$bokeh = $(this);
  		$bokeh.css({
				'left': randFromTo(0 - $bokeh.width()/2, $bokehs.width() - $bokeh.width()/2) - settings.startOffsetX,
				'top': randFromTo(0 - $bokeh.height()/2, $bokehs.height() - $bokeh.height()/2)
			});
			$bokeh.siblings().not('.bokeh').each(function() {
				$sibling = $(this);
				if (isCollide($bokeh, $sibling, 32)) {
					$bokeh.css('visibility', 'hidden');
				}
			});
			$('.bokehphobic').each(function() {
				$bp = $(this);
				if (isCollide($bokeh, $bp, 32)) {
					$bokeh.css('visibility', 'hidden');
				}
			});
  	});
  }

}(jQuery));


//
// Application logic
// ----------------------------------

$(function() {
  
  $d = $(document);
  
  //
  // Bokeh
  // ----------------------------------

  var minAppearance = 480;
  var maxAppearance = 3200;

  var minStayAlive = 0; //1600;
  var maxStayAlive = 480; //3200;

  var minFade = 1120;
  var maxFade = 3200;
  
  var minDist = 160;
  var maxDist = 640;

  function randomBokeh() {
    var randomFade = randFromTo(minFade, maxFade);
    var randomStayAlive = randFromTo(minStayAlive, maxStayAlive);
    var randomDist = randFromTo(minDist, maxDist);

  	var $bokeh = $('#bokeh-box > .bokeh').eq(randFromTo(0, $('#bokeh-box > .bokeh').length)).clone();

  	$bokeh.appendTo('#bokehs').randomPositionWithoutCollision({
  	  'startOffsetX': randomDist/2
  	}).css({
      'opacity': 0
  	});

    TweenLite.to($bokeh, randomFade/1000, {
      'opacity': 1,
      delay: randomFade/1000*0.5
    });

    TweenLite.to($bokeh, randomFade/1000, {
      opacity: 0,
      onComplete: function(){
        $bokeh.remove();
      },
      delay: (randomFade+randomStayAlive)/1000
    });

    TweenLite.to($bokeh, (randomFade/1000) * 2, {
      left:   '+='+randomDist,
      delay:  randomStayAlive/1000
    });

  }
  
  $(window).on('load', function() {
    (function bokehs1() {
      setTimeout(function() {
        randomBokeh();
        bokehs1();
      }, randFromTo(minAppearance, maxAppearance));
    }());
    (function bokehs2() {
      setTimeout(function() {
        randomBokeh();
        bokehs2();
      }, randFromTo(minAppearance, maxAppearance));
    }());
  });
  
  
  //
  // Articles
  // ----------------------------------
  
  var $main = $('#main');
  var $body = $('body');
  
  function pjaxLoad(url) {
    $main.after($main.clone().attr('id', 'clone'));
    $.pjax({
      url: url,
      container: '#main',
      fragment: '#main'
    });
  }
  
  // Fadeout
  $d.on('pjax:start', function(e) {
    $main.css('opacity', 0);
    $body.css('overflow', 'hidden');
  });

  // Brand color should match cover
  $d.on('pjax:end', function(e) {
    TweenLite.to($main, 1, {
      opacity: 1,
      onComplete: function() {
        $('#clone').remove();
        $body.css('overflow', 'auto');
      }
    });
    if ($main.find('#bokehs').length < 1 && $('#cover').hasClass('invert')) {
      // Loading inverted article
      $('#brand').addClass('invert');
    } else {
      // Loading home or non-inverted article
      $('#brand').removeClass('invert');
    }
  });

  // Back button event
  $d.on('pjax:popstate', function() {
    $main.after($main.clone().attr('id', 'clone'));
    $main.css('opacity', 0);
    $d.on('pjax:end', function(e) {
      $('#bokehs').empty();
    });
  });
  
  if ($.support.pjax) {
    // Clicking
    $d.on('click', '#articles article', function(e) {
      pjaxLoad($(this).find('a').attr('href'));
    });
    // PJAX
    $d.on('click', '#articles article h2 a', function(e) {
      e.preventDefault();
      pjaxLoad($(this).attr('href'));
    });
    // Home button
    $d.on('click', '#brand', function(e) {
      e.preventDefault();
      pjaxLoad($(this).attr('href'));
    });
  }


  //
  // Image lightbox
  // ----------------------------------
  
  $('#article p > img').addClass('img-responsive').wrap(function() {
    return '<a class="img-zoom" href="' + $(this).attr('src') + '"></a>';
  });
  
  $('.img-zoom').magnificPopup({
    type: 'image',
    mainClass: 'mfp-with-zoom', // this class is for CSS animation below
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it
        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function 
        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
  });

});

