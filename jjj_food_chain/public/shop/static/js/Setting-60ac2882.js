import{I as t,J as e,v as a}from"./element-plus-b01b3a31.js";import{P as i}from"./plus-95887a56.js";import s from"./Basic-9a679aee.js";import o from"./Condition-829381a6.js";import n from"./Commission-9414ab52.js";import m from"./Settlement-6ca87604.js";import r from"./Words-4a162cec.js";import l from"./License-529bcd29.js";import p from"./Background-3369bfb3.js";import{_ as c}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as j,$ as d,o as u,c as g,P as v,S as D,T as b,Y as h}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-fed3ed55.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./Product-ffd76fe8.js";import"./product-bfd4e84c.js";import"./Upload-a45cc344.js";import"./file-9ae0c9ba.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const f=c({components:{Basic:s,Condition:o,Commission:n,Settlement:m,Words:r,License:l,Background:p},data:()=>({loading:!0,activeName:"",settingData:{}}),created(){null!=this.$route.query.type&&(this.activeName=this.$route.query.type),this.getData()},methods:{getData(){let t=this;i.agentSet({},!0).then((e=>{t.settingData=e.data,t.loading=!1,t.activeName="basic"})).catch((t=>{}))},handleClick(t){this.activeName=t.name}}},[["render",function(i,s,o,n,m,r){const l=t,p=e,c=j("Basic"),f=j("Condition"),k=j("Commission"),y=j("Settlement"),N=j("Words"),C=j("License"),B=j("Background"),w=a;return d((u(),g("div",null,[v(p,{size:"small",modelValue:m.activeName,"onUpdate:modelValue":s[0]||(s[0]=t=>m.activeName=t),type:"card",onTabClick:r.handleClick},{default:D((()=>[v(l,{label:"基础设置",name:"basic"}),v(l,{label:"分销商条件",name:"condition"}),v(l,{label:"佣金设置",name:"commission"}),v(l,{label:"结算",name:"settlement"}),v(l,{label:"自定义文字",name:"words"}),v(l,{label:"申请协议",name:"license"}),v(l,{label:"页面背景图",name:"background"})])),_:1},8,["modelValue","onTabClick"]),"basic"==m.activeName?(u(),b(c,{key:0,settingData:m.settingData},null,8,["settingData"])):h("",!0),"condition"==m.activeName?(u(),b(f,{key:1,settingData:m.settingData},null,8,["settingData"])):h("",!0),"commission"==m.activeName?(u(),b(k,{key:2,settingData:m.settingData},null,8,["settingData"])):h("",!0),"settlement"==m.activeName?(u(),b(y,{key:3,settingData:m.settingData},null,8,["settingData"])):h("",!0),"words"==m.activeName?(u(),b(N,{key:4,settingData:m.settingData},null,8,["settingData"])):h("",!0),"license"==m.activeName?(u(),b(C,{key:5,settingData:m.settingData},null,8,["settingData"])):h("",!0),"background"==m.activeName?(u(),b(B,{key:6,settingData:m.settingData},null,8,["settingData"])):h("",!0)])),[[w,m.loading]])}]]);export{f as default};
