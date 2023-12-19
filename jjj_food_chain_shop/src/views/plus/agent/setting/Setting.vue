<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-分销-分销设置
      -->
  <div v-loading="loading">
    <el-tabs size="small" v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基础设置" name="basic"></el-tab-pane>
      <el-tab-pane label="分销商条件" name="condition"></el-tab-pane>
      <el-tab-pane label="佣金设置" name="commission"></el-tab-pane>
      <el-tab-pane label="结算" name="settlement"></el-tab-pane>
      <el-tab-pane label="自定义文字" name="words"></el-tab-pane>
      <el-tab-pane label="申请协议" name="license"></el-tab-pane>
      <el-tab-pane label="页面背景图" name="background"></el-tab-pane>
    </el-tabs>

    <!--基础设置-->
    <Basic v-if="activeName == 'basic'" :settingData="settingData"></Basic>

    <!--分销商条件-->
    <Condition v-if="activeName == 'condition'" :settingData="settingData"></Condition>

    <!--佣金设置-->
    <Commission v-if="activeName == 'commission'" :settingData="settingData"></Commission>

    <!--结算-->
    <Settlement v-if="activeName == 'settlement'" :settingData="settingData"></Settlement>

    <!--自定义文字-->
    <Words v-if="activeName == 'words'" :settingData="settingData"></Words>

    <!--申请协议-->
    <License v-if="activeName == 'license'" :settingData="settingData"></License>

    <!--页面背景图-->
    <Background v-if="activeName == 'background'" :settingData="settingData"></Background>

  </div>
</template>
<script>
import PlusApi from '@/api/plus.js';

import Basic from './part/Basic.vue';
import Condition from './part/Condition.vue';
import Commission from './part/Commission.vue';
import Settlement from './part/Settlement.vue';
import Words from './part/Words.vue';
import License from './part/License.vue';
import Background from './part/Background.vue';
export default {
  components: {
    /*编辑组件*/
    Basic,
    Condition,
    Commission,
    Settlement,
    Words,
    License,
    Background
  },
  data() {
    return {
      /*是否正在加载*/
      loading:true,
      /*当前选中*/
      activeName: '',
      /*数据对象*/
      settingData:{}
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
      PlusApi.agentSet({}, true)
        .then(res => {
          self.settingData = res.data;
          self.loading=false;
          self.activeName='basic';
        })
        .catch(error => {});
    },

    handleClick(e) {
      this.activeName = e.name;
    }
  }
};
</script>
