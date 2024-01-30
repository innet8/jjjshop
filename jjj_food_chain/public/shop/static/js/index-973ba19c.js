import{_ as t}from"./Product-8ac49ebe.js";import{H as e,h as o,i as a,m as d,D as l,g as i,n as s,e as p}from"./element-plus-b01b3a31.js";import{r}from"./index-83a39651.js";import{_ as u}from"./_plugin-vue_export-helper-1b428a4d.js";import{ap as c,o as n,c as m,P as _,S as h,W as g,$ as f,a as b,X as k}from"./@vue-e72ffbb6.js";import"./product-ade04cbc.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";let j={getDiscount:(t,e)=>r._get("/shop/plus.Discount/index",t,e),setDiscount:(t,e)=>r._post("/shop/plus.Discount/index",t,e),add:(t,e)=>r._post("/shop/plus.table.table/add",t,e),edit:(t,e)=>r._post("/shop/plus.table.table/edit",t,e),del:(t,e)=>r._post("/shop/plus.table.table/delete",t,e)};const y={class:"product-add"},w={alt:"",width:50},D={alt:"",width:50},x={class:"common-button-wrapper"};const V=u({components:{Product:t},data:()=>({discount_product_ids:[],form:{},isproduct:!1,exclude_ids:[],product_type:0,loading:!0,takeoutData:[],storeData:[],time:[],pickerOptions0:{disabledDate:t=>t.getTime()<Date.now()-864e5}}),created(){this.getData()},methods:{getData(){let t=this;t.loading=!0,j.getDiscount({},!0).then((e=>{e.data.detail&&(t.storeData=e.data.detail.store_product,t.takeoutData=e.data.detail.takeout_product,t.exclude_ids=e.data.productIds,e.data.detail.time&&(t.time=e.data.detail.time)),t.loading=!1})).catch((t=>{}))},onSubmit(){let t=this;t.loading=!0;let e={product:"",discount_product_ids:t.discount_product_ids,time:t.time};e.discount_product_ids.length<=0&&(e.discount_product_ids=0),e.product=JSON.stringify([...t.takeoutData,...t.storeData]),j.setDiscount(e,!0).then((e=>{this.$ElMessage({message:e.msg,type:"success"}),t.takeoutData=[],t.storeData=[],t.getData(),t.loading=!1})).catch((t=>{}))},getPrice:t=>t.product?parseFloat(1*t.product.product_price*t.discount*1*.1).toFixed(2):0,addTakeout(){this.product_type=0,this.isproduct=!0},addStore(){this.product_type=1,this.isproduct=!0},delcoupon(t,e){let o=this;if(o[t][e].discount_product_id){let a=o.discount_product_ids.indexOf(o[t][e].discount_product_id);-1==a?o.discount_product_ids.push(o[t][e].discount_product_id):o.discount_product_ids.splice(a,1)}o[t].splice(e,1)},closeProductFunc(t){let e=this;if(e.isproduct=t.openDialog,"success"==t.type){let o={product_type:t.params.product_type,discount:10,product_id:t.params.product_id,stock:0,product:{product_name:t.params.product_name,product_price:t.params.product_price},logo:{file_path:t.params.product_image}};0==e.product_type?e.takeoutData.push(o):e.storeData.push(o)}}}},[["render",function(r,u,j,V,v,C){const U=e,P=o,S=a,T=d,z=l,F=i,I=s,O=p,Y=t,$=c("img-url");return n(),m("div",y,[_(O,{size:"small",ref:"form",model:v.form,"label-position":"top","label-width":"200px"},{default:h((()=>[_(P,{label:"活动时间"},{default:h((()=>[_(U,{modelValue:v.time,"onUpdate:modelValue":u[0]||(u[0]=t=>v.time=t),type:"daterange",align:"right","unlink-panels":"","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":v.pickerOptions0},null,8,["modelValue","picker-options"])])),_:1}),_(P,{label:"外卖商品"},{default:h((()=>[_(S,{type:"primary",link:"",onClick:C.addTakeout},{default:h((()=>[g("添加外卖商品")])),_:1},8,["onClick"]),_(I,{data:v.takeoutData,"highlight-current-row":"",ref:"singleTable"},{default:h((()=>[_(T,{prop:"lottery_id",label:"序号",type:"index"}),_(T,{prop:"product.product_name",label:"商品名称",width:"280"}),_(T,{prop:"product_image",label:"商品图片",width:"180"},{default:h((t=>[f(b("img",w,null,512),[[$,t.row.logo.file_path||""]])])),_:1}),_(T,{prop:"product_image",label:"活动折扣",width:"180"},{default:h((t=>[_(z,{modelValue:t.row.discount,"onUpdate:modelValue":e=>t.row.discount=e,precision:1,step:.1,max:10,min:0},null,8,["modelValue","onUpdate:modelValue","step"])])),_:1}),_(T,{prop:"product_image",label:"活动价格",width:"180"},{default:h((t=>[g(k(C.getPrice(t.row)),1)])),_:1}),_(T,{prop:"stock",label:"活动库存",rules:[{required:!0,message:" "}]},{default:h((t=>[_(F,{type:"number",modelValue:t.row.stock,"onUpdate:modelValue":e=>t.row.stock=e,placeholder:"",min:0},null,8,["modelValue","onUpdate:modelValue"])])),_:1}),_(T,{prop:"address",label:"操作"},{default:h((t=>[_(S,{type:"primary",link:"",size:"small",onClick:e=>C.delcoupon("takeoutData",t.$index)},{default:h((()=>[g(" 删除 ")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])])),_:1}),_(P,{label:"店内商品"},{default:h((()=>[_(S,{type:"primary",link:"",onClick:C.addStore},{default:h((()=>[g("添加店内商品")])),_:1},8,["onClick"]),_(I,{data:v.storeData,"highlight-current-row":"",ref:"singleTable"},{default:h((()=>[_(T,{prop:"lottery_id",label:"序号",type:"index"}),_(T,{prop:"product.product_name",label:"商品名称",width:"280"},{default:h((t=>[g(k(t.row.product?t.row.product.product_name:""),1)])),_:1}),_(T,{prop:"file_path",label:"商品图片",width:"180"},{default:h((t=>[f(b("img",D,null,512),[[$,t.row.logo.file_path||""]])])),_:1}),_(T,{prop:"product_image",label:"活动折扣",width:"180"},{default:h((t=>[_(z,{modelValue:t.row.discount,"onUpdate:modelValue":e=>t.row.discount=e,precision:1,step:.1,max:10,min:0},null,8,["modelValue","onUpdate:modelValue","step"])])),_:1}),_(T,{prop:"product_price",label:"活动价格",width:"180"},{default:h((t=>[g(k(C.getPrice(t.row)),1)])),_:1}),_(T,{prop:"stock",label:"活动库存",rules:[{required:!0,message:" "}]},{default:h((t=>[_(F,{type:"number",modelValue:t.row.stock,"onUpdate:modelValue":e=>t.row.stock=e,placeholder:"",min:0},null,8,["modelValue","onUpdate:modelValue"])])),_:1}),_(T,{prop:"address",label:"操作"},{default:h((t=>[_(S,{type:"primary",link:"",size:"small",onClick:e=>C.delcoupon("storeData",t.$index)},{default:h((()=>[g(" 删除 ")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])])),_:1}),b("div",x,[_(S,{type:"primary",onClick:C.onSubmit,loading:v.loading},{default:h((()=>[g("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]),_(Y,{isproduct:v.isproduct,excludeIds:v.exclude_ids,product_type:v.product_type,spec_type:"10",islist:!1,onCloseDialog:C.closeProductFunc},null,8,["isproduct","excludeIds","product_type","onCloseDialog"])])}],["__scopeId","data-v-1890d28c"]]);export{V as default};
