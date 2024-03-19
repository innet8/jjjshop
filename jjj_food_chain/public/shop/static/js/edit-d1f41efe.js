import{_ as e}from"./GetCoupon-c0073f89.js";import{_ as a}from"./Upload-3f87d487.js";import{E as o,g as l,h as t,i,O as s,H as d,w as r,r as n,L as p,e as m}from"./element-plus-bf694ad1.js";import{I as u}from"./invitationgift-138c8afa.js";import{_}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as c,c as f,a as h,O as g,R as j,V as y,X as V,P as v,a7 as w,W as b,S as x}from"./@vue-b57a05a6.js";import"./coupon-32280a4b.js";import"./index-7f22f02f.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./@element-plus-ce7ae957.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./dayjs-33a066dd.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-372b9f8c.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";const U={components:{GetCoupon:e,Upload:a},data:()=>({form:{name:"",inv_condition:"0",value1:[],image_id:"",is_show:1,share_image_id:"",share_title:"",share_desc:""},tableData:[],loading:!1,open_add:!1,rewardData:[],coupon_index:0,file_path:"",isupload:!1,share_file_path:"",formRules:{image_id:[{required:!0,message:"请上传背景图",trigger:"blur"}],share_image_id:[{required:!0,message:"请上传分享图",trigger:"blur"}]}}),created(){this.getData()},methods:{getData(){let e=this,a=e.$route.query.invitation_gift_id;u.getInvitation({invitation_gift_id:a},!0).then((a=>{e.form=a.data.data,e.rewardData=a.data.data.Reward,e.file_path=a.data.data.file_path,e.share_file_path=a.data.data.share.file_path})).catch((a=>{e.loading=!1}))},addInv(){this.rewardData.push({invitation_num:1,is_coupon:!1,point:0,is_point:!1,coupon_ids:"",coupon_name:""})},addCoupon(e){this.open_add=!0,this.coupon_index=e},closeProductDialogFunc(e){let a=this,l=a.coupon_index;a.open_add=e.openDialog,-1==a.rewardData[l].coupon_name.indexOf(e.params.name)?(a.rewardData[l].coupon_ids+=e.params.coupon_id+",",""==a.rewardData[l].coupon_name?a.rewardData[l].coupon_name+=e.params.name:a.rewardData[l].coupon_name+=","+e.params.name):o.error("请勿重复添加")},onSubmit(){let e=this;if(0==e.rewardData.length)return void o.error("请添加奖项");let a=e.form;a.reward_data=e.rewardData,e.$refs.form.validate((o=>{o&&(e.loading=!0,u.editInvitation(a,!0).then((a=>{e.loading=!1,1==a.code?(this.$ElMessage({message:a.msg,type:"success"}),e.$router.push("/plus/invitation/index")):e.loading=!1})).catch((a=>{e.loading=!1})))}))},gotoBack(){this.$router.back(-1)},openUpload(e){this.type=e,this.isupload=!0},returnImgsFunc(e){null!=e&&e.length>0&&("image"==this.type?(this.file_path=e[0].file_path,this.form.image_id=e[0].file_id):"share"==this.type&&(this.share_file_path=e[0].file_path,this.form.share_image_id=e[0].file_id)),this.isupload=!1},delReward(e){this.rewardData.splice(e,1)}}},k={class:"user"},D=h("div",{class:"common-form"},"新增活动会场",-1),C={class:"product-content"},I={key:0,class:"img"},q=["src"],R={key:0,class:"img"},z=["src"],F={class:"block"},$=h("span",{class:"demonstration"},null,-1),B=h("div",{class:"common-form"},"邀请成功的条件",-1),E=h("div",{class:"common-form"},"礼品设置",-1),G={style:{"font-weight":"900"}},O=h("span",null,"每邀请",-1),P=h("span",null,"人获得礼品",-1),S={style:{padding:"10px 20px 20px 40px"}},H={class:"common-button-wrapper"};const J=_(U,[["render",function(o,u,_,U,J,L){const M=l,W=t,X=i,A=s,K=d,N=r,Q=n,T=p,Y=m,Z=a,ee=e;return c(),f("div",k,[D,h("div",C,[g(Y,{ref:"form",model:J.form,"label-position":"top",rules:J.formRules,"label-width":"150px"},{default:j((()=>[g(W,{label:"活动标题",prop:"name",rules:[{required:!0,message:" "}]},{default:j((()=>[g(M,{type:"text",modelValue:J.form.name,"onUpdate:modelValue":u[0]||(u[0]=e=>J.form.name=e),placeholder:"请输入活动标题",class:"max-w460"},null,8,["modelValue"])])),_:1}),g(W,{label:"背景图",prop:"image_id"},{default:j((()=>[g(A,null,{default:j((()=>[g(X,{type:"primary",onClick:u[1]||(u[1]=e=>L.openUpload("image"))},{default:j((()=>[y("选择图片")])),_:1}),""!=J.form.image_id?(c(),f("div",I,[h("img",{src:J.file_path,width:"100",height:"100"},null,8,q)])):V("",!0)])),_:1})])),_:1}),g(W,{label:"分享标题",prop:"share_title",rules:[{required:!0,message:" "}]},{default:j((()=>[g(M,{type:"text",modelValue:J.form.share_title,"onUpdate:modelValue":u[2]||(u[2]=e=>J.form.share_title=e),placeholder:"请输入分享标题",class:"max-w460"},null,8,["modelValue"])])),_:1}),g(W,{label:"分享内容",prop:"share_desc",rules:[{required:!0,message:" "}]},{default:j((()=>[g(M,{type:"text",modelValue:J.form.share_desc,"onUpdate:modelValue":u[3]||(u[3]=e=>J.form.share_desc=e),placeholder:"请输入分享内容",class:"max-w460"},null,8,["modelValue"])])),_:1}),g(W,{label:"分享图",prop:"share_image_id"},{default:j((()=>[g(A,null,{default:j((()=>[g(X,{type:"primary",onClick:u[4]||(u[4]=e=>L.openUpload("share"))},{default:j((()=>[y("选择图片")])),_:1}),""!=J.form.share_image_id?(c(),f("div",R,[h("img",{src:J.share_file_path,width:"100",height:"100"},null,8,z)])):V("",!0)])),_:1})])),_:1}),g(W,{label:"活动日期",prop:"value1",rules:[{required:!0,message:" "}]},{default:j((()=>[h("div",F,[$,g(K,{modelValue:J.form.value1,"onUpdate:modelValue":u[5]||(u[5]=e=>J.form.value1=e),type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])])])),_:1}),g(W,{label:"个人中心状态"},{default:j((()=>[h("div",null,[g(N,{modelValue:J.form.is_show,"onUpdate:modelValue":u[6]||(u[6]=e=>J.form.is_show=e),label:1},{default:j((()=>[y("显示")])),_:1},8,["modelValue"]),g(N,{modelValue:J.form.is_show,"onUpdate:modelValue":u[7]||(u[7]=e=>J.form.is_show=e),label:0},{default:j((()=>[y("隐藏")])),_:1},8,["modelValue"])])])),_:1}),B,g(W,{label:"邀请成功的条件 "},{default:j((()=>[g(N,{modelValue:J.form.inv_condition,"onUpdate:modelValue":u[8]||(u[8]=e=>J.form.inv_condition=e),label:"0"},{default:j((()=>[y("邀请成为会员")])),_:1},8,["modelValue"]),g(N,{modelValue:J.form.inv_condition,"onUpdate:modelValue":u[9]||(u[9]=e=>J.form.inv_condition=e),label:"1"},{default:j((()=>[y("邀请成为会员且消费")])),_:1},8,["modelValue"])])),_:1}),E,(c(!0),f(v,null,w(J.rewardData,((e,a)=>(c(),f("div",{key:a,class:"mt16"},[h("div",null,[h("span",G,"奖项"+b(a+1)+":",1),O,g(M,{type:"number",modelValue:e.invitation_num,"onUpdate:modelValue":a=>e.invitation_num=a,size:"",style:{width:"100px"}},null,8,["modelValue","onUpdate:modelValue"]),P,g(Q,{modelValue:e.is_point,"onUpdate:modelValue":a=>e.is_point=a,class:"pl16"},{default:j((()=>[y("积分")])),_:2},1032,["modelValue","onUpdate:modelValue"]),g(M,{type:"number",modelValue:e.point,"onUpdate:modelValue":a=>e.point=a,size:"",style:{width:"100px"}},null,8,["modelValue","onUpdate:modelValue"]),g(Q,{modelValue:e.is_coupon,"onUpdate:modelValue":a=>e.is_coupon=a,class:"pl16"},{default:j((()=>[y("优惠券")])),_:2},1032,["modelValue","onUpdate:modelValue"]),g(M,{type:"text",modelValue:e.coupon_name,"onUpdate:modelValue":a=>e.coupon_name=a,size:"",disabled:"true",style:{width:"200px"}},null,8,["modelValue","onUpdate:modelValue"]),g(X,{type:"primary",size:"",onClick:e=>L.addCoupon(a)},{default:j((()=>[y("选择优惠券")])),_:2},1032,["onClick"]),g(T,{type:"primary",onClick:e=>L.delReward(a),style:{float:"right"}},{default:j((()=>[y("删除")])),_:2},1032,["onClick"])])])))),128)),h("div",S,[g(T,{type:"primary",onClick:L.addInv},{default:j((()=>[y("添加奖励项")])),_:1},8,["onClick"])])])),_:1},8,["model","rules"]),h("div",H,[g(X,{onClick:L.gotoBack},{default:j((()=>[y("返回")])),_:1},8,["onClick"]),g(X,{type:"primary",onClick:L.onSubmit,loading:J.loading},{default:j((()=>[y("提交")])),_:1},8,["onClick","loading"])])]),J.isupload?(c(),x(Z,{key:0,isupload:J.isupload,type:o.type,onReturnImgs:L.returnImgsFunc},{default:j((()=>[y("上传图片")])),_:1},8,["isupload","type","onReturnImgs"])):V("",!0),J.open_add?(c(),x(ee,{key:1,open_add:J.open_add,onCloseDialog:u[10]||(u[10]=e=>L.closeProductDialogFunc(e))},{default:j((()=>[y("选择优惠券弹出层 ")])),_:1},8,["open_add"])):V("",!0)])}]]);export{J as default};