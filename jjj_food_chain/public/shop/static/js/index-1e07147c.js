import{_ as e}from"./GetCoupon-85c5e728.js";import{q as a,r as t,v as l,H as o,I as s,Q as i,g as n,h as r,i as p,e as d,m as u,n as c,A as m,w as g,E as h,C as y,o as f,N as _}from"./element-plus-d03e850c.js";import{_ as v}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as k,T as b,S as C,c as V,Q as D,a8 as j,$ as w,ap as x,P as F,a as P,Y as z,W as U,X as T}from"./@vue-e72ffbb6.js";import{r as L}from"./index-8a56ff53.js";import{P as S}from"./product-a2381416.js";import{_ as N}from"./Upload-8d45ba26.js";import"./coupon-19d5a95f.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./file-4be86a03.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const $=v({data:()=>({pages:[{url:"/pages/user/address/address",name:"收货地址",type:"菜单"},{url:"/pages/coupon/coupon",name:"领券中心",type:"菜单"},{url:"/pages/user/my-coupon/my-coupon",name:"我的优惠券",type:"菜单"},{url:"/pages/plus/birthgift/birthgift",name:"生日有礼",type:"菜单"},{url:"/pages/plus/newgifts/newgifts",name:"新客有礼",type:"菜单"},{url:"/pages/plus/points/list/list",name:"积分商城",type:"菜单"},{url:"/pages/plus/signin/signin",name:"签到",type:"菜单"},{url:"/pages/order/package",name:"券包",type:"菜单"},{url:"/pages/plus/rider/rider",name:"骑手大厅",type:"菜单",sys_tag:"driver"},{url:"/pages/plus/invite/invite",name:"邀请有礼",type:"菜单"},{url:"/pages/agent/index/index",name:"分销中心",type:"菜单"},{url:"/pages/user/set/set",name:"设置",type:"菜单"},{url:"scanQrcode",name:"扫一扫(仅限导航组)",type:"菜单"},{url:"/pages/plus/group/list",name:"团购商品",type:"菜单"},{url:"receipt",name:"团购核销",type:"菜单"},{url:"/pages/order/group-list",name:"团购订单",type:"菜单"}],activePage:"收货地址"}),created(){this.changeFunc(this.pages[0])},methods:{changeFunc(e){this.$emit("changeData",e)}}},[["render",function(e,l,o,s,i,n){const r=a,p=t;return k(),b(p,{modelValue:i.activePage,"onUpdate:modelValue":l[0]||(l[0]=e=>i.activePage=e),placeholder:"请选择",class:"percent-w100",onChange:n.changeFunc,"value-key":"url"},{default:C((()=>[(k(!0),V(D,null,j(i.pages,(e=>(k(),b(r,{key:e.url,"value-key":e.name,label:e.name,value:e},null,8,["value-key","label","value"])))),128))])),_:1},8,["modelValue","onChange"])}]]);let A={getPageList:(e,a)=>L._post("/shop/data.link/getPageList",e,a)};const q=v({data:()=>({loading:!0,pages:[],activePage:{}}),created(){this.getData()},methods:{getData(){let e=this;A.getPageList({},!0).then((a=>{e.loading=!1;let t=[];for(let e=0,l=a.data.list.length;e<l;e++){let l=a.data.list[e],o={url:"pages/diy-page/diy-page?page_id="+l.page_id,name:l.page_name,type:"自定义页面"};t.push(o)}e.pages=t,e.pages.length>0&&(e.activePage=e.pages[0],e.changeFunc(e.activePage))})).catch((a=>{e.loading=!1}))},changeFunc(e){this.$emit("changeData",e)}}},[["render",function(e,o,s,i,n,r){const p=a,d=t,u=l;return w((k(),b(d,{modelValue:n.activePage,"onUpdate:modelValue":o[0]||(o[0]=e=>n.activePage=e),placeholder:"请选择",class:"percent-w100",onChange:r.changeFunc,"value-key":"url"},{default:C((()=>[(k(!0),V(D,null,j(n.pages,(e=>(k(),b(p,{key:e.url,label:e.name,value:e},null,8,["label","value"])))),128))])),_:1},8,["modelValue","onChange"])),[[u,n.loading]])}]]);const I=v({data:()=>({pages:[{url:"pages/index/index",name:"首页",type:"页面"},{url:"pages/order/myorder",name:"订单",type:"页面"},{url:"pages/user/index/index",name:"我的",type:"页面"},{url:"pages/product/list/takeaway?orderType=takein",name:"自取",type:"页面"},{url:"pages/product/list/takeaway?orderType=takeout",name:"外卖",type:"页面"},{url:"pages/shop/shop_list",name:"门店列表",type:"页面"},{url:"pages/product/list/store",name:"快餐模式",type:"页面"},{url:"pages/call/call",name:"排队叫号",type:"页面"}],activePage:"首页"}),created(){this.changeFunc(this.pages[0])},methods:{changeFunc(e){this.$emit("changeData",e)}}},[["render",function(e,l,o,s,i,n){const r=a,p=t;return k(),b(p,{modelValue:i.activePage,"onUpdate:modelValue":l[0]||(l[0]=e=>i.activePage=e),placeholder:"请选择",class:"percent-w100",onChange:n.changeFunc,"value-key":"url"},{default:C((()=>[(k(!0),V(D,null,j(i.pages,(e=>(k(),b(r,{key:e.url,"value-key":e.name,label:e.name,value:e},null,8,["value-key","label","value"])))),128))])),_:1},8,["modelValue","onChange"])}]]),Q={class:"marketing-box"},G={key:0,class:"product"},M={class:"product-content"},R={class:"table-wrap type-table"},W={key:1,class:"product-list"},B={class:"common-seach-wrap"},E={class:"product-content"},H={class:"table-wrap setlink-product-table"},O={class:"product-info"},X={class:"pic"},Y={alt:""},J={class:"info"},K={class:"name text-ellipsis"},Z={class:"red"},ee={class:"pagination"};const ae={components:{Menu:$,Pages:I,Product:v({data:()=>({loading:!0,activeTab:"type",categoryList:[],categoryActive:[],searchForm:{product_name:""},tableData:[],pageSize:5,totalDataNumber:0,curPage:1,activePage:null}),created(){this.getCategory()},watch:{activeTab:function(e,a){e!=a&&(this.tableData=[],"type"==e&&this.autoType(),"detail"==e&&this.getData())}},methods:{getCategory(){let e=this;e.loading=!0,S.catList({},!0).then((a=>{e.categoryList=a.data.list,e.autoType(),e.loading=!1})).catch((a=>{e.loading=!1}))},autoType(e){if(e|=0,this.categoryActive=[],this.categoryList.length>0){let a=this.categoryList[e];this.categoryActive.push(a.category_id),a.child&&void 0!==a.child&&a.child.length>0?(this.categoryActive.push(a.child[0].category_id),this.changeFunc(a.child[0])):(e++,this.autoType(e))}},changeCategory(e){let a=this.$refs.cascader.getCheckedNodes();this.changeFunc(a[0].data)},handleCurrentChange(e){this.curPage=e,this.getData()},handleSizeChange(e){this.pageSize=e,this.curPage=0,this.getData()},getData(){let e=this;e.loading=!0;let a={};a.page=e.curPage,a.list_rows=e.pageSize,a.product_name=e.searchForm.product_name,S.productList(a,!0).then((a=>{e.loading=!1,e.tableData=a.data.list.data,e.totalDataNumber=a.data.list.total,1==e.curPage&&e.tableData.length>0&&e.changeFunc(e.tableData[0])})).catch((a=>{e.loading=!1}))},onSubmit(){this.curPage=0,this.getData()},changeFunc(e){let a={};"type"==this.activeTab&&(a.name=e.name,a.url="pages/product/list/list?category_id="+e.category_id,a.type="商品分类"),"detail"==this.activeTab&&(a.name=e.product_name,a.url="pages/product/detail/detail?product_id="+e.product_id,a.type="商品详情"),this.$emit("changeData",a)}}},[["render",function(e,a,t,g,h,y){const f=o,_=s,v=i,b=n,D=r,j=p,L=d,S=u,N=c,$=m,A=l,q=x("img-url");return k(),V("div",Q,[F(_,{modelValue:h.activeTab,"onUpdate:modelValue":a[0]||(a[0]=e=>h.activeTab=e)},{default:C((()=>[F(f,{label:"分类",name:"type"}),F(f,{label:"详情",name:"detail"})])),_:1},8,["modelValue"]),"type"==h.activeTab?(k(),V("div",G,[w((k(),V("div",M,[P("div",R,[F(v,{class:"ww100",ref:"cascader",modelValue:h.categoryActive,"onUpdate:modelValue":a[1]||(a[1]=e=>h.categoryActive=e),options:h.categoryList,props:{children:"child",value:"category_id",label:"name"},onChange:y.changeCategory},null,8,["modelValue","options","onChange"])])])),[[A,h.loading]])])):z("",!0),"detail"==h.activeTab?w((k(),V("div",W,[P("div",B,[F(L,{size:"small",inline:!0,model:h.searchForm,class:"demo-form-inline"},{default:C((()=>[F(D,{label:"商品名称"},{default:C((()=>[F(b,{size:"small",modelValue:h.searchForm.product_name,"onUpdate:modelValue":a[2]||(a[2]=e=>h.searchForm.product_name=e),placeholder:"请输入商品名称"},null,8,["modelValue"])])),_:1}),F(D,null,{default:C((()=>[F(j,{size:"small",icon:"el-icon-search",onClick:y.onSubmit},{default:C((()=>[U("查询")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])]),P("div",E,[P("div",H,[F(N,{size:"",data:h.tableData,border:"",style:{width:"100%"}},{default:C((()=>[F(S,{prop:"product_name",label:"产品"},{default:C((e=>[P("div",O,[P("div",X,[w(P("img",Y,null,512),[[q,e.row.image[0].file_path]])]),P("div",J,[P("div",K,T(e.row.product_name),1)])])])),_:1}),F(S,{prop:"product_price",label:"价格",width:"100"},{default:C((e=>[P("span",Z,T(e.row.product_price),1)])),_:1}),F(S,{label:"操作",width:"80"},{default:C((e=>[F(j,{size:"",onClick:a=>y.changeFunc(e.row)},{default:C((()=>[U("选择")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])])]),P("div",ee,[F($,{onSizeChange:y.handleSizeChange,onCurrentChange:y.handleCurrentChange,background:"","current-page":h.curPage,"page-size":h.pageSize,layout:"total, prev, pager, next, jumper",total:h.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])),[[A,h.loading]]):z("",!0)])}],["__scopeId","data-v-813616cc"]]),DiyPage:q},data:()=>({dialogVisible:!0,activeData:null,activeName:"pages"}),props:["is_linkset"],created(){this.dialogVisible=this.is_linkset},methods:{dialogFormVisible(e){e?this.$emit("closeDialog",this.activeData):this.$emit("closeDialog",null)},activeDataFunc(e){this.activeData=e}}},te={class:"dialog-footer d-b-c"},le={class:"flex-1"},oe={key:0,class:"d-s-s d-c tl"},se={class:"text-ellipsis setlink-set-link"},ie=P("span",null,"当前链接：",-1),ne={class:"gray9"},re=P("span",{class:"p-0-10 gray"},"/",-1),pe={class:"blue"},de={class:"text-ellipsis gray",style:{"font-size":"10px"}},ue={key:1,class:"tl"},ce={class:"setlink-footer-btn"};const me=v(ae,[["render",function(e,a,t,l,i,n){const r=I,d=o,u=q,c=$,m=s,h=p,y=g;return k(),b(y,{title:"超链接设置",modelValue:i.dialogVisible,"onUpdate:modelValue":a[3]||(a[3]=e=>i.dialogVisible=e),onClose:n.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1,"append-to-body":!0},{footer:C((()=>[P("div",te,[P("div",le,[null!=i.activeData?(k(),V("div",oe,[P("p",se,[ie,P("span",ne,T(i.activeData.type),1),re,P("span",pe,T(i.activeData.name),1)]),P("p",de,T(i.activeData.url),1)])):(k(),V("div",ue," 暂无 "))]),P("div",ce,[F(h,{size:"small",onClick:a[1]||(a[1]=e=>n.dialogFormVisible(!1))},{default:C((()=>[U("取 消")])),_:1}),F(h,{size:"small",type:"primary",onClick:a[2]||(a[2]=e=>n.dialogFormVisible(!0))},{default:C((()=>[U("确 定")])),_:1})])])])),default:C((()=>[F(m,{type:"border-card",modelValue:i.activeName,"onUpdate:modelValue":a[0]||(a[0]=e=>i.activeName=e)},{default:C((()=>[F(d,{label:"页面",name:"pages"},{default:C((()=>["pages"==i.activeName?(k(),b(r,{key:0,onChangeData:n.activeDataFunc},null,8,["onChangeData"])):z("",!0)])),_:1}),F(d,{label:"自定义",name:"diypage"},{default:C((()=>["diypage"==i.activeName?(k(),b(u,{key:0,onChangeData:n.activeDataFunc},null,8,["onChangeData"])):z("",!0)])),_:1}),F(d,{label:"我的菜单",name:"menu"},{default:C((()=>["menu"==i.activeName?(k(),b(c,{key:0,onChangeData:n.activeDataFunc},null,8,["onChangeData"])):z("",!0)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["modelValue","onClose"])}]]);let ge={getData:(e,a)=>L._get("/shop/plus.homepush/index",e,a),saveData:(e,a)=>L._post("/shop/plus.homepush/index",e,a)};const he={components:{Upload:N,Setlink:me,GetCoupon:e},data:()=>({form:{is_open:!1,name:"",des:"查看详情",title:"",remark:"",link:"",type:"1",image_id:0,file_path:""},coupon:[],loading:!1,open_add:!1,isupload:!1,is_linkset:!1}),created(){this.getData()},methods:{openUpload(e){this.type=e,this.isupload=!0},returnImgsFunc(e){null!=e&&e.length>0&&(this.form.file_path=e[0].file_path,this.form.image_id=e[0].file_id),this.isupload=!1},getData(){let e=this;ge.getData().then((a=>{e.form=a.data.vars.values,"true"==e.form.is_open&&(e.form.is_open=!0),e.form.hasOwnProperty("coupon")?e.coupon=e.form.coupon:e.coupon=[]})).catch((e=>{}))},onSubmit(){let e=this,a=e.form;if(3==e.form.type&&(a.coupon=e.coupon),a.is_open&&!e.checkData(a))return!1;e.loading=!0,ge.saveData(a,!0).then((a=>{e.loading=!1,1==a.code&&(h({message:"恭喜你，保存成功",type:"success"}),e.getData())})).catch((a=>{e.loading=!1}))},changeLink(){this.is_linkset=!0},closeLinkset(e){this.is_linkset=!1,this.form.link=e},addCoupon(){this.open_add=!0},closeProductDialogFunc(e){if(this.open_add=e.openDialog,this.coupon.length>=3)return h({message:"最多添加3张优惠券",type:"error"}),!1;if("success"==e.type){let a={};a.coupon_id=e.params.coupon_id,a.name=e.params.name,a.type=e.params.coupon_type.text,this.coupon.push(a)}},deleteCouponClick(e){this.coupon.splice(e,1)},checkData(e){if(1==e.type){if(!e.title)return h({message:"标题不能为空",type:"error"}),!1;if(!e.des||!e.remark)return!1}if(e.type<3){if(!e.link)return h({message:"请选择跳转链接",type:"error"}),!1}else if(0==e.coupon.length)return h({message:"请选择优惠卷",type:"error"}),!1;return e.image_id>0||(h({message:"请上传图片",type:"error"}),!1)}}},ye={class:"pb50"},fe=P("div",{class:"huodong"},"建议换活动，此名称更换，商城首页弹窗根据此名称不同来弹窗",-1),_e={key:0},ve={key:0,class:"img mt10"},ke=["src"],be={class:"huodong"},Ce={key:0},Ve={key:1},De={key:2},je={class:"btn-box"},we={class:"mt10 flex-1"},xe={class:"fb orange"},Fe={class:"fb orange"},Pe={class:"common-button-wrapper"};const ze=v(he,[["render",function(a,t,l,o,s,i){const m=y,g=r,h=n,v=f,D=p,j=_,w=u,x=c,L=d,S=N,$=me,A=e;return k(),V("div",ye,[F(L,{size:"small",ref:"form",model:s.form,"label-position":"top","label-width":"100px"},{default:C((()=>[F(g,{label:"开启首页推送",prop:"is_open"},{default:C((()=>[F(m,{modelValue:s.form.is_open,"onUpdate:modelValue":t[0]||(t[0]=e=>s.form.is_open=e)},null,8,["modelValue"])])),_:1}),F(g,{label:"活动名称",rules:[{required:!0,message:" "}],prop:"name"},{default:C((()=>[F(h,{class:"max-w460",modelValue:s.form.name,"onUpdate:modelValue":t[1]||(t[1]=e=>s.form.name=e),placeholder:"",type:"text"},null,8,["modelValue"])])),_:1}),fe,s.form.is_open?(k(),V("div",_e,[F(g,{label:"类型"},{default:C((()=>[F(v,{modelValue:s.form.type,"onUpdate:modelValue":t[2]||(t[2]=e=>s.form.type=e),label:"1"},{default:C((()=>[U("图文")])),_:1},8,["modelValue"]),F(v,{modelValue:s.form.type,"onUpdate:modelValue":t[3]||(t[3]=e=>s.form.type=e),label:"2"},{default:C((()=>[U("纯图")])),_:1},8,["modelValue"]),F(v,{modelValue:s.form.type,"onUpdate:modelValue":t[4]||(t[4]=e=>s.form.type=e),label:"3"},{default:C((()=>[U("领取优惠券")])),_:1},8,["modelValue"])])),_:1}),1==s.form.type?(k(),b(g,{key:0,label:"标题",rules:[{required:!0,message:" "}],prop:"title"},{default:C((()=>[F(h,{modelValue:s.form.title,"onUpdate:modelValue":t[5]||(t[5]=e=>s.form.title=e),placeholder:"请输入标题",class:"max-w460"},null,8,["modelValue"])])),_:1})):z("",!0),F(g,{label:"弹窗图片"},{default:C((()=>[F(j,null,{default:C((()=>[F(D,{icon:"Upload",onClick:i.openUpload},{default:C((()=>[U("选择图片")])),_:1},8,["onClick"]),s.form.image_id>0?(k(),V("div",ve,[P("img",{src:s.form.file_path,width:"100",height:"100"},null,8,ke)])):z("",!0)])),_:1})])),_:1}),P("div",be,[U("图片为2M以内大小，格式限png，jpg格式 "),1==s.form.type?(k(),V("span",Ce,"建议尺寸：600x300；")):z("",!0),2==s.form.type?(k(),V("span",Ve,"建议尺寸：600x420；")):z("",!0),3==s.form.type?(k(),V("span",De,"建议尺寸：600x250；")):z("",!0)]),1==s.form.type?(k(),b(g,{key:1,label:"按钮文案",rules:[{required:!0,message:" "}],prop:"des"},{default:C((()=>[F(h,{class:"max-w460",modelValue:s.form.des,"onUpdate:modelValue":t[6]||(t[6]=e=>s.form.des=e),placeholder:"",type:"text"},null,8,["modelValue"])])),_:1})):z("",!0),1==s.form.type?(k(),b(g,{key:2,label:"简介说明",rules:[{required:!0,message:" "}],prop:"remark"},{default:C((()=>[F(h,{type:"textarea",rows:2,max:"100",placeholder:"请输入说明",modelValue:s.form.remark,"onUpdate:modelValue":t[7]||(t[7]=e=>s.form.remark=e),class:"max-w460"},null,8,["modelValue"])])),_:1})):z("",!0),s.form.type<3?(k(),b(g,{key:3,label:"跳转地址",rules:[{required:!0,message:" "}],prop:"link"},{default:C((()=>[s.form.link?(k(),b(h,{key:0,class:"max-w460",placeholder:"点击选择你要链接的位置",value:"链接到"+s.form.link.type+" "+s.form.link.name,disabled:!0},null,8,["value"])):z("",!0),s.form.link?z("",!0):(k(),b(h,{key:1,class:"max-w460",placeholder:"点击选择你要链接的位置",disabled:!0})),F(D,{icon:"el-icon-link",onClick:i.changeLink},{default:C((()=>[U("选择链接")])),_:1},8,["onClick"])])),_:1})):z("",!0),3==s.form.type?(k(),b(g,{key:4,label:"选择优惠券"},{default:C((()=>[P("div",je,[F(D,{size:"small",icon:"Plus",onClick:t[8]||(t[8]=e=>i.addCoupon())},{default:C((()=>[U("添加优惠券")])),_:1}),U(" （最多可以添加三张） ")])])),_:1})):z("",!0),3==s.form.type?(k(),b(g,{key:5},{default:C((()=>[P("div",we,[F(x,{size:"small",data:s.coupon,style:{width:"100%"}},{default:C((()=>[F(w,{prop:"name",label:"优惠券"},{default:C((e=>[P("span",xe,T(e.row.name),1)])),_:1}),F(w,{prop:"name",label:"类型"},{default:C((e=>[P("span",Fe,T(e.row.type),1)])),_:1}),F(w,{label:"操作",width:"90"},{default:C((e=>[F(D,{onClick:a=>i.deleteCouponClick(e.row.$index),type:"primary",link:"",size:"small"},{default:C((()=>[U("删除")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])])])),_:1})):z("",!0)])):z("",!0),P("div",Pe,[F(D,{size:"small",type:"primary",onClick:i.onSubmit,loading:s.loading},{default:C((()=>[U("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]),s.isupload?(k(),b(S,{key:0,isupload:s.isupload,type:a.type,onReturnImgs:i.returnImgsFunc},{default:C((()=>[U("上传图片")])),_:1},8,["isupload","type","onReturnImgs"])):z("",!0),s.is_linkset?(k(),b($,{key:1,is_linkset:s.is_linkset,onCloseDialog:i.closeLinkset},{default:C((()=>[U("选择链接")])),_:1},8,["is_linkset","onCloseDialog"])):z("",!0),s.open_add?(k(),b(A,{key:2,open_add:s.open_add,onCloseDialog:t[9]||(t[9]=e=>i.closeProductDialogFunc(e))},{default:C((()=>[U("选择优惠券弹出层")])),_:1},8,["open_add"])):z("",!0)])}]]);export{ze as default};