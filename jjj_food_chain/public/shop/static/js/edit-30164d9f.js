import{g as e,h as l,r,s as o,n as t,e as a,i,x as s}from"./element-plus-33e0d8cc.js";import{S as m}from"./setting-c7c78728.js";import{_ as d}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as p,T as _,S as n,a as u,P as E,W as N,X as f,c as U,Q as I,a8 as c,Y as R}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-188a77f0.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const T={key:0},V={class:"tips"},h={class:"tips"},g={class:"tips"},S={key:1},Y={class:"tips"},P={class:"tips"},b={class:"tips"},y={key:2},A={key:3},v={key:4},j={class:"tips"},$={class:"dialog-footer"};const F=d({data:()=>({form:{printer_id:"",printer_name:"",printer_type:"",sort:1,print_times:"",FEI_E_YUN:{USER:"",UKEY:"",SN:""},FEI_E_YUN_TAG:{USER:"",UKEY:"",SN:""},PRINT_CENTER:{deviceNo:"",key:""},SUNMI_LAN:{IP:"",SN:""},XPRINTER_LAN:{IP:"",PORT:9100}},loading:!1,dialogVisible:!1,type:[]}),props:["printer_id","open_edit"],created(){this.dialogVisible=this.open_edit,this.getData()},methods:{getData(){const e=this.printer_id;m.printerDetail({printer_id:e},!0).then((e=>{let l=e.data.detail;this.type=e.data.printerType,this.form.printer_name=l.printer_name,this.form.printer_type=l.printer_type.value,this.form.sort=l.sort,this.form.printer_id=l.printer_id,this.form.print_times=l.print_times,"FEI_E_YUN"==l.printer_type.value&&(this.form.FEI_E_YUN.USER=l.printer_config.USER,this.form.FEI_E_YUN.UKEY=l.printer_config.UKEY,this.form.FEI_E_YUN.SN=l.printer_config.SN),"FEI_E_YUN_TAG"==l.printer_type.value&&(this.form.FEI_E_YUN_TAG.USER=l.printer_config.USER,this.form.FEI_E_YUN_TAG.UKEY=l.printer_config.UKEY,this.form.FEI_E_YUN_TAG.SN=l.printer_config.SN),"PRINT_CENTER"==l.printer_type.value&&(this.form.PRINT_CENTER.deviceNo=l.printer_config.deviceNo,this.form.PRINT_CENTER.key=l.printer_config.key),"SUNMI_LAN"==l.printer_type.value&&(this.form.SUNMI_LAN.IP=l.printer_config.IP,this.form.SUNMI_LAN.SN=l.printer_config.SN),"XPRINTER_LAN"==l.printer_type.value&&(this.form.XPRINTER_LAN.IP=l.printer_config.IP,this.form.XPRINTER_LAN.PORT=l.printer_config.PORT)})).catch((e=>{}))},onSubmit(){let e=this,l=e.form;e.$refs.form.validate((r=>{r&&(e.loading=!0,m.editPrinter(l,!0).then((l=>{e.loading=!1,this.$ElMessage({message:"恭喜你，修改成功",type:"success"}),this.$emit("close",1)})).catch((l=>{e.loading=!1})))}))},handleClose(){this.$emit("close")}}},[["render",function(m,d,F,L,C,k){const q=e,K=l,G=r,M=o,X=t,x=a,O=i,w=s;return p(),_(w,{class:"product-add",onClose:k.handleClose,modelValue:C.dialogVisible,"onUpdate:modelValue":d[16]||(d[16]=e=>C.dialogVisible=e),"close-on-click-modal":!1,"close-on-press-escape":!1,title:m.$t("编辑打印机")},{footer:n((()=>[u("span",$,[E(O,{onClick:k.handleClose},{default:n((()=>[N(f(m.$t("取消")),1)])),_:1},8,["onClick"]),E(O,{type:"primary",onClick:k.onSubmit,loading:C.loading},{default:n((()=>[N(f(m.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:n((()=>[E(x,{size:"small",ref:"form",model:C.form,"label-position":"top"},{default:n((()=>[E(K,{label:m.$t("打印机名称"),prop:"printer_name",rules:[{required:!0,message:" "}]},{default:n((()=>[E(q,{modelValue:C.form.printer_name,"onUpdate:modelValue":d[0]||(d[0]=e=>C.form.printer_name=e),placeholder:m.$t("请输入打印机名称")},null,8,["modelValue","placeholder"])])),_:1},8,["label"]),E(K,{label:m.$t("打印机类型")},{default:n((()=>[E(M,{modelValue:C.form.printer_type,"onUpdate:modelValue":d[1]||(d[1]=e=>C.form.printer_type=e),placeholder:"请选择",style:{width:"100%"}},{default:n((()=>[(p(!0),U(I,null,c(C.type,((e,l)=>(p(),_(G,{key:l,label:e,value:l},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label"]),"FEI_E_YUN"==C.form.printer_type?(p(),U("div",T,[E(K,{label:"USER",prop:"FEI_E_YUN.USER",rules:[{required:!0,message:" "}]},{default:n((()=>[E(q,{modelValue:C.form.FEI_E_YUN.USER,"onUpdate:modelValue":d[2]||(d[2]=e=>C.form.FEI_E_YUN.USER=e)},null,8,["modelValue"]),u("div",V,f(m.$t("飞鹅云后台注册用户名")),1)])),_:1}),E(K,{label:"UKEY",prop:"FEI_E_YUN.UKEY",rules:[{required:!0,message:" "}]},{default:n((()=>[E(q,{modelValue:C.form.FEI_E_YUN.UKEY,"onUpdate:modelValue":d[3]||(d[3]=e=>C.form.FEI_E_YUN.UKEY=e)},null,8,["modelValue"]),u("div",h,f(m.$t("飞鹅云后台登录生成的UKEY")),1)])),_:1}),E(K,{label:m.$t("打印机编号"),prop:"FEI_E_YUN.SN",rules:[{required:!0,message:" "}]},{default:n((()=>[E(q,{modelValue:C.form.FEI_E_YUN.SN,"onUpdate:modelValue":d[4]||(d[4]=e=>C.form.FEI_E_YUN.SN=e)},null,8,["modelValue"]),u("div",g,f(m.$t("打印机编号为9位数字，查看飞鹅打印机底部贴纸上面的编号")),1)])),_:1},8,["label"])])):R("",!0),"FEI_E_YUN_TAG"==C.form.printer_type?(p(),U("div",S,[E(K,{label:"USER",prop:"FEI_E_YUN_TAG.USER",rules:[{required:!0,message:" "}]},{default:n((()=>[E(q,{modelValue:C.form.FEI_E_YUN_TAG.USER,"onUpdate:modelValue":d[5]||(d[5]=e=>C.form.FEI_E_YUN_TAG.USER=e)},null,8,["modelValue"]),u("div",Y,f(m.$t("飞鹅云后台注册用户名")),1)])),_:1}),E(K,{label:"UKEY",prop:"FEI_E_YUN_TAG.UKEY",rules:[{required:!0,message:" "}]},{default:n((()=>[E(q,{modelValue:C.form.FEI_E_YUN_TAG.UKEY,"onUpdate:modelValue":d[6]||(d[6]=e=>C.form.FEI_E_YUN_TAG.UKEY=e)},null,8,["modelValue"]),u("div",P,f(m.$t("飞鹅云后台登录生成的UKEY")),1)])),_:1}),E(K,{label:"$t('打印机编号')",prop:"FEI_E_YUN_TAG.SN",rules:[{required:!0,message:" "}]},{default:n((()=>[E(q,{modelValue:C.form.FEI_E_YUN_TAG.SN,"onUpdate:modelValue":d[7]||(d[7]=e=>C.form.FEI_E_YUN_TAG.SN=e)},null,8,["modelValue"]),u("div",b,f(m.$t("打印机编号为9位数字，查看飞鹅打印机底部贴纸上面的编号")),1)])),_:1})])):R("",!0),"PRINT_CENTER"==C.form.printer_type?(p(),U("div",y,[E(K,{label:m.$t("打印机编号"),prop:"PRINT_CENTER.deviceNo",rules:[{required:!0,message:" "}]},{default:n((()=>[E(q,{modelValue:C.form.PRINT_CENTER.deviceNo,"onUpdate:modelValue":d[8]||(d[8]=e=>C.form.PRINT_CENTER.deviceNo=e)},null,8,["modelValue"])])),_:1},8,["label"]),E(K,{label:m.$t("打印机秘钥"),prop:"PRINT_CENTER.key",rules:[{required:!0,message:" "}]},{default:n((()=>[E(q,{modelValue:C.form.PRINT_CENTER.key,"onUpdate:modelValue":d[9]||(d[9]=e=>C.form.PRINT_CENTER.key=e)},null,8,["modelValue"])])),_:1},8,["label"])])):R("",!0),"SUNMI_LAN"==C.form.printer_type?(p(),U("div",A,[E(K,{label:m.$t("打印机IP"),prop:"SUNMI_LAN.IP",rules:[{required:!0,message:" "}]},{default:n((()=>[E(q,{modelValue:C.form.SUNMI_LAN.IP,"onUpdate:modelValue":d[10]||(d[10]=e=>C.form.SUNMI_LAN.IP=e)},null,8,["modelValue"])])),_:1},8,["label"]),E(K,{label:m.$t("打印机SN"),prop:"SUNMI_LAN.SN",rules:[{required:!0,message:" "}]},{default:n((()=>[E(q,{modelValue:C.form.SUNMI_LAN.SN,"onUpdate:modelValue":d[11]||(d[11]=e=>C.form.SUNMI_LAN.SN=e)},null,8,["modelValue"])])),_:1},8,["label"])])):R("",!0),"XPRINTER_LAN"==C.form.printer_type?(p(),U("div",v,[E(K,{label:m.$t("打印机IP"),prop:"XPRINTER_LAN.IP",rules:[{required:!0,message:" "}]},{default:n((()=>[E(q,{modelValue:C.form.XPRINTER_LAN.IP,"onUpdate:modelValue":d[12]||(d[12]=e=>C.form.XPRINTER_LAN.IP=e)},null,8,["modelValue"])])),_:1},8,["label"]),E(K,{label:m.$t("打印机PORT"),prop:"XPRINTER_LAN.PORT",rules:[{required:!0,message:" "}]},{default:n((()=>[E(q,{modelValue:C.form.XPRINTER_LAN.PORT,"onUpdate:modelValue":d[13]||(d[13]=e=>C.form.XPRINTER_LAN.PORT=e)},null,8,["modelValue"])])),_:1},8,["label"])])):R("",!0),E(K,{label:m.$t("打印联数"),prop:"print_times",rules:[{required:!0,message:m.$t("请输入打印联数")}]},{default:n((()=>[E(X,{controls:!1,min:0,max:10,placeholder:m.$t("请输入打印联数"),modelValue:C.form.print_times,"onUpdate:modelValue":d[14]||(d[14]=e=>C.form.print_times=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["placeholder","modelValue"]),u("div",j,f(m.$t("同一订单，打印的次数")),1)])),_:1},8,["label","rules"]),E(K,{label:m.$t("排序"),prop:"sort",rules:[{required:!0,message:m.$t("接近0，排序等級越高")}]},{default:n((()=>[E(X,{controls:!1,min:0,max:999,placeholder:m.$t("接近0，排序等級越高"),modelValue:C.form.sort,"onUpdate:modelValue":d[15]||(d[15]=e=>C.form.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["placeholder","modelValue"])])),_:1},8,["label","rules"])])),_:1},8,["model"])])),_:1},8,["onClose","modelValue","title"])}],["__scopeId","data-v-d7d1db77"]]);export{F as default};