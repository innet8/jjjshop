import{_ as e}from"./GetCoupon-efd683a4.js";import{_ as a}from"./Upload-e4289868.js";import{E as o,g as l,h as t,i,O as s,H as d,o as r,s as n,L as p,e as m}from"./element-plus-b01b3a31.js";import{I as u}from"./invitationgift-233d37ac.js";import{_}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as c,c as f,a as h,P as g,S as v,W as y,Y as V,Q as j,a8 as w,X as b,T as x}from"./@vue-e72ffbb6.js";import"./coupon-96c2157e.js";import"./index-98f906e9.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./call-bind-2971450c.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./@element-plus-4b00147d.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-86ef23f3.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const k={components:{GetCoupon:e,Upload:a},data:()=>({form:{name:"",inv_condition:"0",value1:[],image_id:"",is_show:1,share_image_id:"",share_title:"",share_desc:""},tableData:[],loading:!1,open_add:!1,rewardData:[],coupon_index:0,file_path:"",isupload:!1,share_file_path:"",formRules:{image_id:[{required:!0,message:"请上传背景图",trigger:"blur"}],share_image_id:[{required:!0,message:"请上传分享图",trigger:"blur"}]}}),created(){this.getData()},methods:{getData(){let e=this,a=e.$route.query.invitation_gift_id;u.getInvitation({invitation_gift_id:a},!0).then((a=>{e.form=a.data.data,e.rewardData=a.data.data.Reward,e.file_path=a.data.data.file_path,e.share_file_path=a.data.data.share.file_path})).catch((a=>{e.loading=!1}))},addInv(){this.rewardData.push({invitation_num:1,is_coupon:!1,point:0,is_point:!1,coupon_ids:"",coupon_name:""})},addCoupon(e){this.open_add=!0,this.coupon_index=e},closeProductDialogFunc(e){let a=this,l=a.coupon_index;a.open_add=e.openDialog,-1==a.rewardData[l].coupon_name.indexOf(e.params.name)?(a.rewardData[l].coupon_ids+=e.params.coupon_id+",",""==a.rewardData[l].coupon_name?a.rewardData[l].coupon_name+=e.params.name:a.rewardData[l].coupon_name+=","+e.params.name):o.error("请勿重复添加")},onSubmit(){let e=this;if(0==e.rewardData.length)return void o.error("请添加奖项");let a=e.form;a.reward_data=e.rewardData,e.$refs.form.validate((l=>{l&&(e.loading=!0,u.editInvitation(a,!0).then((a=>{e.loading=!1,1==a.code?(o({message:a.msg,type:"success"}),e.$router.push("/plus/invitation/index")):e.loading=!1})).catch((a=>{e.loading=!1})))}))},gotoBack(){this.$router.back(-1)},openUpload(e){this.type=e,this.isupload=!0},returnImgsFunc(e){null!=e&&e.length>0&&("image"==this.type?(this.file_path=e[0].file_path,this.form.image_id=e[0].file_id):"share"==this.type&&(this.share_file_path=e[0].file_path,this.form.share_image_id=e[0].file_id)),this.isupload=!1},delReward(e){this.rewardData.splice(e,1)}}},U={class:"user"},D=h("div",{class:"common-form"},"新增活动会场",-1),C={class:"product-content"},I={key:0,class:"img"},q=["src"],R={key:0,class:"img"},z=["src"],F={class:"block"},$=h("span",{class:"demonstration"},null,-1),B=h("div",{class:"common-form"},"邀请成功的条件",-1),P=h("div",{class:"common-form"},"礼品设置",-1),S={style:{"font-weight":"900"}},G=h("span",null,"每邀请",-1),O=h("span",null,"人获得礼品",-1),X={style:{padding:"10px 20px 20px 40px"}},A={class:"common-button-wrapper"};const E=_(k,[["render",function(o,u,_,k,E,H){const L=l,Q=t,T=i,W=s,Y=d,J=r,K=n,M=p,N=m,Z=a,ee=e;return c(),f("div",U,[D,h("div",C,[g(N,{ref:"form",model:E.form,"label-position":"top",rules:E.formRules,"label-width":"150px"},{default:v((()=>[g(Q,{label:"活动标题",prop:"name",rules:[{required:!0,message:" "}]},{default:v((()=>[g(L,{type:"text",modelValue:E.form.name,"onUpdate:modelValue":u[0]||(u[0]=e=>E.form.name=e),placeholder:"请输入活动标题",class:"max-w460"},null,8,["modelValue"])])),_:1}),g(Q,{label:"背景图",prop:"image_id"},{default:v((()=>[g(W,null,{default:v((()=>[g(T,{type:"primary",onClick:u[1]||(u[1]=e=>H.openUpload("image"))},{default:v((()=>[y("选择图片")])),_:1}),""!=E.form.image_id?(c(),f("div",I,[h("img",{src:E.file_path,width:"100",height:"100"},null,8,q)])):V("",!0)])),_:1})])),_:1}),g(Q,{label:"分享标题",prop:"share_title",rules:[{required:!0,message:" "}]},{default:v((()=>[g(L,{type:"text",modelValue:E.form.share_title,"onUpdate:modelValue":u[2]||(u[2]=e=>E.form.share_title=e),placeholder:"请输入分享标题",class:"max-w460"},null,8,["modelValue"])])),_:1}),g(Q,{label:"分享内容",prop:"share_desc",rules:[{required:!0,message:" "}]},{default:v((()=>[g(L,{type:"text",modelValue:E.form.share_desc,"onUpdate:modelValue":u[3]||(u[3]=e=>E.form.share_desc=e),placeholder:"请输入分享内容",class:"max-w460"},null,8,["modelValue"])])),_:1}),g(Q,{label:"分享图",prop:"share_image_id"},{default:v((()=>[g(W,null,{default:v((()=>[g(T,{type:"primary",onClick:u[4]||(u[4]=e=>H.openUpload("share"))},{default:v((()=>[y("选择图片")])),_:1}),""!=E.form.share_image_id?(c(),f("div",R,[h("img",{src:E.share_file_path,width:"100",height:"100"},null,8,z)])):V("",!0)])),_:1})])),_:1}),g(Q,{label:"活动日期",prop:"value1",rules:[{required:!0,message:" "}]},{default:v((()=>[h("div",F,[$,g(Y,{modelValue:E.form.value1,"onUpdate:modelValue":u[5]||(u[5]=e=>E.form.value1=e),type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])])])),_:1}),g(Q,{label:"个人中心状态"},{default:v((()=>[h("div",null,[g(J,{modelValue:E.form.is_show,"onUpdate:modelValue":u[6]||(u[6]=e=>E.form.is_show=e),label:1},{default:v((()=>[y("显示")])),_:1},8,["modelValue"]),g(J,{modelValue:E.form.is_show,"onUpdate:modelValue":u[7]||(u[7]=e=>E.form.is_show=e),label:0},{default:v((()=>[y("隐藏")])),_:1},8,["modelValue"])])])),_:1}),B,g(Q,{label:"邀请成功的条件 "},{default:v((()=>[g(J,{modelValue:E.form.inv_condition,"onUpdate:modelValue":u[8]||(u[8]=e=>E.form.inv_condition=e),label:"0"},{default:v((()=>[y("邀请成为会员")])),_:1},8,["modelValue"]),g(J,{modelValue:E.form.inv_condition,"onUpdate:modelValue":u[9]||(u[9]=e=>E.form.inv_condition=e),label:"1"},{default:v((()=>[y("邀请成为会员且消费")])),_:1},8,["modelValue"])])),_:1}),P,(c(!0),f(j,null,w(E.rewardData,((e,a)=>(c(),f("div",{key:a,class:"mt16"},[h("div",null,[h("span",S,"奖项"+b(a+1)+":",1),G,g(L,{type:"number",modelValue:e.invitation_num,"onUpdate:modelValue":a=>e.invitation_num=a,size:"",style:{width:"100px"}},null,8,["modelValue","onUpdate:modelValue"]),O,g(K,{modelValue:e.is_point,"onUpdate:modelValue":a=>e.is_point=a,class:"pl16"},{default:v((()=>[y("积分")])),_:2},1032,["modelValue","onUpdate:modelValue"]),g(L,{type:"number",modelValue:e.point,"onUpdate:modelValue":a=>e.point=a,size:"",style:{width:"100px"}},null,8,["modelValue","onUpdate:modelValue"]),g(K,{modelValue:e.is_coupon,"onUpdate:modelValue":a=>e.is_coupon=a,class:"pl16"},{default:v((()=>[y("优惠券")])),_:2},1032,["modelValue","onUpdate:modelValue"]),g(L,{type:"text",modelValue:e.coupon_name,"onUpdate:modelValue":a=>e.coupon_name=a,size:"",disabled:"true",style:{width:"200px"}},null,8,["modelValue","onUpdate:modelValue"]),g(T,{type:"primary",size:"",onClick:e=>H.addCoupon(a)},{default:v((()=>[y("选择优惠券")])),_:2},1032,["onClick"]),g(M,{type:"primary",onClick:e=>H.delReward(a),style:{float:"right"}},{default:v((()=>[y("删除")])),_:2},1032,["onClick"])])])))),128)),h("div",X,[g(M,{type:"primary",onClick:H.addInv},{default:v((()=>[y("添加奖励项")])),_:1},8,["onClick"])])])),_:1},8,["model","rules"]),h("div",A,[g(T,{type:"info",onClick:H.gotoBack},{default:v((()=>[y("返回")])),_:1},8,["onClick"]),g(T,{type:"primary",onClick:H.onSubmit,loading:E.loading},{default:v((()=>[y("提交")])),_:1},8,["onClick","loading"])])]),E.isupload?(c(),x(Z,{key:0,isupload:E.isupload,type:o.type,onReturnImgs:H.returnImgsFunc},{default:v((()=>[y("上传图片")])),_:1},8,["isupload","type","onReturnImgs"])):V("",!0),E.open_add?(c(),x(ee,{key:1,open_add:E.open_add,onCloseDialog:u[10]||(u[10]=e=>H.closeProductDialogFunc(e))},{default:v((()=>[y("选择优惠券弹出层 ")])),_:1},8,["open_add"])):V("",!0)])}]]);export{E as default};
