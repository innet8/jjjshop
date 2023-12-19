<template>
	<view class="express-info" v-if="!loadding">
		<view class="base-info p30">
			<view class="name">
				<text class="gray9">物流公司：</text>
				<text class="fb">{{express.express_name}}</text>
			</view>
			<view class="order-code pt20">
				<text class="gray9">物流单号：</text>
				<text class="fb red"> {{express.express_no}}</text>
			</view>
		</view>
		<view class="list">
			<view :class="index==0?'active item':'item'" v-for="(item, index) in express.list" :key="index">
				<view class="content">{{item.context}}-{{item.status}}</view>
				<view class="datetime">{{item.time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/*是否加载完成*/
				loadding: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				/*订单id*/
				order_id: 0,
				/*快递信息*/
				express: {
					list: {},
				},
				/* 0 普通订单 1积分订单 */
				type: 0,
			};
		},
		onLoad(e) {
			this.type = e.type || 0;
			uni.showLoading({
				title: '加载中'
			});
			this.order_id = e.order_id;
		},
		mounted() {
			/*获取数据*/
			this.getData();
		},
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				let url = 'user.order/express';
				if (this.type == 1) {
					url = 'plus.points.order/express'
				}
				let order_id = self.order_id
				self._get(url, {
					order_id: order_id
				}, function(res) {
					self.express = res.data.express;
					self.loadding = false;
					uni.hideLoading();
				});
			},
		}
	};
</script>

<style>
	.express-info .base-info {
		background: #ffffff;
		border-bottom: 1px solid #eeeeee;
	}

	.express-info .list {
		padding: 30rpx 30rpx 30rpx 50rpx;
		margin-top: 20rpx;
		border-top: 1px solid #eeeeee;
		background: #ffffff;
	}

	.express-info .list .item {
		position: relative;
		padding: 30rpx;
		padding-left: 40rpx;
		padding-right: 0;
		border-left: 1px solid #cccccc;
	}

	.express-info .list .item::before {
		display: block;
		content: '';
		position: absolute;
		top: 30rpx;
		left: -18rpx;
		width: 20rpx;
		height: 20rpx;
		border: 8rpx solid #ffffff;
		border-radius: 50%;
		background: #CCCCCC;
	}

	.express-info .list .item::after {
		display: block;
		content: '';
		position: absolute;
		top: 30rpx;
		left: -18rpx;
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		border: 4rpx solid #CCCCCC;
	}

	.express-info .list .item.active::before {
		background: #f00808;
	}

	.express-info .list .item.active::after {
		border: 4rpx solid #f00808;
	}

	.express-info .list .item {
		color: #999999;
	}

	.express-info .list .item.active {
		color: #f00808;
	}
</style>