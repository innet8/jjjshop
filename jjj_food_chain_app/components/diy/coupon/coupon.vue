<template>
	<view class="diy-coupon" :style="{ background: itemData.style.background, padding: itemData.style.paddingTop + 'px 0' }">
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" circular :interval="interval" :duration="duration">
			<swiper-item v-for="(item, index) in listData" :key="index">
				<view class="coupon-item" :class="'bg-' + item.color.text">
					<view class="side-line left-side-line"><text class="round" v-for="(round, num) in 8" :key="num"></text></view>
					<view class="side-line right-side-line"><text class="round" v-for="(round, num) in 8" :key="num"></text></view>
					<view class="left-type d-c-c">{{ item.coupon_type.text }}</view>
					<view class="center-content pr">
						<view class="content-top">
							<template v-if="item.coupon_type.value == 10">
								<text class="f22">￥</text>
								<text class="f50 fb">{{ item.reduce_price }}</text>
								<template v-if="item.total_num >= 0">
									<text class="ml10">仅剩{{ item.total_num }}张</text>
								</template>
								<template v-else>
									<text class="ml10">不限数量</text>
								</template>
							</template>
							<template v-if="item.coupon_type.value == 20">
								<text class="f50 fb">{{ item.discount }}</text>
								<text>折</text>
							</template>
						</view>
						<view class="content-bottom">
							<text class="f24">{{ item.name }}</text>
						</view>
						<view class="content-datatime">
							<template v-if="item.expire_type == 20">
								有效期：{{ item.start_time.text }} 至 {{ item.end_time.text }}
							</template>
							<template v-if="item.expire_type == 10">
								有效期：领取后{{ item.expire_day }}天有效
							</template>
						</view>
					</view>
					<!--领取-->
					<view v-if="item.state.value == 1" class="right-receive d-c-c" @click="receiveCoupon(index)">
						立即领取
					</view>
					<view v-else class="right-receive no-receive d-c-c">
						{{ item.state.text }}
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/*是否显示点*/
				indicatorDots: false,
				/*是否自动*/
				autoplay: true,
				/*切换时间*/
				interval: 5000,
				/*动画过渡时间*/
				duration: 1000,
				/*数据列表*/
				listData: []
			};
		},
		props: ['itemData'],
		created() {
			this.listData = this.itemData.data;
		},
		methods: {
			scroll(e) {},
			/**
			 * 领取优惠券
			 */
			receiveCoupon: function(index) {
				let self = this;
				let item = self.listData[index];
				if (item.state.value == 0) {
					return false;
				}
				self._post(
					'user.coupon/receive', {
						coupon_id: item.coupon_id
					},
					function(result) {
						uni.showToast({
							title: '领取成功',
							icon: 'success',
							mask: true,
							duration: 2000
						});
						item.state.value = 0;
						item.state.text = '已领取';
					}
				);
			}
		}
	};
</script>

<style>
	.diy-coupon {
		margin: 20rpx;
	}

	.diy-coupon .swiper {
		width: 750rpx;
		height: 168rpx;
	}

	.diy-coupon .coupon-item {
		width: 710rpx;
		height: 168rpx;
		align-items: stretch;
		align-content: stretch;
		color: #ffffff;
	}

	.diy-coupon .coupon-item.bg-red {
		background: #e62423;
	}

	.diy-coupon .coupon-item.bg-blue {
		background: #178ed9;
	}

	.diy-coupon .coupon-item.bg-yellow {
		background: #f4a50b;
	}

	.diy-coupon .coupon-item.bg-violet {
		background: #ab0bf6;
	}

	.diy-coupon .coupon-item .left-type {
		padding: 0 30rpx 0 40rpx;
		width: 40rpx;
		font-size: 40rpx;
		line-height: 40rpx;
		text-align: center;
		font-weight: bold;
		border-right: 4rpx dashed rgba(255, 255, 255, .4);
	}

	.diy-coupon .left-side-line {
		position: absolute;
		width: 20rpx;
		top: 0;
		left: -15rpx;
		overflow: hidden;
	}

	.diy-coupon .right-side-line {
		position: absolute;
		width: 20rpx;
		top: 0;
		right: -15rpx;
		overflow: hidden;
	}

	.diy-coupon .side-line .round {
		display: block;
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		margin: 4rpx 0;
		background: #ffffff;
	}

	.diy-coupon .center-content::before,
	.diy-coupon .center-content::after {
		position: absolute;
		display: block;
		content: '';
		width: 30rpx;
		height: 15rpx;
		background: #FFFFFF;
	}

	.diy-coupon .center-content::before {
		top: 0;
		right: -16rpx;
		border-radius: 0 0 15rpx 15rpx;
	}

	.diy-coupon .center-content::after {
		bottom: 0;
		right: -16rpx;
		border-radius: 15rpx 15rpx 0 0;
	}

	.diy-coupon .coupon-item .center-content {
		padding: 20rpx 40rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		align-items: flex-start;
		flex: 1;
	}

	.diy-coupon .coupon-item .center-content .content-top {
		height: 50rpx;
		line-height: 50rpx;
	}

	.diy-coupon .coupon-item .center-content .content-datatime {
		padding: 4rpx 10rpx;
		border-radius: 30rpx;
		font-size: 20rpx;
		background: rgba(0, 0, 0, .2);
	}

	.diy-coupon .coupon-item .right-receive {
		padding: 0 40rpx 0 30rpx;
		width: 30rpx;
		text-align: center;
		font-size: 30rpx;
		line-height: 30rpx;
		text-align: center;
		border-left: 4rpx dashed rgba(255, 255, 255, .4);
		background: rgba(0, 0, 0, .6);
	}

	.diy-coupon .coupon-item .no-receive {
		background: #acacac;
		color: #787878;
	}
</style>
