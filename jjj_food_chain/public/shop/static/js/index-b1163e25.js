import{d as t,i as e,m as a,o as s,B as i,v as o}from"./element-plus-bf694ad1.js";import{P as r}from"./points-88d8b34d.js";import{_ as l}from"./_plugin-vue_export-helper-1b428a4d.js";import{an as p,_ as n,o as d,c as u,a as c,S as m,R as g,V as h,O as j,W as _,X as b,bm as f,bk as v}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-191c97f6.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const C={components:{},data:()=>({tableData:[],pageSize:15,totalDataNumber:0,curPage:1,loading:!0,open_edit:!1,userModel:{},isproduct:!1,exclude_ids:[]}),created(){this.getTableList()},methods:{handleCurrentChange(t){let e=this;e.curPage=t,e.loading=!0,e.getTableList()},handleSizeChange(t){this.curPage=1,this.pageSize=t,this.getTableList()},getTableList(){let t=this,e={};e.page=t.curPage,e.list_rows=t.pageSize,r.productList(e,!0).then((e=>{t.exclude_ids=e.data.exclude_ids,t.tableData=e.data.list.data,t.totalDataNumber=e.data.list.total,t.loading=!1})).catch((e=>{t.loading=!1}))},changeProduct(t){this.$router.push("/plus/points/product/add")},editClick(t){this.$router.push({path:"/plus/points/product/edit",query:{product_id:t}})},onSubmit(){let t=this;t.form,t.loading=!0,t.getTableList()},deleteClick(e){let a=this;t.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{a.loading=!0,r.deleteProduct({id:e},!0).then((t=>{a.loading=!1,this.$ElMessage({message:t.msg,type:"success"}),a.getTableList()})).catch((t=>{a.loading=!1}))})).catch((()=>{a.loading=!1}))}}},y={class:"user"},w={class:"common-form d-s-c"},k=(t=>(f("data-v-a3708d47"),t=t(),v(),t))((()=>c("span",null,"活动商品",-1))),z={class:"ml20"},x={class:"product-content point-list"},P={class:"table-wrap"},S={class:"product-info"},T={class:"pic",style:{width:"40px",height:"40px"}},L={alt:""},D={class:"info"},B={class:"name"},q={class:"orange fb"},N={key:0,class:"green"},$={key:1,class:"gray"},I={class:"pagination"};const M=l(C,[["render",function(t,r,l,f,v,C){const M=e,E=a,G=s,J=i,O=p("auth"),R=p("img-url"),V=o;return n((d(),u("div",y,[c("div",w,[k,c("div",z,[n((d(),m(M,{type:"primary",size:"small",icon:"Plus",onClick:C.changeProduct},{default:g((()=>[h("添加商品")])),_:1},8,["onClick"])),[[O,"/plus/points/product/add"]])])]),c("div",x,[c("div",P,[j(G,{size:"small",data:v.tableData,border:"",style:{width:"100%"}},{default:g((()=>[j(E,{prop:"product_name",label:"商品名称",width:"360"},{default:g((t=>[c("div",S,[c("div",T,[n(c("img",L,null,512),[[R,t.row.file_path]])]),c("div",D,[c("div",B,_(t.row.product_name),1)])])])),_:1}),j(E,{label:"积分"},{default:g((t=>[h(_(t.row.product_points),1)])),_:1}),j(E,{label:"金额"},{default:g((t=>[c("span",q,_(t.row.product_price),1)])),_:1}),j(E,{prop:"limit_num",label:"限购数量"}),j(E,{prop:"product_stock",label:"活动库存"}),j(E,{prop:"product_sort",label:"排序"}),j(E,{label:"状态"},{default:g((t=>[10==t.row.product_status.value?(d(),u("span",N,"上架")):b("",!0),20==t.row.product_status.value?(d(),u("span",$,"下架")):b("",!0)])),_:1}),j(E,{fixed:"right",label:"操作",width:"120"},{default:g((t=>[n((d(),m(M,{onClick:e=>C.editClick(t.row.product_id),type:"primary",link:"",size:"small"},{default:g((()=>[h("编辑")])),_:2},1032,["onClick"])),[[O,"/plus/points/product/edit"]]),n((d(),m(M,{onClick:e=>C.deleteClick(t.row.product_id),type:"primary",link:"",size:"small"},{default:g((()=>[h("删除")])),_:2},1032,["onClick"])),[[O,"/plus/points/product/delete"]])])),_:1})])),_:1},8,["data"])]),c("div",I,[j(J,{onSizeChange:C.handleSizeChange,onCurrentChange:C.handleCurrentChange,background:"","current-page":v.curPage,"page-size":v.pageSize,layout:"total, prev, pager, next, jumper",total:v.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])),[[V,v.loading]])}],["__scopeId","data-v-a3708d47"]]);export{M as default};
