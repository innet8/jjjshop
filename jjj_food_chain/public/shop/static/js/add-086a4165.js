import{E as t,i as e,e as i}from"./element-plus-d03e850c.js";import{P as s}from"./product-a2381416.js";import r from"./Basic-8db5cd38.js";import o from"./Attr-6fa2471a.js";import a from"./Ingredients-a73d2ce6.js";import n from"./Spec-3ab48518.js";import p from"./Content-f9ade63a.js";import m from"./Buyset-ae1d61d7.js";import{l as c}from"./index-8a56ff53.js";import{_ as d}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as u,o as l,c as _,P as f,S as g,a as j,W as y}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./Upload-8d45ba26.js";import"./file-4be86a03.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./UE-25f64ce5.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const h=JSON.stringify(c().languageData),b={class:"product-add"},S={class:"common-button-wrapper"};const v=d({components:{Basic:r,Spec:n,Attr:o,Ingredients:a,Content:p,Buyset:m},data:()=>({loading:!1,form:{model:{product_name:JSON.parse(h),category_id:null,image:[],selling_point:"",spec_type:10,deduct_stock_type:20,is_alone_grade:0,sku:[{spec_name:{th:"",zh:"",zhtw:"",en:""},product_price:"",stock_num:"",product_weight:"",cost_price:0}],product_attr:[],product_feed:[],min_buy:1,product_unit:JSON.parse(h),content:"",product_status:10,sales_initial:0,product_sort:100,limit_num:0,special_id:"",is_points_gift:1,is_agent:0,is_ind_agent:0,agent_money_type:10,first_money:0,second_money:0,third_money:0,is_enable_grade:1,alone_grade_type:10,label_id:""},category:[],feed:[],attribute:[],unit:[],spec:[],labelList:[],special:[],delivery:[],gradeList:[],specData:null,basicSetting:{},agentSetting:{}}}),provide:function(){return{form:this.form}},created(){this.getBaseData()},methods:{getBaseData:function(){let t=this;s.storeGetBaseData({},!0).then((e=>{t.loading=!1,Object.assign(t.form,e.data)})).catch((e=>{t.loading=!1}))},convertJson(t){let e={};return t.forEach((t=>{e[t.grade_id]=t.product_equity})),JSON.stringify(e)},onSubmit:function(){let e=this,i=JSON.parse(JSON.stringify(e.form.model));i.product_name=JSON.stringify(i.product_name),i.product_unit=JSON.stringify(i.product_unit),i.sku.map(((t,e)=>{i.sku[e].spec_name=JSON.stringify(t.spec_name)})),i.product_attr.map(((t,e)=>{i.product_attr[e].attribute_name=JSON.stringify(t.attribute_name),t.attribute_value.map(((t,s)=>{i.product_attr[e].attribute_value[s]=JSON.stringify(t)}))})),i.product_feed.map(((t,e)=>{i.product_feed[e].feed_name=JSON.stringify(t.feed_name)})),e.$refs.form.validate((r=>{r&&(e.loading=!0,i.alone_grade_equity=e.convertJson(e.form.gradeList),s.storeAddProduct({params:JSON.stringify(i)},!0).then((i=>{e.loading=!1,t({message:"添加成功",type:"success"}),e.$router.push("/product/store/product/index")})).catch((t=>{e.loading=!1})))}))},Draft(){this.form.model.product_status=30,this.onSubmit()},cancelFunc(){this.$router.back(-1)}}},[["render",function(t,s,r,o,a,n){const p=u("Basic"),m=u("Spec"),c=u("Attr"),d=u("Ingredients"),h=u("Buyset"),v=e,J=i;return l(),_("div",b,[f(J,{size:"small",ref:"form",model:a.form,"label-position":"top","label-width":"180px"},{default:g((()=>[f(p),f(m),f(c),f(d),f(h),j("div",S,[f(v,{size:"small",type:"info",onClick:n.cancelFunc},{default:g((()=>[y("取消")])),_:1},8,["onClick"]),f(v,{size:"small",type:"primary",onClick:n.onSubmit,loading:a.loading},{default:g((()=>[y("发布")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}],["__scopeId","data-v-610c3fcf"]]);export{v as default};