!function(){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,n)}return l}function l(t,l,n){var r;return r=function(t,l){if("object"!=e(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,l||"default");if("object"!=e(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===l?String:Number)(t)}(l,"string"),(l="symbol"==e(r)?r:String(r))in t?Object.defineProperty(t,l,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[l]=n,t}System.register(["./index-legacy-ab5b423a.js","./index-legacy-f75b24a7.js","./index-legacy-1920cc06.js","./index-legacy-0850991d.js","./_plugin-vue_export-helper-legacy-61c4c9d1.js","./@vue-legacy-8ef99c9b.js","./vue-router-legacy-a8f66a40.js","./pinia-legacy-e8a51700.js","./axios-legacy-dedee0c6.js","./qs-legacy-334feae6.js","./call-bind-legacy-8954b3d2.js","./get-intrinsic-legacy-c0201930.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./hasown-legacy-8325a62b.js","./set-function-length-legacy-e4fe6823.js","./define-data-property-legacy-290282d7.js","./has-property-descriptors-legacy-1e05bb01.js","./gopd-legacy-0da6a62b.js","./side-channel-legacy-19dc2798.js","./object-inspect-legacy-a5678b81.js","./element-plus-legacy-6adc2ffc.js","./lodash-es-legacy-de50a096.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-3353583a.js","./@element-plus-legacy-91437698.js","./dayjs-legacy-0ff6bb75.js","./@popperjs-legacy-876caf52.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-d36ae666.js","./vue-i18n-legacy-a195b753.js","./@intlify-legacy-7f6e5bc9.js","./points-legacy-5b0fa9e1.js","./Add-legacy-ffb96cf1.js","./Upload-legacy-b390a115.js","./file-legacy-2b4e2944.js","./vue-cropperjs-legacy-7166d149.js","./vue-legacy-ae59173d.js","./cropperjs-legacy-9cfc33ae.js","./Edit-legacy-f4011ad7.js"],(function(e,n){"use strict";var r,i,u,s,a,c,o,y,p,g,f,j,b;return{setters:[function(e){r=e.u},function(e){i=e.default},function(e){u=e.default},function(e){s=e.default},function(e){a=e._},function(e){c=e.d,o=e.J,y=e.K,p=e.af,g=e.o,f=e.c,j=e.S,b=e.X},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var n=c({components:{Productindex:i,Order:u,Categoryindex:s},setup:function(){var e=r(),n=e.bus_emit,i=e.bus_off,u=e.bus_on,s=o({bus_emit:n,bus_off:i,bus_on:u,param:{},activeName:"product",sourceList:[{key:"product",value:"商品设置",path:"/plus/points/product/index"},{key:"category",value:"商品分类",path:"/plus/points/category/index"},{key:"order",value:"兑换记录",path:"/plus/points/order/index"}],tabList:[]});return function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?t(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},y(s))},created:function(){var e=this;this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(function(t){e.activeName=t}));var t={active:this.activeName,list:this.tabList,tab_type:"points"};this.bus_emit("tabData",t)},beforeUnmount:function(){this.bus_emit("tabData",{active:null,tab_type:"points",list:[]}),this.bus_off("activeValue")},methods:{authFilter:function(){for(var e=[],t=0;t<this.sourceList.length;t++){var l=this.sourceList[t];this.$filter.isAuth(l.path)&&e.push(l)}return e}}});e("default",a(n,[["render",function(e,t,l,n,r,i){var u=p("Productindex"),s=p("Order"),a=p("Categoryindex");return g(),f("div",null,["product"==e.activeName?(g(),j(u,{key:0})):b("",!0),"order"==e.activeName?(g(),j(s,{key:1})):b("",!0),"category"==e.activeName?(g(),j(a,{key:2})):b("",!0)])}]]))}}}))}();
