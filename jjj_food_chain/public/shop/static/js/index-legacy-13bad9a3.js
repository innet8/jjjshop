System.register(["./element-plus-legacy-6adc2ffc.js","./index-legacy-ab5b423a.js","./_plugin-vue_export-helper-legacy-61c4c9d1.js","./@vue-legacy-8ef99c9b.js","./lodash-es-legacy-de50a096.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-3353583a.js","./@element-plus-legacy-91437698.js","./dayjs-legacy-0ff6bb75.js","./call-bind-legacy-8954b3d2.js","./get-intrinsic-legacy-c0201930.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./hasown-legacy-8325a62b.js","./set-function-length-legacy-e4fe6823.js","./define-data-property-legacy-290282d7.js","./has-property-descriptors-legacy-1e05bb01.js","./gopd-legacy-0da6a62b.js","./@popperjs-legacy-876caf52.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./vue-router-legacy-a8f66a40.js","./pinia-legacy-e8a51700.js","./axios-legacy-dedee0c6.js","./qs-legacy-334feae6.js","./side-channel-legacy-19dc2798.js","./object-inspect-legacy-a5678b81.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-d36ae666.js","./vue-i18n-legacy-a195b753.js","./@intlify-legacy-7f6e5bc9.js"],(function(a,e){"use strict";var t,l,n,s,i,o,u,r,c,d,g,b,p;return{setters:[function(a){t=a.D,l=a.h,n=a.i,s=a.e},function(a){i=a.r},function(a){o=a._},function(a){u=a.o,r=a.c,c=a.a,d=a.O,g=a.R,b=a.V,p=a.aS},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var f=document.createElement("style");f.textContent=".attention[data-v-b79b8abe]{display:-webkit-box;display:-ms-flexbox;display:flex}.attention-left[data-v-b79b8abe]{width:375px;margin-right:30px}.attention-right .alert-warning[data-v-b79b8abe]{position:relative;padding:16px 16px 16px 69px;border-radius:6px;margin-bottom:10px;color:#495060;line-height:1.5;border:1px solid #ffebcc;background-color:#fff5e6}.attention-right .alert-warning .alert-icon[data-v-b79b8abe]{position:absolute;top:20px;left:24px}.attention-right .alert-warning .alert-icon .svg-icon[data-v-b79b8abe]{color:#f90}.attention .attention-left img[data-v-b79b8abe]{width:100%;border:1px solid #eeeeee}\n",document.head.appendChild(f);var v=""+new URL("../jpg/mobile_gzh-09d375c6.jpg",e.meta.url).href,y=function(a,e){return i._get("/shop/plus.officia/index",a,e)},m=function(a,e){return i._post("/shop/plus.officia/index",a,e)},h={data:function(){return{mobile_url:v,form:{status:!1},Data:[],loading:!1,rules:{status:[{required:!0,message:"请输入活动名称",trigger:"blur"}]}}},created:function(){this.getData()},methods:{getData:function(){var a=this;y({},!0).then((function(e){a.loading=!1,"1"==e.data.vars.values.status?a.form.status=!0:a.form.status=!1})).catch((function(e){a.loading=!1}))},onSubmit:function(){var a=this,e=this,t={};e.form.status?t.status=1:t.status=0,e.loading=!0,m(t,!0).then((function(t){e.loading=!1,1==t.code?(a.$ElMessage({message:$t("保存成功"),type:"success"}),e.getData()):e.loading=!1})).catch((function(a){e.loading=!1}))}}},j={class:"attention pb50"},x={class:"attention-left"},w=["src"],_={class:"attention-right"},k=p('<div class="alert-warning" data-v-b79b8abe><div class="alert-icon" data-v-b79b8abe><span class="icon iconfont icon-gantanhao" data-v-b79b8abe></span></div><span class="alert-desc" data-v-b79b8abe><div data-v-b79b8abe> 1.使用该功能前，需前往小程序后台，在“设置”-&gt;“接口设置”-&gt;“公众号关注组件”中设置要展示的公众号。注：设置的公众号需与小程序主体一致。 <a href="https://mp.weixin.qq.com" target="_blank" data-v-b79b8abe>去配置</a></div><div data-v-b79b8abe>2.若没有配置公众号，功能将不生效。</div><div class="attention-tips" data-v-b79b8abe> 3.在一个小程序的生命周期内，只有从以下场景进入小程序，才具有展示引导关注公众号的能力: <p data-v-b79b8abe>a）当小程序从扫小程序码打开时。</p><p data-v-b79b8abe>b）当从其他小程序返回小程序时，若小程序之前未被销毁，则该组件保持上一次打开小程序时的状态。</p></div></span></div>',1),q={class:"common-button-wrapper"};a("default",o(h,[["render",function(a,e,i,o,p,f){var v=t,y=l,m=n,h=s;return u(),r("div",j,[c("div",x,[c("img",{src:p.mobile_url,alt:"mobile"},null,8,w)]),c("div",_,[k,d(h,{ref:"form",size:"small",model:p.form,"label-position":"top",rules:p.rules,"label-width":"100px"},{default:g((function(){return[d(y,{label:"公众号关注",prop:"status"},{default:g((function(){return[d(v,{modelValue:p.form.status,"onUpdate:modelValue":e[0]||(e[0]=function(a){return p.form.status=a})},null,8,["modelValue"])]})),_:1}),c("div",q,[d(m,{type:"primary",size:"small",onClick:f.onSubmit,loading:p.loading},{default:g((function(){return[b("提交")]})),_:1},8,["onClick","loading"])])]})),_:1},8,["model","rules"])])])}],["__scopeId","data-v-b79b8abe"]]))}}}));
