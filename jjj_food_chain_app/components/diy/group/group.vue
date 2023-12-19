<template>
	<view
		class="drag optional"
		:style="{
			background: itemData.style.bgcolor,
			paddingLeft: itemData.style.paddingLeft * 2 + 'rpx ',
			paddingRight: itemData.style.paddingLeft * 2 + 'rpx ',
			paddingTop: itemData.style.paddingTop * 2 + 'rpx ',
			paddingBottom: itemData.style.paddingBottom * 2 + 'rpx'
		}"
		v-if="itemData.style"
	>
		<view
			class="diy-sharpproduct"
			:style="{
				borderTopLeftRadius: itemData.style.topRadio * 2 + 'rpx ',
				borderTopRightRadius: itemData.style.topRadio * 2 + 'rpx ',
				borderBottomLeftRadius: itemData.style.bottomRadio * 2 + 'rpx ',
				borderBottomRightRadius: itemData.style.bottomRadio * 2 + 'rpx',
				background: itemData.style.background
			}"
		>
			<view class="product-list assemble column__3 d-s-c">
				<view
					:style="{
						borderTopLeftRadius: itemData.style.product_topRadio * 2 + 'rpx ',
						borderTopRightRadius: itemData.style.product_topRadio * 2 + 'rpx ',
						borderBottomLeftRadius: itemData.style.product_bottomRadio * 2 + 'rpx ',
						borderBottomRightRadius: itemData.style.product_bottomRadio * 2 + 'rpx',
						background: itemData.style.productBg
					}"
					class="product-item"
					v-for="(product, index) in itemData.data"
					:key="index"
					@click="gotoPage('/pages/order/group-confirm?group_id=' + product.group_id)"
				>
					<view
						class="product-cover"
						:style="{
							borderRadius: itemData.style.product_imgRadio * 2 + 'rpx'
						}"
					>
						<image :src="product.image ? product.image[0].file_path : ''" mode="aspectFill" class="pro-image"></image>
					</view>
					<view class="p-20-0">
						<view class="f28 fb text-ellipsis" :style="{ color: itemData.style.productNameColor }" v-if="itemData.params.productName">{{ product.group_name }}</view>
						<view :style="{ color: itemData.style.productRemarksColor }" v-if="itemData.params.productRemarks">
							<text class="product-title  tc">{{ product.describe }}</text>
						</view>
						<view class="sharpproduct-head d-b-c">
							<view>
								<view class="price" v-if="itemData.params.producPrice || itemData.params.productDiscount">
									<text :style="{ color: itemData.style.productPriceColor }" v-if="itemData.params.producPrice">¥{{ product.group_price }}</text>
									<text
										class="discount"
										:style="{ color: itemData.style.productTipsColor, borderColor: itemData.style.productTipsColor }"
										v-if="itemData.params.productDiscount"
									>
										{{ product.discount }}
									</text>
								</view>
								<view class="lineprice1 text-d-line" :style="{ color: itemData.style.productLineColor }" v-if="itemData.params.productLine">
									￥{{ product.line_price }}
								</view>
							</view>
							<view class="d-e-c d-c">
								<view
									:style="{
										borderRadius: itemData.style.product_btnRadio * 2 + 'rpx ',
										background: itemData.style.btnBg,
										color: itemData.style.btnColor
									}"
									v-if="itemData.params.productBtn"
									class="assemble_btns  tc right"
								>
									抢购
								</view>
								<view :style="{ color: itemData.style.productSalesColor }" v-if="itemData.params.productSales" class="lineprice">
									已售{{ product.group_sales }}+
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ['itemData'],
	methods: {
		scroll(e) {},

		/*跳转列表*/
		gotoList() {
			let url = '/pages/plus/group/list/list';
			this.gotoPage(url);
		},

		/*跳转产品详情*/
		gotoDetail(e) {
			let url = '/pages/product/detail/detail?product_id=' + e;
			this.gotoPage(url);
		}
	}
};
</script>

<style lang="scss" scoped>
.lineprice1 {
	color: #999999;
	font-size: 24rpx;
}
.discount {
	color: red;
	border: 1px solid #ffffff;
	padding: 4rpx 12rpx;
	font-size: 22rpx;
	margin-left: 12rpx;
}
.diy-sharpproduct {
	box-sizing: border-box;
	overflow: hidden;
}
.lineprice {
	color: #999999;
	font-size: 20rpx;
	white-space: nowrap;
	padding-top: 10rpx;
}
.diy-sharpproduct .product-list.assemble {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 0 20rpx;
}

.diy-sharpproduct .product-list.assemble .product-title {
	margin-bottom: 36rpx;
}

.diy-sharpproduct .product-list.assemble .price {
	margin-bottom: 10rpx;
	font-size: 26rpx;
	// overflow: hidden;
}

.diy-sharpproduct .display__list .column__3 {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.diy-sharpproduct .product-list.assemble.column__3 {
	flex-wrap: wrap;
}

.diy-sharpproduct .product-list.assemble.column__3 .product-item {
	width: 322rpx;
	overflow: hidden;
	background-color: #ffffff;
	flex-shrink: 0;
	box-sizing: border-box;
}
.diy-sharpproduct .product-list.assemble.column__3 .product-item .product-cover {
	overflow: hidden;
}
.diy-sharpproduct .product-list.assemble.column__3 .product-item .product-cover .pro-image {
	width: 320rpx;
	height: 240rpx;
	overflow: hidden;
	position: relative;
}

.diy-sharpproduct .product-list.assemble.column__3 .product-title {
	margin-bottom: 0;
	margin-top: 0;
	font-size: 20rpx;
	margin-right: 180rpx;
	white-space: nowrap;
}

.sharpproduct-head {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.sharpproduct-head .name {
	font-size: 32rpx;
	font-weight: bold;
	padding-left: 20rpx;
	color: #000000;
	width: 200rpx;
}
.sharpproduct-head .name2 {
	padding-right: 20rpx;
}
.sharpproduct-head .datetime {
	margin-left: 40rpx;
}

.sharpproduct-head .datetime > text {
	display: inline-block;
}

.sharpproduct-head .datetime .text {
	padding: 0 4rpx;
}

.sharpproduct-head .datetime .box {
	padding: 4rpx;
	background: #000000;
	color: #ffffff;
}

.diy-sharpproduct .product-list.assemble .assemble_btns {
	font-size: 20rpx;
	text-align: center;
	width: 108rpx;
	height: 48rpx;
	line-height: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 40rpx;
	background-color: #ffcc00;
}
.titleImg {
	width: 100%;
	height: 88rpx;
}
</style>
