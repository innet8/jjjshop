import{g as e,h as o,n as s,e as t,i,u as a}from"./element-plus-c8084613.js";import{P as l}from"./product-df04f360.js";import{_ as r}from"./Upload-98487bf9.js";import{l as p}from"./index-6f6684cc.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as n,S as d,R as c,a as u,O as f,V as g,W as j,c as h,P as _,a7 as b}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-e7f1fa8b.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const y=JSON.stringify(p().languageData),V=p().languageList,v={class:"dialog-footer"};const $=m({components:{Upload:r},data(){const e={};for(let o in JSON.parse(y))e[o]=[{required:!0,message:$t("请输入规格名称"),trigger:"blur"}];return{languageList:V,form:{spec_id:"",spec_name:JSON.parse(y),sort:null,spec_value:[]},formRules:{spec_name:e,sort:[{required:!0,message:$t("排序不能为空")},{type:"number",message:$t("排序必须为数字")}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}},props:["open_edit","editform"],created(){this.dialogVisible=this.open_edit,this.form.spec_id=this.editform.spec_id,this.form.spec_name=JSON.parse(this.editform.spec_name),this.form.sort=this.editform.sort},methods:{addvalue(){this.form.spec_value.push("")},deleteattr(e){this.form.spec_value.splice(e,1)},submit(){let e=this,o=JSON.parse(JSON.stringify(e.form));o.spec_name=JSON.stringify(o.spec_name),e.$refs.form.validate((s=>{s&&(e.loading=!0,l.editSpec(o,!0).then((o=>{e.loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"}),e.dialogFormVisible(!0)})).catch((o=>{e.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(l,r,p,m,y,V){const $=e,k=o,S=s,x=t,J=i,O=a;return n(),d(O,{title:l.$t("编辑规格"),modelValue:y.dialogVisible,"onUpdate:modelValue":r[1]||(r[1]=e=>y.dialogVisible=e),onClose:V.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:c((()=>[u("div",v,[f(J,{onClick:V.dialogFormVisible},{default:c((()=>[g(j(l.$t("取消")),1)])),_:1},8,["onClick"]),f(J,{type:"primary",onClick:V.submit,loading:y.loading},{default:c((()=>[g(j(l.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:c((()=>[f(x,{size:"small",model:y.form,"label-position":"top",rules:y.formRules,ref:"form"},{default:c((()=>[(n(!0),h(_,null,b(y.languageList,((e,o)=>(n(),d(k,{key:o,label:l.$t("规格名称")+"(".concat(e.label,")"),prop:"spec_name.".concat(e.key)},{default:c((()=>[f($,{modelValue:y.form.spec_name[e.key],"onUpdate:modelValue":o=>y.form.spec_name[e.key]=o,placeholder:l.$t("请输入规格名称"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","prop"])))),128)),f(k,{label:l.$t("规格排序"),prop:"sort"},{default:c((()=>[f(S,{controls:!1,min:0,max:999,placeholder:l.$t("接近0，排序等级越高"),modelValue:y.form.sort,"onUpdate:modelValue":r[0]||(r[0]=e=>y.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["placeholder","modelValue"])])),_:1},8,["label"])])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue","onClose"])}],["__scopeId","data-v-d2851166"]]);export{$ as default};
