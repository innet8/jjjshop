<template>
	<view :data-theme="theme()" :class="theme() || ''" class="" v-if="!loadding">
		<block v-if="DataList.length > 0">
			<view class="item-wrap" v-for="(item, index) in DataList" :key="index">
				<view :class="'coupon-item coupon-item-' + item.color.text" @click="lookRule(item)">
					<view class="operation d-b-c">
						<view class="flex-1 coupon-content">
							<view class="mb20">
								<text class="f40 fb">{{ item.name }}</text>
							</view>

							<view class="f22 gray9 mb20">
								<template v-if="item.expire_type == 10">
									有效期：领取{{ item.expire_day }}天内有效
								</template>
								<template v-if="item.expire_type == 20">
									有效期：{{ item.start_time.text }}至{{ item.end_time.text }}
								</template>
							</view>
							<view v-if="item.coupon_type.value == 20" class=" f22">{{ item.max_price > 0 ? '最多抵扣' + item.max_price * 1 + '元' : '无最高抵扣限制' }}</view>
						</view>
						<view class="right-box d-c-c d-c">
							<view class="theme-price mb10" v-if="item.coupon_type.value == 10">
								<text class="f24">￥</text>
								<text class="f52 fb">{{ item.reduce_price * 1 }}</text>
							</view>
							<view class="mb10 theme-price" v-if="item.coupon_type.value == 20">
								<text class="f52 fb">{{ item.discount }}</text>
								<text class="f24">折</text>
							</view>
							<view class="f24 mb10">{{ item.min_price > 0 ? '满' + item.min_price * 1 + '元可用' : '无门槛' }}</view>
							<view v-if="item.state.value > 0" class="f26 coupon-btn theme-btn" v-on:click.stop="receive(item.coupon_id)">领取</view>
							<button type="default" v-else class="f26 coupon-btn btn-gray white" v-on:click.stop>{{ item.state.text }}</button>
						</view>
					</view>
				</view>
				<view class="range_item d-b-c" v-if="item.apply_range == 20" @click.stop="gotoPage('/pages/coupon/detail?coupon_id=' + item.coupon_id)">
					<view class="gray9 f24">
						限购店铺部分商品
						<text class="icon iconfont icon-jiantou" style="color: #999999; font-size: 22rpx;"></text>
					</view>
					<view class="gray9 f24">本券不支持转赠</view>
				</view>
				<view class="range_item d-b-c" v-else>
					<view class="gray9 f24">
						全场通用
						<text class="icon iconfont icon-jiantou" style="color: #999999; font-size: 22rpx;"></text>
					</view>
					<view class="gray9 f24">本券不支持转赠</view>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="none-data-box">
				<image src="/static/none.png" mode="widthFix"></image>
				<text>暂无数据</text>
			</view>
		</block>
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
			DataList: [],
			/*当前页面*/
			page: 1,
			/*每页条数*/
			list_rows: 10
		};
	},
	mounted() {
		uni.showLoading({
			title: '加载中'
		});
		/*获取优惠券列表*/
		this.getData();
	},
	methods: {
		/*获取数据*/
		getData() {
			let self = this;
			self._get(
				'coupon.coupon/lists',
				{
					page: self.page,
					list_rows: self.list_rows
				},
				function(res) {
					self.DataList = res.data.list;
					self.loadding = false;
					uni.hideLoading();
				}
			);
		},
		/*查看规则*/
		lookRule(item) {
			item.rule = true;
		},

		/*关闭规则*/
		closeRule(item) {
			item.rule = false;
		},

		/*领取优惠券*/
		receive(e) {
			let self = this;
			uni.showLoading({
				title: '领取中'
			});
			self._post(
				'user.coupon/receive',
				{
					coupon_id: e
				},
				function(res) {
					uni.hideLoading();
					uni.showToast({
						title: '领取成功',
						duration: 2000,
						icon: 'success'
					});
				}
			);
			self.getData();
		}
	}
};
</script>

<style>
</style>
