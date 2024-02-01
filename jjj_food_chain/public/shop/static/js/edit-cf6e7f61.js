import{i as e,e as t,v as r}from"./element-plus-33e0d8cc.js";import{P as i}from"./product-f7014bea.js";import o from"./Basic-5f55e0e2.js";import a from"./Attr-80b876b0.js";import s from"./Ingredients-794ac349.js";import d from"./Spec-bb9ec2c0.js";import n from"./Content-d3103beb.js";import m from"./Buyset-f97edfac.js";import{f as l}from"./index-2a70ce31.js";import{_ as p}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as u,$ as c,o as _,c as f,T as g,S as y,a as h,P as j,W as b,X as S,Y as v}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./Upload-423c9ce2.js";import"./file-43fcf892.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./UE-7315747a.js";const J={class:"product-add"},N={class:"product-form-flex"},O={class:"common-button-wrapper"};const k=p({components:{Basic:o,Spec:d,Attr:a,Ingredients:s,Content:n,Buyset:m},data:()=>({old_audit:20,product_id:0,scene:"edit",loading:!0,save_loading:!1,form:{model:{},category:[],feed:[],attribute:[],unit:[],spec:[],labelList:[],special:[],gradeList:[],specData:null,isSpecLocked:!1,basicSetting:{},agentSetting:{},label_id:""},model:{product_name:"",category_id:null,image:[],selling_point:"",spec_type:10,deduct_stock_type:20,is_alone_grade:0,sku:[{product_price:"",stock_num:"",product_weight:"",cost_price:""}],product_attr:[],product_feed:[],min_buy:1,product_unit:"",content:"",product_status:10,sales_initial:0,product_sort:null,limit_num:0,special_id:"",is_points_gift:1,is_agent:0,is_ind_agent:0,agent_money_type:10,first_money:0,second_money:0,third_money:0,is_enable_grade:1,alone_grade_type:10,label_id:""}}),provide:function(){return{form:this.form}},created(){this.product_id=this.$route.query.product_id,this.scene=this.$route.query.scene,this.getData()},methods:{getData:function(){let e=this;i.storeGetEditData({product_id:e.product_id,scene:e.scene},!0).then((t=>{if(e.loading=!1,null!=t.data.model.alone_grade_equity&&void 0!==t.data.model.alone_grade_equity){let e=t.data.model.alone_grade_equity;t.data.gradeList.forEach((t=>{t.product_equity=e[t.grade_id]}))}Object.assign(e.form,t.data),e.form.model.product_status=t.data.model.product_status.value,e.form.model.product_name=JSON.parse(e.form.model.product_name),e.form.model.product_unit=JSON.parse(e.form.model.product_unit),e.form.model.sku.map(((t,r)=>{e.form.model.sku[r].spec_name=JSON.parse(t.spec_name)})),e.form.model.product_attr.map(((t,r)=>{e.form.model.product_attr[r].attribute_name=JSON.parse(t.attribute_name),t.attribute_value.map(((t,i)=>{e.form.model.product_attr[r].attribute_value[i]=JSON.parse(t)}))})),e.form.model.product_feed.map(((t,r)=>{e.form.model.product_feed[r].feed_name=JSON.parse(t.feed_name)}))})).catch((t=>{e.loading=!1}))},convertJson(e){let t={};return e.forEach((e=>{t[e.grade_id]=e.product_equity})),JSON.stringify(t)},validateField(e){this.$refs.form.validateField(e)},onSubmit:function(){let e=this;e.$refs.form.validate((t=>{if(e.form.model.product_attr.length>0&&e.$refs.AttrRef.checkedForm(),e.form.model.product_feed.length>0&&e.$refs.IngredientsRef.checkedForm(),e.form.model.product_attr.length>0){let t=e.form.model.product_attr;for(let e=0;e<t.length;e++){if(""==t[e].attribute_name.en||""==t[e].attribute_name.th||""==t[e].attribute_name.zh||""==t[e].attribute_name.zhtw)return;for(let r=0;r<t[e].attribute_value.length;r++)if(""==t[e].attribute_value[r].en||""==t[e].attribute_value[r].th||""==t[e].attribute_value[r].zh||""==t[e].attribute_value[r].zhtw)return}}if(e.form.model.product_feed.length>0){let t=e.form.model.product_feed;for(let e=0;e<t.length;e++)if(""==t[e].feed_name.en||""==t[e].feed_name.th||""==t[e].feed_name.zh||""==t[e].feed_name.zhtw||""==t[e].price||null==t[e].price)return}if(t){let t=l(JSON.parse(JSON.stringify(e.model)),JSON.parse(JSON.stringify(e.form.model)));t.scene=JSON.parse(JSON.stringify(e.scene)),t.image=JSON.parse(JSON.stringify(e.ImgKeepId(t.image))),t.product_id=JSON.parse(JSON.stringify(e.product_id)),t.sku=JSON.parse(JSON.stringify(e.form.model.sku)),t.alone_grade_equity=JSON.parse(JSON.stringify(e.convertJson(e.form.gradeList))),t.product_name=JSON.stringify(t.product_name),t.product_unit=JSON.stringify(t.product_unit),t.sku.map(((e,r)=>{t.sku[r].spec_name=JSON.stringify(e.spec_name)})),t.product_attr.map(((e,r)=>{t.product_attr[r].attribute_name=JSON.stringify(e.attribute_name),e.attribute_value.map(((e,i)=>{t.product_attr[r].attribute_value[i]=JSON.stringify(e)}))})),t.product_feed.map(((e,r)=>{t.product_feed[r].feed_name=JSON.stringify(e.feed_name)})),"object"==typeof t.category_id&&t.category_id&&(t.category_id=Number(t.category_id[t.category_id.length-1])),e.save_loading=!0,i.storeEditProduct({product_id:e.product_id,params:JSON.stringify(t)},!0).then((t=>{e.save_loading=!1,this.$ElMessage({message:"保存成功",type:"success"}),e.cancelFunc()})).catch((t=>{e.save_loading=!1}))}}))},ImgKeepId(e){let t=[];for(let r=0,i=e.length;r<i;r++){let i={image_id:e[r].image_id,file_id:e[r].file_id};t.push(i)}return t},Draft(){this.form.model.product_status=30,this.onSubmit()},cancelFunc(){this.$router.back(-1)}}},[["render",function(i,o,a,s,d,n){const m=u("Basic"),l=u("Spec"),p=u("Attr"),k=u("Ingredients"),z=u("Buyset"),$=e,F=t,I=r;return c((_(),f("div",J,[d.loading?v("",!0):(_(),g(F,{key:0,size:"small",ref:"form",model:d.form,class:"product-form","label-position":"top","label-width":"180px"},{default:y((()=>[h("div",N,[j(m,{onValidateField:n.validateField},null,8,["onValidateField"]),j(l),j(p,{ref:"AttrRef"},null,512),j(k,{ref:"IngredientsRef"},null,512),j(z)]),h("div",O,[j($,{size:"small",type:"info",onClick:n.cancelFunc},{default:y((()=>[b(S(i.$t("取消")),1)])),_:1},8,["onClick"]),j($,{size:"small",type:"primary",onClick:n.onSubmit,loading:d.loading},{default:y((()=>[b(S(i.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]))])),[[I,d.loading]])}],["__scopeId","data-v-984817db"]]);export{k as default};