!function(){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,n)}return l}function l(t,l,n){var u;return u=function(t,l){if("object"!=e(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var u=n.call(t,l||"default");if("object"!=e(u))return u;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===l?String:Number)(t)}(l,"string"),(l="symbol"==e(u)?u:String(u))in t?Object.defineProperty(t,l,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[l]=n,t}System.register(["./index-legacy-b87a1ee0.js","./index-legacy-aa3b3a65.js","./index-legacy-4289978b.js","./_plugin-vue_export-helper-legacy-61c4c9d1.js","./@vue-legacy-8ef99c9b.js","./vue-router-legacy-a8f66a40.js","./pinia-legacy-e8a51700.js","./axios-legacy-dedee0c6.js","./qs-legacy-ef5ed4ac.js","./call-bind-legacy-8954b3d2.js","./get-intrinsic-legacy-c0201930.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./hasown-legacy-8325a62b.js","./set-function-length-legacy-e4fe6823.js","./define-data-property-legacy-290282d7.js","./has-property-descriptors-legacy-1e05bb01.js","./gopd-legacy-0da6a62b.js","./side-channel-legacy-4a7c29a7.js","./object-inspect-legacy-a5678b81.js","./element-plus-legacy-ce5c473b.js","./lodash-es-legacy-de50a096.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-3353583a.js","./@element-plus-legacy-91437698.js","./dayjs-legacy-0ff6bb75.js","./@popperjs-legacy-876caf52.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-d36ae666.js","./vue-i18n-legacy-a195b753.js","./@intlify-legacy-7f6e5bc9.js","./live-legacy-e84c423f.js","./LiveProduct-legacy-ef036907.js","./ImportProduct-legacy-94fb782a.js","./Add-legacy-a31fb57b.js","./Upload-legacy-1821f791.js","./file-legacy-7b1619be.js","./vue-cropperjs-legacy-7166d149.js","./vue-legacy-ae59173d.js","./cropperjs-legacy-9cfc33ae.js","./Edit-legacy-f5c0bdef.js","./add-legacy-a0559c72.js","./group-legacy-033bf282.js","./edit-legacy-4ca7db44.js"],(function(e,n){"use strict";var u,a,r,s,c,i,o,y,p,g,j,f;return{setters:[function(e){u=e.u},function(e){a=e.default},function(e){r=e.default},function(e){s=e._},function(e){c=e.d,i=e.J,o=e.K,y=e.af,p=e.o,g=e.c,j=e.S,f=e.X},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var n=c({components:{Room:a,ProductIndex:r},setup:function(){var e=u(),n=e.bus_emit,a=e.bus_off,r=e.bus_on,s=i({bus_emit:n,bus_off:a,bus_on:r,loading:!0,form:{},param:{},activeName:"",sourceList:[{key:"room",value:"直播房间",path:"/plus/live/room"},{key:"product",value:"直播商品",path:"/plus/live/product"}],tabList:[],paramsFlag:!1});return function(e){for(var n=1;n<arguments.length;n++){var u=null!=arguments[n]?arguments[n]:{};n%2?t(Object(u),!0).forEach((function(t){l(e,t,u[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(u)):t(Object(u)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(u,t))}))}return e}({},o(s))},created:function(){var e=this;this.tabList=this.sourceList,this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(function(t){e.activeName=t}));var t={active:this.activeName,list:this.tabList,tab_type:"live"};this.bus_emit("tabData",t)},beforeUnmount:function(){this.bus_emit("tabData",{active:null,tab_type:"live",list:[]}),this.bus_off("activeValue")},methods:{}}),b={class:"common-seach-wrap"};e("default",s(n,[["render",function(e,t,l,n,u,a){var r=y("Room"),s=y("ProductIndex");return p(),g("div",b,["room"==e.activeName?(p(),j(r,{key:0})):f("",!0),"product"==e.activeName?(p(),j(s,{key:1})):f("",!0)])}]]))}}}))}();
