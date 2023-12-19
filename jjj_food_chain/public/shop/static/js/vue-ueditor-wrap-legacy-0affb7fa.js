System.register(["./@vue-legacy-11820b46.js"],(function(e,n){"use strict";var t,r,i,o,s,u,d,c;return{setters:[function(e){t=e.F,r=e.r,i=e.I,o=e.w,s=e.a7,u=e.z,d=e.P,c=e.n}],execute:function(){var n,a=function(){function e(){this.listeners={}}var n=e.prototype;return n.on=function(e,n){void 0===this.listeners[e]&&(this.listeners[e]={triggered:!1,requested:!1,cbs:[]}),this.listeners[e].triggered&&n(),this.listeners[e].cbs.push(n)},n.emit=function(e){this.listeners[e]&&(this.listeners[e].triggered=!0,this.listeners[e].cbs.forEach((function(e){return e()})))},e}(),l=t({name:"vue-ueditor-wrap",props:{editorId:String,name:String,modelValue:{type:String,default:""},config:Object,mode:{type:String,default:"observer",validator:function(e){return-1!==["observer","listener"].indexOf(e)}},observerOptions:{type:Object,default:function(){return{attributes:!0,attributeFilter:["src","style","type","name"],characterData:!0,childList:!0,subtree:!0}}},observerDebounceTime:{type:Number,default:50,validator:function(e){return e>=20}},forceInit:Boolean,destroy:{type:Boolean,default:!0},editorDependencies:{type:Array},editorDependenciesChecker:{type:Function}},emits:["update:modelValue","before-init","ready"],setup:function(e,n){var t,l,f,m=n.emit,p="UN_READY",v="PENDING",w="READY",h=p,E=r(),g=["ueditor.config.js","ueditor.all.min.js"],y=i(e,"modelValue");window.$loadEventBus||(window.$loadEventBus=new a);var b=function(){return new Promise((function(n,t){if(e.editorDependencies&&e.editorDependenciesChecker&&e.editorDependenciesChecker())n();else if(!e.editorDependencies&&window.UE&&window.UE.getEditor&&window.UEDITOR_CONFIG&&0!==Object.keys(window.UEDITOR_CONFIG).length)n();else{var r,i=(e.editorDependencies||g).reduce((function(n,t){var r;return/^((https?:)?\/\/)?[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)+\//.test(t)||(t=((null==(r=e.config)?void 0:r.UEDITOR_HOME_URL)||"")+t),".js"===t.slice(-3)?n.jsLinks.push(t):".css"===t.slice(-4)&&n.cssLinks.push(t),n}),{jsLinks:[],cssLinks:[]}),o=i.jsLinks,s=i.cssLinks;Promise.all([Promise.all(s.map((function(e){return function(e){return new Promise((function(n,t){if(window.$loadEventBus.on(e,n),!1===window.$loadEventBus.listeners[e].requested){window.$loadEventBus.listeners[e].requested=!0;var r=document.createElement("link");r.type="text/css",r.rel="stylesheet",r.href=e,r.onload=function(){window.$loadEventBus.emit(e)},r.onerror=t,document.getElementsByTagName("head")[0].appendChild(r)}}))}(e)}))),(r=o.map((function(e){return function(){return function(e){return new Promise((function(n,t){if(window.$loadEventBus.on(e,n),!1===window.$loadEventBus.listeners[e].requested){window.$loadEventBus.listeners[e].requested=!0;var r=document.createElement("script");r.src=e,r.onload=function(){window.$loadEventBus.emit(e)},r.onerror=t,document.getElementsByTagName("head")[0].appendChild(r)}}))}(e)}})),r.reduce((function(e,n){return e.then(n)}),Promise.resolve()))]).then((function(){return n()})).catch(t)}}))},D=function(){f=t.getContent(),m("update:modelValue",f)},O=function(){t.document.getElementById("baidu_pastebin")||(f=t.getContent(),m("update:modelValue",f))},B=function(){var n,r,i,o;l=new MutationObserver((n=O,r=e.observerDebounceTime,o=function(){for(var e=this,t=arguments.length,o=new Array(t),s=0;s<t;s++)o[s]=arguments[s];i&&clearTimeout(i),i=setTimeout((function(){n.apply(e,o)}),r)},o.cancel=function(){void 0!==i&&clearTimeout(i)},o)),l.observe(t.body,e.observerOptions)},C=function(){var n=e.editorId||"editor_"+function(e){for(var n="abcdefghijklmnopqrstuvwxyz",t="",r=0;r<e;r++)t+=n.charAt(Math.floor(26*Math.random()));return t}(8);E.value.id=n,m("before-init",n),(t=window.UE.getEditor(n,e.config)).addListener("ready",(function(){h===w?t.setContent(e.modelValue):(h=w,m("ready",t),e.modelValue&&t.setContent(e.modelValue)),"observer"===e.mode&&window.MutationObserver?B():t.addListener("contentChange",D)}))};return o(y,(function(n){h===p?(h=v,(e.forceInit||"undefined"!=typeof window)&&b().then((function(){E.value?C():c((function(){return C()}))})).catch((function(){throw new Error("[vue-ueditor-wrap] UEditor 资源加载失败！请检查资源是否存在，UEDITOR_HOME_URL 是否配置正确！")}))):h===w&&(n===f||t.setContent(n||""))}),{immediate:!0}),s((function(){t&&t.removeListener("contentChange",D),l&&l.disconnect()})),u((function(){l&&l.disconnect&&l.disconnect(),e.destroy&&t&&t.destroy&&t.destroy()})),function(){return d("div",null,[d("div",{ref:E,name:e.name},null)])}}}),f=((n=l).install=function(e){var t=n.name;e.component(t,n),e.component(("-"+t).replace(/-(\w)/g,(function(e,n){return n?n.toUpperCase():""})),n)},n);e("V",{install:function(e){[f].forEach((function(n){n.install?e.use(n):n.name&&e.component(n.name,n)}))},version:"3.0.8"})}}}));
