import{_ as e}from"./Upload-e0b57212.js";import{o,p as t,h as a,H as l,i as s,O as i,q as p,r as m,g as d,e as r}from"./element-plus-b01b3a31.js";import{r as n}from"./index-83a39651.js";import{f as u}from"./DateTime-12b085dd.js";import{_ as f}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as c,c as g,P as _,S as j,W as h,a as y,Y as b,T as v,Q as V,a8 as w,bb as k,b9 as U}from"./@vue-e72ffbb6.js";import"./file-fa4138eb.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./cropperjs-81999277.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";let x={getNewgift:(e,o)=>n._get("/shop/plus.Newgift/index",e,o),editNewgift:(e,o)=>n._post("/shop/plus.Newgift/index",e,o)};const D={components:{Upload:e},data(){let e=new Date,o=new Date;return o.setTime(o.getTime()-6048e5),{isupload:!1,loading:!0,form:{time:[u(o,"yyyy-MM-dd"),u(e,"yyyy-MM-dd")],is_point:0,points:"",is_coupon:0,coupon_ids:[],image:"",status:0},couponList:[],pickerOptions0:{disabledDate:e=>e.getTime()<Date.now()-864e5}}},created(){this.getData()},methods:{getData(){let e=this;e.loading=!0,x.getNewgift({},!0).then((o=>{o.data.detail&&(e.form=o.data.detail),e.couponList=o.data.list,e.loading=!1})).catch((e=>{}))},onSubmit(){let e=this.form;e.coupon_ids.length<=0&&(e.coupon_ids=""),x.editNewgift(e,!0).then((e=>{this.$ElMessage({message:e.msg,type:"success"})})).catch((e=>{}))},openUpload(e){this.type=e,this.isupload=!0},returnImgsFunc(e){null!=e&&e.length>0&&(this.form.image=e[0].file_path),this.isupload=!1}}},M={class:"product-add"},N=(e=>(k("data-v-8a7d16f8"),e=e(),U(),e))((()=>y("div",{class:"common-form"},"新客设置",-1))),C={key:0,class:"img"},I=["src"],T={class:"common-button-wrapper"};const Y=f(D,[["render",function(n,u,f,k,U,x){const D=o,Y=t,z=a,L=l,O=s,S=i,q=p,F=m,R=d,A=r,B=e;return c(),g("div",M,[_(A,{size:"small",ref:"form",model:U.form,"label-position":"top","label-width":"200px"},{default:j((()=>[N,_(z,{label:"是否开启活动"},{default:j((()=>[_(Y,{modelValue:U.form.status,"onUpdate:modelValue":u[0]||(u[0]=e=>U.form.status=e)},{default:j((()=>[_(D,{label:1},{default:j((()=>[h("开启")])),_:1}),_(D,{label:0},{default:j((()=>[h("关闭")])),_:1})])),_:1},8,["modelValue"])])),_:1}),_(z,{label:"活动时间"},{default:j((()=>[y("div",null,[_(L,{modelValue:U.form.time,"onUpdate:modelValue":u[1]||(u[1]=e=>U.form.time=e),type:"datetimerange",align:"right","unlink-panels":"","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":U.pickerOptions0},null,8,["modelValue","picker-options"])])])),_:1}),_(z,{label:"背景图",prop:"image"},{default:j((()=>[_(S,null,{default:j((()=>[_(O,{type:"primary",onClick:x.openUpload},{default:j((()=>[h("选择图片")])),_:1},8,["onClick"]),""!=U.form.image?(c(),g("div",C,[y("img",{src:U.form.image,width:"100",height:"100"},null,8,I)])):b("",!0)])),_:1})])),_:1}),_(z,{label:"赠送优惠券"},{default:j((()=>[y("div",null,[_(Y,{modelValue:U.form.is_coupon,"onUpdate:modelValue":u[2]||(u[2]=e=>U.form.is_coupon=e)},{default:j((()=>[_(D,{label:1},{default:j((()=>[h("开启")])),_:1}),_(D,{label:0},{default:j((()=>[h("关闭")])),_:1})])),_:1},8,["modelValue"])]),1==U.form.is_coupon?(c(),v(F,{key:0,modelValue:U.form.coupon_ids,"onUpdate:modelValue":u[3]||(u[3]=e=>U.form.coupon_ids=e),multiple:"",placeholder:"请选择优惠券"},{default:j((()=>[(c(!0),g(V,null,w(U.couponList,((e,o)=>(c(),v(q,{key:e.coupon_id+"",label:e.name+"",value:e.coupon_id+""},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])):b("",!0)])),_:1}),_(z,{label:"赠送积分"},{default:j((()=>[y("div",null,[_(Y,{modelValue:U.form.is_point,"onUpdate:modelValue":u[4]||(u[4]=e=>U.form.is_point=e)},{default:j((()=>[_(D,{label:1},{default:j((()=>[h("开启")])),_:1}),_(D,{label:0},{default:j((()=>[h("关闭")])),_:1})])),_:1},8,["modelValue"])]),1==U.form.is_point?(c(),v(R,{key:0,type:"text",modelValue:U.form.points,"onUpdate:modelValue":u[5]||(u[5]=e=>U.form.points=e),placeholder:"请输入赠送积分",class:"max-w460"},null,8,["modelValue"])):b("",!0)])),_:1}),y("div",T,[_(O,{type:"primary",onClick:x.onSubmit,loading:U.loading},{default:j((()=>[h("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]),U.isupload?(c(),v(B,{key:0,isupload:U.isupload,type:n.type,onReturnImgs:x.returnImgsFunc},{default:j((()=>[h("上传图片")])),_:1},8,["isupload","type","onReturnImgs"])):b("",!0)])}],["__scopeId","data-v-8a7d16f8"]]);export{Y as default};
