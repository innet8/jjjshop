<template>
	<view>
		<view class="diy-banner-xf d-b-c">
			<view class="banner-xf-box" @click="gotoPage('/'+itemData.params.nav[0].navlinkUrl)">
				<view class="rides">
					<image src="/static/gift.png"></image>
				</view>
				<view class="rides_title">门店自取</view>
				<view class="rides_text">下单免排队</view>
			</view>
			<view class="banner-xf-box" @click="gotoPage('/'+itemData.params.nav[1].navlinkUrl)">
				<view class="rides">
					<image src="/static/invite/bg-invite.jpg" ></image>
				</view>
				<view class="rides_title">外卖点单</view>
				<view class="rides_text">无接触配送</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				indicatorActiveColor: '#ffffff'
			}
		},
		props: ['itemData'],
		created() {
			this.interval = this.itemData.params.interval;
			this.indicatorActiveColor = this.itemData.style.btnColor;
		},
		methods: {

			/*跳转页面*/
			gotoPages(e) {
				this.gotoPage(e.linkUrl);
			}
		}
	}
</script>

<style lang="scss">
	.diy-banner-box,
	.diy-banner-box .swiper {
		width: 750rpx;
		height: 500rpx;
	}

	.diy-banner-box image {
		width: 750rpx;
		height: 500rpx;
	}

	.banner-xf-box {
		flex: 1;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		width: 330rpx;
		height: 266rpx;
		
	}

	.diy-banner-xf {
		width: 690rpx;
		height: 384rpx;
		background-color: #ffffff;
		margin: 0 auto;
		position: relative;
		opacity: 1;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		margin-top: 20rpx;
		display: flex;
		z-index: 1;
	}

	.rides {
		width: 85rpx;
		height: 85rpx;
		margin-bottom: 28rpx;

		image {
			width: 85rpx;
			height: 85rpx;
		}
	}

	.rides_title {
		color: #282828;
		font-weight: bold;
		font-size: 34rpx;

	}

	.rides_text {
		color: #999999;
		font-weight: 400;
		font-size: 20rpx;
	}
</style>
