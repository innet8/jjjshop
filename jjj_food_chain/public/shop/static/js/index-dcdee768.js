import{a as t}from"./index-b2c611b3.js";import s from"./index-7391546c.js";import e from"./index-93b23877.js";import{_ as i}from"./_plugin-vue_export-helper-1b428a4d.js";import{F as r,K as a,L as o,ag as m,o as p,c as u,T as n,Y as l}from"./@vue-e72ffbb6.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./call-bind-2971450c.js";import"./object-inspect-dd55f836.js";import"./element-plus-d03e850c.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./cashier-71e9635f.js";import"./add-6ce519df.js";import"./edit-48f98ca9.js";const h=r({components:{user:s,setting:e},setup(){const{bus_emit:s,bus_off:e,bus_on:i}=t(),r=a({bus_emit:s,bus_off:e,bus_on:i,loading:!0,form:{},param:{},activeName:"user",sourceList:[{key:"user",value:"收银员",path:"/plus/cashier/user/index"},{key:"setting",value:"基础设置",path:"/plus/cashier/setting/index"}],tabList:[],paramsFlag:!1});return{...o(r)}},created(){this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(t=>{this.activeName=t}));let t={active:this.activeName,list:this.tabList,tab_type:"cashier"};this.bus_emit("tabData",t)},beforeUnmount(){this.bus_emit("tabData",{active:null,tab_type:"cashier",list:[]}),this.bus_off("activeValue")},methods:{authFilter(){let t=[];for(let s=0;s<this.sourceList.length;s++){let e=this.sourceList[s];this.$filter.isAuth(e.path)&&t.push(e)}return t}}}),c={class:"common-seach-wrap"};const j=i(h,[["render",function(t,s,e,i,r,a){const o=m("user"),h=m("setting");return p(),u("div",c,["user"==t.activeName?(p(),n(o,{key:0})):l("",!0),"setting"==t.activeName?(p(),n(h,{key:1})):l("",!0)])}]]);export{j as default};