import{$ as e,y as a,h as l,b as t,c as s,w as c,b3 as o,U as i,d as u,ad as d,V as n,W as r,X as p,a5 as m,f as y,j as f,k,l as v,Y as _,n as h,m as V,t as g,_ as x}from"./index-d7b23344.js";const C=x({__name:"ti-select",props:{modelValue:{type:[String,Number]},localdata:{type:Array,default:()=>[]},clear:{type:Boolean,default:!0},placeholder:{type:String,default:e("请输入")},placement:{type:String,default:"bottom"}},emits:["update:modelValue","change"],setup(e,{emit:x}){const C=e,b=a(!1),z=l((()=>{var e;return(null==(e=C.localdata.find((e=>e.value==C.modelValue)))?void 0:e.text)||""})),S=()=>{x("update:modelValue",""),x("change","")};return(e,a)=>{const l=y,j=f(v("uni-icons"),k),w=_;return t(),s(l,{class:"ti-select",onClick:a[1]||(a[1]=e=>b.value=!0)},{default:c((()=>[o(e.$slots,"select",{},(()=>[u(l,{class:"ti-select-input-box"},{default:c((()=>[h(z)?(t(),s(l,{key:0,class:"ti-select-input-text"},{default:c((()=>[V(g(h(z)),1)])),_:1})):(t(),s(l,{key:1,class:"ti-select-placeholder"},{default:c((()=>[V(g(C.placeholder),1)])),_:1})),h(z)&&C.clear?(t(),s(l,{key:2,class:"ti-select-icon",onClick:d(S,["stop"])},{default:c((()=>[u(j,{type:"closeempty",size:"16",color:"#999999"})])),_:1},8,["onClick"])):(t(),s(l,{key:3,class:p(["ti-select-icon ti-icon-down",{active:b.value}])},{default:c((()=>[u(j,{type:"right",size:"16",color:"#100A05"})])),_:1},8,["class"]))])),_:1})]),!0),b.value?(t(),i(n,{key:0},[u(l,{class:"ti-select-mask",onClick:a[0]||(a[0]=d((e=>b.value=!1),["stop"]))}),u(l,{class:p(["ti-select-selector",C.placement])},{default:c((()=>[u(w,{"scroll-y":""},{default:c((()=>[(t(!0),i(n,null,r(C.localdata,(e=>(t(),s(l,{key:e.value,class:p(["ti-select-selector-item",{active:e.value==C.modelValue}]),onClick:d((a=>{return l=e.value,x("update:modelValue",l),x("change",l),void(b.value=!1);var l}),["stop"])},{default:c((()=>[u(l,{class:"ti-select-selector-item-text"},{default:c((()=>[V(g(e.text),1)])),_:2},1024),e.value==C.modelValue?(t(),s(l,{key:0,class:"ti-select-selector-item-icon"},{default:c((()=>[u(j,{type:"checkmarkempty",size:"16",color:"#FFBE00"})])),_:1})):m("",!0)])),_:2},1032,["class","onClick"])))),128))])),_:1})])),_:1},8,["class"])],64)):m("",!0)])),_:3})}}},[["__scopeId","data-v-e250e34a"]]);export{C as _};