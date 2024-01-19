import{E as e,q as o,r as l,h as a,g as i,i as t,N as s,e as r,w as d}from"./element-plus-d03e850c.js";import{_ as m}from"./Upload-6ce261c2.js";import{P as p}from"./product-4cea8dc2.js";import{_ as n}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as u,T as g,S as f,a as c,P as h,W as j,c as b,Q as _,a8 as y,Y as V}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-1858a4ea.js";import"./index-0eefa19c.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const v={key:0,class:"img"},k=["src"],w={class:"dialog-footer"};const C=n({components:{Upload:m},data:()=>({category:[],form:{parent_id:0,category_id:0,name:"",sort:100,image_id:""},formRules:{name:[{required:!0,message:"请输入分类名称",trigger:"blur"}],image_id:[{required:!0,message:"请上传分类图片",trigger:"blur"}],sort:[{required:!0,message:"分类排序不能为空"},{type:"number",message:"分类排序必须为数字"}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}),props:["open_add","addform"],created(){this.dialogVisible=this.open_add,this.getParentCategory()},methods:{getParentCategory:function(){let e=this;p.takeCatParentList({},!0).then((o=>{e.loading=!1,this.category=o.data.list})).catch((o=>{e.loading=!1}))},addUser(){let o=this,l=o.form;o.$refs.form.validate((a=>{a&&(o.loading=!0,p.takeCatAdd(l).then((l=>{o.loading=!1,e({message:"添加成功",type:"success"}),o.dialogFormVisible(!0)})).catch((e=>{o.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})},openUpload(e){this.type=e,this.isupload=!0},returnImgsFunc(e){null!=e&&e.length>0&&(this.file_path=e[0].file_path,this.form.image_id=e[0].file_id),this.isupload=!1}}},[["render",function(e,p,n,C,U,W){const F=o,L=l,q=a,x=i,P=t,D=s,I=r,R=m,z=d;return u(),g(z,{title:"添加分类",modelValue:U.dialogVisible,"onUpdate:modelValue":p[3]||(p[3]=e=>U.dialogVisible=e),onClose:W.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:f((()=>[c("div",w,[h(P,{onClick:W.dialogFormVisible},{default:f((()=>[j("取 消")])),_:1},8,["onClick"]),h(P,{type:"primary",onClick:W.addUser,loading:U.loading},{default:f((()=>[j("确 定")])),_:1},8,["onClick","loading"])])])),default:f((()=>[h(I,{size:"small",model:U.form,"label-position":"top",rules:U.formRules,ref:"form"},{default:f((()=>[h(q,{label:"父级分类","label-width":U.formLabelWidth},{default:f((()=>[h(L,{modelValue:U.form.parent_id,"onUpdate:modelValue":p[0]||(p[0]=e=>U.form.parent_id=e),label:"无"},{default:f((()=>[h(F,{value:0,label:"无"}),(u(!0),b(_,null,y(U.category,(e=>(u(),g(F,{key:e.category_id,value:e.category_id,label:e.name},null,8,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label-width"]),h(q,{label:"分类名称",prop:"name","label-width":U.formLabelWidth},{default:f((()=>[h(x,{modelValue:U.form.name,"onUpdate:modelValue":p[1]||(p[1]=e=>U.form.name=e),autocomplete:"off"},null,8,["modelValue"])])),_:1},8,["label-width"]),h(q,{label:"分类图片",prop:"image_id","label-width":U.formLabelWidth},{default:f((()=>[h(D,null,{default:f((()=>[h(P,{type:"primary",onClick:W.openUpload},{default:f((()=>[j("选择图片")])),_:1},8,["onClick"]),""!=U.form.image_id?(u(),b("div",v,[c("img",{src:e.file_path,width:"100",height:"100"},null,8,k)])):V("",!0)])),_:1})])),_:1},8,["label-width"]),h(q,{label:"分类排序",prop:"sort","label-width":U.formLabelWidth},{default:f((()=>[h(x,{modelValue:U.form.sort,"onUpdate:modelValue":p[2]||(p[2]=e=>U.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["modelValue"])])),_:1},8,["label-width"])])),_:1},8,["model","rules"]),U.isupload?(u(),g(R,{key:0,isupload:U.isupload,type:e.type,onReturnImgs:W.returnImgsFunc},{default:f((()=>[j("上传图片")])),_:1},8,["isupload","type","onReturnImgs"])):V("",!0)])),_:1},8,["modelValue","onClose"])}]]);export{C as default};
