import{u as e,_ as n}from"./index-42a7c458.js";import{o as s,c as t,a as l,Q as i,a9 as u,Y as c,M as a,X as o}from"./@vue-ec4837bd.js";import"./vue-router-bec44c5f.js";import"./pinia-57a80881.js";import"./sass-9c753014.js";import"./immutable-f1afe65f.js";import"./element-plus-cd5f0841.js";import"./lodash-es-42625722.js";import"./async-validator-cf877c1f.js";import"./@vueuse-351f2583.js";import"./dayjs-3a594381.js";import"./call-bind-8544b80b.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-399cea60.js";import"./@popperjs-b78c3215.js";import"./escape-html-1590d737.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";e();const r={components:{},data:()=>({fullscreen:!1,active_menu:null,active_child:0,menuList:[{name:"收银",icon:"icon-shouyin",path:"/home/index"},{name:"桌台",icon:"icon-icon-test1",path:"/table/index"},{name:"订单",icon:"icon-icon-test",path:"/order/index"}]}),created(){this.selectMenu(this.$route)},watch:{$route(e,n){const s=e.path.split("/").length,t=n.path.split("/").length;this.transitionName=s<t?"slide-right":"slide-left",this.selectMenu(e)}},methods:{selectMenu(e){e.fullPath;let n=this.menuList.findIndex((n=>n.path==e.fullPath));this.active_menu=0,n>0&&(this.active_menu=n)},choseMenu(e){if(null!=e){let n=e.path;this.$router.push(n)}else this.$router.push("/")},launchFullScreen(){this.fullscreen=!this.fullscreen;let e=document.documentElement;this.fullscreen?e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen():document.exitFullscreen?document.exitFullscreen():document.mozExitFullScreen?document.mozExitFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen()}}},m={class:"left-menu-wrapper"},p={class:"menu-wrapper"},h=l("div",{class:"menu-wrapper-title"},[l("div",null,"收银台"),l("div",null,"CASHIER ")],-1),d={class:"nav-wrapper"},v={class:"first-menu-content"},j={class:"nav-ul"},f=["onClick"],F={class:"item-box"},k=[l("span",{class:a("icon iconfont menu-item-icon icon-quanping")},null,-1),l("div",null,"全屏模式 ",-1)],x={class:"child-menu-wrapper"},b={class:"child-menu right-animation"},w={key:0},q=["onClick"],S={class:"name"};const _=n(r,[["render",function(e,n,r,_,g,y){return s(),t("div",m,[l("div",p,[h,l("div",d,[l("div",v,[l("ul",j,[(s(!0),t(i,null,u(g.menuList,((e,n)=>(s(),t("li",{class:a(g.active_menu==n?"menu-item router-link-active muneactive":"menu-item"),key:n,onClick:n=>y.choseMenu(e)},[l("div",F,[l("span",{class:a("icon iconfont menu-item-icon "+e.icon)},null,2),l("span",null,o(e.name),1)])],10,f)))),128))])])]),l("div",{class:"launchFullScreen",onClick:n[0]||(n[0]=(...e)=>y.launchFullScreen&&y.launchFullScreen(...e))},k)]),l("div",x,[l("div",b,[null!=g.active_menu?(s(),t("ul",w,[(s(!0),t(i,null,u(g.menuList[g.active_menu].children,((e,n)=>(s(),t("li",{class:a(g.active_child==n?"router-link router-link-active":"router-link"),key:n,onClick:n=>y.choseMenu(e)},[l("span",S,o(e.name),1)],10,q)))),128))])):c("",!0)])])])}]]);export{_ as default};
