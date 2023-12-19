<template>
	<view class="order-box" v-if="!loadding">
		<view class="bg-white">
			<view class="section">
				<list-cell :hover="false" padding="50rpx 30rpx">
					<view class="ww100 d-flex d-c">
						<list-cell :hover="false" padding="0rpx 0rpx 40rpx" v-if="detail.pay_status.value == 20&&type==1">
							<view class="ww100 d-flex d-c">
								<view class="pay-cell">
									<view>联系人</view>
									<view class="fb">{{detail.address.name}}</view>
								</view>
								<view class="pay-cell">
									<view>联系电话</view>
									<view class="fb" @click="callPhone(detail.address.phone)">{{ detail.address.phone }}<text class="icon iconfont icon-002dianhua"></text></view>
								</view>
								<view class="pay-cell">
									<view>配送地址</view>
									<view class="fb">{{ detail.address.detail+detail.address.address }}</view>
								</view>
							</view>
						</list-cell>
						<!-- goods begin -->
						<view class="ww100 d-flex d-c pr mt30" style="margin-bottom: -40rpx;">
							<view class="ww100 d-s-c mb-40" v-for="(good, index) in detail.product" :key="index">
								<view class="d-flex d-c w-60 o-h">
									<view class="font-size-lg text-color-base mb10 text-truncate">{{ good.product_name }}</view>
									<view class="font-size-sm text-color-assist text-truncate">{{ good.product_attr }}</view>
								</view>
								<view class="d-flex w-40 d-b-c pl-30">
									<view class="font-size-base text-color-base">x{{ good.total_num }}</view>
									<view class="font-size-base text-color-base fb">￥{{ good.total_pay_price }}</view>
								</view>
							</view>
						</view>
						<!-- goods end -->
					</view>
				</list-cell>
			</view>
			<view class="section">
				<!-- payment and amount begin -->
				<list-cell :hover="false" padding="50rpx 30rpx">
					<view class="ww100 d-flex d-c">
						<view class="pay-cell" v-if="detail.bag_price!=0">
							<view>包装费</view>
							<view class="fb">￥{{ detail.bag_price }}</view>
						</view>
						<view class="pay-cell">
							<view>配送费</view>
							<view class="fb">￥{{ detail.express_price }}</view>
						</view>
						<view class="pay-cell" v-if="detail.fullreduce_money!=0">
							<view>{{detail.fullreduce_remark}}</view>
							<view class="fb">￥{{ detail.fullreduce_money }}</view>
						</view>
						<view class="pay-cell" v-if="detail.coupon_money!=0">
							<view>优惠券</view>
							<view class="fb red">￥{{ detail.coupon_money }}</view>
						</view>
						<view class="pay-cell">
							<view>金额总计</view>
							<view class="fb">￥{{ detail.pay_price }}</view>
						</view>
						<view class="pay-cell">
							<view v-if="type==1&&detail.receipt_status.value==10">订单配送中</view>
							<view v-if="type==1&&detail.receipt_status.value==20">订单已结束</view>
							<view v-if="type==0"></view>
							<view v-if="type==1&&detail.receipt_status.value==10"><button class="order_btn" @click="orderReceipt(detail)">确认送达</button></view>
							<view v-if="type==1&&detail.receipt_status.value==20"><button class="order_btn">已送达</button></view>
							<view v-if="type==0"><button class="order_btn" @click="receiveOrder(detail)">接单</button></view>
						</view>
					</view>
				</list-cell>
				<!-- payment and amount end -->
			</view>
			<!-- order other info begin -->
			<list-cell :hover="false" padding="50rpx 30rpx 20rpx" last>
				<view class="ww100 d-flex d-c">
					<view class="pay-cell">
						<view>期望送达时间</view>
						<view class="fb">{{detail.mealtime}}</view>
					</view>
					<view class="pay-cell">
						<view>下单时间</view>
						<view class="fb">{{detail.create_time}}</view>
					</view>
					<view class="pay-cell">
						<view>订单号</view>
						<view class="fb">{{ detail.order_no }}</view>
					</view>
					<view class="pay-cell" v-if="type==1&&detail.store_state==1">
						<view class="fb w100">
							<image class="qr_img" :src="qrimg" mode=""></image>
						</view>
					</view>
					<view class="pay-cell">
						<view>备注</view>
						<view class="fb">{{ detail.postscript }}</view>
					</view>
				</view>
			</list-cell>
			<!-- order other info end -->
		</view>
	</view>
</template>

<script>
	import Popup from '@/components/uni-popup.vue';
	import {
		pay
	} from '@/common/pay.js';
	import listCell from '@/components/list-cell/list-cell'
	export default {
		components:{
			listCell
		},
		data() {
			return {
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
				type: 0,
				qrimg: ''
			};
		},
		components: {
			Popup
		},
		onLoad(e) {
			this.order_id = e.order_id;
			this.type = e.type
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
					'plus.driver.TakeOrder/detail', {
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
			receiveOrder(e) {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self._post('plus.driver.TakeOrder/receiveOrder', {
					order_id: e.order_id
				}, function(res) {
					uni.showModal({
						content: res.msg,
						complete() {
							uni.redirectTo({
								url: '/pages/rider/order/order?order_id=' + self.order_id + '&type=1'
							})
						}
					})
					uni.hideLoading();
					self.loadding = false;
				});
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
				let order_id = self.order_id;
				self.isPayPopup = false;
				uni.showLoading({
					title: '加载中'
				});
				self._post(
					'user.order/pay', {
						payType: payType,
						order_id: order_id,
						pay_source: self.getPlatform()
					},
					function(res) {
						uni.hideLoading();
						pay(res, self);
					}
				);
			},
			orderReceipt(e) {
				let self = this;
				uni.showModal({
					title: '提示',
					content: '您确定送达了吗?',
					success: function(o) {
						if (o.confirm) {
							uni.showLoading({
								title: '正在处理'
							});
							self._post(
								'user.order/receipt', {
									order_id: e.order_id
								},
								function(res) {
									uni.hideLoading();
									uni.showToast({
										title: '已确认送达',
										duration: 2000,
										icon: 'success'
									});
									self.restoreData();
									self.getData();
								}
							);
						} else {
							uni.showToast({
								title: '取消送达',
								duration: 1000,
								icon: 'none'
							});
						}
					}
				});
			},
			/*支付方式选择*/
			onPayOrder(orderId) {
				let self = this;
				self.isPayPopup = true;
				self.order_id = orderId;
			},
			callPhone(phone) {
				let self = this;
				phone = phone + "";
				console.log(phone)
				uni.makePhoneCall({
					phoneNumber: phone,
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* #ifdef H5 */
	page {
		min-height: 100%;
		background-color: $bg-color;
	}

	/* #endif */
	.order-box {
		padding: 20rpx;
		/* #ifdef H5 */
		margin-bottom: 100rpx;
		/* #endif */
	}
	.w-60{
		width: 60%;
	}
	.w-40{
		width: 40%;
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

	.section {
		position: relative;

		&::before {
			@include arch;
			left: -15rpx;
		}

		&::after {
			@include arch;
			right: -15rpx;
		}
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

	.order_btn {
		height: 60rpx;
		color: #FFFFFF;
		border: none;
		border-radius: 30rpx;
		line-height: 60rpx;
		padding: 0 20rpx;
		background-color: #f68f2a;
		@include border_color('border_color');
		font-size: 26rpx;
	}

	.icon-002dianhua {
		color: #FFFFFF;
		background-color: #28A5FF;
		border-radius: 50%;
		padding: 8rpx;
		font-size: 26rpx;
		margin-left: 10rpx;
	}

	.qr_img {
		width: 350rpx;
		height: 350rpx;
		margin: 0 auto;
	}

	.w100 {
		width: 100%;
	}
</style>
