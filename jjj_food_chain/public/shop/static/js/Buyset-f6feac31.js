import{p as e,q as l,h as o,g as s,u as m,w as a}from"./element-plus-33e0d8cc.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as t,c as d,T as u,S as p,P as i,W as n,Y as c,a as f}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";const _={data:()=>({unit:"%",grade_unit:"%"}),created(){},inject:["form"],methods:{hasType(){return-1!=this.form.model.delivery_set.indexOf(10)}}},j={class:"buy-set-content pl16 pr16"},b=f("div",{class:"common-form mt50"},"其他设置",-1),y=f("div",{class:"gray9"},"每个会员购买的最大数量，0为不限购",-1);const V=r(_,[["render",function(r,f,_,V,h,v){const g=e,x=l,q=o,w=s,U=m,k=a;return t(),d("div",j,[b,40!=v.form.model.product_status?(t(),u(q,{key:0,label:"商品状态：",rules:[{required:!0,message:"选择商品状态"}],prop:"model.product_status"},{default:p((()=>[i(x,{modelValue:v.form.model.product_status,"onUpdate:modelValue":f[0]||(f[0]=e=>v.form.model.product_status=e)},{default:p((()=>[i(g,{label:10},{default:p((()=>[n("上架")])),_:1}),i(g,{label:20},{default:p((()=>[n("下架")])),_:1})])),_:1},8,["modelValue"])])),_:1})):c("",!0),i(q,{label:"商品排序：",rules:[{required:!0,message:" "}],prop:"model.product_sort"},{default:p((()=>[i(w,{type:"number",min:"0",modelValue:v.form.model.product_sort,"onUpdate:modelValue":f[1]||(f[1]=e=>v.form.model.product_sort=e),class:"max-w460"},null,8,["modelValue"])])),_:1}),i(q,{label:"限购数量：",rules:[{required:!0,message:" "}],prop:"model.limit_num"},{default:p((()=>[i(w,{type:"number",min:"0",modelValue:v.form.model.limit_num,"onUpdate:modelValue":f[2]||(f[2]=e=>v.form.model.limit_num=e),class:"max-w460"},null,8,["modelValue"]),y])),_:1}),i(q,{label:"配送支持：",rules:[{required:!0,message:" "}],prop:"model.delivery_set"},{default:p((()=>[i(k,{modelValue:v.form.model.delivery_set,"onUpdate:modelValue":f[3]||(f[3]=e=>v.form.model.delivery_set=e),min:1,max:2},{default:p((()=>[i(U,{label:10},{default:p((()=>[n("快递配送")])),_:1}),i(U,{label:20},{default:p((()=>[n("到店自提")])),_:1})])),_:1},8,["modelValue"])])),_:1}),v.hasType()?(t(),u(q,{key:1,label:"配送费：",rules:[{required:!0,message:" "}],prop:"model.express_price"},{default:p((()=>[i(w,{type:"number",min:"0",modelValue:v.form.model.express_price,"onUpdate:modelValue":f[4]||(f[4]=e=>v.form.model.express_price=e),class:"max-w460"},null,8,["modelValue"])])),_:1})):c("",!0)])}]]);export{V as default};