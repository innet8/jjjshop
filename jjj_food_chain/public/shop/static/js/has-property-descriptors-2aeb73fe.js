import{g as r}from"./get-intrinsic-878e88ff.js";var t=r("%Object.defineProperty%",!0),e=function(){if(t)try{return t({},"a",{value:1}),!0}catch(r){return!1}return!1};e.hasArrayLengthDefineBug=function(){if(!e())return null;try{return 1!==t([],"length",{value:1}).length}catch(r){return!0}};var n=e;export{n as h};