import{r as t,J as e,K as l,L as a,d as s,e as u,w as i,k as c,l as o,F as d,m as n,M as r,n as v,t as _,E as p,j as f,N as h,O as m,$ as y,P as g,u as b,Q as x,z as k,A as w,f as A,R as I,v as C,T,s as P,B as S,I as L,U,g as K,V as j,b as N,p as R,q as E,x as O,y as B,h as D}from"./index-68fc3389.js";import{a as F,b as Q,D as J,v as V,_ as Y}from"./verify.d372c18a.js";import{$,_ as q,o as H,p as M,q as G,m as z,r as W,u as X,g as Z,a as tt,c as et,d as lt,v as at,f as st,h as ut,s as it,i as ct,k as ot,l as dt}from"./baseinfo.bfc43fc8.js";const nt=q({__name:"dish-menu",props:{list:{type:Array,default:()=>[]},menuId:{type:Number,default:null}},emits:["update:menuId"],setup(m,{emit:y}){const g=m,b=t(0),x=t(0),k=t([]);e((()=>g.list),(async t=>{if(await l(),!t||0==t.length)return;const e=a().in(this);if(t.map(((t,l)=>{e.select(`#scroll-item-${l}`).boundingClientRect((t=>{if(!t)return;const e=k.value;e[l]=t.width+10,k.value=e})).exec()})),g.menuId>0){const t=g.list.findIndex((t=>t.category_id==g.menuId));t>-1&&w(t)}}),{deep:!0,immediate:!0});const w=t=>{x.value=t,b.value=k.value.slice(0,t+1).reduce(((t,e)=>t+e),0)-(k.value[t]+100),y("update:menuId",g.list[t].category_id)};return(t,e)=>{const l=p,a=f,m=h;return s(),u(m,{class:"ti-dish-menu","scroll-left":b.value,"scroll-x":"","enable-flex":"","scroll-with-animation":""},{default:i((()=>[c(a,{class:"ti-menu-content"},{default:i((()=>[(s(!0),o(d,null,n(g.list,((e,o)=>(s(),u(a,{key:o,class:r(["ti-menu-item",{active:o==x.value}]),id:`scroll-item-${o}`,onClick:t=>w(o)},{default:i((()=>[c(l,{class:"ti-menu-title"},{default:i((()=>[v(_(0===o?t.$t(e.name_text):e.name_text),1)])),_:2},1024)])),_:2},1032,["id","class","onClick"])))),128))])),_:1})])),_:1},8,["scroll-left"])}}},[["__scopeId","data-v-440ee506"]]),rt=q({__name:"dish-category",props:{categoryId:{type:Number,default:null}},emits:["update:categoryId"],setup(l,{emit:a}){const p=t([]),h=t(0),x=t(0),k=m((()=>{let t=(p.value.find((t=>t.category_id==h.value))||{}).child||[];return t&&t.length>0&&(t=[{name_text:y("全部"),category_id:0}].concat(t)),t})),w=m((()=>p.value.find((t=>t.category_id==h.value)))),A=m((()=>k.value.find((t=>t.category_id==x.value))));e((()=>h.value),(()=>{var t;k&&k.length>0&&(x.value=k.value[0].category_id),a("update:isSpecial",null==(t=w.value)?void 0:t.is_special),a("update:categoryId",h.value)}));const I=async t=>{try{const e=await function(t){return $("product.category/index",{isLoading:t})}(t);e.data.list&&(p.value=[{name_text:y("全部"),category_id:0}].concat(e.data.list),h.value=p.value[0].category_id)}catch(e){}};return I(!0),g("closeShowLanguage",(t=>{t.isSelectLanguage&&setTimeout((()=>{I(!1)}),500)})),(t,e)=>{const l=f;return s(),u(l,{class:"ti-category-box"},{default:i((()=>[c(nt,{list:p.value,menuId:h.value,"onUpdate:menuId":e[0]||(e[0]=t=>h.value=t)},null,8,["list","menuId"]),c(l,{class:"ti-dish-secondary"},{default:i((()=>[(s(!0),o(d,null,n(b(k),((t,e)=>(s(),u(l,{key:e,class:r([{active:t.category_id==x.value},"ti-secondary-item"]),onClick:e=>{return l=t.category_id,x.value=l,a("update:isSpecial",null==(s=A.value)?void 0:s.is_special),void a("update:categoryId",x.value>0?x.value:h.value);var l,s}},{default:i((()=>[v(_(0===e?b(y)(t.name_text):t.name_text),1)])),_:2},1032,["class","onClick"])))),128))])),_:1})])),_:1})}}},[["__scopeId","data-v-ac8ba858"]]);function vt(t,e){return $("order.Order/getUnSendKitchen",t,{isLoading:e})}function _t(t){return $("order.Order/sendKitchen",t)}const pt=q({__name:"goods-detail",props:{show:{type:Boolean,default:!1},productId:{type:Number,default:null}},emits:["update:show","success"],setup(l,{emit:a}){const m=l,g=t({}),L=t(!1),U=t(!1),K=t({product_id:null,product_num:1,price:null,product_price:null,product_sku_id:null,attr:[],feed:[],bag_price:0,delivery:x()?30:40,describe:null});e((()=>m.show),(()=>{m.show&&j()}));const j=async()=>{var t,e,l,a,s,u,i,c,o,d;if(!L.value||m.productId)try{L.value=!0;const n=await(d=m.productId,$("product.product/detail",{product_id:d}));g.value=n.data,K.value.product_id=null==(t=g.value)?void 0:t.product_id,K.value.price=null==(e=g.value)?void 0:e.product_price,K.value.product_price=null==(l=g.value)?void 0:l.product_price,(null==(a=g.value)?void 0:a.sku)&&(null==(s=g.value)?void 0:s.sku.length)>0&&(K.value.product_sku_id=null==(u=g.value)?void 0:u.sku[0].product_sku_id),(null==(i=g.value)?void 0:i.product_attr)&&(null==(c=g.value)?void 0:c.product_attr.length)>0&&(null==(o=g.value)||o.product_attr.map(((t,e)=>{(null==t?void 0:t.attribute_value)&&(null==t?void 0:t.attribute_value.length)>0?K.value.attr[e]=0:K.value.attr[e]=null}))),K.value.feed&&K.value.feed.length>0&&(K.value.feed=[])}catch(n){}finally{L.value=!1}},N=async()=>{var t,e,l,s,u,i,c,o,d;if(U.value)return;const n={...K.value};n.attr=n.attr.join(","),n.feed=n.feed.join(",");let r=[];(null==(t=g.value)?void 0:t.sku)&&(null==(e=g.value)?void 0:e.sku.length)>0&&r.push(null==(l=g.value)?void 0:l.sku.find((t=>t.product_sku_id==K.value.product_sku_id)).spec_name_text),(null==(s=g.value)?void 0:s.product_attr)&&(null==(u=g.value)?void 0:u.product_attr.length)&&(null==(i=g.value)||i.product_attr.map(((t,e)=>{(null==t?void 0:t.attribute_value)&&(null==t?void 0:t.attribute_value.length)>0&&(null==t?void 0:t.attribute_value[K.value.attr[e]])&&r.push(null==t?void 0:t.attribute_value[K.value.attr[e]])}))),(null==(c=g.value)?void 0:c.product_feed)&&(null==(o=g.value)?void 0:o.product_feed.length)>0&&(null==(d=g.value)||d.product_feed.map(((t,e)=>{R(e)&&(r.push(t.feed_name_text),n.price=G(n.price,null==t?void 0:t.price))}))),n.describe=r.join(";"),n.delivery=x()?30:40,n.order_id=I(),n.table_id=C();try{U.value=!0;const t=await function(t){return $("order.Order/add",t)}(n);1==t.code&&(T(t.data.order_id),P({title:t.msg,icon:"none"}),a("update:show",!1),setTimeout((()=>{a("success")}),100))}catch(v){}finally{U.value=!1}},R=t=>K.value.feed.indexOf(t)>-1,E=(t,e)=>K.value.attr[t]==e;return(t,e)=>{const l=S,x=f,I=p,C=h,T=k(w("ti-modal"),F);return s(),u(T,{show:m.show,title:b(y)("商品詳情"),cancelText:b(y)("取消"),confirmText:b(y)("確定"),confirmLoading:U.value,onCancel:e[0]||(e[0]=t=>a("update:show",!1)),onConfirm:N},{content:i((()=>[c(x,{class:"ti-dialog-content"},{default:i((()=>[c(x,{class:"ti-detail-box"},{default:i((()=>[c(x,{class:"ti-detail-image"},{default:i((()=>{var t,e,a,i;return[(null==(t=g.value)?void 0:t.image)&&(null==(e=g.value)?void 0:e.image[0])&&(null==(a=g.value)?void 0:a.image[0].file_path)?(s(),u(l,{key:0,src:null==(i=g.value)?void 0:i.image[0].file_path,mode:"widthFix"},null,8,["src"])):A("",!0)]})),_:1}),c(x,{class:"ti-detail-con"},{default:i((()=>[c(x,{class:"ti-detail-title text-ellipsis"},{default:i((()=>{var t;return[v(_(null==(t=g.value)?void 0:t.product_name_text),1)]})),_:1}),c(x,{class:"ti-price-box"},{default:i((()=>[c(I,{class:"ti-detail-unit"},{default:i((()=>[v(_(b(y)("單價：")),1)])),_:1}),c(I,{class:"ti-detail-price"},{default:i((()=>{var t;return[v(_(b(H)((null==(t=g.value)?void 0:t.product_price)||0)),1)]})),_:1}),c(I,{class:"ti-detail-subPrice"},{default:i((()=>{var t;return[v(_(b(M)((null==(t=g.value)?void 0:t.product_price)||0)),1)]})),_:1})])),_:1}),c(x,{class:"ti-price-box"},{default:i((()=>[c(I,{class:"ti-detail-unit"},{default:i((()=>[v(_(b(y)("單位：")),1)])),_:1}),c(I,{class:"ti-detail-price"},{default:i((()=>{var t;return[v(_(null==(t=g.value)?void 0:t.product_unit_text),1)]})),_:1})])),_:1})])),_:1})])),_:1}),c(x,{class:"ti-detail-specs"},{default:i((()=>[c(C,{"scroll-y":""},{default:i((()=>[c(x,{class:"ti-specs-box"},{default:i((()=>{var t,e,l,a,p,f,h;return[(null==(t=g.value)?void 0:t.sku)&&(null==(e=g.value)?void 0:e.sku.length)>0?(s(),u(x,{key:0,class:"ti-specs-item"},{default:i((()=>[c(x,{class:"ti-specs-title"},{default:i((()=>[v(_(b(y)("規格")),1)])),_:1}),c(x,{class:"ti-specs-child"},{default:i((()=>{var t;return[(s(!0),o(d,null,n(null==(t=g.value)?void 0:t.sku,(t=>(s(),u(x,{key:t.product_sku_id,class:r([{active:t.product_sku_id==K.value.product_sku_id},"ti-child-item"]),onClick:e=>{return l=t.product_sku_id,void(K.value.product_sku_id!=l&&(K.value.product_sku_id=l));var l}},{default:i((()=>[c(I,{class:"ti-child-name"},{default:i((()=>[v(_(t.spec_name_text),1)])),_:2},1024),c(I,{class:"ti-child-price"},{default:i((()=>[v(_(b(H)((null==t?void 0:t.product_price)||0)),1)])),_:2},1024),c(I,{class:"ti-child-subPrice"},{default:i((()=>[v(_(b(M)((null==t?void 0:t.product_price)||0)),1)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))]})),_:1})])),_:1})):A("",!0),(null==(l=g.value)?void 0:l.product_attr)&&(null==(a=g.value)?void 0:a.product_attr.length)>0?(s(!0),o(d,{key:1},n(null==(p=g.value)?void 0:p.product_attr,((t,e)=>(s(),u(x,{key:e,class:"ti-specs-item"},{default:i((()=>[c(x,{class:"ti-specs-title"},{default:i((()=>[v(_(t.attribute_name_text),1)])),_:2},1024),c(x,{class:"ti-specs-child"},{default:i((()=>[(s(!0),o(d,null,n(null==t?void 0:t.attribute_value_text,((t,l)=>(s(),u(x,{key:l,class:r([{active:E(e,l)},"ti-child-item"]),onClick:t=>((t,e)=>{K.value.attr[t]=e})(e,l)},{default:i((()=>[c(I,{class:"ti-child-name"},{default:i((()=>[v(_(t),1)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))])),_:2},1024)])),_:2},1024)))),128)):A("",!0),(null==(f=g.value)?void 0:f.product_feed)&&(null==(h=g.value)?void 0:h.product_feed.length)>0?(s(),u(x,{key:2,class:"ti-specs-item"},{default:i((()=>[c(x,{class:"ti-specs-title"},{default:i((()=>[v(_(b(y)("加料")),1)])),_:1}),c(x,{class:"ti-specs-child"},{default:i((()=>{var t;return[(s(!0),o(d,null,n(null==(t=g.value)?void 0:t.product_feed,((t,e)=>(s(),u(x,{key:e,class:r([{active:R(e)},"ti-child-item"]),onClick:t=>(t=>{const e=K.value.feed.indexOf(t);e>=0?K.value.feed.splice(e,1):K.value.feed.push(t)})(e)},{default:i((()=>[c(I,{class:"ti-child-name"},{default:i((()=>[v(_(t.feed_name_text),1)])),_:2},1024),c(I,{class:"ti-child-price"},{default:i((()=>[v(_(b(H)((null==t?void 0:t.price)||0)),1)])),_:2},1024),c(I,{class:"ti-child-subPrice"},{default:i((()=>[v(_(b(M)((null==t?void 0:t.price)||0)),1)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))]})),_:1})])),_:1})):A("",!0)]})),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title","cancelText","confirmText","confirmLoading"])}}},[["__scopeId","data-v-389ed01d"]]),ft=q({__name:"dish-car-order-nav",emits:["car","confirm"],setup(e,{expose:l,emit:a}){const o=()=>{a("car")},d=()=>{a("confirm")},n=t(),r=t(!1),h=async()=>{var t;try{const e=await vt({table_id:C()},!1);n.value=(null==(t=e.data)?void 0:t.detail)||{},n.value.totalNum>0?r.value=!0:r.value=!1}catch(e){}};return h(),l({getCarData:h}),(t,e)=>{const l=S,a=p,h=f;return s(),u(h,{class:"ti-car-order"},{default:i((()=>[c(h,{class:"ti-order-total",onClick:o},{default:i((()=>[c(l,{class:"ti-total-image",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE9SURBVHgB7ZjxrcIgEMY/Xt4AbvAYwRHc4DmKbuAG6gR1A92g3UA3sE6gTnAesZqG1gLKSf/oL7nQwKV8Be6AAj1DPR6IaMTF6NmgVIlUGDFsR2qSVUJ7I8iQIwWVKF2zWU3UBH2AhexJhtx8dFufPw5NF8gwYTu2jbxLkIYsmV3hEiQdYdoepdSCGn38OpzXbP+Qo2Q7YCAA9aqhyhNbyK6jHe+Zcy9PFrQgec52v11R9o0IayTe1IJKu6JL0B8S4EqM0lztii5BGvIELWoNeU52ReopC4qyAvL472PmWECyZAiF5LJ1Ti9uM8pDlMb9yKnxOWbNHHj/KjDwJs4pq8PTN+VizFb4DHuofxD88qW1MGcx/UPFjFsi5RzLv84nmTr0eBL3OEPNnxGrmP7vCDKXuk2V1Bax/Qd8uQE+N6CHpHz4IAAAAABJRU5ErkJggg=="}),c(a,{class:"ti-total-price"},{default:i((()=>{var t;return[v(_(b(H)((null==(t=n.value)?void 0:t.totalPrice)||0)),1)]})),_:1}),c(a,{class:"ti-total-subPrice"},{default:i((()=>{var t;return[v(_(b(M)((null==(t=n.value)?void 0:t.totalPrice)||0)),1)]})),_:1})])),_:1}),r.value?(s(),u(h,{key:0,class:"ti-total-badge-box"},{default:i((()=>[c(a,{class:"ti-total-badge"},{default:i((()=>{var t;return[v(_(null==(t=n.value)?void 0:t.totalNum),1)]})),_:1})])),_:1})):A("",!0),c(h,{class:"ti-order-btn",onClick:d},{default:i((()=>[c(a,{class:"ti-btn-text"},{default:i((()=>[v(_(t.$t("下單")),1)])),_:1})])),_:1})])),_:1})}}},[["__scopeId","data-v-a882e2b1"]]),ht=q({__name:"cart-number",props:{productItem:{type:Object,default:()=>({})}},emits:["change"],setup(e,{emit:l}){const a=e,o=t(!1),d=async t=>{var e,s;const u={order_product_id:null==(e=a.productItem)?void 0:e.order_product_id,product_num:null==(s=a.productItem)?void 0:s.total_num,type:t};"up"==t?u.product_num+=1:u.product_num-=1;try{o.value=!0;const t=await function(t){return $("order.Order/sub",t)}(u);1==t.code&&l("change")}catch(i){}finally{o.value=!1}};return(t,l)=>{const a=f;return s(),u(a,{class:"ti-number-box",onClick:l[2]||(l[2]=L((()=>{}),["stop"]))},{default:i((()=>[c(a,{class:"ti-number-btn ti-number-minus",disabled:!1,onClick:l[0]||(l[0]=t=>d("down"))},{default:i((()=>[c(a,{class:"ti-number-minus-reduce"})])),_:1}),c(a,{class:"ti-number-input"},{default:i((()=>[v(_(e.productItem.total_num),1)])),_:1}),c(a,{class:"ti-number-btn ti-number-plus",disabled:!1,onClick:l[1]||(l[1]=t=>d("up"))},{default:i((()=>[c(a,{class:"ti-number-plus-add"}),c(a,{class:"ti-number-plus-add2"})])),_:1})])),_:1})}}},[["__scopeId","data-v-d611c51e"]]),mt=q({__name:"dish-car-ordering-list",emits:["success","change"],setup(e,{emit:l}){const a=t(!1),r=t(),m=t(),g=t({table_id:""}),x=async t=>{var e;g.table_id=C();try{const t=await vt(g,!1);r.value=t.data.detail,m.value=(null==(e=t.data.detail)?void 0:e.unSendKitchenProduct)||[],l("change")}catch(a){}},I=async t=>{try{a.value=!0;const t=await _t({table_id:C()});P({title:y(t.msg),icon:"none"}),setTimeout((()=>{l("success")}),500)}catch(e){}finally{a.value=!1}};return x(),(t,e)=>{const l=f,a=p,g=h,C=k(w("ti-button"),z),T=k(w("ti-empty-data"),W);return s(),u(l,{class:"ti-shop-list-box"},{default:i((()=>{var t,p;return[(null==(t=m.value)?void 0:t.length)>0?(s(),u(l,{key:0,class:"ti-shop-list"},{default:i((()=>[c(l,null,{default:i((()=>[c(l,{class:"ti-cart-shop-head"},{default:i((()=>[c(l,{class:"ti-shop-head-title"},{default:i((()=>[v(_(b(y)("商品名稱")),1)])),_:1}),c(l,{class:"ti-shop-head-money"},{default:i((()=>[v(_(b(y)("金額")),1)])),_:1}),c(l,{class:"ti-shop-head-num"},{default:i((()=>[v(_(b(y)("數量")),1)])),_:1})])),_:1})])),_:1}),c(l,{class:"ti-scroll-box"},{default:i((()=>[c(g,{class:"ti-shop-scroll","scroll-y":""},{default:i((()=>[c(l,{class:"ti-shop-box"},{default:i((()=>[(s(!0),o(d,null,n(m.value,((t,o)=>(s(),u(l,{class:"ti-shop-item",key:t},{default:i((()=>[c(l,{class:"ti-shop-item-box"},{default:i((()=>[c(l,{class:"ti-shop-box"},{default:i((()=>[c(l,{class:"ti-shop-body-top"},{default:i((()=>[c(l,{class:"ti-shop-title text-ellipsis"},{default:i((()=>[v(_(t.product_name_text),1)])),_:2},1024),c(l,{class:"ti-shop-spec"},{default:i((()=>[v(_(t.product_attr),1)])),_:2},1024)])),_:2},1024),c(l,{class:"ti-shop-body-money"},{default:i((()=>[c(a,{class:"ti-shop-price"},{default:i((()=>[v(_(b(H)((null==t?void 0:t.product_price)||0)),1)])),_:2},1024),c(a,{class:"ti-shop-subPrice"},{default:i((()=>[v(_(b(M)((null==t?void 0:t.product_price)||0)),1)])),_:2},1024)])),_:2},1024),c(l,{class:"ti-shop-body-number"},{default:i((()=>[c(ht,{productItem:t,onChange:e[0]||(e[0]=t=>x())},null,8,["productItem"])])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})])),_:1}),c(l,{class:"ti-content-bottom"},{default:i((()=>[c(l,{class:"ti-car-shop-bottom"},{default:i((()=>[c(l,{class:"ti-shop-bottom-item"},{default:i((()=>[c(l,null,{default:i((()=>[c(a,{class:"ti-shop-bottom-text"},{default:i((()=>{var t;return[v(_(b(y)("共")+((null==(t=r.value)?void 0:t.unSendKitchenProductTotalNum)||0)+b(y)("件")),1)]})),_:1})])),_:1}),c(l,null,{default:i((()=>[c(a,{class:"ti-shop-bottom-text"},{default:i((()=>[v(_(b(y)("小計：")),1)])),_:1}),c(a,{class:"ti-shop-bottom-price"},{default:i((()=>{var t;return[v(_(b(H)((null==(t=r.value)?void 0:t.unSendKitchenProductTotalPrice)||0)),1)]})),_:1}),c(a,{class:"ti-shop-bottom-subPrice"},{default:i((()=>{var t;return[v(_(b(M)((null==(t=r.value)?void 0:t.unSendKitchenProductTotalPrice)||0)),1)]})),_:1})])),_:1})])),_:1})])),_:1}),c(C,{title:b(y)("確認下單"),type:"primary",onClick:I},null,8,["title"])])),_:1})])),_:1})):A("",!0),(null==(p=m.value)?void 0:p.length)<=0?(s(),u(l,{key:1,class:"ti-empty-data-box"},{default:i((()=>[c(T,{title:b(y)("當前無待下單商品")},null,8,["title"])])),_:1})):A("",!0)]})),_:1})}}},[["__scopeId","data-v-508af573"]]),yt=q({__name:"dish-car-ordered-list",setup(e){const l=t([]);(async()=>{try{const e=await(t={table_id:C()},$("order.Order/getSendKitchen",t));l.value=e.data.list||[]}catch(e){}var t})();return(t,e)=>{const a=f,r=p,m=h,g=k(w("ti-empty-data"),W);return s(),u(a,{class:"ti-shop-list"},{default:i((()=>[Object.keys(l.value).length>0?(s(),u(m,{key:0,class:"ti-shop-scroll","scroll-y":""},{default:i((()=>[(s(!0),o(d,null,n(l.value,((t,e)=>(s(),u(a,{class:"ti-shop-item",key:e},{default:i((()=>[c(a,{class:"ti-shop-time-top"}),c(a,{class:"ti-shop-time-box"},{default:i((()=>[v(_(t.date+" "+b(y)("下單")),1)])),_:2},1024),(s(!0),o(d,null,n(t.plist,((e,l)=>(s(),u(a,{key:l},{default:i((()=>[c(a,{class:"ti-shop-item-box"},{default:i((()=>[c(a,{class:"ti-shop-box"},{default:i((()=>[c(a,{class:"ti-shop-body-top"},{default:i((()=>[c(a,{class:"ti-shop-title text-ellipsis"},{default:i((()=>[v(_(e.product_name_text),1)])),_:2},1024),c(a,{class:"ti-shop-spec"},{default:i((()=>[v(_(e.product_attr),1)])),_:2},1024)])),_:2},1024),c(a,{class:"ti-shop-body-money"},{default:i((()=>[c(r,{class:"ti-shop-price"},{default:i((()=>[v(_(b(H)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024),c(r,{class:"ti-shop-subPrice"},{default:i((()=>[v(_(b(M)((null==e?void 0:e.product_price)||0)),1)])),_:2},1024)])),_:2},1024),c(a,{class:"ti-shop-body-state"},{default:i((()=>[c(a,{class:"ti-state-left"},{default:i((()=>[v(_(e.finish_num),1)])),_:2},1024),c(a,{class:"ti-state-line"},{default:i((()=>[v("/")])),_:1}),c(a,{class:"ti-state-right"},{default:i((()=>[v(_(e.total_num),1)])),_:2},1024),c(a,{class:"ti-state-text"},{default:i((()=>{return[v(_((t=e.kitchen_status,y(0===t?"製作中":1===t?"已完成":"未知"))),1)];var t})),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024),l!=t.length-1?(s(),u(a,{key:0,class:"ti-shop-item-box-bottom-border"})):A("",!0)])),_:2},1024)))),128))])),_:2},1024)))),128))])),_:1})):A("",!0),Object.keys(l.value).length<=0?(s(),u(g,{key:1,class:"ti-empty-data",title:b(y)("當前無已下單商品")},null,8,["title"])):A("",!0)])),_:1})}}},[["__scopeId","data-v-bd29da58"]]),gt=q({__name:"dish-list",emits:["success"],setup(l,{emit:a}){const m=t(!1),g=t({category_id:null,shop_supplier_id:null,page:1,list_rows:30}),x=t([]),I=t(!1),T=t(),L=t(!1);e((()=>g.value.category_id),(()=>{N()}));const K=()=>{Z.value.getCarData()},j=()=>{L.value&&(g.value.page+=1,E())},N=()=>{g.value.page=1,g.value.shop_supplier_id=U(),E(!0)},R=t(0),E=async t=>{var e,l,a,s,u,i;if(I.value)return;const c={...g.value};c.category_id||(c.category_id=null),1==R.value&&(c.is_special=1);try{t&&(I.value=!0);const o=await function(t){return $("product.product/index",t,{isLoading:!1})}(c);1==g.value.page&&(x.value=[]),x.value=x.value.concat((null==(l=null==(e=o.data)?void 0:e.list)?void 0:l.data)||[]),L.value=(null==(s=null==(a=o.data)?void 0:a.list)?void 0:s.last_page)>(null==(i=null==(u=o.data)?void 0:u.list)?void 0:i.current_page)}catch(o){}finally{t&&(I.value=!1)}};N(),t([]);const O=t(),B=()=>{O.value=!0,q.value=!0},D=()=>{J(!1)},F=t([]),J=async t=>{var e;try{const l=await vt({table_id:C()},t);F.value=(null==(e=l.data.detail)?void 0:e.unSendKitchenProduct)||[],F.value.length>0?V():(O.value=!0,q.value=!1)}catch(l){}},V=async()=>{try{const t=await _t({table_id:C()});P({title:y(t.msg),icon:"none"}),setTimeout((()=>{a("success"),Z.value.getCarData(),O.value=!0,q.value=!1}),300)}catch(t){}},Y=(t,e)=>{t||(O.value=!1)},q=t(!0),G=t=>{q.value=t},z=()=>{q.value=!1};q.value=!0;const Z=t();return(t,e)=>{const l=k(w("ti-loading"),Q),a=S,C=p,U=f,N=k(w("ti-empty-data"),W),E=h,F=k(w("ti-drawer"),X);return s(),o(d,null,[c(U,{class:"ti-dish-box"},{default:i((()=>[c(rt,{categoryId:g.value.category_id,"onUpdate:categoryId":e[0]||(e[0]=t=>g.value.category_id=t),isSpecial:R.value,"onUpdate:isSpecial":e[1]||(e[1]=t=>R.value=t)},null,8,["categoryId","isSpecial"]),c(U,{class:"ti-dish-list"},{default:i((()=>[c(E,{class:"ti-scroll","scroll-y":"","lower-threshold":50,onScrolltolower:j},{default:i((()=>[I.value?(s(),u(l,{key:0})):x.value&&x.value.length>0?(s(),o(d,{key:1},[c(U,{class:"ti-dish-goods"},{default:i((()=>[(s(!0),o(d,null,n(x.value,((t,e)=>(s(),u(U,{key:e,class:r([{"sold-out":t.product_stock<=0},"ti-goods-item"]),onClick:e=>(t=>{if(t.product_stock<=0)return P({title:y("已售罄"),icon:"none"});m.value=!0,T.value=t.product_id})(t)},{default:i((()=>[c(U,{class:"ti-goods-image"},{default:i((()=>[t.image&&t.image[0]&&t.image[0].file_path?(s(),u(a,{key:0,src:t.image[0].file_path,mode:"scaleToFill"},null,8,["src"])):A("",!0),c(C,{class:"sold-out-text"},{default:i((()=>[v(_(b(y)("已售罄")),1)])),_:1})])),_:2},1024),c(U,{class:"ti-goods-content"},{default:i((()=>[c(U,{class:"ti-goods-title"},{default:i((()=>[v(_(t.product_name_text),1)])),_:2},1024),c(U,{class:"ti-price-box"},{default:i((()=>[c(C,{class:"ti-goods-price"},{default:i((()=>[v(_(b(H)((null==t?void 0:t.product_price)||0)),1)])),_:2},1024),c(C,{class:"ti-goods-subPrice"},{default:i((()=>[v(_(b(M)((null==t?void 0:t.product_price)||0)),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))])),_:1}),c(l,{status:L.value?"loading":"no-more"},null,8,["status"])],64)):(s(),u(N,{key:2}))])),_:1})])),_:1}),c(U,{class:"ti-car-order-nav"},{default:i((()=>[c(ft,{ref_key:"carRef",ref:Z,onCar:B,onConfirm:D},null,512)])),_:1})])),_:1}),c(pt,{show:m.value,"onUpdate:show":e[2]||(e[2]=t=>m.value=t),productId:T.value,onSuccess:K},null,8,["show","productId"]),c(F,{show:O.value,width:603.992,title:b(y)("我點的菜"),maskClick:!0,onChange:Y},{content:i((()=>[c(U,{class:"ti-drawer-content"},{default:i((()=>[c(U,{class:"ti-content-head"},{default:i((()=>[c(U,{class:"ti-switch-box"},{default:i((()=>[c(U,{class:r(q.value?"ti-switch-on":"ti-switch-off"),onClick:e[3]||(e[3]=t=>G(!0))},{default:i((()=>[c(C,{class:r(q.value?"ti-switch-text-on":"ti-switch-text-off")},{default:i((()=>[v(_(b(y)("未下單")),1)])),_:1},8,["class"])])),_:1},8,["class"]),c(U,{class:"ti-switch-space"}),c(U,{class:r(q.value?"ti-switch-off":"ti-switch-on"),onClick:e[4]||(e[4]=t=>G(!1))},{default:i((()=>[c(C,{class:r(q.value?"ti-switch-text-off":"ti-switch-text-on")},{default:i((()=>[v(_(b(y)("已下單")),1)])),_:1},8,["class"])])),_:1},8,["class"])])),_:1})])),_:1}),q.value?(s(),u(mt,{key:0,onSuccess:z,onChange:K})):A("",!0),q.value?A("",!0):(s(),u(yt,{key:1}))])),_:1})])),footer:i((()=>[c(U)])),_:1},8,["show","width","title"])],64)}}},[["__scopeId","data-v-01259695"]]);const bt=q({__name:"opentable-index",setup(e){t(!1);const l=()=>{U()},a=()=>{N({url:"/pages/index/opentable-index"})},o=t(),d=t("");t([]);const n=t(),r=t(!1),h=t({ip:"",port:"",device_id:""}),m=t=>{h.value.ip=t},g=t=>{h.value.port=t},x=async()=>{var t;const e={...h.value};if(e.ip)if(e.port)try{const l=await at(st(`${null==e?void 0:e.ip}:${e.port}`));ut(e),R(l.data.app_id),E(l.data.shop_supplier_id),it(null==(t=l.data)?void 0:t.currency),setTimeout((()=>{r.value=!0}),150)}catch(l){P({title:y("绑定失败"),icon:"none"})}else P({title:y("請輸入服務器端口"),icon:"none"});else P({title:y("請輸入服務器鏈接地址"),icon:"none"})},A=t=>{r.value=!1,t&&(n.value=t,d.value=t.table_no)},I=()=>{h.value.ip="",h.value.port="",d.value="",n.value=""},T=async()=>{var t;const e={...h.value};if(e.ip)if(e.port)if(n.value)try{const l=await at(st(`${null==e?void 0:e.ip}:${e.port}`));ut(e),R(l.data.app_id),E(l.data.shop_supplier_id),it(null==(t=l.data)?void 0:t.currency),setTimeout((()=>{S()}),150)}catch(l){P({title:y("绑定失败"),icon:"none"})}else P({title:y("請查找桌位"),icon:"none"});else P({title:y("請輸入服務器端口"),icon:"none"});else P({title:y("請輸入服務器鏈接地址"),icon:"none"})},S=async()=>{try{const t=await ct({table_id:n.value.table_id,old_table_id:C()});O(n.value),P({title:t.msg,icon:"none"}),o.value=!1,B(!1),setTimeout((()=>{N({url:"/pages/index/index"})}),150)}catch(t){}},L=t(!1),U=()=>{L.value=!0},Q=async t=>{if(t)try{await V({password:t});o.value=!0,n.value=D(),d.value=n.value.table_no,q()}catch(e){}else P({title:y("請輸入密碼"),icon:"none"})},q=()=>{L.value=!1};(()=>{const t=Z();h.value.ip=(null==t?void 0:t.ip)||tt()||"127.0.0.1",h.value.port=(null==t?void 0:t.port)||"8080"})(),K({success:t=>{h.value.device_id=t.deviceId}});const H=t(),M=async()=>{try{await $("table.table/ping",{},{isLoading:!1,isMessage:!1})}catch(t){}finally{H.value=setTimeout((()=>{M()}),3e3)}};return M(),j((()=>{clearTimeout(H.value)})),(t,e)=>{const n=k(w("ti-layout-head"),Y),C=f,P=p,S=k(w("ti-input"),ot),U=k(w("ti-modal"),F),K=k(w("ti-layout-table-list"),dt);return s(),u(C,{class:"ti-page",onClick:e[1]||(e[1]=t=>b(lt)())},{default:i((()=>[c(C,null,{default:i((()=>[c(n,{isPay:!0,isTableNo:!0,onDoubleLogo:l,onRefresh:a})])),_:1}),c(J,{show:L.value,title:b(y)("密碼"),password:!0,placeholder:b(y)("請輸入密碼"),onExit:q,onConfirm:Q},null,8,["show","title","placeholder"]),c(gt),c(U,{show:o.value,title:b(y)("設置"),cancelText:b(y)("重置"),confirmText:b(y)("確定"),onCancel:I,onConfirm:T},{content:i((()=>[c(C,{class:"ti-item-input"},{default:i((()=>[c(C,{class:"ti-label-box"},{default:i((()=>[c(C,{class:"ti-label-left"},{default:i((()=>[c(P,{class:"ti-label-server"},{default:i((()=>[v(_(b(y)("服務器連接地址")),1)])),_:1})])),_:1}),c(C,{class:"ti-label-right",onClick:x},{default:i((()=>[c(P,{class:"ti-label-table"},{default:i((()=>[v(_(d.value?b(y)("已選 : ")+b(et)(d.value,12):b(y)("查找桌位")),1)])),_:1})])),_:1})])),_:1}),c(C,{class:"ti-input-box"},{default:i((()=>[c(S,{type:"text",onInput:m,value:h.value.ip,placeholder:b(y)("伺服器位址"),clearable:!1},null,8,["value","placeholder"]),c(C,{class:"ti-colon"},{default:i((()=>[v(":")])),_:1}),c(C,{class:"ti-input-port"},{default:i((()=>[c(S,{type:"number",onInput:g,value:h.value.port,placeholder:b(y)("端口"),clearable:!1},null,8,["value","placeholder"])])),_:1})])),_:1})])),_:1})])),_:1},8,["show","title","cancelText","confirmText"]),c(K,{show:r.value,"onUpdate:show":e[0]||(e[0]=t=>r.value=t),onConfirm:A},null,8,["show"])])),_:1})}}},[["__scopeId","data-v-6533fb20"]]);export{bt as default};