<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-分销-分销设置-自定义文字
      -->
  <div class="product-add mt30">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-width="200px">
      <div class="common-form">分销中心页面</div>
      <el-form-item label="页面标题 ">
        <el-input v-model="form.index.title.value" placeholder="分销中心" class="max-w460"></el-input>
        <div class="tips">默认：分销中心</div>
      </el-form-item>
      <el-form-item label="非分销商提示 ">
        <el-input v-model="form.index.words.not_agent.value" placeholder="您还不是分销商，请先提交申请" class="max-w460"></el-input>
      </el-form-item>
      <el-form-item label="申请成为分销商 "><el-input v-model="form.index.words.apply_now.value" placeholder="立即加入" class="max-w460"></el-input></el-form-item>
      <el-form-item label="推荐人 "><el-input v-model="form.index.words.referee.value" placeholder="推荐人" class="max-w460"></el-input></el-form-item>
      <el-form-item label="可提现佣金 "><el-input v-model="form.index.words.money.value" placeholder="可提现" class="max-w460"></el-input></el-form-item>
      <el-form-item label="待提现佣金  "><el-input v-model="form.index.words.freeze_money.value" placeholder="待提现" class="max-w460"></el-input></el-form-item>
      <el-form-item label="已提现金额"><el-input v-model="form.index.words.total_money.value" placeholder="已提现金额" class="max-w460"></el-input></el-form-item>
      <el-form-item label="去提现"><el-input v-model="form.index.words.cash.value" placeholder="去提现" class="max-w460"></el-input></el-form-item>

      <div class="common-form">申请成为分销商页面</div>
      <el-form-item label="页面标题">
        <el-input v-model="form.apply.title.value" placeholder="申请成为分销商" class="max-w460"></el-input>
        <div class="tips">默认：申请成为分销商</div>
      </el-form-item>
      <el-form-item label="请填写申请信息"><el-input v-model="form.apply.words.title.value" placeholder="请填写申请信息" class="max-w460"></el-input></el-form-item>
      <el-form-item label="分销商申请协议"><el-input v-model="form.apply.words.license.value" placeholder="分销商申请协议" class="max-w460"></el-input></el-form-item>
      <el-form-item label="申请成为经销商"><el-input v-model="form.apply.words.submit.value" placeholder="申请成为经销商" class="max-w460"></el-input></el-form-item>
      <el-form-item label="审核中提示信息">
        <el-input v-model="form.apply.words.wait_audit.value" placeholder="您的申请已受理，正在进行信息核验，请耐心等待。" class="max-w460"></el-input>
      </el-form-item>
      <el-form-item label="去商城逛逛"><el-input v-model="form.apply.words.goto_mall.value" placeholder="去商城逛逛" class="max-w460"></el-input></el-form-item>

      <div class="common-form">分销订单页面</div>
      <el-form-item label="页面标题">
        <el-input v-model="form.order.title.value" placeholder="分销订单" class="max-w460"></el-input>
        <div class="tips">默认：分销订单</div>
      </el-form-item>
      <el-form-item label="全部"><el-input v-model="form.order.words.all.value" placeholder="全部" class="max-w460"></el-input></el-form-item>
      <el-form-item label="未结算"><el-input v-model="form.order.words.unsettled.value" placeholder="未结算" class="max-w460"></el-input></el-form-item>
      <el-form-item label="已结算"><el-input v-model="form.order.words.settled.value" placeholder="已结算" class="max-w460"></el-input></el-form-item>

      <div class="common-form">我的团队页面</div>
      <el-form-item label="页面标题">
        <el-input v-model="form.team.title.value" placeholder="我的团队" class="max-w460"></el-input>
        <div class="tips">默认：我的团队</div>
      </el-form-item>

      <el-form-item label="团队总人数"><el-input v-model="form.team.words.total_team.value" placeholder="团队总人数" class="max-w460"></el-input></el-form-item>
      <el-form-item label="一级团队"><el-input v-model="form.team.words.first.value" placeholder="一级团队" class="max-w460"></el-input></el-form-item>
      <el-form-item label="二级团队"><el-input v-model="form.team.words.second.value" placeholder="二级团队" class="max-w460"></el-input></el-form-item>
      <el-form-item label="三级团队"><el-input v-model="form.team.words.third.value" placeholder="三级团队" class="max-w460"></el-input></el-form-item>

      <div class="common-form">提现明细页面</div>
      <el-form-item label="页面标题">
        <el-input v-model="form.cash_list.title.value" placeholder="提现明细" class="max-w460"></el-input>
        <div class="tips">默认：提现明细</div>
      </el-form-item>
      <el-form-item label="全部"><el-input v-model="form.cash_list.words.all.value" placeholder="全部" class="max-w460"></el-input></el-form-item>
      <el-form-item label="审核中"><el-input v-model="form.cash_list.words.apply_10.value" placeholder="审核中" class="max-w460"></el-input></el-form-item>
      <el-form-item label="审核通过"><el-input v-model="form.cash_list.words.apply_20.value" placeholder="审核通过" class="max-w460"></el-input></el-form-item>
      <el-form-item label="已打款"><el-input v-model="form.cash_list.words.apply_40.value" placeholder="已打款" class="max-w460"></el-input></el-form-item>
      <el-form-item label="驳回"><el-input v-model="form.cash_list.words.apply_30.value" placeholder="驳回" class="max-w460"></el-input></el-form-item>

      <div class="common-form">申请提现页面</div>
      <el-form-item label="页面标题">
        <el-input v-model="form.cash_apply.title.value" placeholder="申请提现" class="max-w460"></el-input>
        <div class="tips">默认：申请提现</div>
      </el-form-item>
      <el-form-item label="可提现佣金"><el-input v-model="form.cash_apply.words.capital.value" placeholder="可提现佣金" class="max-w460"></el-input></el-form-item>
      <el-form-item label="提现金额"><el-input v-model="form.cash_apply.words.money.value" placeholder="提现金额" class="max-w460"></el-input></el-form-item>
      <el-form-item label="请输入要提取的金额">
        <el-input v-model="form.cash_apply.words.money_placeholder.value" placeholder="请输入要提取的金额" class="max-w460"></el-input>
      </el-form-item>
      <el-form-item label="最低提现佣金"><el-input v-model="form.cash_apply.words.min_money.value" placeholder="最低提现佣金" class="max-w460"></el-input></el-form-item>
      <el-form-item label="提交申请"><el-input v-model="form.cash_apply.words.submit.value" placeholder="提交申请" class="max-w460"></el-input></el-form-item>

      <div class="common-form">推广二维码</div>
      <el-form-item label="页面标题">
        <el-input v-model="form.qrcode.title.value" placeholder="推广二维码" class="max-w460"></el-input>
        <div class="tips">默认：推广二维码</div>
      </el-form-item>

      <!--提交-->
      <div class="common-button-wrapper">
        <el-button size="small" type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import PlusApi from '@/api/plus.js';

export default {
  data() {
    return {
      /*form表单数据*/
      form: {},
      /*是否正在加载*/
      loading: false,
    };
  },
  props: {
    settingData: Object
  },
  created() {
    this.form = this.settingData.data.words.values;
  },

  methods: {

    /*提交表单*/
    onSubmit() {
      let self = this;
      let params = self.form;
      self.loading = true;
      PlusApi.words(params, true)
        .then(data => {
          self.loading = false;
          ElMessage({
            message: '恭喜你，设置成功',
            type: 'success'
          });
        })
        .catch(error => {
          self.loading = false;
        });
    }

  }
};
</script>

<style>
.tips {
  color: #ccc;
}
</style>
