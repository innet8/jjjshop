import{g as e,h as o,e as i,i as s,w as t}from"./element-plus-b01b3a31.js";import{_ as a}from"./Upload-e0b57212.js";import{P as l}from"./product-ade04cbc.js";import{l as r}from"./index-83a39651.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as p,T as d,S as n,a as u,P as f,W as g,X as c,c as h,Q as j,a8 as _,Y as y}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-fa4138eb.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const b=JSON.stringify(r().languageData),V=r().languageList,v={class:"dialog-footer"};const $=m({components:{Upload:a},data:()=>({languageList:V,category:[],form:{parent_id:0,category_id:0,name:JSON.parse(b),image_id:"",sort:""},file_path:"",formRules:{image_id:[{required:!0,message:$t("请上传分类图片"),trigger:"blur"}],sort:[{required:!0,message:$t("分类排序不能为空")},{type:"number",message:$t("分类排序必须为数字")}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}),props:["open_edit","editform"],created(){var e;this.dialogVisible=this.open_edit,this.form.category_id=this.editform.model.category_id,this.form.parent_id=this.editform.model.parent_id,this.form.name=JSON.parse(this.editform.model.name),this.form.sort=this.editform.model.sort,this.form.image_id=this.editform.model.image_id,this.file_path=null==(e=this.editform.model.images)?void 0:e.file_path},methods:{addUser(){let e=this,o=JSON.parse(JSON.stringify(e.form));o.name=JSON.stringify(o.name),e.$refs.form.validate((i=>{i&&(e.loading=!0,l.storeCatEdit(o,!0).then((o=>{e.loading=!1,this.$ElMessage({message:"修改成功",type:"success"}),e.dialogFormVisible(!0)})).catch((o=>{e.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})},openUpload(e){this.type=e,this.isupload=!0},returnImgsFunc(e){null!=e&&e.length>0&&(this.file_path=e[0].file_path,this.form.image_id=e[0].file_id),this.isupload=!1}}},[["render",function(l,r,m,b,V,$){const k=e,U=o,C=i,S=s,x=a,F=t;return p(),d(F,{title:l.$t("编辑特色分类"),modelValue:V.dialogVisible,"onUpdate:modelValue":r[1]||(r[1]=e=>V.dialogVisible=e),onClose:$.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:n((()=>[u("div",v,[f(S,{onClick:$.dialogFormVisible},{default:n((()=>[g(c(l.$t("取消")),1)])),_:1},8,["onClick"]),f(S,{type:"primary",onClick:$.addUser,loading:V.loading},{default:n((()=>[g(c(l.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:n((()=>[f(C,{size:"small",model:V.form,"label-position":"top",rules:V.formRules,ref:"form"},{default:n((()=>[(p(!0),h(j,null,_(V.languageList,((e,o)=>(p(),d(U,{key:o,label:l.$t("分类名称")+`(${e.label})`,prop:`form.name.${e.key}.`,rules:[{validator:()=>!!V.form.name[e.key],message:l.$t("请输入分类名称")}]},{default:n((()=>[f(k,{modelValue:V.form.name[e.key],"onUpdate:modelValue":o=>V.form.name[e.key]=o,placeholder:l.$t("请输入分类名称"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","prop","rules"])))),128)),f(U,{label:l.$t("分类排序"),prop:"sort"},{default:n((()=>[f(k,{modelValue:V.form.sort,"onUpdate:modelValue":r[0]||(r[0]=e=>V.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["modelValue"])])),_:1},8,["label"])])),_:1},8,["model","rules"]),V.isupload?(p(),d(x,{key:0,isupload:V.isupload,type:l.type,onReturnImgs:$.returnImgsFunc},{default:n((()=>[g(c(l.$t("上传图片")),1)])),_:1},8,["isupload","type","onReturnImgs"])):y("",!0)])),_:1},8,["title","modelValue","onClose"])}],["__scopeId","data-v-c1f31958"]]);export{$ as default};
