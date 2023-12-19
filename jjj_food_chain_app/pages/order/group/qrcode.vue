<template>
	<view>
		<view class="d-c d-c-c p-40-0">
			<view class="mb30">
				<view class="f30 gray3 tc mb20">{{ detail.product ? detail.product[0].group_name : '' }}</view>
				<view class="f26">
					<text class="gray3">待使用</text>
					<text class="ml10 gray9">{{ detail.end_time || '' }}到期</text>
				</view>
			</view>
		</view>
		<view class="center-box">
			<view class="center-top d-c d-a-s">
				<view class="f30 gray3">券码</view>
				<view class="f36 gray3">{{ code_no || '' }}</view>
			</view>
			<view class="dashed ww100"><text v-for="item in 30" :key="item" class="dash-item"></text></view>
			<view class="d-c d-c-c" style="padding-top:50rpx;">
				<view class="qrcode"><image :src="qrcode || ''" mode=""></image></view>
				<view class="gray9 mt40">为保障您的权益，未到店消费前请不要将券号提供给商家</view>
			</view>
		</view>
		<view class="border-btn" @click="goback">关闭</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			order_id: '',
			detail: {},
			qrcode: '',
			code_no: ''
		};
	},
	onLoad(e) {
		this.order_id = e.order_id;
		this.getData();
	},
	methods: {
		goback() {
			// #ifndef H5
			uni.navigateBack({
				delta: 1
			});
			// #endif
			// #ifdef H5
			history.go(-1);
			// #endif
		},
		/*获取订单详情*/
		getData() {
			let self = this;
			let order_id = self.order_id;
			self._get(
				'plus.group.Order/qrcode',
				{
					order_id: order_id,
					source: self.getPlatform()
				},
				function(res) {
					self.detail = res.data.detail;
					self.qrcode = res.data.qrcode;
					self.code_no = res.data.code_no;
					self.loadding = false;
					uni.hideLoading();
				}
			);
		}
	}
};
</script>

<style lang="scss">
.dashed {
	display: flex;
	justify-content: space-around;
	align-items: center;

	.dash-item {
		width: 8rpx;
		height: 8rpx;
		background-color: #f1f1f1;
		border-radius: 50rpx;
		display: block;
	}
}

.border-btn {
	font-size: 28rpx;
	font-family: SourceHanSansCN;
	font-weight: 400;
	color: #999999;
	width: 230rpx;
	height: 64rpx;
	border: 1px solid #dddddd;
	border-radius: 32rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 40rpx auto;
	background-color: #ffffff;
}

.center-box {
	width: 699rpx;
	height: 684rpx;
	background: #ffffff;
	border-radius: 25rpx;
	margin: 0 auto;
	position: relative;
}

.center-box::after {
	content: '';
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	background-color: #f5f5f5;
	border-radius: 50%;
	top: 165rpx;
	right: -20rpx;
	z-index: 2;
}

.center-box::before {
	content: '';
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	background-color: #f5f5f5;
	border-radius: 50%;
	top: 165rpx;
	left: -20rpx;
	z-index: 2;
}

.center-top {
	height: 185rpx;
	// border-bottom: 1rpx dashed #ddd;
	padding: 29rpx 22rpx 29rpx 22rpx;
	box-sizing: border-box;
}

.qrcode {
	width: 300rpx;
	height: 300rpx;

	image {
		width: 300rpx;
		height: 300rpx;
	}
}
</style>
