import{_ as s}from"./Upload-66ad4daf.js";import{i,h as t,e as o}from"./element-plus-33e0d8cc.js";import{P as p}from"./plus-b4ed2784.js";import{_ as a}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as e,c as l,P as r,S as m,W as n,a as d,Y as c,T as u}from"./@vue-e72ffbb6.js";import"./file-5ed95284.js";import"./index-188a77f0.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./call-bind-2971450c.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./@element-plus-4b00147d.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const h={components:{Upload:s},data:()=>({form:{index:"",apply:"",cash_apply:""},isupload:!1,loading:!1,type:""}),props:{settingData:Object},created(){this.form=this.settingData.data.background.values},methods:{openUpload(s){this.type=s,this.isupload=!0},returnImgsFunc(s){null!=s&&(1==this.type&&(this.form.index=s[0].file_path),2==this.type&&(this.form.apply=s[0].file_path),3==this.type&&(this.form.cash_apply=s[0].file_path)),this.isupload=!1},onSubmit(){let s=this;s.loading=!0;let i=s.form;p.background(i,!0).then((i=>{s.loading=!1,this.$ElMessage({message:"恭喜你，设置成功",type:"success"})})).catch((i=>{s.loading=!1}))}}},j={class:"test-wrap mt30"},f={key:0,class:"img"},y=["src"],g=d("div",{class:"tips"},"尺寸：宽750像素 高度227像素",-1),v={key:0,class:"img"},_=["src"],b=d("div",{class:"tips"},"尺寸：宽750像素 高度227像素",-1),k={key:0,class:"img"},w=["src"],x=d("div",{class:"tips"},"尺寸：宽750像素 高度227像素",-1),U={class:"common-button-wrapper"};const C=a(h,[["render",function(p,a,h,C,z,I){const S=i,D=t,F=o,P=s;return e(),l("div",j,[r(F,{size:"small",ref:"form",model:z.form,"label-position":"top","label-width":"200px"},{default:m((()=>[r(D,{label:"分销中心首页"},{default:m((()=>[r(S,{type:"primary",plain:"",icon:"Upload",onClick:a[0]||(a[0]=s=>I.openUpload(1))},{default:m((()=>[n("上传图片")])),_:1}),""!=z.form.index?(e(),l("div",f,[d("img",{src:z.form.index,width:"750",height:"227"},null,8,y)])):c("",!0),g])),_:1}),r(D,{label:"申请成为分销商页"},{default:m((()=>[r(S,{type:"primary",plain:"",icon:"Upload",onClick:a[1]||(a[1]=s=>I.openUpload(2))},{default:m((()=>[n("上传图片")])),_:1}),""!=z.form.apply?(e(),l("div",v,[d("img",{src:z.form.apply,width:"750",height:"227"},null,8,_)])):c("",!0),b])),_:1}),r(D,{label:"申请提现页"},{default:m((()=>[r(S,{type:"primary",plain:"",icon:"Upload",onClick:a[2]||(a[2]=s=>I.openUpload(3))},{default:m((()=>[n("上传图片")])),_:1}),""!=z.form.cash_apply?(e(),l("div",k,[d("img",{src:z.form.cash_apply,width:"750",height:"227"},null,8,w)])):c("",!0),x])),_:1}),d("div",U,[r(S,{size:"small",type:"primary",onClick:I.onSubmit,loading:z.loading},{default:m((()=>[n("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]),z.isupload?(e(),u(P,{key:0,isupload:z.isupload,type:z.type,onReturnImgs:I.returnImgsFunc},{default:m((()=>[n("上传图片")])),_:1},8,["isupload","type","onReturnImgs"])):c("",!0)])}]]);export{C as default};
