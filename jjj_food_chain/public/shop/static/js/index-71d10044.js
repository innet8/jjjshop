import{s as e,u as s,h as t,i as a,e as i}from"./element-plus-b01b3a31.js";import{S as o}from"./setting-b3577e68.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as l,c as m,P as p,S as n,a as d,X as c,Q as u,a8 as j,T as h,W as f}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-83a39651.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const b={class:"product-add"},g={class:"common-form"},v={class:"common-button-wrapper"};const C=r({data:()=>({form:{keys:[]},list:[]}),created(){this.getData()},methods:{getData(){let e=this;o.clearDetail({},!0).then((s=>{e.list=s.data.cacheList})).catch((e=>{}))},onSubmit(){let e=this,s=this.form;o.editCache(s,!0).then((s=>{this.$ElMessage({message:$t("恭喜你，清理成功"),type:"success"}),e.$router.push("/setting/clear/index")})).catch((e=>{}))},handleCheckedCitiesChange(e){}}},[["render",function(o,r,C,y,k,_){const $=e,x=s,w=t,S=a,D=i;return l(),m("div",b,[p(D,{size:"small",ref:"form",model:k.form,"label-position":"top","label-width":"200px"},{default:n((()=>[d("div",g,c(o.$t("清理缓存")),1),p(w,{label:o.$t("数据缓存:")},{default:n((()=>[p(x,{modelValue:k.form.keys,"onUpdate:modelValue":r[0]||(r[0]=e=>k.form.keys=e),onChange:_.handleCheckedCitiesChange},{default:n((()=>[(l(!0),m(u,null,j(k.list,((e,s)=>(l(),h($,{label:s,key:s,checked:!0},{default:n((()=>[f(c(o.$t(e.name)),1)])),_:2},1032,["label"])))),128))])),_:1},8,["modelValue","onChange"])])),_:1},8,["label"]),d("div",v,[p(S,{type:"primary",onClick:_.onSubmit},{default:n((()=>[f(c(o.$t("确定")),1)])),_:1},8,["onClick"])])])),_:1},8,["model"])])}],["__scopeId","data-v-a85ceb3f"]]);export{C as default};
