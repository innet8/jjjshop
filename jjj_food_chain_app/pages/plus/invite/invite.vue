<template>
	<view class="invite-wrap" v-if="!loadding" style="background: #f2f8ff;">
		<!-- #ifdef MP-WEIXIN || APP-PLUS -->
		<view class="tc  header"
			:style="topBarHeight() == 0 ? '' : 'height:' + topBarHeight() + 'px;padding-top:' + topBarTop() + 'px'">
			<view class="reg180" :style="topBarHeight() == 0 ? '' : 'height:' + topBarHeight() + 'px;'">
				<view class="icon iconfont icon-jiantou" @click="ReLaunch"
					style="width: 48rpx;height: 48rpx;color: #FFFFFF;font-size: 36rpx;"></view>
			</view>
		</view>
		<!-- #endif -->
		<view class="rule">
			<button class="rule_btn" @click="isPopup = true">活动规则</button>
			<button class="rule_btn" @click="ReLaunch()">返回首页</button>
		</view>
		<view class="banner">
			<image :src="detail.file_path" mode="widthFix"></image>
		</view>
		<view class="invite-content">
			<view class="tab d-c-c">
				<view class="item flex-1 d-c-c d-c" :class="tab_active == 0 ? 'active' : ''" @click="tab_active = 0">
					<text class="">领取大礼包</text>
					<text class="f18">火热进行中</text>
				</view>
				<view class="item flex-1 d-c-c d-c" :class="tab_active == 1 ? 'active' : ''" @click="tab_active = 1">
					<text class="">我的奖励</text>
					<text class="f18">多邀多得</text>
				</view>
			</view>
			<view class="invite-inner">
				<!--type 1-->
				<view class="invite-type" v-if="tab_active == 0">
					<view class="content">
						<view class="image">
							<image src="/static/invite/bg-invite.jpg" mode=""></image>
						</view>
						<view class="list d-a-c">
							<view class="item flex-1 d-c-c d-c"
								:class="detail.count >= item.invitation_num ? 'select-item' : ''"
								v-for="(item, index) in detail.Reward" :key="index">
								<text class="invite-num">{{ item.invitation_num }}人</text>
							</view>
						</view>
					</view>
					<view class="state-explan d-c-c" v-if="!detail.is_over">
						已邀请{{ detail.count }}人，还差
						<text class="p-0-10" style="color: #ffcc00;">{{ detail.dif }}</text>
						人就可以领取礼包啦
					</view>
					<view class="state-explan d-c-c" v-if="detail.is_over">
						共邀请
						<text style="color: #ffcc00;">{{ detail.count }}</text>
						人，奖品已全部领取，感谢您的参与
					</view>
					<view class="title" v-if="detail.inv_condition == 0">注：邀请好友注册即邀请成功</view>
					<view class="title" v-if="detail.inv_condition == 1">注：邀请好友注册且好友消费即邀请成功</view>
					<view class="btns-box">
						<!-- #ifdef MP-WEIXIN -->
						<button open-type="share">邀请好友得礼包</button>
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						<button @click="showShare">邀请好友得礼包</button>
						<!-- #endif -->
					</view>
				</view>

				<!--type 2-->
				<view class="invite-type2" v-if="tab_active == 1">
					<view class="list" v-for="(item, index) in detail.prize" :key="index">
						<view class="item p-20-0 d-b-c" v-if="item.coupon_name != ''">
							<view class="d-s-s d-c">
								<view class="d-s-c">
									<image style="width: 36rpx;height: 36rpx;" src="/static/invite/invite-coupon.jpg"
										mode=""></image>
									<text class="f22 ml10 gray9">{{ item.coupon_name }}</text>
								</view>
								<text class="gray9 f18">{{ item.create_time }}</text>
							</view>
							<text class="f22" style="color: #00cd93;">优惠券</text>
						</view>
						<view class="item p-20-0 d-b-c" v-if="item.point != 0">
							<view class="d-s-s d-c">
								<view class="d-s-c">
									<image style="width: 36rpx;height: 36rpx;" src="/static/invite/invite-points.jpg"
										mode=""></image>
									<text class="f22 ml10 gray9">+{{ item.point }}</text>
								</view>
								<text class="gray9 f18">{{ item.create_time }}</text>
							</view>
							<text class="f22" style="color: #00cd93;">积分</text>
						</view>
					</view>
					<view class="d-c-c p30" v-if="detail.prize.length == 0 && !loading">
						<text class="iconfont icon-wushuju"></text>
						<text class="cont">亲，暂无相关记录哦</text>
					</view>
				</view>
			</view>
		</view>
		<!--底部弹窗-->
		<MpShare :isMpShare="isMpShare" @close="closeShare"></MpShare>
		<!--app分享-->
		<!-- #ifdef APP-PLUS -->
		<AppShare :isAppShare="isAppShare" :appParams="appParams" @close="closeShare"></AppShare>
		<!-- #endif -->
		<Popup :show="isPopup" :width="575" :heigth="550" :padding="0" @hidePopup="hidePopupFunc"
			backgroundColor="none">
			<view class="pop-center">
				<image class="bg-rule" src="/static/invite/bg-rule.png" mode=""></image>
				<view class="pop-title">活动规则</view>
				<scroll-view scroll-y="true" style="height: 473rpx;">
					<view class="scroll-box">
						<view class="f26 fb mb22">活动时间:</view>
						<view class="f22 gray6 mb35">{{ detail.start_time.text + '--' + detail.end_time.text }}</view>
						<view class="f26 fb mb22">活动奖励:</view>
						<view class="reward_items" v-for="(item, index) in detail.Reward" :key="index">
							<view class="d-s-c" style="color: #00cd93;">
								<image class="invite-user" src="/static/invite/invite-user.jpg" mode=""></image>
								邀请
								<text style="color:#ffcc00;">{{ item.invitation_num }}</text>
								人后奖励
							</view>
							<view class="d-s-c">
								<template v-if="item.coupon_name != ''">
									<view class="reward_item ">
										<image style="width: 72rpx;height: 72rpx;"
											src="/static/invite/invite-coupon.jpg" mode=""></image>
										<view class="f22 gray9">{{ item.coupon_name }}</view>
									</view>
									<view class="f22 gray9 m-0-20" v-if="item.point != 0 && item.balance != 0">+</view>
								</template>
								<template v-if="item.point != 0">
									<view class="reward_item ">
										<image style="width: 72rpx;height: 72rpx;"
											src="/static/invite/invite-points.jpg" mode=""></image>
										<text class="f22 gray9">{{ item.point }}积分</text>
									</view>
									<view class="f22 gray9 m-0-20" v-if="item.balance != 0">+</view>
								</template>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</Popup>
	</view>
</template>

<script>
	import Popup from '@/components/uni-popup.vue';
	import AppShare from '@/components/app-share.vue';
	import MpShare from '@/components/mp-share.vue';
	export default {
		components: {
			Popup,
			AppShare,
			MpShare
		},
		data() {
			return {
				/*是否加载完成*/
				loadding: false,
				invitation_gift_id: 0,
				/*弹窗是否打开*/
				isPopup: false,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				tab_active: 0,
				/*活动详情*/
				detail: {
					start_time: {
						text: 0
					},
					end_time: {
						text: 0
					},
					dif: 0,
					count: 0
				},
				urldata: '',
				/*app分享*/
				isAppShare: false,
				appParams: {
					title: '',
					summary: '',
					path: ''
				},
				/*公众号分享*/
				isMpShare: false
			};
		},
		onLoad(e) {
			uni.showLoading({
				title: '加载中'
			});
			this.invitation_gift_id = e.invitation_gift_id;
			//#ifdef H5
			this.urldata = window.location.href;
			//#endif
		},
		onShow() {
			/*获取数据*/
			this.getData();
		},
		/*分享*/
		onShareAppMessage() {
			let self = this;
			console.log(self.invitation_gift_id)
			// 构建页面参数
			let params = self.getShareUrlParams({
				invitation_id: self.invitation_gift_id,
				referee_id: self.getUserId()
			});
			return {
				title: self.detail.share_title,
				path: '/pages/user/index/index?' + params,
				imageUrl: self.detail.share.file_path
			};
		},
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				self._get(
					'plus.invitationgift.invitation/getDatas', {
						invitation_gift_id: self.invitation_gift_id || 0,
						url: self.urldata
					},
					function(res) {
						self.detail = res.data.data;
						self.invitation_gift_id = self.detail.invitation_gift_id
						// 配置微信分享参数
						//#ifdef H5
						if (self.urldata != '') {
							let params = {
								invitation_id: self.invitation_gift_id,
								referee_id: self.getUserId()
							};
							self.configWx(res.data.share.signPackage, res.data.share.shareParams, params);
						}
						//#endif
						self.loadding = false;
						uni.hideLoading();
					},
					err => {
						uni.navigateBack();
					}
				);
			},
			/* 返回首页 */
			ReLaunch() {
				this.gotoPage('/pages/index/index', 'reLaunch');
			},
			//关闭活动规则
			hidePopupFunc() {
				this.isPopup = false;
			},
			/*领奖*/
			getPrize(e) {
				let self = this;
				self._post(
					'user.invitation/getPrize', {
						invitation_reward_id: e,
						invitation_gift_id: self.detail.invitation_gift_id
					},
					function(res) {
						uni.hideLoading();
						uni.showToast({
							title: '领取成功',
							duration: 2000,
							icon: 'success'
						});
						self.getData();
					}
				);
			},
			showShare() {
				let self = this;
				//#ifndef APP-PLUS
				self.isMpShare = true;
				//#endif
				//#ifdef APP-PLUS
				self.appParams.title = self.detail.share_title;
				self.appParams.summary = self.detail.share_desc;
				// 构建页面参数
				let params = self.getShareUrlParams({
					invitation_id: self.invitation_gift_id,
					referee_id: self.getUserId()
				});
				self.appParams.path = '/pages/user/index/index?' + params;
				self.appParams.image = self.detail.share.file_path;
				self.isAppShare = true;
				//#endif
			},
			//关闭分享
			closeShare(data) {
				this.isAppShare = false;
				this.isMpShare = false;
			}
		}
	};
</script>

<style lang="scss">
	.invite-wrap {
		min-height: 100vh;
		background: none;
		position: relative;
		padding-top: 726rpx;
		padding-bottom: 60rpx;
		overflow: hidden;
		box-sizing: border-box;
	}

	.banner {
		position: absolute;
		top: 0;
	}

	.invite-wrap .banner image {
		width: 750rpx;
	}

	.invite-wrap .activity-date {
		width: 500rpx;
		height: 40rpx;
		margin: 0 auto;
		border-radius: 20rpx;
		background: #ff5b90;
		color: #ffffff;
	}

	.invite-content {
		margin: 50rpx;
		margin-top: 0;
		border-radius: 25rpx;
		background: #fffceb;
		position: relative;
	}

	.invite-content .tab {
		/* border-bottom: 1px solid #CCCCCC; */
		border-top-left-radius: 15rpx;
		border-top-right-radius: 15rpx;
		overflow: hidden;
	}

	.invite-content .tab .item {
		height: 92rpx;
		font-size: 28rpx;
		background: #ffde9a;
		color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.invite-content .tab .item.active {
		color: #ffffff;
		box-shadow: none;
		background-color: #ffcc00;
	}

	.invite-content .tab .item .headtext {
		font-size: 32rpx;
	}

	.invite-content .invite-inner {
		padding: 0 50rpx 70rpx 50rpx;
	}

	.invite-content .invite-type .title {
		text-align: center;
		color: #7f675b;
		font-size: 24rpx;
		height: 87rpx;
		line-height: 87rpx;
		border-top: 1rpx dashed #7f675b;
	}

	.state-explan {
		font-size: 24rpx;
		color: #00cd93;
		text-align: center;
		padding: 40rpx 0;
	}

	.invite-content .invite-type .content {
		margin-top: 40rpx;
		margin-bottom: 50rpx;
	}

	.invite-content .invite-type .content .image {
		width: 358rpx;
		height: 255rpx;
		margin: 0 auto;
		margin-bottom: 20rpx;

		image {
			width: 358rpx;
			height: 255rpx;
		}
	}

	.invite-content .invite-type .list {
		width: 414rpx;
		margin: 0 auto;
		border-radius: 25rpx;
		background-color: #f8f6e8;
	}

	.invite-content .invite-type .list .item {
		background-color: #f8f6e8;
		border-radius: 25rpx;
		height: 8rpx;
	}

	.invite-content .invite-type .list .item .invite-num {
		display: none;
	}

	.select-item {
		position: relative;
		height: 8rpx;
		background-color: #ffcc00;
	}

	.select-item:first-child {
		border-top-left-radius: 25rpx;
		border-bottom-left-radius: 25rpx;
	}

	.select-item:last-child {
		border-top-right-radius: 25rpx;
		border-bottom-right-radius: 25rpx;
	}

	.select-item .invite-num {
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		bottom: -18rpx;
		color: #7f675b;
		font-size: 24rpx;
	}

	.invite-content .invite-type2 .item {
		border-bottom: 1px dashed #cccccc;
	}

	.invite-content .invite-type2 .item .num {
		color: #f62c6d;
	}

	.invite-content .btns-box {
		margin-top: 45rpx;
	}

	.invite-content .btns-box button {
		margin: 0 auto;
		width: 312rpx;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 35rpx;
		text-align: center;
		background: #ffcc00;
		font-size: 30rpx;
		color: #ffffff;
	}

	.progress {
		height: 15rpx;
		width: 100%;
		background-color: #f7d887;
		margin-top: 32rpx;
		margin-bottom: 27rpx;
	}

	.progress .progress_dot {
		width: 15rpx;
		height: 15rpx;
		background-color: #f88035;
		border-radius: 50%;
		margin: 0 auto;
	}

	.invite_rule {}

	.invite_rule .title {
		color: #ffffff;
		text-align: center;
		font-size: 31rpx;
		line-height: 50rpx;
		margin-bottom: 50rpx;
	}

	.rule_list {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0 50rpx;
	}

	.rule_item {
		width: 128rpx;
		height: 128rpx;
		border-radius: 8rpx;
		background-color: #ffffff20;
		text-align: center;
		line-height: 128rpx;
	}

	.rule_list .rule_item .icon {
		font-size: 88rpx;
		color: #ffffff;
	}

	.oblique {
		color: #f3de8d;
		font-weight: 900;
		margin: 0 30rpx;
	}

	.rule {
		overflow: hidden;
		position: fixed;
		right: 0;
		top: 306rpx;
		z-index: 100;
	}

	.rule_btn {
		margin-bottom: 27rpx;
		width: 131rpx;
		height: 44rpx;
		line-height: 44rpx;
		text-align: center;
		background: #00cd93;
		border-right: none;
		border-top-left-radius: 22rpx;
		border-bottom-left-radius: 22rpx;
		color: #ffffff;
		font-size: 22rpx;
		padding: 0;
	}

	.reward_items {
		padding: 32rpx 0 40rpx 0;
		border-top: 1px dashed #eeeeee;
		border-bottom: 1px dashed #eeeeee;
	}

	.reward_item {
		flex-direction: column;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.reward_time {
		border-bottom: 1px dashed #cccccc;
		padding-bottom: 20rpx;
	}

	.pop-center {
		position: relative;
		width: 575rpx;
		height: 550rpx;
	}

	.pop-title {
		position: relative;
		height: 77rpx;
		line-height: 77rpx;
		color: #ffffff;
		font-size: 28rpx;
		text-align: center;
		z-index: 1;
	}

	.bg-rule {
		width: 575rpx;
		height: 550rpx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;
	}

	.scroll-box {
		color: #7f685a;
		padding: 64rpx 50rpx 60rpx 43rpx;
	}

	.invite-user {
		margin-right: 9rpx;
		flex-shrink: 0;
		width: 32rpx;
		height: 32rpx;
	}

	.f18 {
		font-size: 18rpx;
	}

	.header {
		z-index: 99;
		position: fixed;
		height: 30px;
		line-height: 30px;
		top: 0;
		left: 0;
		width: 100%;
		padding-top: var(--status-bar-height);
	}

	.header .reg180 .icon-jiantou {
		color: #ffffff;
		display: block;
		width: 44rpx;
		height: 44rpx;
		line-height: 44rpx;
		border-radius: 50%;
	}

	.header .reg180 {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
</style>