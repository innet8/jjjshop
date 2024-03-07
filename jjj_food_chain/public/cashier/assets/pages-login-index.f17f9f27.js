var e=Object.defineProperty,a=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,t=(a,l,s)=>l in a?e(a,l,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[l]=s,o=(e,a,l)=>new Promise(((s,t)=>{var o=e=>{try{u(l.next(e))}catch(a){t(a)}},i=e=>{try{u(l.throw(e))}catch(a){t(a)}},u=e=>e.done?s(e.value):Promise.resolve(e.value).then(o,i);u((l=l.apply(e,a)).next())}));import{_ as i,u,h as r,j as n,k as d,l as c,m as p,n as v,p as f,q as m,s as _,t as h,v as y,b,c as g,w,i as x,d as k,x as V,y as j,z as C,$ as I,A as O,B as P,C as U,D as F,E as $,F as E,G as L,H as S,I as q,r as z,J as A,K as B,L as D,M as G,N as H,O as J,P as K}from"./index-f797dd1f.js";import{_ as M,a as N,S as T}from"./set-language.7e03925a.js";import"./ti-select.20af7a51.js";const Q=i({__name:"index",setup(e){const i=u(),Q=r(),R=n(),W=d(!0),X=d(!1),Y=d(!1),Z=d({user_name:"",password:""}),ee=c((()=>!Z.value.user_name||!Z.value.password)),ae=d(!1),le=d(!0),se=d({ip:"",port:"",device_id:""});p((()=>le.value),(()=>{le.value&&te()})),v((()=>{var e;(null==(e=f())?void 0:e.api_url)&&m()&&_()&&(le.value=!1),te(),h({success:e=>{se.value.device_id=e.deviceId}})}));const te=()=>{const e=f();se.value.ip=(null==e?void 0:e.ip)||y()||"127.0.0.1",se.value.port=(null==e?void 0:e.port)||"8080"},oe=()=>o(this,null,(function*(){var e,o,i,u,r,n,d,c;const p=((e,o)=>{for(var i in o||(o={}))l.call(o,i)&&t(e,i,o[i]);if(a)for(var i of a(o))s.call(o,i)&&t(e,i,o[i]);return e})({},se.value);if(!p.ip)return O({title:I("请输入服务器地址"),icon:"none"});if(!p.port)return O({title:I("请输入端口"),icon:"none"});try{ae.value=!0;const a=yield P(U(`${null==p?void 0:p.ip}:${p.port}`),{key:se.value.device_id,address:se.value.ip,port:se.value.port});(null==(o=null==(e=a.data)?void 0:e.shop)?void 0:o.app_id)&&(null==(u=null==(i=a.data)?void 0:i.shop)?void 0:u.shop_supplier_id)?(le.value=!1,O({title:I("绑定成功"),icon:"none"}),F(null==(n=null==(r=a.data)?void 0:r.shop)?void 0:n.app_id),$(null==(c=null==(d=a.data)?void 0:d.shop)?void 0:c.shop_supplier_id),E(p),setTimeout((()=>{var e;f()&&L(`${null==(e=f())?void 0:e.api_url}/cashier-mini`)}),100),Q.getList()):O({title:I("绑定失败"),icon:"none"})}catch(v){O({title:I("绑定失败"),icon:"none"})}finally{ae.value=!1}})),ie=()=>o(this,null,(function*(){if(!Z.value.user_name)return O({title:I("請輸入賬號"),icon:"none"});if(!Z.value.password)return O({title:I("输入登录密码"),icon:"none"});try{Y.value=!0;const e=yield S(Z.value);e.data.token&&(q(e.data.token),R.getUserInfo(!0),i.getList(),z({url:"/pages/index/index"}))}catch(e){}finally{Y.value=!1}})),ue=e=>{e&&(1==W.value&&(Z.value.user_name+=e),1==X.value&&(Z.value.password+=e))},re=e=>{W.value="username"===e,X.value="password"===e},ne=()=>{1==W.value&&(Z.value.user_name=""),1==X.value&&(Z.value.password="")},de=()=>{le.value=!le.value};return(e,a)=>{const l=A,s=x,t=B,o=D(G("ti-button"),H),i=D(G("ti-input"),J),u=D(G("ti-keyboard"),K);return b(),g(s,{class:"ti-login"},{default:w((()=>[k(s,{class:"ti-login-img"},{default:w((()=>[k(l,{src:M,mode:"widthFix"})])),_:1}),k(s,{class:"ti-login-box"},{default:w((()=>[le.value?(b(),g(s,{key:0,class:"ti-serve-box"},{default:w((()=>[k(s,{class:"ti-serve-head"},{default:w((()=>[k(s,{class:"ti-serve-logo"},{default:w((()=>[k(l,{src:N,mode:"widthFix"})])),_:1}),k(s,{class:"ti-serve-title"},{default:w((()=>[V(j(C(I)("收银机")),1)])),_:1})])),_:1}),k(s,{class:"ti-serve-label"},{default:w((()=>[V(j(C(I)("服务器连接地址")),1)])),_:1}),k(s,{class:"ti-serve-input"},{default:w((()=>[k(s,{class:"ti-serve-ip"},{default:w((()=>[k(t,{modelValue:se.value.ip,"onUpdate:modelValue":a[0]||(a[0]=e=>se.value.ip=e),type:"text",placeholder:C(I)("服务器地址")},null,8,["modelValue","placeholder"])])),_:1}),k(s,{class:"ti-serve-colon"},{default:w((()=>[V(":")])),_:1}),k(s,{class:"ti-serve-port"},{default:w((()=>[k(t,{modelValue:se.value.port,"onUpdate:modelValue":a[1]||(a[1]=e=>se.value.port=e),type:"number",placeholder:C(I)("端口")},null,8,["modelValue","placeholder"])])),_:1})])),_:1}),k(s,{class:"ti-serve-btn"},{default:w((()=>[k(o,{onClick:te},{default:w((()=>[V(j(C(I)("重置")),1)])),_:1}),k(o,{loading:ae.value,type:"primary",onClick:oe},{default:w((()=>[V(j(C(I)("確定")),1)])),_:1},8,["loading"])])),_:1})])),_:1})):(b(),g(s,{key:1,class:"ti-login-form"},{default:w((()=>[k(s,{class:"ti-form-box"},{default:w((()=>[k(s,{class:"ti-form-head"},{default:w((()=>[k(s,{class:"ti-login-logo"},{default:w((()=>[k(l,{src:N,mode:"widthFix"})])),_:1}),k(s,{class:"ti-login-title"},{default:w((()=>[V(j(C(I)("收银机")),1)])),_:1})])),_:1}),k(s,{class:"ti-form-username"},{default:w((()=>[k(i,{modelValue:Z.value.user_name,"onUpdate:modelValue":a[2]||(a[2]=e=>Z.value.user_name=e),prefixIcon:"icon-user",placeholder:C(I)("請輸入用戶名"),focus:W.value,onClick:a[3]||(a[3]=e=>re("username"))},null,8,["modelValue","placeholder","focus"])])),_:1}),k(s,{class:"ti-form-password"},{default:w((()=>[k(i,{modelValue:Z.value.password,"onUpdate:modelValue":a[4]||(a[4]=e=>Z.value.password=e),prefixIcon:"icon-lock",placeholder:C(I)("請輸入登錄密碼"),focus:X.value,password:!0,onClick:a[5]||(a[5]=e=>re("password"))},null,8,["modelValue","placeholder","focus"])])),_:1}),k(s,{class:"ti-form-btn"},{default:w((()=>[k(o,{type:"primary",loading:Y.value,disabled:C(ee),onClick:ie},{default:w((()=>[V(j(C(I)("登錄")),1)])),_:1},8,["loading","disabled"])])),_:1}),k(s,{class:"ti-form-link",onClick:de},{default:w((()=>[V(j(C(I)("更换服务器")),1)])),_:1})])),_:1}),k(s,{class:"ti-form-keyboard"},{default:w((()=>[k(u,{isExit:!1,isPrimary:!1,onInput:ue,onClear:ne})])),_:1})])),_:1}))])),_:1}),k(s,{class:"ti-language-box"},{default:w((()=>[k(T)])),_:1})])),_:1})}}},[["__scopeId","data-v-f5d67176"]]);export{Q as default};
