import{u as t}from"./index-096add5b.js";import e from"./Apply-5ae571a2.js";import s from"./User-4b24119d.js";import i from"./Order-241b5fb3.js";import r from"./Cash-57fa3ba1.js";import a from"./Setting-a81f6867.js";import o from"./Poster-731b3203.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{F as m,K as n,L as u,ag as l,o as j,c as h,T as c,Y as d}from"./@vue-e72ffbb6.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./call-bind-2971450c.js";import"./object-inspect-dd55f836.js";import"./element-plus-d03e850c.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./plus-0a116b83.js";import"./Edit-4edc0e2d.js";import"./SubUser-9891f2c5.js";import"./Edit-2b7cb47e.js";import"./Edit-6930c51c.js";import"./Basic-4d6411aa.js";import"./Condition-3a01c5b6.js";import"./Product-02d4536d.js";import"./product-a183687e.js";import"./Commission-2e3ac7a7.js";import"./Settlement-fafce322.js";import"./Words-28259074.js";import"./License-cd3e7005.js";import"./Background-5e21274e.js";import"./Upload-11b8287e.js";import"./file-36a9e739.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const v=p(m({components:{Applyindex:e,User:s,Order:i,Cash:r,Setting:a,Poster:o},setup(){const{bus_emit:e,bus_off:s,bus_on:i}=t(),r=n({bus_emit:e,bus_off:s,bus_on:i,formInline:{nick_name:""},param:{},activeName:"",sourceList:[{key:"Applyindex",value:"入驻申请",path:"/plus/agent/apply/index"},{key:"user",value:"分销商用户",path:"/plus/agent/user/index"},{key:"order",value:"分销订单",path:"/plus/agent/order/index"},{key:"cash",value:"提现申请",path:"/plus/agent/cash/index"},{key:"setting",value:"分销设置",path:"/plus/agent/setting/index"},{key:"poster",value:"分销海报",path:"/plus/agent/setting/qrcode"}],tabList:[],is_third_param:!1,paramsFlag:!1});return{...u(r),changTab:t=>{e("activeValue",t)}}},created(){this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(t=>{this.activeName=t}));let t={active:this.activeName,list:this.tabList,tab_type:"agent"};this.bus_emit("tabData",t)},beforeUnmount(){this.bus_emit("tabData",{active:null,tab_type:"agent",list:[]}),this.bus_off("activeValue")},methods:{authFilter(){let t=[];for(let e=0;e<this.sourceList.length;e++){let s=this.sourceList[e];this.$filter.isAuth(s.path)&&t.push(s)}return t}}}),[["render",function(t,e,s,i,r,a){const o=l("Applyindex"),p=l("User"),m=l("Order"),n=l("Cash"),u=l("Setting"),v=l("Poster");return j(),h("div",null,["Applyindex"==t.activeName?(j(),c(o,{key:0})):d("",!0),"user"==t.activeName?(j(),c(p,{key:1,onChangTab:t.changTab},null,8,["onChangTab"])):d("",!0),"order"==t.activeName?(j(),c(m,{key:2})):d("",!0),"cash"==t.activeName?(j(),c(n,{key:3})):d("",!0),"setting"==t.activeName?(j(),c(u,{key:4})):d("",!0),"poster"==t.activeName?(j(),c(v,{key:5})):d("",!0)])}]]);export{v as default};