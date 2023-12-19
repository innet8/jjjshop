<template>
	<view :data-theme='theme()' :class="theme() || ''">
		<view class="order-box" v-if="!loadding">
			<view class="f40 fb mb40">
				{{detail.state_text}}
			</view>
			<view class="d-s-c mt20 mb40" v-if="detail.pay_status.value == 10 && detail.order_status.value != 20">
				<view class="f26">交易将在：<text class="orange">{{detail.pay_end_time}}</text>后关闭，请及时付款</view>
			</view>
			<view class="top-state"
				v-if="detail.order_type!=1 && detail.delivery_type.value==10 && detail.order_status.value == 10">
				<view class="d-b-c state-height border-b">
					<view class="">配送员正在为你配送中</view>
					<!-- <view>联系配送员</view> -->
				</view>
				<view class="d-b-c state-height">
					<view>预计取餐时间</view>
					<view class="blue">{{detail.mealtime}}</view>
				</view>
			</view>
			<view class="order-content">
				<view class="shop-name border-b">{{detail.supplier.name}}</view>
				<view class="order-prolist">
					<view class="d-s-c proitem" v-for="(good, index) in detail.product" :key="index">
						<view class="pro-image">
							<image :src="good.image.file_path" mode="aspectFill"></image>
						</view>
						<view class="d-b-s pro-price flex-1">
							<view class="">
								<view class="f28 text-ellipsis fb mb10">
									{{ good.product_name }}
								</view>
								<view class="f20 gray9 w-b-a">
									{{ good.product_attr }}
								</view>
								<view class="f22 gray9">￥{{ good.total_num }}</view>
							</view>
							<view class="pro-price-item">
								<view class="f24 gray3 mb10">￥{{ good.product_price }}</view>
								<view class="f22 gray9 text-d-line">￥{{ good.line_price }}</view>
							</view>
						</view>
					</view>
				</view>
				<view>
					<view class="pro-cont-item">
						<view>商品小计</view>
						<view>￥{{detail.total_price}}</view>
					</view>
					<view class="pro-cont-item" v-if="detail.bag_price!=0">
						<view>包装费</view>
						<view>￥{{detail.bag_price}}</view>
					</view>
					<view class="pro-cont-item" v-if="detail.service_money!=0">
						<view>服务费</view>
						<view>￥{{detail.service_money}}</view>
					</view>
					<view class="pro-cont-item" v-if="detail.express_price>0">
						<view>配送费</view>
						<view>￥{{detail.express_price}}</view>
					</view>
					<view class="pro-cont-item" v-if="detail.fullreduce_money!=0">
						<view>{{detail.fullreduce_remark}}</view>
						<view>-￥{{detail.fullreduce_money}}</view>
					</view>
					<view class="pro-cont-item pro-cont-total">
						共{{detail.product.length}}件商品 已优惠
						￥{{detail.fullreduce_money+detail.coupon_money*1 +detail.discount_money*1 }} 小计
						<text>￥{{detail.pay_price}}</text>
					</view>
				</view>
			</view>
			<view class="other_box">
				<view class="meal_item-title">配送信息</view>
				<view class="meal_item">
					<view>配送服务</view>
					<view class="right">{{detail.order_type_text}}</view>
				</view>
				<view class="meal_item" v-if="detail.mealtime">
					<view>期望时间</view>
					<view class="right">{{detail.mealtime}}</view>
				</view>
				<view class="meal_item" v-if="detail.order_type!=1&&detail.address!=null">
					<view>配送地址</view>
					<view class="right">
						<view>{{detail.address.detail+detail.address.address}}</view>
						<view>{{detail.address.name+' '+detail.address.phone}}</view>
					</view>
				</view>
			</view>
			<view class="other_box">
				<view class="meal_item-title">订单信息</view>
				<view class="meal_item">
					<view>订单号码</view>
					<view class="right">{{detail.order_no}}</view>
				</view>
				<view class="meal_item" v-if="detail.table_no">
					<view>桌号</view>
					<view class="right">{{detail.table_no}}</view>
				</view>
				<view class="meal_item">
					<view>下单时间</view>
					<view class="right">{{detail.create_time}}</view>
				</view>
				<view class="meal_item">
					<view>支付金额</view>
					<view class="right">{{detail.pay_price}}</view>
				</view>
				<view class="meal_item">
					<view>支付方式</view>
					<view class="right">{{detail.pay_type.text}}</view>
				</view>
				<view class="meal_item">
					<view>备注</view>
					<view class="right">
						<view>{{detail.buyer_remark}}</view>
					</view>
				</view>
			</view>
			<view class="d-c-c" v-if="detail.pay_status.value == 10 && detail.order_status == 10">
				<view class="f26 theme-btn pay_btn" @click="onPayOrder(detail.order_id)">立即支付</view>
			</view>
			<!--支付选择-->
			<cashier :isPayPopup="isPayPopup" @close="hidePopupFunc" @submit="subFunc"></cashier>
		</view>
	</view>
</template>

<script>
	import cashier from '@/components/cashier/cashier.vue';
	import {
		pay
	} from '@/common/pay.js';
	export default {
		components: {
			cashier
		},
		data() {
			return {
				checkedPay: [10, 20],
				/*支付方式*/
				pay_type: 20,
				/*是否加载完成*/
				loadding: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				/*是否显示支付类别弹窗*/
				isPayPopup: false,
				/*订单id*/
				order_id: 0,
				/*订单详情*/
				detail: {
					order_status: [],
					address: {
						region: []
					},
					product: [],
					pay_type: [],
					delivery_type: [],
					pay_status: []
				},
				extractStore: {},
				/*是否显示拼团*/
				is_fightgroup: false,
				/*是否显示支付宝支付，只有在h5，非微信内打开才显示*/
				showAlipay: false,
				qrimg: ''
			};
		},
		onLoad(e) {
			this.order_id = e.order_id;
		},
		mounted() {
			uni.showLoading({
				title: '加载中'
			});
			/*获取订单详情*/
			this.getData();
		},
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				let order_id = self.order_id;
				self._get(
					'user.order/detail', {
						order_id: order_id
					},
					function(res) {
						self.detail = res.data.order;
						self.extractStore = res.data.order.extractStore;
						self.loadding = false;
						uni.hideLoading();
					}
				);
			},
			/*显示支付方式*/
			hidePopupFunc() {
				this.isPayPopup = false;
			},

			/*取消订单*/
			cancelOrder(e) {
				let self = this;
				let order_id = e;
				uni.showModal({
					title: '提示',
					content: '您确定要取消当前订单吗?',
					success: function(o) {
						if (o.confirm) {
							uni.showLoading({
								title: '正在处理'
							});
							self._get(
								'user.order/cancel', {
									order_id: order_id
								},
								function(res) {
									uni.hideLoading();
									uni.showToast({
										title: '操作成功',
										duration: 2000,
										icon: 'success'
									});
									self.getData();
								}
							);
						}
					}
				});
			},

			/*确认收货*/
			orderReceipt(order_id) {
				let self = this;
				uni.showModal({
					title: '提示',
					content: '您确定要收货吗?',
					success: function(o) {
						if (o.confirm) {
							uni.showLoading({
								title: '正在处理'
							});
							self._post(
								'user.order/receipt', {
									order_id: order_id
								},
								function(res) {
									uni.hideLoading();
									uni.showToast({
										title: res.msg,
										duration: 2000,
										icon: 'success'
									});
									self.getData();
								}
							);
						}
					}
				});
			},
			/*查看物流*/
			gotoExpress(order_id) {
				uni.navigateTo({
					url: '/pages/order/express/express?order_id=' + order_id
				});
			},
			/*申请售后*/
			onApplyRefund(e) {
				uni.navigateTo({
					url: '/pages/order/refund/apply/apply?order_product_id=' + e
				});
			},

			/*去支付*/
			payTypeFunc(payType) {
				let self = this;
				self.pay_type = payType
			},
			subFunc(e) {
				let self = this;
				if (!self.isPayPopup) {
					return
				}
				self.isPayPopup = false;
				let order_id = self.order_id;
				uni.showLoading({
					title: '加载中'
				});
				self._post(
					'user.order/pay', {
						payType: e,
						order_id: order_id,
						pay_source: self.getPlatform()
					},
					function(res) {
						uni.hideLoading();
						pay(res, self);
					}
				);
			},
			/*支付方式选择*/
			onPayOrder(orderId) {
				let self = this;
				self.isPayPopup = true;
				self.order_id = orderId;
			}
		}
	};
</script>

<style lang="scss">
	/* #ifdef H5 */
	page {
		min-height: 100%;
		background-color: $bg-color;
	}

	/* #endif */
	.order-box {
		padding: 26rpx;
		/* #ifdef H5 */
		margin-bottom: 100rpx;
		/* #endif */
		@include background_linear('background_color', 'opacify_background_0', 180deg, 0, 100%);
	}

	.top-state {
		background-color: #FFFFFF;
		border-radius: 8rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;

		.state-height {
			height: 100rpx;
			line-height: 100rpx;
		}
	}

	.order-content {
		padding: 0 30rpx;
		background-color: #FFFFFF;
		border-radius: 8rpx;

		.shop-name {
			height: 86rpx;
			line-height: 86rpx;
		}

		.order-prolist {
			.proitem {
				padding: 24rpx 0;

				.pro-image {
					width: 148rpx;
					height: 148rpx;
					border-radius: 8rpx;
					margin-right: 32rpx;

					image {
						width: 148rpx;
						height: 148rpx;
						border-radius: 8rpx;
					}
				}

				.pro-price {

					height: 148rpx;

					.pro-price-item {
						width: 170rpx;
						box-sizing: border-box;
						text-align: right;
					}
				}
			}
		}

		.pro-cont-item {
			height: 92rpx;
			border-bottom: 1rpx solid #EEEEEE;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.pro-cont-item.pro-cont-total {
			justify-content: flex-end;
		}
	}

	.drinks-img {
		width: 260rpx;
		height: 260rpx;
	}

	.tips {
		margin: 60rpx 0 80rpx;
		line-height: 48rpx;
	}

	.drink-btn {
		width: 320rpx;
		border-radius: 50rem !important;
		margin-bottom: 40rpx;
		font-size: $font-size-base;
		line-height: 3.0;
	}

	@mixin arch {
		content: "";
		position: absolute;
		background-color: $bg-color;
		width: 30rpx;
		height: 30rpx;
		bottom: -15rpx;
		z-index: 10;
		border-radius: 100%;
	}



	.pay-cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: $font-size-base;
		color: $text-color-base;
		margin-bottom: 40rpx;

		&:nth-last-child(1) {
			margin-bottom: 0;
		}
	}

	.sort-num {
		font-size: 64rpx;
		font-weight: bold;
		color: $text-color-base;
		line-height: 2;
	}

	.steps__img-column {
		display: flex;
		margin: 30rpx 0;

		.steps__img-column-item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 80rpx;
				height: 80rpx;
			}
		}
	}

	.steps__text-column {
		display: flex;
		margin-bottom: 40rpx;

		.steps__text-column-item {
			flex: 1;
			display: inline-flex;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: $font-size-base;
			color: $text-color-assist;

			&.active {
				color: $text-color-base;
				font-weight: bold;

				.steps__column-item-line {
					background-color: $text-color-base;
				}
			}

			.steps__column-item-line {
				flex: 1;
				height: 2rpx;
				background-color: #919293;
				transform: scaleY(0.5);
			}

			.steps__text-column-item-text {
				margin: 0 8px;
			}
		}
	}

	.pay_btn {
		padding: 10rpx 20rpx;
		border-radius: 42rpx;
		width: 710rpx;
		height: 84rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		font-weight: 800;
		margin-top: 40rpx;
		box-sizing: border-box;
	}

	.qr_img {
		width: 350rpx;
		height: 350rpx;
		margin: 0 auto;
	}

	.w100 {
		width: 100%;
	}

	.other_box {
		margin-top: 22rpx;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		padding: 0 34rpx;
		box-sizing: border-box;
		padding-bottom: 30rpx;

		.meal_item-title {
			height: 88rpx;
			line-height: 88rpx;
			font-size: 28rpx;
			font-weight: 800;
			color: #282828;
			border-bottom: 1rpx solid #EEEEEE;
			margin-bottom: 30rpx;
		}

		.meal_item {
			font-size: 24rpx;
			margin-bottom: 38rpx;
			color: #28282850;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;

			.right {
				width: 360rpx;
				text-align: right;
			}
		}
	}

	.pop-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1000;

		.pop-content {
			position: fixed;
			z-index: 1001;
			bottom: 0;
			width: 100%;
			height: 719rpx;
			padding: 40rpx 24rpx 0 23rpx;
			box-sizing: border-box;
			transform: translate3d(0, 0, 0);
			transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1);
			background-color: #FFFFFF;
			border-radius: 15rpx 15rpx 0rpx 0rpx;

			.icon.icon-guanbi {
				background: #dedede;
				border-radius: 50%;
				color: #FFFFFF;
				position: absolute;
				right: 26rpx;
				top: 40rpx;
				font-size: 22rpx;
				display: flex;
				width: 40rpx;
				height: 40rpx;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.close-img {
		width: 32rpx;
		height: 32rpx;
		position: absolute;
		right: 32rpx;
		top: 32rpx;
	}

	.pop-bg.close {
		// display: none;
		height: 0;

		.pop-content {
			transform: translate3d(0, 2000rpx, 0);
		}
	}

	.cashier-item {
		height: 89rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #EEEEEE;

		.icon-box {
			width: 38rpx;
			height: 38rpx;
			border: 1rpx solid #DDDDDD;
			border-radius: 50%;

			.icon-tijiaochenggong {
				font-size: 26rpx;
				color: #FFFFFF;
			}

		}

		.icon-box.border {
			border-radius: 50%;
		}
	}

	.cashier-item.active .icon-box {
		border: 1rpx solid #72DEED;
		@include border_color('border_color');
		@include background_color('background_color');
	}

	.pay-btn {
		width: 750rpx;
		height: 96rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		bottom: 0;
		@include background_color('background_color');
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
