import{_ as a}from"./Upload-22bade2e.js";import{E as e,c as s,d as t,e as o,b as l}from"./element-plus-7d357588.js";import{S as i}from"./setting-10e80d8d.js";import{_ as m}from"./index-f792122d.js";import{ap as r,o as p,c as d,P as n,S as u,W as c,$ as f,a as j,T as h,Y as g}from"./@vue-48c55b54.js";/* empty css                                                               */import"./@vueuse-c556fb5a.js";import"./lodash-es-c1acaa3d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-e0f4a3e8.js";import"./dayjs-9faf8871.js";import"./call-bind-0c463fe3.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-b8ff3004.js";import"./pinia-73166104.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-942d6868.js";import"./side-channel-ba7aab8a.js";import"./object-inspect-860361a9.js";import"./vue-ueditor-wrap-cd29f9a1.js";const _={components:{Upload:a},data:()=>({loading:!0,formData:{qq:"",wechat:"",mp_image:""},isupload:!1}),created(){this.getParams()},methods:{getParams(){let a=this;i.getMpService({},!0).then((e=>{1==e.code&&(a.formData=e.data.vars.values,a.loading=!1)})).catch((a=>{}))},onSubmit(){let a=this,s=this.formData;a.$refs.formData.validate((t=>{t&&(a.loading=!0,i.setMpService(s,!0).then((s=>{a.loading=!1,e({message:"恭喜你， 客服设置成功",type:"success"})})).catch((e=>{a.loading=!1})))}))},chooseImg(){this.isupload=!0},returnImgsFunc(a){this.isupload=!1,this.formData.mp_image=a[0].file_path}}},b=j("div",{class:"common-form"},"客服设置",-1),v={class:"mt10",width:"200"},D={class:"common-button-wrapper"};const q=m(_,[["render",function(e,i,m,_,q,w){const y=s,x=t,k=o,I=l,Q=a,S=r("img-url");return p(),d("div",null,[n(I,{size:"small",ref:"formData",model:q.formData,"label-width":"150px"},{default:u((()=>[b,n(x,{label:"QQ",rules:[{required:!0,message:"请输入QQ"}]},{default:u((()=>[n(y,{type:"number",modelValue:q.formData.qq,"onUpdate:modelValue":i[0]||(i[0]=a=>q.formData.qq=a),placeholder:"请输入QQ",class:"max-w460"},null,8,["modelValue"])])),_:1}),n(x,{label:"微信号",rules:[{required:!0,message:"请输入微信号"}]},{default:u((()=>[n(y,{modelValue:q.formData.wechat,"onUpdate:modelValue":i[1]||(i[1]=a=>q.formData.wechat=a),placeholder:"请输入微信号",class:"max-w460"},null,8,["modelValue"])])),_:1}),n(x,{label:"公众号二维码",rules:[{required:!0,message:"请输入上传公众号二维码"}]},{default:u((()=>[n(k,{onClick:w.chooseImg},{default:u((()=>[c("选择图片")])),_:1},8,["onClick"]),f(j("img",v,null,512),[[S,q.formData.mp_image]])])),_:1}),j("div",D,[n(k,{size:"small",type:"primary",onClick:w.onSubmit,disabled:q.loading},{default:u((()=>[c("提交")])),_:1},8,["onClick","disabled"])])])),_:1},8,["model"]),q.isupload?(p(),h(Q,{key:0,isupload:q.isupload,config:{total:3},onReturnImgs:w.returnImgsFunc},null,8,["isupload","onReturnImgs"])):g("",!0)])}]]);export{q as default};
