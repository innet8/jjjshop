import{u as e,a,s as l,r as t,o as s,i,b as u,c as o,d as n,e as c,g as r,f,h as d,j as v,w as _,k as b,l as p,m,n as h,p as y,q as g,t as w,v as x,x as C,y as k,F as T,z as I,A as F,$ as E,B as $,C as j,D as U,E as B,G as D,H as A,I as L,J as O,K as P,L as R,M as S,N as q,O as z,P as G,Q as H,R as J,S as K,T as M,U as N,V as Q,W as V,X as W,Y as X,Z as Y,_ as Z,a0 as ee,a1 as ae}from"./index-b578dd66.js";import{D as le,v as te,_ as se,a as ie}from"./verify.e13a13f4.js";import{_ as ue,u as oe,a as ne,b as ce}from"./ti-layout-table-list.9fb88962.js";const re=ue({__name:"index",setup(ue){const re=e(),fe=a(),{userInfo:de}=l(re),{tableInfo:ve}=l(fe);oe();const{getUserInfo:_e,setUserInfo:be}=e(),{getTableInfoAsync:pe}=a();_e(),pe();const me=t(!1),he=t(0),ye=t(!0),ge=t(!1),we=e=>{var a,l;he.value=e.detail.current,xe(null==(l=null==(a=de.value)?void 0:a.tablet)?void 0:l.carousel,he.value)},xe=(e,a)=>{const l=e[a];"video"==U(l.real_name)?setTimeout((()=>{ke.value=l,Ce.value=!0,ye.value=!1,ge.value=!0}),50):ge.value=!1},Ce=t(!1),ke=t(),Te=()=>{var e,a,l,t;Ce.value=!1,ye.value=!0,he.value==(null==(a=null==(e=de.value)?void 0:e.tablet)?void 0:a.carousel.length)-1?(he.value=0,xe(null==(t=null==(l=de.value)?void 0:l.tablet)?void 0:t.carousel,he.value)):he.value+=1};t(!1);const Ie=()=>{sa()},Fe=()=>{o({url:"/pages/index/index"})},Ee=t(),$e=t("");t([]);const je=t(),Ue=t(!1),Be=t({ip:"",port:"",device_id:""}),De=()=>{const e=p();Be.value.ip=(null==e?void 0:e.ip)||m()||"127.0.0.1",Be.value.port=(null==e?void 0:e.port)||"8080"},Ae=e=>{Be.value.ip=e},Le=e=>{Be.value.port=e},Oe=async()=>{var e;const a={...Be.value};if(a.ip)if(a.port)try{const l=await D(A(`${null==a?void 0:a.ip}:${a.port}`));L(a),O(l.data.app_id),P(l.data.shop_supplier_id),R(null==(e=l.data)?void 0:e.currency),setTimeout((()=>{Ue.value=!0}),150)}catch(l){B({title:E("绑定失败"),icon:"none"})}else B({title:E("請輸入連接埠"),icon:"none"});else B({title:E("請輸入伺服器位址"),icon:"none"})},Pe=e=>{Ue.value=!1,e&&(je.value=e,$e.value=e.table_no)},Re=()=>{De(),$e.value=h().table_no,je.value=h()},Se=async()=>{var e;const a={...Be.value};if(a.ip)if(a.port)try{const l=await D(A(`${null==a?void 0:a.ip}:${a.port}`));if(!je.value)return void B({title:E("請查找桌位"),icon:"none"});L(a),O(l.data.app_id),P(l.data.shop_supplier_id),R(null==(e=l.data)?void 0:e.currency),setTimeout((()=>{qe()}),150)}catch(l){B({title:E("绑定失败"),icon:"none"})}else B({title:E("請輸入連接埠"),icon:"none"});else B({title:E("請輸入伺服器位址"),icon:"none"})},qe=async()=>{if(g()===je.value.table_id)return B({title:E("绑定成功"),icon:"none"}),void(Ee.value=!1);try{const e=await S({table_id:je.value.table_id,old_table_id:g()});q(je.value),_e(),pe(),B({title:e.msg,icon:"none"}),Ee.value=!1}catch(e){}},ze=t(),Ge=t(!1),He=async()=>{var e,a;if(1===parseInt(null==(e=null==de?void 0:de.value)?void 0:e.tablet.is_customer_order)){_e();try{const e=await y({table_id:g()});if(1===parseInt(e.data.tablet.is_customer_order))if(10===e.data.status)Me();else{if(1==(null==(a=e.data.order)?void 0:a.is_buffet))return Ge.value=!0,void(We.value=!0);Je()}else ze.value.tiCallClick("1")}catch(l){}}},Je=()=>{z(!0),o({url:"/pages/index/opentable-index"})},Ke=t(!1),Me=()=>{Ke.value=!0},Ne=(e,a)=>{e?ea(e,a):B({title:E("請輸入人數"),icon:"none"})},Qe=()=>{Ke.value=!1},Ve=t(!1),We=t(!1),Xe=t(),Ye=t(null),Ze=t({table_id:"",meal_num:"",is_buffet:1,buffet_ids:[]}),ea=(e,a)=>{if(Ze.value.meal_num=e,Ze.value.is_buffet=a?1:0,a)return la();aa(e,a)},aa=async(e,a)=>{if(1!=Ge.value){Ze.value.table_id=g(),Ze.value.meal_num=e,Ze.value.is_buffet=a?1:0;try{await G(Ze.value);Je()}catch(l){}}else Je()},la=()=>{H().then((e=>{Xe.value=e.data,Ve.value=!0}))},ta=t(!1),sa=()=>{ta.value=!0},ia=async e=>{if(e)try{await te({password:e});Ee.value=!0,je.value=h(),$e.value=je.value.table_no,ua()}catch(a){}else B({title:E("請輸入密碼"),icon:"none"})},ua=()=>{(()=>{ta.value=!1;const e=setTimeout((()=>{Ee.value,clearTimeout(e)}),300)})()},oa=t({name:"",logo:"",table_no:"",is_call_service:1,is_customer_order:1});t([]);return s((()=>{i()&&u()&&o({url:"/pages/index/opentable-index"})})),n((()=>{i()&&!u()&&((async()=>{h()&&_e()})(),(async()=>{try{const e=await y({table_id:g()});oa.value.table_no=e.data.table_no}catch(e){}})())})),c((()=>{var e;null==(e=ze.value)||e.showBuffet(!1,0)})),De(),r({success:e=>{Be.value.device_id=e.deviceId}}),(e,a)=>{const l=J(K("ti-layout-head"),se),t=w,s=M,o=N,n=Q,c=V,r=W,p=J(K("ti-input"),ne),m=J(K("ti-layout-table-list"),ce),h=J(K("ti-modal"),ie),y=X;return f(i)()&&!f(u)()?(d(),v(t,{key:0,class:"ti-page",onClick:a[5]||(a[5]=e=>f(j)())},{default:_((()=>[x(t,null,{default:_((()=>{var e;return[me.value?b("",!0):(d(),v(l,{key:0,ref_key:"refCallServer",ref:ze,onDoubleLogo:Ie,onRefresh:Fe,is_call_service:null==(e=f(de))?void 0:e.tablet.is_call_service},null,8,["is_call_service"]))]})),_:1}),me.value?b("",!0):(d(),v(t,{key:0,class:"ti-page-content"},{default:_((()=>{var e;return[x(t,{class:"ti-page-left"},{default:_((()=>[Ce.value?b("",!0):(d(),v(n,{key:0,onChange:we,class:"ti-swiper",current:he.value,autoplay:ye.value,circular:"",interval:"30000","indicator-dots":!0,"indicator-color":"#FFFFFF80","indicator-active-color":"#FFBE00"},{default:_((()=>{var e,a;return[(d(!0),C(T,null,k(null==(a=null==(e=f(de))?void 0:e.tablet)?void 0:a.carousel,((e,a)=>(d(),v(o,{class:"ti-swiper-item",key:a},{default:_((()=>["image"===f(U)(e.real_name)?(d(),v(s,{key:0,class:"ti-swiper-item-image",mode:"scaleToFill",src:e.file_path},null,8,["src"])):b("",!0),"video"===f(U)(e.real_name)?(d(),v(s,{key:1,class:"ti-swiper-item-image",mode:"scaleToFill",src:""})):b("",!0)])),_:2},1024)))),128))]})),_:1},8,["current","autoplay"])),Ce.value?(d(),v(n,{key:1,class:"ti-swiper"},{default:_((()=>[x(o,{class:"ti-swiper-item"},{default:_((()=>{var e;return[x(c,{onEnded:Te,class:"ti-swiper-item-video",controls:!1,"show-fullscreen-btn":!1,autoplay:!0,src:null==(e=ke.value)?void 0:e.file_path},null,8,["src"])]})),_:1})])),_:1})):b("",!0)])),_:1}),x(t,{class:"ti-page-right"},{default:_((()=>[x(t,{class:"ti-store-box"},{default:_((()=>[x(t,{class:"ti-store-item"},{default:_((()=>{var e;return[x(s,{class:"ti-store-logo",src:null==(e=f(de))?void 0:e.logo},null,8,["src"]),x(r,{class:"ti-store-name"},{default:_((()=>{var e;return[I(F(null==(e=f(de))?void 0:e.name),1)]})),_:1})]})),_:1}),x(t,{class:"ti-table-item"},{default:_((()=>[x(t,{class:"ti-table-number"},{default:_((()=>{var e;return[I(F(f(E)("當前桌號："))+F(null==(e=f(ve))?void 0:e.table_no),1)]})),_:1}),x(t,{class:"ti-table-button",onClick:He},{default:_((()=>[x(r,{class:"ti-table-button-text"},{default:_((()=>[I(F(f(E)("開始點餐")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),x(le,{show:Ke.value,title:"["+(null==(e=f(ve))?void 0:e.table_no)+"]"+f(E)("就餐人数"),placeholder:f(E)("請輸入人數"),onExit:Qe,onConfirm:Ne},null,8,["show","title","placeholder"]),x(le,{show:ta.value,title:f(E)("密碼"),password:!0,placeholder:f(E)("請輸入密碼"),onExit:ua,onConfirm:ia},null,8,["show","title","placeholder"])]})),_:1})),x(h,{show:Ee.value,title:f(E)("設置"),cancelText:f(E)("重置"),confirmText:f(E)("確定"),onCancel:Re,onConfirm:Se},{content:_((()=>[x(t,{class:"ti-item-input"},{default:_((()=>[x(t,{class:"ti-label-box"},{default:_((()=>[x(t,{class:"ti-label-left"},{default:_((()=>[x(r,{class:"ti-label-server"},{default:_((()=>[I(F(f(E)("服務器連接地址")),1)])),_:1})])),_:1}),x(t,{class:"ti-label-right",onClick:Oe},{default:_((()=>[x(r,{class:"ti-label-table"},{default:_((()=>[I(F($e.value?f(E)("已選 : ")+f($)($e.value,19):f(E)("查找桌位")),1)])),_:1})])),_:1})])),_:1}),x(t,{class:"ti-input-box"},{default:_((()=>[x(p,{type:"text",onInput:Ae,value:Be.value.ip,placeholder:f(E)("伺服器位址"),clearable:!1},null,8,["value","placeholder"]),x(t,{class:"ti-colon"},{default:_((()=>[I(":")])),_:1}),x(t,{class:"ti-input-port"},{default:_((()=>[x(p,{type:"number",onInput:Le,value:Be.value.port,placeholder:f(E)("端口"),clearable:!1},null,8,["value","placeholder"])])),_:1})])),_:1}),x(m,{show:Ue.value,"onUpdate:show":a[0]||(a[0]=e=>Ue.value=e),onConfirm:Pe},null,8,["show"])])),_:1})])),_:1},8,["show","title","cancelText","confirmText"]),x(h,{class:"ti-dialog-buffet",show:Ve.value,title:f(E)("自助餐"),onCancel:a[1]||(a[1]=e=>(Ze.value.buffet_ids=[],Ve.value=!1)),onConfirm:a[2]||(a[2]=e=>(Ve.value=!1,We.value=!0))},{content:_((()=>[x(t,{class:"ti-dialog-content"},{default:_((()=>[x(y,{class:"ti-buffet-scroll","scroll-y":""},{default:_((()=>[x(t,{class:"ti-buffet-list"},{default:_((()=>[(d(!0),C(T,null,k(Xe.value,(e=>(d(),v(t,{key:e.id,class:Y(["ti-buffet-item",{active:Ze.value.buffet_ids.includes(e.id),disabled:Ze.value.buffet_ids.length>0&&Ye.value!=e.is_comb}]),onClick:a=>(e=>{if(!(Ze.value.buffet_ids.length>0&&Ye.value!=e.is_comb))if(Ye.value=e.is_comb,0==Ye.value)Ze.value.buffet_ids=Ze.value.buffet_ids[0]!=e.id?[e.id]:[];else{const a=Ze.value.buffet_ids.indexOf(e.id);if(a>-1)Ze.value.buffet_ids.splice(a,1);else{if(Ze.value.buffet_ids.length>=2)return B({title:ae("最多只能选择{count}个",{count:2}),icon:"none"});Ze.value.buffet_ids.push(e.id)}}})(e)},{default:_((()=>[x(t,{class:"ti-buffet-name"},{default:_((()=>[I(F(e.name_text||e.name),1)])),_:2},1024),x(t,null,{default:_((()=>[x(r,{class:"ti-buffet-price"},{default:_((()=>[I(F(f(Z)(e.price)),1)])),_:2},1024),x(r,{class:"ti-buffet-subPrice"},{default:_((()=>[I(F(f(ee)(e.price)),1)])),_:2},1024)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title"]),x(h,{class:"ti-dialog-buffet",show:We.value,title:f(E)("提示"),onCancel:a[3]||(a[3]=e=>(We.value=!1,void(Ge.value=!1))),onConfirm:a[4]||(a[4]=e=>aa(Ze.value.meal_num,Ze.value.is_buffet))},{content:_((()=>[x(t,{class:"ti-dialog-content"},{default:_((()=>[x(y,{class:"ti-buffet-scroll","scroll-y":""},{default:_((()=>[x(t,{class:"ti-buffet-message"},{default:_((()=>[x(t,{class:"ti-buffet-case"}),x(t,{class:"ti-buffet-text"},{default:_((()=>[I(F(f(E)("如有剩餘食物，可能產生額外費用")),1)])),_:1})])),_:1}),x(t,{class:"ti-buffet-message"},{default:_((()=>[x(t,{class:"ti-buffet-case"}),x(t,{class:"ti-buffet-text"},{default:_((()=>[I(F(f(E)("點菜時請考慮您的飽食量，只訂購能夠完全食用的食品數量")),1)])),_:1})])),_:1}),x(t,{class:"ti-buffet-message"},{default:_((()=>[x(t,{class:"ti-buffet-case"}),x(t,{class:"ti-buffet-text"},{default:_((()=>[I(F(f(E)("對於食品和飲品的過度點單，可能會引發額外費用")),1)])),_:1})])),_:1}),x(t,{class:"ti-buffet-message"},{default:_((()=>[x(t,{class:"ti-buffet-case"}),x(t,{class:"ti-buffet-text"},{default:_((()=>[I(F(f(E)("如有多餘食物或飲品浪費的情況，我們可能會視情況追加費用")),1)])),_:1})])),_:1}),x(t,{class:"ti-buffet-tips"},{default:_((()=>[I(F(f(E)("我们鼓励客人谨慎点菜，仅订购会食用完的食品，避免剩菜问题和额外费用")),1)])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title"])])),_:1})):b("",!0)}}},[["__scopeId","data-v-bc6b1ea0"]]);export{re as default};
