import{r as e,o as a,i as l,a as t,b as s,c as i,g as o,u,d as n,e as c,w as r,f as v,h as d,j as _,k as p,l as f,m,F as h,n as b,t as y,$ as w,s as g,p as x,q as T,v as k,x as C,y as F,z as I,A as E,B as j,S as $,C as N,D,E as S}from"./index-e033437d.js";import{D as B,v as q,_ as z,a as A}from"./verify.f0999304.js";import{_ as L,u as M,g as R,a as U,b as G,s as H,c as J,d as K,e as O,f as P,v as Q,h as V,i as W,j as X,k as Y,t as Z,l as ee,m as ae}from"./baseinfo.1bd1930d.js";const le=L({__name:"index",setup(L){M();const le=e(!1),te=e(0),se=e(!0),ie=e(!1),oe=e=>{te.value=e.detail.current,ue(Ue.value,te.value)},ue=(e,a)=>{const l=e[a];"video"==P(l.real_name)?setTimeout((()=>{ce.value=l,ne.value=!0,se.value=!1,ie.value=!0}),50):ie.value=!1},ne=e(!1),ce=e(),re=()=>{ne.value=!1,se.value=!0,te.value==Ue.value.length-1?(te.value=0,ue(Ue.value,te.value)):te.value+=1},ve=()=>{ie.value?(ne.value=!1,se.value=!1):se.value=!1},de=()=>{ie.value?(ne.value=!0,se.value=!0):se.value=!0};e(!1);const _e=()=>{Ae()},pe=()=>{s({url:"/pages/index/index"})},fe=e(),me=e("");e([]);const he=e(),be=e(!1),ye=e({ip:"",port:"",device_id:""}),we=()=>{const e=R();ye.value.ip=(null==e?void 0:e.ip)||U()||"127.0.0.1",ye.value.port=(null==e?void 0:e.port)||"8080"},ge=e=>{ye.value.ip=e},xe=e=>{ye.value.port=e},Te=async()=>{var e;const a={...ye.value};if(a.ip)if(a.port)try{const l=await Q(V(`${null==a?void 0:a.ip}:${a.port}`));W(a),x(l.data.app_id),T(l.data.shop_supplier_id),J(null==(e=l.data)?void 0:e.currency),setTimeout((()=>{be.value=!0}),150)}catch(l){g({title:w("绑定失败"),icon:"none"})}else g({title:w("請輸入連接埠"),icon:"none"});else g({title:w("請輸入伺服器位址"),icon:"none"})},ke=e=>{be.value=!1,e&&(he.value=e,me.value=e.table_no)},Ce=()=>{we(),me.value=d().table_no,he.value=d()},Fe=async()=>{var e;const a={...ye.value};if(a.ip)if(a.port)try{const l=await Q(V(`${null==a?void 0:a.ip}:${a.port}`));if(!he.value)return void g({title:w("請查找桌位"),icon:"none"});W(a),x(l.data.app_id),T(l.data.shop_supplier_id),J(null==(e=l.data)?void 0:e.currency),setTimeout((()=>{Ie()}),150)}catch(l){g({title:w("绑定失败"),icon:"none"})}else g({title:w("請輸入連接埠"),icon:"none"});else g({title:w("請輸入伺服器位址"),icon:"none"})},Ie=async()=>{if(k()===he.value.table_id)return g({title:w("绑定成功"),icon:"none"}),fe.value=!1,void de();try{const e=await X({table_id:he.value.table_id,old_table_id:k()});C(he.value),Ge(),g({title:e.msg,icon:"none"}),fe.value=!1}catch(e){}finally{de()}},Ee=e(),je=async()=>{if(1===Re.value.is_call_service||1===Re.value.is_customer_order)try{const e=await Y({table_id:k()});1===parseInt(e.data.tablet.is_customer_order)?10===e.data.status?Ne():(F(!0),s({url:"/pages/index/opentable-index"})):Ee.value.tiCallClick("1")}catch(e){}},$e=e(!1),Ne=()=>{$e.value=!0,ve()},De=e=>{e?qe(e):g({title:w("請輸入人數"),icon:"none"})},Se=()=>{$e.value=!1,de()},Be=e({table_id:"",meal_num:""}),qe=async e=>{Be.value.table_id=k(),Be.value.meal_num=e;try{await Z(Be.value);F(!0),s({url:"/pages/index/opentable-index"})}catch(a){}},ze=e(!1),Ae=()=>{ze.value=!0,ve()},Le=async e=>{if(e)try{await q({password:e});fe.value=!0,he.value=d(),me.value=he.value.table_no,Me()}catch(a){}else g({title:w("請輸入密碼"),icon:"none"})},Me=()=>{(()=>{ze.value=!1;const e=setTimeout((()=>{fe.value?ve():de(),clearTimeout(e)}),300)})()},Re=e({name:"",logo:"",tableNo:"",is_call_service:1,is_customer_order:1}),Ue=e([]),Ge=async()=>{var e,a,l,t,s,i,o;le.value=!0;try{const u=await G();H(u),Re.value.name=u.data.name,Re.value.logo=u.data.logo,Re.value.tableNo=d().table_no,Re.value.is_call_service=parseInt(null==(a=null==(e=null==u?void 0:u.data)?void 0:e.tablet)?void 0:a.is_call_service),Re.value.is_customer_order=parseInt(null==(t=null==(l=null==u?void 0:u.data)?void 0:l.tablet)?void 0:t.is_customer_order),J(null==(s=u.data)?void 0:s.currency),Ue.value=(null==(o=null==(i=u.data)?void 0:i.tablet)?void 0:o.carousel)||[],Ue.value.length>0&&ue(Ue.value,0),le.value=!1}catch(u){le.value=!1}finally{le.value=!1}};return a((()=>{l()&&t()&&s({url:"/pages/index/opentable-index"})})),i((()=>{l()&&!t()&&Ge()})),we(),o({success:e=>{ye.value.device_id=e.deviceId}}),(e,a)=>{const s=I(E("ti-layout-head"),z),i=_,o=j,d=$,g=N,x=D,T=S,k=I(E("ti-input"),ee),C=I(E("ti-modal"),A),F=I(E("ti-layout-table-list"),ae);return u(l)()&&!u(t)()?(n(),c(i,{key:0,class:"ti-page",onClick:a[1]||(a[1]=e=>u(O)())},{default:r((()=>[p(i,null,{default:r((()=>[le.value?v("",!0):(n(),c(s,{key:0,ref_key:"refCallServer",ref:Ee,onDoubleLogo:_e,onRefresh:pe,is_call_service:Re.value.is_call_service},null,8,["is_call_service"]))])),_:1}),le.value?v("",!0):(n(),c(i,{key:0,class:"ti-page-content"},{default:r((()=>[p(i,{class:"ti-page-left"},{default:r((()=>[ne.value?v("",!0):(n(),c(g,{key:0,onChange:oe,class:"ti-swiper",current:te.value,autoplay:se.value,circular:"",interval:"30000","indicator-dots":!0,"indicator-color":"#FFFFFF80","indicator-active-color":"#FFBE00"},{default:r((()=>[(n(!0),f(h,null,m(Ue.value,((e,a)=>(n(),c(d,{class:"ti-swiper-item",key:a},{default:r((()=>["image"===u(P)(e.real_name)?(n(),c(o,{key:0,class:"ti-swiper-item-image",mode:"scaleToFill",src:e.file_path},null,8,["src"])):v("",!0),"video"===u(P)(e.real_name)?(n(),c(o,{key:1,class:"ti-swiper-item-image",mode:"scaleToFill",src:""})):v("",!0)])),_:2},1024)))),128))])),_:1},8,["current","autoplay"])),ne.value?(n(),c(g,{key:1,class:"ti-swiper"},{default:r((()=>[p(d,{class:"ti-swiper-item"},{default:r((()=>{var e;return[p(x,{onEnded:re,class:"ti-swiper-item-video",controls:!1,"show-fullscreen-btn":!1,autoplay:!0,src:null==(e=ce.value)?void 0:e.file_path},null,8,["src"])]})),_:1})])),_:1})):v("",!0)])),_:1}),p(i,{class:"ti-page-right",onTouchstart:e.handleTouchStart,onTouchmove:e.handleTouchMove,onTouchend:e.handleTouchEnd,controls:""},{default:r((()=>[p(i,{class:"ti-store-box"},{default:r((()=>[p(i,{class:"ti-store-item"},{default:r((()=>[p(o,{class:"ti-store-logo",src:Re.value.logo},null,8,["src"]),p(T,{class:"ti-store-name"},{default:r((()=>[b(y(Re.value.name),1)])),_:1})])),_:1}),p(i,{class:"ti-table-item"},{default:r((()=>[p(i,{class:"ti-table-number"},{default:r((()=>[b(y(u(w)("當前桌號："))+y(Re.value.tableNo),1)])),_:1}),p(i,{class:"ti-table-button",onClick:je},{default:r((()=>[p(T,{class:"ti-table-button-text"},{default:r((()=>[b(y(u(w)("開始點餐")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["onTouchstart","onTouchmove","onTouchend"]),p(B,{show:$e.value,title:"["+Re.value.tableNo+"]"+u(w)("就餐人数"),placeholder:u(w)("請輸入人數"),onExit:Se,onConfirm:De},null,8,["show","title","placeholder"]),p(B,{show:ze.value,title:u(w)("密碼"),password:!0,placeholder:u(w)("請輸入密碼"),onExit:Me,onConfirm:Le},null,8,["show","title","placeholder"])])),_:1})),p(C,{show:fe.value,title:u(w)("設置"),cancelText:u(w)("重置"),confirmText:u(w)("確定"),onCancel:Ce,onConfirm:Fe},{content:r((()=>[p(i,{class:"ti-item-input"},{default:r((()=>[p(i,{class:"ti-label-box"},{default:r((()=>[p(i,{class:"ti-label-left"},{default:r((()=>[p(T,{class:"ti-label-server"},{default:r((()=>[b(y(u(w)("服務器連接地址")),1)])),_:1})])),_:1}),p(i,{class:"ti-label-right",onClick:Te},{default:r((()=>[p(T,{class:"ti-label-table"},{default:r((()=>[b(y(me.value?u(w)("已選 : ")+u(K)(me.value,19):u(w)("查找桌位")),1)])),_:1})])),_:1})])),_:1}),p(i,{class:"ti-input-box"},{default:r((()=>[p(k,{type:"text",onInput:ge,value:ye.value.ip,placeholder:u(w)("伺服器位址"),clearable:!1},null,8,["value","placeholder"]),p(i,{class:"ti-colon"},{default:r((()=>[b(":")])),_:1}),p(i,{class:"ti-input-port"},{default:r((()=>[p(k,{type:"number",onInput:xe,value:ye.value.port,placeholder:u(w)("端口"),clearable:!1},null,8,["value","placeholder"])])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title","cancelText","confirmText"]),p(F,{show:be.value,"onUpdate:show":a[0]||(a[0]=e=>be.value=e),onConfirm:ke},null,8,["show"])])),_:1})):v("",!0)}}},[["__scopeId","data-v-bd5af02b"]]);export{le as default};