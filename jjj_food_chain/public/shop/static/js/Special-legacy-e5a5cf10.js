System.register(["./element-plus-legacy-b16a6c53.js","./article-legacy-4d009ee4.js","./index-legacy-37de8052.js","./@vue-legacy-11820b46.js","./@vueuse-legacy-fb10ab28.js","./lodash-es-legacy-b311526b.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-e28812ab.js","./dayjs-legacy-4b173016.js","./call-bind-legacy-a7650b66.js","./get-intrinsic-legacy-675d089b.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-b76e1749.js","./has-legacy-06d86c07.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./vue-router-legacy-4115aea7.js","./pinia-legacy-dd7b0b91.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-a87a5df5.js","./side-channel-legacy-9446be19.js","./object-inspect-legacy-b9938498.js","./vue-ueditor-wrap-legacy-0affb7fa.js"],(function(e,l){"use strict";var t,a,n,u,c,r,o,s,i,d,m,g,y,f,p,j,h,v,b,_,I,x=document.createElement("style");return x.textContent=".diy-special-cover img{width:140px;height:38px}\n",document.head.appendChild(x),{setters:[function(e){t=e.r,a=e.s,n=e.d,u=e.c,c=e.h,r=e.w,o=e.b},function(e){s=e.A},function(e){i=e._},function(e){d=e.ap,m=e.o,g=e.c,y=e.a,f=e.X,p=e.P,j=e.S,h=e.Q,v=e.a8,b=e.T,_=e.$,I=e.W},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={data:function(){return{category:[]}},props:["curItem","selectedIndex","opts"],created:function(){this.getData()},methods:{getData:function(){var e=this;s.getCategory({page_id:e.page_id},!0).then((function(l){e.category=l.data.category})).catch((function(l){e.loading=!1}))}}},x={class:"common-form"},w=y("div",null,[I(" 文章数据请到 "),y("a",{href:"#/plus/article/index",target:"_blank"},"内容管理 - 文章列表"),I(" 中管理 ")],-1),V={class:"diy-special-cover"},k=y("div",null,"建议尺寸136×33",-1);e("default",i(l,[["render",function(e,l,s,i,C,S){var U=t,q=a,z=n,D=u,E=c,N=r,W=o,$=d("img-url");return m(),g("div",null,[y("div",x,[y("span",null,f(s.curItem.name),1)]),p(W,{size:"small",model:s.curItem,"label-width":"100px"},{default:j((function(){return[p(z,{label:"文章分类："},{default:j((function(){return[p(q,{modelValue:s.curItem.params.auto.category,"onUpdate:modelValue":l[0]||(l[0]=function(e){return s.curItem.params.auto.category=e})},{default:j((function(){return[p(U,{label:"全部分类",value:0}),(m(!0),g(h,null,v(C.category,(function(e){return m(),b(U,{key:e.category_id,label:e.name,value:e.category_id},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),p(z,{label:"显示数量："},{default:j((function(){return[p(D,{type:"number",min:"1",modelValue:s.curItem.params.auto.showNum,"onUpdate:modelValue":l[1]||(l[1]=function(e){return s.curItem.params.auto.showNum=e}),style:{width:"auto"}},null,8,["modelValue"]),w]})),_:1}),p(z,{label:"图片："},{default:j((function(){return[y("div",V,[_(y("img",{alt:"",onClick:l[2]||(l[2]=function(l){return e.$parent.onEditorSelectImage(s.curItem.style,"image")})},null,512),[[$,s.curItem.style.image]]),k])]})),_:1}),p(z,{label:"显示类型："},{default:j((function(){return[p(N,{modelValue:s.curItem.style.display,"onUpdate:modelValue":l[3]||(l[3]=function(e){return s.curItem.style.display=e})},{default:j((function(){return[p(E,{label:1},{default:j((function(){return[I("单行")]})),_:1}),p(E,{label:2},{default:j((function(){return[I("两行")]})),_:1})]})),_:1},8,["modelValue"])]})),_:1})]})),_:1},8,["model"])])}]]))}}}));
