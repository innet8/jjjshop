import{N as l,c as e,e as t,O as o,h as a,w as s,d as u,M as d,b as m}from"./element-plus-7d357588.js";import{ap as r,o as i,c,a as p,X as n,P as y,S as f,a1 as V,W as b,T as I,$ as _,Y as g}from"./@vue-48c55b54.js";import{_ as h}from"./index-f792122d.js";import"./@vueuse-c556fb5a.js";import"./lodash-es-c1acaa3d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-e0f4a3e8.js";import"./dayjs-9faf8871.js";import"./call-bind-0c463fe3.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-b8ff3004.js";import"./pinia-73166104.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-942d6868.js";import"./side-channel-ba7aab8a.js";import"./object-inspect-860361a9.js";import"./vue-ueditor-wrap-cd29f9a1.js";const v={data:()=>({productName:!1,peoples:!1,floorPrice:!1,originalPrice:!1}),props:["curItem","selectedIndex","opts"],created(){},methods:{getData(){let l=this.curItem;l.style.bgcolor="#FFFFFF",l.style.paddingLeft=0,l.style.paddingTop=0,l.style.paddingBottom=0,l.style.paddingRight=0,l.style.background="#FFFFFF",l.style.topRadio=0,l.style.bottomRadio=0,l.style.bgimage="#FFFFFF",l.style.titleType=1,l.style.title_image="#FFFFFF",l.style.moreColor="#FFFFFF",l.style.moreSize=0,l.style.productBg_color="#FFFFFF",l.style.product_bottomRadio=0,l.style.product_topRadio=0,l.style.product_imgRadio=0,l.style.salesColor="#FFFFFF",l.style.bgSales="#FFFFFF",l.style.productName_color="#FFFFFF",l.style.productPrice_color="#FFFFFF",l.style.productLine_color="#FFFFFF"},check(l,e){let t=l?"1":"0";this.curItem.style.show[e]=t},ResetColor(l,e){this.$parent.onEditorResetColor(this.curItem.style,l,""),e&&this.$parent.onEditorResetColor(this.curItem.style,e,"")}}},F={class:"common-form"},U=p("div",{class:"form-chink"},null,-1),x=p("div",{class:"f16 gray3 form-subtitle"},"组件样式",-1),C={class:"form-item"},k=p("div",{class:"form-label"},"底部背景：",-1),z={class:"flex-1 d-s-c",style:{height:"36px"}},w={class:"form-item"},R=p("div",{class:"form-label"},"组件背景：",-1),j={class:"flex-1 d-s-c",style:{height:"36px"}},N={class:"form-item"},S=p("div",{class:"form-label"},"上边距：",-1),$={class:"form-item"},E=p("div",{class:"form-label"},"下边距：",-1),B={class:"form-item"},L=p("div",{class:"form-label"},"左右边距：",-1),P={class:"form-item"},T=p("div",{class:"form-label"},"上圆角：",-1),q={class:"form-item"},D=p("div",{class:"form-label"},"下圆角：",-1),M=p("div",{class:"form-chink"},null,-1),O=p("div",{class:"f16 gray3 form-subtitle"},"商品数据",-1),W={class:"form-item"},X=p("div",{class:"form-label"},"商品数量：",-1),Y={class:"diy-special-cover"},A=p("text",null,"请选择链接",-1),G=p("div",{class:"form-chink"},null,-1),H=p("div",{class:"f16 gray3 form-subtitle"},"显示内容",-1),J=p("div",{class:"form-chink"},null,-1),K=p("div",{class:"f16 gray3 form-subtitle"},"商品样式",-1),Q={class:"form-item"},Z=p("div",{class:"form-label"},"文字颜色：",-1),ll={class:"flex-1 d-s-c",style:{height:"36px"}},el={class:"form-item"},tl=p("div",{class:"form-label"},"图片圆角：",-1),ol={class:"form-item"},al=p("div",{class:"form-label"},"上圆角：",-1),sl={class:"form-item"},ul=p("div",{class:"form-label"},"下圆角：",-1),dl={class:"form-item"},ml=p("div",{class:"form-label"},"商品名称：",-1),rl={class:"flex-1 d-s-c",style:{height:"36px"}},il={class:"form-item"},cl=p("div",{class:"form-label"},"销售价：",-1),pl={class:"flex-1 d-s-c",style:{height:"36px"}},nl={class:"form-item"},yl=p("div",{class:"form-label"},"划线价：",-1),fl={class:"flex-1 d-s-c",style:{height:"36px"}},Vl=p("div",{class:"form-chink"},null,-1),bl=p("div",{class:"f16 gray3 form-subtitle"},"按钮样式",-1),Il={class:"form-item"},_l=p("div",{class:"form-label"},"文字颜色：",-1),gl={class:"flex-1 d-s-c",style:{height:"36px"}},hl={class:"form-item"},vl=p("div",{class:"form-label"},"背景颜色：",-1),Fl={class:"flex-1 d-s-c",style:{height:"36px"}},Ul={class:"form-item"},xl=p("div",{class:"form-label"},"按钮圆角：",-1),Cl=p("div",{class:"form-chink"},null,-1),kl=p("div",{class:"f16 gray3 form-subtitle"},"标签样式",-1),zl={class:"form-item"},wl=p("div",{class:"form-label"},"文字颜色：",-1),Rl={class:"flex-1 d-s-c",style:{height:"36px"}},jl={class:"form-item"},Nl=p("div",{class:"form-label"},"背景颜色：",-1),Sl={class:"flex-1 d-s-c",style:{height:"36px"}};const $l=h(v,[["render",function(h,v,$l,El,Bl,Ll){const Pl=l,Tl=e,ql=t,Dl=o,Ml=a,Ol=s,Wl=u,Xl=d,Yl=m,Al=r("img-url");return i(),c("div",null,[p("div",F,[p("span",null,n($l.curItem.name)+"（--推荐商品--）",1)]),y(Yl,{size:"small",model:$l.curItem,"label-width":"100px"},{default:f((()=>[U,x,p("div",C,[k,p("div",z,[y(Pl,{size:"default",modelValue:$l.curItem.style.bgcolor,"onUpdate:modelValue":v[0]||(v[0]=l=>$l.curItem.style.bgcolor=l)},null,8,["modelValue"]),y(Tl,{class:"ml10",modelValue:$l.curItem.style.bgcolor,"onUpdate:modelValue":v[1]||(v[1]=l=>$l.curItem.style.bgcolor=l),placeholder:"透明"},null,8,["modelValue"]),y(ql,{style:{"margin-left":"10px"},onClick:v[2]||(v[2]=V((l=>h.$parent.onEditorResetColor($l.curItem.style,"bgcolor","")),["stop"])),type:"primary",link:""},{default:f((()=>[b("重置")])),_:1})])]),p("div",w,[R,p("div",j,[y(Pl,{size:"default",modelValue:$l.curItem.style.background,"onUpdate:modelValue":v[3]||(v[3]=l=>$l.curItem.style.background=l)},null,8,["modelValue"]),y(Tl,{class:"ml10",modelValue:$l.curItem.style.background,"onUpdate:modelValue":v[4]||(v[4]=l=>$l.curItem.style.background=l),placeholder:"透明"},null,8,["modelValue"]),y(ql,{style:{"margin-left":"10px"},onClick:v[5]||(v[5]=V((l=>h.$parent.onEditorResetColor($l.curItem.style,"background","#ffffff")),["stop"])),type:"primary",link:""},{default:f((()=>[b("重置")])),_:1})])]),p("div",N,[S,y(Dl,{modelValue:$l.curItem.style.paddingTop,"onUpdate:modelValue":v[6]||(v[6]=l=>$l.curItem.style.paddingTop=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),p("div",$,[E,y(Dl,{modelValue:$l.curItem.style.paddingBottom,"onUpdate:modelValue":v[7]||(v[7]=l=>$l.curItem.style.paddingBottom=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),p("div",B,[L,y(Dl,{modelValue:$l.curItem.style.paddingLeft,"onUpdate:modelValue":v[8]||(v[8]=l=>$l.curItem.style.paddingLeft=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),p("div",P,[T,y(Dl,{modelValue:$l.curItem.style.topRadio,"onUpdate:modelValue":v[9]||(v[9]=l=>$l.curItem.style.topRadio=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),p("div",q,[D,y(Dl,{modelValue:$l.curItem.style.bottomRadio,"onUpdate:modelValue":v[10]||(v[10]=l=>$l.curItem.style.bottomRadio=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),M,O,y(Wl,{label:"排序："},{default:f((()=>[y(Ol,{modelValue:$l.curItem.style.titleType,"onUpdate:modelValue":v[11]||(v[11]=l=>$l.curItem.style.titleType=l)},{default:f((()=>[y(Ml,{label:1},{default:f((()=>[b("综合")])),_:1}),y(Ml,{label:2},{default:f((()=>[b("销量")])),_:1}),y(Ml,{label:3},{default:f((()=>[b("价格")])),_:1})])),_:1},8,["modelValue"])])),_:1}),p("div",W,[X,y(Dl,{modelValue:$l.curItem.params.showNum,"onUpdate:modelValue":v[12]||(v[12]=l=>$l.curItem.params.showNum=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),2==$l.curItem.style.titleType?(i(),I(Wl,{key:0,label:"标题图片："},{default:f((()=>[p("div",Y,[_(p("img",{style:{width:"220px"},alt:"",onClick:v[13]||(v[13]=l=>h.$parent.onEditorSelectImage($l.curItem.style,"title_image"))},null,512),[[Al,$l.curItem.style.title_image]])])])),_:1})):g("",!0),y(Wl,{label:"数据来源："},{default:f((()=>[b("手动选择")])),_:1}),y(Wl,{label:"商品分类："},{default:f((()=>[A])),_:1}),G,H,y(Wl,{label:"展示风格："},{default:f((()=>[y(Ol,{modelValue:$l.curItem.style.presentation_style,"onUpdate:modelValue":v[14]||(v[14]=l=>$l.curItem.style.presentation_style=l)},{default:f((()=>[y(Xl,{label:1},{default:f((()=>[b("显示")])),_:1}),y(Xl,{label:2},{default:f((()=>[b("不显示")])),_:1})])),_:1},8,["modelValue"])])),_:1}),y(Wl,{label:"商品名称："},{default:f((()=>[y(Ol,{modelValue:$l.curItem.style.product_name,"onUpdate:modelValue":v[15]||(v[15]=l=>$l.curItem.style.product_name=l)},{default:f((()=>[y(Xl,{label:1},{default:f((()=>[b("显示")])),_:1}),y(Xl,{label:2},{default:f((()=>[b("不显示")])),_:1})])),_:1},8,["modelValue"])])),_:1}),y(Wl,{label:"销售价："},{default:f((()=>[y(Ol,{modelValue:$l.curItem.style.product_price,"onUpdate:modelValue":v[16]||(v[16]=l=>$l.curItem.style.product_price=l)},{default:f((()=>[y(Xl,{label:1},{default:f((()=>[b("显示")])),_:1}),y(Xl,{label:2},{default:f((()=>[b("不显示")])),_:1})])),_:1},8,["modelValue"])])),_:1}),y(Wl,{label:"按钮："},{default:f((()=>[y(Ol,{modelValue:$l.curItem.style.button,"onUpdate:modelValue":v[17]||(v[17]=l=>$l.curItem.style.button=l)},{default:f((()=>[y(Xl,{label:1},{default:f((()=>[b("显示")])),_:1}),y(Xl,{label:2},{default:f((()=>[b("不显示")])),_:1})])),_:1},8,["modelValue"])])),_:1}),y(Wl,{label:"活动标签："},{default:f((()=>[y(Ol,{modelValue:$l.curItem.style.active_title,"onUpdate:modelValue":v[18]||(v[18]=l=>$l.curItem.style.active_title=l)},{default:f((()=>[y(Xl,{label:1},{default:f((()=>[b("显示")])),_:1}),y(Xl,{label:2},{default:f((()=>[b("不显示")])),_:1})])),_:1},8,["modelValue"])])),_:1}),J,K,y(Wl,{label:"边框：",class:"pl56"},{default:f((()=>[y(Ol,{modelValue:$l.curItem.style.rowsNum,"onUpdate:modelValue":v[19]||(v[19]=l=>$l.curItem.style.rowsNum=l)},{default:f((()=>[y(Ml,{label:"1"},{default:f((()=>[b("默认")])),_:1}),y(Ml,{label:"2"},{default:f((()=>[b("投影")])),_:1}),y(Ml,{label:"3"},{default:f((()=>[b("描边")])),_:1})])),_:1},8,["modelValue"])])),_:1}),p("div",Q,[Z,p("div",ll,[y(Pl,{size:"default",modelValue:$l.curItem.style.productBg_color,"onUpdate:modelValue":v[20]||(v[20]=l=>$l.curItem.style.productBg_color=l)},null,8,["modelValue"]),y(Tl,{class:"ml10",modelValue:$l.curItem.style.productBg_color,"onUpdate:modelValue":v[21]||(v[21]=l=>$l.curItem.style.productBg_color=l),placeholder:"透明"},null,8,["modelValue"]),y(ql,{style:{"margin-left":"10px"},onClick:v[22]||(v[22]=V((l=>h.$parent.onEditorResetColor($l.curItem.style,"productBg_color","")),["stop"])),type:"primary",link:""},{default:f((()=>[b("重置")])),_:1})])]),p("div",el,[tl,y(Dl,{modelValue:$l.curItem.style.product_imgRadio,"onUpdate:modelValue":v[23]||(v[23]=l=>$l.curItem.style.product_imgRadio=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),y(Wl,{label:"商品名称：",class:"pl56"},{default:f((()=>[y(Ol,{modelValue:$l.curItem.style.productName,"onUpdate:modelValue":v[24]||(v[24]=l=>$l.curItem.style.productName=l)},{default:f((()=>[y(Ml,{label:"1"},{default:f((()=>[b("加粗")])),_:1}),y(Ml,{label:"2"},{default:f((()=>[b("单行")])),_:1}),y(Ml,{label:"3"},{default:f((()=>[b("多行")])),_:1})])),_:1},8,["modelValue"])])),_:1}),p("div",ol,[al,y(Dl,{modelValue:$l.curItem.style.product_topRadio,"onUpdate:modelValue":v[25]||(v[25]=l=>$l.curItem.style.product_topRadio=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),p("div",sl,[ul,y(Dl,{modelValue:$l.curItem.style.product_bottomRadio,"onUpdate:modelValue":v[26]||(v[26]=l=>$l.curItem.style.product_bottomRadio=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),y(Wl,{label:"色调：",class:"pl56"},{default:f((()=>[y(Ol,{modelValue:$l.curItem.style.tone,"onUpdate:modelValue":v[27]||(v[27]=l=>$l.curItem.style.tone=l)},{default:f((()=>[y(Ml,{label:"1"},{default:f((()=>[b("跟随主题风格")])),_:1}),y(Ml,{label:"2"},{default:f((()=>[b("自定义")])),_:1})])),_:1},8,["modelValue"])])),_:1}),p("div",dl,[ml,p("div",rl,[y(Pl,{size:"default",modelValue:$l.curItem.style.productName_color,"onUpdate:modelValue":v[28]||(v[28]=l=>$l.curItem.style.productName_color=l)},null,8,["modelValue"]),y(Tl,{class:"ml10",modelValue:$l.curItem.style.productName_color,"onUpdate:modelValue":v[29]||(v[29]=l=>$l.curItem.style.productName_color=l),placeholder:"透明"},null,8,["modelValue"]),y(ql,{style:{"margin-left":"10px"},onClick:v[30]||(v[30]=V((l=>h.$parent.onEditorResetColor($l.curItem.style,"productName_color","#333333")),["stop"])),type:"primary",link:""},{default:f((()=>[b(" 重置 ")])),_:1})])]),p("div",il,[cl,p("div",pl,[y(Pl,{size:"default",modelValue:$l.curItem.style.productPrice_color,"onUpdate:modelValue":v[31]||(v[31]=l=>$l.curItem.style.productPrice_color=l)},null,8,["modelValue"]),y(Tl,{class:"ml10",modelValue:$l.curItem.style.productPrice_color,"onUpdate:modelValue":v[32]||(v[32]=l=>$l.curItem.style.productPrice_color=l),placeholder:"透明"},null,8,["modelValue"]),y(ql,{style:{"margin-left":"10px"},onClick:v[33]||(v[33]=V((l=>h.$parent.onEditorResetColor($l.curItem.style,"productPrice_color","#FF4C01")),["stop"])),type:"primary",link:""},{default:f((()=>[b(" 重置 ")])),_:1})])]),p("div",nl,[yl,p("div",fl,[y(Pl,{size:"default",modelValue:$l.curItem.style.productLine_color,"onUpdate:modelValue":v[34]||(v[34]=l=>$l.curItem.style.productLine_color=l)},null,8,["modelValue"]),y(Tl,{class:"ml10",modelValue:$l.curItem.style.productLine_color,"onUpdate:modelValue":v[35]||(v[35]=l=>$l.curItem.style.productLine_color=l),placeholder:"透明"},null,8,["modelValue"]),y(ql,{style:{"margin-left":"10px"},onClick:v[36]||(v[36]=V((l=>h.$parent.onEditorResetColor($l.curItem.style,"productLine_color","#999999")),["stop"])),type:"primary",link:""},{default:f((()=>[b(" 重置 ")])),_:1})])]),Vl,bl,p("div",Il,[_l,p("div",gl,[y(Pl,{size:"default",modelValue:$l.curItem.style.salesColor,"onUpdate:modelValue":v[37]||(v[37]=l=>$l.curItem.style.salesColor=l)},null,8,["modelValue"]),y(Tl,{class:"ml10",modelValue:$l.curItem.style.salesColor,"onUpdate:modelValue":v[38]||(v[38]=l=>$l.curItem.style.salesColor=l),placeholder:"透明"},null,8,["modelValue"]),y(ql,{style:{"margin-left":"10px"},onClick:v[39]||(v[39]=V((l=>h.$parent.onEditorResetColor($l.curItem.style,"salesColor","#999999")),["stop"])),type:"primary",link:""},{default:f((()=>[b(" 重置 ")])),_:1})])]),p("div",hl,[vl,p("div",Fl,[y(Pl,{size:"default",modelValue:$l.curItem.style.bgSales,"onUpdate:modelValue":v[40]||(v[40]=l=>$l.curItem.style.bgSales=l)},null,8,["modelValue"]),y(Tl,{class:"ml10",modelValue:$l.curItem.style.bgSales,"onUpdate:modelValue":v[41]||(v[41]=l=>$l.curItem.style.bgSales=l),placeholder:"透明"},null,8,["modelValue"]),y(ql,{style:{"margin-left":"10px"},onClick:v[42]||(v[42]=V((l=>h.$parent.onEditorResetColor($l.curItem.style,"bgSales","#999999")),["stop"])),type:"primary",link:""},{default:f((()=>[b(" 重置 ")])),_:1})])]),p("div",Ul,[xl,y(Dl,{modelValue:$l.curItem.style.button_Radio,"onUpdate:modelValue":v[43]||(v[43]=l=>$l.curItem.style.button_Radio=l),size:"small","show-input":"","show-input-controls":!1,"input-size":"small"},null,8,["modelValue"])]),Cl,kl,p("div",zl,[wl,p("div",Rl,[y(Pl,{size:"default",modelValue:$l.curItem.style.salesColor,"onUpdate:modelValue":v[44]||(v[44]=l=>$l.curItem.style.salesColor=l)},null,8,["modelValue"]),y(Tl,{class:"ml10",modelValue:$l.curItem.style.salesColor,"onUpdate:modelValue":v[45]||(v[45]=l=>$l.curItem.style.salesColor=l),placeholder:"透明"},null,8,["modelValue"]),y(ql,{style:{"margin-left":"10px"},onClick:v[46]||(v[46]=V((l=>h.$parent.onEditorResetColor($l.curItem.style,"salesColor","#999999")),["stop"])),type:"primary",link:""},{default:f((()=>[b(" 重置 ")])),_:1})])]),p("div",jl,[Nl,p("div",Sl,[y(Pl,{size:"default",modelValue:$l.curItem.style.bgSales,"onUpdate:modelValue":v[47]||(v[47]=l=>$l.curItem.style.bgSales=l)},null,8,["modelValue"]),y(Tl,{class:"ml10",modelValue:$l.curItem.style.bgSales,"onUpdate:modelValue":v[48]||(v[48]=l=>$l.curItem.style.bgSales=l),placeholder:"透明"},null,8,["modelValue"]),y(ql,{style:{"margin-left":"10px"},onClick:v[49]||(v[49]=V((l=>h.$parent.onEditorResetColor($l.curItem.style,"bgSales","#999999")),["stop"])),type:"primary",link:""},{default:f((()=>[b(" 重置 ")])),_:1})])])])),_:1},8,["model"])])}]]);export{$l as default};
