System.register(["./element-plus-legacy-6adc2ffc.js","./plus-legacy-c8e92db6.js","./_plugin-vue_export-helper-legacy-61c4c9d1.js","./@vue-legacy-8ef99c9b.js","./lodash-es-legacy-de50a096.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-3353583a.js","./@element-plus-legacy-91437698.js","./dayjs-legacy-0ff6bb75.js","./call-bind-legacy-8954b3d2.js","./get-intrinsic-legacy-c0201930.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./hasown-legacy-8325a62b.js","./set-function-length-legacy-e4fe6823.js","./define-data-property-legacy-290282d7.js","./has-property-descriptors-legacy-1e05bb01.js","./gopd-legacy-0da6a62b.js","./@popperjs-legacy-876caf52.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./index-legacy-74d77c27.js","./vue-router-legacy-a8f66a40.js","./pinia-legacy-e8a51700.js","./axios-legacy-dedee0c6.js","./qs-legacy-334feae6.js","./side-channel-legacy-19dc2798.js","./object-inspect-legacy-a5678b81.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-d36ae666.js","./vue-i18n-legacy-a195b753.js","./@intlify-legacy-7f6e5bc9.js"],(function(l,e){"use strict";var n,a,s,t,u,c,i,o,r,g,y,d;return{setters:[function(l){n=l.g,a=l.h,s=l.i,t=l.e},function(l){u=l.P},function(l){c=l._},function(l){i=l.o,o=l.c,r=l.O,g=l.R,y=l.a,d=l.V},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var e={class:"product-add mt30"},j={class:"common-button-wrapper"};l("default",c({data:function(){return{form:{},loading:!1}},props:{settingData:Object},created:function(){this.form=this.settingData.data.license.values},methods:{onSubmit:function(){var l=this,e=this;e.loading=!0;var n=e.form;u.license(n,!0).then((function(n){e.loading=!1,l.$ElMessage({message:"恭喜你，设置成功",type:"success"})})).catch((function(l){e.loading=!1}))}}},[["render",function(l,u,c,p,f,m){var h=n,v=a,b=s,x=t;return i(),o("div",e,[r(x,{size:"small",ref:"form",model:f.form,"label-position":"top","label-width":"200px"},{default:g((function(){return[r(v,{label:"分销商申请协议  "},{default:g((function(){return[r(h,{modelValue:f.form.license,"onUpdate:modelValue":u[0]||(u[0]=function(l){return f.form.license=l}),type:"textarea",rows:"5",class:"max-w460"},null,8,["modelValue"])]})),_:1}),y("div",j,[r(b,{size:"small",type:"primary",onClick:m.onSubmit,loading:f.loading},{default:g((function(){return[d("提交")]})),_:1},8,["onClick","loading"])])]})),_:1},8,["model"])])}]]))}}}));