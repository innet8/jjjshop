<template>
	<view class="apply-cash" v-if="!loadding">
		<!--申请成功-->
		<view class="form-wrap f30">
			<form @submit="formSubmit" @reset="formReset">
				<view class="p-0-20 pt30 txje">
					{{ words.cash_apply.words.money.value }}<text class="f26 gray9 ml30">{{ words.cash_apply.words.min_money.value+settlement.min_money+'元' }}</text>
				</view>
				<view class="p-0-20 ">
					<view class="withd-bc">
						<view class="withd-bct">
							<view style="height: 100%;display: flex;align-items: center;">
								<text style="font-size: 48rpx;">￥</text>
								<input class="tx-inpt" name="money" v-model="money" type="number" />
							</view>
						</view>
						<view class="withd-bcb">
							{{ words.cash_apply.words.capital.value }}{{agent.money}}元,<text @click="getAll" style="color: #0479FF;">全部提现</text>
						</view>
					</view>
				</view>
				<view class="p20 f32 gray3 txbt">提现方式</view>
				<view class="form-item p20">
					<view class="ww100">
						<template v-if="hasType('10')">
							<view class="p-30-0 border-b">
								<view class="d-b-c" :class="withdraw_type==10?'active':''" @click="TabType(10)">
									<text class="f26 gray3">微信支付</text>
									<text class="icon iconfont icon-xuanze"></text>
								</view>
								<template v-if="withdraw_type == 10">
									<!-- 暂时使用--true--代替已经输入的情况 -->
									<view class="mt20">
										<input :disabled="hasRealName" class="p20 border" name="real_name" v-model="real_name" type="text" placeholder-class="grary" placeholder="请输入姓名" />
									</view>
									<view v-if="!hasRealName" class="gray9 f22 d-s-c">
										<text class="icon iconfont icon-gantanhao mr10" style="font-size: 24rpx;"></text>
										请输入收款人真实姓名进行提现操作！
									</view>
								</template>
							</view>
						</template>
						<template v-if="hasType('20')">
							<view class="p-30-0 border-b">
								<view class="d-b-c" :class="withdraw_type==20?'active':''" @click="TabType(20)">
									<text class="f26 gray3">支付宝</text>
									<text class="icon iconfont icon-xuanze"></text>
								</view>
								<template v-if="withdraw_type==20">
									<view class="mt20">
										<input class="p20 border" name="alipay_name" type="text"   placeholder-class="grary" placeholder="请输入姓名" />
									</view>
									<view class="mt20">
										<input class="p20 border" name="alipay_account" type="text"   placeholder-class="grary" placeholder="请输入支付宝账号" />
									</view>
								</template>
							</view>
						</template>
						<template v-if="hasType('30')">
							<view class="p-30-0 border-b">
								<view class="d-b-c" :class="withdraw_type==30?'active':''" @click="TabType(30)">
									<text class="f26 gray3">银行卡</text>
									<text class="icon iconfont icon-xuanze"></text>
								</view>
								<template v-if="withdraw_type==30">
									<view class="mt20">
										<input class="p20 border" name="bank_name" type="text"   placeholder-class="grary" placeholder="请输入姓名" />
									</view>
									<view class="mt20">
										<input class="p20 border" name="bank_account" type="text"   placeholder-class="grary" placeholder="请输入开户行名称/地址" />
									</view>
									<view class="mt20">
										<input class="p20 border" name="bank_card" type="text"   placeholder-class="grary" placeholder="请输入银行卡号" />
									</view>
								</template>
							</view>
						</template>
					</view>
				</view>
				<view class="d-c-c mt60" style="border: 16rpx solid #F2F2F2">
					<button type="primary" class="btn-red flex-1" form-type="submit">{{ words.cash_apply.words.submit.value }}</button>
				</view>
			</form>

		</view>

	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				loadding: true,
				/*是否加载完成*/
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				/*支付类别*/
				withdraw_type: 10,
				isData: false,
				agent: {},
				payType: [],
				words: {},
				/*小程序订阅消息*/
				temlIds: [],
				money: '',
				real_name: '',
				hasRealName: false,
				settlement: {}
			}
		},
		mounted() {
			/*获取数据*/
			this.getData();
		},
		methods: {

			/*获取数据*/
			getData() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self.loadding = true;
				self._get('user.agent/cash', {
					platform: self.getPlatform()
				}, function(res) {
					self.agent = res.data.agent;
					self.words = res.data.words;
					self.payType = res.data.settlement.pay_type;
					self.settlement = res.data.settlement;
					self.agent.isData = true;
					self.temlIds = res.data.template_arr;
					if (self.agent && self.agent.real_name) {
						self.real_name = self.agent.real_name;
						self.hasRealName = true;
					}
					self.loadding = false;
					uni.hideLoading();
				});
			},

			/*切换提现方式*/
			TabType(e) {
				this.withdraw_type = e;
			},

			/*判断是否存在*/
			hasType(e) {
				if (this.payType.indexOf(e) != -1) {
					return true;
				} else {
					return false;
				}
			},
			getAll() {
				this.money = this.agent.money;
			},
			/*申请*/
			formSubmit: function(e) {

				let self = this;
				var formdata = e.detail.value;
				formdata.pay_type = self.withdraw_type;
				var data = JSON.stringify(formdata);
				let callback = function() {
					uni.showLoading({
						title: '正在提交',
						mask: true
					})
					self._post('plus.agent.cash/submit', {
						data: data
					}, function(data) {
						uni.hideLoading();
						uni.showToast({
							title: '申请成功',
							duration: 2000,
							icon: 'success'
						});
						uni.navigateBack(-1);
					});
				}
				self.subMessage(self.temlIds, callback);
			},
		}
	}
</script>

<style>
	page {
		background-color: #F2F2F2;
	}

	.txje {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		margin-top: 16rpx;
	}

	.apply-cash {
		/* padding-top: 16rpx; */
	}

	.form-wrap {
		/* border-radius: 20rpx; */
		background: #FFFFFF;
		/* box-shadow: 0 0 16rpx 0 rgba(0, 0, 0, .2); */
	}

	.form-item {
		margin-bottom: 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 28rpx;
	}

	.form-item .field-name {
		width: 140rpx;
	}

	.form-item input {
		font-size: 28rpx;
	}

	.txbt {
		border-top: 16rpx solid #F2F2F2;

	}

	.form-item .text-price {
		padding: 0 10rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		border: 1px solid #CCCCCC;
	}

	.agreement-content {
		max-height: 60vh;
		overflow-y: auto;
	}

	.iconfont.icon-xuanze {
		font-size: 30rpx;
	}

	.form-item .active .iconfont.icon-xuanze {
		color: #F6220C;
	}

	.apply-cash .btn-red {
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 44rpx;
		background: linear-gradient(90deg, #FF6B6B 4%, #F6220C 100%);
		border: none;
		font-size: 32rpx;
	}

	.withd-b {
		background-color: #FFFFFF;
		margin-bottom: 97rpx;
	}

	.withd-bct {
		height: 92rpx;
		padding-top: 59rpx;
		padding-right: 49rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #d0d0d0;
	}

	.tx-inpt {
		background-color: #FFFFFF;
		font-size: 48rpx;
		line-height: 92rpx;
	}

	.withd-bcb {
		font-size: 26rpx;
		color: #999999;
		padding: 27rpx 0 49rpx 0;
	}

	.withdrawal-btn {
		margin: 0 30rpx;
		background-color: #f36a24;
		height: 60rpx;
		line-height: 60rpx;
		color: #FFFFFF;
		text-align: center;
		border-radius: 30rpx;
		padding: 0;
		font-size: 24rpx;
	}
</style>
