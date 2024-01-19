import{e,f as o,i as l,h as s,g as a,w as t}from"./element-plus-b30a858e.js";import{_ as i}from"./Upload-2fb809cc.js";import{ag as r,ap as m,o as p,T as d,S as n,a as u,P as c,W as f,X as g,Z as j,c as h,Q as b,a8 as _,$ as v,a1 as V,Y as C}from"./@vue-e5cdee21.js";import{_ as U}from"./_plugin-vue_export-helper-1b428a4d.js";import"./@vueuse-f6c48e1e.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-f5b82f61.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./file-c9c3a485.js";import"./index-708a85b3.js";import"./vue-router-2729bdc9.js";import"./pinia-805bca39.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-f67db3fa.js";import"./vue-i18n-2607567b.js";import"./@intlify-f009848f.js";import"./vue-cropperjs-a8153a2d.js";import"./vue-5933b83d.js";import"./cropperjs-81999277.js";const k={class:"draggable-list"},P=["onClick"],y={class:"dialog-footer"};const $=U({components:{Upload:i},props:["title","open"],created(){this.dialogVisible=this.open},data:()=>({isProductUpload:!1,loading:!1,form:{name:"",image:[]}}),methods:{openProductUpload:function(){this.isProductUpload=!0},returnProductImgsFunc(e){if(null!=e){let o=this.form.image.concat(e);this.form.image=o}this.isProductUpload=!1},deleteImg(e){this.form.image.splice(e,1)},onSubmit(){this.form,this.$refs.form.validate((e=>{}))},handleClose(){this.$emit("close")}}},[["render",function(U,$,I,w,q,x){const z=e,S=o,F=r("Close"),R=l,W=r("draggable"),A=r("Plus"),B=s,Q=a,T=i,X=t,Y=m("img-url");return p(),d(X,{class:"",onClose:x.handleClose,modelValue:U.dialogVisible,"onUpdate:modelValue":$[4]||($[4]=e=>U.dialogVisible=e),"close-on-click-modal":!1,"close-on-press-escape":!1,title:I.title},{footer:n((()=>[u("span",y,[c(Q,{onClick:x.handleClose},{default:n((()=>[f(g(U.$t("取消")),1)])),_:1},8,["onClick"]),c(Q,{type:"primary",onClick:x.onSubmit,loading:q.loading},{default:n((()=>[f(g(U.$t("确定")),1)])),_:1},8,["onClick","loading"])])])),default:n((()=>[c(B,{size:"small",ref:"form",model:q.form,"label-position":"top"},{default:n((()=>[c(S,{label:U.$t("名称"),prop:"name",rules:[{required:!0,message:U.$t("请输入名称")}]},{default:n((()=>[c(z,{modelValue:q.form.name,"onUpdate:modelValue":$[0]||($[0]=e=>q.form.name=e)},null,8,["modelValue"])])),_:1},8,["label","rules"]),c(S,{label:U.$t("图片"),prop:"image",rules:[{required:!0,message:""}]},{default:n((()=>[u("div",k,[c(W,{class:"wrapper",modelValue:q.form.image,"onUpdate:modelValue":$[1]||($[1]=e=>q.form.image=e)},{default:n((()=>[c(j,null,{default:n((()=>[(p(!0),h(b,null,_(q.form.image,((e,o)=>(p(),h("div",{class:"item",key:e.file_path},[v(u("img",null,null,512),[[Y,e.file_path]]),u("a",{href:"javascript:void(0);",class:"delete-btn",onClick:V((e=>x.deleteImg(o)),["stop"])},[c(R,null,{default:n((()=>[c(F)])),_:1})],8,P)])))),128))])),_:1})])),_:1},8,["modelValue"]),0==q.form.image.length?(p(),h("div",{key:0,class:"item img-select",onClick:$[2]||($[2]=(...e)=>x.openProductUpload&&x.openProductUpload(...e))},[c(R,null,{default:n((()=>[c(A)])),_:1})])):C("",!0)])])),_:1},8,["label"]),c(S,{label:U.$t("排序"),prop:"name",rules:[{required:!0,message:U.$t("请输入排序")}]},{default:n((()=>[c(z,{modelValue:q.form.name,"onUpdate:modelValue":$[3]||($[3]=e=>q.form.name=e)},null,8,["modelValue"])])),_:1},8,["label","rules"])])),_:1},8,["model"]),q.isProductUpload?(p(),d(T,{key:0,config:{total:9},isupload:q.isProductUpload,onReturnImgs:x.returnProductImgsFunc},{default:n((()=>[f("上传图片")])),_:1},8,["isupload","onReturnImgs"])):C("",!0)])),_:1},8,["onClose","modelValue","title"])}]]);export{$ as default};
