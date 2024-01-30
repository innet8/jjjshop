import{E as e,g as l,h as o,q as a,r as s,e as r,i,w as t}from"./element-plus-b01b3a31.js";import{A as d}from"./index-e7c8e96a.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as p,T as n,S as u,a as c,P as f,W as _,X as h,c as g,Q as b,a8 as j}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const V={class:"tips"},w={class:"tips"},$={class:"dialog-footer"};const v=m({data(){return{formLabelWidth:"120px",loading:!1,dialogVisible:!1,form:{password:"",confirm_password:"",access_id:[]},access_id:[],roleList:[],formRules:{user_name:[{required:!0,message:$t("请输入用户名"),trigger:"blur"}],role_id:[{required:!0,message:$t("请选择角色"),trigger:"blur"}],confirm_password:[{validator:(e,l,o)=>{l!=this.form.password&&this.form.password?o(new Error($t("两次密码不一致！"))):o()},trigger:"blur"}],real_name:[{required:!0,message:$t("请输入姓名"),trigger:"blur"}]}}},props:["open","shop_user_id"],watch:{open:function(e,l){e!=l&&(this.dialogVisible=this.open,this.getData())}},created(){},methods:{getData(){let e=this;d.userEditInfo({shop_user_id:this.shop_user_id}).then((l=>{e.loading=!1,e.roleList=l.data.roleList;let o=l.data.info;o.access_id=l.data.role_arr,o.password="",e.form=o,e.form.role_id=l.data.role_arr})).catch((l=>{e.loading=!1}))},onSubmit(){let l=this;l.$refs.form.validate((o=>{if(o){l.loading=!0;let o=l.form;d.userEdit(o,!0).then((o=>{l.loading=!1,e({message:"恭喜你，修改成功",type:"success"}),l.dialogFormVisible(!0)})).catch((e=>{l.loading=!1}))}}))},dialogFormVisible(e){this.form={user_name:"",access_id:[]},e?this.$emit("close",{type:"success",openDialog:!1}):this.$emit("close",{type:"error",openDialog:!1})}}},[["render",function(e,d,m,v,y,k){const C=l,L=o,U=a,q=s,x=r,D=i,E=t;return p(),n(E,{title:e.$t("修改管理员"),modelValue:y.dialogVisible,"onUpdate:modelValue":d[6]||(d[6]=e=>y.dialogVisible=e),onClose:k.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:u((()=>[c("div",$,[f(D,{onClick:d[5]||(d[5]=e=>y.dialogVisible=!1)},{default:u((()=>[_(h(e.$t("取消")),1)])),_:1}),f(D,{type:"primary",onClick:k.onSubmit,loading:y.loading},{default:u((()=>[_(h(e.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:u((()=>[f(x,{size:"small",ref:"form",model:y.form,"label-position":"top",rules:y.formRules,"label-width":y.formLabelWidth},{default:u((()=>[f(L,{label:e.$t("用户名"),prop:"user_name"},{default:u((()=>[f(C,{modelValue:y.form.user_name,"onUpdate:modelValue":d[0]||(d[0]=e=>y.form.user_name=e),placeholder:e.$t("请输入用户名")},null,8,["modelValue","placeholder"]),c("div",V,h(e.$t("用户名4-16位纯数字")),1)])),_:1},8,["label"]),f(L,{label:e.$t("角色"),prop:"role_id"},{default:u((()=>[f(q,{modelValue:y.form.role_id,"onUpdate:modelValue":d[1]||(d[1]=e=>y.form.role_id=e),multiple:!0,placeholder:e.$t("请选择角色")},{default:u((()=>[(p(!0),g(b,null,j(y.roleList,(e=>(p(),n(U,{value:e.role_id,key:e.role_id,label:e.role_name_h1},null,8,["value","label"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"]),f(L,{label:e.$t("登录密码"),prop:"password"},{default:u((()=>[f(C,{modelValue:y.form.password,"onUpdate:modelValue":d[2]||(d[2]=e=>y.form.password=e),placeholder:e.$t("请输入登录密码"),type:"password"},null,8,["modelValue","placeholder"]),c("div",w,h(e.$t("密码4-16位纯数字")),1)])),_:1},8,["label"]),f(L,{label:e.$t("确认密码"),prop:"confirm_password"},{default:u((()=>[f(C,{modelValue:y.form.confirm_password,"onUpdate:modelValue":d[3]||(d[3]=e=>y.form.confirm_password=e),placeholder:e.$t("请输入确认密码"),type:"password"},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),f(L,{label:e.$t("姓名"),prop:"real_name"},{default:u((()=>[f(C,{modelValue:y.form.real_name,"onUpdate:modelValue":d[4]||(d[4]=e=>y.form.real_name=e),placeholder:e.$t("请输入姓名")},null,8,["modelValue","placeholder"])])),_:1},8,["label"])])),_:1},8,["model","rules","label-width"])])),_:1},8,["title","modelValue","onClose"])}]]);export{v as default};
