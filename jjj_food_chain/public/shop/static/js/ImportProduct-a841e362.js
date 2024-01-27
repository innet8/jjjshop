import{E as e,m as t,i,n as a,A as l,w as s,v as o}from"./element-plus-b01b3a31.js";import{L as r}from"./live-70ec997a.js";import{_ as n}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as d,T as p,S as m,a as c,P as u,W as h,Y as g,$ as b}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-98f906e9.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const C={class:"product-content"},j={class:"table-wrap"},f=["src"],_={class:"pagination"},y={class:"dialog-footer"};const v=n({data:()=>({loading:!0,curPage:1,pageSize:20,totalDataNumber:0,formInline:{},categoryList:[],productList:[],status:[{id:10,name:"上架"},{id:20,name:"下架"}],multipleSelection:[],formLabelWidth:"120px",dialogVisible:!1,type:"error",params:null,excludeIds:[]}),props:["open_import","islist","room_id"],created(){this.dialogVisible=this.open_import,this.getData()},methods:{selectableFunc:e=>"boolean"!=typeof e.noChoose||e.noChoose,handleCurrentChange(e){this.curPage=e,this.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},getData(){let e=this,t=e.formInline;t.page=e.curPage,t.list_rows=e.pageSize,t.room_id=e.room_id,r.listProduct(t,!0).then((t=>{1==t.code&&(e.loading=!1,e.excludeIds=t.data.excludeIds,e.excludeIds&&void 0!==e.excludeIds&&e.excludeIds.length>0?t.data.list.data.forEach((t=>{e.excludeIds.indexOf(t.goods_id)>-1?t.noChoose=!1:t.noChoose=!0})):e.islist||t.data.list.data.forEach((e=>{e.noChoose=!0})),e.productList=t.data.list.data,e.totalDataNumber=t.data.list.total)})).catch((e=>{}))},SingleFunc(e){this.multipleSelection=[e],this.addClerk()},addClerk(){let t=this,i=null;t.multipleSelection.length<1?e({message:"请至少选择一件产品商品！",type:"error"}):(t.islist&&void 0!==t.islist?(t.multipleSelection.forEach((e=>{e.image=e.imagePath})),i=t.multipleSelection):(i=t.multipleSelection[0],i.image=i.imagePath),t.params=i,t.type="success",t.dialogVisible=!1)},dialogFormVisible(){this.$emit("closeDialog",{type:this.type,openDialog:!1,params:this.params})},tableCurrentChange(e){this.multipleSelection=e}}},[["render",function(e,r,n,v,S,w){const x=t,z=i,k=a,V=l,I=s,D=o;return d(),p(I,{title:"选择商品",modelValue:S.dialogVisible,"onUpdate:modelValue":r[1]||(r[1]=e=>S.dialogVisible=e),onClose:w.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1,"modal-append-to-body":!0,"append-to-body":!0,width:"900px"},{footer:m((()=>[c("div",y,[u(z,{size:"small",onClick:r[0]||(r[0]=e=>S.dialogVisible=!1)},{default:m((()=>[h("取 消")])),_:1}),n.islist?(d(),p(z,{key:0,size:"small",type:"primary",onClick:w.addClerk},{default:m((()=>[h("确 定")])),_:1},8,["onClick"])):g("",!0)])])),default:m((()=>[c("div",C,[c("div",j,[b((d(),p(k,{size:"small",data:S.productList,border:"",style:{width:"100%"},"highlight-current-row":"",onSelectionChange:w.tableCurrentChange},{default:m((()=>[u(x,{width:"70",label:"商品图片"},{default:m((e=>[c("img",{src:e.row.cover_img,width:"30",height:"30"},null,8,f)])),_:1}),u(x,{prop:"name",label:"商品名称"}),u(x,{prop:"price_type_text",label:"价格类型"}),u(x,{prop:"price_text",label:"价格",width:"200"}),u(x,{prop:"create_time",width:"140",label:"添加时间"}),n.islist?(d(),p(x,{key:0,type:"selection",selectable:w.selectableFunc,width:"44"},null,8,["selectable"])):g("",!0),n.islist?g("",!0):(d(),p(x,{key:1,width:"80",label:"单选"},{default:m((e=>[e.row.noChoose?(d(),p(z,{key:0,size:"small",onClick:t=>w.SingleFunc(e.row)},{default:m((()=>[h("选择")])),_:2},1032,["onClick"])):(d(),p(z,{key:1,size:"small",disabled:""},{default:m((()=>[h("已选")])),_:1}))])),_:1}))])),_:1},8,["data","onSelectionChange"])),[[D,S.loading]])]),c("div",_,[u(V,{onSizeChange:w.handleSizeChange,onCurrentChange:w.handleCurrentChange,background:"","current-page":S.curPage,"page-sizes":[2,10,20,50,100],"page-size":S.pageSize,layout:"total, prev, pager, next, jumper",total:S.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])),_:1},8,["modelValue","onClose"])}],["__scopeId","data-v-31d5dcc6"]]);export{v as default};
