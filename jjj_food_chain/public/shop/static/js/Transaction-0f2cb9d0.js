import{t,u as e,A as a}from"./element-plus-7d357588.js";import{S as i}from"./statistics-603c9b43.js";import{f as s}from"./DateTime-12b085dd.js";import{_ as o}from"./index-f792122d.js";import{o as n,c as r,P as l,S as m,a as c}from"./@vue-48c55b54.js";import"./@vueuse-c556fb5a.js";import"./lodash-es-c1acaa3d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-e0f4a3e8.js";import"./dayjs-9faf8871.js";import"./call-bind-0c463fe3.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-b8ff3004.js";import"./pinia-73166104.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-942d6868.js";import"./side-channel-ba7aab8a.js";import"./object-inspect-860361a9.js";import"./vue-ueditor-wrap-cd29f9a1.js";const p={data(){let t=new Date,e=new Date;return e.setTime(e.getTime()-6048e5),{loading:!0,activeName:"visit",pickerOptions:{shortcuts:[{text:"最近一周",onClick(t){const e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick(t){const e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick(t){const e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},datePicker:[s(e,"yyyy-MM-dd"),s(t,"yyyy-MM-dd")],dataList:null,myChart:null,option:{title:{},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},tooltip:{trigger:"axis"},yAxis:{}}}},created(){},mounted(){this.myEcharts()},methods:{handleClick(t){this.getData()},changeDate(){this.getData()},myEcharts(){this.myChart=this.$echarts.init(document.getElementById("TransactionChart")),this.getData()},createOption(){if(!this.loading){let t=[],e=this.dataList.days,a=[],i=[];"visit"==this.activeName?(t=["访客数","访问量"],this.dataList.data.forEach((t=>{a.push(t.visit_user),i.push(t.visit_count)}))):"fav"==this.activeName&&(t=["店铺收藏数","商品收藏数"],this.dataList.data.forEach((t=>{a.push(t.supplier_count),i.push(t.product_count)}))),this.option.xAxis={type:"category",boundaryGap:!1,data:e},this.option.color=["red","#409EFF"],this.option.legend={data:[{name:t[0],color:"#ccc"},{name:t[1]}]},this.option.series=[{name:t[0],type:"line",data:a,lineStyle:{color:"red"}},{name:t[1],type:"line",data:i,lineStyle:{color:"#409EFF"}}],this.myChart.setOption(this.option),this.myChart.resize()}},getData(){let t=this;t.loading=!0,i.getAccessByDate({search_time:t.datePicker,type:t.activeName},!0).then((e=>{t.dataList=e.data,t.loading=!1,t.createOption()})).catch((t=>{}))}}},d={class:"mt30"},h=c("div",{class:"common-form"},"交易统计",-1),u={class:"d-b-c"},g=c("div",{class:""},[c("div",{class:"Echarts"},[c("div",{id:"TransactionChart"})])],-1);const j=o(p,[["render",function(i,s,o,p,j,y){const v=t,k=e,D=a;return n(),r("div",d,[h,l(k,{modelValue:j.activeName,"onUpdate:modelValue":s[0]||(s[0]=t=>j.activeName=t),onTabClick:y.handleClick},{default:m((()=>[l(v,{label:"访问数",name:"visit"}),l(v,{label:"收藏数",name:"fav"})])),_:1},8,["modelValue","onTabClick"]),c("div",u,[c("div",null,[l(D,{size:"small",modelValue:j.datePicker,"onUpdate:modelValue":s[1]||(s[1]=t=>j.datePicker=t),type:"daterange",align:"right","unlink-panels":"",format:"YYYY-MM-DD","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",onChange:y.changeDate,"picker-options":j.pickerOptions},null,8,["modelValue","onChange","picker-options"])])]),g])}]]);export{j as default};
