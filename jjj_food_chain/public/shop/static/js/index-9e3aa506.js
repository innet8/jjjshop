import{v as s}from"./element-plus-d03e850c.js";import{P as t}from"./plus-1fc9b2e8.js";import{_ as i}from"./_plugin-vue_export-helper-1b428a4d.js";import{ap as e,$ as a,o as l,c as o,Q as r,a8 as n,a as p,X as m,M as c}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-0eefa19c.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const d={class:"plus-container"},h={class:"common-form"},u={class:"plus-list"},j=["onClick"],v={class:"card"},f={class:"ml10 r"};const g=i({data:()=>({loading:!0,listData:[],list:[]}),created(){this.getData()},methods:{getData(){let s=this;t.plusList({},!0).then((t=>{s.loading=!1,s.listData=t.data.list})).catch((s=>{}))},buildTree(s,t){if(t)for(let i=0,e=s.length;i<e;i++){let t=s[i];for(let e=0,a=this.list.length;e<a;e++){let a=this.list[e];if(t.parent_id==a.plus_id){a.children.push(t),s.splice(i,1),i--;break}}}else for(let i=0;i<s.length;i++){let t=s[i];0==t.parent_id&&(t.children=[],this.list.push(t),s.splice(i,1),i--)}t||this.buildTree(s,!0)},hasIcon:s=>null!=s&&s.length>0?s:"icon-chajian1",gotoPath(s){let t=s.path;s.redirect_name&&(t=s.redirect_name),this.$router.push(t)}}},[["render",function(t,i,g,b,_,k){const y=e("auth"),x=s;return a((l(),o("div",d,[(l(!0),o(r,null,n(_.listData,((s,t)=>(l(),o("div",{key:t},[p("div",h,m(s.name),1),p("div",u,[(l(!0),o(r,null,n(s.children,((s,t)=>a((l(),o("div",{class:"item",key:t},[p("div",{class:"item-box",onClick:t=>k.gotoPath(s)},[p("div",v,[p("div",{class:c(["icon iconfont",k.hasIcon(s.icon)])},null,2),p("div",f,[p("h3",null,m(s.name),1),p("p",null,m(s.remark),1)])])],8,j)])),[[y,s.path]]))),128))])])))),128))])),[[x,_.loading]])}]]);export{g as default};
