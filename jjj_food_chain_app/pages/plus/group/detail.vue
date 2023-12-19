<template>
	<view :data-theme="theme()" :class="theme() || ''" class="pb200">
		<view class="group-top">
			<view class="product-pic mb20" v-if="detail.image">
				<swiper
					class="swiper"
					indicator-active-color="#ffffff"
					indicator-color="rgba(255,255,255,.3)"
					:indicator-dots="indicatorDots"
					:autoplay="autoplay"
					:interval="interval"
					:duration="duration"
				>
					<swiper-item v-for="(item, index) in detail.image" :key="index"><image :src="item.file_path" mode="aspectFit"></image></swiper-item>
				</swiper>
			</view>
			<view>
				<view class="pb20">
					<view class="f30 gray3 mb10 fb">{{ detail.group_name || '' }}</view>
					<view class="d-b-c">
						<view class="d-s-c flex-1">
							<view class="f26" style="color: #FF5800;">
								￥
								<text class="f32">{{ detail.group_price || '' }}</text>
							</view>
							<view class="text-tips" v-if="detail.discount">{{ detail.discount || '' }}</view>
							<view class="text-d-line f24 gray9">￥{{ detail.line_price || '' }}</view>
						</view>
						<view class="gray9 f26">已售{{ detail.group_sales || 0 }}</view>
					</view>
				</view>
				
				<view class="border-t f26 gray3 pt20">
					<view class="d-b-c mb20">
						<view class="mr20">须知</view>
						<view class="gray9 flex-1">{{ detail.describe || '' }}</view>
					</view>
					<view class="d-b-c" @click="gotoPage('/pages/plus/group/explain?group_id=' + group_id)">
						<view class="mr20">保障</view>
						<view class="gray9 flex-1">
							随时退 过期自动退
							<text class="icon iconfont icon-jiantou" style="font-size: 22rpx;color: #333;"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <image class="flowPath" src="/static/images/group-flowPath.png" mode=""></image> -->
		<view class="d-b-c titles">
			<view class="f30">团购详情</view>
			<!-- 	<view class="gray6 f26 d-c-c">查看图文<text class="ml10 icon iconfont icon-jiantou"
					style="color: #666;font-size: 24rpx;"></text></view> -->
		</view>
		<!-- <view class="group-box">
			<view class="group-item">
				<view class="group-name">25选1</view>
			</view>
			<view class="group-item">
				<view class="group-name">翻滚</view>
				<view>(1个) <text class="fb gray6">￥48</text></view>
			</view>
		</view> -->
		<view class="group-box"><u-parse :content="detail.content || ''"></u-parse></view>
		<view class="d-b-c titles"><view class="f30">购买须知</view></view>
		<!-- <view class="group-box">
			<view class="f26 fb mb16 gray3">购买须知</view>
			<view class="f26 gray6 pb10 border-b">2020-02-20</view>
			<view class="f26 fb mb16 gray3 pt10">使用时间</view>
			<view class="f26 gray6 pb10 border-b">营业时间内可用</view>
			<view class="f26 fb mb16 gray3 pt10">使用规则</view>
			<view class="f26 gray6 pb10">营业时间内可用</view>
		</view> -->
		<view class="group-box"><u-parse :content="detail.notice || ''"></u-parse></view>
		<view class="d-b-c titles">
			<view class="f30">适用商户</view>
			<view class="gray6 f26 d-c-c" @click="gotoPage('/pages/shop/shop_grouplist?group_id=' + group_id)">
				{{ detail.supplierCount }}家门店通用
				<text class="ml10 icon iconfont icon-jiantou" style="color: #666;font-size: 24rpx;"></text>
			</view>
		</view>
		<view class="group-box">
			<view class="d-b-s">
				<image class="shop-image" :src="detail.supplier?detail.supplier.logo:''" mode="aspectFill"></image>
				<view class="flex-1 shop-info d-c">
					<view class="f30">{{ detail.supplier.name }}</view>
					<view class="f26" v-if="detail.supplier.store_time">营业时间 {{ detail.supplier.store_time[0] }}-{{ detail.supplier.store_time[1] }}</view>
				</view>
				<view class="d-c d-c-c" @click="callPhone(detail.supplier.link_phone)">
					<image style="width: 45rpx;height: 45rpx;" src="/static/icon/call.png" mode=""></image>
					<view class="f24 gray6">联系商家</view>
				</view>
			</view>
			<!-- <view class="d-b-c p-20-0">
				<view class="f30">本店团购</view>
				<view class="gray9 f26 d-c-c">查看全部<text class="ml10 icon iconfont icon-jiantou"
						style="color: #999;font-size: 24rpx;"></text></view>
			</view>
			<view class="prodcut-list-wrap">
				<view class="product-item">
					<image class="product-item-image" src="/static/card.png" mode=""></image>
					<view class="f30 gray3">柠檬海盐乳酪蛋糕</view>
					<view class="gray9 f24">周一至周日 ·可自提</view>
					<view class="d-b-c">
						<view class="flex-1">
							<view class="d-s-c">
								<view class="f26 text-ellipsis" style="color: #FF5800;">￥<text class="f32">280.0</text>
								</view>
								<text class="text-tips">5.0折</text>
							</view>
							<view class="text-d-line gray9">￥56</view>
						</view>
						<view class="d-c d-b-e">
							<view class="theme-btn product-buy-btn">抢购</view>
							<view class="tr gray9">已售400+</view>
						</view>
					</view>
				</view>
			</view> -->
		</view>
		<view class="btns-wrap">
			<view class="icon-box d-c-c" @click="gotoPage('/pages/index/index')">
				<button class="d-c-c d-c bg-white">
					<text class="btn_btom pr icon iconfont icon-shouye gray9" style="font-size: 36rpx;height: 50rpx;line-height: 60rpx;"></text>
					<text class="f22 gray9" style="height: 50rpx;line-height: 40rpx;">门店</text>
				</button>
			</view>
			<button class="add-cart" @click="gotoPage('/pages/order/group-confirm?group_id=' + group_id)">立即购买</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			group_id: 0,
			longitude: 0,
			latitude: 0,
			/*是否显示面板指示点*/
			indicatorDots: true,
			/*是否知道切换*/
			autoplay: false,
			/*自动切换时间间隔*/
			interval: 2000,
			/*滑动动画时长*/
			duration: 500,
			detail: {
				supplier:{}
			}
			
		};
	},
	onLoad(e) {
		this.group_id = e.group_id;
		// this.getData();
		this.getcityData();
	},
	methods: {
		getData() {
			let self = this;
			self._get(
				'plus.group.Group/detail',
				{
					group_id: self.group_id,
					longitude: self.longitude || 0,
					latitude: self.latitude || 0
				},
				res => {
					self.detail = res.data.detail;
				}
			);
		},
		/*获取定位方式*/
		getcityData() {
			let self = this;
			// 第一次，如果是公众号，则初始化微信sdk配置
			// #ifdef H5
			if (self.isWeixin()) {
				let sign = uni.getStorageSync('sign');
				if (!sign) {
					uni.showLoading({
						title: '加载中'
					});
					self._post(
						'index/index',
						{
							url: window.location.href
						},
						function(res) {
							uni.setStorageSync('sign', res.data.signPackage);
							sign = res.data.signPackage;
							uni.hideLoading();
							self.getWxLocation(sign);
						}
					);
				} else {
					self.getWxLocation(sign);
				}
			} else {
				self.getLocation();
			}
			// #endif
			// #ifndef H5
			self.getLocation();
			// #endif
		},
		/*授权启用定位权限*/
		onAuthorize() {
			let self = this;
			uni.openSetting({
				success(res) {
					if (res.authSetting['scope.userLocation']) {
						self.isAuthor = true;
						setTimeout(() => {
							// 获取用户坐标
							self.getLocation(res => {});
						}, 1000);
					}
				}
			});
		},
		/*获取用户坐标*/
		getLocation(callback) {
			let self = this;
			uni.getLocation({
				type: 'wgs84',
				success(res) {
					self.longitude = res.longitude;
					self.latitude = res.latitude;
					self.getData();
				},
				fail(err) {
					self.longitude = 0;
					self.latitude = 0;
					uni.showToast({
						title: '获取定位失败，请点击右下角按钮打开定位权限',
						duration: 2000,
						icon: 'none'
					});
					self.getData();
				}
			});
		},
		/* 公众号获取坐标 */
		getWxLocation(signPackage, callback) {
			let self = this;
			var jweixin = require('jweixin-module');
			jweixin.config(JSON.parse(signPackage));
			jweixin.ready(function(res) {
				jweixin.getLocation({
					type: 'wgs84',
					success: function(res) {
						self.longitude = res.longitude;
						self.latitude = res.latitude;
						self.getData();
					},
					fail(err) {
						self.longitude = 0;
						self.latitude = 0;
						self.getData();
					}
				});
			});
			jweixin.error(function(res) {
				console.log(res);
			});
		}
	}
};
</script>

<style lang="scss">
.group-top {
	width: 699rpx;
	// height: 668rpx;
	background: #ffffff;
	border-radius: 35rpx;
	margin: 32rpx auto 26rpx auto;
	padding: 18rpx 15rpx 30rpx 14rpx;
	box-sizing: border-box;

	.product-pic .swiper {
		width: 670rpx;
		height: 372rpx;
		border-radius: 25rpx;
		margin: 0 auto;
		margin-bottom: 20rpx;
	}

	.product-pic image {
		display: block;
		width: 670rpx;
		height: 372rpx;
		// background: #F5F5F5;
		border-radius: 25rpx;
	}
}

.text-tips {
	font-size: 22rpx;
	color: #ff5800;
	border: 1px solid #ff5800;
	padding: 6rpx 12rpx;
	margin: 0 10rpx;
	display: block;
	border-radius: 5rpx;
}

.flowPath {
	width: 700rpx;
	height: 191rpx;
	display: block;
	margin: 26rpx auto 30rpx auto;
}

.titles {
	padding: 0 40rpx;
	margin-bottom: 28rpx;
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

.shop-image {
	width: 148rpx;
	height: 148rpx;
	border-radius: 8rpx;
	margin-right: 17rpx;
}

.shop-info {
	height: 148rpx;
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}

.product-buy-btn {
	width: 108rpx;
	height: 59rpx;
	border-radius: 29rpx;
	font-size: 28rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.prodcut-list-wrap {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-start;
}

.product-item {
	width: 326rpx;
	margin-bottom: 20rpx;
}

.product-item-image {
	width: 326rpx;
	height: 172rpx;
	margin-bottom: 20rpx;
	border-radius: 25rpx;
}

.btns-wrap {
	position: fixed;
	height: 100rpx;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	background: #ffffff;
	justify-content: space-between;
	align-items: center;
	padding-left: 5rpx;
	padding-bottom: env(safe-area-inset-bottom);
	border-top: 1rpx solid #eee;
	z-index: 199;
}

.btns-wrap button.add-cart {
	font-size: 28rpx;
	width: 252rpx;
	height: 82rpx;
	line-height: 82rpx;
	border-radius: 42rpx;
	@include font_color('text_color');
	@include background_color('background_color');
	margin-right: 25rpx;
}

.btns-wrap .icon-box {
	width: 92rpx;
	height: 100rpx;
}

.btns-wrap .icon-box .iconfont {
	font-size: 40rpx;
	color: #999999;
}

.btns-wrap .icon-box .iconfont .num {
	position: absolute;
	top: 10rpx;
	left: 50%;
	height: 30rpx;
	min-width: 30rpx;
	overflow: hidden;
	line-height: 32rpx;
	border-radius: 15rpx;
	font-size: 20rpx;
	color: #ffffff;
	background: red;
}

.btns-wrap button,
.btns-wrap button:after {
	height: 100rpx;
	line-height: 100rpx;
	margin: 0;
	padding: 0;
	border-radius: 0;
	border: 0;
}
</style>
