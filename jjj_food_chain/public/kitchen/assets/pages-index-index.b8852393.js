import{_ as e,u as a,s as t,r as s,o as l,c as o,w as n,a as i,F as r,b as c,d as u,e as d,t as _,f as m,g as p,n as f,h,i as v,$ as w,k as y,j as g,l as k,m as b,S as x,p as C,q as T,v as S,x as L,y as D,z as B,A as I,B as A,C as P,D as $,E,G as N,H as R,I as U}from"./index-1b4d9c9a.js";import{d as M}from"./index.4dba0731.js";const j=e({__name:"menu-card",props:{list:{type:Array,default:()=>[]},nowTime:{type:Number,default:0}},emits:["getList"],setup(e,{emit:C}){const T=e,S=a(),{userInfo:L,active:D}=t(S),B=s(0),I=s(!1),A=s(null),P=e=>{let a="";return e>10&&e<20&&1==L.value.kitchen.is_wait_color&&L.value.kitchen.wait_color.includes("yellow")&&(a="yellow"),e>20&&1==L.value.kitchen.is_wait_color&&L.value.kitchen.wait_color.includes("red")&&(a="red"),a},$=async e=>{try{const a={order_product_id:e.order_product_id};1==(await y(a)).code&&(setTimeout((()=>{g({title:w("操作成功"),icon:"none"})}),300),C("getList"))}catch(a){g({title:w("操作失败"),icon:"none"})}};return(e,a)=>{const t=k,s=b,y=x;return l(),o(s,{class:"menu-body"},{default:n((()=>[(l(!0),i(r,null,c(T.list,((e,a)=>(l(),o(s,{class:"menu-card"},{default:n((()=>[u(t,{class:"menu-title"},{default:n((()=>[d(_(0==m(D)?e.product_name_text:e.category_name_text),1)])),_:2},1024),u(s,{class:"card-scroll"},{default:n((()=>[u(y,{"scroll-y":!0,class:"scroll-Y"},{default:n((()=>[(l(!0),i(r,null,c(e.order_product,((e,a)=>(l(),o(s,{class:"card-one",onClick:a=>{return t=e,B.value++,void setTimeout((()=>{B.value,B.value>=2&&$(t),B.value=0}),250);var t}},{default:n((()=>[u(s,{class:"card-one-t"},{default:n((()=>[u(s,{class:"card-one-l"},{default:n((()=>[u(s,{class:"card-one-name"},{default:n((()=>[d(_(e.product_name_text),1)])),_:2},1024),u(s,{class:"card-one-att"},{default:n((()=>[d(_(e.product_attr),1)])),_:2},1024)])),_:2},1024),u(s,{class:"card-one-r"},{default:n((()=>[u(s,{class:"card-one-num"},{default:n((()=>[p("span",null,_(e.finish_num),1),d("/"+_(e.total_num),1)])),_:2},1024),u(s,{class:f(["card-one-time",P(m(M)(T.nowTime,e.send_kitchen_time))])},{default:n((()=>[p("span",null,_(m(M)(T.nowTime,e.send_kitchen_time)),1),d("min ")])),_:2},1032,["class"])])),_:2},1024)])),_:2},1024),e.remark?(l(),o(s,{key:0,class:"card-one-b"},{default:n((()=>[d(_(e.remark),1)])),_:2},1024)):h("",!0)])),_:2},1032,["onClick"])))),256))])),_:2},1024)])),_:2},1024)])),_:2},1024)))),256)),u(m(v),{show:I.value,"onUpdate:show":a[0]||(a[0]=e=>I.value=e),title:m(w)("已完成"),ref_key:"tiModal",ref:A,onConfirm:$},null,8,["show","title"])])),_:1})}}},[["__scopeId","data-v-f6ab8cbc"]]);const G=e({name:"UniDrawer",components:{keypress:{name:"Keypress",props:{disable:{type:Boolean,default:!1}},mounted(){const e={esc:["Esc","Escape"],tab:"Tab",enter:"Enter",space:[" ","Spacebar"],up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete","Del"]};document.addEventListener("keyup",(a=>{if(this.disable)return;const t=Object.keys(e).find((t=>{const s=a.key,l=e[t];return l===s||Array.isArray(l)&&l.includes(s)}));t&&setTimeout((()=>{this.$emit(t,{})}),0)}))},render:()=>{}}},emits:["change"],props:{mode:{type:String,default:""},mask:{type:Boolean,default:!0},maskClick:{type:Boolean,default:!0},width:{type:Number,default:220}},data:()=>({visibleSync:!1,showDrawer:!1,rightMode:!1,watchTimer:null,drawerWidth:220}),created(){this.drawerWidth=this.width,this.rightMode="right"===this.mode},methods:{clear(){},close(e){("mask"!==e||this.maskClick)&&this.visibleSync&&this._change("showDrawer","visibleSync",!1)},open(){this.visibleSync||this._change("visibleSync","showDrawer",!0)},_change(e,a,t){this[e]=t,this.watchTimer&&clearTimeout(this.watchTimer),this.watchTimer=setTimeout((()=>{this[a]=t,this.$emit("change",t)}),t?50:300)}}},[["render",function(e,a,t,s,i,r){const c=b,d=C("keypress");return i.visibleSync?(l(),o(c,{key:0,class:f([{"uni-drawer--visible":i.showDrawer},"uni-drawer"]),onTouchmove:L(r.clear,["stop","prevent"])},{default:n((()=>[u(c,{class:f(["uni-drawer__mask",{"uni-drawer__mask--visible":i.showDrawer&&t.mask}]),onClick:a[0]||(a[0]=e=>r.close("mask"))},null,8,["class"]),u(c,{class:f(["uni-drawer__content",{"uni-drawer--right":i.rightMode,"uni-drawer--left":!i.rightMode,"uni-drawer__content--visible":i.showDrawer}]),style:T({width:i.drawerWidth+"px"})},{default:n((()=>[S(e.$slots,"default",{},void 0,!0)])),_:3},8,["class","style"]),u(d,{onEsc:a[1]||(a[1]=e=>r.close("mask"))})])),_:3},8,["class","onTouchmove"])):h("",!0)}],["__scopeId","data-v-472e46ff"]]),W=e({__name:"ti-drawer",props:{show:{type:Boolean,default:!1},title:{type:String,default:null},maskClick:{type:Boolean,default:!0},isCancelShow:{type:Boolean,default:!1},isConfirmShow:{type:Boolean,default:!1},confirmLoading:{type:Boolean,default:!1},cancelText:{type:String,default:w("退出")},confirmText:{type:String,default:w("确定")},width:{type:Number,default:552},mode:{type:String,default:"right"}},emits:["cancel","confirm"],setup(e,{emit:a}){const t=e,i=s();D((()=>t.show),(async e=>{var a,t;await B(),e?null==(a=i.value)||a.open():null==(t=i.value)||t.close()}),{immediate:!0});const r=()=>{a("cancel")},c=()=>{a("confirm")},m=e=>{e||r()};return(a,s)=>{const p=b,f=I(P("ti-button"),A),v=I(P("uni-drawer"),G);return l(),o(v,{class:"ti-drawer",ref_key:"drawerRef",ref:i,onChange:m,"mask-click":t.maskClick,width:t.width,mode:t.mode},{default:n((()=>[u(p,{class:"ti-drawer-box"},{default:n((()=>[S(a.$slots,"title",{},(()=>[u(p,{class:"ti-drawer-title"},{default:n((()=>[d(_(e.title),1)])),_:1})]),!0),u(p,{class:"ti-drawer-content"},{default:n((()=>[S(a.$slots,"content",{},void 0,!0)])),_:3}),S(a.$slots,"footer",{},(()=>[u(p,{class:"ti-drawer-footer"},{default:n((()=>[e.isCancelShow?(l(),o(f,{key:0,onClick:r},{default:n((()=>[d(_(e.cancelText),1)])),_:1})):h("",!0),e.isConfirmShow?(l(),o(f,{key:1,loading:e.confirmLoading,type:"primary",onClick:c},{default:n((()=>[d(_(e.confirmText),1)])),_:1},8,["loading"])):h("",!0)])),_:1})]),!0)])),_:3})])),_:3},8,["mask-click","width","mode"])}}},[["__scopeId","data-v-4b7e053f"]]),X=e({__name:"no-data",setup:e=>(e,a)=>{const t=$,s=k,i=b;return l(),o(i,{class:"no-data"},{default:n((()=>[u(t,{class:"no-data-img",src:"/assets/noData-69f8810e.svg"}),u(s,{class:"no-data-text"},{default:n((()=>[d(_(m(w)("当前无下单商品")),1)])),_:1})])),_:1})}},[["__scopeId","data-v-f7704830"]]),Y=e({__name:"history-menu",props:{show:{type:Boolean,default:!1}},emits:["update:show","recover"],setup(e,{expose:a,emit:t}){const f=e,v=s([]),y=s(1),g=s(20),k=s(1);D((()=>f.show),(()=>{f.show&&C()}));const C=async()=>{try{const e={page:y.value,list_rows:g.value},a=await E(e);1==a.code&&(v.value=a.data.list.data,bottom_finish.value=a.data.bottom_finish,k.value=a.data.list.last_page,nowTime.value=a.data.service_time)}catch(e){}},T=()=>{};return a({getList:C}),(e,a)=>{const s=b,y=x,g=I(P("ti-drawer"),W);return l(),o(g,{show:f.show,"onUpdate:show":a[0]||(a[0]=e=>f.show=e),title:m(w)("上菜歷史"),onCancel:a[1]||(a[1]=()=>{t("update:show",!1)})},{content:n((()=>[v.value.length>0?(l(),o(s,{key:0,class:"history-box"},{default:n((()=>[u(y,{"scroll-y":"",class:"scroll-Y",onRefresherpulling:T},{default:n((()=>[(l(!0),i(r,null,c(v.value,((e,a)=>(l(),i("div",{class:"history-card"},[u(s,{class:"card-title"},{default:n((()=>[d("["+_(e.serial_no)+"]",1)])),_:2},1024),(l(!0),i(r,null,c(e.order_product,((e,a)=>(l(),o(s,{class:"card-product"},{default:n((()=>[u(s,{class:"card-product-l"},{default:n((()=>[u(s,{class:"card-product-main"},{default:n((()=>[u(s,{class:"product-main-l"},{default:n((()=>[d(_(e.product_name_text),1)])),_:2},1024),u(s,{class:"product-main-r"},{default:n((()=>[p("span",{class:"product-main-num"},"X"+_(e.total_num),1)])),_:2},1024)])),_:2},1024),u(s,{class:"card-product-main card-product-main-b"},{default:n((()=>[u(s,{class:"product-main-l"},{default:n((()=>[e.product_attr?(l(),i("span",{key:0},"( "+_(e.product_attr)+" )",1)):h("",!0)])),_:2},1024),u(s,{class:"product-main-r"},{default:n((()=>[d(_(m(w)("完成時間"))+" ",1),p("span",null,_(e.finish_time),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),u(s,{class:"card-product-button",onClick:a=>{t("recover",e,"drawer")}},{default:n((()=>[d(_(m(w)("恢復")),1)])),_:2},1032,["onClick"])])),_:2},1024)))),256))])))),256))])),_:1})])),_:1})):(l(),o(X,{key:1}))])),_:1},8,["show","title"])}}},[["__scopeId","data-v-f74cdf9b"]]),q=e({__name:"history-nav",props:{page:{type:Number,default:0},last_page:{type:Number,default:0},bottom_finish:{type:Array,default:()=>[]}},emits:["prevPage","nextPage","getList"],setup(e,{emit:a}){const t=e,p=s(0),h=s(!1);s(null);const v=s(null),y=s(0),C=()=>{t.page>1&&a("prevPage")},T=()=>{t.last_page>1&&t.page<t.last_page&&a("nextPage")},S=()=>{h.value=!0},L=async(e,t)=>{try{const s={order_product_id:e.order_product_id};1==(await N(s)).code&&(setTimeout((()=>{g({title:w("操作成功"),icon:"none"})}),300),a("getList"),"drawer"==t&&v.value.getList())}catch(s){g({title:w("操作失败"),icon:"none"})}};return(e,a)=>{const s=b,g=k,D=x;return l(),o(s,{class:"index-history"},{default:n((()=>[u(s,{class:"index-history-l"},{default:n((()=>[u(s,{class:f(["history-l-button",0==p.value?"nav-head-active":""]),onClick:S},{default:n((()=>[d(_(m(w)("上菜歷史")),1)])),_:1},8,["class"]),u(s,{class:"history-l-scroll"},{default:n((()=>[u(D,{"scroll-x":!0},{default:n((()=>[u(s,{class:"history-l-menu"},{default:n((()=>[(l(!0),i(r,null,c(t.bottom_finish,((e,a)=>(l(),o(s,{class:"history-menu-button",onClick:a=>{return t=e,y.value++,void setTimeout((()=>{y.value,y.value>=2&&L(t),y.value=0}),250);var t}},{default:n((()=>[u(g,{class:"history-menu-name"},{default:n((()=>[d(_(e.product_name_text),1)])),_:2},1024),u(g,{class:"history-menu-num"},{default:n((()=>[d("X"+_(e.finish_num),1)])),_:2},1024)])),_:2},1032,["onClick"])))),256))])),_:1})])),_:1})])),_:1})])),_:1}),u(s,{class:"index-history-r"},{default:n((()=>[u(s,{class:f(["page-button",t.page>1?"page-have":""]),onClick:C},{default:n((()=>[d(_(m(w)("上一页")),1)])),_:1},8,["class"]),u(s,{class:"page-num"},{default:n((()=>[d(_(t.page)+" / "+_(t.last_page),1)])),_:1}),u(s,{class:f(["page-button",t.page!=t.last_page&&0!=t.last_page?"page-have":""]),onClick:T},{default:n((()=>[d(_(m(w)("下一页")),1)])),_:1},8,["class"])])),_:1}),u(Y,{show:h.value,"onUpdate:show":a[0]||(a[0]=e=>h.value=e),ref_key:"menuRef",ref:v,onRecover:L},null,8,["show"])])),_:1})}}},[["__scopeId","data-v-40ceaa40"]]),z=e({__name:"index",setup(e){const i=a(),{active:r,categoryId:c,getListButton:d}=t(i);D((()=>r.value),(e=>{B((()=>{p.value=1,k()}))}),{immediate:!0}),D((()=>c.value),(e=>{B((()=>{0!=r.value&&(p.value=1,k())}))}),{immediate:!0}),D((()=>d.value),(e=>{B((()=>{k(),g({title:w("刷新成功"),icon:"none"})}))}));const _=s([]),m=s([]),p=s(1),f=s(4),h=s(1),v=s(0),y=s(null),k=()=>{0==r.value?x():T(),clearInterval(y.value),y.value=setInterval((()=>{0==r.value?x():T()}),5e3)},x=async()=>{try{const e={page:p.value,list_rows:f.value},a=await R(e);1==a.code&&(_.value=a.data.list.data,m.value=a.data.bottom_finish,h.value=a.data.list.last_page,v.value=a.data.service_time)}catch(e){}},T=async()=>{const e={category_id:c.value,page:p.value,list_rows:f.value},a=await U(e);1==a.code&&(_.value=a.data.list.data,m.value=a.data.bottom_finish,h.value=a.data.list.last_page,v.value=a.data.service_time)},S=()=>{p.value--,k()},L=()=>{p.value++,k()};return(e,a)=>{const t=b,s=C("ti-layout");return l(),o(s,null,{default:n((()=>[u(t,{class:"ti-index"},{default:n((()=>[u(t,{class:"ti-index-main"},{default:n((()=>[_.value.length>0?(l(),o(j,{key:0,list:_.value,nowTime:v.value,onGetList:k},null,8,["list","nowTime"])):(l(),o(X,{key:1}))])),_:1}),u(t,{class:"ti-index-nav"},{default:n((()=>[u(q,{page:p.value,last_page:h.value,bottom_finish:m.value,onPrevPage:S,onNextPage:L,onGetList:k},null,8,["page","last_page","bottom_finish"])])),_:1})])),_:1})])),_:1})}}},[["__scopeId","data-v-0ebab101"]]);export{z as default};
