import{u as t}from"./index-74b65baf.js";import s from"./index-7b36b226.js";import i from"./index-c47ac6b3.js";import{_ as o}from"./_plugin-vue_export-helper-1b428a4d.js";import{d as e,J as r,K as p,af as a,o as m,c as u,S as j,X as n}from"./@vue-b57a05a6.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./element-plus-c8084613.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./live-13c7054d.js";import"./LiveProduct-070748a1.js";import"./ImportProduct-858b6394.js";import"./Add-28c7a4d6.js";import"./Upload-e7579a9c.js";import"./file-9623813c.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";import"./Edit-9da3597c.js";import"./add-78381532.js";import"./group-ad8792db.js";import"./edit-41f85e11.js";const c=e({components:{Room:s,ProductIndex:i},setup(){const{bus_emit:s,bus_off:i,bus_on:o}=t(),e=r({bus_emit:s,bus_off:i,bus_on:o,loading:!0,form:{},param:{},activeName:"",sourceList:[{key:"room",value:"直播房间",path:"/plus/live/room"},{key:"product",value:"直播商品",path:"/plus/live/product"}],tabList:[],paramsFlag:!1});return{...p(e)}},created(){this.tabList=this.sourceList,this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(t=>{this.activeName=t}));let t={active:this.activeName,list:this.tabList,tab_type:"live"};this.bus_emit("tabData",t)},beforeUnmount(){this.bus_emit("tabData",{active:null,tab_type:"live",list:[]}),this.bus_off("activeValue")},methods:{}}),l={class:"common-seach-wrap"};const d=o(c,[["render",function(t,s,i,o,e,r){const p=a("Room"),c=a("ProductIndex");return m(),u("div",l,["room"==t.activeName?(m(),j(p,{key:0})):n("",!0),"product"==t.activeName?(m(),j(c,{key:1})):n("",!0)])}]]);export{d as default};
