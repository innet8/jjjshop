import{n as e,h as t,d as o,i as l,S as a,m as s,o as r,w as n,x as u}from"./element-plus-bf694ad1.js";import{_ as d}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as m,c as i,O as p,R as c,S as f,V as _,W as h,X as y,a as k,P as g,a7 as b,af as j}from"./@vue-b57a05a6.js";import{l as w}from"./index-ddb8f3a5.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const $=d({inject:["form"]},[["render",function(o,l,a,s,r,n){const u=e,d=t;return m(),i("div",null,[p(d,{label:o.$t("商品价格："),width:"80",rules:[{required:!0,message:o.$t("请填写商品价格")}],prop:"model.sku[0].product_price"},{default:c((()=>[p(u,{min:0,max:1e6,controls:!1,modelValue:n.form.model.sku[0].product_price,"onUpdate:modelValue":l[0]||(l[0]=e=>n.form.model.sku[0].product_price=e),placeholder:o.$t("请填写商品价格"),class:"max-w460"},null,8,["modelValue","placeholder"])])),_:1},8,["label","rules"]),p(d,{label:o.$t("库存数量："),rules:[{required:!0,message:o.$t("请填写库存数量")}],prop:"model.sku[0].stock_num"},{default:c((()=>[p(u,{min:0,max:999,controls:!1,placeholder:o.$t("请填写库存数量"),modelValue:n.form.model.sku[0].stock_num,"onUpdate:modelValue":l[1]||(l[1]=e=>n.form.model.sku[0].stock_num=e),class:"max-w460"},null,8,["placeholder","modelValue"])])),_:1},8,["label","rules"])])}],["__scopeId","data-v-4efb9e93"]]),v=JSON.stringify(w().languageData);const V=d({data:()=>({showAddGroupBtn:!0,showAddGroupForm:!1,addGroupFrom:{specName:"",specValue:""},groupLoading:!1}),inject:["form"],created(){},methods:{onToggleAddGroupForm:function(){let e=this;Array.isArray(e.form.model.sku)||(e.form.model.sku=[]),e.form.model.sku.push({spec_name:JSON.parse(v),product_price:"",bag_price:"",stock_num:"",cost_price:0,is_full:0})},onDeleteGroup:function(e){var t=this;o.confirm("删除后不可恢复，确认删除吗?","提示",{type:"warning"}).then((()=>{t.form.model.spec_many.spec_attr.splice(e,1),t.buildSkulist()}))},onDeleteValue:function(e,t){let l=this;l.form.isSpecLocked?this.$ElMessage({message:"本商品正在参加活动，不能删除规格！",type:"warning"}):o.confirm("删除后不可恢复，确认删除吗?","提示",{type:"warning"}).then((()=>{l.form.model.spec_many.spec_attr[e].spec_items.splice(t,1),l.buildSkulist()}))}}},[["render",function(e,t,o,a,s,r){const n=l;return r.form.isSpecLocked?y("",!0):(m(),f(n,{key:0,size:"small",type:"primary",class:"el-icon-circle-plus",onClick:r.onToggleAddGroupForm},{default:c((()=>[_(h(e.$t("添加规格"))+"+",1)])),_:1},8,["onClick"]))}],["__scopeId","data-v-ea6ec527"]]),S=w().languageList,x={class:"mt16"},O={class:"ww100"},L={label:"",class:"spec-name",style:{"margin-bottom":"0"}};const C=d({components:{Type:V,Table:d({components:{},data(){let e={};return S.forEach((t=>{e[t.key]=[]})),{languageList:S,restaurants:[],restaurantsObj:e,batchData:{product_price:"",line_price:"",stock_num:"",product_weight:""},isupload:!1,spec_index:-1}},inject:["form"],watch:{form:{handler(e){let t={};S.forEach((e=>{t[e.key]=[]})),this.restaurantsObj=t,e.spec.map(((e,t)=>{let o=JSON.parse(e.spec_name);S.forEach((e=>{o[e.key]&&this.restaurantsObj[e.key].push({value:o[e.key],index:t})}))}))},deep:!0,immediate:!0}},mounted(){},methods:{deleteAttr(e){this.form.model.sku.length>1&&this.form.model.sku.splice(e,1)},querySearch(e,t,o){let l=[];l=this.restaurantsObj[o],t(e?l.filter(this.createFilter(e,o)):l)},createFilter(e,t){return this.restaurantsObj[t],t=>0===t.value.toLowerCase().indexOf(e.toLowerCase())},selectChange(e,t){S.forEach((o=>{this.form.model.sku[t].spec_name[o.key]=this.restaurantsObj[o.key][e.index].value}))}}},[["render",function(o,n,u,d,j,w){const $=a,v=t,V=s,S=e,C=l,U=r;return m(),i("div",x,[w.form.model.sku.length>0?(m(),f(v,{key:0,label:o.$t("规格明细：")},{default:c((()=>[k("div",O,[p(U,{size:"",data:w.form.model.sku,border:"",style:{width:"100%","margin-top":"20px"}},{default:c((()=>[p(V,{label:o.$t("规格名称"),width:"400"},{default:c((e=>[k("div",L,[(m(!0),i(g,null,b(j.languageList,((t,l)=>(m(),f(v,{key:l,prop:"scope.row.spec_name[".concat(t.key,"]"),rules:[{validator:()=>!!e.row.spec_name[t.key],message:o.$t("请输入规格名称")}]},{default:c((()=>[p($,{size:"small",onSelect:t=>w.selectChange(t,e.$index),"fetch-suggestions":(e,o)=>w.querySearch(e,o,t.key),modelValue:e.row.spec_name[t.key],"onUpdate:modelValue":o=>e.row.spec_name[t.key]=o,placeholder:o.$t("请输入")+"(".concat(t.value,")")},null,8,["onSelect","fetch-suggestions","modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["prop","rules"])))),128))])])),_:1},8,["label"]),p(V,{label:o.$t("价格")},{default:c((e=>[p(v,{label:"",style:{"margin-bottom":"0"},prop:"scope.row.product_price",rules:[{validator:()=>"number"==typeof e.row.product_price&&e.row.product_price>=0,message:o.$t("请输入价格")}]},{default:c((()=>[p(S,{type:"number",placeholder:o.$t("请输入价格"),size:"small",min:0,max:1e6,controls:!1,modelValue:e.row.product_price,"onUpdate:modelValue":t=>e.row.product_price=t},null,8,["placeholder","modelValue","onUpdate:modelValue"])])),_:2},1032,["prop","rules"])])),_:1},8,["label"]),p(V,{label:o.$t("库存")},{default:c((e=>[p(v,{label:"",style:{"margin-bottom":"0"},prop:"scope.row.stock_num",rules:[{validator:()=>"number"==typeof e.row.stock_num&&e.row.stock_num>=0,message:o.$t("请输入库存")}]},{default:c((()=>[p(S,{type:"number",placeholder:o.$t("请输入库存"),size:"small",min:0,max:999,controls:!1,modelValue:e.row.stock_num,"onUpdate:modelValue":t=>e.row.stock_num=t},null,8,["placeholder","modelValue","onUpdate:modelValue"])])),_:2},1032,["prop","rules"])])),_:1},8,["label"]),p(V,{label:""},{default:c((e=>[p(v,{label:"",style:{"margin-bottom":"0"}},{default:c((()=>[p(C,{type:"primary",link:"",onClick:t=>w.deleteAttr(e.$index)},{default:c((()=>[_(h(o.$t("删除")),1)])),_:2},1032,["onClick"])])),_:2},1024)])),_:1})])),_:1},8,["data"])])])),_:1},8,["label"])):y("",!0)])}],["__scopeId","data-v-7968d69a"]])}},[["render",function(e,t,o,l,a,s){const r=j("Type"),n=j("Table");return m(),i("div",null,[p(r),p(n)])}]]),U=w().languageList,q={class:"common-form mt50"},E={key:0,class:"red"};const A=d({components:{Single:$,Many:C},data(){let e={};return U.forEach((t=>{e[t.key]=[]})),{restaurants:[],restaurantsObj:e,languageList:U}},inject:["form"],watch:{form:{handler(e){let t={};U.forEach((e=>{t[e.key]=[]})),this.restaurantsObj=t,e.unit.map(((e,t)=>{let o=JSON.parse(e.unit_name);U.forEach((e=>{o[e.key]&&this.restaurantsObj[e.key].push({value:o[e.key],index:t})}))}))},deep:!0,immediate:!0}},methods:{changeSpec(e){10==e?this.form.sku={product_price:"",stock_num:"",bag_price:0,cost_price:0,is_full:0}:20==e&&(this.form.sku=[])},querySearch(e,t,o){let l=[];l=this.restaurantsObj[o],t(e?l.filter(this.createFilter(e,o)):l)},createFilter(e,t){return this.restaurantsObj[t],t=>0===t.value.toLowerCase().indexOf(e.toLowerCase())},selectChange(e){U.forEach((t=>{this.form.model.product_unit[t.key]=this.restaurantsObj[t.key][e.index].value}))}}},[["render",function(e,o,l,s,r,d){const w=n,$=u,v=t,V=a,S=j("Single"),x=j("Many");return m(),i("div",null,[k("div",q,h(e.$t("规格/库存")),1),p(v,{label:e.$t("库存计算方式：")},{default:c((()=>[p($,{modelValue:d.form.model.deduct_stock_type,"onUpdate:modelValue":o[0]||(o[0]=e=>d.form.model.deduct_stock_type=e)},{default:c((()=>[p(w,{label:10},{default:c((()=>[_(h(e.$t("下单减库存")),1)])),_:1}),p(w,{label:20},{default:c((()=>[_(h(e.$t("付款减库存")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),(m(!0),i(g,null,b(r.languageList,((t,l)=>(m(),f(v,{key:l,label:0==l?e.$t("商品单位："):"",rules:[{required:!0,message:e.$t("请填写商品单位")}],prop:"model.product_unit.".concat(t.key)},{default:c((()=>[p(V,{"fetch-suggestions":(e,o)=>d.querySearch(e,o,t.key),onSelect:o[1]||(o[1]=e=>d.selectChange(e)),class:"inline-input",modelValue:d.form.model.product_unit[t.key],"onUpdate:modelValue":e=>d.form.model.product_unit[t.key]=e,placeholder:e.$t("请输入")+"(".concat(t.value,")")},null,8,["fetch-suggestions","modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["label","rules","prop"])))),128)),p(v,{label:e.$t("商品规格：")},{default:c((()=>[p($,{modelValue:d.form.model.spec_type,"onUpdate:modelValue":o[2]||(o[2]=e=>d.form.model.spec_type=e),onChange:d.changeSpec},{default:c((()=>[!d.form.isSpecLocked||d.form.isSpecLocked&&10==d.form.model.spec_type?(m(),f(w,{key:0,label:10},{default:c((()=>[_(h(e.$t("单规格")),1)])),_:1})):y("",!0),!d.form.isSpecLocked||d.form.isSpecLocked&&20==d.form.model.spec_type?(m(),f(w,{key:1,label:20},{default:c((()=>[_(h(e.$t("多规格")),1)])),_:1})):y("",!0)])),_:1},8,["modelValue","onChange"]),d.form.isSpecLocked?(m(),i("div",E,h(e.$t("此商品正在参加活动，不能修改规格")),1)):y("",!0)])),_:1},8,["label"]),10==d.form.model.spec_type?(m(),f(S,{key:0})):y("",!0),20==d.form.model.spec_type?(m(),f(x,{key:1})):y("",!0)])}],["__scopeId","data-v-fbedb0f2"]]);export{A as default};