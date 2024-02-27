import{g as e,h as o,e as s,i as l,u as a}from"./element-plus-bf694ad1.js";import{C as r}from"./cashier-5e12392e.js";import{_ as i}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as t,S as m,R as d,a as p,O as n,V as u}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-191c97f6.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const f={class:"dialog-footer"};const c=i({components:{},data:()=>({form:{user_name:"",mobile:"",account:"",password:""},formRules:{user_name:[{required:!0,message:"请输入姓名",trigger:"blur"}],mobile:[{required:!0,message:"请输入联系方式",trigger:"blur"}],account:[{required:!0,message:"请输入登录账号",trigger:"blur"}],password:[{required:!0,message:"请输入登录密码",trigger:"blur"},{min:6,max:16,message:"长度在6到16个字符",trigger:"blur"}],confirm_password:[{required:!0,message:"请输入确认密码",trigger:"blur"}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}),props:["open_add","addform"],created(){this.dialogVisible=this.open_add},methods:{addUser(){let e=this,o=e.form;/^1[3456789]\d{9}$/.test(o.mobile)?""!=o.password&&o.confirm_password&&o.password!=o.confirm_password?this.$ElMessage({message:"两次输入密码不一致！",type:"warning"}):e.$refs.form.validate((s=>{s&&(e.loading=!0,r.addUser(o).then((o=>{e.loading=!1,this.$ElMessage({message:"添加成功",type:"success"}),e.dialogFormVisible(!0)})).catch((o=>{e.loading=!1})))})):this.$ElMessage({message:"请输入正确手机号！",type:"warning"})},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(r,i,c,g,b,h){const j=e,w=o,V=s,_=l,y=a;return t(),m(y,{title:"添加收银员",modelValue:b.dialogVisible,"onUpdate:modelValue":i[5]||(i[5]=e=>b.dialogVisible=e),onClose:h.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:d((()=>[p("div",f,[n(_,{onClick:h.dialogFormVisible},{default:d((()=>[u("取 消")])),_:1},8,["onClick"]),n(_,{type:"primary",onClick:h.addUser,loading:b.loading},{default:d((()=>[u("确 定")])),_:1},8,["onClick","loading"])])])),default:d((()=>[n(V,{size:"small",model:b.form,"label-position":"top",rules:b.formRules,ref:"form"},{default:d((()=>[n(w,{label:"姓名",prop:"user_name","label-width":b.formLabelWidth},{default:d((()=>[n(j,{modelValue:b.form.user_name,"onUpdate:modelValue":i[0]||(i[0]=e=>b.form.user_name=e),autocomplete:"off"},null,8,["modelValue"])])),_:1},8,["label-width"]),n(w,{label:"手机号",prop:"mobile","label-width":b.formLabelWidth},{default:d((()=>[n(j,{type:"number",modelValue:b.form.mobile,"onUpdate:modelValue":i[1]||(i[1]=e=>b.form.mobile=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["modelValue"])])),_:1},8,["label-width"]),n(w,{label:"登录账号",prop:"account","label-width":b.formLabelWidth},{default:d((()=>[n(j,{type:"text",modelValue:b.form.account,"onUpdate:modelValue":i[2]||(i[2]=e=>b.form.account=e),autocomplete:"off"},null,8,["modelValue"])])),_:1},8,["label-width"]),n(w,{label:"登录密码",prop:"password","label-width":b.formLabelWidth},{default:d((()=>[n(j,{type:"password",modelValue:b.form.password,"onUpdate:modelValue":i[3]||(i[3]=e=>b.form.password=e),autocomplete:"off"},null,8,["modelValue"])])),_:1},8,["label-width"]),n(w,{label:"确认密码",prop:"confirm_password","label-width":b.formLabelWidth},{default:d((()=>[n(j,{type:"password",modelValue:b.form.confirm_password,"onUpdate:modelValue":i[4]||(i[4]=e=>b.form.confirm_password=e),autocomplete:"off"},null,8,["modelValue"])])),_:1},8,["label-width"])])),_:1},8,["model","rules"])])),_:1},8,["modelValue","onClose"])}],["__scopeId","data-v-1dc56181"]]);export{c as default};
