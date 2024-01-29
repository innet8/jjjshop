import{E as t,i as e,e as r}from"./element-plus-b01b3a31.js";import{P as i}from"./product-de68442e.js";import o from"./Basic-54344ef0.js";import a from"./Attr-9413f736.js";import s from"./Ingredients-2731763e.js";import n from"./Spec-bc5f016b.js";import d from"./Content-29719c42.js";import m from"./Buyset-4e0aab9d.js";import{l}from"./index-83830581.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as u,o as c,c as _,P as f,S as g,a as j,W as h,X as y}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./Upload-612e4aea.js";import"./file-9314bf99.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./UE-129a1c2c.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const b=JSON.stringify(l().languageData),v={class:"product-add"},S={class:"product-form-flex"},J={class:"common-button-wrapper"};const N=p({components:{Basic:o,Spec:n,Attr:a,Ingredients:s,Content:d,Buyset:m},data:()=>({loading:!1,active:!1,form:{model:{product_name:JSON.parse(b),category_id:null,image:[],selling_point:"",spec_type:10,deduct_stock_type:20,is_alone_grade:0,sku:[{spec_name:{th:"",zh:"",zhtw:"",en:""},product_price:null,stock_num:null,product_weight:"",cost_price:0}],product_attr:[],product_feed:[],min_buy:1,product_unit:JSON.parse(b),content:"",product_status:10,sales_initial:0,product_sort:null,limit_num:0,special_id:"",is_points_gift:1,is_agent:0,is_ind_agent:0,agent_money_type:10,first_money:0,second_money:0,third_money:0,is_enable_grade:1,alone_grade_type:10,label_id:""},category:[],feed:[],attribute:[],unit:[],spec:[],labelList:[],special:[],delivery:[],gradeList:[],specData:null,basicSetting:{},agentSetting:{}}}),provide:function(){return{form:this.form}},created(){this.getBaseData()},methods:{getBaseData:function(){let t=this;i.storeGetBaseData({},!0).then((e=>{t.loading=!1,Object.assign(t.form,e.data)})).catch((e=>{t.loading=!1}))},convertJson(t){let e={};return t.forEach((t=>{e[t.grade_id]=t.product_equity})),JSON.stringify(e)},validateField(t){this.$refs.form.validateField(t)},onSubmit:function(){let e=this;e.$refs.form.validate((r=>{let o=!1;if(e.form.model.product_attr.length>0){e.$refs.AttrRef.checkedForm();let t=e.form.model.product_attr;for(let e=0;e<t.length;e++){t[e].attribute_name.en&&t[e].attribute_name.th&&t[e].attribute_name.zh&&t[e].attribute_name.zhtw||(o=!0);for(let r=0;r<t[e].attribute_value.length;r++)t[e].attribute_value[r].en&&t[e].attribute_value[r].th&&t[e].attribute_value[r].zh&&t[e].attribute_value[r].zhtw||(o=!0)}}if(e.form.model.product_feed.length>0){e.$refs.IngredientsRef.checkedForm();let t=e.form.model.product_feed;for(let e=0;e<t.length;e++)t[e].feed_name.en&&t[e].feed_name.th&&t[e].feed_name.zh&&t[e].feed_name.zhtw&&t[e].price||(o=!0)}if(!o&&r){let r={};r=JSON.parse(JSON.stringify(e.form.model)),r.product_name=JSON.stringify(r.product_name),r.product_unit=JSON.stringify(r.product_unit),r.sku.map(((t,e)=>{r.sku[e].spec_name=JSON.stringify(t.spec_name)})),r.product_attr.map(((t,e)=>{r.product_attr[e].attribute_name=JSON.stringify(t.attribute_name),t.attribute_value.map(((t,i)=>{r.product_attr[e].attribute_value[i]=JSON.stringify(t)}))})),r.product_feed.map(((t,e)=>{r.product_feed[e].feed_name=JSON.stringify(t.feed_name)})),"object"==typeof r.category_id&&r.category_id&&(r.category_id=Number(r.category_id[r.category_id.length-1])),e.loading=!0,r.alone_grade_equity=e.convertJson(e.form.gradeList),i.storeAddProduct({params:JSON.stringify(r)},!0).then((r=>{e.loading=!1,t({message:"添加成功",type:"success"}),e.$router.push("/product/store/product/index")})).catch((t=>{e.loading=!1}))}}))},Draft(){this.form.model.product_status=30,this.onSubmit()},cancelFunc(){this.$router.back(-1)}}},[["render",function(t,i,o,a,s,n){const d=u("Basic"),m=u("Spec"),l=u("Attr"),p=u("Ingredients"),b=u("Buyset"),N=e,O=r;return c(),_("div",v,[f(O,{size:"small",ref:"form",class:"product-form",model:s.form,"label-position":"top","label-width":"180px"},{default:g((()=>[j("div",S,[f(d,{onValidateField:n.validateField},null,8,["onValidateField"]),f(m),f(l,{ref:"AttrRef"},null,512),f(p,{ref:"IngredientsRef"},null,512),f(b)]),j("div",J,[f(N,{size:"small",type:"info",onClick:n.cancelFunc},{default:g((()=>[h(y(t.$t("取消")),1)])),_:1},8,["onClick"]),f(N,{size:"small",type:"primary",onClick:n.onSubmit,loading:s.loading},{default:g((()=>[h(y(t.$t("发布")),1)])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}],["__scopeId","data-v-73356b99"]]);export{N as default};