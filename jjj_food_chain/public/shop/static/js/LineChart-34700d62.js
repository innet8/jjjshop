import{t,u as e,A as a}from"./element-plus-7d357588.js";import{S as i}from"./statistics-603c9b43.js";import{f as s}from"./DateTime-12b085dd.js";import{_ as o}from"./index-f792122d.js";import{o as r,c as n,P as m,S as l,a as p,bb as c,b9 as d}from"./@vue-48c55b54.js";import"./@vueuse-c556fb5a.js";import"./lodash-es-c1acaa3d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-e0f4a3e8.js";import"./dayjs-9faf8871.js";import"./call-bind-0c463fe3.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./vue-router-b8ff3004.js";import"./pinia-73166104.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-942d6868.js";import"./side-channel-ba7aab8a.js";import"./object-inspect-860361a9.js";import"./vue-ueditor-wrap-cd29f9a1.js";const h={data(){let t=new Date,e=new Date;return e.setTime(e.getTime()-6048e5),{activeName:"first",pickerOptions:{shortcuts:[{text:"最近一周",onClick(t){const e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick(t){const e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick(t){const e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},datePicker:[s(e,"yyyy-MM-dd"),s(t,"yyyy-MM-dd")],dataList:null,myChart:null,option:{title:{},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},tooltip:{trigger:"axis"},yAxis:{}}}},mounted(){this.myEcharts()},methods:{changeDate(){this.getData()},myEcharts(){this.myChart=this.$echarts.init(document.getElementById("LineChart")),this.getData()},createOption(){if(!this.loading){let t=[],e=this.dataList.days,a=[];this.dataList.data.forEach((t=>{a.push(t.total_num)})),t=["商品件数"],this.option.xAxis={type:"category",boundaryGap:!1,data:e},this.option.color=["red","#409EFF"],this.option.series=[{name:t[0],type:"line",data:a,lineStyle:{color:"red"}}],this.myChart.setOption(this.option),this.myChart.resize()}},getData(){let t=this;t.loading=!0,i.getProductByDate({search_time:t.datePicker,type:t.activeName},!0).then((e=>{t.dataList=e.data,t.loading=!1,t.createOption()})).catch((t=>{}))}}},u={class:"ww100 mt30"},j={class:"d-b-c"},y=(t=>(c("data-v-f4bc36e1"),t=t(),d(),t))((()=>p("div",{class:""},[p("div",{class:"Echarts"},[p("div",{id:"LineChart"})])],-1)));const g=o(h,[["render",function(i,s,o,c,d,h){const g=t,f=e,v=a;return r(),n("div",u,[m(f,{modelValue:d.activeName,"onUpdate:modelValue":s[0]||(s[0]=t=>d.activeName=t)},{default:l((()=>[m(g,{label:"已付款商品",name:"first"})])),_:1},8,["modelValue"]),p("div",j,[p("div",null,[m(v,{size:"small",modelValue:d.datePicker,"onUpdate:modelValue":s[1]||(s[1]=t=>d.datePicker=t),type:"daterange",align:"right","unlink-panels":"",format:"YYYY-MM-DD","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",onChange:h.changeDate,"picker-options":d.pickerOptions},null,8,["modelValue","onChange","picker-options"])])]),y])}],["__scopeId","data-v-f4bc36e1"]]);export{g as default};
