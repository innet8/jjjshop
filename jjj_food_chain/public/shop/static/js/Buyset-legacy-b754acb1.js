System.register(["./element-plus-legacy-ce5c473b.js","./_plugin-vue_export-helper-legacy-61c4c9d1.js","./@vue-legacy-8ef99c9b.js","./lodash-es-legacy-de50a096.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-3353583a.js","./@element-plus-legacy-91437698.js","./dayjs-legacy-0ff6bb75.js","./call-bind-legacy-8954b3d2.js","./get-intrinsic-legacy-c0201930.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./hasown-legacy-8325a62b.js","./set-function-length-legacy-e4fe6823.js","./define-data-property-legacy-290282d7.js","./has-property-descriptors-legacy-1e05bb01.js","./gopd-legacy-0da6a62b.js","./@popperjs-legacy-876caf52.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js"],(function(e,l){"use strict";var u,n,r,t,o,a,s,d,c,m,i,f,p,y,g;return{setters:[function(e){u=e.w,n=e.x,r=e.h,t=e.g,o=e.r,a=e.s},function(e){s=e._},function(e){d=e.o,c=e.c,m=e.S,i=e.R,f=e.O,p=e.V,y=e.X,g=e.a},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={data:function(){return{unit:"%",grade_unit:"%"}},created:function(){},inject:["form"],methods:{hasType:function(){return-1!=this.form.model.delivery_set.indexOf(10)}}},_={class:"buy-set-content pl16 pr16"},j=g("div",{class:"common-form mt50"},"其他设置",-1),b=g("div",{class:"gray9"},"每个会员购买的最大数量，0为不限购",-1);e("default",s(l,[["render",function(e,l,s,g,V,h){var v=u,x=n,q=r,w=t,U=o,k=a;return d(),c("div",_,[j,40!=h.form.model.product_status?(d(),m(q,{key:0,label:"商品状态：",rules:[{required:!0,message:"选择商品状态"}],prop:"model.product_status"},{default:i((function(){return[f(x,{modelValue:h.form.model.product_status,"onUpdate:modelValue":l[0]||(l[0]=function(e){return h.form.model.product_status=e})},{default:i((function(){return[f(v,{label:10},{default:i((function(){return[p("上架")]})),_:1}),f(v,{label:20},{default:i((function(){return[p("下架")]})),_:1})]})),_:1},8,["modelValue"])]})),_:1})):y("",!0),f(q,{label:"商品排序：",rules:[{required:!0,message:" "}],prop:"model.product_sort"},{default:i((function(){return[f(w,{type:"number",min:"0",modelValue:h.form.model.product_sort,"onUpdate:modelValue":l[1]||(l[1]=function(e){return h.form.model.product_sort=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),f(q,{label:"限购数量：",rules:[{required:!0,message:" "}],prop:"model.limit_num"},{default:i((function(){return[f(w,{type:"number",min:"0",modelValue:h.form.model.limit_num,"onUpdate:modelValue":l[2]||(l[2]=function(e){return h.form.model.limit_num=e}),class:"max-w460"},null,8,["modelValue"]),b]})),_:1}),f(q,{label:"配送支持：",rules:[{required:!0,message:" "}],prop:"model.delivery_set"},{default:i((function(){return[f(k,{modelValue:h.form.model.delivery_set,"onUpdate:modelValue":l[3]||(l[3]=function(e){return h.form.model.delivery_set=e}),min:1,max:2},{default:i((function(){return[f(U,{label:10},{default:i((function(){return[p("快递配送")]})),_:1}),f(U,{label:20},{default:i((function(){return[p("到店自提")]})),_:1})]})),_:1},8,["modelValue"])]})),_:1}),h.hasType()?(d(),m(q,{key:1,label:"配送费：",rules:[{required:!0,message:" "}],prop:"model.express_price"},{default:i((function(){return[f(w,{type:"number",min:"0",modelValue:h.form.model.express_price,"onUpdate:modelValue":l[4]||(l[4]=function(e){return h.form.model.express_price=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1})):y("",!0)])}]]))}}}));
