import{d as e,i as t,D as a,g as o,h as i,e as s,m as l,o as r,B as n,v as d}from"./element-plus-c8084613.js";import{L as p}from"./live-0cb25b5a.js";import c from"./LiveProduct-39c82320.js";import m from"./Add-26311a32.js";import u from"./Edit-22bcb0ae.js";import{_ as h}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as _,o as g,c as j,a as y,O as v,R as C,V as k,_ as f,S as b,W as D,X as z}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-1fcbfc88.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./ImportProduct-e76f0e32.js";import"./Upload-b8929a72.js";import"./file-15b9ada8.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";const P={class:"d-s-c"},S={class:"ml20 flex-1 d-b-c"},w={class:"live-list"},x={class:"table-wrap"},F={key:0,class:"gray"},E={key:1,class:"red"},L={class:"table-buttons"},V={class:"pagination"};const M=h({components:{LiveProduct:c,Add:m,Edit:u},data:()=>({searchForm:{},loading:!0,pageSize:10,openAdd:!0,totalDataNumber:0,curPage:1,tableData:[],open_liveProduct:!1,room_id:0,live_id:0,open_add:!1,open_edit:!1,roomModel:{},auto_syn:!1}),created(){this.getData()},methods:{convertStatus(e){let t="";switch(e){case 101:t="直播中";break;case 102:t="未开始";break;case 103:t="已结束";break;case 104:t="禁播";break;case 105:t="暂停";break;case 106:t="异常";break;case 107:t="已过期"}return t},onSubmit(){this.curPage=1,this.getData()},handleCurrentChange(e){this.curPage=e,this.getData()},handleSizeChange(e){this.pageSize=e,this.getData()},getData(){let e=this,t=e.searchForm;t.page=e.curPage,t.list_rows=e.pageSize,e.loading=!0,p.getList(t,!0).then((t=>{e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total,e.auto_syn=t.data.auto_syn,e.loading=!1})).catch((t=>{e.loading=!1}))},synLive(){let e=this;e.loading=!0,p.syn({},!0).then((t=>{e.loading=!1,e.curPage=1,e.getData()})).catch((t=>{e.loading=!1}))},addClick(){this.open_add=!0},editClick(e){this.roomModel=e,this.open_edit=!0},closeDialogFunc(e,t){"add"==t&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==t&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData()),"product"==t&&(this.open_liveProduct=e.openDialog,"success"==e.type&&this.getData())},setTop(e){let t=this;p.settop({live_id:e.live_id,is_top:0==e.is_top?1:0}).then((e=>{this.$ElMessage({message:"置顶成功",type:"success"}),t.getData()}))},delClick(t){let a=this;e.confirm("删除后不可恢复，确认删除吗？","提示",{type:"warning"}).then((()=>{p.deleteRoom({live_id:t.live_id}).then((e=>{this.$ElMessage({message:"删除成功",type:"success"}),a.getData()}))}))},openClick(e){this.room_id=e.roomid,this.live_id=e.live_id,this.open_liveProduct=!0},setSyn(){let e=this;p.setSyn({auto_syn:e.auto_syn}).then((t=>{this.$ElMessage({message:"设置成功",type:"success"}),e.getData()}))}}},[["render",function(e,p,c,m,u,h){const M=t,A=a,I=o,$=i,N=s,U=l,q=r,B=n,R=_("LiveProduct"),T=_("Add"),W=_("Edit"),X=d;return g(),j("div",null,[y("div",P,[y("div",S,[v(M,{type:"primary",size:"small",icon:"Plus",onClick:h.addClick},{default:C((()=>[k("创建直播")])),_:1},8,["onClick"]),v(M,{type:"primary",size:"small",icon:"Plus",onClick:h.synLive},{default:C((()=>[k("同步直播")])),_:1},8,["onClick"]),y("div",null,[k("自动同步："),v(A,{modelValue:u.auto_syn,"onUpdate:modelValue":p[0]||(p[0]=e=>u.auto_syn=e),onChange:h.setSyn},null,8,["modelValue","onChange"])]),v(N,{size:"small",inline:!0,model:u.searchForm,class:"demo-form-inline"},{default:C((()=>[v($,{label:""},{default:C((()=>[v(I,{modelValue:u.searchForm.search,"onUpdate:modelValue":p[1]||(p[1]=e=>u.searchForm.search=e),placeholder:"请输入直播间名称/主播昵称"},null,8,["modelValue"])])),_:1}),v($,null,{default:C((()=>[v(M,{class:"search-button",type:"primary",icon:"Search",onClick:h.onSubmit},{default:C((()=>[k("查询")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])])]),y("div",w,[y("div",x,[f((g(),b(q,{size:"small",data:u.tableData,border:"",style:{width:"100%"}},{default:C((()=>[v(U,{prop:"roomid",label:"直播间ID"}),v(U,{prop:"name",label:"直播间名称"}),v(U,{prop:"anchor_name",label:"主播昵称"}),v(U,{prop:"start_time_text",label:"直播开始时间"}),v(U,{prop:"end_time_text",label:"直播结束时间"}),v(U,{prop:"live_status",label:"直播间状态"},{default:C((e=>[k(D(h.convertStatus(e.row.live_status)),1)])),_:1}),v(U,{prop:"is_top",label:"置顶"},{default:C((e=>[0==e.row.is_top?(g(),j("span",F,"未置顶")):(g(),j("span",E,"已置顶"))])),_:1}),v(U,{fixed:"right",label:"操作",width:"200"},{default:C((e=>[y("div",L,[v(M,{onClick:t=>h.openClick(e.row),type:"primary",link:"",size:"small"},{default:C((()=>[k("商品")])),_:2},1032,["onClick"]),v(M,{onClick:t=>h.delClick(e.row),type:"primary",link:"",size:"small"},{default:C((()=>[k("删除")])),_:2},1032,["onClick"]),v(M,{onClick:t=>h.editClick(e.row),type:"primary",link:"",size:"small"},{default:C((()=>[k("编辑")])),_:2},1032,["onClick"]),v(M,{onClick:t=>h.setTop(e.row),type:"primary",link:"",size:"small"},{default:C((()=>[k(D(0==e.row.is_top?"设为置顶":"取消置顶"),1)])),_:2},1032,["onClick"])])])),_:1})])),_:1},8,["data"])),[[X,u.loading]])])]),y("div",V,[v(B,{onSizeChange:h.handleSizeChange,onCurrentChange:h.handleCurrentChange,background:"","current-page":u.curPage,"page-size":u.pageSize,layout:"total, prev, pager, next, jumper",total:u.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])]),u.open_liveProduct?(g(),b(R,{key:0,open_liveProduct:u.open_liveProduct,room_id:u.room_id,live_id:u.live_id,onCloseDialog:p[2]||(p[2]=e=>h.closeDialogFunc(e,"product"))},null,8,["open_liveProduct","room_id","live_id"])):z("",!0),u.open_add?(g(),b(T,{key:1,open_add:u.open_add,onCloseDialog:p[3]||(p[3]=e=>h.closeDialogFunc(e,"add"))},null,8,["open_add"])):z("",!0),u.open_edit?(g(),b(W,{key:2,open_edit:u.open_edit,editform:u.roomModel,onCloseDialog:p[4]||(p[4]=e=>h.closeDialogFunc(e,"edit"))},null,8,["open_edit","editform"])):z("",!0)])}],["__scopeId","data-v-15c684d0"]]);export{M as default};