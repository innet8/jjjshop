import{_ as e}from"./Upload-e4289868.js";import{g as o,h as l,q as t,r as a,i as s}from"./element-plus-b01b3a31.js";import{d as i}from"./vuedraggable-e6f803aa.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as m,c as d,P as p,S as u,Q as n,a8 as c,T as f,Y as j,a as g,W as h}from"./@vue-e72ffbb6.js";import"./file-86ef23f3.js";import"./index-98f906e9.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./call-bind-2971450c.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./@element-plus-4b00147d.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./sortablejs-45d6ab95.js";const _={components:{Upload:e,draggable:i},data:()=>({formData:{},isProductUpload:!1}),inject:["form"],created(){this.formData=this.form},methods:{openProductUpload:function(){this.isProductUpload=!0},returnProductImgsFunc(e){if(null!=e){let o=e;this.form.model.file_path=o[0].file_path,this.form.model.image_id=o[0].file_id}this.isProductUpload=!1},deleteImg(e){this.form.model.file_path="",this.form.model.image_id=""}}},y={class:"basic-setting-content pl16 pr16"},v=g("div",{class:"common-form"},"基本信息",-1),b={class:""},U={class:"mb16"},k={key:0,class:"img"},P=["src"];const x=r(_,[["render",function(i,r,_,x,V,q){const w=o,I=l,D=t,C=a,z=s,F=e;return m(),d("div",y,[v,p(I,{label:"商品名称：",rules:[{required:!0,message:"请填写商品名称"}],prop:"model.product_name"},{default:u((()=>[p(w,{modelValue:q.form.model.product_name,"onUpdate:modelValue":r[0]||(r[0]=e=>q.form.model.product_name=e),class:"max-w460"},null,8,["modelValue"])])),_:1}),p(I,{label:"所属分类：",rules:[{required:!0,message:"你选择商品分类"}],prop:"model.category_id"},{default:u((()=>[p(C,{modelValue:q.form.model.category_id,"onUpdate:modelValue":r[1]||(r[1]=e=>q.form.model.category_id=e)},{default:u((()=>[(m(!0),d(n,null,c(V.formData.category.all,(e=>(m(),d(n,{key:e.category_id},[p(D,{value:e.category_id,label:e.name},null,8,["value","label"]),void 0!==e.child?(m(!0),d(n,{key:0},c(e.child,(e=>(m(),d(n,{key:e.category_id},[p(D,{value:e.category_id,label:e.name,style:{"padding-left":"30px"}},null,8,["value","label"]),void 0!==e.child?(m(!0),d(n,{key:0},c(e.child,(e=>(m(),f(D,{key:e.category_id,value:e.category_id,label:e.name,style:{"padding-left":"60px"}},null,8,["value","label"])))),128)):j("",!0)],64)))),128)):j("",!0)],64)))),128))])),_:1},8,["modelValue"])])),_:1}),p(I,{label:"商品图片：",rules:[{required:!0,message:"请上传商品图片"}],prop:"model.file_path"},{default:u((()=>[g("div",b,[g("div",U,[p(z,{type:"primary",onClick:q.openProductUpload},{default:u((()=>[h("选择图片")])),_:1},8,["onClick"])]),""!=q.form.model.file_path?(m(),d("div",k,[g("img",{src:q.form.model.file_path,width:"100",height:"100"},null,8,P)])):j("",!0)])])),_:1}),V.isProductUpload?(m(),f(F,{key:0,config:{total:9},isupload:V.isProductUpload,onReturnImgs:q.returnProductImgsFunc},{default:u((()=>[h("上传图片")])),_:1},8,["isupload","onReturnImgs"])):j("",!0)])}]]);export{x as default};
