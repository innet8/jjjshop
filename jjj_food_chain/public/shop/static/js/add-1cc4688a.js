import{E as e,g as l,h as o,o as a,p as r,H as t,i as d,e as m}from"./element-plus-b01b3a31.js";import{C as p}from"./coupon-6b0be8c5.js";import{_ as s}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as i,c as u,P as n,S as c,W as f,a as _,bb as b,b9 as V}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-fed3ed55.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const j={data:()=>({form:{color:"10",coupon_type:"10",expire_type:"10",sort:1,active_time:"",show_center:1,max_price:""},loading:!1,pickerOptions0:{disabledDate:e=>e.getTime()<Date.now()-864e5}}),created(){},methods:{onSubmit(){let l=this,o=l.form;l.$refs.form.validate((a=>{a&&(l.loading=!0,p.addCoupon(o,!0).then((o=>{l.loading=!1,e({message:"恭喜你，添加成功",type:"success"}),l.$router.push("/plus/coupon/index")})).catch((e=>{l.loading=!1})))}))},cancelFunc(){this.$router.push({path:"/plus/coupon/index"})}}},h=e=>(b("data-v-3ce91e3f"),e=e(),V(),e),y={class:"product-add"},v=h((()=>_("div",{class:"common-form"},"添加优惠券",-1))),g=h((()=>_("div",{class:"tips"},"例如：满100减10",-1))),x={key:0},k={key:1},U=h((()=>_("div",{class:"tips"},"折扣率范围0-10，9.5代表9.5折，0代表不折扣",-1))),w=h((()=>_("div",{class:"tips"},"最大抵扣金额不能超出此金额，0代表不限制",-1))),q={key:2},C={key:3},z=h((()=>_("div",{class:"tips"},"限制领取的优惠券数量，-1为不限制",-1))),D={class:"common-button-wrapper"};const Y=s(j,[["render",function(e,p,s,b,V,j){const h=l,Y=o,S=a,$=r,F=t,M=d,O=m;return i(),u("div",y,[n(O,{size:"small",ref:"form",model:V.form,"label-position":"top","label-width":"200px"},{default:c((()=>[v,n(Y,{label:"优惠券名称",prop:"name",rules:[{required:!0,message:" "}]},{default:c((()=>[n(h,{modelValue:V.form.name,"onUpdate:modelValue":p[0]||(p[0]=e=>V.form.name=e),placeholder:"请输入优惠券名称"},null,8,["modelValue"]),g])),_:1}),n(Y,{label:"优惠券颜色"},{default:c((()=>[n($,{modelValue:V.form.color,"onUpdate:modelValue":p[1]||(p[1]=e=>V.form.color=e)},{default:c((()=>[n(S,{label:"10"},{default:c((()=>[f("蓝色")])),_:1}),n(S,{label:"20"},{default:c((()=>[f("红色")])),_:1}),n(S,{label:"30"},{default:c((()=>[f("紫色")])),_:1}),n(S,{label:"40"},{default:c((()=>[f("黄色")])),_:1})])),_:1},8,["modelValue"])])),_:1}),n(Y,{label:"优惠券类型"},{default:c((()=>[n($,{modelValue:V.form.coupon_type,"onUpdate:modelValue":p[2]||(p[2]=e=>V.form.coupon_type=e)},{default:c((()=>[n(S,{label:"10"},{default:c((()=>[f("满减券")])),_:1}),n(S,{label:"20"},{default:c((()=>[f("折扣券")])),_:1})])),_:1},8,["modelValue"])])),_:1}),10==V.form.coupon_type?(i(),u("div",x,[n(Y,{label:"减免金额",prop:"reduce_price",rules:[{required:!0,message:" "}]},{default:c((()=>[n(h,{modelValue:V.form.reduce_price,"onUpdate:modelValue":p[3]||(p[3]=e=>V.form.reduce_price=e),placeholder:"请输入减免金额",type:"number"},null,8,["modelValue"])])),_:1})])):(i(),u("div",k,[n(Y,{label:"折扣率 ",prop:"discount",rules:[{required:!0,message:" "}]},{default:c((()=>[n(h,{modelValue:V.form.discount,"onUpdate:modelValue":p[4]||(p[4]=e=>V.form.discount=e),placeholder:"请输入折扣率",type:"number"},null,8,["modelValue"]),U])),_:1}),n(Y,{label:"最多优惠金额",prop:"max_price",rules:[{required:!0,message:" "}]},{default:c((()=>[n(h,{modelValue:V.form.max_price,"onUpdate:modelValue":p[5]||(p[5]=e=>V.form.max_price=e),placeholder:"请输入最多优惠金额",type:"number"},null,8,["modelValue"]),w])),_:1})])),n(Y,{label:"最低消费金额",prop:"min_price",rules:[{required:!0,message:" "}]},{default:c((()=>[n(h,{modelValue:V.form.min_price,"onUpdate:modelValue":p[6]||(p[6]=e=>V.form.min_price=e),placeholder:"请输入最低消费金额",type:"number"},null,8,["modelValue"])])),_:1}),n(Y,{label:"到期类型"},{default:c((()=>[n($,{modelValue:V.form.expire_type,"onUpdate:modelValue":p[7]||(p[7]=e=>V.form.expire_type=e)},{default:c((()=>[n(S,{label:"10"},{default:c((()=>[f("领取后生效")])),_:1}),n(S,{label:"20"},{default:c((()=>[f("固定时间")])),_:1})])),_:1},8,["modelValue"])])),_:1}),10==V.form.expire_type?(i(),u("div",q,[n(Y,{label:"有效天数"},{default:c((()=>[n(h,{modelValue:V.form.expire_day,"onUpdate:modelValue":p[8]||(p[8]=e=>V.form.expire_day=e),placeholder:"请输入有效天数",type:"number"},null,8,["modelValue"])])),_:1})])):(i(),u("div",C,[n(Y,{label:"有效时间"},{default:c((()=>[n(F,{modelValue:V.form.active_time,"onUpdate:modelValue":p[9]||(p[9]=e=>V.form.active_time=e),type:"daterange",align:"right","unlink-panels":"","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":V.pickerOptions0},null,8,["modelValue","picker-options"])])),_:1})])),n(Y,{label:"发放总数量 ",prop:"total_num",rules:[{required:!0,message:" "}]},{default:c((()=>[n(h,{modelValue:V.form.total_num,"onUpdate:modelValue":p[10]||(p[10]=e=>V.form.total_num=e),placeholder:"请输入发放总数量",type:"number"},null,8,["modelValue"]),z])),_:1}),n(Y,{label:"是否显示在领券中心"},{default:c((()=>[n($,{modelValue:V.form.show_center,"onUpdate:modelValue":p[11]||(p[11]=e=>V.form.show_center=e)},{default:c((()=>[n(S,{label:1},{default:c((()=>[f("显示")])),_:1}),n(S,{label:0},{default:c((()=>[f("不显示")])),_:1})])),_:1},8,["modelValue"])])),_:1}),n(Y,{label:"排序"},{default:c((()=>[n(h,{type:"number",modelValue:V.form.sort,"onUpdate:modelValue":p[12]||(p[12]=e=>V.form.sort=e),placeholder:"请输入排序"},null,8,["modelValue"])])),_:1}),_("div",D,[n(M,{type:"info",size:"small",onClick:j.cancelFunc,loading:V.loading},{default:c((()=>[f("取消")])),_:1},8,["onClick","loading"]),n(M,{type:"primary",size:"small",onClick:j.onSubmit,loading:V.loading},{default:c((()=>[f("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}],["__scopeId","data-v-3ce91e3f"]]);export{Y as default};
