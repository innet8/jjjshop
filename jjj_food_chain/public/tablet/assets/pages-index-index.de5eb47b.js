import{r as a,o as e,i as l,a as t,b as s,c as u,u as o,d as i,e as n,w as c,f as v,g as r,h as d,j as p,k as f,l as h,F as _,m,t as b,$ as y,s as g,n as w,p as x,q as T,v as F,x as k,y as C,z as E,A as j,S as N,B as D,C as I,D as S}from"./index-a1a355ee.js";import{D as B,v as W,_ as q,a as z}from"./verify.364429a4.js";import{_ as A,g as L,a as M,s as R,c as U,b as $,v as G,d as H,e as J,f as K,t as O,h as P,i as Q}from"./baseinfo.057b7901.js";const V=A({__name:"index",setup(A){const V=a(0),X=a(!0),Y=a=>{V.value=a.detail.current,Z(Ia.value,V.value)},Z=(a,e)=>{const l=a[e];"video"==$(l.real_name)&&setTimeout((()=>{ea.value=l,aa.value=!0,X.value=!1}),50)},aa=a(!1),ea=a(),la=()=>{aa.value=!1,X.value=!0,V.value==Ia.value.length-1?(V.value=0,Z(Ia.value,V.value)):V.value+=1},ta=a(!1),sa=()=>{Ea()},ua=()=>{s({url:"/pages/index/index"})},oa=a(),ia=a("");a([]);const na=a(),ca=a(),va=a("8080"),ra=a=>{ca.value=a},da=a=>{va.value=a},pa=async()=>{var a;if(ca.value)if(va.value)try{let e="";e=ca.value.startsWith("http://")||ca.value.startsWith("https://")?va.value.length>0?ca.value+":"+va.value:ca.value:va.value.length>0?"http://"+ca.value+":"+va.value:"http://"+ca.value,ta.value=!0;const l=await G(e);H(e),w(l.data.app_id),x(l.data.shop_supplier_id),R(null==(a=l.data)?void 0:a.currency),setTimeout((()=>{ha()}),300)}catch(e){}finally{ta.value=!1}else g({title:y("請輸入服務器端口"),icon:"none"});else g({title:y("請輸入服務器鏈接地址"),icon:"none"})},fa=a(!1),ha=()=>{fa.value=!0},_a=a=>{fa.value=!1,a&&(na.value=a,ia.value=y("已選 : ")+a.table_no)},ma=()=>{ca.value="",va.value="",ia.value="",na.value=""},ba=async()=>{if(ca.value)if(va.value)if(na.value)try{const a=await J({table_id:na.value.table_id,old_table_id:T()});F(na.value),Sa(),g({title:y(a.msg),icon:"none"}),oa.value=!1}catch(a){}else g({title:y("請查找桌位"),icon:"none"});else g({title:y("請輸入服務器端口"),icon:"none"});else g({title:y("請輸入服務器鏈接地址"),icon:"none"})},ya=async()=>{try{10===(await K({table_id:T()})).data.status?wa():(k(!0),s({url:"/pages/index/opentable-index?callServer=true"}))}catch(a){}},ga=a(!1),wa=()=>{ga.value=!0},xa=a=>{a||g({title:y("請輸入人數"),icon:"none"}),ka(a)},Ta=()=>{ga.value=!1},Fa=a({table_id:"",meal_num:""}),ka=async a=>{Fa.value.table_id=T(),Fa.value.meal_num=a;try{await O(Fa.value);k(!0),s({url:"/pages/index/opentable-index"})}catch(e){}},Ca=a(!1),Ea=()=>{Ca.value=!0},ja=async a=>{if(a)try{await W({password:a});oa.value=!0,Na()}catch(e){}else g({title:y("請輸入密碼"),icon:"none"})},Na=()=>{Ca.value=!1},Da=a({name:"",logo:"",tableNo:""}),Ia=a([]),Sa=async()=>{var a,e,l;try{ta.value=!0;const t=await M();Da.value.name=t.data.name,Da.value.logo=t.data.logo,Da.value.tableNo=r().table_no,R(null==(a=t.data)?void 0:a.currency),Ia.value=(null==(l=null==(e=t.data)?void 0:e.tablet)?void 0:l.carousel)||[],Ia.value.length>0&&Z(Ia.value,0)}catch(t){}finally{ta.value=!1}};return e((()=>{l()&&t()&&s({url:"/pages/index/opentable-index"})})),u((()=>{l()&&!t()&&Sa()})),ca.value=L(),(a,e)=>{const s=C(E("ti-layout-head"),q),u=d,r=j,g=N,w=D,x=I,T=S,F=C(E("ti-input"),P),k=C(E("ti-modal"),z),W=C(E("ti-layout-table-list"),Q);return o(l)()&&!o(t)()?(i(),n(u,{key:0,class:"ti-page",onClick:e[1]||(e[1]=a=>o(U)())},{default:c((()=>[p(u,null,{default:c((()=>[p(s,{onDoubleLogo:sa,onRefresh:ua})])),_:1}),p(u,{class:"ti-page-content"},{default:c((()=>[p(u,{class:"ti-page-left"},{default:c((()=>[aa.value?v("",!0):(i(),n(w,{key:0,onChange:Y,class:"ti-swiper",current:V.value,autoplay:X.value,circular:"",interval:"30000","indicator-dots":!0,"indicator-color":"#FFFFFF80","indicator-active-color":"#FFBE00"},{default:c((()=>[(i(!0),f(_,null,h(Ia.value,((a,e)=>(i(),n(g,{class:"ti-swiper-item",key:e},{default:c((()=>["image"===o($)(a.real_name)?(i(),n(r,{key:0,class:"ti-swiper-item-image",mode:"scaleToFill",src:a.file_path},null,8,["src"])):v("",!0),"video"===o($)(a.real_name)?(i(),n(r,{key:1,class:"ti-swiper-item-image",mode:"scaleToFill",src:""})):v("",!0)])),_:2},1024)))),128))])),_:1},8,["current","autoplay"])),aa.value?(i(),n(w,{key:1,class:"ti-swiper"},{default:c((()=>[p(g,{class:"ti-swiper-item"},{default:c((()=>[p(x,{onEnded:la,class:"ti-swiper-item-video",autoplay:!0,src:ea.value.file_path},null,8,["src"])])),_:1})])),_:1})):v("",!0)])),_:1}),p(u,{class:"ti-page-right",onTouchstart:a.handleTouchStart,onTouchmove:a.handleTouchMove,onTouchend:a.handleTouchEnd,controls:""},{default:c((()=>[p(u,{class:"ti-store-box"},{default:c((()=>[p(u,{class:"ti-store-item"},{default:c((()=>[p(r,{class:"ti-store-logo",src:Da.value.logo},null,8,["src"]),p(T,{class:"ti-store-name"},{default:c((()=>[m(b(Da.value.name),1)])),_:1})])),_:1}),p(u,{class:"ti-table-item"},{default:c((()=>[p(u,{class:"ti-table-number"},{default:c((()=>[m(b(o(y)("當前桌號："))+b(Da.value.tableNo),1)])),_:1}),p(u,{class:"ti-table-button",onClick:ya},{default:c((()=>[p(T,{class:"ti-table-button-text"},{default:c((()=>[m(b(o(y)("開始點餐")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["onTouchstart","onTouchmove","onTouchend"]),p(B,{show:ga.value,title:"["+Da.value.tableNo+"]"+o(y)("就餐人数"),placeholder:o(y)("請輸入人數"),onExit:Ta,onConfirm:xa},null,8,["show","title","placeholder"]),p(B,{show:Ca.value,title:o(y)("密碼"),password:!0,placeholder:o(y)("請輸入密碼"),onExit:Na,onConfirm:ja},null,8,["show","title","placeholder"])])),_:1}),p(k,{show:oa.value,title:o(y)("設置"),cancelText:o(y)("重置"),confirmText:o(y)("確定"),onCancel:ma,onConfirm:ba},{content:c((()=>[p(u,{class:"ti-item-input"},{default:c((()=>[p(u,{class:"ti-label-box"},{default:c((()=>[p(u,{class:"ti-label-left"},{default:c((()=>[p(T,{class:"ti-label-server"},{default:c((()=>[m(b(o(y)("服務器連接地址")),1)])),_:1})])),_:1}),p(u,{class:"ti-label-right",onClick:pa},{default:c((()=>[p(T,{class:"ti-label-table"},{default:c((()=>[m(b(ia.value?ia.value:o(y)("查找桌位")),1)])),_:1})])),_:1})])),_:1}),p(u,{class:"ti-input-box"},{default:c((()=>[p(F,{type:"text",onInput:ra,value:ca.value,clearable:!1},null,8,["value"]),p(u,{class:"ti-colon"},{default:c((()=>[m(":")])),_:1}),p(u,{class:"ti-input-port"},{default:c((()=>[p(F,{type:"number",onInput:da,value:va.value,clearable:!1},null,8,["value"])])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title","cancelText","confirmText"]),p(W,{show:fa.value,"onUpdate:show":e[0]||(e[0]=a=>fa.value=a),onConfirm:_a},null,8,["show"])])),_:1})):v("",!0)}}},[["__scopeId","data-v-89766df3"]]);export{V as default};
