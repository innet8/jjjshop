import{r as a,g as e,R as l,S as t,h as s,j as i,w as n,v as o,z as u,A as c,f as A,$ as d,B as r,l as p,m as g,E as f,G as v,H as _,I as b,J as B,K as m,L as x,n as h,M as w,N as U,c as y,X as C,t as I,a2 as S,a3 as E,a4 as R,T as Q,C as j}from"./index-5419dd8e.js";import{_ as k,a as G,c as L,b as X,d as Y}from"./ti-layout-table-list.20d0c1b4.js";const O=k({__name:"ti-layout-setserver",setup(S){const E=a({ip:"",port:"",device_id:""}),R=()=>{const a=p();E.value.ip=(null==a?void 0:a.ip)||g()||"127.0.0.1",E.value.port=(null==a?void 0:a.port)||"8080"},Q=a=>{E.value.ip=a},j=a=>{E.value.port=a},k=a("");a([]);const Y=a(),O=a(!1),H=async()=>{var a;const e={...E.value};if(e.ip)if(e.port)try{const l=await v(_(`${null==e?void 0:e.ip}:${e.port}`));b(e),B(l.data.app_id),m(l.data.shop_supplier_id),x(null==(a=l.data)?void 0:a.currency),setTimeout((()=>{O.value=!0}),150)}catch(l){f({title:d("绑定失败"),icon:"none"})}else f({title:d("請輸入連接埠"),icon:"none"});else f({title:d("請輸入伺服器位址"),icon:"none"})},J=a=>{O.value=!1,a&&(Y.value=a,k.value=a.table_no)},M=()=>{R(),k.value=h().table_no,Y.value=h()},D=async()=>{var a;const e={...E.value};if(e.ip)if(e.port)try{const l=await v(_(`${null==e?void 0:e.ip}:${e.port}`));if(!Y.value)return void f({title:d("請查找桌位"),icon:"none"});b(e),B(l.data.app_id),m(l.data.shop_supplier_id),x(null==(a=l.data)?void 0:a.currency),setTimeout((()=>{N()}),150)}catch(l){f({title:d("绑定失败"),icon:"none"})}else f({title:d("請輸入連接埠"),icon:"none"});else f({title:d("請輸入伺服器位址"),icon:"none"})},N=async()=>{try{const a=await w({table_id:Y.value.table_id});U(Y.value),y({url:"/pages/index/index"}),f({title:a.msg,icon:"none"})}catch(a){}};return R(),e({success:a=>{E.value.device_id=a.deviceId}}),(a,e)=>{const p=C,g=I,f=l(t("ti-input"),G),v=l(t("ti-button"),L),_=l(t("ti-layout-table-list"),X);return s(),i(g,null,{default:n((()=>[o(g,{class:"ti-item-input"},{default:n((()=>[o(g,{class:"ti-label-box"},{default:n((()=>[o(g,{class:"ti-label-left"},{default:n((()=>[o(p,{class:"ti-label-server"},{default:n((()=>[u(c(A(d)("服務器連接地址")),1)])),_:1})])),_:1})])),_:1}),o(g,{class:"ti-input-box"},{default:n((()=>[o(f,{type:"text",onInput:Q,placeholder:A(d)("伺服器位址"),value:E.value.ip,clearable:!1},null,8,["placeholder","value"]),o(g,{class:"ti-colon"},{default:n((()=>[u(":")])),_:1}),o(g,{class:"ti-input-port"},{default:n((()=>[o(f,{type:"number",onInput:j,placeholder:A(d)("端口"),value:E.value.port,clearable:!1},null,8,["placeholder","value"])])),_:1})])),_:1})])),_:1}),o(g,{class:"ti-bottom"},{default:n((()=>[o(v,{title:A(d)("重置"),onClick:M},null,8,["title"]),o(v,{title:A(d)("確定"),type:"primary",onClick:D},null,8,["title"])])),_:1}),o(g,{class:"ti-select-table-box",onClick:H},{default:n((()=>[o(p,{class:"ti-label-table"},{default:n((()=>[u(c(k.value?A(d)("已選 : ")+A(r)(k.value,21):A(d)("查找桌位")),1)])),_:1})])),_:1}),o(_,{show:O.value,"onUpdate:show":e[0]||(e[0]=a=>O.value=a),onConfirm:J},null,8,["show"])])),_:1})}}},[["__scopeId","data-v-1514ede9"]]),H=""+new URL("binding-page-bg-image-db048039.png",import.meta.url).href,J=""+new URL("logo-fcaec045.png",import.meta.url).href,M=k({__name:"set-language",props:{firstBind:{type:Boolean,default:!1}},setup(e){const A=e,d=a(S[E()]),r=a(),p=a=>{r.value.isShow()?r.value.close():r.value.open()},g=()=>{d.value=S[E()]};return(a,e)=>{const f=l(t("ti-layout-language-item"),Y),v=I,_=Q,b=C;return s(),i(v,{class:"ti-language",onClick:[p,e[0]||(e[0]=R((()=>{}),["stop"]))]},{default:n((()=>[o(v,{class:"ti-language-box"},{default:n((()=>[o(f,{ref_key:"refShowLanguage",ref:r,firstBind:A.firstBind,onLanguageText:g},null,8,["firstBind"])])),_:1}),o(_,{class:"ti-language-global",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIeSURBVHgB5VXdcdswDAYUKpXVPrAbeASNoExQZ4ImE7QbxB6hE9gb1BvYnSDaoN6gfOg5PsshA0CyJEbUnZK7vCTfnX9EfvgAkAAE8CGgP8c3ehL/1Wns6s+9nnz6OcY2GhRNL2ckWolY9x0Qpp3tjBa/CY84HMCLHOhU3QG43+BcoTVoQMx7JIRc9ogDDpYU0N0oB5U4zuUhORVwUBkMgfeYI3DzkBP0xBNKNYJlxYeteSiv+KjoODJwaMBZU1lFlJXTUOLalGWhJ2rTZmmvzf5xHQxIzjNRlDol/0Kwjdie7y2UQUWkc+XUH0/GlFBQxSwpm/zZJXOGO1rbmn15q9OLGVjKkI7LGDBdWtSJ/gd9NnCM/0GEG4jVrBbqi1eh8VpeP2RiQ7as0a0q1Rq4GyE2EaLpCA1h2nCxcZxTULy+8jLwxGXHGhgL1+NOGxl4Y7QO+NK6sNH4SsIetwg5WFBXblsjp4OOfew8rvBJA+HX+bG5ZHMoV/Szkh44/KeqqI0Q/pATGCpT+U8NBxcknHyhMjXDd9c2Gryi0SDYaMpjoaWoIq5nclaPijjOIHbUSG7ncSOc0ldh9se1jIojjYpIMr31JHuRpGpOy9XQuiy/SldzE4Vg3ZUMO27OSm5BDudeHM9tzP5EBLeQB29aBuBN27540EHjxFKqiJnMlm51ncHTlveQGxSvQ+KjIZefqvvmlcmvz2T4Lfa+8ARyhNbiDRkX2gAAAABJRU5ErkJggg=="}),o(b,{class:"ti-language-text"},{default:n((()=>[u(c(d.value),1)])),_:1}),o(_,{class:"ti-language-arrow-down",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACPSURBVHgB7Y9BCoUwDESH/w3EuskRPIpH8AZ6M72ZR9ClO60KQRGtYF0ofbRQmslMAgQC70TEHkb6SM8kEkPDfBMqcIFJpz02aF377dSMTt8DalfIXLc6/ehZ4JyIqdSJTjbZTL7oSlzFFXLL3BXixfwwxFDlzfwkxJ+5hph/LjE1i3nUCkcZnkAsCAS+xQhmhzo19D7FAAAAAABJRU5ErkJggg=="})])),_:1})}}},[["__scopeId","data-v-4af10a1b"]]),D=k({__name:"first-binding",setup:a=>(a,e)=>{const r=Q,p=I,g=C,f=l(t("ti-layout-setserver"),O);return s(),i(p,{class:"page",onClick:e[0]||(e[0]=a=>A(j)())},{default:n((()=>[o(p,{class:"ti-page-bg"},{default:n((()=>[o(r,{class:"ti-bg-image",src:H})])),_:1}),o(p,{class:"ti-flex"},{default:n((()=>[o(p,{class:"ti-flex-round"},{default:n((()=>[o(p,{class:"ti-round-box"},{default:n((()=>[o(p,{class:"ti-round-content"},{default:n((()=>[o(p,{class:"ti-item-logo"},{default:n((()=>[o(r,{class:"ti-logo",src:J}),o(g,{class:"ti-platform m-top-24px"},{default:n((()=>[u(c(A(d)("平板端")),1)])),_:1})])),_:1}),o(f,{class:"m-top-32px"})])),_:1})])),_:1})])),_:1})])),_:1}),o(p,{class:"ti-language-box"},{default:n((()=>[o(M,{firstBind:!0})])),_:1})])),_:1})}},[["__scopeId","data-v-dc34464c"]]);export{D as default};
