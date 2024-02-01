import{i as e,g as l,h as a,e as r,m as o,o as i,B as t,u as s,v as p,w as u,x as m}from"./element-plus-c8084613.js";import{G as d}from"./group-ad8792db.js";import{_ as n}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as c,S as g,R as h,a as _,O as f,V as b,_ as y,X as F,W as j,c as V,bm as C,bk as v}from"./@vue-b57a05a6.js";import{_ as w}from"./Upload-e7579a9c.js";import{L as x}from"./live-13c7054d.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-74b65baf.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./file-9623813c.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";const k={class:"common-seach-wrap"},S={class:"product-content"},z={class:"table-wrap"},D=["src"],I={class:"pagination"};const U=n({data:()=>({loading:!0,curPage:1,pageSize:20,totalDataNumber:0,formInline:{search:""},productList:[],multipleSelection:[],formLabelWidth:"120px",dialogVisible:!1,type:"error",params:null}),props:["isgroup","excludeIds","islist"],watch:{isgroup:function(e,l){e!=l&&e&&(this.dialogVisible=e,this.type="error",this.params=null,this.getData())}},methods:{selectableFunc:e=>"boolean"!=typeof e.noChoose||e.noChoose,handleCurrentChange(e){this.curPage=e,this.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},getData(){let e=this,l=e.formInline;l.page=e.curPage,l.list_rows=e.pageSize;d.groupListData(l,!0).then((l=>{!function(l){1==l.code&&(e.loading=!1,e.productList=l.data.list.data,e.totalDataNumber=l.data.list.total)}(l)}))},SingleFunc(e){this.multipleSelection=[e],this.addClerk()},addClerk(){let e=this,l=null;e.multipleSelection.length<1?e.$message({message:"请至少选择一件产品商品！",type:"error"}):(e.islist&&void 0!==e.islist?(e.multipleSelection.forEach((e=>{e.image=e.image[0].file_path})),l=e.multipleSelection):(l=e.multipleSelection[0],l.image=l.image[0].file_path),e.params=l,e.type="success",e.dialogVisible=!1)},dialogFormVisible(){this.formInline.search="",this.$emit("closeDialog",{type:this.type,openDialog:!1,params:this.params})},tableCurrentChange(e){this.multipleSelection=e}}},[["render",function(u,m,d,n,j,V){const C=e,v=l,w=a,x=r,U=o,q=i,P=t,$=s,L=p;return c(),g($,{title:"选择团购",modelValue:j.dialogVisible,"onUpdate:modelValue":m[1]||(m[1]=e=>j.dialogVisible=e),onClose:V.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1,width:"900px"},{default:h((()=>[_("div",k,[f(x,{inline:!0,size:"small",model:j.formInline,class:"demo-form-inline"},{default:h((()=>[f(w,{label:"团购名称"},{default:h((()=>[f(v,{placeholder:"请输入团购名称",modelValue:j.formInline.search,"onUpdate:modelValue":m[0]||(m[0]=e=>j.formInline.search=e)},{append:h((()=>[f(C,{icon:"Search",onClick:V.getData},{default:h((()=>[b(" 查询 ")])),_:1},8,["onClick"])])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["model"])]),_("div",S,[_("div",z,[y((c(),g(q,{size:"small",data:j.productList,border:"",style:{width:"100%"},"highlight-current-row":"",onSelectionChange:V.tableCurrentChange},{default:h((()=>[f(U,{width:"70",label:"团购图片"},{default:h((e=>[_("img",{src:e.row.image&&e.row.image[0]&&e.row.image[0].file_path,width:30,height:30},null,8,D)])),_:1}),f(U,{prop:"group_name",label:"团购名称"}),f(U,{prop:"group_price",label:"团购价格"}),f(U,{prop:"create_time",width:"140",label:"添加时间"}),d.islist?(c(),g(U,{key:0,type:"selection",selectable:V.selectableFunc,width:"44"},null,8,["selectable"])):F("",!0),d.islist?F("",!0):(c(),g(U,{key:1,width:"80",label:"单选"},{default:h((e=>[f(C,{size:"",onClick:l=>V.SingleFunc(e.row)},{default:h((()=>[b("选择")])),_:2},1032,["onClick"])])),_:1}))])),_:1},8,["data","onSelectionChange"])),[[L,j.loading]])]),_("div",I,[f(P,{onSizeChange:V.handleSizeChange,onCurrentChange:V.handleCurrentChange,background:"","current-page":j.curPage,"page-sizes":[2,10,20,50,100],"page-size":j.pageSize,layout:"total, prev, pager, next, jumper",total:j.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])),_:1},8,["modelValue","onClose"])}],["__scopeId","data-v-f63ca3a9"]]),q={components:{Upload:w,Group:U},data:()=>({isupload:!1,productName:"",product_img:"",ruleForm:{name:"",cover_img:"",price_type:1,price:"",price2:"",product_id:"",shop_supplier_id:0},rules:{name:[{required:!0,message:"请输入商品名称",trigger:"blur"},{min:3,max:17,message:"长度在 3 到 17 个字符",trigger:"blur"}],price:[{required:!0,message:"请输入价格",trigger:"change"}]},loading:!1,isgroup:!1,exclude_ids:[],imageType:"",formLabelWidth:"120px",dialogVisible:!1}),props:["open_add"],watch:{open_add:function(e,l){e!=l&&(this.dialogVisible=e)}},created(){},methods:{closeFunc(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1}),this.$refs.ruleForm.resetFields()},submitForm(e){let l=this;l.loading=!0,l.$refs[e].validate((e=>{if(!e)return l.loading=!1,!1;{let e=l.ruleForm;x.addProduct(e,!0).then((e=>{l.loading=!1,this.$ElMessage({message:"创建成功",type:"success"}),this.dialogVisible=!1})).catch((e=>{l.loading=!1}))}}))},resetForm(e){this.$refs[e].resetFields(),this.productName="",this.product_img=""},openUpload(e){this.imageType=e,this.isupload=!0},closeProductFunc(e){"success"==e.type&&(this.ruleForm.product_id=e.params.group_id,this.product_img=e.params.image?e.params.image:"",this.productName=e.params.group_name,this.ruleForm.name=e.params.group_name,this.ruleForm.cover_img=e.params.image?e.params.image:""),this.isgroup=!1},cancelFunc(e){this.$emit("close",{type:"error"})},openProduct(){this.isgroup=!0},returnImgsFunc(e){null!=e&&e.length>0&&(this.ruleForm.cover_img=e[0].file_path),this.isupload=!1}}},P=["src"],$=["src"],L=(e=>(C("data-v-700d7f8d"),e=e(),v(),e))((()=>_("div",{class:"gray9"},"建议尺寸300*300,大小不超过2M",-1))),N={class:"dialog-footer"};const E=n(q,[["render",function(o,i,t,p,d,n){const y=e,C=a,v=l,x=w,k=u,S=m,z=r,D=U,I=s;return c(),g(I,{title:"添加商品","modal-append-to-body":!1,"before-close":n.closeFunc,modelValue:d.dialogVisible,"onUpdate:modelValue":i[12]||(i[12]=e=>d.dialogVisible=e),"close-on-click-modal":!1,"close-on-press-escape":!1,width:"500px"},{footer:h((()=>[_("div",N,[f(y,{size:"small",onClick:i[9]||(i[9]=e=>n.closeFunc())},{default:h((()=>[b("取 消")])),_:1}),f(y,{onClick:i[10]||(i[10]=e=>n.resetForm("ruleForm"))},{default:h((()=>[b("重置")])),_:1}),f(y,{type:"primary",onClick:i[11]||(i[11]=e=>n.submitForm("ruleForm")),loading:d.loading},{default:h((()=>[b("立即提交")])),_:1},8,["loading"])])])),default:h((()=>[f(z,{size:"small",model:d.ruleForm,rules:d.rules,ref:"ruleForm","label-width":"100px",class:"demo-ruleForm"},{default:h((()=>[f(C,{prop:"product_id",label:"选择商品",rules:[{required:!0,message:"请绑定商品"}]},{default:h((()=>[f(y,{onClick:i[0]||(i[0]=e=>n.openProduct())},{default:h((()=>[b("选择商品")])),_:1})])),_:1}),""!=d.ruleForm.product_id?(c(),g(C,{key:0},{default:h((()=>[b(j(d.productName),1)])),_:1})):F("",!0),f(C,null,{default:h((()=>[""!=d.product_img?(c(),V("img",{key:0,src:d.product_img,class:"mt10",width:120},null,8,P)):F("",!0)])),_:1}),f(C,{label:"商品名称",prop:"name"},{default:h((()=>[f(v,{modelValue:d.ruleForm.name,"onUpdate:modelValue":i[1]||(i[1]=e=>d.ruleForm.name=e)},null,8,["modelValue"])])),_:1}),f(C,{label:"商品封面图",prop:"cover_img",rules:[{required:!0,message:"请上传商品封面图"}]},{default:h((()=>[_("div",null,[f(y,{type:"primary",onClick:i[2]||(i[2]=e=>n.openUpload("cover"))},{default:h((()=>[b("上传图片")])),_:1}),""!=d.ruleForm.cover_img?(c(),V("img",{key:0,src:d.ruleForm.cover_img,class:"mt10",width:120},null,8,$)):F("",!0),L,d.isupload?(c(),g(x,{key:1,isupload:d.isupload,onReturnImgs:n.returnImgsFunc},{default:h((()=>[b("上传图片")])),_:1},8,["isupload","onReturnImgs"])):F("",!0)])])),_:1}),f(C,{label:"价格类型",prop:"type"},{default:h((()=>[f(S,{modelValue:d.ruleForm.price_type,"onUpdate:modelValue":i[3]||(i[3]=e=>d.ruleForm.price_type=e)},{default:h((()=>[f(k,{label:1},{default:h((()=>[b("一口价")])),_:1}),f(k,{label:2},{default:h((()=>[b("价格区间")])),_:1}),f(k,{label:3},{default:h((()=>[b("折扣价")])),_:1})])),_:1},8,["modelValue"])])),_:1}),1==d.ruleForm.price_type?(c(),g(C,{key:1,label:"价格：",prop:"price",rules:[{required:!0,message:"请输入最低价格",trigger:"change"}]},{default:h((()=>[f(v,{type:"text",min:"0",modelValue:d.ruleForm.price,"onUpdate:modelValue":i[4]||(i[4]=e=>d.ruleForm.price=e),class:"mb16 max-w460",placeholder:"请输入价格"},null,8,["modelValue"])])),_:1})):F("",!0),2==d.ruleForm.price_type?(c(),g(C,{key:2,label:"价格：",prop:"price",rules:[{required:!0,message:"请输入最低价格",trigger:"change"}]},{default:h((()=>[f(v,{type:"text",min:"0",modelValue:d.ruleForm.price,"onUpdate:modelValue":i[5]||(i[5]=e=>d.ruleForm.price=e),class:"mb16 max-w460",placeholder:"请输入最低价格"},null,8,["modelValue"])])),_:1})):F("",!0),2==d.ruleForm.price_type?(c(),g(C,{key:3,label:"价格：",prop:"price2",rules:[{required:!0,message:"请输入最高价格",trigger:"change"}]},{default:h((()=>[f(v,{type:"text",min:"0",modelValue:d.ruleForm.price2,"onUpdate:modelValue":i[6]||(i[6]=e=>d.ruleForm.price2=e),class:"mb16 max-w460",placeholder:"请输入最高价格"},null,8,["modelValue"])])),_:1})):F("",!0),3==d.ruleForm.price_type?(c(),g(C,{key:4,prop:"price",rules:[{required:!0,message:"请输入原价",trigger:"change"}],label:"价格："},{default:h((()=>[f(v,{type:"text",min:"0",modelValue:d.ruleForm.price,"onUpdate:modelValue":i[7]||(i[7]=e=>d.ruleForm.price=e),class:"mb16 max-w460",placeholder:"请输入原价"},null,8,["modelValue"])])),_:1})):F("",!0),3==d.ruleForm.price_type?(c(),g(C,{key:5,prop:"price2",rules:[{required:!0,message:"请输入现价",trigger:"change"}],label:"价格："},{default:h((()=>[f(v,{type:"text",min:"0",modelValue:d.ruleForm.price2,"onUpdate:modelValue":i[8]||(i[8]=e=>d.ruleForm.price2=e),class:"mb16 max-w460",placeholder:"请输入现价"},null,8,["modelValue"])])),_:1})):F("",!0)])),_:1},8,["model","rules"]),f(D,{isgroup:d.isgroup,excludeIds:d.exclude_ids,islist:!1,onCloseDialog:n.closeProductFunc},null,8,["isgroup","excludeIds","onCloseDialog"])])),_:1},8,["before-close","modelValue"])}],["__scopeId","data-v-700d7f8d"]]);export{E as default};
