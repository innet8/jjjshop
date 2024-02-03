import{_ as e}from"./Upload-4ec5d09e.js";import{g as o,h as t,p as s,q as a,i as r}from"./element-plus-c8084613.js";import{d as l}from"./vuedraggable-a472da53.js";import{_ as i}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as m,c as p,O as d,R as u,P as n,a7 as c,S as f,X as j,a as g,V as h}from"./@vue-b57a05a6.js";import"./file-6eacc51c.js";import"./index-cbe3c743.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./@element-plus-ce7ae957.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./dayjs-33a066dd.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";import"./sortablejs-b4c145c4.js";const _={components:{Upload:e,draggable:l},data:()=>({formData:{},isProductUpload:!1}),inject:["form"],created(){this.formData=this.form},methods:{openProductUpload:function(){this.isProductUpload=!0},returnProductImgsFunc(e){if(null!=e){let o=e;this.form.model.file_path=o[0].file_path,this.form.model.image_id=o[0].file_id}this.isProductUpload=!1},deleteImg(e){this.form.model.file_path="",this.form.model.image_id=""}}},y={class:"basic-setting-content pl16 pr16"},v=g("div",{class:"common-form"},"基本信息",-1),b={class:""},U={class:"mb16"},P={key:0,class:"img"},k=["src"];const x=i(_,[["render",function(l,i,_,x,V,q){const I=o,w=t,D=s,C=a,F=r,R=e;return m(),p("div",y,[v,d(w,{label:"商品名称：",rules:[{required:!0,message:"请填写商品名称"}],prop:"model.product_name"},{default:u((()=>[d(I,{modelValue:q.form.model.product_name,"onUpdate:modelValue":i[0]||(i[0]=e=>q.form.model.product_name=e),class:"max-w460"},null,8,["modelValue"])])),_:1}),d(w,{label:"所属分类：",rules:[{required:!0,message:"你选择商品分类"}],prop:"model.category_id"},{default:u((()=>[d(C,{modelValue:q.form.model.category_id,"onUpdate:modelValue":i[1]||(i[1]=e=>q.form.model.category_id=e)},{default:u((()=>[(m(!0),p(n,null,c(V.formData.category.all,(e=>(m(),p(n,{key:e.category_id},[d(D,{value:e.category_id,label:e.name},null,8,["value","label"]),void 0!==e.child?(m(!0),p(n,{key:0},c(e.child,(e=>(m(),p(n,{key:e.category_id},[d(D,{value:e.category_id,label:e.name,style:{"padding-left":"30px"}},null,8,["value","label"]),void 0!==e.child?(m(!0),p(n,{key:0},c(e.child,(e=>(m(),f(D,{key:e.category_id,value:e.category_id,label:e.name,style:{"padding-left":"60px"}},null,8,["value","label"])))),128)):j("",!0)],64)))),128)):j("",!0)],64)))),128))])),_:1},8,["modelValue"])])),_:1}),d(w,{label:"商品图片：",rules:[{required:!0,message:"请上传商品图片"}],prop:"model.file_path"},{default:u((()=>[g("div",b,[g("div",U,[d(F,{type:"primary",onClick:q.openProductUpload},{default:u((()=>[h("选择图片")])),_:1},8,["onClick"])]),""!=q.form.model.file_path?(m(),p("div",P,[g("img",{src:q.form.model.file_path,width:"100",height:"100"},null,8,k)])):j("",!0)])])),_:1}),V.isProductUpload?(m(),f(R,{key:0,config:{total:9},isupload:V.isProductUpload,onReturnImgs:q.returnProductImgsFunc},{default:u((()=>[h("上传图片")])),_:1},8,["isupload","onReturnImgs"])):j("",!0)])}]]);export{x as default};