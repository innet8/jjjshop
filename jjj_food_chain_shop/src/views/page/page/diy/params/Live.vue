<template>
  <!--
    	作者：luoyiming
    	时间：2020-06-20
    	描述：diy组件-参数设置-微信直播
    -->
  <div>
    <div class="common-form">
      <span>{{ curItem.name }}</span>
    </div>
    <el-form size="small" :model="curItem" label-width="100px">
      <!--显示数量-->
      <el-form-item label="显示数量：">
          <el-input v-model="curItem.params.showNum" class="w-auto"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: ['curItem', 'selectedIndex'],
  created() {
    console.log(this.curItem);
  },
  methods: {}
};
</script>

<style></style>
