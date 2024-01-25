import{E as e,g as l,h as o,q as a,r as s,e as r,i,w as t,v as d}from"./element-plus-d03e850c.js";import{A as m}from"./index-2e0ad6f7.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as n,T as u,S as c,a as f,P as _,W as g,X as h,$ as b,c as j,Q as V,a8 as w}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const $={class:"dialog-footer"};const v=p({data:()=>({formLabelWidth:"120px",loading:!1,dialogVisible:!1,form:{confirm_password:"",access_id:[]},access_id:[],roleList:[],formRules:{user_name:[{required:!0,message:" ",trigger:"blur"}],access_id:[{required:!0,message:" ",trigger:"blur"}],password:[{required:!0,message:" ",trigger:"blur"}],confirm_password:[{required:!0,message:" ",trigger:"blur"}],real_name:[{required:!0,message:" ",trigger:"blur"}]}}),props:["open","shop_user_id"],watch:{open:function(e,l){e!=l&&(this.dialogVisible=this.open,this.getData())}},created(){},methods:{getData(){let e=this;m.userEditInfo({shop_user_id:this.shop_user_id}).then((l=>{e.loading=!1,e.roleList=l.data.roleList;let o=l.data.info;o.access_id=l.data.role_arr,o.password="",e.form=o,e.form.role_id=l.data.role_arr})).catch((l=>{e.loading=!1}))},onSubmit(){let l=this;l.loading=!0;let o=l.form;m.userEdit(o,!0).then((o=>{l.loading=!1,e({message:"恭喜你，修改成功",type:"success"}),l.dialogFormVisible(!0)})).catch((e=>{l.loading=!1}))},dialogFormVisible(e){this.form={user_name:"",access_id:[]},e?this.$emit("close",{type:"success",openDialog:!1}):this.$emit("close",{type:"error",openDialog:!1})}}},[["render",function(e,m,p,v,y,q){const k=l,C=o,L=a,U=s,x=r,D=i,W=t,E=d;return n(),u(W,{title:e.$t("修改管理员"),modelValue:y.dialogVisible,"onUpdate:modelValue":m[6]||(m[6]=e=>y.dialogVisible=e),onClose:q.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:c((()=>[f("div",$,[_(D,{onClick:m[5]||(m[5]=e=>y.dialogVisible=!1)},{default:c((()=>[g(h(e.$t("取消")),1)])),_:1}),_(D,{type:"primary",onClick:q.onSubmit,loading:y.loading},{default:c((()=>[g(h(e.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:c((()=>[b((n(),u(x,{size:"small",ref:"form",model:y.form,"label-position":"top",rules:y.formRules,"label-width":y.formLabelWidth},{default:c((()=>[_(C,{label:e.$t("用户名"),prop:"user_name"},{default:c((()=>[_(k,{modelValue:y.form.user_name,"onUpdate:modelValue":m[0]||(m[0]=e=>y.form.user_name=e),placeholder:e.$t("请输入用户名")},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),_(C,{label:e.$t("角色"),prop:"role_id"},{default:c((()=>[_(U,{modelValue:y.form.role_id,"onUpdate:modelValue":m[1]||(m[1]=e=>y.form.role_id=e),multiple:!0},{default:c((()=>[(n(!0),j(V,null,w(y.roleList,(e=>(n(),u(L,{value:e.role_id,key:e.role_id,label:e.role_name_h1},null,8,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label"]),_(C,{label:e.$t("登录密码"),prop:"password"},{default:c((()=>[_(k,{modelValue:y.form.password,"onUpdate:modelValue":m[2]||(m[2]=e=>y.form.password=e),placeholder:e.$t("请输入登录密码"),type:"password"},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),_(C,{label:e.$t("确认密码"),prop:"confirm_password"},{default:c((()=>[_(k,{modelValue:y.form.confirm_password,"onUpdate:modelValue":m[3]||(m[3]=e=>y.form.confirm_password=e),placeholder:e.$t("请输入确认密码"),type:"password"},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),_(C,{label:e.$t("姓名"),prop:"real_name"},{default:c((()=>[_(k,{modelValue:y.form.real_name,"onUpdate:modelValue":m[4]||(m[4]=e=>y.form.real_name=e)},null,8,["modelValue"])])),_:1},8,["label"])])),_:1},8,["model","rules","label-width"])),[[E,y.loading]])])),_:1},8,["title","modelValue","onClose"])}]]);export{v as default};
