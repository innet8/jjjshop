import{g as e,h as t,w as r,n as o,e as i,i as s}from"./element-plus-bf694ad1.js";import{S as a}from"./setting-a0874944.js";import{u as l,s as n}from"./index-2ad583c4.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{n as u,o as p,c as d,O as c,R as f,a as g,V as _,W as j,S as h,X as b}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const{currency:v}=l(),y={class:"supplier"},$={class:"common-button-wrapper"};const V=m({data:()=>({currency:v,loading:!1,form:{unit:"",is_open:"1",vice_unit:"",unit_rate:null},formRules:{unit:[{required:!0,message:$t("请输入主货币单位"),trigger:"blur"}],is_open:[{required:!0,message:$t("请输入主货币单位"),trigger:"blur"}],vice_unit:[{required:!0,message:$t("请输入副货币单位"),trigger:"blur"}],unit_rate:[{required:!0,message:$t("请输入货币汇率"),trigger:"blur"}]}}),created(){this.getData()},methods:{getData(){let e=this;a.getCurrencyUnit({},!0).then((t=>{e.loading=!1,e.form=t.data.vars.values,e.form.unit_rate=Number(e.form.unit_rate),e.form.is_open=t.data.vars.values.is_open.toString(),u((()=>{e.$refs.form.validate()}))})).catch((e=>{}))},onSubmit(){let e=this,t=JSON.parse(JSON.stringify(e.form));e.$refs.form.validate((r=>{r&&(e.loading=!0,a.setCurrencyUnit(t,!0).then((r=>{e.loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"}),e.currency.is_open=t.is_open,e.currency.unit=t.unit,e.currency.vices.unit_rate=t.unit_rate,e.currency.vices.vice_unit=t.vice_unit,n(JSON.stringify(e.currency),"currency"),e.dialogFormVisible(!0)})).catch((t=>{e.loading=!1})))}))}}},[["render",function(a,l,n,m,u,v){const V=e,x=t,w=r,S=o,C=i,U=s;return p(),d("div",y,[c(C,{size:"small",ref:"form",model:u.form,"label-position":"top",rules:u.formRules},{default:f((()=>[c(x,{label:a.$t("主货币单位"),prop:"unit"},{default:f((()=>[c(V,{class:"max-w460",modelValue:u.form.unit,"onUpdate:modelValue":l[0]||(l[0]=e=>u.form.unit=e),maxlength:50,placeholder:"请输入"},null,8,["modelValue"])])),_:1},8,["label"]),c(x,{label:a.$t("副货币单位"),prop:"is_open"},{default:f((()=>[g("div",null,[c(w,{modelValue:u.form.is_open,"onUpdate:modelValue":l[1]||(l[1]=e=>u.form.is_open=e),label:"1"},{default:f((()=>[_(j(a.$t("开启")),1)])),_:1},8,["modelValue"]),c(w,{modelValue:u.form.is_open,"onUpdate:modelValue":l[2]||(l[2]=e=>u.form.is_open=e),label:"0"},{default:f((()=>[_(j(a.$t("关闭")),1)])),_:1},8,["modelValue"])])])),_:1},8,["label"]),"1"==u.form.is_open?(p(),h(x,{key:0,label:a.$t("副货币单位"),prop:"vice_unit"},{default:f((()=>[c(V,{class:"max-w460",modelValue:u.form.vice_unit,"onUpdate:modelValue":l[3]||(l[3]=e=>u.form.vice_unit=e),placeholder:a.$t("请输入"),maxLength:"50"},null,8,["modelValue","placeholder"])])),_:1},8,["label"])):b("",!0),"1"==u.form.is_open?(p(),h(x,{key:1,label:a.$t("副货币汇率"),prop:"unit_rate"},{default:f((()=>[c(S,{class:"max-w460",controls:!1,precision:4,min:0,placeholder:a.$t("请输入"),modelValue:u.form.unit_rate,"onUpdate:modelValue":l[4]||(l[4]=e=>u.form.unit_rate=e),modelModifiers:{number:!0}},null,8,["placeholder","modelValue"])])),_:1},8,["label"])):b("",!0)])),_:1},8,["model","rules"]),g("div",$,[c(U,{onClick:v.getData,loading:u.loading},{default:f((()=>[_(j(a.$t("重置")),1)])),_:1},8,["onClick","loading"]),c(U,{type:"primary",onClick:v.onSubmit,loading:u.loading},{default:f((()=>[_(j(a.$t("保存")),1)])),_:1},8,["onClick","loading"])])])}]]);export{V as default};