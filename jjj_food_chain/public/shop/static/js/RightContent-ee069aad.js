import{H as e,I as a}from"./element-plus-d03e850c.js";import{b as t,u as s}from"./vue-router-bf98ca95.js";import{u as p}from"./index-4dcc075d.js";import{_ as u}from"./_plugin-vue_export-helper-1b428a4d.js";import{r,o as n,c as i,P as l,S as o,Q as m,a8 as v,T as d,ag as h,a as y,M as c,u as j}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const b={class:"el-tabs-container"},x=u({__name:"ChildTabs",setup(s){const{bus_emit:u,bus_on:h}=p(),y=r(0),c=r(""),j=t(),x=r([]);h("tabData",(e=>{x.value=e.list,y.value=e.active,c.value=e.tab_type})),h("activeValue",(e=>{e&&e.params?y.value=e.params:y.value=e})),h("noTarget",(e=>{y.value=e}));const q=e=>{let a=e.props;"queuemanage"==c.value&&j.push({path:"/plus/queue/index",query:{type:a.name}}),"takeaway"==c.value&&j.push({path:"/product/takeaway/index",query:{type:a.name}}),"storeproduct"==c.value&&j.push({path:"/product/store/index",query:{type:a.name}}),"uesrmanage"==c.value&&j.push({path:"/card/user/index",query:{type:a.name}}),"cardmanage"==c.value&&j.push({path:"/card/card/index",query:{type:a.name}}),"expand"==c.value&&j.push({path:"/product/expand/index",query:{type:a.name}}),"printing"==c.value&&j.push({path:"/supplier/printing/index",query:{type:a.name}}),"tablemanage"==c.value&&j.push({path:"/supplier/table/index",query:{type:a.name}}),"agent"==c.value&&j.push({path:"/plus/agent/index",query:{type:a.name}}),"driver"==c.value&&j.push({path:"/plus/driver/index",query:{type:a.name}}),"coupon"==c.value&&j.push({path:"/plus/coupon/index",query:{type:a.name}}),"points"==c.value&&j.push({path:"/plus/points/index",query:{type:a.name}}),"seckill"==c.value&&j.push({path:"/plus/seckill/index",query:{type:a.name}}),"assemble"==c.value&&j.push({path:"/plus/assemble/index",query:{type:a.name}}),"bargain"==c.value&&j.push({path:"/plus/bargain/index",query:{type:a.name}}),"store"==c.value&&j.push({path:"/store/index",query:{type:a.name}}),"takeout"==c.value&&j.push({path:"/takeout/index",query:{type:a.name}}),"appopen"==c.value&&j.push({path:"/appsetting/appopen/event",query:{type:a.name}}),y.value=a.name,u("activeValue",a.name)};return(t,s)=>{const p=e,u=a;return n(),i("div",b,[l(u,{"model-value":y.value,onTabClick:q},{default:o((()=>[(n(!0),i(m,null,v(x.value,((e,a)=>(n(),d(p,{label:e.value,name:e.key,key:a},null,8,["label","name"])))),128))])),_:1},8,["model-value"])])}}},[["__scopeId","data-v-61b25077"]]),q={class:"right-content pr"},g={class:"right-content-box"},_={class:"subject-wrap"},k={__name:"RightContent",setup(e){const a=s();return(e,t)=>{const s=h("router-view");return n(),i("div",q,[y("div",g,[y("div",_,[y("div",{class:c("/home"==j(a).path?"home-div":"main-div")},[l(x),l(s)],2)])])])}}};export{k as default};