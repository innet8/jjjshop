import{p as e,h as t,r as i,s as o,g as a,i as r,e as s}from"./element-plus-33e0d8cc.js";import{Q as l}from"./queue-e0ad35be.js";import{U as n}from"./UE-a81edceb.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as p,o as d,c as u,P as c,S as f,a as j,W as _,T as h,Q as g,a8 as b,Y as x,bb as v,b9 as V}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-188a77f0.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./Upload-66ad4daf.js";import"./file-5ed95284.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const y={components:{Uediter:n},data:()=>({ueditor:{text:"",config:{initialFrameWidth:400,initialFrameHeight:300}},form:{setting_id:"0",is_print:0,printer_id:0,content:"",notice:"",explain:""},checked:!1,printerList:[],loading:!0}),created(){this.getData()},methods:{contentChangeFunc(e){this.ueditor.text=e,this.content=e},getData(){let e=this;l.getsetting({},!0).then((t=>{let i=t.data.detail;e.form.setting_id=i.setting_id,e.form.is_print=i.is_print,e.form.printer_id=i.printer_id,e.form.notice=i.notice,e.form.explain=i.explain,e.ueditor.text=i.content,e.printerList=i.printerList,e.loading=!1})).catch((e=>{}))},onSubmit(){this.form.content=this.ueditor.text;let e=this.form;l.editsetting(e,!0).then((e=>{this.$ElMessage({message:"恭喜你，设置成功",type:"success"})})).catch((e=>{}))},handleCheckedCitiesChange(e){let t=this;e?t.form.order_status[0]=20:t.form.order_status=[]}}},C={class:"product-add"},U=(e=>(v("data-v-f8eeb71c"),e=e(),V(),e))((()=>j("div",{class:"common-form"},"取号设置",-1))),w={class:"edit_container"},k={class:"common-button-wrapper"};const q=m(y,[["render",function(l,n,m,v,V,y){const q=e,F=t,L=i,z=o,S=a,D=p("Uediter"),E=r,Q=s;return d(),u("div",C,[c(Q,{size:"small",ref:"form",model:V.form,"label-position":"top","label-width":"200px"},{default:f((()=>[U,c(F,{label:"是否开启打印"},{default:f((()=>[j("div",null,[c(q,{modelValue:V.form.is_print,"onUpdate:modelValue":n[0]||(n[0]=e=>V.form.is_print=e),label:1},{default:f((()=>[_("开启")])),_:1},8,["modelValue"]),c(q,{modelValue:V.form.is_print,"onUpdate:modelValue":n[1]||(n[1]=e=>V.form.is_print=e),label:0},{default:f((()=>[_("关闭")])),_:1},8,["modelValue"])])])),_:1}),1==V.form.is_print?(d(),h(F,{key:0,label:"选择打印机"},{default:f((()=>[c(z,{modelValue:V.form.printer_id,"onUpdate:modelValue":n[2]||(n[2]=e=>V.form.printer_id=e),placeholder:"请选择"},{default:f((()=>[(d(!0),u(g,null,b(V.printerList,((e,t)=>(d(),h(L,{key:t,label:e.printer_name,value:e.printer_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})):x("",!0),c(F,{label:"须知：",prop:"notice",rules:[{required:!0,message:"请输入须知"}]},{default:f((()=>[c(S,{type:"textarea",rows:"4",modelValue:V.form.notice,"onUpdate:modelValue":n[3]||(n[3]=e=>V.form.notice=e),class:"max-w460"},null,8,["modelValue"])])),_:1}),c(F,{label:"商家说明：",prop:"explain",rules:[{required:!0,message:"请输入商家说明"}]},{default:f((()=>[c(S,{type:"textarea",rows:"4",modelValue:V.form.explain,"onUpdate:modelValue":n[4]||(n[4]=e=>V.form.explain=e),class:"max-w460"},null,8,["modelValue"])])),_:1}),c(F,{label:"取号规则"},{default:f((()=>[j("div",w,[V.loading?x("",!0):(d(),h(D,{key:0,modelValue:V.form.content,"onUpdate:modelValue":n[5]||(n[5]=e=>V.form.content=e),onContentChange:y.contentChangeFunc,text:V.ueditor.text,config:V.ueditor.config,ref:"ue"},null,8,["modelValue","onContentChange","text","config"]))])])),_:1}),j("div",k,[c(E,{type:"primary",onClick:y.onSubmit,loading:V.loading},{default:f((()=>[_("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}],["__scopeId","data-v-f8eeb71c"]]);export{q as default};