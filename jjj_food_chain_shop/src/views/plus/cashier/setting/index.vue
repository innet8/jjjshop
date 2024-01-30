<template>
  <!--
      作者 luoyiming
      时间：2019-10-26
      描述：设置-设置
  -->
  <div class="product-add">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-position="top" label-width="200px">
      <div class="common-form ">访问路径</div>
      <div class="show-input">
        <el-input class="ml30 max-w460" disabled v-model="url" placeholder="">
          <template #append>
            <el-button @click="toCashier">访问</el-button>
          </template>
        </el-input>
      </div>
      <!--设置-->
      <!-- <div class="common-form">支付设置</div>
      <el-form-item label="支付方式">
        <el-checkbox-group v-model="form.checkedPay">
          <el-checkbox v-for="(item,index) in pay_type" :label="item.value" :key="index">{{item.name}}</el-checkbox>
        </el-checkbox-group>
        <div class="tips">注：支付方式至少选择一个</div>
      </el-form-item>
      <div class="common-form">权限设置</div>
      <el-form-item label="功能">
        <el-checkbox-group v-model="form.function">
          <el-checkbox v-for="(item,index) in funMthod" :label="item.value" :key="index">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="绑定会员提示">
        <div>
          <el-radio v-model="form.bind_user" label="1">开启</el-radio>
          <el-radio v-model="form.bind_user" label="0">关闭</el-radio>
        </div>
      </el-form-item> -->
      <!--提交-->
      <!-- <div class="common-button-wrapper">
        <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </div> -->
    </el-form>
  </div>
</template>

<script>
  import CashierApi from '@/api/cashier.js';
  export default {
    components: {},
    data() {
      return {
        /*form表单数据*/
        form: {
          checkedPay: [],
          function: [],
          bind_user: '',
        },
        pay_type: [],
        funMthod: [],
        url: '',
        loading: true,
      };
    },
    created() {
      this.getData()
    },

    methods: {
      getData() {
        let self = this;
        CashierApi.getSetting({}, true)
          .then(data => {
            let vars = data.data.vars;
            self.form.checkedPay = vars.checkedPay;
            self.form.function = vars.function;
            self.form.bind_user = vars.bind_user;
            self.pay_type = data.data.pay_type;
            self.funMthod = data.data.function;
            self.url = data.data.url;
            for (let i = 0; i < self.form.checkedPay.length; i++) {
              self.form.checkedPay[i] = parseInt(self.form.checkedPay[i]);
            }
            for (let i = 0; i < self.form.function.length; i++) {
              self.form.function[i] = parseInt(self.form.function[i]);
            }
            self.loading = false;
          })
          .catch(error => {});
      },
      //提交表单
      onSubmit() {
        let self = this;
        let params = this.form;
        if (params.checkedPay.length < 1) {
          this.$ElMessage({
            message: '支付方式至少选择一种！',
            type: 'warning'
          });
          return;
        }
        CashierApi.editSetting(params, true)
          .then(data => {
           this.$ElMessage({
              message: '恭喜你，设置成功',
              type: 'success'
            });
          })
          .catch(error => {});
      },
      toCashier() {
        window.location.href = this.url;
      },
      //监听复选框选中
      handleCheckedCitiesChange(e) {
        let self = this;
        if (e) {
          self.form.order_status[0] = 20;
        } else {
          self.form.order_status = [];
        }
      },

    }

  };
</script>

<style lang="scss" scoped>
  .tips {
    color: #ccc;
  }

  .show-input {
    .el-input.is-disabled .el-input__inner {
      color: #333333;
      cursor: auto;
    }
  }
</style>
