import{g as e,h as l,w as t,p as a,q as o,e as r,i,u as d}from"./element-plus-c8084613.js";import{S as s}from"./supplier-b05deb11.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as m,S as u,R as n,a as _,O as f,V as c,W as h,c as b,P as g,a7 as y,X as V}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-1fcbfc88.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const j={class:"tips"},$={class:"dialog-footer"};const v=p({data:()=>({form:{name:"",is_open:1,printer_id:"",product_type:0,print_type:10,category_id:[],type:10,print_method:10,label_id:[]},loading:!1,dialogVisible:!1,type:[],typeTag:[],storeList:[],takeList:[],labelList:[],options:[],categoryIds:[]}),props:["open_add"],created(){this.dialogVisible=this.open_add,this.getData()},methods:{getData(){s.getPrinting({},!0).then((e=>{var l;this.storeList=e.data.storeList,this.takeList=e.data.takeList,this.type=e.data.printerList,this.typeTag=e.data.printerTagList,this.labelList=e.data.labelList,this.options=[],null==(l=this.storeList)||l.map((e=>{var l;if(0==e.parent_id){let t=[];null==(l=this.storeList)||l.map((l=>{e.category_id==l.parent_id&&t.push({value:l.category_id,label:l.name_text,children:[]})})),this.options.push({value:e.category_id,label:e.name_text,children:t})}}))})).catch((e=>{}))},onSubmit(){let e=this,l=e.form;20==!l.print_method&&(l.category_id=[]),e.$refs.form.validate((t=>{t&&(e.loading=!0,s.addPrinting(l,!0).then((l=>{e.loading=!1,this.$ElMessage({message:$t("添加成功"),type:"success"}),this.$emit("close",1)})).catch((l=>{e.loading=!1})))}))},handleClose(){this.$emit("close")}}},[["render",function(s,p,v,k,L,U){const q=e,x=l,C=t,w=a,S=o,T=r,z=i,P=d;return m(),u(P,{class:"product-add",onClose:U.handleClose,modelValue:L.dialogVisible,"onUpdate:modelValue":p[14]||(p[14]=e=>L.dialogVisible=e),"close-on-click-modal":!1,"close-on-press-escape":!1,title:s.$t("添加商品打印")},{footer:n((()=>[_("span",$,[f(z,{onClick:U.handleClose},{default:n((()=>[c(h(s.$t("取消")),1)])),_:1},8,["onClick"]),f(z,{type:"primary",onClick:U.onSubmit,loading:L.loading},{default:n((()=>[c(h(s.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:n((()=>[f(T,{size:"small",ref:"form",model:L.form,"label-position":"top"},{default:n((()=>[f(x,{label:s.$t("名称"),prop:"name",rules:[{required:!0,message:s.$t("请输入名称")}]},{default:n((()=>[f(q,{modelValue:L.form.name,"onUpdate:modelValue":p[0]||(p[0]=e=>L.form.name=e),placeholder:s.$t("请输入名称"),maxlength:50},null,8,["modelValue","placeholder"])])),_:1},8,["label","rules"]),f(x,{label:s.$t("是否开启"),prop:"is_open",rules:[{required:!0,message:""}]},{default:n((()=>[_("div",null,[f(C,{modelValue:L.form.is_open,"onUpdate:modelValue":p[1]||(p[1]=e=>L.form.is_open=e),label:1},{default:n((()=>[c(h(s.$t("开启")),1)])),_:1},8,["modelValue"]),f(C,{modelValue:L.form.is_open,"onUpdate:modelValue":p[2]||(p[2]=e=>L.form.is_open=e),label:0},{default:n((()=>[c(h(s.$t("关闭")),1)])),_:1},8,["modelValue"])])])),_:1},8,["label"]),f(x,{label:s.$t("打印模式"),prop:"print_type",rules:[{required:!0,message:""}]},{default:n((()=>[_("div",null,[f(C,{modelValue:L.form.print_type,"onUpdate:modelValue":p[3]||(p[3]=e=>L.form.print_type=e),label:10},{default:n((()=>[c(h(s.$t("付款打印")),1)])),_:1},8,["modelValue"]),f(C,{modelValue:L.form.print_type,"onUpdate:modelValue":p[4]||(p[4]=e=>L.form.print_type=e),label:30},{default:n((()=>[c(h(s.$t("送厨打印")),1)])),_:1},8,["modelValue"])])])),_:1},8,["label"]),f(x,{label:s.$t("打印方式"),prop:"print_method",rules:[{required:!0,message:""}]},{default:n((()=>[_("div",null,[f(C,{modelValue:L.form.print_method,"onUpdate:modelValue":p[5]||(p[5]=e=>L.form.print_method=e),label:10},{default:n((()=>[c(h(s.$t("整单打印")),1)])),_:1},8,["modelValue"]),f(C,{modelValue:L.form.print_method,"onUpdate:modelValue":p[6]||(p[6]=e=>L.form.print_method=e),label:20},{default:n((()=>[c(h(s.$t("按商品分类打印")),1)])),_:1},8,["modelValue"]),f(C,{modelValue:L.form.print_method,"onUpdate:modelValue":p[7]||(p[7]=e=>L.form.print_method=e),label:30},{default:n((()=>[c(h(s.$t("按标签打印")),1)])),_:1},8,["modelValue"]),f(C,{modelValue:L.form.print_method,"onUpdate:modelValue":p[8]||(p[8]=e=>L.form.print_method=e),label:40},{default:n((()=>[c(h(s.$t("按一菜一单打印")),1)])),_:1},8,["modelValue"])])])),_:1},8,["label"]),10==L.form.type?(m(),u(x,{key:0,label:s.$t("打印机"),prop:"printer_id",rules:[{required:!0,message:s.$t("请选择打印机")}]},{default:n((()=>[f(S,{modelValue:L.form.printer_id,"onUpdate:modelValue":p[9]||(p[9]=e=>L.form.printer_id=e),placeholder:s.$t("请选择")},{default:n((()=>[(m(!0),b(g,null,y(L.type,((e,l)=>(m(),u(w,{key:l,label:e.printer_name,value:e.printer_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label","rules"])):V("",!0),20==L.form.type?(m(),u(x,{key:1,label:s.$t("打印机"),prop:"printer_id",rules:[{required:!0,message:s.$t("请选择打印机")}]},{default:n((()=>[f(S,{modelValue:L.form.printer_id,"onUpdate:modelValue":p[10]||(p[10]=e=>L.form.printer_id=e),placeholder:s.$t("请选择")},{default:n((()=>[(m(!0),b(g,null,y(L.typeTag,((e,l)=>(m(),u(w,{key:l,label:e.printer_name,value:e.printer_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label","rules"])):V("",!0),0==L.form.product_type&&20==L.form.print_method?(m(),u(x,{key:2,label:s.$t("商品分类"),prop:"category_id",rules:[{required:!0,message:"请选择商品分类"}]},{default:n((()=>[f(S,{modelValue:L.form.category_id,"onUpdate:modelValue":p[11]||(p[11]=e=>L.form.category_id=e),multiple:"",placeholder:s.$t("请选择")},{default:n((()=>[(m(!0),b(g,null,y(L.storeList,(e=>(m(),u(w,{key:e.category_id,label:e.name_text,value:e.category_id+""},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"])):V("",!0),1==L.form.product_type&&20==L.form.print_method?(m(),u(x,{key:3,label:s.$t("商品分类"),prop:"category_id",rules:[{required:!0,message:s.$t("请选择商品分类")}]},{default:n((()=>[f(S,{modelValue:L.form.category_id,"onUpdate:modelValue":p[12]||(p[12]=e=>L.form.category_id=e),multiple:"",placeholder:s.$t("请选择")},{default:n((()=>[(m(!0),b(g,null,y(L.storeList,(e=>(m(),u(w,{key:e.category_id,label:e.name_text,value:e.category_id+""},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label","rules"])):V("",!0),30==L.form.print_method?(m(),u(x,{key:4,label:s.$t("打印标签"),prop:"label_id"},{default:n((()=>[f(S,{modelValue:L.form.label_id,"onUpdate:modelValue":p[13]||(p[13]=e=>L.form.label_id=e),multiple:"",placeholder:s.$t("请选择")},{default:n((()=>[(m(!0),b(g,null,y(L.labelList,(e=>(m(),u(w,{key:e.label_id,label:e.label_name_text,value:e.label_id+""},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"]),_("div",j,h(s.$t("不选择打印全部")),1)])),_:1},8,["label"])):V("",!0)])),_:1},8,["model"])])),_:1},8,["onClose","modelValue","title"])}]]);export{v as default};