System.register(["./element-plus-legacy-b61989a6.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-517223d5.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js"],(function(l,e){"use strict";var n,o,t,a,u,r,s,c,i,g,d,f;return{setters:[function(l){n=l.g,o=l.h,t=l.e,a=l.i},function(l){u=l._},function(l){r=l.o,s=l.c,c=l.P,i=l.S,g=l.a,d=l.W,f=l.X},null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var e={class:"setting"},m={class:"common-button-wrapper"};l("default",u({data:function(){return{loading:!1,form:{token:""},formRules:{token:[{required:!0,message:$t("请输入Token"),trigger:"blur"}]}}}},[["render",function(l,u,y,j,p,k){var b=n,h=o,v=t,_=a;return r(),s("div",e,[c(v,{size:"small",ref:"form",model:p.form,"label-position":"top",rules:p.formRules},{default:i((function(){return[c(h,{label:l.$t("Token"),prop:"token"},{default:i((function(){return[c(b,{class:"max-w460",modelValue:p.form.token,"onUpdate:modelValue":u[0]||(u[0]=function(l){return p.form.token=l}),placeholder:l.$t("请输入云端Token")},null,8,["modelValue","placeholder"])]})),_:1},8,["label"])]})),_:1},8,["model","rules"]),g("div",m,[c(_,{onClick:u[1]||(u[1]=function(){}),type:"info",loading:p.loading},{default:i((function(){return[d(f(l.$t("重置")),1)]})),_:1},8,["loading"]),c(_,{type:"primary",onClick:l.onSubmit,loading:p.loading},{default:i((function(){return[d(f(l.$t("保存")),1)]})),_:1},8,["onClick","loading"])])])}]]))}}}));