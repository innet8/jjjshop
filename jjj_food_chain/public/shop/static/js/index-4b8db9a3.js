import{u as t}from"./index-3ef3ec6f.js";import e from"./index-3942728c.js";import s from"./index-abef9557.js";import i from"./index-5f1d0d8f.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{d as o,J as a,K as p,af as m,o as u,c as n,S as j,X as l}from"./@vue-b57a05a6.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./element-plus-bf694ad1.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./queue-93e7520e.js";import"./edit-78f71597.js";import"./add-fa2c28f7.js";import"./edit-dc10e333.js";import"./UE-6be71f91.js";import"./Upload-5ef3dc1b.js";import"./file-8e2c68ff.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";const c=o({components:{record:e,tables:s,setting:i},setup(){const{bus_emit:e,bus_off:s,bus_on:i}=t(),r=a({bus_emit:e,bus_off:s,bus_on:i,loading:!0,form:{},param:{},activeName:"record",sourceList:[{key:"record",value:"取号记录",path:"/plus/queue/record/index"},{key:"tables",value:"桌号管理",path:"/plus/queue/table/index"},{key:"setting",value:"取号设置",path:"/plus/queue/setting/index"}],tabList:[],paramsFlag:!1});return{...p(r)}},created(){this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(t=>{this.activeName=t}));let t={active:this.activeName,list:this.tabList,tab_type:"queuemanage"};this.bus_emit("tabData",t)},beforeUnmount(){this.bus_emit("tabData",{active:null,tab_type:"queuemanage",list:[]}),this.bus_off("activeValue")},methods:{authFilter(){let t=[];for(let e=0;e<this.sourceList.length;e++){let s=this.sourceList[e];this.$filter.isAuth(s.path)&&t.push(s)}return t}}}),d={class:"common-seach-wrap"};const h=r(c,[["render",function(t,e,s,i,r,o){const a=m("record"),p=m("tables"),c=m("setting");return u(),n("div",d,["record"==t.activeName?(u(),j(a,{key:0})):l("",!0),"tables"==t.activeName?(u(),j(p,{key:1})):l("",!0),"setting"==t.activeName?(u(),j(c,{key:2})):l("",!0)])}],["__scopeId","data-v-9bc9ca42"]]);export{h as default};