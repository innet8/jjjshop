System.register(["./element-plus-legacy-ce5c473b.js","./_plugin-vue_export-helper-legacy-61c4c9d1.js","./@vue-legacy-8ef99c9b.js","./lodash-es-legacy-de50a096.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-3353583a.js","./@element-plus-legacy-91437698.js","./dayjs-legacy-0ff6bb75.js","./call-bind-legacy-8954b3d2.js","./get-intrinsic-legacy-c0201930.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./hasown-legacy-8325a62b.js","./set-function-length-legacy-e4fe6823.js","./define-data-property-legacy-290282d7.js","./has-property-descriptors-legacy-1e05bb01.js","./gopd-legacy-0da6a62b.js","./@popperjs-legacy-876caf52.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js"],(function(e,l){"use strict";var n,t,a,o,u,r,s,c,d,m,i,f,p;return{setters:[function(e){n=e.n,t=e.h,a=e.w,o=e.x,u=e.g},function(e){r=e._},function(e){s=e.o,c=e.c,d=e.a,m=e.W,i=e.O,f=e.R,p=e.V},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={class:"basic-setting-content pl16 pr16"},g={class:"common-form"},y={class:"gray9"},j={class:"gray9"};e("default",r({data:function(){return{}},created:function(){},inject:["form"],methods:{}},[["render",function(e,r,b,h,$,x){var V=n,v=t,_=a,w=o,q=u;return s(),c("div",l,[d("div",g,m(e.$t("领取设置")),1),i(v,{label:e.$t("有效期："),rules:[{required:!0,message:e.$t("请填写有效期")}],prop:"model.expire"},{default:f((function(){return[i(V,{controls:!1,min:0,max:999,class:"max-w460",placeholder:e.$t("请填写有效期"),modelValue:x.form.model.expire,"onUpdate:modelValue":r[0]||(r[0]=function(e){return x.form.model.expire=e}),modelModifiers:{number:!0}},null,8,["placeholder","modelValue"]),d("div",y,m(e.$t("有效期限（月），0为永久有效")),1)]})),_:1},8,["label","rules"]),i(v,{label:e.$t("价格："),rules:[{required:!0,message:e.$t("请填写价格")}],prop:"model.money"},{default:f((function(){return[i(V,{controls:!1,min:0,max:1e8,class:"max-w460",placeholder:e.$t("请填写价格"),modelValue:x.form.model.money,"onUpdate:modelValue":r[1]||(r[1]=function(e){return x.form.model.money=e}),modelModifiers:{number:!0}},null,8,["placeholder","modelValue"]),d("div",j,m(e.$t("用户购买会员卡需要支付的金额，0为用户免费领取")),1)]})),_:1},8,["label","rules"]),i(v,{label:e.$t("状态：")},{default:f((function(){return[i(w,{modelValue:x.form.model.status,"onUpdate:modelValue":r[2]||(r[2]=function(e){return x.form.model.status=e})},{default:f((function(){return[i(_,{label:0},{default:f((function(){return[p(m(e.$t("启用")),1)]})),_:1}),i(_,{label:1},{default:f((function(){return[p(m(e.$t("关闭")),1)]})),_:1})]})),_:1},8,["modelValue"])]})),_:1},8,["label"]),i(v,{label:e.$t("使用须知："),rules:[{required:!0,message:e.$t("请填写使用须知")}],prop:"model.content"},{default:f((function(){return[i(q,{type:"textarea",maxlength:200,"show-word-limit":"",modelValue:x.form.model.content,"onUpdate:modelValue":r[3]||(r[3]=function(e){return x.form.model.content=e}),class:"max-w460",rows:"8"},null,8,["modelValue"])]})),_:1},8,["label","rules"])])}]]))}}}));
