import{E as e,C as a,g as r,h as s,o as l,P as o,i,s as t,e as d}from"./element-plus-b01b3a31.js";import{S as n}from"./sign-2bbac3e0.js";import{U as m}from"./UE-ee9a0d80.js";import{ag as p,o as u,c,P as _,S as f,a as g,$ as v,W as b,Y as h,Q as w,a8 as j,a0 as V,bb as y,b9 as x}from"./@vue-e72ffbb6.js";import{_ as C}from"./_plugin-vue_export-helper-1b428a4d.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-98f906e9.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./Upload-e4289868.js";import"./file-86ef23f3.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const U={components:{Uediter:m},data(){return{ueditor:{text:"",config:{initialFrameWidth:400,initialFrameHeight:500}},form:{is_open:!1,is_increase:!1,increase_reward:0,no_increase:0,ever_sign:0,reward_data:[]},loading:!0,rules:{ever_sign:[{required:!0,message:"每日签到送积分有误",trigger:"blur"}],increase_reward:[{required:!0,message:"请输入第二天起递增积分数",trigger:"blur"}],no_increase:[{required:!0,message:"请输入第几天不再递增",trigger:"blur"}],reward_data:[{validator:(e,a,r)=>{a.length<1?r(new Error("请添加至少一项额外奖励！")):r()},required:!0,trigger:"blur"}],day:[{validator:(e,a,r)=>{this.form.reward_data.lenght<1||""===a&&r(new Error("天数不能为空！")),r()},required:!0,trigger:"blur"}],point:[{validator:(e,a,r)=>{""===a?r(new Error("请输入连续签到积分数！")):r()},required:!0,trigger:"blur"}]}}},created(){this.getData()},methods:{contentChangeFunc(e){this.ueditor.text=e},getData(){let e=this;e.loading=!0,n.getData().then((a=>{e.loading=!1;let r=a.data.vars.values;if(1==r.is_increase&&(e.form.is_increase=!0),1==r.is_open&&(e.form.is_open=!0,e.form.increase_reward=r.increase_reward,e.form.no_increase=r.no_increase,e.form.ever_sign=r.ever_sign,e.form.ever_sign=r.ever_sign,e.ueditor.text=r.content,r.reward_data)){let a=r.reward_data.length;for(let e=0;e<a;e++){let a=r.reward_data[e];1==a.is_coupon?a.is_coupon=!0:a.is_coupon=!1,1==a.is_point?a.is_point=!0:a.is_point=!1}e.form.reward_data=r.reward_data}})).catch((e=>{}))},onSubmit(){let a=this,r=a.form;r.is_open&&(r.content=a.ueditor.text),a.loading=!0,a.$refs.ruleForm.validate((s=>{s&&n.saveData(r,!0).then((r=>{e({message:"恭喜你，保存成功",type:"success"}),a.getData()})).catch((e=>{}))}))},getContent:function(){return this.editor?this.editor.getContent():""},addReward(){this.form.reward_data.push({day:0,is_point:!1,point:0,is_coupon:!1,coupon:[]})},deleteRewardClick(e){this.form.reward_data.splice(e,1)}}},k=e=>(y("data-v-018e24ea"),e=e(),x(),e),q={key:0},z={class:"open-sign"},F=k((()=>g("span",{class:"gray9"},"是否开启签到有礼",-1))),D={class:"mt16"},E=k((()=>g("div",{class:"common-form"},"每日签到固定奖励",-1))),R={class:"max-w460 d-s-c"},S={class:"flex-1"},P=k((()=>g("span",{class:"ml10"},"积分",-1))),W={key:0,class:"max-w460 border p-0-20 pt16 mt10"},$={class:"d-s-c"},A={class:"flex-1"},B=k((()=>g("span",{class:"ml10"},"积分",-1))),H={class:"d-s-c"},I={class:"flex-1"},Q=k((()=>g("span",{class:"ml10"},"天起不再递增",-1))),X=k((()=>g("div",{class:"common-form"},"连续签到额外奖励 （达到额外奖励最大天数时，继续签到不会再获得额外奖励，断签后重新开始计算）",-1))),Y={class:"reward-list max-w460"},G={class:"d-s-c"},J={class:"flex-1"},K=k((()=>g("span",{class:"ml10 pr16"},"天",-1))),L={class:"d-s-c"},M={key:0},N={class:"d-s-c"},O={class:"flex-1"},T=k((()=>g("span",{class:"ml10 pr16"},"积分",-1))),Z=k((()=>g("div",{class:"common-form"},"规则",-1))),ee={class:"edit_container"},ae={class:"common-button-wrapper"};const re=C(U,[["render",function(e,n,m,y,x,C){const U=a,k=r,re=s,se=l,le=o,oe=i,ie=t,te=p("Uediter"),de=d;return x.loading?h("",!0):(u(),c("div",q,[_(de,{size:"small",model:x.form,"label-position":"top",rules:x.rules,ref:"ruleForm","label-width":"100px"},{default:f((()=>[g("div",z,[F,_(U,{modelValue:x.form.is_open,"onUpdate:modelValue":n[0]||(n[0]=e=>x.form.is_open=e),class:"ml10"},null,8,["modelValue"])]),v(g("div",D,[E,_(re,{label:"每日签到送",prop:"ever_sign"},{default:f((()=>[g("div",R,[g("div",S,[_(k,{modelValue:x.form.ever_sign,"onUpdate:modelValue":n[1]||(n[1]=e=>x.form.ever_sign=e),placeholder:"0",type:"number"},null,8,["modelValue"])]),P])])),_:1}),_(re,{label:"递增奖励"},{default:f((()=>[_(le,null,{default:f((()=>[_(se,{modelValue:x.form.is_increase,"onUpdate:modelValue":n[2]||(n[2]=e=>x.form.is_increase=e),label:!0},{default:f((()=>[b("有")])),_:1},8,["modelValue"]),_(se,{modelValue:x.form.is_increase,"onUpdate:modelValue":n[3]||(n[3]=e=>x.form.is_increase=e),label:!1},{default:f((()=>[b("无")])),_:1},8,["modelValue"])])),_:1}),x.form.is_increase?(u(),c("div",W,[_(re,{label:"第二天起递增奖励","label-width":"120px",prop:"increase_reward"},{default:f((()=>[g("div",$,[g("div",A,[_(k,{modelValue:x.form.increase_reward,"onUpdate:modelValue":n[4]||(n[4]=e=>x.form.increase_reward=e),placeholder:"请输入第二天起递增积分数",min:"0",type:"number"},null,8,["modelValue"])]),B])])),_:1}),_(re,{label:"第","label-width":"120px",prop:"no_increase"},{default:f((()=>[g("div",H,[g("div",I,[_(k,{modelValue:x.form.no_increase,"onUpdate:modelValue":n[5]||(n[5]=e=>x.form.no_increase=e),placeholder:"请输入第几天不再递增",min:"0",type:"number"},null,8,["modelValue"])]),Q])])),_:1})])):h("",!0)])),_:1}),X,_(re,{label:"额外奖励"},{default:f((()=>[g("div",Y,[(u(!0),c(w,null,j(x.form.reward_data,((e,a)=>(u(),c("div",{class:"reward-item pr border",key:a},[_(oe,{class:"delete-reward",onClick:e=>C.deleteRewardClick(a),type:"danger",size:"small",icon:"Close",circle:""},null,8,["onClick"]),_(re,{label:"连续签到",prop:"reward_data."+a+".day",rules:x.rules.day},{default:f((()=>[g("div",G,[g("div",J,[_(k,{modelValue:e.day,"onUpdate:modelValue":a=>e.day=a,placeholder:"请输入连续签到天数",class:"max-w460",type:"number",min:"0"},null,8,["modelValue","onUpdate:modelValue"])]),K])])),_:2},1032,["prop","rules"]),_(re,{label:"积分奖励"},{default:f((()=>[g("div",L,[g("div",null,[_(ie,{modelValue:e.is_point,"onUpdate:modelValue":a=>e.is_point=a},null,8,["modelValue","onUpdate:modelValue"])]),e.is_point?(u(),c("div",M,[_(re,{label:"送","label-width":"40px",prop:"reward_data."+a+".point",rules:x.rules.point,style:{"margin-bottom":"0"}},{default:f((()=>[g("div",N,[g("div",O,[_(k,{modelValue:e.point,"onUpdate:modelValue":a=>e.point=a,placeholder:"请输入连续签到天数的积分",type:"number",min:"0"},null,8,["modelValue","onUpdate:modelValue"])]),T])])),_:2},1032,["prop","rules"])])):h("",!0)])])),_:2},1024)])))),128))]),_(le,null,{default:f((()=>[_(oe,{size:"small",icon:"Plus",onClick:C.addReward},{default:f((()=>[b("添加")])),_:1},8,["onClick"])])),_:1})])),_:1}),Z,_(re,{label:"规则说明："},{default:f((()=>[g("div",ee,[_(te,{text:x.ueditor.text,config:x.ueditor.config,ref:"ue",onContentChange:C.contentChangeFunc},null,8,["text","config","onContentChange"])])])),_:1})],512),[[V,x.form.is_open]]),g("div",ae,[_(oe,{type:"primary",size:"small",onClick:C.onSubmit,disabled:x.loading},{default:f((()=>[b("提交")])),_:1},8,["onClick","disabled"])])])),_:1},8,["model","rules"])]))}],["__scopeId","data-v-018e24ea"]]);export{re as default};
