import{E as e,o,p as t,h as a,q as l,r as i,g as s,D as r,e as m,i as d,w as p}from"./element-plus-b01b3a31.js";import{_ as n}from"./Upload-e4289868.js";import{P as u}from"./product-14831bd2.js";import{l as g}from"./index-98f906e9.js";import{_ as f}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as c,T as h,S as _,a as j,P as y,W as b,X as V,c as $,Q as v,a8 as C,Y as k}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-86ef23f3.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const U=JSON.stringify(g().languageData),x=g().languageList,S={class:"dialog-footer"};const q=f({components:{Upload:n},data:()=>({languageList:x,category:[],parent:1,form:{parent_id:0,category_id:0,name:JSON.parse(U),image_id:"",sort:""},file_path:"",formRules:{image_id:[{required:!0,message:$t("请上传分类图片"),trigger:"blur"}],sort:[{required:!0,message:$t("分类排序不能为空")},{type:"number",message:$t("分类排序必须为数字")}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}),props:["open_edit","editform"],created(){this.getParentCategory(),this.dialogVisible=this.open_edit,this.form.category_id=this.editform.model.category_id,this.form.parent_id=this.editform.model.parent_id,this.form.name=JSON.parse(this.editform.model.name),this.form.sort=this.editform.model.sort,this.form.image_id=this.editform.model.image_id,0!=this.editform.model.parent_id&&(this.parent=0)},methods:{getParentCategory:function(){let e=this;u.storeCatParentList({},!0).then((o=>{e.loading=!1,this.category=o.data.list})).catch((o=>{e.loading=!1}))},radioChange(e){this.form.parent_id=""},addUser(){let o=this,t=JSON.parse(JSON.stringify(o.form));t.name=JSON.stringify(t.name),o.$refs.form.validate((a=>{a&&(o.loading=!0,u.storeCatEdit(t,!0).then((t=>{o.loading=!1,e({message:"修改成功",type:"success"}),o.dialogFormVisible(!0)})).catch((e=>{o.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})},openUpload(e){this.type=e,this.isupload=!0},returnImgsFunc(e){null!=e&&e.length>0&&(this.file_path=e[0].file_path,this.form.image_id=e[0].file_id),this.isupload=!1}}},[["render",function(e,u,g,f,U,x){const q=o,D=t,F=a,J=l,N=i,O=s,I=r,L=m,P=d,w=n,R=p;return c(),h(R,{title:e.$t("编辑普通分类"),modelValue:U.dialogVisible,"onUpdate:modelValue":u[3]||(u[3]=e=>U.dialogVisible=e),onClose:x.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:_((()=>[j("div",S,[y(P,{onClick:x.dialogFormVisible},{default:_((()=>[b(V(e.$t("取消")),1)])),_:1},8,["onClick"]),y(P,{type:"primary",onClick:x.addUser,loading:U.loading},{default:_((()=>[b(V(e.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:_((()=>[y(L,{size:"small",model:U.form,"label-position":"top",rules:U.formRules,ref:"form"},{default:_((()=>[y(F,{label:e.$t("分类级别"),prop:"parent"},{default:_((()=>[y(D,{modelValue:U.parent,"onUpdate:modelValue":u[0]||(u[0]=e=>U.parent=e),onChange:x.radioChange},{default:_((()=>[y(q,{label:1},{default:_((()=>[b(V(e.$t("一级分类")),1)])),_:1}),y(q,{label:0},{default:_((()=>[b(V(e.$t("二级分类")),1)])),_:1})])),_:1},8,["modelValue","onChange"])])),_:1},8,["label"]),0==U.parent?(c(),h(F,{key:0,label:e.$t("上级分类"),prop:"parent_id",rules:[{required:!0,message:e.$t("请选择上级分类")}]},{default:_((()=>[y(N,{modelValue:U.form.parent_id,"onUpdate:modelValue":u[1]||(u[1]=e=>U.form.parent_id=e),placeholder:e.$t("请选择上级分类")},{default:_((()=>[(c(!0),$(v,null,C(U.category,(e=>(c(),h(J,{key:e.category_id,value:e.category_id,label:e.name_text},null,8,["value","label"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label","rules"])):k("",!0),(c(!0),$(v,null,C(U.languageList,((o,t)=>(c(),h(F,{key:t,label:e.$t("分类名称")+`(${o.label})`,prop:`name.${o.key}`,rules:[{required:!0,message:e.$t("请输入分类名称")}]},{default:_((()=>[y(O,{modelValue:U.form.name[o.key],"onUpdate:modelValue":e=>U.form.name[o.key]=e,placeholder:e.$t("请输入分类名称"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","prop","rules"])))),128)),y(F,{label:e.$t("分类排序"),prop:"sort"},{default:_((()=>[y(I,{controls:!1,placeholder:e.$t("分类排序不能为空"),min:0,max:999,modelValue:U.form.sort,"onUpdate:modelValue":u[2]||(u[2]=e=>U.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["placeholder","modelValue"])])),_:1},8,["label"])])),_:1},8,["model","rules"]),U.isupload?(c(),h(w,{key:0,isupload:U.isupload,type:e.type,onReturnImgs:x.returnImgsFunc},{default:_((()=>[b("上传图片")])),_:1},8,["isupload","type","onReturnImgs"])):k("",!0)])),_:1},8,["title","modelValue","onClose"])}],["__scopeId","data-v-08b17f3f"]]);export{q as default};
