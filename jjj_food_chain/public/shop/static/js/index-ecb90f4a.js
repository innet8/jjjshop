import{a as t}from"./index-0eefa19c.js";import e from"./index-1f916a07.js";import s from"./index-34db37ca.js";import i from"./index-78be5f92.js";import{_ as a}from"./_plugin-vue_export-helper-1b428a4d.js";import{F as r,K as o,L as p,ag as m,o as l,c as u,T as n,Y as b}from"./@vue-e72ffbb6.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./call-bind-2971450c.js";import"./object-inspect-dd55f836.js";import"./element-plus-d03e850c.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./store-1f38ee48.js";import"./add-2e61f742.js";import"./edit-b410f1e8.js";import"./Qrcode-eacc7468.js";import"./add-fc4af4e7.js";import"./edit-fd6713f1.js";import"./add-8129cffb.js";import"./edit-12ab17ad.js";const j=r({components:{tables:e,tablearea:s,tabletype:i},setup(){const{bus_emit:e,bus_off:s,bus_on:i}=t(),a=o({bus_emit:e,bus_off:s,bus_on:i,loading:!0,form:{},param:{},activeName:"tables",sourceList:[{key:"tables",value:$t("桌位管理"),path:"/supplier/table/table/index"},{key:"tablearea",value:$t("区域管理"),path:"/supplier/table/area/index"},{key:"tabletype",value:$t("桌位类型"),path:"/supplier/table/type/index"}],tabList:[],paramsFlag:!1});return{...p(a)}},created(){this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(t=>{this.activeName=t}));let t={active:this.activeName,list:this.tabList,tab_type:"tablemanage"};this.bus_emit("tabData",t)},beforeUnmount(){this.bus_emit("tabData",{active:null,tab_type:"tablemanage",list:[]}),this.bus_off("activeValue")},methods:{authFilter(){let t=[];for(let e=0;e<this.sourceList.length;e++){let s=this.sourceList[e];this.$filter.isAuth(s.path)&&t.push(s)}return t}}}),h={class:"common-seach-wrap"};const c=a(j,[["render",function(t,e,s,i,a,r){const o=m("tables"),p=m("tablearea"),j=m("tabletype");return l(),u("div",h,["tables"==t.activeName?(l(),n(o,{key:0})):b("",!0),"tablearea"==t.activeName?(l(),n(p,{key:1})):b("",!0),"tabletype"==t.activeName?(l(),n(j,{key:2})):b("",!0)])}]]);export{c as default};
