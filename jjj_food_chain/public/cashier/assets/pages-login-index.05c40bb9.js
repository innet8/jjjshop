var e=Object.defineProperty,a=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,t=(a,l,s)=>l in a?e(a,l,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[l]=s,o=(e,a,l)=>new Promise(((s,t)=>{var o=e=>{try{i(l.next(e))}catch(a){t(a)}},u=e=>{try{i(l.throw(e))}catch(a){t(a)}},i=e=>e.done?s(e.value):Promise.resolve(e.value).then(o,u);i((l=l.apply(e,a)).next())}));import{_ as u,u as i,s as n,h as r,j as d,k as c,l as v,m as p,n as f,p as m,b as _,c as g,w as h,d as y,q as b,t as w,v as x,x as k,y as V,z as C,i as I,A as U,B as j,C as O,D as P,E as L,F,G as $,H as z,$ as D,I as E,J as R,K as S,L as T,M as q,N as A,O as B,P as G,Q as H,r as J,R as K,S as M,T as N,U as Q,V as W}from"./index-3fe3cbd6.js";import{_ as X}from"./ti-select.cae471ac.js";const Y=""+new URL("bg-93598f2d.png",import.meta.url).href,Z=""+new URL("login_logo-83575c4a.svg",import.meta.url).href,ee=u({__name:"set-language",setup(e){const a=i(),{languageData:l,languageDefault:s}=n(a),t=r(),o=r();d((()=>{t.value=c()||s.value,o.value=v[t.value]})),p((()=>s.value),(()=>{c()||(t.value=s.value,o.value=v[t.value])}));const u=e=>{t.value!=e&&(t.value=e,o.value=v[e],k(e))};return(e,a)=>{const s=f(m("uni-icons"),V),i=C,n=I,r=f(m("ti-select"),X);return _(),g(r,{modelValue:t.value,clear:!1,placement:"top",localdata:x(l),onChange:u},{select:h((()=>[y(n,{class:"ti-language"},{default:h((()=>[y(s,{"custom-prefix":"iconfont",type:"icon-global",size:"16"}),y(i,{class:"ti-language-text"},{default:h((()=>[b(w(o.value),1)])),_:1}),y(s,{type:"right",size:"16",style:{transform:"rotate(90deg)"}})])),_:1})])),_:1},8,["modelValue","localdata"])}}},[["__scopeId","data-v-4512d752"]]),ae=u({__name:"index",setup(e){const u=U(),n=i(),c=j(),v=r(!0),k=r(!1),V=r(!1),C=r({user_name:"",password:""}),X=O((()=>!C.value.user_name||!C.value.password)),ae=r(!1),le=r(!0),se=r({ip:"",port:"",device_id:""});p((()=>le.value),(()=>{le.value&&te()})),d((()=>{var e;(null==(e=P())?void 0:e.api_url)&&L()&&F()&&(le.value=!1),te(),$({success:e=>{se.value.device_id=e.deviceId}})}));const te=()=>{const e=P();se.value.ip=(null==e?void 0:e.ip)||z()||"127.0.0.1",se.value.port=(null==e?void 0:e.port)||"8080"},oe=()=>o(this,null,(function*(){var e,o,u,i,r,d,c,v;const p=((e,o)=>{for(var u in o||(o={}))l.call(o,u)&&t(e,u,o[u]);if(a)for(var u of a(o))s.call(o,u)&&t(e,u,o[u]);return e})({},se.value);if(!p.ip)return E({title:D("请输入服务器地址"),icon:"none"});if(!p.port)return E({title:D("请输入端口"),icon:"none"});try{ae.value=!0;const a=yield R(S(`${null==p?void 0:p.ip}:${p.port}`),{key:se.value.device_id,address:se.value.ip,port:se.value.port});(null==(o=null==(e=a.data)?void 0:e.shop)?void 0:o.app_id)&&(null==(i=null==(u=a.data)?void 0:u.shop)?void 0:i.shop_supplier_id)?(le.value=!1,E({title:D("绑定成功"),icon:"none"}),T(null==(d=null==(r=a.data)?void 0:r.shop)?void 0:d.app_id),q(null==(v=null==(c=a.data)?void 0:c.shop)?void 0:v.shop_supplier_id),A(p),setTimeout((()=>{var e;P()&&B(`${null==(e=P())?void 0:e.api_url}/cashier-mini`)}),100),n.getList()):E({title:D("绑定失败"),icon:"none"})}catch(f){E({title:D("绑定失败"),icon:"none"})}finally{ae.value=!1}})),ue=()=>o(this,null,(function*(){if(!C.value.user_name)return E({title:D("請輸入賬號"),icon:"none"});if(!C.value.password)return E({title:D("输入登录密码"),icon:"none"});try{V.value=!0;const e=yield G(C.value);e.data.token&&(H(e.data.token),c.getUserInfo(!0),u.getList(),J({url:"/pages/index/index"}))}catch(e){}finally{V.value=!1}})),ie=e=>{e&&(1==v.value&&(C.value.user_name+=e),1==k.value&&(C.value.password+=e))},ne=e=>{v.value="username"===e,k.value="password"===e},re=()=>{1==v.value&&(C.value.user_name=""),1==k.value&&(C.value.password="")},de=()=>{le.value=!le.value};return(e,a)=>{const l=K,s=I,t=M,o=f(m("ti-button"),N),u=f(m("ti-input"),Q),i=f(m("ti-keyboard"),W);return _(),g(s,{class:"ti-login"},{default:h((()=>[y(s,{class:"ti-login-img"},{default:h((()=>[y(l,{src:Y,mode:"widthFix"})])),_:1}),y(s,{class:"ti-login-box"},{default:h((()=>[le.value?(_(),g(s,{key:0,class:"ti-serve-box"},{default:h((()=>[y(s,{class:"ti-serve-head"},{default:h((()=>[y(s,{class:"ti-serve-logo"},{default:h((()=>[y(l,{src:Z,mode:"widthFix"})])),_:1}),y(s,{class:"ti-serve-title"},{default:h((()=>[b(w(x(D)("收银机")),1)])),_:1})])),_:1}),y(s,{class:"ti-serve-label"},{default:h((()=>[b(w(x(D)("服务器连接地址")),1)])),_:1}),y(s,{class:"ti-serve-input"},{default:h((()=>[y(s,{class:"ti-serve-ip"},{default:h((()=>[y(t,{modelValue:se.value.ip,"onUpdate:modelValue":a[0]||(a[0]=e=>se.value.ip=e),type:"text",placeholder:x(D)("服务器地址")},null,8,["modelValue","placeholder"])])),_:1}),y(s,{class:"ti-serve-colon"},{default:h((()=>[b(":")])),_:1}),y(s,{class:"ti-serve-port"},{default:h((()=>[y(t,{modelValue:se.value.port,"onUpdate:modelValue":a[1]||(a[1]=e=>se.value.port=e),type:"number",placeholder:x(D)("端口")},null,8,["modelValue","placeholder"])])),_:1})])),_:1}),y(s,{class:"ti-serve-btn"},{default:h((()=>[y(o,{onClick:te},{default:h((()=>[b(w(x(D)("重置")),1)])),_:1}),y(o,{loading:ae.value,type:"primary",onClick:oe},{default:h((()=>[b(w(x(D)("確定")),1)])),_:1},8,["loading"])])),_:1})])),_:1})):(_(),g(s,{key:1,class:"ti-login-form"},{default:h((()=>[y(s,{class:"ti-form-box"},{default:h((()=>[y(s,{class:"ti-form-head"},{default:h((()=>[y(s,{class:"ti-login-logo"},{default:h((()=>[y(l,{src:Z,mode:"widthFix"})])),_:1}),y(s,{class:"ti-login-title"},{default:h((()=>[b(w(x(D)("收银机")),1)])),_:1})])),_:1}),y(s,{class:"ti-form-username"},{default:h((()=>[y(u,{modelValue:C.value.user_name,"onUpdate:modelValue":a[2]||(a[2]=e=>C.value.user_name=e),prefixIcon:"icon-user",placeholder:x(D)("請輸入用戶名"),focus:v.value,onClick:a[3]||(a[3]=e=>ne("username"))},null,8,["modelValue","placeholder","focus"])])),_:1}),y(s,{class:"ti-form-password"},{default:h((()=>[y(u,{modelValue:C.value.password,"onUpdate:modelValue":a[4]||(a[4]=e=>C.value.password=e),prefixIcon:"icon-lock",placeholder:x(D)("請輸入登錄密碼"),focus:k.value,password:!0,onClick:a[5]||(a[5]=e=>ne("password"))},null,8,["modelValue","placeholder","focus"])])),_:1}),y(s,{class:"ti-form-btn"},{default:h((()=>[y(o,{type:"primary",loading:V.value,disabled:x(X),onClick:ue},{default:h((()=>[b(w(x(D)("登錄")),1)])),_:1},8,["loading","disabled"])])),_:1}),y(s,{class:"ti-form-link",onClick:de},{default:h((()=>[b(w(x(D)("更换服务器")),1)])),_:1})])),_:1}),y(s,{class:"ti-form-keyboard"},{default:h((()=>[y(i,{isExit:!1,isPrimary:!1,onInput:ie,onClear:re})])),_:1})])),_:1}))])),_:1}),y(s,{class:"ti-language-box"},{default:h((()=>[y(ee)])),_:1})])),_:1})}}},[["__scopeId","data-v-927baf6e"]]);export{ae as default};
