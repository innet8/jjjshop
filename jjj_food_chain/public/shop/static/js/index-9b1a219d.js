import{E as e,o,f as s,e as t,g as a,h as i}from"./element-plus-b30a858e.js";import{S as l}from"./setting-f7dd2ad3.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as r,c as p,P as n,S as d,a as u,W as f,bb as c,b9 as j}from"./@vue-e5cdee21.js";import"./@vueuse-f6c48e1e.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-f5b82f61.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-1f5bb9d4.js";import"./vue-router-2729bdc9.js";import"./pinia-805bca39.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-f67db3fa.js";import"./vue-i18n-2607567b.js";import"./@intlify-f009848f.js";const h={data:()=>({form:{is_open:"",money:""},loading:!1}),created(){this.getData()},methods:{getData(){let e=this;l.fullfreeDetail({},!0).then((o=>{let s=o.data.vars.values;e.form.is_open=s.is_open,e.form.money=s.money})).catch((e=>{}))},onSubmit(){let o=this,s=this.form;o.$refs.form.validate((t=>{t&&(o.loading=!0,l.editFullfree(s,!0).then((s=>{o.loading=!1,e({message:"恭喜你，设置成功",type:"success"})})).catch((e=>{o.loading=!1})))}))}}},v=e=>(c("data-v-fd84ec78"),e=e(),j(),e),b={class:"product-add"},_=v((()=>u("div",{class:"common-form"},"满额免配送费设置",-1))),g=v((()=>u("div",{class:"tips"}," 如果开启满额免配送费，设置0为全场免配送费 ",-1))),y={class:"common-button-wrapper"};const V=m(h,[["render",function(e,l,m,c,j,h){const v=o,V=s,w=t,x=a,S=i;return r(),p("div",b,[n(S,{size:"small",ref:"form",model:j.form,"label-position":"top","label-width":"200px"},{default:d((()=>[_,n(V,{label:"是否开启满额免配送费"},{default:d((()=>[u("div",null,[n(v,{modelValue:j.form.is_open,"onUpdate:modelValue":l[0]||(l[0]=e=>j.form.is_open=e),label:"1"},{default:d((()=>[f("开启")])),_:1},8,["modelValue"]),n(v,{modelValue:j.form.is_open,"onUpdate:modelValue":l[1]||(l[1]=e=>j.form.is_open=e),label:"0"},{default:d((()=>[f("关闭")])),_:1},8,["modelValue"])])])),_:1}),n(V,{label:"单笔订单满",prop:"money",rules:[{required:!0,message:" "}]},{default:d((()=>[n(w,{modelValue:j.form.money,"onUpdate:modelValue":l[2]||(l[2]=e=>j.form.money=e),type:"number",style:{width:"200px"}},null,8,["modelValue"]),f("元 "),g])),_:1}),u("div",y,[n(x,{type:"primary",onClick:h.onSubmit,loading:j.loading},{default:d((()=>[f("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}],["__scopeId","data-v-fd84ec78"]]);export{V as default};