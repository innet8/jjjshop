import{g as e,h as l,w as o,x as a,H as t,i as r,e as d,v as i}from"./element-plus-bf694ad1.js";import{C as p}from"./coupon-c35fc9d7.js";import{f as m}from"./index-191c97f6.js";import{_ as s}from"./_plugin-vue_export-helper-1b428a4d.js";import{_ as u,o as n,c,O as f,R as _,V as b,a as h,bm as V,bk as j}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const g={data:()=>({form:{coupon_id:"",name:"",color:"",coupon_type:"",reduce_price:"",discount:"",min_price:"",expire_type:"",expire_day:"",active_time:"",total_num:"",show_center:1,sort:1,max_price:""},list:{},loading:!0,pickerOptions0:{disabledDate:e=>e.getTime()<Date.now()-864e5}}),created(){let e=this.$route.query.coupon_id;this.getData(e)},methods:{getData(e){let l=this;p.couponDetail({coupon_id:e},!0).then((e=>{let o={};o=e.data.detail,o.color=e.data.detail.color.value,o.coupon_type=e.data.detail.coupon_type.value,l.form=m(l.form,o),l.loading=!1})).catch((e=>{l.loading=!1}))},onSubmit(){let e=this,l=e.form;e.$refs.form.validate((o=>{o?(e.loading=!0,p.editCoupon(l,!0).then((l=>{e.loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"}),e.$router.push("/plus/coupon/index")})).catch((l=>{e.loading=!1}))):e.loading=!1}))},cancelFunc(){this.$router.push({path:"/plus/coupon/index"})}}},y=e=>(V("data-v-b660c686"),e=e(),j(),e),v=y((()=>h("div",{class:"common-form"},"修改优惠券",-1))),x=y((()=>h("div",{class:"tips"},"例如：满100减10",-1))),k={key:0},U={key:1},w=y((()=>h("div",{class:"tips"},"折扣率范围0-10，9.5代表9.5折，0代表不折扣",-1))),q=y((()=>h("div",{class:"tips"},"最大抵扣金额不能超出此金额，0代表不限制",-1))),C={key:2},D={key:3},$=y((()=>h("div",{class:"tips"},"限制领取的优惠券数量，-1为不限制",-1))),z={class:"common-button-wrapper"};const Y=s(g,[["render",function(p,m,s,V,j,g){const y=e,Y=l,M=o,O=a,F=t,I=r,S=d,B=i;return u((n(),c("div",null,[f(S,{size:"small",ref:"form",model:j.form,"label-position":"top","label-width":"200px"},{default:_((()=>[v,f(Y,{label:"优惠券名称",prop:"name",rules:[{required:!0,message:" "}]},{default:_((()=>[f(y,{modelValue:j.form.name,"onUpdate:modelValue":m[0]||(m[0]=e=>j.form.name=e),placeholder:"请输入优惠券名称"},null,8,["modelValue"]),x])),_:1}),f(Y,{label:"优惠券颜色"},{default:_((()=>[f(O,{modelValue:j.form.color,"onUpdate:modelValue":m[1]||(m[1]=e=>j.form.color=e)},{default:_((()=>[f(M,{label:10},{default:_((()=>[b("蓝色")])),_:1}),f(M,{label:20},{default:_((()=>[b("红色")])),_:1}),f(M,{label:30},{default:_((()=>[b("紫色")])),_:1}),f(M,{label:40},{default:_((()=>[b("黄色")])),_:1})])),_:1},8,["modelValue"])])),_:1}),f(Y,{label:"优惠券类型"},{default:_((()=>[f(O,{modelValue:j.form.coupon_type,"onUpdate:modelValue":m[2]||(m[2]=e=>j.form.coupon_type=e)},{default:_((()=>[f(M,{label:10},{default:_((()=>[b("满减券")])),_:1}),f(M,{label:20},{default:_((()=>[b("折扣券")])),_:1})])),_:1},8,["modelValue"])])),_:1}),10==j.form.coupon_type?(n(),c("div",k,[f(Y,{label:"减免金额",prop:"reduce_price",rules:[{required:!0,message:" "}]},{default:_((()=>[f(y,{modelValue:j.form.reduce_price,"onUpdate:modelValue":m[3]||(m[3]=e=>j.form.reduce_price=e),placeholder:"请输入减免金额",type:"number"},null,8,["modelValue"])])),_:1})])):(n(),c("div",U,[f(Y,{label:"折扣率 ",prop:"discount",rules:[{required:!0,message:" "}]},{default:_((()=>[f(y,{modelValue:j.form.discount,"onUpdate:modelValue":m[4]||(m[4]=e=>j.form.discount=e),placeholder:"请输入折扣率",type:"number"},null,8,["modelValue"]),w])),_:1}),f(Y,{label:"最多优惠金额",prop:"max_price",rules:[{required:!0,message:" "}]},{default:_((()=>[f(y,{modelValue:j.form.max_price,"onUpdate:modelValue":m[5]||(m[5]=e=>j.form.max_price=e),placeholder:"请输入最多优惠金额",type:"number"},null,8,["modelValue"]),q])),_:1})])),f(Y,{label:"最低消费金额",prop:"min_price",rules:[{required:!0,message:" "}]},{default:_((()=>[f(y,{modelValue:j.form.min_price,"onUpdate:modelValue":m[6]||(m[6]=e=>j.form.min_price=e),placeholder:"请输入最低消费金额",type:"number"},null,8,["modelValue"])])),_:1}),f(Y,{label:"到期类型"},{default:_((()=>[f(O,{modelValue:j.form.expire_type,"onUpdate:modelValue":m[7]||(m[7]=e=>j.form.expire_type=e)},{default:_((()=>[f(M,{label:10},{default:_((()=>[b("领取后生效")])),_:1}),f(M,{label:20},{default:_((()=>[b("固定时间")])),_:1})])),_:1},8,["modelValue"])])),_:1}),10==j.form.expire_type?(n(),c("div",C,[f(Y,{label:"有效天数"},{default:_((()=>[f(y,{modelValue:j.form.expire_day,"onUpdate:modelValue":m[8]||(m[8]=e=>j.form.expire_day=e),placeholder:"请输入有效天数",type:"number"},null,8,["modelValue"])])),_:1})])):(n(),c("div",D,[f(Y,{label:"有效时间"},{default:_((()=>[f(F,{modelValue:j.form.active_time,"onUpdate:modelValue":m[9]||(m[9]=e=>j.form.active_time=e),type:"daterange",align:"right","unlink-panels":"","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":j.pickerOptions0},null,8,["modelValue","picker-options"])])),_:1})])),f(Y,{label:"发放总数量 ",prop:"total_num",rules:[{required:!0,message:" "}]},{default:_((()=>[f(y,{modelValue:j.form.total_num,"onUpdate:modelValue":m[10]||(m[10]=e=>j.form.total_num=e),placeholder:"请输入发放总数量",type:"number"},null,8,["modelValue"]),$])),_:1}),f(Y,{label:"是否显示在领券中心"},{default:_((()=>[f(O,{modelValue:j.form.show_center,"onUpdate:modelValue":m[11]||(m[11]=e=>j.form.show_center=e)},{default:_((()=>[f(M,{label:1},{default:_((()=>[b("显示")])),_:1}),f(M,{label:0},{default:_((()=>[b("不显示")])),_:1})])),_:1},8,["modelValue"])])),_:1}),f(Y,{label:"排序"},{default:_((()=>[f(y,{type:"number",modelValue:j.form.sort,"onUpdate:modelValue":m[12]||(m[12]=e=>j.form.sort=e),placeholder:"接近0，排序等级越高"},null,8,["modelValue"])])),_:1}),h("div",z,[f(I,{size:"small",onClick:g.cancelFunc,loading:j.loading},{default:_((()=>[b("取消")])),_:1},8,["onClick","loading"]),f(I,{type:"primary",size:"small",onClick:g.onSubmit,loading:j.loading},{default:_((()=>[b("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])),[[B,j.loading]])}],["__scopeId","data-v-b660c686"]]);export{Y as default};
