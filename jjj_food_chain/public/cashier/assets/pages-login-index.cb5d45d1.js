import{_ as a,u as e,c as l,r as s,a as t,b as o,o as u,d as i,w as n,e as d,f as r,t as c,g as p,l as v,h as f,i as _,j as m,k as g,m as h,n as y,p as x,q as b,s as w,v as k,x as V,y as C,$ as I,z as U,A as F,B as j,C as z,D as $,E,F as L,G as q,H as A,I as B,J as D,K as G,L as H}from"./index-4eae32fb.js";import{_ as J}from"./uni-data-select.ab213ddd.js";const K="/assets/login_logo-83575c4a.svg",P=a({__name:"set-language",setup(a){const{changeLocale:h}=e(),y=l((()=>f[_()])),x=a=>{a&&a!==_()&&h(a)};return(a,e)=>{const l=s(o("uni-icons"),t),f=m,_=s(o("uni-data-select"),J),h=g;return u(),i(h,{class:"ti-language"},{default:n((()=>[d(l,{"custom-prefix":"iconfont",type:"icon-global",size:"16"}),d(f,{class:"ti-language-text"},{default:n((()=>[r(c(p(y)),1)])),_:1}),d(l,{type:"right",size:"16",style:{transform:"rotate(90deg)"}}),d(h,{class:"ti-language-select"},{default:n((()=>[d(_,{clear:!1,localdata:p(v)()||[],onChange:x},null,8,["localdata"])])),_:1})])),_:1})}}},[["__scopeId","data-v-7a155b65"]]),M=a({__name:"index",setup(a){var e;const t=h(),v=y(!0),f=y(!1),_=y(!1),m=y({user_name:"",password:""}),J=l((()=>!m.value.user_name||!m.value.password)),M=y(!1),N=y(!(null==(e=x())?void 0:e.api_url)),O=y({ip:"",port:"",device_id:""});b((()=>N.value),(()=>{N.value&&Q()})),w((()=>{Q(),k({success:a=>{O.value.device_id=a.deviceId}})}));const Q=()=>{const a=x();O.value.ip=(null==a?void 0:a.ip)||V()||"127.0.0.1",O.value.port=(null==a?void 0:a.port)||"8080"},R=async()=>{var a,e,l,s,t,o,u,i;const n={...O.value};if(!n.ip)return C({title:I("请输入地址"),icon:"none"});if(!n.port)return C({title:I("请输入端口"),icon:"none"});try{M.value=!0;const d=await U(F(`${null==n?void 0:n.ip}:${n.port}`),{key:O.value.device_id,address:O.value.ip,port:O.value.port});(null==(e=null==(a=d.data)?void 0:a.shop)?void 0:e.app_id)&&(null==(s=null==(l=d.data)?void 0:l.shop)?void 0:s.shop_supplier_id)?(N.value=!1,C({title:I("绑定成功"),icon:"none"}),j(null==(o=null==(t=d.data)?void 0:t.shop)?void 0:o.app_id),z(null==(i=null==(u=d.data)?void 0:u.shop)?void 0:i.shop_supplier_id),$(n)):C({title:I("绑定失败"),icon:"none"})}catch(d){C({title:I("绑定失败"),icon:"none"})}finally{M.value=!1}},S=async()=>{if(!m.value.user_name)return C({title:I("請輸入賬號"),icon:"none"});if(!m.value.password)return C({title:I("输入登录密码"),icon:"none"});try{_.value=!0;const a=await E(m.value);a.data.token&&(L(a.data.token),t.setUserInfo(!0),q({url:"/pages/index/index"}))}catch(a){}finally{_.value=!1}},T=a=>{a&&(1==v.value&&(m.value.user_name+=a),1==f.value&&(m.value.password+=a))},W=a=>{v.value="username"===a,f.value="password"===a},X=()=>{1==v.value&&(m.value.user_name=""),1==f.value&&(m.value.password="")},Y=()=>{O.value={ip:"",port:""}},Z=()=>{N.value=!N.value};return(a,e)=>{const l=A,t=g,h=B,y=s(o("ti-button"),D),x=s(o("ti-input"),G),b=s(o("ti-keyboard"),H);return u(),i(t,{class:"ti-login"},{default:n((()=>[d(t,{class:"ti-login-img"},{default:n((()=>[d(l,{src:"/assets/bg-93598f2d.png",mode:"widthFix"})])),_:1}),d(t,{class:"ti-login-box"},{default:n((()=>[N.value?(u(),i(t,{key:0,class:"ti-serve-box"},{default:n((()=>[d(t,{class:"ti-serve-head"},{default:n((()=>[d(t,{class:"ti-serve-logo"},{default:n((()=>[d(l,{src:K,mode:"widthFix"})])),_:1}),d(t,{class:"ti-serve-title"},{default:n((()=>[r(c(p(I)("收银机")),1)])),_:1})])),_:1}),d(t,{class:"ti-serve-label"},{default:n((()=>[r(c(p(I)("服務器連接地址")),1)])),_:1}),d(t,{class:"ti-serve-input"},{default:n((()=>[d(t,{class:"ti-serve-ip"},{default:n((()=>[d(h,{modelValue:O.value.ip,"onUpdate:modelValue":e[0]||(e[0]=a=>O.value.ip=a),type:"text",placeholder:p(I)("请输入地址")},null,8,["modelValue","placeholder"])])),_:1}),d(t,{class:"ti-serve-colon"},{default:n((()=>[r(":")])),_:1}),d(t,{class:"ti-serve-port"},{default:n((()=>[d(h,{modelValue:O.value.port,"onUpdate:modelValue":e[1]||(e[1]=a=>O.value.port=a),type:"number",placeholder:p(I)("请输入端口")},null,8,["modelValue","placeholder"])])),_:1})])),_:1}),d(t,{class:"ti-serve-btn"},{default:n((()=>[d(y,{onClick:Y},{default:n((()=>[r(c(p(I)("重置")),1)])),_:1}),d(y,{loading:M.value,type:"primary",onClick:R},{default:n((()=>[r(c(p(I)("確定")),1)])),_:1},8,["loading"])])),_:1})])),_:1})):(u(),i(t,{key:1,class:"ti-login-form"},{default:n((()=>[d(t,{class:"ti-form-box"},{default:n((()=>[d(t,{class:"ti-form-head"},{default:n((()=>[d(t,{class:"ti-login-logo"},{default:n((()=>[d(l,{src:K,mode:"widthFix"})])),_:1}),d(t,{class:"ti-login-title"},{default:n((()=>[r(c(p(I)("收银机")),1)])),_:1})])),_:1}),d(t,{class:"ti-form-username"},{default:n((()=>[d(x,{modelValue:m.value.user_name,"onUpdate:modelValue":e[2]||(e[2]=a=>m.value.user_name=a),prefixIcon:"icon-user",placeholder:p(I)("請輸入用戶名"),focus:v.value,onClick:e[3]||(e[3]=a=>W("username"))},null,8,["modelValue","placeholder","focus"])])),_:1}),d(t,{class:"ti-form-password"},{default:n((()=>[d(x,{modelValue:m.value.password,"onUpdate:modelValue":e[4]||(e[4]=a=>m.value.password=a),prefixIcon:"icon-lock",placeholder:p(I)("請輸入登錄密碼"),focus:f.value,password:!0,onClick:e[5]||(e[5]=a=>W("password"))},null,8,["modelValue","placeholder","focus"])])),_:1}),d(t,{class:"ti-form-btn"},{default:n((()=>[d(y,{type:"primary",loading:_.value,disabled:p(J),onClick:S},{default:n((()=>[r(c(p(I)("登錄")),1)])),_:1},8,["loading","disabled"])])),_:1}),d(t,{class:"ti-form-link",onClick:Z},{default:n((()=>[r(c(p(I)("更换服务器")),1)])),_:1})])),_:1}),d(t,{class:"ti-form-keyboard"},{default:n((()=>[d(b,{isExit:!1,isPrimary:!1,onInput:T,onClear:X})])),_:1})])),_:1}))])),_:1}),d(t,{class:"ti-language-box"},{default:n((()=>[d(P)])),_:1})])),_:1})}}},[["__scopeId","data-v-f8d85a51"]]);export{M as default};
