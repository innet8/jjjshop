<template>
	<view class="diy-bargainProduct" v-if="itemData.data.product_list.length>0">
		<view class="bargainProduct-head d-b-c">
			<view class="left d-s-c">
				<view class="name color_bargain d-c-c">
					活动砍价
				</view>
				<view class="datetime d-s-c ml20">
					<Countdown :config="countdownConfig"></Countdown>
				</view>
			</view>
			<view class="right" @click="gotoList">
				<text class="f26 color_bargain">更多</text>
				<text class="iconfont icon-jiantou" style="font-size: 22rpx;margin-left: 4rpx;color: #6450FF;"></text>
			</view>
		</view>
		<view class="bargainProduct-body">
			<scroll-view scroll-x="true">
				<view class="product-list column__3">
					<view class="product-item" v-for="(item, index) in itemData.data.product_list" :key="index"  @click="gotoDetail(item.bargain_product_id)">
						<!-- 两列三列 -->
						<template>
							<view class="p20 gray9 f24">已抢{{item.product.product_sales}}件</view>
							<view class="product-cover">
								<image :src="item.product.file_path" mode="aspectFit"></image>
							</view>
							<view class="product-info p-0-10">
								<view v-if="itemData.style.show.productName == '1'" class="product-title">{{ item.product.product_name }}</view>
								<view class="price d-c-c p-20-0 f20">
									<view v-if="itemData.style.show.floorPrice == '1'" class="redF6">
										<text>¥</text>
										<text class="f32 fb">{{ item.bargain_price }}</text>
									</view>
									<view class="ml10 gray9 text-d-line" v-if="itemData.style.show.originalPrice == '1'">
										<text class="f20">¥</text>
										<text class="f24">{{ item.product_price }}</text>
									</view>
								</view>
								<view>
									<view class="bargain_btn">立即砍价</view>
								</view>
							</view>
						</template>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Countdown from '@/components/countdown/countdown.vue';
	export default {
		components: {
			Countdown
		},
		data() {
			return {
				/*倒计时配置*/
				countdownConfig: {
					/*开始时间*/
					startstamp: 0,
					/*结束时间*/
					endstamp: 0,
					/*标题*/
					title: ' '
				}
			};
		},
		props: ['itemData'],
		created() {
			this.countdownConfig.endstamp = this.itemData.data.end_time;
			this.countdownConfig.startstamp = this.itemData.data.start_time;
		},
		methods: {
			scroll(e) {},

			/*跳转列表*/
			gotoList() {
				let url = '/pages/plus/bargain/list/list';
				this.gotoPage(url);
			},

			/*跳转详情*/
			gotoDetail(e) {
				let url = '/pages/plus/bargain/detail/detail?bargain_product_id=' + e;
				this.gotoPage(url);
			}
		}
	};
</script>

<style>
	.color_bargain {
		color: #4B30FF;
	}

	.diy-bargainProduct {
		margin: 20rpx;
		border-radius: 12rpx;
		padding: 0 24rpx 24rpx;
		background: #EBE8FF;
	}

	.bargainProduct-head {
		height: 100rpx;
	}

	.bargainProduct-head .name {
		font-size: 32rpx;
		font-weight: bold;
	}

	.bargainProduct-head .datetime::v-deep>span {
		display: inline-block;
	}

	.bargainProduct-head .datetime::v-deep text {
		font-size: 24rpx;
		color: #4B30FF;
	}

	.bargainProduct-head .datetime::v-deep .box {
		padding: 4rpx 10rpx;
		font-size: 22rpx;
		background: #FFFFFF;
		color: #4B30FF;
	}

	.diy-bargainProduct .product-list image {
		width: 100%;
		height: 100%;
	}

	.diy-bargainProduct .product-list .product-title {
		margin-top: 32rpx;
		height: 40rpx;
		line-height: 40rpx;
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		font-size: 30rpx;
	}

	.diy-bargainProduct .product-list .price {
		height: 24rpx;
		line-height: 24rpx;
	}

	.diy-bargainProduct .product-list.column__3 {
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-start;
	}

	.diy-bargainProduct .column__3 .product-item {
		width: 300rpx;
		margin-right: 20rpx;
		background: #ffffff;
		border-radius: 12rpx;
		flex-shrink: 0;
	}

	.diy-bargainProduct .column__3 .product-cover {
		width: 170rpx;
		height: 170rpx;
		margin: 0 auto;
	}

	.bargain_btn {
		width: 175rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		background: linear-gradient(90deg, #7776FF 0%, #762CF1 100%);
		border-radius: 20rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		margin: 0 auto;
		margin-bottom: 36rpx;
	}
</style>
