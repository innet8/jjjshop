System.register(["./element-plus-legacy-b61989a6.js","./store-legacy-21200f83.js","./add-legacy-798104fd.js","./edit-legacy-65170b46.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-517223d5.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./index-legacy-5f737d0b.js","./vue-router-legacy-57460840.js","./pinia-legacy-b89d16df.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./object-inspect-legacy-fcd55e63.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-fb79f073.js","./vue-i18n-legacy-859a0eb8.js","./@intlify-legacy-d0534b73.js"],(function(e,l){"use strict";var t,a,n,i,c,o,s,u,d,r,g,y,p,f,j,m,h,_,v,b,k,C;return{setters:[function(e){t=e.d,a=e.E,n=e.i,i=e.m,c=e.n,o=e.v},function(e){s=e.S},function(e){u=e.default},function(e){d=e.default},function(e){r=e._},function(e){g=e.ag,y=e.ap,p=e.o,f=e.c,j=e.a,m=e.$,h=e.T,_=e.S,v=e.W,b=e.X,k=e.P,C=e.Y},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={class:"product"},D={class:"common-level-rail"},$={class:"product-content"},w={class:"table-wrap"};e("default",r({components:{Add:u,Edit:d},data:function(){return{loading:!0,activeName:"first",tableData:[],open_add:!1,open_edit:!1,categoryModel:{model:""}}},created:function(){this.getData()},methods:{handleClick:function(){this.getData()},getData:function(){var e=this;e.loading=!0,s.arealist({},!0).then((function(l){e.loading=!1,e.tableData=l.data.list.data,e.categoryModel=l.data.list.data})).catch((function(l){e.loading=!1}))},addClick:function(){this.open_add=!0},editClick:function(e){this.categoryModel.model=e,this.open_edit=!0},closeDialogFunc:function(e,l){"add"==l&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==l&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},deleteClick:function(e){var l=this;t.confirm($t("删除后不可恢复，确认删除该记录吗?"),$t("提示"),{type:"warning"}).then((function(){s.deleteArea({area_id:e.area_id}).then((function(e){a({message:$t("删除成功"),type:"success"}),l.getData()}))}))}}},[["render",function(e,t,a,s,u,d){var r=n,z=i,x=c,A=g("Add"),M=g("Edit"),E=y("auth"),F=o;return p(),f("div",l,[j("div",D,[m((p(),h(r,{size:"small",type:"primary",onClick:d.addClick,icon:"Plus"},{default:_((function(){return[v(b(e.$t("添加区域")),1)]})),_:1},8,["onClick"])),[[E,"/supplier/table/area/add"]])]),j("div",$,[j("div",w,[m((p(),h(x,{size:"small",data:u.tableData,"row-key":"category_id",style:{width:"100%"}},{default:_((function(){return[k(z,{prop:"area_name",label:e.$t("区域名称")},null,8,["label"]),k(z,{prop:"sort",label:e.$t("排序")},null,8,["label"]),k(z,{prop:"create_time",label:e.$t("添加时间")},null,8,["label"]),k(z,{fixed:"right",label:e.$t("操作"),width:"100"},{default:_((function(l){return[m((p(),h(r,{onClick:function(e){return d.editClick(l.row)},type:"primary",link:"",size:"small"},{default:_((function(){return[v(b(e.$t("编辑")),1)]})),_:2},1032,["onClick"])),[[E,"/supplier/table/area/edit"]]),m((p(),h(r,{onClick:function(e){return d.deleteClick(l.row)},type:"primary",link:"",size:"small"},{default:_((function(){return[v(b(e.$t("删除")),1)]})),_:2},1032,["onClick"])),[[E,"/supplier/table/area/delete"]])]})),_:1},8,["label"])]})),_:1},8,["data"])),[[F,u.loading]])])]),u.open_add?(p(),h(A,{key:0,open_add:u.open_add,addform:u.categoryModel,onCloseDialog:t[0]||(t[0]=function(e){return d.closeDialogFunc(e,"add")})},null,8,["open_add","addform"])):C("",!0),u.open_edit?(p(),h(M,{key:1,open_edit:u.open_edit,editform:u.categoryModel,onCloseDialog:t[1]||(t[1]=function(e){return d.closeDialogFunc(e,"edit")})},null,8,["open_edit","editform"])):C("",!0)])}]]))}}}));
