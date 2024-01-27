import{E as e,g as l,h as t,o as a,q as o,r,e as i,i as d,w as s}from"./element-plus-b01b3a31.js";import{S as m}from"./supplier-93d0f950.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as u,T as n,S as _,a as f,P as c,W as h,X as b,c as y,Q as V,a8 as g,Y as $}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-98f906e9.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const j={class:"tips"},v={class:"dialog-footer"};const k=p({data:()=>({form:{name:"",is_open:1,printer_id:"",product_type:0,print_type:10,category_id:[],type:10,print_method:10,label_id:[]},loading:!1,dialogVisible:!1,type:[],typeTag:[],storeList:[],takeList:[],labelList:[],options:[],categoryIds:[]}),props:["open_add"],created(){this.dialogVisible=this.open_add,this.getData()},methods:{getData(){m.getPrinting({},!0).then((e=>{var l;this.storeList=e.data.storeList,this.takeList=e.data.takeList,this.type=e.data.printerList,this.typeTag=e.data.printerTagList,this.labelList=e.data.labelList,this.options=[],null==(l=this.storeList)||l.map((e=>{var l;if(0==e.parent_id){let t=[];null==(l=this.storeList)||l.map((l=>{e.category_id==l.parent_id&&t.push({value:l.category_id,label:l.name_text,children:[]})})),this.options.push({value:e.category_id,label:e.name_text,children:t})}}))})).catch((e=>{}))},onSubmit(){let l=this,t=l.form;20==!t.print_method&&(t.category_id=[]),l.$refs.form.validate((a=>{a&&(l.loading=!0,m.addPrinting(t,!0).then((t=>{l.loading=!1,e({message:"恭喜你，添加成功",type:"success"}),this.$emit("close",1)})).catch((e=>{l.loading=!1})))}))},handleClose(){this.$emit("close")}}},[["render",function(e,m,p,k,L,U){const x=l,C=t,q=a,T=o,w=r,S=i,P=d,z=s;return u(),n(z,{class:"product-add",onClose:U.handleClose,modelValue:L.dialogVisible,"onUpdate:modelValue":m[14]||(m[14]=e=>L.dialogVisible=e),"close-on-click-modal":!1,"close-on-press-escape":!1,title:e.$t("添加商品打印")},{footer:_((()=>[f("span",v,[c(P,{onClick:U.handleClose},{default:_((()=>[h(b(e.$t("取消")),1)])),_:1},8,["onClick"]),c(P,{type:"primary",onClick:U.onSubmit,loading:L.loading},{default:_((()=>[h(b(e.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:_((()=>[c(S,{size:"small",ref:"form",model:L.form,"label-position":"top"},{default:_((()=>[c(C,{label:e.$t("名称"),prop:"name",rules:[{required:!0,message:e.$t("请输入名称")}]},{default:_((()=>[c(x,{modelValue:L.form.name,"onUpdate:modelValue":m[0]||(m[0]=e=>L.form.name=e),placeholder:e.$t("请输入名称"),maxlength:50},null,8,["modelValue","placeholder"])])),_:1},8,["label","rules"]),c(C,{label:e.$t("是否开启")},{default:_((()=>[f("div",null,[c(q,{modelValue:L.form.is_open,"onUpdate:modelValue":m[1]||(m[1]=e=>L.form.is_open=e),label:1},{default:_((()=>[h(b(e.$t("开启")),1)])),_:1},8,["modelValue"]),c(q,{modelValue:L.form.is_open,"onUpdate:modelValue":m[2]||(m[2]=e=>L.form.is_open=e),label:0},{default:_((()=>[h(b(e.$t("关闭")),1)])),_:1},8,["modelValue"])])])),_:1},8,["label"]),c(C,{label:e.$t("打印模式")},{default:_((()=>[f("div",null,[c(q,{modelValue:L.form.print_type,"onUpdate:modelValue":m[3]||(m[3]=e=>L.form.print_type=e),label:10},{default:_((()=>[h(b(e.$t("付款打印")),1)])),_:1},8,["modelValue"]),c(q,{modelValue:L.form.print_type,"onUpdate:modelValue":m[4]||(m[4]=e=>L.form.print_type=e),label:30},{default:_((()=>[h(b(e.$t("送厨打印")),1)])),_:1},8,["modelValue"])])])),_:1},8,["label"]),c(C,{label:e.$t("打印方式")},{default:_((()=>[f("div",null,[c(q,{modelValue:L.form.print_method,"onUpdate:modelValue":m[5]||(m[5]=e=>L.form.print_method=e),label:10},{default:_((()=>[h(b(e.$t("整单打印")),1)])),_:1},8,["modelValue"]),c(q,{modelValue:L.form.print_method,"onUpdate:modelValue":m[6]||(m[6]=e=>L.form.print_method=e),label:20},{default:_((()=>[h(b(e.$t("按商品分类打印")),1)])),_:1},8,["modelValue"]),c(q,{modelValue:L.form.print_method,"onUpdate:modelValue":m[7]||(m[7]=e=>L.form.print_method=e),label:30},{default:_((()=>[h(b(e.$t("按标签打印")),1)])),_:1},8,["modelValue"]),c(q,{modelValue:L.form.print_method,"onUpdate:modelValue":m[8]||(m[8]=e=>L.form.print_method=e),label:40},{default:_((()=>[h(b(e.$t("按一菜一单打印")),1)])),_:1},8,["modelValue"])])])),_:1},8,["label"]),10==L.form.type?(u(),n(C,{key:0,label:e.$t("打印机"),prop:"printer_id",rules:[{required:!0,message:e.$t("请选择打印机")}]},{default:_((()=>[c(w,{modelValue:L.form.printer_id,"onUpdate:modelValue":m[9]||(m[9]=e=>L.form.printer_id=e),placeholder:e.$t("请选择")},{default:_((()=>[(u(!0),y(V,null,g(L.type,((e,l)=>(u(),n(T,{key:l,label:e.printer_name,value:e.printer_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label","rules"])):$("",!0),20==L.form.type?(u(),n(C,{key:1,label:e.$t("打印机"),prop:"printer_id",rules:[{required:!0,message:e.$t("请选择打印机")}]},{default:_((()=>[c(w,{modelValue:L.form.printer_id,"onUpdate:modelValue":m[10]||(m[10]=e=>L.form.printer_id=e),placeholder:e.$t("请选择")},{default:_((()=>[(u(!0),y(V,null,g(L.typeTag,((e,l)=>(u(),n(T,{key:l,label:e.printer_name,value:e.printer_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label","rules"])):$("",!0),0==L.form.product_type&&20==L.form.print_method?(u(),n(C,{key:2,label:e.$t("商品分类"),prop:"category_id",rules:[{required:!0,message:"请选择商品分类"}]},{default:_((()=>[c(w,{modelValue:L.form.category_id,"onUpdate:modelValue":m[11]||(m[11]=e=>L.form.category_id=e),multiple:"",placeholder:e.$t("请选择")},{default:_((()=>[(u(!0),y(V,null,g(L.storeList,(e=>(u(),n(T,{key:e.category_id,label:e.name_text,value:e.category_id+""},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"])):$("",!0),1==L.form.product_type&&20==L.form.print_method?(u(),n(C,{key:3,label:e.$t("商品分类"),prop:"category_id",rules:[{required:!0,message:e.$t("请选择商品分类")}]},{default:_((()=>[c(w,{modelValue:L.form.category_id,"onUpdate:modelValue":m[12]||(m[12]=e=>L.form.category_id=e),multiple:"",placeholder:e.$t("请选择")},{default:_((()=>[(u(!0),y(V,null,g(L.storeList,(e=>(u(),n(T,{key:e.category_id,label:e.name_text,value:e.category_id+""},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label","rules"])):$("",!0),30==L.form.print_method?(u(),n(C,{key:4,label:e.$t("打印标签"),prop:"label_id"},{default:_((()=>[c(w,{modelValue:L.form.label_id,"onUpdate:modelValue":m[13]||(m[13]=e=>L.form.label_id=e),multiple:"",placeholder:e.$t("请选择")},{default:_((()=>[(u(!0),y(V,null,g(L.labelList,(e=>(u(),n(T,{key:e.label_id,label:e.label_name_text,value:e.label_id+""},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"]),f("div",j,b(e.$t("不选择打印全部")),1)])),_:1},8,["label"])):$("",!0)])),_:1},8,["model"])])),_:1},8,["onClose","modelValue","title"])}]]);export{k as default};
