import{k as e,E as t,e as a,l as i,m as r,n as s,v as l}from"./element-plus-7d357588.js";import{S as o}from"./supplier-bc0f092e.js";import{_ as n}from"./index-f792122d.js";import{ap as p,o as d,c as m,a as u,$ as c,T as g,S as h,W as j,P as C,X as b}from"./@vue-48c55b54.js";import"./@vueuse-c556fb5a.js";import"./lodash-es-c1acaa3d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-e0f4a3e8.js";import"./dayjs-9faf8871.js";import"./call-bind-0c463fe3.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-b8ff3004.js";import"./pinia-73166104.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-942d6868.js";import"./side-channel-ba7aab8a.js";import"./object-inspect-860361a9.js";import"./vue-ueditor-wrap-cd29f9a1.js";const f={data:()=>({loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,formInline:{user:"",region:""},open_add:!1,open_edit:!1,userModel:{}}),created(){this.getData()},methods:{handleCurrentChange(e){let t=this;t.loading=!0,t.curPage=e,t.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},getData(){let e=this,t={};t.page=e.curPage,t.list_rows=e.pageSize,o.printingList(t,!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((e=>{}))},addClick(){this.$router.push("/supplier/printing/add")},editClick(e){this.$router.push({path:"/supplier/printing/edit",query:{id:e.id}})},deleteClick(a){let i=this;e.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{i.loading=!0,o.deletePrinting({id:a.id},!0).then((e=>{i.loading=!1,t({message:e.msg,type:"success"}),i.getData()})).catch((e=>{i.loading=!1}))})).catch((()=>{i.loading=!1}))}}},v={class:"user"},_=u("div",{class:"common-form"},"菜品打印列表",-1),k={class:"common-level-rail"},y={class:"product-content"},z={class:"table-wrap"},w={class:"pagination"};const D=n(f,[["render",function(e,t,o,n,f,D){const x=a,S=i,P=r,q=s,N=p("auth"),T=l;return d(),m("div",v,[_,u("div",k,[c((d(),g(x,{size:"small",type:"primary",onClick:D.addClick},{default:h((()=>[j("添加")])),_:1},8,["onClick"])),[[N,"/supplier/printing/add"]])]),u("div",y,[u("div",z,[c((d(),g(P,{size:"small",data:f.tableData,border:"",style:{width:"100%"}},{default:h((()=>[C(S,{prop:"id",label:"ID"}),C(S,{prop:"name",label:"名称"}),C(S,{prop:"printer.printer_name",label:"打印机名称"}),C(S,{prop:"printer.printer_type.text",label:"打印机类型"}),C(S,{prop:"product_type",label:"打印类型\t"},{default:h((e=>[u("div",null,b(10==e.row.type?"小票打印":"标签打印"),1)])),_:1}),C(S,{prop:"is_open",label:"状态"},{default:h((e=>[u("div",null,b(0==e.row.is_open?"关闭":"开启"),1)])),_:1}),C(S,{prop:"create_time",label:"添加时间"}),C(S,{fixed:"right",label:"操作",width:"120"},{default:h((e=>[c((d(),g(x,{onClick:t=>D.editClick(e.row),type:"text",size:"small"},{default:h((()=>[j("编辑")])),_:2},1032,["onClick"])),[[N,"/supplier/printing/edit"]]),c((d(),g(x,{onClick:t=>D.deleteClick(e.row),type:"text",size:"small"},{default:h((()=>[j("删除")])),_:2},1032,["onClick"])),[[N,"/supplier/printing/delete"]])])),_:1})])),_:1},8,["data"])),[[T,f.loading]])]),u("div",w,[C(q,{onSizeChange:D.handleSizeChange,onCurrentChange:D.handleCurrentChange,background:"","current-page":f.curPage,"page-size":f.pageSize,layout:"total, prev, pager, next, jumper",total:f.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}]]);export{D as default};
