System.register(["./element-plus-legacy-b61989a6.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-517223d5.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js"],(function(e,l){"use strict";var n,t,a,o,u,r,s,c,d,m,i,f,p;return{setters:[function(e){n=e.D,t=e.h,a=e.o,o=e.p,u=e.g},function(e){r=e._},function(e){s=e.o,c=e.c,d=e.a,m=e.X,i=e.P,f=e.S,p=e.W},null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={class:"basic-setting-content pl16 pr16"},g={class:"common-form"},y={class:"gray9"},j={class:"gray9"};e("default",r({data:function(){return{}},created:function(){},inject:["form"],methods:{}},[["render",function(e,r,b,$,h,V){var v=n,x=t,_=a,w=o,U=u;return s(),c("div",l,[d("div",g,m(e.$t("领取设置")),1),i(x,{label:e.$t("有效期："),rules:[{required:!0,message:e.$t("请填写有效期")}],prop:"model.expire"},{default:f((function(){return[i(v,{controls:!1,min:0,max:999,class:"max-w460",placeholder:e.$t("请填写有效期"),modelValue:V.form.model.expire,"onUpdate:modelValue":r[0]||(r[0]=function(e){return V.form.model.expire=e}),modelModifiers:{number:!0}},null,8,["placeholder","modelValue"]),d("div",y,m(e.$t("有效期限（月），0为永久有效")),1)]})),_:1},8,["label","rules"]),i(x,{label:e.$t("价格："),rules:[{required:!0,message:e.$t("请填写价格")}],prop:"model.money"},{default:f((function(){return[i(v,{controls:!1,min:0,class:"max-w460",placeholder:e.$t("请填写价格"),modelValue:V.form.model.money,"onUpdate:modelValue":r[1]||(r[1]=function(e){return V.form.model.money=e}),modelModifiers:{number:!0}},null,8,["placeholder","modelValue"]),d("div",j,m(e.$t("用户购买会员卡需要支付的金额，0为用户免费领取")),1)]})),_:1},8,["label","rules"]),i(x,{label:e.$t("状态：")},{default:f((function(){return[i(w,{modelValue:V.form.model.status,"onUpdate:modelValue":r[2]||(r[2]=function(e){return V.form.model.status=e})},{default:f((function(){return[i(_,{label:0},{default:f((function(){return[p(m(e.$t("启用")),1)]})),_:1}),i(_,{label:1},{default:f((function(){return[p(m(e.$t("关闭")),1)]})),_:1})]})),_:1},8,["modelValue"])]})),_:1},8,["label"]),i(x,{label:e.$t("使用须知："),rules:[{required:!0,message:e.$t("请填写使用须知")}],prop:"model.content"},{default:f((function(){return[i(U,{type:"textarea",modelValue:V.form.model.content,"onUpdate:modelValue":r[3]||(r[3]=function(e){return V.form.model.content=e}),class:"max-w460",rows:"8"},null,8,["modelValue"])]})),_:1},8,["label","rules"])])}]]))}}}));
