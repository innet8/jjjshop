<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-分销-分销设置-基础设置
      -->
  <div class="product-add mt30">
    <!--form表单-->
    <el-form size="small" ref="form" :model="form" label-position="top" label-width="200px">
      <el-form-item label="是否开启分销功能">
        <div>
          <el-radio v-model="form.is_open" label="1">开启</el-radio>
          <el-radio v-model="form.is_open" label="0">关闭</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="分销层级">
        <div>
          <el-radio v-model="form.level" label="1">一级分销</el-radio>
          <el-radio v-model="form.level" label="2">二级分销</el-radio>
          <el-radio v-model="form.level" label="3">三级分销</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="分销商内购">
        <div>
          <el-radio v-model="form.self_buy" label="1">开启</el-radio>
          <el-radio v-model="form.self_buy" label="0">关闭</el-radio>
          <div class="tips">如开启，分销商自己购买商品，获得一级佣金</div>
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
        is_open: '',
        level: '',
        self_buy: ''
      },
      /*是否正在加载*/
      loading: false
    };
  },
  props:{
    settingData:Object
  },
  created() {

    this.form=this.settingData.data.basic.values;
  },
  methods: {

    /*提交表单*/
    onSubmit() {
      let self = this;
      self.loading = true;
      let params = this.form;
      PlusApi.basic(params, true)
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

<style scoped>
.tips {
  color: #ccc;
}
</style>
