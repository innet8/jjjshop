import{t as e,u as a,r as l,s as t,d as i,M as s,w as o,A as n,b as r,g as d,f as p,l as m,e as u,m as c,n as h,v as f}from"./element-plus-7d357588.js";import{S as g}from"./statistics-603c9b43.js";import _ from"./Transaction-f10d1591.js";import{_ as b}from"./index-f792122d.js";import{ag as v,ap as j,$ as C,o as y,c as z,a as I,P as k,S as w,T as P,Q as V,a8 as D,W as S,Y as L,X as x}from"./@vue-48c55b54.js";import"./@vueuse-c556fb5a.js";import"./lodash-es-c1acaa3d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-e0f4a3e8.js";import"./dayjs-9faf8871.js";import"./call-bind-0c463fe3.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./DateTime-12b085dd.js";import"./echarts-2361e669.js";import"./tslib-a4e99503.js";import"./zrender-1189e17c.js";import"./vue-router-b8ff3004.js";import"./pinia-73166104.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-942d6868.js";import"./side-channel-ba7aab8a.js";import"./object-inspect-860361a9.js";import"./vue-ueditor-wrap-cd29f9a1.js";const T={components:{Transaction:_},data:()=>({active:0,loading:!0,pageSize:10,totalDataNumber:0,curPage:1,formInline:{order_type:0,type:1,shop_supplier_id:0,time:""},detail:{total_price:"",income_money:"",order_count:"",refund_money:""},supplierList:[],tableData:[],profileList:[]}),created(){this.getParams()},methods:{getParams(){let e=this,a=e.formInline;a.page=e.curPage,a.list_rows=e.pageSize,e.loading=!0,g.getOrderDate(a,!0).then((a=>{e.detail=a.data.detail,e.supplierList=a.data.supplierList,e.profileList=a.data,e.tableData=a.data.list.data,e.totalDataNumber=a.data.list.total,e.loading=!1})).catch((a=>{e.loading=!1}))},handleCurrentChange(e){let a=this;a.loading=!0,a.curPage=e,a.getParams()},handleSizeChange(e){this.pageSize=e,this.getParams()},handleClick(){let e=this;(4!=e.formInline.type||e.formInline.time)&&(e.curPage=1,e.getParams())},selectId(e){this.formInline.shop_supplier_id=e,this.getParams()},addClick(e){let a=e.finance_id;this.$router.push({path:"/cash/finance/detail",query:{finance_id:a}})}}},Y={class:"pb50"},U={id:""},q={class:"common-seach-wrap ww100"},M={class:"date_section d-b-c"},N={class:"flex-1"},$={class:"block"},A=I("span",{class:"demonstration"},null,-1),H={class:"product-content"},O=I("div",{class:"common-form"},"实时概况",-1),Q={class:"table-wrap"},W={class:"pb16 grid-content bg-purple"},X=I("div",null,"营业总额(元)",-1),B={class:"detail_prici"},E={class:"pb16 grid-content bg-purple"},F=I("div",null,"预计收入(元)",-1),G={class:"detail_prici"},J={class:"pb16 grid-content bg-purple"},K=I("div",null,"有效订单数",-1),R={class:"detail_prici"},Z={class:"pb16 grid-content bg-purple"},ee=I("div",null,"退款金额(元)",-1),ae={class:"detail_prici"},le=I("div",{class:"common-form"},"实时概况",-1),te={class:"pagination"};const ie=b(T,[["render",function(g,_,b,T,ie,se){const oe=e,ne=a,re=l,de=t,pe=i,me=s,ue=o,ce=n,he=r,fe=d,ge=p,_e=v("Transaction"),be=m,ve=u,je=c,Ce=h,ye=j("auth"),ze=f;return C((y(),z("div",Y,[I("div",U,[k(ne,{modelValue:ie.formInline.order_type,"onUpdate:modelValue":_[0]||(_[0]=e=>ie.formInline.order_type=e),type:"card",onTabClick:se.handleClick},{default:w((()=>[k(oe,{label:"外卖",name:"0"}),k(oe,{label:"店内",name:"1"})])),_:1},8,["modelValue","onTabClick"])]),I("div",q,[k(he,{size:"small",inline:!0,model:ie.formInline,class:"demo-form-inline ww100"},{default:w((()=>[I("div",M,[I("div",N,[C((y(),P(pe,{label:"选择店铺"},{default:w((()=>[k(de,{size:"small",modelValue:ie.formInline.shop_supplier_id,"onUpdate:modelValue":_[1]||(_[1]=e=>ie.formInline.shop_supplier_id=e),placeholder:"请选择",onChange:se.handleClick},{default:w((()=>[k(re,{label:"全部",value:0}),(y(!0),z(V,null,D(ie.supplierList,((e,a)=>(y(),P(re,{key:a,label:e.name,value:e.shop_supplier_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","onChange"])])),_:1})),[[ye,"/auth/shop"]]),k(pe,{label:"查询日期"},{default:w((()=>[k(ue,{modelValue:ie.formInline.type,"onUpdate:modelValue":_[2]||(_[2]=e=>ie.formInline.type=e),size:"medium",onChange:se.handleClick},{default:w((()=>[k(me,{label:1},{default:w((()=>[S("今天")])),_:1}),k(me,{label:2},{default:w((()=>[S("近七天")])),_:1}),k(me,{label:3},{default:w((()=>[S("近十五天")])),_:1}),k(me,{label:4},{default:w((()=>[S("自定义时间")])),_:1})])),_:1},8,["modelValue","onChange"])])),_:1})]),I("div",null,[4==ie.formInline.type?(y(),P(pe,{key:0,label:"起始时间"},{default:w((()=>[I("div",$,[A,k(ce,{onChange:se.handleClick,size:"small",modelValue:ie.formInline.time,"onUpdate:modelValue":_[3]||(_[3]=e=>ie.formInline.time=e),type:"daterange","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["onChange","modelValue"])])])),_:1})):L("",!0)])])])),_:1},8,["model"])]),I("div",H,[O,I("div",Q,[k(ge,{gutter:20},{default:w((()=>[k(fe,{span:6},{default:w((()=>[I("div",W,[X,I("div",B,x(ie.detail.total_price),1)])])),_:1}),k(fe,{span:6},{default:w((()=>[I("div",E,[F,I("div",G,x(ie.detail.income_money),1)])])),_:1}),k(fe,{span:6},{default:w((()=>[I("div",J,[K,I("div",R,x(ie.detail.order_count),1)])])),_:1}),k(fe,{span:6},{default:w((()=>[I("div",Z,[ee,I("div",ae,x(ie.detail.refund_money),1)])])),_:1})])),_:1})])]),k(_e,{profileList:ie.profileList},null,8,["profileList"]),le,C((y(),P(je,{size:"small",data:ie.tableData,border:"",style:{width:"100%"}},{default:w((()=>[k(be,{prop:"time",label:"日期"}),k(be,{prop:"order_count",label:"有效订单数"}),k(be,{prop:"total_money",label:"营业总额"}),k(be,{prop:"refund_money",label:"退款金额"}),k(be,{prop:"revenue_money",label:"预计收入"}),k(be,{prop:"create_time",label:"添加时间"}),k(be,{prop:"settled_id",fixed:"right",label:"操作",width:"120"},{default:w((e=>[C((y(),P(ve,{onClick:a=>se.addClick(e.row),type:"text",size:"small"},{default:w((()=>[S("详情 ")])),_:2},1032,["onClick"])),[[ye,"/cash/finance/detail"]])])),_:1})])),_:1},8,["data"])),[[ze,ie.loading]]),I("div",te,[k(Ce,{onSizeChange:se.handleSizeChange,onCurrentChange:se.handleCurrentChange,background:"","current-page":ie.curPage,"page-size":ie.pageSize,layout:"total, prev, pager, next, jumper",total:ie.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])),[[ze,ie.loading]])}]]);export{ie as default};
