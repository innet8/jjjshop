System.register(["./element-plus-legacy-b16a6c53.js","./index-legacy-37de8052.js","./@vue-legacy-11820b46.js","./@vueuse-legacy-fb10ab28.js","./lodash-es-legacy-b311526b.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-e28812ab.js","./dayjs-legacy-4b173016.js","./call-bind-legacy-a7650b66.js","./get-intrinsic-legacy-675d089b.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-b76e1749.js","./has-legacy-06d86c07.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./vue-router-legacy-4115aea7.js","./pinia-legacy-dd7b0b91.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-a87a5df5.js","./side-channel-legacy-9446be19.js","./object-inspect-legacy-b9938498.js","./vue-ueditor-wrap-legacy-0affb7fa.js"],(function(t,e){"use strict";var l,n,a,i,s,o,r,u,c,d,g,p,f,m,y=document.createElement("style");return y.textContent=".attention{display:-webkit-box;display:-ms-flexbox;display:flex}.attention-left{width:375px;margin-right:30px}.attention-right .alert-warning{position:relative;padding:16px 16px 16px 69px;border-radius:6px;margin-bottom:10px;color:#495060;line-height:1.5;border:1px solid #ffebcc;background-color:#fff5e6}.attention-right .alert-warning .alert-icon{position:absolute;top:20px;left:24px}.attention-right .alert-warning .alert-icon .svg-icon{color:#f90}.attention .attention-left img{width:100%;border:1px solid #eeeeee}\n",document.head.appendChild(y),{setters:[function(t){l=t.E,n=t.q,a=t.d,i=t.e,s=t.b},function(t){o=t.r,r=t._},function(t){u=t.o,c=t.c,d=t.a,g=t.P,p=t.S,f=t.W,m=t.b},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var y=""+new URL("../jpg/mobile_gzh-09d375c6.jpg",e.meta.url).href,h=function(t,e){return o._get("/shop/plus.officia/index",t,e)},b=function(t,e){return o._post("/shop/plus.officia/index",t,e)},j={data:function(){return{mobile_url:y,form:{status:!1},Data:[],loading:!1,rules:{status:[{required:!0,message:"请输入活动名称",trigger:"blur"}]}}},created:function(){this.getData()},methods:{getData:function(){var t=this;h({},!0).then((function(e){t.loading=!1,"1"==e.data.vars.values.status?t.form.status=!0:t.form.status=!1})).catch((function(e){t.loading=!1}))},onSubmit:function(){var t=this,e={};t.form.status?e.status=1:e.status=0,t.loading=!0,b(e,!0).then((function(e){t.loading=!1,1==e.code?(l({message:"恭喜你，保存成功",type:"success"}),t.getData()):t.loading=!1})).catch((function(e){t.loading=!1}))}}},v={class:"attention pb50"},x={class:"attention-left"},w=["src"],_={class:"attention-right"},k=m('<div class="alert-warning"><div class="alert-icon"><span class="icon iconfont icon-gantanhao"></span></div><span class="alert-desc"><div> 1.使用该功能前，需前往小程序后台，在“设置”-&gt;“接口设置”-&gt;“公众号关注组件”中设置要展示的公众号。注：设置的公众号需与小程序主体一致。 <a href="https://mp.weixin.qq.com" target="_blank">去配置</a></div><div>2.若没有配置公众号，功能将不生效。</div><div class="attention-tips"> 3.在一个小程序的生命周期内，只有从以下场景进入小程序，才具有展示引导关注公众号的能力: <p>a）当小程序从扫小程序码打开时。</p><p>b）当从其他小程序返回小程序时，若小程序之前未被销毁，则该组件保持上一次打开小程序时的状态。</p></div></span></div>',1),q={class:"common-button-wrapper"};t("default",r(j,[["render",function(t,e,l,o,r,m){var y=n,h=a,b=i,j=s;return u(),c("div",v,[d("div",x,[d("img",{src:r.mobile_url,alt:"mobile"},null,8,w)]),d("div",_,[k,g(j,{ref:"form",size:"small",model:r.form,rules:r.rules,"label-width":"100px"},{default:p((function(){return[g(h,{label:"公众号关注",prop:"status"},{default:p((function(){return[g(y,{modelValue:r.form.status,"onUpdate:modelValue":e[0]||(e[0]=function(t){return r.form.status=t})},null,8,["modelValue"])]})),_:1}),d("div",q,[g(b,{type:"primary",size:"small",onClick:m.onSubmit,loading:r.loading},{default:p((function(){return[f("提交")]})),_:1},8,["onClick","loading"])])]})),_:1},8,["model","rules"])])])}]]))}}}));
