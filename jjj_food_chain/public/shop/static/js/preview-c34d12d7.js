import{i as e,u as t}from"./element-plus-c8084613.js";import{_ as l}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as a,S as s,R as n,a as i,O as m,V as o,W as b,c as $,X as d,P as r,a7 as p,L as h}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";const u={class:"box-border"},c={key:0},f={class:"dialog-footer"};const j=l({data:()=>({dialogVisible:!1,storeShow:!0,details:[],titleName:"",one:[[{name:$t("交班编号"),label:0x2cf12de2ca268e0},{name:$t("交班人"),label:$t("张三")},{name:$t("当班时间"),label:"2023/12/15 14:00:21 - 2023/12/15 14:00:21"}],[{name:$t("分类"),num:$t("数量"),label:$t("金额"),bold:!0}],[{name:$t("肉类"),num:68,label:"￥50.00"},{name:$t("蔬菜类"),num:50,label:"￥50.00"},{name:$t("饮品类"),num:55,label:"￥50.00"}],[{name:$t("销售笔数"),label:50},{name:$t("现金收入"),label:"￥50.00"},{name:$t("余额收入"),label:"￥50.00"},{name:$t("微信收入"),label:"￥50.00"},{name:$t("支付宝收入"),label:"￥50.00"},{name:$t("退款金额"),label:"￥50.00"}],[{name:$t("本班营业总额"),label:"￥50.00"},{name:$t("上一班遗留备用金"),label:"￥50.00"},{name:$t("本班取出现金"),label:"￥50.00"},{name:$t("本班遗留备用金"),label:"￥50.00"}]],two:[[{name:$t("订单号"),label:0x2cf12de2ca268e0},{name:$t("收银员"),label:$t("张三")},{name:$t("时间"),label:"2023/12/15 14:00:21 - 2023/12/15 14:00:21"}],[{name:$t("商品"),num:$t("数量"),label:$t("金额"),bold:!0}],[{name:$t("商品名称商品名称商品名称商品名称商品名称商品名称"),num:68,label:"￥50.00"},{name:$t("加珍珠"),num:50,label:"￥50.00"},{name:$t("商品名称商品名称商"),num:55,label:"￥50.00"}],[{name:$t("合计金额"),label:"￥410.00"},{name:$t("服务费"),label:"￥50.00"},{name:$t("消费税"),label:"￥50.00"},{name:$t("优惠折扣"),label:"￥50.00"},{name:$t("会员折扣"),label:"￥50.00"},{name:$t("应收金额"),label:"￥410.00",big:!0}],[{name:$t("支付方式"),label:$t("微信支付")},{name:$t("实付金额"),label:"￥410.00"}]],three:[[{name:$t("订单号"),label:0x2cf12de2ca268e0},{name:$t("收银员"),label:$t("张三")}],[{name:$t("商品"),num:$t("数量"),label:$t("金额"),bold:!0}],[{name:$t("商品名称商品名称商品名称商品名称商品名称商品名称"),num:68,label:"￥50.00"},{name:$t("加珍珠"),num:50,label:"￥50.00"},{name:$t("商品名称商品名称商"),num:55,label:"￥50.00"}],[{name:$t("合计金额"),label:"￥410.00"},{name:$t("服务费"),label:"￥50.00"},{name:$t("消费税"),label:"￥50.00"},{name:$t("优惠折扣"),label:"￥50.00"},{name:$t("会员折扣"),label:"￥50.00"},{name:$t("应收金额"),label:"￥410.00",big:!0}]],four:[[{name:$t("订单号"),label:0x2cf12de2ca268e0},{name:$t("时间"),label:"2023/12/15 14:00:21"}],[{name:$t("商品"),label:$t("数量"),bold:!0}],[{name:$t("商品名称商品名称商品名称商品名称商品名称商品名称"),label:6}]],five:[[{name:$t("时间"),label:"2023/12/15 14:00:21 - 2023/12/15 14:00:21"}],[{name:$t("分类"),num:$t("数量"),label:$t("金额"),bold:!0}],[{name:$t("肉类"),num:68,label:"￥50.00"},{name:$t("蔬菜类"),num:50,label:"￥50.00"},{name:$t("饮品类"),num:55,label:"￥50.00"}],[{name:$t("销售笔数"),label:50},{name:$t("现金收入"),label:"￥50.00"},{name:$t("余额收入"),label:"￥50.00"},{name:$t("微信收入"),label:"￥50.00"},{name:$t("支付宝收入"),label:"￥50.00"},{name:$t("退款金额"),label:"￥50.00"}]]}),props:["open","title"],created(){this.dialogVisible=this.open,this.title==$t("交班单")&&(this.details=this.one,this.titleName=this.title),this.title==$t("结账单")&&(this.details=this.two,this.titleName=$t("桌位: ")+"A01"),this.title==$t("预结账单")&&(this.details=this.three,this.titleName=$t("桌位: ")+"A01"),this.title==$t("一菜一单")&&(this.details=this.four,this.storeShow=!1,this.titleName=$t("桌位: ")+"A01"),this.title==$t("营业数据")&&(this.details=this.five,this.titleName=this.title)},methods:{handleClose(){this.$emit("close")}}},[["render",function(l,j,x,g,v,y){const w=e,V=t;return a(),s(V,{onClose:y.handleClose,width:"480",modelValue:v.dialogVisible,"onUpdate:modelValue":j[0]||(j[0]=e=>v.dialogVisible=e),"close-on-click-modal":!1,"close-on-press-escape":!1,title:x.title},{footer:n((()=>[i("span",f,[m(w,{onClick:y.handleClose},{default:n((()=>[o(b(l.$t("关闭")),1)])),_:1},8,["onClick"])])])),default:n((()=>[i("div",u,[v.storeShow?(a(),$("h2",c,b(l.$t("店铺名称")),1)):d("",!0),i("h3",null,b(v.titleName),1),(a(!0),$(r,null,p(v.details,((e,t)=>(a(),$("div",{class:h(["box-main",0==t?"box-main-border":""]),key:t},[(a(!0),$(r,null,p(e,((e,t)=>(a(),$("div",{class:"box-text-box",key:t},[i("div",{class:h(["text-box",[e.bold&&0==t?"font-bold":"",e.big?"font-big":""]])},b(e.name),3),i("div",{class:h(["text-box text-box-r",e.num?"flex-end":""])},[e.num?(a(),$("p",{key:0,class:h(["text-box-r-p1",[e.bold&&0==t?"font-bold":"",e.big?"font-big":""]])},b(e.num),3)):d("",!0),i("p",{class:h(["text-box-r-p2",[e.bold&&0==t?"font-bold":"",e.big?"font-big":""]])},b(e.label),3)],2)])))),128))],2)))),128))])])),_:1},8,["onClose","modelValue","title"])}],["__scopeId","data-v-6b62d48e"]]);export{j as default};