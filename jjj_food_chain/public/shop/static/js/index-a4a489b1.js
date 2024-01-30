import{m as e,g as l,j as a,n as s,h as o,o as t,p as r,i,q as d,r as u,s as p,u as n,e as m,v as f}from"./element-plus-b01b3a31.js";import{f as g}from"./upLoad-f850bd5e.js";import c from"./setPassword-7a2c6447.js";import{T as _}from"./terminal-a54d857d.js";import{_ as b}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as h,o as j,c as v,P as y,S as $,a as w,$ as V,T as k,W as U,X as L,Q as P,a8 as x,Y as q,bb as C,b9 as T}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-fa4138eb.js";import"./index-83a39651.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const z={components:{flieUpload:g,setPassword:c},data:()=>({open:!1,openTitle:"",loading:!1,form:{server:{ip:"",port:8080},carousel:[],is_auto_send:0,auto_lock_screen:300,language:[],default_language:"th",cashier_password:!1},password:"",languageList:[],lockList:[{label:$t("无操作15秒"),key:15},{label:$t("无操作30秒"),key:30},{label:$t("无操作1分钟"),key:60},{label:$t("无操作2分钟"),key:120},{label:$t("无操作5分钟"),key:300},{label:$t("无操作10分钟"),key:600}]}),created(){this.getData()},computed:{defaultLanguageList(){let e=[];return this.languageList.map((l=>{(this.form.language||[]).includes(l.key)&&e.push(l),(this.form.language||[]).includes(this.form.default_language)||(this.form.default_language=this.form.language[0])})),e}},methods:{setPassword(e){this.open=!0,this.openTitle=e},getData(){let e=this;e.loading=!0,_.getTerminal().then((l=>{e.loading=!1,e.form=l.data.vars.values,e.languageList=l.data.vars.values.language_list,e.form.cashier_password&&(e.password=666666)})).catch((l=>{e.loading=!1}))},onSubmit(){let e=this,l=JSON.parse(JSON.stringify(e.form));e.loading=!0,_.saveTerminal(l).then((l=>{e.loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"}),e.dialogFormVisible(!0)})).catch((l=>{e.loading=!1}))},upLoad(e){var l="";e.file_type.includes("video")&&(l="video"),e.file_type.includes("image")&&(l="image"),this.form.carousel.push({real_name:e.real_name,file_path:e.file_path,sort:0,type:l})},deleteOne(e){this.form.carousel.splice(e.$index,1),this.form.carousel.sort(((e,l)=>""==e.sort?1:""==l.sort?-1:e.sort-l.sort))},sortOne(){this.form.carousel.sort(((e,l)=>""==e.sort?1:""==l.sort?-1:e.sort-l.sort))}}},O={class:"cash"},M={class:"draggable-list"},B={class:"delete-box"},D=(e=>(C("data-v-dd4ae3e1"),e=e(),T(),e))((()=>w("p",null,":",-1))),S={class:"common-button-wrapper"};const G=b(z,[["render",function(g,c,_,b,C,T){const z=h("flieUpload"),G=e,J=l,E=h("Delete"),N=a,A=s,F=o,I=t,X=r,Q=i,W=d,Y=u,H=p,K=n,R=m,Z=h("setPassword"),ee=f;return j(),v("div",O,[y(R,{size:"small",ref:"form",model:C.form,"label-position":"top"},{default:$((()=>[y(F,{label:g.$t("轮播内容"),prop:"carousel",rules:[{required:!0,message:""}]},{default:$((()=>[w("div",M,[y(z,{onUpLoad:T.upLoad,tips1:g.$t("图片：支持JPG、JPEG、PNG格式，小于15MB，尺寸：1024*600px"),tips2:g.$t("视频：支持AVI、MPEG、MOV、MP4格式，小于30MB，尺寸：1024*600px")},null,8,["onUpLoad","tips1","tips2"]),V((j(),k(A,{size:"small",data:C.form.carousel,border:"",style:{width:"100%"}},{default:$((()=>[y(G,{prop:"real_name",label:g.$t("图片名称")},null,8,["label"]),y(G,{prop:"sort",label:g.$t("排序")},{default:$((e=>[y(J,{modelValue:e.row.sort,"onUpdate:modelValue":l=>e.row.sort=l,onBlur:T.sortOne},null,8,["modelValue","onUpdate:modelValue","onBlur"])])),_:1},8,["label"]),y(G,{prop:"file_path",label:g.$t("链接地址")},{default:$((e=>[y(J,{modelValue:e.row.file_path,"onUpdate:modelValue":l=>e.row.file_path=l,disabled:""},null,8,["modelValue","onUpdate:modelValue"])])),_:1},8,["label"]),y(G,{prop:"file_path",width:"100",label:g.$t("操作")},{default:$((e=>[w("div",B,[y(N,{size:"24"},{default:$((()=>[y(E,{onClick:l=>T.deleteOne(e)},null,8,["onClick"])])),_:2},1024)])])),_:1},8,["label"])])),_:1},8,["data"])),[[ee,C.loading]])])])),_:1},8,["label"]),y(F,{label:g.$t("服务器连接地址"),prop:"server",rules:[{required:!0,message:g.$t("请输入服务器连接地址")}]},{default:$((()=>[y(J,{style:{width:"200px"},disabled:"",modelValue:C.form.server.ip,"onUpdate:modelValue":c[0]||(c[0]=e=>C.form.server.ip=e)},null,8,["modelValue"]),D,y(J,{style:{width:"100px"},disabled:"",modelValue:C.form.server.port,"onUpdate:modelValue":c[1]||(c[1]=e=>C.form.server.port=e)},null,8,["modelValue"])])),_:1},8,["label","rules"]),y(F,{label:g.$t("收银结账自动送厨房："),prop:"is_auto_send",rules:[{required:!0,message:g.$t("")}]},{default:$((()=>[y(X,{modelValue:C.form.is_auto_send,"onUpdate:modelValue":c[2]||(c[2]=e=>C.form.is_auto_send=e)},{default:$((()=>[y(I,{label:"1"},{default:$((()=>[U(L(g.$t("开")),1)])),_:1}),y(I,{label:"0"},{default:$((()=>[U(L(g.$t("关")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label","rules"]),y(F,{label:g.$t("高级设置密码"),prop:"password",rules:[{required:!0,message:""}]},{default:$((()=>[y(J,{class:"max-w460",type:"password",modelValue:C.password,"onUpdate:modelValue":c[3]||(c[3]=e=>C.password=e),disabled:""},null,8,["modelValue"]),y(Q,{onClick:c[4]||(c[4]=e=>T.setPassword(g.$t("修改高级密码"))),type:"primary",link:"",size:"small"},{default:$((()=>[U(L(g.$t("设置密码")),1)])),_:1})])),_:1},8,["label"]),y(F,{label:g.$t("钱箱密码"),prop:"password",rules:[{required:!0,message:""}]},{default:$((()=>[y(J,{class:"max-w460",type:"password",modelValue:C.password,"onUpdate:modelValue":c[5]||(c[5]=e=>C.password=e),disabled:""},null,8,["modelValue"]),y(Q,{onClick:c[6]||(c[6]=e=>T.setPassword(g.$t("修改钱箱密码"))),type:"primary",link:"",size:"small"},{default:$((()=>[U(L(g.$t("设置密码")),1)])),_:1})])),_:1},8,["label"]),y(F,{label:g.$t("自动锁屏"),prop:"auto_lock_screen",rules:[{required:!0,message:g.$t("请选择锁屏时间")}]},{default:$((()=>[y(Y,{modelValue:C.form.auto_lock_screen,"onUpdate:modelValue":c[7]||(c[7]=e=>C.form.auto_lock_screen=e)},{default:$((()=>[(j(!0),v(P,null,x(C.lockList,((e,l)=>(j(),k(W,{key:l,value:e.key,label:e.label},{default:$((()=>[U(L(e.label),1)])),_:2},1032,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label","rules"]),y(F,{label:g.$t("常用语言"),prop:"language",rules:[{required:!0,message:g.$t("请选择常用语言")}]},{default:$((()=>[y(K,{modelValue:C.form.language,"onUpdate:modelValue":c[8]||(c[8]=e=>C.form.language=e)},{default:$((()=>[(j(!0),v(P,null,x(C.languageList,(e=>(j(),k(H,{key:e.key,label:e.key,disabled:1==C.form.language.length&&C.form.language.includes(e.key)},{default:$((()=>[U(L(e.value),1)])),_:2},1032,["label","disabled"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label","rules"]),y(F,{label:g.$t("默认语言"),prop:"default_language",rules:[{required:!0,message:g.$t("请选择常用语言")}]},{default:$((()=>[y(Y,{modelValue:C.form.default_language,"onUpdate:modelValue":c[9]||(c[9]=e=>C.form.default_language=e)},{default:$((()=>[(j(!0),v(P,null,x(T.defaultLanguageList,((e,l)=>(j(),k(W,{key:l,value:e.key,label:e.value},{default:$((()=>[U(L(e.value),1)])),_:2},1032,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label","rules"])])),_:1},8,["model"]),w("div",S,[y(Q,{size:"small",type:"info",onClick:T.getData},{default:$((()=>[U(L(g.$t("重置")),1)])),_:1},8,["onClick"]),y(Q,{size:"small",type:"primary",onClick:T.onSubmit,loading:C.loading},{default:$((()=>[U(L(g.$t("保存")),1)])),_:1},8,["onClick","loading"])]),C.open?(j(),k(Z,{key:0,open:C.open,openTitle:C.openTitle,cashierPassword:C.form.cashier_password,onClose:c[10]||(c[10]=e=>{C.open=!1,1==e&&this.getData()})},null,8,["open","openTitle","cashierPassword"])):q("",!0)])}],["__scopeId","data-v-dd4ae3e1"]]);export{G as default};
