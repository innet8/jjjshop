import{h as l,w as e,d as t,M as s,O as o,N as a,c as m,e as r,b as i}from"./element-plus-7d357588.js";import{ap as d,o as u,c,a as n,X as p,P as f,S as y,W as V,a1 as b,Y as I,T as v,$ as h}from"./@vue-48c55b54.js";import{_ as g}from"./index-f792122d.js";import"./@vueuse-c556fb5a.js";import"./lodash-es-c1acaa3d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-e0f4a3e8.js";import"./dayjs-9faf8871.js";import"./call-bind-0c463fe3.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-b8ff3004.js";import"./pinia-73166104.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-942d6868.js";import"./side-channel-ba7aab8a.js";import"./object-inspect-860361a9.js";import"./vue-ueditor-wrap-cd29f9a1.js";const x={data:()=>({}),props:["curItem","selectedIndex","opts"],created(){this.curItem.style.paddingTop=parseInt(this.curItem.style.paddingTop),this.curItem.params.limit=parseInt(this.curItem.params.limit)},methods:{}},j={class:"common-form"},k=n("div",{class:"f16 gray3 form-subtitle"},"风格设置",-1),U=n("div",{class:"form-chink"},null,-1),z=n("div",{class:"f16 gray3 form-subtitle"},"优惠券数据",-1),_=n("div",{class:"f16 gray3 form-subtitle"},"优惠卷来源",-1),w={class:"form-item"},C=n("div",{class:"form-label"},"优惠券数量：",-1),R=n("div",{class:"form-chink"},null,-1),T=n("div",{class:"f16 gray3 form-subtitle"},"优惠券样式",-1),$={class:"form-item"},E=n("div",{class:"form-label"},"名称颜色：",-1),F={class:"flex-1 d-s-c",style:{height:"36px"}},q={class:"form-item"},B=n("div",{class:"form-label"},"面额颜色：",-1),D={class:"flex-1 d-s-c",style:{height:"36px"}},L={class:"form-item"},S=n("div",{class:"form-label"},"门槛颜色：",-1),M={class:"flex-1 d-s-c",style:{height:"36px"}},N=n("div",{class:"form-chink"},null,-1),O=n("div",{class:"f16 gray3 form-subtitle"},"按钮样式",-1),P={class:"form-item"},W=n("div",{class:"form-label"},"背景颜色：",-1),X={class:"flex-1 d-s-c",style:{height:"36px"}},Y={class:"form-item"},A=n("div",{class:"form-label"},"文字颜色：",-1),G={class:"flex-1 d-s-c",style:{height:"36px"}},H={class:"form-item"},J=n("div",{class:"form-label"},"按钮圆角：",-1),K=n("div",{class:"form-chink"},null,-1),Q=n("div",{class:"f16 gray3 form-subtitle"},"背景设置",-1),Z={key:0,class:"form-item"},ll=n("div",{class:"form-label"},"背景颜色：",-1),el={class:"flex-1 d-s-c",style:{height:"36px"}},tl={class:"diy-special-cover"},sl=n("div",null,"建议尺寸706px*288px",-1),ol=n("div",{class:"form-chink"},null,-1),al=n("div",{class:"f16 gray3 form-subtitle"},"组件样式",-1),ml={class:"form-item"},rl=n("div",{class:"form-label"},"底部背景：",-1),il={class:"flex-1 d-s-c",style:{height:"36px"}},dl={class:"form-item"},ul=n("div",{class:"form-label"},"上边距：",-1),cl={class:"form-item"},nl=n("div",{class:"form-label"},"下边距：",-1),pl={class:"form-item"},fl=n("div",{class:"form-label"},"左右边距：",-1),yl={class:"form-item"},Vl=n("div",{class:"form-label"},"上圆角：",-1),bl={class:"form-item"},Il=n("div",{class:"form-label"},"下圆角：",-1);const vl=g(x,[["render",function(g,x,vl,hl,gl,xl){const jl=l,kl=e,Ul=t,zl=s,_l=o,wl=a,Cl=m,Rl=r,Tl=i,$l=d("img-url");return u(),c("div",null,[n("div",j,[n("span",null,p(vl.curItem.name),1)]),f(Tl,{size:"small",model:vl.curItem,"label-width":"100px"},{default:y((()=>[k,f(Ul,{label:"风格："},{default:y((()=>[f(kl,{modelValue:g.formData.type,"onUpdate:modelValue":x[0]||(x[0]=l=>g.formData.type=l)},{default:y((()=>[f(jl,{label:"0"},{default:y((()=>[V("风格1")])),_:1}),f(jl,{label:"1"},{default:y((()=>[V("风格2")])),_:1}),f(jl,{label:"2"},{default:y((()=>[V("风格3")])),_:1})])),_:1},8,["modelValue"])])),_:1}),U,z,_,f(Ul,{label:"文字加粗："},{default:y((()=>[f(kl,{modelValue:vl.curItem.style.weight,"onUpdate:modelValue":x[1]||(x[1]=l=>vl.curItem.style.weight=l)},{default:y((()=>[f(zl,{label:400},{default:y((()=>[V("标准")])),_:1}),f(zl,{label:800},{default:y((()=>[V("加粗")])),_:1})])),_:1},8,["modelValue"])])),_:1}),n("div",w,[C,f(_l,{min:1,max:30,modelValue:vl.curItem.params.limit,"onUpdate:modelValue":x[2]||(x[2]=l=>vl.curItem.params.limit=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),R,T,n("div",$,[E,n("div",F,[f(wl,{size:"default",modelValue:vl.curItem.style.descolor,"onUpdate:modelValue":x[3]||(x[3]=l=>vl.curItem.style.descolor=l)},null,8,["modelValue"]),f(Cl,{class:"ml10",modelValue:vl.curItem.style.descolor,"onUpdate:modelValue":x[4]||(x[4]=l=>vl.curItem.style.descolor=l),placeholder:"透明"},null,8,["modelValue"]),f(Rl,{style:{"margin-left":"10px"},onClick:x[5]||(x[5]=b((l=>g.$parent.onEditorResetColor(vl.curItem.style,"descolor","#666666")),["stop"])),type:"primary",link:""},{default:y((()=>[V("重置")])),_:1})])]),n("div",q,[B,n("div",D,[f(wl,{size:"default",modelValue:vl.curItem.style.pricecolor,"onUpdate:modelValue":x[6]||(x[6]=l=>vl.curItem.style.pricecolor=l)},null,8,["modelValue"]),f(Cl,{class:"ml10",modelValue:vl.curItem.style.pricecolor,"onUpdate:modelValue":x[7]||(x[7]=l=>vl.curItem.style.pricecolor=l),placeholder:"透明"},null,8,["modelValue"]),f(Rl,{style:{"margin-left":"10px"},onClick:x[8]||(x[8]=b((l=>g.$parent.onEditorResetColor(vl.curItem.style,"pricecolor","#ff4c01")),["stop"])),type:"primary",link:""},{default:y((()=>[V("重置")])),_:1})])]),n("div",L,[S,n("div",M,[f(wl,{size:"default",modelValue:vl.curItem.style.cillcolor,"onUpdate:modelValue":x[9]||(x[9]=l=>vl.curItem.style.cillcolor=l)},null,8,["modelValue"]),f(Cl,{class:"ml10",modelValue:vl.curItem.style.cillcolor,"onUpdate:modelValue":x[10]||(x[10]=l=>vl.curItem.style.cillcolor=l),placeholder:"透明"},null,8,["modelValue"]),f(Rl,{style:{"margin-left":"10px"},onClick:x[11]||(x[11]=b((l=>g.$parent.onEditorResetColor(vl.curItem.style,"cillcolor","#ff4c01")),["stop"])),type:"primary",link:""},{default:y((()=>[V("重置")])),_:1})])]),N,O,n("div",P,[W,n("div",X,[f(wl,{size:"default",modelValue:vl.curItem.style.btncolor,"onUpdate:modelValue":x[12]||(x[12]=l=>vl.curItem.style.btncolor=l)},null,8,["modelValue"]),f(Cl,{class:"ml10",modelValue:vl.curItem.style.btncolor,"onUpdate:modelValue":x[13]||(x[13]=l=>vl.curItem.style.btncolor=l),placeholder:"透明"},null,8,["modelValue"]),f(Rl,{style:{"margin-left":"10px"},onClick:x[14]||(x[14]=b((l=>g.$parent.onEditorResetColor(vl.curItem.style,"btncolor","#ff4c01")),["stop"])),type:"primary",link:""},{default:y((()=>[V("重置")])),_:1})])]),n("div",Y,[A,n("div",G,[f(wl,{size:"default",modelValue:vl.curItem.style.btnTxtcolor,"onUpdate:modelValue":x[15]||(x[15]=l=>vl.curItem.style.btnTxtcolor=l)},null,8,["modelValue"]),f(Cl,{class:"ml10",modelValue:vl.curItem.style.btnTxtcolor,"onUpdate:modelValue":x[16]||(x[16]=l=>vl.curItem.style.btnTxtcolor=l),placeholder:"透明"},null,8,["modelValue"]),f(Rl,{style:{"margin-left":"10px"},onClick:x[17]||(x[17]=b((l=>g.$parent.onEditorResetColor(vl.curItem.style,"btnTxtcolor","#FFFFFF")),["stop"])),type:"primary",link:""},{default:y((()=>[V("重置")])),_:1})])]),n("div",H,[J,f(_l,{min:0,max:24,modelValue:vl.curItem.style.btnRadio,"onUpdate:modelValue":x[18]||(x[18]=l=>vl.curItem.style.btnRadio=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),K,Q,f(Ul,{label:"组件背景："},{default:y((()=>[f(kl,{modelValue:vl.curItem.style.bgtype,"onUpdate:modelValue":x[19]||(x[19]=l=>vl.curItem.style.bgtype=l)},{default:y((()=>[f(zl,{label:1},{default:y((()=>[V("背景色")])),_:1}),f(zl,{label:2},{default:y((()=>[V("背景图片")])),_:1})])),_:1},8,["modelValue"])])),_:1}),1==vl.curItem.style.bgtype?(u(),c("div",Z,[ll,n("div",el,[f(wl,{size:"default",modelValue:vl.curItem.style.background,"onUpdate:modelValue":x[20]||(x[20]=l=>vl.curItem.style.background=l)},null,8,["modelValue"]),f(Cl,{class:"ml10",modelValue:vl.curItem.style.background,"onUpdate:modelValue":x[21]||(x[21]=l=>vl.curItem.style.background=l),placeholder:"透明"},null,8,["modelValue"]),f(Rl,{style:{"margin-left":"10px"},onClick:x[22]||(x[22]=b((l=>g.$parent.onEditorResetColor(vl.curItem.style,"background","#ff4c01")),["stop"])),type:"primary",link:""},{default:y((()=>[V("重置")])),_:1})])])):I("",!0),2==vl.curItem.style.bgtype?(u(),v(Ul,{key:1,label:"背景图片："},{default:y((()=>[n("div",tl,[h(n("img",{alt:"",onClick:x[23]||(x[23]=l=>g.$parent.onEditorSelectImage(vl.curItem.style,"bgimage"))},null,512),[[$l,vl.curItem.style.bgimage]]),sl])])),_:1})):I("",!0),ol,al,n("div",ml,[rl,n("div",il,[f(wl,{size:"default",modelValue:vl.curItem.style.bgcolor,"onUpdate:modelValue":x[24]||(x[24]=l=>vl.curItem.style.bgcolor=l)},null,8,["modelValue"]),f(Cl,{class:"ml10",modelValue:vl.curItem.style.bgcolor,"onUpdate:modelValue":x[25]||(x[25]=l=>vl.curItem.style.bgcolor=l),placeholder:"透明"},null,8,["modelValue"]),f(Rl,{style:{"margin-left":"10px"},onClick:x[26]||(x[26]=b((l=>g.$parent.onEditorResetColor(vl.curItem.style,"bgcolor","#f2f2f2")),["stop"])),type:"primary",link:""},{default:y((()=>[V("重置")])),_:1})])]),n("div",dl,[ul,f(_l,{modelValue:vl.curItem.style.paddingTop,"onUpdate:modelValue":x[27]||(x[27]=l=>vl.curItem.style.paddingTop=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),n("div",cl,[nl,f(_l,{modelValue:vl.curItem.style.paddingBottom,"onUpdate:modelValue":x[28]||(x[28]=l=>vl.curItem.style.paddingBottom=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),n("div",pl,[fl,f(_l,{modelValue:vl.curItem.style.paddingLeft,"onUpdate:modelValue":x[29]||(x[29]=l=>vl.curItem.style.paddingLeft=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),n("div",yl,[Vl,f(_l,{modelValue:vl.curItem.style.topRadio,"onUpdate:modelValue":x[30]||(x[30]=l=>vl.curItem.style.topRadio=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),n("div",bl,[Il,f(_l,{modelValue:vl.curItem.style.bottomRadio,"onUpdate:modelValue":x[31]||(x[31]=l=>vl.curItem.style.bottomRadio=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])])])),_:1},8,["model"])])}]]);export{vl as default};
