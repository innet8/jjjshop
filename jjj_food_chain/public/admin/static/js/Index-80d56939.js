import{f as e,b as l,c as o,g as a,h as s,a as t,d as i,i as d,j as n,k as c,v as p,e as r,l as u}from"./element-plus-7e8fc928.js";import{r as m}from"./request-d5dcf4f6.js";import{_ as g,d as h}from"./index-64eb7629.js";import{o as f,S as _,R as b,a as y,O as V,V as C,c as k,a8 as D,P as j,_ as v,ad as L,X as w,W as x}from"./@vue-de0ab9c3.js";import"./lodash-es-493ac664.js";import"./@vueuse-588ef066.js";import"./dayjs-3f6c138b.js";import"./call-bind-a6dd5c06.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-9e5c8f38.js";import"./@popperjs-b78c3215.js";import"./escape-html-d3e23fdb.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./axios-63583d02.js";import"./qs-edfbe083.js";import"./side-channel-6da5de8a.js";import"./object-inspect-66d569d0.js";import"./vue-router-071bc8f6.js";import"./pinia-ad4762e9.js";let F={plugslist:(e,l)=>m._post("/admin/plus.plus/index",e,l),getplugs:(e,l)=>m._get("/admin/plus.plus/add",e,l),addplugs:(e,l)=>m._post("/admin/plus.plus/add",e,l),editplugs:(e,l)=>m._post("/admin/plus.plus/edit",e,l),deleteplugs:(e,l)=>m._post("/admin/plus.plus/delete",e,l),updatePlugsStatus:(e,l)=>m._post("/admin/plus.plus/updateStatus",e,l),updatePlugsRecom:(e,l)=>m._post("/admin/plus.plus/updateRecom",e,l)};const M={class:"dialog-footer"};const U={data:()=>({form:{status:0,srot:1,plus_name:"",desc:"",ico:"",url:"index/index",sort:1},categoryList:[],srot:"1",radio:"1",formLabelWidth:"120px",dialogVisible:!1,loading:!0}),props:{open_add:Boolean,curModel:Object},created(){this.dialogVisible=this.open_add,this.getCategoryList()},methods:{getCategoryList(){let e=this,l={plus_category_id:e.curModel.plus_category_id};F.getplugs(l,!0).then((l=>{e.loading=!1,e.categoryList=l.data.accessList})).catch((l=>{e.loading=!1}))},addClick(l){let o=this,a={access_id:l.access_id,plus_category_id:o.curModel.plus_category_id};F.addplugs(a,!0).then((l=>{o.loading=!1,1==l.code?(e({message:"恭喜你，添加成功",type:"success"}),o.dialogFormVisible(!0)):(o.loading=!1,e.error("错了哦，这是一条错误消息"))})).catch((e=>{o.loading=!1}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}};const W={class:"dialog-footer"};const P={components:{Edit:g({data:()=>({categoryList:[],formLabelWidth:"120px",dialogVisible:!1,loading:!1}),props:["open_edit","form"],created(){this.dialogVisible=this.open_edit,this.getCategoryList()},methods:{getCategoryList(){let e=this;F.plugslist({},!0).then((l=>{e.loading=!1,e.categoryList=l.data.accessList})).catch((e=>{}))},editPlugs(){let l=this,o=this.form;l.$refs.form.validate((a=>{a&&(l.loading=!0,F.editplugs(o,!0).then((o=>{l.loading=!1,e({message:"恭喜你，修改成功",type:"success"}),l.dialogFormVisible(!0)})).catch((e=>{})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(e,n,c,p,r,u){const m=l,g=o,h=a,v=s,L=t,w=i,x=d;return f(),_(x,{title:"编辑插件",modelValue:r.dialogVisible,"onUpdate:modelValue":n[6]||(n[6]=e=>r.dialogVisible=e),onClose:u.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:b((()=>[y("div",M,[V(w,{onClick:u.dialogFormVisible},{default:b((()=>[C("取 消")])),_:1},8,["onClick"]),V(w,{type:"primary",onClick:u.editPlugs,loading:r.loading},{default:b((()=>[C("确 定")])),_:1},8,["onClick","loading"])])])),default:b((()=>[V(L,{size:"small",model:c.form,ref:"form"},{default:b((()=>[V(g,{label:"插件名称","label-width":r.formLabelWidth,rules:[{required:!0,message:" "}],prop:"plus_name"},{default:b((()=>[V(m,{modelValue:c.form.plus_name,"onUpdate:modelValue":n[0]||(n[0]=e=>c.form.plus_name=e),autocomplete:"off",placeholder:"请输入插件名称"},null,8,["modelValue"])])),_:1},8,["label-width"]),V(g,{label:"插件描述","label-width":r.formLabelWidth},{default:b((()=>[V(m,{modelValue:c.form.desc,"onUpdate:modelValue":n[1]||(n[1]=e=>c.form.desc=e),autocomplete:"off",placeholder:"请输入插件描述"},null,8,["modelValue"])])),_:1},8,["label-width"]),V(g,{label:"ico图标","label-width":r.formLabelWidth,rules:[{required:!0,message:" "}],prop:"ico"},{default:b((()=>[V(m,{modelValue:c.form.ico,"onUpdate:modelValue":n[2]||(n[2]=e=>c.form.ico=e),autocomplete:"off",placeholder:"请输入图标名名称"},null,8,["modelValue"])])),_:1},8,["label-width"]),V(g,{label:"插件分类","label-width":r.formLabelWidth},{default:b((()=>[V(v,{modelValue:c.form.parent_id,"onUpdate:modelValue":n[3]||(n[3]=e=>c.form.parent_id=e),placeholder:"请选择分类"},{default:b((()=>[V(h,{label:"顶级分类",value:0}),(f(!0),k(j,null,D(r.categoryList,((e,l)=>(f(),_(h,{key:l,label:e.plus_name,value:e.plus_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label-width"]),V(g,{label:"插件URL","label-width":r.formLabelWidth},{default:b((()=>[V(m,{modelValue:c.form.url,"onUpdate:modelValue":n[4]||(n[4]=e=>c.form.url=e),autocomplete:"off",placeholder:"例如：index/index"},null,8,["modelValue"])])),_:1},8,["label-width"]),V(g,{label:"排序","label-width":r.formLabelWidth,rules:[{required:!0,message:" "}],prop:"sort"},{default:b((()=>[V(m,{modelValue:c.form.sort,"onUpdate:modelValue":n[5]||(n[5]=e=>c.form.sort=e),placeholder:"请输入数字"},null,8,["modelValue"])])),_:1},8,["label-width"])])),_:1},8,["model"])])),_:1},8,["modelValue","onClose"])}]]),Add:g(U,[["render",function(e,l,o,a,s,t){const r=n,u=i,m=c,g=d,h=p;return f(),_(g,{title:"添加插件",modelValue:s.dialogVisible,"onUpdate:modelValue":l[0]||(l[0]=e=>s.dialogVisible=e),onClose:t.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{default:b((()=>[v((f(),_(m,{size:"small",data:s.categoryList,border:"",style:{width:"100%"}},{default:b((()=>[V(r,{prop:"name",label:"名称"}),V(r,{prop:"name",label:"操作",width:"80"},{default:b((e=>[V(u,{onClick:l=>t.addClick(e.row),size:"small"},{default:b((()=>[C("添加")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])),[[h,s.loading]])])),_:1},8,["modelValue","onClose"])}]]),Type:g({data:()=>({form:{plus_name:""},formLabelWidth:"120px",dialogVisible:!1,loading:!1}),props:["open_type"],created(){this.dialogVisible=this.open_type},methods:{addClick(){let l=this,o=this.form;l.$refs.form.validate((a=>{a&&(l.loading=!0,F.addplugs(o,!0).then((o=>{l.loading=!1,1==o.code?(e({message:"恭喜你，添加成功",type:"success"}),l.dialogFormVisible(!0)):(l.loading=!1,e.error("错了哦，这是一条错误消息"))})).catch((e=>{l.loading=!1})))}))},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},[["render",function(e,a,s,n,c,p){const r=l,u=o,m=t,g=i,h=d;return f(),_(h,{title:"添加类别",modelValue:c.dialogVisible,"onUpdate:modelValue":a[2]||(a[2]=e=>c.dialogVisible=e),onClose:p.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:b((()=>[y("div",W,[V(g,{onClick:p.dialogFormVisible},{default:b((()=>[C("取 消")])),_:1},8,["onClick"]),V(g,{type:"primary",onClick:a[1]||(a[1]=e=>p.addClick()),loading:c.loading},{default:b((()=>[C("确 定")])),_:1},8,["loading"])])])),default:b((()=>[V(m,{size:"small",model:c.form,ref:"form"},{default:b((()=>[V(u,{label:"类别名称","label-width":c.formLabelWidth},{default:b((()=>[V(r,{modelValue:c.form.plus_name,"onUpdate:modelValue":a[0]||(a[0]=e=>c.form.plus_name=e),autocomplete:"off",placeholder:"请输入类别名称"},null,8,["modelValue"])])),_:1},8,["label-width"])])),_:1},8,["model"])])),_:1},8,["modelValue","onClose"])}]])},data:()=>({loading:!0,tableData:[],totalDataNumber:0,open_add:!1,open_edit:!1,open_type:!1,curModel:{}}),created(){this.getData()},methods:{getData(){let e=this;F.plugslist({},!0).then((l=>{e.loading=!1,e.tableData=l.data.accessList,e.totalDataNumber=l.data.list.total})).catch((l=>{e.loading=!1}))},addType(){this.open_type=!0},statusChange:function(e,l){let o=this;o.loading=!0,F.updatePlugsStatus({plus_id:l.plus_id},!0).then((a=>{o.loading=!1,l.status=e})).catch((a=>{o.loading=!1,l.status=!e}))},recomChange:function(e,l){let o=this;o.loading=!0,F.updatePlugsRecom({plus_id:l.plus_id},!0).then((a=>{o.loading=!1,l.is_recom=e})).catch((a=>{o.loading=!1,l.is_recom=!e}))},addClick(e){this.curModel=e,this.open_add=!0},editClick(e){this.userModel=h(e),this.open_edit=!0},closeDialogFunc(e,l){"type"==l&&(this.open_type=e.openDialog,"success"==e.type&&this.tableData.push({plus_name:"新类别"})),"add"==l&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==l&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},deleteClick(l){let o=this;r.confirm("删除后不可恢复，确认删除该记录吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{o.loading=!0,F.deleteplugs({plus_id:l.access_id},!0).then((l=>{1==l.code&&(o.loading=!1,e({message:l.msg,type:"success"}),o.getData())})).catch((e=>{o.loading=!1}))})).catch((()=>{}))}}},z={class:"plus-container"},$=y("div",{class:"common-level-rail"},null,-1),q={class:"common-form d-s-c"},R={class:"plus-list"},T={class:"item-box pr"},B=["onClick"],S=y("span",{class:"iconfont icon icon-tubiaozhizuomoban-"},null,-1),A={class:"ml10"},E={class:"item"},N={class:"d-s-c mt10"},O=["onClick"],X=y("div",{class:"ml10"},[y("p",{class:"f14 gray9"},"添加插件到此类别下")],-1);const G=g(P,[["render",function(e,l,o,a,s,t){const i=L("CloseBold"),d=u,n=L("Plus"),c=L("Type"),p=L("Add"),r=L("Edit");return f(),k("div",z,[$,(f(!0),k(j,null,D(s.tableData,((e,l)=>(f(),k("div",{key:l,class:"mb16"},[y("div",q,[y("span",null,x(e.name),1)]),y("div",R,[(f(!0),k(j,null,D(e.children,((e,l)=>(f(),k("div",{class:"item",key:l},[y("div",T,[y("a",{href:"javascript:void(0);",class:"close-btn",onClick:l=>t.deleteClick(e)},[V(d,{size:20},{default:b((()=>[V(i)])),_:1})],8,B),y("a",null,[S,y("div",A,[y("h3",null,x(e.name),1),y("p",null,x(e.remark),1)])])])])))),128)),y("div",E,[y("div",N,[y("div",{class:"add-item-box d-c-c",onClick:l=>t.addClick(e)},[V(d,{class:"Plus"},{default:b((()=>[V(n)])),_:1})],8,O),X])])])])))),128)),s.open_type?(f(),_(c,{key:0,open_type:s.open_type,onCloseDialog:l[0]||(l[0]=e=>t.closeDialogFunc(e,"type"))},null,8,["open_type"])):w("",!0),s.open_add?(f(),_(p,{key:1,open_add:s.open_add,curModel:s.curModel,onCloseDialog:l[1]||(l[1]=e=>t.closeDialogFunc(e,"add"))},null,8,["open_add","curModel"])):w("",!0),s.open_edit?(f(),_(r,{key:2,open_edit:s.open_edit,curModel:s.curModel,onCloseDialog:l[2]||(l[2]=e=>t.closeDialogFunc(e,"edit"))},null,8,["open_edit","curModel"])):w("",!0)])}]]);export{G as default};
