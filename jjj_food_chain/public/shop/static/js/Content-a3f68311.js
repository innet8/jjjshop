import{h as t}from"./element-plus-b01b3a31.js";import{U as o}from"./UE-94fd85c5.js";import{_ as i}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as e,o as s,c as r,P as n,S as m,a as p}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./Upload-a45cc344.js";import"./file-9ae0c9ba.js";import"./index-fed3ed55.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const a={components:{Uediter:o},data:()=>({ueditor:{text:"",config:{initialFrameWidth:400,initialFrameHeight:500}}}),created(){},inject:["form"],methods:{getContent:function(){},contentChangeFunc(t){this.form.model.content=t}}},j=p("div",{class:"common-form mt50"},"商品详情",-1),c={class:"edit_container"};const l=i(a,[["render",function(o,i,a,l,u,d){const f=e("Uediter"),h=t;return s(),r("div",null,[j,n(h,{label:"内容："},{default:m((()=>[p("div",c,[n(f,{text:d.form.model.content,config:u.ueditor.config,ref:"ue",onContentChange:d.contentChangeFunc},null,8,["text","config","onContentChange"])])])),_:1})])}]]);export{l as default};