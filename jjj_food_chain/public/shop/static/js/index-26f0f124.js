import{u as t}from"./index-708a85b3.js";import e from"./Apply-f4f6d962.js";import s from"./User-72c86f91.js";import i from"./Order-ac19e061.js";import r from"./Cash-4db97e0f.js";import a from"./Setting-5b294c71.js";import o from"./Poster-950b67a4.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{F as m,K as n,L as u,ag as l,o as j,c as h,T as c,Y as d}from"./@vue-e5cdee21.js";import"./vue-router-2729bdc9.js";import"./pinia-805bca39.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./call-bind-2971450c.js";import"./object-inspect-dd55f836.js";import"./element-plus-b30a858e.js";import"./@vueuse-f6c48e1e.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-f5b82f61.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-f67db3fa.js";import"./vue-i18n-2607567b.js";import"./@intlify-f009848f.js";import"./plus-aa4f00fc.js";import"./Edit-6e604219.js";import"./SubUser-8e9f6ee2.js";import"./Edit-4f88b9cc.js";import"./Edit-d00e3a8d.js";import"./Basic-39f13f78.js";import"./Condition-32d4c343.js";import"./Product-45692702.js";import"./product-4d5c543d.js";import"./Commission-bfe6c7fe.js";import"./Settlement-7d66a2d9.js";import"./Words-6cf58762.js";import"./License-03c9acde.js";import"./Background-aefa3402.js";import"./Upload-2fb809cc.js";import"./file-c9c3a485.js";import"./vue-cropperjs-a8153a2d.js";import"./vue-5933b83d.js";import"./cropperjs-81999277.js";const v=p(m({components:{Applyindex:e,User:s,Order:i,Cash:r,Setting:a,Poster:o},setup(){const{bus_emit:e,bus_off:s,bus_on:i}=t(),r=n({bus_emit:e,bus_off:s,bus_on:i,formInline:{nick_name:""},param:{},activeName:"",sourceList:[{key:"Applyindex",value:"入驻申请",path:"/plus/agent/apply/index"},{key:"user",value:"分销商用户",path:"/plus/agent/user/index"},{key:"order",value:"分销订单",path:"/plus/agent/order/index"},{key:"cash",value:"提现申请",path:"/plus/agent/cash/index"},{key:"setting",value:"分销设置",path:"/plus/agent/setting/index"},{key:"poster",value:"分销海报",path:"/plus/agent/setting/qrcode"}],tabList:[],is_third_param:!1,paramsFlag:!1});return{...u(r),changTab:t=>{e("activeValue",t)}}},created(){this.tabList=this.authFilter(),this.tabList.length>0&&(this.activeName=this.tabList[0].key),null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.bus_on("activeValue",(t=>{this.activeName=t}));let t={active:this.activeName,list:this.tabList,tab_type:"agent"};this.bus_emit("tabData",t)},beforeUnmount(){this.bus_emit("tabData",{active:null,tab_type:"agent",list:[]}),this.bus_off("activeValue")},methods:{authFilter(){let t=[];for(let e=0;e<this.sourceList.length;e++){let s=this.sourceList[e];this.$filter.isAuth(s.path)&&t.push(s)}return t}}}),[["render",function(t,e,s,i,r,a){const o=l("Applyindex"),p=l("User"),m=l("Order"),n=l("Cash"),u=l("Setting"),v=l("Poster");return j(),h("div",null,["Applyindex"==t.activeName?(j(),c(o,{key:0})):d("",!0),"user"==t.activeName?(j(),c(p,{key:1,onChangTab:t.changTab},null,8,["onChangTab"])):d("",!0),"order"==t.activeName?(j(),c(m,{key:2})):d("",!0),"cash"==t.activeName?(j(),c(n,{key:3})):d("",!0),"setting"==t.activeName?(j(),c(u,{key:4})):d("",!0),"poster"==t.activeName?(j(),c(v,{key:5})):d("",!0)])}]]);export{v as default};