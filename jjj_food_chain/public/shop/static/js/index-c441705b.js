import{g as e,h as a,i as t,e as l,m as s,o as i,B as r,v as o}from"./element-plus-33e0d8cc.js";import{u as n,A as p}from"./index-188a77f0.js";import m from"./Detail-4f45233d.js";import{_ as u}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as d,o as h,c,a as g,P as b,S as j,W as f,X as C,$ as z,T as _}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const{renderMenus:v}=n(),w={class:"user"},D={class:"common-seach-wrap"},$={class:"product-content"},y={class:"table-wrap"},L={class:"pagination"};const S=u({components:{Detail:m},inject:["reload"],data:()=>({loading:!0,tableData:[],pageSize:20,totalDataNumber:0,curPage:1,searchForm:{search:""},open:!1,userModel:{},renderMenus:v,menusList:[]}),created(){this.getTableList(),this.menusList=[],this.renderMenus.map((e=>{e.childrenList.map((e=>{this.menusList.push(e)}))}))},methods:{searchSubmit(){this.curPage=1,this.getTableList()},handleCurrentChange(e){let a=this;a.curPage=e,a.loading=!0,a.getTableList()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getTableList()},getTableList(){let e=this,a={page:e.curPage,list_rows:e.pageSize,username:e.searchForm.search};p.optlog(a,!0).then((a=>{e.loading=!1,e.tableData=a.data.list.data,e.totalDataNumber=a.data.list.total})).catch((e=>{}))},gotoUrl(e){this.menusList.includes(e)?this.$router.push({path:e,query:{}}):this.$ElMessage({type:"info",message:$t("无权限")})},refresh(){this.reload()},openDetail(e){this.userModel=e,this.open=!0},closeDetail(){this.open=!1}}},[["render",function(n,p,m,u,v,S){const P=e,k=a,M=t,V=l,x=s,T=i,F=r,U=d("Detail"),N=o;return h(),c("div",w,[g("div",D,[b(V,{size:"small",inline:!0,model:v.searchForm,class:"demo-form-inline"},{default:j((()=>[b(k,null,{default:j((()=>[b(P,{size:"small",modelValue:v.searchForm.search,"onUpdate:modelValue":p[0]||(p[0]=e=>v.searchForm.search=e),placeholder:n.$t("用户名")},null,8,["modelValue","placeholder"])])),_:1}),b(k,null,{default:j((()=>[b(M,{size:"small",type:"primary",icon:"Search",onClick:S.searchSubmit},{default:j((()=>[f(C(n.$t("查询")),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])]),g("div",$,[g("div",y,[z((h(),_(T,{size:"small",data:v.tableData,border:"",style:{width:"100%"}},{default:j((()=>[b(x,{prop:"opt_log_id",label:"id",width:"70"}),b(x,{prop:"user_name",label:n.$t("用户名")},null,8,["label"]),b(x,{prop:"real_name",label:n.$t("姓名")},null,8,["label"]),b(x,{prop:"url",label:"URL",width:"300"},{default:j((e=>[b(P,{size:"small",placeholder:n.$t("请输入内容"),modelValue:e.row.url,"onUpdate:modelValue":a=>e.row.url=a},null,8,["placeholder","modelValue","onUpdate:modelValue"])])),_:1}),b(x,{prop:"ip",label:"IP",width:"120"}),b(x,{prop:"browser",label:n.$t("来源"),width:"120"},null,8,["label"]),b(x,{prop:"create_time",label:n.$t("操作时间")},null,8,["label"]),b(x,{fixed:"right",label:n.$t("操作"),width:"120"},{default:j((e=>[b(M,{onClick:a=>S.openDetail(e.row),type:"primary",link:"",size:"small"},{default:j((()=>[f(C(n.$t("详情")),1)])),_:2},1032,["onClick"])])),_:1},8,["label"])])),_:1},8,["data"])),[[N,v.loading]])]),g("div",L,[b(F,{onSizeChange:S.handleSizeChange,onCurrentChange:S.handleCurrentChange,background:"","current-page":v.curPage,"page-size":v.pageSize,layout:"total, prev, pager, next, jumper",total:v.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])]),b(U,{open:v.open,form:v.userModel,onClose:S.closeDetail},null,8,["open","form","onClose"])])}]]);export{S as default};
