!function(){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */t=function(){return n};var n={},r=Object.prototype,a=r.hasOwnProperty,o=Object.defineProperty||function(e,t,n){e[t]=n.value},l="function"==typeof Symbol?Symbol:{},i=l.iterator||"@@iterator",u=l.asyncIterator||"@@asyncIterator",c=l.toStringTag||"@@toStringTag";function s(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(w){s=function(e,t,n){return e[t]=n}}function f(e,t,n,r){var a=t&&t.prototype instanceof _?t:_,l=Object.create(a.prototype),i=new N(r||[]);return o(l,"_invoke",{value:I(e,n,i)}),l}function v(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(w){return{type:"throw",arg:w}}}n.wrap=f;var m={};function _(){}function p(){}function g(){}var d={};s(d,i,(function(){return this}));var h=Object.getPrototypeOf,b=h&&h(h(F([])));b&&b!==r&&a.call(b,i)&&(d=b);var y=g.prototype=_.prototype=Object.create(d);function L(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function E(t,n){function r(o,l,i,u){var c=v(t[o],t,l);if("throw"!==c.type){var s=c.arg,f=s.value;return f&&"object"==e(f)&&a.call(f,"__await")?n.resolve(f.__await).then((function(e){r("next",e,i,u)}),(function(e){r("throw",e,i,u)})):n.resolve(f).then((function(e){s.value=e,i(s)}),(function(e){return r("throw",e,i,u)}))}u(c.arg)}var l;o(this,"_invoke",{value:function(e,t){function a(){return new n((function(n,a){r(e,t,n,a)}))}return l=l?l.then(a,a):a()}})}function I(e,t,n){var r="suspendedStart";return function(a,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw o;return{value:void 0,done:!0}}for(n.method=a,n.arg=o;;){var l=n.delegate;if(l){var i=T(l,n);if(i){if(i===m)continue;return i}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=v(e,t,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===m)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}function T(e,t){var n=t.method,r=e.iterator[n];if(void 0===r)return t.delegate=null,"throw"===n&&e.iterator.return&&(t.method="return",t.arg=void 0,T(e,t),"throw"===t.method)||"return"!==n&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var a=v(r,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,m;var o=a.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,m):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,m)}function k(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function O(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function N(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(k,this),this.reset(!0)}function F(t){if(t||""===t){var n=t[i];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(a.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}throw new TypeError(e(t)+" is not iterable")}return p.prototype=g,o(y,"constructor",{value:g,configurable:!0}),o(g,"constructor",{value:p,configurable:!0}),p.displayName=s(g,c,"GeneratorFunction"),n.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===p||"GeneratorFunction"===(t.displayName||t.name))},n.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,g):(e.__proto__=g,s(e,c,"GeneratorFunction")),e.prototype=Object.create(y),e},n.awrap=function(e){return{__await:e}},L(E.prototype),s(E.prototype,u,(function(){return this})),n.AsyncIterator=E,n.async=function(e,t,r,a,o){void 0===o&&(o=Promise);var l=new E(f(e,t,r,a),o);return n.isGeneratorFunction(t)?l:l.next().then((function(e){return e.done?e.value:l.next()}))},L(y),s(y,c,"Generator"),s(y,i,(function(){return this})),s(y,"toString",(function(){return"[object Generator]"})),n.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},n.values=F,N.prototype={constructor:N,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!e)for(var t in this)"t"===t.charAt(0)&&a.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,r){return l.type="throw",l.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],l=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var i=a.call(o,"catchLoc"),u=a.call(o,"finallyLoc");if(i&&u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&a.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var l=o?o.completion:{};return l.type=e,l.arg=t,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(l)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),O(n),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;O(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:F(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),m}},n}function n(e,t,n,r,a,o,l){try{var i=e[o](l),u=i.value}catch(c){return void n(c)}i.done?t(u):Promise.resolve(u).then(r,a)}function r(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||o(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o,l,i=[],u=!0,c=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=o.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(s){c=!0,a=s}finally{try{if(!u&&null!=n.return&&(l=n.return(),Object(l)!==l))return}finally{if(c)throw a}}return i}}(e,t)||o(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(t,n,r){return(n=function(t){var n=function(t,n){if("object"!==e(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var a=r.call(t,n||"default");if("object"!==e(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(t,"string");return"symbol"===e(n)?n:String(n)}(n))in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}System.register(["./@intlify-legacy-d0534b73.js","./@vue-legacy-ac3d2e38.js"],(function(e,o){"use strict";var l,u,c,s,f,v,m,_,p,g,d,h,b,y,L,E,I,T,k,O,N,F,w,R,P,A,M,S,W,D,x,C,U,j,H,$,V,G,Y,B,X,J,z,q,Q,K,Z,ee,te,ne,re,ae,oe,le,ie,ue,ce,se,fe,ve,me,_e,pe;return{setters:[function(e){l=e.a,u=e.i,c=e.b,s=e.c,f=e.d,v=e.e,m=e.D,_=e.f,p=e.g,g=e.h,d=e.j,h=e.r,b=e.k,y=e.l,L=e.m,E=e.s,I=e.n,T=e.o,k=e.p,O=e.q,N=e.u,F=e.t,w=e.N,R=e.v,P=e.w,A=e.x,M=e.y,S=e.z,W=e.C,D=e.A,x=e.B,C=e.E,U=e.F,j=e.G,H=e.H,$=e.I,V=e.J,G=e.K,Y=e.M,B=e.L,X=e.O,J=e.P,z=e.Q,q=e.R,Q=e.S,K=e.T,Z=e.U},function(e){ee=e.E,te=e.ac,ne=e.e,re=e.at,ae=e.y,oe=e.f,le=e.I,ie=e.B,ue=e.r,ce=e.i,se=e.C,fe=e.w,ve=e.P,me=e.z,_e=e.O,pe=e.a3}],execute:function(){e("c",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=__VUE_I18N_LEGACY_API__&&f(e.legacy)?e.legacy:__VUE_I18N_LEGACY_API__,o=!f(e.globalInjection)||e.globalInjection,l=!__VUE_I18N_LEGACY_API__||!r||!!e.allowComposition,i=new Map,u=a(function(e,t,n){var r=re(),a=__VUE_I18N_LEGACY_API__&&t?r.run((function(){return je(e)})):r.run((function(){return Ue(e)}));if(null==a)throw Le(ye.UNEXPECTED_ERROR);return[r,a]}(e,r),2),c=u[0],s=u[1],v=T("");var m={get mode(){return __VUE_I18N_LEGACY_API__&&r?"legacy":"composition"},get allowComposition(){return l},install:function(e){var a,l=arguments;return(a=t().mark((function n(){var a,i,u,c,f,_;return t().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(e.__VUE_I18N_SYMBOL__=v,e.provide(e.__VUE_I18N_SYMBOL__,m),a=l.length,i=new Array(a>1?a-1:0),u=1;u<a;u++)i[u-1]=l[u];p(i[0])&&(c=i[0],m.__composerExtend=c.__composerExtend,m.__vueI18nExtend=c.__vueI18nExtend),f=null,!r&&o&&(f=at(e,m.global)),__VUE_I18N_FULL_INSTALL__&&Qe.apply(void 0,[e,m].concat(i)),__VUE_I18N_LEGACY_API__&&r&&e.mixin(Ke(s,s.__composer,m)),_=e.unmount,e.unmount=function(){f&&f(),m.dispose(),_()};case 10:case"end":return t.stop()}}),n)})),function(){var e=this,t=arguments;return new Promise((function(r,o){var l=a.apply(e,t);function i(e){n(l,r,o,i,u,"next",e)}function u(e){n(l,r,o,i,u,"throw",e)}i(void 0)}))})()},get global(){return s},dispose:function(){c.stop()},__instances:i,__getInstance:function(e){return i.get(e)||null},__setInstance:function(e,t){i.set(e,t)},__deleteInstance:function(e){i.delete(e)}};return m}));
/*!
        * vue-i18n v9.8.0
        * (c) 2023 kazuya kawaguchi
        * Released under the MIT License.
        */
var o="9.8.0";var ge=K.__EXTEND_POINT__,de=D(ge);de(),de(),de(),de(),de(),de(),de(),de();var he=W.__EXTEND_POINT__,be=D(he),ye={UNEXPECTED_RETURN_TYPE:he,INVALID_ARGUMENT:be(),MUST_BE_CALL_SETUP_TOP:be(),NOT_INSTALLED:be(),NOT_AVAILABLE_IN_LEGACY_MODE:be(),REQUIRED_VALUE:be(),INVALID_VALUE:be(),CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN:be(),NOT_INSTALLED_WITH_PROVIDE:be(),UNEXPECTED_ERROR:be(),NOT_COMPATIBLE_LEGACY_VUE_I18N:be(),BRIDGE_SUPPORT_VUE_2_ONLY:be(),MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION:be(),NOT_AVAILABLE_COMPOSITION_IN_LEGACY:be(),__EXTEND_POINT__:be()};function Le(e){return I(e,null,void 0)}var Ee=T("__translateVNode"),Ie=T("__datetimeParts"),Te=T("__numberParts"),ke=T("__setPluralRules"),Oe=T("__injectWithOption"),Ne=T("__dispose");function Fe(e){if(!s(e))return e;for(var t in e)if(O(e,t))if(t.includes(".")){for(var n=t.split("."),r=n.length-1,a=e,o=!1,l=0;l<r;l++){if(n[l]in a||(a[n[l]]={}),!s(a[n[l]])){o=!0;break}a=a[n[l]]}o||(a[n[r]]=e[t],delete e[t]),s(a[n[r]])&&Fe(a[n[r]])}else s(e[t])&&Fe(e[t]);return e}function we(e,t){var n=t.messages,r=t.__i18n,a=t.messageResolver,o=t.flatJson,l=p(n)?n:_(r)?{}:i({},e,{});if(_(r)&&r.forEach((function(e){if("locale"in e&&"resource"in e){var t=e.locale,n=e.resource;t?(l[t]=l[t]||{},k(n,l[t])):k(n,l)}else c(e)&&k(JSON.parse(e),l)})),null==a&&o)for(var u in l)O(l,u)&&Fe(l[u]);return l}function Re(e){return e.type}function Pe(e,t,n){var r=s(t.messages)?t.messages:{};"__i18nGlobal"in n&&(r=we(e.locale.value,{messages:r,__i18n:n.__i18nGlobal}));var a=Object.keys(r);if(a.length&&a.forEach((function(t){e.mergeLocaleMessage(t,r[t])})),s(t.datetimeFormats)){var o=Object.keys(t.datetimeFormats);o.length&&o.forEach((function(n){e.mergeDateTimeFormat(n,t.datetimeFormats[n])}))}if(s(t.numberFormats)){var l=Object.keys(t.numberFormats);l.length&&l.forEach((function(n){e.mergeNumberFormat(n,t.numberFormats[n])}))}}function Ae(e){return _e(pe,null,e,0)}var Me="__INTLIFY_META__",Se=function(){return[]},We=function(){return!1},De=0;function xe(e){return function(t,n,r,a){return e(n,r,ne()||void 0,a)}}var Ce=function(){var e=ne(),t=null;return e&&(t=Re(e)[Me])?i({},Me,t):null};function Ue(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.__root,r=t.__injectWithOption,v=void 0===n,h=t.flatJson,b=!f(t.inheritLocale)||t.inheritLocale,y=ue(n&&b?n.locale.value:c(t.locale)?t.locale:m),L=ue(n&&b?n.fallbackLocale.value:c(t.fallbackLocale)||_(t.fallbackLocale)||p(t.fallbackLocale)||!1===t.fallbackLocale?t.fallbackLocale:y.value),E=ue(we(y.value,t)),I=ue(p(t.datetimeFormats)?t.datetimeFormats:i({},y.value,{})),T=ue(p(t.numberFormats)?t.numberFormats:i({},y.value,{})),w=n?n.missingWarn:!f(t.missingWarn)&&!g(t.missingWarn)||t.missingWarn,R=n?n.fallbackWarn:!f(t.fallbackWarn)&&!g(t.fallbackWarn)||t.fallbackWarn,P=n?n.fallbackRoot:!f(t.fallbackRoot)||t.fallbackRoot,A=!!t.fallbackFormat,M=d(t.missing)?t.missing:null,W=d(t.missing)?xe(t.missing):null,D=d(t.postTranslation)?t.postTranslation:null,K=n?n.warnHtmlMessage:!f(t.warnHtmlMessage)||t.warnHtmlMessage,ee=!!t.escapeParameter,te=n?n.modifiers:p(t.modifiers)?t.modifiers:{},ne=t.pluralRules||n&&n.pluralRules;e=function(){v&&Z(null);var n={version:o,locale:y.value,fallbackLocale:L.value,messages:E.value,modifiers:te,pluralRules:ne,missing:null===W?void 0:W,missingWarn:w,fallbackWarn:R,fallbackFormat:A,unresolving:!0,postTranslation:null===D?void 0:D,warnHtmlMessage:K,escapeParameter:ee,messageResolver:t.messageResolver,messageCompiler:t.messageCompiler,__meta:{framework:"vue"}};n.datetimeFormats=I.value,n.numberFormats=T.value,n.__datetimeFormatters=p(e)?e.__datetimeFormatters:void 0,n.__numberFormatters=p(e)?e.__numberFormatters:void 0;var r=x(n);return v&&Z(r),r}(),N(e,y.value,L.value);var re=ce({get:function(){return y.value},set:function(t){y.value=t,e.locale=y.value}}),ae=ce({get:function(){return L.value},set:function(t){L.value=t,e.fallbackLocale=L.value,N(e,y.value,t)}}),oe=ce((function(){return E.value})),le=ce((function(){return I.value})),ie=ce((function(){return T.value}));var se=function(t,r,o,l,i,c){var s;y.value,L.value,E.value,I.value,T.value;try{__INTLIFY_PROD_DEVTOOLS__&&j(Ce()),v||(e.fallbackContext=n?H():void 0),s=t(e)}finally{__INTLIFY_PROD_DEVTOOLS__,v||(e.fallbackContext=void 0)}if("translate exists"!==o&&u(s)&&s===$||"translate exists"===o&&!s){var f=a(r(),2),m=f[0];f[1];return n&&P?l(n):i(m)}if(c(s))return s;throw Le(ye.UNEXPECTED_RETURN_TYPE)};function ve(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return se((function(e){return Reflect.apply(G,null,[e].concat(t))}),(function(){return V.apply(void 0,t)}),"translate",(function(e){return Reflect.apply(e.t,e,[].concat(t))}),(function(e){return e}),(function(e){return c(e)}))}var me={normalize:function(e){return e.map((function(e){return c(e)||u(e)||f(e)?Ae(String(e)):e}))},interpolate:function(e){return e},type:"vnode"};function _e(e){return E.value[e]||{}}De++,n&&F&&(fe(n.locale,(function(t){b&&(y.value=t,e.locale=t,N(e,y.value,L.value))})),fe(n.fallbackLocale,(function(t){b&&(L.value=t,e.fallbackLocale=t,N(e,y.value,L.value))})));var pe=i({id:De,locale:re,fallbackLocale:ae,get inheritLocale(){return b},set inheritLocale(t){b=t,t&&n&&(y.value=n.locale.value,L.value=n.fallbackLocale.value,N(e,y.value,L.value))},get availableLocales(){return Object.keys(E.value).sort()},messages:oe,get modifiers(){return te},get pluralRules(){return ne||{}},get isGlobal(){return v},get missingWarn(){return w},set missingWarn(t){w=t,e.missingWarn=w},get fallbackWarn(){return R},set fallbackWarn(t){R=t,e.fallbackWarn=R},get fallbackRoot(){return P},set fallbackRoot(e){P=e},get fallbackFormat(){return A},set fallbackFormat(t){A=t,e.fallbackFormat=A},get warnHtmlMessage(){return K},set warnHtmlMessage(t){K=t,e.warnHtmlMessage=t},get escapeParameter(){return ee},set escapeParameter(t){ee=t,e.escapeParameter=t},t:ve,getLocaleMessage:_e,setLocaleMessage:function(t,n){if(h){var r=i({},t,n);for(var a in r)O(r,a)&&Fe(r[a]);n=r[t]}E.value[t]=n,e.messages=E.value},mergeLocaleMessage:function(t,n){E.value[t]=E.value[t]||{};var r=i({},t,n);for(var a in r)O(r,a)&&Fe(r[a]);n=r[t],k(n,E.value[t]),e.messages=E.value},getPostTranslationHandler:function(){return d(D)?D:null},setPostTranslationHandler:function(t){D=t,e.postTranslation=t},getMissingHandler:function(){return M},setMissingHandler:function(t){null!==t&&(W=xe(t)),M=t,e.missing=W}},ke,(function(t){ne=t,e.pluralRules=ne}));return pe.datetimeFormats=le,pe.numberFormats=ie,pe.rt=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=t[0],a=t[1],o=t[2];if(o&&!s(o))throw Le(ye.INVALID_ARGUMENT);return ve.apply(void 0,[r,a,l({resolvedMessage:!0},o||{})])},pe.te=function(t,n){return se((function(){if(!t)return!1;var r=_e(c(n)?n:y.value),a=e.messageResolver(r,t);return q(a)||Q(a)||c(a)}),(function(){return[t]}),"translate exists",(function(e){return Reflect.apply(e.te,e,[t,n])}),We,(function(e){return f(e)}))},pe.tm=function(t){var r=function(t){for(var n=null,r=S(e,L.value,y.value),a=0;a<r.length;a++){var o=E.value[r[a]]||{},l=e.messageResolver(o,t);if(null!=l){n=l;break}}return n}(t);return null!=r?r:n&&n.tm(t)||{}},pe.d=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return se((function(e){return Reflect.apply(X,null,[e].concat(t))}),(function(){return B.apply(void 0,t)}),"datetime format",(function(e){return Reflect.apply(e.d,e,[].concat(t))}),(function(){return Y}),(function(e){return c(e)}))},pe.n=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return se((function(e){return Reflect.apply(z,null,[e].concat(t))}),(function(){return J.apply(void 0,t)}),"number format",(function(e){return Reflect.apply(e.n,e,[].concat(t))}),(function(){return Y}),(function(e){return c(e)}))},pe.getDateTimeFormat=function(e){return I.value[e]||{}},pe.setDateTimeFormat=function(t,n){I.value[t]=n,e.datetimeFormats=I.value,C(e,t,n)},pe.mergeDateTimeFormat=function(t,n){I.value[t]=l(I.value[t]||{},n),e.datetimeFormats=I.value,C(e,t,n)},pe.getNumberFormat=function(e){return T.value[e]||{}},pe.setNumberFormat=function(t,n){T.value[t]=n,e.numberFormats=T.value,U(e,t,n)},pe.mergeNumberFormat=function(t,n){T.value[t]=l(T.value[t]||{},n),e.numberFormats=T.value,U(e,t,n)},pe[Oe]=r,pe[Ee]=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return se((function(e){var n,r=e;try{r.processor=me,n=Reflect.apply(G,null,[r].concat(t))}finally{r.processor=null}return n}),(function(){return V.apply(void 0,t)}),"translate",(function(e){return e[Ee].apply(e,t)}),(function(e){return[Ae(e)]}),(function(e){return _(e)}))},pe[Ie]=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return se((function(e){return Reflect.apply(X,null,[e].concat(t))}),(function(){return B.apply(void 0,t)}),"datetime format",(function(e){return e[Ie].apply(e,t)}),Se,(function(e){return c(e)||_(e)}))},pe[Te]=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return se((function(e){return Reflect.apply(z,null,[e].concat(t))}),(function(){return J.apply(void 0,t)}),"number format",(function(e){return e[Te].apply(e,t)}),Se,(function(e){return c(e)||_(e)}))},pe}function je(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Ue(function(e){var t=c(e.locale)?e.locale:m,n=c(e.fallbackLocale)||_(e.fallbackLocale)||p(e.fallbackLocale)||!1===e.fallbackLocale?e.fallbackLocale:t,r=d(e.missing)?e.missing:void 0,a=!f(e.silentTranslationWarn)&&!g(e.silentTranslationWarn)||!e.silentTranslationWarn,o=!f(e.silentFallbackWarn)&&!g(e.silentFallbackWarn)||!e.silentFallbackWarn,i=!f(e.fallbackRoot)||e.fallbackRoot,u=!!e.formatFallbackMessages,s=p(e.modifiers)?e.modifiers:{},v=e.pluralizationRules,h=d(e.postTranslation)?e.postTranslation:void 0,b=!c(e.warnHtmlInMessage)||"off"!==e.warnHtmlInMessage,y=!!e.escapeParameterHtml,L=!f(e.sync)||e.sync,E=e.messages;if(p(e.sharedMessages)){var I=e.sharedMessages;E=Object.keys(I).reduce((function(e,t){var n=e[t]||(e[t]={});return l(n,I[t]),e}),E||{})}var T=e.__i18n,k=e.__root,O=e.__injectWithOption,N=e.datetimeFormats,F=e.numberFormats;return{locale:t,fallbackLocale:n,messages:E,flatJson:e.flatJson,datetimeFormats:N,numberFormats:F,missing:r,missingWarn:a,fallbackWarn:o,fallbackRoot:i,fallbackFormat:u,modifiers:s,pluralRules:v,postTranslation:h,warnHtmlMessage:b,escapeParameter:y,messageResolver:e.messageResolver,inheritLocale:L,__i18n:T,__root:k,__injectWithOption:O}}(e)),n=e.__extender,r={id:t.id,get locale(){return t.locale.value},set locale(e){t.locale.value=e},get fallbackLocale(){return t.fallbackLocale.value},set fallbackLocale(e){t.fallbackLocale.value=e},get messages(){return t.messages.value},get datetimeFormats(){return t.datetimeFormats.value},get numberFormats(){return t.numberFormats.value},get availableLocales(){return t.availableLocales},get formatter(){return{interpolate:function(){return[]}}},set formatter(e){},get missing(){return t.getMissingHandler()},set missing(e){t.setMissingHandler(e)},get silentTranslationWarn(){return f(t.missingWarn)?!t.missingWarn:t.missingWarn},set silentTranslationWarn(e){t.missingWarn=f(e)?!e:e},get silentFallbackWarn(){return f(t.fallbackWarn)?!t.fallbackWarn:t.fallbackWarn},set silentFallbackWarn(e){t.fallbackWarn=f(e)?!e:e},get modifiers(){return t.modifiers},get formatFallbackMessages(){return t.fallbackFormat},set formatFallbackMessages(e){t.fallbackFormat=e},get postTranslation(){return t.getPostTranslationHandler()},set postTranslation(e){t.setPostTranslationHandler(e)},get sync(){return t.inheritLocale},set sync(e){t.inheritLocale=e},get warnHtmlInMessage(){return t.warnHtmlMessage?"warn":"off"},set warnHtmlInMessage(e){t.warnHtmlMessage="off"!==e},get escapeParameterHtml(){return t.escapeParameter},set escapeParameterHtml(e){t.escapeParameter=e},get preserveDirectiveContent(){return!0},set preserveDirectiveContent(e){},get pluralizationRules(){return t.pluralRules||{}},__composer:t,t:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];var a=n[0],o=n[1],l=n[2],i={},u=null,s=null;if(!c(a))throw Le(ye.INVALID_ARGUMENT);var f=a;return c(o)?i.locale=o:_(o)?u=o:p(o)&&(s=o),_(l)?u=l:p(l)&&(s=l),Reflect.apply(t.t,t,[f,u||s||{},i])},rt:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return Reflect.apply(t.rt,t,[].concat(n))},tc:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];var a=n[0],o=n[1],l=n[2],i={plural:1},s=null,f=null;if(!c(a))throw Le(ye.INVALID_ARGUMENT);var v=a;return c(o)?i.locale=o:u(o)?i.plural=o:_(o)?s=o:p(o)&&(f=o),c(l)?i.locale=l:_(l)?s=l:p(l)&&(f=l),Reflect.apply(t.t,t,[v,s||f||{},i])},te:function(e,n){return t.te(e,n)},tm:function(e){return t.tm(e)},getLocaleMessage:function(e){return t.getLocaleMessage(e)},setLocaleMessage:function(e,n){t.setLocaleMessage(e,n)},mergeLocaleMessage:function(e,n){t.mergeLocaleMessage(e,n)},d:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return Reflect.apply(t.d,t,[].concat(n))},getDateTimeFormat:function(e){return t.getDateTimeFormat(e)},setDateTimeFormat:function(e,n){t.setDateTimeFormat(e,n)},mergeDateTimeFormat:function(e,n){t.mergeDateTimeFormat(e,n)},n:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return Reflect.apply(t.n,t,[].concat(n))},getNumberFormat:function(e){return t.getNumberFormat(e)},setNumberFormat:function(e,n){t.setNumberFormat(e,n)},mergeNumberFormat:function(e,n){t.mergeNumberFormat(e,n)},getChoiceIndex:function(e,t){return-1}};return r.__extender=n,r}var He={tag:{type:[String,Object]},locale:{type:String},scope:{type:String,validator:function(e){return"parent"===e||"global"===e},default:"parent"},i18n:{type:Object}};function $e(e){return ve}var Ve=ee({name:"i18n-t",props:l({keypath:{type:String,required:!0},plural:{type:[Number,String],validator:function(e){return u(e)||!isNaN(e)}}},He),setup:function(e,t){var n=t.slots,a=t.attrs,o=e.i18n||tt({useScope:e.scope,__useComponent:!0});return function(){var i=Object.keys(n).filter((function(e){return"_"!==e})),u={};e.locale&&(u.locale=e.locale),void 0!==e.plural&&(u.plural=c(e.plural)?+e.plural:e.plural);var f=function(e,t){var n=e.slots;return 1===t.length&&"default"===t[0]?(n.default?n.default():[]).reduce((function(e,t){return[].concat(r(e),r(t.type===ve?t.children:[t]))}),[]):t.reduce((function(e,t){var r=n[t];return r&&(e[t]=r()),e}),{})}(t,i),v=o[Ee](e.keypath,f,u),m=l({},a),_=c(e.tag)||s(e.tag)?e.tag:$e();return te(_,m,v)}}});function Ge(e,t,n,r){var a=t.slots,o=t.attrs;return function(){var t={part:!0},u={};e.locale&&(t.locale=e.locale),c(e.format)?t.key=e.format:s(e.format)&&(c(e.format.key)&&(t.key=e.format.key),u=Object.keys(e.format).reduce((function(t,r){return n.includes(r)?l({},t,i({},r,e.format[r])):t}),{}));var f=r.apply(void 0,[e.value,t,u]),v=[t.key];_(f)?v=f.map((function(e,t){var n,r=a[e.type],o=r?r((i(n={},e.type,e.value),i(n,"index",t),i(n,"parts",f),n)):[e.value];return function(e){return _(e)&&!c(e[0])}(o)&&(o[0].key="".concat(e.type,"-").concat(t)),o})):c(f)&&(v=[f]);var m=l({},o),p=c(e.tag)||s(e.tag)?e.tag:$e();return te(p,m,v)}}var Ye=ee({name:"i18n-n",props:l({value:{type:Number,required:!0},format:{type:[String,Object]}},He),setup:function(e,t){var n=e.i18n||tt({useScope:"parent",__useComponent:!0});return Ge(e,t,w,(function(){return n[Te].apply(n,arguments)}))}}),Be=Ye,Xe=ee({name:"i18n-d",props:l({value:{type:[Number,Date],required:!0},format:{type:[String,Object]}},He),setup:function(e,t){var n=e.i18n||tt({useScope:"parent",__useComponent:!0});return Ge(e,t,R,(function(){return n[Ie].apply(n,arguments)}))}}),Je=Xe;function ze(e){if(c(e))return{path:e};if(p(e)){if(!("path"in e))throw Le(ye.REQUIRED_VALUE);return e}throw Le(ye.INVALID_VALUE)}function qe(e){var t=e.path,n=e.locale,r=e.args,a=e.choice,o=e.plural,l={},i=r||{};return c(n)&&(l.locale=n),u(a)&&(l.plural=a),u(o)&&(l.plural=o),[t,i,l]}function Qe(e,t){var n=p(arguments.length<=2?void 0:arguments[2])?arguments.length<=2?void 0:arguments[2]:{},o=!!n.useI18nComponentName;(!f(n.globalInstall)||n.globalInstall)&&([o?"i18n":Ve.name,"I18nT"].forEach((function(t){return e.component(t,Ve)})),[Be.name,"I18nN"].forEach((function(t){return e.component(t,Be)})),[Je.name,"I18nD"].forEach((function(t){return e.component(t,Je)}))),e.directive("t",function(e){var t=function(t){var n=t.instance,a=(t.modifiers,t.value);if(!n||!n.$)throw Le(ye.UNEXPECTED_ERROR);var o=function(e,t){var n=e;if("composition"===e.mode)return n.__getInstance(t)||e.global;var r=n.__getInstance(t);return null!=r?r.__composer:e.global.__composer}(e,n.$),l=ze(a);return[Reflect.apply(o.t,o,r(qe(l))),o]};return{created:function(n,r){var o=a(t(r),2),l=o[0],i=o[1];F&&e.global===i&&(n.__i18nWatcher=fe(i.locale,(function(){r.instance&&r.instance.$forceUpdate()}))),n.__composer=i,n.textContent=l},unmounted:function(e){F&&e.__i18nWatcher&&(e.__i18nWatcher(),e.__i18nWatcher=void 0,delete e.__i18nWatcher),e.__composer&&(e.__composer=void 0,delete e.__composer)},beforeUpdate:function(e,t){var n=t.value;if(e.__composer){var a=e.__composer,o=ze(n);e.textContent=Reflect.apply(a.t,a,r(qe(o)))}},getSSRProps:function(e){return{textContent:a(t(e),1)[0]}}}}(t))}function Ke(e,t,n){return{beforeCreate:function(){var r=this,a=ne();if(!a)throw Le(ye.UNEXPECTED_ERROR);var o=this.$options;if(o.i18n){var l=o.i18n;if(o.__i18n&&(l.__i18n=o.__i18n),l.__root=t,this===this.$root)this.$i18n=Ze(e,l);else{l.__injectWithOption=!0,l.__extender=n.__vueI18nExtend,this.$i18n=je(l);var i=this.$i18n;i.__extender&&(i.__disposer=i.__extender(this.$i18n))}}else if(o.__i18n)if(this===this.$root)this.$i18n=Ze(e,o);else{this.$i18n=je({__i18n:o.__i18n,__injectWithOption:!0,__extender:n.__vueI18nExtend,__root:t});var u=this.$i18n;u.__extender&&(u.__disposer=u.__extender(this.$i18n))}else this.$i18n=e;o.__i18nGlobal&&Pe(t,o,o),this.$t=function(){var e;return(e=r.$i18n).t.apply(e,arguments)},this.$rt=function(){var e;return(e=r.$i18n).rt.apply(e,arguments)},this.$tc=function(){var e;return(e=r.$i18n).tc.apply(e,arguments)},this.$te=function(e,t){return r.$i18n.te(e,t)},this.$d=function(){var e;return(e=r.$i18n).d.apply(e,arguments)},this.$n=function(){var e;return(e=r.$i18n).n.apply(e,arguments)},this.$tm=function(e){return r.$i18n.tm(e)},n.__setInstance(a,this.$i18n)},mounted:function(){},unmounted:function(){var e=ne();if(!e)throw Le(ye.UNEXPECTED_ERROR);var t=this.$i18n;delete this.$t,delete this.$rt,delete this.$tc,delete this.$te,delete this.$d,delete this.$n,delete this.$tm,t.__disposer&&(t.__disposer(),delete t.__disposer,delete t.__extender),n.__deleteInstance(e),delete this.$i18n}}}function Ze(e,t){e.locale=t.locale||e.locale,e.fallbackLocale=t.fallbackLocale||e.fallbackLocale,e.missing=t.missing||e.missing,e.silentTranslationWarn=t.silentTranslationWarn||e.silentFallbackWarn,e.silentFallbackWarn=t.silentFallbackWarn||e.silentFallbackWarn,e.formatFallbackMessages=t.formatFallbackMessages||e.formatFallbackMessages,e.postTranslation=t.postTranslation||e.postTranslation,e.warnHtmlInMessage=t.warnHtmlInMessage||e.warnHtmlInMessage,e.escapeParameterHtml=t.escapeParameterHtml||e.escapeParameterHtml,e.sync=t.sync||e.sync,e.__composer[ke](t.pluralizationRules||e.pluralizationRules);var n=we(e.locale,{messages:t.messages,__i18n:t.__i18n});return Object.keys(n).forEach((function(t){return e.mergeLocaleMessage(t,n[t])})),t.datetimeFormats&&Object.keys(t.datetimeFormats).forEach((function(n){return e.mergeDateTimeFormat(n,t.datetimeFormats[n])})),t.numberFormats&&Object.keys(t.numberFormats).forEach((function(n){return e.mergeNumberFormat(n,t.numberFormats[n])})),e}var et=T("global-vue-i18n");function tt(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=ne();if(null==t)throw Le(ye.MUST_BE_CALL_SETUP_TOP);if(!t.isCE&&null!=t.appContext.app&&!t.appContext.app.__VUE_I18N_SYMBOL__)throw Le(ye.NOT_INSTALLED);var n=function(e){var t=ae(e.isCE?et:e.appContext.app.__VUE_I18N_SYMBOL__);if(!t)throw Le(e.isCE?ye.NOT_INSTALLED_WITH_PROVIDE:ye.UNEXPECTED_ERROR);return t}(t),r=function(e){return"composition"===e.mode?e.global:e.global.__composer}(n),a=Re(t),o=function(e,t){return v(e)?"__i18n"in t?"local":"global":e.useScope?e.useScope:"local"}(e,a);if(__VUE_I18N_LEGACY_API__&&"legacy"===n.mode&&!e.__useComponent){if(!n.allowComposition)throw Le(ye.NOT_AVAILABLE_IN_LEGACY_MODE);return function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a="local"===t,o=ie(null);if(a&&e.proxy&&!e.proxy.$options.i18n&&!e.proxy.$options.__i18n)throw Le(ye.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);var l=f(r.inheritLocale)?r.inheritLocale:!c(r.locale),u=ue(!a||l?n.locale.value:c(r.locale)?r.locale:m),s=ue(!a||l?n.fallbackLocale.value:c(r.fallbackLocale)||_(r.fallbackLocale)||p(r.fallbackLocale)||!1===r.fallbackLocale?r.fallbackLocale:u.value),v=ue(we(u.value,r)),h=ue(p(r.datetimeFormats)?r.datetimeFormats:i({},u.value,{})),b=ue(p(r.numberFormats)?r.numberFormats:i({},u.value,{})),y=a?n.missingWarn:!f(r.missingWarn)&&!g(r.missingWarn)||r.missingWarn,L=a?n.fallbackWarn:!f(r.fallbackWarn)&&!g(r.fallbackWarn)||r.fallbackWarn,E=a?n.fallbackRoot:!f(r.fallbackRoot)||r.fallbackRoot,I=!!r.fallbackFormat,T=d(r.missing)?r.missing:null,k=d(r.postTranslation)?r.postTranslation:null,O=a?n.warnHtmlMessage:!f(r.warnHtmlMessage)||r.warnHtmlMessage,N=!!r.escapeParameter,F=a?n.modifiers:p(r.modifiers)?r.modifiers:{},w=r.pluralRules||a&&n.pluralRules;function R(){return[u.value,s.value,v.value,h.value,b.value]}var P=ce({get:function(){return o.value?o.value.locale.value:u.value},set:function(e){o.value&&(o.value.locale.value=e),u.value=e}}),A=ce({get:function(){return o.value?o.value.fallbackLocale.value:s.value},set:function(e){o.value&&(o.value.fallbackLocale.value=e),s.value=e}}),M=ce((function(){return o.value?o.value.messages.value:v.value})),S=ce((function(){return h.value})),W=ce((function(){return b.value}));function D(){return o.value?o.value.getPostTranslationHandler():k}function x(e){o.value&&o.value.setPostTranslationHandler(e)}function C(){return o.value?o.value.getMissingHandler():T}function U(e){o.value&&o.value.setMissingHandler(e)}function j(e){return R(),e()}function H(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return o.value?j((function(){return Reflect.apply(o.value.t,null,[].concat(t))})):j((function(){return""}))}function $(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return o.value?Reflect.apply(o.value.rt,null,[].concat(t)):""}function V(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return o.value?j((function(){return Reflect.apply(o.value.d,null,[].concat(t))})):j((function(){return""}))}function G(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return o.value?j((function(){return Reflect.apply(o.value.n,null,[].concat(t))})):j((function(){return""}))}function Y(e){return o.value?o.value.tm(e):{}}function B(e,t){return!!o.value&&o.value.te(e,t)}function X(e){return o.value?o.value.getLocaleMessage(e):{}}function J(e,t){o.value&&(o.value.setLocaleMessage(e,t),v.value[e]=t)}function z(e,t){o.value&&o.value.mergeLocaleMessage(e,t)}function q(e){return o.value?o.value.getDateTimeFormat(e):{}}function Q(e,t){o.value&&(o.value.setDateTimeFormat(e,t),h.value[e]=t)}function K(e,t){o.value&&o.value.mergeDateTimeFormat(e,t)}function Z(e){return o.value?o.value.getNumberFormat(e):{}}function ee(e,t){o.value&&(o.value.setNumberFormat(e,t),b.value[e]=t)}function te(e,t){o.value&&o.value.mergeNumberFormat(e,t)}var ne={get id(){return o.value?o.value.id:-1},locale:P,fallbackLocale:A,messages:M,datetimeFormats:S,numberFormats:W,get inheritLocale(){return o.value?o.value.inheritLocale:l},set inheritLocale(e){o.value&&(o.value.inheritLocale=e)},get availableLocales(){return o.value?o.value.availableLocales:Object.keys(v.value)},get modifiers(){return o.value?o.value.modifiers:F},get pluralRules(){return o.value?o.value.pluralRules:w},get isGlobal(){return!!o.value&&o.value.isGlobal},get missingWarn(){return o.value?o.value.missingWarn:y},set missingWarn(e){o.value&&(o.value.missingWarn=e)},get fallbackWarn(){return o.value?o.value.fallbackWarn:L},set fallbackWarn(e){o.value&&(o.value.missingWarn=e)},get fallbackRoot(){return o.value?o.value.fallbackRoot:E},set fallbackRoot(e){o.value&&(o.value.fallbackRoot=e)},get fallbackFormat(){return o.value?o.value.fallbackFormat:I},set fallbackFormat(e){o.value&&(o.value.fallbackFormat=e)},get warnHtmlMessage(){return o.value?o.value.warnHtmlMessage:O},set warnHtmlMessage(e){o.value&&(o.value.warnHtmlMessage=e)},get escapeParameter(){return o.value?o.value.escapeParameter:N},set escapeParameter(e){o.value&&(o.value.escapeParameter=e)},t:H,getPostTranslationHandler:D,setPostTranslationHandler:x,getMissingHandler:C,setMissingHandler:U,rt:$,d:V,n:G,tm:Y,te:B,getLocaleMessage:X,setLocaleMessage:J,mergeLocaleMessage:z,getDateTimeFormat:q,setDateTimeFormat:Q,mergeDateTimeFormat:K,getNumberFormat:Z,setNumberFormat:ee,mergeNumberFormat:te};function re(e){e.locale.value=u.value,e.fallbackLocale.value=s.value,Object.keys(v.value).forEach((function(t){e.mergeLocaleMessage(t,v.value[t])})),Object.keys(h.value).forEach((function(t){e.mergeDateTimeFormat(t,h.value[t])})),Object.keys(b.value).forEach((function(t){e.mergeNumberFormat(t,b.value[t])})),e.escapeParameter=N,e.fallbackFormat=I,e.fallbackRoot=E,e.fallbackWarn=L,e.missingWarn=y,e.warnHtmlMessage=O}return se((function(){if(null==e.proxy||null==e.proxy.$i18n)throw Le(ye.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);var n=o.value=e.proxy.$i18n.__composer;"global"===t?(u.value=n.locale.value,s.value=n.fallbackLocale.value,v.value=n.messages.value,h.value=n.datetimeFormats.value,b.value=n.numberFormats.value):a&&re(n)})),ne}(t,o,r,e)}if("global"===o)return Pe(r,e,a),r;if("parent"===o){var u=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=null,a=t.root,o=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(null==e)return null;return t&&e.vnode.ctx||e.parent}(t,n);for(;null!=o;){var l=e;if("composition"===e.mode)r=l.__getInstance(o);else if(__VUE_I18N_LEGACY_API__){var i=l.__getInstance(o);null!=i&&(r=i.__composer,n&&r&&!r[Oe]&&(r=null))}if(null!=r)break;if(a===o)break;o=o.parent}return r}(n,t,e.__useComponent);return null==u&&(u=r),u}var s=n,h=s.__getInstance(t);if(null==h){var b=l({},e);"__i18n"in a&&(b.__i18n=a.__i18n),r&&(b.__root=r),h=Ue(b),s.__composerExtend&&(h[Ne]=s.__composerExtend(h)),function(e,t,n){oe((function(){}),t),le((function(){var r=n;e.__deleteInstance(t);var a=r[Ne];a&&(a(),delete r[Ne])}),t)}(s,t,h),s.__setInstance(t,h)}return h}var nt=["locale","fallbackLocale","availableLocales"],rt=["t","rt","d","n","tm","te"];function at(e,t){var n=Object.create(null);nt.forEach((function(e){var r=Object.getOwnPropertyDescriptor(t,e);if(!r)throw Le(ye.UNEXPECTED_ERROR);var a=me(r.value)?{get:function(){return r.value.value},set:function(e){r.value.value=e}}:{get:function(){return r.get&&r.get()}};Object.defineProperty(n,e,a)})),e.config.globalProperties.$i18n=n,rt.forEach((function(n){var r=Object.getOwnPropertyDescriptor(t,n);if(!r||!r.value)throw Le(ye.UNEXPECTED_ERROR);Object.defineProperty(e.config.globalProperties,"$".concat(n),r)}));return function(){delete e.config.globalProperties.$i18n,rt.forEach((function(t){delete e.config.globalProperties["$".concat(t)]}))}}if("boolean"!=typeof __VUE_I18N_FULL_INSTALL__&&(L().__VUE_I18N_FULL_INSTALL__=!0),"boolean"!=typeof __VUE_I18N_LEGACY_API__&&(L().__VUE_I18N_LEGACY_API__=!0),"boolean"!=typeof __INTLIFY_JIT_COMPILATION__&&(L().__INTLIFY_JIT_COMPILATION__=!1),"boolean"!=typeof __INTLIFY_DROP_MESSAGE_COMPILER__&&(L().__INTLIFY_DROP_MESSAGE_COMPILER__=!1),"boolean"!=typeof __INTLIFY_PROD_DEVTOOLS__&&(L().__INTLIFY_PROD_DEVTOOLS__=!1),__INTLIFY_JIT_COMPILATION__?h(P):h(A),b(M),y(S),__INTLIFY_PROD_DEVTOOLS__){var ot=L();ot.__INTLIFY__=!0,E(ot.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__)}}}}))}();
