import{m as e,n as a,h as l,g as s,j as o,o as t,w as r,x as d,i,r as u,s as m,p,q as n,e as f,v as g}from"./element-plus-bf694ad1.js";import{f as c}from"./upLoad-34ff9862.js";import _ from"./setPassword-0d87bd4f.js";import{T as b}from"./terminal-bb8e37e4.js";import{_ as h}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as v,o as j,c as w,a as V,O as y,R as $,_ as k,S as x,L as U,V as L,W as P,P as q,a7 as z,X as C,bm as O,bk as M}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-2652919b.js";import"./index-191c97f6.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const S={components:{flieUpload:c,setPassword:_},data:()=>({form:{carousel:[],is_auto_send:0,auto_lock_screen:300,language:[],default_language:"th",advanced_password:!1,server:{ip:"",port:""}},languageList:[],open:!1,loading:!1,password:""}),created(){this.getData()},computed:{defaultLanguageList(){let e=[];return this.languageList.map((a=>{(this.form.language||[]).includes(a.key)&&e.push(a),(this.form.language||[]).includes(this.form.default_language)||(this.form.default_language=this.form.language[0])})),e}},methods:{setPassword(){this.open=!0},onSubmit(){let e=this;this.$refs["form-item"]&&this.$refs["form-item"].validate();for(let l=0;l<e.form.carousel.length;l++)if(null==e.form.carousel[l].sort)return;this.sortOne();let a=JSON.parse(JSON.stringify(e.form));e.loading=!0,b.saveTablet(a,!0).then((a=>{e.loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"}),e.dialogFormVisible(!0)})).catch((a=>{e.loading=!1}))},getData(){let e=this;e.loading=!0,b.getTablet().then((a=>{e.loading=!1,e.form=a.data.vars.values,e.languageList=a.data.vars.values.language_list,e.form.advanced_password&&(e.password=666666)})).catch((a=>{e.loading=!1}))},upLoad(e){var a="";e.file_type.includes("video")&&(a="video"),e.file_type.includes("image")&&(a="image"),this.form.carousel.push({real_name:e.real_name,file_path:e.file_path,sort:0,type:a})},deleteOne(e){1!=this.form.carousel.length&&(this.form.carousel.splice(e.$index,1),this.form.carousel.sort(((e,a)=>e.sort-a.sort)))},sortOne(){this.form.carousel.sort(((e,a)=>e.sort-a.sort))}}},D={class:"salb"},G={class:"form-div"},J={class:"draggable-list"},B=(e=>(O("data-v-d3714522"),e=e(),M(),e))((()=>V("p",null,":",-1))),E={class:"common-button-wrapper"};const I=h(S,[["render",function(c,_,b,h,O,M){const S=v("flieUpload"),I=e,N=a,T=l,A=s,F=v("Delete"),Q=o,R=t,W=r,X=d,H=i,K=u,Y=m,Z=p,ee=n,ae=f,le=v("setPassword"),se=g;return j(),w("div",D,[V("div",G,[y(ae,{size:"small",ref:"form",model:O.form,"label-position":"top"},{default:$((()=>[y(T,{label:c.$t("轮播内容"),prop:"carousel",rules:[{required:!0,message:""}]},{default:$((()=>[V("div",J,[y(S,{onUpLoad:M.upLoad,imgSize:2,videoSize:10,tips1:c.$t("图片：支持JPG、JPEG、PNG格式，小于2MB，尺寸：1160*1104px"),tips2:c.$t("视频：支持AVI、MPEG、MOV、MP4格式，小于10MB，尺寸：1160*1104px")},null,8,["onUpLoad","tips1","tips2"]),k((j(),x(R,{size:"small",data:O.form.carousel,border:"",style:{width:"100%"}},{default:$((()=>[y(I,{prop:"real_name",label:c.$t("图片名称")},null,8,["label"]),y(I,{prop:"sort",label:c.$t("排序")},{default:$((e=>[y(T,{ref:"form-item",style:{"margin-top":"16px"},rules:[{required:!0,validator:()=>e.row.sort>=0&&"number"==typeof e.row.sort,message:c.$t("请输入排序")}],prop:"scope.row.sort"},{default:$((()=>[y(N,{controls:!1,min:0,max:999,placeholder:c.$t("接近0，排序等级越高"),modelValue:e.row.sort,"onUpdate:modelValue":a=>e.row.sort=a,modelModifiers:{number:!0}},null,8,["placeholder","modelValue","onUpdate:modelValue"])])),_:2},1032,["rules"])])),_:1},8,["label"]),y(I,{prop:"file_path",label:c.$t("链接地址")},{default:$((e=>[y(A,{modelValue:e.row.file_path,"onUpdate:modelValue":a=>e.row.file_path=a,disabled:""},null,8,["modelValue","onUpdate:modelValue"])])),_:1},8,["label"]),y(I,{prop:"file_path",width:"100",label:c.$t("操作")},{default:$((e=>[V("div",{class:U(["delete-box",1==O.form.carousel.length?"delete-box-one":""])},[y(Q,{size:"24"},{default:$((()=>[y(F,{onClick:a=>M.deleteOne(e)},null,8,["onClick"])])),_:2},1024)],2)])),_:1},8,["label"])])),_:1},8,["data"])),[[se,O.loading]])])])),_:1},8,["label"]),y(T,{label:c.$t("呼叫服务员："),rules:[{required:!0,message:""}]},{default:$((()=>[y(X,{modelValue:O.form.is_call_service,"onUpdate:modelValue":_[0]||(_[0]=e=>O.form.is_call_service=e)},{default:$((()=>[y(W,{label:"1"},{default:$((()=>[L(P(c.$t("开")),1)])),_:1}),y(W,{label:"0"},{default:$((()=>[L(P(c.$t("关")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),y(T,{label:c.$t("顾客可开桌："),rules:[{required:!0,message:""}]},{default:$((()=>[y(X,{modelValue:O.form.is_customer_order,"onUpdate:modelValue":_[1]||(_[1]=e=>O.form.is_customer_order=e)},{default:$((()=>[y(W,{label:"1"},{default:$((()=>[L(P(c.$t("开")),1)])),_:1}),y(W,{label:"0"},{default:$((()=>[L(P(c.$t("关")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),y(T,{label:c.$t("服务器连接地址"),prop:"server",rules:[{required:!0,message:c.$t("请输入服务器连接地址")}]},{default:$((()=>[y(A,{style:{width:"200px"},disabled:"",modelValue:O.form.server.ip,"onUpdate:modelValue":_[2]||(_[2]=e=>O.form.server.ip=e)},null,8,["modelValue"]),B,y(A,{style:{width:"100px"},disabled:"",modelValue:O.form.server.port,"onUpdate:modelValue":_[3]||(_[3]=e=>O.form.server.port=e)},null,8,["modelValue"])])),_:1},8,["label","rules"]),y(T,{label:c.$t("高级设置密码"),prop:"password",rules:[{required:!0,message:""}]},{default:$((()=>[y(A,{class:"max-w460",modelValue:O.password,"onUpdate:modelValue":_[4]||(_[4]=e=>O.password=e),type:"password",disabled:""},null,8,["modelValue"]),y(H,{onClick:M.setPassword,type:"primary",link:"",size:"small"},{default:$((()=>[L(P(c.$t("设置密码")),1)])),_:1},8,["onClick"])])),_:1},8,["label"]),y(T,{label:c.$t("常用语言"),prop:"language",rules:[{required:!0,message:c.$t("请选择常用语言")}]},{default:$((()=>[y(Y,{modelValue:O.form.language,"onUpdate:modelValue":_[5]||(_[5]=e=>O.form.language=e)},{default:$((()=>[(j(!0),w(q,null,z(O.languageList,(e=>(j(),x(K,{key:e.key,label:e.key,disabled:1==O.form.language.length&&O.form.language.includes(e.key)},{default:$((()=>[L(P(e.value),1)])),_:2},1032,["label","disabled"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label","rules"]),y(T,{label:c.$t("默认语言"),prop:"default_language",rules:[{required:!0,message:c.$t("请选择常用语言")}]},{default:$((()=>[y(ee,{modelValue:O.form.default_language,"onUpdate:modelValue":_[6]||(_[6]=e=>O.form.default_language=e)},{default:$((()=>[(j(!0),w(q,null,z(M.defaultLanguageList,((e,a)=>(j(),x(Z,{key:a,value:e.key,label:e.value},{default:$((()=>[L(P(e.value),1)])),_:2},1032,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label","rules"])])),_:1},8,["model"])]),V("div",E,[y(H,{size:"small",onClick:_[7]||(_[7]=e=>M.getData())},{default:$((()=>[L(P(c.$t("重置")),1)])),_:1}),y(H,{size:"small",type:"primary",onClick:M.onSubmit,loading:O.loading},{default:$((()=>[L(P(c.$t("保存")),1)])),_:1},8,["onClick","loading"])]),O.open?(j(),x(le,{key:0,advancedPassword:O.form.advanced_password,open:O.open,onClose:_[8]||(_[8]=e=>{O.open=!1,1==e&&this.getData()})},null,8,["advancedPassword","open"])):C("",!0)])}],["__scopeId","data-v-d3714522"]]);export{I as default};
