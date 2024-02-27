import{g as e,h as o,w as l,e as s,i as a,u as t}from"./element-plus-bf694ad1.js";import{C as i}from"./cashier-5e12392e.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as m,S as d,R as p,a as u,O as n,V as f}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-191c97f6.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const c={class:"dialog-footer"};const h=r({components:{},data:()=>({form:{cashier_id:0,user_name:"",mobile:"",account:"",password:"",status:""},file_path:"",formRules:{user_name:[{required:!0,message:"请输入姓名",trigger:"blur"}],mobile:[{required:!0,message:"请输入联系方式",trigger:"blur"}],account:[{required:!0,message:"请输入登录账号",trigger:"blur"}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}),props:["open_edit","editform"],created(){this.dialogVisible=this.open_edit,this.form.cashier_id=this.editform.model.cashier_id,this.form.user_name=this.editform.model.user_name,this.form.mobile=this.editform.model.mobile,this.form.account=this.editform.model.account,this.form.status=this.editform.model.status},methods:{addUser(){let e=this,o=e.form;/^1[3456789]\d{9}$/.test(o.mobile)?""!=o.password&&o.confirm_password&&o.password!=o.confirm_password?this.$ElMessage({message:"两次输入密码不一致！",type:"warning"}):e.$refs.form.validate((l=>{l&&(e.loading=!0,i.editUser(o,!0).then((o=>{e.loading=!1,this.$ElMessage({message:"保存成功",type:"success"}),e.dialogFormVisible(!0)})).catch((o=>{e.loading=!1})))})):this.$ElMessage({message:"请输入正确手机号！",type:"warning"})},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(i,r,h,b,g,j){const V=e,_=o,w=l,y=s,U=a,v=t;return m(),d(v,{title:"添加类型",modelValue:g.dialogVisible,"onUpdate:modelValue":r[7]||(r[7]=e=>g.dialogVisible=e),onClose:j.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:p((()=>[u("div",c,[n(U,{onClick:j.dialogFormVisible},{default:p((()=>[f("取 消")])),_:1},8,["onClick"]),n(U,{type:"primary",onClick:j.addUser,loading:g.loading},{default:p((()=>[f("确 定")])),_:1},8,["onClick","loading"])])])),default:p((()=>[n(y,{size:"small",model:g.form,"label-position":"top",rules:g.formRules,ref:"form"},{default:p((()=>[n(_,{label:"姓名",prop:"user_name","label-width":g.formLabelWidth},{default:p((()=>[n(V,{modelValue:g.form.user_name,"onUpdate:modelValue":r[0]||(r[0]=e=>g.form.user_name=e),autocomplete:"off"},null,8,["modelValue"])])),_:1},8,["label-width"]),n(_,{label:"手机号",prop:"mobile","label-width":g.formLabelWidth},{default:p((()=>[n(V,{type:"number",modelValue:g.form.mobile,"onUpdate:modelValue":r[1]||(r[1]=e=>g.form.mobile=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["modelValue"])])),_:1},8,["label-width"]),n(_,{label:"登录账号",prop:"account","label-width":g.formLabelWidth},{default:p((()=>[n(V,{type:"text",modelValue:g.form.account,"onUpdate:modelValue":r[2]||(r[2]=e=>g.form.account=e),autocomplete:"off"},null,8,["modelValue"])])),_:1},8,["label-width"]),n(_,{label:"状态","label-width":g.formLabelWidth},{default:p((()=>[u("div",null,[n(w,{modelValue:g.form.status,"onUpdate:modelValue":r[3]||(r[3]=e=>g.form.status=e),label:1},{default:p((()=>[f("开启")])),_:1},8,["modelValue"]),n(w,{modelValue:g.form.status,"onUpdate:modelValue":r[4]||(r[4]=e=>g.form.status=e),label:0},{default:p((()=>[f("禁用")])),_:1},8,["modelValue"])])])),_:1},8,["label-width"]),n(_,{label:"登录密码",prop:"password","label-width":g.formLabelWidth},{default:p((()=>[n(V,{type:"password",modelValue:g.form.password,"onUpdate:modelValue":r[5]||(r[5]=e=>g.form.password=e),autocomplete:"off"},null,8,["modelValue"])])),_:1},8,["label-width"]),n(_,{label:"确认密码",prop:"confirm_password","label-width":g.formLabelWidth},{default:p((()=>[n(V,{type:"password",modelValue:g.form.confirm_password,"onUpdate:modelValue":r[6]||(r[6]=e=>g.form.confirm_password=e),autocomplete:"off"},null,8,["modelValue"])])),_:1},8,["label-width"])])),_:1},8,["model","rules"])])),_:1},8,["modelValue","onClose"])}]]);export{h as default};
