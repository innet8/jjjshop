import{m as e,g as t,n as a,A as r,v as i}from"./element-plus-b30a858e.js";import n from"./preview-90ef76fb.js";import{_ as s}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as l,ap as p,o,c as m,a as d,$ as u,T as c,S as g,P as h,W as _,X as j,Y as b}from"./@vue-e5cdee21.js";import"./@vueuse-f6c48e1e.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-f5b82f61.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";const v={class:"user"},C={class:"product-content"},w={class:"table-wrap"},z={class:"pagination"};const f=s({components:{preview:n},data:()=>({loading:!1,tableData:[{printer_id:1,printer_name:$t("交班单"),create_time:"2023-12-29 15:26:26"},{printer_id:2,printer_name:$t("结账单"),create_time:"2023-12-29 15:26:26"},{printer_id:3,printer_name:$t("预结账单"),create_time:"2023-12-29 15:26:26"},{printer_id:4,printer_name:$t("一菜一单"),create_time:"2023-12-29 15:26:26"},{printer_id:5,printer_name:$t("营业数据"),create_time:"2023-12-29 15:26:26"}],pageSize:20,totalDataNumber:0,curPage:1,open:!1,title:""}),methods:{previewClick(e){this.title=e.printer_name,this.open=!0},handleCurrentChange(e){let t=this;t.loading=!0,t.curPage=e,t.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},getData(){}}},[["render",function(n,s,f,$,D,k){const y=e,S=t,P=a,x=r,N=l("preview"),W=p("auth"),A=i;return o(),m("div",v,[d("div",C,[d("div",w,[u((o(),c(P,{size:"small",data:D.tableData,border:"",style:{width:"100%"}},{default:g((()=>[h(y,{prop:"printer_id",label:"ID"}),h(y,{prop:"printer_name",label:n.$t("打印名称")},null,8,["label"]),h(y,{prop:"create_time",label:n.$t("添加时间")},null,8,["label"]),h(y,{fixed:"right",label:n.$t("操作"),width:"120"},{default:g((e=>[u((o(),c(S,{onClick:t=>k.previewClick(e.row),type:"primary",link:"",size:"small"},{default:g((()=>[_(j(n.$t("预览")),1)])),_:2},1032,["onClick"])),[[W,"/supplier/printing/preview/preview"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[A,D.loading]])]),d("div",z,[h(x,{onSizeChange:k.handleSizeChange,onCurrentChange:k.handleCurrentChange,background:"","current-page":D.curPage,"page-size":D.pageSize,layout:"total, prev, pager, next, jumper",total:D.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),D.open?(o(),c(N,{key:0,open:D.open,title:D.title,onClose:s[0]||(s[0]=e=>{D.open=!1,1==e&&this.getData()})},null,8,["open","title"])):b("",!0)])}]]);export{f as default};