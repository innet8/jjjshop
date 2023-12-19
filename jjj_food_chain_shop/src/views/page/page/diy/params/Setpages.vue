<template>
  <!--
    	作者：luoyiming
    	时间：2020-06-20
    	描述：diy组件-参数设置-顶部设置栏
    -->
  <div>
    <div class="common-form">
      <span>{{ curItem.name }}</span>
    </div>
    <el-form size="small" :model="curItem" label-width="100px">
      <div class="f16 gray3 form-subtitle">样式设置</div>
      <!--页面名称-->
      <el-form-item label="页面名称：">
        <el-input v-model="curItem.params.name"></el-input>
        <p class="gray">页面名称仅用于后台查找</p>
      </el-form-item>
      <!--分享标题-->
      <el-form-item label="分享标题：">
        <el-input v-model="curItem.params.share_title"></el-input>
        <p class="gray">小程序端转发时显示的标题</p>
      </el-form-item>
      <!--图片-->
      <el-form-item label="分享图片：">
        <div class="diy-setpages-cover">
          <img  v-if="curItem.params.share_img" v-img-url="curItem.params.share_img" alt="" @click="$parent.onEditorSelectImage(curItem.params, 'share_img')" >
          <div>建议尺寸60×60</div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
       
      };
    },
    props: ['curItem', 'selectedIndex', 'opts'],
    created() {
    },
    methods: {
    }
  };
</script>

<style>
  .diy-setpages-cover>img{
    width: 60px;
    height: 60px;
  }
</style>
