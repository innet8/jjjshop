System.register(["./element-plus-legacy-b61989a6.js","./product-legacy-46923c25.js","./@vue-legacy-517223d5.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./Upload-legacy-9d62534a.js","./index-legacy-40cb594f.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./file-legacy-1eb80b22.js","./vue-cropperjs-legacy-6f5c6c93.js","./vue-legacy-91aae751.js","./cropperjs-legacy-836916f5.js","./vue-router-legacy-57460840.js","./pinia-legacy-b89d16df.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./object-inspect-legacy-fcd55e63.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-fb79f073.js","./vue-i18n-legacy-859a0eb8.js","./@intlify-legacy-d0534b73.js"],(function(e,l){"use strict";var t,a,n,o,r,s,u,c,i,p,d,m,f,_,g,h,y,v,b,w,V,x,j,k,G,F,D,S,z=document.createElement("style");return z.textContent=".spec-many-type[data-v-7e94469f]{margin-left:180px;margin-top:16px;padding:20px;border:1px solid #e5ecf4;background:#f6f9fc}.spec-wrap .spec-hd[data-v-7e94469f]{padding:10px;display:flex;justify-content:space-between;align-items:center;background:#fff;font-weight:700}.spec-wrap .spec-hd .el-icon-delete-solid[data-v-7e94469f]{font-size:16px;color:#999}.spec-wrap .min-spc[data-v-7e94469f]{border:1px solid #dfecf8}.spec-wrap .spec-bd[data-v-7e94469f]{padding:5px;display:flex;justify-content:flex-start;flex-wrap:wrap;border-top:1px solid #dfecf8;background:#ffffff}.spec-wrap .spec-bd .el-tag[data-v-7e94469f]{color:#333}.spec-wrap .spec-bd .item[data-v-7e94469f]{position:relative;padding:5px}.spec-wrap .spec-bd .item input[data-v-7e94469f]{padding-right:30px}.spec-wrap .spec-hd a[data-v-7e94469f],.spec-wrap .spec-hd .svg-icon[data-v-7e94469f],.spec-wrap .spec-bd .item .svg-icon[data-v-7e94469f]{display:block;width:16px;height:16px}.spec-wrap .spec-bd .item a[data-v-7e94469f]{position:absolute;top:6px;right:5px;width:30px;height:30px;display:flex;justify-content:center;align-items:center}.add-spec .from-box[data-v-7e94469f]{display:flex;justify-content:flex-start}.add-spec .item[data-v-7e94469f]{display:flex;justify-content:flex-start;align-items:center;width:200px;margin-right:20px}.add-spec .item .key[data-v-7e94469f]{display:block;white-space:nowrap}\n",document.head.appendChild(z),{setters:[function(e){t=e.E,a=e.d,n=e.F,o=e.g,r=e.i,s=e.m,u=e.h,c=e.n},function(e){i=e.P},function(e){p=e.o,d=e.c,m=e.a,f=e.Q,_=e.a8,g=e.X,h=e.P,y=e.S,v=e.W,b=e.$,w=e.a0,V=e.Y,x=e.bb,j=e.b9,k=e.ap,G=e.T,F=e.ag},function(e){D=e._},function(e){S=e._},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={data:function(){return{showAddGroupBtn:!0,showAddGroupForm:!1,addGroupFrom:{specName:"",specValue:""},groupLoading:!1}},inject:["form"],created:function(){this.form.model.spec_many&&this.form.model.spec_many.spec_list.length>0&&this.buildSkulist()},methods:{onToggleAddGroupForm:function(){this.showAddGroupBtn=!this.showAddGroupBtn,this.showAddGroupForm=!this.showAddGroupForm},onSubmitAddGroup:function(){var e=this;if(""===e.addGroupFrom.specName||""===e.addGroupFrom.specValue)return t("请填写规则名或规则值"),!1;e.groupLoading=!0;var l={spec_name:e.addGroupFrom.specName,spec_value:e.addGroupFrom.specValue};i.addSpec(l,!0).then((function(l){e.groupLoading=!1,e.form.model.spec_many.spec_attr.push({group_id:l.data.spec_id,group_name:e.addGroupFrom.specName,spec_items:[{item_id:l.data.spec_value_id,spec_value:e.addGroupFrom.specValue}],tempValue:"",loading:!1}),e.addGroupFrom.specName="",e.addGroupFrom.specValue="",e.onToggleAddGroupForm(),e.buildSkulist()})).catch((function(l){e.groupLoading=!1}))},onSubmitAddValue:function(e){var l=this;if(!e.hasOwnProperty("tempValue")||""===e.tempValue)return t("规格值不能为空"),!1;e.loading=!0;var a={spec_id:e.group_id,spec_value:e.tempValue};i.addSpecValue(a,!0).then((function(t){e.loading=!1,e.spec_items.push({item_id:t.data.spec_value_id,spec_value:e.tempValue}),e.tempValue="",l.buildSkulist()})).catch((function(l){e.loading=!1}))},buildSkulist:function(){for(var e=this,l=e.form.model.spec_many.spec_attr,t=[],a=0;a<l.length;a++)t.push(l[a].spec_items);for(var n=e.calcDescartes(t),o=[],r=0;r<n.length;r++){var s=[],u=[];Array.isArray(n[r])?s=n[r]:s.push(n[r]);for(var c=0;c<s.length;c++)u.push(s[c].item_id);o.push({product_sku_id:0,spec_sku_id:u.join("_"),rows:s,spec_form:{}})}if(e.form.model.spec_many.spec_list.length>0&&o.length>0)for(var i=function(l){var t=e.form.model.spec_many.spec_list.filter((function(e){return e.spec_sku_id===o[l].spec_sku_id}));t.length>0&&(o[l].spec_form=t[0].spec_form,o[l].product_sku_id=t[0].product_sku_id)},p=0;p<o.length;p++)i(p);e.form.model.spec_many.spec_list=o},calcDescartes:function(e){return e.length<2?e[0]||[]:[].reduce.call(e,(function(e,l){var t=[];return e.forEach((function(e){l.forEach((function(l){var a=[].concat(Array.isArray(e)?e:[e]);a.push(l),t.push(a)}))})),t}))},onDeleteGroup:function(e){var l=this;a.confirm("删除后不可恢复，确认删除该记录吗?","提示",{type:"warning"}).then((function(){l.form.model.spec_many.spec_attr.splice(e,1),l.buildSkulist()}))},onDeleteValue:function(e,l){var n=this;n.form.isSpecLocked?t({message:"本商品正在参加活动，不能删除规格！",type:"warning"}):a.confirm("删除后不可恢复，确认删除该记录吗?","提示",{type:"warning"}).then((function(){n.form.model.spec_many.spec_attr[e].spec_items.splice(l,1),n.buildSkulist()}))}}},z=function(e){return x("data-v-7e94469f"),e=e(),j(),e},A={class:"spec-many-type"},C={class:"spec-wrap"},U={class:"spec-hd"},I={class:"input-box"},T=["onClick"],B=[z((function(){return m("i",{class:"Delete"},null,-1)}))],L={class:"spec-bd"},N={class:"item"},E={class:"item"},P={key:0},$={class:"add-spec mb16"},q={class:"from-box"},M={class:"item"},O=z((function(){return m("span",{class:"key"},"规格名：",-1)})),R={class:"item"},X=z((function(){return m("span",{class:"key"},"规格值：",-1)})),Q={class:"mt16"},W=["onClick"];e("default",D({components:{Type:D(l,[["render",function(e,l,t,a,s,u){var c=n,i=o,x=r;return p(),d("div",A,[m("div",C,[(p(!0),d(f,null,_(u.form.model.spec_many.spec_attr,(function(e,l){return p(),d("div",{class:"mb16 min-spc",key:e.group_name},[m("div",U,[m("div",I,g(e.group_name),1),m("a",{href:"javascript:void(0);",onClick:function(e){return u.onDeleteGroup(l)}},B,8,T)]),m("div",L,[(p(!0),d(f,null,_(e.spec_items,(function(e,t){return p(),d("div",{class:"item",key:e.spec_value},[h(c,{closable:"",onClose:function(e){return u.onDeleteValue(l,t)}},{default:y((function(){return[v(g(e.spec_value),1)]})),_:2},1032,["onClose"])])})),128)),m("div",N,[h(i,{size:"small",modelValue:e.tempValue,"onUpdate:modelValue":function(l){return e.tempValue=l},style:{width:"160px"}},null,8,["modelValue","onUpdate:modelValue"])]),m("div",E,[h(x,{size:"small",onClick:function(l){return u.onSubmitAddValue(e)},loading:e.loading},{default:y((function(){return[v("添加")]})),_:2},1032,["onClick","loading"])])])])})),128)),u.form.isSpecLocked?V("",!0):(p(),d("div",P,[b(h(x,{size:"small",class:"CirclePlus",onClick:u.onToggleAddGroupForm},{default:y((function(){return[v("添加规格")]})),_:1},8,["onClick"]),[[w,s.showAddGroupBtn]])])),b(m("div",$,[m("div",q,[m("div",M,[O,h(i,{size:"small",modelValue:s.addGroupFrom.specName,"onUpdate:modelValue":l[0]||(l[0]=function(e){return s.addGroupFrom.specName=e}),placeholder:"请输入规格名称"},null,8,["modelValue"])]),m("div",R,[X,h(i,{size:"small",modelValue:s.addGroupFrom.specValue,"onUpdate:modelValue":l[1]||(l[1]=function(e){return s.addGroupFrom.specValue=e}),placeholder:"请输入规格值"},null,8,["modelValue"])]),h(x,{type:"primary",size:"small",loading:s.groupLoading,onClick:u.onSubmitAddGroup,plain:""},{default:y((function(){return[v("确定")]})),_:1},8,["loading","onClick"]),h(x,{size:"small",onClick:u.onToggleAddGroupForm},{default:y((function(){return[v("取消")]})),_:1},8,["onClick"])])],512),[[w,!s.showAddGroupBtn]])])])}],["__scopeId","data-v-7e94469f"]]),Table:D({components:{Upload:S},data:function(){return{batchData:{product_price:"",line_price:"",stock_num:"",product_weight:""},isupload:!1,spec_index:-1}},inject:["form"],created:function(){},methods:{objectSpanMethod:function(e){e.row,e.column;var l=e.rowIndex,t=e.columnIndex,a=this.form.model.spec_many.spec_attr,n=1;if(t<a.length-1){for(var o=t+1,r=a.length-1,s=o;s<=r;s++)n*=a[s].spec_items.length;return l%n==0?{rowspan:n,colspan:1}:{rowspan:0,colspan:0}}},onSubmitBatchData:function(){var e=this;e.form.model.spec_many.spec_list.forEach((function(l){for(var t in e.batchData)e.batchData.hasOwnProperty(t)&&e.batchData[t]&&(l.spec_form[t]=e.batchData[t])}))},chooseSpecImage:function(e){this.isupload=!0,this.spec_index=e},returnImgsFunc:function(e){this.isupload=!1,this.form.model.spec_many.spec_list[this.spec_index].spec_form.image_id=e[0].file_id,this.form.model.spec_many.spec_list[this.spec_index].spec_form.image_path=e[0].file_path}}},[["render",function(e,l,t,a,n,i){var w=o,x=r,j=s,F=u,D=c,z=S,A=k("img-url");return p(),d("div",Q,[i.form.model.spec_many&&i.form.model.spec_many.spec_list.length>0?(p(),G(F,{key:0,label:"规格明细："},{default:y((function(){return[m("div",null,[v(" 批量设置 "),h(w,{size:"small",modelValue:n.batchData.product_price,"onUpdate:modelValue":l[0]||(l[0]=function(e){return n.batchData.product_price=e}),placeholder:"销售价",style:{width:"160px","padding-left":"4px"}},null,8,["modelValue"]),h(w,{size:"small",modelValue:n.batchData.line_price,"onUpdate:modelValue":l[1]||(l[1]=function(e){return n.batchData.line_price=e}),placeholder:"划线价",style:{width:"160px","padding-left":"4px"}},null,8,["modelValue"]),h(w,{size:"small",modelValue:n.batchData.stock_num,"onUpdate:modelValue":l[2]||(l[2]=function(e){return n.batchData.stock_num=e}),placeholder:"库存",style:{width:"160px","padding-left":"4px"}},null,8,["modelValue"]),h(w,{size:"small",modelValue:n.batchData.product_weight,"onUpdate:modelValue":l[3]||(l[3]=function(e){return n.batchData.product_weight=e}),placeholder:"重量",style:{width:"160px","padding-left":"4px"}},null,8,["modelValue"]),h(x,{size:"small",onClick:i.onSubmitBatchData},{default:y((function(){return[v("应用")]})),_:1},8,["onClick"])]),m("div",null,[h(D,{size:"",data:i.form.model.spec_many.spec_list,"span-method":i.objectSpanMethod,border:"",style:{width:"100%","margin-top":"20px"}},{default:y((function(){return[(p(!0),d(f,null,_(i.form.model.spec_many.spec_attr,(function(e,l){return p(),G(j,{label:e.group_name,key:e.group_name},{default:y((function(e){return[v(g(e.row.rows[l].spec_value),1)]})),_:2},1032,["label"])})),128)),h(j,{label:"规格图片"},{default:y((function(e){return[b(m("img",{alt:"",width:"35",height:"35",onClick:function(l){return i.chooseSpecImage(e.$index)}},null,8,W),[[A,e.row.spec_form.image_path]])]})),_:1}),h(j,{label:"产品编码"},{default:y((function(e){return[h(F,{label:"",style:{"margin-bottom":"0"}},{default:y((function(){return[h(w,{size:"small",prop:"product_no",modelValue:e.row.spec_form.product_no,"onUpdate:modelValue":function(l){return e.row.spec_form.product_no=l}},null,8,["modelValue","onUpdate:modelValue"])]})),_:2},1024)]})),_:1}),h(j,{label:"销售价"},{default:y((function(e){return[h(F,{label:"",rules:[{required:!0,message:" "}],prop:"model.spec_many.spec_list."+e.$index+".spec_form.product_price",style:{"margin-bottom":"0"}},{default:y((function(){return[h(w,{size:"small",prop:"product_price",modelValue:e.row.spec_form.product_price,"onUpdate:modelValue":function(l){return e.row.spec_form.product_price=l}},null,8,["modelValue","onUpdate:modelValue"])]})),_:2},1032,["prop"])]})),_:1}),h(j,{label:"划线价"},{default:y((function(e){return[h(F,{label:"",style:{"margin-bottom":"0"}},{default:y((function(){return[h(w,{size:"small",prop:"line_price",modelValue:e.row.spec_form.line_price,"onUpdate:modelValue":function(l){return e.row.spec_form.line_price=l}},null,8,["modelValue","onUpdate:modelValue"])]})),_:2},1024)]})),_:1}),h(j,{label:"库存"},{default:y((function(e){return[h(F,{label:"",rules:[{required:!0,message:" "}],prop:"model.spec_many.spec_list."+e.$index+".spec_form.stock_num",style:{"margin-bottom":"0"}},{default:y((function(){return[h(w,{size:"small",prop:"stock_num",modelValue:e.row.spec_form.stock_num,"onUpdate:modelValue":function(l){return e.row.spec_form.stock_num=l}},null,8,["modelValue","onUpdate:modelValue"])]})),_:2},1032,["prop"])]})),_:1}),h(j,{label:"重量(kg)"},{default:y((function(e){return[h(F,{label:"",rules:[{required:!0,message:" "}],prop:"model.spec_many.spec_list."+e.$index+".spec_form.product_weight",style:{"margin-bottom":"0"}},{default:y((function(){return[h(w,{size:"small",prop:"product_weight",modelValue:e.row.spec_form.product_weight,"onUpdate:modelValue":function(l){return e.row.spec_form.product_weight=l}},null,8,["modelValue","onUpdate:modelValue"])]})),_:2},1032,["prop"])]})),_:1})]})),_:1},8,["data","span-method"])])]})),_:1})):V("",!0),n.isupload?(p(),G(z,{key:1,isupload:n.isupload,onReturnImgs:i.returnImgsFunc},{default:y((function(){return[v("上传图片")]})),_:1},8,["isupload","onReturnImgs"])):V("",!0)])}]])}},[["render",function(e,l,t,a,n,o){var r=F("Type"),s=F("Table");return p(),d("div",null,[h(r),h(s)])}]]))}}}));
