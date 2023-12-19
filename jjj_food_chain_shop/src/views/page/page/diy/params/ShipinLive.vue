<template>
  <!--
    	作者：wangxw
    	时间：2019-11-05
    	描述：diy组件 直播号直播
    -->
  <div>
    <div class="common-form">
      <span>{{ curItem.name }}</span>
    </div>
    <el-form size="small" :model="curItem" label-width="100px">
		<div class="f16 gray3 form-subtitle">样式设置</div>
      <!--底边距-->
	  <div class="form-item">
	  	<div class="form-label">底边距：</div>
	  	<el-slider v-model="curItem.style.bottom" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
	  </div>
      <!--右边距-->
	  <div class="form-item">
	  	<div class="form-label">右边距：</div>
	  	<el-slider v-model="curItem.style.right" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
	  </div>
      <!--不透明度-->
	  <div class="form-item">
	  	<div class="form-label">不透明度：</div>
	  	<el-slider v-model="curItem.style.opacity" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
	  </div>
      <!--视频号ID-->
      <el-form-item label="视频号ID：">
        <el-input v-model="curItem.params.finderUserName"></el-input>
        <div>视频号ID,在登录视频号助手首页中获取</div>
      </el-form-item>
      <!--客服图标-->
      <el-form-item label="视频号图标：">
        <div class="diy-service-icon"><img v-img-url="curItem.params.image" alt="" @click="$parent.onEditorSelectImage(curItem.params, 'image')" /></div>
        <div>建议尺寸90×90</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ['curItem', 'selectedIndex', 'opts'],
	created() {
		this.curItem.style.bottom = parseInt(this.curItem.style.bottom);
		this.curItem.style.right = parseInt(this.curItem.style.right);
		this.curItem.style.opacity = parseInt(this.curItem.style.opacity);
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.diy-service-icon,
.diy-service-icon img {
  width: 40px;
  height: 40px;
}
</style>
