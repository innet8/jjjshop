import{E as e,e as t,f as a,g as l,h as i,w as o,d as s,x as r,J as n,y as c,i as d,A as g}from"./element-plus-b30a858e.js";import{F as p}from"./file-1c2123a7.js";import{_ as u}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as h,T as m,S as f,P as y,W as C,ag as _,c as k,a as v,X as b,Q as F,a8 as w,M as $,a1 as S,Y as z,V as L}from"./@vue-e5cdee21.js";import{_ as V}from"./vue-cropperjs-a8153a2d.js";import"./cropperjs-81999277.js";const I=u({data:()=>({dialogVisible:!0,form:{categoryname:""},categoryName:""}),props:["category"],created(){null!=this.category&&(this.form.categoryname=this.category.group_name,this.form.group_id=this.category.group_id)},methods:{addCategory:function(t){let a=this;p.addCategory({group_name:t}).then((t=>{e({message:"添加成功",type:"success"}),a.handleClose({status:"success"})})).catch((t=>{e.error("添加失败")}))},editCategory:function(t){let a=this,l={group_name:t.categoryname,group_id:t.group_id};p.editCategory(l).then((t=>{e({message:"修改成功",type:"success"}),a.handleClose({status:"success"})})).catch((t=>{e.error("修改失败")}))},submitForm(e){this.$refs[e].validate((e=>{if(!e)return!1;this.category&&null!=this.category.group_id?this.editCategory(this.form):this.addCategory(this.form.categoryname)}))},handleClose(e){this.dialogVisible=!1,this.$emit("closeCategory",e)}}},[["render",function(e,s,r,n,c,d){const g=t,p=a,u=l,_=i,k=o;return h(),m(k,{title:"添加分类",modelValue:c.dialogVisible,"onUpdate:modelValue":s[2]||(s[2]=e=>c.dialogVisible=e),width:"30%","before-close":d.handleClose,"append-to-body":!0},{default:f((()=>[y(_,{size:"small",model:c.form,"label-position":"top",ref:"form","label-width":"100px",class:"demo-ruleForm"},{default:f((()=>[y(p,{label:"分类名称",prop:"categoryname",rules:[{required:!0,message:"名字不能为空"}]},{default:f((()=>[y(g,{type:"age",modelValue:c.form.categoryname,"onUpdate:modelValue":s[0]||(s[0]=e=>c.form.categoryname=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),y(p,null,{default:f((()=>[y(u,{size:"small",onClick:d.handleClose},{default:f((()=>[C("取消")])),_:1},8,["onClick"]),y(u,{size:"small",type:"primary",onClick:s[1]||(s[1]=e=>d.submitForm("form"))},{default:f((()=>[C("提交")])),_:1})])),_:1})])),_:1},8,["model"])])),_:1},8,["modelValue","before-close"])}]]),j={class:"dialog-footer"};const T=u({components:{VueCropper:V},props:["imgSrc"],data:()=>({img:"",afterImg:""}),created(){this.img=this.imgSrc},methods:{sureSava(){this.afterImg=this.$refs.cropper.getCroppedCanvas({imageSmoothingQuality:"high"}).toDataURL("image/jpeg"),this.$emit("upload",this.base64ToBlob(this.afterImg))},base64ToBlob(e){const t=e.split(";base64,"),a=t[0].split(":")[1],l=window.atob(t[1]),i=l.length,o=new Uint8Array(i);for(let s=0;s<i;++s)o[s]=l.charCodeAt(s);return new Blob([o],{type:a})},handelCropper(){this.sureSava()},handleClose(){this.$emit("handleClose")}}},[["render",function(e,t,a,i,o,s){const r=_("vue-cropper"),n=l;return h(),k("div",null,[y(r,{ref:"cropper",src:o.img,aspectRatio:1,alt:"Source Image"},null,8,["src"]),v("span",j,[y(n,{onClick:s.handleClose},{default:f((()=>[C(b(e.$t("取消")),1)])),_:1},8,["onClick"]),y(n,{type:"primary",onClick:s.handelCropper},{default:f((()=>[C(b(e.$t("确定")),1)])),_:1},8,["onClick"])])])}],["__scopeId","data-v-c2c5331a"]]),D={class:"upload-wrap"},x={class:"upload-wrap-inline mb16 clearfix"},U={class:"leval-item"},B={class:"move-type"},P=["onClick"],N={class:"leval-item upload-btn"},A={class:"fileContainer"},R={class:"file-type"},W={key:0},E=["onClick"],H=["onClick"],Q=["onClick"],q={class:"file-content"},J={class:"fileContainerUI clearfix"},M=["onClick"],O={key:0,class:"selectedIcon"},X=["scr"],Y={class:"desc"},G=["onClick"],K={class:"pagination-wrap"},Z={class:"pagination-cropper"};const ee=u({components:{AddCategory:I,cropperImg:T},data:()=>({imgSrc:"",imgName:"",dialogWidth:"910px",activeType:null,typeList:[],imageUrl:null,dialogVisible:!0,cropperShow:!1,fileList:[],addLoading:!1,this_config:{total:1,file_type:"image"},record:0,loading:!0,tableData:[],pageSize:36,totalDataNumber:0,curPage:1,isShowCategory:!1,category:null,fileIds:[],accept:""}),props:["config"],created(){if("[object object]"===Object.prototype.toString.call(this.config).toLowerCase()){for(let e in this.config)this.this_config[e]=this.config[e];"image"==this.this_config.file_type?this.accept="image/jpeg,image/png,image/jpg":this.accept="video/mp4"}this.getFileCategory(),this.getData()},methods:{getFileCategory(){let e=this;p.fileCategory({type:e.this_config.file_type},!0).then((t=>{e.typeList=[];let a=[{group_id:null,group_name:$t("全部")}];e.typeList=a,t.data.group_list.map((t=>{e.typeList.push(t)}))})).catch((t=>{e.loading=!1}))},addCategory(){this.isShowCategory=!0},editCategoryFunc(e){this.isShowCategory=!0,this.category=e},closeCategoryFunc(e){null!=e&&this.getFileCategory(),this.isShowCategory=!1},deleteCategoryFunc(t){s.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{this.deleteCategory(t)})).catch((()=>{e({type:"info",message:"已取消删除"})}))},deleteCategory(t){let a=this;p.deleteCategory({group_id:t}).then((t=>{e({message:"删除成功",type:"success"}),a.getFileCategory()})).catch((t=>{e.error("删除失败")}))},selectTypeFunc(e){this.activeType=e,this.curPage=1,this.getData()},handleCurrentChange(e){this.curPage=e,this.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},getData:function(){let e=this,t={page:e.curPage,pageSize:e.pageSize,group_id:e.activeType,type:e.this_config.file_type};p.fileList(t,!0).then((t=>{e.loading=!1,e.fileList=t.data.file_list,e.totalDataNumber=e.fileList.total})).catch((t=>{e.loading=!1}))},moveTypeFunc(t){let a=this,l=[];a.fileList.data.forEach((e=>{e.selected&&l.push(e.file_id)})),0!=l.length?s.confirm($t("确定移动选中的文件吗, 是否继续?"),$t("提示"),{confirmButtonText:$t("确定"),cancelButtonText:$t("取消"),type:"warning"}).then((()=>{p.moveFile({group_id:t,fileIds:l},!0).then((t=>{e({message:$t("移动成功"),type:"success"}),a.getFileCategory(),a.getData()})).catch((e=>{}))})).catch((()=>{})):e({message:$t("请选择文件"),type:"warning"})},fileChange(e){const t=new FileReader;this.imgName=e.raw.name,t.onloadend=()=>{this.imgSrc=t.result,this.cropperShow=!0},t.readAsDataURL(e.raw)},onBeforeUploadImage:e=>!0,UploadImage(t){let a=this;const l=r.service({lock:!0,text:$t("图片上传中,请等待"),background:"rgba(0, 0, 0, 0.7)"}),i=new FormData,o=new File([t],a.imgName);i.append("iFile",o),i.append("group_id",a.activeType),i.append("file_type",a.this_config.file_type),p.uploadFile(i).then((t=>{l.close(),a.getData(),e({message:$t("本次上传图成功"),type:"success"}),a.cropperShow=!1})).catch((t=>{l.close(),e({message:$t("本次上传图片失败"),type:"warning"})}))},selectFileFunc(t,a){if(t.selected)t.selected=!1,this.record--;else{if(t.selected=!0,this.record++,this.record>=this.this_config.total)return void e({message:$t("本次最多只能上传 ")+this.this_config.total+$t(" 个文件"),type:"warning"});t.selected=!0,this.record++}},deleteFileFunc(t){let a=this;s.confirm($t("此操作将永久删除该记录, 是否继续?"),$t("提示"),{confirmButtonText:$t("确定"),cancelButtonText:$t("取消"),type:"warning"}).then((()=>{const l=r.service({lock:!0,text:$t("图片上传中,请等待"),background:"rgba(0, 0, 0, 0.7)"});let i=[];if(t)i.push(t.file_id);else for(let e=0;e<a.fileList.data.length;e++){let t=a.fileList.data[e];t.selected&&i.push(t.file_id)}p.deleteFiles({fileIds:i},!0).then((t=>{l.close(),e({message:$t("删除成功"),type:"success"}),a.getData()})).catch((e=>{l.close()}))})).catch((()=>{loading.close(),e({message:$t("删除失败"),type:"warning"})}))},confirmFunc(){let e=[],t=0;for(let a=0;a<this.fileList.data.length;a++){let l=this.fileList.data[a];if(l.selected){let a={file_id:l.file_id,file_path:l.file_path};e.push(a),t++}if(t>this.this_config.total)break}this.$emit("returnImgs",e)},cancelFunc(){this.$emit("returnImgs",null)},handelCropper(){this.$refs.cropperImg.sureSava()},handleClose(){this.cropperShow=!1}}},[["render",function(e,t,a,i,s,r){const p=l,u=n,V=c,j=_("Edit"),ee=d,te=_("Delete"),ae=_("Check"),le=g,ie=T,oe=o,se=I;return h(),k("div",D,[y(oe,{title:e.$t("文件管理"),modelValue:s.dialogVisible,"onUpdate:modelValue":t[4]||(t[4]=e=>s.dialogVisible=e),"close-on-click-modal":!1,class:"upload-dialog","close-on-press-escape":!1,onClose:r.cancelFunc,width:s.dialogWidth,"append-to-body":!0},{footer:f((()=>[y(p,{size:"small",onClick:r.cancelFunc},{default:f((()=>[C(b(e.$t("取消")),1)])),_:1},8,["onClick"]),y(p,{size:"small",type:"primary",onClick:r.confirmFunc},{default:f((()=>[C(b(e.$t("确定")),1)])),_:1},8,["onClick"])])),default:f((()=>[v("div",x,[v("div",U,[y(p,{size:"small",icon:"Plus",onClick:r.addCategory},{default:f((()=>[C(b(e.$t("添加分类")),1)])),_:1},8,["onClick"]),y(u,{placement:"bottom",width:"200",trigger:"click",value:!0},{reference:f((()=>[y(p,{size:"small",icon:"CaretBottom"},{default:f((()=>[C(b(e.$t("移动至")),1)])),_:1})])),default:f((()=>[v("ul",B,[(h(!0),k(F,null,w(s.typeList,((e,t)=>(h(),k("li",{key:t,onClick:t=>r.moveTypeFunc(e.group_id)},b(e.group_name),9,P)))),128))])])),_:1}),y(p,{size:"small",type:"danger",icon:"Delete",onClick:t[0]||(t[0]=e=>r.deleteFileFunc(!1))},{default:f((()=>[C(b(e.$t("批量删除")),1)])),_:1})]),v("div",N,[y(V,{class:"avatar-uploader",multiple:"",ref:"upload",action:"",accept:"image/jpeg,image/png,image/jpg","before-upload":r.onBeforeUploadImage,"auto-upload":!1,"show-file-list":!1,"on-change":r.fileChange},{default:f((()=>[y(p,{size:"small",icon:"Upload",type:"primary"},{default:f((()=>[C(b(e.$t("点击上传")),1)])),_:1})])),_:1},8,["before-upload","on-change"])])]),v("div",A,[v("div",R,[s.typeList.length>0?(h(),k("ul",W,[(h(!0),k(F,null,w(s.typeList,((e,a)=>(h(),k("li",{class:$(s.activeType==e.group_id?"item active":"item"),key:a,onClick:t=>r.selectTypeFunc(e.group_id)},[C(b(e.group_name||"")+" ",1),null!=e.group_id?(h(),k("div",{key:0,class:"operation",onClick:t[1]||(t[1]=S((()=>{}),["stop"]))},[v("p",{onClick:t=>r.editCategoryFunc(e)},[y(ee,null,{default:f((()=>[y(j)])),_:1})],8,H),v("p",{onClick:t=>r.deleteCategoryFunc(e.group_id)},[y(ee,null,{default:f((()=>[y(te)])),_:1})],8,Q)])):z("",!0)],10,E)))),128))])):z("",!0)]),v("div",q,[v("ul",J,[(h(!0),k(F,null,w(s.fileList.data,((e,a)=>(h(),k("li",{class:"file",key:a,onClick:t=>r.selectFileFunc(e,a)},[1==e.selected?(h(),k("div",O,[y(ee,null,{default:f((()=>[y(ae)])),_:1})])):z("",!0),"image"==s.this_config.file_type?(h(),k("img",{key:1,scr:e.file_path,style:L("background-image:url("+e.file_path+")"),alt:""},null,12,X)):z("",!0),v("p",Y,b(e.real_name),1),v("div",{class:"bottom-shade",onClick:t[2]||(t[2]=S((()=>{}),["stop"]))},[v("a",{href:"javascript:void(0)",onClick:t=>r.deleteFileFunc(e)},[y(ee,null,{default:f((()=>[y(te)])),_:1})],8,G)])],8,M)))),128))])])]),v("div",K,[y(le,{onSizeChange:r.handleSizeChange,onCurrentChange:r.handleCurrentChange,"current-page":s.curPage,"page-sizes":[12,24,36,42,48],"page-size":s.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:s.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])]),v("div",Z,[y(oe,{modelValue:s.cropperShow,"onUpdate:modelValue":t[3]||(t[3]=e=>s.cropperShow=e),title:e.$t("图片裁剪"),"before-close":r.handleClose},{default:f((()=>[s.cropperShow?(h(),m(ie,{key:0,ref:"cropperImg",imgSrc:s.imgSrc,onUpload:r.UploadImage,onHandleClose:r.handleClose},null,8,["imgSrc","onUpload","onHandleClose"])):z("",!0)])),_:1},8,["modelValue","title","before-close"])])])),_:1},8,["title","modelValue","onClose","width"]),s.isShowCategory?(h(),m(se,{key:0,category:s.category,onCloseCategory:r.closeCategoryFunc},null,8,["category","onCloseCategory"])):z("",!0)])}],["__scopeId","data-v-18dc40ed"]]);export{ee as _};