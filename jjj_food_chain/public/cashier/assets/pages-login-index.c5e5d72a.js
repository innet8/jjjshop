var e=Object.defineProperty,a=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,t=(a,l,s)=>l in a?e(a,l,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[l]=s,o=(e,a,l)=>new Promise(((s,t)=>{var o=e=>{try{u(l.next(e))}catch(a){t(a)}},i=e=>{try{u(l.throw(e))}catch(a){t(a)}},u=e=>e.done?s(e.value):Promise.resolve(e.value).then(o,i);u((l=l.apply(e,a)).next())}));import{_ as i,u,h as n,l as r,j as d,k as c,m as p,b as v,c as f,w as m,d as _,n as h,t as g,p as y,q as b,s as w,v as x,i as k,x as V,y as C,z as I,A as j,B as O,C as P,D as U,E as F,$ as L,F as $,G as z,H as E,I as R,J as q,K as A,L as B,M as D,r as G,N as H,O as J,P as K,Q as M,R as N}from"./index-1841df56.js";import{_ as Q}from"./ti-select.f002491c.js";const S=""+new URL("bg-93598f2d.png",import.meta.url).href,T=""+new URL("login_logo-83575c4a.svg",import.meta.url).href,W=i({__name:"set-language",setup(e){const{changeLocale:a}=u(),l=n((()=>r[d()])),s=e=>{e&&e!==d()&&a(e)};return(e,a)=>{const t=c(p("uni-icons"),w),o=x,i=k,u=c(p("ti-select"),Q);return v(),f(u,{modelValue:y(d)(),clear:!1,placement:"top",localdata:y(b)()||[],onChange:s},{select:m((()=>[_(i,{class:"ti-language"},{default:m((()=>[_(t,{"custom-prefix":"iconfont",type:"icon-global",size:"16"}),_(o,{class:"ti-language-text"},{default:m((()=>[h(g(y(l)),1)])),_:1}),_(t,{type:"right",size:"16",style:{transform:"rotate(90deg)"}})])),_:1})])),_:1},8,["modelValue","localdata"])}}},[["__scopeId","data-v-44a2c9f4"]]),X=i({__name:"index",setup(e){var i;const u=V(),r=C(!0),d=C(!1),b=C(!1),w=C({user_name:"",password:""}),x=n((()=>!w.value.user_name||!w.value.password)),Q=C(!1),X=C(!(null==(i=I())?void 0:i.api_url)),Y=C({ip:"",port:"",device_id:""});j((()=>X.value),(()=>{X.value&&Z()})),O((()=>{Z(),P({success:e=>{Y.value.device_id=e.deviceId}})}));const Z=()=>{const e=I();Y.value.ip=(null==e?void 0:e.ip)||U()||"127.0.0.1",Y.value.port=(null==e?void 0:e.port)||"8080"},ee=()=>o(this,null,(function*(){var e,o,i,u,n,r,d,c;const p=((e,o)=>{for(var i in o||(o={}))l.call(o,i)&&t(e,i,o[i]);if(a)for(var i of a(o))s.call(o,i)&&t(e,i,o[i]);return e})({},Y.value);if(!p.ip)return F({title:L("请输入地址"),icon:"none"});if(!p.port)return F({title:L("请输入端口"),icon:"none"});try{Q.value=!0;const a=yield $(z(`${null==p?void 0:p.ip}:${p.port}`),{key:Y.value.device_id,address:Y.value.ip,port:Y.value.port});(null==(o=null==(e=a.data)?void 0:e.shop)?void 0:o.app_id)&&(null==(u=null==(i=a.data)?void 0:i.shop)?void 0:u.shop_supplier_id)?(X.value=!1,F({title:L("绑定成功"),icon:"none"}),E(null==(r=null==(n=a.data)?void 0:n.shop)?void 0:r.app_id),R(null==(c=null==(d=a.data)?void 0:d.shop)?void 0:c.shop_supplier_id),q(p),setTimeout((()=>{var e;I()&&A(`${null==(e=I())?void 0:e.api_url}/cashier-mini`)}),100)):F({title:L("绑定失败"),icon:"none"})}catch(v){F({title:L("绑定失败"),icon:"none"})}finally{Q.value=!1}})),ae=()=>o(this,null,(function*(){if(!w.value.user_name)return F({title:L("請輸入賬號"),icon:"none"});if(!w.value.password)return F({title:L("输入登录密码"),icon:"none"});try{b.value=!0;const e=yield B(w.value);e.data.token&&(D(e.data.token),u.setUserInfo(!0),G({url:"/pages/index/index"}))}catch(e){}finally{b.value=!1}})),le=e=>{e&&(1==r.value&&(w.value.user_name+=e),1==d.value&&(w.value.password+=e))},se=e=>{r.value="username"===e,d.value="password"===e},te=()=>{1==r.value&&(w.value.user_name=""),1==d.value&&(w.value.password="")},oe=()=>{Y.value={ip:"",port:""}},ie=()=>{X.value=!X.value};return(e,a)=>{const l=H,s=k,t=J,o=c(p("ti-button"),K),i=c(p("ti-input"),M),u=c(p("ti-keyboard"),N);return v(),f(s,{class:"ti-login"},{default:m((()=>[_(s,{class:"ti-login-img"},{default:m((()=>[_(l,{src:S,mode:"widthFix"})])),_:1}),_(s,{class:"ti-login-box"},{default:m((()=>[X.value?(v(),f(s,{key:0,class:"ti-serve-box"},{default:m((()=>[_(s,{class:"ti-serve-head"},{default:m((()=>[_(s,{class:"ti-serve-logo"},{default:m((()=>[_(l,{src:T,mode:"widthFix"})])),_:1}),_(s,{class:"ti-serve-title"},{default:m((()=>[h(g(y(L)("收银机")),1)])),_:1})])),_:1}),_(s,{class:"ti-serve-label"},{default:m((()=>[h(g(y(L)("服務器連接地址")),1)])),_:1}),_(s,{class:"ti-serve-input"},{default:m((()=>[_(s,{class:"ti-serve-ip"},{default:m((()=>[_(t,{modelValue:Y.value.ip,"onUpdate:modelValue":a[0]||(a[0]=e=>Y.value.ip=e),type:"text",placeholder:y(L)("请输入地址")},null,8,["modelValue","placeholder"])])),_:1}),_(s,{class:"ti-serve-colon"},{default:m((()=>[h(":")])),_:1}),_(s,{class:"ti-serve-port"},{default:m((()=>[_(t,{modelValue:Y.value.port,"onUpdate:modelValue":a[1]||(a[1]=e=>Y.value.port=e),type:"number",placeholder:y(L)("请输入端口")},null,8,["modelValue","placeholder"])])),_:1})])),_:1}),_(s,{class:"ti-serve-btn"},{default:m((()=>[_(o,{onClick:oe},{default:m((()=>[h(g(y(L)("重置")),1)])),_:1}),_(o,{loading:Q.value,type:"primary",onClick:ee},{default:m((()=>[h(g(y(L)("確定")),1)])),_:1},8,["loading"])])),_:1})])),_:1})):(v(),f(s,{key:1,class:"ti-login-form"},{default:m((()=>[_(s,{class:"ti-form-box"},{default:m((()=>[_(s,{class:"ti-form-head"},{default:m((()=>[_(s,{class:"ti-login-logo"},{default:m((()=>[_(l,{src:T,mode:"widthFix"})])),_:1}),_(s,{class:"ti-login-title"},{default:m((()=>[h(g(y(L)("收银机")),1)])),_:1})])),_:1}),_(s,{class:"ti-form-username"},{default:m((()=>[_(i,{modelValue:w.value.user_name,"onUpdate:modelValue":a[2]||(a[2]=e=>w.value.user_name=e),prefixIcon:"icon-user",placeholder:y(L)("請輸入用戶名"),focus:r.value,onClick:a[3]||(a[3]=e=>se("username"))},null,8,["modelValue","placeholder","focus"])])),_:1}),_(s,{class:"ti-form-password"},{default:m((()=>[_(i,{modelValue:w.value.password,"onUpdate:modelValue":a[4]||(a[4]=e=>w.value.password=e),prefixIcon:"icon-lock",placeholder:y(L)("請輸入登錄密碼"),focus:d.value,password:!0,onClick:a[5]||(a[5]=e=>se("password"))},null,8,["modelValue","placeholder","focus"])])),_:1}),_(s,{class:"ti-form-btn"},{default:m((()=>[_(o,{type:"primary",loading:b.value,disabled:y(x),onClick:ae},{default:m((()=>[h(g(y(L)("登錄")),1)])),_:1},8,["loading","disabled"])])),_:1}),_(s,{class:"ti-form-link",onClick:ie},{default:m((()=>[h(g(y(L)("更换服务器")),1)])),_:1})])),_:1}),_(s,{class:"ti-form-keyboard"},{default:m((()=>[_(u,{isExit:!1,isPrimary:!1,onInput:le,onClear:te})])),_:1})])),_:1}))])),_:1}),_(s,{class:"ti-language-box"},{default:m((()=>[_(W)])),_:1})])),_:1})}}},[["__scopeId","data-v-a476f932"]]);export{X as default};