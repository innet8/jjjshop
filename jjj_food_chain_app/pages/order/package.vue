<template>
	<view class="o-h pack_box pr" :data-theme='theme()' :class="theme() || ''">
		<image src="/static/bg-package.png" mode="" class="bg-image"></image>
		<view class="order-list pr">
			<view class="item" v-for="(item, index) in listData" :key="index">
				<view class="d-b-c bg-red item-top">
					<view class="item-dianpu">
						<view class="white f34 mb6 fb text-ellipsis">{{item.name}}</view>
						<view class="shop-name flex-1">
							{{item.money*1}}元最低可抵{{item.coupon_money*1}}元/共{{item.coupon_num}}张券
						</view>
					</view>
					<view class="buy-btn d-b-c" @click="onPayOrder(item.package_id)">
						<view class="f22 red left pl8 flex-1 box-s-b">￥<text class="f32 fb ">{{ item.money }}</text>
						</view>
						<view class="f22 right f-s-0 tc right" style="width: 108rpx;">立即抢</view>
					</view>
				</view>
				<!--多个商品显示-->
				<view class="product-list pr">
					<view class="o-a">
						<view class="list d-s-c pr100">
							<view class="cover carditem mr20" v-for="(cp, num) in item.coupon_list" :key="num">
								<view class="border-b-dash pt22 pb14">
									<view class="card-img">
										<image class="bg-cardimage" src="/static/pakege-bgcard.png"
											mode="aspectFill"></image>
										<view class="cardname">
											<view class="title" v-if="cp.coupon_type.value==20">折扣券</view>
											<view class="title" v-if="cp.coupon_type.value==10">满减券</view>
											<view class="num">x{{cp.coupon_num}}</view>
										</view>
									</view>
								</view>
								<view class="p-0-16 pt10 pr box-s-b">
									<image src="/static/getcopun.png" class="pagekg-bg"></image>
									<view class="f18 fb" v-if="cp.coupon_type.value==20"><text
											class="f32">{{cp.discount}}</text>折</view>
									<view class="f18 fb" v-else>￥<text class="f32">{{cp.reduce_price}}</text></view>
									<view class="f24 ">{{cp.min_price==0?'无门槛使用':'满'+cp.min_price*1+'元可用'}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="d-c-c d-c p30" v-if="listData.length == 0 && !loading">
				<view class="f26 gray9">暂无记录</view>
			</view>
			<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				/*是否加载完成*/
				loading: true,
				/*数据列表*/
				/*最后一页码数*/
				last_page: 0,
				/*当前页面*/
				page: 1,
				/*每页条数*/
				list_rows: 10,
				no_more: false,
				listData: [],
				package_id: 0
			}
		},
		onShow() {
			this.page = 1;
			this.listData = []
			this.getData();
		},
		onReachBottom() {
			let self = this;
			if (self.page < self.last_page) {
				self.page++;
				self.getData();
			}
			self.no_more = true;
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
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				self.loading = true;
				self._get(
					'plus.package.Package/index', {
						page: self.page || 1,
						list_rows: self.list_rows
					},
					function(res) {
						self.loading = false;
						self.listData = self.listData.concat(res.data.list.data);
						self.last_page = res.data.list.last_page;
						if (res.data.list.last_page <= 1) {
							self.no_more = true;
						}
					}
				);
			},
			/*支付方式选择*/
			onPayOrder(id) {
				let self = this;
				let package_id = id;
				uni.showLoading({
					title: '加载中'
				});
				self._post(
					'plus.package.Package/buy', {
						package_id: package_id,
						pay_source: self.getPlatform()
					},
					function(result) {
						uni.hideLoading();
						let pages = '/pages/order/cashier?order_type=50&order_id=' + result.data.order_id;
						self.gotoPage(pages);
					}
				);
			}
		}
	}
</script>

<style lang="scss">
	.pack_box {
		padding-top: 205rpx;
		padding: 0 32rpx;
	}

	.order-list {
		padding-top: 204rpx;
	}

	page {
		background-color: #f2f2f2;
	}

	.shop-name {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #ffffff;
		letter-spacing: 1rpx;
	}

	.order-list .item {
		margin-bottom: 38rpx;
		background: #ffffff;
		opacity: 1;
		border-radius: 25rpx;
	}

	.order-list .product-list {
		padding: 17rpx 0 27rpx 0;
	}

	.order-list .cover {
		border-radius: 15rpx;
		margin-left: 23rpx;
		text-align: start;
		font-size: 24rpx;
		background-color: #f5f5f5;
	}

	.order-list .cover .card-img {
		position: relative;
		width: 178rpx;
		height: 142rpx;
		border-radius: 12rpx;
		overflow: hidden;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.order-list .cover .card-img .bg-cardimage {
		width: 178rpx;
		height: 142rpx;
		position: absolute;
		left: 0;
		top: 0;
	}

	.cardname {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-top: 20rpx;
		z-index: 1;
	}

	.order-list .cover .card-img {
		margin: 0 auto;
		position: relative;
	}

	.order-list .cover .card-img .title {
		font-size: 48rpx;
		color: #FFFFFF;
		font-weight: 500;
	}

	.order-list .cover .card-img .num {
		font-size: 22rpx;
		color: #FFFFFF;
	}

	.order-list .product-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.order-list .product-list .list{
		overflow-x: auto;
	}
	.item-dianpu {
		font-size: 24rpx;
	}

	.item-top {
		border-radius: 25rpx 25rpx 0 0;
		padding: 20rpx;
		height: 118rpx;
		box-sizing: border-box;
	}

	.buy-btn {
		font-size: 24rpx;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 52rpx;
		line-height: 52rpx;
		width: 243rpx;
		background-image: url(/static/packgenum.png);
		background-size: 243rpx 52rpx;
		background-position: 0 0;
	}

	.buy-btn .right {
		width: 54rpx;
		text-align: right;
		padding-right: 23rpx;
		box-sizing: border-box;
	}

	.buy-btn .icon-jiantou {
		font-size: 22rpx;
		color: #FFFFFF;
		margin: 0 6rpx;
	}

	.pl8 {
		padding-left: 8rpx;
	}

	.p-0-8 {
		padding: 0 8rpx;
	}

	.bg-image {
		position: absolute;
		width: 750rpx;
		height: 248rpx;
		z-index: 0;
		top: 0;
		left: 0;
	}

	.carditem {
		width: 202rpx;
		height: 277rpx;
	}

	.red {
		color: #FC1F0A;
	}

	.bg-red {
		background-color: #FC1F0A;
	}

	.pagekg-bg {
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 49rpx;
		height: 30rpx;
		right: 0;
	}

	.f-s-0 {
		flex-shrink: 0;
	}
</style>