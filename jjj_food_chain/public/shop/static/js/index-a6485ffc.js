import{d as e,i as t,m as s,D as a,o as i,B as o,v as l}from"./element-plus-c8084613.js";import{A as r}from"./index-2b27d1a3.js";import n from"./Add-3c2ceb4f.js";import p from"./Edit-f94296c3.js";import{_ as d}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as u,an as c,o as m,c as h,a as g,_,S as j,R as b,V as C,W as y,O as f,P as w,a7 as v,X as k}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const $={class:"user"},L={class:"common-level-rail"},z={class:"product-content"},S={class:"table-wrap"},T={key:0},x={key:1},D={class:"pagination"};const E=d({components:{Add:n,Edit:p},inject:["reload"],data:()=>({loading:!0,role_loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,formInline:{user:"",region:""},open_add:!1,open_edit:!1,curModel:{},roleList:[]}),created(){this.getTableList()},methods:{handleCurrentChange(e){let t=this;t.curPage=e,t.loading=!0,t.getTableList()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getTableList()},getTableList(){let e=this,t={};t.page=e.curPage,t.list_rows=e.pageSize,r.userList(t,!0).then((t=>{e.loading=!1,e.roleList=t.data.roleList,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((e=>{}))},addClick(){this.open_add=!0},closeAdd(e){this.open_add=!1,e&&"success"==e.type&&this.getTableList()},editClick(e){this.curModel=e,this.open_edit=!0},closeEdit(e){this.open_edit=!1,e&&"success"==e.type&&this.getTableList()},isShowFunc(e){if(1==e.cashier_online)return void this.$ElMessage({message:$t("当前人员未交班，请先交班"),type:"error"});let t=this;r.setStatus({shop_user_id:e.shop_user_id,status:1==e.is_status?0:1},!0).then((e=>{1==e.code&&(this.$ElMessage({message:e.msg,type:"success"}),t.getTableList())})).catch((e=>{t.loading=!1}))},deleteClick(t){let s=this;e.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{confirmButtonText:$t("确定"),cancelButtonText:$t("取消"),type:"warning"}).then((()=>{s.loading=!0,r.userDelete({shop_user_id:t.shop_user_id},!0).then((e=>{s.loading=!1,1==e.code?(this.$ElMessage({message:$t("删除成功"),type:"success"}),s.getTableList()):s.loading=!1})).catch((e=>{s.loading=!1}))})).catch((()=>{}))}}},[["render",function(e,r,n,p,d,E){const A=t,P=s,M=a,B=i,I=o,N=u("Add"),q=u("Edit"),F=c("auth"),R=l;return m(),h("div",$,[g("div",L,[_((m(),j(A,{size:"small",type:"primary",icon:"Plus",onClick:E.addClick},{default:b((()=>[C(y(e.$t("添加管理员")),1)])),_:1},8,["onClick"])),[[F,"/auth/user/add"]])]),g("div",z,[g("div",S,[_((m(),j(B,{size:"small",data:d.tableData,border:"",style:{width:"100%"}},{default:b((()=>[f(P,{prop:"shop_user_id",label:"ID"}),f(P,{prop:"user_name",label:e.$t("用户名")},null,8,["label"]),f(P,{prop:"real_name",label:e.$t("姓名")},null,8,["label"]),f(P,{prop:"role.role_name",label:e.$t("角色")},{default:b((t=>[0==t.row.is_super?(m(),h("div",T,[(m(!0),h(w,null,v(t.row.userRole,((e,t)=>(m(),h("span",{class:"mr10",key:t},y(e.role.role_name),1)))),128))])):k("",!0),1==t.row.is_super?(m(),h("div",x,y(e.$t("超级管理员")),1)):k("",!0)])),_:1},8,["label"]),f(P,{prop:"is_status",label:e.$t("状态"),width:"80"},{default:b((e=>[f(M,{disabled:!(e.row.is_super<1||1==e.row.is_super&&1==e.row.user_type)||!this.$filter.isAuth("/auth/user/state"),"model-value":e.row.is_status,"active-value":0,"inactive-value":1,onClick:t=>E.isShowFunc(e.row)},null,8,["disabled","model-value","onClick"])])),_:1},8,["label"]),f(P,{prop:"create_time",label:e.$t("添加时间")},null,8,["label"]),f(P,{fixed:"right",label:e.$t("操作"),width:"120"},{default:b((t=>[t.row.is_super<1?_((m(),j(A,{key:0,onClick:e=>E.editClick(t.row),type:"primary",link:"",size:"small"},{default:b((()=>[C(y(e.$t("编辑")),1)])),_:2},1032,["onClick"])),[[F,"/auth/user/edit"]]):k("",!0),t.row.is_super<1||1==t.row.is_super&&1==t.row.user_type?_((m(),j(A,{key:1,onClick:e=>E.deleteClick(t.row),type:"primary",link:"",size:"small"},{default:b((()=>[C(y(e.$t("删除")),1)])),_:2},1032,["onClick"])),[[F,"/auth/user/delete"]]):k("",!0)])),_:1},8,["label"])])),_:1},8,["data"])),[[R,d.loading]])]),g("div",D,[f(I,{onSizeChange:E.handleSizeChange,onCurrentChange:E.handleCurrentChange,background:"","current-page":d.curPage,"page-size":d.pageSize,layout:"total, prev, pager, next, jumper",total:d.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),f(N,{open:d.open_add,roleList:d.roleList,onClose:E.closeAdd},null,8,["open","roleList","onClose"]),f(q,{open:d.open_edit,roleList:d.roleList,shop_user_id:d.curModel.shop_user_id,onClose:E.closeEdit},null,8,["open","roleList","shop_user_id","onClose"])])}]]);export{E as default};
