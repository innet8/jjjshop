<template>
	<view :data-theme="theme()" :class="theme() || ''">
		<view class="top-nav mb20">
			<view class="top-nav-item" @click="changeType(0)" :class="{ active: type == 0 }">全部</view>
			<view class="top-nav-item" @click="changeType(1)" :class="{ active: type == 1 }">待付款</view>
			<view class="top-nav-item" @click="changeType(2)" :class="{ active: type == 2 }">待使用</view>
			<view class="top-nav-item" @click="changeType(3)" :class="{ active: type == 3 }">退款</view>
		</view>
		<view class="order-list">
			<view class="order-item" v-for="(item, index) in listData" :key="index" @click="gotoPage('/pages/order/group/detail?order_id=' + item.order_id)">
				<view class="order-top pb30">
					<view class="d-b-c p-20-0">
						<view class="f28 gray3 fb text-ellipsis">{{ item.product[0].group_name }}</view>
						<view class="f24 gray9">{{ item.state_text }}</view>
					</view>
					<view class="d-b-s">
						<image class="product-image" :src="item.product[0].image.file_path" mode="aspectFill"></image>
						<view class="f24 gray9 flex-1" style="line-height: 1.5;">
							<view>下单时间:{{ item.create_time }}</view>
							<view v-if="item.order_status.value == 10 && item.pay_status.value == 20">有效期至:{{ item.end_time || '' }}</view>
							<view>数量:1</view>
							<view v-if="item.pay_status.value == 20">实付:￥{{ item.pay_price }}</view>
						</view>
					</view>
				</view>
				<view class="order-bts border-t" v-if="item.order_status.value == 10 && (item.pay_status.value == 10 || item.pay_status.value == 20)">
					<block>
						<!-- 未支付取消订单 -->
						<button v-if="item.order_status.value == 10 && item.pay_status.value == 10" class="default" type="default" @click.stop="cancellation(item.order_id)">
							取消订单
						</button>
						<!-- 订单付款 -->
						<button
							v-if="item.order_status.value == 10 && item.pay_status.value == 20"
							class="default"
							type="default"
							@click.stop="gotoPage('/pages/order/group/qrcode?order_id=' + item.order_id)"
						>
							查看券码
						</button>
						<!-- 订单付款 -->
						<button v-if="item.order_status.value == 10 && item.pay_status.value == 10" class="btn-red" @click.stop="onPayOrder(item.order_id)">去付款</button>
					</block>
				</view>
			</view>
			<!-- 没有记录 -->
			<view class="d-c-c p30" v-if="listData.length == 0 && !loading">
				<text class="iconfont icon-wushuju"></text>
				<text class="cont">亲，暂无相关记录哦</text>
			</view>
			<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more.vue';
import cashier from '@/components/cashier/cashier.vue';
import { pay } from '@/common/pay.js';
export default {
	components: {
		uniLoadMore,
		cashier
	},
	data() {
		return {
			type: 0,
			/*是否加载完成*/
			loading: true,
			/*数据列表*/
			listData: [],
			/*最后一页码数*/
			last_page: 0,
			/*当前页面*/
			page: 1,
			/*每页条数*/
			list_rows: 10,
			no_more: false,
			order_id: 0
		};
	},
	onShow() {
		this.page = 1;
		this.listData = [];
		this.getData();
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
	onReachBottom() {
		let self = this;
		if (self.page < self.last_page) {
			self.page++;
			self.getData();
		}
		self.no_more = true;
	},
	methods: {
		changeType(n) {
			if (this.loading || n == this.type) {
				return;
			}
			this.type = n;
			this.listData = [];
			this.page = 1;
			this.getData();
		},
		/*获取数据*/
		getData() {
			let self = this;
			self.loading = true;
			self._get(
				'plus.group.Order/lists',
				{
					page: self.page || 1,
					list_rows: self.list_rows,
					dataType: self.type
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
		onPayOrder(orderId) {
			let pages = '/pages/order/cashier?order_type=70&order_id=' + orderId;
			this.gotoPage(pages, 'reLaunch');
		},
		cancellation(e) {
			let self = this;
			let callback = function() {
				uni.showLoading({
					title: '加载中...'
				});
				self._post(
					'plus.group.Order/cancel',
					{
						order_id: e
					},
					res => {
						uni.showModal({
							title: '提示',
							content: res.msg
						});
						self.listData = [];
						self.page = 1;
						self.getData();
					},
					false,
					com => {
						uni.hideLoading();
					}
				);
			};
			uni.showModal({
				title: '提示',
				content: '确定要取消订单吗？',
				success(o) {
					if (o.confirm) {
						callback();
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.top-nav {
	display: flex;
	justify-content: space-around;
	align-items: center;

	// overflow-x: auto;
	.top-nav-item {
		font-size: 28rpx;
		flex: 1;
		padding: 30rpx 0;
		text-align: center;
		white-space: nowrap;
		color: #666;
		position: relative;
	}

	.top-nav-item.active {
		color: #333;
	}

	.top-nav-item.active::after {
		content: '';
		width: 42rpx;
		height: 7rpx;
		background: #ffcc00;
		border-radius: 4rpx;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 0;
	}
}

.order-list {
	padding: 0 27rpx 20rpx 24rpx;

	.order-item {
		background-color: #fff;
		border-radius: 15rpx;
		padding: 0 18rpx;
		margin-bottom: 20rpx;
	}
}

.product-image {
	width: 124rpx;
	height: 124rpx;
	border-radius: 15rpx;
	flex-shrink: 0;
	margin-right: 17rpx;
}

.order-list .order-bts {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 24rpx 0 27rpx 0;
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
	border: 1rpx solid #ddd;
	font-size: 28rpx;
	color: #999;
}

.order-list .order-bts button.btn-red {
	@include background_color('background_color');
	font-size: 28rpx;
	font-family: PingFang SC;
	@include text_color('text_color');
	border: 1rpx solid;
	@include border_color('border_color');
}
</style>
