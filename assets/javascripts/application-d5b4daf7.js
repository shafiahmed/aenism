// copyright chris wanstrath
function randFromTo(e,t){return Math.floor(Math.random()*(t-e+1))+e}function isCollide(e,t,n){var n=n?n:0,o=e.offset().top,i=e.offset().left,a=t.offset().top,r=t.offset().left;return!(o+e.height()+n<a||o-n>a+t.height()||i+e.width()+n<r||i-n>r+t.width())}!function(e){function t(t,o,i){var a=this;return this.on("click.pjax",t,function(t){var r=e.extend({},d(o,i));r.container||(r.container=e(this).attr("data-pjax")||a),n(t,r)})}function n(t,n,o){o=d(n,o);var a=t.currentTarget;if("A"!==a.tagName.toUpperCase())throw"$.fn.pjax or $.pjax.click requires an anchor element";if(!(t.which>1||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||location.protocol!==a.protocol||location.hostname!==a.hostname||a.hash&&a.href.replace(a.hash,"")===location.href.replace(location.hash,"")||a.href===location.href+"#")){var r={url:a.href,container:e(a).attr("data-pjax"),target:a},s=e.extend({},r,o),l=e.Event("pjax:click");e(a).trigger(l,[s]),l.isDefaultPrevented()||(i(s),t.preventDefault())}}function o(t,n,o){o=d(n,o);var a=t.currentTarget;if("FORM"!==a.tagName.toUpperCase())throw"$.pjax.submit requires a form element";var r={type:a.method.toUpperCase(),url:a.action,data:e(a).serializeArray(),container:e(a).attr("data-pjax"),target:a};i(e.extend({},r,o)),t.preventDefault()}function i(t){function n(t,n){var i=e.Event(t,{relatedTarget:o});return s.trigger(i,n),!i.isDefaultPrevented()}t=e.extend(!0,{},e.ajaxSettings,i.defaults,t),e.isFunction(t.url)&&(t.url=t.url());var o=t.target,a=u(t.url).hash,s=t.context=f(t.container);t.data||(t.data={}),t.data._pjax=s.selector;var l;t.beforeSend=function(e,o){return"GET"!==o.type&&(o.timeout=0),e.setRequestHeader("X-PJAX","true"),e.setRequestHeader("X-PJAX-Container",s.selector),n("pjax:beforeSend",[e,o])?(o.timeout>0&&(l=setTimeout(function(){n("pjax:timeout",[e,t])&&e.abort("timeout")},o.timeout),o.timeout=0),t.requestUrl=u(o.url).href,void 0):!1},t.complete=function(e,o){l&&clearTimeout(l),n("pjax:complete",[e,o,t]),n("pjax:end",[e,t])},t.error=function(e,o,i){var a=g("",e,t),s=n("pjax:error",[e,o,i,t]);"GET"==t.type&&"abort"!==o&&s&&r(a.url)},t.success=function(o,l,p){var d="function"==typeof e.pjax.defaults.version?e.pjax.defaults.version():e.pjax.defaults.version,f=p.getResponseHeader("X-PJAX-Version"),m=g(o,p,t);if(d&&f&&d!==f)return r(m.url),void 0;if(!m.contents)return r(m.url),void 0;i.state={id:t.id||c(),url:m.url,title:m.title,container:s.selector,fragment:t.fragment,timeout:t.timeout},(t.push||t.replace)&&window.history.replaceState(i.state,m.title,m.url),document.activeElement.blur(),m.title&&(document.title=m.title),s.html(m.contents);var h=s.find("input[autofocus], textarea[autofocus]").last()[0];if(h&&document.activeElement!==h&&h.focus(),v(m.scripts),"number"==typeof t.scrollTo&&e(window).scrollTop(t.scrollTo),""!==a){var w=u(m.url);w.hash=a,i.state.url=w.href,window.history.replaceState(i.state,m.title,w.href);var y=e(w.hash);y.length&&e(window).scrollTop(y.offset().top)}n("pjax:success",[o,l,p,t])},i.state||(i.state={id:c(),url:window.location.href,title:document.title,container:s.selector,fragment:t.fragment,timeout:t.timeout},window.history.replaceState(i.state,document.title));var d=i.xhr;d&&d.readyState<4&&(d.onreadystatechange=e.noop,d.abort()),i.options=t;var d=i.xhr=e.ajax(t);return d.readyState>0&&(t.push&&!t.replace&&(w(i.state.id,s.clone().contents()),window.history.pushState(null,"",p(t.requestUrl))),n("pjax:start",[d,t]),n("pjax:send",[d,t])),i.xhr}function a(t,n){var o={url:window.location.href,push:!1,replace:!0,scrollTo:!1};return i(e.extend(o,d(t,n)))}function r(e){window.history.replaceState(null,"","#"),window.location.replace(e)}function s(t){var n=t.state;if(n&&n.container){if(T&&I==n.url)return;if(i.state.id===n.id)return;var o=e(n.container);if(o.length){var a,s=S[n.id];i.state&&(a=i.state.id<n.id?"forward":"back",y(a,i.state.id,o.clone().contents()));var l=e.Event("pjax:popstate",{state:n,direction:a});o.trigger(l);var c={id:n.id,url:n.url,container:o,push:!1,fragment:n.fragment,timeout:n.timeout,scrollTo:!1};s?(o.trigger("pjax:start",[null,c]),n.title&&(document.title=n.title),o.html(s),i.state=n,o.trigger("pjax:end",[null,c])):i(c),o[0].offsetHeight}else r(location.href)}T=!1}function l(t){var n=e.isFunction(t.url)?t.url():t.url,o=t.type?t.type.toUpperCase():"GET",i=e("<form>",{method:"GET"===o?"GET":"POST",action:n,style:"display:none"});"GET"!==o&&"POST"!==o&&i.append(e("<input>",{type:"hidden",name:"_method",value:o.toLowerCase()}));var a=t.data;if("string"==typeof a)e.each(a.split("&"),function(t,n){var o=n.split("=");i.append(e("<input>",{type:"hidden",name:o[0],value:o[1]}))});else if("object"==typeof a)for(key in a)i.append(e("<input>",{type:"hidden",name:key,value:a[key]}));e(document.body).append(i),i.submit()}function c(){return(new Date).getTime()}function p(e){return e.replace(/\?_pjax=[^&]+&?/,"?").replace(/_pjax=[^&]+&?/,"").replace(/[\?&]$/,"")}function u(e){var t=document.createElement("a");return t.href=e,t}function d(t,n){return t&&n?n.container=t:n=e.isPlainObject(t)?t:{container:t},n.container&&(n.container=f(n.container)),n}function f(t){if(t=e(t),t.length){if(""!==t.selector&&t.context===document)return t;if(t.attr("id"))return e("#"+t.attr("id"));throw"cant get selector for pjax container!"}throw"no pjax container for "+t.selector}function m(e,t){return e.filter(t).add(e.find(t))}function h(t){return e.parseHTML(t,document,!0)}function g(t,n,o){var i={};if(i.url=p(n.getResponseHeader("X-PJAX-URL")||o.requestUrl),/<html/i.test(t))var a=e(h(t.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])),r=e(h(t.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));else var a=r=e(h(t));if(0===r.length)return i;if(i.title=m(a,"title").last().text(),o.fragment){if("body"===o.fragment)var s=r;else var s=m(r,o.fragment).first();s.length&&(i.contents=s.contents(),i.title||(i.title=s.attr("title")||s.data("title")))}else/<html/i.test(t)||(i.contents=r);return i.contents&&(i.contents=i.contents.not(function(){return e(this).is("title")}),i.contents.find("title").remove(),i.scripts=m(i.contents,"script[src]").remove(),i.contents=i.contents.not(i.scripts)),i.title&&(i.title=e.trim(i.title)),i}function v(t){if(t){var n=e("script[src]");t.each(function(){var t=this.src,o=n.filter(function(){return this.src===t});if(!o.length){var i=document.createElement("script");i.type=e(this).attr("type"),i.src=e(this).attr("src"),document.head.appendChild(i)}})}}function w(e,t){for(S[e]=t,P.push(e);E.length;)delete S[E.shift()];for(;P.length>i.defaults.maxCacheLength;)delete S[P.shift()]}function y(e,t,n){var o,i;S[t]=n,"forward"===e?(o=P,i=E):(o=E,i=P),o.push(t),(t=i.pop())&&delete S[t]}function b(){return e("meta").filter(function(){var t=e(this).attr("http-equiv");return t&&"X-PJAX-VERSION"===t.toUpperCase()}).attr("content")}function C(){e.fn.pjax=t,e.pjax=i,e.pjax.enable=e.noop,e.pjax.disable=x,e.pjax.click=n,e.pjax.submit=o,e.pjax.reload=a,e.pjax.defaults={timeout:650,push:!0,replace:!1,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20,version:b},e(window).on("popstate.pjax",s)}function x(){e.fn.pjax=function(){return this},e.pjax=l,e.pjax.enable=C,e.pjax.disable=e.noop,e.pjax.click=e.noop,e.pjax.submit=e.noop,e.pjax.reload=function(){window.location.reload()},e(window).off("popstate.pjax",s)}var T=!0,I=window.location.href,k=window.history.state;k&&k.container&&(i.state=k),"state"in window.history&&(T=!1);var S={},E=[],P=[];e.inArray("state",e.event.props)<0&&e.event.props.push("state"),e.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/),e.support.pjax?C():x()}(jQuery),function(e){var t,n,o,i,a,r,s,l="Close",c="BeforeClose",p="AfterClose",u="BeforeAppend",d="MarkupParse",f="Open",m="Change",h="mfp",g="."+h,v="mfp-ready",w="mfp-removing",y="mfp-prevent-close",b=function(){},C=!!window.jQuery,x=e(window),T=function(e,n){t.ev.on(h+e+g,n)},I=function(t,n,o,i){var a=document.createElement("div");return a.className="mfp-"+t,o&&(a.innerHTML=o),i?n&&n.appendChild(a):(a=e(a),n&&a.appendTo(n)),a},k=function(n,o){t.ev.triggerHandler(h+n,o),t.st.callbacks&&(n=n.charAt(0).toLowerCase()+n.slice(1),t.st.callbacks[n]&&t.st.callbacks[n].apply(t,e.isArray(o)?o:[o]))},S=function(n){return n===s&&t.currTemplate.closeBtn||(t.currTemplate.closeBtn=e(t.st.closeMarkup.replace("%title%",t.st.tClose)),s=n),t.currTemplate.closeBtn},E=function(){e.magnificPopup.instance||(t=new b,t.init(),e.magnificPopup.instance=t)},P=function(){var e=document.createElement("p").style,t=["ms","O","Moz","Webkit"];if(void 0!==e.transition)return!0;for(;t.length;)if(t.pop()+"Transition"in e)return!0;return!1};b.prototype={constructor:b,init:function(){var n=navigator.appVersion;t.isIE7=-1!==n.indexOf("MSIE 7."),t.isIE8=-1!==n.indexOf("MSIE 8."),t.isLowIE=t.isIE7||t.isIE8,t.isAndroid=/android/gi.test(n),t.isIOS=/iphone|ipad|ipod/gi.test(n),t.supportsTransition=P(),t.probablyMobile=t.isAndroid||t.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),i=e(document),t.popupsCache={}},open:function(n){o||(o=e(document.body));var a;if(n.isObj===!1){t.items=n.items.toArray(),t.index=0;var s,l=n.items;for(a=0;a<l.length;a++)if(s=l[a],s.parsed&&(s=s.el[0]),s===n.el[0]){t.index=a;break}}else t.items=e.isArray(n.items)?n.items:[n.items],t.index=n.index||0;if(t.isOpen)return t.updateItemHTML(),void 0;t.types=[],r="",t.ev=n.mainEl&&n.mainEl.length?n.mainEl.eq(0):i,n.key?(t.popupsCache[n.key]||(t.popupsCache[n.key]={}),t.currTemplate=t.popupsCache[n.key]):t.currTemplate={},t.st=e.extend(!0,{},e.magnificPopup.defaults,n),t.fixedContentPos="auto"===t.st.fixedContentPos?!t.probablyMobile:t.st.fixedContentPos,t.st.modal&&(t.st.closeOnContentClick=!1,t.st.closeOnBgClick=!1,t.st.showCloseBtn=!1,t.st.enableEscapeKey=!1),t.bgOverlay||(t.bgOverlay=I("bg").on("click"+g,function(){t.close()}),t.wrap=I("wrap").attr("tabindex",-1).on("click"+g,function(e){t._checkIfClose(e.target)&&t.close()}),t.container=I("container",t.wrap)),t.contentContainer=I("content"),t.st.preloader&&(t.preloader=I("preloader",t.container,t.st.tLoading));var c=e.magnificPopup.modules;for(a=0;a<c.length;a++){var p=c[a];p=p.charAt(0).toUpperCase()+p.slice(1),t["init"+p].call(t)}k("BeforeOpen"),t.st.showCloseBtn&&(t.st.closeBtnInside?(T(d,function(e,t,n,o){n.close_replaceWith=S(o.type)}),r+=" mfp-close-btn-in"):t.wrap.append(S())),t.st.alignTop&&(r+=" mfp-align-top"),t.fixedContentPos?t.wrap.css({overflow:t.st.overflowY,overflowX:"hidden",overflowY:t.st.overflowY}):t.wrap.css({top:x.scrollTop(),position:"absolute"}),(t.st.fixedBgPos===!1||"auto"===t.st.fixedBgPos&&!t.fixedContentPos)&&t.bgOverlay.css({height:i.height(),position:"absolute"}),t.st.enableEscapeKey&&i.on("keyup"+g,function(e){27===e.keyCode&&t.close()}),x.on("resize"+g,function(){t.updateSize()}),t.st.closeOnContentClick||(r+=" mfp-auto-cursor"),r&&t.wrap.addClass(r);var u=t.wH=x.height(),m={};if(t.fixedContentPos&&t._hasScrollBar(u)){var h=t._getScrollbarSize();h&&(m.marginRight=h)}t.fixedContentPos&&(t.isIE7?e("body, html").css("overflow","hidden"):m.overflow="hidden");var w=t.st.mainClass;return t.isIE7&&(w+=" mfp-ie7"),w&&t._addClassToMFP(w),t.updateItemHTML(),k("BuildControls"),e("html").css(m),t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo||o),t._lastFocusedEl=document.activeElement,setTimeout(function(){t.content?(t._addClassToMFP(v),t._setFocus()):t.bgOverlay.addClass(v),i.on("focusin"+g,t._onFocusIn)},16),t.isOpen=!0,t.updateSize(u),k(f),n},close:function(){t.isOpen&&(k(c),t.isOpen=!1,t.st.removalDelay&&!t.isLowIE&&t.supportsTransition?(t._addClassToMFP(w),setTimeout(function(){t._close()},t.st.removalDelay)):t._close())},_close:function(){k(l);var n=w+" "+v+" ";if(t.bgOverlay.detach(),t.wrap.detach(),t.container.empty(),t.st.mainClass&&(n+=t.st.mainClass+" "),t._removeClassFromMFP(n),t.fixedContentPos){var o={marginRight:""};t.isIE7?e("body, html").css("overflow",""):o.overflow="",e("html").css(o)}i.off("keyup"+g+" focusin"+g),t.ev.off(g),t.wrap.attr("class","mfp-wrap").removeAttr("style"),t.bgOverlay.attr("class","mfp-bg"),t.container.attr("class","mfp-container"),!t.st.showCloseBtn||t.st.closeBtnInside&&t.currTemplate[t.currItem.type]!==!0||t.currTemplate.closeBtn&&t.currTemplate.closeBtn.detach(),t._lastFocusedEl&&e(t._lastFocusedEl).focus(),t.currItem=null,t.content=null,t.currTemplate=null,t.prevHeight=0,k(p)},updateSize:function(e){if(t.isIOS){var n=document.documentElement.clientWidth/window.innerWidth,o=window.innerHeight*n;t.wrap.css("height",o),t.wH=o}else t.wH=e||x.height();t.fixedContentPos||t.wrap.css("height",t.wH),k("Resize")},updateItemHTML:function(){var n=t.items[t.index];t.contentContainer.detach(),t.content&&t.content.detach(),n.parsed||(n=t.parseEl(t.index));var o=n.type;if(k("BeforeChange",[t.currItem?t.currItem.type:"",o]),t.currItem=n,!t.currTemplate[o]){var i=t.st[o]?t.st[o].markup:!1;k("FirstMarkupParse",i),t.currTemplate[o]=i?e(i):!0}a&&a!==n.type&&t.container.removeClass("mfp-"+a+"-holder");var r=t["get"+o.charAt(0).toUpperCase()+o.slice(1)](n,t.currTemplate[o]);t.appendContent(r,o),n.preloaded=!0,k(m,n),a=n.type,t.container.prepend(t.contentContainer),k("AfterChange")},appendContent:function(e,n){t.content=e,e?t.st.showCloseBtn&&t.st.closeBtnInside&&t.currTemplate[n]===!0?t.content.find(".mfp-close").length||t.content.append(S()):t.content=e:t.content="",k(u),t.container.addClass("mfp-"+n+"-holder"),t.contentContainer.append(t.content)},parseEl:function(n){var o,i=t.items[n];if(i.tagName?i={el:e(i)}:(o=i.type,i={data:i,src:i.src}),i.el){for(var a=t.types,r=0;r<a.length;r++)if(i.el.hasClass("mfp-"+a[r])){o=a[r];break}i.src=i.el.attr("data-mfp-src"),i.src||(i.src=i.el.attr("href"))}return i.type=o||t.st.type||"inline",i.index=n,i.parsed=!0,t.items[n]=i,k("ElementParse",i),t.items[n]},addGroup:function(e,n){var o=function(o){o.mfpEl=this,t._openClick(o,e,n)};n||(n={});var i="click.magnificPopup";n.mainEl=e,n.items?(n.isObj=!0,e.off(i).on(i,o)):(n.isObj=!1,n.delegate?e.off(i).on(i,n.delegate,o):(n.items=e,e.off(i).on(i,o)))},_openClick:function(n,o,i){var a=void 0!==i.midClick?i.midClick:e.magnificPopup.defaults.midClick;if(a||2!==n.which&&!n.ctrlKey&&!n.metaKey){var r=void 0!==i.disableOn?i.disableOn:e.magnificPopup.defaults.disableOn;if(r)if(e.isFunction(r)){if(!r.call(t))return!0}else if(x.width()<r)return!0;n.type&&(n.preventDefault(),t.isOpen&&n.stopPropagation()),i.el=e(n.mfpEl),i.delegate&&(i.items=o.find(i.delegate)),t.open(i)}},updateStatus:function(e,o){if(t.preloader){n!==e&&t.container.removeClass("mfp-s-"+n),o||"loading"!==e||(o=t.st.tLoading);var i={status:e,text:o};k("UpdateStatus",i),e=i.status,o=i.text,t.preloader.html(o),t.preloader.find("a").on("click",function(e){e.stopImmediatePropagation()}),t.container.addClass("mfp-s-"+e),n=e}},_checkIfClose:function(n){if(!e(n).hasClass(y)){var o=t.st.closeOnContentClick,i=t.st.closeOnBgClick;if(o&&i)return!0;if(!t.content||e(n).hasClass("mfp-close")||t.preloader&&n===t.preloader[0])return!0;if(n===t.content[0]||e.contains(t.content[0],n)){if(o)return!0}else if(i&&e.contains(document,n))return!0;return!1}},_addClassToMFP:function(e){t.bgOverlay.addClass(e),t.wrap.addClass(e)},_removeClassFromMFP:function(e){this.bgOverlay.removeClass(e),t.wrap.removeClass(e)},_hasScrollBar:function(e){return(t.isIE7?i.height():document.body.scrollHeight)>(e||x.height())},_setFocus:function(){(t.st.focus?t.content.find(t.st.focus).eq(0):t.wrap).focus()},_onFocusIn:function(n){return n.target===t.wrap[0]||e.contains(t.wrap[0],n.target)?void 0:(t._setFocus(),!1)},_parseMarkup:function(t,n,o){var i;o.data&&(n=e.extend(o.data,n)),k(d,[t,n,o]),e.each(n,function(e,n){if(void 0===n||n===!1)return!0;if(i=e.split("_"),i.length>1){var o=t.find(g+"-"+i[0]);if(o.length>0){var a=i[1];"replaceWith"===a?o[0]!==n[0]&&o.replaceWith(n):"img"===a?o.is("img")?o.attr("src",n):o.replaceWith('<img src="'+n+'" class="'+o.attr("class")+'" />'):o.attr(i[1],n)}}else t.find(g+"-"+e).html(n)})},_getScrollbarSize:function(){if(void 0===t.scrollbarSize){var e=document.createElement("div");e.id="mfp-sbm",e.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e),t.scrollbarSize=e.offsetWidth-e.clientWidth,document.body.removeChild(e)}return t.scrollbarSize}},e.magnificPopup={instance:null,proto:b.prototype,modules:[],open:function(t,n){return E(),t=t?e.extend(!0,{},t):{},t.isObj=!0,t.index=n||0,this.instance.open(t)},close:function(){return e.magnificPopup.instance&&e.magnificPopup.instance.close()},registerModule:function(t,n){n.options&&(e.magnificPopup.defaults[t]=n.options),e.extend(this.proto,n.proto),this.modules.push(t)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},e.fn.magnificPopup=function(n){E();var o=e(this);if("string"==typeof n)if("open"===n){var i,a=C?o.data("magnificPopup"):o[0].magnificPopup,r=parseInt(arguments[1],10)||0;a.items?i=a.items[r]:(i=o,a.delegate&&(i=i.find(a.delegate)),i=i.eq(r)),t._openClick({mfpEl:i},o,a)}else t.isOpen&&t[n].apply(t,Array.prototype.slice.call(arguments,1));else n=e.extend(!0,{},n),C?o.data("magnificPopup",n):o[0].magnificPopup=n,t.addGroup(o,n);return o};var j,O=function(n){if(n.data&&void 0!==n.data.title)return n.data.title;var o=t.st.image.titleSrc;if(o){if(e.isFunction(o))return o.call(t,n);if(n.el)return n.el.attr(o)||""}return""};e.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var e=t.st.image,n=".image";t.types.push("image"),T(f+n,function(){"image"===t.currItem.type&&e.cursor&&o.addClass(e.cursor)}),T(l+n,function(){e.cursor&&o.removeClass(e.cursor),x.off("resize"+g)}),T("Resize"+n,t.resizeImage),t.isLowIE&&T("AfterChange",t.resizeImage)},resizeImage:function(){var e=t.currItem;if(e&&e.img&&t.st.image.verticalFit){var n=0;t.isLowIE&&(n=parseInt(e.img.css("padding-top"),10)+parseInt(e.img.css("padding-bottom"),10)),e.img.css("max-height",t.wH-n)}},_onImageHasSize:function(e){e.img&&(e.hasSize=!0,j&&clearInterval(j),e.isCheckingImgSize=!1,k("ImageHasSize",e),e.imgHidden&&(t.content&&t.content.removeClass("mfp-loading"),e.imgHidden=!1))},findImageSize:function(e){var n=0,o=e.img[0],i=function(a){j&&clearInterval(j),j=setInterval(function(){return o.naturalWidth>0?(t._onImageHasSize(e),void 0):(n>200&&clearInterval(j),n++,3===n?i(10):40===n?i(50):100===n&&i(500),void 0)},a)};i(1)},getImage:function(n,o){var i=0,a=function(){n&&(n.img[0].complete?(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("ready")),n.hasSize=!0,n.loaded=!0,k("ImageLoadComplete")):(i++,200>i?setTimeout(a,100):r()))},r=function(){n&&(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("error",s.tError.replace("%url%",n.src))),n.hasSize=!0,n.loaded=!0,n.loadError=!0)},s=t.st.image,l=o.find(".mfp-img");if(l.length){var c=document.createElement("img");c.className="mfp-img",n.img=e(c).on("load.mfploader",a).on("error.mfploader",r),c.src=n.src,l.is("img")&&(n.img=n.img.clone()),c=n.img[0],c.naturalWidth>0?n.hasSize=!0:c.width||(n.hasSize=!1)}return t._parseMarkup(o,{title:O(n),img_replaceWith:n.img},n),t.resizeImage(),n.hasSize?(j&&clearInterval(j),n.loadError?(o.addClass("mfp-loading"),t.updateStatus("error",s.tError.replace("%url%",n.src))):(o.removeClass("mfp-loading"),t.updateStatus("ready")),o):(t.updateStatus("loading"),n.loading=!0,n.hasSize||(n.imgHidden=!0,o.addClass("mfp-loading"),t.findImageSize(n)),o)}}});var _,z=function(){return void 0===_&&(_=void 0!==document.createElement("p").style.MozTransform),_};e.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(e){return e.is("img")?e:e.find("img")}},proto:{initZoom:function(){var e,n=t.st.zoom,o=".zoom";if(n.enabled&&t.supportsTransition){var i,a,r=n.duration,s=function(e){var t=e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),o="all "+n.duration/1e3+"s "+n.easing,i={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},a="transition";return i["-webkit-"+a]=i["-moz-"+a]=i["-o-"+a]=i[a]=o,t.css(i),t},p=function(){t.content.css("visibility","visible")};T("BuildControls"+o,function(){if(t._allowZoom()){if(clearTimeout(i),t.content.css("visibility","hidden"),e=t._getItemToZoom(),!e)return p(),void 0;a=s(e),a.css(t._getOffset()),t.wrap.append(a),i=setTimeout(function(){a.css(t._getOffset(!0)),i=setTimeout(function(){p(),setTimeout(function(){a.remove(),e=a=null,k("ZoomAnimationEnded")},16)},r)},16)}}),T(c+o,function(){if(t._allowZoom()){if(clearTimeout(i),t.st.removalDelay=r,!e){if(e=t._getItemToZoom(),!e)return;a=s(e)}a.css(t._getOffset(!0)),t.wrap.append(a),t.content.css("visibility","hidden"),setTimeout(function(){a.css(t._getOffset())},16)}}),T(l+o,function(){t._allowZoom()&&(p(),a&&a.remove(),e=null)})}},_allowZoom:function(){return"image"===t.currItem.type},_getItemToZoom:function(){return t.currItem.hasSize?t.currItem.img:!1},_getOffset:function(n){var o;o=n?t.currItem.img:t.st.zoom.opener(t.currItem.el||t.currItem);var i=o.offset(),a=parseInt(o.css("padding-top"),10),r=parseInt(o.css("padding-bottom"),10);i.top-=e(window).scrollTop()-a;var s={width:o.width(),height:(C?o.innerHeight():o[0].offsetHeight)-r-a};return z()?s["-moz-transform"]=s.transform="translate("+i.left+"px,"+i.top+"px)":(s.left=i.left,s.top=i.top),s}}});var M="retina";e.magnificPopup.registerModule(M,{options:{replaceSrc:function(e){return e.src.replace(/\.\w+$/,function(e){return"@2x"+e})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var e=t.st.retina,n=e.ratio;n=isNaN(n)?n():n,n>1&&(T("ImageHasSize."+M,function(e,t){t.img.css({"max-width":t.img[0].naturalWidth/n,width:"100%"})}),T("ElementParse."+M,function(t,o){o.src=e.replaceSrc(o,n)}))}}}}),E()}(window.jQuery||window.Zepto),function(e){e.fn.randomPositionWithoutCollision=function(t){$bokehs=e("#bokehs");var n=e.extend({startOffsetX:0},t);return this.each(function(){$bokeh=e(this),$bokeh.css({left:randFromTo(0-$bokeh.width()/2,$bokehs.width()-$bokeh.width()/2)-n.startOffsetX,top:randFromTo(0-$bokeh.height()/2,$bokehs.height()-$bokeh.height()/2)}),$bokeh.siblings().not(".bokeh").each(function(){$sibling=e(this),isCollide($bokeh,$sibling,32)&&$bokeh.css("visibility","hidden")}),e(".bokehphobic").each(function(){$bp=e(this),isCollide($bokeh,$bp,32)&&$bokeh.css("visibility","hidden")})})}}(jQuery),$(function(){function e(){var e=randFromTo(r,s),t=randFromTo(i,a),n=randFromTo(l,c),o=$("#bokeh-box > .bokeh").eq(randFromTo(0,$("#bokeh-box > .bokeh").length)).clone();o.appendTo("#bokehs").randomPositionWithoutCollision({startOffsetX:n/2}).css({opacity:0}),TweenLite.to(o,e/1e3,{opacity:1,delay:.5*(e/1e3)}),TweenLite.to(o,e/1e3,{opacity:0,onComplete:function(){o.remove()},delay:(e+t)/1e3}),TweenLite.to(o,2*(e/1e3),{left:"+="+n,delay:t/1e3})}function t(e){$main=$("#main"),$main.after($main.clone().attr("id","clone")),$.pjax({url:e,container:"#main",fragment:"#main"})}$d=$(document);var n=480,o=3200,i=0,a=480,r=1120,s=3200,l=160,c=640;$(window).on("load",function(){!function t(){setTimeout(function(){e(),t()},randFromTo(n,o))}(),function i(){setTimeout(function(){e(),i()},randFromTo(n,o))}()}),$d.on("pjax:start",function(){$("#main").hide()}),$d.on("pjax:end",function(){$("#main").fadeIn(function(){$("#clone").remove()}),$("#cover").hasClass("invert")?$("#brand").addClass("invert"):$("#brand").removeClass("invert")}),$d.on("pjax:popstate",function(){$("#main").hide(),$d.on("pjax:end",function(){$("#bokehs").empty()})}),$.support.pjax&&($d.on("click","#articles article",function(){t($(this).find("a").attr("href"))}),$d.on("click","#articles article h2 a",function(e){e.preventDefault(),t($(this).attr("href"))})),$("#article p > img").addClass("img-responsive").wrap(function(){return'<a class="img-zoom" href="'+$(this).attr("src")+'"></a>'}),$(".img-zoom").magnificPopup({type:"image",mainClass:"mfp-with-zoom",zoom:{enabled:!0,duration:300,easing:"ease-in-out",opener:function(e){return e.is("img")?e:e.find("img")}}})});