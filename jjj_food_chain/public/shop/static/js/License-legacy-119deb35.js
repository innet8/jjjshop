System.register(["./element-plus-legacy-895ffe04.js","./plus-legacy-a2d881de.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-6076f203.js","./@vueuse-legacy-85324d63.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-d0a3b32c.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./index-legacy-b161cc26.js","./vue-router-legacy-41bf3bcd.js","./pinia-legacy-68b9f062.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./object-inspect-legacy-fcd55e63.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-6ef346ed.js","./vue-i18n-legacy-04918595.js","./@intlify-legacy-09ecf407.js"],(function(l,e){"use strict";var n,a,s,t,u,c,i,o,r,g,y,d,j;return{setters:[function(l){n=l.E,a=l.e,s=l.f,t=l.g,u=l.h},function(l){c=l.P},function(l){i=l._},function(l){o=l.o,r=l.c,g=l.P,y=l.S,d=l.a,j=l.W},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var e={class:"product-add mt30"},f={class:"common-button-wrapper"};l("default",i({data:function(){return{form:{},loading:!1}},props:{settingData:Object},created:function(){this.form=this.settingData.data.license.values},methods:{onSubmit:function(){var l=this;l.loading=!0;var e=l.form;c.license(e,!0).then((function(e){l.loading=!1,n({message:"恭喜你，设置成功",type:"success"})})).catch((function(e){l.loading=!1}))}}},[["render",function(l,n,c,i,m,p){var v=a,h=s,b=t,w=u;return o(),r("div",e,[g(w,{size:"small",ref:"form",model:m.form,"label-position":"top","label-width":"200px"},{default:y((function(){return[g(h,{label:"分销商申请协议  "},{default:y((function(){return[g(v,{modelValue:m.form.license,"onUpdate:modelValue":n[0]||(n[0]=function(l){return m.form.license=l}),type:"textarea",rows:"5",class:"max-w460"},null,8,["modelValue"])]})),_:1}),d("div",f,[g(b,{size:"small",type:"primary",onClick:p.onSubmit,loading:m.loading},{default:y((function(){return[j("提交")]})),_:1},8,["onClick","loading"])])]})),_:1},8,["model"])])}]]))}}}));