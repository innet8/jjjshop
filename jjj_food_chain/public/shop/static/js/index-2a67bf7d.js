import{u as t}from"./index-191c97f6.js";import s from"./index-5a71c5cd.js";import i from"./index-3f6b6c4e.js";import{_ as e}from"./_plugin-vue_export-helper-1b428a4d.js";import{d as o,J as r,K as p,af as a,o as m,c as n,S as u,X as c}from"./@vue-b57a05a6.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./element-plus-bf694ad1.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./product-27c484c5.js";import"./Add-8f24bcd2.js";import"./Upload-d46972b7.js";import"./file-2652919b.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";import"./Edit-9f7e68e0.js";const d=o({components:{categoryindex:s,productindex:i},setup(){const{bus_emit:s,bus_off:i,bus_on:e}=t(),o=r({bus_emit:s,bus_off:i,bus_on:e,loading:!0,form:{},param:{},activeName:"productindex",sourceList:[{key:"productindex",value:"商品管理",path:"/product/takeaway/product/index"},{key:"categoryindex",value:"分类管理",path:"/product/takeaway/category/index"}],tabList:[],paramsFlag:!1});return{...p(o)}},created(){this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(t=>{this.activeName=t})),this.activeName,this.tabList},beforeUnmount(){this.bus_off("activeValue")},methods:{authFilter(){let t=[];for(let s=0;s<this.sourceList.length;s++){let i=this.sourceList[s];this.$filter.isAuth(i.path)&&t.push(i)}return t}}}),j={class:"common-seach-wrap"};const l=e(d,[["render",function(t,s,i,e,o,r){const p=a("productindex"),d=a("categoryindex");return m(),n("div",j,["productindex"==t.activeName?(m(),u(p,{key:0})):c("",!0),"categoryindex"==t.activeName?(m(),u(d,{key:1})):c("",!0)])}]]);export{l as default};
