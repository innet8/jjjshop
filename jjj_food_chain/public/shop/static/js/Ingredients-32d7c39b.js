import{i as e,h as t,j as s,R as a,g as r,e as i}from"./element-plus-c8084613.js";import{l as o}from"./index-7d657154.js";import{_ as l}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as n,o as d,c as p,a as m,W as u,O as h,R as c,V as f,P as _,a7 as j,S as g,X as z}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const v=JSON.stringify(o().languageData),y=o().languageList,w={class:"common-form mt50"},x={class:"mt16"},b={class:"product-tips"};const S=l({data:()=>({languageList:y,restaurants:[],restaurants_zh:[],restaurants_zhtw:[],restaurants_en:[],restaurants_th:[],formData:{feed:[]}}),inject:{form:{default:()=>{}}},watch:{form:{handler(e){this.restaurants_zh=[],this.restaurants_zhtw=[],this.restaurants_en=[],this.restaurants_th=[],e.feed.map(((e,t)=>{JSON.parse(e.feed_name).zh&&JSON.parse(e.feed_name).zhtw&&JSON.parse(e.feed_name).en&&JSON.parse(e.feed_name).th&&(this.restaurants_zh.push({value:JSON.parse(e.feed_name).zh,index:t,price:e.price}),this.restaurants_zhtw.push({value:JSON.parse(e.feed_name).zhtw,index:t,price:e.price}),this.restaurants_en.push({value:JSON.parse(e.feed_name).en,index:t,price:e.price}),this.restaurants_th.push({value:JSON.parse(e.feed_name).th,index:t,price:e.price}))}))},deep:!0,immediate:!0}},methods:{addIngredients(){this.form.model.product_feed.push({feed_name:JSON.parse(v),price:""})},handleDelete(e){this.form.model.product_feed.splice(e,1)},querySearch(e,t,s){let a=[];"th"==s&&(a=this.restaurants_th),"zh"==s&&(a=this.restaurants_zh),"zhtw"==s&&(a=this.restaurants_zhtw),"en"==s&&(a=this.restaurants_en),t(e?a.filter(this.createFilter(e,s)):a)},createFilter(e,t){return"th"==t&&this.restaurants_th,"zh"==t&&this.restaurants_zh,"zhtw"==t&&this.restaurants_zhtw,"en"==t&&this.restaurants_en,t=>0===t.value.toLowerCase().indexOf(e.toLowerCase())},selectChange(e,t){this.form.model.product_feed[t].price=e.price,this.form.model.product_feed[t].feed_name.zh=this.restaurants_zh[e.index].value,this.form.model.product_feed[t].feed_name.th=this.restaurants_th[e.index].value,this.form.model.product_feed[t].feed_name.en=this.restaurants_en[e.index].value,this.form.model.product_feed[t].feed_name.zhtw=this.restaurants_zhtw[e.index].value},checkedForm(){this.form.model.product_feed.map(((e,t)=>{this.$refs["form-"+t].forEach(((e,s)=>{this.$refs["form-"+t][s].validate((e=>{}))}))}))}}},[["render",function(o,l,v,y,S,k){const O=e,J=t,$=n("Delete"),N=s,C=a,V=r,D=i;return d(),p("div",null,[m("div",w,u(o.$t("商品加料")),1),m("div",null,[m("div",x,[h(J,{label:o.$t("商品加料：")},{default:c((()=>[h(O,{type:"primary",onClick:k.addIngredients},{default:c((()=>[f(u(o.$t("添加加料"))+"+",1)])),_:1},8,["onClick"])])),_:1},8,["label"]),k.form.model.product_feed.length>0?(d(!0),p(_,{key:0},j(k.form.model.product_feed,((e,t)=>(d(),g(J,{class:"product-box mb18",key:t},{label:c((()=>[h(N,{class:"delete-icon",onClick:e=>k.handleDelete(t)},{default:c((()=>[h($)])),_:2},1032,["onClick"])])),default:c((()=>[h(D,{ref_for:!0,ref:"form-".concat(t),model:e,class:"product-attr"},{default:c((()=>[(d(!0),p(_,null,j(S.languageList,((s,a)=>(d(),g(J,{key:a,prop:"item.feed_name[items.key]",rules:[{validator:()=>!!e.feed_name[s.key],message:o.$t("请输入加料名称")}]},{label:c((()=>[f(u(o.$t("加料名称：")),1),m("span",b,"("+u(s.label)+")",1)])),default:c((()=>[h(C,{"fetch-suggestions":(e,t)=>k.querySearch(e,t,s.key),onSelect:e=>k.selectChange(e,t),class:"inline-input",modelValue:e.feed_name[s.key],"onUpdate:modelValue":t=>e.feed_name[s.key]=t,maxlength:"128",placeholder:o.$t("如：番茄酱")},null,8,["fetch-suggestions","onSelect","modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["prop","rules"])))),128)),h(J,{label:o.$t("价格："),prop:"item.price",rules:[{validator:()=>""!=e.price,message:o.$t("请输入价格")}]},{default:c((()=>[h(V,{class:"inline-input",placeholder:o.$t("价格"),type:"number",size:"small",modelValue:e.price,"onUpdate:modelValue":t=>e.price=t},null,8,["placeholder","modelValue","onUpdate:modelValue"])])),_:2},1032,["label","prop","rules"])])),_:2},1032,["model"])])),_:2},1024)))),128)):z("",!0)])])])}],["__scopeId","data-v-62c3d14e"]]);export{S as default};