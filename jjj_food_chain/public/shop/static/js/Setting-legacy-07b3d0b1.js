System.register(["./element-plus-legacy-ce5c473b.js","./sign-legacy-634b7600.js","./UE-legacy-156d4564.js","./@vue-legacy-8ef99c9b.js","./_plugin-vue_export-helper-legacy-61c4c9d1.js","./lodash-es-legacy-de50a096.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-3353583a.js","./@element-plus-legacy-91437698.js","./dayjs-legacy-0ff6bb75.js","./call-bind-legacy-8954b3d2.js","./get-intrinsic-legacy-c0201930.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./hasown-legacy-8325a62b.js","./set-function-length-legacy-e4fe6823.js","./define-data-property-legacy-290282d7.js","./has-property-descriptors-legacy-1e05bb01.js","./gopd-legacy-0da6a62b.js","./@popperjs-legacy-876caf52.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./index-legacy-3f7fb904.js","./vue-router-legacy-a8f66a40.js","./pinia-legacy-e8a51700.js","./axios-legacy-dedee0c6.js","./qs-legacy-334feae6.js","./side-channel-legacy-19dc2798.js","./object-inspect-legacy-a5678b81.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-d36ae666.js","./vue-i18n-legacy-a195b753.js","./@intlify-legacy-7f6e5bc9.js","./Upload-legacy-0f4ff03f.js","./file-legacy-2171f0d7.js","./vue-cropperjs-legacy-7166d149.js","./vue-legacy-ae59173d.js","./cropperjs-legacy-9cfc33ae.js"],(function(e,n){"use strict";var l,a,r,t,i,o,u,s,d,c,f,p,m,g,_,y,v,h,w,b,j,x,V,C,U;return{setters:[function(e){l=e.D,a=e.g,r=e.h,t=e.w,i=e.P,o=e.i,u=e.r,s=e.e},function(e){d=e.S},function(e){c=e.U},function(e){f=e.af,p=e.o,m=e.c,g=e.O,_=e.R,y=e.a,v=e._,h=e.V,w=e.X,b=e.P,j=e.a7,x=e.$,V=e.bm,C=e.bk},function(e){U=e._},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var n=document.createElement("style");n.textContent=".open-sign[data-v-45758a3e]{padding:20px;background:#e2f0ff}.reward-list .reward-item[data-v-45758a3e]{margin-bottom:10px;padding:20px 20px 0}.reward-list .delete-reward[data-v-45758a3e]{position:absolute;top:-10px;right:-10px;cursor:pointer;z-index:10}.el-button--small.is-circle[data-v-45758a3e]{padding:4px}\n",document.head.appendChild(n);var k={components:{Uediter:c},data:function(){var e=this;return{ueditor:{text:"",config:{initialFrameWidth:400,initialFrameHeight:500}},form:{is_open:!1,is_increase:!1,increase_reward:0,no_increase:0,ever_sign:0,reward_data:[]},loading:!0,rules:{ever_sign:[{required:!0,message:"每日签到送积分有误",trigger:"blur"}],increase_reward:[{required:!0,message:"请输入第二天起递增积分数",trigger:"blur"}],no_increase:[{required:!0,message:"请输入第几天不再递增",trigger:"blur"}],reward_data:[{validator:function(e,n,l){n.length<1?l(new Error("请添加至少一项额外奖励！")):l()},required:!0,trigger:"blur"}],day:[{validator:function(n,l,a){e.form.reward_data.lenght<1||""===l&&a(new Error("天数不能为空！")),a()},required:!0,trigger:"blur"}],point:[{validator:function(e,n,l){""===n?l(new Error("请输入连续签到积分数！")):l()},required:!0,trigger:"blur"}]}}},created:function(){this.getData()},methods:{contentChangeFunc:function(e){this.ueditor.text=e},getData:function(){var e=this;e.loading=!0,d.getData().then((function(n){e.loading=!1;var l=n.data.vars.values;if(1==l.is_increase&&(e.form.is_increase=!0),1==l.is_open&&(e.form.is_open=!0,e.form.increase_reward=l.increase_reward,e.form.no_increase=l.no_increase,e.form.ever_sign=l.ever_sign,e.form.ever_sign=l.ever_sign,e.ueditor.text=l.content,l.reward_data)){for(var a=l.reward_data.length,r=0;r<a;r++){var t=l.reward_data[r];1==t.is_coupon?t.is_coupon=!0:t.is_coupon=!1,1==t.is_point?t.is_point=!0:t.is_point=!1}e.form.reward_data=l.reward_data}})).catch((function(e){}))},onSubmit:function(){var e=this,n=this,l=n.form;l.is_open&&(l.content=n.ueditor.text),n.loading=!0,n.$refs.ruleForm.validate((function(a){a&&d.saveData(l,!0).then((function(l){e.$ElMessage({message:$t("保存成功"),type:"success"}),n.getData()})).catch((function(e){}))}))},getContent:function(){return this.editor?this.editor.getContent():""},addReward:function(){this.form.reward_data.push({day:0,is_point:!1,point:0,is_coupon:!1,coupon:[]})},deleteRewardClick:function(e){this.form.reward_data.splice(e,1)}}},q=function(e){return V("data-v-45758a3e"),e=e(),C(),e},z={key:0},E={class:"open-sign"},F=q((function(){return y("span",{class:"gray9"},"是否开启签到有礼",-1)})),D={class:"mt16"},R=q((function(){return y("div",{class:"common-form"},"每日签到固定奖励",-1)})),S={class:"max-w460 d-s-c"},$={class:"flex-1"},P=q((function(){return y("span",{class:"ml10"},"积分",-1)})),I={key:0,class:"max-w460 border p-0-20 pt16 mt10"},B={class:"d-s-c"},G={class:"flex-1"},H=q((function(){return y("span",{class:"ml10"},"积分",-1)})),J={class:"d-s-c"},M={class:"flex-1"},O=q((function(){return y("span",{class:"ml10"},"天起不再递增",-1)})),W=q((function(){return y("div",{class:"common-form"},"连续签到额外奖励 （达到额外奖励最大天数时，继续签到不会再获得额外奖励，断签后重新开始计算）",-1)})),X={class:"reward-list max-w460"},A={class:"d-s-c"},K={class:"flex-1"},L=q((function(){return y("span",{class:"ml10 pr16"},"天",-1)})),N={class:"d-s-c"},Q={key:0},T={class:"d-s-c"},Y={class:"flex-1"},Z=q((function(){return y("span",{class:"ml10 pr16"},"积分",-1)})),ee=q((function(){return y("div",{class:"common-form"},"规则",-1)})),ne={class:"edit_container"},le={class:"common-button-wrapper"};e("default",U(k,[["render",function(e,n,d,c,V,C){var U=l,k=a,q=r,ae=t,re=i,te=o,ie=u,oe=f("Uediter"),ue=s;return V.loading?w("",!0):(p(),m("div",z,[g(ue,{size:"small",model:V.form,"label-position":"top",rules:V.rules,ref:"ruleForm","label-width":"100px"},{default:_((function(){return[y("div",E,[F,g(U,{modelValue:V.form.is_open,"onUpdate:modelValue":n[0]||(n[0]=function(e){return V.form.is_open=e}),class:"ml10"},null,8,["modelValue"])]),v(y("div",D,[R,g(q,{label:"每日签到送",prop:"ever_sign"},{default:_((function(){return[y("div",S,[y("div",$,[g(k,{modelValue:V.form.ever_sign,"onUpdate:modelValue":n[1]||(n[1]=function(e){return V.form.ever_sign=e}),placeholder:"0",type:"number"},null,8,["modelValue"])]),P])]})),_:1}),g(q,{label:"递增奖励"},{default:_((function(){return[g(re,null,{default:_((function(){return[g(ae,{modelValue:V.form.is_increase,"onUpdate:modelValue":n[2]||(n[2]=function(e){return V.form.is_increase=e}),label:!0},{default:_((function(){return[h("有")]})),_:1},8,["modelValue"]),g(ae,{modelValue:V.form.is_increase,"onUpdate:modelValue":n[3]||(n[3]=function(e){return V.form.is_increase=e}),label:!1},{default:_((function(){return[h("无")]})),_:1},8,["modelValue"])]})),_:1}),V.form.is_increase?(p(),m("div",I,[g(q,{label:"第二天起递增奖励","label-width":"120px",prop:"increase_reward"},{default:_((function(){return[y("div",B,[y("div",G,[g(k,{modelValue:V.form.increase_reward,"onUpdate:modelValue":n[4]||(n[4]=function(e){return V.form.increase_reward=e}),placeholder:"请输入第二天起递增积分数",min:"0",type:"number"},null,8,["modelValue"])]),H])]})),_:1}),g(q,{label:"第","label-width":"120px",prop:"no_increase"},{default:_((function(){return[y("div",J,[y("div",M,[g(k,{modelValue:V.form.no_increase,"onUpdate:modelValue":n[5]||(n[5]=function(e){return V.form.no_increase=e}),placeholder:"请输入第几天不再递增",min:"0",type:"number"},null,8,["modelValue"])]),O])]})),_:1})])):w("",!0)]})),_:1}),W,g(q,{label:"额外奖励"},{default:_((function(){return[y("div",X,[(p(!0),m(b,null,j(V.form.reward_data,(function(e,n){return p(),m("div",{class:"reward-item pr border",key:n},[g(te,{class:"delete-reward",onClick:function(e){return C.deleteRewardClick(n)},type:"danger",size:"small",icon:"Close",circle:""},null,8,["onClick"]),g(q,{label:"连续签到",prop:"reward_data."+n+".day",rules:V.rules.day},{default:_((function(){return[y("div",A,[y("div",K,[g(k,{modelValue:e.day,"onUpdate:modelValue":function(n){return e.day=n},placeholder:"请输入连续签到天数",class:"max-w460",type:"number",min:"0"},null,8,["modelValue","onUpdate:modelValue"])]),L])]})),_:2},1032,["prop","rules"]),g(q,{label:"积分奖励"},{default:_((function(){return[y("div",N,[y("div",null,[g(ie,{modelValue:e.is_point,"onUpdate:modelValue":function(n){return e.is_point=n}},null,8,["modelValue","onUpdate:modelValue"])]),e.is_point?(p(),m("div",Q,[g(q,{label:"送","label-width":"40px",prop:"reward_data."+n+".point",rules:V.rules.point,style:{"margin-bottom":"0"}},{default:_((function(){return[y("div",T,[y("div",Y,[g(k,{modelValue:e.point,"onUpdate:modelValue":function(n){return e.point=n},placeholder:"请输入连续签到天数的积分",type:"number",min:"0"},null,8,["modelValue","onUpdate:modelValue"])]),Z])]})),_:2},1032,["prop","rules"])])):w("",!0)])]})),_:2},1024)])})),128))]),g(re,null,{default:_((function(){return[g(te,{size:"small",icon:"Plus",onClick:C.addReward},{default:_((function(){return[h("添加")]})),_:1},8,["onClick"])]})),_:1})]})),_:1}),ee,g(q,{label:"规则说明："},{default:_((function(){return[y("div",ne,[g(oe,{text:V.ueditor.text,config:V.ueditor.config,ref:"ue",onContentChange:C.contentChangeFunc},null,8,["text","config","onContentChange"])])]})),_:1})],512),[[x,V.form.is_open]]),y("div",le,[g(te,{type:"primary",size:"small",onClick:C.onSubmit,disabled:V.loading},{default:_((function(){return[h("提交")]})),_:1},8,["onClick","disabled"])])]})),_:1},8,["model","rules"])]))}],["__scopeId","data-v-45758a3e"]]))}}}));
