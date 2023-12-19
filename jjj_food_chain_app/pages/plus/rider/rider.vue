<template>
	<view class="pr" v-if="!loading" :data-theme='theme()' :class="theme() || ''">
		<!-- #ifdef MP-WEIXIN || APP-PLUS -->
		<u-navbar placeholder title="骑手中心" bgColor="#ffffff00"   :autoBack="true">
		</u-navbar>
		<!-- #endif -->
		<view class="rider_bg"></view>
		<view class="pr pt40">
			<view class="d-c-c d-c">
				<view class="f26 mb20 ">
					账户余额(元)
				</view>
				<view class="f40 fb ">{{money}}</view>
				<view class="pr">
					<button class="mini_btn" @click="gotoPage('/pages/plus/rider/apply/apply')">提现</button>
					<view class="apply_list" @click="gotoPage('/pages/plus/rider/apply/list')">提现明细</view>
				</view>
			</view>
			<view class="shop_data shop_data_top">
				<view class="deal">
					<view class="d-e-c">
						<view class="right-title" @click="gotoPage('/pages/plus/rider/apply/income_details')">收入明细</view>
					</view>
					
					<view class="d-s-c  deal_list">
						<view class="deal_item d-c  d-c-c">
							<view class="f24 gray9">昨日收入(元)</view>
							<view class="item_num">{{yesIncome}}</view>
						</view>
						<view class="deal_item d-c  d-c-c">
							<view class="f24 gray9">今日收入(元)</view>
							<view class="item_num">{{toIncome}}</view>
						</view>
						<view class="deal_item d-c d-c-c">
							<view class="f24 gray9">总收入(元)</view>
							<view class="item_num">{{all_money}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="shop_data shop_data_top">
				<view class="d-b-c bottom_border title-box">
					<view class="shop_data_title">订单任务</view>
					<view class="order_title" v-if="status==0" @click="gotoPage('/pages/plus/rider/hall')">去接单大厅</view>
					<view class="order_title" v-if="status==1">已申请退出骑手</view>
					<view class="order_title" v-if="status==2">已退出骑手</view>
				</view>
				<view class="visit pt20">
					<view class="d-a-c visit_list">
						<view class="visit_item d-c d-c-c">
							<view class="f24 gray9">昨日接单数量</view>
							<view class="item_num">{{yesOrder}}</view>
						</view>
						<view class="visit_item d-c d-c-c">
							<view class="f24 gray9">今日接单数量</view>
							<view class="item_num">{{toOrder}}</view>
						</view>
						<view class="visit_item d-c d-c-c">
							<view class="f24 gray9">总接单数量</view>
							<view class="item_num">{{allOrder}}</view>
						</view>
					</view>
				</view>
				<view class="order-more" @click="gotoPage('/pages/plus/rider/apply/order_history')">查看历史订单记录</view>
			</view>
		</view>
		<view v-if="status==0" class="exit-rider" @click="exitRider">申请退出骑手</view>
		<view v-if="status==1" class="exit-rider gray3">已申请退出骑手</view>
		<view v-if="status==2" class="exit-rider gray3">已退出骑手</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
				statusBarHeight: 0,
				titleBarHeight: 0,
				detail: {},
				money: '0.00',
				allOrder: '',
				toOrder: '',
				yesOrder: '',
				all_money: '',
				toIncome: '',
				yesIncome: '',
				status: 0
			}
		},
		onLoad() {
			this.GetStatusBarHeight();
		},
		onShow() {
			this.getData()
		},
		methods: {
			/* titleBar高度 */
			GetStatusBarHeight() {
				// #ifdef MP-WEIXIN
				let that = this;
				const SystemInfo = uni.getSystemInfoSync();
				let statusBarHeight = SystemInfo.statusBarHeight;
				this.statusBarHeight = uni.getMenuButtonBoundingClientRect().top;
				this.titleBarHeight = uni.getMenuButtonBoundingClientRect().height;
				// #endif
				// #ifndef MP-WEIXIN
				const SystemInfo = uni.getSystemInfoSync();
				this.statusBarHeight = SystemInfo.statusBarHeight;
				// #endif
			},
			getData() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self.loading = true;
				self._get('user.driver/center', {

				}, function(res) {
					self.detail = res.data;
					self.money = res.data.driver.money;
					self.allOrder = res.data.basedata.allOrder + '';
					self.toOrder = res.data.basedata.toOrder + '';
					self.yesOrder = res.data.basedata.yesOrder + '';
					self.all_money = res.data.driver.all_money + '';
					self.toIncome = res.data.basedata.toIncome + '';
					self.yesIncome = res.data.basedata.yesIncome + '';
					self.status = res.data.refundStatus;
					self.loading = false;
					uni.hideLoading();
				});
			},
			goback() {
				uni.reLaunch({
					url: "/pages/user/index/index"
				})
			},
			exitRider() {
				let self = this;
				uni.showModal({
					content: '确定申请退出跑腿骑手',
					success(res) {
						if (res.confirm) {
							self._get('plus.driver.Apply/refund', {

							}, function(res) {
								uni.showModal({
									content: '申请退出成功',
									showCancel: false,
									success() {
										uni.switchTab({
											url: '/pages/user/index/index'
										})
									}
								})
							});
						} else if (res.cancel) {

						}

					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.shop_data {
		width: 90%;
		padding: 0 30rpx;
		background-color: white;
		margin: 0 auto;
		margin-top: 30rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		color: #585858;
	}

	.shop_data_title {
		font-size:28rpx;
		padding-left: 29rpx;
		line-height: 27rpx;
		position: relative;
	}
	.shop_data_title::after{
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		left: 0;
		width: 10rpx;
		height: 27rpx;
		background: #FFCC00;
		border-radius: 4rpx;
	}
	.title-box{
		height: 100rpx;
		line-height: 100rpx;
	}
	.deal .title,
	.visit .title {
		font-size: 22rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-right: 20rpx;
		text-align: right;
		color: #497DBB;
	}

	.deal_list {
		flex-wrap: wrap;
	}

	.deal_item {
		width: 33%;
		margin: 20rpx 0;
	}

	.item_num {
		margin: 30rpx 0;
		color: #333333;
		font-weight: 600;
		font-size: 32rpx
	}

	.datalist_item {
		/* text-align: center; */
	}

	.data_list {
		border-top: 1rpx solid #CCCCCC;
		padding: 20rpx 20rpx;
	}

	.rider_bg {
		// background-image: linear-gradient(to top, #ffad54, #f08318);
		@include background_color("background_color");
		width: 100%;
		height: 500rpx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.mini_btn {
		width: 180rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #333333;
		border-radius: 30rpx;
		background-color: rgba(255, 255, 255, .45);
		text-align: center;
		border: none;
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		margin-bottom: 24rpx;
	}

	.order_title {
		font-size: 28rpx;
		@include font_color('font_color')
	}

	.bottom_border {
		border-bottom: 1rpx solid #eeeeee;
	}

	.order-more {
		margin-top: 30rpx;
		padding-bottom: 20rpx;
		color: #00CD93;
		font-size: 26rpx;
		text-align: center;
	}

	.exit-rider {
		text-align: center;
		color: #ffffff;
		font-size: 30rpx;
		width: 394rpx;
		height: 93rpx;
		background: #DDDDDD;
		border-radius: 45rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 60rpx auto;
	}

	.apply_list {
		width: 96rpx;
		margin: 0 auto;
		font-size: 24rpx;
		padding-bottom: 8rpx;
		border-bottom: 1rpx solid #FFFFFF;
		color: #FFFFFF;
	}

	.reg180 {
		padding: 0 40rpx;
		text-align: right;
		transform: rotateY(180deg);
		position: absolute;
		bottom: 0;

	}

	.icon-jiantou {
		color: #FFFFFF;
		font-size: 30rpx;
	}

	.head_top {
		position: relative;
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
		font-size: 32rpx;
		z-index: 2;
	}

	.reg180 {
		padding-right: 20rpx;
		text-align: right;
		transform: rotateY(180deg);
		position: absolute;
		bottom: 0;
	}

	.icon-jiantou {

		color: #FFFFFF;
		font-size: 30rpx;
	}
	.right-title{
		width: 131rpx;
		height: 44rpx;
		background: #00CD93;
		text-align: center;
		line-height: 44rpx;
		border-radius: 20rpx 0 0 20rpx;
		margin-right: -30rpx;
		margin-top: 24rpx;
		color: white;
	}
</style>
