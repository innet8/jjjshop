<template>
	<view :data-theme="theme()" :class="theme() || ''">
		<view class="top-tabbar">
			<view class="ww100" :style="'height:' + topBarTop() + 'px;'"></view>
			<!-- #ifdef H5 -->
			<view class="ww100" :style="'height:30rpx;'"></view>
			<!-- #endif -->
			<view class="tc  head_top" :style="topBarHeight() == 0 ? '' : 'height:' + topBarHeight() + 'px;'">
				<view class="d-c-c bg-white">
					<view class="left" :class="order_type == 0 ? 'tab-item-top active' : 'tab-item-top'"
						@click="ordertypeFunc(0)">配送订单</view>
					<view class="right" :class="order_type == 1 ? 'tab-item-top active' : 'tab-item-top'"
						@click="ordertypeFunc(1)">店内订单</view>
				</view>
			</view>
			<view class="d-a-c ww100 mt24" v-if="order_type == 0">
				<view :class="delivery_type == 10 ? 'tab-item active' : 'tab-item'" @click="orderStateFunc(10)">外送订单
				</view>
				<view :class="delivery_type == 20 ? 'tab-item active' : 'tab-item'" @click="orderStateFunc(20)">自提订单
				</view>
			</view>
			<view class="d-a-c ww100 mt24" v-if="order_type == 1">
				<view :class="delivery_type == 40 ? 'tab-item active' : 'tab-item'" @click="orderStateFunc(40)">堂食订单
				</view>
				<view :class="delivery_type == 30 ? 'tab-item active' : 'tab-item'" @click="orderStateFunc(30)">打包订单
				</view>
			</view>
		</view>
		<!--列表-->
		<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'" lower-threshold="50"
			@scrolltolower="scrolltolowerFunc">
			<view :class="topRefresh ? 'top-refresh open' : 'top-refresh'">
				<view class="circle" v-for="(circle, n) in 3" :key="n"></view>
			</view>
			<view class="order-list">
				<view class="item d-b-s" v-for="(item, index) in listData" :key="index"
					@click.stop="gotoOrder(item.order_id)">
					<view class="mr10">
						<image class="sup_img" :src="item.supplier.logo || '/static/default.png'" mode="aspectFill">
						</image>
					</view>
					<view class="flex-1">
						<view class="d-b-c pb14">
							<view class="item-dianpu">
								<view class="item-d-l mr10">
									<text class="gray3 f28 fb text-ellipsis" style="width: 245rpx;"
										v-if="item.supplier">{{ item.supplier.name }}</text>
								</view>
							</view>
							<view class="state">
								<text class="dominant f26">{{ item.state_text }}</text>
							</view>
						</view>
						<view class="order-head d-b-c">
							<view>
								<text class="shop-name flex-1">下单时间：{{ item.create_time }}</text>
							</view>
						</view>
						<!--多个商品显示-->
						<view class="product-list pr">
							<view class="o-a pr150">
								<view class="list d-s-c pr100">
									<view class="cover mr20" v-for="(img, num) in item.product" :key="num">
										<image :src="img.image ? img.image.file_path : ''" mode="aspectFit"></image>
										<view class="mt10 tc f24 text-ellipsis">{{ img.product_name }}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="order-bts">
							<block v-if="item.order_status.value == 10">
								<!-- 未支付取消订单 -->
								<button class="default" @click.stop="cancelOrder(item.order_id)" type="default"
									v-if="item.pay_status.value == 10&&item.order_source != 30">取消订单</button>
								<!-- 订单付款 -->
								<block v-if="item.pay_status.value == 10"><button class="theme-borderbtn fb"
										@click.stop="onPayOrder(item.order_id)">立即支付</button></block>
								<!-- 订单付款 -->
								<block v-if="item.pay_status.value == 10 && item.delivery_type == 40">
									<button class="theme-borderbtn fb"
										@click.stop="addOrder(item.order_id, item.supplier.shop_supplier_id)">加菜</button>
								</block>
							</block>
						</view>
					</view>
				</view>
				<view class="d-c-c d-c p30" v-if="listData.length == 0 && !loading">
					<image style="width: 268rpx;height: 263rpx;margin-top: 123rpx;" src="/static/no-order.png"
						mode="aspectFill"></image>
					<view class="f26 gray9">暂无记录</view>
					<view><button class="btn-normal" @click="gotoPage('/pages/index/index')">立即点单</button></view>
				</view>
				<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
			</view>
		</scroll-view>
		<!--核销二维码-->
		<Popup :show="isCodeImg" type="middle" @hidePopup="hideCodePopupFunc">
			<view class="ww100 p20 box-s-b">
				<image class="ww100" :src="codeImg" mode="widthFix"></image>
			</view>
		</Popup>
	</view>
</template>

<script>
	import Popup from '@/components/uni-popup.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	import {
		pay
	} from '@/common/pay.js';
	import utils from '@/common/utils.js';
	export default {
		components: {
			Popup,
			uniLoadMore
		},
		data() {
			return {
				checkedPay: [10, 20],
				order_type: 0,
				/*手机高度*/
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				/*状态选中*/
				state_active: 0,
				/*顶部刷新*/
				topRefresh: false,
				/*数据*/
				listData: [],
				/*数据类别*/
				dataType: 0,
				/*是否显示支付类别弹窗*/
				isPayPopup: false,
				/*订单id*/
				order_id: 0,
				/*最后一页码数*/
				last_page: 0,
				/*当前页面*/
				page: 1,
				/*每页条数*/
				list_rows: 10,
				/*有没有等多*/
				no_more: false,
				/*是否正在加载*/
				loading: true,
				/*是否显示核销二维码*/
				isCodeImg: false,
				codeImg: '',
				/*是否显示支付宝支付，只有在h5，非微信内打开才显示*/
				showAlipay: false,
				isfirst: false,
				statusBarHeight: 0,
				titleBarHeight: 0,
				delivery_type: 10
			};
		},
		computed: {
			/*加载中状态*/
			loadingType() {
				if (this.loading) {
					return 1;
				} else {
					if (this.listData.length != 0 && this.no_more) {
						return 2;
					} else {
						return 0;
					}
				}
			}
		},
		onReady(e) {
			this.init();
		},
		mounted() {},
		onShow() {
			this.initData();
			this.getData();
		},
		methods: {
			initData() {
				let self = this;
				self.page = 1;
				self.listData = [];
				self.no_more = false;
			},
			/*初始化*/
			init() {
				let self = this;
				uni.getSystemInfo({
					success(res) {
						self.phoneHeight = res.windowHeight;
						// 计算组件的高度
						let view = uni
							.createSelectorQuery()
							.in(self)
							.select('.top-tabbar');
						view.boundingClientRect(data => {
							let h = self.phoneHeight - data.height;
							self.scrollviewHigh = h;
						}).exec();
					}
				});
			},
			ordertypeFunc(e) {
				let self = this;
				if (self.loading) {
					return;
				}
				if (self.order_type != e && e == 0) {
					self.page = 1;
					self.loading = true;
					this.order_type = e;
					self.listData = [];
					this.delivery_type = 10;
					this.dataType = 0;
					self.getData();
				} else if (self.order_type != e && e == 1) {
					self.page = 1;
					self.loading = true;
					self.listData = [];
					this.order_type = e;
					this.delivery_type = 40;
					this.dataType = 0;
					self.getData();
				}
			},
			/*状态切换*/
			orderStateFunc(e) {
				let self = this;
				if (self.loading) {
					return;
				}
				if (self.delivery_type != e) {
					self.page = 1;
					self.loading = true;
					self.listData = [];
					self.delivery_type = e;
					self.getData();
				}
			},
			/*可滚动视图区域到底触发*/
			scrolltolowerFunc() {
				let self = this;
				if (self.no_more) {
					return;
				}
				self.page++;
				if (self.page <= self.last_page) {
					self.getData();
				} else {
					self.no_more = true;
				}
			},

			/*获取数据*/
			getData() {
				if (!this.getUserId()) {
					this.loading = false;
					return;
				}
				let self = this;
				self.loading = true;
				self._get(
					'user.order/lists', {
						dataType: self.dataType,
						page: self.page,
						list_rows: self.list_rows,
						order_type: self.order_type,
						delivery_type: self.delivery_type
					},
					function(res) {
						self.loading = false;
						self.listData = self.listData.concat(res.data.list.data);
						self.last_page = res.data.list.last_page;
						if (res.data.list.last_page <= 1) {
							self.no_more = true;
						} else {
							self.no_more = false;
						}
						self.isfirst = true;
					}
				);
			},
			/*跳转页面*/
			gotoOrder(e) {
				this.gotoPage('/pages/order/order-detail?order_id=' + e);
			},

			/*支付方式选择*/
			onPayOrder(orderId) {
				let self = this;
				let pages = '/pages/order/cashier?order_type=10&order_id=' + orderId;
				self.gotoPage(pages, 'reLaunch');
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
									self.listData = [];
									self.getData();
								}
							);
						} else {
							uni.showToast({
								title: '取消收货',
								duration: 1000,
								icon: 'none'
							});
						}
					}
				});
			},

			/*取消订单*/
			cancelOrder(e) {
				let self = this;
				let order_id = e;
				uni.showModal({
					title: '提示',
					content: '您确定要取消吗?',
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
									self.listData = [];
									self.getData();
								}
							);
						}
					}
				});
			},
			addOrder(order_id, store_id) {
				uni.setStorageSync('selectedId', store_id);
				this.gotoPage('pages/product/list/store?order_id=' + order_id);
			},
			/*去评论*/
			gotoEvaluate(e) {
				uni.navigateTo({
					url: '/pages/order/evaluate/evaluate?order_id=' + e
				});
			},

			/*核销码*/
			onQRCode(e) {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				let order_id = e;
				let source = self.getPlatform();
				self._get(
					'user.order/qrcode', {
						order_id: order_id,
						source: source
					},
					function(res) {
						uni.hideLoading();
						self.isCodeImg = true;
						self.codeImg = res.data.qrcode;
					}
				);
			},
			/*关闭核销二维码*/
			hideCodePopupFunc() {
				this.isCodeImg = false;
			},

			/*分享拼团*/
			gotoAssembleShare(e) {
				uni.navigateTo({
					url: '/pages/plus/assemble/fight-group-detail/fight-group-detail?assemble_bill_id=' + e
				});
			},
			gohome() {
				this.gotoPage('/pages/index/index');
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f2f2f2;
	}

	.top-tabbar {
		position: sticky;
		top: 0;
		left: 0;
		border-bottom: none;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
		flex-direction: column;
		position: relative;
		z-index: 9;
	}

	.order-list .order-head .state-text {
		padding: 10rpx 12rpx;
		margin-right: 21rpx;
		border-radius: 4rpx;
		background: #ffe7e4;
		font-size: 22rpx;
		@include font_color('font_color');
	}

	.shop-name {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #28282850;
	}

	.order-list {
		padding: 28rpx 30rpx;
	}

	.order-list .item {
		margin-bottom: 38rpx;
		padding: 26rpx;
		background: #ffffff;
		opacity: 1;
		border-radius: 10px;
	}

	.order-list .product-list,
	.order-list .one-product {
		padding: 30rpx 0 27rpx 0;
	}

	.one-product .pro-info {
		padding: 0 21rpx 0 37rpx;
		display: -webkit-box;
		width: 361rpx;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 26rpx;
		color: #333333;
	}

	.order-list .cover {
		height: 100%;
		text-align: start;
		font-size: 24rpx;
	}

	.order-list .cover image {
		width: 148rpx;
		height: 148rpx;
		border-radius: 8rpx;
	}

	.order-list .total-count {
		padding-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
	}

	.order-list .total-count .price {
		color: #ff5800;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 800;
	}

	.total-count .count {
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 28rpx;
		color: #282828;
		opacity: 0.5;
	}

	.order-list .product-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 544rpx;
		border-top: 2rpx solid #eeeeee;
		border-bottom: 2rpx solid #eeeeee;
		margin: 20rpx 0;
	}
	.order-list .product-list .list{
		overflow-x: auto;
	}
	.product-list .total-count {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 255, 255, 0.9);
	}

	.product-list .total-count .left-shadow {
		position: absolute;
		top: 0;
		bottom: 0;
		left: -24rpx;
		width: 24rpx;
		overflow: hidden;
	}

	.product-list .total-count .left-shadow::after {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 24rpx;
		right: -12rpx;
		display: block;
		content: '';
		background-image: radial-gradient(rgba(0, 0, 0, 0.2) 10%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0) 80%);
	}

	.order-list .order-bts {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.order-list .order-bts button {
		margin: 0;
		padding: 0 27rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-left: 20rpx;
		font-size: 28rpx;
		border: 2rpx solid;
		border-radius: 30px;
		background: #ffffff;
		white-space: nowrap;
		font-family: PingFang SC;
		box-sizing: border-box;
	}

	.order-list .order-bts button::after {
		display: none;
	}

	.order-list .order-bts button.default {
		border: 2rpx solid #d2d2d2;
		font-size: 28rpx;
		color: #d2d2d2;
	}

	.order-list .order-bts button.btn-red {
		@include background_color('background_color');
		font-size: 28rpx;
		font-family: PingFang SC;
		@include text_color('text_color');
		border: 1rpx solid;
		@include border_color('border_color');
	}

	.buy-checkout {
		width: 100%;
	}

	.buy-checkout .item {
		min-height: 50rpx;
		line-height: 50rpx;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
	}

	.buy-checkout .iconfont.icon-weixin {
		color: #04be01;
		font-size: 50rpx;
	}

	.buy-checkout .iconfont.icon-yue {
		color: #f0de7c;
		font-size: 50rpx;
	}

	.buy-checkout .item.active .iconfont.icon-xuanze {
		color: #04be01;
	}

	.item-dianpu {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		line-height: 30rpx;
	}

	.item-dianpu .icon-jiantou {
		font-size: 24rpx;
		color: #333333;
	}

	.item-d-l {
		display: flex;
	}

	.icon-dianpu1 {
		margin-right: 20rpx;
		color: #333333;
		font-size: 32rpx;
	}

	.bg-grayf2 {
		padding: 8rpx;
		background-color: #f2f2f2;
		border-radius: 8rpx;
	}

	.tab-item-top {
		width: 187rpx;
		height: 60rpx;
		color: #282828;
		font-weight: 800;
		font-size: 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2rpx solid;
		@include border_color('border_color');
		box-sizing: border-box;
	}

	.tab-item {
		font-size: 28rpx;
		font-family: PingFang SC;
		line-height: 42rpx;
		color: #282828;
		opacity: 0.8;
	}

	.tab-item.active {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 42rpx;
		color: #282828;
	}

	.tab-item-top.left {
		border-radius: 30rpx 0px 0px 30rpx;
	}

	.tab-item-top.right {
		border-radius: 0px 30rpx 30rpx 0px;
	}

	.tab-item-top.active {
		@include background_color('background_color');
		@include text_color('text_color');
	}

	.delivery_type {
		width: 120rpx;
		height: 50rpx;
		@include font_color('font_color');
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 8rpx;
		border: 1rpx solid;
		@include border_color('border_color');
		box-sizing: border-box;
		background-color: #ffffff;
	}

	.delivery_type.active {
		@include background_color('background_color');
		color: #ffffff;
	}

	.head_top {
		position: relative;
		width: 100%;
		height: 30px;
		line-height: 30px;
		color: #ffffff;
	}

	.sup_img {
		width: 82rpx;
		height: 82rpx;
		background: rgba(0, 0, 0, 0);
		opacity: 1;
		border-radius: 8rpx;
	}

	.btn-normal {
		width: 302rpx;
		height: 93rpx;
		border-radius: 10rpx;
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 36rpx;
		font-weight: 600;
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
			background-color: #ffffff;
			border-radius: 15rpx 15rpx 0rpx 0rpx;

			.icon.icon-guanbi {
				background: #dedede;
				border-radius: 50%;
				color: #ffffff;
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
		border-bottom: 1rpx solid #eeeeee;

		.icon-box {
			width: 38rpx;
			height: 38rpx;
			border: 1rpx solid #dddddd;
			border-radius: 50%;

			.icon-tijiaochenggong {
				font-size: 26rpx;
				color: #ffffff;
			}
		}

		.icon-box.border {
			border-radius: 50%;
		}
	}

	.cashier-item.active .icon-box {
		border: 1rpx solid #72deed;
		@include border_color('border_color');
		@include background_color('background_color');
	}

	.pay-btn {
		width: 750rpx;
		height: 96rpx;
		font-size: 32rpx;
		color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		bottom: 0;
		@include background_color('background_color');
	}
</style>