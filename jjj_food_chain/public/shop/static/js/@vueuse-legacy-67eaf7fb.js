!function(){function n(n){return function(n){if(Array.isArray(n))return o(n)}(n)||function(n){if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||r(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,o,i,u,a=[],l=!0,c=!1;try{if(i=(t=t.call(n)).next,0===e){if(Object(t)!==t)return;l=!1}else for(;!(l=(r=i.call(t)).done)&&(a.push(r.value),a.length!==e);l=!0);}catch(f){c=!0,o=f}finally{try{if(!l&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(c)throw o}}return a}}(n,e)||r(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(n,e){var t="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(!t){if(Array.isArray(n)||(t=r(n))||e&&n&&"number"==typeof n.length){t&&(n=t);var o=0,i=function(){};return{s:i,n:function(){return o>=n.length?{done:!0}:{done:!1,value:n[o++]}},e:function(n){throw n},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u,a=!0,l=!1;return{s:function(){t=t.call(n)},n:function(){var n=t.next();return a=n.done,n},e:function(n){l=!0,u=n},f:function(){try{a||null==t.return||t.return()}finally{if(l)throw u}}}}function r(n,e){if(n){if("string"==typeof n)return o(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?o(n,e):void 0}}function o(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}System.register(["./@vue-legacy-517223d5.js"],(function(r,o){"use strict";var i,u,a,l,c,f,v,d,s,y,p,m;return{setters:[function(n){i=n.r,u=n.w,a=n.s,l=n.d,c=n.e,f=n.u,v=n.g,d=n.f,s=n.h,y=n.i,p=n.n,m=n.j}],execute:function(){r({c:R,d:_,e:function(n,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=r.window,a=void 0===o?B:o,l=r.initialValue,c=void 0===l?"":l,f=i(c),v=m((function(){var n;return _(t)||(null==(n=null==a?void 0:a.document)?void 0:n.documentElement)}));return u([v,function(){return Q(n)}],(function(n){var t,r=e(n,2),o=r[0],i=r[1];if(o&&a){var u=null==(t=a.getComputedStyle(o).getPropertyValue(i))?void 0:t.trim();f.value=u||c}}),{immediate:!0}),u(f,(function(e){var t;(null==(t=v.value)?void 0:t.style)&&v.value.style.setProperty(Q(n),e)})),f},f:function(n,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=t.immediate,o=void 0===r||r,u=i(!1),a=null;function l(){a&&(clearTimeout(a),a=null)}function f(){u.value=!1,l()}function v(){for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];l(),u.value=!0,a=setTimeout((function(){u.value=!1,a=null,n.apply(void 0,r)}),Q(e))}o&&(u.value=!0,P&&v());return k(f),{isPending:c(u),start:v,stop:f}},h:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=n.document,t=void 0===e?L:e;if(!t)return i("visible");var r=i(t.visibilityState);return R(t,"visibilitychange",(function(){r.value=t.visibilityState})),r},j:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=n.window,t=void 0===e?B:e;if(!t)return i(!1);var r=i(t.document.hasFocus());return R(t,"blur",(function(){r.value=!1})),R(t,"focus",(function(){r.value=!0})),r},k:function(n,e){var t,r=a();return l((function(){r.value=n()}),j(S({},e),{flush:null!=(t=null==e?void 0:e.flush)?t:"sync"})),c(r)},l:function(n,e,t){var r,o,a,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},c=l.clone,f=void 0!==c&&c,v=l.passive,d=void 0!==v&&v,y=l.eventName,p=l.deep,b=void 0!==p&&p,h=l.defaultValue,g=s(),w=t||(null==g?void 0:g.emit)||(null==(r=null==g?void 0:g.$emit)?void 0:r.bind(g))||(null==(a=null==(o=null==g?void 0:g.proxy)?void 0:o.$emit)?void 0:a.bind(null==g?void 0:g.proxy)),O=y;e||(e="modelValue");O=y||O||"update:".concat(e.toString());var I=function(n){return f?T(f)?f(n):(e=n,JSON.parse(JSON.stringify(e))):n;var e},A=function(){return E(n[e])?I(n[e]):h};if(d){var S=A(),j=i(S);return u((function(){return n[e]}),(function(n){return j.value=I(n)})),u(j,(function(t){(t!==n[e]||b)&&w(O,t)}),{deep:b}),j}return m({get:function(){return A()},set:function(n){w(O,n)}})},o:function(n,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=t.window,o=void 0===r?B:r,i=t.ignore,u=void 0===i?[]:i,a=t.capture,l=void 0===a||a,c=t.detectIframe,f=void 0!==c&&c;if(!o)return;C&&!F&&(F=!0,Array.from(o.document.body.children).forEach((function(n){return n.addEventListener("click",N)})));var v=!0,d=function(n){return u.some((function(e){if("string"==typeof e)return Array.from(o.document.querySelectorAll(e)).some((function(e){return e===n.target||n.composedPath().includes(e)}));var t=_(e);return t&&(n.target===t||n.composedPath().includes(t))}))},s=[R(o,"click",(function(t){var r=_(n);r&&r!==t.target&&!t.composedPath().includes(r)&&(0===t.detail&&(v=!d(t)),v?e(t):v=!0)}),{passive:!0,capture:l}),R(o,"pointerdown",(function(e){var t=_(n);t&&(v=!e.composedPath().includes(t)&&!d(e))}),{passive:!0}),f&&R(o,"blur",(function(t){var r,i=_(n);"IFRAME"!==(null==(r=o.document.activeElement)?void 0:r.tagName)||(null==i?void 0:i.contains(o.document.activeElement))||e(t)}))].filter(Boolean);return function(){return s.forEach((function(n){return n()}))}},r:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=i(n.value),o=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return function(n,e){function t(){for(var t=this,r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return new Promise((function(r,i){Promise.resolve(n((function(){return e.apply(t,o)}),{fn:e,thisArg:t,args:o})).then(r).catch(i)}))}return t}(function(n){var e,t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=N,i=function(n){clearTimeout(n),o(),o=N},u=function(u){var a=Q(n),l=Q(r.maxWait);return e&&i(e),a<=0||void 0!==l&&l<=0?(t&&(i(t),t=null),Promise.resolve(u())):new Promise((function(n,c){o=r.rejectOnCancel?c:n,l&&!t&&(t=setTimeout((function(){e&&i(e),t=null,n(u())}),l)),e=setTimeout((function(){t&&i(t),t=null,n(u())}),a)}))};return u}(e,t),n)}((function(){r.value=n.value}),e,t);return u(n,(function(){return o()})),r},t:k,u:function(n,e){var t,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=r,a=o.window,l=void 0===a?B:a,c=G(o,["window"]),f=function(n){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=i(),r=function(){return t.value=Boolean(n())};return r(),function(n){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];s()?y(n):e?n():p(n)}(r,e),t}((function(){return l&&"ResizeObserver"in l})),v=function(){t&&(t.disconnect(),t=void 0)},d=u((function(){return _(n)}),(function(n){v(),f.value&&l&&n&&(t=new ResizeObserver(e)).observe(n,c)}),{immediate:!0,flush:"post"}),m=function(){v(),d()};return k(m),{isSupported:f,stop:m}}});var o,b=Object.defineProperty,h=Object.defineProperties,g=Object.getOwnPropertyDescriptors,w=Object.getOwnPropertySymbols,O=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable,A=function(n,e,t){return e in n?b(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t},S=function(n,e){for(var r in e||(e={}))O.call(e,r)&&A(n,r,e[r]);if(w){var o,i=t(w(e));try{for(i.s();!(o=i.n()).done;){r=o.value;I.call(e,r)&&A(n,r,e[r])}}catch(u){i.e(u)}finally{i.f()}}return n},j=function(n,e){return h(n,g(e))};var P=r("i","undefined"!=typeof window),E=function(n){return void 0!==n},T=(r("b",(function(n){return"boolean"==typeof n})),function(n){return"function"==typeof n}),x=(r("a",(function(n){return"number"==typeof n})),function(n){return"string"==typeof n}),N=function(){},C=r("g",P&&(null==(o=null==window?void 0:window.navigator)?void 0:o.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent));function Q(n){return"function"==typeof n?n():f(n)}function k(n){return!!v()&&(d(n),!0)}function _(n){var e,t=Q(n);return null!=(e=null==t?void 0:t.$el)?e:t}var B=P?window:void 0,L=P?window.document:void 0;function R(){for(var t,r,o,i,a=arguments.length,l=new Array(a),c=0;c<a;c++)l[c]=arguments[c];if(x(l[0])||Array.isArray(l[0])?(r=l[0],o=l[1],i=l[2],t=B):(t=l[0],r=l[1],o=l[2],i=l[3]),!t)return N;Array.isArray(r)||(r=[r]),Array.isArray(o)||(o=[o]);var f=[],v=function(){f.forEach((function(n){return n()})),f.length=0},d=u((function(){return[_(t),Q(i)]}),(function(t){var i=e(t,2),u=i[0],a=i[1];v(),u&&f.push.apply(f,n(r.flatMap((function(n){return o.map((function(e){return function(n,e,t,r){return n.addEventListener(e,t,r),function(){return n.removeEventListener(e,t,r)}}(u,n,e,a)}))}))))}),{immediate:!0,flush:"post"}),s=function(){d(),v()};return k(s),s}var F=!1;var V="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},$="__vueuse_ssr_handlers__";V[$]=V[$]||{};var D,M,U=Object.getOwnPropertySymbols,W=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable,G=function(n,e){var r={};for(var o in n)W.call(n,o)&&e.indexOf(o)<0&&(r[o]=n[o]);if(null!=n&&U){var i,u=t(U(n));try{for(u.s();!(i=u.n()).done;){o=i.value;e.indexOf(o)<0&&z.call(n,o)&&(r[o]=n[o])}}catch(a){u.e(a)}finally{u.f()}}return r};(M=D||(D={})).UP="UP",M.RIGHT="RIGHT",M.DOWN="DOWN",M.LEFT="LEFT",M.NONE="NONE";var H=Object.defineProperty,J=Object.getOwnPropertySymbols,q=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable,X=function(n,e,t){return e in n?H(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t};!function(n,e){for(var r in e||(e={}))q.call(e,r)&&X(n,r,e[r]);if(J){var o,i=t(J(e));try{for(i.s();!(o=i.n()).done;){r=o.value;K.call(e,r)&&X(n,r,e[r])}}catch(u){i.e(u)}finally{i.f()}}}({linear:function(n){return n}},{easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]})}}}))}();
