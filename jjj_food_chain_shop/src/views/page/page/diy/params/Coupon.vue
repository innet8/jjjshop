<template>
	<!--
    	作者：wangxw
    	时间：2019-11-05
    	描述：diy组件 搜索栏
    -->
	<div>
		<div class="common-form">
			<span>{{ curItem.name }}</span>
		</div>
		<el-form size="small" :model="curItem" label-width="100px">
			<div class="f16 gray3 form-subtitle">风格设置</div>
			<el-form-item label="风格：">
				<el-radio-group v-model="formData.type">
							<el-radio label="0">风格1</el-radio>
							<el-radio label="1">风格2</el-radio>
							<el-radio label="2">风格3</el-radio>
				</el-radio-group>
			</el-form-item>
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">优惠券数据</div>
			<div class="f16 gray3 form-subtitle">优惠卷来源</div>
			<el-form-item label="文字加粗：">
				<el-radio-group v-model="curItem.style.weight">
					<el-radio-button :label="400">标准</el-radio-button>
					<el-radio-button :label="800">加粗</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<!--优惠券数量-->
			<div class="form-item">
				<div class="form-label">优惠券数量：</div>
				<el-slider :min="1" :max="30" v-model="curItem.params.limit" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">优惠券样式</div>
			<div class="form-item">
				<div class="form-label">名称颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.descolor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.descolor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'descolor', '#666666')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-item">
				<div class="form-label">面额颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.pricecolor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.pricecolor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'pricecolor', '#ff4c01')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-item">
				<div class="form-label">门槛颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.cillcolor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.cillcolor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'cillcolor', '#ff4c01')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">按钮样式</div>
			<div class="form-item">
				<div class="form-label">背景颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.btncolor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.btncolor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'btncolor', '#ff4c01')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-item">
				<div class="form-label">文字颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.btnTxtcolor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.btnTxtcolor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'btnTxtcolor', '#FFFFFF')" type="primary" link>重置</el-button>
				</div>
			</div>
			<!--按钮圆角-->
			<div class="form-item">
				<div class="form-label">按钮圆角：</div>
				<el-slider :min="0" :max="24" v-model="curItem.style.btnRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">背景设置</div>
			<el-form-item label="组件背景：">
				<el-radio-group v-model="curItem.style.bgtype">
					<el-radio-button :label="1">背景色</el-radio-button>
					<el-radio-button :label="2">背景图片</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<div class="form-item" v-if="curItem.style.bgtype == 1">
				<div class="form-label">背景颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.background"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.background" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'background', '#ff4c01')" type="primary" link>重置</el-button>
				</div>
			</div>
			<!--图片-->
			<el-form-item label="背景图片：" v-if="curItem.style.bgtype == 2">
				<div class="diy-special-cover">
					<img v-img-url="curItem.style.bgimage" alt="" @click="$parent.onEditorSelectImage(curItem.style, 'bgimage')" />
					<div>建议尺寸706px*288px</div>
				</div>
			</el-form-item>
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">组件样式</div>
			<!--底部背景-->
			<div class="form-item">
				<div class="form-label">底部背景：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.bgcolor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.bgcolor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'bgcolor', '#f2f2f2')" type="primary" link>重置</el-button>
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
			<!--上圆角-->
			<div class="form-item">
				<div class="form-label">上圆角：</div>
				<el-slider v-model="curItem.style.topRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--下圆角-->
			<div class="form-item">
				<div class="form-label">下圆角：</div>
				<el-slider v-model="curItem.style.bottomRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
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
		this.curItem.style.paddingTop = parseInt(this.curItem.style.paddingTop);
		this.curItem.params.limit = parseInt(this.curItem.params.limit);
	},
	methods: {}
};
</script>

<style lang="scss" scoped></style>
