System.register(["./element-plus-legacy-895ffe04.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./@vue-legacy-6076f203.js","./index-legacy-3b8a301e.js","./@vueuse-legacy-85324d63.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-d0a3b32c.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./vue-router-legacy-41bf3bcd.js","./pinia-legacy-68b9f062.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./object-inspect-legacy-fcd55e63.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-6ef346ed.js","./vue-i18n-legacy-04918595.js","./@intlify-legacy-09ecf407.js"],(function(e,t){"use strict";var l,n,a,o,r,u,c,s,i,d,p,m,f,g,y,_,b,h,k,v,w,x,j,V=document.createElement("style");return V.textContent=".spec-many-type[data-v-ee9cc575]{margin-top:16px;padding:20px;border:1px solid #e5ecf4;background:#f6f9fc}.spec-wrap .spec-hd[data-v-ee9cc575]{padding:10px;display:flex;justify-content:space-between;align-items:center;background:#fff;font-weight:700}.spec-wrap .spec-hd .el-icon-delete-solid[data-v-ee9cc575]{font-size:16px;color:#999}.spec-wrap .min-spc[data-v-ee9cc575]{border:1px solid #dfecf8}.spec-wrap .spec-bd[data-v-ee9cc575]{padding:5px;display:flex;justify-content:flex-start;flex-wrap:wrap;border-top:1px solid #dfecf8;background:#ffffff}.spec-wrap .spec-bd .el-tag[data-v-ee9cc575]{color:#333}.spec-wrap .spec-bd .item[data-v-ee9cc575]{position:relative;padding:5px}.spec-wrap .spec-bd .item input[data-v-ee9cc575]{padding-right:30px}.spec-wrap .spec-hd a[data-v-ee9cc575],.spec-wrap .spec-hd .svg-icon[data-v-ee9cc575],.spec-wrap .spec-bd .item .svg-icon[data-v-ee9cc575]{display:block;width:16px;height:16px}.spec-wrap .spec-bd .item a[data-v-ee9cc575]{position:absolute;top:6px;right:5px;width:30px;height:30px;display:flex;justify-content:center;align-items:center}.add-spec .from-box[data-v-ee9cc575]{display:flex;justify-content:flex-start}.add-spec .item[data-v-ee9cc575]{display:flex;justify-content:flex-start;align-items:center;width:200px;margin-right:20px}.add-spec .item .key[data-v-ee9cc575]{display:block;white-space:nowrap}.spec-name[data-v-6e4d951f]{display:flex;flex-wrap:wrap;gap:12px;padding:12px}.spec-name .el-input[data-v-6e4d951f]{max-width:calc(50% - 6px)}.inline-input[data-v-750046f8]{max-width:460px}\n",document.head.appendChild(V),{setters:[function(e){l=e.e,n=e.f,a=e.d,o=e.E,r=e.g,u=e.m,c=e.n,s=e.o,i=e.p},function(e){d=e._},function(e){p=e.o,m=e.c,f=e.P,g=e.S,y=e.T,_=e.W,b=e.X,h=e.Y,k=e.a,v=e.Q,w=e.a8,x=e.ag},function(e){j=e.l},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var t=d({inject:["form"]},[["render",function(e,t,a,o,r,u){var c=l,s=n;return p(),m("div",null,[f(s,{label:e.$t("产品价格："),width:"80",rules:[{required:!0,message:e.$t("请填写产品价格")}],prop:"model.sku[0].product_price"},{default:g((function(){return[f(c,{type:"number",modelValue:u.form.model.sku[0].product_price,"onUpdate:modelValue":t[0]||(t[0]=function(e){return u.form.model.sku[0].product_price=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1},8,["label","rules"]),f(s,{label:e.$t("库存数量："),rules:[{required:!0,message:e.$t("请填写库存数量")}],prop:"model.sku[0].stock_num"},{default:g((function(){return[f(c,{type:"number",modelValue:u.form.model.sku[0].stock_num,"onUpdate:modelValue":t[1]||(t[1]=function(e){return u.form.model.sku[0].stock_num=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1},8,["label","rules"])])}]]),V=JSON.stringify(j().languageData),$=d({data:function(){return{showAddGroupBtn:!0,showAddGroupForm:!1,addGroupFrom:{specName:"",specValue:""},groupLoading:!1}},inject:["form"],created:function(){},methods:{onToggleAddGroupForm:function(){var e=this;Array.isArray(e.form.model.sku)||(e.form.model.sku=[]),e.form.model.sku.push({spec_name:JSON.parse(V),product_price:"",bag_price:"",stock_num:"",cost_price:0,is_full:0})},onDeleteGroup:function(e){var t=this;a.confirm("删除后不可恢复，确认删除该记录吗?","提示",{type:"warning"}).then((function(){t.form.model.spec_many.spec_attr.splice(e,1),t.buildSkulist()}))},onDeleteValue:function(e,t){var l=this;l.form.isSpecLocked?o({message:"本商品正在参加活动，不能删除规格！",type:"warning"}):a.confirm("删除后不可恢复，确认删除该记录吗?","提示",{type:"warning"}).then((function(){l.form.model.spec_many.spec_attr[e].spec_items.splice(t,1),l.buildSkulist()}))}}},[["render",function(e,t,l,n,a,o){var u=r;return o.form.isSpecLocked?h("",!0):(p(),y(u,{key:0,size:"small",type:"primary",class:"el-icon-circle-plus",onClick:o.onToggleAddGroupForm},{default:g((function(){return[_(b(e.$t("添加规格"))+"+",1)]})),_:1},8,["onClick"]))}],["__scopeId","data-v-ee9cc575"]]),S=j().languageList,L={class:"mt16"},U={class:"ww100"},C={label:"",class:"spec-name",style:{"margin-bottom":"0"}},A=d({components:{Type:$,Table:d({components:{},data:function(){return{languageList:S,restaurants:[],formData:{},batchData:{product_price:"",line_price:"",stock_num:"",product_weight:""},isupload:!1,spec_index:-1}},inject:["form"],created:function(){this.formData=this.form},mounted:function(){},methods:{deleteAttr:function(e){this.form.model.sku.splice(e,1)}}},[["render",function(e,t,a,o,s,i){var d=l,b=u,x=n,j=r,V=c;return p(),m("div",L,[i.form.model.sku.length>0?(p(),y(x,{key:0,label:e.$t("规格明细：")},{default:g((function(){return[k("div",U,[f(V,{size:"",data:i.form.model.sku,border:"",style:{width:"100%","margin-top":"20px"}},{default:g((function(){return[f(b,{label:e.$t("规格名称"),width:"400"},{default:g((function(t){return[k("div",C,[(p(!0),m(v,null,w(s.languageList,(function(l,n){return p(),y(d,{key:n,size:"small",prop:"spec_name",modelValue:t.row.spec_name[l.key],"onUpdate:modelValue":function(e){return t.row.spec_name[l.key]=e},placeholder:e.$t("请输入")+"(".concat(l.label,")")},null,8,["modelValue","onUpdate:modelValue","placeholder"])})),128))])]})),_:1},8,["label"]),f(b,{label:e.$t("价格")},{default:g((function(e){return[f(x,{label:"",style:{"margin-bottom":"0"}},{default:g((function(){return[f(d,{type:"number",size:"small",prop:"product_price",modelValue:e.row.product_price,"onUpdate:modelValue":function(t){return e.row.product_price=t}},null,8,["modelValue","onUpdate:modelValue"])]})),_:2},1024)]})),_:1},8,["label"]),f(b,{label:e.$t("包装费")},{default:g((function(e){return[f(x,{label:"",style:{"margin-bottom":"0"}},{default:g((function(){return[f(d,{type:"number",size:"small",prop:"bag_price",modelValue:e.row.bag_price,"onUpdate:modelValue":function(t){return e.row.bag_price=t}},null,8,["modelValue","onUpdate:modelValue"])]})),_:2},1024)]})),_:1},8,["label"]),f(b,{label:e.$t("库存")},{default:g((function(e){return[f(x,{label:"",style:{"margin-bottom":"0"}},{default:g((function(){return[f(d,{type:"number",size:"small",prop:"stock_num",modelValue:e.row.stock_num,"onUpdate:modelValue":function(t){return e.row.stock_num=t}},null,8,["modelValue","onUpdate:modelValue"])]})),_:2},1024)]})),_:1},8,["label"]),f(b,{label:""},{default:g((function(e){return[f(x,{label:"",style:{"margin-bottom":"0"}},{default:g((function(){return[f(j,{type:"primary",link:"",onClick:function(t){return i.deleteAttr(e.$index)}},{default:g((function(){return[_("删除")]})),_:2},1032,["onClick"])]})),_:2},1024)]})),_:1})]})),_:1},8,["data"])])]})),_:1},8,["label"])):h("",!0)])}],["__scopeId","data-v-6e4d951f"]])}},[["render",function(e,t,l,n,a,o){var r=x("Type"),u=x("Table");return p(),m("div",null,[f(r),f(u)])}]]),z=j().languageList,T={class:"common-form mt50"},D={key:0,class:"red"};e("default",d({components:{Single:t,Many:A},data:function(){return{restaurants:[],languageList:z}},inject:["form"],methods:{changeSpec:function(e){10==e?this.form.sku={product_price:"",stock_num:"",bag_price:0,cost_price:0,is_full:0}:20==e&&(this.form.sku=[])},querySearch:function(e,t){var l=this;0==l.restaurants.length&&l.form.unit.forEach((function(e,t){l.restaurants.push({value:e.unit_name})}));var n=this.restaurants;t(e?n.filter(this.createFilter(e)):n)},createFilter:function(e){return function(t){return 0===t.value.toLowerCase().indexOf(e.toLowerCase())}}}},[["render",function(e,t,a,o,r,u){var c=s,d=i,j=n,V=l,$=x("Single"),S=x("Many");return p(),m("div",null,[k("div",T,b(e.$t("规格/库存")),1),f(j,{label:e.$t("库存计算方式：")},{default:g((function(){return[f(d,{modelValue:u.form.model.deduct_stock_type,"onUpdate:modelValue":t[0]||(t[0]=function(e){return u.form.model.deduct_stock_type=e})},{default:g((function(){return[f(c,{label:10},{default:g((function(){return[_(b(e.$t("下单减库存")),1)]})),_:1}),f(c,{label:20},{default:g((function(){return[_(b(e.$t("付款减库存")),1)]})),_:1})]})),_:1},8,["modelValue"])]})),_:1},8,["label"]),(p(!0),m(v,null,w(r.languageList,(function(t,l){return p(),y(j,{key:l,label:0==l?e.$t("商品单位："):"",rules:[{required:!0,message:e.$t("请填写商品单位")}],prop:"model.product_unit.th"},{default:g((function(){return[f(V,{class:"inline-input",modelValue:u.form.model.product_unit[t.key],"onUpdate:modelValue":function(e){return u.form.model.product_unit[t.key]=e},placeholder:e.$t("请输入")+"(".concat(t.label,")")},null,8,["modelValue","onUpdate:modelValue","placeholder"])]})),_:2},1032,["label","rules"])})),128)),f(j,{label:e.$t("产品规格：")},{default:g((function(){return[f(d,{modelValue:u.form.model.spec_type,"onUpdate:modelValue":t[1]||(t[1]=function(e){return u.form.model.spec_type=e}),onChange:u.changeSpec},{default:g((function(){return[!u.form.isSpecLocked||u.form.isSpecLocked&&10==u.form.model.spec_type?(p(),y(c,{key:0,label:10},{default:g((function(){return[_(b(e.$t("单规格")),1)]})),_:1})):h("",!0),!u.form.isSpecLocked||u.form.isSpecLocked&&20==u.form.model.spec_type?(p(),y(c,{key:1,label:20},{default:g((function(){return[_(b(e.$t("多规格")),1)]})),_:1})):h("",!0)]})),_:1},8,["modelValue","onChange"]),u.form.isSpecLocked?(p(),m("div",D,b(e.$t("此商品正在参加活动，不能修改规格")),1)):h("",!0)]})),_:1},8,["label"]),10==u.form.model.spec_type?(p(),y($,{key:0})):h("",!0),20==u.form.model.spec_type?(p(),y(S,{key:1})):h("",!0)])}],["__scopeId","data-v-750046f8"]]))}}}));