import{u as t}from"./index-fed3ed55.js";import s from"./index-5d25df92.js";import i from"./index-be5128ca.js";import{_ as e}from"./_plugin-vue_export-helper-1b428a4d.js";import{F as o,K as r,L as m,ag as p,o as a,c as u,T as j,Y as n}from"./@vue-e72ffbb6.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./call-bind-2971450c.js";import"./object-inspect-dd55f836.js";import"./element-plus-b01b3a31.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./live-e5a6dec1.js";import"./LiveProduct-3f656557.js";import"./ImportProduct-13f1aafd.js";import"./Add-e41fe6ce.js";import"./Upload-a45cc344.js";import"./file-9ae0c9ba.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./Edit-a7cb1cec.js";import"./add-036109db.js";import"./group-1b16e0aa.js";import"./edit-8693ea75.js";const l=o({components:{Room:s,ProductIndex:i},setup(){const{bus_emit:s,bus_off:i,bus_on:e}=t(),o=r({bus_emit:s,bus_off:i,bus_on:e,loading:!0,form:{},param:{},activeName:"",sourceList:[{key:"room",value:"直播房间",path:"/plus/live/room"},{key:"product",value:"直播商品",path:"/plus/live/product"}],tabList:[],paramsFlag:!1});return{...m(o)}},created(){this.tabList=this.sourceList,this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(t=>{this.activeName=t}));let t={active:this.activeName,list:this.tabList,tab_type:"live"};this.bus_emit("tabData",t)},beforeUnmount(){this.bus_emit("tabData",{active:null,tab_type:"live",list:[]}),this.bus_off("activeValue")},methods:{}}),c={class:"common-seach-wrap"};const d=e(l,[["render",function(t,s,i,e,o,r){const m=p("Room"),l=p("ProductIndex");return a(),u("div",c,["room"==t.activeName?(a(),j(m,{key:0})):n("",!0),"product"==t.activeName?(a(),j(l,{key:1})):n("",!0)])}]]);export{d as default};
