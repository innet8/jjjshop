import{E as e,o as l,h as o,i as a,e as s}from"./element-plus-b01b3a31.js";import{P as t}from"./plus-95887a56.js";import{_ as i}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as m,c as r,P as d,S as p,a as u,W as n,bb as f,b9 as j}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-fed3ed55.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const c={data:()=>({form:{is_open:"",level:"",self_buy:""},loading:!1}),props:{settingData:Object},created(){this.form=this.settingData.data.basic.values},methods:{onSubmit(){let l=this;l.loading=!0;let o=this.form;t.basic(o,!0).then((o=>{l.loading=!1,e({message:"恭喜你，设置成功",type:"success"})})).catch((e=>{l.loading=!1}))}}},b={class:"product-add mt30"},_=(e=>(f("data-v-461a54c2"),e=e(),j(),e))((()=>u("div",{class:"tips"},"如开启，分销商自己购买商品，获得一级佣金",-1))),v={class:"common-button-wrapper"};const V=i(c,[["render",function(e,t,i,f,j,c){const V=l,h=o,g=a,y=s;return m(),r("div",b,[d(y,{size:"small",ref:"form",model:j.form,"label-position":"top","label-width":"200px"},{default:p((()=>[d(h,{label:"是否开启分销功能"},{default:p((()=>[u("div",null,[d(V,{modelValue:j.form.is_open,"onUpdate:modelValue":t[0]||(t[0]=e=>j.form.is_open=e),label:"1"},{default:p((()=>[n("开启")])),_:1},8,["modelValue"]),d(V,{modelValue:j.form.is_open,"onUpdate:modelValue":t[1]||(t[1]=e=>j.form.is_open=e),label:"0"},{default:p((()=>[n("关闭")])),_:1},8,["modelValue"])])])),_:1}),d(h,{label:"分销层级"},{default:p((()=>[u("div",null,[d(V,{modelValue:j.form.level,"onUpdate:modelValue":t[2]||(t[2]=e=>j.form.level=e),label:"1"},{default:p((()=>[n("一级分销")])),_:1},8,["modelValue"]),d(V,{modelValue:j.form.level,"onUpdate:modelValue":t[3]||(t[3]=e=>j.form.level=e),label:"2"},{default:p((()=>[n("二级分销")])),_:1},8,["modelValue"]),d(V,{modelValue:j.form.level,"onUpdate:modelValue":t[4]||(t[4]=e=>j.form.level=e),label:"3"},{default:p((()=>[n("三级分销")])),_:1},8,["modelValue"])])])),_:1}),d(h,{label:"分销商内购"},{default:p((()=>[u("div",null,[d(V,{modelValue:j.form.self_buy,"onUpdate:modelValue":t[5]||(t[5]=e=>j.form.self_buy=e),label:"1"},{default:p((()=>[n("开启")])),_:1},8,["modelValue"]),d(V,{modelValue:j.form.self_buy,"onUpdate:modelValue":t[6]||(t[6]=e=>j.form.self_buy=e),label:"0"},{default:p((()=>[n("关闭")])),_:1},8,["modelValue"]),_])])),_:1}),u("div",v,[d(g,{size:"small",type:"primary",onClick:c.onSubmit,loading:j.loading},{default:p((()=>[n("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}],["__scopeId","data-v-461a54c2"]]);export{V as default};
