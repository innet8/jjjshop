<template>
	<view :data-theme="theme()" :class="theme() || ''">
		<scroll-view
			scroll-y="true"
			class="scroll-Y"
			:style="'height:' + scrollviewHigh + 'px;'"
			lower-threshold="50"
			@scrolltoupper="scrolltoupperFunc"
			@scrolltolower="scrolltolowerFunc"
		>
			<view class="">
				<view class="item-wrap mb20 " v-for="(item, index) in DataList" :key="index" v-if="DataList.length > 0">
					<view v-for="(sup_item, sup_index) in item.coupon" :key="sup_index" class="coupon_item" v-if="item.is_coupon">
						<view :class="'coupon-item coupon-item-' + sup_item.color.text" @click="lookRule(sup_item)">
							<!-- <view class="coupon_type">{{ item.supplier.name }}</view> -->
							<view class="operation d-b-c">
								<view class="flex-1 coupon-content">
									<view class="mb20 text-ellipsis">
										<text class="f40 fb">{{ sup_item.name }}</text>
									</view>
									<view class="f22 gray9 mb20">
										<template v-if="sup_item.expire_type == 10">
											有效期：领取{{ sup_item.expire_day }}天内有效
										</template>
										<template v-if="sup_item.expire_type == 20">
											有效期：{{ sup_item.start_time.text }}至{{ sup_item.end_time.text }}
										</template>
									</view>
									<view v-if="sup_item.max_price != 0" class="f22">(最大优惠{{ sup_item.max_price }}元)</view>
								</view>
								<view class="right-box d-c-c d-c">
									<view class="theme-price mb10" v-if="sup_item.coupon_type.value == 10">
										<text class="f24">￥</text>
										<text class="f52 fb">{{ sup_item.reduce_price * 1 }}</text>
									</view>
									<view class="mb10 theme-price" v-if="sup_item.coupon_type.value == 20">
										<text class="f52 fb">{{ sup_item.discount }}</text>
										<text class="f24">折</text>
									</view>
									<!-- <view class="f24 mb10">{{ item.minPrice > 0 ? '满' + item.minPrice * 1 + '元可用' : '无门槛' }}</view> -->
								</view>
							</view>
						</view>
						<view class="range_item d-b-c" v-if="sup_item.apply_range == 20" @click.stop="gotoPage('/pages/coupon/detail?coupon_id=' + sup_item.coupon_id)">
							<view class="gray9 f24">
								限购店铺部分商品
								<text class="icon iconfont icon-jiantou" style="color: #999999; font-size: 22rpx;"></text>
							</view>
							<view class="gray9 f24">本券不支持转赠</view>
						</view>
					</view>
					<view class="points-box f26 tr" v-if="item.is_point">
						积分奖励 ：
						<text class="dominant">{{ item.points }}</text>
					</view>
					<view>
						<button class="giftBtn theme-btn" v-if="item.is_receive == 0" @click="getGift(item.gift_id)">领取</button>
						<button class="giftBtn btn-gray" v-else>已领取</button>
					</view>
				</view>
				<view class="d-c-c p30" v-if="DataList.length == 0 && !loading">
					<text class="iconfont icon-wushuju"></text>
					<text class="cont">亲，暂无相关记录哦</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			/*手机高度*/
			phoneHeight: 0,
			/*可滚动视图区域高度*/
			scrollviewHigh: 0,
			/*状态选中*/
			state_active: 0,
			/*列表*/
			DataList: {},
			no_more: false,
			loading: false,
			data_type: 'not_use',
			supList: []
		};
	},
	mounted() {
		/*初始化*/
		this.init();
		/*获取数据*/
		this.getData();
	},
	methods: {
		/*初始化*/
		init() {
			let self = this;
			uni.getSystemInfo({
				success(res) {
					self.scrollviewHigh = res.windowHeight;
				}
			});
		},

		/*获取数据*/
		getData() {
			let self = this;
			uni.showLoading({
				title: '加载中'
			});
			let data_type = self.data_type;
			self._get('plus.newgift.Newgift/index', {}, function(res) {
				uni.hideLoading();
				self.DataList = res.data.list;
			});
		},
		getGift(e) {
			let self = this;
			uni.showLoading({
				title: '加载中'
			});
			self._get(
				'plus.newgift.Newgift/receive',
				{
					gift_id: e
				},
				function(res) {
					uni.hideLoading();
					self.showSuccess('领取成功', function() {
						self.getData();
					});
				}
			);
		},
		/*可滚动视图区域到顶触发*/
		scrolltoupperFunc() {
			console.log('滚动视图区域到顶');
		},

		/*可滚动视图区域到底触发*/
		scrolltolowerFunc() {
			console.log('滚动视图区域到底');
		},

		/*查看规则*/
		lookRule(item) {
			item.rule = true;
		},

		/*关闭规则*/
		closeRule(item) {
			item.rule = false;
		}
	}
};
</script>

<style>
.item-wrap{
	background: transparent;
}
.coupon-item{
	background: #ffffff;
}
.d-f {
	display: flex;
	align-items: center;
}

.icon-dianpu1 {
	margin-right: 15rpx;
}

.coupon_type {
	padding: 10rpx 20rpx;
	position: absolute;
	z-index: 100;
	color: #ffffff;
	right: 0;
	top: 0;
	background: #cacaca80;
	height: 36rpx;
	border-bottom-left-radius: 18rpx;
}

.con_tit {
	font-weight: 800;
	font-size: 31rpx;
}

.coupon_item {
	margin: 20rpx 0;
}

.range_item {
	border: 1rpx solid #d9d9d9;
	border-top: none;
	padding: 8rpx;
	border-bottom-left-radius: 10rpx;
	border-bottom-right-radius: 10rpx;
	color: #666666;
	box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.1);
}

.giftBtn {
	width: 690rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	font-size: 30rpx;
	margin: 0 auto;
	margin-top: 20rpx;
	border-radius: 40rpx;
}

.points-box {
	height: 60rpx;
	padding: 0 20rpx;
}
</style>
