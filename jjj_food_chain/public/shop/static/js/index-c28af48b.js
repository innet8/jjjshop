import{d as s}from"./pinia-72b16af9.js";import{b as e}from"./vue-router-bf98ca95.js";import{o,c as t,W as i,a}from"./@vue-e72ffbb6.js";import"./vue-demi-71ba0ef2.js";const r=s({id:"app-lockscreen",state:()=>({isLock:!1,lockTime:0}),getters:{},actions:{setLock(s){this.isLock=s},setLockTime(s=2592e3){this.lockTime=s}},persist:{key:"app-lockscreen",storage:localStorage}}),c={__name:"index",setup(s){const c=r(),m=e(),p=()=>{c.setLock(!1),m.push("/home")};return(s,e)=>(o(),t("div",null,[i(" 锁屏 "),a("button",{onClick:p},"解锁")]))}};export{c as default};