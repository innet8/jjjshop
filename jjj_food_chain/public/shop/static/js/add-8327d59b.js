import{E as e,e as o,f as s,h as t,g as i,w as a}from"./element-plus-b30a858e.js";import{P as l}from"./product-51066821.js";import{_ as r}from"./Upload-2ee918c1.js";import{l as m}from"./index-1f5bb9d4.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as d,T as n,S as u,a as f,P as c,W as g,X as j,c as b,Q as h,a8 as _}from"./@vue-e5cdee21.js";import"./@vueuse-f6c48e1e.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-f5b82f61.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-950c235d.js";import"./vue-cropperjs-a8153a2d.js";import"./vue-5933b83d.js";import"./cropperjs-81999277.js";import"./vue-router-2729bdc9.js";import"./pinia-805bca39.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-f67db3fa.js";import"./vue-i18n-2607567b.js";import"./@intlify-f009848f.js";const y=JSON.stringify(m().languageData),V=m().languageList,v={class:"dialog-footer"};const $=p({components:{Upload:r},data:()=>({languageList:V,form:{unit_name:JSON.parse(y),sort:100},formRules:{sort:[{required:!0,message:$t("排序不能为空")},{type:"number",message:$t("排序必须为数字")}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}),props:["open_add","addform"],created(){this.dialogVisible=this.open_add},methods:{addvalue(){this.form.attribute_value.push("")},deleteattr(e){this.form.attribute_value.splice(e,1)},submit(){let o=this,s=JSON.parse(JSON.stringify(o.form));s.unit_name=JSON.stringify(s.unit_name),o.$refs.form.validate((t=>{t&&(o.loading=!0,l.addUnit(s).then((s=>{o.loading=!1,e({message:$t("添加成功"),type:"success"}),o.dialogFormVisible(!0)})).catch((e=>{o.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(e,l,r,m,p,y){const V=o,$=s,k=t,C=i,U=a;return d(),n(U,{title:e.$t("添加单位"),modelValue:p.dialogVisible,"onUpdate:modelValue":l[1]||(l[1]=e=>p.dialogVisible=e),onClose:y.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:u((()=>[f("div",v,[c(C,{onClick:y.dialogFormVisible},{default:u((()=>[g(j(e.$t("取消")),1)])),_:1},8,["onClick"]),c(C,{type:"primary",onClick:y.submit,loading:p.loading},{default:u((()=>[g(j(e.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:u((()=>[c(k,{size:"small",model:p.form,"label-position":"top",rules:p.formRules,ref:"form"},{default:u((()=>[(d(!0),b(h,null,_(p.languageList,((o,s)=>(d(),n($,{key:s,label:e.$t("单位名称")+`(${o.label})`,rules:[{required:!0,message:e.$t("请输入单位名称")}],prop:`unit_name.${[o.key]}`},{default:u((()=>[c(V,{modelValue:p.form.unit_name[o.key],"onUpdate:modelValue":e=>p.form.unit_name[o.key]=e,placeholder:e.$t("请输入单位名称"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","rules","prop"])))),128)),c($,{label:e.$t("单位排序"),prop:"sort"},{default:u((()=>[c(V,{modelValue:p.form.sort,"onUpdate:modelValue":l[0]||(l[0]=e=>p.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["modelValue"])])),_:1},8,["label"])])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue","onClose"])}],["__scopeId","data-v-d8d93071"]]);export{$ as default};