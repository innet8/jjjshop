!function(){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,n)}return l}function l(t,l,n){return(l=function(t){var l=function(t,l){if("object"!==e(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,l||"default");if("object"!==e(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===l?String:Number)(t)}(t,"string");return"symbol"===e(l)?l:String(l)}(l))in t?Object.defineProperty(t,l,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[l]=n,t}System.register(["./index-legacy-40cb594f.js","./index-legacy-a0a0fdbb.js","./index-legacy-5d2862cd.js","./index-legacy-d5e19573.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-517223d5.js","./vue-router-legacy-57460840.js","./pinia-legacy-b89d16df.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./call-bind-legacy-73eeac96.js","./object-inspect-legacy-fcd55e63.js","./element-plus-legacy-b61989a6.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-fb79f073.js","./vue-i18n-legacy-859a0eb8.js","./@intlify-legacy-d0534b73.js","./points-legacy-233e5694.js","./Add-legacy-f97c76ce.js","./Upload-legacy-9d62534a.js","./file-legacy-1eb80b22.js","./vue-cropperjs-legacy-6f5c6c93.js","./vue-legacy-91aae751.js","./cropperjs-legacy-836916f5.js","./Edit-legacy-72baecd8.js"],(function(e,n){"use strict";var r,u,i,a,s,c,o,y,p,g,f,j,b;return{setters:[function(e){r=e.u},function(e){u=e.default},function(e){i=e.default},function(e){a=e.default},function(e){s=e._},function(e){c=e.F,o=e.K,y=e.L,p=e.ag,g=e.o,f=e.c,j=e.T,b=e.Y},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var n=c({components:{Productindex:u,Order:i,Categoryindex:a},setup:function(){var e=r(),n=e.bus_emit,u=e.bus_off,i=e.bus_on,a=o({bus_emit:n,bus_off:u,bus_on:i,param:{},activeName:"product",sourceList:[{key:"product",value:"商品设置",path:"/plus/points/product/index"},{key:"category",value:"商品分类",path:"/plus/points/category/index"},{key:"order",value:"兑换记录",path:"/plus/points/order/index"}],tabList:[]});return function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?t(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},y(a))},created:function(){var e=this;this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(function(t){e.activeName=t}));var t={active:this.activeName,list:this.tabList,tab_type:"points"};this.bus_emit("tabData",t)},beforeUnmount:function(){this.bus_emit("tabData",{active:null,tab_type:"points",list:[]}),this.bus_off("activeValue")},methods:{authFilter:function(){for(var e=[],t=0;t<this.sourceList.length;t++){var l=this.sourceList[t];this.$filter.isAuth(l.path)&&e.push(l)}return e}}});e("default",s(n,[["render",function(e,t,l,n,r,u){var i=p("Productindex"),a=p("Order"),s=p("Categoryindex");return g(),f("div",null,["product"==e.activeName?(g(),j(i,{key:0})):b("",!0),"order"==e.activeName?(g(),j(a,{key:1})):b("",!0),"category"==e.activeName?(g(),j(s,{key:2})):b("",!0)])}]]))}}}))}();
