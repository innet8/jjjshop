import{_ as a,r as e,u as l,c as s,a as t,b as i,d as o,o as n,e as d,w as u,f as r,g as c,t as p,h as f,i as v,F as m,j as g,l as _,n as h,k,m as x,p as y,q as b,s as C,v as w,x as V,y as U,z as j,A as z,$ as F,B as I,C as L,D as $,E as R,G as q,H as A,I as B,J as D}from"./index-1b0e2fe6.js";import{g as E}from"./index.ab32c0c3.js";const G=""+new URL("bg-93598f2d.png",import.meta.url).href,H=""+new URL("login_logo-83575c4a.svg",import.meta.url).href,J=a({__name:"set-language",setup(a){const U=e(!1),{changeLocale:j}=l(),z=s((()=>y[b()]));return(a,e)=>{const l=t(o("uni-icons"),i),s=C,y=w,F=V;return n(),d(y,{class:"ti-language"},{default:u((()=>[r(l,{"custom-prefix":"iconfont",type:"icon-global",size:"16",onClick:e[0]||(e[0]=()=>{U.value=!U.value})}),r(s,{class:"ti-language-text",onClick:e[1]||(e[1]=()=>{U.value=!U.value})},{default:u((()=>[c(p(f(z)),1)])),_:1}),r(l,{type:"right",size:"16",style:{transform:"rotate(90deg)"},onClick:e[2]||(e[2]=()=>{U.value=!U.value})}),U.value?(n(),d(y,{key:0,class:"ti-language-select"},{default:u((()=>[(n(!0),v(m,null,g(f(_)(),((a,e)=>(n(),d(y,{class:"ti-item-box",key:e},{default:u((()=>[r(y,{class:h(a.disable?"ti-item-content-select":"ti-item-content"),onClick:e=>{var l;(l=a.value)&&l!==b()&&(U.value=!1,j(l))}},{default:u((()=>[r(y,{class:"ti-content-title"},{default:u((()=>[c(p(a.text),1)])),_:2},1024),a.disable?(n(),d(F,{key:0,class:"ti-content-tick",src:k})):x("",!0)])),_:2},1032,["class","onClick"])])),_:2},1024)))),128))])),_:1})):x("",!0)])),_:1})}}},[["__scopeId","data-v-1efaad88"]]),T=a({__name:"index",setup(a){U();const l=e(!1),i=e({address:"",port:8080,key:"admin"});j((()=>{i.value.address=E()}));const v=s((()=>!i.value.address||!i.value.port)),m=async()=>{var a,e,s,t;if(l.value)return;const o={...i.value};if(!o.address)return z({title:F("请输入服務器地址"),icon:"none"});if(!o.port)return z({title:F("请输入端口"),icon:"none"});try{l.value=!0;const n=await I(L(`${null==o?void 0:o.address}:${o.port}`),{key:i.value.key,address:i.value.address,port:i.value.port});$(o),R(null==(e=null==(a=n.data)?void 0:a.shop)?void 0:e.app_id),q(null==(t=null==(s=n.data)?void 0:s.shop)?void 0:t.shop_supplier_id),setTimeout((()=>{A({url:"/pages/index/index"})}),100)}catch(n){z({title:F("绑定失败"),icon:"none"})}finally{l.value=!1}},g=()=>{i.value={ip:"",port:8080}};return(a,e)=>{const s=V,_=w,h=B,k=t(o("ti-button"),D);return n(),d(_,{class:"ti-login"},{default:u((()=>[r(_,{class:"ti-login-img"},{default:u((()=>[r(s,{src:G,mode:"widthFix"})])),_:1}),r(_,{class:"ti-login-form"},{default:u((()=>[r(_,{class:"ti-form-box"},{default:u((()=>[r(_,{class:"ti-form-head"},{default:u((()=>[r(_,{class:"ti-login-logo"},{default:u((()=>[r(s,{src:H,mode:"widthFix"})])),_:1}),r(_,{class:"ti-login-title"},{default:u((()=>[c(p(f(F)("厨显端")),1)])),_:1})])),_:1}),r(_,{class:"ti-form-setting"},{default:u((()=>[r(_,{class:"ti-form-title"},{default:u((()=>[c(p(f(F)("服務器連接地址")),1)])),_:1}),r(_,{class:"ti-form-input"},{default:u((()=>[r(h,{class:"uni-input",modelValue:i.value.address,"onUpdate:modelValue":e[0]||(e[0]=a=>i.value.address=a),placeholder:f(F)("服務器地址")},null,8,["modelValue","placeholder"]),r(_,{class:"uni-point"},{default:u((()=>[c(":")])),_:1}),r(h,{class:"uni-input",modelValue:i.value.port,"onUpdate:modelValue":e[1]||(e[1]=a=>i.value.port=a),placeholder:f(F)("端口")},null,8,["modelValue","placeholder"])])),_:1})])),_:1}),r(_,{class:"ti-form-btn"},{default:u((()=>[r(k,{loading:l.value,onClick:g},{default:u((()=>[c(p(f(F)("重置")),1)])),_:1},8,["loading"]),r(k,{type:"primary",loading:l.value,disabled:f(v),onClick:m},{default:u((()=>[c(p(f(F)("确定")),1)])),_:1},8,["loading","disabled"])])),_:1})])),_:1})])),_:1}),r(_,{class:"ti-language-box"},{default:u((()=>[r(J)])),_:1})])),_:1})}}},[["__scopeId","data-v-3add7db0"]]);export{T as default};
