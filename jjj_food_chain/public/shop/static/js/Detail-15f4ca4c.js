import{d as e,b as l,e as t,o as i}from"./element-plus-7d357588.js";import{_ as o}from"./index-f792122d.js";import{o as a,T as s,S as d,a as m,P as r,W as b,X as n}from"./@vue-48c55b54.js";import"./@vueuse-c556fb5a.js";import"./lodash-es-c1acaa3d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-e0f4a3e8.js";import"./dayjs-9faf8871.js";import"./call-bind-0c463fe3.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-b8ff3004.js";import"./pinia-73166104.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-942d6868.js";import"./side-channel-ba7aab8a.js";import"./object-inspect-860361a9.js";import"./vue-ueditor-wrap-cd29f9a1.js";const p={class:"item-content-box"},c={class:"item-content-box"},f={class:"item-content-box"},h={class:"item-content-box"},u={class:"item-content-box"},j={class:"item-content-box"},w={class:"item-content-box"},_={class:"item-content-box"},v={class:"item-content-box"},x={class:"dialog-footer"};const g=o({data:()=>({formLabelWidth:"140px",dialogVisible:!1}),props:["open","form"],created(){},watch:{open:function(e,l){e!=l&&e&&(this.dialogVisible=this.open)}},methods:{dialogFormVisible(e){this.$emit("close",{})}}},[["render",function(o,g,W,L,V,y){const z=e,C=l,k=t,q=i;return a(),s(q,{title:"详情",modelValue:V.dialogVisible,"onUpdate:modelValue":g[1]||(g[1]=e=>V.dialogVisible=e),onClose:y.dialogFormVisible,"close-on-press-escape":!1},{footer:d((()=>[m("div",x,[r(k,{size:"small",onClick:g[0]||(g[0]=e=>V.dialogVisible=!1)},{default:d((()=>[b("关闭")])),_:1})])])),default:d((()=>[r(C,{size:"mini",model:W.form},{default:d((()=>[r(z,{label:"标题：","label-width":V.formLabelWidth},{default:d((()=>[m("div",p,n(W.form.title),1)])),_:1},8,["label-width"]),r(z,{label:"id：","label-width":V.formLabelWidth},{default:d((()=>[m("div",c,n(W.form.opt_log_id),1)])),_:1},8,["label-width"]),r(z,{label:"用户名：","label-width":V.formLabelWidth},{default:d((()=>[m("div",f,n(W.form.user_name),1)])),_:1},8,["label-width"]),r(z,{label:"真实姓名：","label-width":V.formLabelWidth},{default:d((()=>[m("div",h,n(W.form.real_name),1)])),_:1},8,["label-width"]),r(z,{label:"url：","label-width":V.formLabelWidth},{default:d((()=>[m("div",u,n(W.form.url),1)])),_:1},8,["label-width"]),r(z,{label:"内容：","label-width":V.formLabelWidth},{default:d((()=>[m("div",j,n(W.form.content),1)])),_:1},8,["label-width"]),r(z,{label:"ip：","label-width":V.formLabelWidth},{default:d((()=>[m("div",w,n(W.form.ip),1)])),_:1},8,["label-width"]),r(z,{label:"agent：","label-width":V.formLabelWidth},{default:d((()=>[m("div",_,n(W.form.agent),1)])),_:1},8,["label-width"]),r(z,{label:"添加时间：","label-width":V.formLabelWidth},{default:d((()=>[m("div",v,n(W.form.create_time),1)])),_:1},8,["label-width"])])),_:1},8,["model"])])),_:1},8,["modelValue","onClose"])}],["__scopeId","data-v-b69596b1"]]);export{g as default};
