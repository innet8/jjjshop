System.register(["./element-plus-legacy-6adc2ffc.js","./_plugin-vue_export-helper-legacy-61c4c9d1.js","./@vue-legacy-8ef99c9b.js","./lodash-es-legacy-de50a096.js","./async-validator-legacy-aa1fd2de.js","./@vueuse-legacy-3353583a.js","./@element-plus-legacy-91437698.js","./dayjs-legacy-0ff6bb75.js","./call-bind-legacy-8954b3d2.js","./get-intrinsic-legacy-c0201930.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./hasown-legacy-8325a62b.js","./set-function-length-legacy-e4fe6823.js","./define-data-property-legacy-290282d7.js","./has-property-descriptors-legacy-1e05bb01.js","./gopd-legacy-0da6a62b.js","./@popperjs-legacy-876caf52.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js"],(function(e,l){"use strict";var n,t,o,u,a,r,d,m,i,f,s,c,_,p,g,y,b,V,h,v;return{setters:[function(e){n=e.w,t=e.x,o=e.h,u=e.g,a=e.p,r=e.q,d=e.m,m=e.o},function(e){i=e._},function(e){f=e.o,s=e.c,c=e.O,_=e.R,p=e.V,g=e.S,y=e.X,b=e.P,V=e.a7,h=e.a,v=e.W},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={data:function(){return{unit:"%",grade_unit:"%"}},created:function(){"20"==this.form.model.alone_grade_type&&(this.grade_unit="元"),"20"==this.form.model.agent_money_type&&(this.unit="元")},inject:["form"],methods:{changeMoneyType:function(e){this.unit="10"==e?"%":"元"},changeGradeType:function(e){this.grade_unit="10"==e?"%":"元"}}},j={class:"buy-set-content pl16 pr16"},U=h("div",{class:"common-form"},"积分设置",-1),k=h("div",{class:"common-form mt50"},"其他设置",-1),S=h("div",{class:"gray9"},"每个会员购买的最大数量，0为不限购",-1),w=h("div",{class:"common-form mt50"},"会员折扣设置",-1),x={key:0,class:"gray9"},q={class:"max-w460"},C={class:"d-s-c"},T={class:"ml10"},z={key:4,class:"common-form mt50"},G={class:"gray9"},L={key:0,style:{"padding-left":"10px"}},M={key:1,style:{"padding-left":"10px"}},O={key:2,style:{"padding-left":"10px"}};e("default",i(l,[["render",function(e,l,i,P,R,W){var X=n,A=t,B=o,D=u,E=a,F=r,H=d,I=m;return f(),s("div",j,[U,c(B,{label:"是否开启积分赠送："},{default:_((function(){return[c(A,{modelValue:W.form.model.is_points_gift,"onUpdate:modelValue":l[0]||(l[0]=function(e){return W.form.model.is_points_gift=e})},{default:_((function(){return[c(X,{label:1},{default:_((function(){return[p("开启")]})),_:1}),c(X,{label:0},{default:_((function(){return[p("关闭")]})),_:1})]})),_:1},8,["modelValue"])]})),_:1}),k,40!=W.form.model.product_status?(f(),g(B,{key:0,label:"商品状态：",rules:[{required:!0,message:"选择商品状态"}],prop:"model.product_status"},{default:_((function(){return[c(A,{modelValue:W.form.model.product_status,"onUpdate:modelValue":l[1]||(l[1]=function(e){return W.form.model.product_status=e})},{default:_((function(){return[c(X,{label:10},{default:_((function(){return[p("上架")]})),_:1}),c(X,{label:20},{default:_((function(){return[p("下架")]})),_:1})]})),_:1},8,["modelValue"])]})),_:1})):y("",!0),c(B,{label:"初始销量："},{default:_((function(){return[c(D,{type:"number",min:"0",modelValue:W.form.model.sales_initial,"onUpdate:modelValue":l[2]||(l[2]=function(e){return W.form.model.sales_initial=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),c(B,{label:"商品排序：",rules:[{required:!0,message:" "}],prop:"model.product_sort"},{default:_((function(){return[c(D,{type:"number",min:"0",modelValue:W.form.model.product_sort,"onUpdate:modelValue":l[3]||(l[3]=function(e){return W.form.model.product_sort=e}),class:"max-w460"},null,8,["modelValue"])]})),_:1}),c(B,{label:"限购数量：",rules:[{required:!0,message:" "}],prop:"model.limit_num"},{default:_((function(){return[c(D,{type:"number",min:"0",modelValue:W.form.model.limit_num,"onUpdate:modelValue":l[4]||(l[4]=function(e){return W.form.model.limit_num=e}),class:"max-w460"},null,8,["modelValue"]),S]})),_:1}),c(B,{label:"打印标签：",prop:"model.label_id"},{default:_((function(){return[c(F,{modelValue:W.form.model.label_id,"onUpdate:modelValue":l[5]||(l[5]=function(e){return W.form.model.label_id=e})},{default:_((function(){return[c(E,{label:"无",value:0}),(f(!0),s(b,null,V(W.form.labelList,(function(e){return f(),g(E,{key:e.label_id,value:e.label_id,label:e.label_name},null,8,["value","label"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),w,c(B,{label:"是否开启会员折扣："},{default:_((function(){return[c(A,{modelValue:W.form.model.is_enable_grade,"onUpdate:modelValue":l[6]||(l[6]=function(e){return W.form.model.is_enable_grade=e})},{default:_((function(){return[c(X,{label:1},{default:_((function(){return[p("开启")]})),_:1}),c(X,{label:0},{default:_((function(){return[p("关闭")]})),_:1})]})),_:1},8,["modelValue"])]})),_:1}),1==W.form.model.is_enable_grade?(f(),g(B,{key:1,label:"会员折扣设置："},{default:_((function(){return[c(A,{modelValue:W.form.model.is_alone_grade,"onUpdate:modelValue":l[7]||(l[7]=function(e){return W.form.model.is_alone_grade=e})},{default:_((function(){return[c(X,{label:0},{default:_((function(){return[p("默认折扣")]})),_:1}),c(X,{label:1},{default:_((function(){return[p("单独设置折扣")]})),_:1})]})),_:1},8,["modelValue"]),0==W.form.model.is_alone_grade?(f(),s("div",x,"默认折扣：默认为用户所属会员等级的折扣率")):y("",!0)]})),_:1})):y("",!0),1==W.form.model.is_alone_grade&&1==W.form.model.is_enable_grade?(f(),g(B,{key:2,label:"折扣佣金类型："},{default:_((function(){return[c(A,{modelValue:W.form.model.alone_grade_type,"onUpdate:modelValue":l[8]||(l[8]=function(e){return W.form.model.alone_grade_type=e}),onChange:W.changeGradeType},{default:_((function(){return[c(X,{label:10},{default:_((function(){return[p("百分比")]})),_:1}),c(X,{label:20},{default:_((function(){return[p("固定金额")]})),_:1})]})),_:1},8,["modelValue","onChange"])]})),_:1})):y("",!0),1==W.form.model.is_alone_grade&&1==W.form.model.is_enable_grade?(f(),g(B,{key:3,label:""},{default:_((function(){return[h("div",q,[c(I,{data:W.form.gradeList,border:"",size:"",style:{width:"100%"}},{default:_((function(){return[c(H,{prop:"name",label:"会员等级"}),c(H,{prop:"name",label:"折扣"},{default:_((function(e){return[h("div",C,[c(D,{modelValue:e.row.product_equity,"onUpdate:modelValue":function(l){return e.row.product_equity=l},type:"number",placeholder:"请输入折扣"},null,8,["modelValue","onUpdate:modelValue"]),h("span",T,v(R.grade_unit),1)])]})),_:1})]})),_:1},8,["data"])])]})),_:1})):y("",!0),1==W.form.basicSetting.is_open?(f(),s("div",z,"分销设置")):y("",!0),1==W.form.basicSetting.is_open?(f(),g(B,{key:5,label:"是否开启分销："},{default:_((function(){return[c(A,{modelValue:W.form.model.is_agent,"onUpdate:modelValue":l[9]||(l[9]=function(e){return W.form.model.is_agent=e})},{default:_((function(){return[c(X,{label:1},{default:_((function(){return[p("开启")]})),_:1}),c(X,{label:0},{default:_((function(){return[p("关闭")]})),_:1})]})),_:1},8,["modelValue"])]})),_:1})):y("",!0),1===W.form.model.is_agent?(f(),s(b,{key:6},[1==W.form.basicSetting.is_open?(f(),g(B,{key:0,label:"分销规则："},{default:_((function(){return[c(A,{modelValue:W.form.model.is_ind_agent,"onUpdate:modelValue":l[10]||(l[10]=function(e){return W.form.model.is_ind_agent=e})},{default:_((function(){return[c(X,{label:0},{default:_((function(){return[p("平台规则")]})),_:1}),c(X,{label:1},{default:_((function(){return[p("单独规则")]})),_:1})]})),_:1},8,["modelValue"]),h("div",G,[p("平台规则：层级("+v(W.form.basicSetting.level)+"级) ",1),W.form.basicSetting.level>=1?(f(),s("span",L,"1级佣金("+v(W.form.agentSetting.first_money)+"%)",1)):y("",!0),W.form.basicSetting.level>=2?(f(),s("span",M,"2级佣金("+v(W.form.agentSetting.second_money)+"%)",1)):y("",!0),W.form.basicSetting.level>=3?(f(),s("span",O,"3级佣金("+v(W.form.agentSetting.third_money)+"%)",1)):y("",!0)])]})),_:1})):y("",!0),1===W.form.model.is_ind_agent&&1==W.form.basicSetting.is_open?(f(),s(b,{key:1},[c(B,{label:"分销佣金类型："},{default:_((function(){return[c(A,{modelValue:W.form.model.agent_money_type,"onUpdate:modelValue":l[11]||(l[11]=function(e){return W.form.model.agent_money_type=e}),onChange:W.changeMoneyType},{default:_((function(){return[c(X,{label:10},{default:_((function(){return[p("百分比")]})),_:1}),c(X,{label:20},{default:_((function(){return[p("固定金额")]})),_:1})]})),_:1},8,["modelValue","onChange"])]})),_:1}),c(B,{label:"单独分销设置："},{default:_((function(){return[c(D,{type:"number",min:"0",modelValue:W.form.model.first_money,"onUpdate:modelValue":l[12]||(l[12]=function(e){return W.form.model.first_money=e}),class:"max-w460"},{prepend:_((function(){return[p(" 一级佣金： ")]})),append:_((function(){return[p(v(R.unit),1)]})),_:1},8,["modelValue"])]})),_:1}),W.form.basicSetting.level>=2?(f(),g(B,{key:0},{default:_((function(){return[c(D,{type:"number",min:"0",modelValue:W.form.model.second_money,"onUpdate:modelValue":l[13]||(l[13]=function(e){return W.form.model.second_money=e}),class:"max-w460"},{prepend:_((function(){return[p(" 二级佣金： ")]})),append:_((function(){return[p(v(R.unit),1)]})),_:1},8,["modelValue"])]})),_:1})):y("",!0),W.form.basicSetting.level>=3?(f(),g(B,{key:1},{default:_((function(){return[c(D,{type:"number",min:"0",modelValue:W.form.model.third_money,"onUpdate:modelValue":l[14]||(l[14]=function(e){return W.form.model.third_money=e}),class:"max-w460"},{prepend:_((function(){return[p(" 三级佣金： ")]})),append:_((function(){return[p(v(R.unit),1)]})),_:1},8,["modelValue"])]})),_:1})):y("",!0)],64)):y("",!0)],64)):y("",!0)])}]]))}}}));