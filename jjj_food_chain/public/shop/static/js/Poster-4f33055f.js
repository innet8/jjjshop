import{i as e,h as o,g as t,o as a,M as l,e as s,v as r}from"./element-plus-b01b3a31.js";import{_ as i}from"./Upload-e0b57212.js";import{P as m}from"./plus-8812ca06.js";import{ap as d,o as p,c as n,$ as u,a as c,Y as f,M as h,V as v,W as j,P as y,S as b,a1 as g,T as w,bb as k,b9 as _}from"./@vue-e72ffbb6.js";import{_ as V}from"./_plugin-vue_export-helper-1b428a4d.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-fa4138eb.js";import"./index-83a39651.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const q=""+new URL("../png/qrcode-1c4b06ca.png",import.meta.url).href,x={components:{Upload:i},data(){return{form:{nickName:{fontSize:20,color:"",left:0,top:0},avatar:{width:30,style:"square",left:0,top:0},qrcode:{width:50,style:"square",left:0,top:0},backdrop:{src:""}},loading:!0,isupload:!1,curObj:this}},created(){this.getData()},directives:{drag:{mounted(e,o){e.onmousedown=function(t){let a=(t=t||window.event).clientX-e.offsetLeft,l=t.clientY-e.offsetTop;document.onmousemove=function(e){let t=(e=e||window.event).clientX-a,s=e.clientY-l;o.value.obj.dragDiv(t,s,o.value.type)},document.onmouseup=function(e){document.onmousemove=null,document.onmouseup=null}}}}},methods:{dragDiv(e,o,t){e<0&&(e=0),o<0&&(o=0),"photo"==t?(this.form.avatar.left=e,this.form.avatar.top=o):"code"==t?(this.form.qrcode.left=e,this.form.qrcode.top=o):"name"==t&&(this.form.nickName.left=e,this.form.nickName.top=o)},openUpload(e){this.type=e,this.isupload=!0},returnImgsFunc(e){null!=e&&(1==this.type&&(this.form.backdrop.src=e[0].file_path),2==this.type&&(this.form.apply=e[0].file_path),3==this.type&&(this.form.cash_apply=e[0].file_path)),this.isupload=!1},getData(){let e=this;m.GetBackground({},!0).then((o=>{e.form=o.data.data,e.loading=!1})).catch((e=>{}))},onSubmit(){let e=this,o=e.form;e.$refs.form.validate((t=>{t&&(e.loading=!0,m.SaveBackground({form:o},!0).then((o=>{e.loading=!1,this.$ElMessage({message:"恭喜你，保存成功",type:"success"}),e.getData()})).catch((o=>{e.loading=!1})))}))}}},N=e=>(k("data-v-9185830d"),e=e(),_(),e),U={class:""},z=N((()=>c("div",{class:"common-form"},"分销海报设置",-1))),S={class:"poster-box d-s-s"},C={class:"left-box"},D={key:0,class:"img"},I={class:"userinfo"},O=[N((()=>c("span",{class:"icon iconfont icon-yonghu"},null,-1)))],R=[N((()=>c("img",{src:q,alt:""},null,-1)))],$={class:"right-box flex-1"},B=N((()=>c("div",{class:"tips"},"尺寸：宽750像素 高大于(等于)1200像素",-1))),M={class:"d-s-c"},X={class:"common-button-wrapper"};const Y=V(x,[["render",function(m,k,_,V,q,x){const N=e,Y=o,E=t,F=a,L=l,P=s,T=i,A=d("img-url"),G=d("drag"),W=r;return p(),n("div",U,[z,u((p(),n("div",S,[c("div",C,[q.form.backdrop?(p(),n("div",D,[u(c("img",null,null,512),[[A,q.form.backdrop.src]])])):f("",!0),c("div",I,[u((p(),n("div",{class:h(["photo pa",{radius:"circle"==q.form.avatar.style}]),style:v("width:"+q.form.avatar.width+"px;height:"+q.form.avatar.width+"px;top:"+q.form.avatar.top+"px;left:"+q.form.avatar.left+"px;")},O,6)),[[G,{type:"photo",obj:q.curObj}]]),u((p(),n("div",{class:"name pa",style:v("font-size:"+q.form.nickName.fontSize+"px;color:"+q.form.nickName.color+";top:"+q.form.nickName.top+"px;left:"+q.form.nickName.left+"px;")},[j(" 昵称 ")],4)),[[G,{type:"name",obj:q.curObj}]]),u((p(),n("div",{class:h(["code pa",{radius:"circle"==q.form.qrcode.style}]),style:v("width:"+q.form.qrcode.width+"px;height:"+q.form.qrcode.width+"px;top:"+q.form.qrcode.top+"px;left:"+q.form.qrcode.left+"px;")},R,6)),[[G,{type:"code",obj:q.curObj}]])])]),c("div",$,[y(P,{size:"small",ref:"form",model:q.form,"label-position":"top","label-width":"200px"},{default:b((()=>[y(Y,{label:"海报背景图"},{default:b((()=>[y(N,{type:"primary",onClick:k[0]||(k[0]=e=>x.openUpload(1))},{default:b((()=>[j("上传图片")])),_:1}),B])),_:1}),y(Y,{label:"头像宽度",prop:"avatar.width",rules:[{required:!0,message:" "}]},{default:b((()=>[y(E,{modelValue:q.form.avatar.width,"onUpdate:modelValue":k[1]||(k[1]=e=>q.form.avatar.width=e),min:"30",type:"number",class:"max-w460"},null,8,["modelValue"])])),_:1}),y(Y,{label:"头像样式"},{default:b((()=>[y(F,{modelValue:q.form.avatar.style,"onUpdate:modelValue":k[2]||(k[2]=e=>q.form.avatar.style=e),label:"square"},{default:b((()=>[j("正方形")])),_:1},8,["modelValue"]),y(F,{modelValue:q.form.avatar.style,"onUpdate:modelValue":k[3]||(k[3]=e=>q.form.avatar.style=e),label:"circle"},{default:b((()=>[j("圆形")])),_:1},8,["modelValue"])])),_:1}),y(Y,{label:"昵称字体大小",prop:"nickName.fontSize",rules:[{required:!0,message:" "}]},{default:b((()=>[y(E,{modelValue:q.form.nickName.fontSize,"onUpdate:modelValue":k[4]||(k[4]=e=>q.form.nickName.fontSize=e),min:"12",type:"number",class:"max-w460"},null,8,["modelValue"])])),_:1}),y(Y,{label:"昵称字体颜色"},{default:b((()=>[c("div",M,[y(L,{modelValue:q.form.nickName.color,"onUpdate:modelValue":k[5]||(k[5]=e=>q.form.nickName.color=e)},null,8,["modelValue"]),y(N,{type:"button",style:{"margin-left":"10px"},onClick:k[6]||(k[6]=g((e=>m.$parent.onEditorResetColor(q.form.nickName,"color","#ffffff")),["stop"]))},{default:b((()=>[j("重置")])),_:1})])])),_:1}),y(Y,{label:"小程序码宽度 ",prop:"qrcode.width",rules:[{required:!0,message:" "}]},{default:b((()=>[y(E,{modelValue:q.form.qrcode.width,"onUpdate:modelValue":k[7]||(k[7]=e=>q.form.qrcode.width=e),min:"50",type:"number",class:"max-w460"},null,8,["modelValue"])])),_:1}),y(Y,{label:"小程序码样式 "},{default:b((()=>[y(F,{modelValue:q.form.qrcode.style,"onUpdate:modelValue":k[8]||(k[8]=e=>q.form.qrcode.style=e),label:"square"},{default:b((()=>[j("正方形")])),_:1},8,["modelValue"]),y(F,{modelValue:q.form.qrcode.style,"onUpdate:modelValue":k[9]||(k[9]=e=>q.form.qrcode.style=e),label:"circle"},{default:b((()=>[j("圆形")])),_:1},8,["modelValue"])])),_:1}),c("div",X,[y(N,{type:"primary",onClick:x.onSubmit,loading:q.loading},{default:b((()=>[j("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])])),[[W,q.loading]]),q.isupload?(p(),w(T,{key:0,isupload:q.isupload,type:m.type,onReturnImgs:x.returnImgsFunc},{default:b((()=>[j("上传图片")])),_:1},8,["isupload","type","onReturnImgs"])):f("",!0)])}],["__scopeId","data-v-9185830d"]]);export{Y as default};
