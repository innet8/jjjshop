import{_ as s}from"./Upload-644f5e47.js";import{E as i,i as t,h as o,e as p}from"./element-plus-d03e850c.js";import{P as a}from"./plus-ec1693da.js";import{_ as e}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as l,c as r,P as m,S as n,W as d,a as c,Y as u,T as h}from"./@vue-e72ffbb6.js";import"./file-27ba6bf9.js";import"./index-aad60c61.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./call-bind-2971450c.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./@element-plus-4b00147d.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";const j={components:{Upload:s},data:()=>({form:{index:"",apply:"",cash_apply:""},isupload:!1,loading:!1,type:""}),props:{settingData:Object},created(){this.form=this.settingData.data.background.values},methods:{openUpload(s){this.type=s,this.isupload=!0},returnImgsFunc(s){null!=s&&(1==this.type&&(this.form.index=s[0].file_path),2==this.type&&(this.form.apply=s[0].file_path),3==this.type&&(this.form.cash_apply=s[0].file_path)),this.isupload=!1},onSubmit(){let s=this;s.loading=!0;let t=s.form;a.background(t,!0).then((t=>{s.loading=!1,i({message:"恭喜你，设置成功",type:"success"})})).catch((i=>{s.loading=!1}))}}},f={class:"test-wrap mt30"},y={key:0,class:"img"},g=["src"],v=c("div",{class:"tips"},"尺寸：宽750像素 高度227像素",-1),_={key:0,class:"img"},b=["src"],k=c("div",{class:"tips"},"尺寸：宽750像素 高度227像素",-1),w={key:0,class:"img"},x=["src"],U=c("div",{class:"tips"},"尺寸：宽750像素 高度227像素",-1),C={class:"common-button-wrapper"};const z=e(j,[["render",function(i,a,e,j,z,I){const S=t,D=o,F=p,P=s;return l(),r("div",f,[m(F,{size:"small",ref:"form",model:z.form,"label-position":"top","label-width":"200px"},{default:n((()=>[m(D,{label:"分销中心首页"},{default:n((()=>[m(S,{type:"primary",plain:"",icon:"Upload",onClick:a[0]||(a[0]=s=>I.openUpload(1))},{default:n((()=>[d("上传图片")])),_:1}),""!=z.form.index?(l(),r("div",y,[c("img",{src:z.form.index,width:"750",height:"227"},null,8,g)])):u("",!0),v])),_:1}),m(D,{label:"申请成为分销商页"},{default:n((()=>[m(S,{type:"primary",plain:"",icon:"Upload",onClick:a[1]||(a[1]=s=>I.openUpload(2))},{default:n((()=>[d("上传图片")])),_:1}),""!=z.form.apply?(l(),r("div",_,[c("img",{src:z.form.apply,width:"750",height:"227"},null,8,b)])):u("",!0),k])),_:1}),m(D,{label:"申请提现页"},{default:n((()=>[m(S,{type:"primary",plain:"",icon:"Upload",onClick:a[2]||(a[2]=s=>I.openUpload(3))},{default:n((()=>[d("上传图片")])),_:1}),""!=z.form.cash_apply?(l(),r("div",w,[c("img",{src:z.form.cash_apply,width:"750",height:"227"},null,8,x)])):u("",!0),U])),_:1}),c("div",C,[m(S,{size:"small",type:"primary",onClick:I.onSubmit,loading:z.loading},{default:n((()=>[d("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]),z.isupload?(l(),h(P,{key:0,isupload:z.isupload,type:z.type,onReturnImgs:I.returnImgsFunc},{default:n((()=>[d("上传图片")])),_:1},8,["isupload","type","onReturnImgs"])):u("",!0)])}]]);export{z as default};