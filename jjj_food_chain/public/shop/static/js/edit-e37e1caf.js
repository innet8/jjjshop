import{E as t,i as e,e as o,v as r}from"./element-plus-d03e850c.js";import{P as i}from"./product-4cea8dc2.js";import a from"./Basic-50528f12.js";import s from"./Attr-7f001429.js";import d from"./Ingredients-1557e389.js";import m from"./Spec-a95e5286.js";import n from"./Content-b1c99a01.js";import p from"./Buyset-ae1d61d7.js";import{f as u}from"./index-0eefa19c.js";import{_ as c}from"./_plugin-vue_export-helper-1b428a4d.js";import{ag as l,$ as _,o as f,c as g,T as j,S as y,P as h,a as b,W as v,Y as S}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./Upload-6ce261c2.js";import"./file-1858a4ea.js";import"./vue-cropperjs-de120977.js";import"./vue-93bf25b5.js";import"./cropperjs-81999277.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";import"./UE-3be23654.js";const k={class:"product-add"},J={class:"common-button-wrapper"};const O=c({components:{Basic:a,Spec:m,Attr:s,Ingredients:d,Content:n,Buyset:p},data:()=>({old_audit:20,product_id:0,scene:"edit",loading:!0,save_loading:!1,form:{model:{},category:[],feed:[],attribute:[],unit:[],spec:[],labelList:[],special:[],gradeList:[],specData:null,isSpecLocked:!1,basicSetting:{},agentSetting:{},label_id:""},model:{product_name:"",category_id:null,image:[],selling_point:"",spec_type:10,deduct_stock_type:20,is_alone_grade:0,sku:[{product_price:"",stock_num:"",product_weight:"",cost_price:""}],product_attr:[],product_feed:[],min_buy:1,product_unit:"",content:"",product_status:10,sales_initial:0,product_sort:100,limit_num:0,special_id:"",is_points_gift:1,is_agent:0,is_ind_agent:0,agent_money_type:10,first_money:0,second_money:0,third_money:0,is_enable_grade:1,alone_grade_type:10,label_id:""}}),provide:function(){return{form:this.form}},created(){this.product_id=this.$route.query.product_id,this.scene=this.$route.query.scene,this.getData()},methods:{getData:function(){let t=this;i.storeGetEditData({product_id:t.product_id,scene:t.scene},!0).then((e=>{if(t.loading=!1,null!=e.data.model.alone_grade_equity&&void 0!==e.data.model.alone_grade_equity){let t=e.data.model.alone_grade_equity;e.data.gradeList.forEach((e=>{e.product_equity=t[e.grade_id]}))}Object.assign(t.form,e.data),t.form.model.product_status=e.data.model.product_status.value,t.form.model.product_name=JSON.parse(t.form.model.product_name),t.form.model.product_unit=JSON.parse(t.form.model.product_unit),t.form.model.sku.map(((e,o)=>{t.form.model.sku[o].spec_name=JSON.parse(e.spec_name)})),t.form.model.product_attr.map(((e,o)=>{t.form.model.product_attr[o].attribute_name=JSON.parse(e.attribute_name),e.attribute_value.map(((e,r)=>{t.form.model.product_attr[o].attribute_value[r]=JSON.parse(e)}))})),t.form.model.product_feed.map(((e,o)=>{t.form.model.product_feed[o].feed_name=JSON.parse(e.feed_name)}))})).catch((e=>{t.loading=!1}))},convertJson(t){let e={};return t.forEach((t=>{e[t.grade_id]=t.product_equity})),JSON.stringify(e)},onSubmit:function(){let e=this;e.$refs.form.validate((o=>{if(o){let o=u(e.model,e.form.model);o.scene=e.scene,o.image=e.ImgKeepId(o.image),o.product_id=e.product_id,o.sku=e.form.model.sku,o.alone_grade_equity=e.convertJson(e.form.gradeList),o.product_name=JSON.stringify(o.product_name),o.product_unit=JSON.stringify(o.product_unit),o.sku.map(((t,e)=>{o.sku[e].spec_name=JSON.stringify(t.spec_name)})),o.product_attr.map(((t,e)=>{o.product_attr[e].attribute_name=JSON.stringify(t.attribute_name),t.attribute_value.map(((t,r)=>{o.product_attr[e].attribute_value[r]=JSON.stringify(t)}))})),o.product_feed.map(((t,e)=>{o.product_feed[e].feed_name=JSON.stringify(t.feed_name)})),e.save_loading=!0,i.storeEditProduct({product_id:e.product_id,params:JSON.stringify(o)},!0).then((o=>{e.save_loading=!1,t({message:"保存成功",type:"success"}),e.cancelFunc()})).catch((t=>{e.save_loading=!1}))}}))},ImgKeepId(t){let e=[];for(let o=0,r=t.length;o<r;o++){let r={image_id:t[o].image_id,file_id:t[o].file_id};e.push(r)}return e},Draft(){this.form.model.product_status=30,this.onSubmit()},cancelFunc(){this.$router.back(-1)}}},[["render",function(t,i,a,s,d,m){const n=l("Basic"),p=l("Spec"),u=l("Attr"),c=l("Ingredients"),O=l("Buyset"),N=e,q=o,I=r;return _((f(),g("div",k,[d.loading?S("",!0):(f(),j(q,{key:0,size:"small",ref:"form",model:d.form,"label-position":"top","label-width":"180px"},{default:y((()=>[h(n),h(p),h(u),h(c),h(O),b("div",J,[h(N,{size:"small",type:"info",onClick:m.cancelFunc},{default:y((()=>[v("取消")])),_:1},8,["onClick"]),h(N,{size:"small",type:"primary",onClick:m.onSubmit,loading:d.loading},{default:y((()=>[v("修改")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]))])),[[I,d.loading]])}],["__scopeId","data-v-36b318ba"]]);export{O as default};
