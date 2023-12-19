<template>
	<view :data-theme='theme()' :class="theme() || ''">
		<view class="wrap" v-if="!loading">
			<view class="text_color mb20" v-if="supplier.settle_type == 10">
				<view class="f36  fb">下单成功</view>
				<view class="f28">付款成功后，餐品将开始制作</view>
			</view>
			<view class="text_color mb20" v-else>
				<view class="f36  fb">下单成功,坐等中</view>
				<view class="f28">餐品已在制作中</view>
			</view>
			<!--购买的产品-->
			<view class="vender">
				<view v-if="OrderData.table_no" class="d-b-c table-box">
					<view>当前桌号:{{OrderData.table_no}}</view>
					<view v-if="options.pnum">人数:{{options.pnum}}人</view>
				</view>
				<view class="left">
					<view class="store-name">
						<text>{{supplier.name}}</text>
					</view>
				</view>
				<view class="list">
					<view class="item d-b-c" v-for="(item, index) in ProductData" :key="index">
						<view class="info d-s-s">
							<view class="cover">
								<image :src="item.image.file_path" mode="aspectFill"></image>
							</view>
							<view class="flex-1">
								<view class="title f30 fb mb16">
									{{item.product_name}}
								</view>
								<view class="num-wrap pl-30 gray9 f26">
									{{ item.product_attr }}
								</view>
								<view class="f26 gray9">×{{ item.total_num }}</view>
							</view>
						</view>
						<view class="" style="height: 148rpx;text-align: right;">
							<view class="f32 order_item mb16">¥{{ item.product_price}}</view>
							<view class="f24 text-d-line gray9 mb16">¥{{ item.line_price}}</view>
						</view>
					</view>
				</view>
				<!--总数-->

				<view class="other_box">
					<view class="item">
						<text class="key">商品小计：</text>
						<text class="f32">￥{{ OrderData.total_price }}</text>
					</view>
					<view class="item">
						<text class="key">包装费用：</text>
						<text class="f32">￥{{ OrderData.bag_price }}</text>
					</view>
					<view class="item" v-if="OrderData.service_money > 0">
						<text class="key">服务费用：</text>
						<text class="f32">￥{{ OrderData.service_money }}</text>
					</view>
					<view class="item" v-if="OrderData.is_coupon">
						<text class="key">优惠券：</text>
					</view>
					<view class="item" v-if="OrderData.fullreduce_money">
						<text class="key">满减({{ OrderData.fullreduce_remark }})：</text>
						<text class="f32">-￥{{ OrderData.fullreduce_money }}</text>
					</view>
					<view class="item" v-if="OrderData.discount_money > 0">
						<text class="key">优惠费用：</text>
						<text class="f32">￥{{ OrderData.discount_money }}</text>
					</view>
					<text class="vlaue gray9" v-if="OrderData.coupon_id > 0">-￥{{ OrderData.coupon_money }}</text>
				</view>
				<view class="total-box">
					小计<text class="f32 fb ml15">￥{{ OrderData.pay_price}}</text>
				</view>
			</view>
			<!--底部支付-->
			<view class="foot-pay-btns">
				<view class="price">
					¥
					<text class="num">{{ OrderData.pay_price }}</text>
				</view>
				<view class="d-c-c">
					<button class="btn-gray" style="margin-right: 20rpx;" @click="goback">去加餐</button>
					<button class="theme-btn" @click="SubmitOrder">去买单</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		pay
	} from '@/common/pay.js';
	export default {
		components: {},
		data() {
			return {
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
				/*是否使用积分*/
				is_use_points: 0,
				linkman: '',
				phone: '',
				remark: '',
				/*支付方式*/
				pay_type: 20,
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
				/*是否显示支付宝支付，只有在h5，非微信内打开才显示*/
				showAlipay: false,
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
				table_id: 0,
				min_money: 0
			};
		},
		onLoad(options) {
			let self = this;
			self.options = options;
			//#ifdef MP-ALIPAY	
			self.pay_type = 30;
			//#endif
		},
		onShow() {
			this.$fire.on('takeout', function(e) {
				self.takeout_address = e;
				self.orderType = 'takeout'
			})
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
			/*支付方式选择*/
			payTypeFunc(e) {
				this.pay_type = e;
			},
			/*是否使用积分选择*/
			onShowPoints: function(e) {
				let self = this;
				if (e.target.value == true) {
					self.is_use_points = 1;
				} else {
					self.is_use_points = 0;
				}
				self.getData();
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
			changeTime(n) {

			},
			getTime(type) {
				let myDate = new Date();
				let myhours = myDate.getHours(); //获取当前小时数(0-23)
				if (myhours < 10) {
					myhours = '0' + myhours
				}
				let myminute = myDate.getMinutes(); //获取当前分钟数(0-59)
				if (myminute < 10) {
					myminute = "0" + myminute
				}
				let wmhours = myDate.getHours();
				let wmminute = myDate.getMinutes() + 15;
				if (wmminute >= 60) {
					wmminute = wmminute - 60;
					wmhours = wmhours + 1;
				}
				if (wmminute < 10) {
					wmminute = '0' + wmminute;
				}
				if (wmhours < 10) {
					wmhours = '0' + wmhours;
				}
				if (type == 'my') {
					return myhours + ':' + myminute;
				} else if (type == 'wm') {
					return wmhours + ':' + wmminute;
				}
			},
			/*获取数据*/
			getData() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self.loading = true;
				let callback = function(res) {
					self.OrderData = res.data.detail;
					self.ProductData = self.OrderData.product;
					self.supplier = res.data.detail.supplier;
					// self.coupon_list = self.OrderData.coupon_list || [];
					// self.coupon_id = self.OrderData.coupon_id || 0;
					// self.coupon_num = Object.keys(self.coupon_list).length;
					if (self.OrderData.order_pay_price == 0) {
						self.pay_type = 10;
					}
					//#ifdef H5
					if (!self.isWeixin() && res.data.h5_alipay) {
						self.showAlipay = true;
					}
					//#endif
					self.loading = false;
				};

				self._get(
					'order.HallCart/orderDetail', {
						order_id: self.options.order_id
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
				self.gotoPage('/pages/order/cashier?order_type=10&order_id=' + self.options.order_id)
			},
			timepick() {
				this.isTimer = true
			},
			closetimer(e) {
				if (e != '') {
					this.wmtime = e;
					this.mealtime = e;
				}
				this.isTimer = false
			},
			packTypeFunc(n) {
				this.is_pack = n;
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
		@include background_linear('background_color', 'opacify_background_0', 180deg, 0, 100%);
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
		border-bottom: 1rpx solid #EEEEEE;

	}

	.header_bitem {}

	.f-r {
		float: right;
	}

	.meal_item {
		margin: 26rpx 0;
		height: 96rpx;
		line-height: 96rpx;
		background-color: #FFFFFF;
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
		@include font_color('font_color')
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
		@include border_color("border_color");
		@include background_color("opacify_background_0");
		color: #333333;
		font-size: 24rpx;
		margin-bottom: 25rpx;
	}
</style>