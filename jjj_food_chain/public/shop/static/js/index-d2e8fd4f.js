import{w as e,x as l,h as t,n as a,i as o,g as i,j as d,e as s}from"./element-plus-bf694ad1.js";import{P as r}from"./product-3e0140f0.js";import{u as m}from"./index-2ad583c4.js";import{_ as n}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as p,o as c,c as u,O as _,R as f,V as h,W as g,a as b,P as j,a7 as y,L as k,X as $}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";const{currency:V}=m(),v={class:"setting"},x={class:"max-w460 color-box"},C={key:0,class:"limit-list"},w={class:"limit-product-list"},D={key:0,class:"limit-product-box"},U={class:"limit-product-p"},q={class:"limit-product-p"},S={class:"common-button-wrapper"};const z=n({data:()=>({currency:V,loading:!1,form:{is_open:"1",tablet_end_time:null,is_buy_continue:"1",is_add_clock:"1",add_clock:[]},unDelete:!1}),mounted(){this.getData()},watch:{"form.add_clock":{handler(e){let l=0;e.map((e=>{"delete"!=e.action&&l++})),this.unDelete=1==l},deep:!0,immediate:!0}},methods:{getData(){let e=this;e.loading=!0,r.getSettingBuffet().then((l=>{e.loading=!1,this.form=l.data.vars.values,this.form.add_clock.map(((e,l)=>{this.form.add_clock[l].action="edit",this.form.add_clock[l].price=Number(e.price)})),this.form.tablet_end_time=Number(this.form.tablet_end_time)})).catch((l=>{e.loading=!1}))},onSubmit(){let e=this,l=JSON.parse(JSON.stringify(e.form));e.$refs.form.validate((t=>{t&&(e.loading=!0,r.setSettingBuffet(l,!0).then((l=>{e.loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"}),this.getData()})).catch((l=>{e.loading=!1})))}))},add(){this.form.add_clock.push({id:0,name:"",delay_time:null,price:null,action:"add"})},handleChange(){0==this.form.add_clock.length&&this.add()},handleDelete(e){let l=0;this.form.add_clock.map((e=>{"delete"!=e.action&&l++})),1!=l&&(0==this.form.add_clock[e].id?this.form.add_clock.splice(e,1):this.form.add_clock[e].action="delete")}}},[["render",function(r,m,n,V,z,M){const N=e,B=l,J=t,O=a,I=o,P=i,E=p("Delete"),G=d,L=s;return c(),u("div",v,[_(L,{class:"form-setting",size:"small",ref:"form",model:z.form,"label-position":"top"},{default:f((()=>[_(J,{label:r.$t("自助餐"),rules:[{required:!0,message:""}]},{default:f((()=>[_(B,{modelValue:z.form.is_open,"onUpdate:modelValue":m[0]||(m[0]=e=>z.form.is_open=e)},{default:f((()=>[_(N,{label:"1"},{default:f((()=>[h(g(r.$t("开")),1)])),_:1}),_(N,{label:"0"},{default:f((()=>[h(g(r.$t("关")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),_(J,{label:r.$t("平板结束时间提醒"),prop:"tablet_end_time",rules:[{required:!0,message:r.$t("请输入平板结束时间提醒")}]},{default:f((()=>[b("div",x,[_(O,{controls:!1,min:0,max:999,style:{width:"200px !important"},placeholder:r.$t("请输入平板结束时间提醒"),modelValue:z.form.tablet_end_time,"onUpdate:modelValue":m[1]||(m[1]=e=>z.form.tablet_end_time=e),modelModifiers:{number:!0}},null,8,["placeholder","modelValue"]),h(" "+g(r.$t("分")),1)])])),_:1},8,["label","rules"]),_(J,{label:r.$t("非自助餐商品到时继续选购"),rules:[{required:!0,message:""}]},{default:f((()=>[_(B,{modelValue:z.form.is_buy_continue,"onUpdate:modelValue":m[2]||(m[2]=e=>z.form.is_buy_continue=e)},{default:f((()=>[_(N,{label:"1"},{default:f((()=>[h(g(r.$t("开")),1)])),_:1}),_(N,{label:"0"},{default:f((()=>[h(g(r.$t("关")),1)])),_:1})])),_:1},8,["modelValue"])])),_:1},8,["label"]),_(J,{label:r.$t("加钟"),rules:[{required:!0,message:""}]},{default:f((()=>[_(B,{modelValue:z.form.is_add_clock,"onUpdate:modelValue":m[3]||(m[3]=e=>z.form.is_add_clock=e),onChange:M.handleChange},{default:f((()=>[_(N,{label:"1"},{default:f((()=>[h(g(r.$t("开")),1)])),_:1}),_(N,{label:"0"},{default:f((()=>[h(g(r.$t("关")),1)])),_:1})])),_:1},8,["modelValue","onChange"]),1==z.form.is_add_clock?(c(),u("div",C,[_(I,{type:"primary",onClick:M.add},{default:f((()=>[h(g(r.$t("添加")),1)])),_:1},8,["onClick"]),b("div",w,[(c(!0),u(j,null,y(z.form.add_clock,((e,l)=>(c(),u(j,{key:l},["delete"!=e.action?(c(),u("div",D,[_(J,{label:"",prop:"add_clock[".concat(l,"].name"),rules:[{required:!0,validator:()=>!!e.name,message:r.$t("请输入名称")}]},{default:f((()=>[_(P,{type:"text",style:{"margin-top":"16px","min-width":"160px"},modelValue:e.name,"onUpdate:modelValue":l=>e.name=l,placeholder:r.$t("名称")},null,8,["modelValue","onUpdate:modelValue","placeholder"])])),_:2},1032,["prop","rules"]),_(J,{label:"",prop:"add_clock[".concat(l,"].delay_time"),rules:[{required:!0,validator:()=>!!e.delay_time,message:r.$t("请输入时间")}]},{default:f((()=>[_(O,{controls:!1,min:0,max:999,style:{width:"160px !important","margin-top":"16px"},placeholder:r.$t("请输入时间"),modelValue:e.delay_time,"onUpdate:modelValue":l=>e.delay_time=l,modelModifiers:{number:!0}},null,8,["placeholder","modelValue","onUpdate:modelValue"])])),_:2},1032,["prop","rules"]),b("p",U,g(r.$t("分")),1),_(J,{label:"",prop:"add_clock[".concat(l,"].price"),rules:[{required:!0,validator:()=>!!e.price,message:r.$t("请输入价格")}]},{default:f((()=>[_(O,{controls:!1,min:0,max:999,style:{width:"160px !important","margin-top":"16px"},placeholder:r.$t("请输入价格"),modelValue:e.price,"onUpdate:modelValue":l=>e.price=l,modelModifiers:{number:!0}},null,8,["placeholder","modelValue","onUpdate:modelValue"])])),_:2},1032,["prop","rules"]),b("p",q,g(z.currency.unit),1),_(G,{class:k(["delete-icon",z.unDelete?"delete-icon-none":""]),onClick:e=>M.handleDelete(l)},{default:f((()=>[_(E)])),_:2},1032,["class","onClick"])])):$("",!0)],64)))),128))])])):$("",!0)])),_:1},8,["label"])])),_:1},8,["model"]),b("div",S,[_(I,{size:"small",onClick:M.getData},{default:f((()=>[h(g(r.$t("重置")),1)])),_:1},8,["onClick"]),_(I,{size:"small",type:"primary",onClick:M.onSubmit,loading:z.loading},{default:f((()=>[h(g(r.$t("保存")),1)])),_:1},8,["onClick","loading"])])])}],["__scopeId","data-v-95a781d5"]]);export{z as default};
