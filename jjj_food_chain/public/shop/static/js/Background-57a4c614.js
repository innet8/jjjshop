import{_ as s}from"./Upload-e7579a9c.js";import{i,h as t,e as o}from"./element-plus-c8084613.js";import{P as p}from"./plus-8ad29f0f.js";import{_ as a}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as e,c as r,O as l,R as m,V as n,a as d,X as c,S as u}from"./@vue-b57a05a6.js";import"./file-9623813c.js";import"./index-74b65baf.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./@element-plus-ce7ae957.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./dayjs-33a066dd.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";const j={components:{Upload:s},data:()=>({form:{index:"",apply:"",cash_apply:""},isupload:!1,loading:!1,type:""}),props:{settingData:Object},created(){this.form=this.settingData.data.background.values},methods:{openUpload(s){this.type=s,this.isupload=!0},returnImgsFunc(s){null!=s&&(1==this.type&&(this.form.index=s[0].file_path),2==this.type&&(this.form.apply=s[0].file_path),3==this.type&&(this.form.cash_apply=s[0].file_path)),this.isupload=!1},onSubmit(){let s=this;s.loading=!0;let i=s.form;p.background(i,!0).then((i=>{s.loading=!1,this.$ElMessage({message:"恭喜你，设置成功",type:"success"})})).catch((i=>{s.loading=!1}))}}},h={class:"test-wrap mt30"},f={key:0,class:"img"},y=["src"],g=d("div",{class:"tips"},"尺寸：宽750像素 高度227像素",-1),_={key:0,class:"img"},v=["src"],b=d("div",{class:"tips"},"尺寸：宽750像素 高度227像素",-1),k={key:0,class:"img"},w=["src"],x=d("div",{class:"tips"},"尺寸：宽750像素 高度227像素",-1),U={class:"common-button-wrapper"};const C=a(j,[["render",function(p,a,j,C,z,I){const D=i,F=t,R=o,S=s;return e(),r("div",h,[l(R,{size:"small",ref:"form",model:z.form,"label-position":"top","label-width":"200px"},{default:m((()=>[l(F,{label:"分销中心首页"},{default:m((()=>[l(D,{type:"primary",plain:"",icon:"Upload",onClick:a[0]||(a[0]=s=>I.openUpload(1))},{default:m((()=>[n("上传图片")])),_:1}),""!=z.form.index?(e(),r("div",f,[d("img",{src:z.form.index,width:"750",height:"227"},null,8,y)])):c("",!0),g])),_:1}),l(F,{label:"申请成为分销商页"},{default:m((()=>[l(D,{type:"primary",plain:"",icon:"Upload",onClick:a[1]||(a[1]=s=>I.openUpload(2))},{default:m((()=>[n("上传图片")])),_:1}),""!=z.form.apply?(e(),r("div",_,[d("img",{src:z.form.apply,width:"750",height:"227"},null,8,v)])):c("",!0),b])),_:1}),l(F,{label:"申请提现页"},{default:m((()=>[l(D,{type:"primary",plain:"",icon:"Upload",onClick:a[2]||(a[2]=s=>I.openUpload(3))},{default:m((()=>[n("上传图片")])),_:1}),""!=z.form.cash_apply?(e(),r("div",k,[d("img",{src:z.form.cash_apply,width:"750",height:"227"},null,8,w)])):c("",!0),x])),_:1}),d("div",U,[l(D,{size:"small",type:"primary",onClick:I.onSubmit,loading:z.loading},{default:m((()=>[n("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]),z.isupload?(e(),u(S,{key:0,isupload:z.isupload,type:z.type,onReturnImgs:I.returnImgsFunc},{default:m((()=>[n("上传图片")])),_:1},8,["isupload","type","onReturnImgs"])):c("",!0)])}]]);export{C as default};
