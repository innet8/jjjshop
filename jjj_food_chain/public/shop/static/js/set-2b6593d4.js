import{e,f as l,o,p as a}from"./element-plus-b30a858e.js";import{_ as s}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as t,c as m,a as r,X as d,P as u,S as p,W as n}from"./@vue-e5cdee21.js";import"./@vueuse-f6c48e1e.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-f5b82f61.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";const i={class:"basic-setting-content pl16 pr16"},c={class:"common-form"},f={class:"gray9"},j={class:"gray9"};const b=s({data:()=>({}),created(){},inject:["form"],methods:{}},[["render",function(s,b,V,$,y,_){const x=e,g=l,h=o,v=a;return t(),m("div",i,[r("div",c,d(s.$t("领取设置")),1),u(g,{label:s.$t("有效期："),rules:[{required:!0,message:s.$t("请填写有效期")}],prop:"model.expire"},{default:p((()=>[u(x,{modelValue:_.form.model.expire,"onUpdate:modelValue":b[0]||(b[0]=e=>_.form.model.expire=e),class:"max-w460",type:"number"},null,8,["modelValue"]),r("div",f,d(s.$t("有效期限（月），0为永久有效")),1)])),_:1},8,["label","rules"]),u(g,{label:s.$t("价格："),rules:[{required:!0,message:s.$t("请填写价格")}],prop:"model.money"},{default:p((()=>[u(x,{modelValue:_.form.model.money,"onUpdate:modelValue":b[1]||(b[1]=e=>_.form.model.money=e),class:"max-w460",type:"number"},null,8,["modelValue"]),r("div",j,d(s.$t("用户购买会员卡需要支付的金额，0为用户免费领取")),1)])),_:1},8,["label","rules"]),u(g,{label:s.$t("状态：")},{default:p((()=>[u(v,{modelValue:_.form.model.status,"onUpdate:modelValue":b[2]||(b[2]=e=>_.form.model.status=e)},{default:p((()=>[u(h,{label:0},{default:p((()=>[n(d(s.$t("启用")),1)])),_:1}),u(h,{label:1},{default:p((()=>[n(d(s.$t("关闭")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),u(g,{label:s.$t("使用须知："),rules:[{required:!0,message:s.$t("请填写使用须知")}],prop:"model.content"},{default:p((()=>[u(x,{type:"textarea",modelValue:_.form.model.content,"onUpdate:modelValue":b[3]||(b[3]=e=>_.form.model.content=e),class:"max-w460",rows:"8"},null,8,["modelValue"])])),_:1},8,["label","rules"])])}]]);export{b as default};
