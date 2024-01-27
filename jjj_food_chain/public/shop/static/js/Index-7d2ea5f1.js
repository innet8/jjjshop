import{d as e,E as t,i as a,m as s,n as r,A as i,v as o}from"./element-plus-b01b3a31.js";import{G as p}from"./group-47f66d40.js";import{_ as l}from"./_plugin-vue_export-helper-1b428a4d.js";import{ap as u,o as n,c as d,a as g,$ as m,T as c,S as h,W as j,P as _,X as b,Y as w}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-98f906e9.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const y={class:"common-level-rail"},C={class:"table-wrap"},f=["title"],v={key:0,class:"green"},k={key:1,class:"gray"},z={key:0,class:"green"},D={key:1,class:"gray"},S={class:"pagination"};const x=l({components:{},data:()=>({categoryData:[],tableData:[],open_add:!1,open_edit:!1,userModel:{},commentData:[],loading:!0,pageSize:20,totalDataNumber:0,curPage:1}),created(){this.getTableList()},methods:{getTableList(){let e=this,t={};t.page=e.curPage,t.list_rows=e.pageSize,p.grouplist(t,!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((t=>{e.loading=!1}))},addGroup(){this.$router.push({path:"/plus/group/group/add"})},editGroup(e){let t=e.group_id;this.$router.push({path:"/plus/group/group/edit",query:{group_id:t}})},handleCurrentChange(e){let t=this;t.curPage=e,t.loading=!0,t.getTableList()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getTableList()},deleteGroup(a){let s=this;e.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{s.loading=!0,p.deleteGroup({group_id:a.group_id},!0).then((e=>{t({message:e.msg,type:"success"}),s.loading=!1,s.getTableList()})).catch((e=>{}))})).catch((()=>{}))}}},[["render",function(e,t,p,l,x,G){const T=a,P=s,L=r,B=i,N=u("auth"),$=o;return n(),d("div",null,[g("div",y,[m((n(),c(T,{size:"small",type:"primary",icon:"Plus",onClick:G.addGroup},{default:h((()=>[j("添加团购")])),_:1},8,["onClick"])),[[N,"/plus/group/group/add"]])]),g("div",C,[m((n(),c(L,{data:x.tableData,style:{width:"100%"}},{default:h((()=>[_(P,{prop:"group_id",label:"ID",width:"60"}),_(P,{prop:"group_name",label:"团购名称"},{default:h((e=>[g("div",{class:"text-ellipsis",title:e.row.group_name},b(e.row.group_name),9,f)])),_:1}),_(P,{prop:"group_price",label:"销售价格",width:"100"}),_(P,{prop:"sales_initial",label:"虚拟销量",width:"100"}),_(P,{prop:"sales_actual",label:"实际销量",width:"100"}),_(P,{prop:"group_sort",label:"资讯排序",width:"100"}),_(P,{prop:"group_status",label:"状态",width:"100"},{default:h((e=>[1==e.row.group_status?(n(),d("span",v,"显示")):w("",!0),0==e.row.group_status?(n(),d("span",k,"隐藏")):w("",!0)])),_:1}),_(P,{prop:"suit_type",label:"使用门店",width:"100"},{default:h((e=>[10==e.row.suit_type?(n(),d("span",z,"全部")):w("",!0),20==e.row.suit_type?(n(),d("span",D,"部分")):w("",!0)])),_:1}),_(P,{prop:"create_time",label:"添加时间",width:"140"}),_(P,{prop:"update_time",label:"更新时间",width:"140"}),_(P,{prop:"name",label:"操作",width:"120"},{default:h((e=>[m((n(),c(T,{onClick:t=>G.editGroup(e.row),type:"primary",link:"",size:"small"},{default:h((()=>[j("编辑")])),_:2},1032,["onClick"])),[[N,"/plus/group/group/edit"]]),m((n(),c(T,{onClick:t=>G.deleteGroup(e.row),type:"primary",link:"",size:"small"},{default:h((()=>[j("删除")])),_:2},1032,["onClick"])),[[N,"/plus/group/group/delete"]])])),_:1})])),_:1},8,["data"])),[[$,x.loading]]),g("div",S,[_(B,{onSizeChange:G.handleSizeChange,onCurrentChange:G.handleCurrentChange,background:"","current-page":x.curPage,"page-size":x.pageSize,layout:"total, prev, pager, next, jumper",total:x.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}]]);export{x as default};
