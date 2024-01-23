import{d as e,E as t,i,m as a,n as s,v as l}from"./element-plus-d03e850c.js";import{A as o}from"./index-36f14091.js";import{_ as r}from"./_plugin-vue_export-helper-1b428a4d.js";import{ap as n,o as d,c as p,a as m,$ as c,T as u,S as h,W as j,X as b,P as f}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const g={class:"user"},_={class:"common-level-rail"},k={class:"product-content"},v={class:"table-wrap"};const y=r({components:{},inject:["reload"],data:()=>({loading:!0,tableData:[],formInline:{user:"",region:""},open_add:!1,open_edit:!1,userModel:{}}),created(){this.getTableList()},methods:{getTableList(){let e=this;o.roleList({},!0).then((t=>{e.loading=!1,e.tableData=t.data.list})).catch((t=>{e.loading=!1}))},addClick(){this.$router.push("/auth/role/add")},editClick(e){this.$router.push({path:"/auth/role/edit",query:{role_id:e.role_id}})},refresh(){this.reload()},deleteClick(i){let a=this;e.confirm($t("此操作将永久删除该记录, 是否继续?"),$t("提示"),{confirmButtonText:$t("确定"),cancelButtonText:$t("取消"),type:"warning"}).then((()=>{a.loading=!0,o.roleDelete({role_id:i.role_id},!0).then((e=>{a.loading=!1,1==e.code?(t({message:"恭喜你，该角色删除成功",type:"success"}),a.getTableList()):a.loading=!1})).catch((e=>{a.loading=!1}))})).catch((()=>{}))}}},[["render",function(e,t,o,r,y,C){const $=i,w=a,x=s,T=n("auth"),z=l;return d(),p("div",g,[m("div",_,[c((d(),u($,{size:"small",type:"primary",icon:"Plus",onClick:C.addClick},{default:h((()=>[j(b(e.$t("添加角色")),1)])),_:1},8,["onClick"])),[[T,"/auth/role/add"]])]),m("div",k,[m("div",v,[c((d(),u(x,{size:"small",data:y.tableData,border:"",style:{width:"100%"}},{default:h((()=>[f(w,{prop:"role_id",label:"ID"}),f(w,{prop:"role_name_h1",label:e.$t("角色名称")},null,8,["label"]),f(w,{prop:"create_time",label:e.$t("添加时间")},null,8,["label"]),f(w,{fixed:"right",label:e.$t("操作"),width:"120"},{default:h((t=>[c((d(),u($,{onClick:e=>C.editClick(t.row),type:"primary",link:"",size:"small"},{default:h((()=>[j(b(e.$t("编辑")),1)])),_:2},1032,["onClick"])),[[T,"/auth/role/edit"]]),c((d(),u($,{onClick:e=>C.deleteClick(t.row),type:"primary",link:"",size:"small"},{default:h((()=>[j(b(e.$t("删除")),1)])),_:2},1032,["onClick"])),[[T,"/auth/role/delete"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[z,y.loading]])])])])}]]);export{y as default};
