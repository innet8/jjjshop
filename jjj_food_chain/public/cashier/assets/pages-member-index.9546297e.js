import{_ as e,r as t,a,b as s,c as l,e as o,o as u,f as m,g as n,h as i,i as d,t as r,u as c,ab as p,k as _,U as f,V as h,W as b}from"./index-3bbd2984.js";const w=e({__name:"dialog-add-member",props:{show:{type:Boolean,default:!1}},emits:["update:show"],setup(e,{emit:f}){const h=e;var b=t(""),w=t("");const V=()=>{},v=()=>{f("update:show",!1)};return(e,t)=>{const f=_,U=a(l("ti-input"),s),g=a(l("ti-modal"),o);return u(),m(g,{show:h.show,title:e.$t("添加会员"),onConfirm:V,onCancel:v},{content:n((()=>[i(f,{class:"ti-dialog-content"},{default:n((()=>[i(f,{class:"ti-member-item"},{default:n((()=>[i(f,{class:"ti-member-item-title"},{default:n((()=>[d(r(e.$t("昵称")),1)])),_:1}),i(U,{class:"ti-member-input",modelValue:c(b),"onUpdate:modelValue":t[0]||(t[0]=e=>p(b)?b.value=e:b=e)},null,8,["modelValue"])])),_:1}),i(f,{class:"ti-member-item"},{default:n((()=>[i(f,{class:"ti-member-item-title"},{default:n((()=>[d(r(e.$t("手机号")),1)])),_:1}),i(U,{class:"ti-member-input",modelValue:c(w),"onUpdate:modelValue":t[1]||(t[1]=e=>p(w)?w.value=e:w=e)},null,8,["modelValue"])])),_:1})])),_:1})])),_:1},8,["show","title"])}}},[["__scopeId","data-v-22cdf821"]]),V={__name:"index",setup(e){var a=t(!0);return f((()=>{h()})),(e,t)=>{const s=b("ti-layout");return u(),m(s,null,{default:n((()=>[i(w,{show:c(a),"onUpdate:show":t[0]||(t[0]=e=>p(a)?a.value=e:a=e)},null,8,["show"])])),_:1})}}};export{V as default};