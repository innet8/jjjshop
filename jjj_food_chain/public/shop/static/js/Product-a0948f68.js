import{q as e,r as a,h as l,i as t,g as i,e as o,m as s,n,A as d,w as r,v as c}from"./element-plus-d03e850c.js";import{P as u}from"./product-4cea8dc2.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as g,T as h,S as m,a as f,P as y,W as _,Y as b,c as C,Q as k,a8 as S,$ as v}from"./@vue-e72ffbb6.js";const w={class:"common-seach-wrap"},z={class:"product-content"},V={class:"table-wrap"},I=["src"],x={class:"pagination"},D={class:"dialog-footer"};const L=p({data:()=>({loading:!0,curPage:1,pageSize:20,totalDataNumber:0,formInline:{category_id:0,search:""},cateList:[],productList:[],status:[{id:10,name:"上架"},{id:20,name:"下架"}],multipleSelection:[],formLabelWidth:"120px",dialogVisible:!1,type:"error",params:null}),props:["isproduct","excludeIds","islist","spec_type","product_type"],watch:{isproduct:function(e,a){e!=a&&e&&(this.dialogVisible=e,this.type="error",this.params=null,this.getData())}},created(){},methods:{selectableFunc:e=>"boolean"!=typeof e.noChoose||e.noChoose,handleCurrentChange(e){this.curPage=e,this.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},getData(){let e=this,a=e.formInline;a.page=e.curPage,a.list_rows=e.pageSize,a.spec_type=e.spec_type;let l=function(a){1==a.code&&(e.loading=!1,e.cateList=a.data.category,e.excludeIds&&void 0!==e.excludeIds&&e.excludeIds.length>0?a.data.list.data.forEach((a=>{e.excludeIds.indexOf(a.product_id)>-1?a.noChoose=!1:a.noChoose=!0})):e.islist||a.data.list.data.forEach((e=>{e.noChoose=!0})),e.productList=a.data.list.data,e.totalDataNumber=a.data.list.total)};0==e.product_type?u.takeProductList(a,!0).then((e=>{l(e)})):u.storeProductList(a,!0).then((e=>{l(e)}))},SingleFunc(e){this.multipleSelection=[e],this.addClerk()},addClerk(){let e=this,a=null;e.multipleSelection.length<1?e.$message({message:"请至少选择一件产品商品！",type:"error"}):(e.islist&&void 0!==e.islist?(e.multipleSelection.forEach((e=>{e.image=e.image[0].file_path})),a=e.multipleSelection):(a=e.multipleSelection[0],a.image=a.image[0].file_path),e.params=a,e.type="success",e.dialogVisible=!1)},dialogFormVisible(){this.formInline.category_id=0,this.formInline.search="",this.$emit("closeDialog",{type:this.type,openDialog:!1,params:this.params})},tableCurrentChange(e){this.multipleSelection=e}}},[["render",function(u,p,L,P,F,j){const E=e,N=a,U=l,W=t,$=i,q=o,A=s,O=n,Q=d,T=r,Y=c;return g(),h(T,{title:"选择商品",modelValue:F.dialogVisible,"onUpdate:modelValue":p[3]||(p[3]=e=>F.dialogVisible=e),onClose:j.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1,width:"900px"},{footer:m((()=>[f("div",D,[y(W,{size:"small",onClick:p[2]||(p[2]=e=>F.dialogVisible=!1)},{default:m((()=>[_("取 消")])),_:1}),L.islist?(g(),h(W,{key:0,size:"small",type:"primary",onClick:j.addClerk},{default:m((()=>[_("确 定")])),_:1},8,["onClick"])):b("",!0)])])),default:m((()=>[f("div",w,[y(q,{inline:!0,size:"small",model:F.formInline,class:"demo-form-inline"},{default:m((()=>[y(U,{label:"商品分类"},{default:m((()=>[y(N,{modelValue:F.formInline.category_id,"onUpdate:modelValue":p[0]||(p[0]=e=>F.formInline.category_id=e),placeholder:"请选择商品分类"},{default:m((()=>[y(E,{value:0,label:"全部"}),(g(!0),C(k,null,S(F.cateList,(e=>(g(),C(k,{key:e.category_id},[y(E,{value:e.category_id,label:e.name},null,8,["value","label"]),(g(!0),C(k,null,S(e.child,(a=>(g(),C(k,{key:a.category_id},[void 0!==e.child?(g(),C(k,{key:0},[y(E,{value:a.category_id,label:a.name,style:{"padding-left":"30px"}},null,8,["value","label"]),(g(!0),C(k,null,S(a.child,(e=>(g(),C(k,{key:e.category_id},[void 0!==a.child?(g(),h(E,{key:0,value:e.category_id,label:e.name,style:{"padding-left":"60px"}},null,8,["value","label"])):b("",!0)],64)))),128))],64)):b("",!0)],64)))),128))],64)))),128))])),_:1},8,["modelValue"])])),_:1}),y(U,{label:"商品名称"},{default:m((()=>[y($,{placeholder:"请输入商品名称",modelValue:F.formInline.search,"onUpdate:modelValue":p[1]||(p[1]=e=>F.formInline.search=e)},{append:m((()=>[y(W,{icon:"Search",onClick:j.getData},{default:m((()=>[_(" 查询 ")])),_:1},8,["onClick"])])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["model"])]),f("div",z,[f("div",V,[v((g(),h(O,{size:"small",data:F.productList,border:"",style:{width:"100%"},"highlight-current-row":"",onSelectionChange:j.tableCurrentChange},{default:m((()=>[y(A,{width:"70",label:"商品图片"},{default:m((e=>[f("img",{src:e.row.image&&e.row.image[0]&&e.row.image[0].file_path,width:30,height:30},null,8,I)])),_:1}),y(A,{prop:"product_name",label:"商品名称"}),y(A,{prop:"category.name",width:"100",label:"商品分类"}),y(A,{prop:"create_time",width:"140",label:"添加时间"}),L.islist?(g(),h(A,{key:0,type:"selection",selectable:j.selectableFunc,width:"44"},null,8,["selectable"])):b("",!0),L.islist?b("",!0):(g(),h(A,{key:1,width:"80",label:"单选"},{default:m((e=>[e.row.noChoose?(g(),h(W,{key:0,size:"",onClick:a=>j.SingleFunc(e.row)},{default:m((()=>[_("选择")])),_:2},1032,["onClick"])):(g(),h(W,{key:1,size:"",disabled:""},{default:m((()=>[_("已选")])),_:1}))])),_:1}))])),_:1},8,["data","onSelectionChange"])),[[Y,F.loading]])]),f("div",x,[y(Q,{onSizeChange:j.handleSizeChange,onCurrentChange:j.handleCurrentChange,background:"","current-page":F.curPage,"page-sizes":[2,10,20,50,100],"page-size":F.pageSize,layout:"total, prev, pager, next, jumper",total:F.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])),_:1},8,["modelValue","onClose"])}]]);export{L as _};
