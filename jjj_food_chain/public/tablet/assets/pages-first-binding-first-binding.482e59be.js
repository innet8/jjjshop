import{r as a,g as e,S as l,T as t,j as s,k as A,w as i,x as n,A as o,B as c,h as u,$ as p,C as d,m as g,n as v,G as r,H as b,I as m,J as f,K as B,L as x,M as U,p as C,N as M,O as Q,c as I,Y as w,v as H,a2 as T,a3 as E,a4 as O,U as h,D}from"./index-5bf0d9e3.js";import{_ as V,a as Z,c as y,b as L,d as N}from"./ti-layout-table-list.e1033f0b.js";const R=V({__name:"ti-layout-setserver",setup(T){const E=a({ip:"",port:"",device_id:""}),O=()=>{const a=g();E.value.ip=(null==a?void 0:a.ip)||v()||"127.0.0.1",E.value.port=(null==a?void 0:a.port)||"8080"},h=a=>{E.value.ip=a},D=a=>{E.value.port=a},V=a("");a([]);const N=a(),R=a(!1),J=async()=>{var a;const e={...E.value};if(e.ip)if(e.port)try{const l=await b(m(`${null==e?void 0:e.ip}:${e.port}`));f(e),B(l.data.app_id),x(l.data.shop_supplier_id),U(null==(a=l.data)?void 0:a.currency),setTimeout((()=>{R.value=!0}),150)}catch(l){r({title:p("绑定失败"),icon:"none"})}else r({title:p("請輸入連接埠"),icon:"none"});else r({title:p("請輸入伺服器位址"),icon:"none"})},S=a=>{R.value=!1,a&&(N.value=a,V.value=a.table_no)},F=()=>{O(),V.value=C().table_no,N.value=C()},G=async()=>{var a;const e={...E.value};if(e.ip)if(e.port)try{const l=await b(m(`${null==e?void 0:e.ip}:${e.port}`));if(!N.value)return void r({title:p("請查找桌位"),icon:"none"});f(e),B(l.data.app_id),x(l.data.shop_supplier_id),U(null==(a=l.data)?void 0:a.currency),setTimeout((()=>{z()}),150)}catch(l){r({title:p("绑定失败"),icon:"none"})}else r({title:p("請輸入連接埠"),icon:"none"});else r({title:p("請輸入伺服器位址"),icon:"none"})},z=async()=>{try{const a=await M({table_id:N.value.table_id});Q(N.value),I({url:"/pages/index/index"}),r({title:a.msg,icon:"none"})}catch(a){}};return O(),e({success:a=>{E.value.device_id=a.deviceId}}),(a,e)=>{const g=w,v=H,r=l(t("ti-input"),Z),b=l(t("ti-button"),y),m=l(t("ti-layout-table-list"),L);return s(),A(v,null,{default:i((()=>[n(v,{class:"ti-item-input"},{default:i((()=>[n(v,{class:"ti-label-box"},{default:i((()=>[n(v,{class:"ti-label-left"},{default:i((()=>[n(g,{class:"ti-label-server"},{default:i((()=>[o(c(u(p)("服務器連接地址")),1)])),_:1})])),_:1})])),_:1}),n(v,{class:"ti-input-box"},{default:i((()=>[n(r,{type:"text",onInput:h,placeholder:u(p)("伺服器位址"),value:E.value.ip,clearable:!1},null,8,["placeholder","value"]),n(v,{class:"ti-colon"},{default:i((()=>[o(":")])),_:1}),n(v,{class:"ti-input-port"},{default:i((()=>[n(r,{type:"number",onInput:D,placeholder:u(p)("端口"),value:E.value.port,clearable:!1},null,8,["placeholder","value"])])),_:1})])),_:1})])),_:1}),n(v,{class:"ti-bottom"},{default:i((()=>[n(b,{title:u(p)("重置"),onClick:F},null,8,["title"]),n(b,{title:u(p)("確定"),type:"primary",onClick:G},null,8,["title"])])),_:1}),n(v,{class:"ti-select-table-box",onClick:J},{default:i((()=>[n(g,{class:"ti-label-table"},{default:i((()=>[o(c(V.value?u(p)("已選 : ")+u(d)(V.value,21):u(p)("查找桌位")),1)])),_:1})])),_:1}),n(m,{show:R.value,"onUpdate:show":e[0]||(e[0]=a=>R.value=a),onConfirm:S},null,8,["show"])])),_:1})}}},[["__scopeId","data-v-1514ede9"]]),J=""+new URL("binding-page-bg-image-db048039.png",import.meta.url).href,S=V({__name:"set-language",setup(e){const u=a(T[E()]),p=a(),d=a=>{p.value.isShow()?p.value.close():p.value.open()},g=()=>{u.value=T[E()]};return(a,e)=>{const v=l(t("ti-layout-language-item"),N),r=H,b=h,m=w;return s(),A(r,{class:"ti-language",onClick:[d,e[0]||(e[0]=O((()=>{}),["stop"]))]},{default:i((()=>[n(r,{class:"ti-language-box"},{default:i((()=>[n(v,{ref_key:"refShowLanguage",ref:p,onLanguageText:g},null,512)])),_:1}),n(b,{class:"ti-language-global",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIeSURBVHgB5VXdcdswDAYUKpXVPrAbeASNoExQZ4ImE7QbxB6hE9gb1BvYnSDaoN6gfOg5PsshA0CyJEbUnZK7vCTfnX9EfvgAkAAE8CGgP8c3ehL/1Wns6s+9nnz6OcY2GhRNL2ckWolY9x0Qpp3tjBa/CY84HMCLHOhU3QG43+BcoTVoQMx7JIRc9ogDDpYU0N0oB5U4zuUhORVwUBkMgfeYI3DzkBP0xBNKNYJlxYeteSiv+KjoODJwaMBZU1lFlJXTUOLalGWhJ2rTZmmvzf5xHQxIzjNRlDol/0Kwjdie7y2UQUWkc+XUH0/GlFBQxSwpm/zZJXOGO1rbmn15q9OLGVjKkI7LGDBdWtSJ/gd9NnCM/0GEG4jVrBbqi1eh8VpeP2RiQ7as0a0q1Rq4GyE2EaLpCA1h2nCxcZxTULy+8jLwxGXHGhgL1+NOGxl4Y7QO+NK6sNH4SsIetwg5WFBXblsjp4OOfew8rvBJA+HX+bG5ZHMoV/Szkh44/KeqqI0Q/pATGCpT+U8NBxcknHyhMjXDd9c2Gryi0SDYaMpjoaWoIq5nclaPijjOIHbUSG7ncSOc0ldh9se1jIojjYpIMr31JHuRpGpOy9XQuiy/SldzE4Vg3ZUMO27OSm5BDudeHM9tzP5EBLeQB29aBuBN27540EHjxFKqiJnMlm51ncHTlveQGxSvQ+KjIZefqvvmlcmvz2T4Lfa+8ARyhNbiDRkX2gAAAABJRU5ErkJggg=="}),n(m,{class:"ti-language-text"},{default:i((()=>[o(c(u.value),1)])),_:1}),n(b,{class:"ti-language-arrow-down",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACPSURBVHgB7Y9BCoUwDESH/w3EuskRPIpH8AZ6M72ZR9ClO60KQRGtYF0ofbRQmslMAgQC70TEHkb6SM8kEkPDfBMqcIFJpz02aF377dSMTt8DalfIXLc6/ehZ4JyIqdSJTjbZTL7oSlzFFXLL3BXixfwwxFDlzfwkxJ+5hph/LjE1i3nUCkcZnkAsCAS+xQhmhzo19D7FAAAAAABJRU5ErkJggg=="})])),_:1})}}},[["__scopeId","data-v-5d5886e0"]]),F=V({__name:"first-binding",setup:a=>(a,e)=>{const d=h,g=H,v=w,r=l(t("ti-layout-setserver"),R);return s(),A(g,{class:"page",onClick:e[0]||(e[0]=a=>u(D)())},{default:i((()=>[n(g,{class:"ti-page-bg"},{default:i((()=>[n(d,{class:"ti-bg-image",src:J})])),_:1}),n(g,{class:"ti-flex"},{default:i((()=>[n(g,{class:"ti-flex-round"},{default:i((()=>[n(g,{class:"ti-round-box"},{default:i((()=>[n(g,{class:"ti-round-content"},{default:i((()=>[n(g,{class:"ti-item-logo"},{default:i((()=>[n(d,{class:"ti-logo",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAAAnCAYAAAD3q1G8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA40SURBVHgB7VzNcxxHFX+vZ3etfHoVqqiiEsiaO0gb4MCBeEQVZyu5cSEyB444Tu5I4p7Y5sItli5woWIHzuBx/oBYCne8qYSiUkCkfGBJ3p1u3uvXPTu7Oz07O7tQZVm/8lg7PT1vZmd+8z5+3bMAZzjD/wEIc+Lkz9FngLiMEa0oBFTyF+xfOoBtQznSyNGM0QPAh58ZeHiYmpPPDA4e6O4LV2EPznDq0IA5cPQniM3ALBO5jCG2oSFoRFBmSLiIG4liGenApCeAR5+mePJPTZ8NmhRoMb0zkp1ezEU0ItAqDuivMkQy/ktkU9oArxoileUYQYP1bkabw+N/m/bxv1L6bNuFgIZdnUngDKcWcxENNV4SNpEXIxaBIpcVEbU0h07D5EL+zGG1/6WBk0PT1n1yb5GPodqQDTTs/QwkcIZTi9pEO7gFbQp3scmTiklmw6QGRzDD/Hv4JeLgWPazIZV9oXg959F4Fe7C7LhCy+uwOFx2NldhMWCH/hIth/CYozbRGgO6GTbiMUssV0DCJ7DH4hb+D/p9hTrlNm1zNVsYCLFscYDizfa+8QvoweyIaenA4tBzNtuwGNyDM5JZ1CYaRcNL9nlFDpvEnNQGUcnHOPei8JhSKDVZtcn5G3OKOmn+LASlDeQY8a48/DNjUZ6HwYRow+JIxvgIzmBRm2hEixjFo/GqJF2p+8RV6DmbiBlJ+I1jIbdwTmbsX/FmhjipbgtDZwITogOLw96C7fH3rZMOnEooqIGDm3RDNHkTI26IfRogin+iFXy2iezyaB05T2OnJ1qalT44M5OQKd4OGzCoI2ss0psxmBQxLBZnco1DLY8WabohJ8SuiDjTdKk8c47rgvMNaxVTV1ka8Wgm82C2aJCwidaxJcuXa+UxfBMvFLQzAW8F9klAEv4i+HO4XrBtg5bNwH7btOwEtvXgDBYjRPv7W3DLuBwlIo/UbCC0qJJU5KCgQX+5d5NJBDuD/5g1WKL1E2OtqAg2oqei19TTESddNm3zxYHX0YiaW+mAPAeRsNEAc0x53bMXVKw/bN7RTh0pgk6ts9yLuidXc82HUJxoxxDGPky/+UU2VwJ92aMnUI1QG4Fj3c6tx7Ss03IeJIzz+XJBsQv10HY2X4TJCMD5Y+KWurbXnV1/vv6eeNt7bn04KPTpb2BlMMB74p3I6ZDXaQnZKPwZjm+ATbdouPDET0cv7tEf8E7j+eZFFm0NF5g0vESirHGqP3DlOTjqLy+/Mnoj9d7SHTpiLIWFtFlXJ2qv3ZdGH0CdU9vRyvEWTAd7pCuBbXxh3oPZwTe7KFTzWT8H0yvLNVr+UtB+h5Yfu+3vQDhHvA/iOasSLgbxwHzO04qbHohH3oZq6NLyNlRPM/javZrlaP0+rDnRAez1E8kCbbJvcyo0bsveOMkoZ2vjk1GMLSXhkbOxCG3aJsUBExeScZKZe3QRFFy0FQGarOw0UpuS2EtcY4GX9teq8pO3UrJtH2YH36hQPpg9sVMQ2v99EB2QSdiBMDhFuAnTNUM+12sgBI6hWgXdoWWLlr/B9GKIj/8BzJbL8nc/zBcDl0a3o0vywctlloTkoSYqqaV2YzX6WgRWsuA8LZLCgMmmuBhQPARacJOj1kXZwx4Ph0fmapX2oXFQIG+GTXXY/M5xAtUQB9p7UC9nKis6qsgX/L1eDmyjh8wSowrYztsl57MMQrC6AjaTuYzwnNtWPdc8OIIMiUYBcsWMSFkulhmvYAiaTftlRpA+jZfUEmazNSxHc1Ulynj77fH9tFbrbB1z0zqs/svh9iEvFDKfjDgGJ1ANccm2Ot6MUUa0u1ANnUB7DLPBk62onUlSdq7seRMor4SZbO8E7P+qZL8EJPzuuM/eyzNz7H23xcDH1yCm+9tG4YjJhVAvtWYZ1IOvzMTFPddWsesnGR7raFoo5oaYzDM/GSQTZ4+46gYUhm10cP2Q/F+fxkFbylWmlcNm2YWuKzVcnNNmWej1SEBuCHtITtzZK3UCfWNnMx+yfT5WBL68b8BoNf0KCKHaAfsxjBYJq4HzKbKdt8NR0ubEDdd9Hd1eZqjju5zMME9QySSgu+NShLm31NHKrIBL5lAkCxFp/Zimwgly8n5kecVWpMMxdsNejBdsKFRPCMGV1lU9RxkpEqiH1TltTiMZJ+FbY21/BMmFQjkWf09f1LAXei3QL0SEW852yHsxQZJcW1mutxNoTyBnw4ZOup0rQy/mztCINpYRTnTWZMJcpFdAJFgR/8WjkVQhO7N3U5HeGd+NitDY97f2ubq04VJbD6ie4lF6xYbvY7df1Rt1SrbV8WgdCNtMoBrKiMYJ/lZBO1eZN0r2u5D7HEP4HHeg2Nv4baFCZvyBDfXju1dWLWdwNWI+V8iipNDAKq1oxwAaavJmpalaznUX2nD0VejztI9aP+zvThw44qcQZYSdPBn0DYdMm5+R6CsWLVdVVW+2iOpwHGUkqZLzlRUCfKF/DbPbZ5vt3Oef1bTP6AXa2wX9QtePwzA/GOwl1wN9QH1yzV1MAy70+SCK2Ti39Wa0Sjz4fNxABMeUW5jDYdUohLOTgBT2mi1cG9/Hhk0j5B4m/tpWudH5SLwiShkySPUuVMO81WER4pJt96AaQueVQHkVXPXBKHu4elCOqsc4gOmkZZIx2VgmmQjlioTUDn+Q0k8UfQe02hkxRsInmpayCvAIsAuHpF3kFHuU+RyAd0ndWMPucW98H43GVq4cLtmTEckMRgrUM6yHCF/tlCJQHzW7lWWNeXOpIsyrybFn6AS2vQ/T961iP9SvysPVgepgaWO7Qj8O65wSbOYbORGyJ4pOi/CTMSxZ6P6D089480BbVXgCje7xjqLRAqP1K1RtXsZ06bnG6nEhycxfn9wkWy9CasMlJ/40zkXcfGpy/ImHrKA65q0OixAi72FFmzHUg0/Ii8B3yHvTMjIeQDnKHoJeoH0LhEjTogyfPxMt9g0NJ3dlkgb67MgNers1nn/Bnu3l0LwxR6qerB0X9kn3z13RWm/xWKfp87gUFQpPKyvsiifNi7bmPq6cVA2bjEV7tLLhm6rELfOI56EcZQ9O3VQgj/WSbWXeugcybrvl/v4SRCweh88fE15R4sQQIdCTw6Ylouiq8Re/Kz3BINL9JWb4NTtnjbwZqf1Iw1a2sHRhEofyMOVmWr86g/kOhJ/Out6sU7KtaiFQRpYyEm5CubfZy30OIS7ZVibA8hNfZTy4B0K270E41+v4D0w0vmjD1MzNMTN+MUPZgz+TvHXz4PfVY7u5127rD8/dsiel3YGaRN8GZqWGnw8OmU9VN1rVJQ3GItT7ccQl2+5ANaxOsf96QfsGhKckMZIp6x4dCH+HaUROcuvs1RHC6EGFoT3Vl06+2DTyyUXNXJREkBFy6tJeasAHR+8GRUILJli639rUeHTf9OGSIaWfK8zsZeKhZcwCtgx89pQ+VyXpzKPshlatDscxbyFQFnoZ/J05webEecMtt9x6COPVX9ksXrb/LoxWgH7QPURktrc1ZuM6SCXJM2K64AcWZVl29kLXfz9vCD5+m0RRwE6eWVQEQpOUhlaT8igeP2gQG+xUIeSXguWVOYQeEee2ifQ+C2MQpTwAfl411DpVkbHVx+RFYstcsiOqnCXbUHezUoadMGI+Vxq7RUXEFPjZCkXgi1MnfJpAO4eJZZgO1pfehcUhpPLzuTARykjt54l1ptjfhtHKEqHarI6QvW+D83Z+CGqXbvzm6DinJYM/HspMDhtMRcAV5/ciDTVdsfmV3YvIlrrKlScrRoDZ5FvlawpvUWFOSpEuGG1g90EPZse81eE44pJtVULxtPyMVf8rMBt4n+sF7ezlfg7lpC6TQRjG2R+PJDHUJxnb6vkGGYJSNKBrxkiWqbVuyNJKHeBkVCNDTsJG6SZVI/jBqCw8+nlmJhcw0YVJBDPc17yO331QZ1LiIqrDIpswp81Q6L1PC+uOu1Ad190+IXDIZbJVFWA9+MIfONvj9ssklmk2xz2jEE1+88Lc9YWAeCsw+T1FrRcB17YJl9wfn2aZEZnCaXJOh0P3dp5ow+4lPWuCKpLL0crJDaiHTsm2/8XUoASqIQ602+ILJCeblosyKTkEX4Xp4NyO04RdGNZyRfDbDtzxObzdCPRLQHJcU9HmHZDZwhPfK/My/7gGHYp2bLTNfIko7DUpsLZo2FE1jLxw4hYbcOVFYfnhFn4jXbncS8mMWFtV8r9I+R94sYxC98MvbpjqIE3x1RnU/yKUhQWfmyzSZg+mg2/4BwXtRXlWB4SUTG6vrbHXZEImUA8dZ+8iTOp13naVFMDDjyOzl+ac8Fu5bZ87m2yvFzKA+ZVP3qJyG6mK8ETjYsATrAn8koqxJOO3nyzBLLGMvFqnUH66CizxZC6a9PHt7met+EVOPi5Vl8VDVKcAl6F4Cg4Tjd8RSOAxw8h7nS+8CdeRy1v01SAW7GL82MEwTLok32TKmF13v65h8hqdU8vwutJL3VNKsmmFQN288ZGGGm94/g3YJmZsS0YvDPEjBK4IMH4slLe5/E1++WCowIHUqIh6+E4Ad0hMimvRytFV7B7WCWmPCkKFQN3pSo88VFHjN9+ErUibl4gpPV4fHSEwLtPPpgXxf+i0fZfwY+YNlRQJlmCN7x+vNX8wVz72KMDnM0V4LL0ZI/im+tfl1xcvfPFb2KC8apPo0/FFh/FVKWYzLqy4Bn6rdDugUdJdk+r3mj/i9wX68JigbO5+3Sr4kQdW7fjVTVhVLco9GlQhRVTVKOioSLX5B1so4e9Rwn9I1cAeqHQvjdT+E2uTL6M8JmApouhNJSYal/6zVHtnOEMh+MFl8VQXLCk8xvgvdmSGgZPSKpgAAAAASUVORK5CYII="}),n(v,{class:"ti-platform m-top-24px"},{default:i((()=>[o(c(u(p)("平板端")),1)])),_:1})])),_:1}),n(r,{class:"m-top-32px"})])),_:1})])),_:1})])),_:1})])),_:1}),n(g,{class:"ti-language-box"},{default:i((()=>[n(S)])),_:1})])),_:1})}},[["__scopeId","data-v-dacd0c45"]]);export{F as default};
