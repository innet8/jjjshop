import{u as t}from"./index-fed3ed55.js";import e from"./index-c257a90c.js";import s from"./index-892f81ce.js";import i from"./index-431afa7c.js";import a from"./index-d03594cb.js";import r from"./index-7fd1cfca.js";import{_ as o}from"./_plugin-vue_export-helper-1b428a4d.js";import{F as p,K as m,L as u,ag as n,o as d,c as l,T as j,Y as c}from"./@vue-e72ffbb6.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./call-bind-2971450c.js";import"./object-inspect-dd55f836.js";import"./element-plus-b01b3a31.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./product-bfd4e84c.js";import"./add-97590a0e.js";import"./Upload-a45cc344.js";import"./file-9ae0c9ba.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./edit-abf0993b.js";import"./add-64bee493.js";import"./edit-9f27175e.js";import"./add-ab842f3c.js";import"./edit-f2de2bb9.js";import"./add-68ad517a.js";import"./edit-9f425506.js";import"./add-8f4546e8.js";import"./edit-961a423a.js";const h=p({components:{spec:e,attr:s,unit:i,feed:a,labels:r},setup(){const{bus_emit:e,bus_off:s,bus_on:i}=t(),a=m({bus_emit:e,bus_off:s,bus_on:i,loading:!0,form:{},param:{},activeName:"spec",sourceList:[{key:"spec",value:$t("规格库"),path:"/product/expand/spec/index"},{key:"attr",value:$t("属性库"),path:"/product/expand/attr/index"},{key:"feed",value:$t("加料库"),path:"/product/expand/feed/index"},{key:"unit",value:$t("单位库"),path:"/product/expand/unit/index"},{key:"labels",value:$t("打印标签"),path:"/product/expand/label/index"}],tabList:[],paramsFlag:!1});return{...u(a)}},mounted(){this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(t=>{this.activeName=t}));let t={active:this.activeName,list:this.tabList,tab_type:"expand"};this.bus_emit("tabData",t)},beforeUnmount(){this.bus_emit("tabData",{active:null,tab_type:"expand",list:[]}),this.bus_off("activeValue")},methods:{authFilter(){let t=[];for(let e=0;e<this.sourceList.length;e++){let s=this.sourceList[e];this.$filter.isAuth(s.path)&&t.push(s)}return t}}}),v={class:"common-seach-wrap"};const b=o(h,[["render",function(t,e,s,i,a,r){const o=n("spec"),p=n("attr"),m=n("unit"),u=n("feed"),h=n("labels");return d(),l("div",v,["spec"==t.activeName?(d(),j(o,{key:0})):c("",!0),"attr"==t.activeName?(d(),j(p,{key:1})):c("",!0),"unit"==t.activeName?(d(),j(m,{key:2})):c("",!0),"feed"==t.activeName?(d(),j(u,{key:3})):c("",!0),"labels"==t.activeName?(d(),j(h,{key:4})):c("",!0)])}],["__scopeId","data-v-d26570c7"]]);export{b as default};