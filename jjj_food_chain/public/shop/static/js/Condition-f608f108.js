import{_ as e}from"./Product-37b9769d.js";import{w as o,h as t,i as s,j as a,O as i,e as l}from"./element-plus-bf694ad1.js";import{P as r}from"./plus-d76cf482.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as d,o as p,c as u,O as c,R as n,a as _,V as f,P as b,S as j,a7 as g,W as h,X as y,bm as v,bk as V}from"./@vue-b57a05a6.js";import"./product-8551b9b8.js";import"./index-a3618bf6.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./@element-plus-ce7ae957.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./dayjs-33a066dd.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";const w={components:{Product:e},data:()=>({form:{},isproduct:!1,loading:!1}),props:{settingData:Object},created(){this.form=this.settingData.data.condition.values,this.form.product_image||(this.form.product_image=[])},methods:{onSubmit(){let e=this;e.loading=!0;let o=this.form;r.condition(o,!0).then((o=>{e.loading=!1,this.$ElMessage({message:"恭喜你，设置成功",type:"success"})})).catch((o=>{e.loading=!1}))},deleteFunc(e){this.form.become__buy_product_ids.splice(e,1),this.form.product_image.splice(e,1)},openProduct(){this.isproduct=!0},closeDialogFunc(e){this.isproduct=e.openDialog,"success"==e.type&&(-1==this.form.become__buy_product_ids.indexOf(e.params.product_id)?(this.form.become__buy_product_ids.push(e.params.product_id),this.form.product_image.push({product_id:e.params.product_id,image:e.params.image,product_name:e.params.product_name})):this.$ElMessage({message:"已选择该商品",type:"warning"}))}}},k={class:"product-add mt30"},C=(e=>(v("data-v-2622ac3c"),e=e(),V(),e))((()=>_("div",{class:"tips"},"购买指定商品付款后自动成为分销商，无需后台审核",-1))),x={class:"ww100"},D=["src"],P=["onClick"],F={class:"text-ellipsis"},U={class:"common-button-wrapper"};const z=m(w,[["render",function(r,m,v,V,w,z){const O=o,I=t,S=s,q=d("CircleCloseFilled"),E=a,M=i,$=l,B=e;return p(),u("div",k,[c($,{size:"small",ref:"form",model:w.form,"label-position":"top","label-width":"200px"},{default:n((()=>[c(I,{label:"成为分销商条件"},{default:n((()=>[_("div",null,[c(O,{modelValue:w.form.become,"onUpdate:modelValue":m[0]||(m[0]=e=>w.form.become=e),label:"10"},{default:n((()=>[f("需后台审核")])),_:1},8,["modelValue"]),c(O,{modelValue:w.form.become,"onUpdate:modelValue":m[1]||(m[1]=e=>w.form.become=e),label:"20"},{default:n((()=>[f("无需审核")])),_:1},8,["modelValue"])])])),_:1}),c(I,{label:"购买指定商品成为分销商"},{default:n((()=>[c(O,{modelValue:w.form.become__buy_product,"onUpdate:modelValue":m[2]||(m[2]=e=>w.form.become__buy_product=e),label:"0"},{default:n((()=>[f("关闭")])),_:1},8,["modelValue"]),c(O,{modelValue:w.form.become__buy_product,"onUpdate:modelValue":m[3]||(m[3]=e=>w.form.become__buy_product=e),label:"1"},{default:n((()=>[f("开启")])),_:1},8,["modelValue"]),C,1==w.form.become__buy_product?(p(),u(b,{key:0},[_("div",x,[c(S,{type:"primary",onClick:z.openProduct},{default:n((()=>[f("选择商品")])),_:1},8,["onClick"])]),w.form.product_image&&w.form.product_image.length>0?(p(),j(M,{key:0,class:"ww100"},{default:n((()=>[(p(!0),u(b,null,g(w.form.product_image,((e,o)=>(p(),u("div",{key:o,class:"imgItem pr"},[_("img",{src:e.image,width:"100",height:"100"},null,8,D),_("a",{href:"javascript:void(0)",class:"delete-btn",onClick:e=>z.deleteFunc(o)},[c(E,null,{default:n((()=>[c(q)])),_:1})],8,P),_("p",F,h(e.product_name),1)])))),128))])),_:1})):y("",!0)],64)):y("",!0)])),_:1}),c(I,{label:"成为下线条件"},{default:n((()=>[_("div",null,[c(O,{modelValue:w.form.downline,"onUpdate:modelValue":m[4]||(m[4]=e=>w.form.downline=e),label:"10"},{default:n((()=>[f("首次点击分享链接")])),_:1},8,["modelValue"])])])),_:1}),_("div",U,[c(S,{size:"small",type:"primary",onClick:z.onSubmit,loading:w.loading},{default:n((()=>[f("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]),c(B,{isproduct:w.isproduct,onCloseDialog:m[5]||(m[5]=e=>z.closeDialogFunc(e))},{default:n((()=>[f("产品列表弹出层")])),_:1},8,["isproduct"])])}],["__scopeId","data-v-2622ac3c"]]);export{z as default};