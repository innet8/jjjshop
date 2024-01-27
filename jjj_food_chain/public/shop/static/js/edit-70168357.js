import{E as e,g as t,h as a,i as l,q as o,r as i,o as r,p as s,e as m,v as d}from"./element-plus-b01b3a31.js";import{_ as n}from"./Upload-a45cc344.js";import{A as u}from"./article-7702ab74.js";import{U as p}from"./UE-94fd85c5.js";import{_ as c}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as f,ap as g,$ as _,o as h,c as j,P as b,S as v,a as y,W as V,T as x,Y as C,Q as U,a8 as w,bb as k,b9 as F}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-9ae0c9ba.js";import"./index-fed3ed55.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const q={components:{Uediter:p,Upload:n},data:()=>({loading:!0,isupload:!1,ueditor:{text:"",config:{initialFrameWidth:400,initialFrameHeight:500}},form:{article_title:"",category_id:"",image_id:"",image:{},article_sort:1,article_status:"0",virtual_views:1,article_content:""},category:[],rules:{article_title:[{required:!0,message:"请输入文章标题",trigger:"blur"}],dec:[{required:!0,message:"请输入文章描述",trigger:"blur"}]}}),created(){this.getDetail()},methods:{contentChangeFunc(e){this.form.article_content=e},openUpload(){this.isupload=!0},getContent:function(){return this.$refs.ue.getUEContent()},returnImgsFunc(e){null!=e&&(this.form.image_id=e[0].file_id,this.form.image.file_path=e[0].file_path),this.isupload=!1},getDetail(){let e=this;const t=e.$route.query.article_id;u.toEditArticle({article_id:t},!0).then((t=>{e.ueditor.text=t.data.model.article_content,e.form=t.data.model,e.form.image||(e.form.image={}),e.category=t.data.catgory,e.loading=!1})).catch((e=>{}))},onSubmit(){let t=this,a=this.form;u.editArticle(a,!0).then((a=>{e({message:a.msg,type:"success"}),t.$router.push("/plus/article/index")})).catch((e=>{}))},cancelFunc(){this.$router.push({path:"/plus/article/index"})}}},z={class:"product-add pb50"},I=(e=>(k("data-v-2c07ba41"),e=e(),F(),e))((()=>y("div",{class:"common-form"},"编辑资讯",-1))),$={class:"mt10",width:120,alt:""},A={class:"edit_container"},E={class:"common-button-wrapper"};const S=c(q,[["render",function(e,u,p,c,k,F){const q=t,S=a,D=l,R=n,W=o,B=i,H=r,P=s,Q=f("Uediter"),T=m,X=g("img-url"),Y=d;return _((h(),j("div",z,[b(T,{size:"small",model:k.form,"label-position":"top",ref:"form",rules:k.rules,"label-width":"100px"},{default:v((()=>[I,b(S,{label:"资讯标题",prop:"article_title"},{default:v((()=>[b(q,{modelValue:k.form.article_title,"onUpdate:modelValue":u[0]||(u[0]=e=>k.form.article_title=e),placeholder:"请输入文章标题",class:"max-w460"},null,8,["modelValue"])])),_:1}),b(S,{label:"描述",prop:"dec"},{default:v((()=>[b(q,{modelValue:k.form.dec,"onUpdate:modelValue":u[1]||(u[1]=e=>k.form.dec=e),placeholder:"请输入文章描述",class:"max-w460"},null,8,["modelValue"])])),_:1}),b(S,{label:"缩略图"},{default:v((()=>[y("div",null,[b(D,{type:"primary",onClick:F.openUpload},{default:v((()=>[V("上传图片")])),_:1},8,["onClick"]),_(y("img",$,null,512),[[X,k.form.image.file_path]]),k.isupload?(h(),x(R,{key:0,isupload:k.isupload,onReturnImgs:F.returnImgsFunc},{default:v((()=>[V("上传图片")])),_:1},8,["isupload","onReturnImgs"])):C("",!0)])])),_:1}),b(S,{label:"资讯分类"},{default:v((()=>[b(B,{modelValue:k.form.category_id,"onUpdate:modelValue":u[2]||(u[2]=e=>k.form.category_id=e),placeholder:"请选择"},{default:v((()=>[(h(!0),j(U,null,w(k.category,((e,t)=>(h(),x(W,{key:t,label:e.name,value:e.category_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),b(S,{label:"虚拟阅读量"},{default:v((()=>[b(q,{type:"number",modelValue:k.form.virtual_views,"onUpdate:modelValue":u[3]||(u[3]=e=>k.form.virtual_views=e),placeholder:"请输入数字",class:"max-w460"},null,8,["modelValue"])])),_:1}),b(S,{label:"资讯状态"},{default:v((()=>[b(P,{modelValue:k.form.article_status,"onUpdate:modelValue":u[4]||(u[4]=e=>k.form.article_status=e)},{default:v((()=>[b(H,{label:1},{default:v((()=>[V("显示")])),_:1}),b(H,{label:0},{default:v((()=>[V("隐藏")])),_:1})])),_:1},8,["modelValue"])])),_:1}),b(S,{label:"资讯内容"},{default:v((()=>[y("div",A,[k.loading?C("",!0):(h(),x(Q,{key:0,text:k.ueditor.text,config:k.ueditor.config,ref:"ue",onContentChange:F.contentChangeFunc},null,8,["text","config","onContentChange"]))])])),_:1}),b(S,{label:"排序"},{default:v((()=>[b(q,{type:"number",modelValue:k.form.article_sort,"onUpdate:modelValue":u[5]||(u[5]=e=>k.form.article_sort=e),placeholder:"请输入数字",class:"max-w460"},null,8,["modelValue"])])),_:1}),y("div",E,[b(D,{size:"small",type:"info",onClick:F.cancelFunc,loading:k.loading},{default:v((()=>[V("取消")])),_:1},8,["onClick","loading"]),b(D,{size:"small",type:"primary",onClick:F.onSubmit,loading:k.loading},{default:v((()=>[V("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model","rules"])])),[[Y,k.loading]])}],["__scopeId","data-v-2c07ba41"]]);export{S as default};
