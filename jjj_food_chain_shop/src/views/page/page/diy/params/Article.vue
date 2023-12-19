<template>
	<div>
		<div class="common-form">
			<span>{{ curItem.name }}</span>
		</div>
		<el-form size="small" :model="curItem" label-width="100px">
			<div class="f16 gray3 form-subtitle">边距设置</div>
			<div class="form-item">
				<div class="form-label">底部背景：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.background"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.background" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'background', '#ffffff')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-item">
				<div class="form-label">组件背景：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.bgcolor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.bgcolor" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'bgcolor', '#F2F2F2')" type="primary" link>重置</el-button>
				</div>
			</div>
			<!--上下边距-->
			<div class="form-item">
				<div class="form-label">上边距：</div>
				<el-slider v-model="curItem.style.paddingTop" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--上下边距-->
			<div class="form-item">
				<div class="form-label">下边距：</div>
				<el-slider v-model="curItem.style.paddingBottom" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--左右边距-->
			<div class="form-item">
				<div class="form-label">左右边距：</div>
				<el-slider v-model="curItem.style.paddingLeft" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--左右边距-->
			<div class="form-item">
				<div class="form-label">上圆角：</div>
				<el-slider v-model="curItem.style.topRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--左右边距-->
			<div class="form-item">
				<div class="form-label">下圆角：</div>
				<el-slider v-model="curItem.style.bottomRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle" style="margin-bottom: 10px;">文章设置</div>
			<!-- 文章分类 -->
			<el-form-item label="文章分类：">
				<el-select v-model="curItem.params.auto.category">
					<el-option label="全部分类" :value="0"></el-option>
					<el-option v-for="item in category" :key="item.category_id" :label="item.name" :value="item.category_id"></el-option>
				</el-select>
			</el-form-item>
			<!-- 显示数量 -->
			<el-form-item label="显示数量：">
				<el-input type="number" style="width: auto;" v-model="curItem.params.auto.showNum" class="w-auto"></el-input>
				<div class="ww100" style="cursor: pointer;">
					文章数据请到
					<span style="color: var(--el-color-primary)" @click="gotoArticle">内容管理 - 文章列表</span>
					中管理
				</div>
			</el-form-item>
			<!--显示类型-->
			<el-form-item label="显示类型：">
				<el-radio-group v-model="curItem.style.display">
					<el-radio :label="10">有图模式</el-radio>
					<el-radio :label="20">无图模式</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import ArticleApi from '@/api/article.js';
export default {
	data() {
		return {
			category: []
		};
	},
	props: ['curItem', 'selectedIndex', 'opts'],
	created() {
		this.curItem.style.display = parseInt(this.curItem.style.display);
		/*获取文章栏目*/
		this.getData();
	},
	methods: {
		/*获取文章栏目*/
		getData() {
			let self = this;
			ArticleApi.getCategory({}, true)
				.then(res => {
					self.category = res.data.category;
				})
				.catch(error => {
					self.loading = false;
				});
		},
		gotoArticle(){
			this.$router.push('/plus/article/index');
		},
	}
};
</script>

<style lang="scss" scoped></style>
