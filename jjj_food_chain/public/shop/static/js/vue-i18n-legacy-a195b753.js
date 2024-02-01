!function(){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */t=function(){return r};var n,r={},a=Object.prototype,o=a.hasOwnProperty,l=Object.defineProperty||function(e,t,n){e[t]=n.value},i="function"==typeof Symbol?Symbol:{},u=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function f(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{f({},"")}catch(n){f=function(e,t,n){return e[t]=n}}function v(e,t,n,r){var a=t&&t.prototype instanceof d?t:d,o=Object.create(a.prototype),i=new A(r||[]);return l(o,"_invoke",{value:F(e,n,i)}),o}function m(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}r.wrap=v;var _="suspendedStart",p="suspendedYield",g="executing",h="completed",b={};function d(){}function y(){}function L(){}var E={};f(E,u,(function(){return this}));var I=Object.getPrototypeOf,T=I&&I(I(M([])));T&&T!==a&&o.call(T,u)&&(E=T);var k=L.prototype=d.prototype=Object.create(E);function O(e){["next","throw","return"].forEach((function(t){f(e,t,(function(e){return this._invoke(t,e)}))}))}function N(t,n){function r(a,l,i,u){var c=m(t[a],t,l);if("throw"!==c.type){var s=c.arg,f=s.value;return f&&"object"==e(f)&&o.call(f,"__await")?n.resolve(f.__await).then((function(e){r("next",e,i,u)}),(function(e){r("throw",e,i,u)})):n.resolve(f).then((function(e){s.value=e,i(s)}),(function(e){return r("throw",e,i,u)}))}u(c.arg)}var a;l(this,"_invoke",{value:function(e,t){function o(){return new n((function(n,a){r(e,t,n,a)}))}return a=a?a.then(o,o):o()}})}function F(e,t,r){var a=_;return function(o,l){if(a===g)throw new Error("Generator is already running");if(a===h){if("throw"===o)throw l;return{value:n,done:!0}}for(r.method=o,r.arg=l;;){var i=r.delegate;if(i){var u=w(i,r);if(u){if(u===b)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(a===_)throw a=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);a=g;var c=m(e,t,r);if("normal"===c.type){if(a=r.done?h:p,c.arg===b)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(a=h,r.method="throw",r.arg=c.arg)}}}function w(e,t){var r=t.method,a=e.iterator[r];if(a===n)return t.delegate=null,"throw"===r&&e.iterator.return&&(t.method="return",t.arg=n,w(e,t),"throw"===t.method)||"return"!==r&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+r+"' method")),b;var o=m(a,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,b;var l=o.arg;return l?l.done?(t[e.resultName]=l.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=n),t.delegate=null,b):l:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,b)}function R(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function P(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function A(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(R,this),this.reset(!0)}function M(t){if(t||""===t){var r=t[u];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var a=-1,l=function e(){for(;++a<t.length;)if(o.call(t,a))return e.value=t[a],e.done=!1,e;return e.value=n,e.done=!0,e};return l.next=l}}throw new TypeError(e(t)+" is not iterable")}return y.prototype=L,l(k,"constructor",{value:L,configurable:!0}),l(L,"constructor",{value:y,configurable:!0}),y.displayName=f(L,s,"GeneratorFunction"),r.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===y||"GeneratorFunction"===(t.displayName||t.name))},r.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,L):(e.__proto__=L,f(e,s,"GeneratorFunction")),e.prototype=Object.create(k),e},r.awrap=function(e){return{__await:e}},O(N.prototype),f(N.prototype,c,(function(){return this})),r.AsyncIterator=N,r.async=function(e,t,n,a,o){void 0===o&&(o=Promise);var l=new N(v(e,t,n,a),o);return r.isGeneratorFunction(t)?l:l.next().then((function(e){return e.done?e.value:l.next()}))},O(k),f(k,s,"Generator"),f(k,u,(function(){return this})),f(k,"toString",(function(){return"[object Generator]"})),r.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},r.values=M,A.prototype={constructor:A,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(P),!e)for(var t in this)"t"===t.charAt(0)&&o.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=n)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(r,a){return i.type="throw",i.arg=e,t.next=r,a&&(t.method="next",t.arg=n),!!a}for(var a=this.tryEntries.length-1;a>=0;--a){var l=this.tryEntries[a],i=l.completion;if("root"===l.tryLoc)return r("end");if(l.tryLoc<=this.prev){var u=o.call(l,"catchLoc"),c=o.call(l,"finallyLoc");if(u&&c){if(this.prev<l.catchLoc)return r(l.catchLoc,!0);if(this.prev<l.finallyLoc)return r(l.finallyLoc)}else if(u){if(this.prev<l.catchLoc)return r(l.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<l.finallyLoc)return r(l.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var a=r;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var l=a?a.completion:{};return l.type=e,l.arg=t,a?(this.method="next",this.next=a.finallyLoc,b):this.complete(l)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),b},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),P(n),b}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;P(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:M(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=n),b}},r}function n(e,t,n,r,a,o,l){try{var i=e[o](l),u=i.value}catch(c){return void n(c)}i.done?t(u):Promise.resolve(u).then(r,a)}function r(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||o(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o,l,i=[],u=!0,c=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=o.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){c=!0,a=e}finally{try{if(!u&&null!=n.return&&(l=n.return(),Object(l)!==l))return}finally{if(c)throw a}}return i}}(e,t)||o(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(t,n,r){var a;return a=function(t,n){if("object"!=e(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var a=r.call(t,n||"default");if("object"!=e(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(n,"string"),(n="symbol"==e(a)?a:String(a))in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}System.register(["./@intlify-legacy-7f6e5bc9.js","./@vue-legacy-8ef99c9b.js"],(function(e,o){"use strict";var l,u,c,s,f,v,m,_,p,g,h,b,d,y,L,E,I,T,k,O,N,F,w,R,P,A,M,W,S,D,x,C,U,j,H,$,V,G,Y,B,X,J,z,q,Q,K,Z,ee,te,ne,re,ae,oe,le,ie,ue,ce,se,fe,ve,me,_e,pe;return{setters:[function(e){l=e.a,u=e.i,c=e.b,s=e.c,f=e.d,v=e.e,m=e.D,_=e.f,p=e.g,g=e.h,h=e.j,b=e.r,d=e.k,y=e.l,L=e.m,E=e.s,I=e.n,T=e.o,k=e.p,O=e.q,N=e.u,F=e.t,w=e.N,R=e.v,P=e.w,A=e.x,M=e.y,W=e.z,S=e.C,D=e.A,x=e.B,C=e.E,U=e.F,j=e.G,H=e.H,$=e.I,V=e.J,G=e.K,Y=e.M,B=e.L,X=e.O,J=e.P,z=e.Q,q=e.R,Q=e.S,K=e.T,Z=e.U},function(e){ee=e.d,te=e.ae,ne=e.h,re=e.at,ae=e.A,oe=e.i,le=e.I,ie=e.s,ue=e.r,ce=e.j,se=e.D,fe=e.w,ve=e.P,me=e.B,_e=e.O,pe=e.a3}],execute:function(){e("c",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=__VUE_I18N_LEGACY_API__&&f(e.legacy)?e.legacy:__VUE_I18N_LEGACY_API__,o=!f(e.globalInjection)||e.globalInjection,l=!__VUE_I18N_LEGACY_API__||!r||!!e.allowComposition,i=new Map,u=a(function(e,t,n){var r=re(),a=__VUE_I18N_LEGACY_API__&&t?r.run((function(){return je(e)})):r.run((function(){return Ue(e)}));if(null==a)throw Le(ye.UNEXPECTED_ERROR);return[r,a]}(e,r),2),c=u[0],s=u[1],v=T("");var m={get mode(){return __VUE_I18N_LEGACY_API__&&r?"legacy":"composition"},get allowComposition(){return l},install:function(e){var a,l=arguments;return(a=t().mark((function n(){var a,i,u,c,f,_;return t().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(e.__VUE_I18N_SYMBOL__=v,e.provide(e.__VUE_I18N_SYMBOL__,m),a=l.length,i=new Array(a>1?a-1:0),u=1;u<a;u++)i[u-1]=l[u];p(i[0])&&(c=i[0],m.__composerExtend=c.__composerExtend,m.__vueI18nExtend=c.__vueI18nExtend),f=null,!r&&o&&(f=at(e,m.global)),__VUE_I18N_FULL_INSTALL__&&Qe.apply(void 0,[e,m].concat(i)),__VUE_I18N_LEGACY_API__&&r&&e.mixin(Ke(s,s.__composer,m)),_=e.unmount,e.unmount=function(){f&&f(),m.dispose(),_()};case 10:case"end":return t.stop()}}),n)})),function(){var e=this,t=arguments;return new Promise((function(r,o){var l=a.apply(e,t);function i(e){n(l,r,o,i,u,"next",e)}function u(e){n(l,r,o,i,u,"throw",e)}i(void 0)}))})()},get global(){return s},dispose:function(){c.stop()},__instances:i,__getInstance:function(e){return i.get(e)||null},__setInstance:function(e,t){i.set(e,t)},__deleteInstance:function(e){i.delete(e)}};return m}));
/*!
        * vue-i18n v9.9.1
        * (c) 2024 kazuya kawaguchi
        * Released under the MIT License.
        */
var o="9.9.1";var ge=K.__EXTEND_POINT__,he=D(ge);he(),he(),he(),he(),he(),he(),he(),he();var be=S.__EXTEND_POINT__,de=D(be),ye={UNEXPECTED_RETURN_TYPE:be,INVALID_ARGUMENT:de(),MUST_BE_CALL_SETUP_TOP:de(),NOT_INSTALLED:de(),NOT_AVAILABLE_IN_LEGACY_MODE:de(),REQUIRED_VALUE:de(),INVALID_VALUE:de(),CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN:de(),NOT_INSTALLED_WITH_PROVIDE:de(),UNEXPECTED_ERROR:de(),NOT_COMPATIBLE_LEGACY_VUE_I18N:de(),BRIDGE_SUPPORT_VUE_2_ONLY:de(),MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION:de(),NOT_AVAILABLE_COMPOSITION_IN_LEGACY:de(),__EXTEND_POINT__:de()};function Le(e){return I(e,null,void 0)}var Ee=T("__translateVNode"),Ie=T("__datetimeParts"),Te=T("__numberParts"),ke=T("__setPluralRules"),Oe=T("__injectWithOption"),Ne=T("__dispose");function Fe(e){if(!s(e))return e;for(var t in e)if(O(e,t))if(t.includes(".")){for(var n=t.split("."),r=n.length-1,a=e,o=!1,l=0;l<r;l++){if(n[l]in a||(a[n[l]]={}),!s(a[n[l]])){o=!0;break}a=a[n[l]]}o||(a[n[r]]=e[t],delete e[t]),s(a[n[r]])&&Fe(a[n[r]])}else s(e[t])&&Fe(e[t]);return e}function we(e,t){var n=t.messages,r=t.__i18n,a=t.messageResolver,o=t.flatJson,l=p(n)?n:_(r)?{}:i({},e,{});if(_(r)&&r.forEach((function(e){if("locale"in e&&"resource"in e){var t=e.locale,n=e.resource;t?(l[t]=l[t]||{},k(n,l[t])):k(n,l)}else c(e)&&k(JSON.parse(e),l)})),null==a&&o)for(var u in l)O(l,u)&&Fe(l[u]);return l}function Re(e){return e.type}function Pe(e,t,n){var r=s(t.messages)?t.messages:{};"__i18nGlobal"in n&&(r=we(e.locale.value,{messages:r,__i18n:n.__i18nGlobal}));var a=Object.keys(r);if(a.length&&a.forEach((function(t){e.mergeLocaleMessage(t,r[t])})),s(t.datetimeFormats)){var o=Object.keys(t.datetimeFormats);o.length&&o.forEach((function(n){e.mergeDateTimeFormat(n,t.datetimeFormats[n])}))}if(s(t.numberFormats)){var l=Object.keys(t.numberFormats);l.length&&l.forEach((function(n){e.mergeNumberFormat(n,t.numberFormats[n])}))}}function Ae(e){return _e(pe,null,e,0)}var Me="__INTLIFY_META__",We=function(){return[]},Se=function(){return!1},De=0;function xe(e){return function(t,n,r,a){return e(n,r,ne()||void 0,a)}}var Ce=function(){var e=ne(),t=null;return e&&(t=Re(e)[Me])?i({},Me,t):null};function Ue(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.__root,r=t.__injectWithOption,v=void 0===n,b=t.flatJson,d=F?ue:ie,y=!f(t.inheritLocale)||t.inheritLocale,L=d(n&&y?n.locale.value:c(t.locale)?t.locale:m),E=d(n&&y?n.fallbackLocale.value:c(t.fallbackLocale)||_(t.fallbackLocale)||p(t.fallbackLocale)||!1===t.fallbackLocale?t.fallbackLocale:L.value),I=d(we(L.value,t)),T=d(p(t.datetimeFormats)?t.datetimeFormats:i({},L.value,{})),w=d(p(t.numberFormats)?t.numberFormats:i({},L.value,{})),R=n?n.missingWarn:!f(t.missingWarn)&&!g(t.missingWarn)||t.missingWarn,P=n?n.fallbackWarn:!f(t.fallbackWarn)&&!g(t.fallbackWarn)||t.fallbackWarn,A=n?n.fallbackRoot:!f(t.fallbackRoot)||t.fallbackRoot,M=!!t.fallbackFormat,S=h(t.missing)?t.missing:null,D=h(t.missing)?xe(t.missing):null,K=h(t.postTranslation)?t.postTranslation:null,ee=n?n.warnHtmlMessage:!f(t.warnHtmlMessage)||t.warnHtmlMessage,te=!!t.escapeParameter,ne=n?n.modifiers:p(t.modifiers)?t.modifiers:{},re=t.pluralRules||n&&n.pluralRules;e=function(){v&&Z(null);var n={version:o,locale:L.value,fallbackLocale:E.value,messages:I.value,modifiers:ne,pluralRules:re,missing:null===D?void 0:D,missingWarn:R,fallbackWarn:P,fallbackFormat:M,unresolving:!0,postTranslation:null===K?void 0:K,warnHtmlMessage:ee,escapeParameter:te,messageResolver:t.messageResolver,messageCompiler:t.messageCompiler,__meta:{framework:"vue"}};n.datetimeFormats=T.value,n.numberFormats=w.value,n.__datetimeFormatters=p(e)?e.__datetimeFormatters:void 0,n.__numberFormatters=p(e)?e.__numberFormatters:void 0;var r=x(n);return v&&Z(r),r}(),N(e,L.value,E.value);var ae=ce({get:function(){return L.value},set:function(t){L.value=t,e.locale=L.value}}),oe=ce({get:function(){return E.value},set:function(t){E.value=t,e.fallbackLocale=E.value,N(e,L.value,t)}}),le=ce((function(){return I.value})),se=ce((function(){return T.value})),ve=ce((function(){return w.value}));var me=function(t,r,o,l,i,c){var s;L.value,E.value,I.value,T.value,w.value;try{__INTLIFY_PROD_DEVTOOLS__&&j(Ce()),v||(e.fallbackContext=n?H():void 0),s=t(e)}finally{__INTLIFY_PROD_DEVTOOLS__,v||(e.fallbackContext=void 0)}if("translate exists"!==o&&u(s)&&s===$||"translate exists"===o&&!s){var f=a(r(),2),m=f[0];f[1];return n&&A?l(n):i(m)}if(c(s))return s;throw Le(ye.UNEXPECTED_RETURN_TYPE)};function _e(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return me((function(e){return Reflect.apply(G,null,[e].concat(t))}),(function(){return V.apply(void 0,t)}),"translate",(function(e){return Reflect.apply(e.t,e,[].concat(t))}),(function(e){return e}),(function(e){return c(e)}))}var pe={normalize:function(e){return e.map((function(e){return c(e)||u(e)||f(e)?Ae(String(e)):e}))},interpolate:function(e){return e},type:"vnode"};function ge(e){return I.value[e]||{}}De++,n&&F&&(fe(n.locale,(function(t){y&&(L.value=t,e.locale=t,N(e,L.value,E.value))})),fe(n.fallbackLocale,(function(t){y&&(E.value=t,e.fallbackLocale=t,N(e,L.value,E.value))})));var he=i({id:De,locale:ae,fallbackLocale:oe,get inheritLocale(){return y},set inheritLocale(t){y=t,t&&n&&(L.value=n.locale.value,E.value=n.fallbackLocale.value,N(e,L.value,E.value))},get availableLocales(){return Object.keys(I.value).sort()},messages:le,get modifiers(){return ne},get pluralRules(){return re||{}},get isGlobal(){return v},get missingWarn(){return R},set missingWarn(t){R=t,e.missingWarn=R},get fallbackWarn(){return P},set fallbackWarn(t){P=t,e.fallbackWarn=P},get fallbackRoot(){return A},set fallbackRoot(e){A=e},get fallbackFormat(){return M},set fallbackFormat(t){M=t,e.fallbackFormat=M},get warnHtmlMessage(){return ee},set warnHtmlMessage(t){ee=t,e.warnHtmlMessage=t},get escapeParameter(){return te},set escapeParameter(t){te=t,e.escapeParameter=t},t:_e,getLocaleMessage:ge,setLocaleMessage:function(t,n){if(b){var r=i({},t,n);for(var a in r)O(r,a)&&Fe(r[a]);n=r[t]}I.value[t]=n,e.messages=I.value},mergeLocaleMessage:function(t,n){I.value[t]=I.value[t]||{};var r=i({},t,n);if(b)for(var a in r)O(r,a)&&Fe(r[a]);n=r[t],k(n,I.value[t]),e.messages=I.value},getPostTranslationHandler:function(){return h(K)?K:null},setPostTranslationHandler:function(t){K=t,e.postTranslation=t},getMissingHandler:function(){return S},setMissingHandler:function(t){null!==t&&(D=xe(t)),S=t,e.missing=D}},ke,(function(t){re=t,e.pluralRules=re}));return he.datetimeFormats=se,he.numberFormats=ve,he.rt=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=t[0],a=t[1],o=t[2];if(o&&!s(o))throw Le(ye.INVALID_ARGUMENT);return _e.apply(void 0,[r,a,l({resolvedMessage:!0},o||{})])},he.te=function(t,n){return me((function(){if(!t)return!1;var r=ge(c(n)?n:L.value),a=e.messageResolver(r,t);return q(a)||Q(a)||c(a)}),(function(){return[t]}),"translate exists",(function(e){return Reflect.apply(e.te,e,[t,n])}),Se,(function(e){return f(e)}))},he.tm=function(t){var r=function(t){for(var n=null,r=W(e,E.value,L.value),a=0;a<r.length;a++){var o=I.value[r[a]]||{},l=e.messageResolver(o,t);if(null!=l){n=l;break}}return n}(t);return null!=r?r:n&&n.tm(t)||{}},he.d=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return me((function(e){return Reflect.apply(X,null,[e].concat(t))}),(function(){return B.apply(void 0,t)}),"datetime format",(function(e){return Reflect.apply(e.d,e,[].concat(t))}),(function(){return Y}),(function(e){return c(e)}))},he.n=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return me((function(e){return Reflect.apply(z,null,[e].concat(t))}),(function(){return J.apply(void 0,t)}),"number format",(function(e){return Reflect.apply(e.n,e,[].concat(t))}),(function(){return Y}),(function(e){return c(e)}))},he.getDateTimeFormat=function(e){return T.value[e]||{}},he.setDateTimeFormat=function(t,n){T.value[t]=n,e.datetimeFormats=T.value,C(e,t,n)},he.mergeDateTimeFormat=function(t,n){T.value[t]=l(T.value[t]||{},n),e.datetimeFormats=T.value,C(e,t,n)},he.getNumberFormat=function(e){return w.value[e]||{}},he.setNumberFormat=function(t,n){w.value[t]=n,e.numberFormats=w.value,U(e,t,n)},he.mergeNumberFormat=function(t,n){w.value[t]=l(w.value[t]||{},n),e.numberFormats=w.value,U(e,t,n)},he[Oe]=r,he[Ee]=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return me((function(e){var n,r=e;try{r.processor=pe,n=Reflect.apply(G,null,[r].concat(t))}finally{r.processor=null}return n}),(function(){return V.apply(void 0,t)}),"translate",(function(e){return e[Ee].apply(e,t)}),(function(e){return[Ae(e)]}),(function(e){return _(e)}))},he[Ie]=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return me((function(e){return Reflect.apply(X,null,[e].concat(t))}),(function(){return B.apply(void 0,t)}),"datetime format",(function(e){return e[Ie].apply(e,t)}),We,(function(e){return c(e)||_(e)}))},he[Te]=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return me((function(e){return Reflect.apply(z,null,[e].concat(t))}),(function(){return J.apply(void 0,t)}),"number format",(function(e){return e[Te].apply(e,t)}),We,(function(e){return c(e)||_(e)}))},he}function je(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Ue(function(e){var t=c(e.locale)?e.locale:m,n=c(e.fallbackLocale)||_(e.fallbackLocale)||p(e.fallbackLocale)||!1===e.fallbackLocale?e.fallbackLocale:t,r=h(e.missing)?e.missing:void 0,a=!f(e.silentTranslationWarn)&&!g(e.silentTranslationWarn)||!e.silentTranslationWarn,o=!f(e.silentFallbackWarn)&&!g(e.silentFallbackWarn)||!e.silentFallbackWarn,i=!f(e.fallbackRoot)||e.fallbackRoot,u=!!e.formatFallbackMessages,s=p(e.modifiers)?e.modifiers:{},v=e.pluralizationRules,b=h(e.postTranslation)?e.postTranslation:void 0,d=!c(e.warnHtmlInMessage)||"off"!==e.warnHtmlInMessage,y=!!e.escapeParameterHtml,L=!f(e.sync)||e.sync,E=e.messages;if(p(e.sharedMessages)){var I=e.sharedMessages;E=Object.keys(I).reduce((function(e,t){var n=e[t]||(e[t]={});return l(n,I[t]),e}),E||{})}var T=e.__i18n,k=e.__root,O=e.__injectWithOption,N=e.datetimeFormats,F=e.numberFormats;return{locale:t,fallbackLocale:n,messages:E,flatJson:e.flatJson,datetimeFormats:N,numberFormats:F,missing:r,missingWarn:a,fallbackWarn:o,fallbackRoot:i,fallbackFormat:u,modifiers:s,pluralRules:v,postTranslation:b,warnHtmlMessage:d,escapeParameter:y,messageResolver:e.messageResolver,inheritLocale:L,__i18n:T,__root:k,__injectWithOption:O}}(e)),n=e.__extender,r={id:t.id,get locale(){return t.locale.value},set locale(e){t.locale.value=e},get fallbackLocale(){return t.fallbackLocale.value},set fallbackLocale(e){t.fallbackLocale.value=e},get messages(){return t.messages.value},get datetimeFormats(){return t.datetimeFormats.value},get numberFormats(){return t.numberFormats.value},get availableLocales(){return t.availableLocales},get formatter(){return{interpolate:function(){return[]}}},set formatter(e){},get missing(){return t.getMissingHandler()},set missing(e){t.setMissingHandler(e)},get silentTranslationWarn(){return f(t.missingWarn)?!t.missingWarn:t.missingWarn},set silentTranslationWarn(e){t.missingWarn=f(e)?!e:e},get silentFallbackWarn(){return f(t.fallbackWarn)?!t.fallbackWarn:t.fallbackWarn},set silentFallbackWarn(e){t.fallbackWarn=f(e)?!e:e},get modifiers(){return t.modifiers},get formatFallbackMessages(){return t.fallbackFormat},set formatFallbackMessages(e){t.fallbackFormat=e},get postTranslation(){return t.getPostTranslationHandler()},set postTranslation(e){t.setPostTranslationHandler(e)},get sync(){return t.inheritLocale},set sync(e){t.inheritLocale=e},get warnHtmlInMessage(){return t.warnHtmlMessage?"warn":"off"},set warnHtmlInMessage(e){t.warnHtmlMessage="off"!==e},get escapeParameterHtml(){return t.escapeParameter},set escapeParameterHtml(e){t.escapeParameter=e},get preserveDirectiveContent(){return!0},set preserveDirectiveContent(e){},get pluralizationRules(){return t.pluralRules||{}},__composer:t,t:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];var a=n[0],o=n[1],l=n[2],i={},u=null,s=null;if(!c(a))throw Le(ye.INVALID_ARGUMENT);var f=a;return c(o)?i.locale=o:_(o)?u=o:p(o)&&(s=o),_(l)?u=l:p(l)&&(s=l),Reflect.apply(t.t,t,[f,u||s||{},i])},rt:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return Reflect.apply(t.rt,t,[].concat(n))},tc:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];var a=n[0],o=n[1],l=n[2],i={plural:1},s=null,f=null;if(!c(a))throw Le(ye.INVALID_ARGUMENT);var v=a;return c(o)?i.locale=o:u(o)?i.plural=o:_(o)?s=o:p(o)&&(f=o),c(l)?i.locale=l:_(l)?s=l:p(l)&&(f=l),Reflect.apply(t.t,t,[v,s||f||{},i])},te:function(e,n){return t.te(e,n)},tm:function(e){return t.tm(e)},getLocaleMessage:function(e){return t.getLocaleMessage(e)},setLocaleMessage:function(e,n){t.setLocaleMessage(e,n)},mergeLocaleMessage:function(e,n){t.mergeLocaleMessage(e,n)},d:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return Reflect.apply(t.d,t,[].concat(n))},getDateTimeFormat:function(e){return t.getDateTimeFormat(e)},setDateTimeFormat:function(e,n){t.setDateTimeFormat(e,n)},mergeDateTimeFormat:function(e,n){t.mergeDateTimeFormat(e,n)},n:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return Reflect.apply(t.n,t,[].concat(n))},getNumberFormat:function(e){return t.getNumberFormat(e)},setNumberFormat:function(e,n){t.setNumberFormat(e,n)},mergeNumberFormat:function(e,n){t.mergeNumberFormat(e,n)},getChoiceIndex:function(e,t){return-1}};return r.__extender=n,r}var He={tag:{type:[String,Object]},locale:{type:String},scope:{type:String,validator:function(e){return"parent"===e||"global"===e},default:"parent"},i18n:{type:Object}};function $e(e){return ve}var Ve=ee({name:"i18n-t",props:l({keypath:{type:String,required:!0},plural:{type:[Number,String],validator:function(e){return u(e)||!isNaN(e)}}},He),setup:function(e,t){var n=t.slots,a=t.attrs,o=e.i18n||tt({useScope:e.scope,__useComponent:!0});return function(){var i=Object.keys(n).filter((function(e){return"_"!==e})),u={};e.locale&&(u.locale=e.locale),void 0!==e.plural&&(u.plural=c(e.plural)?+e.plural:e.plural);var f=function(e,t){var n=e.slots;return 1===t.length&&"default"===t[0]?(n.default?n.default():[]).reduce((function(e,t){return[].concat(r(e),r(t.type===ve?t.children:[t]))}),[]):t.reduce((function(e,t){var r=n[t];return r&&(e[t]=r()),e}),{})}(t,i),v=o[Ee](e.keypath,f,u),m=l({},a),_=c(e.tag)||s(e.tag)?e.tag:$e();return te(_,m,v)}}});function Ge(e,t,n,r){var a=t.slots,o=t.attrs;return function(){var t={part:!0},u={};e.locale&&(t.locale=e.locale),c(e.format)?t.key=e.format:s(e.format)&&(c(e.format.key)&&(t.key=e.format.key),u=Object.keys(e.format).reduce((function(t,r){return n.includes(r)?l({},t,i({},r,e.format[r])):t}),{}));var f=r.apply(void 0,[e.value,t,u]),v=[t.key];_(f)?v=f.map((function(e,t){var n=a[e.type],r=n?n(i(i(i({},e.type,e.value),"index",t),"parts",f)):[e.value];return function(e){return _(e)&&!c(e[0])}(r)&&(r[0].key="".concat(e.type,"-").concat(t)),r})):c(f)&&(v=[f]);var m=l({},o),p=c(e.tag)||s(e.tag)?e.tag:$e();return te(p,m,v)}}var Ye=ee({name:"i18n-n",props:l({value:{type:Number,required:!0},format:{type:[String,Object]}},He),setup:function(e,t){var n=e.i18n||tt({useScope:"parent",__useComponent:!0});return Ge(e,t,w,(function(){return n[Te].apply(n,arguments)}))}}),Be=Ye,Xe=ee({name:"i18n-d",props:l({value:{type:[Number,Date],required:!0},format:{type:[String,Object]}},He),setup:function(e,t){var n=e.i18n||tt({useScope:"parent",__useComponent:!0});return Ge(e,t,R,(function(){return n[Ie].apply(n,arguments)}))}}),Je=Xe;function ze(e){if(c(e))return{path:e};if(p(e)){if(!("path"in e))throw Le(ye.REQUIRED_VALUE);return e}throw Le(ye.INVALID_VALUE)}function qe(e){var t=e.path,n=e.locale,r=e.args,a=e.choice,o=e.plural,l={},i=r||{};return c(n)&&(l.locale=n),u(a)&&(l.plural=a),u(o)&&(l.plural=o),[t,i,l]}function Qe(e,t){var n=p(arguments.length<=2?void 0:arguments[2])?arguments.length<=2?void 0:arguments[2]:{},o=!!n.useI18nComponentName;(!f(n.globalInstall)||n.globalInstall)&&([o?"i18n":Ve.name,"I18nT"].forEach((function(t){return e.component(t,Ve)})),[Be.name,"I18nN"].forEach((function(t){return e.component(t,Be)})),[Je.name,"I18nD"].forEach((function(t){return e.component(t,Je)}))),e.directive("t",function(e){var t=function(t){var n=t.instance,a=(t.modifiers,t.value);if(!n||!n.$)throw Le(ye.UNEXPECTED_ERROR);var o=function(e,t){var n=e;if("composition"===e.mode)return n.__getInstance(t)||e.global;var r=n.__getInstance(t);return null!=r?r.__composer:e.global.__composer}(e,n.$),l=ze(a);return[Reflect.apply(o.t,o,r(qe(l))),o]};return{created:function(n,r){var o=a(t(r),2),l=o[0],i=o[1];F&&e.global===i&&(n.__i18nWatcher=fe(i.locale,(function(){r.instance&&r.instance.$forceUpdate()}))),n.__composer=i,n.textContent=l},unmounted:function(e){F&&e.__i18nWatcher&&(e.__i18nWatcher(),e.__i18nWatcher=void 0,delete e.__i18nWatcher),e.__composer&&(e.__composer=void 0,delete e.__composer)},beforeUpdate:function(e,t){var n=t.value;if(e.__composer){var a=e.__composer,o=ze(n);e.textContent=Reflect.apply(a.t,a,r(qe(o)))}},getSSRProps:function(e){return{textContent:a(t(e),1)[0]}}}}(t))}function Ke(e,t,n){return{beforeCreate:function(){var r=this,a=ne();if(!a)throw Le(ye.UNEXPECTED_ERROR);var o=this.$options;if(o.i18n){var l=o.i18n;if(o.__i18n&&(l.__i18n=o.__i18n),l.__root=t,this===this.$root)this.$i18n=Ze(e,l);else{l.__injectWithOption=!0,l.__extender=n.__vueI18nExtend,this.$i18n=je(l);var i=this.$i18n;i.__extender&&(i.__disposer=i.__extender(this.$i18n))}}else if(o.__i18n)if(this===this.$root)this.$i18n=Ze(e,o);else{this.$i18n=je({__i18n:o.__i18n,__injectWithOption:!0,__extender:n.__vueI18nExtend,__root:t});var u=this.$i18n;u.__extender&&(u.__disposer=u.__extender(this.$i18n))}else this.$i18n=e;o.__i18nGlobal&&Pe(t,o,o),this.$t=function(){var e;return(e=r.$i18n).t.apply(e,arguments)},this.$rt=function(){var e;return(e=r.$i18n).rt.apply(e,arguments)},this.$tc=function(){var e;return(e=r.$i18n).tc.apply(e,arguments)},this.$te=function(e,t){return r.$i18n.te(e,t)},this.$d=function(){var e;return(e=r.$i18n).d.apply(e,arguments)},this.$n=function(){var e;return(e=r.$i18n).n.apply(e,arguments)},this.$tm=function(e){return r.$i18n.tm(e)},n.__setInstance(a,this.$i18n)},mounted:function(){},unmounted:function(){var e=ne();if(!e)throw Le(ye.UNEXPECTED_ERROR);var t=this.$i18n;delete this.$t,delete this.$rt,delete this.$tc,delete this.$te,delete this.$d,delete this.$n,delete this.$tm,t.__disposer&&(t.__disposer(),delete t.__disposer,delete t.__extender),n.__deleteInstance(e),delete this.$i18n}}}function Ze(e,t){e.locale=t.locale||e.locale,e.fallbackLocale=t.fallbackLocale||e.fallbackLocale,e.missing=t.missing||e.missing,e.silentTranslationWarn=t.silentTranslationWarn||e.silentFallbackWarn,e.silentFallbackWarn=t.silentFallbackWarn||e.silentFallbackWarn,e.formatFallbackMessages=t.formatFallbackMessages||e.formatFallbackMessages,e.postTranslation=t.postTranslation||e.postTranslation,e.warnHtmlInMessage=t.warnHtmlInMessage||e.warnHtmlInMessage,e.escapeParameterHtml=t.escapeParameterHtml||e.escapeParameterHtml,e.sync=t.sync||e.sync,e.__composer[ke](t.pluralizationRules||e.pluralizationRules);var n=we(e.locale,{messages:t.messages,__i18n:t.__i18n});return Object.keys(n).forEach((function(t){return e.mergeLocaleMessage(t,n[t])})),t.datetimeFormats&&Object.keys(t.datetimeFormats).forEach((function(n){return e.mergeDateTimeFormat(n,t.datetimeFormats[n])})),t.numberFormats&&Object.keys(t.numberFormats).forEach((function(n){return e.mergeNumberFormat(n,t.numberFormats[n])})),e}var et=T("global-vue-i18n");function tt(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=ne();if(null==t)throw Le(ye.MUST_BE_CALL_SETUP_TOP);if(!t.isCE&&null!=t.appContext.app&&!t.appContext.app.__VUE_I18N_SYMBOL__)throw Le(ye.NOT_INSTALLED);var n=function(e){var t=ae(e.isCE?et:e.appContext.app.__VUE_I18N_SYMBOL__);if(!t)throw Le(e.isCE?ye.NOT_INSTALLED_WITH_PROVIDE:ye.UNEXPECTED_ERROR);return t}(t),r=function(e){return"composition"===e.mode?e.global:e.global.__composer}(n),a=Re(t),o=function(e,t){return v(e)?"__i18n"in t?"local":"global":e.useScope?e.useScope:"local"}(e,a);if(__VUE_I18N_LEGACY_API__&&"legacy"===n.mode&&!e.__useComponent){if(!n.allowComposition)throw Le(ye.NOT_AVAILABLE_IN_LEGACY_MODE);return function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a="local"===t,o=ie(null);if(a&&e.proxy&&!e.proxy.$options.i18n&&!e.proxy.$options.__i18n)throw Le(ye.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);var l=f(r.inheritLocale)?r.inheritLocale:!c(r.locale),u=ue(!a||l?n.locale.value:c(r.locale)?r.locale:m),s=ue(!a||l?n.fallbackLocale.value:c(r.fallbackLocale)||_(r.fallbackLocale)||p(r.fallbackLocale)||!1===r.fallbackLocale?r.fallbackLocale:u.value),v=ue(we(u.value,r)),b=ue(p(r.datetimeFormats)?r.datetimeFormats:i({},u.value,{})),d=ue(p(r.numberFormats)?r.numberFormats:i({},u.value,{})),y=a?n.missingWarn:!f(r.missingWarn)&&!g(r.missingWarn)||r.missingWarn,L=a?n.fallbackWarn:!f(r.fallbackWarn)&&!g(r.fallbackWarn)||r.fallbackWarn,E=a?n.fallbackRoot:!f(r.fallbackRoot)||r.fallbackRoot,I=!!r.fallbackFormat,T=h(r.missing)?r.missing:null,k=h(r.postTranslation)?r.postTranslation:null,O=a?n.warnHtmlMessage:!f(r.warnHtmlMessage)||r.warnHtmlMessage,N=!!r.escapeParameter,F=a?n.modifiers:p(r.modifiers)?r.modifiers:{},w=r.pluralRules||a&&n.pluralRules;function R(){return[u.value,s.value,v.value,b.value,d.value]}var P=ce({get:function(){return o.value?o.value.locale.value:u.value},set:function(e){o.value&&(o.value.locale.value=e),u.value=e}}),A=ce({get:function(){return o.value?o.value.fallbackLocale.value:s.value},set:function(e){o.value&&(o.value.fallbackLocale.value=e),s.value=e}}),M=ce((function(){return o.value?o.value.messages.value:v.value})),W=ce((function(){return b.value})),S=ce((function(){return d.value}));function D(){return o.value?o.value.getPostTranslationHandler():k}function x(e){o.value&&o.value.setPostTranslationHandler(e)}function C(){return o.value?o.value.getMissingHandler():T}function U(e){o.value&&o.value.setMissingHandler(e)}function j(e){return R(),e()}function H(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return o.value?j((function(){return Reflect.apply(o.value.t,null,[].concat(t))})):j((function(){return""}))}function $(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return o.value?Reflect.apply(o.value.rt,null,[].concat(t)):""}function V(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return o.value?j((function(){return Reflect.apply(o.value.d,null,[].concat(t))})):j((function(){return""}))}function G(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return o.value?j((function(){return Reflect.apply(o.value.n,null,[].concat(t))})):j((function(){return""}))}function Y(e){return o.value?o.value.tm(e):{}}function B(e,t){return!!o.value&&o.value.te(e,t)}function X(e){return o.value?o.value.getLocaleMessage(e):{}}function J(e,t){o.value&&(o.value.setLocaleMessage(e,t),v.value[e]=t)}function z(e,t){o.value&&o.value.mergeLocaleMessage(e,t)}function q(e){return o.value?o.value.getDateTimeFormat(e):{}}function Q(e,t){o.value&&(o.value.setDateTimeFormat(e,t),b.value[e]=t)}function K(e,t){o.value&&o.value.mergeDateTimeFormat(e,t)}function Z(e){return o.value?o.value.getNumberFormat(e):{}}function ee(e,t){o.value&&(o.value.setNumberFormat(e,t),d.value[e]=t)}function te(e,t){o.value&&o.value.mergeNumberFormat(e,t)}var ne={get id(){return o.value?o.value.id:-1},locale:P,fallbackLocale:A,messages:M,datetimeFormats:W,numberFormats:S,get inheritLocale(){return o.value?o.value.inheritLocale:l},set inheritLocale(e){o.value&&(o.value.inheritLocale=e)},get availableLocales(){return o.value?o.value.availableLocales:Object.keys(v.value)},get modifiers(){return o.value?o.value.modifiers:F},get pluralRules(){return o.value?o.value.pluralRules:w},get isGlobal(){return!!o.value&&o.value.isGlobal},get missingWarn(){return o.value?o.value.missingWarn:y},set missingWarn(e){o.value&&(o.value.missingWarn=e)},get fallbackWarn(){return o.value?o.value.fallbackWarn:L},set fallbackWarn(e){o.value&&(o.value.missingWarn=e)},get fallbackRoot(){return o.value?o.value.fallbackRoot:E},set fallbackRoot(e){o.value&&(o.value.fallbackRoot=e)},get fallbackFormat(){return o.value?o.value.fallbackFormat:I},set fallbackFormat(e){o.value&&(o.value.fallbackFormat=e)},get warnHtmlMessage(){return o.value?o.value.warnHtmlMessage:O},set warnHtmlMessage(e){o.value&&(o.value.warnHtmlMessage=e)},get escapeParameter(){return o.value?o.value.escapeParameter:N},set escapeParameter(e){o.value&&(o.value.escapeParameter=e)},t:H,getPostTranslationHandler:D,setPostTranslationHandler:x,getMissingHandler:C,setMissingHandler:U,rt:$,d:V,n:G,tm:Y,te:B,getLocaleMessage:X,setLocaleMessage:J,mergeLocaleMessage:z,getDateTimeFormat:q,setDateTimeFormat:Q,mergeDateTimeFormat:K,getNumberFormat:Z,setNumberFormat:ee,mergeNumberFormat:te};function re(e){e.locale.value=u.value,e.fallbackLocale.value=s.value,Object.keys(v.value).forEach((function(t){e.mergeLocaleMessage(t,v.value[t])})),Object.keys(b.value).forEach((function(t){e.mergeDateTimeFormat(t,b.value[t])})),Object.keys(d.value).forEach((function(t){e.mergeNumberFormat(t,d.value[t])})),e.escapeParameter=N,e.fallbackFormat=I,e.fallbackRoot=E,e.fallbackWarn=L,e.missingWarn=y,e.warnHtmlMessage=O}return se((function(){if(null==e.proxy||null==e.proxy.$i18n)throw Le(ye.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);var n=o.value=e.proxy.$i18n.__composer;"global"===t?(u.value=n.locale.value,s.value=n.fallbackLocale.value,v.value=n.messages.value,b.value=n.datetimeFormats.value,d.value=n.numberFormats.value):a&&re(n)})),ne}(t,o,r,e)}if("global"===o)return Pe(r,e,a),r;if("parent"===o){var u=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=null,a=t.root,o=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(null==e)return null;return t&&e.vnode.ctx||e.parent}(t,n);for(;null!=o;){var l=e;if("composition"===e.mode)r=l.__getInstance(o);else if(__VUE_I18N_LEGACY_API__){var i=l.__getInstance(o);null!=i&&(r=i.__composer,n&&r&&!r[Oe]&&(r=null))}if(null!=r)break;if(a===o)break;o=o.parent}return r}(n,t,e.__useComponent);return null==u&&(u=r),u}var s=n,b=s.__getInstance(t);if(null==b){var d=l({},e);"__i18n"in a&&(d.__i18n=a.__i18n),r&&(d.__root=r),b=Ue(d),s.__composerExtend&&(b[Ne]=s.__composerExtend(b)),function(e,t,n){oe((function(){}),t),le((function(){var r=n;e.__deleteInstance(t);var a=r[Ne];a&&(a(),delete r[Ne])}),t)}(s,t,b),s.__setInstance(t,b)}return b}var nt=["locale","fallbackLocale","availableLocales"],rt=["t","rt","d","n","tm","te"];function at(e,t){var n=Object.create(null);nt.forEach((function(e){var r=Object.getOwnPropertyDescriptor(t,e);if(!r)throw Le(ye.UNEXPECTED_ERROR);var a=me(r.value)?{get:function(){return r.value.value},set:function(e){r.value.value=e}}:{get:function(){return r.get&&r.get()}};Object.defineProperty(n,e,a)})),e.config.globalProperties.$i18n=n,rt.forEach((function(n){var r=Object.getOwnPropertyDescriptor(t,n);if(!r||!r.value)throw Le(ye.UNEXPECTED_ERROR);Object.defineProperty(e.config.globalProperties,"$".concat(n),r)}));return function(){delete e.config.globalProperties.$i18n,rt.forEach((function(t){delete e.config.globalProperties["$".concat(t)]}))}}if("boolean"!=typeof __VUE_I18N_FULL_INSTALL__&&(L().__VUE_I18N_FULL_INSTALL__=!0),"boolean"!=typeof __VUE_I18N_LEGACY_API__&&(L().__VUE_I18N_LEGACY_API__=!0),"boolean"!=typeof __INTLIFY_JIT_COMPILATION__&&(L().__INTLIFY_JIT_COMPILATION__=!1),"boolean"!=typeof __INTLIFY_DROP_MESSAGE_COMPILER__&&(L().__INTLIFY_DROP_MESSAGE_COMPILER__=!1),"boolean"!=typeof __INTLIFY_PROD_DEVTOOLS__&&(L().__INTLIFY_PROD_DEVTOOLS__=!1),__INTLIFY_JIT_COMPILATION__?b(P):b(A),d(M),y(W),__INTLIFY_PROD_DEVTOOLS__){var ot=L();ot.__INTLIFY__=!0,E(ot.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__)}}}}))}();