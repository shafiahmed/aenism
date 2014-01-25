// copyright chris wanstrath
!function(t){function e(e,r,a){var o=this;return this.on("click.pjax",e,function(e){var i=t.extend({},f(r,a));i.container||(i.container=t(this).attr("data-pjax")||o),n(e,i)})}function n(e,n,r){r=f(n,r);var o=e.currentTarget;if("A"!==o.tagName.toUpperCase())throw"$.fn.pjax or $.pjax.click requires an anchor element";if(!(e.which>1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||location.protocol!==o.protocol||location.hostname!==o.hostname||o.hash&&o.href.replace(o.hash,"")===location.href.replace(location.hash,"")||o.href===location.href+"#")){var i={url:o.href,container:t(o).attr("data-pjax"),target:o},s=t.extend({},i,r),c=t.Event("pjax:click");t(o).trigger(c,[s]),c.isDefaultPrevented()||(a(s),e.preventDefault())}}function r(e,n,r){r=f(n,r);var o=e.currentTarget;if("FORM"!==o.tagName.toUpperCase())throw"$.pjax.submit requires a form element";var i={type:o.method.toUpperCase(),url:o.action,data:t(o).serializeArray(),container:t(o).attr("data-pjax"),target:o};a(t.extend({},i,r)),e.preventDefault()}function a(e){function n(e,n){var a=t.Event(e,{relatedTarget:r});return s.trigger(a,n),!a.isDefaultPrevented()}e=t.extend(!0,{},t.ajaxSettings,a.defaults,e),t.isFunction(e.url)&&(e.url=e.url());var r=e.target,o=p(e.url).hash,s=e.context=d(e.container);e.data||(e.data={}),e.data._pjax=s.selector;var c;e.beforeSend=function(t,r){return"GET"!==r.type&&(r.timeout=0),t.setRequestHeader("X-PJAX","true"),t.setRequestHeader("X-PJAX-Container",s.selector),n("pjax:beforeSend",[t,r])?(r.timeout>0&&(c=setTimeout(function(){n("pjax:timeout",[t,e])&&t.abort("timeout")},r.timeout),r.timeout=0),e.requestUrl=p(r.url).href,void 0):!1},e.complete=function(t,r){c&&clearTimeout(c),n("pjax:complete",[t,r,e]),n("pjax:end",[t,e])},e.error=function(t,r,a){var o=v("",t,e),s=n("pjax:error",[t,r,a,e]);"GET"==e.type&&"abort"!==r&&s&&i(o.url)},e.success=function(r,c,u){var f="function"==typeof t.pjax.defaults.version?t.pjax.defaults.version():t.pjax.defaults.version,d=u.getResponseHeader("X-PJAX-Version"),h=v(r,u,e);if(f&&d&&f!==d)return i(h.url),void 0;if(!h.contents)return i(h.url),void 0;a.state={id:e.id||l(),url:h.url,title:h.title,container:s.selector,fragment:e.fragment,timeout:e.timeout},(e.push||e.replace)&&window.history.replaceState(a.state,h.title,h.url),document.activeElement.blur(),h.title&&(document.title=h.title),s.html(h.contents);var m=s.find("input[autofocus], textarea[autofocus]").last()[0];if(m&&document.activeElement!==m&&m.focus(),x(h.scripts),"number"==typeof e.scrollTo&&t(window).scrollTop(e.scrollTo),""!==o){var j=p(h.url);j.hash=o,a.state.url=j.href,window.history.replaceState(a.state,h.title,j.href);var w=t(j.hash);w.length&&t(window).scrollTop(w.offset().top)}n("pjax:success",[r,c,u,e])},a.state||(a.state={id:l(),url:window.location.href,title:document.title,container:s.selector,fragment:e.fragment,timeout:e.timeout},window.history.replaceState(a.state,document.title));var f=a.xhr;f&&f.readyState<4&&(f.onreadystatechange=t.noop,f.abort()),a.options=e;var f=a.xhr=t.ajax(e);return f.readyState>0&&(e.push&&!e.replace&&(j(a.state.id,s.clone().contents()),window.history.pushState(null,"",u(e.requestUrl))),n("pjax:start",[f,e]),n("pjax:send",[f,e])),a.xhr}function o(e,n){var r={url:window.location.href,push:!1,replace:!0,scrollTo:!1};return a(t.extend(r,f(e,n)))}function i(t){window.history.replaceState(null,"","#"),window.location.replace(t)}function s(e){var n=e.state;if(n&&n.container){if(T&&$==n.url)return;if(a.state.id===n.id)return;var r=t(n.container);if(r.length){var o,s=S[n.id];a.state&&(o=a.state.id<n.id?"forward":"back",w(o,a.state.id,r.clone().contents()));var c=t.Event("pjax:popstate",{state:n,direction:o});r.trigger(c);var l={id:n.id,url:n.url,container:r,push:!1,fragment:n.fragment,timeout:n.timeout,scrollTo:!1};s?(r.trigger("pjax:start",[null,l]),n.title&&(document.title=n.title),r.html(s),a.state=n,r.trigger("pjax:end",[null,l])):a(l),r[0].offsetHeight}else i(location.href)}T=!1}function c(e){var n=t.isFunction(e.url)?e.url():e.url,r=e.type?e.type.toUpperCase():"GET",a=t("<form>",{method:"GET"===r?"GET":"POST",action:n,style:"display:none"});"GET"!==r&&"POST"!==r&&a.append(t("<input>",{type:"hidden",name:"_method",value:r.toLowerCase()}));var o=e.data;if("string"==typeof o)t.each(o.split("&"),function(e,n){var r=n.split("=");a.append(t("<input>",{type:"hidden",name:r[0],value:r[1]}))});else if("object"==typeof o)for(key in o)a.append(t("<input>",{type:"hidden",name:key,value:o[key]}));t(document.body).append(a),a.submit()}function l(){return(new Date).getTime()}function u(t){return t.replace(/\?_pjax=[^&]+&?/,"?").replace(/_pjax=[^&]+&?/,"").replace(/[\?&]$/,"")}function p(t){var e=document.createElement("a");return e.href=t,e}function f(e,n){return e&&n?n.container=e:n=t.isPlainObject(e)?e:{container:e},n.container&&(n.container=d(n.container)),n}function d(e){if(e=t(e),e.length){if(""!==e.selector&&e.context===document)return e;if(e.attr("id"))return t("#"+e.attr("id"));throw"cant get selector for pjax container!"}throw"no pjax container for "+e.selector}function h(t,e){return t.filter(e).add(t.find(e))}function m(e){return t.parseHTML(e,document,!0)}function v(e,n,r){var a={};if(a.url=u(n.getResponseHeader("X-PJAX-URL")||r.requestUrl),/<html/i.test(e))var o=t(m(e.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])),i=t(m(e.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));else var o=i=t(m(e));if(0===i.length)return a;if(a.title=h(o,"title").last().text(),r.fragment){if("body"===r.fragment)var s=i;else var s=h(i,r.fragment).first();s.length&&(a.contents=s.contents(),a.title||(a.title=s.attr("title")||s.data("title")))}else/<html/i.test(e)||(a.contents=i);return a.contents&&(a.contents=a.contents.not(function(){return t(this).is("title")}),a.contents.find("title").remove(),a.scripts=h(a.contents,"script[src]").remove(),a.contents=a.contents.not(a.scripts)),a.title&&(a.title=t.trim(a.title)),a}function x(e){if(e){var n=t("script[src]");e.each(function(){var e=this.src,r=n.filter(function(){return this.src===e});if(!r.length){var a=document.createElement("script");a.type=t(this).attr("type"),a.src=t(this).attr("src"),document.head.appendChild(a)}})}}function j(t,e){for(S[t]=e,C.push(t);E.length;)delete S[E.shift()];for(;C.length>a.defaults.maxCacheLength;)delete S[C.shift()]}function w(t,e,n){var r,a;S[e]=n,"forward"===t?(r=C,a=E):(r=E,a=C),r.push(e),(e=a.pop())&&delete S[e]}function g(){return t("meta").filter(function(){var e=t(this).attr("http-equiv");return e&&"X-PJAX-VERSION"===e.toUpperCase()}).attr("content")}function y(){t.fn.pjax=e,t.pjax=a,t.pjax.enable=t.noop,t.pjax.disable=b,t.pjax.click=n,t.pjax.submit=r,t.pjax.reload=o,t.pjax.defaults={timeout:650,push:!0,replace:!1,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20,version:g},t(window).on("popstate.pjax",s)}function b(){t.fn.pjax=function(){return this},t.pjax=c,t.pjax.enable=y,t.pjax.disable=t.noop,t.pjax.click=t.noop,t.pjax.submit=t.noop,t.pjax.reload=function(){window.location.reload()},t(window).off("popstate.pjax",s)}var T=!0,$=window.location.href,k=window.history.state;k&&k.container&&(a.state=k),"state"in window.history&&(T=!1);var S={},E=[],C=[];t.inArray("state",t.event.props)<0&&t.event.props.push("state"),t.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/),t.support.pjax?y():b()}(jQuery);