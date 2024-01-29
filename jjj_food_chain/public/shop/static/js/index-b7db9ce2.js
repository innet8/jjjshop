import{_ as e}from"./Upload-612e4aea.js";import{E as o,o as t,p as a,h as l,H as s,i,O as p,q as m,r as d,g as r,e as n}from"./element-plus-b01b3a31.js";import{r as u}from"./index-83830581.js";import{f as c}from"./DateTime-12b085dd.js";import{_ as f}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as _,c as g,P as j,S as h,W as b,a as y,Y as v,T as V,Q as w,a8 as k,bb as U,b9 as x}from"./@vue-e72ffbb6.js";import"./file-9314bf99.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./cropperjs-81999277.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";let D={getNewgift:(e,o)=>u._get("/shop/plus.Newgift/index",e,o),editNewgift:(e,o)=>u._post("/shop/plus.Newgift/index",e,o)};const M={components:{Upload:e},data(){let e=new Date,o=new Date;return o.setTime(o.getTime()-6048e5),{isupload:!1,loading:!0,form:{time:[c(o,"yyyy-MM-dd"),c(e,"yyyy-MM-dd")],is_point:0,points:"",is_coupon:0,coupon_ids:[],image:"",status:0},couponList:[],pickerOptions0:{disabledDate:e=>e.getTime()<Date.now()-864e5}}},created(){this.getData()},methods:{getData(){let e=this;e.loading=!0,D.getNewgift({},!0).then((o=>{o.data.detail&&(e.form=o.data.detail),e.couponList=o.data.list,e.loading=!1})).catch((e=>{}))},onSubmit(){let e=this.form;e.coupon_ids.length<=0&&(e.coupon_ids=""),D.editNewgift(e,!0).then((e=>{o({message:e.msg,type:"success"})})).catch((e=>{}))},openUpload(e){this.type=e,this.isupload=!0},returnImgsFunc(e){null!=e&&e.length>0&&(this.form.image=e[0].file_path),this.isupload=!1}}},N={class:"product-add"},C=(e=>(U("data-v-cb2f421d"),e=e(),x(),e))((()=>y("div",{class:"common-form"},"新客设置",-1))),I={key:0,class:"img"},T=["src"],Y={class:"common-button-wrapper"};const z=f(M,[["render",function(o,u,c,f,U,x){const D=t,M=a,z=l,L=s,O=i,S=p,q=m,F=d,R=r,A=n,B=e;return _(),g("div",N,[j(A,{size:"small",ref:"form",model:U.form,"label-position":"top","label-width":"200px"},{default:h((()=>[C,j(z,{label:"是否开启活动"},{default:h((()=>[j(M,{modelValue:U.form.status,"onUpdate:modelValue":u[0]||(u[0]=e=>U.form.status=e)},{default:h((()=>[j(D,{label:1},{default:h((()=>[b("开启")])),_:1}),j(D,{label:0},{default:h((()=>[b("关闭")])),_:1})])),_:1},8,["modelValue"])])),_:1}),j(z,{label:"活动时间"},{default:h((()=>[y("div",null,[j(L,{modelValue:U.form.time,"onUpdate:modelValue":u[1]||(u[1]=e=>U.form.time=e),type:"datetimerange",align:"right","unlink-panels":"","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":U.pickerOptions0},null,8,["modelValue","picker-options"])])])),_:1}),j(z,{label:"背景图",prop:"image"},{default:h((()=>[j(S,null,{default:h((()=>[j(O,{type:"primary",onClick:x.openUpload},{default:h((()=>[b("选择图片")])),_:1},8,["onClick"]),""!=U.form.image?(_(),g("div",I,[y("img",{src:U.form.image,width:"100",height:"100"},null,8,T)])):v("",!0)])),_:1})])),_:1}),j(z,{label:"赠送优惠券"},{default:h((()=>[y("div",null,[j(M,{modelValue:U.form.is_coupon,"onUpdate:modelValue":u[2]||(u[2]=e=>U.form.is_coupon=e)},{default:h((()=>[j(D,{label:1},{default:h((()=>[b("开启")])),_:1}),j(D,{label:0},{default:h((()=>[b("关闭")])),_:1})])),_:1},8,["modelValue"])]),1==U.form.is_coupon?(_(),V(F,{key:0,modelValue:U.form.coupon_ids,"onUpdate:modelValue":u[3]||(u[3]=e=>U.form.coupon_ids=e),multiple:"",placeholder:"请选择优惠券"},{default:h((()=>[(_(!0),g(w,null,k(U.couponList,((e,o)=>(_(),V(q,{key:e.coupon_id+"",label:e.name+"",value:e.coupon_id+""},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])):v("",!0)])),_:1}),j(z,{label:"赠送积分"},{default:h((()=>[y("div",null,[j(M,{modelValue:U.form.is_point,"onUpdate:modelValue":u[4]||(u[4]=e=>U.form.is_point=e)},{default:h((()=>[j(D,{label:1},{default:h((()=>[b("开启")])),_:1}),j(D,{label:0},{default:h((()=>[b("关闭")])),_:1})])),_:1},8,["modelValue"])]),1==U.form.is_point?(_(),V(R,{key:0,type:"text",modelValue:U.form.points,"onUpdate:modelValue":u[5]||(u[5]=e=>U.form.points=e),placeholder:"请输入赠送积分",class:"max-w460"},null,8,["modelValue"])):v("",!0)])),_:1}),y("div",Y,[j(O,{type:"primary",onClick:x.onSubmit,loading:U.loading},{default:h((()=>[b("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]),U.isupload?(_(),V(B,{key:0,isupload:U.isupload,type:o.type,onReturnImgs:x.returnImgsFunc},{default:h((()=>[b("上传图片")])),_:1},8,["isupload","type","onReturnImgs"])):v("",!0)])}],["__scopeId","data-v-cb2f421d"]]);export{z as default};