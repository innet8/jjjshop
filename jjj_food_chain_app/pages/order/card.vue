<template>
	<view class="pb100" v-if="!loading"  :data-theme='theme()' :class="theme() || ''">
		<view class="p-30-40 bg-white mb20" v-if="detail.card">
			<view class="item-wrap"
				:style="state_active==1?'background: url('+detail.card.card_style_url+') left top / 100% 100% no-repeat;':'background: url('+detail.card_style_url+') left top / 100% 100% no-repeat;'">
				<view class="item-wrap-box box-s-b">
					<image class="item-wrap-box-image" src="/static/vip.png" mode=""></image>
					<view class="tc f40 mb23 fb">{{detail.card_name||detail.card.card_name}}</view>
					<view class="tc f28">{{detail.expire_time_text}}</view>
				</view>
			</view>
		</view>
		<view class="bg-white p-20-40">
			<view class="text-title"><text class="bg-white">会员特权</text></view>
			<view class="d-c-c">
				<view class="d-c d-c-c m-0-20" v-if="detail.open_coupon">
					<image class="privilege-image" src="/static/icon/card-coupon.png" mode=""></image>
					<text class="f22 gray6">开卡送券</text>
				</view>
				<view class="d-c d-c-c m-0-20" v-if="detail.open_money">
					<image class="privilege-image" src="/static/icon/card-money.png" mode=""></image>
					<text class="f22 gray6">开卡送余额</text>
				</view>
				<view class="d-c d-c-c m-0-20" v-if="detail.open_points">
					<image class="privilege-image" src="/static/icon/card-point.png" mode=""></image>
					<text class="f22 gray6">开卡送积分</text>
				</view>
				<view class="d-c d-c-c m-0-20" v-if="state_active!=1&&detail.is_discount">
					<image class="privilege-image" src="/static/icon/card-discont.png" mode=""></image>
					<text class="f22 gray6">开卡享{{detail.discount*1}}折</text>
				</view>
				<view class="d-c d-c-c m-0-20" v-if="state_active==1&&detail.card && detail.card.is_discount">
					<image class="privilege-image" src="/static/icon/card-discont.png" mode=""></image>
					<text class="f22 gray6">开卡享{{detail.card.discount*1}}折</text>
				</view>
			</view>
		</view>
		<view class="bg-white p-20-40 mb20" v-if="detail.open_coupons && detail.open_coupons.length>0">
			<view class="text-title"><text class="bg-white">开卡赠送</text></view>
			<view class="swiper swiper-list">
				<view class="coupon-item mb20" :class="'coupon-item-'+item.color.text"
					v-for="(item, index) in detail.open_coupons" :key="index">
					<!--装饰用的小圆-->
					<view class="circles">
						<text v-for="(circle, num) in 8" :key="num"></text>
					</view>
					<view class="info">
						<view class="">{{item.coupon_type.text}}</view>
					</view>
					<view class="operation d-b-c">
						<view class="flex-1 coupon-content">
							<view>
								<template v-if=" item.coupon_type.value == 10 ">
									<view class="price">
										<text>￥</text>
										<text class="f40 fb">{{ item.reduce_price }}</text>
									</view>
								</template>
								<template v-if="item.coupon_type.value == 20 ">
									<text class="f40 fb">{{ item.discount }}</text><text>折券</text>
								</template>
							</view>
							<view class="f30">{{item.min_price>0?'满￥'+item.min_price+'可用':'无最低消费门槛'}}</view>
						</view>
						<view class="right-box d-c-c">
							<view type="default" class="f30">
								{{state_active==1?'已发放':'开卡领取'}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white p-20-0">
			<view class="text-title"><text class="bg-white">使用说明</text></view>
			<view class="d-s-c p-20-40" style="white-space:pre">{{state_active==1?detail.card.content:detail.content}}</view>
		</view>
		<view class="buy-btn" v-if="state_active==0" @click="subFunc">立即购买</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				card_id: 0,
				order_id: 0,
				state_active: 0,
				isSub: 0,
				detail: {
					card_style_url:'',
					card_name:'',
					expire_time_text:'',
					open_coupons: [],
					card_qrcode: '',
					open_points: 0,
					open_coupon: 0,
					subcard: {
						card_style_url: '',
						card_id: 0
					}
				},
			};
		},
		onShow() {
			this.getData();
			
		},
		onLoad(e) {
			this.card_id = e.card_id;
			this.order_id = e.order_id;
			this.state_active = e.state_active;
		},
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				self.loading = true;
				let url = '';
				let params = {
					// source: self.getPlatform()
					source: 'h5'
				}
				if (self.state_active == 1) {
					url = 'user.UserCard/recordDetail';
					params.order_id = self.order_id
				} else {
					url = 'user.UserCard/detail';
					params.card_id = self.card_id
				}
				self._get(url, params, function(res) {
					self.detail = res.data.detail;
					self.loading = false;
				});
			},
			subFunc(e){
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self._post(
					'user.UserCard/buy', {
						card_id: self.card_id,
						pay_source: self.getPlatform()
					},
					function(result) {
						uni.hideLoading();
						let pages = '/pages/order/cashier?order_type=30&order_id=' + result.data.order_id;
						self.gotoPage(pages);
					}
				);
			},
		}
	};
</script>

<style lang="scss">
	.item-wrap {
		padding: 22rpx;
		box-sizing: border-box;
		height: 369rpx;
		border-radius: 20rpx;
	}

	.item-wrap-box {
		// border: 1rpx solid #99999980;
		padding: 0rpx 20rpx 35rpx 20rpx;
		height: 100%;
		color: rgba($color: #ffffff, $alpha: 0.7);
	}

	.privilege-image {
		width: 108rpx;
		height: 108rpx;
		margin-bottom: 24rpx;
	}

	.text-title {
		font-size: 32rpx;
		font-weight: 800;
		line-height: 60rpx;
		text-align: center;
		margin-bottom: 10rpx;
		position: relative;
	}

	.text-title::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 320rpx;
		height: 4rpx;
		z-index: 0;
		background-color: #e2d7c4;
	}

	.text-title .bg-white {
		position: relative;
		z-index: 1;
		padding: 0 10rpx;
	}



	.subcard {
		width: 670rpx;
		height: 224rpx;
		margin: 0 auto;
		padding: 20rpx;
		box-sizing: border-box;
		font-size: 38rpx;
		color: #ccab7b;
	}

	.subbtn {
		width: 150rpx;
		height: 58rpx;
		background-color: #b3985d;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 600;
		font-size: 28rpx;
		border-radius: 8rpx;
	}

	.f52 {
		font-size: 52rpx;
	}

	.buy-btn {
		position: fixed;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
		text-align: center;
		font-size: 32rpx;
		left: 0;
		bottom: 0;
		z-index: 98;
		background-color: #ccab7b;
	}

	.item-wrap-box-image {
		width: 50rpx;
		height: 50rpx;
		margin: 50rpx auto 20rpx auto;
		opacity: 0.8;
	}

	.swiper-list {
		// display: flex;
	}

	/*coupon*/
	.coupon-item {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 200rpx;
		color: #FFFFFF;
	}

	.coupon-item .circles {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: stretch;
		z-index: 30;
	}

	.coupon-item .circles text {
		display: block;
		width: 10rpx;
		height: 20rpx;
		background: #FFFFFF;
		border-radius: 0 10rpx 10rpx 0
	}

	.coupon-item .info {
		position: relative;
		padding: 0 30rpx 0 40rpx;
		width: 40rpx;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 40rpx;
		line-height: 40rpx;
		border-right: 4rpx dashed rgba(255, 255, 255, .4);
	}

	.coupon-item .info::before,
	.coupon-item .info::after {
		position: absolute;
		display: block;
		content: '';
		width: 30rpx;
		height: 15rpx;
		background: #FFFFFF;
		z-index: 10;
	}

	.coupon-item .info::before {
		top: 0;
		right: -16rpx;
		border-radius: 0 0 15rpx 15rpx;
	}

	.coupon-item .info::after {
		bottom: 0;
		right: -16rpx;
		border-radius: 15rpx 15rpx 0 0;
	}

	.coupon-item-red {
		background: #e62423;
		/* linear-gradient(-128deg, #ff6d6d, #ff3636); */
	}

	.coupon-item-blue {
		background: #178ed9;
		/* linear-gradient(-128deg, #1fd6ff, #3661ff); */
	}

	.coupon-item-violet {
		background: #ab0bf6;
		/* linear-gradient(-128deg, #d63efc, #6600c3); */
	}

	.coupon-item-yellow {
		background: #f4a50b;
		/* linear-gradient(-128deg, #ffe31f, #ffaf36); */
	}

	.coupon-item-gray {
		background: #999999;
		/* linear-gradient(-128deg, #888888, #999999); */
	}

	.coupon-item .operation {
		position: relative;
		height: 100%;
		padding-left: 30rpx;
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
	}

	.coupon-item .operation .coupon-content {
		height: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
		flex-direction: column;
	}

	.coupon-item .btns {
		padding: 0 30rpx;
		width: 30rpx;
		height: 100%;
		background: rgba(0, 0, 0, .2);
	}

	.coupon-item .right-box {
		padding-right: 30rpx;
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		right: 0;
	}

	.coupon-item .btns button {
		text-align: 0;
		padding: 0;
		width: 30rpx;
		border-radius: 0;
		font-size: 30rpx;
		line-height: 36rpx;
		background: none;
	}
</style>
