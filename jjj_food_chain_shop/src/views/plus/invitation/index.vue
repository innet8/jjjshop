<template>
  <!--
      	作者：luoyiming
      	时间：2020-06-25
      	描述：插件中心-邀请活动
      -->
  <div class="common-seach-wrap">
    <el-tabs v-model="activeName">
      <el-tab-pane label="邀请活动" name="first"></el-tab-pane>
    </el-tabs>

    <!--邀请活动-->
    <Active v-if="activeName == 'first'"></Active>

  </div>
</template>
<script>
import Active from './active/index.vue';
export default {
  components: {
    Active,
  },
  data() {
    return {
      /*是否加载完成*/
      loading: true,
      form: {
        status: 0
      },
      activeName: 'first'
    };
  },
  methods: {}
};
</script>

<style>
.operation-wrap {
  height: 124px;
  border-radius: 8px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 30px 30px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: hidden;
  background: #909399;
  background-size: 100% 100%;
  color: #fff;
}
</style>
