import{_ as e}from"./GetCoupon-7a908fcb.js";import{_ as a}from"./Upload-a14cce3d.js";import{E as o,g as l,h as t,i,O as s,H as d,w as r,r as n,L as p,e as m}from"./element-plus-bf694ad1.js";import{I as u}from"./invitationgift-feedac91.js";import{_ as c}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as _,c as f,a as h,O as g,R as j,V as y,X as V,P as v,a7 as w,W as b,S as x,bm as U,bk as k}from"./@vue-b57a05a6.js";import"./coupon-95d48edf.js";import"./index-71f9662e.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./@element-plus-ce7ae957.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./dayjs-33a066dd.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-856e25a9.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";const C={components:{GetCoupon:e,Upload:a},data:()=>({form:{name:"",inv_condition:"0",value1:[],image_id:"",is_show:1,share_image_id:"",share_title:"",share_desc:""},tableData:[],loading:!1,open_add:!1,rewardData:[{invitation_num:1,is_coupon:!1,point:0,is_point:!1,coupon_ids:"",coupon_name:""}],coupon_index:0,isupload:!1,formRules:{image_id:[{required:!0,message:"请上传背景图",trigger:"blur"}],share_image_id:[{required:!0,message:"请上传分享图",trigger:"blur"}]}}),created(){},methods:{addInv(){this.rewardData.push({invitation_num:1,is_coupon:!1,point:0,is_point:!1,coupon_ids:"",coupon_name:""})},addCoupon(e){this.open_add=!0,this.coupon_index=e},closeProductDialogFunc(e){let a=this,l=a.coupon_index;a.open_add=e.openDialog,-1==a.rewardData[l].coupon_name.indexOf(e.params.name)?(a.rewardData[l].coupon_ids+=e.params.coupon_id+",",""==a.rewardData[l].coupon_name?a.rewardData[l].coupon_name+=e.params.name:a.rewardData[l].coupon_name+=","+e.params.name):o.error("请勿重复添加")},onSubmit(){let e=this;if(0==e.rewardData.length)return void o.error("请添加奖项");let a=e.form;a.reward_data=e.rewardData,e.$refs.form.validate((o=>{o&&(e.loading=!0,u.addInvitation(a,!0).then((a=>{e.loading=!1,1==a.code?(this.$ElMessage({message:a.msg,type:"success"}),e.$router.push("/plus/invitation/index")):e.loading=!1})).catch((a=>{e.loading=!1})))}))},openUpload(e){this.type=e,this.isupload=!0},returnImgsFunc(e){null!=e&&e.length>0&&("image"==this.type?(this.file_path=e[0].file_path,this.form.image_id=e[0].file_id):"share"==this.type&&(this.share_file_path=e[0].file_path,this.form.share_image_id=e[0].file_id)),this.isupload=!1},gotoBack(){this.$router.back(-1)},delReward(e){this.rewardData.splice(e,1)}}},D=e=>(U("data-v-fcb24842"),e=e(),k(),e),I={class:"user"},q=D((()=>h("div",{class:"common-form"},"新增活动会场",-1))),R={class:"product-content"},z={key:0,class:"img"},F=["src"],$={key:0,class:"img"},B=["src"],E={class:"block"},G=D((()=>h("span",{class:"demonstration"},null,-1))),O=D((()=>h("div",{class:"common-form"},"邀请成功的条件",-1))),P=D((()=>h("div",{class:"common-form"},"礼品设置",-1))),S={style:{"font-weight":"900"}},H=D((()=>h("span",null,"每邀请",-1))),J=D((()=>h("span",null,"人获得礼品",-1))),L={style:{padding:"10px 20px 20px 40px"}},M={class:"common-button-wrapper"};const W=c(C,[["render",function(o,u,c,U,k,C){const D=l,W=t,X=i,A=s,K=d,N=r,Q=n,T=p,Y=m,Z=a,ee=e;return _(),f("div",I,[q,h("div",R,[g(Y,{ref:"form",model:k.form,"label-position":"top",rules:k.formRules,"label-width":"150px"},{default:j((()=>[g(W,{label:"活动标题",prop:"name",rules:[{required:!0,message:" "}]},{default:j((()=>[g(D,{type:"text",modelValue:k.form.name,"onUpdate:modelValue":u[0]||(u[0]=e=>k.form.name=e),placeholder:"请输入活动标题",class:"max-w460"},null,8,["modelValue"])])),_:1}),g(W,{label:"分享标题",prop:"share_title",rules:[{required:!0,message:" "}]},{default:j((()=>[g(D,{type:"text",modelValue:k.form.share_title,"onUpdate:modelValue":u[1]||(u[1]=e=>k.form.share_title=e),placeholder:"请输入分享标题",class:"max-w460"},null,8,["modelValue"])])),_:1}),g(W,{label:"分享内容",prop:"share_desc",rules:[{required:!0,message:" "}]},{default:j((()=>[g(D,{type:"text",modelValue:k.form.share_desc,"onUpdate:modelValue":u[2]||(u[2]=e=>k.form.share_desc=e),placeholder:"请输入分享内容",class:"max-w460"},null,8,["modelValue"])])),_:1}),g(W,{label:"背景图",prop:"image_id"},{default:j((()=>[g(A,null,{default:j((()=>[g(X,{type:"primary",onClick:u[3]||(u[3]=e=>C.openUpload("image"))},{default:j((()=>[y("选择图片")])),_:1}),""!=k.form.image_id?(_(),f("div",z,[h("img",{src:o.file_path,width:"100",height:"100"},null,8,F)])):V("",!0)])),_:1})])),_:1}),g(W,{label:"分享图",prop:"share_image_id"},{default:j((()=>[g(A,null,{default:j((()=>[g(X,{type:"primary",onClick:u[4]||(u[4]=e=>C.openUpload("share"))},{default:j((()=>[y("选择图片")])),_:1}),""!=k.form.share_image_id?(_(),f("div",$,[h("img",{src:o.share_file_path,width:"100",height:"100"},null,8,B)])):V("",!0)])),_:1})])),_:1}),g(W,{label:"活动日期",prop:"value1",rules:[{required:!0,message:" "}]},{default:j((()=>[h("div",E,[G,g(K,{modelValue:k.form.value1,"onUpdate:modelValue":u[5]||(u[5]=e=>k.form.value1=e),type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])])])),_:1}),g(W,{label:"个人中心状态"},{default:j((()=>[h("div",null,[g(N,{modelValue:k.form.is_show,"onUpdate:modelValue":u[6]||(u[6]=e=>k.form.is_show=e),label:1},{default:j((()=>[y("显示")])),_:1},8,["modelValue"]),g(N,{modelValue:k.form.is_show,"onUpdate:modelValue":u[7]||(u[7]=e=>k.form.is_show=e),label:0},{default:j((()=>[y("隐藏")])),_:1},8,["modelValue"])])])),_:1}),O,g(W,{label:"邀请成功的条件 "},{default:j((()=>[g(N,{modelValue:k.form.inv_condition,"onUpdate:modelValue":u[8]||(u[8]=e=>k.form.inv_condition=e),label:"0"},{default:j((()=>[y("邀请成为会员")])),_:1},8,["modelValue"]),g(N,{modelValue:k.form.inv_condition,"onUpdate:modelValue":u[9]||(u[9]=e=>k.form.inv_condition=e),label:"1"},{default:j((()=>[y("邀请成为会员且消费")])),_:1},8,["modelValue"])])),_:1}),P,(_(!0),f(v,null,w(k.rewardData,((e,a)=>(_(),f("div",{key:a,class:"mt16"},[h("div",null,[h("span",S,"奖项"+b(a+1)+":",1),H,g(D,{type:"number",modelValue:e.invitation_num,"onUpdate:modelValue":a=>e.invitation_num=a,size:"",style:{width:"100px"}},null,8,["modelValue","onUpdate:modelValue"]),J,g(Q,{modelValue:e.is_point,"onUpdate:modelValue":a=>e.is_point=a,class:"pl16"},{default:j((()=>[y("积分")])),_:2},1032,["modelValue","onUpdate:modelValue"]),g(D,{type:"number",modelValue:e.point,"onUpdate:modelValue":a=>e.point=a,size:"",style:{width:"100px"}},null,8,["modelValue","onUpdate:modelValue"]),g(Q,{modelValue:e.is_coupon,"onUpdate:modelValue":a=>e.is_coupon=a,class:"pl16"},{default:j((()=>[y("优惠券")])),_:2},1032,["modelValue","onUpdate:modelValue"]),g(D,{type:"text",modelValue:e.coupon_name,"onUpdate:modelValue":a=>e.coupon_name=a,disabled:"true",size:"",style:{width:"200px"}},null,8,["modelValue","onUpdate:modelValue"]),g(X,{type:"primary",class:"youhui",size:"",onClick:e=>C.addCoupon(a)},{default:j((()=>[y("选择优惠券")])),_:2},1032,["onClick"]),g(T,{type:"primary",onClick:e=>C.delReward(a),style:{float:"right"}},{default:j((()=>[y("删除")])),_:2},1032,["onClick"])])])))),128)),h("div",L,[g(T,{type:"primary",onClick:C.addInv},{default:j((()=>[y("添加奖励项")])),_:1},8,["onClick"])])])),_:1},8,["model","rules"]),h("div",M,[g(X,{onClick:C.gotoBack},{default:j((()=>[y("返回")])),_:1},8,["onClick"]),g(X,{type:"primary",onClick:C.onSubmit,loading:k.loading},{default:j((()=>[y("提交")])),_:1},8,["onClick","loading"])])]),k.isupload?(_(),x(Z,{key:0,isupload:k.isupload,type:o.type,onReturnImgs:C.returnImgsFunc},{default:j((()=>[y("上传图片")])),_:1},8,["isupload","type","onReturnImgs"])):V("",!0),k.open_add?(_(),x(ee,{key:1,open_add:k.open_add,onCloseDialog:u[10]||(u[10]=e=>C.closeProductDialogFunc(e))},{default:j((()=>[y("选择优惠券弹出层")])),_:1},8,["open_add"])):V("",!0)])}],["__scopeId","data-v-fcb24842"]]);export{W as default};