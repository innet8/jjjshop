import{t as e,u as a,g as t,f as i,e as l,l as r,m as s,n as o,v as d}from"./element-plus-7d357588.js";import{C as p}from"./cash-5d7cfbcc.js";import n from"./store-d3b3d51f.js";import c from"./popup-654078e9.js";import{l as u}from"./qs-942d6868.js";import{_ as m,u as v}from"./index-f792122d.js";import{ag as g,$ as b,o as _,c as h,a as f,P as y,S as j,T as C,X as k,Y as w,W as x}from"./@vue-48c55b54.js";import"./@vueuse-c556fb5a.js";import"./lodash-es-c1acaa3d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-e0f4a3e8.js";import"./dayjs-9faf8871.js";import"./call-bind-0c463fe3.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./side-channel-ba7aab8a.js";import"./object-inspect-860361a9.js";import"./vue-router-b8ff3004.js";import"./pinia-73166104.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./vue-ueditor-wrap-cd29f9a1.js";v();const{token:N}=v(),z={components:{store:n,popup:c},data:()=>({active:0,loading:!0,detail:{},order:{},pageSize:20,talDataNumber:0,curPage:1,activeName:"",tableData:[],deliverylist:[],storelist:[],delivery:{},store:{},order_id:{},isPopup:!1,token:N}),created(){this.getParams()},methods:{getParams(){let e=this;e.loading=!0;const a=this.$route.query.finance_id;p.financeDetail({finance_id:a},!0).then((a=>{e.loading=!1,e.detail=a.data.detail,e.store=a.data.store.detail,e.delivery=a.data.delivery.detail,e.storelist=a.data.store.list.data,e.deliverylist=a.data.delivery.list.data,e.deliverytotalDataNumber=a.data.delivery.list.total,e.storetotalDataNumber=a.data.store.list.total,0==e.activeName?(e.tableData=e.deliverylist,e.talDataNumber=e.deliverytotalDataNumber):1==e.activeName&&(e.tableData=e.storelist,e.talDataNumber=e.storetotalDataNumber),e.order=a.data.order})).catch((a=>{e.loading=!1}))},cancelFunc(){this.$router.back(-1)},handleCurrentChange(e){let a=this;a.curPage=e,a.loading=!0,a.getTableList()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getTableList()},handleClick(e){this.getParams()},addClick(e){this.isPopup=!0,this.order_id=e.order_id},closepop(){this.isPopup=!1},onExport(){let e=window.location.protocol+"//"+window.location.host,a={order_type:this.activeName,finance_id:this.$route.query.finance_id,token:this.token};window.location.href=e+"/index.php/shop/cash.finance/export?"+u.stringify(a)}}},P={class:"pb50"},D={class:"product-content"},S=f("div",{class:"common-form"},"交易概况",-1),T={class:"table-wrap"},q={class:"pb16 grid-content bg-purple"},F=f("div",null,"营业总额(元)",-1),$={class:"detail_prici"},V={class:"pb16 grid-content bg-purple"},E=f("div",null,"预计收入(元)",-1),L={class:"detail_prici"},R={class:"pb16 grid-content bg-purple"},U=f("div",null,"有效订单(元)",-1),W={class:"detail_prici"},X={class:"pb16 grid-content bg-purple"},Y=f("div",null,"退款金额(元)",-1),A={class:"detail_prici"},B={class:"pb16 grid-content bg-purple"},G=f("div",null,"营业总额(元)",-1),H={class:"detail_prici"},I={class:"pb16 grid-content bg-purple"},J=f("div",null,"预计收入(元)",-1),K={class:"detail_prici"},M={class:"pb16 grid-content bg-purple"},O=f("div",null,"有效订单(元)",-1),Q={class:"detail_prici"},Z={class:"pb16 grid-content bg-purple"},ee=f("div",null,"退款金额(元)",-1),ae={class:"detail_prici"},te=f("div",{class:"common-form"},"订单概况",-1),ie={class:"product-content"},le={class:"table-wrap"},re={class:"pagination"},se={class:"common-button-wrapper"};const oe=m(z,[["render",function(p,n,c,u,m,v){const N=g("store"),z=e,oe=a,de=t,pe=i,ne=l,ce=r,ue=s,me=o,ve=g("popup"),ge=d;return b((_(),h("div",P,[f("div",D,[y(N,{detail:m.detail},null,8,["detail"]),S,y(oe,{modelValue:m.activeName,"onUpdate:modelValue":n[0]||(n[0]=e=>m.activeName=e),type:"card",onTabClick:v.handleClick},{default:j((()=>[y(z,{label:"外卖统计",name:"0"}),y(z,{label:"店内统计",name:"1"})])),_:1},8,["modelValue","onTabClick"]),f("div",T,[0==m.activeName?(_(),C(pe,{key:0,gutter:20},{default:j((()=>[y(de,{span:6},{default:j((()=>[f("div",q,[F,f("div",$,k(m.delivery.total_price),1)])])),_:1}),y(de,{span:6},{default:j((()=>[f("div",V,[E,f("div",L,k(m.delivery.revenue_money),1)])])),_:1}),y(de,{span:6},{default:j((()=>[f("div",R,[U,f("div",W,k(m.delivery.order_count),1)])])),_:1}),y(de,{span:6},{default:j((()=>[f("div",X,[Y,f("div",A,k(m.delivery.refund_money),1)])])),_:1})])),_:1})):w("",!0),1==m.activeName?(_(),C(pe,{key:1,gutter:20},{default:j((()=>[y(de,{span:6},{default:j((()=>[f("div",B,[G,f("div",H,k(m.store.total_price),1)])])),_:1}),y(de,{span:6},{default:j((()=>[f("div",I,[J,f("div",K,k(m.store.revenue_money),1)])])),_:1}),y(de,{span:6},{default:j((()=>[f("div",M,[O,f("div",Q,k(m.store.order_count),1)])])),_:1}),y(de,{span:6},{default:j((()=>[f("div",Z,[ee,f("div",ae,k(m.store.refund_money),1)])])),_:1})])),_:1})):w("",!0)]),te,f("div",ie,[f("div",le,[y(ne,{size:"small",type:"success",class:"mb18",onClick:v.onExport},{default:j((()=>[x("导出")])),_:1},8,["onClick"]),b((_(),C(ue,{size:"small",data:m.tableData,border:"",style:{width:"100%"}},{default:j((()=>[y(ce,{prop:"order_no",label:"订单号"}),y(ce,{prop:"delivery_type.text",label:"订单类型"}),y(ce,{prop:"order_price",label:"应收金额"}),y(ce,{label:"优惠金额"},{default:j((e=>[x(k((e.row.order_price-e.row.pay_price).toFixed(2)),1)])),_:1}),y(ce,{prop:"pay_price",label:"实付金额"}),y(ce,{label:"预计收入"},{default:j((e=>[x(k((e.row.pay_price-e.row.refund_money).toFixed(2)),1)])),_:1}),y(ce,{prop:"bag_price",label:"包装费(元)"}),y(ce,{prop:"express_price",label:"配送费(元)"}),y(ce,{prop:"state_text",label:"订单状态"}),y(ce,{prop:"order_id",fixed:"right",label:"操作",width:"120"},{default:j((e=>[y(ne,{onClick:a=>v.addClick(e.row),type:"text",size:"small"},{default:j((()=>[x("详情")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])),[[ge,m.loading]])]),f("div",re,[y(me,{onSizeChange:v.handleSizeChange,onCurrentChange:v.handleCurrentChange,background:"","current-page":m.curPage,"page-size":m.pageSize,layout:"total, prev, pager, next, jumper",total:m.talDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])]),f("div",se,[y(ne,{size:"small",type:"info",onClick:v.cancelFunc},{default:j((()=>[x("返回上一页")])),_:1},8,["onClick"])]),y(ve,{isPopup:m.isPopup,order_id:m.order_id,onClose:v.closepop},null,8,["isPopup","order_id","onClose"])])),[[ge,m.loading]])}]]);export{oe as default};
