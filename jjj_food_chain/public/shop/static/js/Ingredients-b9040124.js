import{T as e,d as s,c as t,e as l}from"./element-plus-7d357588.js";import{_ as a}from"./index-f792122d.js";import{o as r,c as d,a as i,W as o,Q as m,a8 as n,P as p,S as c,Y as u,b as f}from"./@vue-48c55b54.js";import"./@vueuse-c556fb5a.js";import"./lodash-es-c1acaa3d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-e0f4a3e8.js";import"./dayjs-9faf8871.js";import"./call-bind-0c463fe3.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-b8ff3004.js";import"./pinia-73166104.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-942d6868.js";import"./side-channel-ba7aab8a.js";import"./object-inspect-860361a9.js";import"./vue-ueditor-wrap-cd29f9a1.js";const h={data:()=>({restaurants:[],formData:{feed:[]}}),inject:{form:{default:()=>{}}},methods:{addIngredients(){""==this.form.model.product_feed&&(this.form.model.product_feed=[]),this.form.model.product_feed.push({feed_name:"",price:""})},deleteIngredients(e){this.form.model.product_feed.splice(e,1)},querySearch(e,s){let t=this;0==t.restaurants.length&&t.form.feed.forEach(((e,s)=>{t.restaurants.push({value:e.feed_name})}));var l=this.restaurants;s(e?l.filter(this.createFilter(e)):l)},createFilter:e=>s=>0===s.value.toLowerCase().indexOf(e.toLowerCase())}},j=i("div",{class:"common-form mt50"},"商品加料",-1),v={class:"mt16"},b={class:"p-0-30 mb18"},g={class:"d-s-c"},_=f('<div class="d-c-c mb16"><div style="width:100px;"><span class="red">*</span>加料名称：</div><div class="flex-1 ml20"><span class="red">*</span>价格</div></div>',1),y={class:"d-s-c mb10"},w={class:"d-s-c ml20"},x=i("span",{class:"ml10"},"元",-1);const V=a(h,[["render",function(a,f,h,V,k,q){const C=e,I=s,U=t,z=l;return r(),d("div",null,[j,i("div",null,[i("div",v,[i("div",b,[i("div",g,[o("商品加料: "),i("div",{class:"blue ml30",onClick:f[0]||(f[0]=(...e)=>q.addIngredients&&q.addIngredients(...e))},"添加加料+")])]),q.form.model.product_feed.length>0?(r(!0),d(m,{key:0},n(q.form.model.product_feed,((e,s)=>(r(),d("div",{class:"p-0-30 mb18",key:s},[_,i("div",y,[i("div",null,[p(I,{label:"",rules:[{required:!0,message:" "}],prop:"model.product_feed."+s+".feed_name",style:{"margin-bottom":"0",width:"100px"},"label-width":"0"},{default:c((()=>[p(C,{class:"inline-input",modelValue:e.feed_name,"onUpdate:modelValue":s=>e.feed_name=s,placeholder:"如:杯型","fetch-suggestions":q.querySearch},null,8,["modelValue","onUpdate:modelValue","fetch-suggestions"])])),_:2},1032,["prop"])]),i("div",w,[i("div",null,[p(I,{label:"",rules:[{required:!0,message:" "}],prop:"model.product_feed."+s+".price",style:{"margin-bottom":"0"},"label-width":"0"},{default:c((()=>[p(U,{type:"number",style:{width:"100px"},size:"medium",modelValue:e.price,"onUpdate:modelValue":s=>e.price=s,placeholder:""},null,8,["modelValue","onUpdate:modelValue"]),o(),x])),_:2},1032,["prop"])])])]),p(z,{size:"mini",icon:"Delete",circle:"",onClick:e=>q.deleteIngredients(s)},null,8,["onClick"])])))),128)):u("",!0)])])])}]]);export{V as default};
