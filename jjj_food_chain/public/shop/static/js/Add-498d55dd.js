import{E as e,q as o,r as a,h as l,g as t,i as s,N as i,e as r,w as m}from"./element-plus-d03e850c.js";import{_ as d}from"./Upload-6ce261c2.js";import{P as p}from"./product-4cea8dc2.js";import{l as n}from"./index-0eefa19c.js";import{_ as u}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as g,T as c,S as f,a as j,P as h,W as y,X as _,c as b,Q as V,a8 as $,Y as v}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-1858a4ea.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const k=JSON.stringify(n().languageData),C=n().languageList,U={key:0,class:"img"},F=["src"],N={class:"dialog-footer"};const S=u({components:{Upload:d},data:()=>({languageList:C,category:[],form:{parent_id:0,category_id:0,name:JSON.parse(k),sort:100,image_id:""},formRules:{image_id:[{required:!0,message:$t("请上传分类图片"),trigger:"blur"}],sort:[{required:!0,message:$t("分类排序不能为空")},{type:"number",message:$t("分类排序必须为数字")}]},dialogVisible:!1,loading:!1,isupload:!1}),props:["open_add","addform"],created(){this.dialogVisible=this.open_add,this.getParentCategory()},methods:{getParentCategory:function(){let e=this;p.storeCatParentList({},!0).then((o=>{e.loading=!1,this.category=o.data.list})).catch((o=>{e.loading=!1}))},addUser(){let o=this,a=JSON.parse(JSON.stringify(o.form));a.name=JSON.stringify(a.name),o.$refs.form.validate((l=>{l&&(o.loading=!0,p.storeCatAdd(a).then((a=>{o.loading=!1,e({message:$t("添加成功"),type:"success"}),o.dialogFormVisible(!0)})).catch((e=>{o.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})},openUpload(e){this.type=e,this.isupload=!0},returnImgsFunc(e){null!=e&&e.length>0&&(this.file_path=e[0].file_path,this.form.image_id=e[0].file_id),this.isupload=!1}}},[["render",function(e,p,n,u,k,C){const S=o,q=a,w=l,x=t,D=s,J=i,O=r,P=d,I=m;return g(),c(I,{title:e.$t("添加分类"),modelValue:k.dialogVisible,"onUpdate:modelValue":p[2]||(p[2]=e=>k.dialogVisible=e),onClose:C.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:f((()=>[j("div",N,[h(D,{onClick:C.dialogFormVisible},{default:f((()=>[y(_(e.$t("取消")),1)])),_:1},8,["onClick"]),h(D,{type:"primary",onClick:C.addUser,loading:k.loading},{default:f((()=>[y(_(e.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:f((()=>[h(O,{size:"small",model:k.form,"label-position":"top",rules:k.formRules,ref:"form"},{default:f((()=>[h(w,{label:e.$t("父级分类")},{default:f((()=>[h(q,{modelValue:k.form.parent_id,"onUpdate:modelValue":p[0]||(p[0]=e=>k.form.parent_id=e),label:e.$t("无")},{default:f((()=>[h(S,{value:0,label:e.$t("无")},null,8,["label"]),(g(!0),b(V,null,$(k.category,(e=>(g(),c(S,{key:e.category_id,value:e.category_id,label:e.name_text},null,8,["value","label"])))),128))])),_:1},8,["modelValue","label"])])),_:1},8,["label"]),(g(!0),b(V,null,$(k.languageList,((o,a)=>(g(),c(w,{key:a,label:e.$t("分类名称")+`(${o.label})`,prop:"name.th",rules:[{required:!0,message:e.$t("请输入分类名称")}]},{default:f((()=>[h(x,{modelValue:k.form.name[o.key],"onUpdate:modelValue":e=>k.form.name[o.key]=e,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1032,["label","rules"])))),128)),h(w,{label:e.$t("分类图片"),prop:"image_id"},{default:f((()=>[h(J,null,{default:f((()=>[h(D,{type:"primary",onClick:C.openUpload},{default:f((()=>[y(_(e.$t("选择图片")),1)])),_:1},8,["onClick"]),""!=k.form.image_id?(g(),b("div",U,[j("img",{src:e.file_path,width:"100",height:"100"},null,8,F)])):v("",!0)])),_:1})])),_:1},8,["label"]),h(w,{label:e.$t("分类排序"),prop:"sort"},{default:f((()=>[h(x,{modelValue:k.form.sort,"onUpdate:modelValue":p[1]||(p[1]=e=>k.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["modelValue"])])),_:1},8,["label"])])),_:1},8,["model","rules"]),k.isupload?(g(),c(P,{key:0,isupload:k.isupload,type:e.type,onReturnImgs:C.returnImgsFunc},{default:f((()=>[y(_(e.$t("上传图片")),1)])),_:1},8,["isupload","type","onReturnImgs"])):v("",!0)])),_:1},8,["title","modelValue","onClose"])}]]);export{S as default};
