import{d as e,g as a,h as t,i,e as l,m as s,o,B as r,v as n}from"./element-plus-c8084613.js";import{P as p}from"./package-57ffa3ee.js";import{_ as d}from"./_plugin-vue_export-helper-1b428a4d.js";import{an as c,o as m,c as g,a as u,O as h,R as k,V as f,_ as j,S as C}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-74b65baf.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const b={components:{},data:()=>({formInline:{search:""},form:{},tableData:[],pageSize:20,totalDataNumber:0,curPage:1,loading:!0,path:""}),created(){this.getTableList()},methods:{getTableList(){let e=this,a={};a.search=e.formInline.search,a.page=e.curPage,p.packageList(a,!0).then((a=>{e.loading=!1,e.tableData=a.data.list.data,e.totalDataNumber=a.data.list.total})).catch((a=>{e.loading=!1}))},handleCurrentChange(e){let a=this;a.curPage=e,a.loading=!0,a.getTableList()},handleSizeChange(e){let a=this;a.curPage=1,a.pageSize=e,a.getTableList()},addClick(){this.$router.push("/plus/package/add")},orderClick(e){this.$router.push({path:"/plus/package/orderlist",query:{gift_package_id:e}})},editClick(e){this.$router.push({path:"/plus/package/edit",query:{package_id:e}})},onSubmit(){let e=this;e.form,e.loading=!0,e.getTableList()},deleteClick(a){let t=this;e.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{t.loading=!0,p.delpackage({id:a},!0).then((e=>{t.loading=!1,this.$ElMessage({message:e.msg,type:"success"}),t.getTableList()})).catch((e=>{t.loading=!1}))})).catch((()=>{t.loading=!1}))},sendClick(e){let a=this;a.loading=!0,p.send({id:e},!0).then((e=>{a.loading=!1,this.$ElMessage({message:e.msg,type:"success"}),a.getTableList()})).catch((e=>{a.loading=!1}))},endClick(e){let a=this;a.loading=!0,p.end({id:e},!0).then((e=>{a.loading=!1,this.$ElMessage({message:e.msg,type:"success"}),a.getTableList()})).catch((e=>{a.loading=!1}))}}},y={class:"user"},_={class:"common-seach-wrap"},v=u("div",{class:"common-form"},"活动列表",-1),w={class:"product-content point-list"},z={class:"table-wrap"},x={class:"pagination"};const S=d(b,[["render",function(e,p,d,b,S,T){const L=a,D=t,P=i,I=l,$=s,q=o,E=r,V=c("auth"),B=n;return m(),g("div",y,[u("div",_,[h(I,{inline:!0,model:S.formInline,class:"demo-form-inline"},{default:k((()=>[h(D,{label:"活动名称"},{default:k((()=>[h(L,{modelValue:S.formInline.search,"onUpdate:modelValue":p[0]||(p[0]=e=>S.formInline.search=e),placeholder:"请输入活动名称"},null,8,["modelValue"])])),_:1}),h(D,null,{default:k((()=>[h(P,{type:"primary",icon:"Search",onClick:T.onSubmit},{default:k((()=>[f("查询")])),_:1},8,["onClick"]),j((m(),C(P,{type:"primary",onClick:T.addClick,icon:"Plus"},{default:k((()=>[f("添加活动")])),_:1},8,["onClick"])),[[V,"/plus/package/add"]])])),_:1})])),_:1},8,["model"])]),v,u("div",w,[h(I,{ref:"form",model:S.form,"label-position":"top","label-width":"100px"},{default:k((()=>[u("div",z,[j((m(),C(q,{data:S.tableData,border:"",style:{width:"100%"}},{default:k((()=>[h($,{prop:"package_id",label:"ID"}),h($,{prop:"name",label:"活动名称"}),h($,{prop:"money",label:"活动价格"}),h($,{prop:"start_time.text",label:"开始时间"}),h($,{prop:"end_time.text",label:"结束时间"}),h($,{prop:"total_num",label:"发放数量"}),h($,{prop:"people",label:"参与人数"}),h($,{prop:"status.text",label:"状态"}),h($,{fixed:"right",width:"210",label:"操作"},{default:k((e=>[j((m(),C(P,{onClick:a=>T.editClick(e.row.package_id),type:"primary",link:"",size:"small"},{default:k((()=>[f(" 编辑 ")])),_:2},1032,["onClick"])),[[V,"/plus/package/edit"]]),1==e.row.status.value?j((m(),C(P,{key:0,onClick:a=>T.sendClick(e.row.package_id),type:"primary",link:"",size:"small"},{default:k((()=>[f(" 发布 ")])),_:2},1032,["onClick"])),[[V,"/plus/package/send"]]):j((m(),C(P,{key:1,onClick:a=>T.endClick(e.row.package_id),type:"primary",link:"",size:"small"},{default:k((()=>[f(" 终止 ")])),_:2},1032,["onClick"])),[[V,"/plus/package/send"]]),j((m(),C(P,{onClick:a=>T.orderClick(e.row.package_id),type:"primary",link:"",size:"small"},{default:k((()=>[f(" 购买记录 ")])),_:2},1032,["onClick"])),[[V,"/plus/package/orderlist"]]),j((m(),C(P,{onClick:a=>T.deleteClick(e.row.package_id),type:"primary",link:"",size:"small"},{default:k((()=>[f(" 删除 ")])),_:2},1032,["onClick"])),[[V,"/plus/package/delete"]])])),_:1})])),_:1},8,["data"])),[[B,S.loading]])])])),_:1},8,["model"]),u("div",x,[h(E,{onSizeChange:T.handleSizeChange,onCurrentChange:T.handleCurrentChange,background:"","current-page":S.curPage,"page-size":S.pageSize,layout:"total, prev, pager, next, jumper",total:S.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}]]);export{S as default};
