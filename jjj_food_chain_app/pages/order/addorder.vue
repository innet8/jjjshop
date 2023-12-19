<template>
	<view :data-theme='theme()' :class="theme() || ''">
		<view class="wrap" v-if="!loading">
			<!--购买的产品-->
			<view class="vender">
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
							<view>
								<view class="title f30 fb mb16">
									{{item.product.product_name}}
								</view>
								<view class="num-wrap pl-30 gray9 f22">
									{{ item.describe }}
								</view>
							</view>
						</view>
						<view class="" style="height: 148rpx;">
							<view class="f32 order_item mb16">¥{{ item.price}}</view>
							<view class="f22 order_item ">×{{ item.product_num }}</view>
						</view>
					</view>
				</view>
				<!--总数-->

				<view class="other_box">
					<view class="item">
						<text class="key">商品小计：</text>
						<text class="f32">￥{{ OrderData.pay_money }}</text>
					</view>
				</view>
			</view>
			<view class="meal_item">
				<view class="d-b-c item">
					<view class="mr20">备注:</view>
					<input class="flex-1" type="text" v-model="remark" placeholder="请填写您的其他要求" />
				</view>
			</view>
			<!--底部支付-->
			<view class="foot-pay-btns">
				<view class="price">
					¥<text class="num">{{ OrderData.pay_money }}</text>
				</view>
				<button type="primary" @click="SubmitOrder">确认订单</button>
			</view>
			<timepicker :isTimer='isTimer' @close='closetimer'></timepicker>
		</view>
	</view>
</template>

<script>
	import timepicker from '@/components/timepicker/timepicker';
	export default {
		components: {
			timepicker
		},
		data() {
			return {
				/*是否加载完成*/
				loading: true,
				options: {},
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				tab_type: 4,
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
				/*是否使用积分*/
				is_use_points: 0,
				remark: '',
				/*支付方式*/
				pay_type: 20,
				deliverySetting: [],
				/*消息模板*/
				temlIds: [],
				/*是否显示支付宝支付，只有在h5，非微信内打开才显示*/
				showAlipay: false,
				takeout_address: {},
				isTimer: false,
				mealtime: '',
				wmtime: '',
				is_pack: 1,
				supplier: {},
				dinner_type: 10,
				cart_type: 0,
				store_set: [],
				table_id: 0,
			};
		},
		onLoad(options) {
			let self = this;
			self.options = options;
			self.cart_type = options.cart_type;
			self.table_id = options.table_id || 0;
			self.dinner_type = options.dinner_type;
			self.delivery = options.delivery;
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
			/**/
			hasType(e) {
				if (this.deliverySetting.indexOf(e) != -1) {
					return true;
				} else {
					return false;
				}
			},
			/*获取数据*/
			getData() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				let callback = function(res) {
					self.OrderData = res.data.orderInfo;
					self.temlIds = res.data.template_arr;
					self.exist_address = self.OrderData.exist_address;
					self.Address = self.OrderData.address;
					self.extract_store = self.OrderData.extract_store;
					self.last_extract = self.OrderData.last_extract;
					self.ProductData = self.OrderData.product_list;
					self.supplier = res.data.orderInfo.supplier;
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
					self.wmtime = wmhours + ':' + wmminute;
					self.mealtime = myhours + ':' + myminute
					self.deliverySetting = self.OrderData.deliverySetting;
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

				// 请求的参数
				let params = {
					delivery: self.delivery,
					store_id: 1,
					is_use_points: self.is_use_points,
					pay_source: self.getPlatform(),
					mealtime: '',
				};
				// 购物车结算
				if (self.options.order_type === 'cart') {
					self._get(
						'order.order/addMeal',
						Object.assign({}, params, {
							cart_ids: self.options.cart_ids || 0,
							shop_supplier_id: self.options.shop_supplier_id || 0,
							order_id: self.options.order_id
						}),
						function(res) {
							callback(res);
						},
						function(err) {
						}
					);
				}
			},

			/*提交订单*/
			SubmitOrder() {
				let self = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let params = {
					delivery: self.delivery,
					store_id: 1,
					is_use_points: 0,
					remark: self.remark,
					pay_type: self.pay_type,
					pay_source: self.getPlatform(),
					mealtime: self.mealtime,
					shop_supplier_id: self.options.shop_supplier_id
				};
				if (self.delivery == 10) {
					params.mealtime = self.wmtime
				}
				// 创建订单-直接下单
				let url = '';
				if (self.options.order_type === 'buy') {
					url = 'order.order/buy';
					params = Object.assign(params, {
						product_id: self.options.product_id,
						product_num: self.options.product_num,
						product_sku_id: self.options.product_sku_id
					});
				}

				// 创建订单-购物车结算
				if (self.options.order_type === 'cart') {
					url = 'order.order/addMeal';
					params = Object.assign(params, {
						dinner_type: self.dinner_type,
						cart_ids: self.options.cart_ids || 0,
						shop_supplier_id: self.options.shop_supplier_id || 0,
						order_id: self.options.order_id
					});
				}
				let callback = function() {
					self._post(url, params, function(result) {
						self.gotoPage('/pages/order/myorder')
					});
				};

				self.subMessage(self.temlIds, callback);
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
		padding-right: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #D9D9D9;

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
		color: $color-primary;
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
	}
	
	.foot-pay-btns button {
		margin: 0;
		font-size: 32rpx;
		padding: 0 50rpx;
		height: 84rpx;
		line-height: 84rpx;
		border-radius: 50rpx;
		@include background_color("background_color");
		@include text_color("text_color");
	}
</style>
