import{m as a,n as t}from"./element-plus-b01b3a31.js";import{_ as s}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as e,c as i,a as l,M as o,X as n,T as r,S as c,P as m}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";const d={class:"right-box d-s-s d-c"},p={class:"ww100 right-box-t"},h={class:"list ww100"},u={class:"product-name"},v={class:""},j={key:1,class:"tc pt30"};const k=s({data:()=>({activeName:"sale",listData:[]}),inject:["dataRank"],created(){this.listData=this.dataRank.salesNumRank},mounted(){},methods:{handleClick(a){"sale"==a?(this.listData=this.dataRank.salesNumRank,this.activeName=a):"view"==a&&(this.listData=this.dataRank.salesMoneyRank,this.activeName=a)}}},[["render",function(s,k,b,_,w,x){const y=a,f=t;return e(),i("div",d,[l("div",p,[l("div",{class:o("sale"==w.activeName?"active":""),onClick:k[0]||(k[0]=a=>x.handleClick("sale"))},n(s.$t("销量TOP10")),3),l("div",{class:o("view"==w.activeName?"active":""),onClick:k[1]||(k[1]=a=>x.handleClick("view"))},n(s.$t("销售额TOP10")),3)]),l("div",h,[w.listData.length>0?(e(),r(f,{key:0,data:w.listData,style:{width:"100%"},size:"small"},{default:c((()=>[m(y,{prop:"product_name_text",label:s.$t("商品名称")},{default:c((a=>[l("div",u,[l("span",{class:o(a.$index<=3?"key-box":"key-box2")},n(a.$index+1),3),l("span",v,n(a.row.product_name_text),1)])])),_:1},8,["label"]),m(y,{prop:"total_num",label:s.$t("销量")},null,8,["label"]),m(y,{prop:"total_price",label:s.$t("销售额")},null,8,["label"])])),_:1},8,["data"])):(e(),i("div",j,n(s.$t("暂无上榜记录")),1))])])}],["__scopeId","data-v-e51de755"]]);export{k as default};