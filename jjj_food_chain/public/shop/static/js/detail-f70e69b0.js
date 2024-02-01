import{P as a,i as s,O as e,m as l,o as t,v as d}from"./element-plus-c8084613.js";import{O as i}from"./order-419444d5.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{an as p,_ as n,o as c,c as o,a as u,O as _,R as m,V as y,W as v,S as f,X as b,L as g,P as j}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-74b65baf.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const k={components:{},data:()=>({active:0,loading:!0,detail:{order_id:0,pay_status:[],pay_type:[],delivery_type:[],user:{},address:[],product:[],order_status:[],extract:[],delivery_status:[],supplier:{name:""}}}),created(){this.getParams()},methods:{next(){this.active++>4&&(this.active=0)},getParams(){let a=this;const s=this.$route.query.order_id;i.takeOrderdetail({order_id:s},!0).then((s=>{a.loading=!1,a.detail=s.data.detail})).catch((s=>{a.loading=!1}))},cancelFunc(){this.$router.back(-1)}}},w={class:"pb50"},h={class:"product-content"},x=u("div",{class:"common-form"},"基本信息",-1),z={class:"table-wrap"},P={class:"pb16"},C=u("span",{class:"gray9"},"订单号：",-1),O={class:"pb16"},q=u("span",{class:"gray9"},"买家：",-1),F={class:"pb16"},D=u("span",{class:"gray9"},"订单金额 (元)：",-1),$={class:"pb16"},E=u("span",{class:"gray9"},"配送费 (元)：",-1),I={class:"pb16"},L=u("span",{class:"gray9"},"包装费 (元)：",-1),N={key:0,class:"pb16"},R=u("span",{class:"gray9"},"优惠券抵扣 (元)：",-1),S={key:0,class:"pb16"},V=u("span",{class:"gray9"},"积分抵扣 (元)：",-1),W={key:0,class:"pb16"},X=u("span",{class:"gray9"},"满减金额 (元)：",-1),A={class:"pb16"},B=u("span",{class:"gray9"},"实付款金额 (元)：",-1),G={class:"pb16"},H=u("span",{class:"gray9"},"支付方式：",-1),J={class:"pb16"},K=u("span",{class:"gray9"},"配送方式：",-1),M={class:"pb16"},Q=u("span",{class:"gray9"},"配送状态：",-1),T={class:"pb16"},U={key:0,class:"gray9"},Y={key:1,class:"gray9"},Z={class:"pb16"},aa=u("span",{class:"gray9"},"交易状态：",-1),sa=u("div",{class:"common-form mt16"},"门店信息",-1),ea={class:"table-wrap"},la={class:"pb16"},ta=u("span",{class:"gray9"},"门店名称：",-1),da=u("div",{class:"common-form mt16"},"商品信息",-1),ia={class:"table-wrap"},ra={class:"product-info"},pa={class:"pic"},na={class:"info"},ca={class:"name"},oa={key:0,class:"gray9"},ua={key:1,class:"orange"},_a={class:"price"},ma={key:0,class:"ml10"},ya={key:0},va=u("div",{class:"common-form mt16"},"配送信息",-1),fa={class:"table-wrap"},ba={class:"pb16"},ga=u("span",{class:"gray9"},"联系人：",-1),ja={class:"pb16"},ka=u("span",{class:"gray9"},"联系电话：",-1),wa={class:"pb16"},ha=u("span",{class:"gray9"},"联系地址：",-1),xa={class:"pb16"},za=u("span",{class:"gray9"},"备注：",-1),Pa=u("div",{class:"common-form mt16"},"自提用户信息",-1),Ca={key:0,class:"table-wrap"},Oa={class:"pb16"},qa=u("span",{class:"gray9"},"联系电话：",-1),Fa={class:"pb16"},Da=u("span",{class:"gray9"},"备注：",-1),$a={key:2,class:"table-wrap"},Ea=u("div",{class:"common-form mt16"},"付款信息",-1),Ia={class:"table-wrap"},La={class:"pb16"},Na=u("span",{class:"gray9"},"应付款金额：",-1),Ra={class:"pb16"},Sa=u("span",{class:"gray9"},"支付方式：",-1),Va={class:"pb16"},Wa=u("span",{class:"gray9"},"支付流水号：",-1),Xa={class:"pb16"},Aa=u("span",{class:"gray9"},"付款状态：",-1),Ba={class:"pb16"},Ga=u("span",{class:"gray9"},"付款时间：",-1),Ha={class:"pb16"},Ja=u("span",{class:"gray9"},"退款金额：",-1),Ka={key:3},Ma=u("div",{class:"common-form mt16"},"发货信息",-1),Qa={class:"table-wrap"},Ta={class:"pb16"},Ua=u("span",{class:"gray9"},"发货状态：",-1),Ya={key:4,class:"table-wrap"},Za=u("div",{class:"common-form mt16"},"取消信息",-1),as={class:"table-wrap"},ss={class:"pb16"},es=u("span",{class:"gray9"},"商家备注：",-1),ls={key:5},ts=u("div",{class:"common-form mt16"},"门店自提核销",-1),ds={class:"table-wrap"},is={class:"pb16"},rs=u("span",{class:"gray9"},"核销状态：",-1),ps={class:"pb16"},ns=u("span",{class:"gray9"},"核销时间：",-1),cs={class:"common-button-wrapper"};const os=r(k,[["render",function(i,r,k,os,us,_s){const ms=a,ys=s,vs=e,fs=l,bs=t,gs=p("auth"),js=p("img-url"),ks=d;return n((c(),o("div",w,[u("div",h,[x,u("div",z,[_(vs,null,{default:m((()=>[_(ms,{span:5},{default:m((()=>[u("div",P,[C,y(" "+v(us.detail.order_no),1)])])),_:1}),_(ms,{span:5},{default:m((()=>[u("div",O,[q,y(" "+v(us.detail.user.nickName)+" ",1),u("span",null,"用户ID：("+v(us.detail.user.user_id)+")",1)])])),_:1}),_(ms,{span:5},{default:m((()=>[u("div",F,[D,y(" "+v(us.detail.order_price),1)])])),_:1}),us.detail.express_price>0?(c(),f(ms,{key:0,span:5},{default:m((()=>[u("div",$,[E,y(" "+v(us.detail.express_price),1)])])),_:1})):b("",!0),us.detail.bag_price>0?(c(),f(ms,{key:1,span:5},{default:m((()=>[u("div",I,[L,y(" "+v(us.detail.bag_price),1)])])),_:1})):b("",!0),_(ms,{span:5},{default:m((()=>[us.detail.coupon_money>0?(c(),o("div",N,[R,y(" "+v(us.detail.coupon_money),1)])):b("",!0)])),_:1}),_(ms,{span:5},{default:m((()=>[us.detail.points_money>0?(c(),o("div",S,[V,y(" "+v(us.detail.points_money),1)])):b("",!0)])),_:1}),_(ms,{span:5},{default:m((()=>[us.detail.fullreduce_money>0?(c(),o("div",W,[X,y(" "+v(us.detail.fullreduce_money),1)])):b("",!0)])),_:1}),_(ms,{span:5},{default:m((()=>[u("div",A,[B,y(" "+v(us.detail.pay_price),1)])])),_:1}),_(ms,{span:5},{default:m((()=>[u("div",G,[H,y(" "+v(us.detail.pay_type.text),1)])])),_:1}),_(ms,{span:5},{default:m((()=>[u("div",J,[K,y(" "+v(us.detail.delivery_type.text),1)])])),_:1}),_(ms,{span:5},{default:m((()=>[u("div",M,[Q,y(" "+v(us.detail.deliver_text),1)])])),_:1}),_(ms,{span:5},{default:m((()=>[u("div",T,[10==us.detail.delivery_type.value?(c(),o("span",U,"配送时间：")):b("",!0),20==us.detail.delivery_type.value?(c(),o("span",Y,"取餐时间：")):b("",!0),y(" "+v(us.detail.mealtime),1)])])),_:1}),_(ms,{span:5},{default:m((()=>[u("div",Z,[aa,y(" "+v(us.detail.order_status.text),1)])])),_:1}),10==us.detail.pay_status.value&&10==us.detail.order_status.value&&10==us.detail.order_source?n((c(),f(ms,{key:2,span:5},{default:m((()=>[_(ys,{onClick:r[0]||(r[0]=a=>i.editClick(us.detail)),size:"small"},{default:m((()=>[y("修改价格")])),_:1})])),_:1})),[[gs,"/takeout/order/updatePrice"]]):b("",!0)])),_:1})]),sa,u("div",ea,[_(vs,null,{default:m((()=>[_(ms,{span:5},{default:m((()=>[u("div",la,[ta,y(" "+v(us.detail.supplier.name),1)])])),_:1})])),_:1})]),da,u("div",ia,[_(bs,{size:"small",data:us.detail.product,border:"",style:{width:"100%"}},{default:m((()=>[_(fs,{prop:"product_name",label:"商品",width:"400"},{default:m((a=>[u("div",ra,[u("div",pa,[n(u("img",null,null,512),[[js,a.row.image.file_path]])]),u("div",na,[u("div",ca,v(a.row.product_name),1),""!=a.row.product_attr?(c(),o("div",oa,v(a.row.product_attr),1)):b("",!0),a.row.refund?(c(),o("div",ua,v(a.row.refund.type.text)+"-"+v(a.row.refund.status.text),1)):b("",!0),u("div",_a,[u("span",{class:g({"text-d-line":1==a.row.is_user_grade,gray6:1!=a.row.is_user_grade})},"￥ "+v(a.row.line_price),3),1==a.row.is_user_grade?(c(),o("span",ma," 会员折扣价：￥ "+v(a.row.grade_product_price),1)):b("",!0)])])])])),_:1}),_(fs,{prop:"total_num",label:"购买数量"},{default:m((a=>[u("p",null,"x "+v(a.row.total_num),1)])),_:1}),_(fs,{prop:"total_price",label:"商品总价(元)"},{default:m((a=>[u("p",null,"￥ "+v(a.row.total_price),1)])),_:1})])),_:1},8,["data"])]),10==us.detail.delivery_type.value?(c(),o("div",ya,[va,u("div",fa,[_(vs,null,{default:m((()=>[_(ms,{span:5},{default:m((()=>[u("div",ba,[ga,y(" "+v(us.detail.address.name),1)])])),_:1}),_(ms,{span:5},{default:m((()=>[u("div",ja,[ka,y(" "+v(us.detail.address.phone),1)])])),_:1}),_(ms,{span:9},{default:m((()=>[u("div",wa,[ha,y(" "+v(us.detail.address.detail)+v(us.detail.address.address),1)])])),_:1})])),_:1}),_(vs,null,{default:m((()=>[_(ms,{span:25},{default:m((()=>[u("div",xa,[za,y(" "+v(us.detail.buyer_remark),1)])])),_:1})])),_:1})])])):b("",!0),20==us.detail.delivery_type.value?(c(),o(j,{key:1},[Pa,us.detail.extract?(c(),o("div",Ca,[_(vs,null,{default:m((()=>[_(ms,{span:5},{default:m((()=>[u("div",Oa,[qa,y(" "+v(us.detail.extract.phone),1)])])),_:1})])),_:1}),_(vs,null,{default:m((()=>[_(ms,{span:25},{default:m((()=>[u("div",Fa,[Da,y(" "+v(us.detail.buyer_remark),1)])])),_:1})])),_:1})])):b("",!0)],64)):b("",!0),20==us.detail.pay_status.value?(c(),o("div",$a,[Ea,u("div",Ia,[_(vs,null,{default:m((()=>[_(ms,{span:5},{default:m((()=>[u("div",La,[Na,y(" "+v(us.detail.pay_price),1)])])),_:1}),_(ms,{span:5},{default:m((()=>[u("div",Ra,[Sa,y(" "+v(us.detail.pay_type.text),1)])])),_:1}),_(ms,{span:5},{default:m((()=>[u("div",Va,[Wa,y(" "+v(us.detail.transaction_id),1)])])),_:1}),_(ms,{span:5},{default:m((()=>[u("div",Xa,[Aa,y(" "+v(us.detail.pay_status.text),1)])])),_:1}),_(ms,{span:5},{default:m((()=>[u("div",Ba,[Ga,y(" "+v(us.detail.pay_time),1)])])),_:1}),us.detail.refund_money>0?(c(),f(ms,{key:0,span:5},{default:m((()=>[u("div",Ha,[Ja,y(" "+v(us.detail.refund_money),1)])])),_:1})):b("",!0)])),_:1})])])):b("",!0),10==us.detail.delivery_type.value?(c(),o("div",Ka,[u("div",null,[Ma,u("div",Qa,[_(vs,null,{default:m((()=>[_(ms,{span:5},{default:m((()=>[u("div",Ta,[Ua,y(" "+v(us.detail.delivery_status.text),1)])])),_:1})])),_:1})])])])):b("",!0),20==us.detail.order_status.value&&""!=us.detail.cancel_remark?(c(),o("div",Ya,[Za,u("div",as,[_(vs,null,{default:m((()=>[_(ms,{span:5},{default:m((()=>[u("div",ss,[es,y(" "+v(us.detail.cancel_remark),1)])])),_:1})])),_:1})])])):b("",!0),20==us.detail.delivery_type.value&&20==us.detail.pay_status.value&&21!=us.detail.order_status.value&&20!=us.detail.order_status.value?(c(),o("div",ls,[ts,u("div",ds,[u("template",null,[_(vs,null,{default:m((()=>[_(ms,{span:5},{default:m((()=>[u("div",is,[rs,20==us.detail.delivery_status.value?(c(),o(j,{key:0},[y(" 已核销 ")],64)):(c(),o(j,{key:1},[y(" 未核销 ")],64))])])),_:1}),us.detail.delivery_time?(c(),f(ms,{key:0,span:5},{default:m((()=>[u("div",ps,[ns,y(" "+v(us.detail.delivery_time),1)])])),_:1})):b("",!0)])),_:1})])])])):b("",!0)]),u("div",cs,[_(ys,{size:"small",type:"info",onClick:_s.cancelFunc},{default:m((()=>[y("返回上一页")])),_:1},8,["onClick"])])])),[[ks,us.loading]])}]]);export{os as default};
