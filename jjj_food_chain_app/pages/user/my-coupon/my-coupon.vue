<template>
	<view :data-theme="theme()" :class="theme() || ''">
		<view class="top-tabbar">
			<view :class="state_active == 0 ? 'tab-item active' : 'tab-item'" @click="stateFunc(0)">未使用</view>
			<view :class="state_active == 1 ? 'tab-item active' : 'tab-item'" @click="stateFunc(1)">已使用</view>
			<view :class="state_active == 2 ? 'tab-item active' : 'tab-item'" @click="stateFunc(2)">已过期</view>
		</view>

		<!--列表-->
		<scroll-view
			scroll-y="true"
			class="scroll-Y"
			:style="'height:' + scrollviewHigh + 'px;'"
			lower-threshold="50"
			@scrolltoupper="scrolltoupperFunc"
			@scrolltolower="scrolltolowerFunc"
		>
			<view class="">
				<view class="mb20" v-for="(item, index) in supList" :key="index" v-if="supList.length > 0">
					<!-- <view class="d-f" v-if="supList[0].list.length > 0">
						<text class="icon iconfont icon-dianpu1"></text>
						<view class="con_tit">{{ item.name }}</view>
					</view> -->
					<view v-for="(sup_item, sup_index) in item.list" :key="sup_index" class="item-wrap" v-if="item.list.length > 0">
						<view
							:class="sup_item.is_expire == 0 && sup_item.is_use == 0 ? 'coupon-item coupon-item-' + sup_item.color.text : 'coupon-item coupon-item-gray'"
							@click="lookRule(sup_item)"
						>
							<image v-if="sup_item.isUse == 1" class="coupon-disabled" src="/static/coupon-status1.png" mode=""></image>
							<image v-if="sup_item.isExpire == 1" class="coupon-disabled" src="/static/coupon-status2.png" mode=""></image>
							<view class="coupon_type">{{ item.name == '平台优惠券' ? '平台通用' : item.name }}</view>
							<view class="operation d-b-c">
								<view class="flex-1 coupon-content">
									<view class="mb20 text-ellipsis">
										<text class="f40 fb">{{ sup_item.name }}</text>
									</view>
									<view class="f22 gray9 mb20">
										有效期：{{ sup_item.start_time.text }}至{{ sup_item.end_time.text }}
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
									<view class="f24 mb10">{{ sup_item.min_price > 0 ? '满' + sup_item.min_price * 1 + '元可用' : '无门槛' }}</view>
									<template v-if="sup_item.is_expire == 0 && sup_item.is_use == 0">
										<view
											v-if="sup_item.apply_range != 10"
											class="f26 coupon-btn theme-btn"
											@click.stop="gotoPage('/pages/coupon/detail?coupon_id=' + sup_item.coupon_id + '&apply_range=' + sup_item.apply_range)"
										>
											去使用
										</view>
										<view v-else-if="sup_item.shop_supplier_id == 0" class="f26 coupon-btn theme-btn" @click.stop="gotoPage('/pages/index/index')">
											去使用
										</view>
										<view v-else class="f26 coupon-btn theme-btn" @click.stop="gotoPage('/pages/index/index')">
											去使用
										</view>
									</template>
								</view>
							</view>
						</view>
						<view
							class="range_item d-b-c"
							v-if="sup_item.apply_range == 20"
							@click.stop="gotoPage('/pages/coupon/detail?coupon_id=' + sup_item.coupon_id + '&apply_range=' + sup_item.apply_range)"
						>
							<view class="gray9 f24">
								限指定部分商品
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
					<view class="">
						<view class="bottom-refresh">
							<view class="d-c-c p30" v-if="loading"><text class="gray3">加载中...</text></view>
							<view class="d-c-c p30" v-if="no_more"><text class="gray3">~~加载完成~~</text></view>
						</view>
					</view>
					<view class="d-c-c p30" v-if="DataList.length == 0 && !loading">
						<text class="iconfont icon-wushuju"></text>
						<text class="cont">亲，暂无相关记录哦</text>
					</view>
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
					self.phoneHeight = res.windowHeight;
					// 计算组件的高度
					let view = uni.createSelectorQuery().select('.top-tabbar');
					view.boundingClientRect(data => {
						let h = self.phoneHeight - data.height;
						self.scrollviewHigh = h;
					}).exec();
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
			self._get(
				'user.coupon/lists',
				{
					data_type: data_type
				},
				function(res) {
					uni.hideLoading();
					self.DataList = res.data.list;
					self.getSup();
				}
			);
		},
		/* 优惠券分类 */
		getSup() {
			let self = this;
			let supList = [];
			let platformCoupon = {
				name: '平台优惠券',
				list: []
			};
			self.DataList.forEach((item, index) => {
				console.log(index);
				if (item.supplier == null) {
					platformCoupon.list.push(item);
				} else {
					if (supList == '') {
						supList.push({
							name: item.supplier.name,
							list: [item]
						});
					} else {
						let flag = true;
						supList.forEach((sup_item, sup_index) => {
							if (sup_item.name === item.supplier.name) {
								flag = false;
								sup_item.list.push(item);
							}
						});
						if (flag) {
							supList.push({
								name: item.supplier.name,
								list: [item]
							});
						}
					}
				}
			});
			console.log(supList);
			supList.push(platformCoupon);
			self.supList = supList;
		},
		/*状态切换*/
		stateFunc(e) {
			let self = this;
			if (self.state_active != e) {
				if (e == 0) {
					self.data_type = 'not_use';
				}
				if (e == 1) {
					self.data_type = 'is_use';
				}
				if (e == 2) {
					self.data_type = 'is_expire';
				}
				self.state_active = e;
				self.getData();
			}
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

<style lang="scss">
.d-f {
	display: flex;
	align-items: center;
}

.icon-dianpu1 {
	margin-right: 15rpx;
}

.coupon_type {
	min-width: 198rpx;
	text-align: center;
	box-sizing: border-box;
	padding: 0 20rpx;
	height: 36rpx;
	border-top-left-radius: 18rpx;
	border-bottom-right-radius: 18rpx;
	font-size: 24rpx;
	position: absolute;
	z-index: 100;
	color: #ffffff;
	left: 0;
	top: 0;
	@include background_color('background_color');
}
</style>
