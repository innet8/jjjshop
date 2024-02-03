import{r as e,J as t,K as l,L as a,d as u,e as s,w as i,l as o,m as c,F as d,n,M as r,p as v,t as _,G as p,k as f,N as h,O as m,$ as y,P as g,u as b,Q as x,A as k,B as w,f as A,R as I,x as C,T,s as P,C as S,I as L,U as N,g as U,V as j,o as K,j as R,h as O,W as B,q as D,v as E,z as F,b as Q,y as J}from"./index-81fd6135.js";import{a as V,b as Y,D as $,v as q,_ as z}from"./verify.f8734442.js";import{$ as G,_ as H,p as W,q as M,r as X,n as Z,w as ee,x as te,u as le,g as ae,a as ue,b as se,c as ie,s as oe,d as ce,e as de,v as ne,h as re,i as ve,j as _e,l as pe,m as fe}from"./baseinfo.a35837cf.js";const he=H({__name:"dish-menu",props:{list:{type:Array,default:()=>[]},menuId:{type:Number,default:null}},emits:["update:menuId"],setup(m,{emit:y}){const g=m,b=e(0),x=e(0),k=e([]);t((()=>g.list),(async e=>{if(await l(),!e||0==e.length)return;const t=a().in(this);if(e.map(((e,l)=>{t.select(`#scroll-item-${l}`).boundingClientRect((e=>{if(!e)return;const t=k.value;t[l]=e.width+10,k.value=t})).exec()})),g.menuId>0){const e=g.list.findIndex((e=>e.category_id==g.menuId));e>-1&&w(e)}}),{deep:!0,immediate:!0});const w=e=>{x.value=e,b.value=k.value.slice(0,e+1).reduce(((e,t)=>e+t),0)-(k.value[e]+100),y("update:menuId",g.list[e].category_id)};return(e,t)=>{const l=p,a=f,m=h;return u(),s(m,{class:"ti-dish-menu","scroll-left":b.value,"scroll-x":"","enable-flex":"","scroll-with-animation":""},{default:i((()=>[o(a,{class:"ti-menu-content"},{default:i((()=>[(u(!0),c(d,null,n(g.list,((t,c)=>(u(),s(a,{key:c,class:r(["ti-menu-item",{active:c==x.value}]),id:`scroll-item-${c}`,onClick:e=>w(c)},{default:i((()=>[o(l,{class:"ti-menu-title"},{default:i((()=>[v(_(0===c?e.$t(t.name_text):t.name_text),1)])),_:2},1024)])),_:2},1032,["id","class","onClick"])))),128))])),_:1})])),_:1},8,["scroll-left"])}}},[["__scopeId","data-v-440ee506"]]),me=H({__name:"dish-category",props:{categoryId:{type:Number,default:null}},emits:["update:categoryId"],setup(l,{emit:a}){const p=e([]),h=e(0),x=e(0),k=m((()=>{let e=(p.value.find((e=>e.category_id==h.value))||{}).child||[];return e&&e.length>0&&(e=[{name_text:y("全部"),category_id:0}].concat(e)),e})),w=m((()=>p.value.find((e=>e.category_id==h.value)))),A=m((()=>k.value.find((e=>e.category_id==x.value))));t((()=>h.value),(()=>{var e;k&&k.length>0&&(x.value=k.value[0].category_id),a("update:isSpecial",null==(e=w.value)?void 0:e.is_special),a("update:categoryId",h.value)}));const I=async e=>{try{const t=await function(e){return G("product.category/index",{},{isLoading:e})}(e);t.data.list&&(p.value=[{name_text:y("全部"),category_id:0}].concat(t.data.list),h.value=p.value[0].category_id)}catch(t){}};return I(!0),g("closeShowLanguage",(e=>{e.isSelectLanguage&&setTimeout((()=>{I(!1)}),500)})),g("refresh",(e=>{I(!1)})),(e,t)=>{const l=f;return u(),s(l,{class:"ti-category-box"},{default:i((()=>[o(he,{list:p.value,menuId:h.value,"onUpdate:menuId":t[0]||(t[0]=e=>h.value=e)},null,8,["list","menuId"]),o(l,{class:"ti-dish-secondary"},{default:i((()=>[(u(!0),c(d,null,n(b(k),((e,t)=>(u(),s(l,{key:t,class:r([{active:e.category_id==x.value},"ti-secondary-item"]),onClick:t=>{return l=e.category_id,x.value=l,a("update:isSpecial",null==(u=A.value)?void 0:u.is_special),void a("update:categoryId",x.value>0?x.value:h.value);var l,u}},{default:i((()=>[v(_(0===t?b(y)(e.name_text):e.name_text),1)])),_:2},1032,["class","onClick"])))),128))])),_:1})])),_:1})}}},[["__scopeId","data-v-c4e132af"]]);function ye(e,t){return G("order.Order/getUnSendKitchen",e,{isLoading:t})}function ge(e){return G("order.Order/sendKitchen",e)}const be=H({__name:"goods-detail",props:{show:{type:Boolean,default:!1},productId:{type:Number,default:null}},emits:["update:show","success"],setup(l,{emit:a}){const m=l,g=e({}),L=e(!1),N=e(!1),U=e({product_id:null,product_num:1,price:null,product_price:null,product_sku_id:null,attr:[],feed:[],bag_price:0,delivery:x()?30:40,describe:null});t((()=>m.show),(()=>{m.show&&j()}));const j=async()=>{var e,t,l,a,u,s,i,o,c,d;if(!L.value||m.productId)try{L.value=!0;const n=await(d=m.productId,G("product.product/detail",{product_id:d}));g.value=n.data,U.value.product_id=null==(e=g.value)?void 0:e.product_id,U.value.price=null==(t=g.value)?void 0:t.product_price,U.value.product_price=null==(l=g.value)?void 0:l.product_price,(null==(a=g.value)?void 0:a.sku)&&(null==(u=g.value)?void 0:u.sku.length)>0&&(U.value.product_sku_id=null==(s=g.value)?void 0:s.sku[0].product_sku_id),(null==(i=g.value)?void 0:i.product_attr)&&(null==(o=g.value)?void 0:o.product_attr.length)>0&&(null==(c=g.value)||c.product_attr.map(((e,t)=>{(null==e?void 0:e.attribute_value)&&(null==e?void 0:e.attribute_value.length)>0?U.value.attr[t]=0:U.value.attr[t]=null}))),U.value.feed&&U.value.feed.length>0&&(U.value.feed=[])}catch(n){}finally{L.value=!1}},K=async()=>{var e,t,l,u,s,i,o,c,d;if(N.value)return;const n={...U.value};n.attr=n.attr.join(","),n.feed=n.feed.join(",");let r=[];(null==(e=g.value)?void 0:e.sku)&&(null==(t=g.value)?void 0:t.sku.length)>0&&r.push(null==(l=g.value)?void 0:l.sku.find((e=>e.product_sku_id==U.value.product_sku_id)).spec_name_text),(null==(u=g.value)?void 0:u.product_attr)&&(null==(s=g.value)?void 0:s.product_attr.length)&&(null==(i=g.value)||i.product_attr.map(((e,t)=>{(null==e?void 0:e.attribute_value)&&(null==e?void 0:e.attribute_value.length)>0&&(null==e?void 0:e.attribute_value[U.value.attr[t]])&&r.push(null==e?void 0:e.attribute_value[U.value.attr[t]])}))),(null==(o=g.value)?void 0:o.product_feed)&&(null==(c=g.value)?void 0:c.product_feed.length)>0&&(null==(d=g.value)||d.product_feed.map(((e,t)=>{R(t)&&(r.push(e.feed_name_text),n.price=X(n.price,null==e?void 0:e.price))}))),n.describe=r.join(";"),n.delivery=x()?30:40,n.order_id=I(),n.table_id=C();try{N.value=!0;const e=await function(e){return G("order.Order/add",e)}(n);1==e.code&&(T(e.data.order_id),P({title:e.msg,icon:"none"}),a("update:show",!1),setTimeout((()=>{a("success")}),100))}catch(v){}finally{N.value=!1}},R=e=>U.value.feed.indexOf(e)>-1,O=(e,t)=>U.value.attr[e]==t;return(e,t)=>{const l=S,x=f,I=p,C=h,T=k(w("ti-modal"),V);return u(),s(T,{show:m.show,title:b(y)("商品詳情"),cancelText:b(y)("取消"),confirmText:b(y)("確定"),confirmLoading:N.value,onCancel:t[0]||(t[0]=e=>a("update:show",!1)),onConfirm:K},{content:i((()=>[o(x,{class:"ti-dialog-content"},{default:i((()=>[o(x,{class:"ti-detail-box"},{default:i((()=>[o(x,{class:"ti-detail-image"},{default:i((()=>{var e,t,a,i;return[(null==(e=g.value)?void 0:e.image)&&(null==(t=g.value)?void 0:t.image[0])&&(null==(a=g.value)?void 0:a.image[0].file_path)?(u(),s(l,{key:0,src:null==(i=g.value)?void 0:i.image[0].file_path,mode:"widthFix"},null,8,["src"])):A("",!0)]})),_:1}),o(x,{class:"ti-detail-con"},{default:i((()=>[o(x,{class:"ti-detail-title text-ellipsis"},{default:i((()=>{var e;return[v(_(null==(e=g.value)?void 0:e.product_name_text),1)]})),_:1}),o(x,{class:"ti-price-box"},{default:i((()=>[o(I,{class:"ti-detail-unit"},{default:i((()=>[v(_(b(y)("單價：")),1)])),_:1}),o(I,{class:"ti-detail-price"},{default:i((()=>{var e;return[v(_(b(W)((null==(e=g.value)?void 0:e.product_price)||0)),1)]})),_:1}),o(I,{class:"ti-detail-subPrice"},{default:i((()=>{var e;return[v(_(b(M)((null==(e=g.value)?void 0:e.product_price)||0)),1)]})),_:1})])),_:1}),o(x,{class:"ti-price-box"},{default:i((()=>[o(I,{class:"ti-detail-unit"},{default:i((()=>[v(_(b(y)("單位：")),1)])),_:1}),o(I,{class:"ti-detail-price"},{default:i((()=>{var e;return[v(_(null==(e=g.value)?void 0:e.product_unit_text),1)]})),_:1})])),_:1})])),_:1})])),_:1}),o(x,{class:"ti-detail-specs"},{default:i((()=>[o(C,{"scroll-y":""},{default:i((()=>[o(x,{class:"ti-specs-box"},{default:i((()=>{var e,t,l,a,p,f,h;return[(null==(e=g.value)?void 0:e.sku)&&(null==(t=g.value)?void 0:t.sku.length)>0?(u(),s(x,{key:0,class:"ti-specs-item"},{default:i((()=>[o(x,{class:"ti-specs-title"},{default:i((()=>[v(_(b(y)("規格")),1)])),_:1}),o(x,{class:"ti-specs-child"},{default:i((()=>{var e;return[(u(!0),c(d,null,n(null==(e=g.value)?void 0:e.sku,(e=>(u(),s(x,{key:e.product_sku_id,class:r([{active:e.product_sku_id==U.value.product_sku_id},"ti-child-item"]),onClick:t=>{return l=e.product_sku_id,void(U.value.product_sku_id!=l&&(U.value.product_sku_id=l));var l}},{default:i((()=>[o(I,{class:"ti-child-name"},{default:i((()=>[v(_(e.spec_name_text),1)])),_:2},1024),o(I,{class:"ti-child-price"},{default:i((()=>[v(_(b(W)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024),o(I,{class:"ti-child-subPrice"},{default:i((()=>[v(_(b(M)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))]})),_:1})])),_:1})):A("",!0),(null==(l=g.value)?void 0:l.product_attr)&&(null==(a=g.value)?void 0:a.product_attr.length)>0?(u(!0),c(d,{key:1},n(null==(p=g.value)?void 0:p.product_attr,((e,t)=>(u(),s(x,{key:t,class:"ti-specs-item"},{default:i((()=>[o(x,{class:"ti-specs-title"},{default:i((()=>[v(_(e.attribute_name_text),1)])),_:2},1024),o(x,{class:"ti-specs-child"},{default:i((()=>[(u(!0),c(d,null,n(null==e?void 0:e.attribute_value_text,((e,l)=>(u(),s(x,{key:l,class:r([{active:O(t,l)},"ti-child-item"]),onClick:e=>((e,t)=>{U.value.attr[e]=t})(t,l)},{default:i((()=>[o(I,{class:"ti-child-name"},{default:i((()=>[v(_(e),1)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))])),_:2},1024)])),_:2},1024)))),128)):A("",!0),(null==(f=g.value)?void 0:f.product_feed)&&(null==(h=g.value)?void 0:h.product_feed.length)>0?(u(),s(x,{key:2,class:"ti-specs-item"},{default:i((()=>[o(x,{class:"ti-specs-title"},{default:i((()=>[v(_(b(y)("加料")),1)])),_:1}),o(x,{class:"ti-specs-child"},{default:i((()=>{var e;return[(u(!0),c(d,null,n(null==(e=g.value)?void 0:e.product_feed,((e,t)=>(u(),s(x,{key:t,class:r([{active:R(t)},"ti-child-item"]),onClick:e=>(e=>{const t=U.value.feed.indexOf(e);t>=0?U.value.feed.splice(t,1):U.value.feed.push(e)})(t)},{default:i((()=>[o(I,{class:"ti-child-name"},{default:i((()=>[v(_(e.feed_name_text),1)])),_:2},1024),o(I,{class:"ti-child-price"},{default:i((()=>[v(_(b(W)((null==e?void 0:e.price)||0)),1)])),_:2},1024),o(I,{class:"ti-child-subPrice"},{default:i((()=>[v(_(b(M)((null==e?void 0:e.price)||0)),1)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))]})),_:1})])),_:1})):A("",!0)]})),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title","cancelText","confirmText","confirmLoading"])}}},[["__scopeId","data-v-389ed01d"]]),xe=H({__name:"dish-car-order-nav",emits:["car","confirm"],setup(t,{expose:l,emit:a}){const c=()=>{a("car")},d=()=>{a("confirm")},n=e(),r=e(!1),h=async()=>{var e;try{const t=await ye({table_id:C()},!1);n.value=(null==(e=t.data)?void 0:e.detail)||{},n.value.totalNum>0?r.value=!0:r.value=!1}catch(t){}};return h(),l({getCarData:h}),(e,t)=>{const l=S,a=p,h=f;return u(),s(h,{class:"ti-car-order"},{default:i((()=>[o(h,{class:"ti-order-total",onClick:c},{default:i((()=>[o(l,{class:"ti-total-image",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE9SURBVHgB7ZjxrcIgEMY/Xt4AbvAYwRHc4DmKbuAG6gR1A92g3UA3sE6gTnAesZqG1gLKSf/oL7nQwKV8Be6AAj1DPR6IaMTF6NmgVIlUGDFsR2qSVUJ7I8iQIwWVKF2zWU3UBH2AhexJhtx8dFufPw5NF8gwYTu2jbxLkIYsmV3hEiQdYdoepdSCGn38OpzXbP+Qo2Q7YCAA9aqhyhNbyK6jHe+Zcy9PFrQgec52v11R9o0IayTe1IJKu6JL0B8S4EqM0lztii5BGvIELWoNeU52ReopC4qyAvL472PmWECyZAiF5LJ1Ti9uM8pDlMb9yKnxOWbNHHj/KjDwJs4pq8PTN+VizFb4DHuofxD88qW1MGcx/UPFjFsi5RzLv84nmTr0eBL3OEPNnxGrmP7vCDKXuk2V1Bax/Qd8uQE+N6CHpHz4IAAAAABJRU5ErkJggg=="}),o(a,{class:"ti-total-price"},{default:i((()=>{var e;return[v(_(b(W)((null==(e=n.value)?void 0:e.totalPrice)||0)),1)]})),_:1}),o(a,{class:"ti-total-subPrice"},{default:i((()=>{var e;return[v(_(b(M)((null==(e=n.value)?void 0:e.totalPrice)||0)),1)]})),_:1})])),_:1}),r.value?(u(),s(h,{key:0,class:"ti-total-badge-box"},{default:i((()=>[o(a,{class:"ti-total-badge"},{default:i((()=>{var e;return[v(_(null==(e=n.value)?void 0:e.totalNum),1)]})),_:1})])),_:1})):A("",!0),o(h,{class:"ti-order-btn",onClick:d},{default:i((()=>[o(a,{class:"ti-btn-text"},{default:i((()=>[v(_(e.$t("下單")),1)])),_:1})])),_:1})])),_:1})}}},[["__scopeId","data-v-e1805c77"]]),ke=H({__name:"cart-number",props:{productItem:{type:Object,default:()=>({})}},emits:["change"],setup(t,{emit:l}){const a=t,c=e(!1),d=async e=>{var t,u;const s={order_product_id:null==(t=a.productItem)?void 0:t.order_product_id,product_num:null==(u=a.productItem)?void 0:u.total_num,type:e};"up"==e?s.product_num+=1:s.product_num-=1;try{c.value=!0;const e=await function(e){return G("order.Order/sub",e)}(s);1==e.code&&l("change")}catch(i){}finally{c.value=!1}};return(e,l)=>{const a=f;return u(),s(a,{class:"ti-number-box",onClick:l[2]||(l[2]=L((()=>{}),["stop"]))},{default:i((()=>[o(a,{class:"ti-number-btn ti-number-minus",disabled:!1,onClick:l[0]||(l[0]=e=>d("down"))},{default:i((()=>[o(a,{class:"ti-number-minus-reduce"})])),_:1}),o(a,{class:"ti-number-input"},{default:i((()=>[v(_(t.productItem.total_num),1)])),_:1}),o(a,{class:"ti-number-btn ti-number-plus",disabled:!1,onClick:l[1]||(l[1]=e=>d("up"))},{default:i((()=>[o(a,{class:"ti-number-plus-add"}),o(a,{class:"ti-number-plus-add2"})])),_:1})])),_:1})}}},[["__scopeId","data-v-d611c51e"]]),we=H({__name:"dish-car-ordering-list",emits:["success","change"],setup(t,{emit:l}){const a=e(!1),r=e(),m=e(),g=e({table_id:""}),x=async e=>{var t;g.table_id=C();try{const e=await ye(g,!1);r.value=e.data.detail,m.value=(null==(t=e.data.detail)?void 0:t.unSendKitchenProduct)||[],l("change")}catch(a){}},I=async e=>{try{a.value=!0;const e=await ge({table_id:C()});P({title:y(e.msg),icon:"none"}),setTimeout((()=>{l("success")}),500)}catch(t){}finally{a.value=!1}};return x(),(e,t)=>{const l=f,a=p,g=h,C=k(w("ti-button"),Z),T=k(w("ti-empty-data"),ee);return u(),s(l,{class:"ti-shop-list-box"},{default:i((()=>{var e,p;return[(null==(e=m.value)?void 0:e.length)>0?(u(),s(l,{key:0,class:"ti-shop-list"},{default:i((()=>[o(l,null,{default:i((()=>[o(l,{class:"ti-cart-shop-head"},{default:i((()=>[o(l,{class:"ti-shop-head-title"},{default:i((()=>[v(_(b(y)("商品名稱")),1)])),_:1}),o(l,{class:"ti-shop-head-money"},{default:i((()=>[v(_(b(y)("金額")),1)])),_:1}),o(l,{class:"ti-shop-head-num"},{default:i((()=>[v(_(b(y)("數量")),1)])),_:1})])),_:1})])),_:1}),o(l,{class:"ti-scroll-box"},{default:i((()=>[o(g,{class:"ti-shop-scroll","scroll-y":""},{default:i((()=>[o(l,{class:"ti-shop-box"},{default:i((()=>[(u(!0),c(d,null,n(m.value,((e,c)=>(u(),s(l,{class:"ti-shop-item",key:e},{default:i((()=>[o(l,{class:"ti-shop-item-box"},{default:i((()=>[o(l,{class:"ti-shop-box"},{default:i((()=>[o(l,{class:"ti-shop-body-top"},{default:i((()=>[o(l,{class:"ti-shop-title text-ellipsis"},{default:i((()=>[v(_(e.product_name_text),1)])),_:2},1024),o(l,{class:"ti-shop-spec"},{default:i((()=>[v(_(e.product_attr),1)])),_:2},1024)])),_:2},1024),o(l,{class:"ti-shop-body-money"},{default:i((()=>[o(a,{class:"ti-shop-price"},{default:i((()=>[v(_(b(W)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024),o(a,{class:"ti-shop-subPrice"},{default:i((()=>[v(_(b(M)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024)])),_:2},1024),o(l,{class:"ti-shop-body-number"},{default:i((()=>[o(ke,{productItem:e,onChange:t[0]||(t[0]=e=>x())},null,8,["productItem"])])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})])),_:1}),o(l,{class:"ti-content-bottom"},{default:i((()=>[o(l,{class:"ti-car-shop-bottom"},{default:i((()=>[o(l,{class:"ti-shop-bottom-item"},{default:i((()=>[o(l,null,{default:i((()=>[o(a,{class:"ti-shop-bottom-text"},{default:i((()=>{var e;return[v(_(b(y)("共")+((null==(e=r.value)?void 0:e.unSendKitchenProductTotalNum)||0)+b(y)("件")),1)]})),_:1})])),_:1}),o(l,null,{default:i((()=>[o(a,{class:"ti-shop-bottom-text"},{default:i((()=>[v(_(b(y)("小計：")),1)])),_:1}),o(a,{class:"ti-shop-bottom-price"},{default:i((()=>{var e;return[v(_(b(W)((null==(e=r.value)?void 0:e.unSendKitchenProductTotalPrice)||0)),1)]})),_:1}),o(a,{class:"ti-shop-bottom-subPrice"},{default:i((()=>{var e;return[v(_(b(M)((null==(e=r.value)?void 0:e.unSendKitchenProductTotalPrice)||0)),1)]})),_:1})])),_:1})])),_:1})])),_:1}),o(C,{title:b(y)("確認下單"),type:"primary",onClick:I},null,8,["title"])])),_:1})])),_:1})):A("",!0),(null==(p=m.value)?void 0:p.length)<=0?(u(),s(l,{key:1,class:"ti-empty-data-box"},{default:i((()=>[o(T,{title:b(y)("當前無待下單商品")},null,8,["title"])])),_:1})):A("",!0)]})),_:1})}}},[["__scopeId","data-v-508af573"]]),Ae=H({__name:"dish-car-ordered-list",setup(t){const l=e([]);(async()=>{try{const t=await(e={table_id:C()},G("order.Order/getSendKitchen",e));l.value=t.data.list||[]}catch(t){}var e})();return(e,t)=>{const a=f,r=p,m=h,g=k(w("ti-empty-data"),ee);return u(),s(a,{class:"ti-shop-list"},{default:i((()=>[Object.keys(l.value).length>0?(u(),s(m,{key:0,class:"ti-shop-scroll","scroll-y":""},{default:i((()=>[(u(!0),c(d,null,n(l.value,((e,t)=>(u(),s(a,{class:"ti-shop-item",key:t},{default:i((()=>[o(a,{class:"ti-shop-time-top"}),o(a,{class:"ti-shop-time-box"},{default:i((()=>[v(_(e.date+" "+b(y)("下單")),1)])),_:2},1024),(u(!0),c(d,null,n(e.plist,((t,l)=>(u(),s(a,{key:l},{default:i((()=>[o(a,{class:"ti-shop-item-box"},{default:i((()=>[o(a,{class:"ti-shop-box"},{default:i((()=>[o(a,{class:"ti-shop-body-top"},{default:i((()=>[o(a,{class:"ti-shop-title text-ellipsis"},{default:i((()=>[v(_(t.product_name_text),1)])),_:2},1024),o(a,{class:"ti-shop-spec"},{default:i((()=>[v(_(t.product_attr),1)])),_:2},1024)])),_:2},1024),o(a,{class:"ti-shop-body-money"},{default:i((()=>[o(r,{class:"ti-shop-price"},{default:i((()=>[v(_(b(W)((null==t?void 0:t.product_price)||0)),1)])),_:2},1024),o(r,{class:"ti-shop-subPrice"},{default:i((()=>[v(_(b(M)((null==t?void 0:t.product_price)||0)),1)])),_:2},1024)])),_:2},1024),o(a,{class:"ti-shop-body-state"},{default:i((()=>[o(a,{class:"ti-state-left"},{default:i((()=>[v(_(t.finish_num),1)])),_:2},1024),o(a,{class:"ti-state-line"},{default:i((()=>[v("/")])),_:1}),o(a,{class:"ti-state-right"},{default:i((()=>[v(_(t.total_num),1)])),_:2},1024),o(a,{class:"ti-state-text"},{default:i((()=>{return[v(_((e=t.kitchen_status,y(0===e?"製作中":1===e?"已完成":"未知"))),1)];var e})),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024),l!=e.length-1?(u(),s(a,{key:0,class:"ti-shop-item-box-bottom-border"})):A("",!0)])),_:2},1024)))),128))])),_:2},1024)))),128))])),_:1})):A("",!0),Object.keys(l.value).length<=0?(u(),s(g,{key:1,class:"ti-empty-data",title:b(y)("當前無已下單商品")},null,8,["title"])):A("",!0)])),_:1})}}},[["__scopeId","data-v-bd29da58"]]),Ie=H({__name:"dish-list",emits:["success"],setup(l,{emit:a}){const m=e(!1),x=e({category_id:null,shop_supplier_id:null,page:1,list_rows:30}),I=e([]),T=e(!1),L=e(),U=e(!1);t((()=>x.value.category_id),(()=>{R()}));const j=()=>{X.value.getCarData()},K=()=>{U.value&&(x.value.page+=1,B())},R=()=>{x.value.page=1,x.value.shop_supplier_id=N(),B(!0)},O=e(0),B=async e=>{var t,l,a,u,s,i;if(T.value)return;const o={...x.value};o.category_id||(o.category_id=null),1==O.value&&(o.is_special=1);try{e&&(T.value=!0);const c=await function(e){return G("product.product/index",e,{isLoading:!1})}(o);1==x.value.page&&(I.value=[]),I.value=I.value.concat((null==(l=null==(t=c.data)?void 0:t.list)?void 0:l.data)||[]),U.value=(null==(u=null==(a=c.data)?void 0:a.list)?void 0:u.last_page)>(null==(i=null==(s=c.data)?void 0:s.list)?void 0:i.current_page)}catch(c){}finally{e&&(T.value=!1)}};R(),g("closeShowLanguage",(e=>{e.isSelectLanguage&&setTimeout((()=>{R()}),500)})),g("refresh",(e=>{R()})),e([]);const D=e(),E=()=>{D.value=!0,q.value=!0},F=()=>{J(!1)},Q=e([]),J=async e=>{var t;try{const l=await ye({table_id:C()},e);Q.value=(null==(t=l.data.detail)?void 0:t.unSendKitchenProduct)||[],Q.value.length>0?V():(D.value=!0,q.value=!1)}catch(l){}},V=async()=>{try{const e=await ge({table_id:C()});P({title:y(e.msg),icon:"none"}),setTimeout((()=>{a("success"),X.value.getCarData(),D.value=!0,q.value=!1}),300)}catch(e){}},$=(e,t)=>{e||(D.value=!1)},q=e(!0),z=e=>{q.value=e},H=()=>{q.value=!1};q.value=!0;const X=e();return(e,t)=>{const l=k(w("ti-loading"),Y),a=S,g=p,C=f,N=k(w("ti-empty-data"),ee),R=h,B=k(w("ti-drawer"),te);return u(),c(d,null,[o(C,{class:"ti-dish-box"},{default:i((()=>[o(me,{categoryId:x.value.category_id,"onUpdate:categoryId":t[0]||(t[0]=e=>x.value.category_id=e),isSpecial:O.value,"onUpdate:isSpecial":t[1]||(t[1]=e=>O.value=e)},null,8,["categoryId","isSpecial"]),o(C,{class:"ti-dish-list"},{default:i((()=>[o(R,{class:"ti-scroll","scroll-y":"","lower-threshold":50,onScrolltolower:K},{default:i((()=>[T.value?(u(),s(l,{key:0})):I.value&&I.value.length>0?(u(),c(d,{key:1},[o(C,{class:"ti-dish-goods"},{default:i((()=>[(u(!0),c(d,null,n(I.value,((e,t)=>(u(),s(C,{key:t,class:r([{"sold-out":e.product_stock<=0},"ti-goods-item"]),onClick:t=>(e=>{if(e.product_stock<=0)return P({title:y("已售罄"),icon:"none"});m.value=!0,L.value=e.product_id})(e)},{default:i((()=>[o(C,{class:"ti-goods-image"},{default:i((()=>[e.image&&e.image[0]&&e.image[0].file_path?(u(),s(a,{key:0,src:e.image[0].file_path,mode:"scaleToFill"},null,8,["src"])):A("",!0),o(g,{class:"sold-out-text"},{default:i((()=>[v(_(b(y)("已售罄")),1)])),_:1})])),_:2},1024),o(C,{class:"ti-goods-content"},{default:i((()=>[o(C,{class:"ti-goods-title"},{default:i((()=>[v(_(e.product_name_text),1)])),_:2},1024),o(C,{class:"ti-price-box"},{default:i((()=>[o(g,{class:"ti-goods-price"},{default:i((()=>[v(_(b(W)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024),o(g,{class:"ti-goods-subPrice"},{default:i((()=>[v(_(b(M)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))])),_:1}),o(l,{status:U.value?"loading":"no-more"},null,8,["status"])],64)):(u(),s(N,{key:2}))])),_:1})])),_:1}),o(C,{class:"ti-car-order-nav"},{default:i((()=>[o(xe,{ref_key:"carRef",ref:X,onCar:E,onConfirm:F},null,512)])),_:1})])),_:1}),o(be,{show:m.value,"onUpdate:show":t[2]||(t[2]=e=>m.value=e),productId:L.value,onSuccess:j},null,8,["show","productId"]),o(B,{show:D.value,width:603.992,title:b(y)("我點的菜"),maskClick:!0,onChange:$},{content:i((()=>[o(C,{class:"ti-drawer-content"},{default:i((()=>[o(C,{class:"ti-content-head"},{default:i((()=>[o(C,{class:"ti-switch-box"},{default:i((()=>[o(C,{class:r(q.value?"ti-switch-on":"ti-switch-off"),onClick:t[3]||(t[3]=e=>z(!0))},{default:i((()=>[o(g,{class:r(q.value?"ti-switch-text-on":"ti-switch-text-off")},{default:i((()=>[v(_(b(y)("未下單")),1)])),_:1},8,["class"])])),_:1},8,["class"]),o(C,{class:"ti-switch-space"}),o(C,{class:r(q.value?"ti-switch-off":"ti-switch-on"),onClick:t[4]||(t[4]=e=>z(!1))},{default:i((()=>[o(g,{class:r(q.value?"ti-switch-text-off":"ti-switch-text-on")},{default:i((()=>[v(_(b(y)("已下單")),1)])),_:1},8,["class"])])),_:1},8,["class"])])),_:1})])),_:1}),q.value?(u(),s(we,{key:0,onSuccess:H,onChange:j})):A("",!0),q.value?A("",!0):(u(),s(Ae,{key:1}))])),_:1})])),footer:i((()=>[o(C)])),_:1},8,["show","width","title"])],64)}}},[["__scopeId","data-v-dafc2777"]]),Ce=H({__name:"opentable-index",setup(t){const{changeLocale:l}=le();e(!1);const a=()=>{H()},c=()=>{B("refresh",{})},d=e(),n=e("");e([]);const r=e(),h=e(!1),m=e({ip:"",port:"",device_id:""}),x=()=>{const e=ae();m.value.ip=(null==e?void 0:e.ip)||ue()||"127.0.0.1",m.value.port=(null==e?void 0:e.port)||"8080"},A=e=>{m.value.ip=e},I=e=>{m.value.port=e},T=async()=>{var e;const t={...m.value};if(t.ip)if(t.port)try{const l=await ne(re(`${null==t?void 0:t.ip}:${t.port}`));ve(t),D(l.data.app_id),E(l.data.shop_supplier_id),ie(null==(e=l.data)?void 0:e.currency),setTimeout((()=>{h.value=!0}),150)}catch(l){P({title:y("绑定失败"),icon:"none"})}else P({title:y("請輸入連接埠"),icon:"none"});else P({title:y("請輸入伺服器位址"),icon:"none"})},S=e=>{h.value=!1,e&&(r.value=e,n.value=e.table_no)},L=()=>{x(),n.value=R().table_no,r.value=R()},N=async()=>{var e;const t={...m.value};if(t.ip)if(t.port)try{const l=await ne(re(`${null==t?void 0:t.ip}:${t.port}`));if(!r.value)return void P({title:y("請查找桌位"),icon:"none"});ve(t),D(l.data.app_id),E(l.data.shop_supplier_id),ie(null==(e=l.data)?void 0:e.currency),setTimeout((()=>{Y()}),150)}catch(l){P({title:y("绑定失败"),icon:"none"})}else P({title:y("請輸入連接埠"),icon:"none"});else P({title:y("請輸入伺服器位址"),icon:"none"})},Y=async()=>{if(C()===r.value.table_id)return P({title:y("绑定成功"),icon:"none"}),d.value=!1,F(!1),void setTimeout((()=>{Q({url:"/pages/index/index"})}),150);try{await _e({table_id:r.value.table_id,old_table_id:C()});J(r.value),P({title:y("绑定成功"),icon:"none"}),d.value=!1,F(!1),setTimeout((()=>{Q({url:"/pages/index/index"})}),150)}catch(e){}},G=e(!1),H=()=>{G.value=!0},W=async e=>{if(e)try{await q({password:e});d.value=!0,r.value=R(),n.value=r.value.table_no,M()}catch(t){}else P({title:y("請輸入密碼"),icon:"none"})},M=()=>{G.value=!1};x(),U({success:e=>{m.value.device_id=e.deviceId}});const X=e();j((()=>{clearTimeout(X.value)}));const Z=e({name:"",logo:"",tableNo:"",is_call_service:1}),ee=async e=>{var t,a,u,s,i,o,c;try{const d=await se(e);Z.value.name=d.data.name,Z.value.logo=d.data.logo,Z.value.tableNo=R().table_no,Z.value.is_call_service=parseInt(null==(a=null==(t=null==d?void 0:d.data)?void 0:t.tablet)?void 0:a.is_call_service),ie(null==(u=d.data)?void 0:u.currency);const n="zh-tw"==(null==(i=null==(s=null==d?void 0:d.data)?void 0:s.tablet)?void 0:i.default_language)?"zh-TW":(null==(c=null==(o=null==d?void 0:d.data)?void 0:o.tablet)?void 0:c.default_language)||"en";n!=O()&&l(n),oe(d)}catch(d){}};return g("refresh",(e=>{ee(!1)})),K((()=>{ee(!1)})),(e,t)=>{const l=k(w("ti-layout-head"),z),r=f,g=p,x=k(w("ti-input"),pe),C=k(w("ti-modal"),V),P=k(w("ti-layout-table-list"),fe);return u(),s(r,{class:"ti-page",onClick:t[1]||(t[1]=e=>b(de)())},{default:i((()=>[o(r,null,{default:i((()=>[o(l,{isPay:!0,isTableNo:!0,onDoubleLogo:a,onRefresh:c,is_call_service:Z.value.is_call_service},null,8,["is_call_service"])])),_:1}),o($,{show:G.value,title:b(y)("密碼"),password:!0,placeholder:b(y)("請輸入密碼"),onExit:M,onConfirm:W},null,8,["show","title","placeholder"]),o(Ie),o(C,{show:d.value,title:b(y)("設置"),cancelText:b(y)("重置"),confirmText:b(y)("確定"),onCancel:L,onConfirm:N},{content:i((()=>[o(r,{class:"ti-item-input"},{default:i((()=>[o(r,{class:"ti-label-box"},{default:i((()=>[o(r,{class:"ti-label-left"},{default:i((()=>[o(g,{class:"ti-label-server"},{default:i((()=>[v(_(b(y)("服務器連接地址")),1)])),_:1})])),_:1}),o(r,{class:"ti-label-right",onClick:T},{default:i((()=>[o(g,{class:"ti-label-table"},{default:i((()=>[v(_(n.value?b(y)("已選 : ")+b(ce)(n.value,19):b(y)("查找桌位")),1)])),_:1})])),_:1})])),_:1}),o(r,{class:"ti-input-box"},{default:i((()=>[o(x,{type:"text",onInput:A,value:m.value.ip,placeholder:b(y)("伺服器位址"),clearable:!1},null,8,["value","placeholder"]),o(r,{class:"ti-colon"},{default:i((()=>[v(":")])),_:1}),o(r,{class:"ti-input-port"},{default:i((()=>[o(x,{type:"number",onInput:I,value:m.value.port,placeholder:b(y)("端口"),clearable:!1},null,8,["value","placeholder"])])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title","cancelText","confirmText"]),o(P,{show:h.value,"onUpdate:show":t[0]||(t[0]=e=>h.value=e),onConfirm:S},null,8,["show"])])),_:1})}}},[["__scopeId","data-v-66418702"]]);export{Ce as default};