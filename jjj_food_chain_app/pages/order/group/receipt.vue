<template>
	<view class="p20" :data-theme="theme()" :class="theme() || ''">
		<view class="group-title">订单信息</view>
		<view class="group-box">
			<view class="group-item">
				<view class="group-name">订单号</view>
				<view class="flex-1 d-e-c">{{ detail.order_no }}</view>
			</view>
			<view class="group-item">
				<view class="group-name">商品名称</view>
				<view class="flex-1 d-e-c">{{ detail.product[0].group_name }}</view>
			</view>
			<view class="group-item">
				<view class="group-name">付款时间</view>
				<view class="flex-1 d-e-c">{{ detail.pay_time }}</view>
			</view>

			<view class="group-item">
				<view class="group-name">下单时间</view>
				<view class="flex-1 d-e-c">{{ detail.create_time }}</view>
			</view>
			<view class="group-item">
				<view class="group-name">数量</view>
				<view class="flex-1 d-e-c">1</view>
			</view>
			<view class="group-item">
				<view class="group-name">总价</view>
				<view class="flex-1 d-e-c">￥{{ detail.total_price || '' }}</view>
			</view>
			<view class="group-item">
				<view class="group-name">实付款</view>
				<view class="flex-1 d-e-c">￥{{ detail.pay_price || '' }}</view>
			</view>
			<view class="group-item">
				<view class="group-name">有效期</view>
				<view class="flex-1 d-e-c">{{ detail.end_time || '' }}</view>
			</view>
			<view class="group-item">
				<view class="group-name">商品状态</view>
				<view class="flex-1 d-e-c">{{ detail.state_text || '' }}</view>
			</view>
		</view>
		<view class="group-title">订单信息</view>
		<view class="group-box">
			<view class="group-item">
				<view class="group-name">核销状态</view>
				<view class="flex-1 d-e-c" :class="detail.is_settled == 0 ? 'red' : 'green'">{{ detail.is_settled == 0 ? '未核销' : '已核销' }}</view>
			</view>
		</view>
		<button v-if="detail.is_settled == 0" class="btn-normal" @click="receiptFunc">核销</button>
	</view>
</template>

<script>
import utils from '@/common/utils.js';
export default {
	data() {
		return {
			order_id: 0,
			detail: {}
		};
	},
	onLoad(e) {
		/*商品id*/
		let scene = utils.getSceneData(e);
		this.order_id = e.oid || scene.oid;
		this.getData();
	},
	methods: {
		getData() {
			let self = this;
			self._get(
				'/plus.group.Order/extractDetail',
				{
					order_id: self.order_id
				},
				res => {
					self.detail = res.data.detail;
				},
				fail => {
					uni.reLaunch({
						url: '/pages/index/index'
					});
				}
			);
		},
		receiptFunc() {
			let self = this;
			uni.showLoading({
				title: '加载中...'
			});
			self._post(
				'/plus.group.Order/receipt',
				{
					order_id: self.order_id
				},
				res => {
					uni.showModal({
						title: '提示',
						content: res.msg
					});
					uni.hideLoading();
					self.getData();
				},
				fail => {
					uni.hideLoading();
				}
			);
		}
	}
};
</script>

<style lang="scss">
.group-title {
	padding: 20rpx 0;
	color: #666;
	font-size: 28rpx;
}

.group-box {
	background-color: #fff;
	border-radius: 15rpx;
	padding: 0 20rpx;
	font-size: 28rpx;

	.group-item {
		padding: 30rpx 0;
		border-bottom: 1rpx solid #eee;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.group-item:last-of-type {
		border: none;
	}
}

.btn-normal {
	margin: 40rpx auto;
	height: 92rpx;
	border-radius: 50rpx;
	font-size: 32rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}
</style>
