import{a as t}from"./index-8a56ff53.js";import i from"./index-e9591b31.js";import e from"./index-d1077c5e.js";import s from"./index-2bf31af9.js";import r from"./index-678cb70c.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{F as o,K as a,L as n,ag as m,o as u,c as l,T as h,Y as j}from"./@vue-e72ffbb6.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./call-bind-2971450c.js";import"./object-inspect-dd55f836.js";import"./element-plus-d03e850c.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./setting-8b521d00.js";import"./add-1a3059ad.js";import"./edit-befab836.js";import"./supplier-565c9788.js";import"./add-c423ad71.js";import"./edit-ec69ee55.js";import"./preview-181d19ab.js";const c=o({components:{printer:i,dishes:e,printing:s,preview:r},setup(){const{bus_emit:i,bus_off:e,bus_on:s}=t(),r=a({bus_emit:i,bus_off:e,bus_on:s,loading:!0,form:{},param:{},activeName:"printer",sourceList:[{key:"printer",value:$t("打印机管理"),path:"/supplier/printing/printer/index"},{key:"dishes",value:$t("商品打印"),path:"/supplier/printing/dishes/index"},{key:"preview",value:$t("打印模版"),path:"/supplier/printing/preview/index"},{key:"printing",value:$t("打印设置"),path:"/supplier/printing/printing/index"}],tabList:[]});return{...n(r)}},mounted(){this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(t=>{this.activeName=t}));let t={active:this.activeName,list:this.tabList,tab_type:"printing"};this.bus_emit("tabData",t)},beforeUnmount(){this.bus_emit("tabData",{active:null,tab_type:"printing",list:[]}),this.bus_off("activeValue")},methods:{authFilter(){let t=[];for(let i=0;i<this.sourceList.length;i++){let e=this.sourceList[i];this.$filter.isAuth(e.path)&&t.push(e)}return t}}}),d={class:"common-seach-wrap"};const v=p(c,[["render",function(t,i,e,s,r,p){const o=m("printer"),a=m("printing"),n=m("preview"),c=m("dishes");return u(),l("div",d,["printer"==t.activeName?(u(),h(o,{key:0})):j("",!0),"printing"==t.activeName?(u(),h(a,{key:1})):j("",!0),"preview"==t.activeName?(u(),h(n,{key:2})):j("",!0),"dishes"==t.activeName?(u(),h(c,{key:3})):j("",!0)])}]]);export{v as default};