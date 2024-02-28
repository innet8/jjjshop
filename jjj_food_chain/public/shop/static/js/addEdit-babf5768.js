import{g as e,h as t,n as l,w as i,x as s,i as o,j as a,R as r,e as d,u as m}from"./element-plus-bf694ad1.js";import{P as u}from"./product-f736638e.js";import{l as p}from"./index-261cea28.js";import c from"./productList-6476e534.js";import{_ as n}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as _,o as f,S as h,R as b,a as g,O as y,V as $,W as V,c as j,P as v,a7 as x,X as k}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const C=JSON.stringify(p().languageData),D=p().languageList,O={components:{productList:c},data:()=>({languageList:D,dialogVisible:!1,loading:!1,open_product:!1,form:{name:JSON.parse(C),sort:null,price:null,is_time_limit:1,time_limit:null,status:1,is_comb:1,buy_limit_status:1,buy_limit_products:[],product_ids:""},formRules:{price:[{required:!0,message:$t("请输入价格"),trigger:"blur"}],sort:[{required:!0,message:$t("排序不能为空")},{type:"number",message:$t("排序必须为数字")}],time:[{required:!0,message:$t("请输入用餐时间"),trigger:"blur"}]},select_list:[],limit_list:[],multiple_selection:[],limit_ids:"",selectType:""}),props:{open_dialog:{type:Boolean,default:!1},title:{default:""},editData:{default:""}},created(){this.dialogVisible=this.open_dialog,this.editData&&(this.form=JSON.parse(JSON.stringify(this.editData)),this.form.name=JSON.parse(this.form.name),this.form.time_limit>0?this.form.is_time_limit=1:this.form.is_time_limit=0,this.select_list=this.form.buffetProducts,this.form.product_ids=[],this.select_list.map(((e,t)=>{this.select_list[t].product_name_text=e.product.product_name_text,this.form.product_ids.push(e.product_id)})),this.limit_ids=this.form.product_ids.join(","),this.limit_list=this.form.buffetLimitProducts,this.form.buy_limit_products=[],this.limit_list.map((e=>{this.form.buy_limit_products.push({name:e.product.product_name_text,product_id:e.product_id,limit_num:e.limit_num})})))},methods:{submit(){let e=this;e.$refs.form.validate((t=>{if(t)if(this.editData){let t=JSON.parse(JSON.stringify(e.form));t.name=JSON.stringify(t.name),t.buffet_id=t.id,t.product_ids=t.product_ids.join(","),e.loading=!0,u.editBuffet(t,!0).then((t=>{e.loading=!1,this.$ElMessage({message:$t("添加成功"),type:"success"}),e.dialogFormVisible(!0)})).catch((t=>{e.loading=!1}))}else{let t=JSON.parse(JSON.stringify(e.form));t.name=JSON.stringify(t.name),t.product_ids=t.product_ids.join(","),e.loading=!0,u.addBuffet(t,!0).then((t=>{e.loading=!1,this.$ElMessage({message:$t("添加成功"),type:"success"}),e.dialogFormVisible(!0)})).catch((t=>{e.loading=!1}))}}))},selectList(e){"select"==e&&(this.selectType=e,this.multiple_selection=this.select_list),"limit"==e&&(this.selectType=e,this.limit_ids=this.form.product_ids.join(",")),this.open_product=!0},closeDialogFunc(e){if(this.open_product=e.openDialog,"select"==e.type){let t=new Map;[this.select_list,e.data].flat().forEach((e=>t.set(e.product_id,e))),this.select_list=Array.from(t.values()),this.form.product_ids=[],this.select_list.map((e=>{this.form.product_ids.push(e.product_id)})),this.$refs.form.validateField("product_ids"),this.limit_ids=this.form.product_ids.join(",")}if("limit"==e.type){let t=new Map;[this.limit_list,e.data].flat().forEach((e=>t.set(e.product_id,e))),this.limit_list=Array.from(t.values()),this.form.buy_limit_products=[],this.limit_list.map((e=>{this.form.buy_limit_products.push({name:e.product_name_text,product_id:e.product_id,limit_num:null})})),this.$refs.form.validateField("buy_limit_products")}},deleteOne(e){this.select_list.splice(e,1),this.form.product_ids=[],this.select_list.map((e=>{this.form.product_ids.push(e.product_id)})),this.limit_ids=this.form.product_ids.join(","),this.$refs.form.validateField("product_ids")},handleDelete(e){this.form.buy_limit_products.splice(e,1),this.limit_list.splice(e,1),this.$refs.form.validateField("buy_limit_products")},dialogFormVisible(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})}}},U={key:0,class:"select-list"},q={class:"select-button"},F={key:0,class:"limit-list"},J={class:"limit-product-list"},S={class:"limit-product-box"},N={class:"dialog-footer"};const L=n(O,[["render",function(u,p,c,n,C,D){const O=e,L=t,M=l,w=i,T=s,B=o,E=_("CircleCloseFilled"),P=a,R=r,z=_("Delete"),A=d,I=_("productList"),G=m;return f(),h(G,{title:c.title,modelValue:C.dialogVisible,"onUpdate:modelValue":p[10]||(p[10]=e=>C.dialogVisible=e),onClose:D.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:b((()=>[g("div",N,[y(B,{onClick:D.dialogFormVisible},{default:b((()=>[$(V(u.$t("取消")),1)])),_:1},8,["onClick"]),y(B,{type:"primary",onClick:D.submit,loading:C.loading},{default:b((()=>[$(V(u.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:b((()=>[y(A,{size:"small",model:C.form,"label-position":"top",rules:C.formRules,ref:"form"},{default:b((()=>[(f(!0),j(v,null,x(C.languageList,((e,t)=>(f(),h(L,{key:t,label:u.$t("自助餐名称")+"(".concat(e.value,")"),prop:"name.".concat([e.key]),rules:[{required:!0,message:u.$t("请输入自助餐名称")}]},{default:b((()=>[y(O,{type:"text",modelValue:C.form.name[e.key],"onUpdate:modelValue":t=>C.form.name[e.key]=t,placeholder:u.$t("请输入自助餐名称")},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","prop","rules"])))),128)),y(L,{label:u.$t("排序"),prop:"sort"},{default:b((()=>[y(M,{controls:!1,min:0,max:999,placeholder:u.$t("接近0，排序等级越高"),modelValue:C.form.sort,"onUpdate:modelValue":p[0]||(p[0]=e=>C.form.sort=e),modelModifiers:{number:!0}},null,8,["placeholder","modelValue"])])),_:1},8,["label"]),y(L,{label:u.$t("价格"),prop:"price"},{default:b((()=>[y(M,{controls:!1,min:0,max:1e6,placeholder:u.$t("请输入价格"),modelValue:C.form.price,"onUpdate:modelValue":p[1]||(p[1]=e=>C.form.price=e),modelModifiers:{number:!0}},null,8,["placeholder","modelValue"])])),_:1},8,["label"]),y(L,{label:u.$t("限制用餐时间"),prop:"is_time_limit",rules:[{required:!0,message:""}]},{default:b((()=>[y(T,{modelValue:C.form.is_time_limit,"onUpdate:modelValue":p[2]||(p[2]=e=>C.form.is_time_limit=e)},{default:b((()=>[y(w,{label:0},{default:b((()=>[$(V(u.$t("不限制")),1)])),_:1}),y(w,{label:1},{default:b((()=>[$(V(u.$t("限制")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),1==C.form.is_time_limit?(f(),h(L,{key:0,label:u.$t(""),class:"display-none",prop:"time_limit",rules:[{required:!0,message:u.$t("请输入用餐时间")}]},{default:b((()=>[y(M,{controls:!1,min:0,max:999,placeholder:u.$t("请输入用餐时间"),modelValue:C.form.time_limit,"onUpdate:modelValue":p[3]||(p[3]=e=>C.form.time_limit=e),modelModifiers:{number:!0}},null,8,["placeholder","modelValue"]),$(" "+V(u.$t("分")),1)])),_:1},8,["label","rules"])):k("",!0),y(L,{label:u.$t("状态"),prop:"status",rules:[{required:!0,message:""}]},{default:b((()=>[y(T,{modelValue:C.form.status,"onUpdate:modelValue":p[4]||(p[4]=e=>C.form.status=e)},{default:b((()=>[y(w,{label:1},{default:b((()=>[$(V(u.$t("开启")),1)])),_:1}),y(w,{label:0},{default:b((()=>[$(V(u.$t("关闭")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),y(L,{label:u.$t("组合"),prop:"is_comb",rules:[{required:!0,message:""}]},{default:b((()=>[y(T,{modelValue:C.form.is_comb,"onUpdate:modelValue":p[5]||(p[5]=e=>C.form.is_comb=e)},{default:b((()=>[y(w,{label:1},{default:b((()=>[$(V(u.$t("开启")),1)])),_:1}),y(w,{label:0},{default:b((()=>[$(V(u.$t("关闭")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),y(L,{label:u.$t("商品"),prop:"product_ids",rules:[{required:!0,validator:()=>C.form.product_ids.length>0,message:u.$t("请选中商品")}]},{default:b((()=>[y(B,{type:"primary",onClick:p[6]||(p[6]=e=>D.selectList("select"))},{default:b((()=>[$(V(u.$t("选中商品")),1)])),_:1}),C.select_list.length>0?(f(),j("div",U,[(f(!0),j(v,null,x(C.select_list,((e,t)=>(f(),h(R,{class:"box-item",effect:"dark",content:e.product_name_text,placement:"top"},{default:b((()=>[g("div",q,[g("p",null,V(e.product_name_text),1),y(P,{class:"select-icon",onClick:e=>D.deleteOne(t)},{default:b((()=>[y(E)])),_:2},1032,["onClick"])])])),_:2},1032,["content"])))),256))])):k("",!0)])),_:1},8,["label","rules"]),y(L,{label:u.$t("限购"),prop:"buy_limit_products",rules:[{required:!0,validator:()=>0!=C.form.buy_limit_products.length||1!=C.form.buy_limit_status,message:u.$t("请选中商品")}]},{default:b((()=>[y(T,{modelValue:C.form.buy_limit_status,"onUpdate:modelValue":p[7]||(p[7]=e=>C.form.buy_limit_status=e)},{default:b((()=>[y(w,{label:1},{default:b((()=>[$(V(u.$t("开启")),1)])),_:1}),y(w,{label:0},{default:b((()=>[$(V(u.$t("关闭")),1)])),_:1})])),_:1},8,["modelValue"]),1==C.form.buy_limit_status?(f(),j("div",F,[y(B,{type:"primary",onClick:p[8]||(p[8]=e=>D.selectList("limit")),disabled:!C.limit_ids},{default:b((()=>[$(V(u.$t("选中商品")),1)])),_:1},8,["disabled"]),(f(!0),j(v,null,x(C.form.buy_limit_products,((e,t)=>(f(),j("div",J,[g("div",S,[y(O,{type:"text",modelValue:e.name,"onUpdate:modelValue":t=>e.name=t,readonly:""},null,8,["modelValue","onUpdate:modelValue"]),y(L,{label:"",style:{"margin-top":"16px"},prop:"item.limit_num",rules:[{required:!0,validator:()=>!!e.limit_num,message:u.$t("请输入限购数量")}]},{default:b((()=>[y(M,{controls:!1,min:0,max:999,style:{width:"200px !important"},placeholder:u.$t("请输入限购数量"),modelValue:e.limit_num,"onUpdate:modelValue":t=>e.limit_num=t,modelModifiers:{number:!0}},null,8,["placeholder","modelValue","onUpdate:modelValue"])])),_:2},1032,["rules"]),y(P,{class:"delete-icon",onClick:e=>D.handleDelete(t)},{default:b((()=>[y(z)])),_:2},1032,["onClick"])])])))),256))])):k("",!0)])),_:1},8,["label","rules"])])),_:1},8,["model","rules"]),C.open_product?(f(),h(I,{key:0,open_product:C.open_product,limit_ids:C.limit_ids,selectType:C.selectType,onCloseDialogFunc:p[9]||(p[9]=e=>D.closeDialogFunc(e))},null,8,["open_product","limit_ids","selectType"])):k("",!0)])),_:1},8,["title","modelValue","onClose"])}],["__scopeId","data-v-99d87d36"]]);export{L as default};
