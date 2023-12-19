System.register(["./element-plus-legacy-b16a6c53.js","./index-legacy-37de8052.js","./@vue-legacy-11820b46.js","./Upload.vue_vue_type_style_index_0_scoped_bdf3207a_lang-legacy-b135f49c.js"],(function(e,t){"use strict";var n,i,o,a,l,c,r,u,s,f,g,d,p,h,m,y,_,C,v,k,F,b,w,z,S,V,x,D,T;return{setters:[function(e){n=e.E,i=e.c,o=e.d,a=e.e,l=e.b,c=e.o,r=e.k,u=e.B,s=e.C,f=e.D,g=e.F,d=e.n},function(e){p=e.r,h=e._},function(e){m=e.o,y=e.T,_=e.S,C=e.P,v=e.W,k=e.ag,F=e.c,b=e.a,w=e.Q,z=e.a8,S=e.X,V=e.M,x=e.a1,D=e.Y,T=e.V},null],execute:function(){var t=function(e,t){return p._post("/shop/file.file/category",e,t)},L=function(e,t){return p._post("/shop/file.file/lists",e,t)},j=function(e,t){return p._post("/shop/file.file/deleteFiles",e,t)},I=function(e,t){return p._post("/shop/file.file/addGroup",e,t)},U=function(e,t){return p._post("/shop/file.file/editGroup",e,t)},B=function(e,t){return p._post("/shop/file.file/deleteGroup",e,t)},P=function(e,t){return p._upload("/shop/file.upload/image",e,t)},E=function(e,t){return p._upload("/shop/file.upload/moveFiles",e,t)},N=h({data:function(){return{dialogVisible:!0,form:{categoryname:""},categoryName:""}},props:["category"],created:function(){null!=this.category&&(this.form.categoryname=this.category.group_name,this.form.group_id=this.category.group_id)},methods:{addCategory:function(e){var t=this;I({group_name:e}).then((function(e){n({message:"添加成功",type:"success"}),t.handleClose({status:"success"})})).catch((function(e){n.error("添加失败")}))},editCategory:function(e){var t=this,i={group_name:e.categoryname,group_id:e.group_id};U(i).then((function(e){n({message:"修改成功",type:"success"}),t.handleClose({status:"success"})})).catch((function(e){n.error("修改失败")}))},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.category&&null!=t.category.group_id?t.editCategory(t.form):t.addCategory(t.form.categoryname)}))},handleClose:function(e){this.dialogVisible=!1,this.$emit("closeCategory",e)}}},[["render",function(e,t,n,r,u,s){var f=i,g=o,d=a,p=l,h=c;return m(),y(h,{title:"添加分类",modelValue:u.dialogVisible,"onUpdate:modelValue":t[2]||(t[2]=function(e){return u.dialogVisible=e}),width:"30%","before-close":s.handleClose,"append-to-body":!0},{default:_((function(){return[C(p,{size:"small",model:u.form,ref:"form","label-width":"100px",class:"demo-ruleForm"},{default:_((function(){return[C(g,{label:"分类名称",prop:"categoryname",rules:[{required:!0,message:"名字不能为空"}]},{default:_((function(){return[C(f,{type:"age",modelValue:u.form.categoryname,"onUpdate:modelValue":t[0]||(t[0]=function(e){return u.form.categoryname=e}),autocomplete:"off"},null,8,["modelValue"])]})),_:1}),C(g,null,{default:_((function(){return[C(d,{size:"small",onClick:s.handleClose},{default:_((function(){return[v("取消")]})),_:1},8,["onClick"]),C(d,{size:"small",type:"primary",onClick:t[1]||(t[1]=function(e){return s.submitForm("form")})},{default:_((function(){return[v("提交")]})),_:1})]})),_:1})]})),_:1},8,["model"])]})),_:1},8,["modelValue","before-close"])}]]),$={class:"upload-wrap"},q={class:"upload-wrap-inline mb16 clearfix"},G={class:"leval-item"},W={class:"move-type"},O=["onClick"],A={class:"leval-item upload-btn"},M={class:"fileContainer"},Q={class:"file-type"},X=["onClick"],Y=["onClick"],H=["onClick"],J={class:"file-content"},K={class:"fileContainerUI clearfix"},R=["onClick"],Z={key:0,class:"selectedIcon"},ee=["scr"],te={class:"desc"},ne=["onClick"],ie={class:"pagination-wrap"};e("_",h({components:{AddCategory:N},data:function(){return{dialogWidth:"910px",activeType:null,typeList:[],imageUrl:null,dialogVisible:!0,fileList:[],addLoading:!1,this_config:{total:1,file_type:"image"},record:0,loading:!0,tableData:[],pageSize:36,totalDataNumber:0,curPage:1,isShowCategory:!1,category:null,fileIds:[],accept:""}},props:["config"],created:function(){if("[object object]"===Object.prototype.toString.call(this.config).toLowerCase()){for(var e in this.config)this.this_config[e]=this.config[e];"image"==this.this_config.file_type?this.accept="image/jpeg,image/png,image/jpg":this.accept="video/mp4"}this.getFileCategory(),this.getData()},methods:{getFileCategory:function(){var e=this;t({type:e.this_config.file_type},!0).then((function(t){e.typeList=[{group_id:null,group_name:"全部"}].concat(t.data.group_list)})).catch((function(t){e.loading=!1}))},addCategory:function(){this.isShowCategory=!0},editCategoryFunc:function(e){this.isShowCategory=!0,this.category=e},closeCategoryFunc:function(e){null!=e&&this.getFileCategory(),this.isShowCategory=!1},deleteCategoryFunc:function(e){var t=this;r.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.deleteCategory(e)})).catch((function(){n({type:"info",message:"已取消删除"})}))},deleteCategory:function(e){var t=this;B({group_id:e}).then((function(e){n({message:"删除成功",type:"success"}),t.getFileCategory()})).catch((function(e){n.error("删除失败")}))},selectTypeFunc:function(e){this.activeType=e,this.curPage=1,this.getData()},handleCurrentChange:function(e){this.curPage=e,this.getData()},handleSizeChange:function(e){this.curPage=1,this.pageSize=e,this.getData()},getData:function(){var e=this,t={page:e.curPage,pageSize:e.pageSize,group_id:e.activeType,type:e.this_config.file_type};L(t,!0).then((function(t){e.loading=!1,e.fileList=t.data.file_list,e.totalDataNumber=e.fileList.total})).catch((function(t){e.loading=!1}))},moveTypeFunc:function(e){var t=this,i=[];t.fileList.data.forEach((function(e){e.selected&&i.push(e.file_id)})),0!=i.length?r.confirm("确定移动选中的文件吗, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){E({group_id:e,fileIds:i},!0).then((function(e){n({message:"移动成功",type:"success"}),t.getFileCategory(),t.getData()})).catch((function(e){}))})).catch((function(){})):n({message:"请选择文件",type:"warning"})},fileChange:function(e){},onBeforeUploadImage:function(e){return!0},UploadImage:function(e){var t=this,i=u.service({lock:!0,text:"图片上传中,请等待",background:"rgba(0, 0, 0, 0.7)"}),o=new FormData;o.append("iFile",e.file),o.append("group_id",t.activeType),o.append("file_type",t.this_config.file_type),P(o).then((function(n){i.close(),t.getData(),e.onSuccess()})).catch((function(t){i.close(),n({message:"本次上传图片失败",type:"warning"}),e.onError()}))},selectFileFunc:function(e,t){if(e.selected)e.selected=!1,this.record--;else{if(e.selected=!0,this.record++,this.record>=this.this_config.total)return void n({message:"本次最多只能上传 "+this.this_config.total+" 个文件",type:"warning"});e.selected=!0,this.record++}},deleteFileFunc:function(e){var t=this;r.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var i=u.service({lock:!0,text:"图片上传中,请等待",background:"rgba(0, 0, 0, 0.7)"}),o=[];if(e)o.push(e.file_id);else for(var a=0;a<t.fileList.data.length;a++){var l=t.fileList.data[a];l.selected&&o.push(l.file_id)}j({fileIds:o},!0).then((function(e){i.close(),n({message:"删除成功",type:"success"}),t.getData()})).catch((function(e){i.close()}))})).catch((function(){loading.close(),n({message:"删除失败",type:"warning"})}))},confirmFunc:function(){for(var e=[],t=0,n=0;n<this.fileList.data.length;n++){var i=this.fileList.data[n];if(i.selected){var o={file_id:i.file_id,file_path:i.file_path};e.push(o),t++}if(t>this.this_config.total)break}this.$emit("returnImgs",e)},cancelFunc:function(){this.$emit("returnImgs",null)}}},[["render",function(e,t,n,i,o,l){var r=a,u=s,p=f,h=k("Edit"),L=g,j=k("Delete"),I=k("Check"),U=d,B=c,P=N;return m(),F("div",$,[C(B,{title:"文件管理",modelValue:o.dialogVisible,"onUpdate:modelValue":t[3]||(t[3]=function(e){return o.dialogVisible=e}),"close-on-click-modal":!1,"custom-class":"upload-dialog","close-on-press-escape":!1,onClose:l.cancelFunc,width:o.dialogWidth,"append-to-body":!0},{footer:_((function(){return[C(r,{size:"small",onClick:l.cancelFunc},{default:_((function(){return[v("取 消")]})),_:1},8,["onClick"]),C(r,{size:"small",type:"primary",onClick:l.confirmFunc},{default:_((function(){return[v("确 定")]})),_:1},8,["onClick"])]})),default:_((function(){return[b("div",q,[b("div",G,[C(r,{size:"small",icon:"Plus",onClick:l.addCategory},{default:_((function(){return[v("添加分类")]})),_:1},8,["onClick"]),C(u,{placement:"bottom",width:"200",trigger:"click",value:!0},{reference:_((function(){return[C(r,{size:"small",icon:"CaretBottom"},{default:_((function(){return[v("移动至")]})),_:1})]})),default:_((function(){return[b("ul",W,[(m(!0),F(w,null,z(o.typeList,(function(e,t){return m(),F("li",{key:t,onClick:function(t){return l.moveTypeFunc(e.group_id)}},S(e.group_name),9,O)})),128))])]})),_:1}),C(r,{size:"small",type:"danger",icon:"Delete",onClick:t[0]||(t[0]=function(e){return l.deleteFileFunc(!1)})},{default:_((function(){return[v("批量删除")]})),_:1})]),b("div",A,[C(p,{class:"avatar-uploader",multiple:"",ref:"upload",action:"string",accept:"image/jpeg,image/png,image/jpg","before-upload":l.onBeforeUploadImage,"http-request":l.UploadImage,"show-file-list":!1,"on-change":l.fileChange},{default:_((function(){return[C(r,{size:"small",icon:"Upload",type:"primary"},{default:_((function(){return[v("点击上传")]})),_:1})]})),_:1},8,["before-upload","http-request","on-change"])])]),b("div",M,[b("div",Q,[b("ul",null,[(m(!0),F(w,null,z(o.typeList,(function(e,n){return m(),F("li",{class:V(o.activeType==e.group_id?"item active":"item"),key:n,onClick:function(t){return l.selectTypeFunc(e.group_id)}},[v(S(e.group_name)+" ",1),null!=e.group_id?(m(),F("div",{key:0,class:"operation",onClick:t[1]||(t[1]=x((function(){}),["stop"]))},[b("p",{onClick:function(t){return l.editCategoryFunc(e)}},[C(L,null,{default:_((function(){return[C(h)]})),_:1})],8,Y),b("p",{onClick:function(t){return l.deleteCategoryFunc(e.group_id)}},[C(L,null,{default:_((function(){return[C(j)]})),_:1})],8,H)])):D("",!0)],10,X)})),128))])]),b("div",J,[b("ul",K,[(m(!0),F(w,null,z(o.fileList.data,(function(e,n){return m(),F("li",{class:"file",key:n,onClick:function(t){return l.selectFileFunc(e,n)}},[1==e.selected?(m(),F("div",Z,[C(L,null,{default:_((function(){return[C(I)]})),_:1})])):D("",!0),"image"==o.this_config.file_type?(m(),F("img",{key:1,scr:e.file_path,style:T("background-image:url("+e.file_path+")"),alt:""},null,12,ee)):D("",!0),b("p",te,S(e.real_name),1),b("div",{class:"bottom-shade",onClick:t[2]||(t[2]=x((function(){}),["stop"]))},[b("a",{href:"javascript:void(0)",onClick:function(t){return l.deleteFileFunc(e)}},[C(L,null,{default:_((function(){return[C(j)]})),_:1})],8,ne)])],8,R)})),128))])])]),b("div",ie,[C(U,{onSizeChange:l.handleSizeChange,onCurrentChange:l.handleCurrentChange,"current-page":o.curPage,"page-sizes":[12,24,36,42,48],"page-size":o.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:o.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]})),_:1},8,["modelValue","onClose","width"]),o.isShowCategory?(m(),y(P,{key:0,category:o.category,onCloseCategory:l.closeCategoryFunc},null,8,["category","onCloseCategory"])):D("",!0)])}],["__scopeId","data-v-bdf3207a"]]))}}}));
