import{E as e,o,h as s,g as t,i,e as a}from"./element-plus-d03e850c.js";import{S as l}from"./setting-b0f0df73.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as r,c as p,P as n,S as d,a as u,W as f}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-0eefa19c.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const j={data:()=>({form:{is_open:"",money:""},loading:!1}),created(){this.getData()},methods:{getData(){let e=this;l.fullfreeDetail({},!0).then((o=>{let s=o.data.vars.values;e.form.is_open=s.is_open,e.form.money=s.money})).catch((e=>{}))},onSubmit(){let o=this,s=this.form;o.$refs.form.validate((t=>{t&&(o.loading=!0,l.editFullfree(s,!0).then((s=>{o.loading=!1,e({message:"恭喜你，设置成功",type:"success"})})).catch((e=>{o.loading=!1})))}))}}},c={class:"product-add"},h=u("div",{class:"common-form"},"满额免配送费设置",-1),g=u("div",{class:"tips"}," 如果开启满额免配送费，设置0为全场免配送费 ",-1),v={class:"common-button-wrapper"};const _=m(j,[["render",function(e,l,m,j,_,b){const y=o,V=s,w=t,x=i,S=a;return r(),p("div",c,[n(S,{size:"small",ref:"form",model:_.form,"label-position":"top","label-width":"200px"},{default:d((()=>[h,n(V,{label:"是否开启满额免配送费"},{default:d((()=>[u("div",null,[n(y,{modelValue:_.form.is_open,"onUpdate:modelValue":l[0]||(l[0]=e=>_.form.is_open=e),label:"1"},{default:d((()=>[f("开启")])),_:1},8,["modelValue"]),n(y,{modelValue:_.form.is_open,"onUpdate:modelValue":l[1]||(l[1]=e=>_.form.is_open=e),label:"0"},{default:d((()=>[f("关闭")])),_:1},8,["modelValue"])])])),_:1}),n(V,{label:"单笔订单满",prop:"money",rules:[{required:!0,message:" "}]},{default:d((()=>[n(w,{modelValue:_.form.money,"onUpdate:modelValue":l[2]||(l[2]=e=>_.form.money=e),type:"number",style:{width:"200px"}},null,8,["modelValue"]),f("元 "),g])),_:1}),u("div",v,[n(x,{type:"primary",onClick:b.onSubmit,loading:_.loading},{default:d((()=>[f("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}]]);export{_ as default};
