System.register(["./element-plus-legacy-1289937f.js","./plus-legacy-db64699d.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-517223d5.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./index-legacy-6f6ce9e5.js","./vue-router-legacy-30bb5696.js","./pinia-legacy-b89d16df.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./object-inspect-legacy-fcd55e63.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-fb79f073.js","./vue-i18n-legacy-859a0eb8.js","./@intlify-legacy-d0534b73.js"],(function(e,l){"use strict";var n,u,a,t,o,s,i,r,c,d,f,m,g,y=document.createElement("style");return y.textContent=".tips{color:#ccc}\n",document.head.appendChild(y),{setters:[function(e){n=e.E,u=e.o,a=e.h,t=e.i,o=e.e},function(e){s=e.P},function(e){i=e._},function(e){r=e.o,c=e.c,d=e.P,f=e.S,m=e.a,g=e.W},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={data:function(){return{form:{is_open:"",level:"",self_buy:""},loading:!1}},props:{settingData:Object},created:function(){this.form=this.settingData.data.basic.values},methods:{onSubmit:function(){var e=this;e.loading=!0;var l=this.form;s.basic(l,!0).then((function(l){e.loading=!1,n({message:"恭喜你，设置成功",type:"success"})})).catch((function(l){e.loading=!1}))}}},y={class:"product-add mt30"},p=m("div",{class:"tips"},"如开启，分销商自己购买商品，获得一级佣金",-1),j={class:"common-button-wrapper"};e("default",i(l,[["render",function(e,l,n,s,i,b){var v=u,_=a,V=t,h=o;return r(),c("div",y,[d(h,{size:"small",ref:"form",model:i.form,"label-position":"top","label-width":"200px"},{default:f((function(){return[d(_,{label:"是否开启分销功能"},{default:f((function(){return[m("div",null,[d(v,{modelValue:i.form.is_open,"onUpdate:modelValue":l[0]||(l[0]=function(e){return i.form.is_open=e}),label:"1"},{default:f((function(){return[g("开启")]})),_:1},8,["modelValue"]),d(v,{modelValue:i.form.is_open,"onUpdate:modelValue":l[1]||(l[1]=function(e){return i.form.is_open=e}),label:"0"},{default:f((function(){return[g("关闭")]})),_:1},8,["modelValue"])])]})),_:1}),d(_,{label:"分销层级"},{default:f((function(){return[m("div",null,[d(v,{modelValue:i.form.level,"onUpdate:modelValue":l[2]||(l[2]=function(e){return i.form.level=e}),label:"1"},{default:f((function(){return[g("一级分销")]})),_:1},8,["modelValue"]),d(v,{modelValue:i.form.level,"onUpdate:modelValue":l[3]||(l[3]=function(e){return i.form.level=e}),label:"2"},{default:f((function(){return[g("二级分销")]})),_:1},8,["modelValue"]),d(v,{modelValue:i.form.level,"onUpdate:modelValue":l[4]||(l[4]=function(e){return i.form.level=e}),label:"3"},{default:f((function(){return[g("三级分销")]})),_:1},8,["modelValue"])])]})),_:1}),d(_,{label:"分销商内购"},{default:f((function(){return[m("div",null,[d(v,{modelValue:i.form.self_buy,"onUpdate:modelValue":l[5]||(l[5]=function(e){return i.form.self_buy=e}),label:"1"},{default:f((function(){return[g("开启")]})),_:1},8,["modelValue"]),d(v,{modelValue:i.form.self_buy,"onUpdate:modelValue":l[6]||(l[6]=function(e){return i.form.self_buy=e}),label:"0"},{default:f((function(){return[g("关闭")]})),_:1},8,["modelValue"]),p])]})),_:1}),m("div",j,[d(V,{size:"small",type:"primary",onClick:b.onSubmit,loading:i.loading},{default:f((function(){return[g("提交")]})),_:1},8,["onClick","loading"])])]})),_:1},8,["model"])])}]]))}}}));