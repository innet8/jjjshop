import{_ as e,l as a,m as t,p as s,ac as l,z as d,a as o,Y as n,o as r,c as i,w as p,n as c,g as u,b as f,e as m,d as _,t as g,f as y,F as w,i as b,I as h,ao as k,ap as v,j as x,h as P,L as C,k as S}from"./index-1a637619.js";import{P as I}from"./uni-popup.bcc5e38f.js";/* empty css                                                                  */const j=e({components:{Popup:I},data:()=>({isPopup:!1,is_read:!1,agreement:"",is_applying:!1,referee_name:"",words:{},is_agent:"",top_background:"",temlIds:[]}),mounted(){this.getData()},methods:{getData(){let e=this;a({title:"加载中"}),e._get("user.agent/apply",{platform:e.getPlatform(),referee_id:t("referee_id")},(function(a){s(),e.top_background=a.data.background,e.is_applying=a.data.is_applying,e.referee_name=null!=a.data.referee_name?a.data.referee_name:"平台",e.is_agent=a.data.is_agent,e.words=a.data.words,e.temlIds=a.data.template_arr,e.agreement=a.data.license,l({title:e.words.apply.title.value}),e.is_agent&&d({})}))},formSubmit:function(e){let l=e.detail.value;l.referee_id=t("referee_id");let d=this;if(""==l.name)return void o({title:"请输入姓名！",icon:"none"});if(""==l.mobile.length)return void o({title:"请输入手机号！",icon:"none"});if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(l.mobile))return void o({title:"手机有误,请重填！",icon:"none"});if(!d.is_read)return void o({title:"请同意协议！",icon:"none"});d.subMessage(d.temlIds,(function(){a({title:"正在提交",mask:!0}),d._post("plus.agent.apply/submit",l,(function(e){s(),o({title:"申请成功"}),d.getData()}))}))},gotoShop(){n({url:"/pages/index/index"})},changeFunc(e){e.detail.value.length>0?this.is_read=!0:this.is_read=!1}}},[["render",function(e,a,t,s,l,d){const o=b,n=u,I=h,j=k,F=v,D=x,R=P,z=C,L=S("Popup");return r(),i(n,{class:c(["apply-agent",e.theme()||""]),"data-theme":e.theme()},{default:p((()=>[""!=l.top_background?(r(),i(n,{key:0,class:"banner d-c-c d-c"},{default:p((()=>[f(o,{src:l.top_background,mode:"widthFix"},null,8,["src"])])),_:1})):m("",!0),l.is_applying?m("",!0):(r(),i(n,{key:1,class:"form-wrap p30 f30"},{default:p((()=>[f(n,{class:"p30 d-c-c gray3 f40 fb"},{default:p((()=>[_(g(l.words.apply&&l.words.apply.words&&l.words.apply.words.title&&l.words.apply.words.title.value||""),1)])),_:1}),f(z,{onSubmit:d.formSubmit,onReset:e.formReset},{default:p((()=>[f(n,{class:"form-item border-b"},{default:p((()=>[f(n,{class:"field-name"},{default:p((()=>[_("邀请人")])),_:1}),_(" "+g(l.referee_name||""),1)])),_:1}),f(n,{class:"form-item border-b"},{default:p((()=>[f(n,{class:"field-name"},{default:p((()=>[_("姓名")])),_:1}),f(I,{class:"flex-1 ml20",name:"name",type:"text","placeholder-class":"grary",placeholder:"请输入姓名"})])),_:1}),f(n,{class:"form-item border-b"},{default:p((()=>[f(n,{class:"field-name"},{default:p((()=>[_("手机号")])),_:1}),f(I,{class:"flex-1 ml20",name:"mobile",type:"number","placeholder-class":"grary",placeholder:"请输入手机"})])),_:1}),f(n,{class:"d-c-c p-20-0 f28"},{default:p((()=>[f(F,{onChange:d.changeFunc},{default:p((()=>[f(j,{value:"checkbox",checked:l.is_read},null,8,["checked"])])),_:1},8,["onChange"]),f(D,null,{default:p((()=>[_("我已阅读并了解")])),_:1}),f(D,{class:"dominant",onClick:a[0]||(a[0]=e=>l.isPopup=!0)},{default:p((()=>[_(" 【"+g(l.words.apply&&l.words.apply.words&&l.words.apply.words.license&&l.words.apply.words.license.value||"")+"】 ",1)])),_:1})])),_:1}),f(n,{class:"d-c-c mt30"},{default:p((()=>[f(R,{class:"btn-red theme-btn","form-type":"submit"},{default:p((()=>[_(g(l.words.apply&&l.words.apply.words&&l.words.apply.words.submit.value),1)])),_:1})])),_:1})])),_:1},8,["onSubmit","onReset"])])),_:1})),l.is_applying?(r(),y(w,{key:2},[f(n,{class:"d-c-c pt30"},{default:p((()=>[f(D,{style:{"font-size":"100rpx"},class:"icon iconfont icon-icon_xianshi-xian"})])),_:1}),f(n,{class:"p-30-0 d-c-c gray6 f30"},{default:p((()=>[_(g(l.words.apply.words.wait_audit.value),1)])),_:1}),f(n,{class:"p30 mt30 d-c-c"},{default:p((()=>[f(R,{type:"primary",class:"btn-red theme-btn",onClick:d.gotoShop},{default:p((()=>[_(g(l.words.apply.words.goto_mall.value),1)])),_:1},8,["onClick"])])),_:1})],64)):m("",!0),f(L,{show:l.isPopup,msg:"申请协议"},{default:p((()=>[f(n,{class:"agreement-content f28 lh150"},{default:p((()=>[_(g(l.agreement),1)])),_:1}),f(n,{class:"ww100 pt20 d-c-c"},{default:p((()=>[f(R,{type:"primary",class:"btn-red theme-btn",onClick:a[1]||(a[1]=e=>l.isPopup=!1)},{default:p((()=>[_("我已阅读")])),_:1})])),_:1})])),_:1},8,["show"])])),_:1},8,["data-theme","class"])}],["__scopeId","data-v-cc892fad"]]);export{j as default};
