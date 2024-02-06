import{_ as e}from"./Upload-f6700adf.js";import{g as o,h as s,i as t,e as a}from"./element-plus-c8084613.js";import{S as l}from"./setting-7151395b.js";import{u as r}from"./index-64643ccb.js";import{_ as i}from"./_plugin-vue_export-helper-1b428a4d.js";import{an as p,o as m,c as d,O as n,R as u,a as c,V as h,W as f,_ as g,S as j,X as _}from"./@vue-b57a05a6.js";import"./file-2bf9cd30.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./cropperjs-86d7592f.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const{changStore:v}=r(),b={class:"product-add"},y={class:"ww100"},$={class:"mt10",width:100},w={class:"tips"},x={class:"common-button-wrapper"};const U=i({components:{Upload:e},data:()=>({loading:!1,form:{name:"",customer:"",key:"",sms_open:"",wx_open:"",is_get_log:0,avatarUrl:"",shop:{}},all_type:[],type:[],isupload:!1}),created(){this.getParams()},methods:{getParams(){let e=this;l.storeDetail({},!0).then((o=>{let s=o.data.vars.values;e.form=Object.assign(e.form,s),e.form.shop=o.data.shop,e.loading=!1})).catch((e=>{}))},onSubmit(){let e=this,o=this.form;e.$refs.form.validate((s=>{s&&(e.loading=!0,l.editStore(o,!0).then((s=>{e.loading=!1,this.$ElMessage({message:$t("操作成功"),type:"success"}),v(o),e.$router.push("/setting/store/index")})).catch((o=>{e.loading=!1})))}))},chooseImg(e){this.type=e,this.isupload=!0},returnImgsFunc(e){this.isupload=!1,null!=e&&e.length>0&&("avatarUrl"==this.type?this.form.avatarUrl=e[0].file_path:"logoUrl"==this.type&&(this.form.logoUrl=e[0].file_path))}}},[["render",function(l,r,i,v,U,V){const I=o,k=s,C=t,P=a,S=e,G=p("img-url");return m(),d("div",b,[n(P,{size:"small",ref:"form",model:U.form,"label-position":"top","label-width":"150px"},{default:u((()=>[n(k,{label:l.$t("店铺名称"),rules:[{required:!0,message:" "}],prop:"name"},{default:u((()=>[n(I,{modelValue:U.form.name,"onUpdate:modelValue":r[0]||(r[0]=e=>U.form.name=e),placeholder:l.$t("商城名称"),class:"max-w460"},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),n(k,{label:l.$t("LOGO"),rules:[{required:!0,message:" "}],prop:"name"},{default:u((()=>[c("div",y,[n(C,{onClick:r[1]||(r[1]=e=>V.chooseImg("logoUrl"))},{default:u((()=>[h(f(l.$t("选择图片")),1)])),_:1})]),g(c("img",$,null,512),[[G,U.form.logoUrl]]),c("div",w,f(l.$t("支持JPG、JPEG、PNG格式，小于15MB，尺寸：120*120px")),1)])),_:1},8,["label"]),n(k,{label:l.$t("店铺ID"),prop:"customer"},{default:u((()=>[n(I,{modelValue:U.form.shop.shop_supplier_id,"onUpdate:modelValue":r[2]||(r[2]=e=>U.form.shop.shop_supplier_id=e),disabled:"",placeholder:"",class:"max-w460"},null,8,["modelValue"])])),_:1},8,["label"]),n(k,{label:l.$t("机器码"),prop:"key"},{default:u((()=>[n(I,{modelValue:U.form.shop.device_code,"onUpdate:modelValue":r[3]||(r[3]=e=>U.form.shop.device_code=e),disabled:"",placeholder:"",class:"max-w460"},null,8,["modelValue"])])),_:1},8,["label"]),c("div",x,[n(C,{onClick:V.getParams,loading:U.loading},{default:u((()=>[h(f(l.$t("重置")),1)])),_:1},8,["onClick","loading"]),n(C,{type:"primary",onClick:V.onSubmit,loading:U.loading},{default:u((()=>[h(f(l.$t("保存")),1)])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]),U.isupload?(m(),j(S,{key:0,isupload:U.isupload,type:U.type,config:{total:1},onReturnImgs:V.returnImgsFunc},null,8,["isupload","type","onReturnImgs"])):_("",!0)])}],["__scopeId","data-v-f1d3f07e"]]);export{U as default};
