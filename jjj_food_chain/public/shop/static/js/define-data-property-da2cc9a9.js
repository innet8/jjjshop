import{h as e}from"./has-property-descriptors-2aeb73fe.js";import{g as o}from"./get-intrinsic-878e88ff.js";import{g as n}from"./gopd-15a2da42.js";var r=o,l=e()&&r("%Object.defineProperty%",!0);if(l)try{l({},"a",{value:1})}catch(b){l=!1}var t=r("%SyntaxError%"),a=r("%TypeError%"),i=n,f=function(e,o,n){if(!e||"object"!=typeof e&&"function"!=typeof e)throw new a("`obj` must be an object or a function`");if("string"!=typeof o&&"symbol"!=typeof o)throw new a("`property` must be a string or a symbol`");if(arguments.length>3&&"boolean"!=typeof arguments[3]&&null!==arguments[3])throw new a("`nonEnumerable`, if provided, must be a boolean or null");if(arguments.length>4&&"boolean"!=typeof arguments[4]&&null!==arguments[4])throw new a("`nonWritable`, if provided, must be a boolean or null");if(arguments.length>5&&"boolean"!=typeof arguments[5]&&null!==arguments[5])throw new a("`nonConfigurable`, if provided, must be a boolean or null");if(arguments.length>6&&"boolean"!=typeof arguments[6])throw new a("`loose`, if provided, must be a boolean");var r=arguments.length>3?arguments[3]:null,f=arguments.length>4?arguments[4]:null,b=arguments.length>5?arguments[5]:null,u=arguments.length>6&&arguments[6],p=!!i&&i(e,o);if(l)l(e,o,{configurable:null===b&&p?p.configurable:!b,enumerable:null===r&&p?p.enumerable:!r,value:n,writable:null===f&&p?p.writable:!f});else{if(!u&&(r||f||b))throw new t("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");e[o]=n}};export{f as d};
