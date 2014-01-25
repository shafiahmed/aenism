//= require 'jquery.pjax'

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

    //     $bokeh.animate({
    //       'opacity': 1
    // }, {
    //   duration: randomFade,
    //       queue: false,
    // });
    TweenLite.to($bokeh, randomFade/1000, {
      'opacity': 1,
      delay: randomFade/1000*0.5
    });
    
    //     $bokeh.delay(randomFade + randomStayAlive).animate({
    //       'opacity': 0
    //     }, {
    //   duration: randomFade,
    //       complete: function() {
    //         $(this).remove();
    //   }
    // });
    TweenLite.to($bokeh, randomFade/1000, {
      opacity: 0,
      onComplete: function(){
        $bokeh.remove();
      },
      delay: (randomFade+randomStayAlive)/1000
    });

    //     $bokeh.delay(randomStayAlive).animate({
    //       'left': '+='+randomDist
    // }, {
    //   duration: randomFade * 2,
    //       queue: false,
    // });
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
  
  function loadArticle(url) {
    $.pjax({
      url: url,
      container: '#main',
      fragment: '#main'
    });
  }
  
  if ($.support.pjax) {
    // Clicking
    $d.on('click', '#articles article', function(e) {
      loadArticle($(this).find('a').attr('href'));
    });
    // PJAX
    $d.on('click', '#articles article h2 a', function(e) {
      e.preventDefault();
      loadArticle($(this).attr('href'));
    });
  }

});

