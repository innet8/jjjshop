<template>
	<view :data-theme='theme()' :class="theme() || ''">
		<view class="apply_tit">跑腿入驻申请</view>
		<view class="apply_box">
			<view class="apply-from-item">
				<view class="apply-from-tit">姓名</view>
				<input class="apply-from-ipt" type="text" placeholder="请输入姓名" v-model="detail.name" />
			</view>
			<view class="apply-from-item">
				<view class="apply-from-tit">手机号</view>
				<input class="apply-from-ipt" type="number" placeholder="请输入手机号" v-model="detail.mobile" />
			</view>
			<view class="apply-from-item">
				<view class="apply-from-tit">身份证号</view>
				<input class="apply-from-ipt" type="text" placeholder="请输入身份证号" v-model="detail.identfy_card" />
			</view>
			<view class="apply-from-item" v-if="cash_open==1">
				<view class="apply-from-tit">缴纳押金金额</view>
				<input class="apply-from-ipt" type="text" disabled :value="take_cash" />
			</view>
			<view class="pt20">
				<button v-if="isapply==0" class="apply_btn theme-btn" @click="submit">提交申请</button>
				<button v-if="isapply==1" class="apply_btn theme-btn" @click="subFunc">立即支付</button>
			</view>
			<view class="tc mt30 f26 gray9">申请即视作同意
				<text class="blue" @click="gotoPage('/pages/service/service')">《用户服务协议》</text>
				及
				<text class="blue" @click="gotoPage('/pages/service/privacy')">《隐私政策》</text>
			</view>
		</view>
	</view>
</template>

<script>
	import cashier from '@/components/cashier/cashier.vue';
	import {
		pay
	} from '@/common/pay.js';
	export default {
		components: {
			cashier
		},
		data() {
			return {
				detail: {
					name: '',
					mobile: '',
					identfy_card: ''
				},
				cash_open: '',
				take_cash: '',
				takeStatus: 0,
				applyInfo: {},
				paytype: '',
				isapply: 0
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self._post('user.index/detail', {
					source: self.getPlatform()
				}, function(res) {
					//#ifdef MP-WEIXIN
					if (res.data.getPhone) {
						uni.navigateTo({
							url: "/pages/login/bindmobile"
						});
						return;
					}
					//#endif
					self.cash_open = res.data.cash_open;
					self.take_cash = res.data.take_cash;
					self.takeStatus = res.data.takeStatus;
					if (res.data.applyInfo != null) {
						self.applyInfo = res.data.applyInfo;
						self.detail.mobile = res.data.applyInfo.mobile;
						self.detail.name = res.data.applyInfo.real_name;
						self.detail.identfy_card = res.data.applyInfo.identfy_card;
						self.isapply = 1
					}
					self.paytype = self.getPlatform();
					uni.hideLoading();
				});
			},
			subFunc(e) {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self._post(
					'plus.driver.apply/deposit', {
						pay_source: self.getPlatform()
					},
					function(result) {
						uni.hideLoading()
						let pages = '/pages/order/cashier?order_type=60&order_id=' + result.data.order_id;
						self.gotoPage(pages);
					}
				);
			},
			submit() {
				let self = this;
				let formdata = self.detail;
				if (formdata.name == '') {
					uni.showToast({
						title: '请输入姓名！',
						icon: 'none'
					});
					return;
				}
				if (formdata.mobile == '') {
					uni.showToast({
						title: '请输入手机号码',
						duration: 1000,
						icon: 'none'
					});
					return false;
				}
				let reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
				if (!reg.test(formdata.mobile)) {
					uni.showToast({
						title: '手机号码格式不正确',
						duration: 1000,
						icon: 'none'
					});
					return false;
				}
				if (formdata.identfy_card == '') {
					uni.showToast({
						title: '请输入身份证号！',
						icon: 'none'
					});
					return;
				}
				uni.showLoading({
					title: '加载中'
				})
				self._post('plus.driver.apply/submit', formdata, function(res) {
					uni.hideLoading();
					if (res.data.cash_open == 1) {
						self.isapply = 1;
						uni.setStorageSync('rider_apply', formdata)
						self.subFunc();
					} else {
						self.gotoPage('/pages/user/index/index');
					}
				});

			}
		}
	}
</script>

<style>
	.apply_tit {
		padding-top: 120rpx;
		text-align: center;
		font-size: 36rpx;
		font-weight: 800;
		color: #333333;
		margin-bottom: 20rpx;
	}

	.apply-from-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.apply-from-tit {
		width: 480rpx;
		margin-bottom: 20rpx;
		font-size: 26rpx;
		color: #333333;
	}

	.apply-from-ipt {
		width: 480rpx;
		height: 60rpx;
		background-color: #e8e8e8;
		border-radius: 10rpx;
		padding-left: 20rpx;
		font-size: 32rpx;
	}

	.apply_btn {
		width: 480rpx;
		height: 80rpx;
		background-color: #f68f2a;
		color: #FFFFFF;
		font-size: 32rpx;
		text-align: center;
		line-height: 80rpx;
		border-radius: 40rpx;
		margin: 0 auto;
		margin-top: 10rpx;
	}

	.m-0-a {
		margin: 0 auto;
	}
</style>