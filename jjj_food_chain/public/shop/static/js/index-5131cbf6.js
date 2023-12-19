import{E as e,k as t,e as a,q as o,c as i,d as s,b as l,l as n,m as d,n as r,v as p}from"./element-plus-7d357588.js";import{L as c}from"./live-55cce4f4.js";import m from"./LiveProduct-1b6d102e.js";import u from"./Add-c237338b.js";import _ from"./Edit-2e167901.js";import{_ as g}from"./index-f792122d.js";import{ag as h,o as v,c as y,a as C,P as b,S as j,W as k,$ as f,T as D,X as P,Y as z}from"./@vue-48c55b54.js";import"./@vueuse-c556fb5a.js";import"./lodash-es-c1acaa3d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-e0f4a3e8.js";import"./dayjs-9faf8871.js";import"./call-bind-0c463fe3.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./ImportProduct-07c15e6d.js";import"./Upload-22bade2e.js";/* empty css                                                               */import"./vue-router-b8ff3004.js";import"./pinia-73166104.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-942d6868.js";import"./side-channel-ba7aab8a.js";import"./object-inspect-860361a9.js";import"./vue-ueditor-wrap-cd29f9a1.js";const S={class:"d-s-c"},w={class:"ml20 flex-1 d-b-c"},x={class:"live-list"},F={class:"table-wrap"},L={key:0,class:"gray"},V={key:1,class:"red"},A={class:"table-buttons"},E={class:"pagination"};const N=g({components:{LiveProduct:m,Add:u,Edit:_},data:()=>({searchForm:{},loading:!0,pageSize:10,openAdd:!0,totalDataNumber:0,curPage:1,tableData:[],open_liveProduct:!1,room_id:0,live_id:0,open_add:!1,open_edit:!1,roomModel:{},auto_syn:!1}),created(){this.getData()},methods:{convertStatus(e){let t="";switch(e){case 101:t="直播中";break;case 102:t="未开始";break;case 103:t="已结束";break;case 104:t="禁播";break;case 105:t="暂停";break;case 106:t="异常";break;case 107:t="已过期"}return t},onSubmit(){this.curPage=1,this.getData()},handleCurrentChange(e){this.curPage=e,this.getData()},handleSizeChange(e){this.pageSize=e,this.getData()},getData(){let e=this,t=e.searchForm;t.page=e.curPage,t.list_rows=e.pageSize,e.loading=!0,c.getList(t,!0).then((t=>{e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total,e.auto_syn=t.data.auto_syn,e.loading=!1})).catch((t=>{e.loading=!1}))},synLive(){let e=this;e.loading=!0,c.syn({},!0).then((t=>{e.loading=!1,e.curPage=1,e.getData()})).catch((t=>{e.loading=!1}))},addClick(){this.open_add=!0},editClick(e){this.roomModel=e,this.open_edit=!0},closeDialogFunc(e,t){"add"==t&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==t&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData()),"product"==t&&(this.open_liveProduct=e.openDialog,"success"==e.type&&this.getData())},setTop(t){let a=this;c.settop({live_id:t.live_id,is_top:0==t.is_top?1:0}).then((t=>{e({message:"置顶成功",type:"success"}),a.getData()}))},delClick(a){let o=this;t.confirm("删除后不可恢复，确认删除该记录吗?","提示",{type:"warning"}).then((()=>{c.deleteRoom({live_id:a.live_id}).then((t=>{e({message:"删除成功",type:"success"}),o.getData()}))}))},openClick(e){this.room_id=e.roomid,this.live_id=e.live_id,this.open_liveProduct=!0},setSyn(){let t=this;c.setSyn({auto_syn:t.auto_syn}).then((a=>{e({message:"设置成功",type:"success"}),t.getData()}))}}},[["render",function(e,t,c,m,u,_){const g=a,N=o,U=i,q=s,M=l,T=n,I=d,K=r,O=h("LiveProduct"),Q=h("Add"),R=h("Edit"),W=p;return v(),y("div",null,[C("div",S,[C("div",w,[b(g,{type:"primary",size:"small",icon:"Plus",onClick:_.addClick},{default:j((()=>[k("创建直播")])),_:1},8,["onClick"]),b(g,{type:"primary",size:"small",icon:"Plus",onClick:_.synLive},{default:j((()=>[k("同步直播")])),_:1},8,["onClick"]),C("div",null,[k("自动同步："),b(N,{modelValue:u.auto_syn,"onUpdate:modelValue":t[0]||(t[0]=e=>u.auto_syn=e),onChange:_.setSyn},null,8,["modelValue","onChange"])]),b(M,{size:"small",inline:!0,model:u.searchForm,class:"demo-form-inline"},{default:j((()=>[b(q,{label:""},{default:j((()=>[b(U,{modelValue:u.searchForm.search,"onUpdate:modelValue":t[1]||(t[1]=e=>u.searchForm.search=e),placeholder:"请输入直播间名称/主播昵称"},null,8,["modelValue"])])),_:1}),b(q,null,{default:j((()=>[b(g,{type:"primary",icon:"Search",onClick:_.onSubmit},{default:j((()=>[k("查询")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])])]),C("div",x,[C("div",F,[f((v(),D(I,{size:"small",data:u.tableData,border:"",style:{width:"100%"}},{default:j((()=>[b(T,{prop:"roomid",label:"直播间ID"}),b(T,{prop:"name",label:"直播间名称"}),b(T,{prop:"anchor_name",label:"主播昵称"}),b(T,{prop:"start_time_text",label:"直播开始时间"}),b(T,{prop:"end_time_text",label:"直播结束时间"}),b(T,{prop:"live_status",label:"直播间状态"},{default:j((e=>[k(P(_.convertStatus(e.row.live_status)),1)])),_:1}),b(T,{prop:"is_top",label:"置顶"},{default:j((e=>[0==e.row.is_top?(v(),y("span",L,"未置顶")):(v(),y("span",V,"已置顶"))])),_:1}),b(T,{fixed:"right",label:"操作",width:"200"},{default:j((e=>[C("div",A,[b(g,{onClick:t=>_.openClick(e.row),type:"text",size:"small"},{default:j((()=>[k("商品")])),_:2},1032,["onClick"]),b(g,{onClick:t=>_.delClick(e.row),type:"text",size:"small"},{default:j((()=>[k("删除")])),_:2},1032,["onClick"]),b(g,{onClick:t=>_.editClick(e.row),type:"text",size:"small"},{default:j((()=>[k("编辑")])),_:2},1032,["onClick"]),b(g,{onClick:t=>_.setTop(e.row),type:"text",size:"small"},{default:j((()=>[k(P(0==e.row.is_top?"设为置顶":"取消置顶"),1)])),_:2},1032,["onClick"])])])),_:1})])),_:1},8,["data"])),[[W,u.loading]])])]),C("div",E,[b(K,{onSizeChange:_.handleSizeChange,onCurrentChange:_.handleCurrentChange,background:"","current-page":u.curPage,"page-size":u.pageSize,layout:"total, prev, pager, next, jumper",total:u.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])]),u.open_liveProduct?(v(),D(O,{key:0,open_liveProduct:u.open_liveProduct,room_id:u.room_id,live_id:u.live_id,onCloseDialog:t[2]||(t[2]=e=>_.closeDialogFunc(e,"product"))},null,8,["open_liveProduct","room_id","live_id"])):z("",!0),u.open_add?(v(),D(Q,{key:1,open_add:u.open_add,onCloseDialog:t[3]||(t[3]=e=>_.closeDialogFunc(e,"add"))},null,8,["open_add"])):z("",!0),u.open_edit?(v(),D(R,{key:2,open_edit:u.open_edit,editform:u.roomModel,onCloseDialog:t[4]||(t[4]=e=>_.closeDialogFunc(e,"edit"))},null,8,["open_edit","editform"])):z("",!0)])}]]);export{N as default};
