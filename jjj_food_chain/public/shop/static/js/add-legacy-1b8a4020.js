System.register(["./element-plus-legacy-6adc2ffc.js","./supplier-legacy-b4d4056a.js","./store-legacy-3542b3f1.js","./_plugin-vue_export-helper-legacy-61c4c9d1.js","./@vue-legacy-8ef99c9b.js","./lodash-es-legacy-de50a096.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-3353583a.js","./@element-plus-legacy-91437698.js","./dayjs-legacy-0ff6bb75.js","./call-bind-legacy-8954b3d2.js","./get-intrinsic-legacy-c0201930.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./hasown-legacy-8325a62b.js","./set-function-length-legacy-e4fe6823.js","./define-data-property-legacy-290282d7.js","./has-property-descriptors-legacy-1e05bb01.js","./gopd-legacy-0da6a62b.js","./@popperjs-legacy-876caf52.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./index-legacy-6bd6edf7.js","./vue-router-legacy-a8f66a40.js","./pinia-legacy-e8a51700.js","./axios-legacy-dedee0c6.js","./qs-legacy-334feae6.js","./side-channel-legacy-19dc2798.js","./object-inspect-legacy-a5678b81.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-d36ae666.js","./vue-i18n-legacy-a195b753.js","./@intlify-legacy-7f6e5bc9.js"],(function(e,l){"use strict";var t,n,a,r,o,u,i,d,s,c,f,p,m,_,g,y,b,h,V,$,j,v,k;return{setters:[function(e){t=e.g,n=e.h,a=e.w,r=e.p,o=e.q,u=e.x,i=e.e,d=e.i,s=e.u},function(e){c=e.S},function(e){f=e.S},function(e){p=e._},function(e){m=e.o,_=e.S,g=e.R,y=e.a,b=e.O,h=e.V,V=e.W,$=e.c,j=e.P,v=e.a7,k=e.X},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={class:"tips"},L={class:"dialog-footer"};e("default",p({data:function(){return{form:{name:"",is_open:1,printer_id:"",product_type:0,print_type:10,category_id:[],area_id:"",type:10,print_method:10,label_id:[],is_open_one_food:0},loading:!1,dialogVisible:!1,type:[],typeTag:[],storeList:[],takeList:[],labelList:[],options:[],categoryIds:[],areaData:[]}},props:["open_add"],created:function(){this.dialogVisible=this.open_add,this.getAreaData()},methods:{getData:function(){var e=this;c.getPrinting({},!0).then((function(l){var t;e.storeList=l.data.storeList,e.takeList=l.data.takeList,e.type=l.data.printerList,e.typeTag=l.data.printerTagList,e.labelList=l.data.labelList,e.options=[],null===(t=e.storeList)||void 0===t||t.map((function(l){if(0==l.parent_id){var t,n=[];null===(t=e.storeList)||void 0===t||t.map((function(e){l.category_id==e.parent_id&&n.push({value:e.category_id,label:e.name_text,children:[]})})),e.options.push({value:l.category_id,label:l.name_text,children:n})}}))})).catch((function(e){}))},getAreaData:function(){var e=this,l=this;l.loading=!0,f.arealist({},!0).then((function(t){l.loading=!1,l.areaData=t.data.list.data.map((function(e){return{area_id:e.area_id.toString(),area_name:e.area_name}})),l.areaData.unshift({area_id:"0",area_name:e.$t("无区域 (收银无桌台)")}),e.getData()})).catch((function(e){l.loading=!1}))},onSubmit:function(){var e=this,l=this,t=JSON.parse(JSON.stringify(l.form));20==!t.print_method&&(t.category_id=[]),t.area_id=(t.area_id||[]).filter((function(e){return e})),t.area_id=(t.area_id||[]).length>0?t.area_id:"",l.$refs.form.validate((function(n){n&&(l.loading=!0,c.addPrinting(t,!0).then((function(t){l.loading=!1,e.$ElMessage({message:$t("添加成功"),type:"success"}),e.$emit("close",1)})).catch((function(e){l.loading=!1})))}))},handleClose:function(){this.$emit("close")}}},[["render",function(e,c,f,p,U,q){var x=t,C=n,D=a,S=r,w=o,T=u,z=i,J=d,O=s;return m(),_(O,{class:"product-add",onClose:q.handleClose,modelValue:U.dialogVisible,"onUpdate:modelValue":c[15]||(c[15]=function(e){return U.dialogVisible=e}),"close-on-click-modal":!1,"close-on-press-escape":!1,title:e.$t("添加商品打印")},{footer:g((function(){return[y("span",L,[b(J,{onClick:q.handleClose},{default:g((function(){return[h(V(e.$t("取消")),1)]})),_:1},8,["onClick"]),b(J,{type:"primary",onClick:q.onSubmit,loading:U.loading},{default:g((function(){return[h(V(e.$t("确定")),1)]})),_:1},8,["onClick","loading"])])]})),default:g((function(){return[b(z,{size:"small",ref:"form",model:U.form,"label-position":"top"},{default:g((function(){return[b(C,{label:e.$t("名称"),prop:"name",rules:[{required:!0,message:e.$t("请输入名称")}]},{default:g((function(){return[b(x,{modelValue:U.form.name,"onUpdate:modelValue":c[0]||(c[0]=function(e){return U.form.name=e}),placeholder:e.$t("请输入名称"),maxlength:50},null,8,["modelValue","placeholder"])]})),_:1},8,["label","rules"]),b(C,{label:e.$t("是否开启"),prop:"is_open",rules:[{required:!0,message:""}]},{default:g((function(){return[y("div",null,[b(D,{modelValue:U.form.is_open,"onUpdate:modelValue":c[1]||(c[1]=function(e){return U.form.is_open=e}),label:1},{default:g((function(){return[h(V(e.$t("开启")),1)]})),_:1},8,["modelValue"]),b(D,{modelValue:U.form.is_open,"onUpdate:modelValue":c[2]||(c[2]=function(e){return U.form.is_open=e}),label:0},{default:g((function(){return[h(V(e.$t("关闭")),1)]})),_:1},8,["modelValue"])])]})),_:1},8,["label"]),b(C,{label:e.$t("打印模式"),prop:"print_type",rules:[{required:!0,message:""}]},{default:g((function(){return[y("div",null,[b(D,{modelValue:U.form.print_type,"onUpdate:modelValue":c[3]||(c[3]=function(e){return U.form.print_type=e}),label:10},{default:g((function(){return[h(V(e.$t("付款打印")),1)]})),_:1},8,["modelValue"]),b(D,{modelValue:U.form.print_type,"onUpdate:modelValue":c[4]||(c[4]=function(e){return U.form.print_type=e}),label:30},{default:g((function(){return[h(V(e.$t("送厨打印")),1)]})),_:1},8,["modelValue"])])]})),_:1},8,["label"]),b(C,{label:e.$t("按区域打印")},{default:g((function(){return[b(w,{modelValue:U.form.area_id,"onUpdate:modelValue":c[5]||(c[5]=function(e){return U.form.area_id=e}),multiple:"",placeholder:e.$t("全部区域")},{default:g((function(){return[(m(!0),$(j,null,v(U.areaData,(function(e,l){return m(),_(S,{key:l,label:e.area_name,value:e.area_id},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","placeholder"])]})),_:1},8,["label"]),b(C,{label:e.$t("打印方式"),prop:"print_method",rules:[{required:!0,message:""}]},{default:g((function(){return[y("div",null,[b(T,{modelValue:U.form.print_method,"onUpdate:modelValue":c[6]||(c[6]=function(e){return U.form.print_method=e}),onChange:c[7]||(c[7]=function(){U.form.is_open_one_food=0})},{default:g((function(){return[b(D,{label:10},{default:g((function(){return[h(V(e.$t("整单打印")),1)]})),_:1}),b(D,{label:20},{default:g((function(){return[h(V(e.$t("按商品分类打印")),1)]})),_:1}),b(D,{label:30},{default:g((function(){return[h(V(e.$t("按标签打印")),1)]})),_:1}),b(D,{label:40},{default:g((function(){return[h(V(e.$t("按一菜一单打印")),1)]})),_:1})]})),_:1},8,["modelValue"])])]})),_:1},8,["label"]),10==U.form.type?(m(),_(C,{key:0,label:e.$t("打印机"),prop:"printer_id",rules:[{required:!0,message:e.$t("请选择打印机")}]},{default:g((function(){return[b(w,{modelValue:U.form.printer_id,"onUpdate:modelValue":c[8]||(c[8]=function(e){return U.form.printer_id=e}),placeholder:e.$t("请选择")},{default:g((function(){return[(m(!0),$(j,null,v(U.type,(function(e,l){return m(),_(S,{key:l,label:e.printer_name,value:e.printer_id},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","placeholder"])]})),_:1},8,["label","rules"])):k("",!0),20==U.form.type?(m(),_(C,{key:1,label:e.$t("打印机"),prop:"printer_id",rules:[{required:!0,message:e.$t("请选择打印机")}]},{default:g((function(){return[b(w,{modelValue:U.form.printer_id,"onUpdate:modelValue":c[9]||(c[9]=function(e){return U.form.printer_id=e}),placeholder:e.$t("请选择")},{default:g((function(){return[(m(!0),$(j,null,v(U.typeTag,(function(e,l){return m(),_(S,{key:l,label:e.printer_name,value:e.printer_id},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","placeholder"])]})),_:1},8,["label","rules"])):k("",!0),0==U.form.product_type&&20==U.form.print_method?(m(),_(C,{key:2,label:e.$t("商品分类"),prop:"category_id",rules:[{required:!0,message:"请选择商品分类"}]},{default:g((function(){return[b(w,{modelValue:U.form.category_id,"onUpdate:modelValue":c[10]||(c[10]=function(e){return U.form.category_id=e}),multiple:"",placeholder:e.$t("请选择")},{default:g((function(){return[(m(!0),$(j,null,v(U.storeList,(function(e){return m(),_(S,{key:e.category_id,label:e.name_text,value:e.category_id+""},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","placeholder"])]})),_:1},8,["label"])):k("",!0),1==U.form.product_type&&20==U.form.print_method?(m(),_(C,{key:3,label:e.$t("商品分类"),prop:"category_id",rules:[{required:!0,message:e.$t("请选择商品分类")}]},{default:g((function(){return[b(w,{modelValue:U.form.category_id,"onUpdate:modelValue":c[11]||(c[11]=function(e){return U.form.category_id=e}),multiple:"",placeholder:e.$t("请选择")},{default:g((function(){return[(m(!0),$(j,null,v(U.storeList,(function(e){return m(),_(S,{key:e.category_id,label:e.name_text,value:e.category_id+""},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","placeholder"])]})),_:1},8,["label","rules"])):k("",!0),30==U.form.print_method?(m(),_(C,{key:4,label:e.$t("打印标签"),prop:"label_id"},{default:g((function(){return[b(w,{modelValue:U.form.label_id,"onUpdate:modelValue":c[12]||(c[12]=function(e){return U.form.label_id=e}),multiple:"",placeholder:e.$t("请选择")},{default:g((function(){return[(m(!0),$(j,null,v(U.labelList,(function(e){return m(),_(S,{key:e.label_id,label:e.label_name_text,value:e.label_id+""},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","placeholder"]),y("div",l,V(e.$t("不选择打印全部")),1)]})),_:1},8,["label"])):k("",!0),20==U.form.print_method||30==U.form.print_method?(m(),_(C,{key:5,label:e.$t("按一菜一单打印"),prop:"is_open_one_food",rules:[{required:!0,message:""}]},{default:g((function(){return[y("div",null,[b(D,{modelValue:U.form.is_open_one_food,"onUpdate:modelValue":c[13]||(c[13]=function(e){return U.form.is_open_one_food=e}),label:0},{default:g((function(){return[h(V(e.$t("关闭")),1)]})),_:1},8,["modelValue"]),b(D,{modelValue:U.form.is_open_one_food,"onUpdate:modelValue":c[14]||(c[14]=function(e){return U.form.is_open_one_food=e}),label:1},{default:g((function(){return[h(V(e.$t("开启")),1)]})),_:1},8,["modelValue"])])]})),_:1},8,["label"])):k("",!0)]})),_:1},8,["model"])]})),_:1},8,["onClose","modelValue","title"])}]]))}}}));
