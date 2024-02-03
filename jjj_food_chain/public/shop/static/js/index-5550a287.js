import{d as e,Q as t,h as a,p as l,q as o,g as r,i as s,e as i,m as d,D as c,o as p,B as u,v as n}from"./element-plus-c8084613.js";import{P as m}from"./product-10aae3cd.js";import{_ as h}from"./_plugin-vue_export-helper-1b428a4d.js";import{an as g,o as _,c as b,a as y,O as $,R as v,W as j,V as f,_ as C,S as k}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-b693dc4f.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const w={class:"product-list"},z={class:"common-seach-wrap"},D=["onClick"],x={class:"product-content"},V={class:"table-wrap"},S={class:"product-info"},P={class:"pic"},F={alt:""},N={class:"info"},q={class:"name"},L={class:"price"},U={class:"pagination"};const I=h({components:{},data:()=>({activeName:"",stock:"",activeIndex:"0",loading:!0,pageSize:10,totalDataNumber:0,curPage:1,searchForm:{product_name:"",category_id:""},tableData:[],categoryList:[],product_count:{}}),created(){this.$route.query.inventory&&(this.stock=10,this.$route.query={}),this.getData()},methods:{handleCurrentChange(e){let t=this;t.loading=!0,t.curPage=e,t.getData()},handleSizeChange(e){this.pageSize=e,this.getData()},handleClick(e,t){this.curPage=1,this.getData()},getData(){let e=this,t=e.searchForm;t.page=e.curPage,t.list_rows=e.pageSize,t.type=e.activeName,t.stock=e.stock,"object"==typeof t.category_id&&t.category_id&&(t.category_id=Number(t.category_id[t.category_id.length-1])),e.loading=!0,m.storeProductList(t,!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.categoryList=[],t.data.category.map(((t,a)=>{e.categoryList.push({value:t.category_id,label:t.name_text,children:[]}),t.child.map(((t,l)=>{e.categoryList[a].children.push({value:t.category_id,label:t.name_text})}))})),e.totalDataNumber=t.data.list.total,e.product_count=t.data.product_count})).catch((t=>{e.loading=!1}))},onSubmit(){this.curPage=1,this.getData()},addClick(){this.$router.push("/product/store/product/add")},editClick(e){this.$router.push({path:"/product/store/product/edit",query:{product_id:e.product_id,scene:"edit"}})},undercarriage(t,a){let l=this,o="",r="";20==a?(o=$t("强制下架"),r=$t("下架")):10==a&&(o=$t("重新上架"),r=$t("上架")),e.confirm($t("确认要")+o+$t("吗?"),$t("提示"),{type:"warning"}).then((()=>{m.storeStateProduct({product_id:t.product_id,state:a}).then((e=>{this.$ElMessage({message:r+$t("成功"),type:"success"}),l.getData()}))}))},copyClick(e){this.$router.push({path:"/product/product/edit",query:{product_id:e.product_id,scene:"copy"}})},deleteClick:function(t){let a=this;e.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{type:"warning"}).then((()=>{m.storeDelProduct({product_id:t.product_id}).then((e=>{this.$ElMessage({message:$t("删除成功"),type:"success"}),a.getData()}))}))},handleValue(e){this.searchForm.category_id=[],this.searchForm.category_id=e.value}}},[["render",function(e,m,h,I,B,E){const M=t,A=a,G=l,J=o,O=r,Q=s,R=i,T=d,W=c,H=p,K=u,X=g("auth"),Y=g("img-url"),Z=n;return _(),b("div",w,[y("div",z,[$(R,{size:"small",inline:!0,model:B.searchForm,class:"demo-form-inline"},{default:v((()=>[$(A,{label:e.$t("商品分类")},{default:v((()=>[$(M,{options:B.categoryList,props:{checkStrictly:!0,expandTrigger:"hover"},modelValue:B.searchForm.category_id,"onUpdate:modelValue":m[0]||(m[0]=e=>B.searchForm.category_id=e),clearable:"",placeholder:e.$t("请选择分类")},{default:v((({data:e})=>[y("span",{onClick:t=>E.handleValue(e)},j(e.label),9,D)])),_:1},8,["options","modelValue","placeholder"])])),_:1},8,["label"]),$(A,{label:e.$t("商品库存")},{default:v((()=>[$(J,{size:"small",modelValue:B.stock,"onUpdate:modelValue":m[1]||(m[1]=e=>B.stock=e),placeholder:e.$t("全部库存")},{default:v((()=>[$(G,{label:e.$t("全部"),value:" "},null,8,["label"]),$(G,{label:e.$t("库存低于10"),value:"10"},null,8,["label"]),$(G,{label:e.$t("库存低于20"),value:"20"},null,8,["label"]),$(G,{label:e.$t("库存低于50"),value:"50"},null,8,["label"])])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"]),$(A,{label:e.$t("商品状态")},{default:v((()=>[$(J,{size:"small",modelValue:B.activeName,"onUpdate:modelValue":m[2]||(m[2]=e=>B.activeName=e),placeholder:e.$t("商品状态")},{default:v((()=>[$(G,{label:e.$t("全部"),value:"all"},null,8,["label"]),$(G,{label:e.$t("上架中"),value:"sell"},null,8,["label"]),$(G,{label:e.$t("下架中"),value:"lower"},null,8,["label"])])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"]),$(A,{label:e.$t("商品名称")},{default:v((()=>[$(O,{size:"small",modelValue:B.searchForm.product_name,"onUpdate:modelValue":m[3]||(m[3]=e=>B.searchForm.product_name=e),placeholder:e.$t("请输入商品名称")},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),$(A,null,{default:v((()=>[$(Q,{class:"search-button",size:"small",type:"primary",icon:"Search",onClick:E.onSubmit},{default:v((()=>[f(j(e.$t("查询")),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"]),C((_(),k(Q,{size:"small",type:"primary",icon:"Plus",onClick:E.addClick},{default:v((()=>[f(j(e.$t("添加商品")),1)])),_:1},8,["onClick"])),[[X,"/product/store/product/add"]])]),y("div",x,[y("div",V,[C((_(),k(H,{size:"small",data:B.tableData,border:"",style:{width:"100%"}},{default:v((()=>[$(T,{prop:"product_name",label:e.$t("商品名称"),width:"400px"},{default:v((t=>[y("div",S,[y("div",P,[C(y("img",F,null,512),[[Y,t.row.image[0].file_path]])]),y("div",N,[y("div",q,j(t.row.product_name_text),1),y("div",L,j(e.$t("销售价："))+j(t.row.product_price),1)])])])),_:1},8,["label"]),$(T,{prop:"category.path_name_text",label:e.$t("分类")},null,8,["label"]),$(T,{prop:"sales_actual",label:e.$t("实际销量")},null,8,["label"]),$(T,{prop:"product_stock",label:e.$t("库存")},null,8,["label"]),$(T,{prop:"product_status.text",label:e.$t("状态"),width:"100"},{default:v((e=>[$(W,{disabled:!this.$filter.isAuth("/product/store/product/state"),"model-value":10==e.row.product_status.value,onClick:t=>E.undercarriage(e.row,10==e.row.product_status.value?20:10)},null,8,["disabled","model-value","onClick"])])),_:1},8,["label"]),$(T,{prop:"create_time",label:e.$t("添加时间")},null,8,["label"]),$(T,{prop:"product_sort",label:e.$t("排序")},null,8,["label"]),$(T,{fixed:"right",label:e.$t("操作"),width:"120"},{default:v((t=>[C((_(),k(Q,{onClick:e=>E.editClick(t.row),type:"primary",link:"",size:"small"},{default:v((()=>[f(j(e.$t("编辑")),1)])),_:2},1032,["onClick"])),[[X,"/product/store/product/edit"]]),C((_(),k(Q,{onClick:e=>E.deleteClick(t.row),type:"primary",link:"",size:"small"},{default:v((()=>[f(j(e.$t("删除")),1)])),_:2},1032,["onClick"])),[[X,"/product/store/product/delete"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[Z,B.loading]])])]),y("div",U,[$(K,{onSizeChange:E.handleSizeChange,onCurrentChange:E.handleCurrentChange,background:"","current-page":B.curPage,"page-size":B.pageSize,layout:"total, prev, pager, next, jumper",total:B.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])}],["__scopeId","data-v-ae1ee110"]]);export{I as default};