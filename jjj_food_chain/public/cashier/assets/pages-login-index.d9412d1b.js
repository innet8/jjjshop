import{_ as e,c as a,r as l,a as s,b as t,o,d as u,w as i,e as n,f as d,t as r,u as c,l as p,g as v,h as f,s as _,i as m,j as g,k as h,m as y,n as b,p as w,q as x,v as k,x as V,y as C,$ as I,z as U,A as F,B as j,C as z,D as L,E as $,F as E,G as R,H as q,I as A,J as B,K as D,L as G}from"./index-34a6b045.js";import{_ as H}from"./uni-data-select.aebb28ab.js";const J=""+new URL("bg-93598f2d.png",import.meta.url).href,K=""+new URL("login_logo-83575c4a.svg",import.meta.url).href,P=e({__name:"set-language",setup(e){const h=a((()=>v[f()])),y=e=>{e&&e!==f()&&_(e)};return(e,a)=>{const v=l(t("uni-icons"),s),f=m,_=l(t("uni-data-select"),H),b=g;return o(),u(b,{class:"ti-language"},{default:i((()=>[n(v,{"custom-prefix":"iconfont",type:"icon-global",size:"16"}),n(f,{class:"ti-language-text"},{default:i((()=>[d(r(c(h)),1)])),_:1}),n(v,{type:"right",size:"16",style:{transform:"rotate(90deg)"}}),n(b,{class:"ti-language-select"},{default:i((()=>[n(_,{clear:!1,localdata:c(p)()||[],onChange:y},null,8,["localdata"])])),_:1})])),_:1})}}},[["__scopeId","data-v-6b3feecf"]]),M=e({__name:"index",setup(e){var s;const p=h(),v=y(!0),f=y(!1),_=y(!1),m=y({user_name:"",password:""}),H=a((()=>!m.value.user_name||!m.value.password)),M=y(!1),N=y(!(null==(s=b())?void 0:s.api_url)),O=y({ip:"",port:"",device_id:""});w((()=>N.value),(()=>{N.value&&Q()})),x((()=>{Q(),k({success:e=>{O.value.device_id=e.deviceId}})}));const Q=()=>{const e=b();O.value.ip=(null==e?void 0:e.ip)||V()||"127.0.0.1",O.value.port=(null==e?void 0:e.port)||"8080"},S=async()=>{var e,a,l,s;const t={...O.value};if(!t.ip)return C({title:I("请输入地址"),icon:"none"});if(!t.port)return C({title:I("请输入端口"),icon:"none"});try{M.value=!0;const o=await U(F(`${null==t?void 0:t.ip}:${t.port}`),{key:O.value.device_id,address:O.value.ip,port:O.value.port});N.value=!1,C({title:I("绑定成功"),icon:"none"}),j(null==(a=null==(e=o.data)?void 0:e.shop)?void 0:a.app_id),z(null==(s=null==(l=o.data)?void 0:l.shop)?void 0:s.shop_supplier_id),L(t)}catch(o){C({title:I("绑定失败"),icon:"none"})}finally{M.value=!1}},T=async()=>{if(!m.value.user_name)return C({title:I("請輸入賬號"),icon:"none"});if(!m.value.password)return C({title:I("输入登录密码"),icon:"none"});try{_.value=!0;const e=await $(m.value);e.data.token&&(E(e.data.token),p.setUserInfo(!0),R({url:"/pages/index/index"}))}catch(e){}finally{_.value=!1}},W=e=>{e&&(1==v.value&&(m.value.user_name+=e),1==f.value&&(m.value.password+=e))},X=e=>{v.value="username"===e,f.value="password"===e},Y=()=>{1==v.value&&(m.value.user_name=""),1==f.value&&(m.value.password="")},Z=()=>{O.value={ip:"",port:""}},ee=()=>{N.value=!N.value};return(e,a)=>{const s=q,p=g,h=A,y=l(t("ti-button"),B),b=l(t("ti-input"),D),w=l(t("ti-keyboard"),G);return o(),u(p,{class:"ti-login"},{default:i((()=>[n(p,{class:"ti-login-img"},{default:i((()=>[n(s,{src:J,mode:"widthFix"})])),_:1}),n(p,{class:"ti-login-box"},{default:i((()=>[N.value?(o(),u(p,{key:0,class:"ti-serve-box"},{default:i((()=>[n(p,{class:"ti-serve-head"},{default:i((()=>[n(p,{class:"ti-serve-logo"},{default:i((()=>[n(s,{src:K,mode:"widthFix"})])),_:1}),n(p,{class:"ti-serve-title"},{default:i((()=>[d(r(c(I)("收银机")),1)])),_:1})])),_:1}),n(p,{class:"ti-serve-label"},{default:i((()=>[d(r(c(I)("服務器連接地址")),1)])),_:1}),n(p,{class:"ti-serve-input"},{default:i((()=>[n(p,{class:"ti-serve-ip"},{default:i((()=>[n(h,{modelValue:O.value.ip,"onUpdate:modelValue":a[0]||(a[0]=e=>O.value.ip=e),type:"text",placeholder:c(I)("请输入地址")},null,8,["modelValue","placeholder"])])),_:1}),n(p,{class:"ti-serve-colon"},{default:i((()=>[d(":")])),_:1}),n(p,{class:"ti-serve-port"},{default:i((()=>[n(h,{modelValue:O.value.port,"onUpdate:modelValue":a[1]||(a[1]=e=>O.value.port=e),type:"number",placeholder:c(I)("请输入端口")},null,8,["modelValue","placeholder"])])),_:1})])),_:1}),n(p,{class:"ti-serve-btn"},{default:i((()=>[n(y,{onClick:Z},{default:i((()=>[d(r(c(I)("重置")),1)])),_:1}),n(y,{loading:M.value,type:"primary",onClick:S},{default:i((()=>[d(r(c(I)("確定")),1)])),_:1},8,["loading"])])),_:1})])),_:1})):(o(),u(p,{key:1,class:"ti-login-form"},{default:i((()=>[n(p,{class:"ti-form-box"},{default:i((()=>[n(p,{class:"ti-form-head"},{default:i((()=>[n(p,{class:"ti-login-logo"},{default:i((()=>[n(s,{src:K,mode:"widthFix"})])),_:1}),n(p,{class:"ti-login-title"},{default:i((()=>[d(r(c(I)("收银机")),1)])),_:1})])),_:1}),n(p,{class:"ti-form-username"},{default:i((()=>[n(b,{modelValue:m.value.user_name,"onUpdate:modelValue":a[2]||(a[2]=e=>m.value.user_name=e),prefixIcon:"icon-user",placeholder:c(I)("請輸入用戶名"),focus:v.value,onClick:a[3]||(a[3]=e=>X("username"))},null,8,["modelValue","placeholder","focus"])])),_:1}),n(p,{class:"ti-form-password"},{default:i((()=>[n(b,{modelValue:m.value.password,"onUpdate:modelValue":a[4]||(a[4]=e=>m.value.password=e),prefixIcon:"icon-lock",placeholder:c(I)("請輸入登錄密碼"),focus:f.value,password:!0,onClick:a[5]||(a[5]=e=>X("password"))},null,8,["modelValue","placeholder","focus"])])),_:1}),n(p,{class:"ti-form-btn"},{default:i((()=>[n(y,{type:"primary",loading:_.value,disabled:c(H),onClick:T},{default:i((()=>[d(r(c(I)("登錄")),1)])),_:1},8,["loading","disabled"])])),_:1}),n(p,{class:"ti-form-link",onClick:ee},{default:i((()=>[d(r(c(I)("更换服务器")),1)])),_:1})])),_:1}),n(p,{class:"ti-form-keyboard"},{default:i((()=>[n(w,{isExit:!1,isPrimary:!1,onInput:W,onClear:Y})])),_:1})])),_:1}))])),_:1}),n(p,{class:"ti-language-box"},{default:i((()=>[n(P)])),_:1})])),_:1})}}},[["__scopeId","data-v-bfcbded1"]]);export{M as default};
