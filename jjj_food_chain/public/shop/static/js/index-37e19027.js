import{g as e,h as a,w as l,x as s,p as o,q as t,i as r,r as d,s as i,e as u}from"./element-plus-bf694ad1.js";import{T as m}from"./terminal-285a959b.js";import n from"./setPassword-877cc90a.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as g,o as f,c,O as _,R as b,V as j,W as v,S as w,a as h,X as V,P as y,a7 as $,bm as k,bk as x}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-aac1ab8a.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const U={components:{setPassword:n},data:()=>({form:{is_wait_color:1,server:{ip:"",port:8080},language:[],default_language:"th",advanced_password:!1,wait_color:["",""]},input1:$t("10分钟"),input2:$t("20分钟及以上"),languageList:[],open:!1,loading:!1,password:""}),created(){this.getData()},computed:{defaultLanguageList(){let e=[];return this.languageList.map((a=>{(this.form.language||[]).includes(a.key)&&e.push(a),(this.form.language||[]).includes(this.form.default_language)||(this.form.default_language=this.form.language[0])})),e}},methods:{setPassword(){this.open=!0},getData(){let e=this;e.loading=!0,m.getKitchen().then((a=>{e.loading=!1,e.form=a.data.vars.values,e.languageList=a.data.vars.values.language_list,e.form.advanced_password&&(e.password=666666)})).catch((a=>{e.loading=!1}))},onSubmit(){let e=this,a=JSON.parse(JSON.stringify(e.form));e.loading=!0,m.saveKitchen(a,!0).then((a=>{e.loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"}),e.dialogFormVisible(!0)})).catch((a=>{e.loading=!1}))}}},q={class:"kitchen"},z=(e=>(k("data-v-889bb065"),e=e(),x(),e))((()=>h("p",null,":",-1))),C={class:"max-w460 color-box"},L={class:"max-w460 color-box"},P={class:"common-button-wrapper"};const S=p(U,[["render",function(m,n,p,k,x,U){const S=e,D=a,O=l,J=s,I=o,K=t,N=r,B=d,E=i,F=u,G=g("setPassword");return f(),c("div",q,[_(F,{size:"small",ref:"form",model:x.form,"label-position":"top"},{default:b((()=>[_(D,{label:m.$t("服务器连接地址"),prop:"server",rules:[{required:!0,message:m.$t("请输入服务器连接地址")}]},{default:b((()=>[_(S,{style:{width:"200px"},disabled:"",modelValue:x.form.server.ip,"onUpdate:modelValue":n[0]||(n[0]=e=>x.form.server.ip=e)},null,8,["modelValue"]),z,_(S,{style:{width:"100px"},disabled:"",modelValue:x.form.server.port,"onUpdate:modelValue":n[1]||(n[1]=e=>x.form.server.port=e)},null,8,["modelValue"])])),_:1},8,["label","rules"]),_(D,{label:m.$t("等待时长颜色："),rules:[{required:!0,message:""}]},{default:b((()=>[_(J,{modelValue:x.form.is_wait_color,"onUpdate:modelValue":n[2]||(n[2]=e=>x.form.is_wait_color=e)},{default:b((()=>[_(O,{label:"1"},{default:b((()=>[j(v(m.$t("开")),1)])),_:1}),_(O,{label:"0"},{default:b((()=>[j(v(m.$t("关")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),1==x.form.is_wait_color?(f(),w(D,{key:0,label:"",rules:[{required:!0,message:""}]},{default:b((()=>[h("div",C,[_(S,{modelValue:x.input1,"onUpdate:modelValue":n[3]||(n[3]=e=>x.input1=e),disabled:""},null,8,["modelValue"]),_(K,{modelValue:x.form.wait_color[0],"onUpdate:modelValue":n[4]||(n[4]=e=>x.form.wait_color[0]=e),size:"default"},{default:b((()=>[_(I,{value:"red",label:m.$t("红色")},{default:b((()=>[j(v(m.$t("红色")),1)])),_:1},8,["label"]),_(I,{value:"yellow",label:m.$t("黄色")},{default:b((()=>[j(v(m.$t("黄色")),1)])),_:1},8,["label"])])),_:1},8,["modelValue"])]),h("div",L,[_(S,{modelValue:x.input2,"onUpdate:modelValue":n[5]||(n[5]=e=>x.input2=e),disabled:""},null,8,["modelValue"]),_(K,{modelValue:x.form.wait_color[1],"onUpdate:modelValue":n[6]||(n[6]=e=>x.form.wait_color[1]=e),size:"default"},{default:b((()=>[_(I,{value:"red",label:m.$t("红色")},{default:b((()=>[j(v(m.$t("红色")),1)])),_:1},8,["label"]),_(I,{value:"yellow",label:m.$t("黄色")},{default:b((()=>[j(v(m.$t("黄色")),1)])),_:1},8,["label"])])),_:1},8,["modelValue"])])])),_:1})):V("",!0),_(D,{label:m.$t("高级设置密码"),prop:"password",rules:[{required:!0,message:""}]},{default:b((()=>[_(S,{class:"max-w460",modelValue:x.password,"onUpdate:modelValue":n[7]||(n[7]=e=>x.password=e),type:"password",disabled:""},null,8,["modelValue"]),_(N,{onClick:U.setPassword,type:"primary",link:"",size:"small"},{default:b((()=>[j(v(m.$t("设置密码")),1)])),_:1},8,["onClick"])])),_:1},8,["label"]),_(D,{label:m.$t("常用语言"),prop:"language",rules:[{required:!0,message:m.$t("请选择常用语言")}]},{default:b((()=>[_(E,{modelValue:x.form.language,"onUpdate:modelValue":n[8]||(n[8]=e=>x.form.language=e)},{default:b((()=>[(f(!0),c(y,null,$(x.languageList,(e=>(f(),w(B,{key:e.key,label:e.key,disabled:1==x.form.language.length&&x.form.language.includes(e.key)},{default:b((()=>[j(v(e.value),1)])),_:2},1032,["label","disabled"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label","rules"]),_(D,{label:m.$t("默认语言"),prop:"default_language",rules:[{required:!0,message:m.$t("请选择常用语言")}]},{default:b((()=>[_(K,{modelValue:x.form.default_language,"onUpdate:modelValue":n[9]||(n[9]=e=>x.form.default_language=e)},{default:b((()=>[(f(!0),c(y,null,$(U.defaultLanguageList,((e,a)=>(f(),w(I,{key:a,value:e.key,label:e.value},{default:b((()=>[j(v(e.value),1)])),_:2},1032,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["label","rules"])])),_:1},8,["model"]),h("div",P,[_(N,{size:"small",onClick:U.getData},{default:b((()=>[j(v(m.$t("重置")),1)])),_:1},8,["onClick"]),_(N,{size:"small",type:"primary",onClick:U.onSubmit,loading:x.loading},{default:b((()=>[j(v(m.$t("保存")),1)])),_:1},8,["onClick","loading"])]),x.open?(f(),w(G,{key:0,advancedPassword:x.form.advanced_password,open:x.open,onClose:n[10]||(n[10]=e=>{x.open=!1,1==e&&this.getData()})},null,8,["advancedPassword","open"])):V("",!0)])}],["__scopeId","data-v-889bb065"]]);export{S as default};