import{u as t}from"./index-71f9662e.js";import s from"./Index-5c658131.js";import e from"./Index-c4c04838.js";import i from"./Index-6dc38252.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{d as o,J as p,K as a,af as m,o as u,c as n,S as l,X as j}from"./@vue-b57a05a6.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./element-plus-bf694ad1.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./group-9b59e410.js";import"./UE-88826be1.js";import"./Upload-a14cce3d.js";import"./file-856e25a9.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";const c=o({components:{setting:s,groupIndex:e,order:i},data(){const{bus_emit:s,bus_off:e,bus_on:i}=t(),r=p({bus_emit:s,bus_off:e,bus_on:i,loading:!0,form:{},param:{},activeName:"order",sourceList:[{key:"order",value:"团购订单",path:"/plus/group/order/index"},{key:"group",value:"团购管理",path:"/plus/group/group/index"},{key:"setting",value:"团购设置",path:"/plus/group/setting/index"}],tabList:[],paramsFlag:!1});return{...a(r)}},created(){this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(t=>{this.activeName=t}));let t={active:this.activeName,list:this.tabList,tab_type:"plusgroup"};this.bus_emit("tabData",t)},beforeUnmount(){this.bus_emit("tabData",{active:null,tab_type:"plusgroup",list:[]}),this.bus_off("activeValue")},methods:{authFilter(){let t=[];for(let s=0;s<this.sourceList.length;s++){let e=this.sourceList[s];this.$filter.isAuth(e.path)&&t.push(e)}return t}}}),d={class:"common-seach-wrap"};const h=r(c,[["render",function(t,s,e,i,r,o){const p=m("order"),a=m("groupIndex"),c=m("setting");return u(),n("div",d,["order"==t.activeName?(u(),l(p,{key:0})):j("",!0),"group"==t.activeName?(u(),l(a,{key:1})):j("",!0),"setting"==t.activeName?(u(),l(c,{key:2})):j("",!0)])}],["__scopeId","data-v-95bc22d2"]]);export{h as default};