import{m as e,i as t,n as a,A as r,v as i}from"./element-plus-d03e850c.js";import n from"./preview-181d19ab.js";import{_ as s}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as l,ap as p,o,c as m,a as d,$ as c,T as u,S as g,P as h,W as _,X as j,Y as b}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";const C={class:"user"},v={class:"product-content"},z={class:"table-wrap"},f={class:"pagination"};const w=s({components:{preview:n},data:()=>({loading:!1,tableData:[{printer_id:1,printer_name:$t("交班单"),create_time:""},{printer_id:2,printer_name:$t("结账单"),create_time:""},{printer_id:3,printer_name:$t("预结账单"),create_time:""},{printer_id:4,printer_name:$t("一菜一单"),create_time:""},{printer_id:5,printer_name:$t("营业数据"),create_time:""}],pageSize:20,totalDataNumber:0,curPage:1,open:!1,title:""}),methods:{previewClick(e){this.title=e.printer_name,this.open=!0},handleCurrentChange(e){let t=this;t.loading=!0,t.curPage=e,t.getData()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getData()},getData(){}}},[["render",function(n,s,w,$,D,k){const y=e,S=t,P=a,x=r,N=l("preview"),W=p("auth"),A=i;return o(),m("div",C,[d("div",v,[d("div",z,[c((o(),u(P,{size:"small",data:D.tableData,border:"",style:{width:"100%"}},{default:g((()=>[h(y,{prop:"printer_id",label:"ID"}),h(y,{prop:"printer_name",label:n.$t("打印名称")},null,8,["label"]),h(y,{prop:"create_time",label:n.$t("添加时间")},null,8,["label"]),h(y,{fixed:"right",label:n.$t("操作"),width:"120"},{default:g((e=>[c((o(),u(S,{onClick:t=>k.previewClick(e.row),type:"primary",link:"",size:"small"},{default:g((()=>[_(j(n.$t("预览")),1)])),_:2},1032,["onClick"])),[[W,"/setting/printer/edit"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[A,D.loading]])]),d("div",f,[h(x,{onSizeChange:k.handleSizeChange,onCurrentChange:k.handleCurrentChange,background:"","current-page":D.curPage,"page-size":D.pageSize,layout:"total, prev, pager, next, jumper",total:D.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),D.open?(o(),u(N,{key:0,open:D.open,title:D.title,onClose:s[0]||(s[0]=e=>{D.open=!1,1==e&&this.getData()})},null,8,["open","title"])):b("",!0)])}]]);export{w as default};