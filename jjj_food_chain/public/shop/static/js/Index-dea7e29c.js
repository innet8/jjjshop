import{d as e,i as t,m as a,n as i,A as s,v as l}from"./element-plus-b01b3a31.js";import{A as r}from"./article-6c8e5f56.js";import{_ as o}from"./_plugin-vue_export-helper-1b428a4d.js";import{ap as p,o as n,c,a as d,P as m,S as u,W as h,$ as g,T as _,X as j,Y as b}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-83a39651.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const y={class:"common-level-rail"},w={class:"table-wrap"},C={width:"30",height:"30"},f=["title"],v={key:0,class:"green"},z={key:1,class:"gray"},k={class:"pagination"};const T=o({components:{},data:()=>({categoryData:[],tableData:[],open_add:!1,open_edit:!1,userModel:{},commentData:[],loading:!0,pageSize:20,totalDataNumber:0,curPage:1}),created(){this.getTableList()},methods:{getTableList(){let e=this,t={};t.page=e.curPage,t.list_rows=e.pageSize,r.articlelist(t,!0).then((t=>{e.loading=!1,e.tableData=t.data.list.data,e.totalDataNumber=t.data.list.total})).catch((t=>{e.loading=!1}))},addArticle(){this.$router.push({path:"/plus/article/article/Add"})},editArticle(e){let t=e.article_id;this.$router.push({path:"/plus/article/article/Edit",query:{article_id:t}})},handleCurrentChange(e){let t=this;t.curPage=e,t.loading=!0,t.getTableList()},handleSizeChange(e){this.curPage=1,this.pageSize=e,this.getTableList()},deleteArticle(t){let a=this;e.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{a.loading=!0,r.deleteArticle({article_id:t.article_id},!0).then((e=>{this.$ElMessage({message:e.msg,type:"success"}),a.loading=!1,a.getTableList()})).catch((e=>{}))})).catch((()=>{}))},deleteCategory(t){let a=this;e.confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{r.deleteCategory({category_id:t.category_id},!0).then((e=>{this.$ElMessage({message:e.msg,type:"success"}),a.getTableList()})).catch((e=>{}))})).catch((()=>{this.$ElMessage({type:"info",message:"已取消删除"})}))},handleClick(e,t){},addCategory(){this.open_add=!0},editCategory(e){this.userModel=e,this.open_edit=!0},closeDialogFunc(e,t){"add"==t&&(this.open_add=e.openDialog,"success"==e.type&&this.getTableList()),"edit"==t&&(this.open_edit=e.openDialog,"success"==e.type&&this.getTableList())}}},[["render",function(e,r,o,T,D,A){const x=t,S=a,L=i,P=s,$=p("img-url"),B=l;return n(),c("div",null,[d("div",y,[m(x,{size:"small",type:"primary",icon:"Plus",onClick:A.addArticle},{default:u((()=>[h("添加资讯")])),_:1},8,["onClick"])]),d("div",w,[g((n(),_(L,{data:D.tableData,style:{width:"100%"}},{default:u((()=>[m(S,{prop:"article_id",label:"资讯ID",width:"60"}),m(S,{prop:"address",label:"封面",width:"50"},{default:u((e=>[g(d("img",C,null,512),[[$,e.row.image.file_path]])])),_:1}),m(S,{prop:"article_title",label:"资讯标题"},{default:u((e=>[d("div",{class:"text-ellipsis",title:e.row.article_title},j(e.row.article_title),9,f)])),_:1}),m(S,{prop:"category.name",label:"资讯分类",width:"120"}),m(S,{prop:"virtual_views",label:"虚拟阅读量",width:"100"}),m(S,{prop:"actual_views",label:"实际阅读量",width:"100"}),m(S,{prop:"article_sort",label:"资讯排序",width:"100"}),m(S,{prop:"article_status",label:"状态",width:"100"},{default:u((e=>[1==e.row.article_status?(n(),c("span",v,"显示")):b("",!0),0==e.row.article_status?(n(),c("span",z,"隐藏")):b("",!0)])),_:1}),m(S,{prop:"create_time",label:"添加时间",width:"140"}),m(S,{prop:"update_time",label:"更新时间",width:"140"}),m(S,{prop:"name",label:"操作",width:"120"},{default:u((e=>[m(x,{onClick:t=>A.editArticle(e.row),type:"primary",link:"",size:"small"},{default:u((()=>[h("编辑")])),_:2},1032,["onClick"]),m(x,{onClick:t=>A.deleteArticle(e.row),type:"primary",link:"",size:"small"},{default:u((()=>[h("删除")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])),[[B,D.loading]]),d("div",k,[m(P,{onSizeChange:A.handleSizeChange,onCurrentChange:A.handleCurrentChange,background:"","current-page":D.curPage,"page-size":D.pageSize,layout:"total, prev, pager, next, jumper",total:D.totalDataNumber},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}]]);export{T as default};
