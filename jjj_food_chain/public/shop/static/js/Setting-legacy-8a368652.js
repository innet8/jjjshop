System.register(["./element-plus-legacy-b16a6c53.js","./plus-legacy-0f05e289.js","./Basic-legacy-6a58d06a.js","./Condition-legacy-1b5548ca.js","./Commission-legacy-05bb2285.js","./Settlement-legacy-f6d3151f.js","./Words-legacy-30c6290f.js","./License-legacy-4a07cee9.js","./Background-legacy-3da3675b.js","./index-legacy-37de8052.js","./@vue-legacy-11820b46.js","./@vueuse-legacy-fb10ab28.js","./lodash-es-legacy-b311526b.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-e28812ab.js","./dayjs-legacy-4b173016.js","./call-bind-legacy-a7650b66.js","./get-intrinsic-legacy-675d089b.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-b76e1749.js","./has-legacy-06d86c07.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./Product-legacy-6ea29962.js","./product-legacy-0382ab91.js","./Upload-legacy-841223b2.js","./Upload.vue_vue_type_style_index_0_scoped_bdf3207a_lang-legacy-b135f49c.js","./vue-router-legacy-4115aea7.js","./pinia-legacy-dd7b0b91.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-a87a5df5.js","./side-channel-legacy-9446be19.js","./object-inspect-legacy-b9938498.js","./vue-ueditor-wrap-legacy-0affb7fa.js"],(function(e,a){"use strict";var t,n,l,s,i,c,u,o,g,d,y,m,r,j,f,v,D,b,h,p;return{setters:[function(e){t=e.t,n=e.u,l=e.v},function(e){s=e.P},function(e){i=e.default},function(e){c=e.default},function(e){u=e.default},function(e){o=e.default},function(e){g=e.default},function(e){d=e.default},function(e){y=e.default},function(e){m=e._},function(e){r=e.ag,j=e.$,f=e.o,v=e.c,D=e.P,b=e.S,h=e.T,p=e.Y},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){e("default",m({components:{Basic:i,Condition:c,Commission:u,Settlement:o,Words:g,License:d,Background:y},data:function(){return{loading:!0,activeName:"",settingData:{}}},created:function(){null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.getData()},methods:{getData:function(){var e=this;s.agentSet({},!0).then((function(a){e.settingData=a.data,e.loading=!1,e.activeName="basic"})).catch((function(e){}))},handleClick:function(e){this.activeName=e.name}}},[["render",function(e,a,s,i,c,u){var o=t,g=n,d=r("Basic"),y=r("Condition"),m=r("Commission"),k=r("Settlement"),N=r("Words"),C=r("License"),_=r("Background"),B=l;return j((f(),v("div",null,[D(g,{size:"small",modelValue:c.activeName,"onUpdate:modelValue":a[0]||(a[0]=function(e){return c.activeName=e}),type:"card",onTabClick:u.handleClick},{default:b((function(){return[D(o,{label:"基础设置",name:"basic"}),D(o,{label:"分销商条件",name:"condition"}),D(o,{label:"佣金设置",name:"commission"}),D(o,{label:"结算",name:"settlement"}),D(o,{label:"自定义文字",name:"words"}),D(o,{label:"申请协议",name:"license"}),D(o,{label:"页面背景图",name:"background"})]})),_:1},8,["modelValue","onTabClick"]),"basic"==c.activeName?(f(),h(d,{key:0,settingData:c.settingData},null,8,["settingData"])):p("",!0),"condition"==c.activeName?(f(),h(y,{key:1,settingData:c.settingData},null,8,["settingData"])):p("",!0),"commission"==c.activeName?(f(),h(m,{key:2,settingData:c.settingData},null,8,["settingData"])):p("",!0),"settlement"==c.activeName?(f(),h(k,{key:3,settingData:c.settingData},null,8,["settingData"])):p("",!0),"words"==c.activeName?(f(),h(N,{key:4,settingData:c.settingData},null,8,["settingData"])):p("",!0),"license"==c.activeName?(f(),h(C,{key:5,settingData:c.settingData},null,8,["settingData"])):p("",!0),"background"==c.activeName?(f(),h(_,{key:6,settingData:c.settingData},null,8,["settingData"])):p("",!0)])),[[B,c.loading]])}]]))}}}));
