System.register(["./element-plus-legacy-b16a6c53.js","./message-legacy-800fabb0.js","./index-legacy-37de8052.js","./@vue-legacy-11820b46.js","./@vueuse-legacy-fb10ab28.js","./lodash-es-legacy-b311526b.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-e28812ab.js","./dayjs-legacy-4b173016.js","./call-bind-legacy-a7650b66.js","./get-intrinsic-legacy-675d089b.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-b76e1749.js","./has-legacy-06d86c07.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./vue-router-legacy-4115aea7.js","./pinia-legacy-dd7b0b91.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-a87a5df5.js","./side-channel-legacy-9446be19.js","./object-inspect-legacy-b9938498.js","./vue-ueditor-wrap-legacy-0affb7fa.js"],(function(e,l){"use strict";var t,n,a,i,s,o,d,u,c,r,g,f,m,p,_,h,y,v,j;return{setters:[function(e){t=e.E,n=e.c,a=e.d,i=e.l,s=e.m,o=e.b,d=e.e,u=e.o,c=e.v},function(e){r=e.M},function(e){g=e._},function(e){f=e.o,m=e.T,p=e.S,_=e.a,h=e.P,y=e.W,v=e.$,j=e.X},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={data:function(){return{formLabelWidth:"120px",dialogVisible:!1,loading:!1,isupload:!1,fieldList:[],title:"设置公众号消息模板",checkList:[],settings:{},template_id:""}},props:["open_mp","messageModel"],created:function(){this.dialogVisible=this.open_mp,this.title=this.title+"("+this.messageModel.message_name+")",this.getData()},methods:{getData:function(){var e=this;e.loading=!0,r.fieldList({message_id:e.messageModel.message_id,message_type:"mp"},!0).then((function(l){l.data.list.forEach((function(e){e.field_new_ename=e.field_ename,e.filed_new_value=e.filed_value})),e.fieldList=l.data.list,null==l.data.settings||0==l.data.settings.length?(e.settings={},e.template_id=""):(e.settings=l.data.settings,e.template_id=l.data.settings.template_id),e.loading=!1,e.$nextTick((function(){e.initChecked()}))})).catch((function(e){}))},saveTemplate:function(){var e=this;e.loading=!0,r.saveSettings({fieldList:e.checkList,message_id:e.messageModel.message_id,message_type:"mp",template_id:e.template_id}).then((function(l){e.loading=!1,t({message:"保存成功",type:"success"}),e.dialogFormVisible(!0)})).catch((function(l){e.loading=!1}))},dialogFormVisible:function(e){e?this.$emit("closeDialog",{type:"success",openDialog:!1}):this.$emit("closeDialog",{type:"error",openDialog:!1})},handleSelectionChange:function(e){this.checkList=e},initChecked:function(){var e=this;"{}"!=JSON.stringify(e.settings)&&Object.keys(e.settings.var_data).forEach((function(l){e.fieldList.forEach((function(t){t.field_ename==l&&(e.$refs.fieldTable.toggleRowSelection(t,!0),t.field_new_ename=e.settings.var_data[l].field_name,t.filed_new_value=e.settings.var_data[l].filed_value)}))}))}}},b={class:"table-wrap"},w=_("div",{class:"operation-wrap"},[_("p",null," 配置说明："),_("p",null," 1、公众号模板里有的字段才勾选，如果没有请勿勾选。"),_("p",null," 2、模板变量替换成公众号模板里的字段。")],-1),V=["textContent"],C={class:"dialog-footer"};e("default",g(l,[["render",function(e,l,t,r,g,k){var L=n,x=a,S=i,D=s,T=o,U=d,z=u,M=c;return f(),m(z,{title:g.title,modelValue:g.dialogVisible,"onUpdate:modelValue":l[1]||(l[1]=function(e){return g.dialogVisible=e}),onClose:k.dialogFormVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},{footer:p((function(){return[_("div",C,[h(U,{onClick:k.dialogFormVisible},{default:p((function(){return[y("取 消")]})),_:1},8,["onClick"]),h(U,{type:"primary",onClick:k.saveTemplate,loading:g.loading},{default:p((function(){return[y("确 定")]})),_:1},8,["onClick","loading"])])]})),default:p((function(){return[h(T,{size:"small"},{default:p((function(){return[_("div",b,[w,_("div",null,[h(x,{label:"模板id："},{default:p((function(){return[h(L,{size:"small",class:"max-w460",modelValue:g.template_id,"onUpdate:modelValue":l[0]||(l[0]=function(e){return g.template_id=e}),placeholder:"请填写申请的公众号模板消息id"},null,8,["modelValue"])]})),_:1})]),v((f(),m(D,{border:"",ref:"fieldTable",data:g.fieldList,onSelectionChange:k.handleSelectionChange},{default:p((function(){return[h(S,{type:"selection",width:"55"}),h(S,{label:"字段名称"},{default:p((function(e){return[_("label",{textContent:j(e.row.field_name)},null,8,V)]})),_:1}),h(S,{label:"模板变量名"},{default:p((function(e){return[h(L,{size:"small",prop:"field_new_ename",modelValue:e.row.field_new_ename,"onUpdate:modelValue":function(l){return e.row.field_new_ename=l}},null,8,["modelValue","onUpdate:modelValue"])]})),_:1}),h(S,{label:"模板内容"},{default:p((function(e){return[h(L,{size:"small",prop:"filed_new_value",disabled:1===e.row.is_var,modelValue:e.row.filed_new_value,"onUpdate:modelValue":function(l){return e.row.filed_new_value=l}},null,8,["disabled","modelValue","onUpdate:modelValue"])]})),_:1})]})),_:1},8,["data","onSelectionChange"])),[[M,g.loading]])])]})),_:1})]})),_:1},8,["title","modelValue","onClose"])}]]))}}}));
