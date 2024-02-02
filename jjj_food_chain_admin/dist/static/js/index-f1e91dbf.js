import{h as e,c as a,d as i,e as s,r as l,f as o}from"./element-plus-90e2c6dc.js";import{r}from"./request-e2c2136e.js";import{_ as m}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as p,c as t,O as d,R as n,a as _,V as c,P as u,X as h}from"./@vue-a14816bf.js";import"./lodash-es-493ac664.js";import"./@vueuse-91cd0e71.js";import"./dayjs-3a594381.js";import"./call-bind-8544b80b.js";import"./get-intrinsic-bac01933.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-72d06d3b.js";import"./has-885c3436.js";import"./@element-plus-0e7d7a79.js";import"./@popperjs-b78c3215.js";import"./escape-html-1590d737.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./axios-63583d02.js";import"./qs-c6aa5595.js";import"./side-channel-b02c3a2b.js";import"./object-inspect-bd98d4ca.js";import"./index-315e32f5.js";import"./vue-router-cf371e7b.js";import"./pinia-dde4581d.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-i18n-0667e8d8.js";import"./@intlify-2339bc47.js";let f={serviceDetail:(e,a)=>r._get("/admin/setting.service/index",e,a),editService:(e,a)=>r._post("/admin/setting.service/index",e,a)};const g={data:()=>({loading:!1,form:{shop_name:"",shop_bg_img:"",shop_logo_img:"",cashier_name:"",cashier_bg_img:"",weixin_service:{is_open:0,app_id:"",mch_id:"",apikey:"",cert_pem:"",key_pem:""}}}),created(){this.getParams()},methods:{getParams(){let e=this;f.serviceDetail({},!0).then((a=>{e.form.shop_name=a.data.vars.values.shop_name,e.form.shop_bg_img=a.data.vars.values.shop_bg_img,e.form.shop_logo_img=a.data.vars.values.shop_logo_img,e.form.cashier_name=a.data.vars.values.cashier_name,e.form.cashier_bg_img=a.data.vars.values.cashier_bg_img,a.data.vars.values.weixin_service&&(e.form.weixin_service=a.data.vars.values.weixin_service,e.form.weixin_service.is_open=parseInt(e.form.weixin_service.is_open)),e.loading=!1})).catch((a=>{e.loading=!1}))},onSubmit(){let a=this,i=this.form;a.$refs.form.validate((s=>{s&&(a.loading=!0,f.editService(i,!0).then((i=>{a.loading=!1,e({message:"恭喜你，设置成功",type:"success"}),a.$router.push("/setting/Index")})).catch((e=>{a.loading=!1})))}))}}},v={class:"product-add"},x=_("div",{class:"common-form"},"商城后台设置",-1),w=_("div",{class:"tips"}," shop端商城名称，显示在登录页 ",-1),V=_("div",{class:"tips"}," shop端商城登录背景，不填则为系统默认登录背景，填写网络地址 ",-1),b=_("div",{class:"tips"}," shop端商城登录logo，不填则为系统默认登录logo，填写网络地址 ",-1),j=_("div",{class:"tips"}," 收银台名称，显示在登录页 ",-1),y=_("div",{class:"tips"}," 收银台登录背景，不填则为系统默认登录背景，填写网络地址 ",-1),k=_("div",{class:"common-form"},"微信服务商支付设置",-1),U=_("div",{class:"tips"}," 填写服务商户号、10位数字 ",-1),q=_("div",{class:"tips"}," 填写服务商户支付秘钥apikey ",-1),S=_("div",{class:"tips"}," 填写服务商户号绑定的公众号appid ",-1),P=_("div",{class:"tips"},"使用文本编辑器打开apiclient_key.pem文件，将文件的全部内容复制进来",-1),C=_("div",{class:"tips"},"使用文本编辑器打开apiclient_key.pem文件，将文件的全部内容复制进来",-1),D={class:"button-wrapper"};const I=m(g,[["render",function(e,r,m,f,g,I){const $=i,z=s,F=l,G=o,O=a;return p(),t("div",v,[d(O,{ref:"form",model:g.form,"label-width":"150px"},{default:n((()=>[x,d(z,{label:"商城系统名称",rules:[{required:!0,message:" "}],prop:"shop_name"},{default:n((()=>[d($,{modelValue:g.form.shop_name,"onUpdate:modelValue":r[0]||(r[0]=e=>g.form.shop_name=e),placeholder:"商城名称",class:"max-w460"},null,8,["modelValue"]),w])),_:1}),d(z,{label:"商城登录背景",prop:"shop_bg_img"},{default:n((()=>[d($,{modelValue:g.form.shop_bg_img,"onUpdate:modelValue":r[1]||(r[1]=e=>g.form.shop_bg_img=e),placeholder:"商城登录背景",class:"max-w460"},null,8,["modelValue"]),V])),_:1}),d(z,{label:"商城登录logo",prop:"shop_logo_img"},{default:n((()=>[d($,{modelValue:g.form.shop_logo_img,"onUpdate:modelValue":r[2]||(r[2]=e=>g.form.shop_logo_img=e),placeholder:"商城登录logo",class:"max-w460"},null,8,["modelValue"]),b])),_:1}),d(z,{label:"收银台系统名称",rules:[{required:!0,message:" "}],prop:"cashier_name"},{default:n((()=>[d($,{modelValue:g.form.cashier_name,"onUpdate:modelValue":r[3]||(r[3]=e=>g.form.cashier_name=e),placeholder:"收银台名称",class:"max-w460"},null,8,["modelValue"]),j])),_:1}),d(z,{label:"收银台登录背景",prop:"cashier_bg_img"},{default:n((()=>[d($,{modelValue:g.form.cashier_bg_img,"onUpdate:modelValue":r[4]||(r[4]=e=>g.form.cashier_bg_img=e),placeholder:"收银台登录背景",class:"max-w460"},null,8,["modelValue"]),y])),_:1}),k,d(z,{label:"是否开启服务商支付"},{default:n((()=>[_("div",null,[d(F,{modelValue:g.form.weixin_service.is_open,"onUpdate:modelValue":r[5]||(r[5]=e=>g.form.weixin_service.is_open=e),label:1},{default:n((()=>[c("开启")])),_:1},8,["modelValue"]),d(F,{modelValue:g.form.weixin_service.is_open,"onUpdate:modelValue":r[6]||(r[6]=e=>g.form.weixin_service.is_open=e),label:0},{default:n((()=>[c("关闭")])),_:1},8,["modelValue"])])])),_:1}),1==g.form.weixin_service.is_open?(p(),t(u,{key:0},[d(z,{label:"服务商户号",rules:[{required:!0,message:" "}],prop:"weixin_service.mch_id"},{default:n((()=>[d($,{modelValue:g.form.weixin_service.mch_id,"onUpdate:modelValue":r[7]||(r[7]=e=>g.form.weixin_service.mch_id=e),placeholder:"服务商户号",class:"max-w460"},null,8,["modelValue"]),U])),_:1}),d(z,{label:"服务商支付秘钥apikey",rules:[{required:!0,message:" "}],prop:"weixin_service.apikey"},{default:n((()=>[d($,{modelValue:g.form.weixin_service.apikey,"onUpdate:modelValue":r[8]||(r[8]=e=>g.form.weixin_service.apikey=e),placeholder:"服务商支付秘钥apikey",class:"max-w460"},null,8,["modelValue"]),q])),_:1}),d(z,{label:"服务商appid",rules:[{required:!0,message:" "}],prop:"weixin_service.app_id"},{default:n((()=>[d($,{modelValue:g.form.weixin_service.app_id,"onUpdate:modelValue":r[9]||(r[9]=e=>g.form.weixin_service.app_id=e),placeholder:"服务商appid",class:"max-w460"},null,8,["modelValue"]),S])),_:1}),d(z,{label:"apiclient_cert.pem",rules:[{required:!0,message:" "}],prop:"weixin_service.cert_pem"},{default:n((()=>[d($,{type:"textarea",rows:4,placeholder:"使用文本编辑器打开apiclient_cert.pem文件，将文件的全部内容复制进来",modelValue:g.form.weixin_service.cert_pem,"onUpdate:modelValue":r[10]||(r[10]=e=>g.form.weixin_service.cert_pem=e),class:"max-w460"},null,8,["modelValue"]),P])),_:1}),d(z,{label:"apiclient_key.pem",rules:[{required:!0,message:" "}],prop:"weixin_service.key_pem"},{default:n((()=>[d($,{type:"textarea",rows:4,placeholder:"使用文本编辑器打开apiclient_cert.pem文件，将文件的全部内容复制进来",modelValue:g.form.weixin_service.key_pem,"onUpdate:modelValue":r[11]||(r[11]=e=>g.form.weixin_service.key_pem=e),class:"max-w460"},null,8,["modelValue"]),C])),_:1})],64)):h("",!0),_("div",D,[d(G,{type:"primary",onClick:I.onSubmit,loading:g.loading},{default:n((()=>[c("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}]]);export{I as default};