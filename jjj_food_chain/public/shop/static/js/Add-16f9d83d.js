import{E as e,c as l,d as o,r as s,s as a,b as r,e as i,o as m}from"./element-plus-7d357588.js";import{_ as t,A as d}from"./index-f792122d.js";import{o as p,T as u,S as n,a as c,P as f,W as g,c as _,Q as b,a8 as j}from"./@vue-48c55b54.js";import"./@vueuse-c556fb5a.js";import"./lodash-es-c1acaa3d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-e0f4a3e8.js";import"./dayjs-9faf8871.js";import"./call-bind-0c463fe3.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-b8ff3004.js";import"./pinia-73166104.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-942d6868.js";import"./side-channel-ba7aab8a.js";import"./object-inspect-860361a9.js";import"./vue-ueditor-wrap-cd29f9a1.js";const V={class:"dialog-footer"};const h=t({data:()=>({formLabelWidth:"120px",loading:!1,dialogVisible:!1,form:{user_name:"",access_id:[]},formRules:{user_name:[{required:!0,message:" ",trigger:"blur"}],role_id:[{required:!0,message:" ",trigger:"blur"}],password:[{required:!0,message:" ",trigger:"blur"}],confirm_password:[{required:!0,message:" ",trigger:"blur"}],real_name:[{required:!0,message:" ",trigger:"blur"}]}}),props:["open","roleList"],watch:{open:function(e,l){e!=l&&(this.dialogVisible=this.open)}},created(){},methods:{onSubmit(){let l=this;l.loading=!0;let o=l.form;d.userAdd(o,!0).then((o=>{l.loading=!1,e({message:"恭喜你，添加成功",type:"success"}),l.dialogFormVisible(!0)})).catch((e=>{l.loading=!1}))},dialogFormVisible(e){e?this.$emit("close",{type:"success",openDialog:!1}):this.$emit("close",{type:"error",openDialog:!1})}}},[["render",function(e,t,d,h,w,y){const v=l,q=o,k=s,U=a,x=r,C=i,L=m;return p(),u(L,{title:"添加管理员",modelValue:w.dialogVisible,"onUpdate:modelValue":t[6]||(t[6]=e=>w.dialogVisible=e),onClose:y.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:n((()=>[c("div",V,[f(C,{onClick:t[5]||(t[5]=e=>w.dialogVisible=!1)},{default:n((()=>[g("取 消")])),_:1}),f(C,{type:"primary",onClick:y.onSubmit,loading:w.loading},{default:n((()=>[g("确 定")])),_:1},8,["onClick","loading"])])])),default:n((()=>[f(x,{size:"small",ref:"form",model:w.form,rules:w.formRules,"label-width":w.formLabelWidth},{default:n((()=>[f(q,{label:"用户名",prop:"user_name"},{default:n((()=>[f(v,{modelValue:w.form.user_name,"onUpdate:modelValue":t[0]||(t[0]=e=>w.form.user_name=e),placeholder:"请输入用户名"},null,8,["modelValue"])])),_:1}),f(q,{label:"所属角色",prop:"role_id"},{default:n((()=>[f(U,{modelValue:w.form.role_id,"onUpdate:modelValue":t[1]||(t[1]=e=>w.form.role_id=e),multiple:!0},{default:n((()=>[(p(!0),_(b,null,j(d.roleList,(e=>(p(),u(k,{value:e.role_id,key:e.role_id,label:e.role_name_h1},null,8,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1}),f(q,{label:"登录密码",prop:"password"},{default:n((()=>[f(v,{modelValue:w.form.password,"onUpdate:modelValue":t[2]||(t[2]=e=>w.form.password=e),placeholder:"请输入登录密码",type:"password"},null,8,["modelValue"])])),_:1}),f(q,{label:"确认密码",prop:"confirm_password"},{default:n((()=>[f(v,{modelValue:w.form.confirm_password,"onUpdate:modelValue":t[3]||(t[3]=e=>w.form.confirm_password=e),placeholder:"请输入确认密码",type:"password"},null,8,["modelValue"])])),_:1}),f(q,{label:"姓名",prop:"real_name"},{default:n((()=>[f(v,{modelValue:w.form.real_name,"onUpdate:modelValue":t[4]||(t[4]=e=>w.form.real_name=e)},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules","label-width"])])),_:1},8,["modelValue","onClose"])}]]);export{h as default};
