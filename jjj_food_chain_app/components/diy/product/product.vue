<template>
	<view class="diy-groupProduct">
		<view class="d-b-c group-title">
			<view class="f26 gray3"><text class="f32 fb">推荐商品</text></view>
			<view class="gray6 f24" @click="gotoPage('/pages/plus/group/list')">
				<text>查看全部</text>
				<text class="ml20 icon iconfont icon-jiantou" style="font-size: 24rpx;color: #666;"></text>
			</view>
		</view>
		<view class="group-list">
			<view class="item" v-for="(item,index) in itemData.data" :key="index">
				<view class="prodct-cover">
						<image src="/static/invite/bg-invite.jpg" mode="aspectFill" class="pro-image"></image>
						<view class="product-sales">
							<text class="text">摩尔城店</text>
						</view>
				</view>
			
				<view class="pro-info ww100">
					<view class="f30 gray3 text-ellipsis">{{item.product_name}}</view>
					<view class="d-b-s">
						<view class="d-c d-b-s flex-1 hh100">
							<view class="d-s-c ">
								<view class="f26" style="color: #FF5800;">￥{{item.product_price}}</view>
							</view>
							<view class="text-d-line f24 gray9">￥{{item.line_price}}</view>
						</view>
						<view class="d-c d-b-e hh100">
							<view class="theme-btn buy-btn" @click="gotoPage('/pages/plus/group/detail?group_id='+item.group_id)">抢购</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: ['itemData'],
		methods: {
			scroll(e) {},

			/*跳转列表*/
			gotoList() {
				let url = '/pages/plus/group/list/list';
				this.gotoPage(url);
			},

			/*跳转产品详情*/
			gotoDetail(e) {
				let url = '/pages/product/detail/detail?product_id=' + e;
				this.gotoPage(url);
			},
		}
	};
</script>

<style lang="scss">
	.prodct-cover{
			width: 369rpx;
			height: 199rpx;
			position: relative;
			overflow: hidden;
	}
	.product-cover image{
			width: 300rpx;
			height: 200rpx;
		  border-radius: 20rpx;
	}
	.product-sales{
			font-size: 20rpx;
			width: 140rpx;
			line-height: 1.7;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
		background: #000000;
		opacity: 0.65;
		border-radius: 0px 24rpx 0px 0px;
		  white-space: nowrap;
	}
	.product-sales .text{
	  color: #ffffff;
	  padding-left: 30rpx;
	  font-weight: 200;
	}
	.diy-groupProduct {
		margin: 20rpx 20rpx;
		border-radius: 6rpx;
		overflow: hidden;
		box-shadow: 0px 8rpx 3rpx 0px rgba(6, 0, 1, 0.03);
	}

	.group-title {
		padding: 0 0 0 20rpx;
		position: relative;
		margin-bottom: 20rpx;
	}

	.group-title::after {
		content: '';
		width: 6rpx;
		height: 26rpx;
		background: #FFCC00;
		border-radius: 3rpx;
		position: absolute;
		z-index: 1;
		top: 0;
		bottom: 0;
		margin: auto;
		left: 0;
	}

	.group-list {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
		background: #FFFFFF;
		padding: 0 20rpx;
		border-radius: 25rpx;

		.item {
			margin-bottom: 20rpx;
			width: 316rpx;
			border-radius: 25rpx;
			padding: 28rpx 0 22rpx 0;
			box-sizing: border-box;

			.pro-image {
				width: 316rpx;
				height: 172rpx;
				border-radius: 15rpx;
				display: block;
				margin-bottom: 17rpx;
			}

			.buy-btn {
				width: 108rpx;
				height: 59rpx;
				border-radius: 29rpx;
				font-size: 28rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.text-tips {
			font-size: 22rpx;
			color: #FF5800;
			padding: 6rpx 12rpx;
			margin: 0 10rpx;
			display: block;
			border: 1px solid #FF5800;
			border-radius: 5rpx;
			white-space: nowrap;
		}
	}
</style>
