import{_ as a,o as t,c as e,w as s,g as o,b as l,d as n,t as d,f as i,r as p,F as r,j as c,h as u,k as _}from"./index-1a637619.js";import{u as g}from"./uni-load-more.934e6c66.js";const f=a({components:{uniLoadMore:g},data:()=>({loadding:!0,indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,topRefresh:!1,phoneHeight:0,scrollviewHigh:0,tableData:[],last_page:0,page:1,list_rows:20,no_more:!1,loading:!0,points:0,is_open:!1,points_name:""}),computed:{loadingType(){return this.loading?1:0!=this.tableData.length&&this.no_more?2:0}},mounted(){this.getData()},onReachBottom(){let a=this;a.page<a.last_page&&(a.page++,a.getData()),a.no_more=!0},methods:{getData(){let a=this,t=a.page,e=a.list_rows;a._get("points.log/index",{page:t||1,list_rows:e},(function(t){if(a.loading=!1,a.points_name=t.data.points_name,a.points=t.data.points,a.is_open=t.data.is_open,a.tableData=a.tableData.concat(t.data.list.data),a.last_page=t.data.list.last_page,t.data.list.last_page<=1)return a.no_more=!0,!1}))},gotoShop(){this.gotoPage("/pages/plus/points/order/order")}}},[["render",function(a,g,f,h,m,b){const y=c,D=o,k=u,w=_("uni-load-more");return t(),e(D,null,{default:s((()=>[l(D,{class:"points-top d-b-c"},{default:s((()=>[l(D,{class:""},{default:s((()=>[l(y,{class:"f26"},{default:s((()=>[n(d(m.points_name)+"总数：",1)])),_:1}),l(y,{class:"f34 fb"},{default:s((()=>[n(d(m.points),1)])),_:1})])),_:1}),l(k,{type:"default",class:"btn-red-border",onClick:b.gotoShop},{default:s((()=>[n("兑换记录")])),_:1},8,["onClick"])])),_:1}),l(D,{class:"p-0-30 bg-white"},{default:s((()=>[(t(!0),i(r,null,p(m.tableData,((a,o)=>(t(),e(D,{class:"d-b-c border-b p-30-0",key:o},{default:s((()=>[l(D,{class:"d-s-s f-w d-c flex-1"},{default:s((()=>[l(y,{class:"f24"},{default:s((()=>[n(d(a.describe),1)])),_:2},1024),l(y,{class:"pt10 gray9 f22"},{default:s((()=>[n(d(a.create_time),1)])),_:2},1024)])),_:2},1024),a.value>0?(t(),e(D,{key:0,class:"red"},{default:s((()=>[n("+"+d(a.value),1)])),_:2},1024)):(t(),e(D,{key:1,class:"red"},{default:s((()=>[n(d(a.value),1)])),_:2},1024))])),_:2},1024)))),128)),0!=m.tableData.length||m.loading?(t(),e(w,{key:1,loadingType:b.loadingType},null,8,["loadingType"])):(t(),e(D,{key:0,class:"d-c-c p30"},{default:s((()=>[l(y,{class:"iconfont icon-wushuju"}),l(y,{class:"cont"},{default:s((()=>[n("亲，暂无相关记录哦")])),_:1})])),_:1}))])),_:1})])),_:1})}],["__scopeId","data-v-40529c66"]]);export{f as default};
