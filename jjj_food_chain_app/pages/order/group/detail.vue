<template>
	<view class="pb100">
		<view class="p-40-20">
			<view class="d-s-c mb10">
				<u-icon name="clock" size="44rpx" color="#333"></u-icon>
				<text class="f30 gray3 ml10">{{ detail.state_text || '' }}</text>
			</view>
			<view class="gray9 f26" v-if="detail.pay_status.value!=10">请在{{ detail.end_time || '' }}(含)前到店消费</view>
		</view>
		<view class="center-box mb20">
			<view class="d-b-s product-info">
				<image class="product-image" :src="detail.product&&detail.product[0].image.file_path" mode=""></image>
				<view class="flex-1">
					<view class="d-b-c mb10"
						@click="gotoPage('/pages/plus/group/detail?group_id=' + detail.product[0].group_id)">
						<view class="text-ellipsis f30 gray3">{{ detail.product&&detail.product[0].group_name || '' }}
						</view>
						<view class="icon iconfont icon-jiantou" style="color: #333;font-size: 24rpx;"></view>
					</view>
					<view class="f26 gray9 mb10" v-if="detail.product && detail.product[0].describe">
						{{ detail.product[0].describe }}
					</view>
					<view class="f26 gray9 mb10">随时退 过期自动退</view>
					<view class="f26 gray3">￥{{ (detail.product&&detail.product[0].group_price) || '' }}</view>
				</view>
			</view>
			<template v-if="detail.order_status.value == 10 && detail.pay_status.value == 20">
				<view class="d-c d-c-c border-t" style="padding-top:50rpx;">
					<view class="qrcode">
						<image :src="detail.qrcode || ''" mode=""></image>
					</view>
				</view>
				<view class="center-top d-c d-a-s">
					<view class="d-b-c mb10 ww100">
						<view class="f30 gray3">券码信息(1张可用)</view>
						<view class="border-btn" @click="refundFunc"
							v-if="detail.order_status.value == 10 && detail.pay_status.value == 20">申请退款</view>
					</view>
					<view class="f24 mb10 gray9">{{ detail.end_time||''}}到期</view>
					<view class="f26 d-b-c ww100">
						<view class="f36 gray3">{{ detail.code_no || '' }}</view>
						<text class="gray9">{{ detail.state_text || '' }}</text>
					</view>
				</view>
			</template>
		</view>
		<view class="group-box mb20">
			<view class="group-item">
				<view class="group-name fb">商品详情</view>
			</view>
			<!-- <view class="group-item">
				<view class="group-name">翻滚</view>
				<view>(1个) <text class="fb gray6">￥48</text></view>
			</view> -->
			<u-parse :content="(detail.product&&detail.product[0].content) || ''"></u-parse>
		</view>
		<view class="group-box">
			<view class="group-item">
				<view class="group-name fb">订单详情</view>
			</view>
			<view class="group-item">
				<view class="group-name">
					<text class="mr20">订单号：</text>
					<text>{{ detail.order_no || '' }}</text>
				</view>
			</view>
			<view class="group-item">
				<view class="group-name">
					<text class="mr20">手机号：</text>
					<text>{{ detail.user.mobile || '' }}</text>
				</view>
			</view>
			<view class="group-item" v-if="detail.pay_status.value!=10">
				<view class="group-name">
					<text class="mr20">付款时间：</text>
					<text>{{ detail.pay_time || ''}}</text>
				</view>
			</view>
			<view class="group-item">
				<view class="group-name">
					<text class="mr20">下单时间：</text>
					<text>{{ detail.create_time || '' }}</text>
				</view>
			</view>
			<view class="group-item">
				<view class="group-name">
					<text class="mr20">数量：</text>
					<text>1</text>
				</view>
			</view>
			<view class="group-item">
				<view class="group-name">
					<text class="mr20">总价：</text>
					<text>￥{{ detail.total_price || '' }}</text>
				</view>
			</view>
			<view class="group-item">
				<view class="group-name">
					<text class="mr20">实付：</text>
					<text>￥{{ detail.pay_price || '' }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_id: 0,
				detail: {
					end_time: 0,
					order_status: {},
					pay_status: {},
					user:{}
				}
			};
		},
		onLoad(e) {
			this.order_id = e.order_id;
			this.getData();
		},
		methods: {
			getData() {
				let self = this;
				self._get(
					'plus.group.Order/detail', {
						order_id: self.order_id,
						source: self.getPlatform(),
					},
					res => {
						self.detail = res.data.order;
					}
				);
			},
			refundFunc(e) {
				let self = this;
				let callback = function() {
					uni.showLoading({
						title: '加载中...'
					});
					self._post(
						'plus.group.Order/refund', {
							order_id: self.detail.order_id
						},
						res => {
							uni.showModal({
								title: '提示',
								content: res.msg
							});
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
					content: '确定要申请退款吗？',
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
	.p-40-20 {
		padding: 40rpx 24rpx;
	}

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
	}

	.center-box {
		width: 699rpx;
		// height: 684rpx;
		background: #ffffff;
		border-radius: 25rpx;
		margin: 0 auto;
		position: relative;
		padding: 0 18rpx 60rpx 18rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
	}

	.center-top {
		height: 185rpx;
		// border-bottom: 1rpx dashed #ddd;
		// padding: 29rpx 22rpx 29rpx 22rpx;
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

	.border-btn {
		width: 142rpx;
		height: 56rpx;
		border: 1px solid #eeeeee;
		border-radius: 28rpx;
		font-size: 24rpx;
		color: #999999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.product-info {
		padding: 24rpx 0rpx;
	}

	.product-image {
		width: 148rpx;
		height: 148rpx;
		flex-shrink: 0;
		background: #eeeeee;
		border-radius: 8rpx;
		margin-right: 17rpx;
	}

	.group-box {
		width: 700rpx;
		padding: 30rpx 25rpx 50rpx 20rpx;
		background: #ffffff;
		box-sizing: border-box;
		border-radius: 15rpx;
		margin: 0 auto 20rpx auto;

		.group-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			font-size: 26rpx;
			color: #999;
		}

		.group-name {
			flex: 1;
		}
	}
</style>