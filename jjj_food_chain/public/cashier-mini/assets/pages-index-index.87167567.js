import{o as e,c as a,w as t,a as l,b as s,t as i,u,$ as r,i as n,d as c,r as d,e as o,f as v,g,h as f,F as m,j as _,s as h,k as p,l as A,m as w,n as k,S as y,p as b,q as C,v as x}from"./index-54a57c20.js";const j=""+new URL("empty-16cbc551.svg",import.meta.url).href,I=(e,a)=>{const t=e.__vccOpts||e;for(const[l,s]of a)t[l]=s;return t},P=I({__name:"ti-empty-data",props:{title:{type:String,default:null},image:{type:String,default:j}},setup(d){const o=d;return(d,v)=>{const g=n,f=c;return e(),a(f,{class:"ti-empty-data"},{default:t((()=>[l(f,{class:"ti-empty-image"},{default:t((()=>[l(g,{src:o.image,mode:"widthFix"},null,8,["src"])])),_:1}),l(f,{class:"ti-empty-text"},{default:t((()=>[s(i(o.title||u(r)("暂无数据")),1)])),_:1})])),_:1})}}},[["__scopeId","data-v-1263562c"]]),V=""+new URL("advertising-693fdf1d.png",import.meta.url).href,E=I({__name:"index",setup(u){const r=d(!1),j=d(!1),I=d(),E=d(""),J=d([]),S=d([]),Z=d({}),B=d(0),U=d(3e4),F=d({}),M=d([]);o((()=>J.value),(()=>{J.value&&J.value.length>0?r.value=!0:r.value=!1}),{deep:!0}),o((()=>I.value),(()=>{_()!=I.value&&I.value&&h(I.value)}),{deep:!0}),window.__ShowOrder=e=>{const a=JSON.parse(e)||{};I.value=null==a?void 0:a.language,E.value=(null==a?void 0:a.system_name)||"",J.value=(null==a?void 0:a.order_list)||[],S.value=(null==a?void 0:a.delay_list)||[],Z.value=(null==a?void 0:a.statistics)||{},j.value=!0},window.__ShowAd=e=>{const a=JSON.parse(e)||{};M.value=(null==a?void 0:a.list)||[],j.value=!1},window.__ShowLanguage=e=>{const a=JSON.parse(e)||{};I.value=null==a?void 0:a.language};const Q=e=>{L(),"video"==N(M.value[e.detail.current].real_name)?D(e.detail.current):U.value=3e4},D=e=>{let a=p(`video${e}`);F.value[`video${e}`]&&(U.value=F.value[`video${e}`]),a.seek(0),a.play()},Y=e=>{p(`video${e}`).pause()},R=()=>{},X=()=>{B.value=O()},q=e=>{F.value[e.currentTarget.id]=1e3*e.detail.duration},O=()=>{let e=B.value+1;return e>=M.value.length?0:e},L=()=>{for(let e=0;e<M.value.length;e++){const a=M.value[e];"video"==N(a.real_name)&&Y(e)}},N=e=>{const a=e.split(".").pop().toLowerCase();return["jpg","jpeg","png","gif"].includes(a)?"image":["avi","mpeg","mov","mp4","wmv"].includes(a)?"video":""};return(u,d)=>{const o=n,_=c,h=A,p=w(k("ti-empty-data"),P),I=y,F=C,D=x,Y=b;return r.value&&j.value?(e(),a(_,{key:0,class:"ti-index"},{default:t((()=>[l(_,{class:"ti-header"},{default:t((()=>[l(_,{class:"ti-header-logo"},{default:t((()=>[l(o,{src:"data:image/png;base64,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",mode:"widthFix"})])),_:1}),E.value?(e(),a(_,{key:0,class:"ti-header-title"},{default:t((()=>[s(i(u.$t("歡迎使用{title}點餐系統",{title:E.value})),1)])),_:1})):v("",!0)])),_:1}),l(_,{class:"ti-order-box"},{default:t((()=>[l(_,{class:"ti-order-table"},{default:t((()=>[l(_,{class:"ti-order-head"},{default:t((()=>[l(_,null,{default:t((()=>[s(i(u.$t("商品名稱")),1)])),_:1}),l(_,null,{default:t((()=>[s(i(u.$t("金額")),1)])),_:1}),l(_,{class:"text-right"},{default:t((()=>[s(i(u.$t("數量")),1)])),_:1})])),_:1}),l(_,{class:"ti-order-list"},{default:t((()=>[l(I,{"scroll-y":""},{default:t((()=>[J.value&&J.value.length>0||S.value&&S.value.length>0?(e(),a(_,{key:0},{default:t((()=>[(e(!0),g(m,null,f(J.value,(u=>(e(),a(_,{key:u.order_product_id,class:"ti-order-item"},{default:t((()=>[l(_,{class:"ti-order-top"},{default:t((()=>[l(_,{class:"ti-order-title text-ellipsis"},{default:t((()=>[s(i(u.product_name_text||u.product_name),1)])),_:2},1024),u.product_attr?(e(),a(_,{key:0,class:"ti-order-spec"},{default:t((()=>[s("( "+i(u.product_attr)+" )",1)])),_:2},1024)):v("",!0)])),_:2},1024),l(_,{class:"ti-order-money"},{default:t((()=>[l(h,{class:"ti-order-price"},{default:t((()=>[s(i((null==u?void 0:u.total_price)||0),1)])),_:2},1024),l(h,{class:"ti-order-subPrice"},{default:t((()=>[s(i(null==u?void 0:u.total_price_sub),1)])),_:2},1024)])),_:2},1024),l(_,{class:"ti-order-num text-right"},{default:t((()=>[s(i(u.total_num||0),1)])),_:2},1024)])),_:2},1024)))),128)),(e(!0),g(m,null,f(S.value,((u,r)=>(e(),a(_,{key:r,class:"ti-order-item"},{default:t((()=>[l(_,{class:"ti-order-top"},{default:t((()=>[l(_,{class:"ti-order-title text-ellipsis"},{default:t((()=>[s(i(u.name_text||u.name),1)])),_:2},1024)])),_:2},1024),l(_,{class:"ti-order-money"},{default:t((()=>[l(h,{class:"ti-order-price"},{default:t((()=>[s(i((null==u?void 0:u.total_price)||0),1)])),_:2},1024),l(h,{class:"ti-order-subPrice"},{default:t((()=>[s(i(null==u?void 0:u.total_price_sub),1)])),_:2},1024)])),_:2},1024),l(_,{class:"ti-order-num text-right"},{default:t((()=>[s(i(u.total_num||0),1)])),_:2},1024)])),_:2},1024)))),128))])),_:1})):(e(),a(p,{key:1}))])),_:1})])),_:1})])),_:1}),l(_,{class:"ti-order-charging"},{default:t((()=>[l(_,{class:"ti-charging-box"},{default:t((()=>[l(_,{class:"ti-charging-list"},{default:t((()=>[l(_,{class:"ti-charging-item"},{default:t((()=>[l(_,{class:"ti-charging-label"},{default:t((()=>[s(i(u.$t("小計")),1)])),_:1}),l(_,{class:"ti-charging-money"},{default:t((()=>[l(h,{class:"ti-charging-subPrice"},{default:t((()=>{var e;return[s(i(null==(e=Z.value)?void 0:e.subtotal_sub),1)]})),_:1}),l(h,{class:"ti-charging-price"},{default:t((()=>{var e;return[s(i((null==(e=Z.value)?void 0:e.subtotal)||0),1)]})),_:1})])),_:1})])),_:1}),l(_,{class:"ti-charging-item"},{default:t((()=>[l(_,{class:"ti-charging-label"},{default:t((()=>[s(i(u.$t("服務費")),1)])),_:1}),l(_,{class:"ti-charging-money"},{default:t((()=>[l(h,{class:"ti-charging-subPrice"},{default:t((()=>{var e;return[s(i(null==(e=Z.value)?void 0:e.service_money_sub),1)]})),_:1}),l(h,{class:"ti-charging-price"},{default:t((()=>{var e;return[s(i((null==(e=Z.value)?void 0:e.service_money)||0),1)]})),_:1})])),_:1})])),_:1}),l(_,{class:"ti-charging-item"},{default:t((()=>[l(_,{class:"ti-charging-label"},{default:t((()=>[s(i(u.$t("消費稅")),1)])),_:1}),l(_,{class:"ti-charging-money"},{default:t((()=>[l(h,{class:"ti-charging-subPrice"},{default:t((()=>{var e;return[s(i(null==(e=Z.value)?void 0:e.total_consumption_tax_money_sub),1)]})),_:1}),l(h,{class:"ti-charging-price"},{default:t((()=>{var e;return[s(i((null==(e=Z.value)?void 0:e.total_consumption_tax_money)||0),1)]})),_:1})])),_:1})])),_:1}),l(_,{class:"ti-charging-item"},{default:t((()=>[l(_,{class:"ti-charging-label"},{default:t((()=>[s(i(u.$t("優惠折扣")),1)])),_:1}),l(_,{class:"ti-charging-money"},{default:t((()=>{var u;return[(null==(u=Z.value)?void 0:u.special_discount_sub)?(e(),a(h,{key:0,class:"ti-charging-subPrice"},{default:t((()=>{var e;return[s(i(`-${null==(e=Z.value)?void 0:e.special_discount_sub}`),1)]})),_:1})):v("",!0),l(h,{class:"ti-charging-price"},{default:t((()=>{var e;return[s(i(`-${(null==(e=Z.value)?void 0:e.special_discount)||0}`),1)]})),_:1})]})),_:1})])),_:1}),l(_,{class:"ti-charging-item"},{default:t((()=>[l(_,{class:"ti-charging-label"},{default:t((()=>[s(i(u.$t("會員折扣")),1)])),_:1}),l(_,{class:"ti-charging-money"},{default:t((()=>{var u;return[(null==(u=Z.value)?void 0:u.total_user_discount_money_sub)?(e(),a(h,{key:0,class:"ti-charging-subPrice"},{default:t((()=>{var e;return[s(i(`-${null==(e=Z.value)?void 0:e.total_user_discount_money_sub}`),1)]})),_:1})):v("",!0),l(h,{class:"ti-charging-price"},{default:t((()=>{var e;return[s(i(`-${(null==(e=Z.value)?void 0:e.total_user_discount_money)||0}`),1)]})),_:1})]})),_:1})])),_:1})])),_:1})])),_:1}),l(_,{class:"ti-statistics-box"},{default:t((()=>[l(_,{class:"ti-statistics-label"},{default:t((()=>[s(i(u.$t("應收")),1)])),_:1}),l(_,{class:"ti-statistics-right"},{default:t((()=>[l(_,{class:"ti-statistics-num"},{default:t((()=>{var e;return[s("("+i(u.$t("共{count}件",{count:(null==(e=Z.value)?void 0:e.total_num)||0}))+")",1)]})),_:1}),l(_,{class:"ti-statistics-money"},{default:t((()=>[l(h,{class:"ti-statistics-subPrice"},{default:t((()=>{var e;return[s(i(null==(e=Z.value)?void 0:e.total_pay_price_sub),1)]})),_:1}),l(h,{class:"ti-statistics-price"},{default:t((()=>{var e;return[s(i((null==(e=Z.value)?void 0:e.total_pay_price)||0),1)]})),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})):(e(),a(_,{key:1,class:"ti-advertising"},{default:t((()=>[M.value&&M.value.length>0?(e(),a(Y,{key:0,class:"ti-swiper",autoplay:!0,interval:U.value,"indicator-dots":!0,"disable-touch":!0,current:B.value,"onUpdate:current":d[0]||(d[0]=e=>B.value=e),circular:"","indicator-color":"#FFFFFF80","indicator-active-color":"#FFBE00",onChange:Q},{default:t((()=>[(e(!0),g(m,null,f(M.value,((l,s)=>(e(),g(m,{key:s},[N(l.real_name)?(e(),a(D,{key:0,class:"ti-swiper-item"},{default:t((()=>["image"===N(l.real_name)?(e(),a(o,{key:0,class:"ti-swiper-item-image",src:l.file_path,mode:"aspectFill"},null,8,["src"])):"video"===N(l.real_name)?(e(),a(F,{key:1,class:"ti-swiper-item-video",src:null==l?void 0:l.file_path,controls:!1,"show-fullscreen-btn":!1,loop:!1,id:"video"+s,muted:!1,onEnded:R,onError:X,onLoadedmetadata:q},null,8,["src","id"])):v("",!0)])),_:2},1024)):v("",!0)],64)))),128))])),_:1},8,["interval","current"])):(e(),a(o,{key:1,src:V,mode:"aspectFill"}))])),_:1}))}}},[["__scopeId","data-v-d6e6919e"]]);export{E as default};
