import{g as e,h as s,e as o,i as r,u as a}from"./element-plus-bf694ad1.js";import{T as i}from"./terminal-bb8e37e4.js";import{_ as t}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as l,S as d,R as p,a as n,O as m,V as c,W as h}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-191c97f6.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const u={class:"tips"},f={class:"dialog-footer"};const _=t({props:["open","cashierPassword","openTitle"],created(){this.dialogVisible=this.open,this.have=this.cashierPassword},data(){return{isProductUpload:!1,loading:!1,form:{new_cashier_password:"",confirm_cashier_password:"",cashier_password:""},have:!1,rules:{new_cashier_password:[{required:!0,validator:(e,s,o)=>{s?s.length<4||s.length>8||!/^\d+$/.test(s)?o(new Error($t("密码必须是4-8位的数字"))):o():o(new Error($t("请输入密码")))},trigger:"blur"}],confirm_cashier_password:[{required:!0,validator:(e,s,o)=>{s?s!==this.form.new_cashier_password?o(new Error($t("两次密码不一致！"))):o():o(new Error($t("请输入确认密码")))},trigger:"blur"}]}}},methods:{onSubmit(){let e=this;if(this.openTitle==$t("修改钱箱密码")){let s=e.form;e.$refs.form.validate((o=>{o&&(e.loading=!0,i.editCashierPassword(s,!0).then((s=>{e.loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"}),this.$emit("close",1)})).catch((s=>{e.loading=!1})))}))}else e.$refs.form.validate((s=>{if(s){let s={new_advanced_password:"",confirm_advanced_password:""};s.new_advanced_password=e.form.new_cashier_password,s.confirm_advanced_password=e.form.confirm_cashier_password,e.loading=!0,i.editCashierAdvancedPassword(s,!0).then((s=>{e.loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"}),this.$emit("close",1)})).catch((s=>{e.loading=!1}))}}))},handleClose(){this.$emit("close")}}},[["render",function(i,t,_,w,j,g){const $=e,v=s,b=o,y=r,V=a;return l(),d(V,{class:"",onClose:g.handleClose,modelValue:i.dialogVisible,"onUpdate:modelValue":t[2]||(t[2]=e=>i.dialogVisible=e),"close-on-click-modal":!1,"close-on-press-escape":!1,title:_.openTitle},{footer:p((()=>[n("span",f,[m(y,{onClick:g.handleClose},{default:p((()=>[c(h(i.$t("取消")),1)])),_:1},8,["onClick"]),m(y,{type:"primary",onClick:g.onSubmit,loading:j.loading},{default:p((()=>[c(h(i.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:p((()=>[m(b,{size:"small",ref:"form",model:j.form,"label-position":"top",rules:j.rules},{default:p((()=>[m(v,{label:j.have?i.$t("新密码"):i.$t("密码"),prop:"new_cashier_password",rules:[{required:!0,message:i.$t("请输入密码")}]},{default:p((()=>[m($,{modelValue:j.form.new_cashier_password,"onUpdate:modelValue":t[0]||(t[0]=e=>j.form.new_cashier_password=e),type:"password",placeholder:i.$t("请输入密码")},null,8,["modelValue","placeholder"]),n("div",u,h(i.$t("密码必须是4-8位的数字")),1)])),_:1},8,["label","rules"]),m(v,{label:i.$t("确认密码"),prop:"confirm_cashier_password"},{default:p((()=>[m($,{modelValue:j.form.confirm_cashier_password,"onUpdate:modelValue":t[1]||(t[1]=e=>j.form.confirm_cashier_password=e),type:"password",placeholder:i.$t("请确认密码")},null,8,["modelValue","placeholder"])])),_:1},8,["label"])])),_:1},8,["model","rules"])])),_:1},8,["onClose","modelValue","title"])}]]);export{_ as default};
