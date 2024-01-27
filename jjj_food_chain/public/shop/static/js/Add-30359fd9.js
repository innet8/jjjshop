import{E as e,g as o,h as s,D as a,e as i,i as l,w as t}from"./element-plus-b01b3a31.js";import{_ as r}from"./Upload-e4289868.js";import{P as m}from"./product-14831bd2.js";import{l as p}from"./index-98f906e9.js";import{_ as d}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as n,T as u,S as g,a as c,P as f,W as j,X as h,c as y,Q as _,a8 as b,Y as V}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-86ef23f3.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const $=JSON.stringify(p().languageData),v=p().languageList,k={class:"dialog-footer"};const U=d({components:{Upload:r},data:()=>({languageList:v,category:[],form:{parent_id:0,category_id:0,name:JSON.parse($),sort:null,image_id:""},formRules:{image_id:[{required:!0,message:$t("请上传分类图片"),trigger:"blur"}],sort:[{required:!0,message:$t("分类排序不能为空")},{type:"number",message:$t("分类排序必须为数字")}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}),props:["open_add","addform"],created(){this.dialogVisible=this.open_add},methods:{addUser(){let o=this,s=JSON.parse(JSON.stringify(o.form));s.name=JSON.stringify(s.name),s.is_special=1,o.$refs.form.validate((a=>{a&&(o.loading=!0,m.storeCatAdd(s).then((s=>{o.loading=!1,e({message:$t("添加成功"),type:"success"}),o.dialogFormVisible(!0)})).catch((e=>{o.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})},openUpload(e){this.type=e,this.isupload=!0},returnImgsFunc(e){null!=e&&e.length>0&&(this.file_path=e[0].file_path,this.form.image_id=e[0].file_id),this.isupload=!1}}},[["render",function(e,m,p,d,$,v){const U=o,C=s,x=a,D=i,F=l,S=r,I=t;return n(),u(I,{title:e.$t("添加特色分类"),modelValue:$.dialogVisible,"onUpdate:modelValue":m[1]||(m[1]=e=>$.dialogVisible=e),onClose:v.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:g((()=>[c("div",k,[f(F,{onClick:v.dialogFormVisible},{default:g((()=>[j(h(e.$t("取消")),1)])),_:1},8,["onClick"]),f(F,{type:"primary",onClick:v.addUser,loading:$.loading},{default:g((()=>[j(h(e.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:g((()=>[f(D,{size:"small",model:$.form,"label-position":"top",rules:$.formRules,ref:"form"},{default:g((()=>[(n(!0),y(_,null,b($.languageList,((o,s)=>(n(),u(C,{key:s,label:e.$t("分类名称")+`(${o.label})`,prop:`name.${o.key}`,rules:[{required:!0,message:e.$t("请输入分类名称")}]},{default:g((()=>[f(U,{modelValue:$.form.name[o.key],"onUpdate:modelValue":e=>$.form.name[o.key]=e,placeholder:e.$t("请输入分类名称"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","prop","rules"])))),128)),f(C,{label:e.$t("分类排序"),prop:"sort"},{default:g((()=>[f(x,{controls:!1,placeholder:e.$t("分类排序不能为空"),min:0,max:999,modelValue:$.form.sort,"onUpdate:modelValue":m[0]||(m[0]=e=>$.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["placeholder","modelValue"])])),_:1},8,["label"])])),_:1},8,["model","rules"]),$.isupload?(n(),u(S,{key:0,isupload:$.isupload,type:e.type,onReturnImgs:v.returnImgsFunc},{default:g((()=>[j(h(e.$t("上传图片")),1)])),_:1},8,["isupload","type","onReturnImgs"])):V("",!0)])),_:1},8,["title","modelValue","onClose"])}],["__scopeId","data-v-1501faa4"]]);export{U as default};
