import{r as e,s as a,d as t,c as l,h as s,w as o,b as r}from"./element-plus-7d357588.js";import{A as m}from"./article-2f415474.js";import{_ as i}from"./index-f792122d.js";import{ap as u,o as d,c as p,a as c,X as n,P as j,S as g,Q as y,a8 as h,T as b,$ as f,W as v}from"./@vue-48c55b54.js";import"./@vueuse-c556fb5a.js";import"./lodash-es-c1acaa3d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-e0f4a3e8.js";import"./dayjs-9faf8871.js";import"./call-bind-0c463fe3.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-b8ff3004.js";import"./pinia-73166104.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-942d6868.js";import"./side-channel-ba7aab8a.js";import"./object-inspect-860361a9.js";import"./vue-ueditor-wrap-cd29f9a1.js";const _={data:()=>({category:[]}),props:["curItem","selectedIndex","opts"],created(){this.getData()},methods:{getData(){let e=this;m.getCategory({page_id:e.page_id},!0).then((a=>{e.category=a.data.category})).catch((a=>{e.loading=!1}))}}},I={class:"common-form"},V=c("div",null,[v(" 文章数据请到 "),c("a",{href:"#/plus/article/index",target:"_blank"},"内容管理 - 文章列表"),v(" 中管理 ")],-1),w={class:"diy-special-cover"},x=c("div",null,"建议尺寸136×33",-1);const k=i(_,[["render",function(m,i,_,k,U,q){const z=e,C=a,D=t,N=l,S=s,W=o,$=r,A=u("img-url");return d(),p("div",null,[c("div",I,[c("span",null,n(_.curItem.name),1)]),j($,{size:"small",model:_.curItem,"label-width":"100px"},{default:g((()=>[j(D,{label:"文章分类："},{default:g((()=>[j(C,{modelValue:_.curItem.params.auto.category,"onUpdate:modelValue":i[0]||(i[0]=e=>_.curItem.params.auto.category=e)},{default:g((()=>[j(z,{label:"全部分类",value:0}),(d(!0),p(y,null,h(U.category,(e=>(d(),b(z,{key:e.category_id,label:e.name,value:e.category_id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),j(D,{label:"显示数量："},{default:g((()=>[j(N,{type:"number",min:"1",modelValue:_.curItem.params.auto.showNum,"onUpdate:modelValue":i[1]||(i[1]=e=>_.curItem.params.auto.showNum=e),style:{width:"auto"}},null,8,["modelValue"]),V])),_:1}),j(D,{label:"图片："},{default:g((()=>[c("div",w,[f(c("img",{alt:"",onClick:i[2]||(i[2]=e=>m.$parent.onEditorSelectImage(_.curItem.style,"image"))},null,512),[[A,_.curItem.style.image]]),x])])),_:1}),j(D,{label:"显示类型："},{default:g((()=>[j(W,{modelValue:_.curItem.style.display,"onUpdate:modelValue":i[3]||(i[3]=e=>_.curItem.style.display=e)},{default:g((()=>[j(S,{label:1},{default:g((()=>[v("单行")])),_:1}),j(S,{label:2},{default:g((()=>[v("两行")])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["model"])])}]]);export{k as default};
