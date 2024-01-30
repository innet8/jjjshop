import{o as e,h as r,q as t,r as i,i as o,e as a}from"./element-plus-b01b3a31.js";import{S as s}from"./setting-b3577e68.js";import{_ as l}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as n,c as p,P as m,S as d,a as _,W as u,X as c,T as h,Q as f,a8 as j,Y as b}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-83a39651.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const g={class:"product-add"},v={style:{float:"left"}},y={style:{float:"right",color:"#8492a6","font-size":"13px"}},$={key:1,class:"cashier-desc"},k={class:"common-button-wrapper"};const V=l({data:()=>({form:{buyer_open:"0",room_open:"0",seller_open:"0",buyer_printer_id:"",room_printer_id:"",seller_printer_id:"",cashier_open:"0",cashier_printer_id:"0"},checked:!1,printerList:[],loading:!1}),created(){this.getData()},methods:{getData(){let e=this;s.printingDetail({},!0).then((r=>{let t=r.data.vars.values;e.form.buyer_open=t.buyer_open,e.form.seller_open=t.seller_open,e.form.room_open=t.room_open,e.form.cashier_open=t.cashier_open,e.form.buyer_printer_id=""+t.buyer_printer_id,e.form.room_printer_id=""+t.room_printer_id,e.form.seller_printer_id=""+t.seller_printer_id,e.form.cashier_printer_id=""+t.cashier_printer_id,e.printerList=r.data.vars.printerList,null!=t.order_status&&20==t.order_status[0]&&(e.checked=!0)})).catch((e=>{}))},onSubmit(){let e=this,r=this.form;e.loading=!0,s.editPrinting(r,!0).then((r=>{e.loading=!1,this.$ElMessage({message:$t("恭喜你，打印设置成功"),type:"success"})})).catch((r=>{e.loading=!1}))},handleCheckedCitiesChange(e){let r=this;e?r.form.order_status[0]=20:r.form.order_status=[]}}},[["render",function(s,l,V,C,x,w){const D=e,L=r,S=t,q=i,z=o,U=a;return n(),p("div",g,[m(U,{size:"small",ref:"form",model:x.form,"label-position":"top","label-width":"200px"},{default:d((()=>[m(L,{label:s.$t("收银打印"),rules:[{required:!0}]},{default:d((()=>[_("div",null,[m(D,{modelValue:x.form.cashier_open,"onUpdate:modelValue":l[0]||(l[0]=e=>x.form.cashier_open=e),label:"1"},{default:d((()=>[u(c(s.$t("开启")),1)])),_:1},8,["modelValue"]),m(D,{modelValue:x.form.cashier_open,"onUpdate:modelValue":l[1]||(l[1]=e=>x.form.cashier_open=e),label:"0"},{default:d((()=>[u(c(s.$t("关闭")),1)])),_:1},8,["modelValue"])])])),_:1},8,["label"]),1==x.form.cashier_open?(n(),h(L,{key:0,label:s.$t("选择打印机"),class:"cashier-item"},{default:d((()=>[m(q,{modelValue:x.form.cashier_printer_id,"onUpdate:modelValue":l[2]||(l[2]=e=>x.form.cashier_printer_id=e),placeholder:s.$t("请选择")},{default:d((()=>[m(S,{label:s.$t("收银打印机 自带"),value:"0"},{default:d((()=>[_("span",v,c(s.$t("收银打印机")),1),_("span",y,c(s.$t("自带")),1)])),_:1},8,["label"]),(n(!0),p(f,null,j(x.printerList,((e,r)=>(n(),h(S,{key:r,label:e.printer_name,value:e.printer_id+""},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"])):b("",!0),1==x.form.cashier_open?(n(),p("div",$,c(s.$t("交班单、营业数据、预结账单、结账单")),1)):b("",!0),_("div",k,[m(z,{onClick:w.getData,loading:x.loading},{default:d((()=>[u(c(s.$t("重置")),1)])),_:1},8,["onClick","loading"]),m(z,{type:"primary",onClick:w.onSubmit,loading:x.loading},{default:d((()=>[u(c(s.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}],["__scopeId","data-v-685573bb"]]);export{V as default};
