import{r as e,o as a,i as l,a as t,b as s,c as i,g as o,u,d as n,e as c,w as r,f as v,h as d,j as _,k as p,l as f,m,F as h,n as b,t as y,$ as w,s as g,p as x,q as T,v as k,x as C,y as F,z as I,A as E,B as j,S as $,C as N,D,E as S}from"./index-072df158.js";import{D as B,v as q,_ as z,a as A}from"./verify.f651c79c.js";import{_ as L,g as M,a as R,b as U,s as G,c as H,d as J,e as K,v as O,f as P,h as Q,i as V,j as W,t as X,k as Y,l as Z}from"./baseinfo.20935bd2.js";const ee=L({__name:"index",setup(L){const ee=e(!1),ae=e(0),le=e(!0),te=e=>{ae.value=e.detail.current,se(ze.value,ae.value)},se=(e,a)=>{const l=e[a];"video"==K(l.real_name)&&setTimeout((()=>{oe.value=l,ie.value=!0,le.value=!1}),50)},ie=e(!1),oe=e(),ue=()=>{ie.value=!1,le.value=!0,ae.value==ze.value.length-1?(ae.value=0,se(ze.value,ae.value)):ae.value+=1};e(!1);const ne=()=>{De()},ce=()=>{s({url:"/pages/index/index"})},re=e(),ve=e("");e([]);const de=e(),_e=e(!1),pe=e({ip:"",port:"",device_id:""}),fe=()=>{const e=M();pe.value.ip=(null==e?void 0:e.ip)||R()||"127.0.0.1",pe.value.port=(null==e?void 0:e.port)||"8080"},me=e=>{pe.value.ip=e},he=e=>{pe.value.port=e},be=async()=>{var e;const a={...pe.value};if(a.ip)if(a.port)try{const l=await O(P(`${null==a?void 0:a.ip}:${a.port}`));Q(a),x(l.data.app_id),T(l.data.shop_supplier_id),G(null==(e=l.data)?void 0:e.currency),setTimeout((()=>{_e.value=!0}),150)}catch(l){g({title:w("绑定失败"),icon:"none"})}else g({title:w("請輸入連接埠"),icon:"none"});else g({title:w("請輸入伺服器位址"),icon:"none"})},ye=e=>{_e.value=!1,e&&(de.value=e,ve.value=e.table_no)},we=()=>{fe(),ve.value=d().table_no,de.value=d()},ge=async()=>{var e;const a={...pe.value};if(a.ip)if(a.port)try{const l=await O(P(`${null==a?void 0:a.ip}:${a.port}`));if(!de.value)return void g({title:w("請查找桌位"),icon:"none"});Q(a),x(l.data.app_id),T(l.data.shop_supplier_id),G(null==(e=l.data)?void 0:e.currency),setTimeout((()=>{xe()}),150)}catch(l){g({title:w("绑定失败"),icon:"none"})}else g({title:w("請輸入連接埠"),icon:"none"});else g({title:w("請輸入伺服器位址"),icon:"none"})},xe=async()=>{if(k()===de.value.table_id)return g({title:w("绑定成功"),icon:"none"}),void(re.value=!1);try{const e=await V({table_id:de.value.table_id,old_table_id:k()});C(de.value),Ae(),g({title:e.msg,icon:"none"}),re.value=!1}catch(e){}},Te=e(),ke=async()=>{if(1===qe.value.is_call_service||1===qe.value.is_customer_order)try{const e=await W({table_id:k()});1===parseInt(e.data.tablet.is_customer_order)?10===e.data.status?Fe():(F(!0),s({url:"/pages/index/opentable-index"})):Te.value.tiCallClick("1")}catch(e){}},Ce=e(!1),Fe=()=>{Ce.value=!0},Ie=e=>{e?$e(e):g({title:w("請輸入人數"),icon:"none"})},Ee=()=>{Ce.value=!1},je=e({table_id:"",meal_num:""}),$e=async e=>{je.value.table_id=k(),je.value.meal_num=e;try{await X(je.value);F(!0),s({url:"/pages/index/opentable-index"})}catch(a){}},Ne=e(!1),De=()=>{Ne.value=!0},Se=async e=>{if(e)try{await q({password:e});re.value=!0,de.value=d(),ve.value=de.value.table_no,Be()}catch(a){}else g({title:w("請輸入密碼"),icon:"none"})},Be=()=>{Ne.value=!1},qe=e({name:"",logo:"",tableNo:"",is_call_service:1,is_customer_order:1}),ze=e([]),Ae=async()=>{var e,a,l,t,s,i,o;ee.value=!0;try{const u=await U();qe.value.name=u.data.name,qe.value.logo=u.data.logo,qe.value.tableNo=d().table_no,qe.value.is_call_service=parseInt(null==(a=null==(e=null==u?void 0:u.data)?void 0:e.tablet)?void 0:a.is_call_service),qe.value.is_customer_order=parseInt(null==(t=null==(l=null==u?void 0:u.data)?void 0:l.tablet)?void 0:t.is_customer_order),G(null==(s=u.data)?void 0:s.currency),ze.value=(null==(o=null==(i=u.data)?void 0:i.tablet)?void 0:o.carousel)||[],ze.value.length>0&&se(ze.value,0),ee.value=!1}catch(u){ee.value=!1}finally{ee.value=!1}};return a((()=>{l()&&t()&&s({url:"/pages/index/opentable-index"})})),i((()=>{l()&&!t()&&Ae()})),fe(),o({success:e=>{pe.value.device_id=e.deviceId}}),(e,a)=>{const s=I(E("ti-layout-head"),z),i=_,o=j,d=$,g=N,x=D,T=S,k=I(E("ti-input"),Y),C=I(E("ti-modal"),A),F=I(E("ti-layout-table-list"),Z);return u(l)()&&!u(t)()?(n(),c(i,{key:0,class:"ti-page",onClick:a[1]||(a[1]=e=>u(J)())},{default:r((()=>[p(i,null,{default:r((()=>[ee.value?v("",!0):(n(),c(s,{key:0,ref_key:"refCallServer",ref:Te,onDoubleLogo:ne,onRefresh:ce,is_call_service:qe.value.is_call_service},null,8,["is_call_service"]))])),_:1}),ee.value?v("",!0):(n(),c(i,{key:0,class:"ti-page-content"},{default:r((()=>[p(i,{class:"ti-page-left"},{default:r((()=>[ie.value?v("",!0):(n(),c(g,{key:0,onChange:te,class:"ti-swiper",current:ae.value,autoplay:le.value,circular:"",interval:"30000","indicator-dots":!0,"indicator-color":"#FFFFFF80","indicator-active-color":"#FFBE00"},{default:r((()=>[(n(!0),f(h,null,m(ze.value,((e,a)=>(n(),c(d,{class:"ti-swiper-item",key:a},{default:r((()=>["image"===u(K)(e.real_name)?(n(),c(o,{key:0,class:"ti-swiper-item-image",mode:"scaleToFill",src:e.file_path},null,8,["src"])):v("",!0),"video"===u(K)(e.real_name)?(n(),c(o,{key:1,class:"ti-swiper-item-image",mode:"scaleToFill",src:""})):v("",!0)])),_:2},1024)))),128))])),_:1},8,["current","autoplay"])),ie.value?(n(),c(g,{key:1,class:"ti-swiper"},{default:r((()=>[p(d,{class:"ti-swiper-item"},{default:r((()=>{var e;return[p(x,{onEnded:ue,class:"ti-swiper-item-video",controls:!1,"show-fullscreen-btn":!1,autoplay:!0,src:null==(e=oe.value)?void 0:e.file_path},null,8,["src"])]})),_:1})])),_:1})):v("",!0)])),_:1}),p(i,{class:"ti-page-right",onTouchstart:e.handleTouchStart,onTouchmove:e.handleTouchMove,onTouchend:e.handleTouchEnd,controls:""},{default:r((()=>[p(i,{class:"ti-store-box"},{default:r((()=>[p(i,{class:"ti-store-item"},{default:r((()=>[p(o,{class:"ti-store-logo",src:qe.value.logo},null,8,["src"]),p(T,{class:"ti-store-name"},{default:r((()=>[b(y(qe.value.name),1)])),_:1})])),_:1}),p(i,{class:"ti-table-item"},{default:r((()=>[p(i,{class:"ti-table-number"},{default:r((()=>[b(y(u(w)("當前桌號："))+y(qe.value.tableNo),1)])),_:1}),p(i,{class:"ti-table-button",onClick:ke},{default:r((()=>[p(T,{class:"ti-table-button-text"},{default:r((()=>[b(y(u(w)("開始點餐")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["onTouchstart","onTouchmove","onTouchend"]),p(B,{show:Ce.value,title:"["+qe.value.tableNo+"]"+u(w)("就餐人数"),placeholder:u(w)("請輸入人數"),onExit:Ee,onConfirm:Ie},null,8,["show","title","placeholder"]),p(B,{show:Ne.value,title:u(w)("密碼"),password:!0,placeholder:u(w)("請輸入密碼"),onExit:Be,onConfirm:Se},null,8,["show","title","placeholder"])])),_:1})),p(C,{show:re.value,title:u(w)("設置"),cancelText:u(w)("重置"),confirmText:u(w)("確定"),onCancel:we,onConfirm:ge},{content:r((()=>[p(i,{class:"ti-item-input"},{default:r((()=>[p(i,{class:"ti-label-box"},{default:r((()=>[p(i,{class:"ti-label-left"},{default:r((()=>[p(T,{class:"ti-label-server"},{default:r((()=>[b(y(u(w)("服務器連接地址")),1)])),_:1})])),_:1}),p(i,{class:"ti-label-right",onClick:be},{default:r((()=>[p(T,{class:"ti-label-table"},{default:r((()=>[b(y(ve.value?u(w)("已選 : ")+u(H)(ve.value,19):u(w)("查找桌位")),1)])),_:1})])),_:1})])),_:1}),p(i,{class:"ti-input-box"},{default:r((()=>[p(k,{type:"text",onInput:me,value:pe.value.ip,placeholder:u(w)("伺服器位址"),clearable:!1},null,8,["value","placeholder"]),p(i,{class:"ti-colon"},{default:r((()=>[b(":")])),_:1}),p(i,{class:"ti-input-port"},{default:r((()=>[p(k,{type:"number",onInput:he,value:pe.value.port,placeholder:u(w)("端口"),clearable:!1},null,8,["value","placeholder"])])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title","cancelText","confirmText"]),p(F,{show:_e.value,"onUpdate:show":a[0]||(a[0]=e=>_e.value=e),onConfirm:ye},null,8,["show"])])),_:1})):v("",!0)}}},[["__scopeId","data-v-351358af"]]);export{ee as default};
