import{E as s,g as t,h as e,i as o,e as i}from"./element-plus-d03e850c.js";import{P as a}from"./plus-ec1693da.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as m,c as l,P as p,S as n,a as d,W as j}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-aad60c61.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const u={class:"product-add mt30"},c={class:"common-button-wrapper"};const f=r({data:()=>({form:{},loading:!1}),props:{settingData:Object},created(){this.form=this.settingData.data.license.values},methods:{onSubmit(){let t=this;t.loading=!0;let e=t.form;a.license(e,!0).then((e=>{t.loading=!1,s({message:"恭喜你，设置成功",type:"success"})})).catch((s=>{t.loading=!1}))}}},[["render",function(s,a,r,f,h,g){const b=t,v=e,y=o,w=i;return m(),l("div",u,[p(w,{size:"small",ref:"form",model:h.form,"label-position":"top","label-width":"200px"},{default:n((()=>[p(v,{label:"分销商申请协议  "},{default:n((()=>[p(b,{modelValue:h.form.license,"onUpdate:modelValue":a[0]||(a[0]=s=>h.form.license=s),type:"textarea",rows:"5",class:"max-w460"},null,8,["modelValue"])])),_:1}),d("div",c,[p(y,{size:"small",type:"primary",onClick:g.onSubmit,loading:h.loading},{default:n((()=>[j("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}]]);export{f as default};