import{E as e,g as o,h as i,e as r,i as s,w as l}from"./element-plus-b01b3a31.js";import{O as a}from"./order-732b81a8.js";import{d as t}from"./vuedraggable-e6f803aa.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as d,c as p,P as n,S as u,a as c,W as j}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-98f906e9.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./vue-93bf25b5.js";import"./sortablejs-45d6ab95.js";const f={class:"dialog-footer"};const g=m({components:{draggable:t},data:()=>({loading:!1,formLabelWidth:"120px",dialogVisible:!1,form:{order_id:"",cancel_remark:"",order_no:""}}),props:["open_edit","order_no","order_id"],created(){this.dialogVisible=this.open_edit,this.form.order_no=this.order_no,this.form.order_id=this.order_id},methods:{submit(){let o=this,i=o.form;o.$refs.form.validate((r=>{r&&(o.loading=!0,a.storeConfirm(i,!0).then((i=>{o.loading=!1,e({message:i.msg,type:"success"}),o.dialogFormVisible(!0)})).catch((e=>{o.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(e,a,t,m,g,h){const b=o,_=i,V=r,v=s,y=l;return d(),p("div",null,[n(y,{title:"取消订单",modelValue:g.dialogVisible,"onUpdate:modelValue":a[2]||(a[2]=e=>g.dialogVisible=e),onClose:h.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:u((()=>[c("div",f,[n(v,{onClick:h.dialogFormVisible},{default:u((()=>[j("取 消")])),_:1},8,["onClick"]),n(v,{type:"primary",onClick:h.submit,loading:g.loading},{default:u((()=>[j("确 定")])),_:1},8,["onClick","loading"])])])),default:u((()=>[n(V,{size:"small",ref:"form",model:g.form,"label-position":"top"},{default:u((()=>[n(_,{label:"订单号","label-width":g.formLabelWidth,prop:"order_no",rules:[{required:!0,message:" "}]},{default:u((()=>[n(b,{modelValue:g.form.order_no,"onUpdate:modelValue":a[0]||(a[0]=e=>g.form.order_no=e),placeholder:"请输入订单号",class:"max-w460",readonly:!0},null,8,["modelValue"])])),_:1},8,["label-width"]),n(_,{label:"备注","label-width":g.formLabelWidth,prop:"cancel_remark",rules:[{required:!0,message:" "}]},{default:u((()=>[n(b,{type:"textarea",modelValue:g.form.cancel_remark,"onUpdate:modelValue":a[1]||(a[1]=e=>g.form.cancel_remark=e),placeholder:"请输入备注"},null,8,["modelValue"])])),_:1},8,["label-width"])])),_:1},8,["model"])])),_:1},8,["modelValue","onClose"])])}]]);export{g as default};
