System.register(["./GetCoupon-legacy-0f279fd2.js","./element-plus-legacy-6adc2ffc.js","./_plugin-vue_export-helper-legacy-61c4c9d1.js","./@vue-legacy-8ef99c9b.js","./index-legacy-74d77c27.js","./product-legacy-c3bbd605.js","./Upload-legacy-0315ad49.js","./coupon-legacy-520883e0.js","./lodash-es-legacy-de50a096.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-3353583a.js","./@element-plus-legacy-91437698.js","./dayjs-legacy-0ff6bb75.js","./call-bind-legacy-8954b3d2.js","./get-intrinsic-legacy-c0201930.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./hasown-legacy-8325a62b.js","./set-function-length-legacy-e4fe6823.js","./define-data-property-legacy-290282d7.js","./has-property-descriptors-legacy-1e05bb01.js","./gopd-legacy-0da6a62b.js","./@popperjs-legacy-876caf52.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./vue-router-legacy-a8f66a40.js","./pinia-legacy-e8a51700.js","./axios-legacy-dedee0c6.js","./qs-legacy-334feae6.js","./side-channel-legacy-19dc2798.js","./object-inspect-legacy-a5678b81.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-d36ae666.js","./vue-i18n-legacy-a195b753.js","./@intlify-legacy-7f6e5bc9.js","./file-legacy-ceca68f1.js","./vue-cropperjs-legacy-7166d149.js","./vue-legacy-ae59173d.js","./cropperjs-legacy-9cfc33ae.js"],(function(e,a){"use strict";var t,n,l,o,i,u,r,s,c,d,p,g,f,m,h,y,v,_,b,k,C,x,V,D,w,j,F,P,z,U,S,$,T,L,N,I,q;return{setters:[function(e){t=e._},function(e){n=e.p,l=e.q,o=e.v,i=e.I,u=e.J,r=e.Q,s=e.g,c=e.h,d=e.i,p=e.e,g=e.m,f=e.o,m=e.B,h=e.u,y=e.D,v=e.w,_=e.O},function(e){b=e._},function(e){k=e.o,C=e.S,x=e.R,V=e.c,D=e.P,w=e.a7,j=e._,F=e.an,P=e.O,z=e.a,U=e.X,S=e.V,$=e.W,T=e.bm,L=e.bk},function(e){N=e.r},function(e){I=e.P},function(e){q=e._},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var a=document.createElement("style");a.textContent=".table-wrap.setlink-product-table .product-info .pic[data-v-2b4e01ff]{width:20px;height:20px;background:#FFFFFF}.table-wrap.setlink-product-table .product-info .pic img[data-v-2b4e01ff]{width:20px;height:20px}.marketing-box .el-tree-node__content[data-v-2b4e01ff]{height:30px}.marketing-box .el-tree-node__content[data-v-2b4e01ff]{margin-bottom:10px}.marketing-box .el-tabs__item[data-v-782ba3de]{font-size:14px}.setlink-footer-btn[data-v-782ba3de]{width:160px}.setlink-set-link[data-v-782ba3de]{width:500px}.reward-list .reward-item[data-v-e0b0573d]{margin-bottom:10px;padding:10px 20px;border:1px solid #ebeef5}.huodong[data-v-e0b0573d]{color:#ccc;position:relative;height:50px;left:100px}.reward-list .delete-reward[data-v-e0b0573d]{position:absolute;top:10px;right:20px;cursor:pointer;z-index:10}\n",document.head.appendChild(a);var E=b({data:function(){return{pages:[{url:"/pages/user/address/address",name:"收货地址",type:"菜单"},{url:"/pages/coupon/coupon",name:"领券中心",type:"菜单"},{url:"/pages/user/my-coupon/my-coupon",name:"我的优惠券",type:"菜单"},{url:"/pages/plus/birthgift/birthgift",name:"生日有礼",type:"菜单"},{url:"/pages/plus/newgifts/newgifts",name:"新客有礼",type:"菜单"},{url:"/pages/plus/points/list/list",name:"积分商城",type:"菜单"},{url:"/pages/plus/signin/signin",name:"签到",type:"菜单"},{url:"/pages/order/package",name:"券包",type:"菜单"},{url:"/pages/plus/rider/rider",name:"骑手大厅",type:"菜单",sys_tag:"driver"},{url:"/pages/plus/invite/invite",name:"邀请有礼",type:"菜单"},{url:"/pages/agent/index/index",name:"分销中心",type:"菜单"},{url:"/pages/user/set/set",name:"设置",type:"菜单"},{url:"scanQrcode",name:"扫一扫(仅限导航组)",type:"菜单"},{url:"/pages/plus/group/list",name:"团购商品",type:"菜单"},{url:"receipt",name:"团购核销",type:"菜单"},{url:"/pages/order/group-list",name:"团购订单",type:"菜单"}],activePage:"收货地址"}},created:function(){this.changeFunc(this.pages[0])},methods:{changeFunc:function(e){this.$emit("changeData",e)}}},[["render",function(e,a,t,o,i,u){var r=n,s=l;return k(),C(s,{modelValue:i.activePage,"onUpdate:modelValue":a[0]||(a[0]=function(e){return i.activePage=e}),placeholder:"请选择",class:"percent-w100",onChange:u.changeFunc,"value-key":"url"},{default:x((function(){return[(k(!0),V(D,null,w(i.pages,(function(e){return k(),C(r,{key:e.url,"value-key":e.name,label:e.name,value:e},null,8,["value-key","label","value"])})),128))]})),_:1},8,["modelValue","onChange"])}]]),M=function(e,a){return N._post("/shop/data.link/getPageList",e,a)},A=b({data:function(){return{loading:!0,pages:[],activePage:{}}},created:function(){this.getData()},methods:{getData:function(){var e=this;M({},!0).then((function(a){e.loading=!1;for(var t=[],n=0,l=a.data.list.length;n<l;n++){var o=a.data.list[n],i={url:"pages/diy-page/diy-page?page_id="+o.page_id,name:o.page_name,type:"自定义页面"};t.push(i)}e.pages=t,e.pages.length>0&&(e.activePage=e.pages[0],e.changeFunc(e.activePage))})).catch((function(a){e.loading=!1}))},changeFunc:function(e){this.$emit("changeData",e)}}},[["render",function(e,a,t,i,u,r){var s=n,c=l,d=o;return j((k(),C(c,{modelValue:u.activePage,"onUpdate:modelValue":a[0]||(a[0]=function(e){return u.activePage=e}),placeholder:"请选择",class:"percent-w100",onChange:r.changeFunc,"value-key":"url"},{default:x((function(){return[(k(!0),V(D,null,w(u.pages,(function(e){return k(),C(s,{key:e.url,label:e.name,value:e},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","onChange"])),[[d,u.loading]])}]]),G=b({data:function(){return{pages:[{url:"pages/index/index",name:"首页",type:"页面"},{url:"pages/order/myorder",name:"订单",type:"页面"},{url:"pages/user/index/index",name:"我的",type:"页面"},{url:"pages/product/list/takeaway?orderType=takein",name:"自取",type:"页面"},{url:"pages/product/list/takeaway?orderType=takeout",name:"外卖",type:"页面"},{url:"pages/shop/shop_list",name:"门店列表",type:"页面"},{url:"pages/product/list/store",name:"快餐模式",type:"页面"},{url:"pages/call/call",name:"排队叫号",type:"页面"}],activePage:"首页"}},created:function(){this.changeFunc(this.pages[0])},methods:{changeFunc:function(e){this.$emit("changeData",e)}}},[["render",function(e,a,t,o,i,u){var r=n,s=l;return k(),C(s,{modelValue:i.activePage,"onUpdate:modelValue":a[0]||(a[0]=function(e){return i.activePage=e}),placeholder:"请选择",class:"percent-w100",onChange:u.changeFunc,"value-key":"url"},{default:x((function(){return[(k(!0),V(D,null,w(i.pages,(function(e){return k(),C(r,{key:e.url,"value-key":e.name,label:e.name,value:e},null,8,["value-key","label","value"])})),128))]})),_:1},8,["modelValue","onChange"])}]]),O={class:"marketing-box"},R={key:0,class:"product"},B={class:"product-content"},J={class:"table-wrap type-table"},Q={key:1,class:"product-list"},W={class:"common-seach-wrap"},X={class:"product-content"},H={class:"table-wrap setlink-product-table"},K={class:"product-info"},Y={class:"pic"},Z={alt:""},ee={class:"info"},ae={class:"name text-ellipsis"},te={class:"red"},ne={class:"pagination"},le={components:{Menu:E,Pages:G,Product:b({data:function(){return{loading:!0,activeTab:"type",categoryList:[],categoryActive:[],searchForm:{product_name:""},tableData:[],pageSize:5,totalDataNumber:0,curPage:1,activePage:null}},created:function(){this.getCategory()},watch:{activeTab:function(e,a){e!=a&&(this.tableData=[],"type"==e&&this.autoType(),"detail"==e&&this.getData())}},methods:{getCategory:function(){var e=this;e.loading=!0,I.catList({},!0).then((function(a){e.categoryList=a.data.list,e.autoType(),e.loading=!1})).catch((function(a){e.loading=!1}))},autoType:function(e){if(e|=0,this.categoryActive=[],this.categoryList.length>0){var a=this.categoryList[e];this.categoryActive.push(a.category_id),a.child&&void 0!==a.child&&a.child.length>0?(this.categoryActive.push(a.child[0].category_id),this.changeFunc(a.child[0])):(e++,this.autoType(e))}},changeCategory:function(e){var a=this.$refs.cascader.getCheckedNodes();this.changeFunc(a[0].data)},handleCurrentChange:function(e){this.curPage=e,this.getData()},handleSizeChange:function(e){this.pageSize=e,this.curPage=0,this.getData()},getData:function(){var e=this;e.loading=!0;var a={};a.page=e.curPage,a.list_rows=e.pageSize,a.product_name=e.searchForm.product_name,I.productList(a,!0).then((function(a){e.loading=!1,e.tableData=a.data.list.data,e.totalDataNumber=a.data.list.total,1==e.curPage&&e.tableData.length>0&&e.changeFunc(e.tableData[0])})).catch((function(a){e.loading=!1}))},onSubmit:function(){this.curPage=0,this.getData()},changeFunc:function(e){var a={};"type"==this.activeTab&&(a.name=e.name,a.url="pages/product/list/list?category_id="+e.category_id,a.type="商品分类"),"detail"==this.activeTab&&(a.name=e.product_name,a.url="pages/product/detail/detail?product_id="+e.product_id,a.type="商品详情"),this.$emit("changeData",a)}}},[["render",function(e,a,t,n,l,h){var y=i,v=u,_=r,b=s,C=c,D=d,w=p,T=g,L=f,N=m,I=o,q=F("img-url");return k(),V("div",O,[P(v,{modelValue:l.activeTab,"onUpdate:modelValue":a[0]||(a[0]=function(e){return l.activeTab=e})},{default:x((function(){return[P(y,{label:"分类",name:"type"}),P(y,{label:"详情",name:"detail"})]})),_:1},8,["modelValue"]),"type"==l.activeTab?(k(),V("div",R,[j((k(),V("div",B,[z("div",J,[P(_,{class:"ww100",ref:"cascader",modelValue:l.categoryActive,"onUpdate:modelValue":a[1]||(a[1]=function(e){return l.categoryActive=e}),options:l.categoryList,props:{children:"child",value:"category_id",label:"name"},onChange:h.changeCategory},null,8,["modelValue","options","onChange"])])])),[[I,l.loading]])])):U("",!0),"detail"==l.activeTab?j((k(),V("div",Q,[z("div",W,[P(w,{size:"small",inline:!0,model:l.searchForm,class:"demo-form-inline"},{default:x((function(){return[P(C,{label:"商品名称"},{default:x((function(){return[P(b,{size:"small",modelValue:l.searchForm.product_name,"onUpdate:modelValue":a[2]||(a[2]=function(e){return l.searchForm.product_name=e}),placeholder:"请输入商品名称"},null,8,["modelValue"])]})),_:1}),P(C,null,{default:x((function(){return[P(D,{size:"small",icon:"el-icon-search",onClick:h.onSubmit},{default:x((function(){return[S("查询")]})),_:1},8,["onClick"])]})),_:1})]})),_:1},8,["model"])]),z("div",X,[z("div",H,[P(L,{size:"",data:l.tableData,border:"",style:{width:"100%"}},{default:x((function(){return[P(T,{prop:"product_name",label:"产品"},{default:x((function(e){return[z("div",K,[z("div",Y,[j(z("img",Z,null,512),[[q,e.row.image[0].file_path]])]),z("div",ee,[z("div",ae,$(e.row.product_name),1)])])]})),_:1}),P(T,{prop:"product_price",label:"价格",width:"100"},{default:x((function(e){return[z("span",te,$(e.row.product_price),1)]})),_:1}),P(T,{label:"操作",width:"80"},{default:x((function(e){return[P(D,{size:"",onClick:function(a){return h.changeFunc(e.row)}},{default:x((function(){return[S("选择")]})),_:2},1032,["onClick"])]})),_:1})]})),_:1},8,["data"])])]),z("div",ne,[P(N,{onSizeChange:h.handleSizeChange,onCurrentChange:h.handleCurrentChange,background:"","current-page":l.curPage,"page-size":l.pageSize,layout:"total, prev, pager, next, jumper",total:l.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])),[[I,l.loading]]):U("",!0)])}],["__scopeId","data-v-2b4e01ff"]]),DiyPage:A},data:function(){return{dialogVisible:!0,activeData:null,activeName:"pages"}},props:["is_linkset"],created:function(){this.dialogVisible=this.is_linkset},methods:{dialogFormVisible:function(e){e?this.$emit("closeDialog",this.activeData):this.$emit("closeDialog",null)},activeDataFunc:function(e){this.activeData=e}}},oe=function(e){return T("data-v-782ba3de"),e=e(),L(),e},ie={class:"dialog-footer d-b-c"},ue={class:"flex-1"},re={key:0,class:"d-s-s d-c tl"},se={class:"text-ellipsis setlink-set-link"},ce=oe((function(){return z("span",null,"当前链接：",-1)})),de={class:"gray9"},pe=oe((function(){return z("span",{class:"p-0-10 gray"},"/",-1)})),ge={class:"blue"},fe={class:"text-ellipsis gray",style:{"font-size":"10px"}},me={key:1,class:"tl"},he={class:"setlink-footer-btn"},ye=b(le,[["render",function(e,a,t,n,l,o){var r=G,s=i,c=A,p=E,g=u,f=d,m=h;return k(),C(m,{title:"超链接设置",modelValue:l.dialogVisible,"onUpdate:modelValue":a[3]||(a[3]=function(e){return l.dialogVisible=e}),onClose:o.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1,"append-to-body":!0},{footer:x((function(){return[z("div",ie,[z("div",ue,[null!=l.activeData?(k(),V("div",re,[z("p",se,[ce,z("span",de,$(l.activeData.type),1),pe,z("span",ge,$(l.activeData.name),1)]),z("p",fe,$(l.activeData.url),1)])):(k(),V("div",me," 暂无 "))]),z("div",he,[P(f,{size:"small",onClick:a[1]||(a[1]=function(e){return o.dialogFormVisible(!1)})},{default:x((function(){return[S("取 消")]})),_:1}),P(f,{size:"small",type:"primary",onClick:a[2]||(a[2]=function(e){return o.dialogFormVisible(!0)})},{default:x((function(){return[S("确 定")]})),_:1})])])]})),default:x((function(){return[P(g,{type:"border-card",modelValue:l.activeName,"onUpdate:modelValue":a[0]||(a[0]=function(e){return l.activeName=e})},{default:x((function(){return[P(s,{label:"页面",name:"pages"},{default:x((function(){return["pages"==l.activeName?(k(),C(r,{key:0,onChangeData:o.activeDataFunc},null,8,["onChangeData"])):U("",!0)]})),_:1}),P(s,{label:"自定义",name:"diypage"},{default:x((function(){return["diypage"==l.activeName?(k(),C(c,{key:0,onChangeData:o.activeDataFunc},null,8,["onChangeData"])):U("",!0)]})),_:1}),P(s,{label:"我的菜单",name:"menu"},{default:x((function(){return["menu"==l.activeName?(k(),C(p,{key:0,onChangeData:o.activeDataFunc},null,8,["onChangeData"])):U("",!0)]})),_:1})]})),_:1},8,["modelValue"])]})),_:1},8,["modelValue","onClose"])}],["__scopeId","data-v-782ba3de"]]),ve=function(e,a){return N._get("/shop/plus.homepush/index",e,a)},_e=function(e,a){return N._post("/shop/plus.homepush/index",e,a)},be={components:{Upload:q,Setlink:ye,GetCoupon:t},data:function(){return{form:{is_open:!1,name:"",des:"查看详情",title:"",remark:"",link:"",type:"1",image_id:0,file_path:""},coupon:[],loading:!1,open_add:!1,isupload:!1,is_linkset:!1}},created:function(){this.getData()},methods:{openUpload:function(e){this.type=e,this.isupload=!0},returnImgsFunc:function(e){null!=e&&e.length>0&&(this.form.file_path=e[0].file_path,this.form.image_id=e[0].file_id),this.isupload=!1},getData:function(){var e=this;ve().then((function(a){e.form=a.data.vars.values,"true"==e.form.is_open&&(e.form.is_open=!0),e.form.hasOwnProperty("coupon")?e.coupon=e.form.coupon:e.coupon=[]})).catch((function(e){}))},onSubmit:function(){var e=this,a=this,t=a.form;if(3==a.form.type&&(t.coupon=a.coupon),t.is_open&&!a.checkData(t))return!1;a.loading=!0,_e(t,!0).then((function(t){a.loading=!1,1==t.code&&(e.$ElMessage({message:$t("保存成功"),type:"success"}),a.getData())})).catch((function(e){a.loading=!1}))},changeLink:function(){this.is_linkset=!0},closeLinkset:function(e){this.is_linkset=!1,this.form.link=e},addCoupon:function(){this.open_add=!0},closeProductDialogFunc:function(e){if(this.open_add=e.openDialog,this.coupon.length>=3)return this.$ElMessage({message:"最多添加3张优惠券",type:"error"}),!1;if("success"==e.type){var a={};a.coupon_id=e.params.coupon_id,a.name=e.params.name,a.type=e.params.coupon_type.text,this.coupon.push(a)}},deleteCouponClick:function(e){this.coupon.splice(e,1)},checkData:function(e){if(1==e.type){if(!e.title)return this.$ElMessage({message:"标题不能为空",type:"error"}),!1;if(!e.des||!e.remark)return!1}if(e.type<3){if(!e.link)return this.$ElMessage({message:"请选择跳转链接",type:"error"}),!1}else if(0==e.coupon.length)return this.$ElMessage({message:"请选择优惠卷",type:"error"}),!1;return e.image_id>0||(this.$ElMessage({message:"请上传图片",type:"error"}),!1)}}},ke={class:"pb50"},Ce=function(e){return T("data-v-e0b0573d"),e=e(),L(),e}((function(){return z("div",{class:"huodong"},"建议换活动，此名称更换，商城首页弹窗根据此名称不同来弹窗",-1)})),xe={key:0},Ve={key:0,class:"img mt10"},De=["src"],we={class:"huodong"},je={key:0},Fe={key:1},Pe={key:2},ze={class:"btn-box"},Ue={class:"mt10 flex-1"},Se={class:"fb orange"},$e={class:"fb orange"},Te={class:"common-button-wrapper"};e("default",b(be,[["render",function(e,a,n,l,o,i){var u=y,r=c,m=s,h=v,b=d,D=_,w=g,j=f,F=p,T=q,L=ye,N=t;return k(),V("div",ke,[P(F,{size:"small",ref:"form",model:o.form,"label-position":"top","label-width":"100px"},{default:x((function(){return[P(r,{label:"开启首页推送",prop:"is_open"},{default:x((function(){return[P(u,{modelValue:o.form.is_open,"onUpdate:modelValue":a[0]||(a[0]=function(e){return o.form.is_open=e})},null,8,["modelValue"])]})),_:1}),P(r,{label:"活动名称",rules:[{required:!0,message:" "}],prop:"name"},{default:x((function(){return[P(m,{class:"max-w460",modelValue:o.form.name,"onUpdate:modelValue":a[1]||(a[1]=function(e){return o.form.name=e}),placeholder:"",type:"text"},null,8,["modelValue"])]})),_:1}),Ce,o.form.is_open?(k(),V("div",xe,[P(r,{label:"类型"},{default:x((function(){return[P(h,{modelValue:o.form.type,"onUpdate:modelValue":a[2]||(a[2]=function(e){return o.form.type=e}),label:"1"},{default:x((function(){return[S("图文")]})),_:1},8,["modelValue"]),P(h,{modelValue:o.form.type,"onUpdate:modelValue":a[3]||(a[3]=function(e){return o.form.type=e}),label:"2"},{default:x((function(){return[S("纯图")]})),_:1},8,["modelValue"]),P(h,{modelValue:o.form.type,"onUpdate:modelValue":a[4]||(a[4]=function(e){return o.form.type=e}),label:"3"},{default:x((function(){return[S("领取优惠券")]})),_:1},8,["modelValue"])]})),_:1}),1==o.form.type?(k(),C(r,{key:0,label:"标题",rules:[{required:!0,message:" "}],prop:"title"},{default:x((function(){return[P(m,{modelValue:o.form.title,"onUpdate:modelValue":a[5]||(a[5]=function(e){return o.form.title=e}),placeholder:"请输入标题",class:"max-w460"},null,8,["modelValue"])]})),_:1})):U("",!0),P(r,{label:"弹窗图片"},{default:x((function(){return[P(D,null,{default:x((function(){return[P(b,{icon:"Upload",onClick:i.openUpload},{default:x((function(){return[S("选择图片")]})),_:1},8,["onClick"]),o.form.image_id>0?(k(),V("div",Ve,[z("img",{src:o.form.file_path,width:"100",height:"100"},null,8,De)])):U("",!0)]})),_:1})]})),_:1}),z("div",we,[S("图片为2M以内大小，格式限png，jpg格式 "),1==o.form.type?(k(),V("span",je,"建议尺寸：600x300；")):U("",!0),2==o.form.type?(k(),V("span",Fe,"建议尺寸：600x420；")):U("",!0),3==o.form.type?(k(),V("span",Pe,"建议尺寸：600x250；")):U("",!0)]),1==o.form.type?(k(),C(r,{key:1,label:"按钮文案",rules:[{required:!0,message:" "}],prop:"des"},{default:x((function(){return[P(m,{class:"max-w460",modelValue:o.form.des,"onUpdate:modelValue":a[6]||(a[6]=function(e){return o.form.des=e}),placeholder:"",type:"text"},null,8,["modelValue"])]})),_:1})):U("",!0),1==o.form.type?(k(),C(r,{key:2,label:"简介说明",rules:[{required:!0,message:" "}],prop:"remark"},{default:x((function(){return[P(m,{type:"textarea",rows:2,max:"100",placeholder:"请输入说明",modelValue:o.form.remark,"onUpdate:modelValue":a[7]||(a[7]=function(e){return o.form.remark=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1})):U("",!0),o.form.type<3?(k(),C(r,{key:3,label:"跳转地址",rules:[{required:!0,message:" "}],prop:"link"},{default:x((function(){return[o.form.link?(k(),C(m,{key:0,class:"max-w460",placeholder:"点击选择你要链接的位置",value:"链接到"+o.form.link.type+" "+o.form.link.name,disabled:!0},null,8,["value"])):U("",!0),o.form.link?U("",!0):(k(),C(m,{key:1,class:"max-w460",placeholder:"点击选择你要链接的位置",disabled:!0})),P(b,{icon:"el-icon-link",onClick:i.changeLink},{default:x((function(){return[S("选择链接")]})),_:1},8,["onClick"])]})),_:1})):U("",!0),3==o.form.type?(k(),C(r,{key:4,label:"选择优惠券"},{default:x((function(){return[z("div",ze,[P(b,{size:"small",icon:"Plus",onClick:a[8]||(a[8]=function(e){return i.addCoupon()})},{default:x((function(){return[S("添加优惠券")]})),_:1}),S(" （最多可以添加三张） ")])]})),_:1})):U("",!0),3==o.form.type?(k(),C(r,{key:5},{default:x((function(){return[z("div",Ue,[P(j,{size:"small",data:o.coupon,style:{width:"100%"}},{default:x((function(){return[P(w,{prop:"name",label:"优惠券"},{default:x((function(e){return[z("span",Se,$(e.row.name),1)]})),_:1}),P(w,{prop:"name",label:"类型"},{default:x((function(e){return[z("span",$e,$(e.row.type),1)]})),_:1}),P(w,{label:"操作",width:"90"},{default:x((function(e){return[P(b,{onClick:function(a){return i.deleteCouponClick(e.row.$index)},type:"primary",link:"",size:"small"},{default:x((function(){return[S("删除")]})),_:2},1032,["onClick"])]})),_:1})]})),_:1},8,["data"])])]})),_:1})):U("",!0)])):U("",!0),z("div",Te,[P(b,{size:"small",type:"primary",onClick:i.onSubmit,loading:o.loading},{default:x((function(){return[S("提交")]})),_:1},8,["onClick","loading"])])]})),_:1},8,["model"]),o.isupload?(k(),C(T,{key:0,isupload:o.isupload,type:e.type,onReturnImgs:i.returnImgsFunc},{default:x((function(){return[S("上传图片")]})),_:1},8,["isupload","type","onReturnImgs"])):U("",!0),o.is_linkset?(k(),C(L,{key:1,is_linkset:o.is_linkset,onCloseDialog:i.closeLinkset},{default:x((function(){return[S("选择链接")]})),_:1},8,["is_linkset","onCloseDialog"])):U("",!0),o.open_add?(k(),C(N,{key:2,open_add:o.open_add,onCloseDialog:a[9]||(a[9]=function(e){return i.closeProductDialogFunc(e)})},{default:x((function(){return[S("选择优惠券弹出层")]})),_:1},8,["open_add"])):U("",!0)])}],["__scopeId","data-v-e0b0573d"]]))}}}));