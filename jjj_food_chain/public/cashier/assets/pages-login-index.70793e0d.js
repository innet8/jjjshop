import{_ as a,H as e,a as s,M as l,c as t,o,f as u,g as n,h as r,i as d,t as i,u as c,W as f,X as m,Y as p,Z as _,B as g,j as v,a0 as w,r as x,a1 as b,a2 as h,a3 as y,O as k,b as I,k as V,d as C}from"./index-9db2c3d1.js";import{_ as U}from"./uni-data-select.55cf37c1.js";const $=""+new URL("bg-93598f2d.png",import.meta.url).href,j=""+new URL("login_logo-83575c4a.svg",import.meta.url).href,z=a({__name:"set-language",setup(a){const w=e((()=>m[p()])),x=a=>{a&&a!==p()&&_(a)};return(a,e)=>{const m=s(t("uni-icons"),l),p=g,_=s(t("uni-data-select"),U),b=v;return o(),u(b,{class:"ti-language"},{default:n((()=>[r(m,{"custom-prefix":"iconfont",type:"icon-global",size:"16"}),r(p,{class:"ti-language-text"},{default:n((()=>[d(i(c(w)),1)])),_:1}),r(m,{type:"right",size:"16",style:{transform:"rotate(90deg)"}}),r(b,{class:"ti-language-select"},{default:n((()=>[r(_,{clear:!1,localdata:c(f)()||[],onChange:x},null,8,["localdata"])])),_:1})])),_:1})}}},[["__scopeId","data-v-6b3feecf"]]),F=a({__name:"index",setup(a){const l=w(),f=x(!0),m=x(!1),p=x(!1),_=x({user_name:"",password:""}),g=e((()=>!_.value.user_name||!_.value.password)),U=async()=>{try{p.value=!0;const a=await b(_.value);a.data.token&&(h(a.data.token),l.setUserInfo(!0),y({url:"/pages/index/index"}))}catch(a){}finally{p.value=!1}},F=a=>{a&&(1==f.value&&(_.value.user_name+=a),1==m.value&&(_.value.password+=a))},L=a=>{f.value="username"===a,m.value="password"===a},R=()=>{1==f.value&&(_.value.user_name=""),1==m.value&&(_.value.password="")};return(a,e)=>{const l=k,w=v,x=s(t("ti-input"),I),b=s(t("ti-button"),V),h=s(t("ti-keyboard"),C);return o(),u(w,{class:"ti-login"},{default:n((()=>[r(w,{class:"ti-login-img"},{default:n((()=>[r(l,{src:$,mode:"widthFix"})])),_:1}),r(w,{class:"ti-login-form"},{default:n((()=>[r(w,{class:"ti-form-box"},{default:n((()=>[r(w,{class:"ti-form-head"},{default:n((()=>[r(w,{class:"ti-login-logo"},{default:n((()=>[r(l,{src:j,mode:"widthFix"})])),_:1}),r(w,{class:"ti-login-title"},{default:n((()=>[d(i(a.$t("收银机")),1)])),_:1})])),_:1}),r(w,{class:"ti-form-username"},{default:n((()=>[r(x,{modelValue:_.value.user_name,"onUpdate:modelValue":e[0]||(e[0]=a=>_.value.user_name=a),prefixIcon:"icon-user",placeholder:a.$t("請輸入用戶名"),focus:f.value,onClick:e[1]||(e[1]=a=>L("username"))},null,8,["modelValue","placeholder","focus"])])),_:1}),r(w,{class:"ti-form-password"},{default:n((()=>[r(x,{modelValue:_.value.password,"onUpdate:modelValue":e[2]||(e[2]=a=>_.value.password=a),prefixIcon:"icon-lock",placeholder:a.$t("請輸入登錄密碼"),focus:m.value,password:!0,onClick:e[3]||(e[3]=a=>L("password"))},null,8,["modelValue","placeholder","focus"])])),_:1}),r(w,{class:"ti-form-btn"},{default:n((()=>[r(b,{type:"primary",loading:p.value,disabled:c(g),onClick:U},{default:n((()=>[d(i(a.$t("登錄")),1)])),_:1},8,["loading","disabled"])])),_:1})])),_:1}),r(w,{class:"ti-form-keyboard"},{default:n((()=>[r(h,{isExit:!1,isPrimary:!1,onInput:F,onClear:R})])),_:1})])),_:1}),r(w,{class:"ti-language-box"},{default:n((()=>[r(z)])),_:1})])),_:1})}}},[["__scopeId","data-v-db54a1a7"]]);export{F as default};
