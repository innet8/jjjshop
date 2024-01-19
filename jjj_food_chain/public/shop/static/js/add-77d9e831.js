import{E as e,g as t,h as l,i as a,q as o,r as i,o as r,p as s,e as m}from"./element-plus-d03e850c.js";import{_ as d}from"./Upload-8d45ba26.js";import{A as n}from"./article-4e798276.js";import{U as u}from"./UE-25f64ce5.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as c,o as f,c as g,P as _,S as h,a as j,W as y,Y as b,T as v,Q as V,a8 as C}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-4be86a03.js";import"./index-8a56ff53.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const x={components:{Uediter:u,Upload:d},data:()=>({isupload:!1,isImg:!1,ueditor:{text:"",config:{initialFrameWidth:400,initialFrameHeight:500}},path:"",form:{article_title:"",category_id:"",image_id:"",article_sort:1,article_status:1,virtual_views:1,article_content:"",dec:""},catgory:[],loading:!1,rules:{article_title:[{required:!0,message:"请输入文章标题",trigger:"blur"}],dec:[{required:!0,message:"请输入文章描述",trigger:"blur"}]}}),created(){this.getCategoryList()},methods:{contentChangeFunc(e){this.form.article_content=e},openUpload(){this.isupload=!0},returnImgsFunc(e){null!=e&&(this.form.image_id=e[0].file_id,this.path=e[0].file_path,this.isImg=!0),this.isupload=!1},getCategoryList(){let e=this;n.toAddArticle({},!0).then((t=>{e.catgory=t.data.catgory,e.catgory.length>0&&(e.form.category_id=e.catgory[0].category_id)})).catch((e=>{}))},onSubmit(){let t=this,l=t.form;t.$refs.form.validate((a=>{a&&(t.loading=!0,n.addArticle(l,!0).then((l=>{t.loading=!1,e({message:l.msg,type:"success"}),t.$router.push("/plus/article/index")})).catch((e=>{t.loading=!1})))}))},cancelFunc(){this.$router.push({path:"/plus/article/index"})}}},U={class:"product-add pb50"},w=j("div",{class:"common-form"},"添加资讯",-1),k=["src","isImg"],I={class:"edit_container"},F={class:"common-button-wrapper"};const z=p(x,[["render",function(e,n,u,p,x,z){const A=t,q=l,S=a,W=d,$=o,E=i,L=r,R=s,B=c("Uediter"),H=m;return f(),g("div",U,[_(H,{size:"small",model:x.form,"label-position":"top",ref:"form",rules:x.rules,"label-width":"100px"},{default:h((()=>[w,_(q,{label:"资讯标题",prop:"article_title"},{default:h((()=>[_(A,{modelValue:x.form.article_title,"onUpdate:modelValue":n[0]||(n[0]=e=>x.form.article_title=e),placeholder:"请输入文章标题",class:"max-w460"},null,8,["modelValue"])])),_:1}),_(q,{label:"描述",prop:"dec"},{default:h((()=>[_(A,{modelValue:x.form.dec,"onUpdate:modelValue":n[1]||(n[1]=e=>x.form.dec=e),placeholder:"请输入文章描述",class:"max-w460"},null,8,["modelValue"])])),_:1}),_(q,{label:"缩略图"},{default:h((()=>[j("div",null,[_(S,{type:"primary",onClick:z.openUpload},{default:h((()=>[y("上传图片")])),_:1},8,["onClick"]),x.isImg?(f(),g("img",{key:0,src:x.path,class:"mt10",width:120,isImg:x.isImg},null,8,k)):b("",!0),x.isupload?(f(),v(W,{key:1,isupload:x.isupload,onReturnImgs:z.returnImgsFunc},{default:h((()=>[y("上传图片")])),_:1},8,["isupload","onReturnImgs"])):b("",!0)])])),_:1}),_(q,{label:"资讯分类"},{default:h((()=>[_(E,{modelValue:x.form.category_id,"onUpdate:modelValue":n[2]||(n[2]=e=>x.form.category_id=e),placeholder:"请选择"},{default:h((()=>[(f(!0),g(V,null,C(x.catgory,((e,t)=>(f(),v($,{key:t,label:e.name,value:e.category_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),_(q,{label:"虚拟阅读量"},{default:h((()=>[_(A,{type:"number",modelValue:x.form.virtual_views,"onUpdate:modelValue":n[3]||(n[3]=e=>x.form.virtual_views=e),placeholder:"请输入数字",class:"max-w460"},null,8,["modelValue"])])),_:1}),_(q,{label:"资讯状态"},{default:h((()=>[_(R,{modelValue:x.form.article_status,"onUpdate:modelValue":n[4]||(n[4]=e=>x.form.article_status=e)},{default:h((()=>[_(L,{label:1},{default:h((()=>[y("显示")])),_:1}),_(L,{label:0},{default:h((()=>[y("隐藏")])),_:1})])),_:1},8,["modelValue"])])),_:1}),_(q,{label:"资讯内容"},{default:h((()=>[j("div",I,[_(B,{text:x.form.article_content,config:x.ueditor.config,ref:"ue",onContentChange:z.contentChangeFunc},null,8,["text","config","onContentChange"])])])),_:1}),_(q,{label:"排序"},{default:h((()=>[_(A,{type:"number",modelValue:x.form.article_sort,"onUpdate:modelValue":n[5]||(n[5]=e=>x.form.article_sort=e),placeholder:"请输入数字",class:"max-w460"},null,8,["modelValue"])])),_:1}),j("div",F,[_(S,{size:"small",type:"info",onClick:z.cancelFunc},{default:h((()=>[y("取消")])),_:1},8,["onClick"]),_(S,{size:"small",type:"primary",onClick:z.onSubmit,loading:x.loading},{default:h((()=>[y("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model","rules"])])}]]);export{z as default};