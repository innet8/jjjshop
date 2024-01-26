import{E as e,g as t,h as l,j as a,D as o,e as s,i,w as r}from"./element-plus-b01b3a31.js";import{P as m}from"./product-1adc2758.js";import{_ as u}from"./Upload-59774d39.js";import{l as p}from"./index-de08bd4a.js";import{_ as d}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as n,o as c,T as f,S as b,a as g,P as j,W as _,X as h,c as v,Q as y,a8 as V}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-eb639176.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const $=JSON.stringify(p().languageData),k=p().languageList,C={class:"btn-warp"},S={class:"dialog-footer"};const U=d({components:{Upload:u},data:()=>({languageList:k,form:{sort:null,attribute_name:JSON.parse($),attribute_value:[]},formRules:{sort:[{required:!0,message:$t("排序不能为空")},{type:"number",message:$t("排序必须为数字")}]},dialogVisible:!1,loading:!1,isupload:!1}),props:["open_add","addform"],created(){this.dialogVisible=this.open_add},methods:{addvalue(){this.form.attribute_value.push(JSON.parse($))},deleteattr(){this.form.attribute_value.pop()},submit(){let t=this,l=JSON.parse(JSON.stringify(t.form));l.attribute_name=JSON.stringify(l.attribute_name),l.attribute_value=JSON.stringify(l.attribute_value),t.$refs.form.validate((a=>{a&&(t.loading=!0,m.addAttribute(l,!0).then((l=>{t.loading=!1,e({message:$t("添加成功"),type:"success"}),t.dialogFormVisible(!0)})).catch((e=>{t.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(e,m,u,p,d,$){const k=t,U=l,x=n("CirclePlusFilled"),J=a,N=n("RemoveFilled"),O=o,D=s,F=i,w=r;return c(),f(w,{title:e.$t("添加属性"),modelValue:d.dialogVisible,"onUpdate:modelValue":m[1]||(m[1]=e=>d.dialogVisible=e),onClose:$.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:b((()=>[g("div",S,[j(F,{onClick:$.dialogFormVisible},{default:b((()=>[_(h(e.$t("取消")),1)])),_:1},8,["onClick"]),j(F,{type:"primary",onClick:$.submit,loading:d.loading},{default:b((()=>[_(h(e.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:b((()=>[j(D,{size:"small",model:d.form,"label-position":"top",rules:d.formRules,ref:"form"},{default:b((()=>[(c(!0),v(y,null,V(d.languageList,((t,l)=>(c(),v(y,{key:l},[j(U,{label:e.$t("属性名称")+`(${t.label})`,prop:`attribute_name.${[t.key]}`,rules:[{required:!0,message:e.$t("请输入属性名称")}]},{default:b((()=>[j(k,{modelValue:d.form.attribute_name[t.key],"onUpdate:modelValue":e=>d.form.attribute_name[t.key]=e,placeholder:e.$t("如：温度"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","prop","rules"]),j(U,{label:e.$t("属性值"),class:"attribute-value",rules:d.form.attribute_value.length<1?[]:[{required:!0,message:e.$t("请输入属性值")}]},{default:b((()=>[(c(!0),v(y,null,V(d.form.attribute_value,((l,a)=>(c(),f(U,{key:a,prop:`form.attribute_value.[${a}].${t.key}`,rules:[{validator:()=>!!l[t.key],message:e.$t("请输入属性值")}]},{default:b((()=>[j(k,{modelValue:l[t.key],"onUpdate:modelValue":e=>l[t.key]=e,placeholder:e.$t("请输入"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["prop","rules"])))),128)),g("div",C,[j(J,{class:"add-button",onClick:$.addvalue},{default:b((()=>[j(x)])),_:1},8,["onClick"]),j(J,{class:"add-button",onClick:$.deleteattr},{default:b((()=>[j(N)])),_:1},8,["onClick"])])])),_:2},1032,["label","rules"])],64)))),128)),j(U,{label:e.$t("属性排序"),prop:"sort"},{default:b((()=>[j(O,{controls:!1,min:0,max:999,placeholder:e.$t("请输入属性排序"),modelValue:d.form.sort,"onUpdate:modelValue":m[0]||(m[0]=e=>d.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["placeholder","modelValue"])])),_:1},8,["label"])])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue","onClose"])}],["__scopeId","data-v-99c5bb50"]]);export{U as default};