System.register(["./element-plus-legacy-b16a6c53.js","./index-legacy-37de8052.js","./@vue-legacy-11820b46.js","./@vueuse-legacy-fb10ab28.js","./lodash-es-legacy-b311526b.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-e28812ab.js","./dayjs-legacy-4b173016.js","./call-bind-legacy-a7650b66.js","./get-intrinsic-legacy-675d089b.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-b76e1749.js","./has-legacy-06d86c07.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./vue-router-legacy-4115aea7.js","./pinia-legacy-dd7b0b91.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-a87a5df5.js","./side-channel-legacy-9446be19.js","./object-inspect-legacy-b9938498.js","./vue-ueditor-wrap-legacy-0affb7fa.js"],(function(e,l){"use strict";var t,a,n,s,u,c,r,i,d,o,m,y;return{setters:[function(e){t=e.T,a=e.c},function(e){n=e._},function(e){s=e.o,u=e.c,c=e.a,r=e.W,i=e.Q,d=e.a8,o=e.P,m=e.Y,y=e.b},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={data:function(){return{restaurants:[],formData:{}}},inject:["form"],methods:{addAttr:function(){this.form.model.product_attr.push({attribute_name:"",attribute_value:[]})},querySearch:function(e,l){var t=this;0==t.restaurants.length&&t.form.attribute.forEach((function(e,l){t.restaurants.push({value:e.attribute_name})}));var a=this.restaurants;l(e?a.filter(this.createFilter(e)):a)},createFilter:function(e){return function(l){return 0===l.value.toLowerCase().indexOf(e.toLowerCase())}}}},g=c("div",{class:"common-form mt50"},"商品属性",-1),v={class:"mt16"},f={class:"p-0-30 mb18"},p={class:"d-s-c"},j=y('<div class="d-c-c mb16"><div style="width:100px;"><span class="red">*</span>属性名称：</div><div class="flex-1"><span class="red">*</span>属性值(至少填写两个)</div></div>',1),h={class:"d-c-c"},b={style:{width:"100px"}},_={class:"flex-1 d-s-c"};e("default",n(l,[["render",function(e,l,n,y,x,w){var V=t,k=a;return s(),u("div",null,[g,c("div",null,[c("div",v,[c("div",f,[c("div",p,[r("商品属性: "),c("div",{class:"blue ml30",onClick:l[0]||(l[0]=function(){return w.addAttr&&w.addAttr.apply(w,arguments)})},"添加属性+")])]),w.form.model.product_attr.length>0?(s(!0),u(i,{key:0},d(w.form.model.product_attr,(function(e,l){return s(),u("div",{class:"mb18 p-0-30",key:l},[j,c("div",h,[c("div",b,[o(V,{class:"inline-input",size:"medium",modelValue:e.attribute_name,"onUpdate:modelValue":function(l){return e.attribute_name=l},"fetch-suggestions":w.querySearch,placeholder:"如:温度"},null,8,["modelValue","onUpdate:modelValue","fetch-suggestions"])]),c("div",_,[(s(),u(i,null,d(8,(function(l,t){return c("div",{key:t,class:"ml20"},[o(k,{style:{width:"100px"},size:"medium",modelValue:e.attribute_value[t],"onUpdate:modelValue":function(l){return e.attribute_value[t]=l},placeholder:"请选择"},null,8,["modelValue","onUpdate:modelValue"])])})),64))])])])})),128)):m("",!0)])])])}]]))}}}));
