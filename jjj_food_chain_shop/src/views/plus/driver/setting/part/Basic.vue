<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-配送员-配送员设置-基础设置
      -->
  <div class="product-add mt30">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-position="top" label-width="200px">
      <el-form-item label="配送费" :rules="[{required: true,message: ' '}]" prop="take_fee">
        <el-input v-model="form.take_fee" placeholder="" class="max-w460"></el-input>
      </el-form-item>
      <el-form-item label="押金" :rules="[{required: true,message: ' '}]" prop="take_cash">
        <el-input v-model="form.take_cash" placeholder="" class="max-w460"></el-input>
      </el-form-item>
      <el-form-item label="是否开启押金支付">
        <div>
          <el-radio v-model="form.cash_open" :label="'1'">开启</el-radio>
          <el-radio v-model="form.cash_open" :label="'0'">关闭</el-radio>
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
  import DriverApi from '@/api/driver.js';

  export default {
    data() {
      return {
        /*form表单数据*/
        form: {
          is_open: '',
          level: '',
          self_buy: '',
          take_cash: 0,
          cash_open: '0',
          take_fee: 0
        },
        /*是否正在加载*/
        loading: false
      };
    },
    props: {
      settingData: Object
    },
    created() {

      this.form = this.settingData.data.basic.values;
    },
    methods: {

      /*提交表单*/
      onSubmit() {
        let self = this;
        self.loading = true;
        let params = this.form;
        DriverApi.basic(params, true)
          .then(data => {
            self.loading = false;
            this.$ElMessage({
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

<style lang="scss" scoped>
  .tips {
    color: #ccc;
  }
</style>
