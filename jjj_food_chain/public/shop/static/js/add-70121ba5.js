import{g as e,h as o,n as s,e as l,i as t,u as a}from"./element-plus-c8084613.js";import{P as i}from"./product-df04f360.js";import{_ as r}from"./Upload-98487bf9.js";import{l as p}from"./index-6f6684cc.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as d,S as n,R as u,a as c,O as f,V as g,W as j,c as b,P as h,a7 as _}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-e7f1fa8b.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const y=JSON.stringify(p().languageData),V=p().languageList,$={class:"dialog-footer"};const v=m({components:{Upload:r},data:()=>({languageList:V,form:{feed_name:JSON.parse(y),sort:null,price:""},formRules:{price:[{required:!0,message:$t("请输入价格"),trigger:"blur"}],sort:[{required:!0,message:$t("排序不能为空")},{type:"number",message:$t("排序必须为数字")}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}),props:["open_add","addform"],created(){this.dialogVisible=this.open_add},methods:{addvalue(){this.form.attribute_value.push("")},deleteattr(e){this.form.attribute_value.splice(e,1)},submit(){let e=this,o=JSON.parse(JSON.stringify(e.form));o.feed_name=JSON.stringify(o.feed_name),e.$refs.form.validate((s=>{s&&(e.loading=!0,i.addFeed(o,!0).then((o=>{e.loading=!1,this.$ElMessage({message:$t("添加成功"),type:"success"}),e.dialogFormVisible(!0)})).catch((o=>{e.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(i,r,p,m,y,V){const v=e,k=o,x=s,C=l,U=t,F=a;return d(),n(F,{title:i.$t("添加加料"),modelValue:y.dialogVisible,"onUpdate:modelValue":r[2]||(r[2]=e=>y.dialogVisible=e),onClose:V.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:u((()=>[c("div",$,[f(U,{onClick:V.dialogFormVisible},{default:u((()=>[g(j(i.$t("取消")),1)])),_:1},8,["onClick"]),f(U,{type:"primary",onClick:V.submit,loading:y.loading},{default:u((()=>[g(j(i.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:u((()=>[f(C,{size:"small",model:y.form,"label-position":"top",rules:y.formRules,ref:"form"},{default:u((()=>[(d(!0),b(h,null,_(y.languageList,((e,o)=>(d(),n(k,{key:o,label:i.$t("加料名称")+"(".concat(e.label,")"),prop:"feed_name.".concat([e.key]),rules:[{required:!0,message:i.$t("请输入加料名称")}]},{default:u((()=>[f(v,{type:"text",modelValue:y.form.feed_name[e.key],"onUpdate:modelValue":o=>y.form.feed_name[e.key]=o,placeholder:i.$t("如：番茄酱")},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","prop","rules"])))),128)),f(k,{label:i.$t("加料排序"),prop:"sort"},{default:u((()=>[f(x,{controls:!1,min:0,max:999,placeholder:i.$t("接近0，排序等级越高"),modelValue:y.form.sort,"onUpdate:modelValue":r[0]||(r[0]=e=>y.form.sort=e),modelModifiers:{number:!0}},null,8,["placeholder","modelValue"])])),_:1},8,["label"]),f(k,{label:i.$t("价格"),prop:"price"},{default:u((()=>[f(v,{type:"number",modelValue:y.form.price,"onUpdate:modelValue":r[1]||(r[1]=e=>y.form.price=e),placeholder:i.$t("请输入价格")},null,8,["modelValue","placeholder"])])),_:1},8,["label"])])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue","onClose"])}],["__scopeId","data-v-8006a48c"]]);export{v as default};
