import{D as t,h as a,i as s,e}from"./element-plus-33e0d8cc.js";import{r as i}from"./index-188a77f0.js";import{_ as o}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as l,c as r,a as n,P as p,S as m,W as d,b as c}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const u=""+new URL("../jpg/mobile_gzh-09d375c6.jpg",import.meta.url).href;let f={getData:(t,a)=>i._get("/shop/plus.officia/index",t,a),saveData:(t,a)=>i._post("/shop/plus.officia/index",t,a)};const v={data:()=>({mobile_url:u,form:{status:!1},Data:[],loading:!1,rules:{status:[{required:!0,message:"请输入活动名称",trigger:"blur"}]}}),created(){this.getData()},methods:{getData(){let t=this;f.getData({},!0).then((a=>{t.loading=!1,"1"==a.data.vars.values.status?t.form.status=!0:t.form.status=!1})).catch((a=>{t.loading=!1}))},onSubmit(){let t=this,a={};t.form.status?a.status=1:a.status=0,t.loading=!0,f.saveData(a,!0).then((a=>{t.loading=!1,1==a.code?(this.$ElMessage({message:"恭喜你，保存成功",type:"success"}),t.getData()):t.loading=!1})).catch((a=>{t.loading=!1}))}}},g={class:"attention pb50"},j={class:"attention-left"},h=["src"],b={class:"attention-right"},_=c('<div class="alert-warning" data-v-cf9f788e><div class="alert-icon" data-v-cf9f788e><span class="icon iconfont icon-gantanhao" data-v-cf9f788e></span></div><span class="alert-desc" data-v-cf9f788e><div data-v-cf9f788e> 1.使用该功能前，需前往小程序后台，在“设置”-&gt;“接口设置”-&gt;“公众号关注组件”中设置要展示的公众号。注：设置的公众号需与小程序主体一致。 <a href="https://mp.weixin.qq.com" target="_blank" data-v-cf9f788e>去配置</a></div><div data-v-cf9f788e>2.若没有配置公众号，功能将不生效。</div><div class="attention-tips" data-v-cf9f788e> 3.在一个小程序的生命周期内，只有从以下场景进入小程序，才具有展示引导关注公众号的能力: <p data-v-cf9f788e>a）当小程序从扫小程序码打开时。</p><p data-v-cf9f788e>b）当从其他小程序返回小程序时，若小程序之前未被销毁，则该组件保持上一次打开小程序时的状态。</p></div></span></div>',1),D={class:"common-button-wrapper"};const w=o(v,[["render",function(i,o,c,u,f,v){const w=t,x=a,y=s,k=e;return l(),r("div",g,[n("div",j,[n("img",{src:f.mobile_url,alt:"mobile"},null,8,h)]),n("div",b,[_,p(k,{ref:"form",size:"small",model:f.form,"label-position":"top",rules:f.rules,"label-width":"100px"},{default:m((()=>[p(x,{label:"公众号关注",prop:"status"},{default:m((()=>[p(w,{modelValue:f.form.status,"onUpdate:modelValue":o[0]||(o[0]=t=>f.form.status=t)},null,8,["modelValue"])])),_:1}),n("div",D,[p(y,{type:"primary",size:"small",onClick:v.onSubmit,loading:f.loading},{default:m((()=>[d("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model","rules"])])])}],["__scopeId","data-v-cf9f788e"]]);export{w as default};
