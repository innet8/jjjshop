import{_ as e,m as s,O as a,s as d,Q as l,a as t,u as o,o as i,c as r,w as n,n as c,g as u,b as h,d as m,e as p,j as f,I as g,R as _,h as b,L as y,T as x}from"./index-1a637619.js";const k=e({data:()=>({urls:"",longitude:0,latitude:0,detail:0,address_id:0,address:{name:"",phone:"",detail:"",address:""},openWb:!1,wburl:""}),onLoad(e){this.address_id=e.address_id,this.isWeixin()&&(this.urls=window.location.href),this.delta=e.delta||1,"locationPicker"==e.module?(this.address=s("addressData"),a("addressData"),this.address.detail=e.addr,this.address.latitude=e.latng.split(",")[0],this.address.longitude=e.latng.split(",")[1]):this.getData()},mounted(){},methods:{handlePostMessage(e){console.log("接收到消息："+JSON.stringify(e.detail))},getData(){let e=this,s=e.address_id;e._get("user.address/detail",{address_id:s},(function(s){e.address=s.data.detail,e.address_id=s.data.detail.address_id}))},choseWx(){let e=this,s=this.config.mpKey,a={name:e.address.name||"",phone:e.address.phone||"",address:e.address.address||""};d("addressData",a);let l="https://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl="+this.urls+"&key="+s+"&referer=myapp";this.wburl=l,this.openWb=!0},chooseLocation(e){let s=this;this.isWeixin()?this.choseWx():l({success:function(e){s.address.longitude=e.longitude,s.address.latitude=e.latitude,s.address.detail=e.address,d("mpaddress",s.address),console.log("位置名称："+e.name),console.log("详细地址："+e.address),console.log("纬度："+e.latitude),console.log("经度："+e.longitude)},fail(e){d("address",""),console.log(e)},complete(e){console.log(e)}})},formSubmit:function(e){let s=this;var a=e.detail.value;if(a.longitude=s.address.longitude,a.latitude=s.address.latitude,a.address_id=s.address_id,""==a.name)return t({title:"请输入收货人姓名",duration:1e3,icon:"none"}),!1;o.isTelAvailable(a.phone)?s._post("user.address/edit",a,(function(e){console.log(s.delta),s.showSuccess(e.msg,(function(){history.go(-s.delta)}))})):t({title:"请输入正确的联系方式",duration:2e3,icon:"none"})},formReset:function(e){console.log("清空数据")},showMulLinkageThreePicker(){this.$refs.mpvueCityPicker.show()},onConfirm(e){this.region=e.label.split(","),this.selectCity=e.label,this.province_id=e.cityCode[0],this.city_id=e.cityCode[1],this.region_id=e.cityCode[2]}}},[["render",function(e,s,a,d,l,t){const o=f,k=g,V=u,w=_,C=b,P=y,W=x;return i(),r(V,{class:c(["address-form",e.theme()||""]),"data-theme":e.theme()},{default:n((()=>[h(P,{onSubmit:t.formSubmit,onReset:t.formReset},{default:n((()=>[h(V,{class:"bg-white p-0-30 f30"},{default:n((()=>[h(V,{class:"d-s-c border-b-d9"},{default:n((()=>[h(o,{class:"key-name"},{default:n((()=>[m("收货人")])),_:1}),h(k,{class:"ml20 f32 flex-1 p-30-0",name:"name",type:"text",modelValue:l.address.name,"onUpdate:modelValue":s[0]||(s[0]=e=>l.address.name=e),"placeholder-class":"grary9",placeholder:"请输入收货人姓名"},null,8,["modelValue"])])),_:1}),h(V,{class:"d-s-c border-b-d9"},{default:n((()=>[h(o,{class:"key-name"},{default:n((()=>[m("联系方式")])),_:1}),h(k,{class:"ml20 f32 flex-1 p-30-0",name:"phone",type:"text",modelValue:l.address.phone,"onUpdate:modelValue":s[1]||(s[1]=e=>l.address.phone=e),"placeholder-class":"grary9",placeholder:"请输入收货人手机号"},null,8,["modelValue"])])),_:1}),h(V,{class:"d-s-c border-b-d9",onClick:t.chooseLocation},{default:n((()=>[h(o,{class:"key-name"},{default:n((()=>[m("详细地址")])),_:1}),h(V,{class:"input-box flex-1"},{default:n((()=>[h(k,{class:"ml20 f32 flex-1 p-30-0",name:"detail",type:"text","placeholder-class":"grary9",placeholder:"请选择地址",modelValue:l.address.detail,"onUpdate:modelValue":s[2]||(s[2]=e=>l.address.detail=e),disabled:""},null,8,["modelValue"])])),_:1})])),_:1},8,["onClick"]),h(V,{class:"d-s-c border-b-d9"},{default:n((()=>[h(o,{class:"key-name"},{default:n((()=>[m("门牌号")])),_:1}),h(w,{class:"ml20 flex-1 f32 p-30-0 lh150",name:"address","placeholder-class":"grary9","auto-height":!0,modelValue:l.address.address,"onUpdate:modelValue":s[3]||(s[3]=e=>l.address.address=e),placeholder:"请输入街道小区楼牌号等"},null,8,["modelValue"])])),_:1})])),_:1}),h(V,{class:"p30"},{default:n((()=>[h(C,{type:"primary","form-type":"submit",class:"theme-btn f32 mt60 addBtn"},{default:n((()=>[m("保存")])),_:1})])),_:1})])),_:1},8,["onSubmit","onReset"]),l.openWb?(i(),r(W,{key:0,src:l.wburl,onOnPostMessage:t.handlePostMessage},null,8,["src","onOnPostMessage"])):p("",!0)])),_:1},8,["data-theme","class"])}],["__scopeId","data-v-1dad5a12"]]);export{k as default};
