import{g as e,h as o,n as s,e as l,i,u as t}from"./element-plus-c8084613.js";import{P as a}from"./product-fbff5939.js";import{_ as r}from"./Upload-e7579a9c.js";import{l as m}from"./index-74b65baf.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as d,S as n,R as u,a as c,O as j,V as f,W as g}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-9623813c.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const b=m().languageList,h={class:"dialog-footer"};const _=p({components:{Upload:r},data:()=>({languageList:b,form:{label_name:"",sort:null},formRules:{sort:[{required:!0,message:$t("排序不能为空")},{type:"number",message:$t("排序必须为数字")}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}),props:["open_add","addform"],created(){this.dialogVisible=this.open_add},methods:{submit(){let e=this,o=JSON.parse(JSON.stringify(e.form));o.label_name=o.label_name,e.$refs.form.validate((s=>{s&&(e.loading=!0,a.addLabel(o).then((o=>{e.loading=!1,this.$ElMessage({message:$t("添加成功"),type:"success"}),e.dialogFormVisible(!0)})).catch((o=>{e.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(a,r,m,p,b,_){const V=e,$=o,y=s,v=l,x=i,C=t;return d(),n(C,{title:a.$t("添加标签"),modelValue:b.dialogVisible,"onUpdate:modelValue":r[2]||(r[2]=e=>b.dialogVisible=e),onClose:_.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:u((()=>[c("div",h,[j(x,{onClick:_.dialogFormVisible},{default:u((()=>[f(g(a.$t("取消")),1)])),_:1},8,["onClick"]),j(x,{type:"primary",onClick:_.submit,loading:b.loading},{default:u((()=>[f(g(a.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:u((()=>[j(v,{size:"small",model:b.form,"label-position":"top",rules:b.formRules,ref:"form"},{default:u((()=>[j($,{label:a.$t("标签名称"),prop:"label_name",rules:[{required:!0,message:a.$t("请输入标签名称")}]},{default:u((()=>[j(V,{modelValue:b.form.label_name,"onUpdate:modelValue":r[0]||(r[0]=e=>b.form.label_name=e),placeholder:a.$t("请输入标签名称"),maxlength:50,autocomplete:"off"},null,8,["modelValue","placeholder"])])),_:1},8,["label","rules"]),j($,{label:a.$t("标签排序"),prop:"sort"},{default:u((()=>[j(y,{controls:!1,min:0,max:999,placeholder:a.$t("请输入标签排序"),modelValue:b.form.sort,"onUpdate:modelValue":r[1]||(r[1]=e=>b.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["placeholder","modelValue"])])),_:1},8,["label"])])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue","onClose"])}],["__scopeId","data-v-d954537d"]]);export{_ as default};
