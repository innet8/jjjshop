import{E as e,e as l,f as t,o as a,q as o,r as i,h as d,g as r,w as m}from"./element-plus-b30a858e.js";import{S as s}from"./supplier-f413f79c.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as u,T as n,S as _,a as f,P as c,W as b,X as h,c as V,Q as y,a8 as g,Y as j}from"./@vue-e5cdee21.js";import"./@vueuse-f6c48e1e.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-f5b82f61.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-3c897039.js";import"./vue-router-2729bdc9.js";import"./pinia-805bca39.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-f67db3fa.js";import"./vue-i18n-2607567b.js";import"./@intlify-f009848f.js";const $={class:"tips"},v={class:"dialog-footer"};const k=p({data:()=>({form:{name:"",is_open:0,printer_id:"",product_type:0,print_type:10,category_id:[],type:"",print_method:10,label_id:[]},loading:!1,type:[],typeTag:[],storeList:[],takeList:[],labelList:[],id:0,dialogVisible:!1}),props:["editId","open_edit"],created(){this.dialogVisible=this.open_edit,this.getData()},mounted(){},methods:{getData(){let e=this;this.id=this.editId,s.getEditPrinting({id:e.id},!0).then((l=>{Object.assign(e.form,l.data.model),this.storeList=l.data.storeList,this.takeList=l.data.takeList,this.type=l.data.printerList,this.typeTag=l.data.printerTagList,this.labelList=l.data.labelList})).catch((e=>{}))},onSubmit(){let l=this,t=l.form;t.id=l.id,l.$refs.form.validate((a=>{a&&(l.loading=!0,s.EditPrinting(t,!0).then((t=>{l.loading=!1,e({message:"恭喜你，修改成功",type:"success"}),this.$emit("close",1)})).catch((e=>{l.loading=!1})))}))},handleClose(){this.$emit("close")}}},[["render",function(e,s,p,k,U,L){const C=l,q=t,x=a,T=o,w=i,S=d,E=r,P=m;return u(),n(P,{class:"product-add",onClose:L.handleClose,modelValue:U.dialogVisible,"onUpdate:modelValue":s[14]||(s[14]=e=>U.dialogVisible=e),"close-on-click-modal":!1,"close-on-press-escape":!1,title:e.$t("编辑商品打印")},{footer:_((()=>[f("span",v,[c(E,{onClick:L.handleClose},{default:_((()=>[b(h(e.$t("取消")),1)])),_:1},8,["onClick"]),c(E,{type:"primary",onClick:L.onSubmit,loading:U.loading},{default:_((()=>[b(h(e.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:_((()=>[c(S,{size:"small",ref:"form",model:U.form,"label-position":"top"},{default:_((()=>[c(q,{label:e.$t("名称"),prop:"name",rules:[{required:!0,message:" "}]},{default:_((()=>[c(C,{modelValue:U.form.name,"onUpdate:modelValue":s[0]||(s[0]=e=>U.form.name=e)},null,8,["modelValue"])])),_:1},8,["label"]),c(q,{label:e.$t("是否开启")},{default:_((()=>[f("div",null,[c(x,{modelValue:U.form.is_open,"onUpdate:modelValue":s[1]||(s[1]=e=>U.form.is_open=e),label:1},{default:_((()=>[b(h(e.$t("开启")),1)])),_:1},8,["modelValue"]),c(x,{modelValue:U.form.is_open,"onUpdate:modelValue":s[2]||(s[2]=e=>U.form.is_open=e),label:0},{default:_((()=>[b(h(e.$t("关闭")),1)])),_:1},8,["modelValue"])])])),_:1},8,["label"]),c(q,{label:e.$t("打印模式")},{default:_((()=>[f("div",null,[c(x,{modelValue:U.form.print_type,"onUpdate:modelValue":s[3]||(s[3]=e=>U.form.print_type=e),label:10},{default:_((()=>[b(h(e.$t("付款打印")),1)])),_:1},8,["modelValue"]),c(x,{modelValue:U.form.print_type,"onUpdate:modelValue":s[4]||(s[4]=e=>U.form.print_type=e),label:30},{default:_((()=>[b(h(e.$t("送厨打印")),1)])),_:1},8,["modelValue"])])])),_:1},8,["label"]),c(q,{label:e.$t("打印方式")},{default:_((()=>[f("div",null,[c(x,{modelValue:U.form.print_method,"onUpdate:modelValue":s[5]||(s[5]=e=>U.form.print_method=e),label:10},{default:_((()=>[b(h(e.$t("整单打印")),1)])),_:1},8,["modelValue"]),c(x,{modelValue:U.form.print_method,"onUpdate:modelValue":s[6]||(s[6]=e=>U.form.print_method=e),label:20},{default:_((()=>[b(h(e.$t("按商品分组打印")),1)])),_:1},8,["modelValue"]),c(x,{modelValue:U.form.print_method,"onUpdate:modelValue":s[7]||(s[7]=e=>U.form.print_method=e),label:30},{default:_((()=>[b(h(e.$t("按标签打印")),1)])),_:1},8,["modelValue"]),c(x,{modelValue:U.form.print_method,"onUpdate:modelValue":s[8]||(s[8]=e=>U.form.print_method=e),label:40},{default:_((()=>[b(h(e.$t("一菜一单")),1)])),_:1},8,["modelValue"])])])),_:1},8,["label"]),10==U.form.type?(u(),n(q,{key:0,label:e.$t("打印机"),prop:"printer_id",rules:[{required:!0,message:" "}]},{default:_((()=>[c(w,{modelValue:U.form.printer_id,"onUpdate:modelValue":s[9]||(s[9]=e=>U.form.printer_id=e),placeholder:e.$t("请选择")},{default:_((()=>[(u(!0),V(y,null,g(U.type,((e,l)=>(u(),n(T,{key:l,label:e.printer_name,value:e.printer_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"])):j("",!0),20==U.form.type?(u(),n(q,{key:1,label:e.$t("打印机"),prop:"printer_id",rules:[{required:!0,message:" "}]},{default:_((()=>[c(w,{modelValue:U.form.printer_id,"onUpdate:modelValue":s[10]||(s[10]=e=>U.form.printer_id=e),placeholder:e.$t("请选择")},{default:_((()=>[(u(!0),V(y,null,g(U.typeTag,((e,l)=>(u(),n(T,{key:l,label:e.printer_name,value:e.printer_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"])):j("",!0),0==U.form.product_type&&20==U.form.print_method?(u(),n(q,{key:2,label:e.$t("商品分组"),prop:"category_id",rules:[{required:!0,message:" "}]},{default:_((()=>[c(w,{modelValue:U.form.category_id,"onUpdate:modelValue":s[11]||(s[11]=e=>U.form.category_id=e),multiple:"",placeholder:e.$t("请选择")},{default:_((()=>[(u(!0),V(y,null,g(U.takeList,(e=>(u(),n(T,{key:e.category_id,label:e.name_text,value:e.category_id+""},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"])):j("",!0),1==U.form.product_type&&20==U.form.print_method?(u(),n(q,{key:3,label:e.$t("商品分组"),prop:"category_id",rules:[{required:!0,message:" "}]},{default:_((()=>[c(w,{modelValue:U.form.category_id,"onUpdate:modelValue":s[12]||(s[12]=e=>U.form.category_id=e),multiple:"",placeholder:e.$t("请选择")},{default:_((()=>[(u(!0),V(y,null,g(U.storeList,(e=>(u(),n(T,{key:e.category_id,label:e.name_text,value:e.category_id+""},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"])])),_:1},8,["label"])):j("",!0),30==U.form.print_method?(u(),n(q,{key:4,label:e.$t("打印标签"),prop:"label_id"},{default:_((()=>[c(w,{modelValue:U.form.label_id,"onUpdate:modelValue":s[13]||(s[13]=e=>U.form.label_id=e),multiple:"",placeholder:e.$t("请选择")},{default:_((()=>[(u(!0),V(y,null,g(U.labelList,(e=>(u(),n(T,{key:e.label_id,label:e.label_name,value:e.label_id+""},null,8,["label","value"])))),128))])),_:1},8,["modelValue","placeholder"]),f("div",$,h(e.$t("不选择打印全部")),1)])),_:1},8,["label"])):j("",!0)])),_:1},8,["model"])])),_:1},8,["onClose","modelValue","title"])}]]);export{k as default};
