import{u as t}from"./index-fed3ed55.js";import e from"./index-a75163a9.js";import s from"./index-1fafcbeb.js";import i from"./index-93f6de67.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{F as o,K as a,L as p,ag as m,o as u,c as n,T as l,Y as j}from"./@vue-e72ffbb6.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./call-bind-2971450c.js";import"./object-inspect-dd55f836.js";import"./element-plus-b01b3a31.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./queue-5d4a9818.js";import"./edit-30855dda.js";import"./add-d0074f1c.js";import"./edit-90851ba8.js";import"./UE-94fd85c5.js";import"./Upload-a45cc344.js";import"./file-9ae0c9ba.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const c=o({components:{record:e,tables:s,setting:i},setup(){const{bus_emit:e,bus_off:s,bus_on:i}=t(),r=a({bus_emit:e,bus_off:s,bus_on:i,loading:!0,form:{},param:{},activeName:"record",sourceList:[{key:"record",value:"取号记录",path:"/plus/queue/record/index"},{key:"tables",value:"桌号管理",path:"/plus/queue/table/index"},{key:"setting",value:"取号设置",path:"/plus/queue/setting/index"}],tabList:[],paramsFlag:!1});return{...p(r)}},created(){this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(t=>{this.activeName=t}));let t={active:this.activeName,list:this.tabList,tab_type:"queuemanage"};this.bus_emit("tabData",t)},beforeUnmount(){this.bus_emit("tabData",{active:null,tab_type:"queuemanage",list:[]}),this.bus_off("activeValue")},methods:{authFilter(){let t=[];for(let e=0;e<this.sourceList.length;e++){let s=this.sourceList[e];this.$filter.isAuth(s.path)&&t.push(s)}return t}}}),h={class:"common-seach-wrap"};const d=r(c,[["render",function(t,e,s,i,r,o){const a=m("record"),p=m("tables"),c=m("setting");return u(),n("div",h,["record"==t.activeName?(u(),l(a,{key:0})):j("",!0),"tables"==t.activeName?(u(),l(p,{key:1})):j("",!0),"setting"==t.activeName?(u(),l(c,{key:2})):j("",!0)])}],["__scopeId","data-v-9bc9ca42"]]);export{d as default};
