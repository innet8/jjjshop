import{E as e,g as o,h as s,D as i,e as t,i as l,w as r}from"./element-plus-b01b3a31.js";import{P as a}from"./product-14831bd2.js";import{_ as m}from"./Upload-e4289868.js";import{l as d}from"./index-98f906e9.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as n,T as u,S as f,a as c,P as g,W as j,X as h,c as _,Q as b,a8 as V}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-86ef23f3.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const y=JSON.stringify(d().languageData),v=d().languageList,$={class:"dialog-footer"};const k=p({components:{Upload:m},data:()=>({languageList:v,form:{feed_id:"",feed_name:JSON.parse(y),sort:null,price:"",feed_value:[]},formRules:{price:[{required:!0,message:$t("请输入价格"),trigger:"blur"}],sort:[{required:!0,message:$t("排序不能为空")},{type:"number",message:$t("排序必须为数字")}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}),props:["open_edit","editform"],created(){this.dialogVisible=this.open_edit,this.form.feed_id=this.editform.feed_id,this.form.feed_name=JSON.parse(this.editform.feed_name),this.form.price=this.editform.price,this.form.sort=this.editform.sort},methods:{addvalue(){this.form.feed_value.push("")},deleteattr(e){this.form.feed_value.splice(e,1)},submit(){let o=this,s=JSON.parse(JSON.stringify(o.form));s.feed_name=JSON.stringify(s.feed_name),o.$refs.form.validate((i=>{i&&(o.loading=!0,a.editFeed(s).then((s=>{o.loading=!1,e({message:$t("修改成功"),type:"success"}),o.dialogFormVisible(!0)})).catch((e=>{o.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(e,a,m,d,p,y){const v=o,k=s,x=i,C=t,S=l,U=r;return n(),u(U,{title:e.$t("编辑加料"),modelValue:p.dialogVisible,"onUpdate:modelValue":a[2]||(a[2]=e=>p.dialogVisible=e),onClose:y.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:f((()=>[c("div",$,[g(S,{onClick:y.dialogFormVisible},{default:f((()=>[j(h(e.$t("取消")),1)])),_:1},8,["onClick"]),g(S,{type:"primary",onClick:y.submit,loading:p.loading},{default:f((()=>[j(h(e.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:f((()=>[g(C,{size:"small",model:p.form,"label-position":"top",rules:p.formRules,ref:"form"},{default:f((()=>[(n(!0),_(b,null,V(p.languageList,((o,s)=>(n(),u(k,{key:s,label:e.$t("加料名称")+`(${o.label})`,prop:`feed_name.${[o.key]}`,rules:[{required:!0,message:e.$t("请输入加料名称")}]},{default:f((()=>[g(v,{type:"text",modelValue:p.form.feed_name[o.key],"onUpdate:modelValue":e=>p.form.feed_name[o.key]=e},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1032,["label","prop","rules"])))),128)),g(k,{label:e.$t("加料排序"),prop:"sort"},{default:f((()=>[g(x,{controls:!1,min:0,max:999,placeholder:e.$t("请输入加料排序"),modelValue:p.form.sort,"onUpdate:modelValue":a[0]||(a[0]=e=>p.form.sort=e),modelModifiers:{number:!0}},null,8,["placeholder","modelValue"])])),_:1},8,["label"]),g(k,{label:e.$t("价格"),prop:"price"},{default:f((()=>[g(v,{type:"number",modelValue:p.form.price,"onUpdate:modelValue":a[1]||(a[1]=e=>p.form.price=e)},null,8,["modelValue"])])),_:1},8,["label"])])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue","onClose"])}],["__scopeId","data-v-e4c6a414"]]);export{k as default};
