import{E as a,P as s,O as e,m as l,n as t,q as d,r,h as i,g as p,e as o,o as n,i as u,v as c}from"./element-plus-b01b3a31.js";import{P as m}from"./points-758023c5.js";import{_}from"./_plugin-vue_export-helper-1b428a4d.js";import{ap as v,$ as y,o as f,c as b,a as g,P as x,S as h,W as j,X as k,Y as w,Q as V,a8 as P,T as z}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-fed3ed55.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const C={components:{},data:()=>({active:0,loading:!0,detail:{pay_status:[],pay_type:[],delivery_type:[],user:{},address:[],product:[],order_status:[],store:[],express:[],delivery_status:[]},open_add:!1,pageSize:20,totalDataNumber:0,curPage:1,form:{express_id:null,express_no:""},extract_form:{order:{extract_status:1}},order:{},delivery_type:0,create_time:"",expressList:[]}),created(){this.getParams()},methods:{next(){this.active++>4&&(this.active=0)},getParams(){let a=this;const s=this.$route.query.order_id;m.orderdetail({order_id:s},!0).then((s=>{a.loading=!1,a.detail=s.data.detail,a.expressList=s.data.expressList})).catch((s=>{a.loading=!1}))},onSubmit(){let s=this,e=s.form;if(null==e.express_id)return void a.error("请选择物流公司");if(""==e.express_no)return void a.error("请填写物流单号");let l=this.$route.query.order_id;m.delivery({param:e,order_id:l},!0).then((e=>{s.loading=!1,a({message:"恭喜你，发货成功",type:"success"}),s.getParams()})).catch((a=>{s.loading=!1}))},onExtract(s){let e=this;e.extract_form;let l=s;m.extract({order_id:l},!0).then((s=>{e.loading=!1,a({message:"恭喜你，操作成功",type:"success"}),e.getParams()})).catch((a=>{e.loading=!1}))},cancelFunc(){this.$router.back(-1)}}},q={class:"pb50"},L={class:"product-content"},S=g("div",{class:"common-form"},"基本信息",-1),$={class:"table-wrap"},D={class:"pb16"},E=g("span",{class:"gray9"},"订单号：",-1),O={class:"pb16"},U=g("span",{class:"gray9"},"买家：",-1),F={class:"pb16"},I=g("span",{class:"gray9"},"兑换金额 (元)：",-1),N={class:"pb16"},X=g("span",{class:"gray9"},"运费金额 (元)：",-1),A={class:"pb16"},B=g("span",{class:"gray9"},"实付款金额 (元)：",-1),Q={class:"pb16"},T=g("span",{class:"gray9"},"兑换积分：",-1),W={class:"pb16"},Y=g("span",{class:"gray9"},"支付方式：",-1),G={class:"pb16"},H=g("span",{class:"gray9"},"配送方式：",-1),J={class:"pb16"},K=g("span",{class:"gray9"},"交易状态：",-1),M=g("div",{class:"common-form mt16"},"商品信息",-1),R={class:"table-wrap"},Z={class:"product-info"},aa={class:"pic"},sa={class:"info"},ea={class:"name"},la={key:0},ta=g("div",{class:"common-form mt16"},"收货信息",-1),da={class:"table-wrap"},ra={class:"pb16"},ia=g("span",{class:"gray9"},"收货人：",-1),pa={class:"pb16"},oa=g("span",{class:"gray9"},"收货电话：",-1),na={class:"pb16"},ua=g("span",{class:"gray9"},"收货地址：",-1),ca=g("div",{class:"common-form mt16"},"自提信息",-1),ma={class:"table-wrap"},_a={class:"pb16"},va=g("span",{class:"gray9"},"门店ID：",-1),ya={class:"pb16"},fa=g("span",{class:"gray9"},"门店名称：",-1),ba={class:"pb16"},ga=g("span",{class:"gray9"},"联系人：",-1),xa={class:"pb16"},ha=g("span",{class:"gray9"},"联系电话：",-1),ja={class:"pb16"},ka=g("span",{class:"gray9"},"门店地址：",-1),wa={key:2,class:"table-wrap"},Va=g("div",{class:"common-form mt16"},"付款信息",-1),Pa={class:"table-wrap"},za={class:"pb16"},Ca=g("span",{class:"gray9"},"应付款金额：",-1),qa={class:"pb16"},La=g("span",{class:"gray9"},"应付积分：",-1),Sa={class:"pb16"},$a=g("span",{class:"gray9"},"支付方式：",-1),Da={class:"pb16"},Ea=g("span",{class:"gray9"},"支付流水号：",-1),Oa={class:"pb16"},Ua=g("span",{class:"gray9"},"付款状态：",-1),Fa={class:"pb16"},Ia=g("span",{class:"gray9"},"付款时间：",-1),Na={key:3},Xa={key:0},Aa=g("div",{class:"common-form mt16"},"去发货",-1),Ba={key:1},Qa=g("div",{class:"common-form mt16"},"发货信息",-1),Ta={class:"table-wrap"},Wa={class:"pb16"},Ya=g("span",{class:"gray9"},"物流公司：",-1),Ga={class:"pb16"},Ha=g("span",{class:"gray9"},"物流单号：",-1),Ja={class:"pb16"},Ka=g("span",{class:"gray9"},"发货状态：",-1),Ma={class:"pb16"},Ra=g("span",{class:"gray9"},"发货时间：",-1),Za={key:4},as=g("div",{class:"common-form mt16"},"门店自提核销",-1),ss={key:0},es={key:1,class:"table-wrap"},ls={class:"pb16"},ts=g("span",{class:"gray9"},"自提门店名称：",-1),ds={class:"pb16"},rs=g("span",{class:"gray9"},"自提门店电话：",-1),is={class:"pb16"},ps=g("span",{class:"gray9"},"核销状态：",-1),os={class:"pb16"},ns=g("span",{class:"gray9"},"核销时间：",-1),us={class:"common-button-wrapper"};const cs=_(C,[["render",function(a,m,_,C,cs,ms){const _s=s,vs=e,ys=l,fs=t,bs=d,gs=r,xs=i,hs=p,js=o,ks=n,ws=u,Vs=v("img-url"),Ps=v("auth"),zs=c;return y((f(),b("div",q,[g("div",L,[S,g("div",$,[x(vs,null,{default:h((()=>[x(_s,{span:5},{default:h((()=>[g("div",D,[E,j(" "+k(cs.detail.order_no),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",O,[U,j(" "+k(cs.detail.user.nickName)+" ",1),g("span",null,"用户ID：("+k(cs.detail.user.user_id)+")",1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",F,[I,j(" "+k(cs.detail.order_price),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",N,[X,j(" "+k(cs.detail.express_price),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",A,[B,j(" "+k(cs.detail.pay_price),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",Q,[T,j(" "+k(cs.detail.points_num),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",W,[Y,j(" "+k(cs.detail.pay_type.text),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",G,[H,j(" "+k(cs.detail.delivery_type.text),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",J,[K,j(" "+k(cs.detail.order_status.text),1)])])),_:1})])),_:1})]),M,g("div",R,[x(fs,{size:"small",data:cs.detail.product,border:"",style:{width:"100%"}},{default:h((()=>[x(ys,{prop:"product_name",label:"商品"},{default:h((a=>[g("div",Z,[g("div",aa,[y(g("img",null,null,512),[[Vs,a.row.file_path]])]),g("div",sa,[g("div",ea,k(a.row.product_name),1)])])])),_:1}),x(ys,{prop:"product_price",label:"金额(元)"}),x(ys,{prop:"product_points",label:"积分"}),x(ys,{prop:"total_num",label:"兑换数量"},{default:h((a=>[g("p",null,"x "+k(a.row.total_num),1)])),_:1}),x(ys,{prop:"total_price",label:"商品总价"},{default:h((a=>[g("p",null,"金额：￥ "+k(a.row.total_price),1),g("p",null,"积分: "+k(a.row.points_num),1)])),_:1})])),_:1},8,["data"])]),10==cs.detail.delivery_type.value?(f(),b("div",la,[ta,g("div",da,[x(vs,null,{default:h((()=>[x(_s,{span:5},{default:h((()=>[g("div",ra,[ia,j(" "+k(cs.detail.address.name),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",pa,[oa,j(" "+k(cs.detail.address.phone),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",na,[ua,j(" "+k(cs.detail.address.detail),1)])])),_:1})])),_:1})])])):w("",!0),20==cs.detail.delivery_type.value?(f(),b(V,{key:1},[ca,g("div",ma,[x(vs,null,{default:h((()=>[x(_s,{span:5},{default:h((()=>[g("div",_a,[va,j(" "+k(cs.detail.store.shop_supplier_id),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",ya,[fa,j(" "+k(cs.detail.store.name),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",ba,[ga,j(" "+k(cs.detail.store.link_name),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",xa,[ha,j(" "+k(cs.detail.store.link_phone),1)])])),_:1}),x(_s,{span:15},{default:h((()=>[g("div",ja,[ka,j(" "+k(cs.detail.store.address),1)])])),_:1})])),_:1})])],64)):w("",!0),20==cs.detail.pay_status.value?(f(),b("div",wa,[Va,g("div",Pa,[x(vs,null,{default:h((()=>[x(_s,{span:5},{default:h((()=>[g("div",za,[Ca,j(" "+k(cs.detail.pay_price),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",qa,[La,j(" "+k(cs.detail.points_num),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",Sa,[$a,j(" "+k(cs.detail.pay_type.text),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",Da,[Ea,j(" "+k(cs.detail.transaction_id),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",Oa,[Ua,j(" "+k(cs.detail.pay_status.text),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",Fa,[Ia,j(" "+k(cs.detail.pay_time),1)])])),_:1})])),_:1})])])):w("",!0),20==cs.detail.pay_status.value&&10==cs.detail.delivery_type.value&&-1===[20,21].indexOf(cs.detail.order_status.value)?y((f(),b("div",Na,[10==cs.detail.delivery_status.value?(f(),b("div",Xa,[Aa,x(js,{size:"small",ref:"form",model:cs.form,"label-position":"top","label-width":"100px"},{default:h((()=>[x(xs,{label:"物流公司"},{default:h((()=>[x(gs,{modelValue:cs.form.express_id,"onUpdate:modelValue":m[0]||(m[0]=a=>cs.form.express_id=a),placeholder:"请选择快递公司"},{default:h((()=>[(f(!0),b(V,null,P(cs.expressList,((a,s)=>(f(),z(bs,{label:a.express_name,key:s,value:a.express_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),x(xs,{label:"物流单号"},{default:h((()=>[x(hs,{modelValue:cs.form.express_no,"onUpdate:modelValue":m[1]||(m[1]=a=>cs.form.express_no=a),class:"max-w460"},null,8,["modelValue"])])),_:1})])),_:1},8,["model"])])):(f(),b("div",Ba,[Qa,g("div",Ta,[x(vs,null,{default:h((()=>[x(_s,{span:5},{default:h((()=>[g("div",Wa,[Ya,j(" "+k(cs.detail.express.express_name),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",Ga,[Ha,j(" "+k(cs.detail.express_no),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",Ja,[Ka,j(" "+k(cs.detail.delivery_status.text),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",Ma,[Ra,j(" "+k(cs.detail.delivery_time),1)])])),_:1})])),_:1})])]))])),[[Ps,"/plus/points/order/delivery"]]):w("",!0),20==cs.detail.delivery_type.value&&20==cs.detail.pay_status.value&&21!=cs.detail.order_status.value&&20!=cs.detail.order_status.value?y((f(),b("div",Za,[as,10==cs.detail.delivery_status.value?(f(),b("div",ss,[x(js,{size:"small",ref:"extract_form",model:cs.extract_form,"label-width":"100px"},{default:h((()=>[x(xs,{label:"买家取货状态 "},{default:h((()=>[x(ks,{modelValue:cs.extract_form.order.extract_status,"onUpdate:modelValue":m[2]||(m[2]=a=>cs.extract_form.order.extract_status=a),label:1},{default:h((()=>[j("已取货")])),_:1},8,["modelValue"])])),_:1}),x(xs,null,{default:h((()=>[x(ws,{type:"primary",onClick:m[3]||(m[3]=a=>ms.onExtract(cs.detail.order_id))},{default:h((()=>[j("确认核销")])),_:1})])),_:1})])),_:1},8,["model"])])):(f(),b("div",es,[g("template",null,[x(vs,null,{default:h((()=>[x(_s,{span:5},{default:h((()=>[g("div",ls,[ts,j(" "+k(cs.detail.store.name),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",ds,[rs,j(" "+k(cs.detail.store.link_name),1)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",is,[ps,20==cs.detail.delivery_status.value?(f(),b(V,{key:0},[j(" 已核销 ")],64)):w("",!0)])])),_:1}),x(_s,{span:5},{default:h((()=>[g("div",os,[ns,j(" "+k(cs.detail.delivery_time),1)])])),_:1})])),_:1})])]))])),[[Ps,"/plus/points/order/extract"]]):w("",!0)]),g("div",us,[x(ws,{size:"small",type:"info",onClick:ms.cancelFunc},{default:h((()=>[j("返回上一页")])),_:1},8,["onClick"]),20==cs.detail.pay_status.value&&10==cs.detail.delivery_type.value&&-1===[20,21].indexOf(cs.detail.order_status.value)?(f(),b(V,{key:0},[10==cs.detail.delivery_status.value?(f(),z(ws,{key:0,size:"small",type:"primary",onClick:ms.onSubmit},{default:h((()=>[j("确认发货 ")])),_:1},8,["onClick"])):w("",!0)],64)):w("",!0)])])),[[zs,cs.loading]])}]]);export{cs as default};
