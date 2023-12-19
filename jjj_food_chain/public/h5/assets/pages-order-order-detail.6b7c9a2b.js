import{_ as e,l as t,p as a,G as l,a as s,E as d,o as r,c as i,w as u,n as _,g as o,b as c,d as n,t as f,e as p,f as m,r as y,F as h,j as g,x as b,i as P}from"./index-1a637619.js";import{c as x}from"./cashier.070e7102.js";import{r as k}from"./uni-app.es.041617b8.js";import{p as v}from"./pay.6f221c8b.js";const F=e({components:{cashier:x},data:()=>({checkedPay:[10,20],pay_type:20,loadding:!0,indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,isPayPopup:!1,order_id:0,detail:{order_status:[],address:{region:[]},product:[],pay_type:[],delivery_type:[],pay_status:[]},extractStore:{},is_fightgroup:!1,showAlipay:!1,qrimg:""}),onLoad(e){this.order_id=e.order_id},mounted(){t({title:"加载中"}),this.getData()},methods:{getData(){let e=this,t=e.order_id;e._get("user.order/detail",{order_id:t},(function(t){e.detail=t.data.order,e.extractStore=t.data.order.extractStore,e.loadding=!1,a()}))},hidePopupFunc(){this.isPayPopup=!1},cancelOrder(e){let d=this,r=e;l({title:"提示",content:"您确定要取消当前订单吗?",success:function(e){e.confirm&&(t({title:"正在处理"}),d._get("user.order/cancel",{order_id:r},(function(e){a(),s({title:"操作成功",duration:2e3,icon:"success"}),d.getData()})))}})},orderReceipt(e){let d=this;l({title:"提示",content:"您确定要收货吗?",success:function(l){l.confirm&&(t({title:"正在处理"}),d._post("user.order/receipt",{order_id:e},(function(e){a(),s({title:e.msg,duration:2e3,icon:"success"}),d.getData()})))}})},gotoExpress(e){d({url:"/pages/order/express/express?order_id="+e})},onApplyRefund(e){d({url:"/pages/order/refund/apply/apply?order_product_id="+e})},payTypeFunc(e){this.pay_type=e},subFunc(e){let l=this;if(!l.isPayPopup)return;l.isPayPopup=!1;let s=l.order_id;t({title:"加载中"}),l._post("user.order/pay",{payType:e,order_id:s,pay_source:l.getPlatform()},(function(e){a(),v(e,l)}))},onPayOrder(e){this.isPayPopup=!0,this.order_id=e}}},[["render",function(e,t,a,l,s,d){const v=o,F=g,j=P,D=k(b("cashier"),x);return r(),i(v,{"data-theme":e.theme(),class:_(e.theme()||"")},{default:u((()=>[s.loadding?p("",!0):(r(),i(v,{key:0,class:"order-box"},{default:u((()=>[c(v,{class:"f40 fb mb40"},{default:u((()=>[n(f(s.detail.state_text),1)])),_:1}),10==s.detail.pay_status.value&&20!=s.detail.order_status.value?(r(),i(v,{key:0,class:"d-s-c mt20 mb40"},{default:u((()=>[c(v,{class:"f26"},{default:u((()=>[n("交易将在："),c(F,{class:"orange"},{default:u((()=>[n(f(s.detail.pay_end_time),1)])),_:1}),n("后关闭，请及时付款")])),_:1})])),_:1})):p("",!0),1!=s.detail.order_type&&10==s.detail.delivery_type.value&&10==s.detail.order_status.value?(r(),i(v,{key:1,class:"top-state"},{default:u((()=>[c(v,{class:"d-b-c state-height border-b"},{default:u((()=>[c(v,{class:""},{default:u((()=>[n("配送员正在为你配送中")])),_:1})])),_:1}),c(v,{class:"d-b-c state-height"},{default:u((()=>[c(v,null,{default:u((()=>[n("预计取餐时间")])),_:1}),c(v,{class:"blue"},{default:u((()=>[n(f(s.detail.mealtime),1)])),_:1})])),_:1})])),_:1})):p("",!0),c(v,{class:"order-content"},{default:u((()=>[c(v,{class:"shop-name border-b"},{default:u((()=>[n(f(s.detail.supplier.name),1)])),_:1}),c(v,{class:"order-prolist"},{default:u((()=>[(r(!0),m(h,null,y(s.detail.product,((e,t)=>(r(),i(v,{class:"d-s-c proitem",key:t},{default:u((()=>[c(v,{class:"pro-image"},{default:u((()=>[c(j,{src:e.image.file_path,mode:"aspectFill"},null,8,["src"])])),_:2},1024),c(v,{class:"d-b-s pro-price flex-1"},{default:u((()=>[c(v,{class:""},{default:u((()=>[c(v,{class:"f28 text-ellipsis fb mb10"},{default:u((()=>[n(f(e.product_name),1)])),_:2},1024),c(v,{class:"f20 gray9 w-b-a"},{default:u((()=>[n(f(e.product_attr),1)])),_:2},1024),c(v,{class:"f22 gray9"},{default:u((()=>[n("￥"+f(e.total_num),1)])),_:2},1024)])),_:2},1024),c(v,{class:"pro-price-item"},{default:u((()=>[c(v,{class:"f24 gray3 mb10"},{default:u((()=>[n("￥"+f(e.product_price),1)])),_:2},1024),c(v,{class:"f22 gray9 text-d-line"},{default:u((()=>[n("￥"+f(e.line_price),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1}),c(v,null,{default:u((()=>[c(v,{class:"pro-cont-item"},{default:u((()=>[c(v,null,{default:u((()=>[n("商品小计")])),_:1}),c(v,null,{default:u((()=>[n("￥"+f(s.detail.total_price),1)])),_:1})])),_:1}),0!=s.detail.bag_price?(r(),i(v,{key:0,class:"pro-cont-item"},{default:u((()=>[c(v,null,{default:u((()=>[n("包装费")])),_:1}),c(v,null,{default:u((()=>[n("￥"+f(s.detail.bag_price),1)])),_:1})])),_:1})):p("",!0),0!=s.detail.service_money?(r(),i(v,{key:1,class:"pro-cont-item"},{default:u((()=>[c(v,null,{default:u((()=>[n("服务费")])),_:1}),c(v,null,{default:u((()=>[n("￥"+f(s.detail.service_money),1)])),_:1})])),_:1})):p("",!0),s.detail.express_price>0?(r(),i(v,{key:2,class:"pro-cont-item"},{default:u((()=>[c(v,null,{default:u((()=>[n("配送费")])),_:1}),c(v,null,{default:u((()=>[n("￥"+f(s.detail.express_price),1)])),_:1})])),_:1})):p("",!0),0!=s.detail.fullreduce_money?(r(),i(v,{key:3,class:"pro-cont-item"},{default:u((()=>[c(v,null,{default:u((()=>[n(f(s.detail.fullreduce_remark),1)])),_:1}),c(v,null,{default:u((()=>[n("-￥"+f(s.detail.fullreduce_money),1)])),_:1})])),_:1})):p("",!0),c(v,{class:"pro-cont-item pro-cont-total"},{default:u((()=>[n(" 共"+f(s.detail.product.length)+"件商品 已优惠 ￥"+f(s.detail.fullreduce_money+1*s.detail.coupon_money+1*s.detail.discount_money)+" 小计 ",1),c(F,null,{default:u((()=>[n("￥"+f(s.detail.pay_price),1)])),_:1})])),_:1})])),_:1})])),_:1}),c(v,{class:"other_box"},{default:u((()=>[c(v,{class:"meal_item-title"},{default:u((()=>[n("配送信息")])),_:1}),c(v,{class:"meal_item"},{default:u((()=>[c(v,null,{default:u((()=>[n("配送服务")])),_:1}),c(v,{class:"right"},{default:u((()=>[n(f(s.detail.order_type_text),1)])),_:1})])),_:1}),s.detail.mealtime?(r(),i(v,{key:0,class:"meal_item"},{default:u((()=>[c(v,null,{default:u((()=>[n("期望时间")])),_:1}),c(v,{class:"right"},{default:u((()=>[n(f(s.detail.mealtime),1)])),_:1})])),_:1})):p("",!0),1!=s.detail.order_type&&null!=s.detail.address?(r(),i(v,{key:1,class:"meal_item"},{default:u((()=>[c(v,null,{default:u((()=>[n("配送地址")])),_:1}),c(v,{class:"right"},{default:u((()=>[c(v,null,{default:u((()=>[n(f(s.detail.address.detail+s.detail.address.address),1)])),_:1}),c(v,null,{default:u((()=>[n(f(s.detail.address.name+" "+s.detail.address.phone),1)])),_:1})])),_:1})])),_:1})):p("",!0)])),_:1}),c(v,{class:"other_box"},{default:u((()=>[c(v,{class:"meal_item-title"},{default:u((()=>[n("订单信息")])),_:1}),c(v,{class:"meal_item"},{default:u((()=>[c(v,null,{default:u((()=>[n("订单号码")])),_:1}),c(v,{class:"right"},{default:u((()=>[n(f(s.detail.order_no),1)])),_:1})])),_:1}),s.detail.table_no?(r(),i(v,{key:0,class:"meal_item"},{default:u((()=>[c(v,null,{default:u((()=>[n("桌号")])),_:1}),c(v,{class:"right"},{default:u((()=>[n(f(s.detail.table_no),1)])),_:1})])),_:1})):p("",!0),c(v,{class:"meal_item"},{default:u((()=>[c(v,null,{default:u((()=>[n("下单时间")])),_:1}),c(v,{class:"right"},{default:u((()=>[n(f(s.detail.create_time),1)])),_:1})])),_:1}),c(v,{class:"meal_item"},{default:u((()=>[c(v,null,{default:u((()=>[n("支付金额")])),_:1}),c(v,{class:"right"},{default:u((()=>[n(f(s.detail.pay_price),1)])),_:1})])),_:1}),c(v,{class:"meal_item"},{default:u((()=>[c(v,null,{default:u((()=>[n("支付方式")])),_:1}),c(v,{class:"right"},{default:u((()=>[n(f(s.detail.pay_type.text),1)])),_:1})])),_:1}),c(v,{class:"meal_item"},{default:u((()=>[c(v,null,{default:u((()=>[n("备注")])),_:1}),c(v,{class:"right"},{default:u((()=>[c(v,null,{default:u((()=>[n(f(s.detail.buyer_remark),1)])),_:1})])),_:1})])),_:1})])),_:1}),10==s.detail.pay_status.value&&10==s.detail.order_status?(r(),i(v,{key:2,class:"d-c-c"},{default:u((()=>[c(v,{class:"f26 theme-btn pay_btn",onClick:t[0]||(t[0]=e=>d.onPayOrder(s.detail.order_id))},{default:u((()=>[n("立即支付")])),_:1})])),_:1})):p("",!0),c(D,{isPayPopup:s.isPayPopup,onClose:d.hidePopupFunc,onSubmit:d.subFunc},null,8,["isPayPopup","onClose","onSubmit"])])),_:1}))])),_:1},8,["data-theme","class"])}],["__scopeId","data-v-f79582af"]]);export{F as default};
