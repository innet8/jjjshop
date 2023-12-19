import{_ as e,l as a,p as s,E as t,m as l,K as n,O as o,o as d,c as i,w as u,n as c,g as r,b as f,d as p,t as m,e as h,j as _,i as g,I as b,H as y,Z as k,$ as w,h as I,L as v,k as C,a0 as N}from"./index-1a637619.js";import{P}from"./uni-popup.bcc5e38f.js";import{U as B}from"./upload.9fbd7ae5.js";/* empty css                                                                  */const U=e({components:{Popup:P,Upload:B},data:()=>({userInfo:{},isPopup:!1,isBirthday:!1,birthday:"",imageList:[],newName:"",type:"",isUpload:!1}),onShow(){this.getData()},methods:{changeName(e){let a=this;console.log(e),"mobile"==e&&(a.oldmobile=a.userInfo.mobile),a.type=e,a.newName=a.userInfo[e],a.isPopup=!0},onChooseAvatar(e){console.log(e),this.uploadFile([e.detail.avatarUrl])},getData(){let e=this;a({title:"加载中"}),e._get("user.index/setting",{},(function(a){e.userInfo=a.data.userInfo,s()}))},gotoBind(){t({url:"/pages/user/modify-phone/modify-phone"})},changeAvatarUrl(){this.isUpload=!0},changeinput(e){this.newName=e.target.value},changeGender(e){this.newName=e.detail.value},subName(e){let a=this;a.loading||("gender"!=a.type&&(a.newName=e.detail.value.newName),a.userInfo[a.type]=this.newName,a.update())},uploadFile:function(e){let t=this,o=0,d=e.length,i={token:l("token"),app_id:t.getAppId()};a({title:"图片上传中"}),e.forEach((function(e,a){n({url:t.websiteUrl+"/index.php?s=/api/file.upload/image",filePath:e,name:"iFile",formData:i,success:function(e){let a="object"==typeof e.data?e.data:JSON.parse(e.data);1===a.code?t.imageList.push(a.data):t.showError(a.msg)},complete:function(){o++,d===o&&(s(),t.getImgsFunc(t.imageList))}})}))},getImgsFunc(e){if(e&&void 0!==e){let a=this;a.userInfo.avatarUrl=e[0].file_path,a.update(),a.isUpload=!1}},subBirthday(){let e=this;a({title:"加载中"}),e._post("user.user/updateInfo",{birthday:e.birthday},(function(a){e.userInfo.birthday,s(),e.showSuccess("修改成功",(function(){e.isBirthday=!1,e.getData()}))}))},hideBirthdayFunc(){this.isBirthday=!1},hidePopupFunc(){this.isPopup=!1},fbindDateChange(e){this.birthday=e.detail.value},logout(){o("token"),o("user_id"),this.gotoPage("/pages/index/index")},Bindbirthday(){this.isBirthday=!0},update(){let e=this;if(e.loading)return;a({title:"加载中"});let t=e.userInfo;e.loading=!0,e._post("user.user/updateInfo",t,(function(a){e.showSuccess("修改成功",(function(){e.loading=!1,e.isPopup=!1,s(),e.getData()}),(function(a){s(),e.loading=!1,e.isPopup=!1}))}))}}},[["render",function(e,a,s,t,l,n){const o=_,P=g,B=r,U=b,F=y,x=k,j=w,D=I,E=v,S=C("Popup"),H=N,A=C("Upload");return d(),i(B,{class:c(["address-form",e.theme()||""]),"data-theme":e.theme()},{default:u((()=>[f(B,{class:"bg-white p-0-30 f30"},{default:u((()=>[f(B,{class:"d-b-c border-b p-30-0 info-item avatar"},{default:u((()=>[f(o,{class:"key-name"},{default:u((()=>[p("头像")])),_:1}),f(B,{class:"d-e-c",onClick:n.changeAvatarUrl},{default:u((()=>[f(B,{class:"info-image"},{default:u((()=>[f(P,{src:l.userInfo.avatarUrl||"/static/default.png",mode:""},null,8,["src"])])),_:1}),f(o,{class:"icon iconfont icon-jiantou"})])),_:1},8,["onClick"])])),_:1}),f(B,{class:"d-b-c p-30-0 border-b"},{default:u((()=>[f(o,{class:"key-name"},{default:u((()=>[p("会员ID")])),_:1}),f(B,{class:"d-e-c"},{default:u((()=>[f(o,{class:"mr20"},{default:u((()=>[p(m(l.userInfo.user_id),1)])),_:1})])),_:1})])),_:1}),f(B,{class:"d-b-c p-30-0 border-b",onClick:a[0]||(a[0]=e=>n.changeName("nickName"))},{default:u((()=>[f(o,{class:"key-name"},{default:u((()=>[p("昵称")])),_:1}),f(B,{class:"d-e-c"},{default:u((()=>[f(o,{class:"mr20"},{default:u((()=>[p(m(l.userInfo.nickName),1)])),_:1}),f(o,{class:"icon iconfont icon-jiantou"})])),_:1})])),_:1}),f(B,{class:"d-b-c p-30-0 border-b"},{default:u((()=>[f(o,{class:"key-name"},{default:u((()=>[p("手机号码")])),_:1}),l.userInfo.mobile?(d(),i(B,{key:0,class:"d-e-c"},{default:u((()=>[f(o,{class:"mr20"},{default:u((()=>[p(m(l.userInfo.mobile),1)])),_:1})])),_:1})):h("",!0),l.userInfo.mobile?h("",!0):(d(),i(B,{key:1,class:"d-e-c"},{default:u((()=>[f(o,{class:"mr20"},{default:u((()=>[p("未绑定")])),_:1})])),_:1}))])),_:1}),f(B,{class:"d-b-c p-30-0 border-b"},{default:u((()=>[f(o,{class:"key-name"},{default:u((()=>[p("出生日期")])),_:1}),l.userInfo.birthday?(d(),i(B,{key:0,class:"d-e-c"},{default:u((()=>[f(o,{class:"mr20"},{default:u((()=>[p(m(l.userInfo.birthday),1)])),_:1})])),_:1})):h("",!0),l.userInfo.birthday?h("",!0):(d(),i(B,{key:1,class:"d-e-c",onClick:n.Bindbirthday},{default:u((()=>[f(o,{class:"mr20"},{default:u((()=>[p("未绑定")])),_:1}),f(o,{class:"iconfont icon-jiantou"})])),_:1},8,["onClick"]))])),_:1}),f(B,{class:"d-b-c p-30-0 set-group-item"},{default:u((()=>[f(B,null,{default:u((()=>[p("性别")])),_:1}),f(B,{class:"d-e-c",onClick:a[1]||(a[1]=e=>n.changeName("gender"))},{default:u((()=>[0==l.userInfo.gender?(d(),i(o,{key:0,class:"mr20"},{default:u((()=>[p("女")])),_:1})):h("",!0),1==l.userInfo.gender?(d(),i(o,{key:1,class:"mr20"},{default:u((()=>[p("男")])),_:1})):h("",!0),2==l.userInfo.gender?(d(),i(o,{key:2,class:"mr20"},{default:u((()=>[p("保密")])),_:1})):h("",!0),f(o,{class:"icon iconfont icon-jiantou"})])),_:1})])),_:1}),f(B,{class:"setup-btn theme-btn",onClick:a[2]||(a[2]=e=>n.logout())},{default:u((()=>[p("退出登录")])),_:1})])),_:1}),f(S,{show:l.isPopup,type:"bottom",width:750,padding:0,onHidePopup:n.hidePopupFunc},{default:u((()=>[f(E,{onSubmit:n.subName},{default:u((()=>[f(B,{class:"d-s-s d-c p20 mpservice-wrap"},{default:u((()=>[f(B,{class:"tc f32 fb ww100"},{default:u((()=>[p("修改")])),_:1}),"mobile"==l.type||"nickName"==l.type||"user_name"==l.type||"email"==l.type||"idcard"==l.type?(d(),i(B,{key:0,class:"pop-input d-b-c"},{default:u((()=>[f(U,{type:"text",name:"newName",class:"flex-1",placeholder:"请输入",value:l.newName,onInput:n.changeinput},null,8,["value","onInput"]),f(B,{class:"icon-guanbi icon iconfont",onClick:e.clearName},null,8,["onClick"])])),_:1})):h("",!0),"gender"==l.type?(d(),i(B,{key:1},{default:u((()=>[f(j,{onChange:n.changeGender},{default:u((()=>[f(x,{class:"d-s-c make-item"},{default:u((()=>[f(B,null,{default:u((()=>[f(F,{style:{transform:"scale(0.7)"},color:"#E03325",checked:2==l.newName,value:"2"},null,8,["checked"])])),_:1}),f(B,{class:"f26 color-57"},{default:u((()=>[p("保密")])),_:1})])),_:1}),f(x,{class:"d-s-c make-item"},{default:u((()=>[f(B,null,{default:u((()=>[f(F,{style:{transform:"scale(0.7)"},color:"#E03325",checked:1==l.newName,value:"1"},null,8,["checked"])])),_:1}),f(B,{class:"f26 color-57"},{default:u((()=>[p("男")])),_:1})])),_:1}),f(x,{class:"d-s-c make-item"},{default:u((()=>[f(B,null,{default:u((()=>[f(F,{style:{transform:"scale(0.7)"},color:"#E03325",checked:0==l.newName,value:"0"},null,8,["checked"])])),_:1}),f(B,{class:"f26 color-57"},{default:u((()=>[p("女")])),_:1})])),_:1})])),_:1},8,["onChange"])])),_:1})):h("",!0),f(B,{class:"d-a-c ww100"},{default:u((()=>[f(D,{class:"theme-borderbtn",onClick:n.hidePopupFunc},{default:u((()=>[p("取消")])),_:1},8,["onClick"]),f(D,{class:"theme-btn","form-type":"submit"},{default:u((()=>[p("确认")])),_:1})])),_:1})])),_:1})])),_:1},8,["onSubmit"])])),_:1},8,["show","onHidePopup"]),f(S,{show:l.isBirthday,type:"bottom",width:750,padding:0,onHidePopup:n.hideBirthdayFunc},{default:u((()=>[f(B,{class:"d-s-s d-c p20 mpservice-wrap"},{default:u((()=>[f(B,{class:"tc f32 fb ww100"},{default:u((()=>[p("修改")])),_:1}),f(B,{class:"ww100"},{default:u((()=>[f(H,{class:"datapicker ww100",mode:"date",value:l.birthday,onChange:n.fbindDateChange},{default:u((()=>[f(B,{class:"make-item pop-input input-box f28"},{default:u((()=>[p(m(l.birthday||"请选择出生日期"),1)])),_:1})])),_:1},8,["value","onChange"])])),_:1}),f(B,{class:"red"},{default:u((()=>[p("注：仅可修改一次")])),_:1}),f(B,{class:"d-a-c ww100"},{default:u((()=>[f(D,{class:"theme-borderbtn",onClick:n.hideBirthdayFunc},{default:u((()=>[p("取消")])),_:1},8,["onClick"]),f(D,{class:"theme-btn",onClick:n.subBirthday},{default:u((()=>[p("确认")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1},8,["show","onHidePopup"]),l.isUpload?(d(),i(A,{key:0,num:1,onGetImgs:n.getImgsFunc},null,8,["onGetImgs"])):h("",!0)])),_:1},8,["data-theme","class"])}],["__scopeId","data-v-658a6235"]]);export{U as default};
