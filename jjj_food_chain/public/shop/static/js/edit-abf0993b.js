import{E as e,g as o,h as s,D as i,e as t,i as a,w as l}from"./element-plus-b01b3a31.js";import{P as r}from"./product-bfd4e84c.js";import{_ as m}from"./Upload-a45cc344.js";import{l as p}from"./index-fed3ed55.js";import{_ as d}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as n,T as u,S as c,a as f,P as g,W as j,X as h,c as _,Q as b,a8 as v}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-9ae0c9ba.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const y=JSON.stringify(p().languageData),V=p().languageList,$={class:"dialog-footer"};const k=d({components:{Upload:m},data(){const e={};for(let o in JSON.parse(y))e[o]=[{required:!0,message:$t("请输入规格名称"),trigger:"blur"}];return{languageList:V,form:{spec_id:"",spec_name:JSON.parse(y),sort:null,spec_value:[]},formRules:{spec_name:e,sort:[{required:!0,message:$t("排序不能为空")},{type:"number",message:$t("排序必须为数字")}]},formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1}},props:["open_edit","editform"],created(){this.dialogVisible=this.open_edit,this.form.spec_id=this.editform.spec_id,this.form.spec_name=JSON.parse(this.editform.spec_name),this.form.sort=this.editform.sort},methods:{addvalue(){this.form.spec_value.push("")},deleteattr(e){this.form.spec_value.splice(e,1)},submit(){let o=this,s=JSON.parse(JSON.stringify(o.form));s.spec_name=JSON.stringify(s.spec_name),o.$refs.form.validate((i=>{i&&(o.loading=!0,r.editSpec(s).then((s=>{o.loading=!1,e({message:"修改成功",type:"success"}),o.dialogFormVisible(!0)})).catch((e=>{o.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(e,r,m,p,d,y){const V=o,k=s,S=i,x=t,C=a,J=l;return n(),u(J,{title:"编辑规格",modelValue:d.dialogVisible,"onUpdate:modelValue":r[1]||(r[1]=e=>d.dialogVisible=e),onClose:y.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:c((()=>[f("div",$,[g(C,{onClick:y.dialogFormVisible},{default:c((()=>[j(h(e.$t("取消")),1)])),_:1},8,["onClick"]),g(C,{type:"primary",onClick:y.submit,loading:d.loading},{default:c((()=>[j(h(e.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:c((()=>[g(x,{size:"small",model:d.form,"label-position":"top",rules:d.formRules,ref:"form"},{default:c((()=>[(n(!0),_(b,null,v(d.languageList,((o,s)=>(n(),u(k,{key:s,label:e.$t("规格名称")+`(${o.label})`,prop:`spec_name.${o.key}`},{default:c((()=>[g(V,{modelValue:d.form.spec_name[o.key],"onUpdate:modelValue":e=>d.form.spec_name[o.key]=e,placeholder:e.$t("请输入规格名称"),maxlength:50,autocomplete:"off"},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","prop"])))),128)),g(k,{label:"排序",prop:"sort"},{default:c((()=>[g(S,{controls:!1,min:0,max:999,placeholder:e.$t("请输入排序"),modelValue:d.form.sort,"onUpdate:modelValue":r[0]||(r[0]=e=>d.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["placeholder","modelValue"])])),_:1})])),_:1},8,["model","rules"])])),_:1},8,["modelValue","onClose"])}],["__scopeId","data-v-15a4c016"]]);export{k as default};
