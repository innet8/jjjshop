import{u as t}from"./index-b693dc4f.js";import e from"./index-d845c79c.js";import s from"./index-c48d0c53.js";import i from"./index-4d0fbf74.js";import a from"./index-69bc7586.js";import o from"./index-4b476b6e.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{d as p,J as m,K as n,af as d,o as u,c as j,S as l,X as c}from"./@vue-b57a05a6.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./element-plus-c8084613.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./product-10aae3cd.js";import"./add-ce172be0.js";import"./Upload-a92ceade.js";import"./file-fc86740f.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";import"./edit-f0692e4b.js";import"./add-552753a3.js";import"./edit-5d151e45.js";import"./add-0d2c5859.js";import"./edit-87dfa7f3.js";import"./add-29bf8125.js";import"./edit-e6c16a92.js";import"./add-16fcf8bb.js";import"./edit-20628109.js";const h=p({components:{spec:e,attr:s,unit:i,feed:a,labels:o},setup(){const{bus_emit:e,bus_off:s,bus_on:i}=t(),a=m({bus_emit:e,bus_off:s,bus_on:i,loading:!0,form:{},param:{},activeName:"spec",sourceList:[{key:"spec",value:$t("规格库"),path:"/product/expand/spec/index"},{key:"attr",value:$t("属性库"),path:"/product/expand/attr/index"},{key:"feed",value:$t("加料库"),path:"/product/expand/feed/index"},{key:"unit",value:$t("单位库"),path:"/product/expand/unit/index"},{key:"labels",value:$t("打印标签"),path:"/product/expand/label/index"}],tabList:[],paramsFlag:!1});return{...n(a)}},mounted(){this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(t=>{this.activeName=t}));let t={active:this.activeName,list:this.tabList,tab_type:"expand"};this.bus_emit("tabData",t)},beforeUnmount(){this.bus_emit("tabData",{active:null,tab_type:"expand",list:[]}),this.bus_off("activeValue")},methods:{authFilter(){let t=[];for(let e=0;e<this.sourceList.length;e++){let s=this.sourceList[e];this.$filter.isAuth(s.path)&&t.push(s)}return t}}}),f={class:"common-seach-wrap"};const b=r(h,[["render",function(t,e,s,i,a,o){const r=d("spec"),p=d("attr"),m=d("unit"),n=d("feed"),h=d("labels");return u(),j("div",f,["spec"==t.activeName?(u(),l(r,{key:0})):c("",!0),"attr"==t.activeName?(u(),l(p,{key:1})):c("",!0),"unit"==t.activeName?(u(),l(m,{key:2})):c("",!0),"feed"==t.activeName?(u(),l(n,{key:3})):c("",!0),"labels"==t.activeName?(u(),l(h,{key:4})):c("",!0)])}],["__scopeId","data-v-d26570c7"]]);export{b as default};