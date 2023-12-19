<template>
	<view>
		<!--列表-->
		<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'" lower-threshold="50"
			@scrolltoupper="scrolltoupperFunc" @scrolltolower="scrolltolowerFunc">
			<view class="p30 bg-white">
				<view class="item-wrap" v-for="(item, index) in listData" :key="index" @click="gotoDetail(item)"
					:style="'background: url('+item.card_style_url+') left top / 100% 100% no-repeat;'">
					<view class="item-wrap-box">
						<view class="f24 mb48 d-s-c">
							<image src="/static/icon/log-vip.png" class="vip-image" mode="aspectFill"></image>
							{{item.card_name||item.card.card_name}}
						</view>
						<view class="tc f60 fb mb16">{{item.money}}元</view>
						<view class="tc f26">{{item.expire_time_text}}</view>
						<view class="tc f24 mt40"><text v-if="item.open_coupon">开卡送券 · </text><text
								v-if="item.open_points">开卡送积分 · </text>更多特权</view>
					</view>
				</view>
			</view>
			<view class="d-c-c p30" v-if="listData.length == 0 && !loading">
				<text class="iconfont icon-wushuju"></text>
				<text class="cont">亲，暂无相关记录哦</text>
			</view>
			<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
		</scroll-view>
	</view>
</template>
<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				/*手机高度*/
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				/*状态选中*/
				state_active: 0,
				/*列表*/
				/*当前第几页*/
				page: 1,
				/*一页多少条*/
				last_page: 0,
				list_rows: 15,
				listData: [],
				no_more: false,
				loading: false,
				data_type: 'not_use',
				cardCount: {
					cardCount: 0,
					myCount: 0
				}
			};
		},
		mounted() {
			/*初始化*/
			this.init();
		},
		onShow() {
			this.initData()
			/*获取数据*/
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
		methods: {
			/*初始化*/
			init() {
				let self = this;
				uni.getSystemInfo({
					success(res) {
						self.phoneHeight = res.windowHeight;
						self.scrollviewHigh = res.windowHeight;
					}
				});
			},
			initData() {
				this.listData = [];
				this.page = 1;
				this.no_more = false;
			},
			/*获取数据*/
			getData() {
				let self = this;
				self.loading = true;
				let url = '';
				url = 'user.UserCard/index';
				self._get(url, {
					page: self.page,
					list_rows: self.list_rows
				}, function(res) {
					self.loading = false;
					self.cardCount = res.data.cardCount;
					self.listData = self.listData.concat(res.data.list.data);
					self.last_page = res.data.list.last_page;
					if (res.data.list.last_page <= 1) {
						self.no_more = true;
						return false;
					}
				});
			},

			/*可滚动视图区域到底触发*/
			scrolltolowerFunc() {
				let self = this;
				if (self.no_more) {
					return;
				}
				self.page++;
				if (self.page <= self.last_page) {
					self.getData();
				} else {
					self.no_more = true;
				}
			},
			/*状态切换*/
			stateFunc(e) {
				let self = this;
				if (self.loading) {
					return
				}
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
					self.initData();
					self.getData();
				}
			},

			/*可滚动视图区域到顶触发*/
			scrolltoupperFunc() {
				console.log('滚动视图区域到顶');
			},
			/*查看规则*/
			lookRule(item) {
				item.rule = true;
			},

			/*关闭规则*/
			closeRule(item) {
				item.rule = false;
			},
			gotoDetail(item) {
				this.gotoPage('/pages/order/card?state_active=0&card_id=' + item.card_id);
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.item-wrap {
		padding: 22rpx;
		box-sizing: border-box;
		height: 380rpx;
		transform: scale(0.95);
	}

	.item-wrap-box {
		// border: 1rpx solid #99999980;
		padding: 35rpx 20rpx;
		height: 100%;
		color: rgba($color: #ffffff, $alpha: 0.7);
	}

	.vip-image {
		width: 30rpx;
		height: 30rpx;
		opacity: 0.8;
		margin-right: 10rpx;
	}
</style>
