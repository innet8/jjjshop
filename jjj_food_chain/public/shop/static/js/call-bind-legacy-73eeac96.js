System.register(["./get-intrinsic-legacy-4661647d.js","./function-bind-legacy-a8d405fe.js"],(function(e,t){"use strict";var n,r;return{setters:[function(e){n=e.g},function(e){r=e.f}],execute:function(){e({b:function(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e},g:function(e){if(e.__esModule)return e;var t=e.default;if("function"==typeof t){var n=function e(){if(this instanceof e){var n=[null];return n.push.apply(n,arguments),new(Function.bind.apply(t,n))}return t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach((function(t){var r=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(n,t,r.get?r:{enumerable:!0,get:function(){return e[t]}})})),n}}),e("c","undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{});var t={};!function(e){var t=r,o=n,u=o("%Function.prototype.apply%"),i=o("%Function.prototype.call%"),p=o("%Reflect.apply%",!0)||t.call(i,u),l=o("%Object.getOwnPropertyDescriptor%",!0),a=o("%Object.defineProperty%",!0),c=o("%Math.max%");if(a)try{a({},"a",{value:1})}catch(s){a=null}e.exports=function(e){var n=p(t,i,arguments);return l&&a&&l(n,"length").configurable&&a(n,"length",{value:1+c(0,e.length-(arguments.length-1))}),n};var f=function(){return p(t,u,arguments)};a?a(e.exports,"apply",{value:f}):e.exports.apply=f}({get exports(){return t},set exports(e){t=e}});var o=n,u=t,i=u(o("String.prototype.indexOf"));e("a",(function(e,t){var n=o(e,!!t);return"function"==typeof n&&i(e,".prototype.")>-1?u(n):n}))}}}));