<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-分销-分销设置-申请协议
      -->
  <div class="product-add mt30">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-position="top" label-width="200px">

      <el-form-item label="分销商申请协议  ">
        <el-input v-model="form.license" type="textarea" rows="5" class="max-w460"></el-input>
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
    props:{
      settingData:Object
    },
    created() {
      this.form=this.settingData.data.license.values;
    },

    methods: {

       /*提交表单*/
      onSubmit() {
        let self = this;
        self.loading = true;
        let params = self.form;
        PlusApi.license(params, true)
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
      },

    }

  };
</script>

