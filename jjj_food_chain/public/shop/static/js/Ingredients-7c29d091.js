import{i as e,h as t,j as s,R as a,g as r,e as i}from"./element-plus-d03e850c.js";import{l}from"./index-c7b80162.js";import{_ as n}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as o,o as d,c as u,a as p,X as m,P as h,S as c,W as f,Q as _,a8 as j,T as g,Y as v}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const z=JSON.stringify(l().languageData),y=l().languageList,b={class:"common-form mt50"},w={class:"mt16"},x={class:"product-tips"};const k=n({data:()=>({languageList:y,restaurants:[],restaurants_zh:[],restaurants_zhtw:[],restaurants_en:[],restaurants_th:[],formData:{feed:[]}}),inject:{form:{default:()=>{}}},watch:{form:{handler(e){this.restaurants_zh=[],this.restaurants_zhtw=[],this.restaurants_en=[],this.restaurants_th=[],e.feed.map(((e,t)=>{this.restaurants_zh.push({value:JSON.parse(e.feed_name).zh,index:t,price:e.price}),this.restaurants_zhtw.push({value:JSON.parse(e.feed_name).zhtw,index:t,price:e.price}),this.restaurants_en.push({value:JSON.parse(e.feed_name).en,index:t,price:e.price}),this.restaurants_th.push({value:JSON.parse(e.feed_name).th,index:t,price:e.price})}))},deep:!0,immediate:!0}},methods:{addIngredients(){this.form.model.product_feed.push({feed_name:JSON.parse(z),price:""})},handleDelete(e){this.form.model.product_feed.splice(e,1)},querySearch(e,t,s){let a=[];"th"==s&&(a=this.restaurants_th),"zh"==s&&(a=this.restaurants_zh),"zhtw"==s&&(a=this.restaurants_zhtw),"en"==s&&(a=this.restaurants_en),t(e?a.filter(this.createFilter(e,s)):a)},createFilter(e,t){return"th"==t&&this.restaurants_th,"zh"==t&&this.restaurants_zh,"zhtw"==t&&this.restaurants_zhtw,"en"==t&&this.restaurants_en,t=>0===t.value.toLowerCase().indexOf(e.toLowerCase())},selectChange(e,t){this.form.model.product_feed[t].price=e.price,this.form.model.product_feed[t].feed_name.zh=this.restaurants_zh[e.index].value,this.form.model.product_feed[t].feed_name.th=this.restaurants_th[e.index].value,this.form.model.product_feed[t].feed_name.en=this.restaurants_en[e.index].value,this.form.model.product_feed[t].feed_name.zhtw=this.restaurants_zhtw[e.index].value}}},[["render",function(l,n,z,y,k,S){const C=e,V=t,O=o("Delete"),$=s,J=a,N=r,D=i;return d(),u("div",null,[p("div",b,m(l.$t("商品加料")),1),p("div",null,[p("div",w,[h(V,{label:l.$t("商品加料：")},{default:c((()=>[h(C,{type:"primary",onClick:S.addIngredients},{default:c((()=>[f(m(l.$t("添加加料"))+"+",1)])),_:1},8,["onClick"])])),_:1},8,["label"]),S.form.model.product_feed.length>0?(d(!0),u(_,{key:0},j(S.form.model.product_feed,((e,t)=>(d(),g(V,{class:"product-box mb18",key:t},{label:c((()=>[h($,{class:"delete-icon",onClick:e=>S.handleDelete(t)},{default:c((()=>[h(O)])),_:2},1032,["onClick"])])),default:c((()=>[h(D,{class:"product-attr"},{default:c((()=>[(d(!0),u(_,null,j(k.languageList,((s,a)=>(d(),g(V,{key:a,prop:"item.feed_name[items.key]",rules:[{validator:()=>!!e.feed_name[s.key],message:l.$t("请输入属性")}]},{label:c((()=>[f(m(l.$t("加料名称：")),1),p("span",x,m(s.label),1)])),default:c((()=>[h(J,{"fetch-suggestions":(e,t)=>S.querySearch(e,t,s.key),onSelect:e=>S.selectChange(e,t),class:"inline-input",modelValue:e.feed_name[s.key],"onUpdate:modelValue":t=>e.feed_name[s.key]=t,maxlength:"128",placeholder:l.$t("如:杯型")},null,8,["fetch-suggestions","onSelect","modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["prop","rules"])))),128)),h(V,{label:l.$t("价格：")},{default:c((()=>[h(N,{class:"inline-input",type:"number",size:"small",modelValue:e.price,"onUpdate:modelValue":t=>e.price=t,placeholder:""},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1032,["label"])])),_:2},1024)])),_:2},1024)))),128)):v("",!0)])])])}],["__scopeId","data-v-b7e628da"]]);export{k as default};
