import{E as e,q as r,r as t,h as i,i as s,e as o}from"./element-plus-b01b3a31.js";import{S as a}from"./setting-29912985.js";import{_ as l}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as p,c as n,P as m,S as d,T as _,a as c,X as u,Q as h,a8 as f,Y as j,W as b}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-fed3ed55.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const v={class:"product-add"},g={style:{float:"left"}},y={style:{float:"right",color:"#8492a6","font-size":"13px"}},k={key:1,class:"cashier-desc"},$={class:"common-button-wrapper"};const x=l({data:()=>({form:{buyer_open:"0",room_open:"0",seller_open:"0",buyer_printer_id:"",room_printer_id:"",seller_printer_id:"",cashier_open:"0",cashier_printer_id:"0"},checked:!1,printerList:[],loading:!1}),created(){this.getData()},methods:{getData(){let e=this;a.printingDetail({},!0).then((r=>{let t=r.data.vars.values;e.form.buyer_open=t.buyer_open,e.form.seller_open=t.seller_open,e.form.room_open=t.room_open,e.form.cashier_open=t.cashier_open,e.form.buyer_printer_id=""+t.buyer_printer_id,e.form.room_printer_id=""+t.room_printer_id,e.form.seller_printer_id=""+t.seller_printer_id,e.form.cashier_printer_id=""+t.cashier_printer_id,e.printerList=r.data.vars.printerList,null!=t.order_status&&20==t.order_status[0]&&(e.checked=!0)})).catch((e=>{}))},onSubmit(){let r=this,t=this.form;r.loading=!0,a.editPrinting(t,!0).then((t=>{r.loading=!1,e({message:$t("恭喜你，打印设置成功"),type:"success"})})).catch((e=>{r.loading=!1}))},handleCheckedCitiesChange(e){let r=this;e?r.form.order_status[0]=20:r.form.order_status=[]}}},[["render",function(e,a,l,x,C,w){const L=r,S=t,z=i,D=s,V=o;return p(),n("div",v,[m(V,{size:"small",ref:"form",model:C.form,"label-position":"top","label-width":"200px"},{default:d((()=>[1==C.form.cashier_open?(p(),_(z,{key:0,label:e.$t("默认语言"),class:"cashier-item"},{default:d((()=>[m(S,{modelValue:C.form.cashier_printer_id,"onUpdate:modelValue":a[0]||(a[0]=e=>C.form.cashier_printer_id=e),placeholder:e.$t("请选择")},{default:d((()=>[m(L,{label:e.$t("收银打印机 自带"),value:"0"},{default:d((()=>[c("span",g,u(e.$t("收银打印机")),1),c("span",y,u(e.$t("自带")),1)])),_:1},8,["label"]),(p(!0),n(h,null,f(C.printerList,((e,r)=>(p(),_(L,{key:r,label:e.printer_name,value:e.printer_id+""},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"])):j("",!0),1==C.form.cashier_open?(p(),n("div",k,u(e.$t("小票显示的语言将根据选择的语言打印")),1)):j("",!0),c("div",$,[m(D,{type:"primary",onClick:w.onSubmit,loading:C.loading},{default:d((()=>[b(u(e.$t("提交")),1)])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}],["__scopeId","data-v-18baeaa6"]]);export{x as default};
