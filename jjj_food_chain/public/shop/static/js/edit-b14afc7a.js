import{E as t,i as o,e,v as i}from"./element-plus-b01b3a31.js";import{P as s}from"./points-758023c5.js";import r from"./Basic-fd7d4a7f.js";import a from"./Spec-ad110910.js";import p from"./Content-df2cc165.js";import d from"./Buyset-9cbf5ce1.js";import{f as m}from"./index-fed3ed55.js";import{_ as n}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as c,$ as l,o as u,c as j,T as f,S as _,P as g,a as h,W as v,Y as y}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./Upload-a45cc344.js";import"./file-9ae0c9ba.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./vuedraggable-e6f803aa.js";import"./sortablejs-45d6ab95.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./UE-94fd85c5.js";const b={class:"product-add"},S={class:"common-button-wrapper"};const k=n({components:{Basic:r,Spec:a,Content:p,Buyset:d},data:()=>({old_audit:20,product_id:0,scene:"edit",loading:!0,save_loading:!1,form:{model:{},category:[],feed:[],special:[],gradeList:[],specData:null,isSpecLocked:!1},model:{product_name:"",product_price:"",product_points:"",category_id:null,file_path:"",image_id:"",content:"",product_status:10,product_sort:100,limit_num:0,delivery_set:[10,20],express_price:"",product_stock:""}}),provide:function(){return{form:this.form}},created(){this.product_id=this.$route.query.product_id,this.scene=this.$route.query.scene,this.getData()},methods:{getData:function(){let t=this;s.getEditProduct({product_id:t.product_id},!0).then((o=>{t.loading=!1,Object.assign(t.form,o.data),t.form.model.product_status=o.data.model.product_status.value})).catch((o=>{t.loading=!1}))},convertJson(t){let o={};return t.forEach((t=>{o[t.grade_id]=t.product_equity})),JSON.stringify(o)},onSubmit:function(){let o=this;o.$refs.form.validate((e=>{if(m(o.model,o.form.model),e){let e=m(o.model,o.form.model);e.product_id=o.product_id,o.save_loading=!0,s.editProduct({product_id:o.product_id,params:JSON.stringify(e)},!0).then((e=>{o.save_loading=!1,t({message:"保存成功",type:"success"}),o.cancelFunc()})).catch((t=>{o.save_loading=!1}))}}))},ImgKeepId(t){let o=[];for(let e=0,i=t.length;e<i;e++){let i={image_id:t[e].image_id,file_id:t[e].file_id};o.push(i)}return o},Draft(){this.form.model.product_status=30,this.onSubmit()},cancelFunc(){this.$router.back(-1)}}},[["render",function(t,s,r,a,p,d){const m=c("Basic"),n=c("Spec"),k=c("Content"),C=c("Buyset"),x=o,B=e,w=i;return l((u(),j("div",b,[p.loading?y("",!0):(u(),f(B,{key:0,size:"small",ref:"form",model:p.form,"label-position":"top","label-width":"180px"},{default:_((()=>[g(m),g(n),g(k),g(C),h("div",S,[g(x,{size:"small",type:"info",onClick:d.cancelFunc},{default:_((()=>[v("取消")])),_:1},8,["onClick"]),g(x,{size:"small",type:"primary",onClick:d.onSubmit,loading:p.loading},{default:_((()=>[v("修改")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]))])),[[w,p.loading]])}],["__scopeId","data-v-643d0216"]]);export{k as default};
