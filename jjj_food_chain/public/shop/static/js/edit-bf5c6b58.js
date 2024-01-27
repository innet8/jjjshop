import{E as e,g as t,h as o,j as a,D as l,e as s,i,w as r}from"./element-plus-b01b3a31.js";import{P as m}from"./product-14831bd2.js";import{_ as u}from"./Upload-e4289868.js";import{l as d}from"./index-98f906e9.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as n,o as f,T as c,S as b,a as g,P as j,W as h,X as _,c as v,Q as y,a8 as V}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-86ef23f3.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const $=JSON.stringify(d().languageData),k=d().languageList,C={class:"btn-warp"},S={class:"dialog-footer"};const x=p({components:{Upload:u},data:()=>({languageList:k,form:{sort:100,attribute_name:JSON.parse($),attribute_value:[]},formRules:{sort:[{required:!0,message:$t("排序不能为空")},{type:"number",message:$t("排序必须为数字")}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}),props:["open_edit","editform"],created(){this.dialogVisible=this.open_edit,this.form.attribute_value=this.editform.attribute_value,this.form.attribute_id=this.editform.attribute_id,this.form.attribute_name=JSON.parse(this.editform.attribute_name),this.form.sort=this.editform.sort},methods:{addvalue(){this.form.attribute_value.push(JSON.parse($))},deleteattr(){this.form.attribute_value.pop()},submit(){let t=this,o=JSON.parse(JSON.stringify(t.form));o.attribute_name=JSON.stringify(o.attribute_name),o.attribute_value=JSON.stringify(o.attribute_value),t.$refs.form.validate((a=>{a&&(t.loading=!0,m.editAttribute(o).then((o=>{t.loading=!1,e({message:$t("修改成功"),type:"success"}),t.dialogFormVisible(!0)})).catch((e=>{t.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(e,m,u,d,p,$){const k=t,x=o,J=n("CirclePlusFilled"),N=a,O=n("RemoveFilled"),U=l,D=s,F=i,w=r;return f(),c(w,{title:"编辑属性",modelValue:p.dialogVisible,"onUpdate:modelValue":m[1]||(m[1]=e=>p.dialogVisible=e),onClose:$.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:b((()=>[g("div",S,[j(F,{onClick:$.dialogFormVisible},{default:b((()=>[h(_(e.$t("取消")),1)])),_:1},8,["onClick"]),j(F,{type:"primary",onClick:$.submit,loading:p.loading},{default:b((()=>[h(_(e.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:b((()=>[j(D,{size:"small",model:p.form,"label-position":"top",rules:p.formRules,ref:"form"},{default:b((()=>[(f(!0),v(y,null,V(p.languageList,((t,o)=>(f(),v(y,{key:o},[j(x,{label:e.$t("属性名称")+`(${t.label})`,rules:[{required:!0,message:e.$t("请输入属性名称")}]},{default:b((()=>[j(k,{modelValue:p.form.attribute_name[t.key],"onUpdate:modelValue":e=>p.form.attribute_name[t.key]=e,placeholder:e.$t("如：温度"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","rules"]),j(x,{label:e.$t("属性值"),class:"attribute-value",rules:p.form.attribute_value.length<1?[]:[{required:!0,message:e.$t("请输入属性值")}]},{default:b((()=>[(f(!0),v(y,null,V(p.form.attribute_value,((o,a)=>(f(),c(x,{key:a,prop:`form.attribute_value.[${a}].${t.key}`,rules:[{validator:()=>!!o[t.key],message:e.$t("请输入属性值")}]},{default:b((()=>[j(k,{modelValue:o[t.key],"onUpdate:modelValue":e=>o[t.key]=e,placeholder:e.$t("请输入"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["prop","rules"])))),128)),g("div",C,[j(N,{class:"add-button",onClick:$.addvalue},{default:b((()=>[j(J)])),_:1},8,["onClick"]),j(N,{class:"add-button",onClick:$.deleteattr},{default:b((()=>[j(O)])),_:1},8,["onClick"])])])),_:2},1032,["label","rules"])],64)))),128)),j(x,{label:e.$t("属性排序"),prop:"sort"},{default:b((()=>[j(U,{controls:!1,min:0,max:999,placeholder:e.$t("请输入属性排序"),modelValue:p.form.sort,"onUpdate:modelValue":m[0]||(m[0]=e=>p.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["placeholder","modelValue"])])),_:1},8,["label"])])),_:1},8,["model","rules"])])),_:1},8,["modelValue","onClose"])}],["__scopeId","data-v-6e924d6f"]]);export{x as default};
