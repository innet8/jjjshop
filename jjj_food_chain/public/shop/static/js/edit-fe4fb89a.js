import{E as t,e as o,b as e,v as s}from"./element-plus-7d357588.js";import{P as i}from"./points-539be6cd.js";import r from"./Basic-96f8fd2e.js";import a from"./Spec-8d8f6fee.js";import d from"./Content-7e95c0b1.js";import p from"./Buyset-bf58f005.js";import{_ as m,f as c}from"./index-f792122d.js";import{ag as n,$ as l,o as u,c as _,T as f,S as j,P as g,a as h,W as v,Y as y}from"./@vue-48c55b54.js";import"./@vueuse-c556fb5a.js";import"./lodash-es-c1acaa3d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-e0f4a3e8.js";import"./dayjs-9faf8871.js";import"./call-bind-0c463fe3.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./Upload-22bade2e.js";/* empty css                                                               */import"./vuedraggable-aac9abaa.js";import"./vue-ddfaa731.js";import"./sortablejs-88eb33dd.js";import"./vue-router-b8ff3004.js";import"./pinia-73166104.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-942d6868.js";import"./side-channel-ba7aab8a.js";import"./object-inspect-860361a9.js";import"./vue-ueditor-wrap-cd29f9a1.js";import"./UE-89f9bdb6.js";const b={class:"product-add"},S={class:"common-button-wrapper"};const k=m({components:{Basic:r,Spec:a,Content:d,Buyset:p},data:()=>({old_audit:20,product_id:0,scene:"edit",loading:!0,save_loading:!1,form:{model:{},category:[],feed:[],special:[],gradeList:[],specData:null,isSpecLocked:!1},model:{product_name:"",product_price:"",product_points:"",category_id:null,file_path:"",image_id:"",content:"",product_status:10,product_sort:100,limit_num:0,delivery_set:[10,20],express_price:"",product_stock:""}}),provide:function(){return{form:this.form}},created(){this.product_id=this.$route.query.product_id,this.scene=this.$route.query.scene,this.getData()},methods:{getData:function(){let t=this;i.getEditProduct({product_id:t.product_id},!0).then((o=>{t.loading=!1,Object.assign(t.form,o.data),t.form.model.product_status=o.data.model.product_status.value})).catch((o=>{t.loading=!1}))},convertJson(t){let o={};return t.forEach((t=>{o[t.grade_id]=t.product_equity})),JSON.stringify(o)},onSubmit:function(){let o=this;o.$refs.form.validate((e=>{if(c(o.model,o.form.model),e){let e=c(o.model,o.form.model);e.product_id=o.product_id,o.save_loading=!0,i.editProduct({product_id:o.product_id,params:JSON.stringify(e)},!0).then((e=>{o.save_loading=!1,t({message:"保存成功",type:"success"}),o.cancelFunc()})).catch((t=>{o.save_loading=!1}))}}))},ImgKeepId(t){let o=[];for(let e=0,s=t.length;e<s;e++){let s={image_id:t[e].image_id,file_id:t[e].file_id};o.push(s)}return o},Draft(){this.form.model.product_status=30,this.onSubmit()},cancelFunc(){this.$router.back(-1)}}},[["render",function(t,i,r,a,d,p){const m=n("Basic"),c=n("Spec"),k=n("Content"),x=n("Buyset"),C=o,B=e,q=s;return l((u(),_("div",b,[d.loading?y("",!0):(u(),f(B,{key:0,size:"small",ref:"form",model:d.form,"label-width":"180px"},{default:j((()=>[g(m),g(c),g(k),g(x),h("div",S,[g(C,{size:"small",type:"info",onClick:p.cancelFunc},{default:j((()=>[v("取消")])),_:1},8,["onClick"]),g(C,{size:"small",type:"primary",onClick:p.onSubmit,loading:d.loading},{default:j((()=>[v("修改")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]))])),[[q,d.loading]])}],["__scopeId","data-v-c3145ec5"]]);export{k as default};
