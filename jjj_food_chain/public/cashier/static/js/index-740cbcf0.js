import{e as t,f as e,g as a,h as s,d as l,i,j as o,b as r,k as c,c as n,l as d,m as p,n as u,o as m,p as h,a as g,q as _,r as y,s as f,v as C,t as b}from"./element-plus-cd5f0841.js";import{U as j}from"./user-15cc0f5a.js";import{H as v}from"./home-0a1a7490.js";import w from"./serch-a47694a7.js";import P from"./money-4c2de8e2.js";import S from"./change-96a44279.js";import k from"./spec-c6fe22c2.js";import x from"./cash-6c7be024.js";import I from"./staylist-300ef360.js";import{_ as D,u as V}from"./index-42a7c458.js";import{ag as M,c as L,P as T,S as z,o as B,a as N,M as U,Q as F,a9 as q,W as A,$ as E,X as H,T as Q,Y as R,at as W,au as X}from"./@vue-ec4837bd.js";import"./lodash-es-42625722.js";import"./async-validator-cf877c1f.js";import"./@vueuse-351f2583.js";import"./dayjs-3a594381.js";import"./call-bind-8544b80b.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-399cea60.js";import"./@popperjs-b78c3215.js";import"./escape-html-1590d737.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./request-0a0c61ce.js";import"./axios-63583d02.js";import"./qs-c6aa5595.js";import"./side-channel-b02c3a2b.js";import"./object-inspect-bd98d4ca.js";import"./keyboard-e373de57.js";import"./vue-router-bec44c5f.js";import"./pinia-57a80881.js";import"./sass-9c753014.js";import"./immutable-f1afe65f.js";const{memberInfo:Y,userInfo:$}=V(),G={components:{Search:w,Money:P,Spec:k,Cash:x,Change:S,Staylist:I},data:()=>({promodel:null,isStaylist:!1,isChange:!1,is_money:!1,is_search:!1,is_spec:!1,is_cash:!1,detail:null,loading:!0,cartloading:!0,category_id:0,cart_id:0,curPage:1,pageSize:20,listData:[],last_page:1,no_more:!0,username:$&&$.userName,product_name:"",tableData:[],model:{delivery:40},pay_model:{},categoryList:[],cartInfo:{cart_total_num:0,discount_money:"",line_money:0,total_bag_price:0,total_pay_price:0,total_price:0},productList:[],stayNum:0}),computed:{},created(){this.getCategory(),this.getCart()},methods:{noMore(){return this.last_page>=this.curPage},disableds(){return this.loading||this.noMore()},getTableList(){let t=this;j.getVersion({},!0).then((e=>{t.version=e.data.version})).catch((t=>{}))},getCart(){let t=this,e={delivery:t.model.delivery};t.cartloading=!0,v.cartList(e,!0).then((e=>{t.cartloading=!1,t.tableData=e.data.productList,t.cartInfo=e.data.cartInfo,t.stayNum=e.data.stayNum})).catch((e=>{t.cartloading=!1}))},cartAdd(t,e){let a=this;e.product_id;let s=t>=1?t:1;v.subProduct({product_num:s,cart_id:e.cart_id,type:"mid"},!0).then((t=>{a.getCart()})).catch((t=>{}))},handleCurrentChange(t){t&&(this.cart_id=t.cart_id,this.promodel=t)},changeMoney(){this.tableData.length<=0||(this.is_money=!0)},changeProduct(){this.promodel?this.isChange=!0:t({message:"请选择商品",type:"warning"})},deleteProduct(){let a=this;if(!a.cart_id)return;let s={cart_id:a.cart_id},l=this.promodel.describe?"("+this.promodel.describe+")":"",i="确定要删除"+this.promodel.product.product_name+l+"吗?";e.confirm(i,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{a.cartloading=!0,v.delProduct(s,!0).then((e=>{a.cart_id=0,a.getCart(),t({message:e.msg,type:"success"})}))}))},stayCart(){let e=this;v.stay({},!0).then((a=>{e.getCart(),t({message:a.msg,type:"success"})}))},openStaylist(){this.isStaylist=!0},clearCart(){let a=this;if(a.tableData.length<=0)return;let s={};e.confirm("确定要整单取消吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{a.cartloading=!0,v.delStay(s,!0).then((e=>{a.getCart(),t({message:e.msg,type:"success"})}))}))},getCategory(){let t=this;v.getCategory({},!0).then((e=>{t.categoryList=e.data.list,t.getProduct()})).catch((t=>{}))},categoryFunc(t){this.loading||this.category_id==t||(this.loading=!0,this.category_id=t,this.curPage=1,this.listData=[],this.getProduct())},searchPro(){this.loading||(this.loading=!0,this.curPage=1,this.listData=[],this.getProduct())},getProduct(t){let e=this;e.loading=!0;let a={category_id:e.category_id,page:e.curPage,list_rows:e.pageSize,search:e.product_name};v.getProduct(a,!0).then((t=>{e.loading=!1,e.listData=e.listData.concat(t.data.list.data),e.last_page=t.data.list.last_page,t.data.list.last_page<=1&&(e.no_more=!0)})).catch((t=>{e.loading=!1}))},addProduct(t){this.detail=t,this.is_spec=!0},addCart(t){let e=this,a=t;a.delivery=e.model.delivery,v.addCart(a,!0).then((t=>{e.getCart()})).catch((t=>{}))},closeSpec(t){t&&null!=t&&"undefined"!=t&&this.addCart(t),this.detail=null,this.is_spec=!1},closeStaylist(e){let a=this;if(e&&null!=e&&"undefined"!=e){if("delete"==e)return void a.getCart();if(a.tableData.length>0)return void t.error("请先将购物车内的商品挂单或结账后再取单");v.pick({cart_no:e},!0).then((t=>{a.getCart()}))}this.isStaylist=!1},closeCash(e){let a=this;if(e&&null!=e){let s={pay_type:e,delivery:a.model.delivery,user_id:0};Y&&(s.user_id=Y.user_id),v.orderBuy(s,!0).then((e=>{a.getCart(),t({message:e.msg,type:"success"})})).catch((e=>{t.error(e.msg)}))}this.pay_model=null,this.is_cash=!1},scrolltolowerFunc(){let t=this;t.loading||t.curPage>=t.last_page||(t.loading=!0,t.curPage++,t.getProduct())},closeSearch(t){this.is_search=!1},closeMoney(e){let a=this;if(e){let s=e;v.changeMoney(s,!0).then((e=>{a.cart_id=0,a.getCart(),t({message:e.msg,type:"success"})}))}this.is_money=!1},closeChange(e){let a=this;if(e){let s={cart_id:a.promodel.cart_id,price:e};v.changePrice(s,!0).then((e=>{a.cart_id=0,a.getCart(),t({message:e.msg,type:"success"})}))}this.isChange=!1}}},J={class:"home-container"},K={class:"category-list"},O=["onClick"],Z={class:"d-e-c ww100 hh100"},tt={class:"mb16"},et={class:"scroll-list"},at=["infinite-scroll-disabled"],st=["onClick"],lt=["src"],it={class:"product-name text-ellipsis-2"},ot={class:"d-b-c"},rt={class:"product-price"},ct={class:""},nt={class:"gray9 f12"},dt={class:"red"},pt={class:"d-e-c ww100"},ut={key:0,class:"mr20"},mt={class:"price-color"},ht=(t=>(W("data-v-ee9fcf9a"),t=t(),X(),t))((()=>N("span",{class:"price-color f24 fb"},"￥",-1))),gt={class:"price-color f28 fb"},_t={class:"d-a-c ww100"},yt=["disabled"],ft=["disabled"];const Ct=D(G,[["render",function(t,e,j,v,w,P){const S=s,k=l,x=i,I=o,D=r,V=M("CirclePlus"),W=b,X=c,Y=n,$=d,G=p,Ct=u,bt=m,jt=h,vt=g,wt=_,Pt=y,St=a,kt=M("Search"),xt=M("Money"),It=M("Change"),Dt=M("Spec"),Vt=M("Cash"),Mt=M("Staylist"),Lt=f,Tt=C;return B(),L("div",J,[T(St,{class:"ww100"},{default:z((()=>[T(S,{width:"128px"},{default:z((()=>[N("ul",K,[N("li",{class:U(["item",0==w.category_id?"active":""]),onClick:e[0]||(e[0]=t=>P.categoryFunc(0))},"全部",2),(B(!0),L(F,null,q(w.categoryList,((t,e)=>(B(),L("li",{class:U(["item",w.category_id==t.category_id?"active":""]),key:e,onClick:e=>P.categoryFunc(t.category_id)},H(t.name),11,O)))),128))])])),_:1}),T(St,{class:"hh100"},{default:z((()=>[T(I,{class:"border-b"},{default:z((()=>[N("div",Z,[T(k,{style:{"margin-right":"20px","margin-left":"0"},type:"danger",round:"",onClick:e[1]||(e[1]=t=>w.is_search=!0)},{default:z((()=>[A("查询会员")])),_:1}),T(k,{style:{"margin-right":"20px","margin-left":"0"},type:"info",onClick:e[2]||(e[2]=t=>P.changeProduct()),round:""},{default:z((()=>[A("商品改价")])),_:1}),T(k,{style:{"margin-right":"20px","margin-left":"0"},type:"info",onClick:e[3]||(e[3]=t=>P.deleteProduct()),round:""},{default:z((()=>[A("商品删行")])),_:1}),T(k,{style:{"margin-right":"20px","margin-left":"0"},type:"info",onClick:e[4]||(e[4]=t=>P.clearCart()),round:""},{default:z((()=>[A("整单取消")])),_:1}),T(x,{style:{"margin-right":"20px","margin-left":"0"},value:w.stayNum,class:"item",hidden:w.stayNum<=0},{default:z((()=>[T(k,{type:"info",onClick:e[5]||(e[5]=t=>P.openStaylist()),round:""},{default:z((()=>[A("取单")])),_:1})])),_:1},8,["value","hidden"]),T(k,{style:{"margin-right":"20px","margin-left":"0"},type:"info",onClick:e[6]||(e[6]=t=>P.stayCart()),round:""},{default:z((()=>[A("挂单")])),_:1}),T(k,{style:{"margin-right":"20px","margin-left":"0"},type:"info",onClick:e[7]||(e[7]=t=>P.changeMoney()),round:""},{default:z((()=>[A("折扣/抹零")])),_:1})])])),_:1}),T(Pt,{class:"o-h"},{default:z((()=>[T(wt,{gutter:40},{default:z((()=>[T(X,{span:12},{default:z((()=>[N("div",tt,[T(D,{placeholder:"请输入内容",modelValue:w.product_name,"onUpdate:modelValue":e[8]||(e[8]=t=>w.product_name=t),class:"input-with-select"},{append:z((()=>[T(k,{class:"search-btn",icon:"Search",onClick:P.searchPro},null,8,["onClick"])])),_:1},8,["modelValue"])]),N("div",et,[E((B(),L("div",{class:"product-list ww100","infinite-scroll-disabled":P.disableds()},[(B(!0),L(F,null,q(w.listData,((t,e)=>(B(),L("div",{class:"product-item",key:t.product_id,onClick:e=>P.addProduct(t)},[N("img",{src:t.image[0].file_path,alt:""},null,8,lt),N("div",it,H(t.product_name),1),N("div",ot,[N("span",rt,"￥"+H(t.product_price),1),T(W,{class:"icon-add"},{default:z((()=>[T(V)])),_:1})])],8,st)))),128))],8,at)),[[Lt,P.scrolltolowerFunc]])])])),_:1}),T(X,{span:12,class:"pl250 b-s-b"},{default:z((()=>[T(vt,{size:"small",ref:"form",model:w.model,"label-width":"",style:{"text-align":"left"}},{default:z((()=>[T(Y,{label:""},{default:z((()=>[A("收银员： "+H(w.username),1)])),_:1}),T(Y,{label:""},{default:z((()=>[A(" 消费方式： "),T(G,{modelValue:w.model.delivery,"onUpdate:modelValue":e[9]||(e[9]=t=>w.model.delivery=t),onChange:e[10]||(e[10]=t=>P.getCart())},{default:z((()=>[T($,{label:40},{default:z((()=>[A("店内就餐")])),_:1}),T($,{label:30},{default:z((()=>[A("打包带走")])),_:1})])),_:1},8,["modelValue"])])),_:1}),T(Y,{label:""},{default:z((()=>[E((B(),Q(jt,{class:"order-table","highlight-current-row":"",onCurrentChange:P.handleCurrentChange,data:w.tableData,"show-header":!1},{default:z((()=>[T(Ct,{type:"index",align:"center"}),T(Ct,{prop:"product_name",label:"商品名称"},{default:z((t=>[N("div",ct,H(t.row.product.product_name),1),N("div",nt,H(t.row.describe),1)])),_:1}),T(Ct,{prop:"price",label:"商品价格"},{default:z((t=>[N("span",dt,"￥"+H(t.row.price),1)])),_:1}),T(Ct,{prop:"total_num",label:"商品数量"},{default:z((t=>[T(bt,{onChange:e=>P.cartAdd(e,t.row),size:"mini",modelValue:t.row.product_num,"onUpdate:modelValue":e=>t.row.product_num=e,min:1,label:""},null,8,["onChange","modelValue","onUpdate:modelValue"])])),_:1})])),_:1},8,["onCurrentChange","data"])),[[Tt,w.cartloading]])])),_:1}),T(Y,{label:"",class:"tr"},{default:z((()=>[N("div",null,"应收：￥"+H(w.cartInfo.total_price)+"元",1),N("div",pt,[30==w.model.delivery?(B(),L("div",ut,"包装费：￥"+H(w.cartInfo.total_bag_price)+"元",1)):R("",!0),N("div",mt,"优惠：￥"+H(w.cartInfo.discount_money)+"元",1)]),N("div",null,[A(" 数量"+H(w.cartInfo.cart_total_num)+"件,实收： ",1),ht,N("span",gt,H(w.cartInfo.total_pay_price),1),A(" 元 ")])])),_:1}),T(Y,{label:"",class:""},{default:z((()=>[N("div",_t,[N("button",{class:"close-btn",type:"button",onClick:e[11]||(e[11]=t=>P.clearCart()),disabled:w.tableData.length<=0},"整单取消",8,yt),N("button",{class:"pay-btn",type:"button",onClick:e[12]||(e[12]=t=>w.is_cash=!0),disabled:w.tableData.length<=0},"收款￥"+H(w.cartInfo.total_pay_price),9,ft)])])),_:1})])),_:1},8,["model"])])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),T(kt,{is_search:w.is_search,onClose:P.closeSearch},null,8,["is_search","onClose"]),T(xt,{is_money:w.is_money,cartInfo:w.cartInfo,onClose:P.closeMoney},null,8,["is_money","cartInfo","onClose"]),T(It,{isChange:w.isChange,promodel:w.promodel,onClose:P.closeChange},null,8,["isChange","promodel","onClose"]),T(Dt,{is_pop:w.is_spec,detail:w.detail,onClose:P.closeSpec},null,8,["is_pop","detail","onClose"]),T(Vt,{is_pop:w.is_cash,price:w.cartInfo.total_pay_price,onClose:P.closeCash},null,8,["is_pop","price","onClose"]),T(Mt,{isStaylist:w.isStaylist,onClose:P.closeStaylist},null,8,["isStaylist","onClose"])])}],["__scopeId","data-v-ee9fcf9a"]]);export{Ct as default};
