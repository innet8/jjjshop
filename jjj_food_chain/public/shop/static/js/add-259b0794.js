import{i as t,e}from"./element-plus-33e0d8cc.js";import{P as o}from"./product-f7014bea.js";import i from"./Basic-c0792261.js";import s from"./Attr-1996b6ac.js";import r from"./Ingredients-27745c64.js";import a from"./Spec-1e655b3b.js";import n from"./Content-1bcfbb7c.js";import p from"./Buyset-3a3c0bd8.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as d,o as l,c,P as u,S as _,a as j,W as g}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-2a70ce31.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./Upload-423c9ce2.js";import"./file-43fcf892.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./UE-7315747a.js";const f={class:"product-add"},y={class:"common-button-wrapper"};const h=m({components:{Basic:i,Spec:a,Attr:s,Ingredients:r,Content:n,Buyset:p},data:()=>({loading:!1,form:{model:{product_name:"",category_id:null,image:[],selling_point:"",spec_type:10,deduct_stock_type:20,is_alone_grade:0,sku:[{product_price:"",stock_num:"",product_weight:"",cost_price:""}],product_attr:[],product_feed:[],min_buy:1,product_unit:"",content:"",product_status:10,sales_initial:0,product_sort:100,limit_num:0,special_id:0,is_points_gift:1,is_agent:0,is_ind_agent:0,agent_money_type:10,first_money:0,second_money:0,third_money:0,is_enable_grade:1,alone_grade_type:10,label_id:""},category:[],feed:[],attribute:[],unit:[],spec:[],labelList:[],special:[],delivery:[],gradeList:[],specData:null,basicSetting:{},agentSetting:{}}}),provide:function(){return{form:this.form}},created(){this.getBaseData()},methods:{getBaseData:function(){let t=this;o.takeGetBaseData({},!0).then((e=>{t.loading=!1,Object.assign(t.form,e.data)})).catch((e=>{t.loading=!1}))},convertJson(t){let e={};return t.forEach((t=>{e[t.grade_id]=t.product_equity})),JSON.stringify(e)},onSubmit:function(){let t=this,e=t.form.model;t.$refs.form.validate((i=>{i&&(t.loading=!0,e.alone_grade_equity=t.convertJson(t.form.gradeList),o.takeAddProduct({params:JSON.stringify(e)},!0).then((e=>{t.loading=!1,this.$ElMessage({message:"添加成功",type:"success"}),t.$router.push("/product/takeaway/product/index")})).catch((e=>{t.loading=!1})))}))},Draft(){this.form.model.product_status=30,this.onSubmit()},cancelFunc(){this.$router.back(-1)}}},[["render",function(o,i,s,r,a,n){const p=d("Basic"),m=d("Spec"),h=d("Attr"),b=d("Ingredients"),v=d("Content"),k=d("Buyset"),S=t,B=e;return l(),c("div",f,[u(B,{size:"small",ref:"form",model:a.form,"label-position":"top","label-width":"180px",loading:a.loading},{default:_((()=>[u(p),u(m),u(h),u(b),u(v),u(k),j("div",y,[u(S,{size:"small",type:"info",onClick:n.cancelFunc},{default:_((()=>[g("取消")])),_:1},8,["onClick"]),u(S,{size:"small",type:"primary",onClick:n.onSubmit,loading:a.loading},{default:_((()=>[g("发布")])),_:1},8,["onClick","loading"])])])),_:1},8,["model","loading"])])}],["__scopeId","data-v-049575e5"]]);export{h as default};