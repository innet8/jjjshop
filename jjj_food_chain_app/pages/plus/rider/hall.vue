<template>
	<view class="" :data-theme='theme()' :class="theme() || ''">
		<view class="header">
			<view class="tc flex-1" @click="istype(0)"><text
					:class="type==0?'header_item active':'header_item'">待接单</text></view>
			<view class="tc flex-1" @click="istype(1)"><text
					:class="type==1?'header_item active':'header_item'">今日接单</text></view>
		</view>
		<view>
			<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'"
				lower-threshold="50" @scrolltolower="scrolltolowerFunc" refresher-enabled="true"
				@refresherrefresh="onRefresh" @refresherrestore="onRestore" :refresher-triggered="triggered"
				:refresher-threshold="50" @refresherabort="onAbort" @refresherpulling="onPulling"
				refresher-background="#f2f2f2">
				<view class="hall_list">
					<view class="hall_item p30" v-for="(item,index) in dataList" :key="index"
						@click="gotoPage('/pages/plus/rider/order/order?order_id='+item.order_id+'&type='+type)">
						<view class="d-b-c mb-20">
							<view>{{item.create_time}}</view>
							<view class="f26">配送费用: <text class="red"> {{item.take_fee}}元</text></view>
						</view>
						<view class="d-b-c ">
							<scroll-view class="scroll_x" scroll-x="true">
								<view class="d-s-c">
									<view class="produc_imgs" v-for="(img_item,image_index) in item.product"
										:key="image_index">
										<image class="product_img" :src="img_item.image.file_path" mode="scaleToFill">
										</image>
									</view>
								</view>
							</scroll-view>
							<view class="mid_btn" @click.stop="receiveOrder(item)" v-if="type==0">接单</view>
							<view class="mid_btn" @click.stop="orderReceipt(item.order_id)"
								v-if="type==1&&item.receipt_status.value==10">确认送达</view>
							<view class="mid_btn btn_close" v-if="type==1&&item.receipt_status.value==20">已送达</view>
						</view>
						<view class="ww100 tr f26"><text class="icon iconfont icon-002dianhua mr10"
								@click.stop="callPhone(item.address.phone)"></text>客户期望送达时间：<text
								class="blue">{{item.mealtime}}</text></view>
						<view class="d-b-c f26 pt10">
							<view class="address_text f26">送货地址：{{item.address.detail+item.address.address}}</view>

						</view>

					</view>
					<!-- 没有记录 -->
					<view class="d-c-c p30" v-if="dataList.length==0 && !loadding">
						<text class="iconfont icon-wushuju"></text>
						<text class="cont">亲，已经没有更多了</text>
					</view>
					<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
				</view>
			</scroll-view>
		</view>

	</view>

</template>

<script>
	import uniLoadMore from "@/components/uni-load-more.vue";
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				dataList: [],
				take_fee: '',
				/*底部加载*/
				loadding: true,
				/*没有更多*/
				no_more: false,
				/*当前页面*/
				page: 1,
				last_page: 0,
				type: 0,
				scrollviewHigh: 0,
				phoneHeight: 0,
				_freshing: false,
				triggered: false,

			}
		},
		computed: {
			/*加载中状态*/
			loadingType() {
				if (this.loadding) {
					return 1;
				} else {
					if (this.dataList.length != 0 && this.no_more) {
						return 2;
					} else {
						return 0;
					}
				}
			}
		},
		onLoad() {
			this._freshing = false;
			this.triggered = true;
			this.restoreData();
			this.getData();
		},
		mounted() {
			this.init();
		},
		methods: {
			restoreData() {
				this.dataList = [];
				this.page = 1;
				this.no_more = false;
				this.loadding = true;
			},
			istype(n) {
				if (n == this.type || this.loadding) {
					return
				}
				this.type = n;
				this.restoreData();
				this.getData();
			},
			init() {
				let self = this;
				uni.getSystemInfo({
					success(res) {
						self.phoneHeight = res.windowHeight;
						// 计算组件的高度
						let view = uni.createSelectorQuery().select('.header');
						view.boundingClientRect(data => {
							let h = self.phoneHeight - data.height;
							self.scrollviewHigh = h;
						}).exec();
					}
				});
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
			onPulling(e) {

			},
			onRefresh() {
				console.log('onRefresh')
				if (this._freshing) {
					return
				}
				this._freshing = true;
				this.restoreData();
				this.getData();
			},
			onRestore() {
				console.log('onRestore')
				this.triggered = 'restore'; // 需要重置
			},
			onAbort() {
				console.log('onAbort')
			},
			getData() {
				if (this.type == 0) {
					this.getLists()
				} else if (this.type == 1) {
					this.getDriver()
				}
			},
			getDriver() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self._post('plus.driver.TakeOrder/driverList', {
					type: 1
				}, function(res) {
					self.last_page = res.data.list.last_page;
					if (res.data.list.last_page <= 1) {
						self.no_more = true;
					} else {
						self.no_more = false;
					}
					self.take_fee = res.data.take_fee;
					self.dataList = self.dataList.concat(res.data.list.data);
					uni.hideLoading();
					self.loadding = false;
					self.triggered = false;
					self._freshing = false;
					console.log('over')
				});
			},
			/*获取数据*/
			getLists() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self._post('plus.driver.TakeOrder/lists', {

				}, function(res) {
					self.last_page = res.data.list.last_page;
					if (res.data.list.last_page <= 1) {
						self.no_more = true;
					} else {
						self.no_more = false;
					}
					self.take_fee = res.data.take_fee;
					self.dataList = self.dataList.concat(res.data.list.data);
					uni.hideLoading();
					self.triggered = false;
					self._freshing = false;
					self.loadding = false;
					console.log('over')
				});
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
							let n = self.dataList.indexOf(e)
							self.dataList.splice(n, 1)
						}
					})
					uni.hideLoading();
					self.loadding = false;
				});
			},
			/*确认收货*/
			orderReceipt(order_id) {
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
									order_id: order_id
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
		}
	}
</script>

<style lang="scss">
	.header {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
	}

	.header_item {
		color: #999999;
		font-size: 32rpx;
		padding: 24rpx 18rpx;
		border-bottom: 6rpx solid #FFFFFF;
	}

	.header .active {
		color: #000000;
		border-bottom: 6rpx solid #f5a654;
		@include border_color('border_color');
	}

	.hall_list {
		padding: 30rpx;
	}

	.hall_item {
		background-color: #FFFFFF;
		border-radius: 16rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
	}

	.hall_item .icon-002dianhua {
		background-color: #28a5ff;
		border-radius: 50%;
		color: #FFFFFF;
		font-size: 22rpx;
		padding: 6rpx;
	}

	.produc_imgs {
		flex-shrink: 0;
		padding-right: 10rpx;
	}

	.product_img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 8rpx;
	}

	.scroll_x {
		width: 78%;
	}

	.mid_btn {
		// background-color: #F68F2A;
		@include background_color('background_color');
		color: #FFFFFF;
		text-align: center;
		width: 120rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30rpx;
	}

	.address_text {
		/* width: 65%; */
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.hall_head {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn_close {
		background-color: #c3c3c3 !important;
	}
</style>
