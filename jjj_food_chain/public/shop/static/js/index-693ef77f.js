import{p as e,q as a,h as t,i as s,e as i}from"./element-plus-c8084613.js";import{S as o}from"./setting-fee2f5a8.js";import{_ as l}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as r,c as n,O as p,R as d,P as m,a7 as u,S as g,a as c,W as j,V as f}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-74b65baf.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const h={class:"product-add"},_={class:"cashier-desc"},v={class:"common-button-wrapper"};const b=l({data:()=>({form:{default_language:"en"},checked:!1,langList:[],loading:!1}),created(){this.getData()},methods:{getData(){let e=this;o.printingDetail({},!0).then((a=>{e.form.default_language=""+a.data.vars.values.default_language,e.langList=a.data.vars.values.language_list})).catch((e=>{}))},onSubmit(){let e=this,a=this.form;e.loading=!0,o.editPrinting(a,!0).then((a=>{e.loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"})})).catch((a=>{e.loading=!1}))},handleCheckedCitiesChange(e){let a=this;e?a.form.order_status[0]=20:a.form.order_status=[]}}},[["render",function(o,l,b,y,k,C){const $=e,w=a,x=t,D=s,q=i;return r(),n("div",h,[p(q,{size:"small",ref:"form",model:k.form,"label-position":"top","label-width":"200px"},{default:d((()=>[p(x,{label:o.$t("默认语言"),class:"cashier-item",prop:"default_language",rules:[{required:!0,message:" "}]},{default:d((()=>[p(w,{modelValue:k.form.default_language,"onUpdate:modelValue":l[0]||(l[0]=e=>k.form.default_language=e),placeholder:o.$t("请选择")},{default:d((()=>[(r(!0),n(m,null,u(k.langList,((e,a)=>(r(),g($,{key:a,label:e.value,value:e.key},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"]),c("div",_,j(o.$t("小票显示的语言将根据选择的语言打印")),1),c("div",v,[p(D,{onClick:C.getData,loading:k.loading},{default:d((()=>[f(j(o.$t("重置")),1)])),_:1},8,["onClick","loading"]),p(D,{type:"primary",onClick:C.onSubmit,loading:k.loading},{default:d((()=>[f(j(o.$t("保存")),1)])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}],["__scopeId","data-v-76fd052d"]]);export{b as default};
