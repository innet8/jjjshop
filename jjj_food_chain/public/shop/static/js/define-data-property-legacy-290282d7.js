!function(){function e(n){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(n)}System.register(["./has-property-descriptors-legacy-1e05bb01.js","./get-intrinsic-legacy-c0201930.js","./gopd-legacy-0da6a62b.js"],(function(n,o){"use strict";var t,r,l;return{setters:[function(e){t=e.h},function(e){r=e.g},function(e){l=e.g}],execute:function(){var o=t(),i=r,u=o&&i("%Object.defineProperty%",!0);if(u)try{u({},"a",{value:1})}catch(c){u=!1}var a=i("%SyntaxError%"),f=i("%TypeError%"),b=l;n("d",(function(n,o,t){if(!n||"object"!==e(n)&&"function"!=typeof n)throw new f("`obj` must be an object or a function`");if("string"!=typeof o&&"symbol"!==e(o))throw new f("`property` must be a string or a symbol`");if(arguments.length>3&&"boolean"!=typeof arguments[3]&&null!==arguments[3])throw new f("`nonEnumerable`, if provided, must be a boolean or null");if(arguments.length>4&&"boolean"!=typeof arguments[4]&&null!==arguments[4])throw new f("`nonWritable`, if provided, must be a boolean or null");if(arguments.length>5&&"boolean"!=typeof arguments[5]&&null!==arguments[5])throw new f("`nonConfigurable`, if provided, must be a boolean or null");if(arguments.length>6&&"boolean"!=typeof arguments[6])throw new f("`loose`, if provided, must be a boolean");var r=arguments.length>3?arguments[3]:null,l=arguments.length>4?arguments[4]:null,i=arguments.length>5?arguments[5]:null,c=arguments.length>6&&arguments[6],s=!!b&&b(n,o);if(u)u(n,o,{configurable:null===i&&s?s.configurable:!i,enumerable:null===r&&s?s.enumerable:!r,value:t,writable:null===l&&s?s.writable:!l});else{if(!c&&(r||l||i))throw new a("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");n[o]=t}}))}}}))}();