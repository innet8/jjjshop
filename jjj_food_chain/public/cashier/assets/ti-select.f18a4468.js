import{_ as e,h as a,C as l,n as t,y as s,p as c,b as o,c as i,w as u,aA as d,d as n,v as r,q as p,t as m,$ as f,ap as y,a2 as v,a5 as _,a6 as k,a7 as h,af as b,i as g,a8 as x}from"./index-0ff7ee5a.js";const C=e({__name:"ti-select",props:{modelValue:{type:[String,Number]},localdata:{type:Array,default:()=>[]},clear:{type:Boolean,default:!0},placeholder:{type:String,default:null},placement:{type:String,default:"bottom"}},emits:["update:modelValue","change"],setup(e,{emit:C}){const V=e,z=a(!1),A=l((()=>{var e;return(null==(e=V.localdata.find((e=>e.value==V.modelValue)))?void 0:e.text)||""})),S=()=>{C("update:modelValue",""),C("change","")};return(e,a)=>{const l=g,w=t(c("uni-icons"),s),B=x;return o(),i(l,{class:"ti-select",onClick:a[1]||(a[1]=e=>z.value=!0)},{default:u((()=>[d(e.$slots,"select",{},(()=>[n(l,{class:"ti-select-input-box"},{default:u((()=>[r(A)?(o(),i(l,{key:0,class:"ti-select-input-text"},{default:u((()=>[p(m(r(A)),1)])),_:1})):(o(),i(l,{key:1,class:"ti-select-placeholder"},{default:u((()=>[p(m(V.placeholder||r(f)("请输入")),1)])),_:1})),r(A)&&V.clear?(o(),i(l,{key:2,class:"ti-select-icon",onClick:y(S,["stop"])},{default:u((()=>[n(w,{type:"closeempty",size:"16",color:"#999999"})])),_:1},8,["onClick"])):(o(),i(l,{key:3,class:v(["ti-select-icon ti-icon-down",{active:z.value}])},{default:u((()=>[n(w,{type:"right",size:"16",color:"#100A05"})])),_:1},8,["class"]))])),_:1})]),!0),z.value?(o(),_(k,{key:0},[n(l,{class:"ti-select-mask",onClick:a[0]||(a[0]=y((e=>z.value=!1),["stop"]))}),n(l,{class:v(["ti-select-selector",V.placement])},{default:u((()=>[n(B,{"scroll-y":""},{default:u((()=>[(o(!0),_(k,null,h(V.localdata,(e=>(o(),i(l,{key:e.value,class:v(["ti-select-selector-item",{active:e.value==V.modelValue}]),onClick:y((a=>{return l=e.value,C("update:modelValue",l),C("change",l),void(z.value=!1);var l}),["stop"])},{default:u((()=>[n(l,{class:"ti-select-selector-item-text"},{default:u((()=>[p(m(e.text),1)])),_:2},1024),e.value==V.modelValue?(o(),i(l,{key:0,class:"ti-select-selector-item-icon"},{default:u((()=>[n(w,{type:"checkmarkempty",size:"16",color:"#FFBE00"})])),_:1})):b("",!0)])),_:2},1032,["class","onClick"])))),128))])),_:1})])),_:1},8,["class"])],64)):b("",!0)])),_:3})}}},[["__scopeId","data-v-bbfbf06d"]]);export{C as _};