import{E as e,d as t,e as a,f as o,g as l,h as s,m as i,C as r,n as d,v as p}from"./element-plus-b30a858e.js";import{P as n}from"./product-02487454.js";import m from"./Add-fc3fe9fa.js";import c from"./Edit-2835240c.js";import{_ as u}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as g,ap as h,o as j,c as _,a as y,P as f,S as b,W as C,X as k,$ as v,T as D,Y as $}from"./@vue-e5cdee21.js";import"./@vueuse-f6c48e1e.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-f5b82f61.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-3c897039.js";import"./vue-router-2729bdc9.js";import"./pinia-805bca39.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-f67db3fa.js";import"./vue-i18n-2607567b.js";import"./@intlify-f009848f.js";import"./Upload-cb1236eb.js";import"./file-40cfc32c.js";import"./vue-cropperjs-a8153a2d.js";import"./vue-5933b83d.js";import"./cropperjs-81999277.js";const w={class:"product"},z={class:"common-seach-wrap"},x={class:"product-content"},F={class:"table-wrap"},S={key:0},V={key:1};const A=u({components:{Add:m,Edit:c},data:()=>({loading:!0,activeName:"first",tableData:[],open_add:!1,open_edit:!1,categoryModel:{catList:[],model:{}},searchForm:{name:""}}),created(){this.getData()},methods:{onSubmit(){this.curPage=1,this.getData()},handleClick(){this.getData()},getData(){let e=this;e.loading=!0,n.storeCatList({},!0).then((t=>{e.loading=!1,e.tableData=t.data.list,e.categoryModel.catList=e.tableData})).catch((t=>{e.loading=!1}))},addClick(){this.open_add=!0},editClick(e){this.categoryModel.model=e,this.open_edit=!0},statusSet(t,a){n.storeCatSet({category_id:a,status:t}).then((t=>{e({message:t.msg,type:"success"})}))},closeDialogFunc(e,t){"add"==t&&(this.open_add=e.openDialog,"success"==e.type&&this.getData()),"edit"==t&&(this.open_edit=e.openDialog,"success"==e.type&&this.getData())},deleteClick(a){let o=this;t.confirm($t("删除后不可恢复，确认删除吗?"),$t("提示"),{type:"warning"}).then((()=>{n.storeCatDel({category_id:a.category_id}).then((t=>{e({message:$t("删除成功"),type:"success"}),o.getData()}))}))}}},[["render",function(e,t,n,m,c,u){const A=a,E=o,M=l,P=s,U=i,L=r,W=d,q=g("Add"),B=g("Edit"),G=h("auth"),H=p;return j(),_("div",w,[y("div",z,[f(P,{size:"small",inline:!0,model:c.searchForm,class:"demo-form-inline"},{default:b((()=>[f(E,{label:e.$t("分类名称")},{default:b((()=>[f(A,{size:"small",modelValue:c.searchForm.name,"onUpdate:modelValue":t[0]||(t[0]=e=>c.searchForm.name=e),placeholder:e.$t("请输入分类名称")},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),f(E,null,{default:b((()=>[f(M,{size:"small",type:"primary",icon:"Search",onClick:u.onSubmit},{default:b((()=>[C(k(e.$t("查询")),1)])),_:1},8,["onClick"])])),_:1}),f(E,null,{default:b((()=>[v((j(),D(M,{size:"small",type:"primary",onClick:u.addClick,icon:"Plus"},{default:b((()=>[C(k(e.$t("添加分类")),1)])),_:1},8,["onClick"])),[[G,"/product/store/category/Add"]])])),_:1})])),_:1},8,["model"])]),y("div",x,[y("div",F,[v((j(),D(W,{size:"small",data:c.tableData,"row-key":"category_id","default-expand-all":"","tree-props":{children:"child"},style:{width:"100%"}},{default:b((()=>[f(U,{prop:"name_text",label:e.$t("分类名称")},null,8,["label"]),f(U,{prop:"name_text",label:e.$t("分类级别")},{default:b((t=>[0==t.row.parent_id?(j(),_("p",S,k(e.$t("一级分类")),1)):(j(),_("p",V,k(e.$t("二级分类")),1))])),_:1},8,["label"]),f(U,{prop:"sort",label:e.$t("分类排序")},null,8,["label"]),f(U,{prop:"sort",label:e.$t("状态")},{default:b((e=>[f(L,{modelValue:e.row.status,"onUpdate:modelValue":t=>e.row.status=t,"active-value":1,"inactive-value":0,onChange:t=>u.statusSet(t,e.row.category_id)},null,8,["modelValue","onUpdate:modelValue","onChange"])])),_:1},8,["label"]),f(U,{prop:"create_time",label:e.$t("添加时间")},null,8,["label"]),f(U,{fixed:"right",label:e.$t("操作"),width:"120"},{default:b((t=>[v((j(),D(M,{onClick:e=>u.editClick(t.row),type:"primary",link:"",size:"small"},{default:b((()=>[C(k(e.$t("编辑")),1)])),_:2},1032,["onClick"])),[[G,"/product/store/category/Edit"]]),v((j(),D(M,{onClick:e=>u.deleteClick(t.row),type:"primary",link:"",size:"small"},{default:b((()=>[C(k(e.$t("删除")),1)])),_:2},1032,["onClick"])),[[G,"/product/store/category/Delete"]])])),_:1},8,["label"])])),_:1},8,["data"])),[[H,c.loading]])])]),c.open_add?(j(),D(q,{key:0,open_add:c.open_add,addform:c.categoryModel,onCloseDialog:t[1]||(t[1]=e=>u.closeDialogFunc(e,"add"))},null,8,["open_add","addform"])):$("",!0),c.open_edit?(j(),D(B,{key:1,open_edit:c.open_edit,editform:c.categoryModel,onCloseDialog:t[2]||(t[2]=e=>u.closeDialogFunc(e,"edit"))},null,8,["open_edit","editform"])):$("",!0)])}]]);export{A as default};
