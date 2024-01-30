import{_ as e}from"./Upload-66ad4daf.js";import{g as o,h as l,r as a,s,j as t}from"./element-plus-33e0d8cc.js";import{ag as r,ap as m,o as i,c as d,P as p,S as u,Q as n,a8 as c,T as f,W as j,X as g,a as _,Z as v,$ as h,a1 as y,Y as b}from"./@vue-e72ffbb6.js";import{_ as U}from"./_plugin-vue_export-helper-1b428a4d.js";import"./file-5ed95284.js";import"./index-188a77f0.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./call-bind-2971450c.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./@element-plus-4b00147d.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const P={components:{Upload:e},data:()=>({formData:{},isProductUpload:!1}),inject:["form"],created(){this.formData=this.form},methods:{openProductUpload:function(){this.isProductUpload=!0},returnProductImgsFunc(e){if(null!=e){let o=this.form.model.image.concat(e);this.form.model.image=o}this.isProductUpload=!1},deleteImg(e){this.form.model.image.splice(e,1)}}},V={class:"basic-setting-content pl16 pr16"},k=_("div",{class:"common-form"},"基本信息",-1),x={class:"draggable-list"},w=["onClick"];const I=U(P,[["render",function(U,P,I,C,q,z){const D=o,F=l,R=a,X=s,A=r("Close"),B=t,Q=r("draggable"),S=r("Plus"),T=e,W=m("img-url");return i(),d("div",V,[k,p(F,{label:"商品名称：",rules:[{required:!0,message:"请填写商品名称"}],prop:"model.product_name"},{default:u((()=>[p(D,{modelValue:z.form.model.product_name,"onUpdate:modelValue":P[0]||(P[0]=e=>z.form.model.product_name=e),class:"max-w460"},null,8,["modelValue"])])),_:1}),p(F,{label:"所属分类：",rules:[{required:!0,message:"你选择商品分类"}],prop:"model.category_id"},{default:u((()=>[p(X,{modelValue:z.form.model.category_id,"onUpdate:modelValue":P[1]||(P[1]=e=>z.form.model.category_id=e)},{default:u((()=>[(i(!0),d(n,null,c(z.form.category,(e=>(i(),d(n,{key:e.category_id},[p(R,{value:e.category_id,label:e.name},null,8,["value","label"]),(i(!0),d(n,null,c(e.child,(e=>(i(),f(R,{key:e.category_id,value:e.category_id,label:e.name},{default:u((()=>[j("|—"+g(e.name),1)])),_:2},1032,["value","label"])))),128))],64)))),128))])),_:1},8,["modelValue"])])),_:1}),p(F,{label:"商品图片：",rules:[{required:!0,message:"请上传商品图片"}],prop:"model.image"},{default:u((()=>[_("div",x,[p(Q,{class:"wrapper",modelValue:z.form.model.image,"onUpdate:modelValue":P[2]||(P[2]=e=>z.form.model.image=e)},{default:u((()=>[p(v,null,{default:u((()=>[(i(!0),d(n,null,c(z.form.model.image,((e,o)=>(i(),d("div",{class:"item",key:e.file_path},[h(_("img",null,null,512),[[W,e.file_path]]),_("a",{href:"javascript:void(0);",class:"delete-btn",onClick:y((e=>z.deleteImg(o)),["stop"])},[p(B,null,{default:u((()=>[p(A)])),_:1})],8,w)])))),128))])),_:1})])),_:1},8,["modelValue"]),_("div",{class:"item img-select",onClick:P[3]||(P[3]=(...e)=>z.openProductUpload&&z.openProductUpload(...e))},[p(B,null,{default:u((()=>[p(S)])),_:1})])])])),_:1}),p(F,{label:"商品卖点："},{default:u((()=>[p(D,{type:"textarea",modelValue:z.form.model.selling_point,"onUpdate:modelValue":P[4]||(P[4]=e=>z.form.model.selling_point=e),class:"max-w460"},null,8,["modelValue"])])),_:1}),q.isProductUpload?(i(),f(T,{key:0,config:{total:1},isupload:q.isProductUpload,onReturnImgs:z.returnProductImgsFunc},{default:u((()=>[j("上传图片")])),_:1},8,["isupload","onReturnImgs"])):b("",!0)])}]]);export{I as default};
