!function(){function e(l){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(l)}function l(l,t,n){var a;return a=function(l,t){if("object"!=e(l)||!l)return l;var n=l[Symbol.toPrimitive];if(void 0!==n){var a=n.call(l,t||"default");if("object"!=e(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(l)}(t,"string"),(t="symbol"==e(a)?a:String(a))in l?Object.defineProperty(l,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):l[t]=n,l}System.register(["./element-plus-legacy-6adc2ffc.js","./supplier-legacy-e12eebc8.js","./store-legacy-82cb34d9.js","./_plugin-vue_export-helper-legacy-61c4c9d1.js","./@vue-legacy-8ef99c9b.js","./lodash-es-legacy-de50a096.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-3353583a.js","./@element-plus-legacy-91437698.js","./dayjs-legacy-0ff6bb75.js","./call-bind-legacy-8954b3d2.js","./get-intrinsic-legacy-c0201930.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./hasown-legacy-8325a62b.js","./set-function-length-legacy-e4fe6823.js","./define-data-property-legacy-290282d7.js","./has-property-descriptors-legacy-1e05bb01.js","./gopd-legacy-0da6a62b.js","./@popperjs-legacy-876caf52.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./index-legacy-49a0e241.js","./vue-router-legacy-a8f66a40.js","./pinia-legacy-e8a51700.js","./axios-legacy-dedee0c6.js","./qs-legacy-334feae6.js","./side-channel-legacy-19dc2798.js","./object-inspect-legacy-a5678b81.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-d36ae666.js","./vue-i18n-legacy-a195b753.js","./@intlify-legacy-7f6e5bc9.js"],(function(e,t){"use strict";var n,a,r,o,u,i,d,c,s,f,p,m,_,y,g,b,h,V,v,$,j,k;return{setters:[function(e){n=e.g,a=e.h,r=e.w,o=e.p,u=e.q,i=e.e,d=e.i,c=e.u},function(e){s=e.S},function(e){f=e.S},function(e){p=e._},function(e){m=e.o,_=e.S,y=e.R,g=e.a,b=e.O,h=e.V,V=e.W,v=e.c,$=e.P,j=e.a7,k=e.X},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var t={class:"tips"},U={class:"dialog-footer"};e("default",p({data:function(){return l(l(l({form:{name:"",is_open:1,printer_id:"",product_type:0,print_type:10,category_id:[],area_id:"",type:10,print_method:10,label_id:[],is_open_one_food:0},loading:!1,type:[],typeTag:[],storeList:[],takeList:[],labelList:[],options:[],id:0,dialogVisible:!1},"options",[]),"categoryIds",[]),"areaData",[])},props:["editId","open_edit"],created:function(){this.dialogVisible=this.open_edit,this.getAreaData()},mounted:function(){},watch:{categoryIds:{handler:function(e){var l,t=this;this.form.category_id=[],this.categoryIds.map((function(e){e[1]&&t.form.category_id.push(e[1])})),null===(l=this.$refs)||void 0===l||null===(l=l.form)||void 0===l||l.validate((function(e){}))},deep:!0,immediate:!0}},methods:{getData:function(){var e=this,l=this;this.id=this.editId,s.getEditPrinting({id:l.id},!0).then((function(t){var n;Object.assign(l.form,t.data.model),e.storeList=t.data.storeList,e.takeList=t.data.takeList,e.type=t.data.printerList,e.typeTag=t.data.printerTagList;var a=[];e.type.map((function(e){a.push(e.printer_id)})),-1==a.indexOf(e.form.printer_id)&&(e.form.printer_id=""),e.labelList=t.data.labelList,e.options=[],null===(n=e.storeList)||void 0===n||n.map((function(l){if(0==l.parent_id){var t,n=[];null===(t=e.storeList)||void 0===t||t.map((function(t){l.category_id==t.parent_id&&(n.push({value:t.category_id,label:t.name_text,children:[]}),-1!=e.form.category_id.indexOf(t.category_id+"")&&e.categoryIds.push([t.parent_id,t.category_id]))})),e.options.push({value:l.category_id,label:l.name_text,children:n})}}))})).catch((function(e){}))},getAreaData:function(){var e=this,l=this;l.loading=!0,f.arealist({},!0).then((function(t){l.loading=!1,l.areaData=t.data.list.data.map((function(e){return{area_id:e.area_id.toString(),area_name:e.area_name}})),l.areaData.unshift({area_id:"0",area_name:e.$t("无区域 (收银无桌台)")}),e.getData()})).catch((function(e){l.loading=!1}))},onSubmit:function(){var e=this,l=this,t=l.form;t.id=l.id,20==!t.print_method&&(t.category_id=[]),t.area_id=(t.area_id||[]).filter((function(e){return e})),t.area_id=(t.area_id||[]).length>0?t.area_id:"",l.$refs.form.validate((function(n){n&&(l.loading=!0,s.EditPrinting(t,!0).then((function(t){l.loading=!1,e.$ElMessage({message:$t($t("保存成功")),type:"success"}),e.$emit("close",1)})).catch((function(e){l.loading=!1})))}))},handleClose:function(){this.$emit("close")}}},[["render",function(e,l,s,f,p,L){var S=n,q=a,x=r,C=o,w=u,D=i,I=d,P=c;return m(),_(P,{class:"product-add",onClose:L.handleClose,modelValue:p.dialogVisible,"onUpdate:modelValue":l[17]||(l[17]=function(e){return p.dialogVisible=e}),"close-on-click-modal":!1,"close-on-press-escape":!1,title:e.$t("编辑商品打印")},{footer:y((function(){return[g("span",U,[b(I,{onClick:L.handleClose},{default:y((function(){return[h(V(e.$t("取消")),1)]})),_:1},8,["onClick"]),b(I,{type:"primary",onClick:L.onSubmit,loading:p.loading},{default:y((function(){return[h(V(e.$t("确定")),1)]})),_:1},8,["onClick","loading"])])]})),default:y((function(){return[b(D,{size:"small",ref:"form",model:p.form,"label-position":"top"},{default:y((function(){return[b(q,{label:e.$t("名称"),prop:"name",rules:[{required:!0,message:e.$t("请输入名称")}]},{default:y((function(){return[b(S,{modelValue:p.form.name,"onUpdate:modelValue":l[0]||(l[0]=function(e){return p.form.name=e}),placeholder:e.$t("请输入名称")},null,8,["modelValue","placeholder"])]})),_:1},8,["label","rules"]),b(q,{label:e.$t("是否开启"),prop:"is_open",rules:[{required:!0,message:""}]},{default:y((function(){return[g("div",null,[b(x,{modelValue:p.form.is_open,"onUpdate:modelValue":l[1]||(l[1]=function(e){return p.form.is_open=e}),label:1},{default:y((function(){return[h(V(e.$t("开启")),1)]})),_:1},8,["modelValue"]),b(x,{modelValue:p.form.is_open,"onUpdate:modelValue":l[2]||(l[2]=function(e){return p.form.is_open=e}),label:0},{default:y((function(){return[h(V(e.$t("关闭")),1)]})),_:1},8,["modelValue"])])]})),_:1},8,["label"]),b(q,{label:e.$t("打印模式"),prop:"print_type",rules:[{required:!0,message:""}]},{default:y((function(){return[g("div",null,[b(x,{modelValue:p.form.print_type,"onUpdate:modelValue":l[3]||(l[3]=function(e){return p.form.print_type=e}),label:10},{default:y((function(){return[h(V(e.$t("付款打印")),1)]})),_:1},8,["modelValue"]),b(x,{modelValue:p.form.print_type,"onUpdate:modelValue":l[4]||(l[4]=function(e){return p.form.print_type=e}),label:30},{default:y((function(){return[h(V(e.$t("送厨打印")),1)]})),_:1},8,["modelValue"])])]})),_:1},8,["label"]),b(q,{label:e.$t("按区域打印")},{default:y((function(){return[b(w,{modelValue:p.form.area_id,"onUpdate:modelValue":l[5]||(l[5]=function(e){return p.form.area_id=e}),multiple:"",placeholder:e.$t("全部区域")},{default:y((function(){return[(m(!0),v($,null,j(p.areaData,(function(e,l){return m(),_(C,{key:l,label:e.area_name,value:e.area_id},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","placeholder"])]})),_:1},8,["label"]),b(q,{label:e.$t("打印方式"),prop:"print_method",rules:[{required:!0,message:""}]},{default:y((function(){return[g("div",null,[b(x,{modelValue:p.form.print_method,"onUpdate:modelValue":l[6]||(l[6]=function(e){return p.form.print_method=e}),label:10},{default:y((function(){return[h(V(e.$t("整单打印")),1)]})),_:1},8,["modelValue"]),b(x,{modelValue:p.form.print_method,"onUpdate:modelValue":l[7]||(l[7]=function(e){return p.form.print_method=e}),label:20},{default:y((function(){return[h(V(e.$t("按商品分类打印")),1)]})),_:1},8,["modelValue"]),b(x,{modelValue:p.form.print_method,"onUpdate:modelValue":l[8]||(l[8]=function(e){return p.form.print_method=e}),label:30},{default:y((function(){return[h(V(e.$t("按标签打印")),1)]})),_:1},8,["modelValue"]),b(x,{modelValue:p.form.print_method,"onUpdate:modelValue":l[9]||(l[9]=function(e){return p.form.print_method=e}),label:40},{default:y((function(){return[h(V(e.$t("按一菜一单打印")),1)]})),_:1},8,["modelValue"])])]})),_:1},8,["label"]),10==p.form.type?(m(),_(q,{key:0,label:e.$t("打印机"),prop:"printer_id",rules:[{required:!0,message:e.$t("请选择打印机")}]},{default:y((function(){return[b(w,{modelValue:p.form.printer_id,"onUpdate:modelValue":l[10]||(l[10]=function(e){return p.form.printer_id=e}),placeholder:e.$t("请选择")},{default:y((function(){return[(m(!0),v($,null,j(p.type,(function(e,l){return m(),_(C,{key:l,label:e.printer_name,value:e.printer_id},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","placeholder"])]})),_:1},8,["label","rules"])):k("",!0),20==p.form.type?(m(),_(q,{key:1,label:e.$t("打印机"),prop:"printer_id",rules:[{required:!0,message:e.$t("请选择打印机")}]},{default:y((function(){return[b(w,{modelValue:p.form.printer_id,"onUpdate:modelValue":l[11]||(l[11]=function(e){return p.form.printer_id=e}),placeholder:e.$t("请选择")},{default:y((function(){return[(m(!0),v($,null,j(p.typeTag,(function(e,l){return m(),_(C,{key:l,label:e.printer_name,value:e.printer_id},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","placeholder"])]})),_:1},8,["label","rules"])):k("",!0),0==p.form.product_type&&20==p.form.print_method?(m(),_(q,{key:2,label:e.$t("商品分类"),prop:"category_id",rules:[{required:!0,message:"请选择商品分类"}]},{default:y((function(){return[b(w,{modelValue:p.form.category_id,"onUpdate:modelValue":l[12]||(l[12]=function(e){return p.form.category_id=e}),multiple:"",placeholder:e.$t("请选择")},{default:y((function(){return[(m(!0),v($,null,j(p.storeList,(function(e){return m(),_(C,{key:e.category_id,label:e.name_text,value:e.category_id+""},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","placeholder"])]})),_:1},8,["label"])):k("",!0),1==p.form.product_type&&20==p.form.print_method?(m(),_(q,{key:3,label:e.$t("商品分类"),prop:"category_id",rules:[{required:!0,message:e.$t("请选择商品分类")}]},{default:y((function(){return[b(w,{modelValue:p.form.category_id,"onUpdate:modelValue":l[13]||(l[13]=function(e){return p.form.category_id=e}),multiple:"",placeholder:e.$t("请选择")},{default:y((function(){return[(m(!0),v($,null,j(p.storeList,(function(e){return m(),_(C,{key:e.category_id,label:e.name_text,value:e.category_id+""},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","placeholder"])]})),_:1},8,["label","rules"])):k("",!0),30==p.form.print_method?(m(),_(q,{key:4,label:e.$t("打印标签"),prop:"label_id"},{default:y((function(){return[b(w,{modelValue:p.form.label_id,"onUpdate:modelValue":l[14]||(l[14]=function(e){return p.form.label_id=e}),multiple:"",placeholder:e.$t("请选择")},{default:y((function(){return[(m(!0),v($,null,j(p.labelList,(function(e){return m(),_(C,{key:e.label_id,label:e.label_name_text,value:e.label_id+""},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","placeholder"]),g("div",t,V(e.$t("不选择打印全部")),1)]})),_:1},8,["label"])):k("",!0),20==p.form.print_method||30==p.form.print_method?(m(),_(q,{key:5,label:e.$t("按一菜一单打印"),prop:"is_open_one_food",rules:[{required:!0,message:""}]},{default:y((function(){return[g("div",null,[b(x,{modelValue:p.form.is_open_one_food,"onUpdate:modelValue":l[15]||(l[15]=function(e){return p.form.is_open_one_food=e}),label:0},{default:y((function(){return[h(V(e.$t("关闭")),1)]})),_:1},8,["modelValue"]),b(x,{modelValue:p.form.is_open_one_food,"onUpdate:modelValue":l[16]||(l[16]=function(e){return p.form.is_open_one_food=e}),label:1},{default:y((function(){return[h(V(e.$t("开启")),1)]})),_:1},8,["modelValue"])])]})),_:1},8,["label"])):k("",!0)]})),_:1},8,["model"])]})),_:1},8,["onClose","modelValue","title"])}]]))}}}))}();
