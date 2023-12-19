<template>
	<view class="index-agent o-h" v-if="!loadding"  :data-theme='theme()' :class="theme() || ''">
		<!--头部图片-->
		<view class="banner d-c-c d-c">
			<image :src="top_background" mode="widthFix"></image>
		</view>

		<!--是分销商-->
		<template v-if="is_agent && isData">
			<!--金额信息-->
			<view class="agent-wrap pr m-0-20" style="margin-top: 300rpx;">
				<view class="d-b-c border-b pb30 f28 lh150">
					<view>
						<text class="gray3 f32">用户名：</text>
						<text class="gray3 f32">{{ user.nickName }}</text>
					</view>
					<view>
						<text class="gray3 f32">{{ info_words.index.words.referee.value }}：</text>
						<text class="f32 gray3">{{ agent.referee ? agent.referee.nickName : '平台' }}</text>
					</view>
				</view>
				<view class="d-s-c p-30-0 top_dash">
					<view class="flex-1 d-c-c d-c">
						<view class="redF6">
							<text class="f24">￥</text>
							<text class="f40">{{ agent.money }}</text>
						</view>
						<view class="pt20 f26 gray3">{{ info_words.index.words.money.value }}</view>
					</view>
					<view class="flex-1 d-c-c d-c">
						<view class="">
							<text class="f24">￥</text>
							<text class="f40">{{ agent.freeze_money }}</text>
						</view>
						<view class="pt20 f28 gray3">{{ info_words.index.words.freeze_money.value }}</view>
					</view>
					<view class="flex-1 d-c-c d-c">
						<view class="">
							<text class="f24">￥</text>
							<text class="f40">{{ agent.total_money }}</text>
						</view>
						<view class="pt20 f28 gray3">{{ info_words.index.words.total_money.value }}</view>
					</view>
				</view>
				<view class="d-c-c pt30">
					<button type="primary" class="theme-btn flex-1" @click="gotoCash">{{ info_words.index.words.cash.value }}</button>
				</view>
			</view>
			<!--图标入口-->
			<view class="agent-wrap m-0-20 p30 d-s-c f-w mt20 bg-white">
				<view class="d-c-c d-c flex-1" @click="gotoPage('/pages/agent/cash/list/list')">
					<view>
						<image class="agent_index_img" src="../../../static/icon/icon-zijinmingxi.png" mode=""></image>
					</view>
					<text class="pt10 f26 mt20">{{ info_words.cash_list.title.value }}</text>
				</view>
				<view class="d-c-c d-c flex-1" @click="gotoPage('/pages/agent/order/order')">
					<view>
						<image class="agent_index_img" src="../../../static/icon/icon-fenxiaodingdan.png" mode=""></image>
					</view>
					<text class="pt10 f26 mt20">{{ info_words.order.title.value }}</text>
				</view>
				<view class="d-c-c d-c flex-1" @click="gotoPage('/pages/agent/team/team')">
					<view>
						<image class="agent_index_img" src="../../../static/icon/icon-tuandui.png" mode=""></image>
					</view>
					<text class="pt10 f26 mt20">{{ info_words.team.title.value }}</text>
				</view>
				<view class="d-c-c d-c flex-1" @click="gotoPage('/pages/agent/qrcode/qrcode')">
					<view>
						<image class="agent_index_img" src="../../../static/icon/icon-erweima.png" mode=""></image>
					</view>
					<text class="pt10 f26 mt20">{{ info_words.qrcode.title.value }}</text>
				</view>
			</view>
		</template>
		<!--不是分销商-->
		<template v-if="!is_agent && isData">
			<view class="no-agent">
				<view class="mt50 p-0-20 red f34 tc">{{ info_words.index.words.not_agent.value }}</view>
				<view class="p30 mt30" style="padding-top: 80rpx;">
					<button type="primary" class="theme-btn" @click="applyagent">{{ info_words.index.words.apply_now.value }}</button>
				</view>
			</view>
		</template>
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
				/*0：不是分销商，1：分销商申请中，2：已经是分销商*/
				is_agent: false,
				isData: false,
				agent: {},
				/*顶部背景*/
				top_background: '',
				/*基本信息*/
				info_words: {},
				words: {},
				user: {},
				titel: ''
			};
		},
		onLoad(e) {
			if (e.is_agent) {
				this.is_agent = e.is_agent;
			}
		},
		onShow() {
			uni.showLoading({
				title: '加载中'
			});
			/*获取个人中心数据*/
			this.getData();
		},
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				self._get('user.agent/center', {}, function(data) {
					self.info_words = data.data.words;
					uni.setNavigationBarTitle({
						title: self.info_words.index.title.value != '' ? self.info_words.index.title.value : self.info_words.index.title
							.default
					});
					self.titel = data.data.words.index.title.value;
					uni.setNavigationBarTitle({
					    title: self.titel
					});
					self.is_agent = data.data.is_agent;
					self.top_background = data.data.background;
					self.agent = data.data.agent;
					self.user = data.data.user;
					self.isData = true;
					self.loadding = false;
					uni.hideLoading();
				});
			},

			/*申请分销商*/
			applyagent() {
				this.gotoPage('/pages/agent/apply/apply');
			},

			/*去商城逛逛*/
			gotoShop() {
				this.gotoPage('/pages/index/index')
			},

			/*去提现*/
			gotoCash() {
				this.gotoPage('/pages/agent/cash/apply/apply');
			},
			goback() {
				uni.navigateBack();
			}
		}
	};
</script>

<style>
	page {
		background-color: #f2f2f2;
	}

	.index-agent .banner {
		position: absolute;
		width: 100%;
		z-index: 0;
		min-height: 167rpx;
		/* padding-bottom: 60rpx; */
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.index-agent .banner image {
		width: 100%;
	}

	.no-agent {
		padding-top: 190rpx;
	}

	.no-agent-img {
		padding-top: 60rpx;
	}

	.no-agent-img image {
		width: 300rpx;
	}

	.agent-wrap {
		border-radius: 12rpx;
		background-position: -8px 52rpx;
		background-size: 100% 100%;
		background-image: radial-gradient(circle at 8px, transparent 0%, transparent 8px, #ffffff 8px, #ffffff 100%);
		padding: 31rpx 25rpx 36rpx 25rpx;
	}

	.index-agent .agent-wrap .iconfont {
		font-size: 60rpx;
	}

	.index-agent .theme-btn {
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 44rpx;
	}

	.reg180 {
		padding-right: 20rpx;
		text-align: right;
		transform: rotateY(180deg);
		position: absolute;
		bottom: 0;
	}

	.icon-jiantou {

		color: #FFFFFF;
		font-size: 30rpx;
	}

	.head_top {
		position: absolute;
		width: 100%;
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
		font-size: 32rpx;
		z-index: 2;
	}

	.top_dash {
		border-bottom: 1rpx dashed #D9D9D9;
		padding-bottom: 9px;

	}

	.agent_index_img {
		width: 90rpx;
		height: 90rpx;
	}
</style>
