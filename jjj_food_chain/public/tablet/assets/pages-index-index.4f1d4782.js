import{r as a,o as e,i as l,a as t,b as s,c as i,g as o,u,d as n,e as c,w as r,f as v,h as d,j as _,k as p,l as f,m,n as h,F as b,p as y,t as g,$ as w,s as x,q as T,v as k,x as C,y as F,z as I,A as E,B as j,C as $,S as N,D as z,E as D,G as S}from"./index-81fd6135.js";import{D as B,v as L,_ as q,a as A}from"./verify.f8734442.js";import{_ as G,u as M,g as R,a as U,b as W,s as H,c as J,d as K,e as O,f as P,v as Q,h as V,i as X,j as Y,k as Z,t as aa,l as ea,m as la}from"./baseinfo.a35837cf.js";const ta=G({__name:"index",setup(G){const{changeLocale:ta}=M(),sa=a(!1),ia=a(0),oa=a(!0),ua=a=>{ia.value=a.detail.current,na(Ma.value,ia.value)},na=(a,e)=>{const l=a[e];"video"==P(l.real_name)&&setTimeout((()=>{ra.value=l,ca.value=!0,oa.value=!1}),50)},ca=a(!1),ra=a(),va=()=>{ca.value=!1,oa.value=!0,ia.value==Ma.value.length-1?(ia.value=0,na(Ma.value,ia.value)):ia.value+=1};a(!1);const da=()=>{La()},_a=()=>{s({url:"/pages/index/index"})},pa=a(),fa=a("");a([]);const ma=a(),ha=a(!1),ba=a({ip:"",port:"",device_id:""}),ya=()=>{const a=R();ba.value.ip=(null==a?void 0:a.ip)||U()||"127.0.0.1",ba.value.port=(null==a?void 0:a.port)||"8080"},ga=a=>{ba.value.ip=a},wa=a=>{ba.value.port=a},xa=async()=>{var a;const e={...ba.value};if(e.ip)if(e.port)try{const l=await Q(V(`${null==e?void 0:e.ip}:${e.port}`));X(e),T(l.data.app_id),k(l.data.shop_supplier_id),J(null==(a=l.data)?void 0:a.currency),setTimeout((()=>{ha.value=!0}),150)}catch(l){x({title:w("绑定失败"),icon:"none"})}else x({title:w("請輸入連接埠"),icon:"none"});else x({title:w("請輸入伺服器位址"),icon:"none"})},Ta=a=>{ha.value=!1,a&&(ma.value=a,fa.value=a.table_no)},ka=()=>{ya(),fa.value=_().table_no,ma.value=_()},Ca=async()=>{var a;const e={...ba.value};if(e.ip)if(e.port)try{const l=await Q(V(`${null==e?void 0:e.ip}:${e.port}`));if(!ma.value)return void x({title:w("請查找桌位"),icon:"none"});X(e),T(l.data.app_id),k(l.data.shop_supplier_id),J(null==(a=l.data)?void 0:a.currency),setTimeout((()=>{Fa()}),150)}catch(l){x({title:w("绑定失败"),icon:"none"})}else x({title:w("請輸入連接埠"),icon:"none"});else x({title:w("請輸入伺服器位址"),icon:"none"})},Fa=async()=>{if(C()===ma.value.table_id)return x({title:w("绑定成功"),icon:"none"}),void(pa.value=!1);try{const a=await Y({table_id:ma.value.table_id,old_table_id:C()});F(ma.value),Ra(),x({title:a.msg,icon:"none"}),pa.value=!1}catch(a){}},Ia=a(),Ea=async()=>{if(1===Ga.value.is_call_service||1===Ga.value.is_customer_order)try{const a=await Z({table_id:C()});1===parseInt(a.data.tablet.is_customer_order)?10===a.data.status?$a():(I(!0),s({url:"/pages/index/opentable-index"})):Ia.value.tiCallClick("1")}catch(a){}},ja=a(!1),$a=()=>{ja.value=!0},Na=a=>{a?Sa(a):x({title:w("請輸入人數"),icon:"none"})},za=()=>{ja.value=!1},Da=a({table_id:"",meal_num:""}),Sa=async a=>{Da.value.table_id=C(),Da.value.meal_num=a;try{await aa(Da.value);I(!0),s({url:"/pages/index/opentable-index"})}catch(e){}},Ba=a(!1),La=()=>{Ba.value=!0},qa=async a=>{if(a)try{await L({password:a});pa.value=!0,ma.value=_(),fa.value=ma.value.table_no,Aa()}catch(e){}else x({title:w("請輸入密碼"),icon:"none"})},Aa=()=>{Ba.value=!1},Ga=a({name:"",logo:"",tableNo:"",is_call_service:1,is_customer_order:1}),Ma=a([]),Ra=async()=>{var a,e,l,t,s,i,o,u,n,c,r;sa.value=!0;try{const v=await W(),p="zh-tw"==(null==(e=null==(a=null==v?void 0:v.data)?void 0:a.tablet)?void 0:e.default_language)?"zh-TW":(null==(t=null==(l=null==v?void 0:v.data)?void 0:l.tablet)?void 0:t.default_language)||"en";p!=d()&&ta(p),H(v),Ga.value.name=v.data.name,Ga.value.logo=v.data.logo,Ga.value.tableNo=_().table_no,Ga.value.is_call_service=parseInt(null==(i=null==(s=null==v?void 0:v.data)?void 0:s.tablet)?void 0:i.is_call_service),Ga.value.is_customer_order=parseInt(null==(u=null==(o=null==v?void 0:v.data)?void 0:o.tablet)?void 0:u.is_customer_order),J(null==(n=v.data)?void 0:n.currency),Ma.value=(null==(r=null==(c=v.data)?void 0:c.tablet)?void 0:r.carousel)||[],Ma.value.length>0&&na(Ma.value,0),sa.value=!1}catch(v){sa.value=!1}finally{sa.value=!1}};return e((()=>{l()&&t()&&s({url:"/pages/index/opentable-index"})})),i((()=>{l()&&!t()&&Ra()})),ya(),o({success:a=>{ba.value.device_id=a.deviceId}}),(a,e)=>{const s=E(j("ti-layout-head"),q),i=p,o=$,d=N,_=z,x=D,T=S,k=E(j("ti-input"),ea),C=E(j("ti-modal"),A),F=E(j("ti-layout-table-list"),la);return u(l)()&&!u(t)()?(n(),c(i,{key:0,class:"ti-page",onClick:e[1]||(e[1]=a=>u(O)())},{default:r((()=>[f(i,null,{default:r((()=>[sa.value?v("",!0):(n(),c(s,{key:0,ref_key:"refCallServer",ref:Ia,onDoubleLogo:da,onRefresh:_a,is_call_service:Ga.value.is_call_service},null,8,["is_call_service"]))])),_:1}),sa.value?v("",!0):(n(),c(i,{key:0,class:"ti-page-content"},{default:r((()=>[f(i,{class:"ti-page-left"},{default:r((()=>[ca.value?v("",!0):(n(),c(_,{key:0,onChange:ua,class:"ti-swiper",current:ia.value,autoplay:oa.value,circular:"",interval:"30000","indicator-dots":!0,"indicator-color":"#FFFFFF80","indicator-active-color":"#FFBE00"},{default:r((()=>[(n(!0),m(b,null,h(Ma.value,((a,e)=>(n(),c(d,{class:"ti-swiper-item",key:e},{default:r((()=>["image"===u(P)(a.real_name)?(n(),c(o,{key:0,class:"ti-swiper-item-image",mode:"scaleToFill",src:a.file_path},null,8,["src"])):v("",!0),"video"===u(P)(a.real_name)?(n(),c(o,{key:1,class:"ti-swiper-item-image",mode:"scaleToFill",src:""})):v("",!0)])),_:2},1024)))),128))])),_:1},8,["current","autoplay"])),ca.value?(n(),c(_,{key:1,class:"ti-swiper"},{default:r((()=>[f(d,{class:"ti-swiper-item"},{default:r((()=>{var a;return[f(x,{onEnded:va,class:"ti-swiper-item-video",controls:!1,"show-fullscreen-btn":!1,autoplay:!0,src:null==(a=ra.value)?void 0:a.file_path},null,8,["src"])]})),_:1})])),_:1})):v("",!0)])),_:1}),f(i,{class:"ti-page-right",onTouchstart:a.handleTouchStart,onTouchmove:a.handleTouchMove,onTouchend:a.handleTouchEnd,controls:""},{default:r((()=>[f(i,{class:"ti-store-box"},{default:r((()=>[f(i,{class:"ti-store-item"},{default:r((()=>[f(o,{class:"ti-store-logo",src:Ga.value.logo},null,8,["src"]),f(T,{class:"ti-store-name"},{default:r((()=>[y(g(Ga.value.name),1)])),_:1})])),_:1}),f(i,{class:"ti-table-item"},{default:r((()=>[f(i,{class:"ti-table-number"},{default:r((()=>[y(g(u(w)("當前桌號："))+g(Ga.value.tableNo),1)])),_:1}),f(i,{class:"ti-table-button",onClick:Ea},{default:r((()=>[f(T,{class:"ti-table-button-text"},{default:r((()=>[y(g(u(w)("開始點餐")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["onTouchstart","onTouchmove","onTouchend"]),f(B,{show:ja.value,title:"["+Ga.value.tableNo+"]"+u(w)("就餐人数"),placeholder:u(w)("請輸入人數"),onExit:za,onConfirm:Na},null,8,["show","title","placeholder"]),f(B,{show:Ba.value,title:u(w)("密碼"),password:!0,placeholder:u(w)("請輸入密碼"),onExit:Aa,onConfirm:qa},null,8,["show","title","placeholder"])])),_:1})),f(C,{show:pa.value,title:u(w)("設置"),cancelText:u(w)("重置"),confirmText:u(w)("確定"),onCancel:ka,onConfirm:Ca},{content:r((()=>[f(i,{class:"ti-item-input"},{default:r((()=>[f(i,{class:"ti-label-box"},{default:r((()=>[f(i,{class:"ti-label-left"},{default:r((()=>[f(T,{class:"ti-label-server"},{default:r((()=>[y(g(u(w)("服務器連接地址")),1)])),_:1})])),_:1}),f(i,{class:"ti-label-right",onClick:xa},{default:r((()=>[f(T,{class:"ti-label-table"},{default:r((()=>[y(g(fa.value?u(w)("已選 : ")+u(K)(fa.value,19):u(w)("查找桌位")),1)])),_:1})])),_:1})])),_:1}),f(i,{class:"ti-input-box"},{default:r((()=>[f(k,{type:"text",onInput:ga,value:ba.value.ip,placeholder:u(w)("伺服器位址"),clearable:!1},null,8,["value","placeholder"]),f(i,{class:"ti-colon"},{default:r((()=>[y(":")])),_:1}),f(i,{class:"ti-input-port"},{default:r((()=>[f(k,{type:"number",onInput:wa,value:ba.value.port,placeholder:u(w)("端口"),clearable:!1},null,8,["value","placeholder"])])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title","cancelText","confirmText"]),f(F,{show:ha.value,"onUpdate:show":e[0]||(e[0]=a=>ha.value=a),onConfirm:Ta},null,8,["show"])])),_:1})):v("",!0)}}},[["__scopeId","data-v-cd80ebf3"]]);export{ta as default};
