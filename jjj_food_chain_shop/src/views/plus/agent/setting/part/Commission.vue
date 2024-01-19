<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-分销-分销设置-佣金设置
      -->
  <div class="product-add mt30">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-position="top" label-width="200px">

      <el-form-item label="一级佣金比例 ">
        <el-input v-model="form.first_money" type="number" class="max-w460"></el-input>
        <div class="tips">佣金比例范围 0% - 100%</div>
      </el-form-item>
      <el-form-item label="二级佣金比例">
        <el-input v-model="form.second_money" type="number" class="max-w460"></el-input>
        <div class="tips">佣金比例范围 0% - 100%</div>
      </el-form-item>
      <el-form-item label="三级佣金比例  ">
        <el-input v-model="form.third_money" type="number" class="max-w460"></el-input>
        <div class="tips">佣金比例范围 0% - 100%</div>
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
        /*商品列表*/
        productList: [],
        /*加载完成*/
        loading: false,
      };
    },
    props: {
      settingData: Object
    },
    created() {

      this.form=this.settingData.data.commission.values;

    },

    methods: {

      /*提交表单*/
      onSubmit() {
        let self = this;
        self.loading = true;
        let params = this.form;
        PlusApi.commission(params, true)
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
      },

    }

  };
</script>

<style scoped>
  .tips {
    color: #ccc;
  }
</style>
