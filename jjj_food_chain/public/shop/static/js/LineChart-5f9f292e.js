import{I as t,J as e,H as i}from"./element-plus-b01b3a31.js";import{S as a}from"./statistics-fd0acbe2.js";import{f as s}from"./DateTime-12b085dd.js";import{_ as o}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as r,c as n,P as m,S as p,a as l,bb as d,b9 as c}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-fed3ed55.js";import"./vue-router-bf98ca95.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const h={data(){let t=new Date,e=new Date;return e.setTime(e.getTime()-6048e5),{activeName:"first",pickerOptions:{shortcuts:[{text:"最近一周",onClick(t){const e=new Date,i=new Date;i.setTime(i.getTime()-6048e5),t.$emit("pick",[i,e])}},{text:"最近一个月",onClick(t){const e=new Date,i=new Date;i.setTime(i.getTime()-2592e6),t.$emit("pick",[i,e])}},{text:"最近三个月",onClick(t){const e=new Date,i=new Date;i.setTime(i.getTime()-7776e6),t.$emit("pick",[i,e])}}]},datePicker:[s(e,"yyyy-MM-dd"),s(t,"yyyy-MM-dd")],dataList:null,myChart:null,option:{title:{},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},tooltip:{trigger:"axis"},yAxis:{}}}},mounted(){this.myEcharts()},methods:{changeDate(){this.getData()},myEcharts(){this.myChart=this.$echarts.init(document.getElementById("LineChart")),this.getData()},createOption(){if(!this.loading){let t=[],e=this.dataList.days,i=[];this.dataList.data.forEach((t=>{i.push(t.total_num)})),t=["商品件数"],this.option.xAxis={type:"category",boundaryGap:!1,data:e},this.option.color=["red","#409EFF"],this.option.series=[{name:t[0],type:"line",data:i,lineStyle:{color:"red"}}],this.myChart.setOption(this.option),this.myChart.resize()}},getData(){let t=this;t.loading=!0,a.getProductByDate({search_time:t.datePicker,type:t.activeName},!0).then((e=>{t.dataList=e.data,t.loading=!1,t.createOption()})).catch((t=>{}))}}},u={class:"ww100 mt30"},j={class:"d-b-c"},y=(t=>(d("data-v-2f6ba443"),t=t(),c(),t))((()=>l("div",{class:""},[l("div",{class:"Echarts"},[l("div",{id:"LineChart"})])],-1)));const g=o(h,[["render",function(a,s,o,d,c,h){const g=t,v=e,f=i;return r(),n("div",u,[m(v,{modelValue:c.activeName,"onUpdate:modelValue":s[0]||(s[0]=t=>c.activeName=t)},{default:p((()=>[m(g,{label:"已付款商品",name:"first"})])),_:1},8,["modelValue"]),l("div",j,[l("div",null,[m(f,{size:"small",modelValue:c.datePicker,"onUpdate:modelValue":s[1]||(s[1]=t=>c.datePicker=t),type:"daterange",align:"right","unlink-panels":"",format:"YYYY-MM-DD","value-format":"YYYY-MM-DD","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",onChange:h.changeDate,"picker-options":c.pickerOptions},null,8,["modelValue","onChange","picker-options"])])]),y])}],["__scopeId","data-v-2f6ba443"]]);export{g as default};
