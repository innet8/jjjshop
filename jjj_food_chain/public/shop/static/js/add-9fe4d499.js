import{_ as e}from"./Upload-e7579a9c.js";import{I as t,J as o,i as s,e as i}from"./element-plus-c8084613.js";import{G as a}from"./group-ad8792db.js";import{U as r}from"./UE-55ed460b.js";import p from"./Basic-d3cf3f64.js";import m from"./Notice-9f6cbab0.js";import l from"./Content-0976c156.js";import{af as n,o as u,c,O as d,R as j,S as f,X as g,_ as h,$ as _,a as v,V as b}from"./@vue-b57a05a6.js";import{_ as y}from"./_plugin-vue_export-helper-1b428a4d.js";import"./file-9623813c.js";import"./index-74b65baf.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./@element-plus-ce7ae957.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./dayjs-33a066dd.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";import"./vuedraggable-a472da53.js";import"./sortablejs-b4c145c4.js";const x={class:"product-add pb50"},C={class:"common-button-wrapper"};const N=y({components:{Uediter:r,Upload:e,Basic:p,Notice:m,Content:l},data:()=>({activeName:"basic",isupload:!1,path:"",form:{group_name:"",group_price:"",line_price:"",sales_initial:"",notice:"",content:"",limit_num:0,group_sort:100,suit_type:10,shop_supplier_id:[],group_status:1,image:[],supplier:[],describe:"",time:[],expire_type:10,expire_day:""},loading:!1}),provide:function(){return{form:this.form}},created(){this.getData()},methods:{openUpload(){this.isupload=!0},returnImgsFunc(e){if(null!=e){let t=this.form.image.concat(e);this.form.image=t}this.isupload=!1},getData(){let e=this;a.toAddGroup({},!0).then((t=>{e.form.supplier=t.data.supplier})).catch((e=>{}))},onSubmit(){let e=this,t=e.form;e.$refs.form.validate((o=>{o&&(e.loading=!0,a.addGroup(t,!0).then((t=>{e.loading=!1,this.$ElMessage({message:t.msg,type:"success"}),e.$router.push("/plus/group/index")})).catch((t=>{e.loading=!1})))}))},cancelFunc(){this.$router.push({path:"/plus/group/index"})},deleteImg(e){this.form.image.splice(e,1)}}},[["render",function(a,r,p,m,l,y){const N=t,I=o,U=n("Basic"),k=n("Notice"),w=n("Content"),z=s,F=i,$=e;return u(),c("div",x,[d(I,{modelValue:l.activeName,"onUpdate:modelValue":r[0]||(r[0]=e=>l.activeName=e),type:"card"},{default:j((()=>[d(N,{label:"基础设置",name:"basic"}),d(N,{label:"购买须知",name:"notice"}),d(N,{label:"团购详情",name:"content"})])),_:1},8,["modelValue"]),d(F,{size:"small",model:l.form,"label-position":"top",ref:"form","label-width":"100px"},{default:j((()=>["basic"==l.activeName?(u(),f(U,{key:0})):g("",!0),h(d(k,null,null,512),[[_,"notice"==l.activeName]]),h(d(w,null,null,512),[[_,"content"==l.activeName]]),v("div",C,[d(z,{size:"small",type:"info",onClick:y.cancelFunc},{default:j((()=>[b("取消")])),_:1},8,["onClick"]),d(z,{size:"small",type:"primary",onClick:y.onSubmit,loading:l.loading},{default:j((()=>[b("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]),l.isupload?(u(),f($,{key:0,config:{total:9},isupload:l.isupload,onReturnImgs:y.returnImgsFunc},{default:j((()=>[b("上传图片")])),_:1},8,["isupload","onReturnImgs"])):g("",!0)])}],["__scopeId","data-v-dde39736"]]);export{N as default};
