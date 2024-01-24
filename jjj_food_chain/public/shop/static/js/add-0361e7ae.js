import{E as e,g as l,h as t,o as a,q as o,r,Q as i,e as d,i as s,w as m}from"./element-plus-d03e850c.js";import{S as p}from"./supplier-6f027b13.js";import{_ as n}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as u,T as _,S as f,a as c,P as h,W as b,X as y,c as g,Q as V,a8 as $,Y as j}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-45b3c58c.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const v={class:"tips"},k={class:"dialog-footer"};const L=n({data:()=>({form:{name:"",is_open:1,printer_id:"",product_type:0,print_type:10,category_id:[],type:10,print_method:10,label_id:[]},loading:!1,dialogVisible:!1,type:[],typeTag:[],storeList:[],takeList:[],labelList:[],options:[],categoryIds:[]}),props:["open_add"],created(){this.dialogVisible=this.open_add,this.getData()},watch:{categoryIds:{handler(e){var l,t;this.form.category_id=[],this.categoryIds.map((e=>{e[1]&&this.form.category_id.push(e[1])})),null==(t=null==(l=this.$refs)?void 0:l.form)||t.validate((e=>{}))},deep:!0,immediate:!0}},methods:{getData(){p.getPrinting({},!0).then((e=>{var l;this.storeList=e.data.storeList,this.takeList=e.data.takeList,this.type=e.data.printerList,this.typeTag=e.data.printerTagList,this.labelList=e.data.labelList,this.options=[],null==(l=this.storeList)||l.map((e=>{var l;if(0==e.parent_id){let t=[];null==(l=this.storeList)||l.map((l=>{e.category_id==l.parent_id&&t.push({value:l.category_id,label:l.name_text,children:[]})})),this.options.push({value:e.category_id,label:e.name_text,children:t})}}))})).catch((e=>{}))},onSubmit(){let l=this,t=l.form;20==!t.print_method&&(t.category_id=[]),l.$refs.form.validate((a=>{a&&(l.loading=!0,p.addPrinting(t,!0).then((t=>{l.loading=!1,e({message:"恭喜你，添加成功",type:"success"}),this.$emit("close",1)})).catch((e=>{l.loading=!1})))}))},handleClose(){this.$emit("close")}}},[["render",function(e,p,n,L,U,C){const x=l,q=t,w=a,I=o,T=r,S=i,P=d,z=s,D=m;return u(),_(D,{class:"product-add",onClose:C.handleClose,modelValue:U.dialogVisible,"onUpdate:modelValue":p[14]||(p[14]=e=>U.dialogVisible=e),"close-on-click-modal":!1,"close-on-press-escape":!1,title:e.$t("添加商品打印")},{footer:f((()=>[c("span",k,[h(z,{onClick:C.handleClose},{default:f((()=>[b(y(e.$t("取消")),1)])),_:1},8,["onClick"]),h(z,{type:"primary",onClick:C.onSubmit,loading:U.loading},{default:f((()=>[b(y(e.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:f((()=>[h(P,{size:"small",ref:"form",model:U.form,"label-position":"top"},{default:f((()=>[h(q,{label:e.$t("名称"),prop:"name",rules:[{required:!0,message:e.$t("请输入名称")}]},{default:f((()=>[h(x,{modelValue:U.form.name,"onUpdate:modelValue":p[0]||(p[0]=e=>U.form.name=e),placeholder:e.$t("请输入名称"),maxlength:50},null,8,["modelValue","placeholder"])])),_:1},8,["label","rules"]),h(q,{label:e.$t("是否开启")},{default:f((()=>[c("div",null,[h(w,{modelValue:U.form.is_open,"onUpdate:modelValue":p[1]||(p[1]=e=>U.form.is_open=e),label:1},{default:f((()=>[b(y(e.$t("开启")),1)])),_:1},8,["modelValue"]),h(w,{modelValue:U.form.is_open,"onUpdate:modelValue":p[2]||(p[2]=e=>U.form.is_open=e),label:0},{default:f((()=>[b(y(e.$t("关闭")),1)])),_:1},8,["modelValue"])])])),_:1},8,["label"]),h(q,{label:e.$t("打印模式")},{default:f((()=>[c("div",null,[h(w,{modelValue:U.form.print_type,"onUpdate:modelValue":p[3]||(p[3]=e=>U.form.print_type=e),label:10},{default:f((()=>[b(y(e.$t("付款打印")),1)])),_:1},8,["modelValue"]),h(w,{modelValue:U.form.print_type,"onUpdate:modelValue":p[4]||(p[4]=e=>U.form.print_type=e),label:30},{default:f((()=>[b(y(e.$t("送厨打印")),1)])),_:1},8,["modelValue"])])])),_:1},8,["label"]),h(q,{label:e.$t("打印方式")},{default:f((()=>[c("div",null,[h(w,{modelValue:U.form.print_method,"onUpdate:modelValue":p[5]||(p[5]=e=>U.form.print_method=e),label:10},{default:f((()=>[b(y(e.$t("整单打印")),1)])),_:1},8,["modelValue"]),h(w,{modelValue:U.form.print_method,"onUpdate:modelValue":p[6]||(p[6]=e=>U.form.print_method=e),label:20},{default:f((()=>[b(y(e.$t("按商品分类打印")),1)])),_:1},8,["modelValue"]),h(w,{modelValue:U.form.print_method,"onUpdate:modelValue":p[7]||(p[7]=e=>U.form.print_method=e),label:30},{default:f((()=>[b(y(e.$t("按标签打印")),1)])),_:1},8,["modelValue"]),h(w,{modelValue:U.form.print_method,"onUpdate:modelValue":p[8]||(p[8]=e=>U.form.print_method=e),label:40},{default:f((()=>[b(y(e.$t("按一菜一单打印")),1)])),_:1},8,["modelValue"])])])),_:1},8,["label"]),10==U.form.type?(u(),_(q,{key:0,label:e.$t("打印机"),prop:"printer_id",rules:[{required:!0,message:e.$t("请选择打印机")}]},{default:f((()=>[h(T,{modelValue:U.form.printer_id,"onUpdate:modelValue":p[9]||(p[9]=e=>U.form.printer_id=e),placeholder:e.$t("请选择")},{default:f((()=>[(u(!0),g(V,null,$(U.type,((e,l)=>(u(),_(I,{key:l,label:e.printer_name,value:e.printer_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label","rules"])):j("",!0),20==U.form.type?(u(),_(q,{key:1,label:e.$t("打印机"),prop:"printer_id",rules:[{required:!0,message:e.$t("请选择打印机")}]},{default:f((()=>[h(T,{modelValue:U.form.printer_id,"onUpdate:modelValue":p[10]||(p[10]=e=>U.form.printer_id=e),placeholder:e.$t("请选择")},{default:f((()=>[(u(!0),g(V,null,$(U.typeTag,((e,l)=>(u(),_(I,{key:l,label:e.printer_name,value:e.printer_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label","rules"])):j("",!0),0==U.form.product_type&&20==U.form.print_method?(u(),_(q,{key:2,label:e.$t("商品分类"),prop:"category_id",rules:[{required:!0,validator:()=>U.form.category_id.length>0,message:e.$t("请选择商品分类")}]},{default:f((()=>[h(S,{options:U.options,modelValue:U.categoryIds,"onUpdate:modelValue":p[11]||(p[11]=e=>U.categoryIds=e),clearable:"",placeholder:e.$t("请选择"),multiple:!0,style:{width:"100%"},props:{multiple:!0}},null,8,["options","modelValue","placeholder"])])),_:1},8,["label","rules"])):j("",!0),1==U.form.product_type&&20==U.form.print_method?(u(),_(q,{key:3,label:e.$t("商品分类"),prop:"category_id",rules:[{required:!0,message:e.$t("请选择商品分类")}]},{default:f((()=>[h(T,{modelValue:U.form.category_id,"onUpdate:modelValue":p[12]||(p[12]=e=>U.form.category_id=e),multiple:"",placeholder:e.$t("请选择")},{default:f((()=>[(u(!0),g(V,null,$(U.storeList,(e=>(u(),_(I,{key:e.category_id,label:e.name_text,value:e.category_id+""},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label","rules"])):j("",!0),30==U.form.print_method?(u(),_(q,{key:4,label:e.$t("打印标签"),prop:"label_id"},{default:f((()=>[h(T,{modelValue:U.form.label_id,"onUpdate:modelValue":p[13]||(p[13]=e=>U.form.label_id=e),multiple:"",placeholder:e.$t("请选择")},{default:f((()=>[(u(!0),g(V,null,$(U.labelList,(e=>(u(),_(I,{key:e.label_id,label:e.label_name_text,value:e.label_id+""},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"]),c("div",v,y(e.$t("不选择打印全部")),1)])),_:1},8,["label"])):j("",!0)])),_:1},8,["model"])])),_:1},8,["onClose","modelValue","title"])}]]);export{L as default};
