import{u as t}from"./index-3370678a.js";import s from"./index-2c75c5f8.js";import e from"./index-b1c3cf02.js";import{_ as i}from"./_plugin-vue_export-helper-1b428a4d.js";import{F as o,K as r,L as a,ag as p,o as m,c as u,T as n,Y as c}from"./@vue-e5cdee21.js";import"./vue-router-2729bdc9.js";import"./pinia-805bca39.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./call-bind-2971450c.js";import"./object-inspect-dd55f836.js";import"./element-plus-b30a858e.js";import"./@vueuse-f6c48e1e.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-f5b82f61.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-f67db3fa.js";import"./vue-i18n-2607567b.js";import"./@intlify-f009848f.js";import"./product-ffc427f5.js";import"./Add-9fa697e6.js";import"./Upload-9c7b6d53.js";import"./file-1c2123a7.js";import"./vue-cropperjs-a8153a2d.js";import"./vue-5933b83d.js";import"./cropperjs-81999277.js";import"./Edit-1db6b99d.js";const j=o({components:{categoryindex:s,productindex:e},setup(){const{bus_emit:s,bus_off:e,bus_on:i}=t(),o=r({bus_emit:s,bus_off:e,bus_on:i,loading:!0,form:{},param:{},activeName:"productindex",sourceList:[{key:"productindex",value:"商品管理",path:"/product/takeaway/product/index"},{key:"categoryindex",value:"分类管理",path:"/product/takeaway/category/index"}],tabList:[],paramsFlag:!1});return{...a(o)}},created(){this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(t=>{this.activeName=t})),this.activeName,this.tabList},beforeUnmount(){this.bus_off("activeValue")},methods:{authFilter(){let t=[];for(let s=0;s<this.sourceList.length;s++){let e=this.sourceList[s];this.$filter.isAuth(e.path)&&t.push(e)}return t}}}),d={class:"common-seach-wrap"};const l=i(j,[["render",function(t,s,e,i,o,r){const a=p("productindex"),j=p("categoryindex");return m(),u("div",d,["productindex"==t.activeName?(m(),n(a,{key:0})):c("",!0),"categoryindex"==t.activeName?(m(),n(j,{key:1})):c("",!0)])}]]);export{l as default};