System.register(["./element-plus-legacy-6adc2ffc.js","./plus-legacy-c9925c19.js","./Basic-legacy-3cfb537d.js","./Condition-legacy-6afc1bf9.js","./Commission-legacy-fe2a19be.js","./Settlement-legacy-8259e0ec.js","./Words-legacy-7a50389e.js","./License-legacy-4cc74c09.js","./Background-legacy-26a31e91.js","./_plugin-vue_export-helper-legacy-61c4c9d1.js","./@vue-legacy-8ef99c9b.js","./lodash-es-legacy-de50a096.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-3353583a.js","./@element-plus-legacy-91437698.js","./dayjs-legacy-0ff6bb75.js","./call-bind-legacy-8954b3d2.js","./get-intrinsic-legacy-c0201930.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./hasown-legacy-8325a62b.js","./set-function-length-legacy-e4fe6823.js","./define-data-property-legacy-290282d7.js","./has-property-descriptors-legacy-1e05bb01.js","./gopd-legacy-0da6a62b.js","./@popperjs-legacy-876caf52.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./index-legacy-0842a6da.js","./vue-router-legacy-a8f66a40.js","./pinia-legacy-e8a51700.js","./axios-legacy-dedee0c6.js","./qs-legacy-334feae6.js","./side-channel-legacy-19dc2798.js","./object-inspect-legacy-a5678b81.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-d36ae666.js","./vue-i18n-legacy-a195b753.js","./@intlify-legacy-7f6e5bc9.js","./Product-legacy-1816dac0.js","./product-legacy-e17b96ae.js","./Upload-legacy-07fe381d.js","./file-legacy-9bb3752e.js","./vue-cropperjs-legacy-7166d149.js","./vue-legacy-ae59173d.js","./cropperjs-legacy-9cfc33ae.js"],(function(e,l){"use strict";var a,t,n,s,i,c,u,o,g,y,r,d,j,m,f,p,v,D,h,b;return{setters:[function(e){a=e.I,t=e.J,n=e.v},function(e){s=e.P},function(e){i=e.default},function(e){c=e.default},function(e){u=e.default},function(e){o=e.default},function(e){g=e.default},function(e){y=e.default},function(e){r=e.default},function(e){d=e._},function(e){j=e.af,m=e._,f=e.o,p=e.c,v=e.O,D=e.R,h=e.S,b=e.X},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){e("default",d({components:{Basic:i,Condition:c,Commission:u,Settlement:o,Words:g,License:y,Background:r},data:function(){return{loading:!0,activeName:"",settingData:{}}},created:function(){null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.getData()},methods:{getData:function(){var e=this;s.agentSet({},!0).then((function(l){e.settingData=l.data,e.loading=!1,e.activeName="basic"})).catch((function(e){}))},handleClick:function(e){this.activeName=e.name}}},[["render",function(e,l,s,i,c,u){var o=a,g=t,y=j("Basic"),r=j("Condition"),d=j("Commission"),k=j("Settlement"),N=j("Words"),C=j("License"),B=j("Background"),S=n;return m((f(),p("div",null,[v(g,{size:"small",modelValue:c.activeName,"onUpdate:modelValue":l[0]||(l[0]=function(e){return c.activeName=e}),type:"card",onTabClick:u.handleClick},{default:D((function(){return[v(o,{label:"基础设置",name:"basic"}),v(o,{label:"分销商条件",name:"condition"}),v(o,{label:"佣金设置",name:"commission"}),v(o,{label:"结算",name:"settlement"}),v(o,{label:"自定义文字",name:"words"}),v(o,{label:"申请协议",name:"license"}),v(o,{label:"页面背景图",name:"background"})]})),_:1},8,["modelValue","onTabClick"]),"basic"==c.activeName?(f(),h(y,{key:0,settingData:c.settingData},null,8,["settingData"])):b("",!0),"condition"==c.activeName?(f(),h(r,{key:1,settingData:c.settingData},null,8,["settingData"])):b("",!0),"commission"==c.activeName?(f(),h(d,{key:2,settingData:c.settingData},null,8,["settingData"])):b("",!0),"settlement"==c.activeName?(f(),h(k,{key:3,settingData:c.settingData},null,8,["settingData"])):b("",!0),"words"==c.activeName?(f(),h(N,{key:4,settingData:c.settingData},null,8,["settingData"])):b("",!0),"license"==c.activeName?(f(),h(C,{key:5,settingData:c.settingData},null,8,["settingData"])):b("",!0),"background"==c.activeName?(f(),h(B,{key:6,settingData:c.settingData},null,8,["settingData"])):b("",!0)])),[[S,c.loading]])}]]))}}}));