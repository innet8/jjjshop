System.register(["./Upload-legacy-96e70367.js","./element-plus-legacy-1289937f.js","./index-legacy-55d30006.js","./@vue-legacy-517223d5.js","./_plugin-vue_export-helper-legacy-c6aa7c23.js","./file-legacy-acc50988.js","./vue-cropperjs-legacy-6f5c6c93.js","./vue-legacy-91aae751.js","./call-bind-legacy-73eeac96.js","./get-intrinsic-legacy-4661647d.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-a8d405fe.js","./has-legacy-c734e567.js","./cropperjs-legacy-836916f5.js","./@vueuse-legacy-67eaf7fb.js","./lodash-es-legacy-6808e864.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-54b077e6.js","./dayjs-legacy-dfa4e03a.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./vue-router-legacy-57460840.js","./pinia-legacy-b89d16df.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-65fc6596.js","./side-channel-legacy-8b5a2adf.js","./object-inspect-legacy-fcd55e63.js","./pinia-plugin-persistedstate-legacy-01cca48d.js","./vue-ueditor-wrap-legacy-fb79f073.js","./vue-i18n-legacy-859a0eb8.js","./@intlify-legacy-d0534b73.js"],(function(e,l){"use strict";var n,a,t,o,u,r,c,i,s,d,m,p,g,f,y,j,h,_,v,b,U,V,$,P,x;return{setters:[function(e){n=e._},function(e){a=e.g,t=e.h,o=e.Q,u=e.q,r=e.r,c=e.j},function(e){i=e.l},function(e){s=e.ag,d=e.ap,m=e.o,p=e.c,g=e.a,f=e.X,y=e.Q,j=e.a8,h=e.T,_=e.S,v=e.P,b=e.W,U=e.Z,V=e.$,$=e.a1,P=e.Y},function(e){x=e._},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l=i().languageList,k={class:"basic-setting-content"},w={class:"common-form"},I={class:"draggable-list"},q=["onClick"],C={class:"gray9"};e("default",x({components:{Upload:n},data:function(){return{formData:{},isProductUpload:!1,languageList:l,options:[]}},inject:["form"],watch:{form:{handler:function(e){var l=this;this.options=[],e.category.map((function(e,n){l.options.push({value:e.category_id,label:e.name_text,children:[]}),e.child.map((function(e,a){l.options[n].children.push({value:e.category_id,label:e.name_text})}))}))},deep:!0,immediate:!0}},created:function(){this.formData=this.form},methods:{openProductUpload:function(){this.isProductUpload=!0},returnProductImgsFunc:function(e){if(null!=e){var l=this.form.model.image.concat(e);this.form.model.image=l}this.isProductUpload=!1},deleteImg:function(e){this.form.model.image.splice(e,1)}}},[["render",function(e,l,i,x,G,L){var S=a,z=t,B=o,D=u,F=r,J=s("Close"),Q=c,R=s("draggable"),W=s("Plus"),A=n,E=d("img-url");return m(),p("div",k,[g("div",w,f(e.$t("基本信息")),1),(m(!0),p(y,null,j(G.languageList,(function(l,n){return m(),h(z,{key:n,label:e.$t("商品名称：")+"(".concat(l.label,")"),prop:"model.product_name.".concat(l.key),rules:[{required:!0,message:e.$t("请填写商品名称")}]},{default:_((function(){return[v(S,{modelValue:L.form.model.product_name[l.key],"onUpdate:modelValue":function(e){return L.form.model.product_name[l.key]=e},placeholder:e.$t("请输入商品名称"),class:"max-w460"},null,8,["modelValue","onUpdate:modelValue","placeholder"])]})),_:2},1032,["label","prop","rules"])})),128)),v(z,{label:e.$t("所属分类："),rules:[{required:!0,message:e.$t("请选择所属分类")}],prop:"model.category_id"},{default:_((function(){return[v(B,{options:G.options,modelValue:L.form.model.category_id,"onUpdate:modelValue":l[0]||(l[0]=function(e){return L.form.model.category_id=e}),clearable:"",props:{checkStrictly:!0},placeholder:e.$t("请选择分类")},null,8,["options","modelValue","placeholder"])]})),_:1},8,["label","rules"]),v(z,{label:e.$t("特色分类：")},{default:_((function(){return[v(F,{modelValue:L.form.model.special_id,"onUpdate:modelValue":l[1]||(l[1]=function(e){return L.form.model.special_id=e}),placeholder:e.$t("请选择特色分类")},{default:_((function(){return[(m(!0),p(y,null,j(L.form.special,(function(e){return m(),p(y,{key:e.category_id},[v(D,{value:e.category_id,label:e.name_text},null,8,["value","label"]),(m(!0),p(y,null,j(e.child,(function(e){return m(),h(D,{key:e.category_id,value:e.category_id,label:e.name_text},{default:_((function(){return[b("|—"+f(e.name_text),1)]})),_:2},1032,["value","label"])})),128))],64)})),128))]})),_:1},8,["modelValue","placeholder"])]})),_:1},8,["label"]),v(z,{label:e.$t("商品图片："),rules:[{required:!0,message:e.$t("请上传商品图片")}],prop:"model.image"},{default:_((function(){return[g("div",I,[v(R,{class:"wrapper",modelValue:L.form.model.image,"onUpdate:modelValue":l[2]||(l[2]=function(e){return L.form.model.image=e})},{default:_((function(){return[v(U,null,{default:_((function(){return[(m(!0),p(y,null,j(L.form.model.image,(function(e,l){return m(),p("div",{class:"item",key:e.file_path},[V(g("img",null,null,512),[[E,e.file_path]]),g("a",{href:"javascript:void(0);",class:"delete-btn",onClick:$((function(e){return L.deleteImg(l)}),["stop"])},[v(Q,null,{default:_((function(){return[v(J)]})),_:1})],8,q)])})),128))]})),_:1})]})),_:1},8,["modelValue"]),g("div",{class:"item img-select",onClick:l[3]||(l[3]=function(){return L.openProductUpload&&L.openProductUpload.apply(L,arguments)})},[v(Q,null,{default:_((function(){return[v(W)]})),_:1})])]),g("div",C,f(e.$t("支持JPG、JPEG、PNG格式，小于15MB，尺寸：48*48px")),1)]})),_:1},8,["label","rules"]),v(z,{label:e.$t("商品卖点：")},{default:_((function(){return[v(S,{type:"textarea",placeholder:e.$t("请输入商品卖点"),modelValue:L.form.model.selling_point,"onUpdate:modelValue":l[4]||(l[4]=function(e){return L.form.model.selling_point=e}),"show-word-limit":"",maxlength:50,class:"max-w460"},null,8,["placeholder","modelValue"])]})),_:1},8,["label"]),G.isProductUpload?(m(),h(A,{key:0,config:{total:9},isupload:G.isProductUpload,onReturnImgs:L.returnProductImgsFunc},{default:_((function(){return[b(f(e.$t("上传图片")),1)]})),_:1},8,["isupload","onReturnImgs"])):P("",!0)])}]]))}}}));
