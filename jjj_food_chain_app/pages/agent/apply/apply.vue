<template>
	<view class="apply-agent" :data-theme='theme()' :class="theme() || ''">
		<view class="banner d-c-c d-c" v-if="top_background!=''">
			<image :src="top_background" mode="widthFix"></image>
		</view>
		<!--申请成功-->
		<template v-if="!is_applying ">
			<view class="form-wrap p30 f30">
				<view class="p30 d-c-c gray3 f40 fb">
          {{words.apply && words.apply.words && words.apply.words.title && words.apply.words.title.value || ''}}
				</view>
				<form @submit="formSubmit" @reset="formReset">
					<view class="form-item border-b">
						<view class="field-name">邀请人</view>
            {{referee_name || ''}}
					</view>
					<view class="form-item border-b">
						<view class="field-name">姓名</view>
						<input class="flex-1 ml20" name="name" type="text"   placeholder-class="grary"
							placeholder="请输入姓名" />
					</view>
					<view class="form-item border-b">
						<view class="field-name">手机号</view>
						<input class="flex-1 ml20" name="mobile" type="number"   placeholder-class="grary"
							placeholder="请输入手机" />
					</view>
					<view class="d-c-c p-20-0 f28">
						<checkbox-group @change="changeFunc">
							<checkbox value="checkbox" :checked="is_read" />
						</checkbox-group>
						<text>我已阅读并了解</text>
						<text class="dominant" @click="isPopup=true">
              【{{ words.apply && words.apply.words && words.apply.words.license && words.apply.words.license.value || '' }}】
						</text>
					</view>
					<view class="d-c-c mt30">
						<button class="btn-red theme-btn" form-type="submit">{{words.apply && words.apply.words &&  words.apply.words.submit.value }}</button>
					</view>
				</form>
			</view>
		</template>
		<!--分销商审核中-->
		<template v-if="is_applying">
			<view class="d-c-c pt30">
				<text style=" font-size: 100rpx;" class="icon iconfont icon-icon_xianshi-xian"></text>
			</view>
			<view class="p-30-0 d-c-c gray6 f30">
				{{ words.apply.words.wait_audit.value }}
			</view>
			<view class="p30 mt30 d-c-c">
				<button type="primary" class="btn-red theme-btn"
					@click="gotoShop">{{ words.apply.words.goto_mall.value }}</button>
			</view>
		</template>

		<!--协议-->
		<Popup :show="isPopup" msg="申请协议">
			<view class="agreement-content f28 lh150">
				{{agreement}}
			</view>
			<view class="ww100 pt20 d-c-c">
				<button type="primary" class="btn-red theme-btn" @click="isPopup=false">我已阅读</button>
			</view>
		</Popup>
	</view>
</template>

<script>
	import Popup from '@/components/uni-popup.vue'
	export default {
		components: {
			Popup
		},
		data() {
			return {
				/*弹窗是否打开*/
				isPopup: false,
				/*是否阅读了规则*/
				is_read: false,
				agreement: '',
				is_applying: false,
				referee_name: '',
				words: {},
				is_agent: '',
				/*顶部背景*/
				top_background: '',
				/*小程序订阅消息*/
				temlIds: [],
			}
		},
		mounted() {
			/*数据*/
			this.getData();
		},
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				})
				self._get('user.agent/apply', {
					platform: self.getPlatform(),
					referee_id: uni.getStorageSync('referee_id')
				}, function(res) {
					uni.hideLoading();
					self.top_background = res.data.background;
					self.is_applying = res.data.is_applying;
					self.referee_name = res.data.referee_name != null ? res.data.referee_name : '平台';
					self.is_agent = res.data.is_agent;
					self.words = res.data.words;
					self.temlIds = res.data.template_arr;
					self.agreement = res.data.license;
					/*设置标题*/
					uni.setNavigationBarTitle({
						title: self.words.apply.title.value
					});
					if (self.is_agent) {
						uni.navigateBack({});
					}
				});
			},

			/*申请*/
			formSubmit: function(e) {
				let formdata = e.detail.value;
				formdata.referee_id = uni.getStorageSync('referee_id');
				let self = this;

				if (formdata.name == '') {
					uni.showToast({
						title: '请输入姓名！',
						icon: 'none'
					});
					return;
				}
				if (formdata.mobile.length == '') {
					uni.showToast({
						title: '请输入手机号！',
						icon: 'none'
					});
					return;
				}
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(formdata.mobile)) {
					uni.showToast({
						title: '手机有误,请重填！',
						icon: 'none'
					});
					return;
				}

				if (!self.is_read) {
					uni.showToast({
						title: '请同意协议！',
						icon: 'none'
					});
					return;
				}

				let callback = function() {
					uni.showLoading({
						title: '正在提交',
						mask: true
					})
					self._post('plus.agent.apply/submit', formdata, function(res) {
						uni.hideLoading();
						uni.showToast({
							title: '申请成功'
						});
						self.getData();
					});
				};
				self.subMessage(self.temlIds, callback);
			},

			/*去商城看看*/
			gotoShop() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},

			/*同意协议*/
			changeFunc(e) {
				if (e.detail.value.length > 0) {
					this.is_read = true;
				} else {
					this.is_read = false;
				}
			}
		}
	}
</script>

<style>
	.apply-agent .banner {
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.apply-agent .banner image {
		width: 100%;
	}

	.form-wrap {
		background: #FFFFFF;
		box-shadow: 0 0 8rpx 0 rgba(0, 0, 0, .2);
	}

	.form-item {
		padding: 20rpx 0;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 28rpx;
	}

	.form-item .field-name {
		width: 180rpx;
	}

	.form-item input {
		font-size: 28rpx;
	}

	.agreement-content {
		max-height: 60vh;
		overflow-y: auto;
	}

	.apply-agent .btn-red {
		width: 600rpx;
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 44rpx;
	}
</style>
