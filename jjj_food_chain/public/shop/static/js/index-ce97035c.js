import{p as e,q as a,h as t,w as s,x as l,i as o,e as i}from"./element-plus-bf694ad1.js";import{S as r}from"./setting-c33844ee.js";import{_ as n}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as p,c as d,O as m,R as u,P as g,a7 as f,S as c,a as j,W as _,V as h}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-bfb850d0.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const b={class:"product-add"},v={class:"cashier-desc"},y={class:"common-button-wrapper"};const $=n({data:()=>({form:{default_language:"en",buffet_sign_open:"1"},checked:!1,langList:[],loading:!1}),created(){this.getData()},methods:{getData(){let e=this;r.printingDetail({},!0).then((a=>{e.form.default_language=""+a.data.vars.values.default_language,e.form.buffet_sign_open=""+a.data.vars.values.buffet_sign_open,e.langList=a.data.vars.values.language_list})).catch((e=>{}))},onSubmit(){let e=this,a=this.form;e.loading=!0,r.editPrinting(a,!0).then((a=>{e.loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"})})).catch((a=>{e.loading=!1}))},handleCheckedCitiesChange(e){let a=this;e?a.form.order_status[0]=20:a.form.order_status=[]}}},[["render",function(r,n,$,k,x,C){const w=e,V=a,q=t,D=s,S=l,z=o,L=i;return p(),d("div",b,[m(L,{size:"small",ref:"form",model:x.form,"label-position":"top","label-width":"200px"},{default:u((()=>[m(q,{label:r.$t("默认语言"),class:"cashier-item",prop:"default_language",rules:[{required:!0,message:" "}]},{default:u((()=>[m(V,{class:"max-w460",modelValue:x.form.default_language,"onUpdate:modelValue":n[0]||(n[0]=e=>x.form.default_language=e),placeholder:r.$t("请选择")},{default:u((()=>[(p(!0),d(g,null,f(x.langList,((e,a)=>(p(),c(w,{key:a,label:e.value,value:e.key},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"]),j("div",v,_(r.$t("小票显示的语言将根据选择的语言打印")),1),m(q,{label:r.$t("自助餐标识"),rules:[{required:!0,message:""}]},{default:u((()=>[m(S,{modelValue:x.form.buffet_sign_open,"onUpdate:modelValue":n[1]||(n[1]=e=>x.form.buffet_sign_open=e)},{default:u((()=>[m(D,{label:"1"},{default:u((()=>[h(_(r.$t("开")),1)])),_:1}),m(D,{label:"0"},{default:u((()=>[h(_(r.$t("关")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),j("div",y,[m(z,{onClick:C.getData,loading:x.loading},{default:u((()=>[h(_(r.$t("重置")),1)])),_:1},8,["onClick","loading"]),m(z,{type:"primary",onClick:C.onSubmit,loading:x.loading},{default:u((()=>[h(_(r.$t("保存")),1)])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}],["__scopeId","data-v-e5995ba6"]]);export{$ as default};
