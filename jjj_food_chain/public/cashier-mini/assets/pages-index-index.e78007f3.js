import{o as e,c as a,w as t,a as l,b as s,t as i,u,$ as r,i as c,d,r as n,e as o,f as _,g as v,h as g,j as f,k as p,l as m,F as h,m as y,s as b,n as w,p as x,q as $,S as k,v as F,x as S,y as P}from"./index-c4af8b71.js";const L=""+new URL("empty-16cbc551.svg",import.meta.url).href,O=(e,a)=>{const t=e.__vccOpts||e;for(const[l,s]of a)t[l]=s;return t},j=O({__name:"ti-empty-data",props:{title:{type:String,default:null},image:{type:String,default:L}},setup(n){const o=n;return(n,_)=>{const v=c,g=d;return e(),a(g,{class:"ti-empty-data"},{default:t((()=>[l(g,{class:"ti-empty-image"},{default:t((()=>[l(v,{src:o.image,mode:"widthFix"},null,8,["src"])])),_:1}),l(g,{class:"ti-empty-text"},{default:t((()=>[s(i(o.title||u(r)("暂无数据")),1)])),_:1})])),_:1})}}},[["__scopeId","data-v-1263562c"]]),U=""+new URL("logo-512a65a4.svg",import.meta.url).href,E=""+new URL("advertising-693fdf1d.png",import.meta.url).href,J=O({__name:"index",setup(u){const r=n(!1),L=n(),O=n(""),J=n([]),N=n([]),R=n({}),T=n(0),C=n(3e4),I=n({}),q=n(0),z=n([]),A=n(null);o((()=>L.value),(()=>{y()!=L.value&&L.value&&b(L.value)}),{deep:!0}),window.__ShowOrder=e=>{const a=JSON.parse(e)||{};L.value=null==a?void 0:a.language,O.value=(null==a?void 0:a.system_name)||"",J.value=(null==a?void 0:a.order_list)||[],N.value=(null==a?void 0:a.delay_list)||[],R.value=(null==a?void 0:a.statistics)||{},J.value&&J.value.length>0||N.value&&N.value.length>0?(r.value=!0,X(),V()):(r.value=!1,G())},window.__ShowAd=e=>{const a=JSON.parse(e)||{};z.value=(null==a?void 0:a.list)||[],r.value=!1,G()},window.__ShowLanguage=e=>{const a=JSON.parse(e)||{};L.value=null==a?void 0:a.language};const B=e=>{T.value=e.detail.current,V(),"video"==W(z.value[e.detail.current].real_name)?H(e.detail.current):(C.value=3e4,A.value=null,V())},H=e=>{let a=g(`video${e}`);I.value[`video${e}`]&&(C.value=I.value[`video${e}`]),a.seek(0),a.play(),A.value=a},D=e=>{let a=g(`video${e}`);a.pause(),A.value=a},G=()=>{setTimeout((()=>{A.value&&H(T.value)}),500)},K=()=>{},M=()=>{},Q=e=>{I.value[e.currentTarget.id]=1e3*e.detail.duration},V=()=>{for(let e=0;e<z.value.length;e++){const a=z.value[e];"video"==W(a.real_name)&&D(e)}},W=e=>{const a=e.split(".").pop().toLowerCase();return["jpg","jpeg","png","gif"].includes(a)?"image":["avi","mpeg","mov","mp4","wmv"].includes(a)?"video":""},X=()=>{setTimeout((()=>{_().in(this).select(".ti-order-scroll").fields({size:!0,scrollOffset:!0},(e=>{q.value=e.scrollHeight-e.height})).exec()}),700)};return v((()=>{(J.value&&J.value.length>0||N.value&&N.value.length>0)&&X()})),(u,n)=>{const o=c,_=d,v=w,g=x($("ti-empty-data"),j),y=k,b=S,L=P,I=F;return r.value?(e(),a(_,{key:0,class:"ti-index"},{default:t((()=>[l(_,{class:"ti-header"},{default:t((()=>[l(_,{class:"ti-header-logo"},{default:t((()=>[l(o,{src:U,mode:"widthFix"})])),_:1}),O.value?(e(),a(_,{key:0,class:"ti-header-title"},{default:t((()=>[s(i(u.$t("歡迎使用{title}點餐系統",{title:O.value})),1)])),_:1})):f("",!0)])),_:1}),l(_,{class:"ti-order-box"},{default:t((()=>[l(_,{class:"ti-order-table"},{default:t((()=>[l(_,{class:"ti-order-head"},{default:t((()=>[l(_,null,{default:t((()=>[s(i(u.$t("商品名稱")),1)])),_:1}),l(_,null,{default:t((()=>[s(i(u.$t("金額")),1)])),_:1}),l(_,{class:"text-right"},{default:t((()=>[s(i(u.$t("數量")),1)])),_:1})])),_:1}),l(_,{class:"ti-order-list"},{default:t((()=>[l(y,{"scroll-top":q.value,"enable-flex":"","scroll-with-animation":"","scroll-y":"",class:"ti-order-scroll"},{default:t((()=>[J.value&&J.value.length>0||N.value&&N.value.length>0?(e(),a(_,{key:0},{default:t((()=>[(e(!0),p(h,null,m(N.value,((u,r)=>(e(),a(_,{key:r,class:"ti-order-item"},{default:t((()=>[l(_,{class:"ti-order-top"},{default:t((()=>[l(_,{class:"ti-order-title text-ellipsis"},{default:t((()=>[s(i(u.name_text||u.name),1)])),_:2},1024)])),_:2},1024),l(_,{class:"ti-order-money"},{default:t((()=>[l(v,{class:"ti-order-price"},{default:t((()=>[s(i((null==u?void 0:u.total_price)||0),1)])),_:2},1024),l(v,{class:"ti-order-subPrice"},{default:t((()=>[s(i(null==u?void 0:u.total_price_sub),1)])),_:2},1024)])),_:2},1024),l(_,{class:"ti-order-num text-right"},{default:t((()=>[s(i(u.total_num||u.num||0),1)])),_:2},1024)])),_:2},1024)))),128)),(e(!0),p(h,null,m(J.value,(u=>(e(),a(_,{key:u.order_product_id,class:"ti-order-item"},{default:t((()=>[l(_,{class:"ti-order-top"},{default:t((()=>[l(_,{class:"ti-order-title text-ellipsis"},{default:t((()=>[s(i(u.product_name_text||u.product_name),1)])),_:2},1024),u.product_attr?(e(),a(_,{key:0,class:"ti-order-spec"},{default:t((()=>[s("( "+i(u.product_attr)+" )",1)])),_:2},1024)):f("",!0)])),_:2},1024),l(_,{class:"ti-order-money"},{default:t((()=>[l(v,{class:"ti-order-price"},{default:t((()=>[s(i((null==u?void 0:u.total_product_price)||0),1)])),_:2},1024),l(v,{class:"ti-order-subPrice"},{default:t((()=>[s(i(null==u?void 0:u.total_product_price_sub),1)])),_:2},1024)])),_:2},1024),l(_,{class:"ti-order-num text-right"},{default:t((()=>[s(i(u.total_num||0),1)])),_:2},1024)])),_:2},1024)))),128))])),_:1})):(e(),a(g,{key:1}))])),_:1},8,["scroll-top"])])),_:1})])),_:1}),l(_,{class:"ti-order-charging"},{default:t((()=>[l(_,{class:"ti-charging-box"},{default:t((()=>[l(_,{class:"ti-charging-list"},{default:t((()=>[l(_,{class:"ti-charging-item"},{default:t((()=>[l(_,{class:"ti-charging-label"},{default:t((()=>[s(i(u.$t("小計")),1)])),_:1}),l(_,{class:"ti-charging-money"},{default:t((()=>[l(v,{class:"ti-charging-subPrice"},{default:t((()=>{var e;return[s(i(null==(e=R.value)?void 0:e.subtotal_sub),1)]})),_:1}),l(v,{class:"ti-charging-price"},{default:t((()=>{var e;return[s(i((null==(e=R.value)?void 0:e.subtotal)||0),1)]})),_:1})])),_:1})])),_:1}),l(_,{class:"ti-charging-item"},{default:t((()=>[l(_,{class:"ti-charging-label"},{default:t((()=>[s(i(u.$t("服務費")),1)])),_:1}),l(_,{class:"ti-charging-money"},{default:t((()=>[l(v,{class:"ti-charging-subPrice"},{default:t((()=>{var e;return[s(i(null==(e=R.value)?void 0:e.service_money_sub),1)]})),_:1}),l(v,{class:"ti-charging-price"},{default:t((()=>{var e;return[s(i((null==(e=R.value)?void 0:e.service_money)||0),1)]})),_:1})])),_:1})])),_:1}),l(_,{class:"ti-charging-item"},{default:t((()=>[l(_,{class:"ti-charging-label"},{default:t((()=>[s(i(u.$t("消費稅")),1)])),_:1}),l(_,{class:"ti-charging-money"},{default:t((()=>[l(v,{class:"ti-charging-subPrice"},{default:t((()=>{var e;return[s(i(null==(e=R.value)?void 0:e.total_consumption_tax_money_sub),1)]})),_:1}),l(v,{class:"ti-charging-price"},{default:t((()=>{var e;return[s(i((null==(e=R.value)?void 0:e.total_consumption_tax_money)||0),1)]})),_:1})])),_:1})])),_:1}),l(_,{class:"ti-charging-item"},{default:t((()=>[l(_,{class:"ti-charging-label"},{default:t((()=>[s(i(u.$t("優惠折扣")),1)])),_:1}),l(_,{class:"ti-charging-money"},{default:t((()=>{var u;return[(null==(u=R.value)?void 0:u.special_discount_sub)?(e(),a(v,{key:0,class:"ti-charging-subPrice"},{default:t((()=>{var e;return[s(i(`-${null==(e=R.value)?void 0:e.special_discount_sub}`),1)]})),_:1})):f("",!0),l(v,{class:"ti-charging-price"},{default:t((()=>{var e;return[s(i(`-${(null==(e=R.value)?void 0:e.special_discount)||0}`),1)]})),_:1})]})),_:1})])),_:1}),l(_,{class:"ti-charging-item"},{default:t((()=>[l(_,{class:"ti-charging-label"},{default:t((()=>[s(i(u.$t("會員折扣")),1)])),_:1}),l(_,{class:"ti-charging-money"},{default:t((()=>{var u;return[(null==(u=R.value)?void 0:u.total_user_discount_money_sub)?(e(),a(v,{key:0,class:"ti-charging-subPrice"},{default:t((()=>{var e;return[s(i(`-${null==(e=R.value)?void 0:e.total_user_discount_money_sub}`),1)]})),_:1})):f("",!0),l(v,{class:"ti-charging-price"},{default:t((()=>{var e;return[s(i(`-${(null==(e=R.value)?void 0:e.total_user_discount_money)||0}`),1)]})),_:1})]})),_:1})])),_:1})])),_:1})])),_:1}),l(_,{class:"ti-statistics-box"},{default:t((()=>[l(_,{class:"ti-statistics-label"},{default:t((()=>[s(i(u.$t("應收")),1)])),_:1}),l(_,{class:"ti-statistics-right"},{default:t((()=>[l(_,{class:"ti-statistics-num"},{default:t((()=>{var e;return[s("("+i(u.$t("共{count}件",{count:(null==(e=R.value)?void 0:e.total_num)||0}))+")",1)]})),_:1}),l(_,{class:"ti-statistics-money"},{default:t((()=>[l(v,{class:"ti-statistics-subPrice"},{default:t((()=>{var e;return[s(i(null==(e=R.value)?void 0:e.total_pay_price_sub),1)]})),_:1}),l(v,{class:"ti-statistics-price"},{default:t((()=>{var e;return[s(i((null==(e=R.value)?void 0:e.total_pay_price)||0),1)]})),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})):(e(),a(_,{key:1,class:"ti-advertising"},{default:t((()=>[z.value&&z.value.length>0?(e(),a(I,{key:0,class:"ti-swiper",autoplay:!0,interval:C.value,"indicator-dots":!0,"disable-touch":!0,current:T.value,"onUpdate:current":n[0]||(n[0]=e=>T.value=e),circular:"","indicator-color":"#FFFFFF80","indicator-active-color":"#FFBE00",onChange:B},{default:t((()=>[(e(!0),p(h,null,m(z.value,((l,s)=>(e(),p(h,{key:s},[W(l.real_name)?(e(),a(L,{key:0,class:"ti-swiper-item"},{default:t((()=>["image"===W(l.real_name)?(e(),a(o,{key:0,class:"ti-swiper-item-image",src:l.file_path,mode:"aspectFill"},null,8,["src"])):"video"===W(l.real_name)?(e(),a(b,{key:1,class:"ti-swiper-item-video",src:null==l?void 0:l.file_path,controls:!1,"show-fullscreen-btn":!1,loop:!1,id:"video"+s,muted:!1,onEnded:K,onError:M,onLoadedmetadata:Q},null,8,["src","id"])):f("",!0)])),_:2},1024)):f("",!0)],64)))),128))])),_:1},8,["interval","current"])):(e(),a(o,{key:1,src:E,mode:"aspectFill"}))])),_:1}))}}},[["__scopeId","data-v-ea9dd7e2"]]);export{J as default};
