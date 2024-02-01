import{g as e,h as t,j as l,n as a,e as o,i as s,x as i}from"./element-plus-33e0d8cc.js";import{P as r}from"./product-f7014bea.js";import{_ as m}from"./Upload-423c9ce2.js";import{l as u}from"./index-2a70ce31.js";import{_ as d}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as p,o as n,T as c,S as f,a as g,P as b,W as j,X as _,c as h,Q as v,a8 as y}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-43fcf892.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const $=JSON.stringify(u().languageData),V=u().languageList,k={class:"btn-warp"},C={class:"dialog-footer"};const x=d({components:{Upload:m},data:()=>({languageList:V,form:{sort:null,attribute_name:JSON.parse($),attribute_value:[]},formRules:{sort:[{required:!0,message:$t("排序不能为空")},{type:"number",message:$t("排序必须为数字")}]},dialogVisible:!1,loading:!1,isupload:!1}),props:["open_add","addform"],created(){this.dialogVisible=this.open_add},methods:{addvalue(){this.form.attribute_value.push(JSON.parse($))},deleteattr(){this.form.attribute_value.pop()},submit(){let e=this,t=JSON.parse(JSON.stringify(e.form));t.attribute_name=JSON.stringify(t.attribute_name),t.attribute_value=JSON.stringify(t.attribute_value),e.$refs.form.validate((l=>{l&&(e.loading=!0,r.addAttribute(t,!0).then((t=>{e.loading=!1,this.$ElMessage({message:$t("添加成功"),type:"success"}),e.dialogFormVisible(!0)})).catch((t=>{e.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(r,m,u,d,$,V){const x=e,S=t,U=p("CirclePlusFilled"),J=l,N=p("RemoveFilled"),O=a,F=o,D=s,q=i;return n(),c(q,{title:r.$t("添加属性"),modelValue:$.dialogVisible,"onUpdate:modelValue":m[1]||(m[1]=e=>$.dialogVisible=e),onClose:V.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:f((()=>[g("div",C,[b(D,{onClick:V.dialogFormVisible},{default:f((()=>[j(_(r.$t("取消")),1)])),_:1},8,["onClick"]),b(D,{type:"primary",onClick:V.submit,loading:$.loading},{default:f((()=>[j(_(r.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:f((()=>[b(F,{size:"small",model:$.form,"label-position":"top",rules:$.formRules,ref:"form"},{default:f((()=>[(n(!0),h(v,null,y($.languageList,((e,t)=>(n(),h(v,{key:t},[b(S,{label:r.$t("属性名称")+`(${e.label})`,prop:`attribute_name.${[e.key]}`,rules:[{required:!0,message:r.$t("请输入属性名称")}]},{default:f((()=>[b(x,{modelValue:$.form.attribute_name[e.key],"onUpdate:modelValue":t=>$.form.attribute_name[e.key]=t,placeholder:r.$t("如：温度"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","prop","rules"]),b(S,{label:r.$t("属性值"),class:"attribute-value",rules:$.form.attribute_value.length<1?[]:[{required:!0,message:r.$t("请输入属性值")}]},{default:f((()=>[(n(!0),h(v,null,y($.form.attribute_value,((t,l)=>(n(),c(S,{key:l,prop:`form.attribute_value.[${l}].${e.key}`,rules:[{validator:()=>!!t[e.key],message:r.$t("请输入属性值")}]},{default:f((()=>[b(x,{modelValue:t[e.key],"onUpdate:modelValue":l=>t[e.key]=l,placeholder:r.$t("请输入"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["prop","rules"])))),128)),g("div",k,[b(J,{class:"add-button",onClick:V.addvalue},{default:f((()=>[b(U)])),_:1},8,["onClick"]),b(J,{class:"add-button",onClick:V.deleteattr},{default:f((()=>[b(N)])),_:1},8,["onClick"])])])),_:2},1032,["label","rules"])],64)))),128)),b(S,{label:r.$t("属性排序"),prop:"sort"},{default:f((()=>[b(O,{controls:!1,min:0,max:999,placeholder:r.$t("请输入属性排序"),modelValue:$.form.sort,"onUpdate:modelValue":m[0]||(m[0]=e=>$.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["placeholder","modelValue"])])),_:1},8,["label"])])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue","onClose"])}],["__scopeId","data-v-8741dec4"]]);export{x as default};