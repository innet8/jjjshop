<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-配送员-配送员设置
      -->
  <div v-loading="loading">
    <el-tabs size="small" v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基础设置" name="basic"></el-tab-pane>
      <el-tab-pane label="申请条件" name="condition"></el-tab-pane>
      <el-tab-pane label="结算" name="settlement"></el-tab-pane>
    </el-tabs>

    <!--基础设置-->
    <Basic v-if="activeName == 'basic'" :settingData="settingData"></Basic>

    <!--申请条件-->
    <Condition v-if="activeName == 'condition'" :settingData="settingData"></Condition>

    <!--结算-->
    <Settlement v-if="activeName == 'settlement'" :settingData="settingData"></Settlement>

  </div>
</template>
<script>
  import DriverApi from '@/api/driver.js';

  import Basic from './part/Basic.vue';
  import Condition from './part/Condition.vue';
  import Settlement from './part/Settlement.vue';
  export default {
    components: {
      /*编辑组件*/
      Basic,
      Condition,
      Settlement,
    },
    data() {
      return {
        /*是否正在加载*/
        loading: true,
        /*当前选中*/
        activeName: '',
        /*数据对象*/
        settingData: {}
      };
    },
    created() {

      if (this.$route.query.type != null) {
        this.activeName = this.$route.query.type;
      }

      this.getData();

    },
    methods: {

      /*获取数据*/
      getData() {
        let self = this;
        DriverApi.driverSet({}, true)
          .then(res => {
            self.settingData = res.data;
            self.loading = false;
            self.activeName = 'basic';
          })
          .catch(error => {});
      },

      handleClick(e) {
        this.activeName = e.name;
      }
    }
  };
</script>
