import{i as t,e as o}from"./element-plus-33e0d8cc.js";import{P as s}from"./points-9568e19b.js";import i from"./Basic-2e03cd3b.js";import e from"./Spec-e81a53c3.js";import r from"./Content-6f7ce684.js";import a from"./Buyset-f6feac31.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as m,o as n,c as l,P as c,S as d,a as u,W as j}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-188a77f0.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./Upload-66ad4daf.js";import"./file-5ed95284.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./vuedraggable-e6f803aa.js";import"./sortablejs-45d6ab95.js";import"./UE-a81edceb.js";const f={class:"product-add"},g={class:"common-button-wrapper"};const h=p({components:{Basic:i,Spec:e,Content:r,Buyset:a},data:()=>({loading:!1,form:{model:{product_name:"",product_price:"",product_points:"",category_id:null,file_path:"",image_id:"",content:"",product_status:10,product_sort:100,limit_num:0,delivery_set:[10,20],express_price:"",product_stock:""},category:{all:[]},feed:[],special:[],delivery:[],gradeList:[],specData:null}}),provide:function(){return{form:this.form}},created(){this.getBaseData()},methods:{getBaseData:function(){let t=this;s.getProduct({},!0).then((o=>{t.loading=!1,Object.assign(t.form,o.data)})).catch((o=>{t.loading=!1}))},convertJson(t){let o={};return t.forEach((t=>{o[t.grade_id]=t.product_equity})),JSON.stringify(o)},onSubmit:function(){let t=this,o=t.form.model;t.$refs.form.validate((i=>{i&&(t.loading=!0,s.addProduct({params:JSON.stringify(o)},!0).then((o=>{t.loading=!1,this.$ElMessage({message:"添加成功",type:"success"}),t.$router.push("/plus/points/index")})).catch((o=>{t.loading=!1})))}))},Draft(){this.form.model.product_status=30,this.onSubmit()},cancelFunc(){this.$router.back(-1)}}},[["render",function(s,i,e,r,a,p){const h=m("Basic"),_=m("Spec"),v=m("Content"),y=m("Buyset"),b=t,B=o;return n(),l("div",f,[c(B,{size:"small",ref:"form",model:a.form,"label-position":"top","label-width":"180px"},{default:d((()=>[c(h),c(_),c(v),c(y),u("div",g,[c(b,{size:"small",type:"info",onClick:p.cancelFunc},{default:d((()=>[j("取消")])),_:1},8,["onClick"]),c(b,{size:"small",type:"primary",onClick:p.onSubmit,loading:a.loading},{default:d((()=>[j("发布")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}],["__scopeId","data-v-f4fa9235"]]);export{h as default};
