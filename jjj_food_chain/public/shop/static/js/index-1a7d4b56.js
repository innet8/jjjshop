import{w as e,h as o,g as s,i as t,e as i}from"./element-plus-c8084613.js";import{S as a}from"./setting-fee2f5a8.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as l,c as m,O as p,R as n,a as d,V as u,bm as c,bk as f}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-74b65baf.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const j={data:()=>({form:{is_open:"",money:""},loading:!1}),created(){this.getData()},methods:{getData(){let e=this;a.fullfreeDetail({},!0).then((o=>{let s=o.data.vars.values;e.form.is_open=s.is_open,e.form.money=s.money})).catch((e=>{}))},onSubmit(){let e=this,o=this.form;e.$refs.form.validate((s=>{s&&(e.loading=!0,a.editFullfree(o,!0).then((o=>{e.loading=!1,this.$ElMessage({message:"恭喜你，设置成功",type:"success"})})).catch((o=>{e.loading=!1})))}))}}},h=e=>(c("data-v-03c3f6c1"),e=e(),f(),e),g={class:"product-add"},_=h((()=>d("div",{class:"common-form"},"满额免配送费设置",-1))),v=h((()=>d("div",{class:"tips"}," 如果开启满额免配送费，设置0为全场免配送费 ",-1))),y={class:"common-button-wrapper"};const b=r(j,[["render",function(a,r,c,f,j,h){const b=e,V=o,w=s,x=t,D=i;return l(),m("div",g,[p(D,{size:"small",ref:"form",model:j.form,"label-position":"top","label-width":"200px"},{default:n((()=>[_,p(V,{label:"是否开启满额免配送费"},{default:n((()=>[d("div",null,[p(b,{modelValue:j.form.is_open,"onUpdate:modelValue":r[0]||(r[0]=e=>j.form.is_open=e),label:"1"},{default:n((()=>[u("开启")])),_:1},8,["modelValue"]),p(b,{modelValue:j.form.is_open,"onUpdate:modelValue":r[1]||(r[1]=e=>j.form.is_open=e),label:"0"},{default:n((()=>[u("关闭")])),_:1},8,["modelValue"])])])),_:1}),p(V,{label:"单笔订单满",prop:"money",rules:[{required:!0,message:" "}]},{default:n((()=>[p(w,{modelValue:j.form.money,"onUpdate:modelValue":r[2]||(r[2]=e=>j.form.money=e),type:"number",style:{width:"200px"}},null,8,["modelValue"]),u("元 "),v])),_:1}),d("div",y,[p(x,{type:"primary",onClick:h.onSubmit,loading:j.loading},{default:n((()=>[u("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}],["__scopeId","data-v-03c3f6c1"]]);export{b as default};
