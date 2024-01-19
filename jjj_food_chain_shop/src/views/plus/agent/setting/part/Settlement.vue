<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-分销-分销设置-结算
      -->
  <div class="mt30">

    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-position="top" label-width="200px">

      <el-form-item label="提现方式">
        <el-checkbox-group v-model="form.pay_type">
          <el-checkbox v-for="(item,index) in list" :label="item.id" :key="index">{{item.name}}</el-checkbox>
        </el-checkbox-group>
        <div class="tips">注：如使用微信支付，则需申请微信支付企业付款到零钱功能</div>
      </el-form-item>
      <el-form-item label="最低提现额度" prop="min_money" :rules="[{required: true,message: ' '}]">
        <el-input v-model="form.min_money" type="number" class="max-w460"></el-input>
      </el-form-item>
      <el-form-item label="佣金结算天数" prop="settle_days" :rules="[{required: true,message: ' '}]">
        <el-input v-model="form.settle_days" type="number" class="max-w460"></el-input>
        <div class="tips">
          <p class="red">注：当订单完成n天后，该订单的分销佣金才会结算到分销商余额，如果设置为0天 则订单完成时就结算</p>
          <!-- <p class="red">注：建议佣金结算天数大于允许发起售后申请天数，如果用户申请退款退货 则不结算佣金</p> -->
        </div>
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
        form: {
          pay_type: [
            10
          ],
        },
        list: [],
        selectlist: [
          10
        ],
        loading: false,
      };
    },
    props: {
      settingData: Object
    },
    created() {

      this.form=this.settingData.data.settlement.values;

      this.list = this.settingData.pay_type;

    },

    methods: {

      /*提交表单*/
      onSubmit() {
        let self = this;
        let params = self.form;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.loading = true;
            PlusApi.settlement({
                form: params
              }, true)
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
        });
      },

    }

  };
</script>

