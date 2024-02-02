import{d as e,g as a,h as t,p as l,q as o,i,e as s,m as r,o as d,B as p,v as n}from"./element-plus-c8084613.js";import{S as m}from"./store-56ee26fd.js";import c from"./add-feb33842.js";import u from"./edit-4693d1c4.js";import"./qs-49804a56.js";import _ from"./Qrcode-1350b89f.js";import{_ as h}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as b,an as g,o as f,c as y,a as j,O as C,R as k,P as $,a7 as v,S as D,V as z,W as w,_ as S,X as q}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-7d657154.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./vue-qrcode-a92880f3.js";import"./qrcode-fb057d44.js";import"./encode-utf8-2ec93547.js";import"./dijkstrajs-38d0b2a1.js";const x={class:"product"},V={class:"common-level-rail flex"},P={class:"product-content"},M={class:"table-wrap"},Q={class:"pagination"};const A=h({components:{Add:c,Edit:u,Qrcode:_},data:()=>({loading:!0,tableData:[],open_add:!1,open_edit:!1,categoryModel:{model:""},form:{search:"",area_id:"",type_id:""},type_list:[],area_list:[],source:"wx",pageSize:20,totalDataNumber:0,curPage:1,isqrcode:!1,code_id:""}),created(){this.getData()},methods:{handleCurrentChange(e){this.curPage=e,this.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},getData(){let e=this;e.loading=!0;let a=e.form;a.page=e.curPage,a.list_rows=e.pageSize,m.tablelist(a,!0).then((a=>{e.loading=!1,e.tableData=a.data.list.data,e.totalDataNumber=a.data.list.total,e.type_list=a.data.type_list,e.area_list=a.data.area_list,e.categoryModel=a.data.list.data})).catch((a=>{e.loading=!1}))},addClick(){this.open_add=!0},editClick(e){this.categoryModel.model=e,this.open_edit=!0},closeDialogFunc(e,a){"add"==a&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==a&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},deleteClick(a){let t=this;e.confirm($t("删除后不可恢复，确认删除吗？"),$t("提示"),{type:"warning"}).then((()=>{m.deleteTable({table_id:a.table_id}).then((e=>{this.$ElMessage({message:$t("删除成功"),type:"success"}),t.getData()}))}))},qrcode(e){this.code_id=e.table_id,this.isqrcode=!0},closeQrcode(){this.isqrcode=!1},onSubmit(){this.curPage=1,this.getData()}}},[["render",function(e,m,c,u,_,h){const A=a,E=t,F=l,N=o,U=i,B=s,I=r,G=d,H=b("Add"),J=b("Edit"),K=p,L=b("Qrcode"),O=g("auth"),R=n;return f(),y("div",x,[j("div",V,[C(B,{size:"small",inline:!0,model:_.form,class:"demo-form-inline d-s-c"},{default:k((()=>[C(E,{label:e.$t("桌位名称")},{default:k((()=>[C(A,{modelValue:_.form.search,"onUpdate:modelValue":m[0]||(m[0]=e=>_.form.search=e),autocomplete:"off",placeholder:e.$t("桌位名称")},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),C(E,{label:e.$t("选择区域")},{default:k((()=>[C(N,{size:"small",modelValue:_.form.area_id,"onUpdate:modelValue":m[1]||(m[1]=e=>_.form.area_id=e),placeholder:e.$t("请选择")},{default:k((()=>[C(F,{label:e.$t("全部"),value:""},null,8,["label"]),(f(!0),y($,null,v(_.area_list,((e,a)=>(f(),D(F,{key:a,label:e.area_name,value:e.area_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"]),C(E,{label:e.$t("选择类型")},{default:k((()=>[C(N,{size:"small",modelValue:_.form.type_id,"onUpdate:modelValue":m[2]||(m[2]=e=>_.form.type_id=e),placeholder:e.$t("请选择")},{default:k((()=>[C(F,{label:e.$t("全部"),value:""},null,8,["label"]),(f(!0),y($,null,v(_.type_list,((e,a)=>(f(),D(F,{key:a,label:e.type_name,value:e.type_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"]),C(E,null,{default:k((()=>[C(U,{class:"search-button",type:"primary",icon:"Search",onClick:h.onSubmit},{default:k((()=>[z(w(e.$t("查询")),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"]),S((f(),D(U,{size:"small",type:"primary",onClick:h.addClick,icon:"Plus"},{default:k((()=>[z(w(e.$t("添加桌位")),1)])),_:1},8,["onClick"])),[[O,"/supplier/table/table/add"]])]),j("div",P,[j("div",M,[S((f(),D(G,{size:"small",data:_.tableData,style:{width:"100%"}},{default:k((()=>[C(I,{prop:"table_id",label:"ID"}),C(I,{prop:"area_name",label:e.$t("所属区域")},null,8,["label"]),C(I,{prop:"type_name",label:e.$t("所属类型")},null,8,["label"]),C(I,{prop:"table_no",label:e.$t("人数区间")},{default:k((e=>[z(w(e.row.min_num)+"-"+w(e.row.max_num)+"人 ",1)])),_:1},8,["label"]),C(I,{prop:"table_no",label:e.$t("桌位名称")},null,8,["label"]),C(I,{prop:"sort",label:e.$t("排序")},null,8,["label"]),C(I,{prop:"create_time",label:e.$t("添加时间")},null,8,["label"]),C(I,{fixed:"right",label:e.$t("操作"),width:"190"},{default:k((a=>[S((f(),D(U,{onClick:e=>h.qrcode(a.row),type:"primary",link:"",size:"small"},{default:k((()=>[z(w(e.$t("二维码")),1)])),_:2},1032,["onClick"])),[[O,"/supplier/table/table/edit"]]),S((f(),D(U,{onClick:e=>h.editClick(a.row),type:"primary",link:"",size:"small"},{default:k((()=>[z(w(e.$t("编辑")),1)])),_:2},1032,["onClick"])),[[O,"/supplier/table/table/edit"]]),S((f(),D(U,{onClick:e=>h.deleteClick(a.row),type:"primary",disabled:30==a.row.status,link:"",size:"small"},{default:k((()=>[z(w(e.$t("删除")),1)])),_:2},1032,["onClick","disabled"])),[[O,"/supplier/table/table/delete"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[R,_.loading]])])]),_.open_add?(f(),D(H,{key:0,open_add:_.open_add,type:_.type_list,area_list:_.area_list,addform:_.categoryModel,onCloseDialog:m[3]||(m[3]=e=>h.closeDialogFunc(e,"add"))},null,8,["open_add","type","area_list","addform"])):q("",!0),_.open_edit?(f(),D(J,{key:1,open_edit:_.open_edit,editform:_.categoryModel,type:_.type_list,area_list:_.area_list,onCloseDialog:m[4]||(m[4]=e=>h.closeDialogFunc(e,"edit"))},null,8,["open_edit","editform","type","area_list"])):q("",!0),j("div",Q,[C(K,{onSizeChange:h.handleSizeChange,onCurrentChange:h.handleCurrentChange,background:"","current-page":_.curPage,"page-size":_.pageSize,layout:"total, prev, pager, next, jumper",total:_.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])]),C(L,{open:_.isqrcode,code_id:_.code_id,onClose:h.closeQrcode},null,8,["open","code_id","onClose"])])}]]);export{A as default};
