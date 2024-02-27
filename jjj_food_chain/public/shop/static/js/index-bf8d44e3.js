import{_ as e}from"./Upload-58a0844c.js";import{g as a,h as l,i as s,p as o,q as t,e as i}from"./element-plus-bf694ad1.js";import{S as r}from"./setting-6427e806.js";import{l as p}from"./index-aac1ab8a.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{an as n,o as d,c as u,O as g,R as c,a as h,V as f,W as j,_,P as b,a7 as v,S as y,X as U}from"./@vue-b57a05a6.js";import"./file-d84fe1fa.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./cropperjs-86d7592f.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const V={class:"product-add"},$={class:"ww100"},w={class:"mt10",width:100},x={class:"tips"},k={class:"common-button-wrapper"};const I=m({components:{Upload:e},data:()=>({loading:!1,form:{name:"",customer:"",key:"",sms_open:"",wx_open:"",is_get_log:0,avatarUrl:"",shop:{}},lang:[],all_type:[],type:[],isupload:!1,langList:[]}),created(){this.getParams()},methods:{selectOne(e){let a=!1;return this.lang.map((l=>{e==l&&(a=!0)})),a},getParams(){let e=this;r.storeDetail({},!0).then((a=>{let l=a.data.vars.values;e.form=Object.assign(e.form,l),e.form.shop=a.data.shop,a.data.vars.values.language.map((a=>{e.lang.push(a.name)})),e.langList=a.data.shop.language,e.loading=!1})).catch((e=>{}))},onSubmit(){let e=this,a=this.form,l=[];this.lang.map(((e,a)=>{this.langList.map((s=>{s.name==e&&l.push({key:a+1,name:s.name,value:s.value})}))})),this.form.language=l,e.$refs.form.validate((l=>{l&&(e.loading=!0,r.editStore(a,!0).then((a=>{e.loading=!1;let l=JSON.parse(localStorage.getItem("Language")).language;-1==e.lang.indexOf(l)&&p().setLanguage(e.lang[0]),this.$ElMessage({message:$t("操作成功"),type:"success"}),setTimeout((()=>{location.reload()}),1e3)})).catch((a=>{e.loading=!1})))}))},chooseImg(e){this.type=e,this.isupload=!0},returnImgsFunc(e){this.isupload=!1,null!=e&&e.length>0&&("avatarUrl"==this.type?this.form.avatarUrl=e[0].file_path:"logoUrl"==this.type&&(this.form.logoUrl=e[0].file_path))}}},[["render",function(r,p,m,I,O,L){const P=a,S=l,C=s,q=o,G=t,z=i,J=e,E=n("img-url");return d(),u("div",V,[g(z,{size:"small",ref:"form",model:O.form,"label-position":"top","label-width":"150px"},{default:c((()=>[g(S,{label:r.$t("店铺名称"),rules:[{required:!0,message:" "}],prop:"name"},{default:c((()=>[g(P,{modelValue:O.form.name,"onUpdate:modelValue":p[0]||(p[0]=e=>O.form.name=e),placeholder:r.$t("商城名称"),class:"max-w460"},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),g(S,{label:r.$t("LOGO"),rules:[{required:!0,message:" "}],prop:"name"},{default:c((()=>[h("div",$,[g(C,{onClick:p[1]||(p[1]=e=>L.chooseImg("logoUrl"))},{default:c((()=>[f(j(r.$t("选择图片")),1)])),_:1})]),_(h("img",w,null,512),[[E,O.form.logoUrl]]),h("div",x,j(r.$t("支持JPG、JPEG、PNG格式，小于15MB，尺寸：120*120px")),1)])),_:1},8,["label"]),g(S,{label:r.$t("店铺ID"),prop:"customer"},{default:c((()=>[g(P,{modelValue:O.form.shop.shop_supplier_id,"onUpdate:modelValue":p[2]||(p[2]=e=>O.form.shop.shop_supplier_id=e),disabled:"",placeholder:"",class:"max-w460"},null,8,["modelValue"])])),_:1},8,["label"]),g(S,{label:r.$t("机器码"),prop:"key"},{default:c((()=>[g(P,{modelValue:O.form.shop.device_code,"onUpdate:modelValue":p[3]||(p[3]=e=>O.form.shop.device_code=e),disabled:"",placeholder:"",class:"max-w460"},null,8,["modelValue"])])),_:1},8,["label"]),(d(),u(b,null,v(4,((e,a)=>g(S,{key:a,label:r.$t("语言")+(a+1)+(0==a?"("+r.$t("默认")+")":""),prop:"lang"},{default:c((()=>[g(G,{modelValue:O.lang[a],"onUpdate:modelValue":e=>O.lang[a]=e,clearable:"",class:"max-w460",size:"default"},{default:c((()=>[(d(!0),u(b,null,v(O.langList,(e=>(d(),y(q,{key:e.name,value:e.name,label:e.value,disabled:L.selectOne(e.name)},null,8,["value","label","disabled"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1032,["label"]))),64)),h("div",k,[g(C,{onClick:L.getParams,loading:O.loading},{default:c((()=>[f(j(r.$t("重置")),1)])),_:1},8,["onClick","loading"]),g(C,{type:"primary",onClick:L.onSubmit,loading:O.loading},{default:c((()=>[f(j(r.$t("保存")),1)])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]),O.isupload?(d(),y(J,{key:0,isupload:O.isupload,type:O.type,config:{total:1},onReturnImgs:L.returnImgsFunc},null,8,["isupload","type","onReturnImgs"])):U("",!0)])}],["__scopeId","data-v-7fbc07f4"]]);export{I as default};