import{i as t,e}from"./element-plus-bf694ad1.js";import{P as o}from"./product-d0bcaadc.js";import i from"./Basic-e24d5023.js";import s from"./Attr-154ebbef.js";import r from"./Ingredients-b6aab139.js";import a from"./Spec-45906234.js";import n from"./Content-1ed18ade.js";import p from"./Buyset-05cd01fa.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as d,o as l,c,O as u,R as j,a as _,V as f}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-e8d31a3a.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./Upload-57787ceb.js";import"./file-08a50dd8.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";import"./UE-336ada64.js";const g={class:"product-add"},y={class:"common-button-wrapper"};const h=m({components:{Basic:i,Spec:a,Attr:s,Ingredients:r,Content:n,Buyset:p},data:()=>({loading:!1,form:{model:{product_name:"",category_id:null,image:[],selling_point:"",spec_type:10,deduct_stock_type:20,is_alone_grade:0,sku:[{product_price:"",stock_num:"",product_weight:"",cost_price:""}],product_attr:[],product_feed:[],min_buy:1,product_unit:"",content:"",product_status:10,sales_initial:0,product_sort:100,limit_num:0,special_id:0,is_points_gift:1,is_agent:0,is_ind_agent:0,agent_money_type:10,first_money:0,second_money:0,third_money:0,is_enable_grade:1,alone_grade_type:10,label_id:""},category:[],feed:[],attribute:[],unit:[],spec:[],labelList:[],special:[],delivery:[],gradeList:[],specData:null,basicSetting:{},agentSetting:{}}}),provide:function(){return{form:this.form}},created(){this.getBaseData()},methods:{getBaseData:function(){let t=this;o.takeGetBaseData({},!0).then((e=>{t.loading=!1,Object.assign(t.form,e.data)})).catch((e=>{t.loading=!1}))},convertJson(t){let e={};return t.forEach((t=>{e[t.grade_id]=t.product_equity})),JSON.stringify(e)},onSubmit:function(){let t=this,e=t.form.model;t.$refs.form.validate((i=>{i&&(t.loading=!0,e.alone_grade_equity=t.convertJson(t.form.gradeList),o.takeAddProduct({params:JSON.stringify(e)},!0).then((e=>{t.loading=!1,this.$ElMessage({message:"添加成功",type:"success"}),t.$router.push("/product/takeaway/product/index")})).catch((e=>{t.loading=!1})))}))},Draft(){this.form.model.product_status=30,this.onSubmit()},cancelFunc(){this.$router.back(-1)}}},[["render",function(o,i,s,r,a,n){const p=d("Basic"),m=d("Spec"),h=d("Attr"),b=d("Ingredients"),v=d("Content"),k=d("Buyset"),B=t,S=e;return l(),c("div",g,[u(S,{size:"small",ref:"form",model:a.form,"label-position":"top","label-width":"180px",loading:a.loading},{default:j((()=>[u(p),u(m),u(h),u(b),u(v),u(k),_("div",y,[u(B,{size:"small",onClick:n.cancelFunc},{default:j((()=>[f("取消")])),_:1},8,["onClick"]),u(B,{size:"small",type:"primary",onClick:n.onSubmit,loading:a.loading},{default:j((()=>[f("发布")])),_:1},8,["onClick","loading"])])])),_:1},8,["model","loading"])])}],["__scopeId","data-v-fa4286d1"]]);export{h as default};
