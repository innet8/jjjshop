import{a5 as e,r as t,a6 as l,a7 as a,a8 as s,j as u,y as i,x as o,w as c,F as n,z as d,k as r,_ as v,A as _,B as p,l as f,a9 as m,Y as h,v as g,Z as y,U as b,aa as w,$ as x,ab as k,ac as C,h as A,ad as I,S,T,a0 as L,a1 as P,ae as U,af as F,t as N,ag as j,G as K,a4 as B,ah as R,d as D,ai as E,aj as O,ak as W,g as Q,al as $,o as Y,m as H,n as J,am as G,p as M,M as V,an as z,C as q,D as X,ao as Z,H as ee,I as te,J as le,K as ae,L as se,P as ue,c as ie,N as oe,O as ce}from"./index-ae73617f.js";import{a as ne,b as de,D as re,v as ve,_ as _e}from"./verify.810c1582.js";import{_ as pe,c as fe,e as me,f as he,u as ge,a as ye,b as be}from"./ti-layout-table-list.641276d4.js";const we=""+new URL("icon-ring-192350e1.svg",import.meta.url).href;const xe="./static/stepper-right.svg",ke="./static/stepper-left.svg",Ce=pe({__name:"dish-menu",props:{list:{type:Array,default:()=>[]},menuId:{type:Number,default:null}},emits:["update:menuId"],setup(e,{emit:w}){const x=e,k=t(0),C=t(0),A=t([]),I=t(!1),S=t(!1),T=t(0);l((()=>x.list),(async e=>{if(await a(),!e||0==e.length)return;const t=s().in(this);if(e.map(((e,l)=>{t.select(`#scroll-item-${l}`).boundingClientRect((e=>{if(!e)return;const t=A.value;t[l]=e.width+10,A.value=t})).exec()})),x.menuId>0){const e=x.list.findIndex((e=>e.category_id==x.menuId));e>-1&&L(e)}A.value.reduce(((e,t)=>e+t),0)>document.getElementById("ti-menu-box").offsetWidth?S.value=!0:S.value=!1}),{deep:!0,immediate:!0});const L=e=>{C.value=e,k.value=A.value.slice(0,e+1).reduce(((e,t)=>e+t),0)-(A.value[e]+100),w("update:menuId",x.list[e].category_id)},P=e=>{0!=e.detail.scrollLeft?I.value=!0:I.value=!1,!S.value&&T.value>e.detail.scrollLeft&&(S.value=!0),T.value=e.detail.scrollLeft},U=e=>{S.value=!1};function F(){k.value=T.value+m().screenWidth/2,T.value=k.value,I.value=!0}function N(){k.value=T.value-m().screenWidth/2,T.value=k.value,S.value=!0}return(e,t)=>{const l=h,a=g,s=y,m=b;return u(),i("div",{id:"ti-menu-box"},[o(s,{class:"ti-dish-menu","scroll-left":k.value,"scroll-x":"","enable-flex":"","scroll-with-animation":"",onScroll:P,onScrolltolower:U},{default:c((()=>[o(a,{class:"ti-menu-content"},{default:c((()=>[(u(!0),i(n,null,d(x.list,((t,s)=>(u(),r(a,{key:s,class:v(["ti-menu-item",{active:s==C.value}]),id:`scroll-item-${s}`,onClick:e=>L(s)},{default:c((()=>[o(l,{class:"ti-menu-title"},{default:c((()=>[_(p(0===s?e.$t(t.name_text):t.name_text),1)])),_:2},1024)])),_:2},1032,["id","class","onClick"])))),128))])),_:1})])),_:1},8,["scroll-left"]),S.value?(u(),r(a,{key:0,class:"stepper stepper-right",onClick:F},{default:c((()=>[o(m,{src:xe,mode:"scaleToFill"})])),_:1})):f("",!0),I.value?(u(),r(a,{key:1,class:"stepper stepper-left",onClick:N},{default:c((()=>[o(m,{src:ke,mode:"scaleToFill"})])),_:1})):f("",!0)])}}},[["__scopeId","data-v-f384f58e"]]),Ae=pe({__name:"dish-category",props:{categoryId:{type:Number,default:null}},emits:["update:categoryId","update:isSpecial"],setup(h,{emit:I}){const S=t([]),T=t(0),L=t(0),P=w((()=>{let e=(S.value.find((e=>e.category_id==T.value))||{}).child||[];return e&&e.length>0&&(e=[{name_text:x("全部"),category_id:0}].concat(e)),e})),U=w((()=>S.value.find((e=>e.category_id==T.value)))),F=w((()=>P.value.find((e=>e.category_id==L.value))));l((()=>T.value),(()=>{var e;B.value=!1,K.value=!1,P&&P.value.length>0&&(L.value=P.value[0].category_id,a((()=>{s().in(this).selectAll(".ti-secondary-item").boundingClientRect((function(e){e.reduce(((e,t)=>e+t.width),0)>document.getElementById("ti-dish-secondary-box").offsetWidth?B.value=!0:B.value=!1})).exec()}))),R.value=0,I("update:isSpecial",null==(e=U.value)?void 0:e.is_special),I("update:categoryId",T.value)}));const N=async(t,l)=>{try{const a=await function(t){return e("product.category/index",{},{isLoading:t})}(t);a.data.list&&(S.value=[{name_text:x("全部"),category_id:0}].concat(a.data.list),l&&(T.value=S.value[0].category_id))}catch(a){}};N(!0,!0),k("closeShowLanguage",(e=>{e.isSelectLanguage&&C()&&setTimeout((()=>{N(!1)}),500)})),k("refresh",(e=>{N(!1,!1)}));const j=t(0),K=t(!1),B=t(!1),R=t(0),D=e=>{0!=e.detail.scrollLeft?K.value=!0:K.value=!1,!B.value&&R.value>e.detail.scrollLeft&&(B.value=!0),R.value=e.detail.scrollLeft},E=e=>{B.value=!1};function O(){j.value=R.value+m().screenWidth/2,R.value=j.value,K.value=!0}function W(){j.value=R.value-m().screenWidth/2,R.value=j.value,B.value=!0}return(e,t)=>{const l=g,a=y,s=b;return u(),r(l,{class:"ti-category-box"},{default:c((()=>[o(Ce,{list:S.value,menuId:T.value,"onUpdate:menuId":t[0]||(t[0]=e=>T.value=e)},null,8,["list","menuId"]),o(l,{id:"ti-dish-secondary-box"},{default:c((()=>[o(a,{class:"ti-dish-secondary-menu","scroll-x":"","enable-flex":"","scroll-with-animation":"","scroll-left":j.value,onScroll:D,onScrolltolower:E},{default:c((()=>[o(l,{class:"ti-dish-secondary"},{default:c((()=>[(u(!0),i(n,null,d(A(P),((e,t)=>(u(),r(l,{key:t,class:v([{active:e.category_id==L.value},"ti-secondary-item"]),onClick:t=>{return l=e.category_id,L.value=l,I("update:isSpecial",null==(a=F.value)?void 0:a.is_special),void I("update:categoryId",L.value>0?L.value:T.value);var l,a}},{default:c((()=>[_(p(0===t?A(x)(e.name_text):e.name_text),1)])),_:2},1032,["class","onClick"])))),128))])),_:1})])),_:1},8,["scroll-left"]),B.value?(u(),r(l,{key:0,class:"stepper stepper-right",onClick:O},{default:c((()=>[o(s,{src:xe,mode:"scaleToFill"})])),_:1})):f("",!0),K.value?(u(),r(l,{key:1,class:"stepper stepper-left",onClick:W},{default:c((()=>[o(s,{src:ke,mode:"scaleToFill"})])),_:1})):f("",!0)])),_:1})])),_:1})}}},[["__scopeId","data-v-7e082338"]]);function Ie(t,l){return e("order.Order/getUnSendKitchen",t,{isLoading:l})}function Se(t){return e("order.Order/sendKitchen",t,{isLoading:!0,isMessage:!1})}const Te=pe({__name:"goods-detail",props:{show:{type:Boolean,default:!1},productId:{type:Number,default:null}},emits:["update:show","success"],setup(a,{emit:s}){const m=a,w=t({}),k=t(!1),C=t(!1),B=t({product_id:null,product_num:1,price:null,product_price:null,product_sku_id:null,attr:[],feed:[],bag_price:0,delivery:I()?30:40,describe:null});l((()=>m.show),(()=>{m.show&&R()}));const R=async()=>{var t,l,a,s,u,i,o,c,n,d;if(!k.value||m.productId)try{k.value=!0;const r=await(d=m.productId,e("product.product/detail",{product_id:d}));w.value=r.data,B.value.product_id=null==(t=w.value)?void 0:t.product_id,B.value.price=null==(l=w.value)?void 0:l.product_price,B.value.product_price=null==(a=w.value)?void 0:a.product_price,(null==(s=w.value)?void 0:s.sku)&&(null==(u=w.value)?void 0:u.sku.length)>0&&(null==(i=w.value)||i.sku.some((e=>{if(e.stock_num>0)return B.value.product_sku_id=e.product_sku_id,!0}))),(null==(o=w.value)?void 0:o.product_attr)&&(null==(c=w.value)?void 0:c.product_attr.length)>0&&(null==(n=w.value)||n.product_attr.map(((e,t)=>{(null==e?void 0:e.attribute_value)&&(null==e?void 0:e.attribute_value.length)>0?B.value.attr[t]=0:B.value.attr[t]=null}))),B.value.feed&&B.value.feed.length>0&&(B.value.feed=[])}catch(r){}finally{k.value=!1}},D=async()=>{var t,l,a,u,i,o,c,n,d;if(C.value)return;const r={...B.value};r.attr=r.attr.join(","),r.feed=r.feed.join(",");let v=[];(null==(t=w.value)?void 0:t.sku)&&(null==(l=w.value)?void 0:l.sku.length)>0&&v.push(null==(a=w.value)?void 0:a.sku.find((e=>e.product_sku_id==B.value.product_sku_id)).spec_name_text),(null==(u=w.value)?void 0:u.product_attr)&&(null==(i=w.value)?void 0:i.product_attr.length)&&(null==(o=w.value)||o.product_attr.map(((e,t)=>{(null==e?void 0:e.attribute_value)&&(null==e?void 0:e.attribute_value.length)>0&&(null==e?void 0:e.attribute_value[B.value.attr[t]])&&v.push(null==e?void 0:e.attribute_value[B.value.attr[t]])}))),(null==(c=w.value)?void 0:c.product_feed)&&(null==(n=w.value)?void 0:n.product_feed.length)>0&&(null==(d=w.value)||d.product_feed.map(((e,t)=>{E(t)&&(v.push(e.feed_name_text),r.price=U(r.price,null==e?void 0:e.price))}))),r.describe=v.join(";"),r.delivery=I()?30:40,r.order_id=F(),r.table_id=N();try{C.value=!0;const t=await function(t){return e("order.Order/add",t)}(r);1==t.code&&(j(t.data.order_id),K({title:t.msg,icon:"none"}),s("update:show",!1),setTimeout((()=>{s("success")}),100))}catch(_){}finally{C.value=!1}},E=e=>B.value.feed.indexOf(e)>-1,O=(e,t)=>B.value.attr[e]==t;return(e,t)=>{const l=b,a=g,k=h,I=y,U=S(T("ti-modal"),ne);return u(),r(U,{show:m.show,title:A(x)("商品詳情"),cancelText:A(x)("取消"),confirmText:A(x)("確定"),confirmLoading:C.value,onCancel:t[0]||(t[0]=e=>s("update:show",!1)),onConfirm:D},{content:c((()=>[o(a,{class:"ti-dialog-content"},{default:c((()=>[o(a,{class:"ti-detail-box"},{default:c((()=>[o(a,{class:"ti-detail-image"},{default:c((()=>{var e,t,a,s;return[(null==(e=w.value)?void 0:e.image)&&(null==(t=w.value)?void 0:t.image[0])&&(null==(a=w.value)?void 0:a.image[0].file_path)?(u(),r(l,{key:0,src:null==(s=w.value)?void 0:s.image[0].file_path,mode:"widthFix"},null,8,["src"])):f("",!0)]})),_:1}),o(a,{class:"ti-detail-con"},{default:c((()=>[o(a,{class:"ti-detail-title text-ellipsis"},{default:c((()=>{var e;return[_(p(null==(e=w.value)?void 0:e.product_name_text),1)]})),_:1}),o(a,{class:"ti-price-box"},{default:c((()=>[o(k,{class:"ti-detail-unit"},{default:c((()=>[_(p(A(x)("單價：")),1)])),_:1}),o(k,{class:"ti-detail-price"},{default:c((()=>{var e;return[_(p(A(L)((null==(e=w.value)?void 0:e.product_price)||0)),1)]})),_:1}),o(k,{class:"ti-detail-subPrice"},{default:c((()=>{var e;return[_(p(A(P)((null==(e=w.value)?void 0:e.product_price)||0)),1)]})),_:1})])),_:1}),o(a,{class:"ti-price-box"},{default:c((()=>[o(k,{class:"ti-detail-unit"},{default:c((()=>[_(p(A(x)("單位：")),1)])),_:1}),o(k,{class:"ti-detail-price"},{default:c((()=>{var e;return[_(p(null==(e=w.value)?void 0:e.product_unit_text),1)]})),_:1})])),_:1})])),_:1})])),_:1}),o(a,{class:"ti-detail-specs"},{default:c((()=>[o(I,{"scroll-y":""},{default:c((()=>[o(a,{class:"ti-specs-box"},{default:c((()=>{var e,t,l,s,m,h,g;return[(null==(e=w.value)?void 0:e.sku)&&(null==(t=w.value)?void 0:t.sku.length)>0?(u(),r(a,{key:0,class:"ti-specs-item"},{default:c((()=>[o(a,{class:"ti-specs-title"},{default:c((()=>[_(p(A(x)("規格")),1)])),_:1}),o(a,{class:"ti-specs-child"},{default:c((()=>{var e;return[(u(!0),i(n,null,d(null==(e=w.value)?void 0:e.sku,(e=>(u(),r(a,{key:e.product_sku_id,class:v([{active:e.product_sku_id==B.value.product_sku_id,disabled:e.stock_num<=0},"ti-child-item"]),onClick:t=>(e=>{e.stock_num<=0||B.value.product_sku_id!=e.product_sku_id&&(B.value.product_sku_id=e.product_sku_id)})(e)},{default:c((()=>[o(k,{class:"ti-child-name"},{default:c((()=>[_(p(e.spec_name_text),1)])),_:2},1024),o(k,{class:"ti-child-price"},{default:c((()=>[_(p(A(L)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024),o(k,{class:"ti-child-subPrice"},{default:c((()=>[_(p(A(P)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))]})),_:1})])),_:1})):f("",!0),(null==(l=w.value)?void 0:l.product_attr)&&(null==(s=w.value)?void 0:s.product_attr.length)>0?(u(!0),i(n,{key:1},d(null==(m=w.value)?void 0:m.product_attr,((e,t)=>(u(),r(a,{key:t,class:"ti-specs-item"},{default:c((()=>[o(a,{class:"ti-specs-title"},{default:c((()=>[_(p(e.attribute_name_text),1)])),_:2},1024),o(a,{class:"ti-specs-child"},{default:c((()=>[(u(!0),i(n,null,d(null==e?void 0:e.attribute_value_text,((e,l)=>(u(),r(a,{key:l,class:v([{active:O(t,l)},"ti-child-item"]),onClick:e=>((e,t)=>{B.value.attr[e]=t})(t,l)},{default:c((()=>[o(k,{class:"ti-child-name"},{default:c((()=>[_(p(e),1)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))])),_:2},1024)])),_:2},1024)))),128)):f("",!0),(null==(h=w.value)?void 0:h.product_feed)&&(null==(g=w.value)?void 0:g.product_feed.length)>0?(u(),r(a,{key:2,class:"ti-specs-item"},{default:c((()=>[o(a,{class:"ti-specs-title"},{default:c((()=>[_(p(A(x)("加料")),1)])),_:1}),o(a,{class:"ti-specs-child"},{default:c((()=>{var e;return[(u(!0),i(n,null,d(null==(e=w.value)?void 0:e.product_feed,((e,t)=>(u(),r(a,{key:t,class:v([{active:E(t)},"ti-child-item"]),onClick:e=>(e=>{const t=B.value.feed.indexOf(e);t>=0?B.value.feed.splice(t,1):B.value.feed.push(e)})(t)},{default:c((()=>[o(k,{class:"ti-child-name"},{default:c((()=>[_(p(e.feed_name_text),1)])),_:2},1024),o(k,{class:"ti-child-price"},{default:c((()=>[_(p(A(L)((null==e?void 0:e.price)||0)),1)])),_:2},1024),o(k,{class:"ti-child-subPrice"},{default:c((()=>[_(p(A(P)((null==e?void 0:e.price)||0)),1)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))]})),_:1})])),_:1})):f("",!0)]})),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title","cancelText","confirmText","confirmLoading"])}}},[["__scopeId","data-v-ab4078de"]]),Le=pe({__name:"dish-car-order-nav",emits:["car","confirm"],setup(e,{expose:l,emit:a}){const s=()=>{a("car")},i=()=>{a("confirm")},n=t(),d=t(!1),v=async()=>{var e;try{const t=await Ie({table_id:N()},!1);n.value=(null==(e=t.data)?void 0:e.detail)||{},n.value.totalNum>0?d.value=!0:d.value=!1}catch(t){}};return v(),l({getCarData:v}),(e,t)=>{const l=b,a=h,v=g;return u(),r(v,{class:"ti-car-order"},{default:c((()=>[o(v,{class:"ti-order-total",onClick:s},{default:c((()=>[o(l,{class:"ti-total-image",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE9SURBVHgB7ZjxrcIgEMY/Xt4AbvAYwRHc4DmKbuAG6gR1A92g3UA3sE6gTnAesZqG1gLKSf/oL7nQwKV8Be6AAj1DPR6IaMTF6NmgVIlUGDFsR2qSVUJ7I8iQIwWVKF2zWU3UBH2AhexJhtx8dFufPw5NF8gwYTu2jbxLkIYsmV3hEiQdYdoepdSCGn38OpzXbP+Qo2Q7YCAA9aqhyhNbyK6jHe+Zcy9PFrQgec52v11R9o0IayTe1IJKu6JL0B8S4EqM0lztii5BGvIELWoNeU52ReopC4qyAvL472PmWECyZAiF5LJ1Ti9uM8pDlMb9yKnxOWbNHHj/KjDwJs4pq8PTN+VizFb4DHuofxD88qW1MGcx/UPFjFsi5RzLv84nmTr0eBL3OEPNnxGrmP7vCDKXuk2V1Bax/Qd8uQE+N6CHpHz4IAAAAABJRU5ErkJggg=="}),o(a,{class:"ti-total-price"},{default:c((()=>{var e;return[_(p(A(L)((null==(e=n.value)?void 0:e.totalPrice)||0)),1)]})),_:1}),o(a,{class:"ti-total-subPrice"},{default:c((()=>{var e;return[_(p(A(P)((null==(e=n.value)?void 0:e.totalPrice)||0)),1)]})),_:1})])),_:1}),d.value?(u(),r(v,{key:0,class:"ti-total-badge-box"},{default:c((()=>[o(a,{class:"ti-total-badge"},{default:c((()=>{var e;return[_(p(null==(e=n.value)?void 0:e.totalNum),1)]})),_:1})])),_:1})):f("",!0),o(v,{class:"ti-order-btn",onClick:i},{default:c((()=>[o(a,{class:"ti-btn-text"},{default:c((()=>[_(p(e.$t("下單")),1)])),_:1})])),_:1})])),_:1})}}},[["__scopeId","data-v-a086c2c0"]]),Pe=pe({__name:"cart-number",props:{productItem:{type:Object,default:()=>({})}},emits:["change"],setup(l,{emit:a}){const s=l,i=t(!1),n=async t=>{var l,u;const o={order_product_id:null==(l=s.productItem)?void 0:l.order_product_id,product_num:null==(u=s.productItem)?void 0:u.total_num,type:t};"up"==t?o.product_num+=1:o.product_num-=1;try{i.value=!0;const t=await function(t){return e("order.Order/sub",t)}(o);1==t.code&&a("change")}catch(c){}finally{i.value=!1}};return(e,t)=>{const a=g;return u(),r(a,{class:"ti-number-box",onClick:t[2]||(t[2]=B((()=>{}),["stop"]))},{default:c((()=>[o(a,{class:"ti-number-btn ti-number-minus",disabled:!1,onClick:t[0]||(t[0]=e=>n("down"))},{default:c((()=>[o(a,{class:"ti-number-minus-reduce"})])),_:1}),o(a,{class:"ti-number-input"},{default:c((()=>[_(p(l.productItem.total_num),1)])),_:1}),o(a,{class:"ti-number-btn ti-number-plus",disabled:!1,onClick:t[1]||(t[1]=e=>n("up"))},{default:c((()=>[o(a,{class:"ti-number-plus-add"}),o(a,{class:"ti-number-plus-add2"})])),_:1})])),_:1})}}},[["__scopeId","data-v-685bd22e"]]),Ue=pe({__name:"dish-car-ordering-list",emits:["success","change","sendkitchenFail"],setup(e,{emit:l}){const a=t(!1),s=t(),v=t(),m=t({table_id:""}),b=async e=>{var t;m.table_id=N();try{const e=await Ie(m,!1);s.value=e.data.detail,v.value=(null==(t=e.data.detail)?void 0:t.unSendKitchenProduct)||[],l("change")}catch(a){}},w=async e=>{try{a.value=!0;const e=await Se({table_id:N()});K({title:x(e.msg),icon:"none"}),setTimeout((()=>{l("success")}),500)}catch(t){l("sendkitchenFail",t)}finally{a.value=!1}};return b(),k("handleDelProuct",(e=>{b()})),(e,t)=>{const l=g,a=h,m=y,k=S(T("ti-button"),fe),C=S(T("ti-empty-data"),me);return u(),r(l,{class:"ti-shop-list-box"},{default:c((()=>{var e,h;return[(null==(e=v.value)?void 0:e.length)>0?(u(),r(l,{key:0,class:"ti-shop-list"},{default:c((()=>[o(l,null,{default:c((()=>[o(l,{class:"ti-cart-shop-head"},{default:c((()=>[o(l,{class:"ti-shop-head-title"},{default:c((()=>[_(p(A(x)("商品名稱")),1)])),_:1}),o(l,{class:"ti-shop-head-money"},{default:c((()=>[_(p(A(x)("金額")),1)])),_:1}),o(l,{class:"ti-shop-head-num"},{default:c((()=>[_(p(A(x)("數量")),1)])),_:1})])),_:1})])),_:1}),o(l,{class:"ti-scroll-box"},{default:c((()=>[o(m,{class:"ti-shop-scroll","scroll-y":""},{default:c((()=>[o(l,{class:"ti-shop-box"},{default:c((()=>[(u(!0),i(n,null,d(v.value,((e,s)=>(u(),r(l,{class:"ti-shop-item",key:e},{default:c((()=>[o(l,{class:"ti-shop-item-box"},{default:c((()=>[o(l,{class:"ti-shop-box"},{default:c((()=>[o(l,{class:"ti-shop-body-top"},{default:c((()=>[o(l,{class:"ti-shop-title text-ellipsis"},{default:c((()=>[_(p(e.product_name_text),1)])),_:2},1024),o(l,{class:"ti-shop-spec"},{default:c((()=>[_(p(e.product_attr),1)])),_:2},1024)])),_:2},1024),o(l,{class:"ti-shop-body-money"},{default:c((()=>[o(a,{class:"ti-shop-price"},{default:c((()=>[_(p(A(L)((null==e?void 0:e.total_price)||0)),1)])),_:2},1024),o(a,{class:"ti-shop-subPrice"},{default:c((()=>[_(p(A(P)((null==e?void 0:e.total_price)||0)),1)])),_:2},1024)])),_:2},1024),o(l,{class:"ti-shop-body-number"},{default:c((()=>[o(Pe,{productItem:e,onChange:t[0]||(t[0]=e=>b())},null,8,["productItem"])])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})])),_:1}),o(l,{class:"ti-content-bottom"},{default:c((()=>[o(l,{class:"ti-car-shop-bottom"},{default:c((()=>[o(l,{class:"ti-shop-bottom-item"},{default:c((()=>[o(l,null,{default:c((()=>[o(a,{class:"ti-shop-bottom-text"},{default:c((()=>{var e;return[_(p(A(x)("共")+((null==(e=s.value)?void 0:e.unSendKitchenProductTotalNum)||0)+A(x)("件")),1)]})),_:1})])),_:1}),o(l,null,{default:c((()=>[o(a,{class:"ti-shop-bottom-text"},{default:c((()=>[_(p(A(x)("小計：")),1)])),_:1}),o(a,{class:"ti-shop-bottom-price"},{default:c((()=>{var e;return[_(p(A(L)((null==(e=s.value)?void 0:e.unSendKitchenProductTotalPrice)||0)),1)]})),_:1}),o(a,{class:"ti-shop-bottom-subPrice"},{default:c((()=>{var e;return[_(p(A(P)((null==(e=s.value)?void 0:e.unSendKitchenProductTotalPrice)||0)),1)]})),_:1})])),_:1})])),_:1})])),_:1}),o(k,{title:A(x)("確認下單"),type:"primary",onClick:w},null,8,["title"])])),_:1})])),_:1})):f("",!0),(null==(h=v.value)?void 0:h.length)<=0?(u(),r(l,{key:1,class:"ti-empty-data-box"},{default:c((()=>[o(C,{title:A(x)("當前無待下單商品")},null,8,["title"])])),_:1})):f("",!0)]})),_:1})}}},[["__scopeId","data-v-c8242529"]]),Fe=pe({__name:"dish-car-ordered-list",setup(l){const a=t([]);(async()=>{try{const l=await(t={table_id:N()},e("order.Order/getSendKitchen",t));a.value=l.data.list||[]}catch(l){}var t})();return(e,t)=>{const l=g,s=h,v=y,m=S(T("ti-empty-data"),me);return u(),r(l,{class:"ti-shop-list"},{default:c((()=>[Object.keys(a.value).length>0?(u(),r(v,{key:0,class:"ti-shop-scroll","scroll-y":""},{default:c((()=>[(u(!0),i(n,null,d(a.value,((e,t)=>(u(),r(l,{class:"ti-shop-item",key:t},{default:c((()=>[o(l,{class:"ti-shop-time-top"}),o(l,{class:"ti-shop-time-box"},{default:c((()=>[_(p(e.date+" "+A(x)("下單")),1)])),_:2},1024),(u(!0),i(n,null,d(e.plist,((t,a)=>(u(),r(l,{key:a},{default:c((()=>[o(l,{class:"ti-shop-item-box"},{default:c((()=>[o(l,{class:"ti-shop-box"},{default:c((()=>[o(l,{class:"ti-shop-body-top"},{default:c((()=>[o(l,{class:"ti-shop-title text-ellipsis"},{default:c((()=>[_(p(t.product_name_text),1)])),_:2},1024),o(l,{class:"ti-shop-spec"},{default:c((()=>[_(p(t.product_attr),1)])),_:2},1024)])),_:2},1024),o(l,{class:"ti-shop-body-money"},{default:c((()=>[o(s,{class:"ti-shop-price"},{default:c((()=>[_(p(A(L)((null==t?void 0:t.total_price)||0)),1)])),_:2},1024),o(s,{class:"ti-shop-subPrice"},{default:c((()=>[_(p(A(P)((null==t?void 0:t.total_price)||0)),1)])),_:2},1024)])),_:2},1024),o(l,{class:"ti-shop-body-state"},{default:c((()=>[o(l,{class:"ti-state-left"},{default:c((()=>[_(p(t.finish_num),1)])),_:2},1024),o(l,{class:"ti-state-line"},{default:c((()=>[_("/")])),_:1}),o(l,{class:"ti-state-right"},{default:c((()=>[_(p(t.total_num),1)])),_:2},1024),o(l,{class:"ti-state-text"},{default:c((()=>{return[_(p((e=t.kitchen_status,x(0===e?"製作中":1===e?"已完成":"未知"))),1)];var e})),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024),a!=e.length-1?(u(),r(l,{key:0,class:"ti-shop-item-box-bottom-border"})):f("",!0)])),_:2},1024)))),128))])),_:2},1024)))),128))])),_:1})):f("",!0),Object.keys(a.value).length<=0?(u(),r(m,{key:1,class:"ti-empty-data",title:A(x)("當前無已下單商品")},null,8,["title"])):f("",!0)])),_:1})}}},[["__scopeId","data-v-ab65e64e"]]),Ne=pe({__name:"goods-not-enough",props:{show:{type:Boolean,default:!1},productList:{type:Array,default:[]}},emits:["update:show","confirm"],setup(e,{emit:t}){const l=e,a=()=>{t("confirm")};return(s,v)=>{const f=h,m=g,b=y,w=S(T("ti-modal"),ne);return u(),r(w,{class:"ti-action-tip",show:l.show,isCancelShow:!1,title:s.$t("温馨提示"),confirmText:s.$t("確定"),onCancel:v[0]||(v[0]=e=>t("update:show",!1)),onConfirm:a},{content:c((()=>[o(m,{class:"ti-dialog-content"},{default:c((()=>[o(m,{class:"ti-detail-box"},{default:c((()=>[o(f,{class:"ti-detail-des"},{default:c((()=>[_(p(s.$t("商品庫存不足，請重新選擇")),1)])),_:1})])),_:1}),o(m,{class:"ti-detail-specs"},{default:c((()=>[o(b,{"scroll-y":""},{default:c((()=>[(u(!0),i(n,null,d(e.productList,((e,t)=>(u(),r(m,{class:"ti-specs-box"},{default:c((()=>[o(m,{class:"ti-specs-item"},{default:c((()=>[o(m,{class:"ti-specs-title"},{default:c((()=>[_(p(e.product_name_text),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),256))])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title","confirmText"])}}},[["__scopeId","data-v-a9bc6e2e"]]),je=pe({__name:"dish-list",emits:["success"],setup(a,{emit:s}){const m=t(!1),w=t({category_id:null,shop_supplier_id:null,page:1,list_rows:30}),I=t([]),U=t(!1),F=t(),j=t(!1),B=t(!1),Q=t(0);t(!1);const $=t(!1),Y=t(!1),H=t("");t(!1);const J=t(!1);l((()=>w.value.category_id),(()=>{z()}));const G=()=>{fe.value.getCarData()},M=()=>{j.value&&(w.value.page+=1,X())},V=e=>{Y.value=!0,H.value=e},z=()=>{w.value.page=1,w.value.shop_supplier_id=R(),X(!0)},q=t(0),X=async t=>{var l,a,s,u,i,o;if(U.value)return;const c={...w.value};c.category_id||(c.category_id=null),1==q.value&&(c.is_special=1);try{t&&(U.value=!0);const n=await function(t){return e("product.product/index",t,{isLoading:!1})}(c);1==w.value.page&&(I.value=[]),I.value=I.value.concat((null==(a=null==(l=n.data)?void 0:l.list)?void 0:a.data)||[]),j.value=(null==(u=null==(s=n.data)?void 0:s.list)?void 0:u.last_page)>(null==(o=null==(i=n.data)?void 0:i.list)?void 0:o.current_page)}catch(n){}finally{t&&(U.value=!1)}};z(),k("closeShowLanguage",(e=>{e.isSelectLanguage&&C()&&setTimeout((()=>{z()}),500)})),k("refresh",(e=>{z()})),t([]);const Z=t(),ee=()=>{Z.value=!0,ve.value=!0},te=()=>{ae(!1)},le=t([]),ae=async e=>{var t;try{const l=await Ie({table_id:N()},e);le.value=(null==(t=l.data.detail)?void 0:t.unSendKitchenProduct)||[],le.value.length>0?ie():(Z.value=!0,ve.value=!1)}catch(l){}},se=t([]),ue=t(!1),ie=async()=>{try{const e=await Se({table_id:N()});K({title:x(e.msg),icon:"none"}),setTimeout((()=>{s("success"),fe.value.getCarData(),Z.value=!0,ve.value=!1}),300)}catch(e){ce(e)}},oe=(e,t)=>{e||(Z.value=!1)},ce=e=>{0==e.data.length?V(e.msg):(se.value=e.data,ue.value=!0)};t([]);const re=async()=>{ue.value=!1},ve=t(!0),_e=e=>{ve.value=e},pe=()=>{ve.value=!1};ve.value=!0;const fe=t(),ge=t(-1);return D((()=>{k("globalLock",(e=>{$.value=1==e})),k("remind",(e=>{if(!(-1!=parseInt(e.buffet_expired_time)))return;const t=e.buffet_remaining_time,l=60*parseInt(e.minute);t<l&&ge.value>l&&(Q.value=e.minute,B.value=!0),ge.value=t})),k("buffetOver",(e=>{const t=J.value;J.value=0==e,J.value!=t&&1==J.value&&(B.value=!0)}))})),E((()=>{O("globalLock"),O("closeShowLanguage"),O("refresh")})),(e,t)=>{const l=S(T("ti-loading"),de),a=b,s=h,k=g,C=S(T("ti-empty-data"),me),N=y,R=S(T("ti-drawer"),he),D=S(T("ti-modal"),ne);return u(),i(n,null,[o(k,{class:"ti-dish-box"},{default:c((()=>[o(Ae,{categoryId:w.value.category_id,"onUpdate:categoryId":t[0]||(t[0]=e=>w.value.category_id=e),isSpecial:q.value,"onUpdate:isSpecial":t[1]||(t[1]=e=>q.value=e)},null,8,["categoryId","isSpecial"]),o(k,{class:"ti-dish-list"},{default:c((()=>[o(N,{class:"ti-scroll","scroll-y":"","lower-threshold":50,onScrolltolower:M},{default:c((()=>[U.value?(u(),r(l,{key:0})):I.value&&I.value.length>0?(u(),i(n,{key:1},[o(k,{class:"ti-dish-goods"},{default:c((()=>[(u(!0),i(n,null,d(I.value,((e,t)=>(u(),r(k,{key:t,class:v([{"sold-out":e.product_stock<=0||1==e.limit_num_status},"ti-goods-item"]),onClick:t=>(e=>e.product_stock<=0?K({title:x("已售罄"),icon:"none"}):1==e.limit_num_status?K({title:x("已限購"),icon:"none"}):void(1!=J.value||1!=e.is_buffet?(m.value=!0,F.value=e.product_id):V(x("用餐時間已到，無法繼續下單"))))(e)},{default:c((()=>[o(k,{class:"ti-goods-image"},{default:c((()=>[e.image&&e.image[0]&&e.image[0].file_path?(u(),r(a,{key:0,src:e.image[0].file_path,mode:"scaleToFill"},null,8,["src"])):f("",!0),e.product_stock<=0?(u(),r(s,{key:1,class:"sold-out-text"},{default:c((()=>[_(p(A(x)("已售罄")),1)])),_:1})):f("",!0),1==e.limit_num_status?(u(),r(s,{key:2,class:"sold-out-text"},{default:c((()=>[_(p(A(x)("已限購")),1)])),_:1})):f("",!0)])),_:2},1024),o(k,{class:"ti-goods-content"},{default:c((()=>[o(k,{class:"ti-goods-title line-clamp-2"},{default:c((()=>[_(p(e.product_name_text),1)])),_:2},1024),o(k,{class:"ti-price-box"},{default:c((()=>[o(s,{class:"ti-goods-price"},{default:c((()=>[_(p(A(L)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024),o(s,{class:"ti-goods-subPrice"},{default:c((()=>[_(p(A(P)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),e.limit_num&&e.limit_num>0?(u(),r(k,{key:0,class:"ti-restriction"},{default:c((()=>[_(p(A(x)("限購{count}份",{count:e.limit_num||0})),1)])),_:2},1024)):f("",!0)])),_:2},1032,["class","onClick"])))),128))])),_:1}),o(l,{status:j.value?"loading":"no-more"},null,8,["status"])],64)):(u(),r(C,{key:2}))])),_:1})])),_:1}),o(k,{class:"ti-car-order-nav"},{default:c((()=>[o(Le,{ref_key:"carRef",ref:fe,onCar:ee,onConfirm:te},null,512)])),_:1})])),_:1}),o(Te,{show:m.value,"onUpdate:show":t[2]||(t[2]=e=>m.value=e),productId:F.value,onSuccess:G},null,8,["show","productId"]),o(Ne,{style:{"z-index":"9999"},show:ue.value,"onUpdate:show":t[3]||(t[3]=e=>ue.value=e),productList:se.value,onConfirm:re},null,8,["show","productList"]),o(R,{show:Z.value,width:603.992,title:A(x)("我點的菜"),maskClick:!0,onChange:oe},{content:c((()=>[o(k,{class:"ti-drawer-content"},{default:c((()=>[o(k,{class:"ti-content-head"},{default:c((()=>[o(k,{class:"ti-switch-box"},{default:c((()=>[o(k,{class:v(ve.value?"ti-switch-on":"ti-switch-off"),onClick:t[4]||(t[4]=e=>_e(!0))},{default:c((()=>[o(s,{class:v(ve.value?"ti-switch-text-on":"ti-switch-text-off")},{default:c((()=>[_(p(A(x)("未下單")),1)])),_:1},8,["class"])])),_:1},8,["class"]),o(k,{class:"ti-switch-space"}),o(k,{class:v(ve.value?"ti-switch-off":"ti-switch-on"),onClick:t[5]||(t[5]=e=>_e(!1))},{default:c((()=>[o(s,{class:v(ve.value?"ti-switch-text-off":"ti-switch-text-on")},{default:c((()=>[_(p(A(x)("已下單")),1)])),_:1},8,["class"])])),_:1},8,["class"])])),_:1})])),_:1}),ve.value?(u(),r(Ue,{key:0,onSuccess:pe,onChange:G,onSendkitchenFail:ce})):f("",!0),ve.value?f("",!0):(u(),r(Fe,{key:1}))])),_:1})])),footer:c((()=>[o(k)])),_:1},8,["show","width","title"]),o(D,{class:"ti-action-tips",show:B.value,"onUpdate:show":t[6]||(t[6]=e=>B.value=e),isCancelShow:!1,content:J.value?A(x)("如有需要，請呼叫服務員"):A(x)("請在剩餘時間完成選購"),onConfirm:t[7]||(t[7]=e=>B.value=!1)},{title:c((()=>[o(k,{class:"warning-header"},{default:c((()=>[o(k,{class:"warning-image-round"},{default:c((()=>[o(a,{class:"warning-image",src:we})])),_:1}),J.value?(u(),r(k,{key:1,class:"warning-text"},{default:c((()=>[_(p(A(x)("時間結束")),1)])),_:1})):(u(),r(k,{key:0,class:"warning-text"},{default:c((()=>[o(s,null,{default:c((()=>[_(p(A(x)("剩余")),1)])),_:1}),o(s,{class:"warning-text red"},{default:c((()=>[_(p(Q.value),1)])),_:1}),o(s,null,{default:c((()=>[_(p(A(x)("分鐘")),1)])),_:1})])),_:1}))])),_:1})])),default:c((()=>[W("template",null,[o(k)])])),_:1},8,["show","content"]),o(D,{class:"ti-action-tips",show:$.value,"onUpdate:show":t[8]||(t[8]=e=>$.value=e),isCancelShow:!1,isConfirmShow:!1},{title:c((()=>[o(k,{class:"warning-header"},{default:c((()=>[o(k,{class:"warning-image-round"},{default:c((()=>[o(a,{class:"warning-image",src:we})])),_:1}),o(k,{class:"warning-text"},{default:c((()=>[_(p(A(x)("订单已锁定")),1)])),_:1})])),_:1})])),footer:c((()=>[o(k)])),_:1},8,["show"]),o(D,{class:"ti-action-tips",show:Y.value,"onUpdate:show":t[9]||(t[9]=e=>Y.value=e),isCancelShow:!1,isConfirmShow:!0,onConfirm:t[10]||(t[10]=e=>Y.value=!1),title:A(x)("溫馨提示"),content:H.value},{title:c((()=>[o(k,{class:"warning-header"},{default:c((()=>[o(k,{class:"warning-image-round"},{default:c((()=>[o(a,{class:"warning-image",src:we})])),_:1}),o(k,{class:"warning-text"},{default:c((()=>[_(p(A(x)("温馨提示")),1)])),_:1})])),_:1})])),_:1},8,["show","title","content"])],64)}}},[["__scopeId","data-v-72887b8b"]]),Ke=pe({__name:"opentable-index",setup(e){ge(),t(!1);const l=()=>{F()},a=()=>{Z("refresh",{})},s=t(),i=t("");t([]);const n=t(),d=t(!1),v=t({ip:"",port:"",device_id:""}),f=()=>{const e=H();v.value.ip=(null==e?void 0:e.ip)||J()||"127.0.0.1",v.value.port=(null==e?void 0:e.port)||"8080"},m=e=>{v.value.ip=e},y=e=>{v.value.port=e},b=async()=>{var e;const t={...v.value};if(t.ip)if(t.port)try{const l=await ee(te(`${null==t?void 0:t.ip}:${t.port}`));le(t),ae(l.data.app_id),se(l.data.shop_supplier_id),V(null==(e=l.data)?void 0:e.currency),setTimeout((()=>{d.value=!0}),150)}catch(l){K({title:x("绑定失败"),icon:"none"})}else K({title:x("請輸入連接埠"),icon:"none"});else K({title:x("請輸入伺服器位址"),icon:"none"})},w=e=>{d.value=!1,e&&(n.value=e,i.value=e.table_no)},I=()=>{f(),i.value=M().table_no,n.value=M()},L=async()=>{var e;const t={...v.value};if(t.ip)if(t.port)try{const l=await ee(te(`${null==t?void 0:t.ip}:${t.port}`));if(!n.value)return void K({title:x("請查找桌位"),icon:"none"});le(t),ae(l.data.app_id),se(l.data.shop_supplier_id),V(null==(e=l.data)?void 0:e.currency),setTimeout((()=>{P()}),150)}catch(l){K({title:x("绑定失败"),icon:"none"})}else K({title:x("請輸入連接埠"),icon:"none"});else K({title:x("請輸入伺服器位址"),icon:"none"})},P=async()=>{if(N()===n.value.table_id)return K({title:x("绑定成功"),icon:"none"}),s.value=!1,ue(!1),void setTimeout((()=>{ie({url:"/pages/index/index"})}),150);try{await oe({table_id:n.value.table_id,old_table_id:N()});ce(n.value),K({title:x("绑定成功"),icon:"none"}),s.value=!1,ue(!1),setTimeout((()=>{ie({url:"/pages/index/index"})}),150)}catch(e){}},U=t(!1),F=()=>{U.value=!0},j=async e=>{if(e)try{await ve({password:e});s.value=!0,n.value=M(),i.value=n.value.table_no,B()}catch(t){}else K({title:x("請輸入密碼"),icon:"none"})},B=()=>{U.value=!1};f(),Q({success:e=>{v.value.device_id=e.deviceId}});const R=t();$((()=>{clearTimeout(R.value)}));const D=t({name:"",logo:"",tableNo:"",is_call_service:1}),W=async e=>{var t,l,a;if(C())try{const s=await G(e);D.value.name=s.data.name,D.value.logo=s.data.logo,D.value.tableNo=M().table_no,D.value.is_call_service=parseInt(null==(l=null==(t=null==s?void 0:s.data)?void 0:t.tablet)?void 0:l.is_call_service),V(null==(a=s.data)?void 0:a.currency),z(s)}catch(s){}};return k("refresh",(e=>{W(!1)})),Y((()=>{W(!1)})),E((()=>{O("refresh")})),(e,t)=>{const n=S(T("ti-layout-head"),_e),f=g,k=h,C=S(T("ti-input"),ye),P=S(T("ti-layout-table-list"),be),F=S(T("ti-modal"),ne);return u(),r(f,{class:"ti-page",onClick:t[1]||(t[1]=e=>A(X)())},{default:c((()=>[o(f,null,{default:c((()=>[o(n,{isPay:!0,isTableNo:!0,onDoubleLogo:l,onRefresh:a,is_call_service:D.value.is_call_service},null,8,["is_call_service"])])),_:1}),o(re,{show:U.value,title:A(x)("密碼"),password:!0,placeholder:A(x)("請輸入密碼"),onExit:B,onConfirm:j},null,8,["show","title","placeholder"]),o(je),o(F,{show:s.value,title:A(x)("設置"),cancelText:A(x)("重置"),confirmText:A(x)("確定"),onCancel:I,onConfirm:L},{content:c((()=>[o(f,{class:"ti-item-input"},{default:c((()=>[o(f,{class:"ti-label-box"},{default:c((()=>[o(f,{class:"ti-label-left"},{default:c((()=>[o(k,{class:"ti-label-server"},{default:c((()=>[_(p(A(x)("服務器連接地址")),1)])),_:1})])),_:1}),o(f,{class:"ti-label-right",onClick:b},{default:c((()=>[o(k,{class:"ti-label-table"},{default:c((()=>[_(p(i.value?A(x)("已選 : ")+A(q)(i.value,19):A(x)("查找桌位")),1)])),_:1})])),_:1})])),_:1}),o(f,{class:"ti-input-box"},{default:c((()=>[o(C,{type:"text",onInput:m,value:v.value.ip,placeholder:A(x)("伺服器位址"),clearable:!1},null,8,["value","placeholder"]),o(f,{class:"ti-colon"},{default:c((()=>[_(":")])),_:1}),o(f,{class:"ti-input-port"},{default:c((()=>[o(C,{type:"number",onInput:y,value:v.value.port,placeholder:A(x)("端口"),clearable:!1},null,8,["value","placeholder"])])),_:1})])),_:1})])),_:1}),o(P,{show:d.value,"onUpdate:show":t[0]||(t[0]=e=>d.value=e),onConfirm:w},null,8,["show"])])),_:1},8,["show","title","cancelText","confirmText"])])),_:1})}}},[["__scopeId","data-v-9de2f4fb"]]);export{Ke as default};
