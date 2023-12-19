<template>
	<view :data-theme='theme()' :class="theme() || ''">
		<view class="wrap" v-if="!loading">
			<view class="right">
				<template v-for="(item,index) in delivery_set" :key='item'>
					<view class="takeout" v-if="item=='10'" :class="tab_type == 0?'active':''" @click="tabFunc(0)">
						<text>快递配送</text>
					</view>
				</template>
				<template v-for="(item,index) in delivery_set" :key='item'>
					<view class="dinein" v-if="item=='20'" :class="tab_type == 1?'active':''" @click="tabFunc(1)">
						<text>门店自取</text>
					</view>
				</template>
			</view>
			<view class="header">
				<view class="headr_top">
					<view class="flex-1" style="width: 100%;" v-if="tab_type != 1">
						<view class="left overflow-hidden">
							<view class="overflow-hidden f28 fb w-b-a" style="width: 600rpx;"
								@click="gotoPage('/pages/user/address/address')">
								<template v-if="Address!=null">
									{{Address.detail+Address.address+" "+Address.name+" "+Address.phone}}
								</template>
								<template v-else>
									请选择配送地址
								</template>
							</view>
						</view>
					</view>
					<view class="header_bottom" v-if="tab_type == 1">
						<!--地址-->
						<template v-if="!extract_store.shop_supplier_id">
							<view class="d-b-c pr20 bg-white" @click="addAddress()">
								<view class="add-address d-s-c">
									<view class="icon-box mr10">
										<text class="icon iconfont icon-dizhi1"></text>
									</view>
									<text>请选择自提点</text>
								</view>
							</view>
						</template>
						<template v-if='extract_store.shop_supplier_id'>
							<view class="d-b-c pr20 bg-white" @click="addAddress()">
								<view class="address-defalut-wrap">
									<view class="address">
										<text class="fb gray3">{{ extract_store.name }}</text>
										<view class="icon-box"></view>
									</view>
									<view class="user">
										<text class="name">{{ extract_store.address }}</text>
										<text class="tel">{{ extract_store.link_phone }}</text>
									</view>
								</view>
								<view>
									<i class='iconfont icon-jiantou'></i>
								</view>
							</view>
						</template>
					</view>
				</view>
			</view>
			<!--购买的产品-->
			<view class="vender">
				<view class="list">
					<view class="item d-b-c">
						<view class="info d-s-s">
							<view class="cover">
								<image :src="OrderData.file_path" mode="aspectFill"></image>
							</view>
							<view>
								<view class="title f30 fb mb16">
									{{OrderData.product_name}}
								</view>
							</view>
						</view>
						<view class="" style="height: 148rpx;">
							<view class="f32 order_item mb16">¥{{ OrderData.product_price}}</view>
							<view class="f22 order_item ">×{{ OrderData.total_num }}</view>
						</view>
					</view>
				</view>
				<!--总数-->

				<view class="other_box">
					<view class="item">
						<text class="key">商品小计：</text>
						<text class="f32">￥{{ OrderData.total_price }}</text>
					</view>
					<view class="item" v-if="tab_type != 1&&OrderData.express_price!=0">
						<text class="key">配送费用：</text>
						<text class="f32">￥{{ OrderData.express_price }}</text>
					</view>
				</view>
				<view class="total-box">
					共{{OrderData.total_num}}件商品 小计
					<text class="f32 fb ml15">￥{{ OrderData.order_pay_price}}</text>
				</view>
			</view>
			<!--底部支付-->
			<view class="foot-pay-btns">
				<view class="price">
					<text class="num">{{OrderData.total_points}}</text>积分
					<template v-if="OrderData.order_pay_price > 0">
						+ ¥
						<text class="num">{{ OrderData.order_pay_price }}</text>
					</template>

				</view>
				<button type="primary" @click="SubmitOrder">提交订单</button>
			</view>
		</view>
		<Adress :isAddress='isAddress' :store_id='store_id' @close="closeAdress"></Adress>
	</view>
</template>

<script>
	import Adress from './confirm-order/address/address';
	import {
		pay
	} from '@/common/pay.js';
	export default {
		components: {
			Adress
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
				delivery_set: [],
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
				dinner_type: 10,
				cart_type: 0,
				store_set: [],
				table_id: 0,
				min_money: 0,
				isAddress: false,
				shop_supplier_id: 0
			};
		},
		onLoad(options) {
			let self = this;
			self.options = options;
			self.$fire.on('selectStoreId', function(e) {
				self.extract_store = e;
				self.shop_supplier_id = e.shop_supplier_id;
			});
			//#ifdef MP-ALIPAY	
			self.pay_type = 30;
			//#endif
			// this.getData();
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
				if (this.delivery_set.indexOf(e) != -1) {
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
			/*获取数据*/
			getData() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				let callback = function(res) {
					self.OrderData = res.data.order;
					self.temlIds = res.data.template_arr;
					self.exist_address = self.OrderData.exist_address;
					self.Address = self.OrderData.address;
					self.last_extract = self.OrderData.last_extract;
					self.delivery_set = self.OrderData.delivery_set;
					if (self.delivery_set.indexOf(self.delivery) == -1) {
						if (self.delivery_set[0] == '10') {
							self.tabFunc(0, true)
						} else {
							self.tabFunc(1, true)
						}
					}
					if (self.OrderData.delivery == '20') {
						self.tab_type = 1;
					}
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
					delivery: self.delivery || 0,
					shop_supplier_id: self.shop_supplier_id,
					pay_source: self.getPlatform(),
				};
				// 积分兑换结算
				if (self.options.order_type == 'points') {
					self._get(
						'plus.points.order/buy',
						Object.assign({}, params, {
							product_id: self.options.product_id,
							total_num: self.options.product_num
						}),
						function(res) {
							callback(res);
						}
					);
				}
			},

			/*选择配送方式*/
			tabFunc(e, flag) {
				/* 0外卖 1自取 */
				this.tab_type = e;
				if (e == 0) {
					this.delivery = 10;
				} else if (e == 1) {
					this.delivery = 20;
				}
				if (!flag) {
					this.getData();
				}
			},

			/*提交订单*/
			SubmitOrder() {
				let self = this;
				if (self.delivery == 10 && !self.Address) {
					self.showError('请添加配送地址')
					return false
				}
				if (self.delivery == 20 && self.shop_supplier_id == 0) {
					self.showError('请选择自提点')
					return false
				}
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let params = {
					delivery: self.delivery,
					shop_supplier_id: self.shop_supplier_id,
					pay_source: self.getPlatform(),
				};
				// 创建订单-直接下单
				let url = 'plus.points.order/buy';

				// 创建订单-积分兑换
				params = Object.assign(params, {
					product_id: self.options.product_id,
					total_num: self.options.product_num
				});
				let callback = function() {
					self._post(url, params, function(result) {
						let pages = '/pages/order/cashier?order_type=20&order_id=' + result.data.order_id;
						self.gotoPage(pages, 'reLaunch');
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
			},
			closeAdress() {
				this.isAddress = false;
			},
			addAddress() {
				let store_id = -1;
				if (this.extract_store.store_id) {
					store_id = this.extract_store.store_id;
				}
				this.store_id = store_id
				this.isAddress = true;
			},
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