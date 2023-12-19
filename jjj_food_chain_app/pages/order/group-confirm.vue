<template>
	<view :data-theme="theme()" :class="theme() || ''">
		<view class="wrap">
			<view class="product-list">
				<view class="d-b-c product-item ww100" v-for="(item, index) in ProductData" :key="index">
					<image :src="item.image ? item.image[0].file_path : ''" class="product-image" mode=""></image>
					<view class="product-info flex-1">
						<view class="d-b-c ww100">
							<view class="flex-1 text-ellipsis-2 f30">{{ item.group_name }}</view>
							<view class="f-s-0">
								<text class="f26 mr10" style="color: #FF5800;">￥{{ item.group_price }}</text>
								<text class="text-d-line f26 gray9 ">￥{{ item.line_price }}</text>
							</view>
						</view>
						<view class="ww100">
							<view class="f24 gray6">{{ item.describe }}</view>
							<view class="d-b-c">
								<view class="f26 gray9 flex-1">随时退 · 过期自动退</view>
								<view>X1</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="foot-pay-btns">
				<view class="">
					<text>
						合计
						<text class="redF6">￥</text>
						<text class="redF6 f36">{{ OrderData.order_pay_price }}</text>
					</text>
					<view class="f22 gray9">共{{ OrderData.order_total_num }}件</view>
				</view>
				<button class="theme-bg" type="primary" @click="SubmitOrder">提交订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				group_id: 0,
				/*是否加载完成*/
				loading: true,
				options: {},
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				tab_type: 0,
				/*商品id*/
				product_id: '',
				/*商品数量*/
				product_num: '',
				/*商品数据*/
				ProductData: [],
				/*订单数据数据*/
				OrderData: [],
				// 是否存在收货地址
				exist_address: false,
				/*默认地址*/
				Address: {
					region: []
				},
				extract_store: {},
				last_extract: {},
				product_sku_id: 0,
				/*配送方式*/
				/* 10配送20自提30打包40店内 */
				delivery: 0,
				/*自提店id*/
				store_id: 1,
				/*优惠券id*/
				coupon_id: 0,
				linkman: '',
				phone: '',
				remark: '',
				/*是否显示优惠券*/
				isCoupon: false,
				/*优惠券列表*/
				coupon_list: {},
				couponList: [],
				deliverySetting: [],
				/*优惠券数量*/
				coupon_num: 0,
				/*消息模板*/
				temlIds: [],
				takeout_address: {},
				isTimer: false,
				mealtime: '',
				wmtime: '',
				estitime: '',
				is_pack: 1,
				supplier: {},
				dinner_type: 10,
				cart_type: 0,
				store_set: [],
				delivery_set: [],
				table_id: 0
			};
		},
		onLoad(e) {
			this.group_id = e.group_id;
		},
		onShow() {
			this.getData();
		},
		methods: {
			goback() {
				// #ifndef H5
				uni.navigateBack({
					delta: 1
				});
				// #endif
				// #ifdef H5
				history.go(-1);
				// #endif
			},
			/**/
			hasType(e) {
				if (this.deliverySetting.indexOf(e) != -1) {
					return true;
				} else {
					return false;
				}
			},
			/*选择优惠卷*/
			onTogglePopupCoupon(e) {
				let self = this;
				self.isCoupon = true;
				self.couponList = e;
			},
			/*关闭优惠券*/
			closeCouponFunc(e) {
				let self = this;
				self.coupon_id = e;
				this.isCoupon = false;
				self.getData();
			},
			/*获取数据*/
			getData() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self.loading = true;
				let callback = function(res) {
					self.OrderData = res.data.orderInfo;
					self.ProductData = self.OrderData.groupList;
					self.loading = false;
				};

				self._get(
					'plus.group.Order/buy', {
						group_id: self.group_id,
						total_num: 1,
						pay_source: self.getPlatform()
					},
					function(res) {
						callback(res);
					},
					function(err) {
						uni.navigateBack();
					}
				);
			},
			/*提交订单*/
			SubmitOrder() {
				let self = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				self._post(
					'plus.group.Order/buy', {
						group_id: self.group_id,
						total_num: 1,
						pay_source: self.getPlatform()
					},
					function(result) {
						let pages = '/pages/order/cashier?order_type=70&order_id=' + result.data.order_id;
						self.gotoPage(pages, 'reLaunch');
					}
				);
			}
		}
	};
</script>

<style lang="scss">
	.headr_top {
		height: 140rpx;
	}

	.header {
		width: 100%;
		box-sizing: border-box;
		padding: 35rpx;
		background-color: #ffffff;
		// box-shadow: 0 0 0.06rem 0 rgba(0, 0, 0, 0.1);
		border-radius: 30rpx;
		overflow: hidden;
		position: relative;
		z-index: 20;
	}

	.left {
		flex: 1;
		display: flex;
		flex-direction: column;

		.store-name {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 26rpx;
			margin-bottom: 30rpx;

			.iconfont {
				margin-left: 10rpx;
				line-height: 100%;
			}
		}

		.store-location {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			color: $text-color-assist;
			font-size: $font-size-sm;

			.iconfont {
				vertical-align: middle;
				display: table-cell;
				color: $color-primary;
				line-height: 100%;
			}
		}
	}

	.wrap {
		padding: 25rpx;
		padding-bottom: 140rpx;
		// @include background_linear('background_color', 'opacify_background_0', 180deg, 0, 100%);
	}

	.icon-box .icon-zhifubao {
		color: #1296db;
		font-size: 50rpx;
	}

	.order_item {
		width: 150rpx;
		text-align: right;
	}

	.other_box {
		border-radius: 0;
		box-shadow: 0;
	}

	.other_box .item {
		height: 88rpx;
		box-sizing: border-box;
		line-height: 88rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #eeeeee;
	}

	.header_bitem {}

	.f-r {
		float: right;
	}

	.meal_item {
		margin: 26rpx 0;
		height: 96rpx;
		line-height: 96rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		padding-left: 42rpx;
		padding-right: 30rpx;

		.icon-jiantou {
			font-size: 22rpx;
			margin-left: 26rpx;
		}
	}

	.pack_item {
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
	}

	.pack_item.active .icon-xuanze {
		@include font_color('font_color');
	}

	.right {
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		font-size: 32rpx;
		font-weight: bold;
		color: #282828;
		height: 68rpx;
		width: 100%;
		position: relative;
		margin-top: 34rpx;

		.dinein,
		.takeout {
			position: relative;
			display: flex;
			align-items: flex-start;
			width: 344rpx;
			height: 150rpx;
			box-sizing: border-box;
			padding-top: 25rpx;
			position: absolute;
			z-index: 0;
			top: -18rpx;
			background-color: #ffffff60;

			&.active {
				z-index: 1;
				width: 490rpx;
				height: 150rpx;
				@include font_color('font_color');
				background-color: #ffffff !important;
				flex-shrink: 0;
			}
		}

		.takeout {
			justify-content: flex-start;

			padding-left: 78rpx;
			left: 0;
			border-top-left-radius: 30rpx;

			&.active {
				padding-left: 153rpx;
				border-top-right-radius: 150rpx;
				border-top-left-radius: 30rpx;
			}
		}

		.dinein {
			right: 0;
			justify-content: flex-end;
			padding-right: 65rpx;
			border-top-right-radius: 30rpx;

			&.active {
				padding-right: 150rpx;
				border-top-left-radius: 150rpx;
				border-top-right-radius: 30rpx;
			}
		}

		.dinein.cart_type1,
		.takeout.cart_type1 {
			width: 100%;
			padding-left: 0;
			padding-right: 0;
			justify-content: center;

			&.active {
				padding-left: 0;
				padding-right: 0;
				border-top-left-radius: 30rpx;
				border-top-right-radius: 30rpx;
			}
		}
	}

	.foot-pay-btns button {
		padding: 0 30rpx;
		height: 64rpx;
		line-height: 64rpx;
		border-radius: 32rpx;
		font-size: 26rpx;
	}

	.table-box {
		padding: 0 22rpx;
		height: 106rpx;
		border-radius: 12rpx;
		border: 1rpx solid;
		@include border_color('border_color');
		@include background_color('opacify_background_0');
		color: #333333;
		font-size: 24rpx;
		margin-bottom: 25rpx;
	}

	.bottom-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		@include background_color('background_color');
		@include font_color('text_color2');
		width: 100%;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.bottom-btn>button {
		width: 100%;
		height: 116rpx;
		line-height: 116rpx;
		@include background_color('background_color');
		@include font_color('text_color2');
		border: none;
		border-radius: 0;
		font-size: 35rpx;
		font-weight: bold;
		display: flexd;
		justify-content: center;
		align-items: center;
	}

	.product-info {
		height: 148rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}

	.product-image {
		width: 148rpx;
		height: 148rpx;
		margin-right: 17rpx;
		border-radius: 8rpx;
	}

	.btn-group {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;

		.btn {
			padding: 0;
			box-sizing: border-box;
			font-size: $font-size-sm;
			height: 40rpx;
			width: 40rpx;
			line-height: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 20rpx;

			&.property_btn {
				width: 106rpx;
				height: 52rpx;
				border-radius: 10rpx;
				@include border_color('border_color');
				@include background_color('background_color');
				@include text_color('text_color');
				font-size: 26rpx;
				font-weight: bold;
				line-height: 52rpx;
				padding: 0;
			}

			&.add_btn {
				@include border_color('border_color');
				@include background_color('background_color');
			}

			&.add_btn,
			&.reduce_btn {
				border: $dominant-color 1rpx solid;
				@include border_color('border_color');
				color: #ffffff;
				padding: 0;
				width: 40rpx;
				border-radius: 50%;
				font-size: 20rpx;
			}
		}

		.dot {
			position: absolute;
			background-color: #ffffff;
			border: 1rpx solid;
			@include border_color('border_color');
			@include font_color('font_color');
			font-size: 20rpx;
			width: 26rpx;
			height: 26rpx;
			line-height: 26rpx;
			text-align: center;
			border-radius: 100%;
			right: -12rpx;
			top: -10rpx;
		}

		/* 列表 */
		.number {
			font-size: $font-size-base;
			width: 40rpx;
			height: 40rpx;
			text-align: center;
			line-height: 40rpx;
			font-size: 24rpx;
		}
	}

	.iconsami-select {
		font-size: 20rpx;
		@include font_color('font_color');
	}

	.iconadd-select {
		color: #ffffff;
		font-size: 20rpx;
	}

	.iconadd-select {
		font-size: 20rpx;
		color: #ffffff;
	}

	.product-list {
		background-color: #fff;
		width: 698rpx;
		padding: 17rpx 20rpx 32rpx 16rpx;
		box-sizing: border-box;
		border-radius: 15rpx;
		margin: 27rpx auto;
	}

	.foot-pay-btns button {
		padding: 0 66rpx;
		height: 84rpx;
		line-height: 84rpx;
		border-radius: 50rpx;
	}
</style>