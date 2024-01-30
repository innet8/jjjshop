import{g as e,h as t,i as a,r as l,s as o,p as i,q as s,e as r}from"./element-plus-33e0d8cc.js";import{_ as m}from"./Upload-66ad4daf.js";import{A as d}from"./article-e7452990.js";import{U as n}from"./UE-a81edceb.js";import{_ as u}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as c,o as p,c as f,P as g,S as _,a as h,W as j,Y as b,T as y,Q as v,a8 as V,bb as C,b9 as x}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-5ed95284.js";import"./index-188a77f0.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const U={components:{Uediter:n,Upload:m},data:()=>({isupload:!1,isImg:!1,ueditor:{text:"",config:{initialFrameWidth:400,initialFrameHeight:500}},path:"",form:{article_title:"",category_id:"",image_id:"",article_sort:1,article_status:1,virtual_views:1,article_content:"",dec:""},catgory:[],loading:!1,rules:{article_title:[{required:!0,message:"请输入文章标题",trigger:"blur"}],dec:[{required:!0,message:"请输入文章描述",trigger:"blur"}]}}),created(){this.getCategoryList()},methods:{contentChangeFunc(e){this.form.article_content=e},openUpload(){this.isupload=!0},returnImgsFunc(e){null!=e&&(this.form.image_id=e[0].file_id,this.path=e[0].file_path,this.isImg=!0),this.isupload=!1},getCategoryList(){let e=this;d.toAddArticle({},!0).then((t=>{e.catgory=t.data.catgory,e.catgory.length>0&&(e.form.category_id=e.catgory[0].category_id)})).catch((e=>{}))},onSubmit(){let e=this,t=e.form;e.$refs.form.validate((a=>{a&&(e.loading=!0,d.addArticle(t,!0).then((t=>{e.loading=!1,this.$ElMessage({message:t.msg,type:"success"}),e.$router.push("/plus/article/index")})).catch((t=>{e.loading=!1})))}))},cancelFunc(){this.$router.push({path:"/plus/article/index"})}}},w={class:"product-add pb50"},I=(e=>(C("data-v-4ed64efc"),e=e(),x(),e))((()=>h("div",{class:"common-form"},"添加资讯",-1))),k=["src","isImg"],F={class:"edit_container"},z={class:"common-button-wrapper"};const A=u(U,[["render",function(d,n,u,C,x,U){const A=e,q=t,$=a,S=m,E=l,L=o,R=i,W=s,B=c("Uediter"),H=r;return p(),f("div",w,[g(H,{size:"small",model:x.form,"label-position":"top",ref:"form",rules:x.rules,"label-width":"100px"},{default:_((()=>[I,g(q,{label:"资讯标题",prop:"article_title"},{default:_((()=>[g(A,{modelValue:x.form.article_title,"onUpdate:modelValue":n[0]||(n[0]=e=>x.form.article_title=e),placeholder:"请输入文章标题",class:"max-w460"},null,8,["modelValue"])])),_:1}),g(q,{label:"描述",prop:"dec"},{default:_((()=>[g(A,{modelValue:x.form.dec,"onUpdate:modelValue":n[1]||(n[1]=e=>x.form.dec=e),placeholder:"请输入文章描述",class:"max-w460"},null,8,["modelValue"])])),_:1}),g(q,{label:"缩略图"},{default:_((()=>[h("div",null,[g($,{type:"primary",onClick:U.openUpload},{default:_((()=>[j("上传图片")])),_:1},8,["onClick"]),x.isImg?(p(),f("img",{key:0,src:x.path,class:"mt10",width:120,isImg:x.isImg},null,8,k)):b("",!0),x.isupload?(p(),y(S,{key:1,isupload:x.isupload,onReturnImgs:U.returnImgsFunc},{default:_((()=>[j("上传图片")])),_:1},8,["isupload","onReturnImgs"])):b("",!0)])])),_:1}),g(q,{label:"资讯分类"},{default:_((()=>[g(L,{modelValue:x.form.category_id,"onUpdate:modelValue":n[2]||(n[2]=e=>x.form.category_id=e),placeholder:"请选择"},{default:_((()=>[(p(!0),f(v,null,V(x.catgory,((e,t)=>(p(),y(E,{key:t,label:e.name,value:e.category_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),g(q,{label:"虚拟阅读量"},{default:_((()=>[g(A,{type:"number",modelValue:x.form.virtual_views,"onUpdate:modelValue":n[3]||(n[3]=e=>x.form.virtual_views=e),placeholder:"请输入数字",class:"max-w460"},null,8,["modelValue"])])),_:1}),g(q,{label:"资讯状态"},{default:_((()=>[g(W,{modelValue:x.form.article_status,"onUpdate:modelValue":n[4]||(n[4]=e=>x.form.article_status=e)},{default:_((()=>[g(R,{label:1},{default:_((()=>[j("显示")])),_:1}),g(R,{label:0},{default:_((()=>[j("隐藏")])),_:1})])),_:1},8,["modelValue"])])),_:1}),g(q,{label:"资讯内容"},{default:_((()=>[h("div",F,[g(B,{text:x.form.article_content,config:x.ueditor.config,ref:"ue",onContentChange:U.contentChangeFunc},null,8,["text","config","onContentChange"])])])),_:1}),g(q,{label:"排序"},{default:_((()=>[g(A,{type:"number",modelValue:x.form.article_sort,"onUpdate:modelValue":n[5]||(n[5]=e=>x.form.article_sort=e),placeholder:"请输入数字",class:"max-w460"},null,8,["modelValue"])])),_:1}),h("div",z,[g($,{size:"small",type:"info",onClick:U.cancelFunc},{default:_((()=>[j("取消")])),_:1},8,["onClick"]),g($,{size:"small",type:"primary",onClick:U.onSubmit,loading:x.loading},{default:_((()=>[j("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model","rules"])])}],["__scopeId","data-v-4ed64efc"]]);export{A as default};