<template>
	<view :data-theme='theme()' :class="theme() || ''">
		<view class="top-tabbar">
			<view class="d-a-c ww100 mt24">
				<view :class="dataType == 1 ? 'tab-item active' : 'tab-item'" @click="orderStateFunc(1)">进行中
				</view>
				<view :class="dataType == 2 ? 'tab-item active' : 'tab-item'" @click="orderStateFunc(2)">已完成
				</view>
			</view>
		</view>
		<!--列表-->
		<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'" lower-threshold="50"
			@scrolltolower="scrolltolowerFunc">
			<view class="order-list">
				<view class="item d-b-s" v-for="(item, index) in listData" :key="index"
					@click.top="gotoOrder(item.order_id)">
					<view class="flex-1">
						<view class="d-b-c pb14">
							<view class="state">
								<text class="dominant f26">{{ item.state_text }}</text>
							</view>
						</view>
						<view class="order-head d-b-c">
							<view>
								<text class="shop-name flex-1">下单时间：{{ item.create_time }}</text>
							</view>
						</view>
						<view class="product-list pr">
							<view class="o-a">
								<view class="list d-s-c pr100">
									<view class="cover mr20">
										<image :src="item.file_path" mode="aspectFit"></image>
										<view class="mt10 tc f24 text-ellipsis">{{item.product_name}}</view>
									</view>
								</view>
							</view>
							<view class="total-count">
								<view class="price tr">
									<view>{{item.points_num}}{{points_name}}</view>
									<view v-if="item.pay_price!=0">¥{{ item.pay_price}}</view>
								</view>
								<view class="count">共{{ item.total_num }}件</view>
							</view>
						</view>
						<view class="order-bts"> 
							<!-- 确认收货 -->
							<block
								v-if="item.order_status.value != 20&&item.delivery_status.value == 20 && item.receipt_status.value == 10">
								<button @click.stop="orderReceipt(item.order_id)" class="theme-borderbtn">确认收货</button>
							</block>
						</view>
					</view>
				</view>
				<view class="d-c-c d-c p30" v-if="listData.length == 0 && !loading">
					<image style="width: 268rpx;height: 263rpx;margin-top: 123rpx;" src="/static/no-order.png"
						mode="aspectFill">
					</image>
					<view class="f26 gray9">暂无记录</view>
				</view>
				<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	import utils from '@/common/utils.js';
	export default {
		components:{
			uniLoadMore
		},
		data() {
			return {
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
				dataType: 1,
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
				isfirst: false,
				statusBarHeight: 0,
				titleBarHeight: 0,
				points_name: ''
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
		onLoad(e) {},
		mounted() {
			this.init();
		},
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
						let view = uni.createSelectorQuery().in(self).select('.top-tabbar');
						view.boundingClientRect(data => {
							let h = self.phoneHeight - data.height;
							self.scrollviewHigh = h;
						}).exec();
					}
				});
			},
			/*状态切换*/
			orderStateFunc(e) {
				let self = this;
				if (self.loading) {
					return
				}
				if (self.dataType != e) {
					self.page = 1;
					self.loading = true;
					self.listData = [];
					self.dataType = e;
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
				let self = this;
				self.loading = true;
				self._get(
					'plus.points.order/lists', {
						page: self.page,
						list_rows: self.list_rows,
						dataType: self.dataType,
					},
					function(res) {
						self.loading = false;
						self.points_name = res.data.points_name;
						self.listData = self.listData.concat(res.data.list.data);
						self.last_page = res.data.list.last_page;
						if (res.data.list.last_page <= 1) {
							self.no_more = true;
						} else {
							self.no_more = false;
						}
						//#ifdef H5
						if (!self.isWeixin() && res.data.h5_alipay) {
							self.showAlipay = true;
						}
						//#endif
						self.isfirst = true;
					}
				);
			},

			/*跳转页面*/
			gotoOrder(e) {
				this.gotoPage('/pages/plus/points/order/detail?order_id=' + e);
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
								'plus.points.order/receipt', {
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
			addOrder(order_id, store_id) {
				uni.setStorageSync('selectedId', store_id);
				this.gotoPage('pages/product/list/store?order_id=' + order_id);
			},
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f2f2f2;
	}

	.top-tabbar {
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
		background: #FFE7E4;
		font-size: 22rpx;
		@include font_color("font_color");
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
		font-size: 24rpx
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
		color: #FF5800;
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
		border-top: 2rpx solid #EEEEEE;
		border-bottom: 2rpx solid #EEEEEE;
		margin: 20rpx 0;
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
		border: 2rpx solid #D2D2D2;
		font-size: 28rpx;
		color: #D2D2D2;
	}

	.order-list .order-bts button.btn-red {
		@include background_color("background_color");
		font-size: 28rpx;
		font-family: PingFang SC;
		@include text_color("text_color");
		border: 1rpx solid;
		@include border_color("border_color");
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
		background-color: #F2F2F2;
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
		@include border_color("border_color");
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
		@include background_color("background_color");
		@include text_color("text_color");
	}

	.dataType {
		width: 120rpx;
		height: 50rpx;
		@include font_color("font_color");
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 8rpx;
		border: 1rpx solid;
		@include border_color("border_color");
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.dataType.active {
		@include background_color("background_color");
		color: #FFFFFF;
	}

	.head_top {
		position: relative;
		width: 100%;
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
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
</style>
