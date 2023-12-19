import{g as a,f as s,l as t,m as l,e,v as i}from"./element-plus-7d357588.js";import{G as p}from"./group-380776a5.js";import{_ as d}from"./index-f792122d.js";import{ap as r,$ as o,o as n,c,a as u,P as m,S as _,W as v,X as f,T as y,Y as b}from"./@vue-48c55b54.js";import"./@vueuse-c556fb5a.js";import"./lodash-es-c1acaa3d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-e0f4a3e8.js";import"./dayjs-9faf8871.js";import"./call-bind-0c463fe3.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-b8ff3004.js";import"./pinia-73166104.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-942d6868.js";import"./side-channel-ba7aab8a.js";import"./object-inspect-860361a9.js";import"./vue-ueditor-wrap-cd29f9a1.js";const g={components:{},data:()=>({active:0,loading:!0,detail:{order_no:"",pay_status:[],pay_type:[],user:{},product:[],order_status:[],supplier:{name:""},code_no:"",state_text:""}}),created(){this.getParams()},methods:{next(){this.active++>4&&(this.active=0)},getParams(){let a=this;const s=this.$route.query.order_id;p.orderDetail({order_id:s},!0).then((s=>{a.loading=!1,a.detail=s.data.detail})).catch((s=>{a.loading=!1}))},cancelFunc(){this.$router.back(-1)}}},j={class:"pb50"},h={class:"product-content"},w=u("div",{class:"common-form"},"基本信息",-1),x={class:"table-wrap"},k={class:"pb16"},q=u("span",{class:"gray9"},"订单号：",-1),z={class:"pb16"},P=u("span",{class:"gray9"},"买家：",-1),$={class:"pb16"},C=u("span",{class:"gray9"},"订单金额 (元)：",-1),D={class:"pb16"},F=u("span",{class:"gray9"},"实付款金额 (元)：",-1),G={class:"pb16"},I=u("span",{class:"gray9"},"支付方式：",-1),N={class:"pb16"},S=u("span",{class:"gray9"},"交易状态：",-1),T={key:0},W=u("div",{class:"common-form mt16"},"门店信息",-1),X={class:"table-wrap"},Y={class:"pb16"},A=u("span",{class:"gray9"},"使用门店名称：",-1),B={class:"pb16"},E=u("span",{class:"gray9"},"门店联系人：",-1),H={class:"pb16"},J=u("span",{class:"gray9"},"门店电话：",-1),K=u("div",{class:"common-form mt16"},"团购信息",-1),L={class:"table-wrap"},M={class:"product-info"},O={class:"pic"},Q={class:"info"},R={class:"name"},U={key:1,class:"table-wrap"},V=u("div",{class:"common-form mt16"},"付款信息",-1),Z={class:"table-wrap"},aa={class:"pb16"},sa=u("span",{class:"gray9"},"应付款金额：",-1),ta={class:"pb16"},la=u("span",{class:"gray9"},"支付方式：",-1),ea={class:"pb16"},ia=u("span",{class:"gray9"},"支付流水号：",-1),pa={class:"pb16"},da=u("span",{class:"gray9"},"付款状态：",-1),ra={class:"pb16"},oa=u("span",{class:"gray9"},"付款时间：",-1),na={key:2},ca=u("div",{class:"common-form mt16"},"券码信息",-1),ua={class:"table-wrap"},ma={class:"pb16"},_a=u("span",{class:"gray9"},"核销券码：",-1),va={class:"pb16"},fa=u("span",{class:"gray9"},"有效期：",-1),ya={class:"pb16"},ba=u("span",{class:"gray9"},"状态：",-1),ga={class:"common-button-wrapper"};const ja=d(g,[["render",function(p,d,g,ja,ha,wa){const xa=a,ka=s,qa=t,za=l,Pa=e,$a=r("img-url"),Ca=i;return o((n(),c("div",j,[u("div",h,[w,u("div",x,[m(ka,null,{default:_((()=>[m(xa,{span:5},{default:_((()=>[u("div",k,[q,v(" "+f(ha.detail.order_no),1)])])),_:1}),ha.detail.user?(n(),y(xa,{key:0,span:5},{default:_((()=>[u("div",z,[P,v(" "+f(ha.detail.user.nickName)+" ",1),u("span",null,"用户ID：("+f(ha.detail.user.user_id)+")",1)])])),_:1})):b("",!0),m(xa,{span:5},{default:_((()=>[u("div",$,[C,v(" "+f(ha.detail.total_price),1)])])),_:1}),m(xa,{span:5},{default:_((()=>[u("div",D,[F,v(" "+f(ha.detail.pay_price),1)])])),_:1}),m(xa,{span:5},{default:_((()=>[u("div",G,[I,v(" "+f(ha.detail.pay_type.text),1)])])),_:1}),m(xa,{span:5},{default:_((()=>[u("div",N,[S,v(" "+f(ha.detail.order_status.text),1)])])),_:1})])),_:1})]),ha.detail.supplier?(n(),c("div",T,[W,u("div",X,[m(ka,null,{default:_((()=>[m(xa,{span:5},{default:_((()=>[u("div",Y,[A,v(" "+f(ha.detail.supplier.name),1)])])),_:1})])),_:1}),m(ka,null,{default:_((()=>[m(xa,{span:5},{default:_((()=>[u("div",B,[E,v(" "+f(ha.detail.supplier.link_name),1)])])),_:1})])),_:1}),m(ka,null,{default:_((()=>[m(xa,{span:5},{default:_((()=>[u("div",H,[J,v(" "+f(ha.detail.supplier.link_phone),1)])])),_:1})])),_:1})])])):b("",!0),K,u("div",L,[m(za,{size:"small",data:ha.detail.product,border:"",style:{width:"100%"}},{default:_((()=>[m(qa,{prop:"product_name",label:"名称",width:"400"},{default:_((a=>[u("div",M,[u("div",O,[o(u("img",null,null,512),[[$a,a.row.image.file_path]])]),u("div",Q,[u("div",R,f(a.row.group_name),1)])])])),_:1}),m(qa,{prop:"total_num",label:"购买数量"},{default:_((a=>[u("p",null,"x "+f(a.row.total_num),1)])),_:1}),m(qa,{prop:"total_price",label:"商品总价(元)"},{default:_((a=>[u("p",null,"￥ "+f(a.row.total_price),1)])),_:1})])),_:1},8,["data"])]),20==ha.detail.pay_status.value?(n(),c("div",U,[V,u("div",Z,[m(ka,null,{default:_((()=>[m(xa,{span:5},{default:_((()=>[u("div",aa,[sa,v(" "+f(ha.detail.pay_price),1)])])),_:1}),m(xa,{span:5},{default:_((()=>[u("div",ta,[la,v(" "+f(ha.detail.pay_type.text),1)])])),_:1}),m(xa,{span:5},{default:_((()=>[u("div",ea,[ia,v(" "+f(ha.detail.transaction_id),1)])])),_:1}),m(xa,{span:5},{default:_((()=>[u("div",pa,[da,v(" "+f(ha.detail.pay_status.text),1)])])),_:1}),m(xa,{span:5},{default:_((()=>[u("div",ra,[oa,v(" "+f(ha.detail.pay_time),1)])])),_:1})])),_:1})])])):b("",!0),ha.detail.code_no?(n(),c("div",na,[ca,u("div",ua,[m(ka,null,{default:_((()=>[m(xa,{span:5},{default:_((()=>[u("div",ma,[_a,v(" "+f(ha.detail.code_no),1)])])),_:1}),m(xa,{span:5},{default:_((()=>[u("div",va,[fa,v(" "+f(ha.detail.end_time),1)])])),_:1}),m(xa,{span:5},{default:_((()=>[u("div",ya,[ba,v(" "+f(ha.detail.state_text),1)])])),_:1})])),_:1})])])):b("",!0)]),u("div",ga,[m(Pa,{size:"small",type:"info",onClick:wa.cancelFunc},{default:_((()=>[v("返回上一页")])),_:1},8,["onClick"])])])),[[Ca,ha.loading]])}]]);export{ja as default};
