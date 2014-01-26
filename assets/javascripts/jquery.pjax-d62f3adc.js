// copyright chris wanstrath
!function(e){function t(t,o,i){var a=this;return this.on("click.pjax",t,function(t){var r=e.extend({},d(o,i));r.container||(r.container=e(this).attr("data-pjax")||a),n(t,r)})}function n(t,n,o){o=d(n,o);var a=t.currentTarget;if("A"!==a.tagName.toUpperCase())throw"$.fn.pjax or $.pjax.click requires an anchor element";if(!(t.which>1||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||location.protocol!==a.protocol||location.hostname!==a.hostname||a.hash&&a.href.replace(a.hash,"")===location.href.replace(location.hash,"")||a.href===location.href+"#")){var r={url:a.href,container:e(a).attr("data-pjax"),target:a},s=e.extend({},r,o),l=e.Event("pjax:click");e(a).trigger(l,[s]),l.isDefaultPrevented()||(i(s),t.preventDefault())}}function o(t,n,o){o=d(n,o);var a=t.currentTarget;if("FORM"!==a.tagName.toUpperCase())throw"$.pjax.submit requires a form element";var r={type:a.method.toUpperCase(),url:a.action,data:e(a).serializeArray(),container:e(a).attr("data-pjax"),target:a};i(e.extend({},r,o)),t.preventDefault()}function i(t){function n(t,n){var i=e.Event(t,{relatedTarget:o});return s.trigger(i,n),!i.isDefaultPrevented()}t=e.extend(!0,{},e.ajaxSettings,i.defaults,t),e.isFunction(t.url)&&(t.url=t.url());var o=t.target,a=u(t.url).hash,s=t.context=f(t.container);t.data||(t.data={}),t.data._pjax=s.selector;var l;t.beforeSend=function(e,o){return"GET"!==o.type&&(o.timeout=0),e.setRequestHeader("X-PJAX","true"),e.setRequestHeader("X-PJAX-Container",s.selector),n("pjax:beforeSend",[e,o])?(o.timeout>0&&(l=setTimeout(function(){n("pjax:timeout",[e,t])&&e.abort("timeout")},o.timeout),o.timeout=0),t.requestUrl=u(o.url).href,void 0):!1},t.complete=function(e,o){l&&clearTimeout(l),n("pjax:complete",[e,o,t]),n("pjax:end",[e,t])},t.error=function(e,o,i){var a=g("",e,t),s=n("pjax:error",[e,o,i,t]);"GET"==t.type&&"abort"!==o&&s&&r(a.url)},t.success=function(o,l,p){var d="function"==typeof e.pjax.defaults.version?e.pjax.defaults.version():e.pjax.defaults.version,f=p.getResponseHeader("X-PJAX-Version"),m=g(o,p,t);if(d&&f&&d!==f)return r(m.url),void 0;if(!m.contents)return r(m.url),void 0;i.state={id:t.id||c(),url:m.url,title:m.title,container:s.selector,fragment:t.fragment,timeout:t.timeout},(t.push||t.replace)&&window.history.replaceState(i.state,m.title,m.url),document.activeElement.blur(),m.title&&(document.title=m.title),s.html(m.contents);var h=s.find("input[autofocus], textarea[autofocus]").last()[0];if(h&&document.activeElement!==h&&h.focus(),v(m.scripts),"number"==typeof t.scrollTo&&e(window).scrollTop(t.scrollTo),""!==a){var w=u(m.url);w.hash=a,i.state.url=w.href,window.history.replaceState(i.state,m.title,w.href);var y=e(w.hash);y.length&&e(window).scrollTop(y.offset().top)}n("pjax:success",[o,l,p,t])},i.state||(i.state={id:c(),url:window.location.href,title:document.title,container:s.selector,fragment:t.fragment,timeout:t.timeout},window.history.replaceState(i.state,document.title));var d=i.xhr;d&&d.readyState<4&&(d.onreadystatechange=e.noop,d.abort()),i.options=t;var d=i.xhr=e.ajax(t);return d.readyState>0&&(t.push&&!t.replace&&(w(i.state.id,s.clone().contents()),window.history.pushState(null,"",p(t.requestUrl))),n("pjax:start",[d,t]),n("pjax:send",[d,t])),i.xhr}function a(t,n){var o={url:window.location.href,push:!1,replace:!0,scrollTo:!1};return i(e.extend(o,d(t,n)))}function r(e){window.history.replaceState(null,"","#"),window.location.replace(e)}function s(t){var n=t.state;if(n&&n.container){if(T&&I==n.url)return;if(i.state.id===n.id)return;var o=e(n.container);if(o.length){var a,s=S[n.id];i.state&&(a=i.state.id<n.id?"forward":"back",y(a,i.state.id,o.clone().contents()));var l=e.Event("pjax:popstate",{state:n,direction:a});o.trigger(l);var c={id:n.id,url:n.url,container:o,push:!1,fragment:n.fragment,timeout:n.timeout,scrollTo:!1};s?(o.trigger("pjax:start",[null,c]),n.title&&(document.title=n.title),o.html(s),i.state=n,o.trigger("pjax:end",[null,c])):i(c),o[0].offsetHeight}else r(location.href)}T=!1}function l(t){var n=e.isFunction(t.url)?t.url():t.url,o=t.type?t.type.toUpperCase():"GET",i=e("<form>",{method:"GET"===o?"GET":"POST",action:n,style:"display:none"});"GET"!==o&&"POST"!==o&&i.append(e("<input>",{type:"hidden",name:"_method",value:o.toLowerCase()}));var a=t.data;if("string"==typeof a)e.each(a.split("&"),function(t,n){var o=n.split("=");i.append(e("<input>",{type:"hidden",name:o[0],value:o[1]}))});else if("object"==typeof a)for(key in a)i.append(e("<input>",{type:"hidden",name:key,value:a[key]}));e(document.body).append(i),i.submit()}function c(){return(new Date).getTime()}function p(e){return e.replace(/\?_pjax=[^&]+&?/,"?").replace(/_pjax=[^&]+&?/,"").replace(/[\?&]$/,"")}function u(e){var t=document.createElement("a");return t.href=e,t}function d(t,n){return t&&n?n.container=t:n=e.isPlainObject(t)?t:{container:t},n.container&&(n.container=f(n.container)),n}function f(t){if(t=e(t),t.length){if(""!==t.selector&&t.context===document)return t;if(t.attr("id"))return e("#"+t.attr("id"));throw"cant get selector for pjax container!"}throw"no pjax container for "+t.selector}function m(e,t){return e.filter(t).add(e.find(t))}function h(t){return e.parseHTML(t,document,!0)}function g(t,n,o){var i={};if(i.url=p(n.getResponseHeader("X-PJAX-URL")||o.requestUrl),/<html/i.test(t))var a=e(h(t.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])),r=e(h(t.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));else var a=r=e(h(t));if(0===r.length)return i;if(i.title=m(a,"title").last().text(),o.fragment){if("body"===o.fragment)var s=r;else var s=m(r,o.fragment).first();s.length&&(i.contents=s.contents(),i.title||(i.title=s.attr("title")||s.data("title")))}else/<html/i.test(t)||(i.contents=r);return i.contents&&(i.contents=i.contents.not(function(){return e(this).is("title")}),i.contents.find("title").remove(),i.scripts=m(i.contents,"script[src]").remove(),i.contents=i.contents.not(i.scripts)),i.title&&(i.title=e.trim(i.title)),i}function v(t){if(t){var n=e("script[src]");t.each(function(){var t=this.src,o=n.filter(function(){return this.src===t});if(!o.length){var i=document.createElement("script");i.type=e(this).attr("type"),i.src=e(this).attr("src"),document.head.appendChild(i)}})}}function w(e,t){for(S[e]=t,P.push(e);E.length;)delete S[E.shift()];for(;P.length>i.defaults.maxCacheLength;)delete S[P.shift()]}function y(e,t,n){var o,i;S[t]=n,"forward"===e?(o=P,i=E):(o=E,i=P),o.push(t),(t=i.pop())&&delete S[t]}function C(){return e("meta").filter(function(){var t=e(this).attr("http-equiv");return t&&"X-PJAX-VERSION"===t.toUpperCase()}).attr("content")}function b(){e.fn.pjax=t,e.pjax=i,e.pjax.enable=e.noop,e.pjax.disable=x,e.pjax.click=n,e.pjax.submit=o,e.pjax.reload=a,e.pjax.defaults={timeout:650,push:!0,replace:!1,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20,version:C},e(window).on("popstate.pjax",s)}function x(){e.fn.pjax=function(){return this},e.pjax=l,e.pjax.enable=b,e.pjax.disable=e.noop,e.pjax.click=e.noop,e.pjax.submit=e.noop,e.pjax.reload=function(){window.location.reload()},e(window).off("popstate.pjax",s)}var T=!0,I=window.location.href,k=window.history.state;k&&k.container&&(i.state=k),"state"in window.history&&(T=!1);var S={},E=[],P=[];e.inArray("state",e.event.props)<0&&e.event.props.push("state"),e.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/),e.support.pjax?b():x()}(jQuery);