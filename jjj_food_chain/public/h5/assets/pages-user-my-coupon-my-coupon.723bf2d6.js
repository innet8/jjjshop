import{_ as e,B as t,M as s,l as a,p as l,o,c,w as i,n,g as u,b as p,d,f as _,r,F as f,e as g,v as m,S as h,t as y,C as b,i as k,j as x}from"./index-1a637619.js";const v=e({data:()=>({phoneHeight:0,scrollviewHigh:0,state_active:0,DataList:{},no_more:!1,loading:!1,data_type:"not_use",supList:[]}),mounted(){this.init(),this.getData()},methods:{init(){let e=this;t({success(t){e.phoneHeight=t.windowHeight,s().select(".top-tabbar").boundingClientRect((t=>{let s=e.phoneHeight-t.height;e.scrollviewHigh=s})).exec()}})},getData(){let e=this;a({title:"加载中"});let t=e.data_type;e._get("user.coupon/lists",{data_type:t},(function(t){l(),e.DataList=t.data.list,e.getSup()}))},getSup(){let e=[],t={name:"平台优惠券",list:[]};this.DataList.forEach(((s,a)=>{if(console.log(a),null==s.supplier)t.list.push(s);else if(""==e)e.push({name:s.supplier.name,list:[s]});else{let t=!0;e.forEach(((e,a)=>{e.name===s.supplier.name&&(t=!1,e.list.push(s))})),t&&e.push({name:s.supplier.name,list:[s]})}})),console.log(e),e.push(t),this.supList=e},stateFunc(e){let t=this;t.state_active!=e&&(0==e&&(t.data_type="not_use"),1==e&&(t.data_type="is_use"),2==e&&(t.data_type="is_expire"),t.state_active=e,t.getData())},scrolltoupperFunc(){console.log("滚动视图区域到顶")},scrolltolowerFunc(){console.log("滚动视图区域到底")},lookRule(e){e.rule=!0},closeRule(e){e.rule=!1}}},[["render",function(e,t,s,a,l,v){const w=u,C=k,F=x,L=h;return o(),c(w,{"data-theme":e.theme(),class:n(e.theme()||"")},{default:i((()=>[p(w,{class:"top-tabbar"},{default:i((()=>[p(w,{class:n(0==l.state_active?"tab-item active":"tab-item"),onClick:t[0]||(t[0]=e=>v.stateFunc(0))},{default:i((()=>[d("未使用")])),_:1},8,["class"]),p(w,{class:n(1==l.state_active?"tab-item active":"tab-item"),onClick:t[1]||(t[1]=e=>v.stateFunc(1))},{default:i((()=>[d("已使用")])),_:1},8,["class"]),p(w,{class:n(2==l.state_active?"tab-item active":"tab-item"),onClick:t[2]||(t[2]=e=>v.stateFunc(2))},{default:i((()=>[d("已过期")])),_:1},8,["class"])])),_:1}),p(L,{"scroll-y":"true",class:"scroll-Y",style:m("height:"+l.scrollviewHigh+"px;"),"lower-threshold":"50",onScrolltoupper:v.scrolltoupperFunc,onScrolltolower:v.scrolltolowerFunc},{default:i((()=>[p(w,{class:""},{default:i((()=>[l.supList.length>0?(o(!0),_(f,{key:0},r(l.supList,((s,a)=>(o(),c(w,{class:"mb20",key:a},{default:i((()=>[s.list.length>0?(o(!0),_(f,{key:0},r(s.list,((a,l)=>(o(),c(w,{key:l,class:"item-wrap"},{default:i((()=>[p(w,{class:n(0==a.is_expire&&0==a.is_use?"coupon-item coupon-item-"+a.color.text:"coupon-item coupon-item-gray"),onClick:e=>v.lookRule(a)},{default:i((()=>[1==a.isUse?(o(),c(C,{key:0,class:"coupon-disabled",src:"/h5/assets/coupon-status1-e64a9c3b.png",mode:""})):g("",!0),1==a.isExpire?(o(),c(C,{key:1,class:"coupon-disabled",src:"/h5/assets/coupon-status2-f67188ff.png",mode:""})):g("",!0),p(w,{class:"coupon_type"},{default:i((()=>[d(y("平台优惠券"==s.name?"平台通用":s.name),1)])),_:2},1024),p(w,{class:"operation d-b-c"},{default:i((()=>[p(w,{class:"flex-1 coupon-content"},{default:i((()=>[p(w,{class:"mb20 text-ellipsis"},{default:i((()=>[p(F,{class:"f40 fb"},{default:i((()=>[d(y(a.name),1)])),_:2},1024)])),_:2},1024),p(w,{class:"f22 gray9 mb20"},{default:i((()=>[d(" 有效期："+y(a.start_time.text)+"至"+y(a.end_time.text),1)])),_:2},1024),0!=a.max_price?(o(),c(w,{key:0,class:"f22"},{default:i((()=>[d("(最大优惠"+y(a.max_price)+"元)",1)])),_:2},1024)):g("",!0)])),_:2},1024),p(w,{class:"right-box d-c-c d-c"},{default:i((()=>[10==a.coupon_type.value?(o(),c(w,{key:0,class:"theme-price mb10"},{default:i((()=>[p(F,{class:"f24"},{default:i((()=>[d("￥")])),_:1}),p(F,{class:"f52 fb"},{default:i((()=>[d(y(1*a.reduce_price),1)])),_:2},1024)])),_:2},1024)):g("",!0),20==a.coupon_type.value?(o(),c(w,{key:1,class:"mb10 theme-price"},{default:i((()=>[p(F,{class:"f52 fb"},{default:i((()=>[d(y(a.discount),1)])),_:2},1024),p(F,{class:"f24"},{default:i((()=>[d("折")])),_:1})])),_:2},1024)):g("",!0),p(w,{class:"f24 mb10"},{default:i((()=>[d(y(a.min_price>0?"满"+1*a.min_price+"元可用":"无门槛"),1)])),_:2},1024),0==a.is_expire&&0==a.is_use?(o(),_(f,{key:2},[10!=a.apply_range?(o(),c(w,{key:0,class:"f26 coupon-btn theme-btn",onClick:b((t=>e.gotoPage("/pages/coupon/detail?coupon_id="+a.coupon_id+"&apply_range="+a.apply_range)),["stop"])},{default:i((()=>[d(" 去使用 ")])),_:2},1032,["onClick"])):0==a.shop_supplier_id?(o(),c(w,{key:1,class:"f26 coupon-btn theme-btn",onClick:t[3]||(t[3]=b((t=>e.gotoPage("/pages/index/index")),["stop"]))},{default:i((()=>[d(" 去使用 ")])),_:1})):(o(),c(w,{key:2,class:"f26 coupon-btn theme-btn",onClick:t[4]||(t[4]=b((t=>e.gotoPage("/pages/index/index")),["stop"]))},{default:i((()=>[d(" 去使用 ")])),_:1}))],64)):g("",!0)])),_:2},1024)])),_:2},1024)])),_:2},1032,["class","onClick"]),20==a.apply_range?(o(),c(w,{key:0,class:"range_item d-b-c",onClick:b((t=>e.gotoPage("/pages/coupon/detail?coupon_id="+a.coupon_id+"&apply_range="+a.apply_range)),["stop"])},{default:i((()=>[p(w,{class:"gray9 f24"},{default:i((()=>[d(" 限指定部分商品 "),p(F,{class:"icon iconfont icon-jiantou",style:{color:"#999999","font-size":"22rpx"}})])),_:1}),p(w,{class:"gray9 f24"},{default:i((()=>[d("本券不支持转赠")])),_:1})])),_:2},1032,["onClick"])):(o(),c(w,{key:1,class:"range_item d-b-c"},{default:i((()=>[p(w,{class:"gray9 f24"},{default:i((()=>[d(" 全场通用 "),p(F,{class:"icon iconfont icon-jiantou",style:{color:"#999999","font-size":"22rpx"}})])),_:1}),p(w,{class:"gray9 f24"},{default:i((()=>[d("本券不支持转赠")])),_:1})])),_:1}))])),_:2},1024)))),128)):g("",!0),p(w,{class:""},{default:i((()=>[p(w,{class:"bottom-refresh"},{default:i((()=>[l.loading?(o(),c(w,{key:0,class:"d-c-c p30"},{default:i((()=>[p(F,{class:"gray3"},{default:i((()=>[d("加载中...")])),_:1})])),_:1})):g("",!0),l.no_more?(o(),c(w,{key:1,class:"d-c-c p30"},{default:i((()=>[p(F,{class:"gray3"},{default:i((()=>[d("~~加载完成~~")])),_:1})])),_:1})):g("",!0)])),_:1})])),_:1}),0!=l.DataList.length||l.loading?g("",!0):(o(),c(w,{key:1,class:"d-c-c p30"},{default:i((()=>[p(F,{class:"iconfont icon-wushuju"}),p(F,{class:"cont"},{default:i((()=>[d("亲，暂无相关记录哦")])),_:1})])),_:1}))])),_:2},1024)))),128)):g("",!0)])),_:1})])),_:1},8,["style","onScrolltoupper","onScrolltolower"])])),_:1},8,["data-theme","class"])}],["__scopeId","data-v-fdffd196"]]);export{v as default};
