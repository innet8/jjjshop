var a=Object.defineProperty,e=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable,l=(e,s,t)=>s in e?a(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t;import{_ as o,j as r,Q as n,k as i,l as d,b as u,c,w as f,i as p,d as m,x as v,y as _,z as b,$ as y,A as g,H as w,I as x,r as h,J as j,L as k,M as I,O,N as P,P as V}from"./index-6966df30.js";import{_ as C,a as E,S as F}from"./set-language.24b297b6.js";import"./ti-select.457abdf8.js";const S=o({__name:"index",setup(a){const o=r(),{userInfo:S}=n(o),U=i(!1),z=i({user_name:"",password:""}),A=d((()=>!z.value.password)),H=()=>{return a=this,r=null,n=function*(){var a;const r=((a,o)=>{for(var r in o||(o={}))s.call(o,r)&&l(a,r,o[r]);if(e)for(var r of e(o))t.call(o,r)&&l(a,r,o[r]);return a})({},z.value);if(!r.password)return g({title:y("输入登录密码"),icon:"none"});r.user_name=null==(a=S.value)?void 0:a.account;try{U.value=!0;const a=yield w(r);a.data.token&&(x(a.data.token),o.getUserInfo(!0),h({url:"/pages/index/index"}))}catch(n){}finally{U.value=!1}},new Promise(((e,s)=>{var t=a=>{try{o(n.next(a))}catch(e){s(e)}},l=a=>{try{o(n.throw(a))}catch(e){s(e)}},o=a=>a.done?e(a.value):Promise.resolve(a.value).then(t,l);o((n=n.apply(a,r)).next())}));var a,r,n},J=a=>{z.value.password+=a},L=()=>{z.value.password=""};return(a,e)=>{const s=j,t=p,l=k(I("ti-input"),O),o=k(I("ti-button"),P),r=k(I("ti-keyboard"),V);return u(),c(t,{class:"ti-login"},{default:f((()=>[m(t,{class:"ti-login-img"},{default:f((()=>[m(s,{src:C,mode:"widthFix"})])),_:1}),m(t,{class:"ti-login-box"},{default:f((()=>[m(t,{class:"ti-login-form"},{default:f((()=>[m(t,{class:"ti-form-box"},{default:f((()=>[m(t,{class:"ti-form-head"},{default:f((()=>[m(t,{class:"ti-login-logo"},{default:f((()=>[m(s,{src:E,mode:"widthFix"})])),_:1}),m(t,{class:"ti-login-title"},{default:f((()=>[v(_(b(y)("系统已锁定，请输入登录密码解锁")),1)])),_:1})])),_:1}),m(t,{class:"ti-form-username"},{default:f((()=>{var a;return[v(_(b(y)("当前用户："))+_(null==(a=b(S))?void 0:a.name),1)]})),_:1}),m(t,{class:"ti-form-password"},{default:f((()=>[m(l,{modelValue:z.value.password,"onUpdate:modelValue":e[0]||(e[0]=a=>z.value.password=a),prefixIcon:"icon-lock",placeholder:b(y)("請輸入登錄密碼"),focus:!0,password:!0},null,8,["modelValue","placeholder"])])),_:1}),m(t,{class:"ti-form-btn"},{default:f((()=>[m(o,{type:"primary",loading:U.value,disabled:b(A),onClick:H},{default:f((()=>[v(_(b(y)("确定")),1)])),_:1},8,["loading","disabled"])])),_:1})])),_:1}),m(t,{class:"ti-form-keyboard"},{default:f((()=>[m(r,{isExit:!1,isPrimary:!1,onInput:J,onClear:L})])),_:1})])),_:1})])),_:1}),m(t,{class:"ti-language-box"},{default:f((()=>[m(F)])),_:1})])),_:1})}}},[["__scopeId","data-v-1e15d696"]]);export{S as default};
