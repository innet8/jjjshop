import{_ as e,y as a,K as t,r as s,o as l,e as o,w as n,i,F as r,j as c,f as u,g as d,t as _,h as m,L as p,n as f,m as h,M as v,$ as w,N as y,A as g,s as k,v as b,S as x,O as T,P as C,Q as S,R as L,T as D,U as I,a as B,J as A,d as U,x as P,V as R,W as N,z as $,X as M,Y as E,Z as j}from"./index-d8a24e6b.js";import{d as W}from"./index.aa6bf518.js";const X=e({__name:"menu-card",props:{list:{type:Array,default:()=>[]},nowTime:{type:Number,default:0}},emits:["getList"],setup(e,{emit:T}){const C=e,S=a(),{userInfo:L,active:D}=t(S),I=s(0),B=s(!1),A=s(null),U=e=>{let a="";return L.value&&(e>=10&&e<20&&1==L.value.kitchen.is_wait_color&&L.value.kitchen.wait_color.includes("yellow")&&(a="yellow"),e>=20&&1==L.value.kitchen.is_wait_color&&L.value.kitchen.wait_color.includes("red")&&(a="red")),a},P=async e=>{try{const a={order_product_id:e.order_product_id};1==(await y(a)).code&&(setTimeout((()=>{g({title:w("操作成功"),icon:"none"})}),300),T("getList"))}catch(a){g({title:w("操作失败"),icon:"none"})}};return(e,a)=>{const t=k,s=b,y=x;return l(),o(s,{class:"menu-body"},{default:n((()=>[(l(!0),i(r,null,c(C.list,((e,a)=>(l(),o(s,{class:"menu-card"},{default:n((()=>[u(t,{class:"menu-title"},{default:n((()=>[d(_(0==m(D)?e.serial_no:e.category_name_text),1)])),_:2},1024),u(s,{class:"card-scroll"},{default:n((()=>[u(y,{"scroll-y":!0,class:"scroll-Y"},{default:n((()=>[(l(!0),i(r,null,c(e.order_product,((e,a)=>(l(),o(s,{class:"card-one",onClick:a=>{return t=e,I.value++,void setTimeout((()=>{I.value,I.value>=2&&P(t),I.value=0}),250);var t}},{default:n((()=>[u(s,{class:"card-one-t"},{default:n((()=>[u(s,{class:"card-one-l"},{default:n((()=>[u(s,{class:"card-one-name"},{default:n((()=>[d(_(e.product_name_text),1)])),_:2},1024),u(s,{class:"card-one-att"},{default:n((()=>[d(_(e.product_attr),1)])),_:2},1024)])),_:2},1024),u(s,{class:"card-one-r"},{default:n((()=>[u(s,{class:"card-one-num"},{default:n((()=>[p("span",null,_(e.finish_num),1),d("/"+_(e.total_num),1)])),_:2},1024),u(s,{class:f(["card-one-time",U(m(W)(C.nowTime,e.send_kitchen_time))])},{default:n((()=>[p("span",null,_(m(W)(C.nowTime,e.send_kitchen_time)),1),d("min ")])),_:2},1032,["class"])])),_:2},1024)])),_:2},1024),e.remark?(l(),o(s,{key:0,class:"card-one-b"},{default:n((()=>[d(_(e.remark),1)])),_:2},1024)):h("",!0)])),_:2},1032,["onClick"])))),256))])),_:2},1024)])),_:2},1024)])),_:2},1024)))),256)),u(m(v),{show:B.value,"onUpdate:show":a[0]||(a[0]=e=>B.value=e),title:m(w)("已完成"),ref_key:"tiModal",ref:A,onConfirm:P},null,8,["show","title"])])),_:1})}}},[["__scopeId","data-v-b1e2e838"]]);const Y=e({name:"UniDrawer",components:{keypress:{name:"Keypress",props:{disable:{type:Boolean,default:!1}},mounted(){const e={esc:["Esc","Escape"],tab:"Tab",enter:"Enter",space:[" ","Spacebar"],up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete","Del"]};document.addEventListener("keyup",(a=>{if(this.disable)return;const t=Object.keys(e).find((t=>{const s=a.key,l=e[t];return l===s||Array.isArray(l)&&l.includes(s)}));t&&setTimeout((()=>{this.$emit(t,{})}),0)}))},render:()=>{}}},emits:["change"],props:{mode:{type:String,default:""},mask:{type:Boolean,default:!0},maskClick:{type:Boolean,default:!0},width:{type:Number,default:220}},data:()=>({visibleSync:!1,showDrawer:!1,rightMode:!1,watchTimer:null,drawerWidth:220}),created(){this.drawerWidth=this.width,this.rightMode="right"===this.mode},methods:{clear(){},close(e){("mask"!==e||this.maskClick)&&this.visibleSync&&this._change("showDrawer","visibleSync",!1)},open(){this.visibleSync||this._change("visibleSync","showDrawer",!0)},_change(e,a,t){this[e]=t,this.watchTimer&&clearTimeout(this.watchTimer),this.watchTimer=setTimeout((()=>{this[a]=t,this.$emit("change",t)}),t?50:300)}}},[["render",function(e,a,t,s,i,r){const c=b,d=T("keypress");return i.visibleSync?(l(),o(c,{key:0,class:f([{"uni-drawer--visible":i.showDrawer},"uni-drawer"]),onTouchmove:L(r.clear,["stop","prevent"])},{default:n((()=>[u(c,{class:f(["uni-drawer__mask",{"uni-drawer__mask--visible":i.showDrawer&&t.mask}]),onClick:a[0]||(a[0]=e=>r.close("mask"))},null,8,["class"]),u(c,{class:f(["uni-drawer__content",{"uni-drawer--right":i.rightMode,"uni-drawer--left":!i.rightMode,"uni-drawer__content--visible":i.showDrawer}]),style:C({width:i.drawerWidth+"px"})},{default:n((()=>[S(e.$slots,"default",{},void 0,!0)])),_:3},8,["class","style"]),u(d,{onEsc:a[1]||(a[1]=e=>r.close("mask"))})])),_:3},8,["class","onTouchmove"])):h("",!0)}],["__scopeId","data-v-472e46ff"]]),G=e({__name:"ti-drawer",props:{show:{type:Boolean,default:!1},title:{type:String,default:null},maskClick:{type:Boolean,default:!0},isCancelShow:{type:Boolean,default:!1},isConfirmShow:{type:Boolean,default:!1},confirmLoading:{type:Boolean,default:!1},cancelText:{type:String,default:w("退出")},confirmText:{type:String,default:w("确定")},width:{type:Number,default:624},mode:{type:String,default:"right"}},emits:["cancel","confirm"],setup(e,{emit:a}){const t=e,i=s();D((()=>t.show),(async e=>{var a,t;await I(),e?null==(a=i.value)||a.open():null==(t=i.value)||t.close()}),{immediate:!0});const r=()=>{a("cancel")},c=()=>{a("confirm")},m=e=>{e||r()};return(a,s)=>{const p=b,f=B(U("ti-button"),A),v=B(U("uni-drawer"),Y);return l(),o(v,{class:"ti-drawer",ref_key:"drawerRef",ref:i,onChange:m,"mask-click":t.maskClick,width:t.width,mode:t.mode},{default:n((()=>[u(p,{class:"ti-drawer-box"},{default:n((()=>[S(a.$slots,"title",{},(()=>[u(p,{class:"ti-drawer-title"},{default:n((()=>[d(_(e.title),1)])),_:1})]),!0),u(p,{class:"ti-drawer-content"},{default:n((()=>[S(a.$slots,"content",{},void 0,!0)])),_:3}),S(a.$slots,"footer",{},(()=>[u(p,{class:"ti-drawer-footer"},{default:n((()=>[e.isCancelShow?(l(),o(f,{key:0,onClick:r},{default:n((()=>[d(_(e.cancelText),1)])),_:1})):h("",!0),e.isConfirmShow?(l(),o(f,{key:1,loading:e.confirmLoading,type:"primary",onClick:c},{default:n((()=>[d(_(e.confirmText),1)])),_:1},8,["loading"])):h("",!0)])),_:1})]),!0)])),_:3})])),_:3},8,["mask-click","width","mode"])}}},[["__scopeId","data-v-ffd26375"]]),K=""+new URL("noData-69f8810e.svg",import.meta.url).href,O=e({__name:"no-data",setup:e=>(e,a)=>{const t=P,s=k,i=b;return l(),o(i,{class:"no-data"},{default:n((()=>[u(t,{class:"no-data-img",src:K}),u(s,{class:"no-data-text"},{default:n((()=>[d(_(m(w)("当前无下单商品")),1)])),_:1})])),_:1})}},[["__scopeId","data-v-f7704830"]]),z=e({__name:"history-menu",props:{show:{type:Boolean,default:!1}},emits:["update:show","recover"],setup(e,{expose:a,emit:t}){const f=e,v=s([]),y=s(1),g=s(20),k=s(1);D((()=>f.show),(()=>{f.show&&T()}));const T=async()=>{try{const e={page:y.value,list_rows:g.value},a=await R(e);1==a.code&&(v.value=a.data.list.data,bottom_finish.value=a.data.bottom_finish,k.value=a.data.list.last_page,nowTime.value=a.data.service_time)}catch(e){}},C=()=>{};return a({getList:T}),(e,a)=>{const s=b,y=x,g=B(U("ti-drawer"),G);return l(),o(g,{show:f.show,"onUpdate:show":a[0]||(a[0]=e=>f.show=e),title:m(w)("上菜歷史"),onCancel:a[1]||(a[1]=()=>{t("update:show",!1)})},{content:n((()=>[v.value.length>0?(l(),o(s,{key:0,class:"history-box"},{default:n((()=>[u(y,{"scroll-y":"",class:"scroll-Y",onRefresherpulling:C},{default:n((()=>[(l(!0),i(r,null,c(v.value,((e,a)=>(l(),i("div",{class:"history-card"},[u(s,{class:"card-title"},{default:n((()=>[d("["+_(e.serial_no)+"]",1)])),_:2},1024),(l(!0),i(r,null,c(e.order_product,((e,a)=>(l(),o(s,{class:"card-product"},{default:n((()=>[u(s,{class:"card-product-l"},{default:n((()=>[u(s,{class:"card-product-main"},{default:n((()=>[u(s,{class:"product-main-l"},{default:n((()=>[d(_(e.product_name_text),1)])),_:2},1024),u(s,{class:"product-main-r"},{default:n((()=>[p("span",{class:"product-main-num"},"X"+_(e.total_num),1)])),_:2},1024)])),_:2},1024),u(s,{class:"card-product-main card-product-main-b"},{default:n((()=>[u(s,{class:"product-main-l"},{default:n((()=>[e.product_attr?(l(),i("span",{key:0},"( "+_(e.product_attr)+" )",1)):h("",!0)])),_:2},1024),u(s,{class:"product-main-r"},{default:n((()=>[d(_(m(w)("完成時間"))+" ",1),p("span",null,_(e.finish_time),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),u(s,{class:"card-product-button",onClick:a=>{t("recover",e,"drawer")}},{default:n((()=>[d(_(m(w)("恢復")),1)])),_:2},1032,["onClick"])])),_:2},1024)))),256))])))),256))])),_:1})])),_:1})):(l(),o(O,{key:1}))])),_:1},8,["show","title"])}}},[["__scopeId","data-v-4f38d9ce"]]),F=e({__name:"history-nav",props:{page:{type:Number,default:0},last_page:{type:Number,default:0},bottom_finish:{type:Array,default:()=>[]}},emits:["prevPage","nextPage","getList"],setup(e,{emit:a}){const t=e,p=s(0),h=s(!1);s(null);const v=s(null),y=s(0),T=()=>{t.page>1&&a("prevPage")},C=()=>{t.last_page>1&&t.page<t.last_page&&a("nextPage")},S=()=>{h.value=!0},L=async(e,t)=>{try{const s={order_product_id:e.order_product_id};1==(await N(s)).code&&(setTimeout((()=>{g({title:w("操作成功"),icon:"none"})}),300),a("getList"),"drawer"==t&&v.value.getList())}catch(s){g({title:w("操作失败"),icon:"none"})}};return(e,a)=>{const s=b,g=k,D=x;return l(),o(s,{class:"index-history"},{default:n((()=>[u(s,{class:"index-history-l"},{default:n((()=>[u(s,{class:f(["history-l-button",0==p.value?"nav-head-active":""]),onClick:S},{default:n((()=>[d(_(m(w)("上菜歷史")),1)])),_:1},8,["class"]),u(s,{class:"history-l-scroll"},{default:n((()=>[u(D,{"scroll-x":!0},{default:n((()=>[u(s,{class:"history-l-menu"},{default:n((()=>[(l(!0),i(r,null,c(t.bottom_finish,((e,a)=>(l(),o(s,{class:"history-menu-button",onClick:a=>{return t=e,y.value++,void setTimeout((()=>{y.value,y.value>=2&&L(t),y.value=0}),250);var t}},{default:n((()=>[u(g,{class:"history-menu-name"},{default:n((()=>[d(_(e.product_name_text),1)])),_:2},1024),u(g,{class:"history-menu-num"},{default:n((()=>[d("X"+_(e.finish_num),1)])),_:2},1024)])),_:2},1032,["onClick"])))),256))])),_:1})])),_:1})])),_:1})])),_:1}),u(s,{class:"index-history-r"},{default:n((()=>[u(s,{class:f(["page-button",t.page>1?"page-have":""]),onClick:T},{default:n((()=>[d(_(m(w)("上一页")),1)])),_:1},8,["class"]),u(s,{class:"page-num"},{default:n((()=>[d(_(t.page)+" / "+_(t.last_page),1)])),_:1}),u(s,{class:f(["page-button",t.page!=t.last_page&&0!=t.last_page?"page-have":""]),onClick:C},{default:n((()=>[d(_(m(w)("下一页")),1)])),_:1},8,["class"])])),_:1}),u(z,{show:h.value,"onUpdate:show":a[0]||(a[0]=e=>h.value=e),ref_key:"menuRef",ref:v,onRecover:L},null,8,["show"])])),_:1})}}},[["__scopeId","data-v-40ceaa40"]]),J=e({__name:"index",setup(e){const i=a(),{setUserInfo:r}=a(),{active:c,categoryId:d,getListButton:_}=t(i);$((()=>{r()})),D((()=>c.value),(e=>{I((()=>{f.value=1,x()}))}),{immediate:!0}),D((()=>d.value),(e=>{I((()=>{0!=c.value&&(f.value=1,x())}))}),{immediate:!0}),D((()=>_.value),(e=>{I((()=>{x(),g({title:w("刷新成功"),icon:"none"})}))}));const m=s([]),p=s([]),f=s(1),h=s(4),v=s(1),y=s(0),k=s(null),x=()=>{M()&&(0==c.value?C():S(),clearInterval(k.value),k.value=setInterval((()=>{0==c.value?C():S()}),5e3))},C=async()=>{try{const e={page:f.value,list_rows:h.value},a=await E(e);1==a.code&&(m.value=a.data.list.data,p.value=a.data.bottom_finish,v.value=a.data.list.last_page,y.value=a.data.service_time)}catch(e){}},S=async()=>{const e={category_id:d.value,page:f.value,list_rows:h.value},a=await j(e);1==a.code&&(m.value=a.data.list.data,p.value=a.data.bottom_finish,v.value=a.data.list.last_page,y.value=a.data.service_time)},L=()=>{f.value--,x()},B=()=>{f.value++,x()};return(e,a)=>{const t=b,s=T("ti-layout");return l(),o(s,null,{default:n((()=>[u(t,{class:"ti-index"},{default:n((()=>[u(t,{class:"ti-index-main"},{default:n((()=>[(m.value.length||[])>0?(l(),o(X,{key:0,list:m.value,nowTime:y.value,onGetList:x},null,8,["list","nowTime"])):(l(),o(O,{key:1}))])),_:1}),u(t,{class:"ti-index-nav"},{default:n((()=>[u(F,{page:f.value,last_page:v.value,bottom_finish:p.value,onPrevPage:L,onNextPage:B,onGetList:x},null,8,["page","last_page","bottom_finish"])])),_:1})])),_:1})])),_:1})}}},[["__scopeId","data-v-02b96479"]]);export{J as default};