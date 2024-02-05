import{r as e,J as t,K as a,L as l,d as s,e as u,w as i,k as o,l as c,F as d,m as n,M as r,n as v,t as _,E as p,j as f,N as h,O as m,$ as y,P as g,Q as b,u as x,R as w,z as k,A,f as I,T as C,v as T,U as P,s as S,B as L,I as U,V as N,W as j,g as K,X as D,o as F,h as O,p as R,q as B,y as E,b as Q,x as $}from"./index-513fef0a.js";import{a as J,b as M,D as V,v as Y,_ as q}from"./verify.d8cb007d.js";import{$ as H,_ as z,p as G,q as W,r as X,n as Z,w as ee,x as te,u as ae,g as le,a as se,b as ue,c as ie,s as oe,d as ce,e as de,v as ne,h as re,i as ve,j as _e,l as pe,m as fe}from"./baseinfo.80966835.js";const he=z({__name:"dish-menu",props:{list:{type:Array,default:()=>[]},menuId:{type:Number,default:null}},emits:["update:menuId"],setup(m,{emit:y}){const g=m,b=e(0),x=e(0),w=e([]);t((()=>g.list),(async e=>{if(await a(),!e||0==e.length)return;const t=l().in(this);if(e.map(((e,a)=>{t.select(`#scroll-item-${a}`).boundingClientRect((e=>{if(!e)return;const t=w.value;t[a]=e.width+10,w.value=t})).exec()})),g.menuId>0){const e=g.list.findIndex((e=>e.category_id==g.menuId));e>-1&&k(e)}}),{deep:!0,immediate:!0});const k=e=>{x.value=e,b.value=w.value.slice(0,e+1).reduce(((e,t)=>e+t),0)-(w.value[e]+100),y("update:menuId",g.list[e].category_id)};return(e,t)=>{const a=p,l=f,m=h;return s(),u(m,{class:"ti-dish-menu","scroll-left":b.value,"scroll-x":"","enable-flex":"","scroll-with-animation":""},{default:i((()=>[o(l,{class:"ti-menu-content"},{default:i((()=>[(s(!0),c(d,null,n(g.list,((t,c)=>(s(),u(l,{key:c,class:r(["ti-menu-item",{active:c==x.value}]),id:`scroll-item-${c}`,onClick:e=>k(c)},{default:i((()=>[o(a,{class:"ti-menu-title"},{default:i((()=>[v(_(0===c?e.$t(t.name_text):t.name_text),1)])),_:2},1024)])),_:2},1032,["id","class","onClick"])))),128))])),_:1})])),_:1},8,["scroll-left"])}}},[["__scopeId","data-v-440ee506"]]),me=z({__name:"dish-category",props:{categoryId:{type:Number,default:null}},emits:["update:categoryId"],setup(a,{emit:l}){const p=e([]),h=e(0),w=e(0),k=m((()=>{let e=(p.value.find((e=>e.category_id==h.value))||{}).child||[];return e&&e.length>0&&(e=[{name_text:y("全部"),category_id:0}].concat(e)),e})),A=m((()=>p.value.find((e=>e.category_id==h.value)))),I=m((()=>k.value.find((e=>e.category_id==w.value))));t((()=>h.value),(()=>{var e;k&&k.length>0&&(w.value=k.value[0].category_id),l("update:isSpecial",null==(e=A.value)?void 0:e.is_special),l("update:categoryId",h.value)}));const C=async(e,t)=>{try{const a=await function(e){return H("product.category/index",{},{isLoading:e})}(e);a.data.list&&(p.value=[{name_text:y("全部"),category_id:0}].concat(a.data.list),t&&(h.value=p.value[0].category_id))}catch(a){}};return C(!0,!0),g("closeShowLanguage",(e=>{e.isSelectLanguage&&b()&&setTimeout((()=>{C(!1)}),500)})),g("refresh",(e=>{C(!1,!1)})),(e,t)=>{const a=f;return s(),u(a,{class:"ti-category-box"},{default:i((()=>[o(he,{list:p.value,menuId:h.value,"onUpdate:menuId":t[0]||(t[0]=e=>h.value=e)},null,8,["list","menuId"]),o(a,{class:"ti-dish-secondary"},{default:i((()=>[(s(!0),c(d,null,n(x(k),((e,t)=>(s(),u(a,{key:t,class:r([{active:e.category_id==w.value},"ti-secondary-item"]),onClick:t=>{return a=e.category_id,w.value=a,l("update:isSpecial",null==(s=I.value)?void 0:s.is_special),void l("update:categoryId",w.value>0?w.value:h.value);var a,s}},{default:i((()=>[v(_(0===t?x(y)(e.name_text):e.name_text),1)])),_:2},1032,["class","onClick"])))),128))])),_:1})])),_:1})}}},[["__scopeId","data-v-8f509e4e"]]);function ye(e,t){return H("order.Order/getUnSendKitchen",e,{isLoading:t})}function ge(e){return H("order.Order/sendKitchen",e)}const be=z({__name:"goods-detail",props:{show:{type:Boolean,default:!1},productId:{type:Number,default:null}},emits:["update:show","success"],setup(a,{emit:l}){const m=a,g=e({}),b=e(!1),U=e(!1),N=e({product_id:null,product_num:1,price:null,product_price:null,product_sku_id:null,attr:[],feed:[],bag_price:0,delivery:w()?30:40,describe:null});t((()=>m.show),(()=>{m.show&&j()}));const j=async()=>{var e,t,a,l,s,u,i,o,c,d;if(!b.value||m.productId)try{b.value=!0;const n=await(d=m.productId,H("product.product/detail",{product_id:d}));g.value=n.data,N.value.product_id=null==(e=g.value)?void 0:e.product_id,N.value.price=null==(t=g.value)?void 0:t.product_price,N.value.product_price=null==(a=g.value)?void 0:a.product_price,(null==(l=g.value)?void 0:l.sku)&&(null==(s=g.value)?void 0:s.sku.length)>0&&(N.value.product_sku_id=null==(u=g.value)?void 0:u.sku[0].product_sku_id),(null==(i=g.value)?void 0:i.product_attr)&&(null==(o=g.value)?void 0:o.product_attr.length)>0&&(null==(c=g.value)||c.product_attr.map(((e,t)=>{(null==e?void 0:e.attribute_value)&&(null==e?void 0:e.attribute_value.length)>0?N.value.attr[t]=0:N.value.attr[t]=null}))),N.value.feed&&N.value.feed.length>0&&(N.value.feed=[])}catch(n){}finally{b.value=!1}},K=async()=>{var e,t,a,s,u,i,o,c,d;if(U.value)return;const n={...N.value};n.attr=n.attr.join(","),n.feed=n.feed.join(",");let r=[];(null==(e=g.value)?void 0:e.sku)&&(null==(t=g.value)?void 0:t.sku.length)>0&&r.push(null==(a=g.value)?void 0:a.sku.find((e=>e.product_sku_id==N.value.product_sku_id)).spec_name_text),(null==(s=g.value)?void 0:s.product_attr)&&(null==(u=g.value)?void 0:u.product_attr.length)&&(null==(i=g.value)||i.product_attr.map(((e,t)=>{(null==e?void 0:e.attribute_value)&&(null==e?void 0:e.attribute_value.length)>0&&(null==e?void 0:e.attribute_value[N.value.attr[t]])&&r.push(null==e?void 0:e.attribute_value[N.value.attr[t]])}))),(null==(o=g.value)?void 0:o.product_feed)&&(null==(c=g.value)?void 0:c.product_feed.length)>0&&(null==(d=g.value)||d.product_feed.map(((e,t)=>{D(t)&&(r.push(e.feed_name_text),n.price=X(n.price,null==e?void 0:e.price))}))),n.describe=r.join(";"),n.delivery=w()?30:40,n.order_id=C(),n.table_id=T();try{U.value=!0;const e=await function(e){return H("order.Order/add",e)}(n);1==e.code&&(P(e.data.order_id),S({title:e.msg,icon:"none"}),l("update:show",!1),setTimeout((()=>{l("success")}),100))}catch(v){}finally{U.value=!1}},D=e=>N.value.feed.indexOf(e)>-1,F=(e,t)=>N.value.attr[e]==t;return(e,t)=>{const a=L,b=f,w=p,C=h,T=k(A("ti-modal"),J);return s(),u(T,{show:m.show,title:x(y)("商品詳情"),cancelText:x(y)("取消"),confirmText:x(y)("確定"),confirmLoading:U.value,onCancel:t[0]||(t[0]=e=>l("update:show",!1)),onConfirm:K},{content:i((()=>[o(b,{class:"ti-dialog-content"},{default:i((()=>[o(b,{class:"ti-detail-box"},{default:i((()=>[o(b,{class:"ti-detail-image"},{default:i((()=>{var e,t,l,i;return[(null==(e=g.value)?void 0:e.image)&&(null==(t=g.value)?void 0:t.image[0])&&(null==(l=g.value)?void 0:l.image[0].file_path)?(s(),u(a,{key:0,src:null==(i=g.value)?void 0:i.image[0].file_path,mode:"widthFix"},null,8,["src"])):I("",!0)]})),_:1}),o(b,{class:"ti-detail-con"},{default:i((()=>[o(b,{class:"ti-detail-title text-ellipsis"},{default:i((()=>{var e;return[v(_(null==(e=g.value)?void 0:e.product_name_text),1)]})),_:1}),o(b,{class:"ti-price-box"},{default:i((()=>[o(w,{class:"ti-detail-unit"},{default:i((()=>[v(_(x(y)("單價：")),1)])),_:1}),o(w,{class:"ti-detail-price"},{default:i((()=>{var e;return[v(_(x(G)((null==(e=g.value)?void 0:e.product_price)||0)),1)]})),_:1}),o(w,{class:"ti-detail-subPrice"},{default:i((()=>{var e;return[v(_(x(W)((null==(e=g.value)?void 0:e.product_price)||0)),1)]})),_:1})])),_:1}),o(b,{class:"ti-price-box"},{default:i((()=>[o(w,{class:"ti-detail-unit"},{default:i((()=>[v(_(x(y)("單位：")),1)])),_:1}),o(w,{class:"ti-detail-price"},{default:i((()=>{var e;return[v(_(null==(e=g.value)?void 0:e.product_unit_text),1)]})),_:1})])),_:1})])),_:1})])),_:1}),o(b,{class:"ti-detail-specs"},{default:i((()=>[o(C,{"scroll-y":""},{default:i((()=>[o(b,{class:"ti-specs-box"},{default:i((()=>{var e,t,a,l,p,f,h;return[(null==(e=g.value)?void 0:e.sku)&&(null==(t=g.value)?void 0:t.sku.length)>0?(s(),u(b,{key:0,class:"ti-specs-item"},{default:i((()=>[o(b,{class:"ti-specs-title"},{default:i((()=>[v(_(x(y)("規格")),1)])),_:1}),o(b,{class:"ti-specs-child"},{default:i((()=>{var e;return[(s(!0),c(d,null,n(null==(e=g.value)?void 0:e.sku,(e=>(s(),u(b,{key:e.product_sku_id,class:r([{active:e.product_sku_id==N.value.product_sku_id},"ti-child-item"]),onClick:t=>{return a=e.product_sku_id,void(N.value.product_sku_id!=a&&(N.value.product_sku_id=a));var a}},{default:i((()=>[o(w,{class:"ti-child-name"},{default:i((()=>[v(_(e.spec_name_text),1)])),_:2},1024),o(w,{class:"ti-child-price"},{default:i((()=>[v(_(x(G)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024),o(w,{class:"ti-child-subPrice"},{default:i((()=>[v(_(x(W)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))]})),_:1})])),_:1})):I("",!0),(null==(a=g.value)?void 0:a.product_attr)&&(null==(l=g.value)?void 0:l.product_attr.length)>0?(s(!0),c(d,{key:1},n(null==(p=g.value)?void 0:p.product_attr,((e,t)=>(s(),u(b,{key:t,class:"ti-specs-item"},{default:i((()=>[o(b,{class:"ti-specs-title"},{default:i((()=>[v(_(e.attribute_name_text),1)])),_:2},1024),o(b,{class:"ti-specs-child"},{default:i((()=>[(s(!0),c(d,null,n(null==e?void 0:e.attribute_value_text,((e,a)=>(s(),u(b,{key:a,class:r([{active:F(t,a)},"ti-child-item"]),onClick:e=>((e,t)=>{N.value.attr[e]=t})(t,a)},{default:i((()=>[o(w,{class:"ti-child-name"},{default:i((()=>[v(_(e),1)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))])),_:2},1024)])),_:2},1024)))),128)):I("",!0),(null==(f=g.value)?void 0:f.product_feed)&&(null==(h=g.value)?void 0:h.product_feed.length)>0?(s(),u(b,{key:2,class:"ti-specs-item"},{default:i((()=>[o(b,{class:"ti-specs-title"},{default:i((()=>[v(_(x(y)("加料")),1)])),_:1}),o(b,{class:"ti-specs-child"},{default:i((()=>{var e;return[(s(!0),c(d,null,n(null==(e=g.value)?void 0:e.product_feed,((e,t)=>(s(),u(b,{key:t,class:r([{active:D(t)},"ti-child-item"]),onClick:e=>(e=>{const t=N.value.feed.indexOf(e);t>=0?N.value.feed.splice(t,1):N.value.feed.push(e)})(t)},{default:i((()=>[o(w,{class:"ti-child-name"},{default:i((()=>[v(_(e.feed_name_text),1)])),_:2},1024),o(w,{class:"ti-child-price"},{default:i((()=>[v(_(x(G)((null==e?void 0:e.price)||0)),1)])),_:2},1024),o(w,{class:"ti-child-subPrice"},{default:i((()=>[v(_(x(W)((null==e?void 0:e.price)||0)),1)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))]})),_:1})])),_:1})):I("",!0)]})),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title","cancelText","confirmText","confirmLoading"])}}},[["__scopeId","data-v-389ed01d"]]),xe=z({__name:"dish-car-order-nav",emits:["car","confirm"],setup(t,{expose:a,emit:l}){const c=()=>{l("car")},d=()=>{l("confirm")},n=e(),r=e(!1),h=async()=>{var e;try{const t=await ye({table_id:T()},!1);n.value=(null==(e=t.data)?void 0:e.detail)||{},n.value.totalNum>0?r.value=!0:r.value=!1}catch(t){}};return h(),a({getCarData:h}),(e,t)=>{const a=L,l=p,h=f;return s(),u(h,{class:"ti-car-order"},{default:i((()=>[o(h,{class:"ti-order-total",onClick:c},{default:i((()=>[o(a,{class:"ti-total-image",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE9SURBVHgB7ZjxrcIgEMY/Xt4AbvAYwRHc4DmKbuAG6gR1A92g3UA3sE6gTnAesZqG1gLKSf/oL7nQwKV8Be6AAj1DPR6IaMTF6NmgVIlUGDFsR2qSVUJ7I8iQIwWVKF2zWU3UBH2AhexJhtx8dFufPw5NF8gwYTu2jbxLkIYsmV3hEiQdYdoepdSCGn38OpzXbP+Qo2Q7YCAA9aqhyhNbyK6jHe+Zcy9PFrQgec52v11R9o0IayTe1IJKu6JL0B8S4EqM0lztii5BGvIELWoNeU52ReopC4qyAvL472PmWECyZAiF5LJ1Ti9uM8pDlMb9yKnxOWbNHHj/KjDwJs4pq8PTN+VizFb4DHuofxD88qW1MGcx/UPFjFsi5RzLv84nmTr0eBL3OEPNnxGrmP7vCDKXuk2V1Bax/Qd8uQE+N6CHpHz4IAAAAABJRU5ErkJggg=="}),o(l,{class:"ti-total-price"},{default:i((()=>{var e;return[v(_(x(G)((null==(e=n.value)?void 0:e.totalPrice)||0)),1)]})),_:1}),o(l,{class:"ti-total-subPrice"},{default:i((()=>{var e;return[v(_(x(W)((null==(e=n.value)?void 0:e.totalPrice)||0)),1)]})),_:1})])),_:1}),r.value?(s(),u(h,{key:0,class:"ti-total-badge-box"},{default:i((()=>[o(l,{class:"ti-total-badge"},{default:i((()=>{var e;return[v(_(null==(e=n.value)?void 0:e.totalNum),1)]})),_:1})])),_:1})):I("",!0),o(h,{class:"ti-order-btn",onClick:d},{default:i((()=>[o(l,{class:"ti-btn-text"},{default:i((()=>[v(_(e.$t("下單")),1)])),_:1})])),_:1})])),_:1})}}},[["__scopeId","data-v-e1805c77"]]),we=z({__name:"cart-number",props:{productItem:{type:Object,default:()=>({})}},emits:["change"],setup(t,{emit:a}){const l=t,c=e(!1),d=async e=>{var t,s;const u={order_product_id:null==(t=l.productItem)?void 0:t.order_product_id,product_num:null==(s=l.productItem)?void 0:s.total_num,type:e};"up"==e?u.product_num+=1:u.product_num-=1;try{c.value=!0;const e=await function(e){return H("order.Order/sub",e)}(u);1==e.code&&a("change")}catch(i){}finally{c.value=!1}};return(e,a)=>{const l=f;return s(),u(l,{class:"ti-number-box",onClick:a[2]||(a[2]=U((()=>{}),["stop"]))},{default:i((()=>[o(l,{class:"ti-number-btn ti-number-minus",disabled:!1,onClick:a[0]||(a[0]=e=>d("down"))},{default:i((()=>[o(l,{class:"ti-number-minus-reduce"})])),_:1}),o(l,{class:"ti-number-input"},{default:i((()=>[v(_(t.productItem.total_num),1)])),_:1}),o(l,{class:"ti-number-btn ti-number-plus",disabled:!1,onClick:a[1]||(a[1]=e=>d("up"))},{default:i((()=>[o(l,{class:"ti-number-plus-add"}),o(l,{class:"ti-number-plus-add2"})])),_:1})])),_:1})}}},[["__scopeId","data-v-d611c51e"]]),ke=z({__name:"dish-car-ordering-list",emits:["success","change","sendkitchenFail"],setup(t,{emit:a}){const l=e(!1),r=e(),m=e(),b=e({table_id:""}),w=async e=>{var t;b.table_id=T();try{const e=await ye(b,!1);r.value=e.data.detail,m.value=(null==(t=e.data.detail)?void 0:t.unSendKitchenProduct)||[],a("change")}catch(l){}},C=async e=>{try{l.value=!0;const e=await ge({table_id:T()});S({title:y(e.msg),icon:"none"}),setTimeout((()=>{a("success")}),500)}catch(t){a("sendkitchenFail",t)}finally{l.value=!1}};return w(),g("handleDelProuct",(e=>{w()})),(e,t)=>{const a=f,l=p,g=h,b=k(A("ti-button"),Z),T=k(A("ti-empty-data"),ee);return s(),u(a,{class:"ti-shop-list-box"},{default:i((()=>{var e,p;return[(null==(e=m.value)?void 0:e.length)>0?(s(),u(a,{key:0,class:"ti-shop-list"},{default:i((()=>[o(a,null,{default:i((()=>[o(a,{class:"ti-cart-shop-head"},{default:i((()=>[o(a,{class:"ti-shop-head-title"},{default:i((()=>[v(_(x(y)("商品名稱")),1)])),_:1}),o(a,{class:"ti-shop-head-money"},{default:i((()=>[v(_(x(y)("金額")),1)])),_:1}),o(a,{class:"ti-shop-head-num"},{default:i((()=>[v(_(x(y)("數量")),1)])),_:1})])),_:1})])),_:1}),o(a,{class:"ti-scroll-box"},{default:i((()=>[o(g,{class:"ti-shop-scroll","scroll-y":""},{default:i((()=>[o(a,{class:"ti-shop-box"},{default:i((()=>[(s(!0),c(d,null,n(m.value,((e,c)=>(s(),u(a,{class:"ti-shop-item",key:e},{default:i((()=>[o(a,{class:"ti-shop-item-box"},{default:i((()=>[o(a,{class:"ti-shop-box"},{default:i((()=>[o(a,{class:"ti-shop-body-top"},{default:i((()=>[o(a,{class:"ti-shop-title text-ellipsis"},{default:i((()=>[v(_(e.product_name_text),1)])),_:2},1024),o(a,{class:"ti-shop-spec"},{default:i((()=>[v(_(e.product_attr),1)])),_:2},1024)])),_:2},1024),o(a,{class:"ti-shop-body-money"},{default:i((()=>[o(l,{class:"ti-shop-price"},{default:i((()=>[v(_(x(G)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024),o(l,{class:"ti-shop-subPrice"},{default:i((()=>[v(_(x(W)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024)])),_:2},1024),o(a,{class:"ti-shop-body-number"},{default:i((()=>[o(we,{productItem:e,onChange:t[0]||(t[0]=e=>w())},null,8,["productItem"])])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})])),_:1}),o(a,{class:"ti-content-bottom"},{default:i((()=>[o(a,{class:"ti-car-shop-bottom"},{default:i((()=>[o(a,{class:"ti-shop-bottom-item"},{default:i((()=>[o(a,null,{default:i((()=>[o(l,{class:"ti-shop-bottom-text"},{default:i((()=>{var e;return[v(_(x(y)("共")+((null==(e=r.value)?void 0:e.unSendKitchenProductTotalNum)||0)+x(y)("件")),1)]})),_:1})])),_:1}),o(a,null,{default:i((()=>[o(l,{class:"ti-shop-bottom-text"},{default:i((()=>[v(_(x(y)("小計：")),1)])),_:1}),o(l,{class:"ti-shop-bottom-price"},{default:i((()=>{var e;return[v(_(x(G)((null==(e=r.value)?void 0:e.unSendKitchenProductTotalPrice)||0)),1)]})),_:1}),o(l,{class:"ti-shop-bottom-subPrice"},{default:i((()=>{var e;return[v(_(x(W)((null==(e=r.value)?void 0:e.unSendKitchenProductTotalPrice)||0)),1)]})),_:1})])),_:1})])),_:1})])),_:1}),o(b,{title:x(y)("確認下單"),type:"primary",onClick:C},null,8,["title"])])),_:1})])),_:1})):I("",!0),(null==(p=m.value)?void 0:p.length)<=0?(s(),u(a,{key:1,class:"ti-empty-data-box"},{default:i((()=>[o(T,{title:x(y)("當前無待下單商品")},null,8,["title"])])),_:1})):I("",!0)]})),_:1})}}},[["__scopeId","data-v-72bf33d9"]]),Ae=z({__name:"dish-car-ordered-list",setup(t){const a=e([]);(async()=>{try{const t=await(e={table_id:T()},H("order.Order/getSendKitchen",e));a.value=t.data.list||[]}catch(t){}var e})();return(e,t)=>{const l=f,r=p,m=h,g=k(A("ti-empty-data"),ee);return s(),u(l,{class:"ti-shop-list"},{default:i((()=>[Object.keys(a.value).length>0?(s(),u(m,{key:0,class:"ti-shop-scroll","scroll-y":""},{default:i((()=>[(s(!0),c(d,null,n(a.value,((e,t)=>(s(),u(l,{class:"ti-shop-item",key:t},{default:i((()=>[o(l,{class:"ti-shop-time-top"}),o(l,{class:"ti-shop-time-box"},{default:i((()=>[v(_(e.date+" "+x(y)("下單")),1)])),_:2},1024),(s(!0),c(d,null,n(e.plist,((t,a)=>(s(),u(l,{key:a},{default:i((()=>[o(l,{class:"ti-shop-item-box"},{default:i((()=>[o(l,{class:"ti-shop-box"},{default:i((()=>[o(l,{class:"ti-shop-body-top"},{default:i((()=>[o(l,{class:"ti-shop-title text-ellipsis"},{default:i((()=>[v(_(t.product_name_text),1)])),_:2},1024),o(l,{class:"ti-shop-spec"},{default:i((()=>[v(_(t.product_attr),1)])),_:2},1024)])),_:2},1024),o(l,{class:"ti-shop-body-money"},{default:i((()=>[o(r,{class:"ti-shop-price"},{default:i((()=>[v(_(x(G)((null==t?void 0:t.product_price)||0)),1)])),_:2},1024),o(r,{class:"ti-shop-subPrice"},{default:i((()=>[v(_(x(W)((null==t?void 0:t.product_price)||0)),1)])),_:2},1024)])),_:2},1024),o(l,{class:"ti-shop-body-state"},{default:i((()=>[o(l,{class:"ti-state-left"},{default:i((()=>[v(_(t.finish_num),1)])),_:2},1024),o(l,{class:"ti-state-line"},{default:i((()=>[v("/")])),_:1}),o(l,{class:"ti-state-right"},{default:i((()=>[v(_(t.total_num),1)])),_:2},1024),o(l,{class:"ti-state-text"},{default:i((()=>{return[v(_((e=t.kitchen_status,y(0===e?"製作中":1===e?"已完成":"未知"))),1)];var e})),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024),a!=e.length-1?(s(),u(l,{key:0,class:"ti-shop-item-box-bottom-border"})):I("",!0)])),_:2},1024)))),128))])),_:2},1024)))),128))])),_:1})):I("",!0),Object.keys(a.value).length<=0?(s(),u(g,{key:1,class:"ti-empty-data",title:x(y)("當前無已下單商品")},null,8,["title"])):I("",!0)])),_:1})}}},[["__scopeId","data-v-bd29da58"]]),Ie=z({__name:"goods-not-enough",props:{show:{type:Boolean,default:!1},productList:{type:Array,default:[]}},emits:["update:show","confirm"],setup(e,{emit:t}){const a=e,l=()=>{t("confirm")};return(r,m)=>{const y=p,g=f,b=h,x=k(A("ti-modal"),J);return s(),u(x,{show:a.show,title:r.$t("温馨提示"),isCancelShow:!1,confirmText:r.$t("確定"),onCancel:m[0]||(m[0]=e=>t("update:show",!1)),onConfirm:l},{content:i((()=>[o(g,{class:"ti-dialog-content"},{default:i((()=>[o(g,{class:"ti-detail-box"},{default:i((()=>[o(y,{class:"ti-detail-des"},{default:i((()=>[v(_(r.$t("商品庫存不足，請重新選擇")),1)])),_:1})])),_:1}),o(g,{class:"ti-detail-specs"},{default:i((()=>[o(b,{"scroll-y":""},{default:i((()=>[(s(!0),c(d,null,n(e.productList,((e,t)=>(s(),u(g,{class:"ti-specs-box"},{default:i((()=>[o(g,{class:"ti-specs-item"},{default:i((()=>[o(g,{class:"ti-specs-title"},{default:i((()=>[v(_(e.product_name_text),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),256))])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title","confirmText"])}}},[["__scopeId","data-v-358626aa"]]),Ce=z({__name:"dish-list",emits:["success"],setup(a,{emit:l}){const m=e(!1),w=e({category_id:null,shop_supplier_id:null,page:1,list_rows:30}),C=e([]),P=e(!1),U=e(),K=e(!1);t((()=>w.value.category_id),(()=>{O()}));const D=()=>{oe.value.getCarData()},F=()=>{K.value&&(w.value.page+=1,B())},O=()=>{w.value.page=1,w.value.shop_supplier_id=N(),B(!0)},R=e(0),B=async e=>{var t,a,l,s,u,i;if(P.value)return;const o={...w.value};o.category_id||(o.category_id=null),1==R.value&&(o.is_special=1);try{e&&(P.value=!0);const c=await function(e){return H("product.product/index",e,{isLoading:!1})}(o);1==w.value.page&&(C.value=[]),C.value=C.value.concat((null==(a=null==(t=c.data)?void 0:t.list)?void 0:a.data)||[]),K.value=(null==(s=null==(l=c.data)?void 0:l.list)?void 0:s.last_page)>(null==(i=null==(u=c.data)?void 0:u.list)?void 0:i.current_page)}catch(c){}finally{e&&(P.value=!1)}};O(),g("closeShowLanguage",(e=>{e.isSelectLanguage&&b()&&setTimeout((()=>{O()}),500)})),g("refresh",(e=>{O()})),e([]);const E=e(),Q=()=>{E.value=!0,se.value=!0},$=()=>{V(!1)},J=e([]),V=async e=>{var t;try{const a=await ye({table_id:T()},e);J.value=(null==(t=a.data.detail)?void 0:t.unSendKitchenProduct)||[],J.value.length>0?z():(E.value=!0,se.value=!1)}catch(a){}},Y=e([]),q=e(!1),z=async()=>{try{const e=await ge({table_id:T()});S({title:y(e.msg),icon:"none"}),setTimeout((()=>{l("success"),oe.value.getCarData(),E.value=!0,se.value=!1}),300)}catch(e){Y.value=e.data,q.value=!0}},X=(e,t)=>{e||(E.value=!1)},Z=e=>{Y.value=e.data,q.value=!0},ae=e([]),le=async()=>{q.value=!1;for(let a=0;a<Y.value.length;a++)ae.value.push(Y.value[a].order_product_id);try{await(e={order_product_id:ae.value},H("order.Order/delProduct",e,{isLoading:!1,isMessage:!1}));setTimeout((()=>{l("success"),oe.value.getCarData(),j("handleDelProuct",{msg:"删除库存不足商品"})}),300)}catch(t){}var e},se=e(!0),ue=e=>{se.value=e},ie=()=>{se.value=!1};se.value=!0;const oe=e();return(e,t)=>{const a=k(A("ti-loading"),M),l=L,g=p,b=f,T=k(A("ti-empty-data"),ee),N=h,j=k(A("ti-drawer"),te);return s(),c(d,null,[o(b,{class:"ti-dish-box"},{default:i((()=>[o(me,{categoryId:w.value.category_id,"onUpdate:categoryId":t[0]||(t[0]=e=>w.value.category_id=e),isSpecial:R.value,"onUpdate:isSpecial":t[1]||(t[1]=e=>R.value=e)},null,8,["categoryId","isSpecial"]),o(b,{class:"ti-dish-list"},{default:i((()=>[o(N,{class:"ti-scroll","scroll-y":"","lower-threshold":50,onScrolltolower:F},{default:i((()=>[P.value?(s(),u(a,{key:0})):C.value&&C.value.length>0?(s(),c(d,{key:1},[o(b,{class:"ti-dish-goods"},{default:i((()=>[(s(!0),c(d,null,n(C.value,((e,t)=>(s(),u(b,{key:t,class:r([{"sold-out":e.product_stock<=0},"ti-goods-item"]),onClick:t=>(e=>{if(e.product_stock<=0)return S({title:y("已售罄"),icon:"none"});m.value=!0,U.value=e.product_id})(e)},{default:i((()=>[o(b,{class:"ti-goods-image"},{default:i((()=>[e.image&&e.image[0]&&e.image[0].file_path?(s(),u(l,{key:0,src:e.image[0].file_path,mode:"scaleToFill"},null,8,["src"])):I("",!0),o(g,{class:"sold-out-text"},{default:i((()=>[v(_(x(y)("已售罄")),1)])),_:1})])),_:2},1024),o(b,{class:"ti-goods-content"},{default:i((()=>[o(b,{class:"ti-goods-title"},{default:i((()=>[v(_(e.product_name_text),1)])),_:2},1024),o(b,{class:"ti-price-box"},{default:i((()=>[o(g,{class:"ti-goods-price"},{default:i((()=>[v(_(x(G)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024),o(g,{class:"ti-goods-subPrice"},{default:i((()=>[v(_(x(W)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))])),_:1}),o(a,{status:K.value?"loading":"no-more"},null,8,["status"])],64)):(s(),u(T,{key:2}))])),_:1})])),_:1}),o(b,{class:"ti-car-order-nav"},{default:i((()=>[o(xe,{ref_key:"carRef",ref:oe,onCar:Q,onConfirm:$},null,512)])),_:1})])),_:1}),o(be,{show:m.value,"onUpdate:show":t[2]||(t[2]=e=>m.value=e),productId:U.value,onSuccess:D},null,8,["show","productId"]),o(Ie,{style:{"z-index":"9999"},show:q.value,"onUpdate:show":t[3]||(t[3]=e=>q.value=e),productList:Y.value,onConfirm:le},null,8,["show","productList"]),o(j,{show:E.value,width:603.992,title:x(y)("我點的菜"),maskClick:!0,onChange:X},{content:i((()=>[o(b,{class:"ti-drawer-content"},{default:i((()=>[o(b,{class:"ti-content-head"},{default:i((()=>[o(b,{class:"ti-switch-box"},{default:i((()=>[o(b,{class:r(se.value?"ti-switch-on":"ti-switch-off"),onClick:t[4]||(t[4]=e=>ue(!0))},{default:i((()=>[o(g,{class:r(se.value?"ti-switch-text-on":"ti-switch-text-off")},{default:i((()=>[v(_(x(y)("未下單")),1)])),_:1},8,["class"])])),_:1},8,["class"]),o(b,{class:"ti-switch-space"}),o(b,{class:r(se.value?"ti-switch-off":"ti-switch-on"),onClick:t[5]||(t[5]=e=>ue(!1))},{default:i((()=>[o(g,{class:r(se.value?"ti-switch-text-off":"ti-switch-text-on")},{default:i((()=>[v(_(x(y)("已下單")),1)])),_:1},8,["class"])])),_:1},8,["class"])])),_:1})])),_:1}),se.value?(s(),u(ke,{key:0,onSuccess:ie,onChange:D,onSendkitchenFail:Z})):I("",!0),se.value?I("",!0):(s(),u(Ae,{key:1}))])),_:1})])),footer:i((()=>[o(b)])),_:1},8,["show","width","title"])],64)}}},[["__scopeId","data-v-08c72a20"]]);const Te=z({__name:"opentable-index",setup(t){ae(),e(!1);const a=()=>{M()},l=()=>{j("refresh",{})},c=e(),d=e("");e([]);const n=e(),r=e(!1),h=e({ip:"",port:"",device_id:""}),m=()=>{const e=le();h.value.ip=(null==e?void 0:e.ip)||se()||"127.0.0.1",h.value.port=(null==e?void 0:e.port)||"8080"},b=e=>{h.value.ip=e},w=e=>{h.value.port=e},I=async()=>{var e;const t={...h.value};if(t.ip)if(t.port)try{const a=await ne(re(`${null==t?void 0:t.ip}:${t.port}`));ve(t),R(a.data.app_id),B(a.data.shop_supplier_id),ie(null==(e=a.data)?void 0:e.currency),setTimeout((()=>{r.value=!0}),150)}catch(a){S({title:y("绑定失败"),icon:"none"})}else S({title:y("請輸入連接埠"),icon:"none"});else S({title:y("請輸入伺服器位址"),icon:"none"})},C=e=>{r.value=!1,e&&(n.value=e,d.value=e.table_no)},P=()=>{m(),d.value=O().table_no,n.value=O()},L=async()=>{var e;const t={...h.value};if(t.ip)if(t.port)try{const a=await ne(re(`${null==t?void 0:t.ip}:${t.port}`));if(!n.value)return void S({title:y("請查找桌位"),icon:"none"});ve(t),R(a.data.app_id),B(a.data.shop_supplier_id),ie(null==(e=a.data)?void 0:e.currency),setTimeout((()=>{U()}),150)}catch(a){S({title:y("绑定失败"),icon:"none"})}else S({title:y("請輸入連接埠"),icon:"none"});else S({title:y("請輸入伺服器位址"),icon:"none"})},U=async()=>{if(T()===n.value.table_id)return S({title:y("绑定成功"),icon:"none"}),c.value=!1,E(!1),void setTimeout((()=>{Q({url:"/pages/index/index"})}),150);try{await _e({table_id:n.value.table_id,old_table_id:T()});$(n.value),S({title:y("绑定成功"),icon:"none"}),c.value=!1,E(!1),setTimeout((()=>{Q({url:"/pages/index/index"})}),150)}catch(e){}},N=e(!1),M=()=>{N.value=!0},z=async e=>{if(e)try{await Y({password:e});c.value=!0,n.value=O(),d.value=n.value.table_no,G()}catch(t){}else S({title:y("請輸入密碼"),icon:"none"})},G=()=>{N.value=!1};m(),K({success:e=>{h.value.device_id=e.deviceId}});const W=e(),X=async()=>{try{await H("table.table/ping",{},{isLoading:!1,isMessage:!1})}catch(e){}finally{W.value=setTimeout((()=>{X()}),3e3)}};X(),D((()=>{clearTimeout(W.value)}));const Z=e({name:"",logo:"",tableNo:"",is_call_service:1}),ee=async e=>{var t,a,l;try{const s=await ue(e);Z.value.name=s.data.name,Z.value.logo=s.data.logo,Z.value.tableNo=O().table_no,Z.value.is_call_service=parseInt(null==(a=null==(t=null==s?void 0:s.data)?void 0:t.tablet)?void 0:a.is_call_service),ie(null==(l=s.data)?void 0:l.currency),oe(s)}catch(s){}};return g("refresh",(e=>{ee(!1)})),F((()=>{ee(!1)})),(e,t)=>{const n=k(A("ti-layout-head"),q),m=f,g=p,T=k(A("ti-input"),pe),S=k(A("ti-modal"),J),U=k(A("ti-layout-table-list"),fe);return s(),u(m,{class:"ti-page",onClick:t[1]||(t[1]=e=>x(de)())},{default:i((()=>[o(m,null,{default:i((()=>[o(n,{isPay:!0,isTableNo:!0,onDoubleLogo:a,onRefresh:l,is_call_service:Z.value.is_call_service},null,8,["is_call_service"])])),_:1}),o(V,{show:N.value,title:x(y)("密碼"),password:!0,placeholder:x(y)("請輸入密碼"),onExit:G,onConfirm:z},null,8,["show","title","placeholder"]),o(Ce),o(S,{show:c.value,title:x(y)("設置"),cancelText:x(y)("重置"),confirmText:x(y)("確定"),onCancel:P,onConfirm:L},{content:i((()=>[o(m,{class:"ti-item-input"},{default:i((()=>[o(m,{class:"ti-label-box"},{default:i((()=>[o(m,{class:"ti-label-left"},{default:i((()=>[o(g,{class:"ti-label-server"},{default:i((()=>[v(_(x(y)("服務器連接地址")),1)])),_:1})])),_:1}),o(m,{class:"ti-label-right",onClick:I},{default:i((()=>[o(g,{class:"ti-label-table"},{default:i((()=>[v(_(d.value?x(y)("已選 : ")+x(ce)(d.value,19):x(y)("查找桌位")),1)])),_:1})])),_:1})])),_:1}),o(m,{class:"ti-input-box"},{default:i((()=>[o(T,{type:"text",onInput:b,value:h.value.ip,placeholder:x(y)("伺服器位址"),clearable:!1},null,8,["value","placeholder"]),o(m,{class:"ti-colon"},{default:i((()=>[v(":")])),_:1}),o(m,{class:"ti-input-port"},{default:i((()=>[o(T,{type:"number",onInput:w,value:h.value.port,placeholder:x(y)("端口"),clearable:!1},null,8,["value","placeholder"])])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title","cancelText","confirmText"]),o(U,{show:r.value,"onUpdate:show":t[0]||(t[0]=e=>r.value=e),onConfirm:C},null,8,["show"])])),_:1})}}},[["__scopeId","data-v-a81e3741"]]);export{Te as default};