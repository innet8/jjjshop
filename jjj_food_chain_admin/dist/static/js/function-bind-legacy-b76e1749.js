System.register([],(function(t,n){"use strict";return{execute:function(){var n=Array.prototype.slice,o=Object.prototype.toString,r=function(t){var r=this;if("function"!=typeof r||"[object Function]"!==o.call(r))throw new TypeError("Function.prototype.bind called on incompatible "+r);for(var e,i=n.call(arguments,1),c=Math.max(0,r.length-i.length),p=[],u=0;u<c;u++)p.push("$"+u);if(e=Function("binder","return function ("+p.join(",")+"){ return binder.apply(this,arguments); }")((function(){if(this instanceof e){var o=r.apply(this,i.concat(n.call(arguments)));return Object(o)===o?o:this}return r.apply(t,i.concat(n.call(arguments)))})),r.prototype){var a=function(){};a.prototype=r.prototype,e.prototype=new a,a.prototype=null}return e};t("f",Function.prototype.bind||r)}}}));