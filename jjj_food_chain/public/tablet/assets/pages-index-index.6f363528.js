import{r as a,o as e,i as l,a as t,b as s,c as i,u,d as o,e as n,w as c,f as v,g as d,h as r,j as f,k as p,l as _,F as b,m,t as h,$ as y,s as g,n as x,p as w,q as F,v as C,x as k,y as T,z as j,A as N,S as E,B as I,C as B}from"./index-59907f8e.js";import{D,v as W,_ as q,a as z}from"./verify.19d7b322.js";import{_ as A,g as L,a as R,s as S,c as U,v as $,b as G,d as H,e as J,t as K,f as M,h as O,i as P}from"./baseinfo.50cc61fb.js";const Q=A({__name:"index",setup(A){const Q=a(!1),V=()=>{ya()},X=()=>{s({url:"/pages/index/index"})},Y=a(),Z=a("");a([]);const aa=a(),ea=a(),la=a("8080"),ta=a=>{ea.value=a},sa=a=>{la.value=a},ia=async()=>{var a;if(ea.value)if(la.value)try{let e="";e=ea.value.startsWith("http://")||ea.value.startsWith("https://")?la.value.length>0?ea.value+":"+la.value:ea.value:la.value.length>0?"http://"+ea.value+":"+la.value:"http://"+ea.value,Q.value=!0;const l=await $(e);G(e),x(l.data.app_id),w(l.data.shop_supplier_id),S(null==(a=l.data)?void 0:a.currency),setTimeout((()=>{oa()}),300)}catch(e){}finally{Q.value=!1}else g({title:y("請輸入服務器端口"),icon:"none"});else g({title:y("請輸入服務器鏈接地址"),icon:"none"})},ua=a(!1),oa=()=>{ua.value=!0},na=a=>{ua.value=!1,a&&(aa.value=a,Z.value=y("已選 : ")+a.table_no)},ca=()=>{ea.value="",la.value="",Z.value="",aa.value=""},va=async()=>{if(ea.value)if(la.value)if(aa.value)try{const a=await H({table_id:aa.value.table_id,old_table_id:F()});C(aa.value),Ca(),g({title:y(a.msg),icon:"none"}),Y.value=!1}catch(a){}else g({title:y("請查找桌位"),icon:"none"});else g({title:y("請輸入服務器端口"),icon:"none"});else g({title:y("請輸入服務器鏈接地址"),icon:"none"})},da=async()=>{try{10===(await J({table_id:F()})).data.status?fa():(k(!0),s({url:"/pages/index/opentable-index"}))}catch(a){}},ra=a(!1),fa=()=>{ra.value=!0},pa=a=>{a||g({title:y("請輸入人數"),icon:"none"}),ma(a)},_a=()=>{ra.value=!1},ba=a({table_id:"",meal_num:""}),ma=async a=>{ba.value.table_id=F(),ba.value.meal_num=a;try{await K(ba.value);k(!0),s({url:"/pages/index/opentable-index"})}catch(e){}},ha=a(!1),ya=()=>{ha.value=!0},ga=async a=>{if(a)try{await W({password:a});Y.value=!0,xa()}catch(e){}else g({title:y("請輸入密碼"),icon:"none"})},xa=()=>{ha.value=!1},wa=a({name:"",logo:"",tableNo:""}),Fa=a([]),Ca=async()=>{var a,e,l;try{Q.value=!0;const t=await R();wa.value.name=t.data.name,wa.value.logo=t.data.logo,wa.value.tableNo=d().table_no,S(null==(a=t.data)?void 0:a.currency),Fa.value=(null==(l=null==(e=t.data)?void 0:e.tablet)?void 0:l.carousel)||[]}catch(t){}finally{Q.value=!1}};return e((()=>{t()&&l()&&s({url:"/pages/index/opentable-index"})})),i((()=>{t()&&!l()&&Ca()})),ea.value=L(),(a,e)=>{const s=T(j("ti-layout-head"),q),i=r,d=N,g=B,x=E,w=I,F=T(j("ti-input"),M),C=T(j("ti-modal"),z),k=T(j("ti-layout-table-list"),O);return u(t)()&&!u(l)()?(o(),n(i,{key:0,class:"ti-page",onClick:e[1]||(e[1]=a=>u(U)())},{default:c((()=>[f(i,null,{default:c((()=>[f(s,{onDoubleLogo:V,onRefresh:X})])),_:1}),f(i,{class:"ti-page-content"},{default:c((()=>[f(i,{class:"ti-page-left"},{default:c((()=>[f(x,{class:"ti-swiper",circular:"",autoplay:"","indicator-dots":!0,"indicator-color":"#FFFFFF80","indicator-active-color":"#FFBE00"},{default:c((()=>[(o(!0),p(b,null,_(Fa.value,((a,e)=>(o(),n(g,{class:"ti-swiper-item",key:e},{default:c((()=>["image"===u(P)(a.real_name)?(o(),n(d,{key:0,class:"ti-swiper-item-image",mode:"scaleToFill",src:a.file_path},null,8,["src"])):v("",!0)])),_:2},1024)))),128))])),_:1})])),_:1}),f(i,{class:"ti-page-right"},{default:c((()=>[f(i,{class:"ti-store-box"},{default:c((()=>[f(i,{class:"ti-store-item"},{default:c((()=>[f(d,{class:"ti-store-logo",src:wa.value.logo},null,8,["src"]),f(w,{class:"ti-store-name"},{default:c((()=>[m(h(wa.value.name),1)])),_:1})])),_:1}),f(i,{class:"ti-table-item"},{default:c((()=>[f(i,{class:"ti-table-number"},{default:c((()=>[m(h(u(y)("當前桌號："))+h(wa.value.tableNo),1)])),_:1}),f(i,{class:"ti-table-button",onClick:da},{default:c((()=>[f(w,{class:"ti-table-button-text"},{default:c((()=>[m(h(u(y)("開始點餐")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),f(D,{show:ra.value,title:"["+wa.value.tableNo+"]"+u(y)("就餐人数"),placeholder:u(y)("請輸入人數"),onExit:_a,onConfirm:pa},null,8,["show","title","placeholder"]),f(D,{show:ha.value,title:u(y)("密碼"),password:!0,placeholder:u(y)("請輸入密碼"),onExit:xa,onConfirm:ga},null,8,["show","title","placeholder"])])),_:1}),f(C,{show:Y.value,title:u(y)("設置"),cancelText:u(y)("重置"),confirmText:u(y)("確定"),onCancel:ca,onConfirm:va},{content:c((()=>[f(i,{class:"ti-item-input"},{default:c((()=>[f(i,{class:"ti-label-box"},{default:c((()=>[f(i,{class:"ti-label-left"},{default:c((()=>[f(w,{class:"ti-label-server"},{default:c((()=>[m(h(u(y)("服務器連接地址")),1)])),_:1})])),_:1}),f(i,{class:"ti-label-right",onClick:ia},{default:c((()=>[f(w,{class:"ti-label-table"},{default:c((()=>[m(h(Z.value?Z.value:u(y)("查找桌位")),1)])),_:1})])),_:1})])),_:1}),f(i,{class:"ti-input-box"},{default:c((()=>[f(F,{type:"text",onInput:ta,value:ea.value,clearable:!1},null,8,["value"]),f(i,{class:"ti-colon"},{default:c((()=>[m(":")])),_:1}),f(i,{class:"ti-input-port"},{default:c((()=>[f(F,{type:"number",onInput:sa,value:la.value,clearable:!1},null,8,["value"])])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title","cancelText","confirmText"]),f(k,{show:ua.value,"onUpdate:show":e[0]||(e[0]=a=>ua.value=a),onConfirm:na},null,8,["show"])])),_:1})):v("",!0)}}},[["__scopeId","data-v-df621ff9"]]);export{Q as default};
