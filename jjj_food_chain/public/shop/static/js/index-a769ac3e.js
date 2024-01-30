import{g as e,h as t,p as o,n as a,e as l,i}from"./element-plus-33e0d8cc.js";import{S as r}from"./setting-4f6060af.js";import{_ as s}from"./_plugin-vue_export-helper-1b428a4d.js";import{n as m,o as n,c as u,P as p,S as d,a as c,W as f,X as g,T as _,Y as j}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-02a28aea.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const b={class:"supplier"},h={class:"common-button-wrapper"};const v=s({data:()=>({loading:!1,form:{unit:"",is_open:"1",vice_unit:"",unit_rate:null},formRules:{unit:[{required:!0,message:$t("请输入主货币单位"),trigger:"blur"}],is_open:[{required:!0,message:$t("请输入主货币单位"),trigger:"blur"}],vice_unit:[{required:!0,message:$t("请输入副货币单位"),trigger:"blur"}],unit_rate:[{required:!0,message:$t("请输入货币汇率"),trigger:"blur"}]}}),created(){this.getData()},methods:{getData(){let e=this;r.getCurrencyUnit({},!0).then((t=>{e.loading=!1,e.form=t.data.vars.values,e.form.unit_rate=Number(e.form.unit_rate),e.form.is_open=t.data.vars.values.is_open.toString(),m((()=>{e.$refs.form.validate()}))})).catch((e=>{}))},onSubmit(){let e=this,t=JSON.parse(JSON.stringify(e.form));e.$refs.form.validate((o=>{o&&(e.loading=!0,r.setCurrencyUnit(t,!0).then((t=>{e.loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"}),e.dialogFormVisible(!0)})).catch((t=>{e.loading=!1})))}))}}},[["render",function(r,s,m,v,$,V){const y=e,x=t,k=o,w=a,C=l,S=i;return n(),u("div",b,[p(C,{size:"small",ref:"form",model:$.form,"label-position":"top",rules:$.formRules},{default:d((()=>[p(x,{label:r.$t("主货币单位"),prop:"unit"},{default:d((()=>[p(y,{class:"max-w460",modelValue:$.form.unit,"onUpdate:modelValue":s[0]||(s[0]=e=>$.form.unit=e),maxlength:50,placeholder:"请输入"},null,8,["modelValue"])])),_:1},8,["label"]),p(x,{label:r.$t("副货币单位"),prop:"is_open"},{default:d((()=>[c("div",null,[p(k,{modelValue:$.form.is_open,"onUpdate:modelValue":s[1]||(s[1]=e=>$.form.is_open=e),label:"1"},{default:d((()=>[f(g(r.$t("开启")),1)])),_:1},8,["modelValue"]),p(k,{modelValue:$.form.is_open,"onUpdate:modelValue":s[2]||(s[2]=e=>$.form.is_open=e),label:"0"},{default:d((()=>[f(g(r.$t("关闭")),1)])),_:1},8,["modelValue"])])])),_:1},8,["label"]),"1"==$.form.is_open?(n(),_(x,{key:0,label:r.$t("副货币单位"),prop:"vice_unit"},{default:d((()=>[p(y,{class:"max-w460",modelValue:$.form.vice_unit,"onUpdate:modelValue":s[3]||(s[3]=e=>$.form.vice_unit=e),placeholder:r.$t("请输入"),maxLength:"50"},null,8,["modelValue","placeholder"])])),_:1},8,["label"])):j("",!0),"1"==$.form.is_open?(n(),_(x,{key:1,label:r.$t("副货币汇率"),prop:"unit_rate"},{default:d((()=>[p(w,{class:"max-w460",controls:!1,precision:4,min:0,placeholder:r.$t("请输入"),modelValue:$.form.unit_rate,"onUpdate:modelValue":s[4]||(s[4]=e=>$.form.unit_rate=e),modelModifiers:{number:!0}},null,8,["placeholder","modelValue"])])),_:1},8,["label"])):j("",!0)])),_:1},8,["model","rules"]),c("div",h,[p(S,{onClick:V.getData,loading:$.loading},{default:d((()=>[f(g(r.$t("重置")),1)])),_:1},8,["onClick","loading"]),p(S,{type:"primary",onClick:V.onSubmit,loading:$.loading},{default:d((()=>[f(g(r.$t("保存")),1)])),_:1},8,["onClick","loading"])])])}]]);export{v as default};