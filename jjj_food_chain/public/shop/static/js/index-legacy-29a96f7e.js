!function(){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,n)}return l}function l(t,l,n){var i;return i=function(t,l){if("object"!=e(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,l||"default");if("object"!=e(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===l?String:Number)(t)}(l,"string"),(l="symbol"==e(i)?i:String(i))in t?Object.defineProperty(t,l,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[l]=n,t}System.register(["./index-legacy-3840dc11.js","./index-legacy-62e97bf1.js","./index-legacy-00382dc3.js","./_plugin-vue_export-helper-legacy-61c4c9d1.js","./@vue-legacy-8ef99c9b.js","./vue-router-legacy-a8f66a40.js","./pinia-legacy-e8a51700.js","./axios-legacy-dedee0c6.js","./qs-legacy-334feae6.js","./call-bind-legacy-8954b3d2.js","./get-intrinsic-legacy-c0201930.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./hasown-legacy-8325a62b.js","./set-function-length-legacy-e4fe6823.js","./define-data-property-legacy-290282d7.js","./has-property-descriptors-legacy-1e05bb01.js","./gopd-legacy-0da6a62b.js","./side-channel-legacy-19dc2798.js","./object-inspect-legacy-a5678b81.js","./element-plus-legacy-6adc2ffc.js","./lodash-es-legacy-de50a096.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-3353583a.js","./@element-plus-legacy-91437698.js","./dayjs-legacy-0ff6bb75.js","./@popperjs-legacy-876caf52.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-d36ae666.js","./vue-i18n-legacy-a195b753.js","./@intlify-legacy-7f6e5bc9.js","./addEdit-legacy-b27768e2.js","./product-legacy-bcf1bb16.js","./productList-legacy-181c5952.js"],(function(e,n){"use strict";var i,s,u,r,a,c,o,y,f,p,g,b;return{setters:[function(e){i=e.u},function(e){s=e.default},function(e){u=e.default},function(e){r=e._},function(e){a=e.d,c=e.J,o=e.K,y=e.af,f=e.o,p=e.c,g=e.S,b=e.X},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var n=a({components:{list:s,setting:u},setup:function(){var e=i(),n=e.bus_emit,s=e.bus_off,u=e.bus_on,r=c({bus_emit:n,bus_off:s,bus_on:u,loading:!0,form:{},param:{},activeName:"list",sourceList:[{key:"list",value:$t("自助餐"),path:"/product/buffet/list/index"},{key:"setting",value:$t("自助餐设置"),path:"/product/buffet/setting/index"}],tabList:[]});return function(e){for(var n=1;n<arguments.length;n++){var i=null!=arguments[n]?arguments[n]:{};n%2?t(Object(i),!0).forEach((function(t){l(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):t(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}({},o(r))},mounted:function(){var e=this;this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(function(t){e.activeName=t}));var t={active:this.activeName,list:this.tabList,tab_type:"buffetproduct"};this.bus_emit("tabData",t)},beforeUnmount:function(){this.bus_emit("tabData",{active:null,tab_type:"buffetproduct",list:[]}),this.bus_off("activeValue")},methods:{authFilter:function(){for(var e=[],t=0;t<this.sourceList.length;t++){var l=this.sourceList[t];this.$filter.isAuth(l.path)&&e.push(l)}return e}}}),j={class:"common-seach-wrap"};e("default",r(n,[["render",function(e,t,l,n,i,s){var u=y("list"),r=y("setting");return f(),p("div",j,["list"==e.activeName?(f(),g(u,{key:0})):b("",!0),"setting"==e.activeName?(f(),g(r,{key:1})):b("",!0)])}]]))}}}))}();