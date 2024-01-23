import{E as e,m as l,g as a,j as s,n as o,h as t,o as r,p as d,i,q as u,r as p,s as n,u as m,e as f,v as g}from"./element-plus-d03e850c.js";import{f as c}from"./upLoad-3eec549e.js";import _ from"./setPassword-e697d839.js";import{T as b}from"./terminal-331e2c1b.js";import{_ as h}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as j,o as w,c as $,P as v,S as y,a as k,$ as V,T as U,W as L,X as q,Q as x,a8 as C,Y as P,bb as T,b9 as z}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-a94aaa88.js";import"./index-36f14091.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const O={components:{flieUpload:c,setPassword:_},data:()=>({open:!1,openTitle:"",loading:!1,form:{server:{ip:"",port:8080},carousel:[],is_auto_send:0,auto_lock_screen:300,language:[],default_language:"th",cashier_password:!1},password:"",languageList:[],lockList:[{label:$t("无操作15秒"),key:15},{label:$t("无操作30秒"),key:30},{label:$t("无操作1分钟"),key:60},{label:$t("无操作2分钟"),key:120},{label:$t("无操作5分钟"),key:300},{label:$t("无操作10分钟"),key:600}]}),created(){this.getData()},computed:{defaultLanguageList(){let e=[];return this.languageList.map((l=>{(this.form.language||[]).includes(l.key)&&e.push(l),(this.form.language||[]).includes(this.form.default_language)||(this.form.default_language=this.form.language[0])})),e}},methods:{setPassword(e){this.open=!0,this.openTitle=e},getData(){let e=this;e.loading=!0,b.getTerminal().then((l=>{e.loading=!1,e.form=l.data.vars.values,e.languageList=l.data.vars.values.language_list,e.form.cashier_password&&(e.password=666666)})).catch((l=>{e.loading=!1}))},onSubmit(){let l=this,a=JSON.parse(JSON.stringify(l.form));l.loading=!0,b.saveTerminal(a).then((a=>{l.loading=!1,e({message:$t("保存成功"),type:"success"}),l.dialogFormVisible(!0)})).catch((e=>{l.loading=!1}))},upLoad(e){this.form.carousel.push({real_name:e.real_name,file_path:e.file_path,sort:0})},deleteOne(e){this.form.carousel.splice(e.$index,1),this.form.carousel.sort(((e,l)=>e.sort-l.sort))},sortOne(){this.form.carousel.sort(((e,l)=>e.sort-l.sort))}}},D={class:"cash"},S={class:"draggable-list"},B={class:"delete-box"},F=(e=>(T("data-v-1c677a84"),e=e(),z(),e))((()=>k("p",null,":",-1))),J={class:"common-button-wrapper"};const N=h(O,[["render",function(e,c,_,b,h,T){const z=j("flieUpload"),O=l,N=a,W=j("Delete"),A=s,E=o,I=t,Q=r,X=d,Y=i,G=u,H=p,K=n,M=m,R=f,Z=j("setPassword"),ee=g;return w(),$("div",D,[v(R,{size:"small",ref:"form",model:h.form,"label-position":"top"},{default:y((()=>[v(I,{label:e.$t("轮播内容"),prop:"carousel",rules:[{required:!0,message:""}]},{default:y((()=>[k("div",S,[v(z,{onUpLoad:T.upLoad},null,8,["onUpLoad"]),V((w(),U(E,{size:"small",data:h.form.carousel,border:"",style:{width:"100%"}},{default:y((()=>[v(O,{prop:"real_name",label:e.$t("图片名称")},null,8,["label"]),v(O,{prop:"sort",label:e.$t("排序")},{default:y((e=>[v(N,{modelValue:e.row.sort,"onUpdate:modelValue":l=>e.row.sort=l,onBlur:T.sortOne},null,8,["modelValue","onUpdate:modelValue","onBlur"])])),_:1},8,["label"]),v(O,{prop:"file_path",label:e.$t("链接地址")},{default:y((e=>[v(N,{modelValue:e.row.file_path,"onUpdate:modelValue":l=>e.row.file_path=l,disabled:""},null,8,["modelValue","onUpdate:modelValue"])])),_:1},8,["label"]),v(O,{prop:"file_path",width:"100",label:e.$t("操作")},{default:y((e=>[k("div",B,[v(A,{size:"24"},{default:y((()=>[v(W,{onClick:l=>T.deleteOne(e)},null,8,["onClick"])])),_:2},1024)])])),_:1},8,["label"])])),_:1},8,["data"])),[[ee,h.loading]])])])),_:1},8,["label"]),v(I,{label:e.$t("服务器连接地址"),prop:"server",rules:[{required:!0,message:e.$t("请输入服务器连接地址")}]},{default:y((()=>[v(N,{style:{width:"200px"},disabled:"",modelValue:h.form.server.ip,"onUpdate:modelValue":c[0]||(c[0]=e=>h.form.server.ip=e)},null,8,["modelValue"]),F,v(N,{style:{width:"100px"},disabled:"",modelValue:h.form.server.port,"onUpdate:modelValue":c[1]||(c[1]=e=>h.form.server.port=e)},null,8,["modelValue"])])),_:1},8,["label","rules"]),v(I,{label:e.$t("收银结账自动送厨房："),prop:"is_auto_send",rules:[{required:!0,message:e.$t("")}]},{default:y((()=>[v(X,{modelValue:h.form.is_auto_send,"onUpdate:modelValue":c[2]||(c[2]=e=>h.form.is_auto_send=e)},{default:y((()=>[v(Q,{label:"1"},{default:y((()=>[L(q(e.$t("开")),1)])),_:1}),v(Q,{label:"0"},{default:y((()=>[L(q(e.$t("关")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label","rules"]),v(I,{label:e.$t("高级设置密码"),prop:"password",rules:[{required:!0,message:""}]},{default:y((()=>[v(N,{class:"max-w460",type:"password",modelValue:h.password,"onUpdate:modelValue":c[3]||(c[3]=e=>h.password=e),disabled:""},null,8,["modelValue"]),v(Y,{onClick:c[4]||(c[4]=l=>T.setPassword(e.$t("修改高级密码"))),type:"primary",link:"",size:"small"},{default:y((()=>[L(q(e.$t("设置密码")),1)])),_:1})])),_:1},8,["label"]),v(I,{label:e.$t("钱箱密码"),prop:"password",rules:[{required:!0,message:""}]},{default:y((()=>[v(N,{class:"max-w460",type:"password",modelValue:h.password,"onUpdate:modelValue":c[5]||(c[5]=e=>h.password=e),disabled:""},null,8,["modelValue"]),v(Y,{onClick:c[6]||(c[6]=l=>T.setPassword(e.$t("修改钱箱密码"))),type:"primary",link:"",size:"small"},{default:y((()=>[L(q(e.$t("设置密码")),1)])),_:1})])),_:1},8,["label"]),v(I,{label:e.$t("自动锁屏"),prop:"auto_lock_screen",rules:[{required:!0,message:e.$t("请选择锁屏时间")}]},{default:y((()=>[v(H,{modelValue:h.form.auto_lock_screen,"onUpdate:modelValue":c[7]||(c[7]=e=>h.form.auto_lock_screen=e)},{default:y((()=>[(w(!0),$(x,null,C(h.lockList,((e,l)=>(w(),U(G,{key:l,value:e.key,label:e.label},{default:y((()=>[L(q(e.label),1)])),_:2},1032,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label","rules"]),v(I,{label:e.$t("常用语言"),prop:"language",rules:[{required:!0,message:e.$t("请选择常用语言")}]},{default:y((()=>[v(M,{modelValue:h.form.language,"onUpdate:modelValue":c[8]||(c[8]=e=>h.form.language=e)},{default:y((()=>[(w(!0),$(x,null,C(h.languageList,(e=>(w(),U(K,{key:e.key,label:e.key,disabled:1==h.form.language.length&&h.form.language.includes(e.key)},{default:y((()=>[L(q(e.value),1)])),_:2},1032,["label","disabled"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label","rules"]),v(I,{label:e.$t("默认语言"),prop:"default_language",rules:[{required:!0,message:e.$t("请选择常用语言")}]},{default:y((()=>[v(H,{modelValue:h.form.default_language,"onUpdate:modelValue":c[9]||(c[9]=e=>h.form.default_language=e)},{default:y((()=>[(w(!0),$(x,null,C(T.defaultLanguageList,((e,l)=>(w(),U(G,{key:l,value:e.key,label:e.value},{default:y((()=>[L(q(e.value),1)])),_:2},1032,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label","rules"])])),_:1},8,["model"]),k("div",J,[v(Y,{size:"small",type:"info",onClick:T.getData},{default:y((()=>[L(q(e.$t("重置")),1)])),_:1},8,["onClick"]),v(Y,{size:"small",type:"primary",onClick:T.onSubmit,loading:h.loading},{default:y((()=>[L(q(e.$t("保存")),1)])),_:1},8,["onClick","loading"])]),h.open?(w(),U(Z,{key:0,open:h.open,openTitle:h.openTitle,cashierPassword:h.form.cashier_password,onClose:c[10]||(c[10]=e=>{h.open=!1,1==e&&this.getData()})},null,8,["open","openTitle","cashierPassword"])):P("",!0)])}],["__scopeId","data-v-1c677a84"]]);export{N as default};
