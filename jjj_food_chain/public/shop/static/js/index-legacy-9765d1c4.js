!function(){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,n)}return l}function l(t,l,n){return(l=function(t){var l=function(t,l){if("object"!==e(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var u=n.call(t,l||"default");if("object"!==e(u))return u;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===l?String:Number)(t)}(t,"string");return"symbol"===e(l)?l:String(l)}(l))in t?Object.defineProperty(t,l,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[l]=n,t}System.register(["./index-legacy-5f737d0b.js","./index-legacy-d5323d98.js","./index-legacy-a65290f1.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-517223d5.js","./vue-router-legacy-57460840.js","./pinia-legacy-b89d16df.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./call-bind-legacy-73eeac96.js","./object-inspect-legacy-fcd55e63.js","./element-plus-legacy-b61989a6.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-fb79f073.js","./vue-i18n-legacy-859a0eb8.js","./@intlify-legacy-d0534b73.js","./live-legacy-9cfdb1b2.js","./LiveProduct-legacy-8e5523a0.js","./ImportProduct-legacy-46d99ead.js","./Add-legacy-569c262a.js","./Upload-legacy-18641221.js","./file-legacy-0f3bb606.js","./vue-cropperjs-legacy-6f5c6c93.js","./vue-legacy-91aae751.js","./cropperjs-legacy-836916f5.js","./Edit-legacy-bf2f06aa.js","./add-legacy-34e13869.js","./group-legacy-d1c4b0a7.js","./edit-legacy-f5e054b8.js"],(function(e,n){"use strict";var u,a,r,s,i,c,o,y,g,j,p,f;return{setters:[function(e){u=e.u},function(e){a=e.default},function(e){r=e.default},function(e){s=e._},function(e){i=e.F,c=e.K,o=e.L,y=e.ag,g=e.o,j=e.c,p=e.T,f=e.Y},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var n=i({components:{Room:a,ProductIndex:r},setup:function(){var e=u(),n=e.bus_emit,a=e.bus_off,r=e.bus_on,s=c({bus_emit:n,bus_off:a,bus_on:r,loading:!0,form:{},param:{},activeName:"",sourceList:[{key:"room",value:"直播房间",path:"/plus/live/room"},{key:"product",value:"直播商品",path:"/plus/live/product"}],tabList:[],paramsFlag:!1});return function(e){for(var n=1;n<arguments.length;n++){var u=null!=arguments[n]?arguments[n]:{};n%2?t(Object(u),!0).forEach((function(t){l(e,t,u[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(u)):t(Object(u)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(u,t))}))}return e}({},o(s))},created:function(){var e=this;this.tabList=this.sourceList,this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(function(t){e.activeName=t}));var t={active:this.activeName,list:this.tabList,tab_type:"live"};this.bus_emit("tabData",t)},beforeUnmount:function(){this.bus_emit("tabData",{active:null,tab_type:"live",list:[]}),this.bus_off("activeValue")},methods:{}}),b={class:"common-seach-wrap"};e("default",s(n,[["render",function(e,t,l,n,u,a){var r=y("Room"),s=y("ProductIndex");return g(),j("div",b,["room"==e.activeName?(g(),p(r,{key:0})):f("",!0),"product"==e.activeName?(g(),p(s,{key:1})):f("",!0)])}]]))}}}))}();
