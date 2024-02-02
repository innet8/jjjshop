import{m as e,n as a,h as l,g as s,j as o,o as t,w as r,x as i,i as d,r as u,s as p,p as m,q as n,e as f,v as g}from"./element-plus-c8084613.js";import{f as c}from"./upLoad-335f5ee0.js";import _ from"./setPassword-deee839b.js";import{T as b}from"./terminal-08500a3f.js";import{_ as h}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as v,o as j,c as w,O as V,R as y,a as $,_ as k,S as x,V as U,W as L,P,a7 as q,X as z}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-d58cf75c.js";import"./index-9a4df717.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const C={components:{flieUpload:c,setPassword:_},data:()=>({form:{carousel:[],is_auto_send:0,auto_lock_screen:300,language:[],default_language:"th",advanced_password:!1,server:{ip:"",port:""}},languageList:[],open:!1,loading:!1,password:""}),created(){this.getData()},computed:{defaultLanguageList(){let e=[];return this.languageList.map((a=>{(this.form.language||[]).includes(a.key)&&e.push(a),(this.form.language||[]).includes(this.form.default_language)||(this.form.default_language=this.form.language[0])})),e}},methods:{setPassword(){this.open=!0},onSubmit(){let e=this;this.$refs["form-item"].validate();for(let l=0;l<e.form.carousel.length;l++)if(null==e.form.carousel[l].sort)return;this.sortOne();let a=JSON.parse(JSON.stringify(e.form));e.loading=!0,b.saveTablet(a,!0).then((a=>{e.loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"}),e.dialogFormVisible(!0)})).catch((a=>{e.loading=!1}))},getData(){let e=this;e.loading=!0,b.getTablet().then((a=>{e.loading=!1,e.form=a.data.vars.values,e.languageList=a.data.vars.values.language_list,e.form.advanced_password&&(e.password=666666)})).catch((a=>{e.loading=!1}))},upLoad(e){var a="";e.file_type.includes("video")&&(a="video"),e.file_type.includes("image")&&(a="image"),this.form.carousel.push({real_name:e.real_name,file_path:e.file_path,sort:0,type:a})},deleteOne(e){this.form.carousel.splice(e.$index,1),this.form.carousel.sort(((e,a)=>e.sort-a.sort))},sortOne(){this.form.carousel.sort(((e,a)=>e.sort-a.sort))}}},M={class:"salb"},O={class:"draggable-list"},S={class:"delete-box"},D=$("p",null,":",-1),E={class:"common-button-wrapper"};const G=h(C,[["render",function(c,_,b,h,C,G){const J=v("flieUpload"),N=e,T=a,B=l,F=s,A=v("Delete"),I=o,R=t,W=r,X=i,H=d,K=u,Q=p,Y=m,Z=n,ee=f,ae=v("setPassword"),le=g;return j(),w("div",M,[V(ee,{size:"small",ref:"form",model:C.form,"label-position":"top"},{default:y((()=>[V(B,{label:c.$t("轮播内容"),prop:"carousel",rules:[{required:!0,message:""}]},{default:y((()=>[$("div",O,[V(J,{onUpLoad:G.upLoad,imgSize:2,videoSize:10,tips1:c.$t("图片：支持JPG、JPEG、PNG格式，小于2MB，尺寸：1160*1104px"),tips2:c.$t("视频：支持AVI、MPEG、MOV、MP4格式，小于10MB，尺寸：1160*1104px")},null,8,["onUpLoad","tips1","tips2"]),k((j(),x(R,{size:"small",data:C.form.carousel,border:"",style:{width:"100%"}},{default:y((()=>[V(N,{prop:"real_name",label:c.$t("图片名称")},null,8,["label"]),V(N,{prop:"sort",label:c.$t("排序")},{default:y((e=>[V(B,{ref:"form-item",style:{"margin-top":"16px"},rules:[{required:!0,validator:()=>e.row.sort>=0&&"number"==typeof e.row.sort,message:c.$t("请输入排序")}],prop:"scope.row.sort"},{default:y((()=>[V(T,{controls:!1,min:0,max:999,placeholder:c.$t("接近0，排序等級越高"),modelValue:e.row.sort,"onUpdate:modelValue":a=>e.row.sort=a,modelModifiers:{number:!0}},null,8,["placeholder","modelValue","onUpdate:modelValue"])])),_:2},1032,["rules"])])),_:1},8,["label"]),V(N,{prop:"file_path",label:c.$t("链接地址")},{default:y((e=>[V(F,{modelValue:e.row.file_path,"onUpdate:modelValue":a=>e.row.file_path=a,disabled:""},null,8,["modelValue","onUpdate:modelValue"])])),_:1},8,["label"]),V(N,{prop:"file_path",width:"100",label:c.$t("操作")},{default:y((e=>[$("div",S,[V(I,{size:"24"},{default:y((()=>[V(A,{onClick:a=>G.deleteOne(e)},null,8,["onClick"])])),_:2},1024)])])),_:1},8,["label"])])),_:1},8,["data"])),[[le,C.loading]])])])),_:1},8,["label"]),V(B,{label:c.$t("呼叫服务员："),rules:[{required:!0,message:""}]},{default:y((()=>[V(X,{modelValue:C.form.is_call_service,"onUpdate:modelValue":_[0]||(_[0]=e=>C.form.is_call_service=e)},{default:y((()=>[V(W,{label:"1"},{default:y((()=>[U(L(c.$t("开")),1)])),_:1}),V(W,{label:"0"},{default:y((()=>[U(L(c.$t("关")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),V(B,{label:c.$t("顾客可开桌："),rules:[{required:!0,message:""}]},{default:y((()=>[V(X,{modelValue:C.form.is_customer_order,"onUpdate:modelValue":_[1]||(_[1]=e=>C.form.is_customer_order=e)},{default:y((()=>[V(W,{label:"1"},{default:y((()=>[U(L(c.$t("开")),1)])),_:1}),V(W,{label:"0"},{default:y((()=>[U(L(c.$t("关")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),V(B,{label:c.$t("服务器连接地址"),prop:"server",rules:[{required:!0,message:c.$t("请输入服务器连接地址")}]},{default:y((()=>[V(F,{style:{width:"200px"},disabled:"",modelValue:C.form.server.ip,"onUpdate:modelValue":_[2]||(_[2]=e=>C.form.server.ip=e)},null,8,["modelValue"]),D,V(F,{style:{width:"100px"},disabled:"",modelValue:C.form.server.port,"onUpdate:modelValue":_[3]||(_[3]=e=>C.form.server.port=e)},null,8,["modelValue"])])),_:1},8,["label","rules"]),V(B,{label:c.$t("高级设置密码"),prop:"password",rules:[{required:!0,message:""}]},{default:y((()=>[V(F,{class:"max-w460",modelValue:C.password,"onUpdate:modelValue":_[4]||(_[4]=e=>C.password=e),type:"password",disabled:""},null,8,["modelValue"]),V(H,{onClick:G.setPassword,type:"primary",link:"",size:"small"},{default:y((()=>[U(L(c.$t("设置密码")),1)])),_:1},8,["onClick"])])),_:1},8,["label"]),V(B,{label:c.$t("常用语言"),prop:"language",rules:[{required:!0,message:c.$t("请选择常用语言")}]},{default:y((()=>[V(Q,{modelValue:C.form.language,"onUpdate:modelValue":_[5]||(_[5]=e=>C.form.language=e)},{default:y((()=>[(j(!0),w(P,null,q(C.languageList,(e=>(j(),x(K,{key:e.key,label:e.key,disabled:1==C.form.language.length&&C.form.language.includes(e.key)},{default:y((()=>[U(L(e.value),1)])),_:2},1032,["label","disabled"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label","rules"]),V(B,{label:c.$t("默认语言"),prop:"default_language",rules:[{required:!0,message:c.$t("请选择常用语言")}]},{default:y((()=>[V(Z,{modelValue:C.form.default_language,"onUpdate:modelValue":_[6]||(_[6]=e=>C.form.default_language=e)},{default:y((()=>[(j(!0),w(P,null,q(G.defaultLanguageList,((e,a)=>(j(),x(Y,{key:a,value:e.key,label:e.value},{default:y((()=>[U(L(e.value),1)])),_:2},1032,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label","rules"])])),_:1},8,["model"]),$("div",E,[V(H,{size:"small",type:"info",onClick:_[7]||(_[7]=e=>G.getData())},{default:y((()=>[U(L(c.$t("重置")),1)])),_:1}),V(H,{size:"small",type:"primary",onClick:G.onSubmit,loading:C.loading},{default:y((()=>[U(L(c.$t("保存")),1)])),_:1},8,["onClick","loading"])]),C.open?(j(),x(ae,{key:0,advancedPassword:C.form.advanced_password,open:C.open,onClose:_[8]||(_[8]=e=>{C.open=!1,1==e&&this.getData()})},null,8,["advancedPassword","open"])):z("",!0)])}]]);export{G as default};