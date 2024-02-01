import{r as a,g as l,z as e,A as t,d as s,e as i,w as n,k as A,n as o,t as u,u as c,$ as d,s as p,p as g,q as r,x as f,b as v,E as h,j as w,G as b,H as k,I as Y,B as m}from"./index-aade394b.js";import{_ as R,k as x,m as U,l as O,c as S,g as B,a as L,v as C,f as j,h as M,s as X,i as D,n as Q,d as V}from"./baseinfo.97b39b20.js";const G=R({__name:"ti-layout-setserver",setup(b){const k=a({ip:"",port:"",device_id:""}),Y=a=>{k.value.ip=a},m=a=>{k.value.port=a},R=a("");a([]);const Q=a(),V=a(!1),G=async()=>{var a;const l={...k.value};if(l.ip)if(l.port)try{const e=await C(j(`${null==l?void 0:l.ip}:${l.port}`));M(l),g(e.data.app_id),r(e.data.shop_supplier_id),X(null==(a=e.data)?void 0:a.currency),setTimeout((()=>{V.value=!0}),150)}catch(e){p({title:d("绑定失败"),icon:"none"})}else p({title:d("請輸入連接埠"),icon:"none"});else p({title:d("請輸入伺服器位址"),icon:"none"})},Z=a=>{V.value=!1,a&&(Q.value=a,R.value=a.table_no)},J=()=>{k.value.ip="",k.value.port="",R.value="",Q.value=""},T=async()=>{var a;const l={...k.value};if(l.ip)if(l.port)if(Q.value)try{const e=await C(j(`${null==l?void 0:l.ip}:${l.port}`));M(l),g(e.data.app_id),r(e.data.shop_supplier_id),X(null==(a=e.data)?void 0:a.currency),setTimeout((()=>{z()}),150)}catch(e){p({title:d("绑定失败"),icon:"none"})}else p({title:d("請查找桌位"),icon:"none"});else p({title:d("請輸入連接埠"),icon:"none"});else p({title:d("請輸入伺服器位址"),icon:"none"})},z=async()=>{try{const a=await D({table_id:Q.value.table_id});f(Q.value),v({url:"/pages/index/index"}),p({title:a.msg,icon:"none"})}catch(a){}};return(()=>{const a=B();k.value.ip=(null==a?void 0:a.ip)||L()||"127.0.0.1",k.value.port=(null==a?void 0:a.port)||"8080"})(),l({success:a=>{k.value.device_id=a.deviceId}}),(a,l)=>{const p=h,g=w,r=e(t("ti-input"),x),f=e(t("ti-button"),U),v=e(t("ti-layout-table-list"),O);return s(),i(g,null,{default:n((()=>[A(g,{class:"ti-item-input"},{default:n((()=>[A(g,{class:"ti-label-box"},{default:n((()=>[A(g,{class:"ti-label-left"},{default:n((()=>[A(p,{class:"ti-label-server"},{default:n((()=>[o(u(c(d)("服務器連接地址")),1)])),_:1})])),_:1})])),_:1}),A(g,{class:"ti-input-box"},{default:n((()=>[A(r,{type:"text",onInput:Y,placeholder:c(d)("伺服器位址"),value:k.value.ip,clearable:!1},null,8,["placeholder","value"]),A(g,{class:"ti-colon"},{default:n((()=>[o(":")])),_:1}),A(g,{class:"ti-input-port"},{default:n((()=>[A(r,{type:"number",onInput:m,placeholder:c(d)("端口"),value:k.value.port,clearable:!1},null,8,["placeholder","value"])])),_:1})])),_:1})])),_:1}),A(g,{class:"ti-bottom"},{default:n((()=>[A(f,{title:c(d)("重置"),onClick:J},null,8,["title"]),A(f,{title:c(d)("確定"),type:"primary",onClick:T},null,8,["title"])])),_:1}),A(g,{class:"ti-select-table-box",onClick:G},{default:n((()=>[A(p,{class:"ti-label-table"},{default:n((()=>[o(u(R.value?c(d)("已選 : ")+c(S)(R.value):c(d)("查找桌位")),1)])),_:1})])),_:1}),A(v,{show:V.value,"onUpdate:show":l[0]||(l[0]=a=>V.value=a),onConfirm:Z},null,8,["show"])])),_:1})}}},[["__scopeId","data-v-e265c6fd"]]),Z=""+new URL("binding-page-bg-image-db048039.png",import.meta.url).href,J=R({__name:"set-language",setup(l){const c=a(b[k()]),d=a(),p=a=>{d.value.isShow()?d.value.close():d.value.open()},g=()=>{c.value=b[k()]};return(a,l)=>{const r=e(t("ti-layout-language-item"),Q),f=w,v=m,b=h;return s(),i(f,{class:"ti-language",onClick:[p,l[0]||(l[0]=Y((()=>{}),["stop"]))]},{default:n((()=>[A(f,{class:"ti-language-box"},{default:n((()=>[A(r,{ref_key:"refShowLanguage",ref:d,onLanguageText:g},null,512)])),_:1}),A(v,{class:"ti-language-global",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIeSURBVHgB5VXdcdswDAYUKpXVPrAbeASNoExQZ4ImE7QbxB6hE9gb1BvYnSDaoN6gfOg5PsshA0CyJEbUnZK7vCTfnX9EfvgAkAAE8CGgP8c3ehL/1Wns6s+9nnz6OcY2GhRNL2ckWolY9x0Qpp3tjBa/CY84HMCLHOhU3QG43+BcoTVoQMx7JIRc9ogDDpYU0N0oB5U4zuUhORVwUBkMgfeYI3DzkBP0xBNKNYJlxYeteSiv+KjoODJwaMBZU1lFlJXTUOLalGWhJ2rTZmmvzf5xHQxIzjNRlDol/0Kwjdie7y2UQUWkc+XUH0/GlFBQxSwpm/zZJXOGO1rbmn15q9OLGVjKkI7LGDBdWtSJ/gd9NnCM/0GEG4jVrBbqi1eh8VpeP2RiQ7as0a0q1Rq4GyE2EaLpCA1h2nCxcZxTULy+8jLwxGXHGhgL1+NOGxl4Y7QO+NK6sNH4SsIetwg5WFBXblsjp4OOfew8rvBJA+HX+bG5ZHMoV/Szkh44/KeqqI0Q/pATGCpT+U8NBxcknHyhMjXDd9c2Gryi0SDYaMpjoaWoIq5nclaPijjOIHbUSG7ncSOc0ldh9se1jIojjYpIMr31JHuRpGpOy9XQuiy/SldzE4Vg3ZUMO27OSm5BDudeHM9tzP5EBLeQB29aBuBN27540EHjxFKqiJnMlm51ncHTlveQGxSvQ+KjIZefqvvmlcmvz2T4Lfa+8ARyhNbiDRkX2gAAAABJRU5ErkJggg=="}),A(b,{class:"ti-language-text"},{default:n((()=>[o(u(c.value),1)])),_:1}),A(v,{class:"ti-language-arrow-down",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACPSURBVHgB7Y9BCoUwDESH/w3EuskRPIpH8AZ6M72ZR9ClO60KQRGtYF0ofbRQmslMAgQC70TEHkb6SM8kEkPDfBMqcIFJpz02aF377dSMTt8DalfIXLc6/ehZ4JyIqdSJTjbZTL7oSlzFFXLL3BXixfwwxFDlzfwkxJ+5hph/LjE1i3nUCkcZnkAsCAS+xQhmhzo19D7FAAAAAABJRU5ErkJggg=="})])),_:1})}}},[["__scopeId","data-v-1f130956"]]),T=R({__name:"first-binding",setup:a=>(a,l)=>{const p=m,g=w,r=h,f=e(t("ti-layout-setserver"),G);return s(),i(g,{class:"page",onClick:l[0]||(l[0]=a=>c(V)())},{default:n((()=>[A(g,{class:"ti-page-bg"},{default:n((()=>[A(p,{class:"ti-bg-image",src:Z})])),_:1}),A(g,{class:"ti-flex"},{default:n((()=>[A(g,{class:"ti-flex-round"},{default:n((()=>[A(g,{class:"ti-round-box"},{default:n((()=>[A(g,{class:"ti-round-content"},{default:n((()=>[A(g,{class:"ti-item-logo"},{default:n((()=>[A(p,{class:"ti-logo",src:"data:image/png;base64,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"}),A(r,{class:"ti-platform m-top-24px"},{default:n((()=>[o(u(c(d)("平板端")),1)])),_:1})])),_:1}),A(f,{class:"m-top-32px"})])),_:1})])),_:1})])),_:1})])),_:1}),A(g,{class:"ti-language-box"},{default:n((()=>[A(J)])),_:1})])),_:1})}},[["__scopeId","data-v-dacd0c45"]]);export{T as default};