import{D as e,g as a,h as r,w as s,P as l,i as o,r as i,e as t}from"./element-plus-c8084613.js";import{S as d}from"./sign-aa80b65f.js";import{U as n}from"./UE-52ba9c50.js";import{af as m,o as p,c as u,O as c,R as _,a as f,_ as g,V as v,X as h,P as j,a7 as w,$ as b,bm as V,bk as y}from"./@vue-b57a05a6.js";import{_ as x}from"./_plugin-vue_export-helper-1b428a4d.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-798c71ba.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./Upload-12e7aa48.js";import"./file-92833154.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";const C={components:{Uediter:n},data(){return{ueditor:{text:"",config:{initialFrameWidth:400,initialFrameHeight:500}},form:{is_open:!1,is_increase:!1,increase_reward:0,no_increase:0,ever_sign:0,reward_data:[]},loading:!0,rules:{ever_sign:[{required:!0,message:"每日签到送积分有误",trigger:"blur"}],increase_reward:[{required:!0,message:"请输入第二天起递增积分数",trigger:"blur"}],no_increase:[{required:!0,message:"请输入第几天不再递增",trigger:"blur"}],reward_data:[{validator:(e,a,r)=>{a.length<1?r(new Error("请添加至少一项额外奖励！")):r()},required:!0,trigger:"blur"}],day:[{validator:(e,a,r)=>{this.form.reward_data.lenght<1||""===a&&r(new Error("天数不能为空！")),r()},required:!0,trigger:"blur"}],point:[{validator:(e,a,r)=>{""===a?r(new Error("请输入连续签到积分数！")):r()},required:!0,trigger:"blur"}]}}},created(){this.getData()},methods:{contentChangeFunc(e){this.ueditor.text=e},getData(){let e=this;e.loading=!0,d.getData().then((a=>{e.loading=!1;let r=a.data.vars.values;if(1==r.is_increase&&(e.form.is_increase=!0),1==r.is_open&&(e.form.is_open=!0,e.form.increase_reward=r.increase_reward,e.form.no_increase=r.no_increase,e.form.ever_sign=r.ever_sign,e.form.ever_sign=r.ever_sign,e.ueditor.text=r.content,r.reward_data)){let a=r.reward_data.length;for(let e=0;e<a;e++){let a=r.reward_data[e];1==a.is_coupon?a.is_coupon=!0:a.is_coupon=!1,1==a.is_point?a.is_point=!0:a.is_point=!1}e.form.reward_data=r.reward_data}})).catch((e=>{}))},onSubmit(){let e=this,a=e.form;a.is_open&&(a.content=e.ueditor.text),e.loading=!0,e.$refs.ruleForm.validate((r=>{r&&d.saveData(a,!0).then((a=>{this.$ElMessage({message:$t("保存成功"),type:"success"}),e.getData()})).catch((e=>{}))}))},getContent:function(){return this.editor?this.editor.getContent():""},addReward(){this.form.reward_data.push({day:0,is_point:!1,point:0,is_coupon:!1,coupon:[]})},deleteRewardClick(e){this.form.reward_data.splice(e,1)}}},U=e=>(V("data-v-45758a3e"),e=e(),y(),e),k={key:0},q={class:"open-sign"},F=U((()=>f("span",{class:"gray9"},"是否开启签到有礼",-1))),z={class:"mt16"},D=U((()=>f("div",{class:"common-form"},"每日签到固定奖励",-1))),E={class:"max-w460 d-s-c"},R={class:"flex-1"},$=U((()=>f("span",{class:"ml10"},"积分",-1))),P={key:0,class:"max-w460 border p-0-20 pt16 mt10"},S={class:"d-s-c"},I={class:"flex-1"},B=U((()=>f("span",{class:"ml10"},"积分",-1))),G={class:"d-s-c"},H={class:"flex-1"},J=U((()=>f("span",{class:"ml10"},"天起不再递增",-1))),M=U((()=>f("div",{class:"common-form"},"连续签到额外奖励 （达到额外奖励最大天数时，继续签到不会再获得额外奖励，断签后重新开始计算）",-1))),O={class:"reward-list max-w460"},W={class:"d-s-c"},X={class:"flex-1"},A=U((()=>f("span",{class:"ml10 pr16"},"天",-1))),K={class:"d-s-c"},L={key:0},N={class:"d-s-c"},Q={class:"flex-1"},T=U((()=>f("span",{class:"ml10 pr16"},"积分",-1))),Y=U((()=>f("div",{class:"common-form"},"规则",-1))),Z={class:"edit_container"},ee={class:"common-button-wrapper"};const ae=x(C,[["render",function(d,n,V,y,x,C){const U=e,ae=a,re=r,se=s,le=l,oe=o,ie=i,te=m("Uediter"),de=t;return x.loading?h("",!0):(p(),u("div",k,[c(de,{size:"small",model:x.form,"label-position":"top",rules:x.rules,ref:"ruleForm","label-width":"100px"},{default:_((()=>[f("div",q,[F,c(U,{modelValue:x.form.is_open,"onUpdate:modelValue":n[0]||(n[0]=e=>x.form.is_open=e),class:"ml10"},null,8,["modelValue"])]),g(f("div",z,[D,c(re,{label:"每日签到送",prop:"ever_sign"},{default:_((()=>[f("div",E,[f("div",R,[c(ae,{modelValue:x.form.ever_sign,"onUpdate:modelValue":n[1]||(n[1]=e=>x.form.ever_sign=e),placeholder:"0",type:"number"},null,8,["modelValue"])]),$])])),_:1}),c(re,{label:"递增奖励"},{default:_((()=>[c(le,null,{default:_((()=>[c(se,{modelValue:x.form.is_increase,"onUpdate:modelValue":n[2]||(n[2]=e=>x.form.is_increase=e),label:!0},{default:_((()=>[v("有")])),_:1},8,["modelValue"]),c(se,{modelValue:x.form.is_increase,"onUpdate:modelValue":n[3]||(n[3]=e=>x.form.is_increase=e),label:!1},{default:_((()=>[v("无")])),_:1},8,["modelValue"])])),_:1}),x.form.is_increase?(p(),u("div",P,[c(re,{label:"第二天起递增奖励","label-width":"120px",prop:"increase_reward"},{default:_((()=>[f("div",S,[f("div",I,[c(ae,{modelValue:x.form.increase_reward,"onUpdate:modelValue":n[4]||(n[4]=e=>x.form.increase_reward=e),placeholder:"请输入第二天起递增积分数",min:"0",type:"number"},null,8,["modelValue"])]),B])])),_:1}),c(re,{label:"第","label-width":"120px",prop:"no_increase"},{default:_((()=>[f("div",G,[f("div",H,[c(ae,{modelValue:x.form.no_increase,"onUpdate:modelValue":n[5]||(n[5]=e=>x.form.no_increase=e),placeholder:"请输入第几天不再递增",min:"0",type:"number"},null,8,["modelValue"])]),J])])),_:1})])):h("",!0)])),_:1}),M,c(re,{label:"额外奖励"},{default:_((()=>[f("div",O,[(p(!0),u(j,null,w(x.form.reward_data,((e,a)=>(p(),u("div",{class:"reward-item pr border",key:a},[c(oe,{class:"delete-reward",onClick:e=>C.deleteRewardClick(a),type:"danger",size:"small",icon:"Close",circle:""},null,8,["onClick"]),c(re,{label:"连续签到",prop:"reward_data."+a+".day",rules:x.rules.day},{default:_((()=>[f("div",W,[f("div",X,[c(ae,{modelValue:e.day,"onUpdate:modelValue":a=>e.day=a,placeholder:"请输入连续签到天数",class:"max-w460",type:"number",min:"0"},null,8,["modelValue","onUpdate:modelValue"])]),A])])),_:2},1032,["prop","rules"]),c(re,{label:"积分奖励"},{default:_((()=>[f("div",K,[f("div",null,[c(ie,{modelValue:e.is_point,"onUpdate:modelValue":a=>e.is_point=a},null,8,["modelValue","onUpdate:modelValue"])]),e.is_point?(p(),u("div",L,[c(re,{label:"送","label-width":"40px",prop:"reward_data."+a+".point",rules:x.rules.point,style:{"margin-bottom":"0"}},{default:_((()=>[f("div",N,[f("div",Q,[c(ae,{modelValue:e.point,"onUpdate:modelValue":a=>e.point=a,placeholder:"请输入连续签到天数的积分",type:"number",min:"0"},null,8,["modelValue","onUpdate:modelValue"])]),T])])),_:2},1032,["prop","rules"])])):h("",!0)])])),_:2},1024)])))),128))]),c(le,null,{default:_((()=>[c(oe,{size:"small",icon:"Plus",onClick:C.addReward},{default:_((()=>[v("添加")])),_:1},8,["onClick"])])),_:1})])),_:1}),Y,c(re,{label:"规则说明："},{default:_((()=>[f("div",Z,[c(te,{text:x.ueditor.text,config:x.ueditor.config,ref:"ue",onContentChange:C.contentChangeFunc},null,8,["text","config","onContentChange"])])])),_:1})],512),[[b,x.form.is_open]]),f("div",ee,[c(oe,{type:"primary",size:"small",onClick:C.onSubmit,disabled:x.loading},{default:_((()=>[v("提交")])),_:1},8,["onClick","disabled"])])])),_:1},8,["model","rules"])]))}],["__scopeId","data-v-45758a3e"]]);export{ae as default};
