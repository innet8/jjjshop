import{E as l,g as e,h as a,i as o,e as d}from"./element-plus-d03e850c.js";import{P as m}from"./plus-1fc9b2e8.js";import{_ as s}from"./_plugin-vue_export-helper-1b428a4d.js";import{o as u,c as r,P as t,S as p,a as n,W as i}from"./@vue-e72ffbb6.js";import"./@vueuse-0fb12a45.js";import"./lodash-es-cce4393d.js";import"./async-validator-cf877c1f.js";import"./@element-plus-4b00147d.js";import"./dayjs-34225b3b.js";import"./call-bind-2971450c.js";import"./get-intrinsic-d8eb8ca0.js";import"./has-symbols-456daba2.js";import"./has-proto-4a87f140.js";import"./function-bind-afbcd6f2.js";import"./has-719bcddc.js";import"./escape-html-1935ddb3.js";import"./normalize-wheel-es-3222b0a2.js";import"./@ctrl-91de2ec7.js";import"./index-0eefa19c.js";import"./vue-router-7e282e9c.js";import"./pinia-72b16af9.js";import"./vue-demi-71ba0ef2.js";import"./axios-85bcd05e.js";import"./qs-a8eee860.js";import"./side-channel-052d4c61.js";import"./object-inspect-dd55f836.js";import"./pinia-plugin-persistedstate-35ef556e.js";import"./vue-ueditor-wrap-e5a15ab3.js";import"./vue-i18n-73a1cd16.js";import"./@intlify-28c65249.js";const c={data:()=>({form:{},loading:!1}),props:{settingData:Object},created(){this.form=this.settingData.data.words.values},methods:{onSubmit(){let e=this,a=e.form;e.loading=!0,m.words(a,!0).then((a=>{e.loading=!1,l({message:"恭喜你，设置成功",type:"success"})})).catch((l=>{e.loading=!1}))}}},f={class:"product-add mt30"},V=n("div",{class:"common-form"},"分销中心页面",-1),w=n("div",{class:"tips"},"默认：分销中心",-1),v=n("div",{class:"common-form"},"申请成为分销商页面",-1),_=n("div",{class:"tips"},"默认：申请成为分销商",-1),h=n("div",{class:"common-form"},"分销订单页面",-1),x=n("div",{class:"tips"},"默认：分销订单",-1),y=n("div",{class:"common-form"},"我的团队页面",-1),b=n("div",{class:"tips"},"默认：我的团队",-1),U=n("div",{class:"common-form"},"提现明细页面",-1),j=n("div",{class:"tips"},"默认：提现明细",-1),g=n("div",{class:"common-form"},"申请提现页面",-1),z=n("div",{class:"tips"},"默认：申请提现",-1),k=n("div",{class:"common-form"},"推广二维码",-1),q=n("div",{class:"tips"},"默认：推广二维码",-1),C={class:"common-button-wrapper"};const S=s(c,[["render",function(l,m,s,c,S,D){const P=e,W=a,A=o,B=d;return u(),r("div",f,[t(B,{size:"small",ref:"form",model:S.form,"label-position":"top","label-width":"200px"},{default:p((()=>[V,t(W,{label:"页面标题 "},{default:p((()=>[t(P,{modelValue:S.form.index.title.value,"onUpdate:modelValue":m[0]||(m[0]=l=>S.form.index.title.value=l),placeholder:"分销中心",class:"max-w460"},null,8,["modelValue"]),w])),_:1}),t(W,{label:"非分销商提示 "},{default:p((()=>[t(P,{modelValue:S.form.index.words.not_agent.value,"onUpdate:modelValue":m[1]||(m[1]=l=>S.form.index.words.not_agent.value=l),placeholder:"您还不是分销商，请先提交申请",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"申请成为分销商 "},{default:p((()=>[t(P,{modelValue:S.form.index.words.apply_now.value,"onUpdate:modelValue":m[2]||(m[2]=l=>S.form.index.words.apply_now.value=l),placeholder:"立即加入",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"推荐人 "},{default:p((()=>[t(P,{modelValue:S.form.index.words.referee.value,"onUpdate:modelValue":m[3]||(m[3]=l=>S.form.index.words.referee.value=l),placeholder:"推荐人",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"可提现佣金 "},{default:p((()=>[t(P,{modelValue:S.form.index.words.money.value,"onUpdate:modelValue":m[4]||(m[4]=l=>S.form.index.words.money.value=l),placeholder:"可提现",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"待提现佣金  "},{default:p((()=>[t(P,{modelValue:S.form.index.words.freeze_money.value,"onUpdate:modelValue":m[5]||(m[5]=l=>S.form.index.words.freeze_money.value=l),placeholder:"待提现",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"已提现金额"},{default:p((()=>[t(P,{modelValue:S.form.index.words.total_money.value,"onUpdate:modelValue":m[6]||(m[6]=l=>S.form.index.words.total_money.value=l),placeholder:"已提现金额",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"去提现"},{default:p((()=>[t(P,{modelValue:S.form.index.words.cash.value,"onUpdate:modelValue":m[7]||(m[7]=l=>S.form.index.words.cash.value=l),placeholder:"去提现",class:"max-w460"},null,8,["modelValue"])])),_:1}),v,t(W,{label:"页面标题"},{default:p((()=>[t(P,{modelValue:S.form.apply.title.value,"onUpdate:modelValue":m[8]||(m[8]=l=>S.form.apply.title.value=l),placeholder:"申请成为分销商",class:"max-w460"},null,8,["modelValue"]),_])),_:1}),t(W,{label:"请填写申请信息"},{default:p((()=>[t(P,{modelValue:S.form.apply.words.title.value,"onUpdate:modelValue":m[9]||(m[9]=l=>S.form.apply.words.title.value=l),placeholder:"请填写申请信息",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"分销商申请协议"},{default:p((()=>[t(P,{modelValue:S.form.apply.words.license.value,"onUpdate:modelValue":m[10]||(m[10]=l=>S.form.apply.words.license.value=l),placeholder:"分销商申请协议",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"申请成为经销商"},{default:p((()=>[t(P,{modelValue:S.form.apply.words.submit.value,"onUpdate:modelValue":m[11]||(m[11]=l=>S.form.apply.words.submit.value=l),placeholder:"申请成为经销商",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"审核中提示信息"},{default:p((()=>[t(P,{modelValue:S.form.apply.words.wait_audit.value,"onUpdate:modelValue":m[12]||(m[12]=l=>S.form.apply.words.wait_audit.value=l),placeholder:"您的申请已受理，正在进行信息核验，请耐心等待。",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"去商城逛逛"},{default:p((()=>[t(P,{modelValue:S.form.apply.words.goto_mall.value,"onUpdate:modelValue":m[13]||(m[13]=l=>S.form.apply.words.goto_mall.value=l),placeholder:"去商城逛逛",class:"max-w460"},null,8,["modelValue"])])),_:1}),h,t(W,{label:"页面标题"},{default:p((()=>[t(P,{modelValue:S.form.order.title.value,"onUpdate:modelValue":m[14]||(m[14]=l=>S.form.order.title.value=l),placeholder:"分销订单",class:"max-w460"},null,8,["modelValue"]),x])),_:1}),t(W,{label:"全部"},{default:p((()=>[t(P,{modelValue:S.form.order.words.all.value,"onUpdate:modelValue":m[15]||(m[15]=l=>S.form.order.words.all.value=l),placeholder:"全部",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"未结算"},{default:p((()=>[t(P,{modelValue:S.form.order.words.unsettled.value,"onUpdate:modelValue":m[16]||(m[16]=l=>S.form.order.words.unsettled.value=l),placeholder:"未结算",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"已结算"},{default:p((()=>[t(P,{modelValue:S.form.order.words.settled.value,"onUpdate:modelValue":m[17]||(m[17]=l=>S.form.order.words.settled.value=l),placeholder:"已结算",class:"max-w460"},null,8,["modelValue"])])),_:1}),y,t(W,{label:"页面标题"},{default:p((()=>[t(P,{modelValue:S.form.team.title.value,"onUpdate:modelValue":m[18]||(m[18]=l=>S.form.team.title.value=l),placeholder:"我的团队",class:"max-w460"},null,8,["modelValue"]),b])),_:1}),t(W,{label:"团队总人数"},{default:p((()=>[t(P,{modelValue:S.form.team.words.total_team.value,"onUpdate:modelValue":m[19]||(m[19]=l=>S.form.team.words.total_team.value=l),placeholder:"团队总人数",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"一级团队"},{default:p((()=>[t(P,{modelValue:S.form.team.words.first.value,"onUpdate:modelValue":m[20]||(m[20]=l=>S.form.team.words.first.value=l),placeholder:"一级团队",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"二级团队"},{default:p((()=>[t(P,{modelValue:S.form.team.words.second.value,"onUpdate:modelValue":m[21]||(m[21]=l=>S.form.team.words.second.value=l),placeholder:"二级团队",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"三级团队"},{default:p((()=>[t(P,{modelValue:S.form.team.words.third.value,"onUpdate:modelValue":m[22]||(m[22]=l=>S.form.team.words.third.value=l),placeholder:"三级团队",class:"max-w460"},null,8,["modelValue"])])),_:1}),U,t(W,{label:"页面标题"},{default:p((()=>[t(P,{modelValue:S.form.cash_list.title.value,"onUpdate:modelValue":m[23]||(m[23]=l=>S.form.cash_list.title.value=l),placeholder:"提现明细",class:"max-w460"},null,8,["modelValue"]),j])),_:1}),t(W,{label:"全部"},{default:p((()=>[t(P,{modelValue:S.form.cash_list.words.all.value,"onUpdate:modelValue":m[24]||(m[24]=l=>S.form.cash_list.words.all.value=l),placeholder:"全部",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"审核中"},{default:p((()=>[t(P,{modelValue:S.form.cash_list.words.apply_10.value,"onUpdate:modelValue":m[25]||(m[25]=l=>S.form.cash_list.words.apply_10.value=l),placeholder:"审核中",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"审核通过"},{default:p((()=>[t(P,{modelValue:S.form.cash_list.words.apply_20.value,"onUpdate:modelValue":m[26]||(m[26]=l=>S.form.cash_list.words.apply_20.value=l),placeholder:"审核通过",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"已打款"},{default:p((()=>[t(P,{modelValue:S.form.cash_list.words.apply_40.value,"onUpdate:modelValue":m[27]||(m[27]=l=>S.form.cash_list.words.apply_40.value=l),placeholder:"已打款",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"驳回"},{default:p((()=>[t(P,{modelValue:S.form.cash_list.words.apply_30.value,"onUpdate:modelValue":m[28]||(m[28]=l=>S.form.cash_list.words.apply_30.value=l),placeholder:"驳回",class:"max-w460"},null,8,["modelValue"])])),_:1}),g,t(W,{label:"页面标题"},{default:p((()=>[t(P,{modelValue:S.form.cash_apply.title.value,"onUpdate:modelValue":m[29]||(m[29]=l=>S.form.cash_apply.title.value=l),placeholder:"申请提现",class:"max-w460"},null,8,["modelValue"]),z])),_:1}),t(W,{label:"可提现佣金"},{default:p((()=>[t(P,{modelValue:S.form.cash_apply.words.capital.value,"onUpdate:modelValue":m[30]||(m[30]=l=>S.form.cash_apply.words.capital.value=l),placeholder:"可提现佣金",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"提现金额"},{default:p((()=>[t(P,{modelValue:S.form.cash_apply.words.money.value,"onUpdate:modelValue":m[31]||(m[31]=l=>S.form.cash_apply.words.money.value=l),placeholder:"提现金额",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"请输入要提取的金额"},{default:p((()=>[t(P,{modelValue:S.form.cash_apply.words.money_placeholder.value,"onUpdate:modelValue":m[32]||(m[32]=l=>S.form.cash_apply.words.money_placeholder.value=l),placeholder:"请输入要提取的金额",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"最低提现佣金"},{default:p((()=>[t(P,{modelValue:S.form.cash_apply.words.min_money.value,"onUpdate:modelValue":m[33]||(m[33]=l=>S.form.cash_apply.words.min_money.value=l),placeholder:"最低提现佣金",class:"max-w460"},null,8,["modelValue"])])),_:1}),t(W,{label:"提交申请"},{default:p((()=>[t(P,{modelValue:S.form.cash_apply.words.submit.value,"onUpdate:modelValue":m[34]||(m[34]=l=>S.form.cash_apply.words.submit.value=l),placeholder:"提交申请",class:"max-w460"},null,8,["modelValue"])])),_:1}),k,t(W,{label:"页面标题"},{default:p((()=>[t(P,{modelValue:S.form.qrcode.title.value,"onUpdate:modelValue":m[35]||(m[35]=l=>S.form.qrcode.title.value=l),placeholder:"推广二维码",class:"max-w460"},null,8,["modelValue"]),q])),_:1}),n("div",C,[t(A,{size:"small",type:"primary",onClick:D.onSubmit,loading:S.loading},{default:p((()=>[i("提交")])),_:1},8,["onClick","loading"])])])),_:1},8,["model"])])}]]);export{S as default};
