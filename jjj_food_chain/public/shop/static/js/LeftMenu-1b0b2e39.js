import{a as e}from"./index-0eefa19c.js";import{u as i}from"./vue-router-7e282e9c.js";import{_ as s}from"./_plugin-vue_export-helper-1b428a4d.js";import{F as t,K as n,L as l,o as m,c as a,a as u,M as r,X as o,Q as c,a8 as p,Y as h,n as d}from"./@vue-e72ffbb6.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./call-bind-2971450c.js";import"./object-inspect-dd55f836.js";import"./element-plus-d03e850c.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const v=t({components:{},setup(s,{emit:t}){const{userInfo:m,bus_emit:a,menus:u,renderMenus:r}=e(),o=i(),c=n({route:o,munu_name:"首页",active_menu:null,active_child:0,menuList:r,shop_name:"",menus:u}),p=e=>{let i=e.path,s=null,n=null;if(c.menuList&&c.menuList.length>0){for(let e=0;e<c.menuList.length;e++){if(c.menuList[e].path==i){s=e;break}if(c.menuList[e].children)for(let t=0;t<c.menuList[e].children.length;t++)if(c.menuList[e].children[t].path==i){s=e,n=t;break}if(!s&&!n&&c.menuList[e].childrenList.includes(i)){s=e;break}}c.active_menu=s,c.active_child=n,t("selectMenu",s)}d((()=>{a("MenuName",e.meta&&e.meta.showMenuTitle||e.meta.title)}))};return p(o),{...l(c),userInfo:m,selectMenu:p,bus_emit:a}},mounted(){"/home"==this.route.path&&this.$emit("selectMenu",null)},watch:{"route.path":{handler(e){this.menuList.map(((i,s)=>{i.redirect_name==e&&this.active_menu!=s&&(this.active_menu=s)}))},deep:!0,immediate:!0}},methods:{choseMenu(e,i,s){if(1==e)this.active_menu=null,this.active_child=null,this.$router.push("/"),this.$emit("selectMenu",null);else if(2==e)this.active_menu=s,this.active_child=0,this.$router.push(i.redirect_name),i.children?this.$emit("selectMenu",!1):this.$emit("selectMenu",null);else if(3==e){let e=i.path;i.redirect_name&&(e=i.redirect_name),this.active_child=s,this.$router.push(e)}}}}),j={class:"left-menu-wrapper"},_={class:"menu-wrapper"},f={class:"home-login"},k=["src"],L={class:"d-c-c"},M={class:"fb tc home-title"},b={class:"nav-wrapper mt10"},g={class:"first-menu-content"},w={class:"nav-ul"},y=["onClick"],$={class:"item-box"},C={class:"child-menu-wrapper"},x={class:"child-menu right-animation"},I={key:0},N=["onClick"],q={class:"name"};const z=s(v,[["render",function(e,i,s,t,n,l){return m(),a("div",j,[u("div",_,[u("div",f,[u("div",{class:r(null!=e.active_menu?"home-icon":"home-icon router-link-active"),onClick:i[0]||(i[0]=i=>e.choseMenu(1,null,null))},[u("img",{src:e.userInfo.logoUrl,class:"logoImg"},null,8,k)],2)]),u("div",L,[u("span",M,o(e.userInfo.shopName||"点餐系统连锁总店"),1)]),u("div",b,[u("div",g,[u("ul",w,[(m(!0),a(c,null,p(e.menuList,((i,s)=>(m(),a(c,{key:s},[1==i.is_menu?(m(),a("li",{key:0,class:r(e.active_menu==s?"menu-item router-link-active":"menu-item"),onClick:t=>e.choseMenu(2,i,s)},[u("div",$,[u("span",{class:r("icon iconfont menu-item-icon "+i.icon)},null,2),u("span",null,o(e.$t(i.name)),1)])],10,y)):h("",!0)],64)))),128))])])])]),u("div",C,[u("div",x,[null!=e.active_menu?(m(),a("ul",I,[(m(!0),a(c,null,p(e.menuList[e.active_menu].children,((i,s)=>(m(),a(c,{key:s},[1==i.is_menu?(m(),a("li",{key:0,class:r(e.active_child==s?"routre-link router-link-active":"router-link"),onClick:t=>e.choseMenu(3,i,s)},[u("span",q,o(e.$t(i.name)),1)],10,N)):h("",!0)],64)))),128))])):h("",!0)])])])}]]);export{z as default};
