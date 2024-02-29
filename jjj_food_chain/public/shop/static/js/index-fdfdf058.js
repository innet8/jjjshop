import{d as t,E as e,p as a,q as l,h as s,g as i,i as o,e as r,m as d,D as n,o as p,B as u,v as m}from"./element-plus-bf694ad1.js";import c from"./addEdit-3982c60a.js";import{P as h}from"./product-73001759.js";import{_ as g}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as b,an as f,o as _,c as $,a as j,O as C,R as v,V as w,W as y,_ as D,S as k,X as z}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-64246316.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./productList-07fdde4a.js";const S={class:"buffet-list"},x={class:"common-seach-wrap"},F={class:"product-content"},B={class:"table-wrap"},P={class:"product-info"},E={class:"info"},V={class:"name"},q={class:"price"},A={class:"name"},M={class:"pagination"};const N=g({components:{addEdit:c},data:()=>({loading:!1,searchForm:{status:"",name:""},pageSize:10,totalDataNumber:0,curPage:1,tableData:[],open_dialog:!1,title:"",editData:""}),mounted(){this.getData()},methods:{onSubmit(){this.curPage=1,this.getData()},addClick(t){this.title=$t("添加自助餐"),this.open_dialog=!0},editClick(t){this.title=$t("编辑自助餐"),this.editData=t,this.open_dialog=!0},getData(){let t=this;t.loading=!0;let e={};e.name=t.searchForm.name,e.status=t.searchForm.status,e.page=t.curPage,e.list_rows=t.pageSize,h.getBuffetList(e,!0).then((e=>{t.loading=!1,t.tableData=e.data.list.data,t.totalDataNumber=e.data.list.total})).catch((t=>{}))},deleteClick(a){let l=this;t.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{confirmButtonText:$t("确定"),cancelButtonText:$t("取消"),type:"warning"}).then((()=>{l.loading=!0,h.deleteBuffet({buffet_id:a.id},!0).then((t=>{l.loading=!1,1==t.code?(this.$ElMessage({message:t.msg,type:"success"}),l.getData()):e.error($t("操作失败"))})).catch((t=>{l.loading=!1}))})).catch((()=>{}))},handleComb(e){let a=this,l="",s="";1==e.is_comb?(l=$t("确认要关闭组合吗?"),s=$t("关闭")):0==e.is_comb&&(l=$t("确认要开启组合吗?"),s=$t("开启")),t.confirm(l,$t("提示"),{type:"warning"}).then((()=>{h.combBuffet({buffet_id:e.id,is_comb:1==e.is_comb?0:1}).then((t=>{this.$ElMessage({message:s+$t("成功"),type:"success"}),a.getData()}))}))},handleStatus(e){let a=this,l="",s="";1==e.status?(l=$t("确认要强制下架吗?"),s=$t("下架")):0==e.status&&(l=$t("确认要重新上架吗?"),s=$t("上架")),t.confirm(l,$t("提示"),{type:"warning"}).then((()=>{h.stateBuffet({buffet_id:e.id,state:1==e.status?0:1}).then((t=>{this.$ElMessage({message:s+$t("成功"),type:"success"}),a.getData()}))}))},handleCurrentChange(t){this.curPage=t,this.getData()},handleSizeChange(t){this.pageSize=t,this.curPage=1,this.getData()},closeDialogFunc(t){this.open_dialog=t.openDialog,this.editData="","success"==t.type&&this.getData()}}},[["render",function(t,e,c,h,g,N){const I=a,L=l,T=s,U=i,G=o,J=r,O=d,R=n,W=p,X=u,H=b("addEdit"),K=f("auth"),Q=m;return _(),$("div",S,[j("div",x,[C(J,{size:"small",inline:!0,model:g.searchForm,class:"demo-form-inline"},{default:v((()=>[C(T,{label:t.$t("状态")},{default:v((()=>[C(L,{size:"small",modelValue:g.searchForm.status,"onUpdate:modelValue":e[0]||(e[0]=t=>g.searchForm.status=t),placeholder:t.$t("全部状态")},{default:v((()=>[C(I,{label:t.$t("全部状态"),value:""},null,8,["label"]),C(I,{label:t.$t("开启"),value:"1"},null,8,["label"]),C(I,{label:t.$t("关闭"),value:"0"},null,8,["label"])])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"]),C(T,{label:t.$t("自助餐名称")},{default:v((()=>[C(U,{size:"small",modelValue:g.searchForm.name,"onUpdate:modelValue":e[1]||(e[1]=t=>g.searchForm.name=t),placeholder:t.$t("请输入自助餐名称")},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),C(T,null,{default:v((()=>[C(G,{class:"search-button",size:"small",type:"primary",icon:"Search",onClick:N.onSubmit},{default:v((()=>[w(y(t.$t("查询")),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"]),D((_(),k(G,{size:"small",type:"primary",icon:"Plus",onClick:N.addClick},{default:v((()=>[w(y(t.$t("添加自助餐")),1)])),_:1},8,["onClick"])),[[K,"/product/buffet/list/add"]])]),j("div",F,[j("div",B,[D((_(),k(W,{size:"small",data:g.tableData,border:"",style:{width:"100%"}},{default:v((()=>[C(O,{prop:"name_text",label:t.$t("自助餐名称"),width:"400px"},{default:v((e=>[j("div",P,[j("div",E,[j("div",V,y(e.row.name_text),1),j("div",q,y(t.$t("销售价："))+y(e.row.price),1)])])])),_:1},8,["label"]),C(O,{prop:"sale_num",label:t.$t("实际销量")},null,8,["label"]),C(O,{prop:"time_limit",label:t.$t("用餐时间")},{default:v((e=>[j("div",A,y(0==e.row.time_limit?t.$t("不限制"):e.row.time_limit),1)])),_:1},8,["label"]),C(O,{prop:"is_comb",label:t.$t("组合"),width:"100"},{default:v((t=>[C(R,{disabled:!this.$filter.isAuth("/product/buffet/list/assembly"),"model-value":1==t.row.is_comb,onClick:e=>N.handleComb(t.row,1==t.row.is_comb?0:1)},null,8,["disabled","model-value","onClick"])])),_:1},8,["label"]),C(O,{prop:"status",label:t.$t("状态"),width:"100"},{default:v((t=>[C(R,{disabled:!this.$filter.isAuth("/product/buffet/list/status"),"model-value":1==t.row.status,onClick:e=>N.handleStatus(t.row)},null,8,["disabled","model-value","onClick"])])),_:1},8,["label"]),C(O,{prop:"create_time",label:t.$t("添加时间"),width:"180"},null,8,["label"]),C(O,{prop:"sort",label:t.$t("排序")},null,8,["label"]),C(O,{fixed:"right",label:t.$t("操作"),width:"120"},{default:v((e=>[D((_(),k(G,{onClick:t=>N.editClick(e.row),type:"primary",link:"",size:"small"},{default:v((()=>[w(y(t.$t("编辑")),1)])),_:2},1032,["onClick"])),[[K,"/product/buffet/list/edit"]]),D((_(),k(G,{onClick:t=>N.deleteClick(e.row),disabled:0==e.row.can_delete,type:"primary",link:"",size:"small"},{default:v((()=>[w(y(t.$t("删除")),1)])),_:2},1032,["onClick","disabled"])),[[K,"/product/buffet/list/delete"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[Q,g.loading]])])]),j("div",M,[C(X,{onSizeChange:N.handleSizeChange,onCurrentChange:N.handleCurrentChange,background:"","current-page":g.curPage,"page-size":g.pageSize,layout:"total, prev, pager, next, jumper",total:g.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])]),g.open_dialog?(_(),k(H,{key:0,title:g.title,open_dialog:g.open_dialog,editData:g.editData,onCloseDialog:e[2]||(e[2]=t=>N.closeDialogFunc(t))},null,8,["title","open_dialog","editData"])):z("",!0)])}],["__scopeId","data-v-90d25820"]]);export{N as default};
