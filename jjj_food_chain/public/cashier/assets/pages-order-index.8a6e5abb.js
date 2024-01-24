import{ap as e,_ as t,r as a,a as n,b as l,o as i,d as r,w as o,e as u,f as s,t as d,Z as c,R as p,O as h,P as g,Q as f,i as _,a6 as m,aq as v,j as y,m as x,af as w,p as k,ae as C,S as b,ak as I,K as S,L as P,M as T,u as z,$ as U,W as V,X as D,y as N,ar as $,as as R,at as O,au as L,J as A,av as M,ah as j,ai as B,aw as E,ax as F,ay as W,I as q,aj as H}from"./index-34a6b045.js";import{_ as Z}from"./uni-data-select.aebb28ab.js";const J={en:{"uni-pagination.prevText":"prev","uni-pagination.nextText":"next","uni-pagination.piecePerPage":"piece/page"},es:{"uni-pagination.prevText":"anterior","uni-pagination.nextText":"prxima","uni-pagination.piecePerPage":"Art��culo/P��gina"},fr:{"uni-pagination.prevText":"précédente","uni-pagination.nextText":"suivante","uni-pagination.piecePerPage":"Articles/Pages"},"zh-Hans":{"uni-pagination.prevText":"上一页","uni-pagination.nextText":"下一页","uni-pagination.piecePerPage":"条/页"},"zh-Hant":{"uni-pagination.prevText":"上一頁","uni-pagination.nextText":"下一頁","uni-pagination.piecePerPage":"條/頁"}},{t:K}=e(J);const Q=t({name:"UniPagination",emits:["update:modelValue","input","change","pageSizeChange"],props:{value:{type:[Number,String],default:1},modelValue:{type:[Number,String],default:1},prevText:{type:String},nextText:{type:String},piecePerPageText:{type:String},current:{type:[Number,String],default:1},total:{type:[Number,String],default:0},pageSize:{type:[Number,String],default:10},showIcon:{type:[Boolean,String],default:!1},showPageSize:{type:[Boolean,String],default:!1},pagerCount:{type:Number,default:7},pageSizeRange:{type:Array,default:()=>[20,50,100,500]}},data:()=>({pageSizeIndex:0,currentIndex:1,paperData:[],pickerShow:!1}),computed:{piecePerPage(){return this.piecePerPageText||K("uni-pagination.piecePerPage")},prevPageText(){return this.prevText||K("uni-pagination.prevText")},nextPageText(){return this.nextText||K("uni-pagination.nextText")},maxPage(){let e=1,t=Number(this.total),a=Number(this.pageSize);return t&&a&&(e=Math.ceil(t/a)),e},paper(){const e=this.currentIndex,t=this.pagerCount,a=this.total,n=this.pageSize;let l=[],i=[],r=Math.ceil(a/n);for(let u=0;u<r;u++)l.push(u+1);i.push(1);const o=l[l.length-(t+1)/2];return l.forEach(((a,n)=>{(t+1)/2>=e?a<t+1&&a>1&&i.push(a):e+2<=o?a>e-(t+1)/2&&a<e+(t+1)/2&&i.push(a):(a>e-(t+1)/2||r-t<a)&&a<l[l.length-1]&&i.push(a)})),r>t?((t+1)/2>=e?i[i.length-1]="...":e+2<=o?(i[1]="...",i[i.length-1]="..."):i[1]="...",i.push(l[l.length-1])):(t+1)/2>=e||e+2<=o||(i.shift(),i.push(l[l.length-1])),i}},watch:{current:{immediate:!0,handler(e,t){this.currentIndex=e<1?1:e}},value:{immediate:!0,handler(e){1===Number(this.current)&&(this.currentIndex=e<1?1:e)}},pageSizeIndex(e){this.$emit("pageSizeChange",this.pageSizeRange[e])}},methods:{pickerChange(e){this.pageSizeIndex=e.detail.value,this.pickerClick()},pickerClick(){const e=document.querySelector("body");if(!e)return;const t="uni-pagination-picker-show";this.pickerShow=!this.pickerShow,this.pickerShow?e.classList.add(t):setTimeout((()=>e.classList.remove(t)),300)},selectPage(e,t){if(parseInt(e))this.currentIndex=e,this.change("current");else{let e=Math.ceil(this.total/this.pageSize);if(t<=1)return void(this.currentIndex-5>1?this.currentIndex-=5:this.currentIndex=1);if(t>=6)return void(this.currentIndex+5>e?this.currentIndex=e:this.currentIndex+=5)}},clickLeft(){1!==Number(this.currentIndex)&&(this.currentIndex-=1,this.change("prev"))},clickRight(){Number(this.currentIndex)>=this.maxPage||(this.currentIndex+=1,this.change("next"))},change(e){this.$emit("input",this.currentIndex),this.$emit("update:modelValue",this.currentIndex),this.$emit("change",{type:e,current:this.currentIndex})}}},[["render",function(e,t,x,w,k,C){const b=_,I=a(l("uni-icons"),n),S=m,P=v,T=y;return i(),r(T,{class:"uni-pagination"},{default:o((()=>[!0===x.showPageSize||"true"===x.showPageSize?(i(),r(P,{key:0,class:"select-picker",mode:"selector",value:k.pageSizeIndex,range:x.pageSizeRange,onChange:C.pickerChange,onCancel:C.pickerClick,onClick:C.pickerClick},{default:o((()=>[u(S,{type:"default",size:"mini",plain:!0},{default:o((()=>[u(b,null,{default:o((()=>[s(d(x.pageSizeRange[k.pageSizeIndex])+" "+d(C.piecePerPage),1)])),_:1}),u(I,{class:"select-picker-icon",type:"arrowdown",size:"12",color:"#999"})])),_:1})])),_:1},8,["value","range","onChange","onCancel","onClick"])):c("",!0),u(T,{class:"uni-pagination__total is-phone-hide"},{default:o((()=>[s("共 "+d(x.total)+" 条",1)])),_:1}),u(T,{class:p(["uni-pagination__btn",1===k.currentIndex?"uni-pagination--disabled":"uni-pagination--enabled"]),"hover-class":1===k.currentIndex?"":"uni-pagination--hover","hover-start-time":20,"hover-stay-time":70,onClick:C.clickLeft},{default:o((()=>[!0===x.showIcon||"true"===x.showIcon?(i(),r(I,{key:0,color:"#666",size:"16",type:"left"})):(i(),r(b,{key:1,class:"uni-pagination__child-btn"},{default:o((()=>[s(d(C.prevPageText),1)])),_:1}))])),_:1},8,["class","hover-class","onClick"]),u(T,{class:"uni-pagination__num uni-pagination__num-flex-none"},{default:o((()=>[u(T,{class:"uni-pagination__num-current"},{default:o((()=>[u(b,{class:"uni-pagination__num-current-text is-pc-hide current-index-text"},{default:o((()=>[s(d(k.currentIndex),1)])),_:1}),u(b,{class:"uni-pagination__num-current-text is-pc-hide"},{default:o((()=>[s("/"+d(C.maxPage||0),1)])),_:1}),(i(!0),h(g,null,f(C.paper,((e,t)=>(i(),r(T,{key:t,class:p([{"page--active":e===k.currentIndex},"uni-pagination__num-tag tag--active is-phone-hide"]),onClick:a=>C.selectPage(e,t)},{default:o((()=>[u(b,null,{default:o((()=>[s(d(e),1)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))])),_:1})])),_:1}),u(T,{class:p(["uni-pagination__btn",k.currentIndex>=C.maxPage?"uni-pagination--disabled":"uni-pagination--enabled"]),"hover-class":k.currentIndex===C.maxPage?"":"uni-pagination--hover","hover-start-time":20,"hover-stay-time":70,onClick:C.clickRight},{default:o((()=>[!0===x.showIcon||"true"===x.showIcon?(i(),r(I,{key:0,color:"#666",size:"16",type:"right"})):(i(),r(b,{key:1,class:"uni-pagination__child-btn"},{default:o((()=>[s(d(C.nextPageText),1)])),_:1}))])),_:1},8,["class","hover-class","onClick"])])),_:1})}],["__scopeId","data-v-7a02a0a9"]]),X=t({__name:"order-type-menu",props:{list:{type:Array,default:()=>[]},menuId:{type:Number,default:null}},emits:["update:menuId","menuClick"],setup(e,{emit:t}){const a=e,n=x(0),l=x(0),m=x([]),v=w().in(this);k((()=>a.list),(async e=>{if(e&&0!=e.length&&(await C(),e.map(((e,t)=>{v.select(`#scroll-item-${t}`).boundingClientRect((e=>{if(!e)return;const a=m.value;a[t]=e.width+10,m.value=a})).exec()})),a.menuId>0)){const e=a.list.findIndex((e=>e.category_id==a.menuId));e>-1&&I(e)}}),{deep:!0,immediate:!0});const I=e=>{l.value=e,n.value=m.value.slice(0,e+1).reduce(((e,t)=>e+t),0)-(m.value[e]+100),t("update:menuId",a.list[e].category_id),t("menuClick",a.list[e].category_id)};return(e,t)=>{const m=_,v=y,x=b;return i(),r(x,{class:"ti-order-menu","scroll-left":n.value,"scroll-x":"","enable-flex":"","scroll-with-animation":""},{default:o((()=>[u(v,{class:"ti-menu-content"},{default:o((()=>[(i(!0),h(g,null,f(a.list,((e,t)=>(i(),r(v,{key:t,class:p(["ti-menu-item",{active:t==l.value}]),id:`scroll-item-${t}`,onClick:e=>I(t)},{default:o((()=>[u(v,{style:{display:"flex","flex-direction":"row","align-items":"center"}},{default:o((()=>[u(m,{class:"ti-menu-title"},{default:o((()=>[s(d(e.name_text),1)])),_:2},1024),e.number?(i(),r(v,{key:0,class:"ti-menu-bedge"},{default:o((()=>[s(d(e.number),1)])),_:2},1024)):c("",!0)])),_:2},1024)])),_:2},1032,["id","class","onClick"])))),128))])),_:1})])),_:1},8,["scroll-left"])}}},[["__scopeId","data-v-67866074"]]);function G(e){return I("order.order/cancel",e)}function Y(e){return I("order.order/remove",e)}function ee(e){return I("order.order/print",e)}const te=t({__name:"dialog-refuse-payed",props:{show:{type:Boolean,default:!1},orderAmount:{type:String,default:""}},emits:["update:show"],setup(e,{expose:t,emit:n}){const c=e,p=x({refund_money:""}),h=x({}),g=x(!1),f=()=>{p.value.refund_money=""},m=e=>{p.value.refund_money+=e,v()},v=()=>{parseFloat(p.value.refund_money)>parseFloat(h.value.total_price)&&(p.value.refund_money=parseFloat(h.value.total_price)+"")},w=async()=>{const e={...p.value};e.order_id=h.value.order_id;try{g.value=!0;const t=await function(e){return I("order.order/refund",e)}(e);setTimeout((()=>{N({title:t.msg,icon:"none"})}),200),1==t.code&&k(),g.value=!1}catch(t){}finally{g.value=!1}},k=()=>{n("update:show",!1)};return t({getOrderData:e=>{h.value=e,n("update:show",!0)}}),(e,t)=>{const n=y,v=_,x=a(l("ti-input"),S),C=a(l("ti-keyboard"),P),b=a(l("ti-modal"),T);return i(),r(b,{show:c.show,title:z(U)("退款")},{content:o((()=>[u(n,{class:"ti-dialog-content"},{default:o((()=>[u(n,{class:"ti-preferential-box"},{default:o((()=>[u(n,{class:"ti-preferential-label"},{default:o((()=>[s(d(z(U)("可退款金額")),1)])),_:1}),u(n,{class:"ti-preferential-input"},{default:o((()=>[u(v,{class:"ti-preferential-price"},{default:o((()=>[s(d(z(V)(h.value.total_price)),1)])),_:1}),u(v,{class:"ti-preferential-subPrice"},{default:o((()=>[s(d(z(D)(h.value.total_price)),1)])),_:1})])),_:1}),u(n,{class:"ti-preferential-input"},{default:o((()=>[u(x,{modelValue:p.value.refund_money,"onUpdate:modelValue":t[0]||(t[0]=e=>p.value.refund_money=e),placeholder:z(U)("請輸入退款金額，不能大於可退款金額"),focus:!0},null,8,["modelValue","placeholder"])])),_:1})])),_:1})])),_:1})])),footer:o((()=>[u(n,{class:"ti-dialog-btn ti-preferential-keyboard"},{default:o((()=>[u(C,{primaryLoading:g.value,isDoubleZero:!0,isCross:!1,isDrop:!0,onExit:k,onClear:f,onInput:m,onConfirm:w},null,8,["primaryLoading"])])),_:1})])),_:1},8,["show","title"])}}},[["__scopeId","data-v-6a438d47"]]),ae=t({__name:"dialog-order-detail",props:{show:{type:Boolean,default:!1}},emits:["update:show","confirm"],setup(e,{expose:t,emit:n}){const p=x(""),_=x(!1),m=x(!1),v=x(!1),w=x(!1),k=x({}),C=x();x({time_type:0,time:null,category_type:1});const b=x([]),S=x([]),P=async()=>{const e={order_id:p.value};try{const t=await function(e){return I("order.order/detail",e)}(e);b.value=t.data.detail.product||[],k.value=t.data.detail}catch(t){}},V=()=>{v.value=!0},D=()=>{m.value=!0},j=()=>{var e;null==(e=C.value)||e.getOrderData(k.value)},B=()=>{w.value=!0},E=async()=>{const e={order_id:p.value};m.value=!1;try{const t=await G(e);setTimeout((()=>{N({title:t.msg,icon:"none"}),1==t.code&&q()}),200)}catch(t){}},F=async()=>{const e={order_id:p.value};v.value=!1;try{const t=await Y(e);setTimeout((()=>{N({title:t.msg,icon:"none"}),1==t.code&&q()}),200)}catch(t){}},W=async()=>{const e={order_id:p.value};w.value=!1;try{const t=await ee(e);setTimeout((()=>{N({title:t.msg,icon:"none"}),t.code}),200)}catch(t){}},q=()=>{n("update:show",!1),m.value=!1,v.value=!1},H=()=>{};return t({showDetailWithData:e=>{p.value=e,n("update:show",!0),P()}}),(t,n)=>{const p=y,x=a(l("uni-th"),$),I=a(l("uni-tr"),R),P=a(l("uni-td"),O),N=a(l("uni-table"),L),Z=a(l("ti-button"),A),J=a(l("ti-modal"),T),K=a(l("u-popup"),M);return i(),r(p,{class:""},{default:o((()=>[u(K,{ref:"dialogRef",round:16,show:e.show,mode:"right",onOpen:H,onClose:q,closeOnClickOverlay:!1},{default:o((()=>[u(p,{class:"ti-order-detail-container"},{default:o((()=>[u(p,{class:"ti-order-detail-title"},{default:o((()=>[s(d(z(U)("訂單詳情")),1)])),_:1}),u(p,{class:"ti-order-detail-header"},{default:o((()=>[u(p,{class:"ti-order-detail-header-tag"}),u(p,{class:"ti-order-detail-header-title"},{default:o((()=>[s(d(z(U)("基本信息")),1)])),_:1})])),_:1}),u(p,{class:"ti-order-detail-other"},{default:o((()=>[(i(!0),h(g,null,f(S.value,(e=>(i(),r(p,{class:"ti-order-detail-other-item"},{default:o((()=>[u(p,{class:"ti-order-detail-other-item-title"},{default:o((()=>[s(d(e.pay_type_name),1)])),_:2},1024),u(p,{class:"ti-order-detail-other-item-content"},{default:o((()=>[s(d(`¥ ${e.price}`),1)])),_:2},1024)])),_:2},1024)))),256))])),_:1}),u(p,{class:"ti-order-detail-header"},{default:o((()=>[u(p,{class:"ti-order-detail-header-tag"}),u(p,{class:"ti-order-detail-header-title"},{default:o((()=>[s(d(z(U)("商品信息")),1)])),_:1})])),_:1}),u(N,{ref:"table",loading:t.loading,border:"",stripe:"",emptyText:z(U)("暂无更多数据"),onSelectionChange:t.selectionChange},{default:o((()=>[u(I,null,{default:o((()=>[u(x,{align:"left"},{default:o((()=>[s(d(z(U)("商品")),1)])),_:1}),u(x,{align:"right"},{default:o((()=>[s(d(z(U)("價格")),1)])),_:1}),u(x,{align:"right"},{default:o((()=>[s(d(z(U)("購買數量")),1)])),_:1}),u(x,{align:"right"},{default:o((()=>[s(d(z(U)("商品總價")),1)])),_:1})])),_:1}),(i(!0),h(g,null,f(b.value,((e,t)=>(i(),r(I,{key:t},{default:o((()=>[u(P,null,{default:o((()=>[s(d(e.product_name_text),1)])),_:2},1024),u(P,{align:"right"},{default:o((()=>[u(p,{class:"name"},{default:o((()=>[s(d(`¥ ${e.product_price}`),1)])),_:2},1024)])),_:2},1024),u(P,{align:"right"},{default:o((()=>[s(d(e.total_num),1)])),_:2},1024),u(P,{align:"right"},{default:o((()=>[s(d(`¥ ${e.total_price}`),1)])),_:2},1024)])),_:2},1024)))),128))])),_:1},8,["loading","emptyText","onSelectionChange"]),u(p,{style:{flex:"1"}}),u(p,{class:"ti-data-bottom"},{default:o((()=>{var e,t,a;return[u(Z,{onClick:q},{default:o((()=>[s(d(z(U)("退出")),1)])),_:1}),30==(null==(e=k.value.order_status)?void 0:e.value)?(i(),r(Z,{key:0,onClick:j,type:"primary"},{default:o((()=>[s(d(z(U)("退款")),1)])),_:1})):c("",!0),20==(null==(t=k.value.order_status)?void 0:t.value)?(i(),r(Z,{key:1,onClick:V,type:"danger"},{default:o((()=>[s(d(z(U)("删除")),1)])),_:1})):c("",!0),10==(null==(a=k.value.order_status)?void 0:a.value)?(i(),r(Z,{key:2,onClick:D,type:"danger"},{default:o((()=>[s(d(z(U)("取消")),1)])),_:1})):c("",!0),u(Z,{type:"primary",onClick:B},{default:o((()=>[s(d(z(U)("打印")),1)])),_:1})]})),_:1}),u(te,{ref_key:"refuse",ref:C,show:_.value,"onUpdate:show":n[0]||(n[0]=e=>_.value=e)},null,8,["show"]),u(J,{class:"ti-action-tips",show:m.value,"onUpdate:show":n[1]||(n[1]=e=>m.value=e),title:z(U)("溫馨提示"),content:z(U)("是否取消此訂單？"),onConfirm:E},null,8,["show","title","content"]),u(J,{class:"ti-action-tips",show:v.value,"onUpdate:show":n[2]||(n[2]=e=>v.value=e),title:z(U)("溫馨提示"),content:z(U)("是否删除此訂單？"),onConfirm:F},null,8,["show","title","content"]),u(J,{class:"ti-action-tips",show:w.value,"onUpdate:show":n[3]||(n[3]=e=>w.value=e),title:z(U)("溫馨提示"),content:z(U)("確定要打印小票嗎？"),onConfirm:W},null,8,["show","title","content"])])),_:1})])),_:1},8,["show"])])),_:1})}}},[["__scopeId","data-v-29fe5c92"]]),ne=t({__name:"index",setup(e){const t=x(0),n=x(),p=x(),_=x(!1),m=x(!1),v=x(!1),w=x(!1),k=x(!1),C=x(""),b=x("");var S={};const P=x({eat_type:10,time_type:1,time:null,dataType:0,search:null,order_type:0,page:1,list_rows:6,search:null}),V=x([{name_text:U("全部"),number:0,category_id:0},{name_text:U("待付款"),number:2,category_id:1},{name_text:U("已取消"),number:10,category_id:3},{name_text:U("已完成"),number:99,category_id:2}]),D=x([{name:U("今天"),value:"1"},{name:U("昨天"),value:"2"},{name:U("一週"),value:"3"},{name:U("全部"),value:"0"}]),$=x([{value:20,text:U("桌台订单")},{value:10,text:U("收银订单")}]),M=x([]);var J=x("");const K=e=>{P.value.dataType=e},ne=e=>{P.value.time_type=e,ce()},le=e=>{P.value.eat_type=e||0},ie=e=>{C.value=e},re=e=>{b.value=e},oe=e=>{ce()},ue=async()=>{const e={order_id:S.order_id};try{const t=await Y(e);setTimeout((()=>{N({title:t.msg,icon:"none"})}),200),1==t.code&&(w.value=!1,ce())}catch(t){}},se=async()=>{const e={order_id:S.order_id};try{const t=await G(e);setTimeout((()=>{N({title:t.msg,icon:"none"})}),200),1==t.code&&(v.value=!1,ce())}catch(t){}},de=async()=>{const e={order_id:S.order_id};try{const t=await ee(e);setTimeout((()=>{N({title:t.msg,icon:"none"})}),200),1==t.code&&(k.value=!1)}catch(t){}},ce=async()=>{var e={...P.value},a=[0,0];C.value&&(a[0]=C.value),b.value&&(a[1]=b.value),0===a[0]&&0===a[1]||(e.time=a);try{const a=await function(e){return I("order.order/index",e)}(e);M.value=a.data.list.data,t.value=a.data.list.total}catch(n){}};return ce(),j((()=>{B()})),(e,x)=>{const C=y,b=q,I=a(l("uni-data-select"),Z),N=a(l("ti-button"),A),j=a(l("uni-td"),O),B=a(l("uni-tr"),R),G=a(l("uni-table"),L),Y=a(l("uni-pagination"),Q),ee=a(l("ti-modal"),T),pe=H("ti-layout");return i(),r(pe,null,{default:o((()=>[u(C,{class:"ti-order-container"},{default:o((()=>[u(X,{list:V.value,"onUpdate:list":x[0]||(x[0]=e=>V.value=e),onMenuClick:K},null,8,["list"]),u(C,{class:"ti-order-container-option"},{default:o((()=>[u(E,{list:D.value,"onUpdate:list":x[1]||(x[1]=e=>D.value=e),onOutput:ne},null,8,["list"]),u(C,{class:"date-picker"},{default:o((()=>[u(F,{onStartDateChange:ie,onEndDateChange:re})])),_:1}),u(C,{class:"date-order-input-item"},{default:o((()=>[u(b,{class:"date-order-input",modelValue:P.value.search,"onUpdate:modelValue":x[2]||(x[2]=e=>P.value.search=e),placeholder:z(U)("請輸入訂單號")},null,8,["modelValue","placeholder"])])),_:1}),u(C,{class:"date-select-type"},{default:o((()=>[u(I,{modelValue:z(J),"onUpdate:modelValue":x[3]||(x[3]=e=>W(J)?J.value=e:J=e),localdata:$.value,placeholder:z(U)("所有類型"),onChange:le,clear:!0},null,8,["modelValue","localdata","placeholder"])])),_:1}),u(C,{class:"date-search-confirm"},{default:o((()=>[u(N,{class:"date-search-confirm-button",type:"primary",onClick:ce},{default:o((()=>[s(d(z(U)("查询")),1)])),_:1})])),_:1})])),_:1}),u(G,{ref:"table",loading:e.loading,border:"",stripe:"",emptyText:z(U)("暂无更多数据"),onSelectionChange:e.selectionChange},{default:o((()=>[u(B,null,{default:o((()=>[u(j,{width:"130",align:"left"},{default:o((()=>[s(d(z(U)("訂單類型")),1)])),_:1}),u(j,{width:"120",align:"left"},{default:o((()=>[s(d(z(U)("桌號/序號")),1)])),_:1}),u(j,{width:"160",align:"left"},{default:o((()=>[s(d(z(U)("訂單號")),1)])),_:1}),u(j,{width:"100",align:"left"},{default:o((()=>[s(d(z(U)("狀態")),1)])),_:1}),u(j,{width:"100",align:"left"},{default:o((()=>[s(d(z(U)("支付時間")),1)])),_:1}),u(j,{width:"140",align:"left"},{default:o((()=>[s(d(z(U)("訂單金額")),1)])),_:1}),u(j,{width:"140",align:"left"},{default:o((()=>[s(d(z(U)("實付金額")),1)])),_:1}),u(j,{width:"150",align:"left"},{default:o((()=>[s(d(z(U)("支付方式")),1)])),_:1}),u(j,{width:"280",align:"left"},{default:o((()=>[s(d(""))])),_:1})])),_:1}),(i(!0),h(g,null,f(M.value,((e,t)=>(i(),r(B,{key:t},{default:o((()=>[u(j,{align:"left"},{default:o((()=>[u(C,{class:"order-table-cell"},{default:o((()=>[s(d(20==e.eat_type?z(U)("桌台订单"):z(U)("收银订单")),1)])),_:2},1024)])),_:2},1024),u(j,{align:"left"},{default:o((()=>[s(d(e.order_id||e.table_no),1)])),_:2},1024),u(j,{align:"left"},{default:o((()=>[s(d(e.order_no),1)])),_:2},1024),u(j,{align:"left"},{default:o((()=>[s(d(e.order_status.text),1)])),_:2},1024),u(j,{align:"left"},{default:o((()=>[s(d(e.pay_time_text),1)])),_:2},1024),u(j,{align:"left"},{default:o((()=>[s(d(`¥ ${e.order_price}`),1)])),_:2},1024),u(j,{align:"left"},{default:o((()=>[s(d(`¥ ${e.pay_price}`),1)])),_:2},1024),u(j,{align:"left"},{default:o((()=>[s(d(e.pay_status.text),1)])),_:2},1024),u(j,{align:"left"},{default:o((()=>[u(C,{class:"edit-buttons"},{default:o((()=>{var t,a,l;return[u(N,{class:"function-buttons",onClick:t=>n.value.showDetailWithData(e.order_id),type:"primary"},{default:o((()=>[s(d(z(U)("詳情")),1)])),_:2},1032,["onClick"]),u(N,{class:"function-buttons margin",onClick:t=>{return a=e,k.value=!0,void(S=a);var a},type:"primary"},{default:o((()=>[s(d(z(U)("打印小票")),1)])),_:2},1032,["onClick"]),30==(null==(t=e.order_status)?void 0:t.value)?(i(),r(N,{key:0,class:"function-buttons margin",onClick:t=>(e=>{var t;null==(t=p.value)||t.getOrderData(e)})(e),type:"primary"},{default:o((()=>[s(d(z(U)("退款")),1)])),_:2},1032,["onClick"])):c("",!0),20==(null==(a=e.order_status)?void 0:a.value)?(i(),r(N,{key:1,class:"function-buttons margin",onClick:t=>{return a=e,w.value=!0,void(S=a);var a},type:"danger"},{default:o((()=>[s(d(z(U)("删除")),1)])),_:2},1032,["onClick"])):c("",!0),10==(null==(l=e.order_status)?void 0:l.value)?(i(),r(N,{key:2,class:"function-buttons margin",onClick:t=>{return a=e,v.value=!0,void(S=a);var a},type:"danger"},{default:o((()=>[s(d(z(U)("取消")),1)])),_:2},1032,["onClick"])):c("",!0)]})),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1},8,["loading","emptyText","onSelectionChange"]),u(C,{class:"page-control"},{default:o((()=>[u(Y,{"prev-text":z(U)("上一页"),"next-text":z(U)("下一页"),modelValue:P.value.page,"onUpdate:modelValue":x[4]||(x[4]=e=>P.value.page=e),title:"标题文字","page-size":"6",total:t.value,onChange:oe},null,8,["prev-text","next-text","modelValue","total"])])),_:1}),u(ae,{ref_key:"orderDetail",ref:n,show:_.value,"onUpdate:show":x[5]||(x[5]=e=>_.value=e)},null,8,["show"]),u(te,{ref_key:"refuse",ref:p,show:m.value,"onUpdate:show":x[6]||(x[6]=e=>m.value=e)},null,8,["show"]),u(ee,{class:"ti-action-tips",show:v.value,"onUpdate:show":x[7]||(x[7]=e=>v.value=e),title:z(U)("溫馨提示"),content:z(U)("是否取消此訂單？"),onConfirm:se},null,8,["show","title","content"]),u(ee,{class:"ti-action-tips",show:w.value,"onUpdate:show":x[8]||(x[8]=e=>w.value=e),title:z(U)("溫馨提示"),content:z(U)("是否删除此訂單？"),onConfirm:ue},null,8,["show","title","content"]),u(ee,{class:"ti-action-tips",show:k.value,"onUpdate:show":x[9]||(x[9]=e=>k.value=e),title:z(U)("溫馨提示"),content:z(U)("確定要打印小票嗎？"),onConfirm:de},null,8,["show","title","content"])])),_:1})])),_:1})}}},[["__scopeId","data-v-9cd979d0"]]);export{ne as default};
