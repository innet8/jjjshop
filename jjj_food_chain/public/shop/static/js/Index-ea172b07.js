import{g as t,h as e,i as o,e as i}from"./element-plus-bf694ad1.js";import{G as s}from"./group-b0d9c382.js";import{U as r}from"./UE-5a8fd0ed.js";import{_ as a}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as m,o as n,c as p,O as l,R as d,V as c,a as u,bm as j,bk as f}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-191c97f6.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./Upload-d46972b7.js";import"./file-2652919b.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";const g={components:{Uediter:r},data:()=>({ueditor:{text:"",config:{initialFrameWidth:400,initialFrameHeight:500}},form:{explain:"",close_time:""},loading:!0}),created(){this.getData()},methods:{contentChangeFunc(t){this.ueditor.text=t},getData(){let t=this;t.loading=!0,s.getGroupSetting().then((e=>{t.loading=!1;let o=e.data.vars.values;t.ueditor.text=o.explain,t.form.close_time=o.close_time})).catch((t=>{}))},onSubmit(){let t=this,e=t.form;e.explain=t.ueditor.text,t.$refs.ruleForm.validate((o=>{o&&(t.loading=!0,s.editGroupSetting(e,!0).then((e=>{this.$ElMessage({message:$t("保存成功"),type:"success"}),t.getData()})).catch((t=>{})))}))},getContent:function(){}}},h=t=>(j("data-v-a7bfd495"),t=t(),f(),t),v=h((()=>u("div",{class:"common-form"},"订单设置",-1))),b=h((()=>u("div",{class:"tips"}," 订单下单未付款，n分钟后自动关闭，设置0不自动关闭 ",-1))),x=h((()=>u("div",{class:"common-form"},"团购保障",-1))),_={class:"edit_container"},y={class:"common-button-wrapper"};const C=a(g,[["render",function(s,r,a,j,f,g){const h=t,C=e,F=m("Uediter"),w=o,U=i;return n(),p("div",null,[l(U,{size:"small",model:f.form,"label-position":"top",ref:"ruleForm","label-width":"100px"},{default:d((()=>[v,l(C,{label:"未支付订单",prop:"close_time",rules:[{required:!0,message:"请输入关闭时间"}]},{default:d((()=>[l(h,{modelValue:f.form.close_time,"onUpdate:modelValue":r[0]||(r[0]=t=>f.form.close_time=t),type:"number",class:"max-w460"},null,8,["modelValue"]),c(" 分钟后自动关闭 "),b])),_:1}),x,l(C,{label:"团购保障："},{default:d((()=>[u("div",_,[l(F,{text:f.ueditor.text,config:f.ueditor.config,onContentChange:g.contentChangeFunc,ref:"ue"},null,8,["text","config","onContentChange"])])])),_:1}),u("div",y,[l(w,{type:"primary",size:"small",onClick:g.onSubmit,disabled:f.loading},{default:d((()=>[c("提交")])),_:1},8,["onClick","disabled"])])])),_:1},8,["model"])])}],["__scopeId","data-v-a7bfd495"]]);export{C as default};
