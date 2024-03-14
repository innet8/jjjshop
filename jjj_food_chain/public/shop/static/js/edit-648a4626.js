import{i as e,e as t,v as r}from"./element-plus-bf694ad1.js";import{P as o}from"./product-8551b9b8.js";import i from"./Basic-288f01dc.js";import s from"./Attr-9ff6a1c5.js";import a from"./Ingredients-43916765.js";import d from"./Spec-129ab441.js";import n from"./Content-8b7ae52c.js";import p from"./Buyset-669bdb8b.js";import{l as m,f as l}from"./index-a3618bf6.js";import{_ as u}from"./_plugin-vue_export-helper-1b428a4d.js";import{af as c,_,o as f,c as g,S as y,R as j,a as h,O as S,V as b,W as v,X as J}from"./@vue-b57a05a6.js";import"./lodash-es-234e1c00.js";import"./async-validator-cf877c1f.js";import"./@vueuse-793cab0b.js";import"./@element-plus-ce7ae957.js";import"./dayjs-33a066dd.js";import"./call-bind-912d4e9d.js";import"./get-intrinsic-878e88ff.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-a0a50b12.js";import"./define-data-property-da2cc9a9.js";import"./has-property-descriptors-2aeb73fe.js";import"./gopd-15a2da42.js";import"./@popperjs-b78c3215.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./Upload-b61de60d.js";import"./file-093764b6.js";import"./vue-cropperjs-a45f7801.js";import"./vue-944abb17.js";import"./cropperjs-86d7592f.js";import"./vue-router-24c2a4a1.js";import"./pinia-6eed225f.js";import"./axios-b48e0a85.js";import"./qs-49804a56.js";import"./side-channel-7f79a019.js";import"./object-inspect-9ade9731.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-5c153e91.js";import"./vue-i18n-8b8412df.js";import"./@intlify-658c8624.js";import"./UE-4f52f72c.js";const O=JSON.stringify(m().languageData),N=m().languageList,k={class:"product-add"},F={class:"product-form-flex"},I={class:"common-button-wrapper"};const $=u({components:{Basic:i,Spec:d,Attr:s,Ingredients:a,Content:n,Buyset:p},data:()=>({old_audit:20,product_id:0,scene:"edit",loading:!0,save_loading:!1,form:{model:{},category:[],feed:[],attribute:[],unit:[],spec:[],labelList:[],special:[],gradeList:[],specData:null,isSpecLocked:!1,basicSetting:{},agentSetting:{},label_id:""},model:{product_name:"",category_id:null,image:[],selling_point:"",spec_type:10,deduct_stock_type:20,is_alone_grade:0,sku:[{product_price:"",stock_num:"",product_weight:"",cost_price:""}],product_attr:[],product_feed:[],min_buy:1,product_unit:"",content:"",product_status:10,is_show_tablet:1,is_show_kitchen:1,sales_initial:0,product_sort:null,limit_num:0,special_id:"",is_points_gift:1,is_agent:0,is_ind_agent:0,agent_money_type:10,first_money:0,second_money:0,third_money:0,is_enable_grade:1,alone_grade_type:10,label_id:""}}),provide:function(){return{form:this.form}},created(){this.product_id=this.$route.query.product_id,this.scene=this.$route.query.scene,this.getData()},methods:{getData:function(){let e=this;o.storeGetEditData({product_id:e.product_id,scene:e.scene},!0).then((t=>{if(e.loading=!1,null!=t.data.model.alone_grade_equity&&void 0!==t.data.model.alone_grade_equity){let e=t.data.model.alone_grade_equity;t.data.gradeList.forEach((t=>{t.product_equity=e[t.grade_id]}))}Object.assign(e.form,t.data),e.form.model.product_status=t.data.model.product_status.value,e.form.model.product_name=JSON.parse(e.form.model.product_name),e.form.model.product_unit=JSON.parse(e.form.model.product_unit),0==e.form.model.special_id&&(e.form.model.special_id=""),e.form.model.sku.map(((t,r)=>{t.spec_name?e.form.model.sku[r].spec_name=JSON.parse(t.spec_name):e.form.model.sku[r].spec_name=JSON.parse(O)})),e.form.model.product_attr.map(((t,r)=>{e.form.model.product_attr[r].attribute_name=JSON.parse(t.attribute_name),t.attribute_value.map(((t,o)=>{e.form.model.product_attr[r].attribute_value[o]=JSON.parse(t)}))})),e.form.model.product_feed.map(((t,r)=>{e.form.model.product_feed[r].feed_name=JSON.parse(t.feed_name)}))})).catch((t=>{e.loading=!1}))},convertJson(e){let t={};return e.forEach((e=>{t[e.grade_id]=e.product_equity})),JSON.stringify(t)},validateField(e){this.$refs.form.validateField(e)},onSubmit:function(){let e=this;e.$refs.form.validate((t=>{if(e.form.model.product_attr.length>0&&e.$refs.AttrRef.checkedForm(),e.form.model.product_feed.length>0&&e.$refs.IngredientsRef.checkedForm(),e.form.model.product_attr.length>0){let t=e.form.model.product_attr;for(let e=0;e<t.length;e++){for(let r=0;r<N.length;r++)if(!t[e].attribute_name[N[r].key])return;for(let r=0;r<t[e].attribute_value.length;r++)for(let o=0;o<N.length;o++)if(!t[e].attribute_value[r][N[o].key])return}}if(e.form.model.product_feed.length>0){let t=e.form.model.product_feed;for(let e=0;e<t.length;e++)for(let r=0;r<t.length;r++){for(let e=0;e<N.length;e++)if(!t[r].feed_name[N[e].key])return;if(""==t[r].price||null==t[r].price)return}}if(t){let t=l(JSON.parse(JSON.stringify(e.model)),JSON.parse(JSON.stringify(e.form.model)));t.scene=JSON.parse(JSON.stringify(e.scene)),t.image=JSON.parse(JSON.stringify(e.ImgKeepId(t.image))),t.product_id=JSON.parse(JSON.stringify(e.product_id)),t.sku=JSON.parse(JSON.stringify(e.form.model.sku)),t.alone_grade_equity=JSON.parse(JSON.stringify(e.convertJson(e.form.gradeList))),t.product_name=JSON.stringify(t.product_name),t.product_unit=JSON.stringify(t.product_unit),10==t.spec_type?(t.sku=t.sku.slice(0,1),t.sku[0].spec_name=""):t.sku.map(((e,r)=>{t.sku[r].spec_name=JSON.stringify(e.spec_name)})),t.product_attr.map(((e,r)=>{t.product_attr[r].attribute_name=JSON.stringify(e.attribute_name),e.attribute_value.map(((e,o)=>{t.product_attr[r].attribute_value[o]=JSON.stringify(e)}))})),t.product_feed.map(((e,r)=>{t.product_feed[r].feed_name=JSON.stringify(e.feed_name)})),"object"==typeof t.category_id&&t.category_id&&(t.category_id=Number(t.category_id[t.category_id.length-1])),e.save_loading=!0,o.storeEditProduct({product_id:e.product_id,params:JSON.stringify(t)},!0).then((t=>{e.save_loading=!1,this.$ElMessage({message:$t("保存成功"),type:"success"}),e.cancelFunc()})).catch((t=>{e.save_loading=!1}))}}))},ImgKeepId(e){let t=[];for(let r=0,o=e.length;r<o;r++){let o={image_id:e[r].image_id,file_id:e[r].file_id};t.push(o)}return t},Draft(){this.form.model.product_status=30,this.onSubmit()},cancelFunc(){this.$router.back(-1)}}},[["render",function(o,i,s,a,d,n){const p=c("Basic"),m=c("Spec"),l=c("Attr"),u=c("Ingredients"),O=c("Buyset"),N=e,$=t,q=r;return _((f(),g("div",k,[d.loading?J("",!0):(f(),y($,{key:0,size:"small",ref:"form",model:d.form,class:"product-form","label-position":"top","label-width":"180px"},{default:j((()=>[h("div",F,[S(p,{onValidateField:n.validateField},null,8,["onValidateField"]),S(m),S(l,{ref:"AttrRef"},null,512),S(u,{ref:"IngredientsRef"},null,512),S(O)]),h("div",I,[S(N,{size:"small",onClick:n.cancelFunc},{default:j((()=>[b(v(o.$t("取消")),1)])),_:1},8,["onClick"]),S(N,{size:"small",type:"primary",onClick:n.onSubmit,loading:d.loading},{default:j((()=>[b(v(o.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),_:1},8,["model"]))])),[[q,d.loading]])}],["__scopeId","data-v-9b4f6ddd"]]);export{$ as default};
