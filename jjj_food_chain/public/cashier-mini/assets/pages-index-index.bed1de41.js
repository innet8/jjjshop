import{o as a,c as e,w as t,a as l,b as s,t as i,u,$ as r,i as n,d as c,r as d,e as o,f as v,g,h as f,F as m,j as h,s as p,k as _,l as A,m as w,n as k,S as y,p as b,q as C,v as j}from"./index-18471c59.js";const I=""+new URL("empty-16cbc551.svg",import.meta.url).href,P=(a,e)=>{const t=a.__vccOpts||a;for(const[l,s]of e)t[l]=s;return t},x=P({__name:"ti-empty-data",props:{title:{type:String,default:null},image:{type:String,default:I}},setup(d){const o=d;return(d,v)=>{const g=n,f=c;return a(),e(f,{class:"ti-empty-data"},{default:t((()=>[l(f,{class:"ti-empty-image"},{default:t((()=>[l(g,{src:o.image,mode:"widthFix"},null,8,["src"])])),_:1}),l(f,{class:"ti-empty-text"},{default:t((()=>[s(i(o.title||u(r)("暂无数据")),1)])),_:1})])),_:1})}}},[["__scopeId","data-v-1263562c"]]),V=""+new URL("advertising-693fdf1d.png",import.meta.url).href,E=P({__name:"index",setup(u){const r=d(!1),I=d(!1),P=d(),E=d(""),J=d([]),S=d({}),Z=d(0),B=d(3e4),U=d({}),F=d([]);o((()=>J.value),(()=>{J.value&&J.value.length>0?r.value=!0:r.value=!1}),{deep:!0}),o((()=>P.value),(()=>{h()!=P.value&&P.value&&p(P.value)}),{deep:!0}),window.__ShowOrder=a=>{const e=JSON.parse(a)||{};P.value=null==e?void 0:e.language,E.value=(null==e?void 0:e.system_name)||"",J.value=(null==e?void 0:e.order_list)||[],S.value=(null==e?void 0:e.statistics)||{},I.value=!0},window.__ShowAd=a=>{const e=JSON.parse(a)||{};F.value=(null==e?void 0:e.list)||[],I.value=!1},window.__ShowLanguage=a=>{const e=JSON.parse(a)||{};P.value=null==e?void 0:e.language};const M=a=>{O(),"video"==L(F.value[a.detail.current].real_name)?Q(a.detail.current):B.value=3e4},Q=a=>{let e=_(`video${a}`);U.value[`video${a}`]&&(B.value=U.value[`video${a}`]),e.seek(0),e.play()},D=a=>{_(`video${a}`).pause()},Y=()=>{},R=()=>{Z.value=q()},X=a=>{U.value[a.currentTarget.id]=1e3*a.detail.duration},q=()=>{let a=Z.value+1;return a>=F.value.length?0:a},O=()=>{for(let a=0;a<F.value.length;a++){const e=F.value[a];"video"==L(e.real_name)&&D(a)}},L=a=>{const e=a.split(".").pop().toLowerCase();return["jpg","jpeg","png","gif"].includes(e)?"image":["avi","mpeg","mov","mp4","wmv"].includes(e)?"video":""};return(u,d)=>{const o=n,h=c,p=A,_=w(k("ti-empty-data"),x),P=y,U=C,Q=j,D=b;return r.value&&I.value?(a(),e(h,{key:0,class:"ti-index"},{default:t((()=>[l(h,{class:"ti-header"},{default:t((()=>[l(h,{class:"ti-header-logo"},{default:t((()=>[l(o,{src:"data:image/png;base64,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",mode:"widthFix"})])),_:1}),E.value?(a(),e(h,{key:0,class:"ti-header-title"},{default:t((()=>[s(i(u.$t("歡迎使用{title}點餐系統",{title:E.value})),1)])),_:1})):v("",!0)])),_:1}),l(h,{class:"ti-order-box"},{default:t((()=>[l(h,{class:"ti-order-table"},{default:t((()=>[l(h,{class:"ti-order-head"},{default:t((()=>[l(h,null,{default:t((()=>[s(i(u.$t("商品名稱")),1)])),_:1}),l(h,null,{default:t((()=>[s(i(u.$t("金額")),1)])),_:1}),l(h,{class:"text-right"},{default:t((()=>[s(i(u.$t("數量")),1)])),_:1})])),_:1}),l(h,{class:"ti-order-list"},{default:t((()=>[l(P,{"scroll-y":""},{default:t((()=>[J.value&&J.value.length>0?(a(),e(h,{key:0},{default:t((()=>[(a(!0),g(m,null,f(J.value,(u=>(a(),e(h,{key:u,class:"ti-order-item"},{default:t((()=>[l(h,{class:"ti-order-top"},{default:t((()=>[l(h,{class:"ti-order-title text-ellipsis"},{default:t((()=>[s(i(u.product_name_text),1)])),_:2},1024),u.product_attr?(a(),e(h,{key:0,class:"ti-order-spec"},{default:t((()=>[s("( "+i(u.product_attr)+" )",1)])),_:2},1024)):v("",!0)])),_:2},1024),l(h,{class:"ti-order-money"},{default:t((()=>[l(p,{class:"ti-order-price"},{default:t((()=>[s(i((null==u?void 0:u.product_price)||0),1)])),_:2},1024),l(p,{class:"ti-order-subPrice"},{default:t((()=>[s(i(null==u?void 0:u.product_price_sub),1)])),_:2},1024)])),_:2},1024),l(h,{class:"ti-order-num text-right"},{default:t((()=>[s(i(u.total_num||0),1)])),_:2},1024)])),_:2},1024)))),128))])),_:1})):(a(),e(_,{key:1}))])),_:1})])),_:1})])),_:1}),l(h,{class:"ti-order-charging"},{default:t((()=>[l(h,{class:"ti-charging-box"},{default:t((()=>[l(h,{class:"ti-charging-list"},{default:t((()=>[l(h,{class:"ti-charging-item"},{default:t((()=>[l(h,{class:"ti-charging-label"},{default:t((()=>[s(i(u.$t("小計")),1)])),_:1}),l(h,{class:"ti-charging-money"},{default:t((()=>[l(p,{class:"ti-charging-subPrice"},{default:t((()=>{var a;return[s(i(null==(a=S.value)?void 0:a.subtotal_sub),1)]})),_:1}),l(p,{class:"ti-charging-price"},{default:t((()=>{var a;return[s(i((null==(a=S.value)?void 0:a.subtotal)||0),1)]})),_:1})])),_:1})])),_:1}),l(h,{class:"ti-charging-item"},{default:t((()=>[l(h,{class:"ti-charging-label"},{default:t((()=>[s(i(u.$t("服務費")),1)])),_:1}),l(h,{class:"ti-charging-money"},{default:t((()=>[l(p,{class:"ti-charging-subPrice"},{default:t((()=>{var a;return[s(i(null==(a=S.value)?void 0:a.service_money_sub),1)]})),_:1}),l(p,{class:"ti-charging-price"},{default:t((()=>{var a;return[s(i((null==(a=S.value)?void 0:a.service_money)||0),1)]})),_:1})])),_:1})])),_:1}),l(h,{class:"ti-charging-item"},{default:t((()=>[l(h,{class:"ti-charging-label"},{default:t((()=>[s(i(u.$t("消費稅")),1)])),_:1}),l(h,{class:"ti-charging-money"},{default:t((()=>[l(p,{class:"ti-charging-subPrice"},{default:t((()=>{var a;return[s(i(null==(a=S.value)?void 0:a.total_consumption_tax_money_sub),1)]})),_:1}),l(p,{class:"ti-charging-price"},{default:t((()=>{var a;return[s(i((null==(a=S.value)?void 0:a.total_consumption_tax_money)||0),1)]})),_:1})])),_:1})])),_:1}),l(h,{class:"ti-charging-item"},{default:t((()=>[l(h,{class:"ti-charging-label"},{default:t((()=>[s(i(u.$t("優惠折扣")),1)])),_:1}),l(h,{class:"ti-charging-money"},{default:t((()=>{var u;return[(null==(u=S.value)?void 0:u.special_discount_sub)?(a(),e(p,{key:0,class:"ti-charging-subPrice"},{default:t((()=>{var a;return[s(i(`-${null==(a=S.value)?void 0:a.special_discount_sub}`),1)]})),_:1})):v("",!0),l(p,{class:"ti-charging-price"},{default:t((()=>{var a;return[s(i(`-${(null==(a=S.value)?void 0:a.special_discount)||0}`),1)]})),_:1})]})),_:1})])),_:1}),l(h,{class:"ti-charging-item"},{default:t((()=>[l(h,{class:"ti-charging-label"},{default:t((()=>[s(i(u.$t("會員折扣")),1)])),_:1}),l(h,{class:"ti-charging-money"},{default:t((()=>{var u;return[(null==(u=S.value)?void 0:u.total_user_discount_money_sub)?(a(),e(p,{key:0,class:"ti-charging-subPrice"},{default:t((()=>{var a;return[s(i(`-${null==(a=S.value)?void 0:a.total_user_discount_money_sub}`),1)]})),_:1})):v("",!0),l(p,{class:"ti-charging-price"},{default:t((()=>{var a;return[s(i(`-${(null==(a=S.value)?void 0:a.total_user_discount_money)||0}`),1)]})),_:1})]})),_:1})])),_:1})])),_:1})])),_:1}),l(h,{class:"ti-statistics-box"},{default:t((()=>[l(h,{class:"ti-statistics-label"},{default:t((()=>[s(i(u.$t("應收")),1)])),_:1}),l(h,{class:"ti-statistics-right"},{default:t((()=>[l(h,{class:"ti-statistics-num"},{default:t((()=>{var a;return[s("("+i(u.$t("共{count}件",{count:(null==(a=S.value)?void 0:a.total_num)||0}))+")",1)]})),_:1}),l(h,{class:"ti-statistics-money"},{default:t((()=>[l(p,{class:"ti-statistics-subPrice"},{default:t((()=>{var a;return[s(i(null==(a=S.value)?void 0:a.total_pay_price_sub),1)]})),_:1}),l(p,{class:"ti-statistics-price"},{default:t((()=>{var a;return[s(i((null==(a=S.value)?void 0:a.total_pay_price)||0),1)]})),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})):(a(),e(h,{key:1,class:"ti-advertising"},{default:t((()=>[F.value&&F.value.length>0?(a(),e(D,{key:0,class:"ti-swiper",autoplay:!0,interval:B.value,"indicator-dots":!0,"disable-touch":!0,current:Z.value,"onUpdate:current":d[0]||(d[0]=a=>Z.value=a),circular:"","indicator-color":"#FFFFFF80","indicator-active-color":"#FFBE00",onChange:M},{default:t((()=>[(a(!0),g(m,null,f(F.value,((l,s)=>(a(),g(m,{key:s},[L(l.real_name)?(a(),e(Q,{key:0,class:"ti-swiper-item"},{default:t((()=>["image"===L(l.real_name)?(a(),e(o,{key:0,class:"ti-swiper-item-image",src:l.file_path,mode:"aspectFill"},null,8,["src"])):"video"===L(l.real_name)?(a(),e(U,{key:1,class:"ti-swiper-item-video",src:null==l?void 0:l.file_path,controls:!1,"show-fullscreen-btn":!1,loop:!1,id:"video"+s,muted:!1,onEnded:Y,onError:R,onLoadedmetadata:X},null,8,["src","id"])):v("",!0)])),_:2},1024)):v("",!0)],64)))),128))])),_:1},8,["interval","current"])):(a(),e(o,{key:1,src:V,mode:"aspectFill"}))])),_:1}))}}},[["__scopeId","data-v-98842c52"]]);export{E as default};