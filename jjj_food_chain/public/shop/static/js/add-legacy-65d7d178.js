System.register(["./element-plus-legacy-b61989a6.js","./setting-legacy-374cb507.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-517223d5.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./index-legacy-9e638fb2.js","./vue-router-legacy-57460840.js","./pinia-legacy-b89d16df.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./object-inspect-legacy-fcd55e63.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-fb79f073.js","./vue-i18n-legacy-859a0eb8.js","./@intlify-legacy-d0534b73.js"],(function(e,l){"use strict";var n,t,r,u,o,a,i,s,d,c,m,f,p,_,E,N,U,g,y,I,V,R=document.createElement("style");return R.textContent=".tips[data-v-c630efa3]{color:#ccc}\n",document.head.appendChild(R),{setters:[function(e){n=e.g,t=e.h,r=e.q,u=e.r,o=e.D,a=e.e,i=e.i,s=e.w},function(e){d=e.S},function(e){c=e._},function(e){m=e.o,f=e.T,p=e.S,_=e.a,E=e.P,N=e.W,U=e.X,g=e.c,y=e.Q,I=e.a8,V=e.Y},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={key:0},R={class:"tips"},b={class:"tips"},T={class:"tips"},S={key:1},h={class:"tips"},v={class:"tips"},Y={class:"tips"},j={key:2},P={key:3},$={key:4},A={class:"tips"},F={class:"dialog-footer"};e("default",c({props:["open_add"],created:function(){this.dialogVisible=this.open_add,this.getData()},data:function(){return{form:{printer_name:"",printer_type:"",sort:null,print_times:"",FEI_E_YUN:{USER:"",UKEY:"",SN:""},FEI_E_YUN_TAG:{USER:"",UKEY:"",SN:""},PRINT_CENTER:{deviceNo:"",key:""},SUNMI_LAN:{IP:"",SN:""},XPRINTER_LAN:{IP:"",PORT:9100}},loading:!1,type:[],dialogVisible:!1}},methods:{getData:function(){var e=this;d.printerType({},!0).then((function(l){e.type=l.data.printerType})).catch((function(e){}))},onSubmit:function(){var e=this,l=this,n=l.form;l.$refs.form.validate((function(t){t&&(l.loading=!0,d.addPrinter(n,!0).then((function(n){l.loading=!1,e.$ElMessage({message:"恭喜你，添加成功",type:"success"}),e.$emit("close",1)})).catch((function(e){l.loading=!1})))}))},handleClose:function(){this.$emit("close")}}},[["render",function(e,d,c,C,q,k){var L=n,K=t,G=r,M=u,X=o,x=a,w=i,O=s;return m(),f(O,{class:"product-add",onClose:k.handleClose,modelValue:q.dialogVisible,"onUpdate:modelValue":d[16]||(d[16]=function(e){return q.dialogVisible=e}),"close-on-click-modal":!1,"close-on-press-escape":!1,title:e.$t("添加打印机")},{footer:p((function(){return[_("span",F,[E(w,{onClick:k.handleClose},{default:p((function(){return[N(U(e.$t("取消")),1)]})),_:1},8,["onClick"]),E(w,{type:"primary",onClick:k.onSubmit,loading:q.loading},{default:p((function(){return[N(U(e.$t("确定")),1)]})),_:1},8,["onClick","loading"])])]})),default:p((function(){return[E(x,{size:"small",ref:"form",model:q.form,"label-position":"top"},{default:p((function(){return[E(K,{label:e.$t("打印机名称"),prop:"printer_name",rules:[{required:!0,message:" "}]},{default:p((function(){return[E(L,{modelValue:q.form.printer_name,"onUpdate:modelValue":d[0]||(d[0]=function(e){return q.form.printer_name=e}),placeholder:e.$t("请输入打印机名称")},null,8,["modelValue","placeholder"])]})),_:1},8,["label"]),E(K,{label:e.$t("打印机类型"),prop:"printer_type",rules:[{required:!0,message:" "}]},{default:p((function(){return[E(M,{modelValue:q.form.printer_type,"onUpdate:modelValue":d[1]||(d[1]=function(e){return q.form.printer_type=e}),placeholder:e.$t("请选择类型"),style:{width:"100%"}},{default:p((function(){return[(m(!0),g(y,null,I(q.type,(function(e,l){return m(),f(G,{key:l,label:e,value:l},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","placeholder"])]})),_:1},8,["label"]),"FEI_E_YUN"==q.form.printer_type?(m(),g("div",l,[E(K,{label:"USER",prop:"FEI_E_YUN.USER",rules:[{required:!0,message:" "}]},{default:p((function(){return[E(L,{modelValue:q.form.FEI_E_YUN.USER,"onUpdate:modelValue":d[2]||(d[2]=function(e){return q.form.FEI_E_YUN.USER=e})},null,8,["modelValue"]),_("div",R,U(e.$t("飞鹅云后台注册用户名")),1)]})),_:1}),E(K,{label:"UKEY",prop:"FEI_E_YUN.UKEY",rules:[{required:!0,message:" "}]},{default:p((function(){return[E(L,{modelValue:q.form.FEI_E_YUN.UKEY,"onUpdate:modelValue":d[3]||(d[3]=function(e){return q.form.FEI_E_YUN.UKEY=e})},null,8,["modelValue"]),_("div",b,U(e.$t("飞鹅云后台登录生成的UKEY")),1)]})),_:1}),E(K,{label:e.$t("打印机编号"),prop:"FEI_E_YUN.SN",rules:[{required:!0,message:" "}]},{default:p((function(){return[E(L,{modelValue:q.form.FEI_E_YUN.SN,"onUpdate:modelValue":d[4]||(d[4]=function(e){return q.form.FEI_E_YUN.SN=e})},null,8,["modelValue"]),_("div",T,U(e.$t("打印机编号为9位数字，查看飞鹅打印机底部贴纸上面的编号")),1)]})),_:1},8,["label"])])):V("",!0),"FEI_E_YUN_TAG"==q.form.printer_type?(m(),g("div",S,[E(K,{label:"USER",prop:"FEI_E_YUN_TAG.USER",rules:[{required:!0,message:" "}]},{default:p((function(){return[E(L,{modelValue:q.form.FEI_E_YUN_TAG.USER,"onUpdate:modelValue":d[5]||(d[5]=function(e){return q.form.FEI_E_YUN_TAG.USER=e})},null,8,["modelValue"]),_("div",h,U(e.$t("飞鹅云后台注册用户名")),1)]})),_:1}),E(K,{label:"UKEY",prop:"FEI_E_YUN_TAG.UKEY",rules:[{required:!0,message:" "}]},{default:p((function(){return[E(L,{modelValue:q.form.FEI_E_YUN_TAG.UKEY,"onUpdate:modelValue":d[6]||(d[6]=function(e){return q.form.FEI_E_YUN_TAG.UKEY=e})},null,8,["modelValue"]),_("div",v,U(e.$t("飞鹅云后台登录生成的UKEY")),1)]})),_:1}),E(K,{label:e.$t("打印机编号"),prop:"FEI_E_YUN_TAG.SN",rules:[{required:!0,message:" "}]},{default:p((function(){return[E(L,{modelValue:q.form.FEI_E_YUN_TAG.SN,"onUpdate:modelValue":d[7]||(d[7]=function(e){return q.form.FEI_E_YUN_TAG.SN=e})},null,8,["modelValue"]),_("div",Y,U(e.$t("打印机编号为9位数字，查看飞鹅打印机底部贴纸上面的编号")),1)]})),_:1},8,["label"])])):V("",!0),"PRINT_CENTER"==q.form.printer_type?(m(),g("div",j,[E(K,{label:e.$t("打印机编号"),prop:"PRINT_CENTER.deviceNo",rules:[{required:!0,message:" "}]},{default:p((function(){return[E(L,{modelValue:q.form.PRINT_CENTER.deviceNo,"onUpdate:modelValue":d[8]||(d[8]=function(e){return q.form.PRINT_CENTER.deviceNo=e})},null,8,["modelValue"])]})),_:1},8,["label"]),E(K,{label:e.$t("打印机秘钥"),prop:"PRINT_CENTER.key",rules:[{required:!0,message:" "}]},{default:p((function(){return[E(L,{modelValue:q.form.PRINT_CENTER.key,"onUpdate:modelValue":d[9]||(d[9]=function(e){return q.form.PRINT_CENTER.key=e})},null,8,["modelValue"])]})),_:1},8,["label"])])):V("",!0),"SUNMI_LAN"==q.form.printer_type?(m(),g("div",P,[E(K,{label:e.$t("打印机IP"),prop:"SUNMI_LAN.IP",rules:[{required:!0,message:" "}]},{default:p((function(){return[E(L,{modelValue:q.form.SUNMI_LAN.IP,"onUpdate:modelValue":d[10]||(d[10]=function(e){return q.form.SUNMI_LAN.IP=e})},null,8,["modelValue"])]})),_:1},8,["label"]),E(K,{label:e.$t("打印机SN"),prop:"SUNMI_LAN.SN",rules:[{required:!0,message:" "}]},{default:p((function(){return[E(L,{modelValue:q.form.SUNMI_LAN.SN,"onUpdate:modelValue":d[11]||(d[11]=function(e){return q.form.SUNMI_LAN.SN=e})},null,8,["modelValue"])]})),_:1},8,["label"])])):V("",!0),"XPRINTER_LAN"==q.form.printer_type?(m(),g("div",$,[E(K,{label:e.$t("打印机IP"),prop:"XPRINTER_LAN.IP",rules:[{required:!0,message:" "}]},{default:p((function(){return[E(L,{modelValue:q.form.XPRINTER_LAN.IP,"onUpdate:modelValue":d[12]||(d[12]=function(e){return q.form.XPRINTER_LAN.IP=e})},null,8,["modelValue"])]})),_:1},8,["label"]),E(K,{label:e.$t("打印机PORT"),prop:"XPRINTER_LAN.PORT",rules:[{required:!0,message:" "}]},{default:p((function(){return[E(L,{modelValue:q.form.XPRINTER_LAN.PORT,"onUpdate:modelValue":d[13]||(d[13]=function(e){return q.form.XPRINTER_LAN.PORT=e})},null,8,["modelValue"])]})),_:1},8,["label"])])):V("",!0),E(K,{label:e.$t("打印联数"),prop:"print_times",rules:[{required:!0,message:e.$t("请输入打印联数")}]},{default:p((function(){return[E(X,{controls:!1,min:0,max:10,placeholder:e.$t("请输入打印联数"),modelValue:q.form.print_times,"onUpdate:modelValue":d[14]||(d[14]=function(e){return q.form.print_times=e}),modelModifiers:{number:!0},autocomplete:"off"},null,8,["placeholder","modelValue"]),_("div",A,U(e.$t("同一订单，打印的次数")),1)]})),_:1},8,["label","rules"]),E(K,{label:e.$t("排序"),prop:"sort",rules:[{required:!0,message:e.$t("接近0，排序等級越高")}]},{default:p((function(){return[E(X,{controls:!1,min:0,max:999,placeholder:e.$t("接近0，排序等級越高"),modelValue:q.form.sort,"onUpdate:modelValue":d[15]||(d[15]=function(e){return q.form.sort=e}),modelModifiers:{number:!0},autocomplete:"off"},null,8,["placeholder","modelValue"])]})),_:1},8,["label","rules"])]})),_:1},8,["model"])]})),_:1},8,["onClose","modelValue","title"])}],["__scopeId","data-v-c630efa3"]]))}}}));
