import{$ as a,o as e,c as t,w as l,i as s,a as i,b as u,t as r,d as c,r as n,e as o,u as d,f as g,g as v,h as f,F as m,j as h,s as p,k as _,l as A,m as w,S as k,n as y,p as b,q as C}from"./index-939ffcbc.js";const j=""+new URL("empty-16cbc551.svg",import.meta.url).href,I=(a,e)=>{const t=a.__vccOpts||a;for(const[l,s]of e)t[l]=s;return t},P=I({__name:"ti-empty-data",props:{title:{type:String,default:a("暂无数据")},image:{type:String,default:j}},setup(a){const n=a;return(a,o)=>{const d=c,g=s;return e(),t(g,{class:"ti-empty-data"},{default:l((()=>[i(g,{class:"ti-empty-image"},{default:l((()=>[i(d,{src:n.image,mode:"widthFix"},null,8,["src"])])),_:1}),i(g,{class:"ti-empty-text"},{default:l((()=>[u(r(n.title),1)])),_:1})])),_:1})}}},[["__scopeId","data-v-68258ab8"]]),x=""+new URL("advertising-693fdf1d.png",import.meta.url).href,V=I({__name:"index",setup(j){const I=n(!0),V=n(),J=n(""),S=n([]),E=n({}),Z=n([]);o((()=>S.value),(()=>{S.value&&S.value.length>0?I.value=!0:I.value=!1}),{deep:!0,immediate:!0}),o((()=>V.value),(()=>{h()!=V.value&&p(V.value)}),{deep:!0,immediate:!0}),window.__ShowOrder=a=>{const e=JSON.parse(a)||{};J.value=(null==e?void 0:e.system_name)||"",S.value=(null==e?void 0:e.order_list)||[],E.value=(null==e?void 0:e.statistics)||{}},window.__ShowAd=a=>{const e=JSON.parse(a)||{};Z.value=(null==e?void 0:e.list)||[]},window.__ShowLanguage=a=>{const e=JSON.parse(a)||{};V.value=(null==e?void 0:e.language)||""};const B=a=>{const e=a.split(".").pop().toLowerCase();return["jpg","jpeg","png","gif"].includes(e)?"image":["avi","mpeg","mov","mp4","wmv"].includes(e)?"video":""};return(n,o)=>{const h=c,p=s,j=_,V=A(w("ti-empty-data"),P),F=k,M=b,Q=C,U=y;return I.value?(e(),t(p,{key:0,class:"ti-index"},{default:l((()=>[i(p,{class:"ti-header"},{default:l((()=>[i(p,{class:"ti-header-logo"},{default:l((()=>[i(h,{src:"data:image/png;base64,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",mode:"widthFix"})])),_:1}),J.value?(e(),t(p,{key:0,class:"ti-header-title"},{default:l((()=>[u(r(d(a)("歡迎使用{title}點餐系統",{title:J.value})),1)])),_:1})):g("",!0)])),_:1}),i(p,{class:"ti-order-box"},{default:l((()=>[i(p,{class:"ti-order-table"},{default:l((()=>[i(p,{class:"ti-order-head"},{default:l((()=>[i(p,null,{default:l((()=>[u(r(d(a)("商品名稱")),1)])),_:1}),i(p,null,{default:l((()=>[u(r(d(a)("金額")),1)])),_:1}),i(p,{class:"text-right"},{default:l((()=>[u(r(d(a)("數量")),1)])),_:1})])),_:1}),i(p,{class:"ti-order-list"},{default:l((()=>[i(F,{"scroll-y":""},{default:l((()=>[S.value&&S.value.length>0?(e(),t(p,{key:0},{default:l((()=>[(e(!0),v(m,null,f(S.value,(a=>(e(),t(p,{key:a,class:"ti-order-item"},{default:l((()=>[i(p,{class:"ti-order-top"},{default:l((()=>[i(p,{class:"ti-order-title text-ellipsis"},{default:l((()=>[u(r(a.product_name_text),1)])),_:2},1024),a.product_attr?(e(),t(p,{key:0,class:"ti-order-spec"},{default:l((()=>[u("( "+r(a.product_attr)+" )",1)])),_:2},1024)):g("",!0)])),_:2},1024),i(p,{class:"ti-order-money"},{default:l((()=>[i(j,{class:"ti-order-price"},{default:l((()=>[u(r((null==a?void 0:a.product_price)||0),1)])),_:2},1024),i(j,{class:"ti-order-subPrice"},{default:l((()=>[u(r(null==a?void 0:a.product_price_sub),1)])),_:2},1024)])),_:2},1024),i(p,{class:"ti-order-num text-right"},{default:l((()=>[u(r(a.total_num||0),1)])),_:2},1024)])),_:2},1024)))),128))])),_:1})):(e(),t(V,{key:1}))])),_:1})])),_:1})])),_:1}),i(p,{class:"ti-order-charging"},{default:l((()=>[i(p,{class:"ti-charging-box"},{default:l((()=>[i(p,{class:"ti-charging-list"},{default:l((()=>[i(p,{class:"ti-charging-item"},{default:l((()=>[i(p,{class:"ti-charging-label"},{default:l((()=>[u(r(d(a)("小計")),1)])),_:1}),i(p,{class:"ti-charging-money"},{default:l((()=>[i(j,{class:"ti-charging-subPrice"},{default:l((()=>{var a;return[u(r(null==(a=E.value)?void 0:a.subtotal_sub),1)]})),_:1}),i(j,{class:"ti-charging-price"},{default:l((()=>{var a;return[u(r((null==(a=E.value)?void 0:a.subtotal)||0),1)]})),_:1})])),_:1})])),_:1}),i(p,{class:"ti-charging-item"},{default:l((()=>[i(p,{class:"ti-charging-label"},{default:l((()=>[u(r(d(a)("服務費")),1)])),_:1}),i(p,{class:"ti-charging-money"},{default:l((()=>[i(j,{class:"ti-charging-subPrice"},{default:l((()=>{var a;return[u(r(null==(a=E.value)?void 0:a.service_money_sub),1)]})),_:1}),i(j,{class:"ti-charging-price"},{default:l((()=>{var a;return[u(r((null==(a=E.value)?void 0:a.service_money)||0),1)]})),_:1})])),_:1})])),_:1}),i(p,{class:"ti-charging-item"},{default:l((()=>[i(p,{class:"ti-charging-label"},{default:l((()=>[u(r(d(a)("消費稅")),1)])),_:1}),i(p,{class:"ti-charging-money"},{default:l((()=>[i(j,{class:"ti-charging-subPrice"},{default:l((()=>{var a;return[u(r(null==(a=E.value)?void 0:a.total_consumption_tax_money_sub),1)]})),_:1}),i(j,{class:"ti-charging-price"},{default:l((()=>{var a;return[u(r((null==(a=E.value)?void 0:a.total_consumption_tax_money)||0),1)]})),_:1})])),_:1})])),_:1}),i(p,{class:"ti-charging-item"},{default:l((()=>[i(p,{class:"ti-charging-label"},{default:l((()=>[u(r(d(a)("優惠折扣")),1)])),_:1}),i(p,{class:"ti-charging-money"},{default:l((()=>{var a;return[(null==(a=E.value)?void 0:a.special_discount_sub)?(e(),t(j,{key:0,class:"ti-charging-subPrice"},{default:l((()=>{var a;return[u(r(`-${null==(a=E.value)?void 0:a.special_discount_sub}`),1)]})),_:1})):g("",!0),i(j,{class:"ti-charging-price"},{default:l((()=>{var a;return[u(r(`-${(null==(a=E.value)?void 0:a.special_discount)||0}`),1)]})),_:1})]})),_:1})])),_:1}),i(p,{class:"ti-charging-item"},{default:l((()=>[i(p,{class:"ti-charging-label"},{default:l((()=>[u(r(d(a)("會員折扣")),1)])),_:1}),i(p,{class:"ti-charging-money"},{default:l((()=>{var a;return[(null==(a=E.value)?void 0:a.total_user_discount_money_sub)?(e(),t(j,{key:0,class:"ti-charging-subPrice"},{default:l((()=>{var a;return[u(r(`-${null==(a=E.value)?void 0:a.total_user_discount_money_sub}`),1)]})),_:1})):g("",!0),i(j,{class:"ti-charging-price"},{default:l((()=>{var a;return[u(r(`-${(null==(a=E.value)?void 0:a.total_user_discount_money)||0}`),1)]})),_:1})]})),_:1})])),_:1})])),_:1})])),_:1}),i(p,{class:"ti-statistics-box"},{default:l((()=>[i(p,{class:"ti-statistics-label"},{default:l((()=>[u(r(d(a)("應收")),1)])),_:1}),i(p,{class:"ti-statistics-right"},{default:l((()=>[i(p,{class:"ti-statistics-num"},{default:l((()=>{var e;return[u("("+r(d(a)("共{count}件",{count:(null==(e=E.value)?void 0:e.total_num)||0}))+")",1)]})),_:1}),i(p,{class:"ti-statistics-money"},{default:l((()=>[i(j,{class:"ti-statistics-subPrice"},{default:l((()=>{var a;return[u(r(null==(a=E.value)?void 0:a.total_pay_price_sub),1)]})),_:1}),i(j,{class:"ti-statistics-price"},{default:l((()=>{var a;return[u(r((null==(a=E.value)?void 0:a.total_pay_price)||0),1)]})),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})):(e(),t(p,{key:1,class:"ti-advertising"},{default:l((()=>[Z.value&&Z.value.length>0?(e(),t(U,{key:0,class:"ti-swiper",autoplay:!0,interval:3e4,"indicator-dots":!0,circular:"","indicator-color":"#FFFFFF80","indicator-active-color":"#FFBE00"},{default:l((()=>[(e(!0),v(m,null,f(Z.value,((a,s)=>(e(),v(m,{key:s},[B(a.real_name)?(e(),t(Q,{key:0,class:"ti-swiper-item"},{default:l((()=>["image"===B(a.real_name)?(e(),t(h,{key:0,class:"ti-swiper-item-image",src:a.file_path,mode:"aspectFill"},null,8,["src"])):"video"===B(a.real_name)?(e(),t(M,{key:1,class:"ti-swiper-item-video",src:null==a?void 0:a.file_path,controls:!1,"show-fullscreen-btn":!1,autoplay:!0},null,8,["src"])):g("",!0)])),_:2},1024)):g("",!0)],64)))),128))])),_:1})):(e(),t(h,{key:1,src:x,mode:"aspectFill"}))])),_:1}))}}},[["__scopeId","data-v-166c5618"]]);export{V as default};
