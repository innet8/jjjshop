import{g as e,h as t,j as o,n as a,e as l,i as s,u as i}from"./element-plus-c8084613.js";import{P as r}from"./product-fbff5939.js";import{_ as m}from"./Upload-e7579a9c.js";import{l as p}from"./index-74b65baf.js";import{_ as u}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as d,o as n,S as c,R as f,a as b,O as g,V as j,W as h,c as _,P as v,a7 as y}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-9623813c.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const V=JSON.stringify(p().languageData),$=p().languageList,k={class:"btn-warp"},C={class:"dialog-footer"};const x=u({components:{Upload:m},data:()=>({languageList:$,form:{sort:100,attribute_name:JSON.parse(V),attribute_value:[]},formRules:{sort:[{required:!0,message:$t("排序不能为空")},{type:"number",message:$t("排序必须为数字")}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}),props:["open_edit","editform"],created(){this.dialogVisible=this.open_edit,this.form.attribute_value=this.editform.attribute_value,this.form.attribute_id=this.editform.attribute_id,this.form.attribute_name=JSON.parse(this.editform.attribute_name),this.form.sort=this.editform.sort},methods:{addvalue(){this.form.attribute_value.push(JSON.parse(V))},deleteattr(){this.form.attribute_value.pop()},submit(){let e=this,t=JSON.parse(JSON.stringify(e.form));t.attribute_name=JSON.stringify(t.attribute_name),t.attribute_value=JSON.stringify(t.attribute_value),e.$refs.form.validate((o=>{o&&(e.loading=!0,r.editAttribute(t).then((t=>{e.loading=!1,this.$ElMessage({message:$t("修改成功"),type:"success"}),e.dialogFormVisible(!0)})).catch((t=>{e.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(r,m,p,u,V,$){const x=e,O=t,S=d("CirclePlusFilled"),J=o,N=d("RemoveFilled"),U=a,F=l,D=s,q=i;return n(),c(q,{title:"编辑属性",modelValue:V.dialogVisible,"onUpdate:modelValue":m[1]||(m[1]=e=>V.dialogVisible=e),onClose:$.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:f((()=>[b("div",C,[g(D,{onClick:$.dialogFormVisible},{default:f((()=>[j(h(r.$t("取消")),1)])),_:1},8,["onClick"]),g(D,{type:"primary",onClick:$.submit,loading:V.loading},{default:f((()=>[j(h(r.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:f((()=>[g(F,{size:"small",model:V.form,"label-position":"top",rules:V.formRules,ref:"form"},{default:f((()=>[(n(!0),_(v,null,y(V.languageList,((e,t)=>(n(),_(v,{key:t},[g(O,{label:r.$t("属性名称")+"(".concat(e.label,")"),rules:[{required:!0,message:r.$t("请输入属性名称")}]},{default:f((()=>[g(x,{modelValue:V.form.attribute_name[e.key],"onUpdate:modelValue":t=>V.form.attribute_name[e.key]=t,placeholder:r.$t("如：温度"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","rules"]),g(O,{label:r.$t("属性值"),class:"attribute-value",rules:V.form.attribute_value.length<1?[]:[{required:!0,message:r.$t("请输入属性值")}]},{default:f((()=>[(n(!0),_(v,null,y(V.form.attribute_value,((t,o)=>(n(),c(O,{key:o,prop:"form.attribute_value.[".concat(o,"].").concat(e.key),rules:[{validator:()=>!!t[e.key],message:r.$t("请输入属性值")}]},{default:f((()=>[g(x,{modelValue:t[e.key],"onUpdate:modelValue":o=>t[e.key]=o,placeholder:r.$t("请输入"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["prop","rules"])))),128)),b("div",k,[g(J,{class:"add-button",onClick:$.addvalue},{default:f((()=>[g(S)])),_:1},8,["onClick"]),g(J,{class:"add-button",onClick:$.deleteattr},{default:f((()=>[g(N)])),_:1},8,["onClick"])])])),_:2},1032,["label","rules"])],64)))),128)),g(O,{label:r.$t("属性排序"),prop:"sort"},{default:f((()=>[g(U,{controls:!1,min:0,max:999,placeholder:r.$t("请输入属性排序"),modelValue:V.form.sort,"onUpdate:modelValue":m[0]||(m[0]=e=>V.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["placeholder","modelValue"])])),_:1},8,["label"])])),_:1},8,["model","rules"])])),_:1},8,["modelValue","onClose"])}],["__scopeId","data-v-b497da71"]]);export{x as default};
