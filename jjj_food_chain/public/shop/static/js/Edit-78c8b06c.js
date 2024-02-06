import{w as e,x as o,h as t,p as a,q as i,g as l,n as s,e as r,i as d,u as p}from"./element-plus-c8084613.js";import{_ as m}from"./Upload-5b166c3d.js";import{P as n}from"./product-03b45112.js";import{l as u}from"./index-ebd63678.js";import{_ as g}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as f,S as c,R as h,a as j,O as _,V as y,W as b,c as V,P as $,a7 as C,X as v}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-906e8560.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const k=JSON.stringify(u().languageData),U=u().languageList,x={class:"dialog-footer"};const q=g({components:{Upload:m},data:()=>({languageList:U,category:[],parent:1,form:{parent_id:0,category_id:0,name:JSON.parse(k),image_id:"",sort:""},file_path:"",formRules:{image_id:[{required:!0,message:$t("请上传分类图片"),trigger:"blur"}],sort:[{required:!0,message:$t("分类排序不能为空")},{type:"number",message:$t("分类排序必须为数字")}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}),props:["open_edit","editform"],created(){this.getParentCategory(),this.dialogVisible=this.open_edit,this.form.category_id=this.editform.model.category_id,this.form.parent_id=this.editform.model.parent_id,this.form.name=JSON.parse(this.editform.model.name),this.form.sort=this.editform.model.sort,this.form.image_id=this.editform.model.image_id,0!=this.editform.model.parent_id&&(this.parent=0)},methods:{getParentCategory:function(){let e=this;n.storeCatParentList({},!0).then((o=>{e.loading=!1,this.category=o.data.list})).catch((o=>{e.loading=!1}))},radioChange(e){this.form.parent_id=""},addUser(){let e=this,o=JSON.parse(JSON.stringify(e.form));o.name=JSON.stringify(o.name),e.$refs.form.validate((t=>{t&&(e.loading=!0,n.storeCatEdit(o,!0).then((o=>{e.loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"}),e.dialogFormVisible(!0)})).catch((o=>{e.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})},openUpload(e){this.type=e,this.isupload=!0},returnImgsFunc(e){null!=e&&e.length>0&&(this.file_path=e[0].file_path,this.form.image_id=e[0].file_id),this.isupload=!1}}},[["render",function(n,u,g,k,U,q){const F=e,J=o,O=t,S=a,I=i,N=l,D=s,L=r,P=d,R=m,w=p;return f(),c(w,{title:n.$t("编辑普通分类"),modelValue:U.dialogVisible,"onUpdate:modelValue":u[3]||(u[3]=e=>U.dialogVisible=e),onClose:q.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:h((()=>[j("div",x,[_(P,{onClick:q.dialogFormVisible},{default:h((()=>[y(b(n.$t("取消")),1)])),_:1},8,["onClick"]),_(P,{type:"primary",onClick:q.addUser,loading:U.loading},{default:h((()=>[y(b(n.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:h((()=>[_(L,{size:"small",model:U.form,"label-position":"top",rules:U.formRules,ref:"form"},{default:h((()=>[_(O,{label:n.$t("分类级别"),prop:"parent"},{default:h((()=>[_(J,{modelValue:U.parent,"onUpdate:modelValue":u[0]||(u[0]=e=>U.parent=e),onChange:q.radioChange},{default:h((()=>[_(F,{label:1},{default:h((()=>[y(b(n.$t("一级分类")),1)])),_:1}),_(F,{label:0},{default:h((()=>[y(b(n.$t("二级分类")),1)])),_:1})])),_:1},8,["modelValue","onChange"])])),_:1},8,["label"]),0==U.parent?(f(),c(O,{key:0,label:n.$t("上级分类"),prop:"parent_id",rules:[{required:!0,message:n.$t("请选择上级分类")}]},{default:h((()=>[_(I,{modelValue:U.form.parent_id,"onUpdate:modelValue":u[1]||(u[1]=e=>U.form.parent_id=e),placeholder:n.$t("请选择上级分类")},{default:h((()=>[(f(!0),V($,null,C(U.category,(e=>(f(),c(S,{key:e.category_id,value:e.category_id,label:e.name_text},null,8,["value","label"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label","rules"])):v("",!0),(f(!0),V($,null,C(U.languageList,((e,o)=>(f(),c(O,{key:o,label:n.$t("分类名称")+"(".concat(e.label,")"),prop:"name.".concat(e.key),rules:[{required:!0,message:n.$t("请输入分类名称")}]},{default:h((()=>[_(N,{modelValue:U.form.name[e.key],"onUpdate:modelValue":o=>U.form.name[e.key]=o,placeholder:n.$t("请输入分类名称"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","prop","rules"])))),128)),_(O,{label:n.$t("分类排序"),prop:"sort"},{default:h((()=>[_(D,{controls:!1,placeholder:n.$t("接近0，排序等级越高"),min:0,max:999,modelValue:U.form.sort,"onUpdate:modelValue":u[2]||(u[2]=e=>U.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["placeholder","modelValue"])])),_:1},8,["label"])])),_:1},8,["model","rules"]),U.isupload?(f(),c(R,{key:0,isupload:U.isupload,type:n.type,onReturnImgs:q.returnImgsFunc},{default:h((()=>[y("上传图片")])),_:1},8,["isupload","type","onReturnImgs"])):v("",!0)])),_:1},8,["title","modelValue","onClose"])}],["__scopeId","data-v-e96b9954"]]);export{q as default};