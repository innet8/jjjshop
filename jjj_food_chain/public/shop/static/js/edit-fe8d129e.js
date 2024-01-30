import{g as e,h as t,j as o,n as a,e as l,i as s,x as i}from"./element-plus-33e0d8cc.js";import{P as r}from"./product-b9a60a86.js";import{_ as m}from"./Upload-66ad4daf.js";import{l as u}from"./index-188a77f0.js";import{_ as d}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as p,o as n,T as f,S as c,a as b,P as g,W as j,X as h,c as _,Q as v,a8 as y}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-5ed95284.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const V=JSON.stringify(u().languageData),$=u().languageList,k={class:"btn-warp"},C={class:"dialog-footer"};const x=d({components:{Upload:m},data:()=>({languageList:$,form:{sort:100,attribute_name:JSON.parse(V),attribute_value:[]},formRules:{sort:[{required:!0,message:$t("排序不能为空")},{type:"number",message:$t("排序必须为数字")}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}),props:["open_edit","editform"],created(){this.dialogVisible=this.open_edit,this.form.attribute_value=this.editform.attribute_value,this.form.attribute_id=this.editform.attribute_id,this.form.attribute_name=JSON.parse(this.editform.attribute_name),this.form.sort=this.editform.sort},methods:{addvalue(){this.form.attribute_value.push(JSON.parse(V))},deleteattr(){this.form.attribute_value.pop()},submit(){let e=this,t=JSON.parse(JSON.stringify(e.form));t.attribute_name=JSON.stringify(t.attribute_name),t.attribute_value=JSON.stringify(t.attribute_value),e.$refs.form.validate((o=>{o&&(e.loading=!0,r.editAttribute(t).then((t=>{e.loading=!1,this.$ElMessage({message:$t("修改成功"),type:"success"}),e.dialogFormVisible(!0)})).catch((t=>{e.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(r,m,u,d,V,$){const x=e,S=t,J=p("CirclePlusFilled"),N=o,O=p("RemoveFilled"),U=a,F=l,D=s,q=i;return n(),f(q,{title:"编辑属性",modelValue:V.dialogVisible,"onUpdate:modelValue":m[1]||(m[1]=e=>V.dialogVisible=e),onClose:$.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:c((()=>[b("div",C,[g(D,{onClick:$.dialogFormVisible},{default:c((()=>[j(h(r.$t("取消")),1)])),_:1},8,["onClick"]),g(D,{type:"primary",onClick:$.submit,loading:V.loading},{default:c((()=>[j(h(r.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:c((()=>[g(F,{size:"small",model:V.form,"label-position":"top",rules:V.formRules,ref:"form"},{default:c((()=>[(n(!0),_(v,null,y(V.languageList,((e,t)=>(n(),_(v,{key:t},[g(S,{label:r.$t("属性名称")+`(${e.label})`,rules:[{required:!0,message:r.$t("请输入属性名称")}]},{default:c((()=>[g(x,{modelValue:V.form.attribute_name[e.key],"onUpdate:modelValue":t=>V.form.attribute_name[e.key]=t,placeholder:r.$t("如：温度"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","rules"]),g(S,{label:r.$t("属性值"),class:"attribute-value",rules:V.form.attribute_value.length<1?[]:[{required:!0,message:r.$t("请输入属性值")}]},{default:c((()=>[(n(!0),_(v,null,y(V.form.attribute_value,((t,o)=>(n(),f(S,{key:o,prop:`form.attribute_value.[${o}].${e.key}`,rules:[{validator:()=>!!t[e.key],message:r.$t("请输入属性值")}]},{default:c((()=>[g(x,{modelValue:t[e.key],"onUpdate:modelValue":o=>t[e.key]=o,placeholder:r.$t("请输入"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["prop","rules"])))),128)),b("div",k,[g(N,{class:"add-button",onClick:$.addvalue},{default:c((()=>[g(J)])),_:1},8,["onClick"]),g(N,{class:"add-button",onClick:$.deleteattr},{default:c((()=>[g(O)])),_:1},8,["onClick"])])])),_:2},1032,["label","rules"])],64)))),128)),g(S,{label:r.$t("属性排序"),prop:"sort"},{default:c((()=>[g(U,{controls:!1,min:0,max:999,placeholder:r.$t("请输入属性排序"),modelValue:V.form.sort,"onUpdate:modelValue":m[0]||(m[0]=e=>V.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["placeholder","modelValue"])])),_:1},8,["label"])])),_:1},8,["model","rules"])])),_:1},8,["modelValue","onClose"])}],["__scopeId","data-v-b497da71"]]);export{x as default};