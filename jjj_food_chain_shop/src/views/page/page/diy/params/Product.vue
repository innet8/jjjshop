<template>
	<!--
    作者：luoxiang
    时间：2023-09-27
    描述：diy组件-参数设置-砍价
-->
	<div>
		<div class="common-form">
			<span>{{ curItem.name }}</span>
		</div>
		<el-form size="small" :model="curItem" label-width="100px">
            	<!--组件样式-->
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">组件样式</div>
            			<div class="form-item">
				<div class="form-label">底部背景：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.bgcolor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.bgcolor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'bgcolor', '')" type="primary" link>重置</el-button>
				</div>
			</div>
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
			<el-form-item label="排序：">
				<el-radio-group v-model="curItem.style.titleType">
					<el-radio :label="1">综合</el-radio>
					<el-radio :label="2">销量</el-radio>
          <el-radio :label="3">价格</el-radio>
				</el-radio-group>
			</el-form-item>
            	<!--商品数量-->
			<div class="form-item">
				<div class="form-label">商品数量：</div>
				<el-slider v-model="curItem.params.showNum" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<el-form-item label="数据来源：" >手动选择</el-form-item>
			<div class=""></div>
       <el-form-item label="商品分类：" ><text>请选择链接</text></el-form-item>
		    <div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">显示内容</div>
            	<!--展示风格-->
			<el-form-item label="展示风格：">
				<el-radio-group v-model="curItem.style.presentation_style">
					<el-radio-button :label="1">显示</el-radio-button>
					<el-radio-button :label="2">不显示</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<!--商品名称-->
			<el-form-item label="商品名称：">
				<el-radio-group v-model="curItem.style.product_name">
					<el-radio-button :label="1">显示</el-radio-button>
					<el-radio-button :label="2">不显示</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<!--销售价-->
			<el-form-item label="销售价：">
				<el-radio-group v-model="curItem.style.product_price">
					<el-radio-button :label="1">显示</el-radio-button>
					<el-radio-button :label="2">不显示</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<!--按钮-->
			<el-form-item label="按钮：">
				<el-radio-group v-model="curItem.style.button">
					<el-radio-button :label="1">显示</el-radio-button>
					<el-radio-button :label="2">不显示</el-radio-button>
				</el-radio-group>
			</el-form-item>
            <el-form-item label="活动标签：">
				<el-radio-group v-model="curItem.style.active_title">
					<el-radio-button :label="1">显示</el-radio-button>
					<el-radio-button :label="2">不显示</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<!--商品样式-->
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">商品样式</div>
        <el-form-item label="边框：" class="pl56">
        <el-radio-group v-model="curItem.style.rowsNum">
            <el-radio label="1">默认</el-radio>
            <el-radio label="2">投影</el-radio>
            <el-radio label="3">描边</el-radio>
          </el-radio-group>
         </el-form-item>
			<div class="form-item">
				<div class="form-label">文字颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.productBg_color"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.productBg_color" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'productBg_color', '')" type="primary" link>重置</el-button>
				</div>
			</div>
            <!--图片圆角-->
			<div class="form-item">
				<div class="form-label">图片圆角：</div>
				<el-slider v-model="curItem.style.product_imgRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
                <el-form-item label="商品名称：" class="pl56">
        <el-radio-group v-model="curItem.style.productName">
            <el-radio label="1">加粗</el-radio>
            <el-radio label="2">单行</el-radio>
            <el-radio label="3">多行</el-radio>
          </el-radio-group>
         </el-form-item>
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
                <el-form-item label="色调：" class="pl56">
        <el-radio-group v-model="curItem.style.tone">
            <el-radio label="1">跟随主题风格</el-radio>
            <el-radio label="2">自定义</el-radio>
          </el-radio-group>
         </el-form-item>
			<div class="form-item" >
				<div class="form-label">商品名称：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.productName_color"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.productName_color" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'productName_color', '#333333')" type="primary" link>
						重置
					</el-button>
				</div>
			</div>
			<div class="form-item" >
				<div class="form-label">销售价：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.productPrice_color"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.productPrice_color" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'productPrice_color', '#FF4C01')" type="primary" link>
						重置
					</el-button>
				</div>
			</div>
			<div class="form-item" >
				<div class="form-label">划线价：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.productLine_color"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.productLine_color" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'productLine_color', '#999999')" type="primary" link>
						重置
					</el-button>
				</div>
			</div>
           <div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">按钮样式</div>
			<div class="form-item" >
				<div class="form-label">文字颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.salesColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.salesColor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'salesColor', '#999999')" type="primary" link>
						重置
					</el-button>
				</div>
			</div>
			<div class="form-item" >
				<div class="form-label">背景颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.bgSales"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.bgSales" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'bgSales', '#999999')" type="primary" link>
						重置
					</el-button>
				</div>
			</div>
            <div class="form-item">
				<div class="form-label">按钮圆角：</div>
				<el-slider v-model="curItem.style.button_Radio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
            <div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">标签样式</div>
            		<div class="form-item" >
				<div class="form-label">文字颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.salesColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.salesColor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'salesColor', '#999999')" type="primary" link>
						重置
					</el-button>
				</div>
			</div>
			<div class="form-item" >
				<div class="form-label">背景颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.bgSales"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.bgSales" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'bgSales', '#999999')" type="primary" link>
						重置
					</el-button>
				</div>
			</div>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			/*商品名称*/
			productName: false,
			/*正在砍价*/
			peoples: false,
			/*砍价底价*/
			floorPrice: false,
			/*商品价格*/
			originalPrice: false
		};
	},
	props: ['curItem', 'selectedIndex', 'opts'],
	created() {
		/*获取列表*/
	},
	methods: {
		/*内容是否选择*/
		check(checked, name) {
			let value = checked ? '1' : '0';
			this.curItem.style.show[name] = value;
		},
		ResetColor(name1, name2) {
			this.$parent.onEditorResetColor(this.curItem.style, name1, '');
			if (name2) {
				this.$parent.onEditorResetColor(this.curItem.style, name2, '');
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>
