<template>
	<!--
    	作者：luoyiming
    	时间：2020-06-20
    	描述：diy组件-参数设置-团购
    -->
	<div>
		<div class="common-form">
			<span>{{ curItem.name }}</span>
		</div>
		<el-form size="small" :model="curItem" label-width="100px">
			<div class="f16 gray3 form-subtitle">样式设置</div>
			<!--底部背景-->
			<div class="form-item">
				<div class="form-label">底部背景：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.bgcolor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.bgcolor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'bgcolor', '#f2f2f2')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="titles">底部背景包含边距和圆角</div>
			<!--组件背景-->
			<div class="form-item">
				<div class="form-label">组件背景：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.background"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.background" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'background', '#ffffff')" type="primary" link>重置</el-button>
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
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">商品数据</div>
			<!-- <el-form-item label="排序：" class="pl56">
				<el-radio-group v-model="curItem.params.auto.productSort">
					<el-radio-button :label="'all'">综合</el-radio-button>
					<el-radio-button :label="'sales'">销量</el-radio-button>
					<el-radio-button :label="'price'">价格</el-radio-button>
				</el-radio-group>
			</el-form-item> -->
			<div class="form-item">
				<div class="form-label">商品数量：</div>
				<el-slider :min="1" :max="30" v-model="curItem.params.showNum" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">显示内容</div>
			<el-form-item label="商品名称：">
				<el-radio-group v-model="curItem.params.productName">
					<el-radio-button :label="1">显示</el-radio-button>
					<el-radio-button :label="0">隐藏</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="备注标签：">
				<el-radio-group v-model="curItem.params.productRemarks">
					<el-radio-button :label="1">显示</el-radio-button>
					<el-radio-button :label="0">隐藏</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="销售价：">
				<el-radio-group v-model="curItem.params.producPrice">
					<el-radio-button :label="1">显示</el-radio-button>
					<el-radio-button :label="0">隐藏</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="划线价：">
				<el-radio-group v-model="curItem.params.productLine">
					<el-radio-button :label="1">显示</el-radio-button>
					<el-radio-button :label="0">隐藏</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="按钮：">
				<el-radio-group v-model="curItem.params.productBtn">
					<el-radio-button :label="1">显示</el-radio-button>
					<el-radio-button :label="0">隐藏</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="折扣标签：">
				<el-radio-group v-model="curItem.params.productDiscount">
					<el-radio-button :label="1">显示</el-radio-button>
					<el-radio-button :label="0">隐藏</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="销量：">
				<el-radio-group v-model="curItem.params.productSales">
					<el-radio-button :label="1">显示</el-radio-button>
					<el-radio-button :label="0">隐藏</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">商品样式</div>
			<div class="form-item">
				<div class="form-label">背景颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.productBg"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.productBg" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'productBg', '#ffffff')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-item">
				<div class="form-label">图片圆角：</div>
				<el-slider v-model="curItem.style.product_imgRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--商品上圆角-->
			<div class="form-item">
				<div class="form-label">上圆角：</div>
				<el-slider v-model="curItem.style.product_topRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--商品下圆角-->
			<div class="form-item">
				<div class="form-label">下圆角：</div>
				<el-slider v-model="curItem.style.product_bottomRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<div class="form-item">
				<div class="form-label">商品名称：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.productNameColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.productNameColor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'productNameColor', '#333333')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-item">
				<div class="form-label">备注标签：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.productRemarksColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.productRemarksColor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'productRemarksColor', '#333333')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-item">
				<div class="form-label">销售价：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.productPriceColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.productPriceColor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'productPriceColor', '#333333')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-item">
				<div class="form-label">划线价：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.productLineColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.productLineColor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'productLineColor', '#999999')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-item">
				<div class="form-label">折扣标签：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.productTipsColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.productTipsColor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'productTipsColor', '#333333')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-item">
				<div class="form-label">销量：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.productSalesColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.productSalesColor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'productSalesColor', '#333333')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">商品样式</div>

			<div class="form-item">
				<div class="form-label">按钮圆角：</div>
				<el-slider v-model="curItem.style.product_btnRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<div class="form-item">
				<div class="form-label">按钮文字颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.btnColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.btnColor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'btnColor', '#ffffff')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-item">
				<div class="form-label">按钮背景颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.btnBg"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.btnBg" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'btnBg', '#333333')" type="primary" link>重置</el-button>
				</div>
			</div>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ['curItem', 'selectedIndex'],
	created() {},
	methods: {}
};
</script>

<style>
.titles {
	align-items: center;
	padding-left: 138px;
	padding-bottom: 10px;
	font-size: 12px;
	color: #999999;
}
</style>
