import{g as t}from"./get-intrinsic-878e88ff.js";import{d as r}from"./define-data-property-da2cc9a9.js";import{h as e}from"./has-property-descriptors-2aeb73fe.js";import{g as o}from"./gopd-15a2da42.js";var i=t,n=r,s=e(),a=o,f=i("%TypeError%"),p=i("%Math.floor%"),g=function(t,r){if("function"!=typeof t)throw new f("`fn` is not a function");if("number"!=typeof r||r<0||r>4294967295||p(r)!==r)throw new f("`length` must be a positive 32-bit integer");var e=arguments.length>2&&!!arguments[2],o=!0,i=!0;if("length"in t&&a){var g=a(t,"length");g&&!g.configurable&&(o=!1),g&&!g.writable&&(i=!1)}return(o||i||!e)&&(s?n(t,"length",r,!0,!0):n(t,"length",r)),t};export{g as s};
