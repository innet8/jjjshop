<template>
	<view class="apply-cash" :data-theme='theme()' :class="theme() || ''">
		<!--申请成功-->
		<view class="form-wrap p30 f30" v-if="!loading">
			<form @submit="formSubmit" @reset="formReset">
				<view class="d-b-s p32 cash-top" @click="isType=true">
					<view class="f28 gray6 mr32">提现到</view>
					<view class="flex-1 d-s-s" v-if="withdraw_type==10">
						<view>
							<image class="cash-icon mr16" src="/static/wx.png" mode=""></image>
						</view>
						<view>
							<view class="f32">微信钱包</view>
							<view class="f24 gray6 flex-1">实时到账</view>
						</view>
					</view>
					<view class="flex-1 d-s-s" v-if="withdraw_type==30">
						<view>
							<image class="cash-icon mr16" src="/static/yhk.png" mode=""></image>
						</view>
						<view>
							<view class="f32" style="line-height: 1;">银行卡</view>
							<view class="f24 gray6 flex-1" style="line-height: 1.5;">预计2小时内到账</view>
						</view>
					</view>
					<view class="flex-1 d-s-s" v-if="withdraw_type==20">
						<view>
							<image class="cash-icon mr16" src="/static/zfb.png" mode=""></image>
						</view>
						<view>
							<view class="f32">支付宝</view>
							<view class="f24 gray6 flex-1">实时到账</view>
						</view>
					</view>
					<view class="icon iconfont icon-jiantou"></view>
				</view>
				<view class="center-box">
					<template v-if="withdraw_type==30">
						<view>提现到银行卡</view>
						<view class="mt20 d-b-c">
							<view class="f28 gray3" style="width: 160rpx;">户名</view>
							<input class="p20 flex-1 f28 gray3 box-cent" name="bank_account" type="text"
								placeholder-class="gray9" placeholder="请输入开户名" />
						</view>
						<view class="mt20 d-b-c">
							<view class="f28 gray3" style="width: 160rpx;">账号</view>
							<input class="p20 flex-1 f28 gray3 box-cent" name="bank_card" type="text"
								placeholder-class="gray9" placeholder="请输入银行账号" />
						</view>
						<view class="mt20 d-b-c">
							<view class="f28 gray3" style="width: 160rpx;">开户行</view>
							<input class="p20 flex-1 f28 gray3 box-cent" name="bank_name" type="text"
								placeholder-class="gray9" placeholder="请输入开户行名称/地址" />
						</view>
					</template>
					<template v-if="withdraw_type==20">
						<view>提现到支付宝</view>
						<view class="mt20 d-b-c">
							<view class="f28 gray3" style="width: 160rpx;">姓名</view>
							<input class="p20 flex-1 f28 gray3 box-cent" name="alipay_name" type="text"
								placeholder-class="gray9" placeholder="请输入姓名" />
						</view>
						<view class="mt20 d-b-c">
							<view class="f28 gray3" style="width: 160rpx;">账号</view>
							<input class="p20 flex-1 f28 gray3 box-cent" name="alipay_account" type="text"
								placeholder-class="gray9" placeholder="请输入支付宝账号" />
						</view>
					</template>
					<template v-if="withdraw_type==10">
						<view>提现到微信</view>
					</template>
					<view class="mt60">提现金额</view>
					<view class="form-item apply_inpt" style="padding: 0;margin-bottom: 0;">
						<view class="apply_inpt_box">
							<text class="fb" style="font-size: 64rpx;">￥</text><input class="flex-1 text-price" name="money" type="number"
								placeholder-class="inputholder" v-model="money" :placeholder="'最少提现'+lowermoney+'元'" />
						</view>
					</view>
					<view class="f26" style="border-top: 1rpx solid #EEEEEE;padding-top: 70rpx;padding-bottom: 35rpx;">
						<text>可用提现￥{{driver.money?driver.money:0}} ,</text>
						<text class="apply_all dominant" @click="getAll">全部提现</text>
					</view>
					<view class="mb48" v-if="withdraw_type == 10">
						<view>收款账户</view>
						<view class="cash-input-item mb20">
							<input
								:disabled="hasRealName"
								:class="{ disabled: hasRealName }"
								class="p20 flex-1 userInput"
								v-model="realName"
								name="real_name"
								type="text"
								placeholder-class="grary"
								placeholder="请输入姓名"
							/>
						</view>
						<view v-if="!hasRealName" class="f22 gray9">
							<text class="icon iconfont  icon-gantanhao mr10" style="font-size: 24rpx;"></text>
							请输入收款人真实姓名进行提现操作
						</view>
					</view>
					<button type="primary" class="btn-red flex-1 theme-btn"
						form-type="submit">提现</button>
				</view>
			</form>
		</view>
		<Popup :show="isType" :width='750' :padding="0" type="bottom">
			<view class="ww100 box-s-b pop-improt typeof pr">
				<view class="d-c-c mb48">
					<text class="f34 fb">选择提现方式</text>
					<view class="close-text" @click="isType=false">取消</view>
				</view>
				<view class="d-b-c pop-type-item" v-if="hasType('10')"  @click="typeFunc(10)">
					<view class="mr16">
						<image class="cash-icon" src="/static/wx.png" mode=""></image>
					</view>
					<view class="d-b-c flex-1">
						<view class="flex-1  tl">
							<view class="f32 gray72 mb6">微信钱包</view>
							<view class="f24 gray6">实时到账</view>
						</view>
						<view class="select-img" v-if="pop_type==10">
							<image :src="'/static/tab/select_'+getThemeNum()+'.png'" mode=""></image>
						</view>
					</view>
				</view>
				<view class="d-b-c pop-type-item" v-if="hasType('20')"  @click="typeFunc(20)">
					<view class="mr16">
						<image class="cash-icon" src="/static/zfb.png" mode=""></image>
					</view>
					<view class="d-b-c flex-1">
						<view class="flex-1  tl">
							<view class="f32 gray72 mb6">支付宝</view>
							<view class="f24 gray6">实时到账</view>
						</view>
						<view class="select-img" v-if="pop_type==20">
							<image :src="'/static/tab/select_'+getThemeNum()+'.png'" mode=""></image>
						</view>
					</view>
				</view>
				<view class="d-b-c pop-type-item mb30" v-if="hasType('30')"  @click="typeFunc(30)">
					<view class="mr16">
						<image class="cash-icon" src="/static/yhk.png" mode=""></image>
					</view>
					<view class="d-b-c flex-1">
						<view class="flex-1 tl">
							<view class="f32 gray72 mb6">银行卡</view>
							<view class="f24 gray6">预计2小时内到账</view>
						</view>
						<view class="select-img" v-if="pop_type==30">
							<image :src="'/static/tab/select_'+getThemeNum()+'.png'" mode=""></image>
						</view>
					</view>
				</view>
				<button @click="selectType" class="submitbtn">确定</button>
			</view>
		</Popup>
	</view>
</template>

<script>
	import Popup from '@/components/uni-popup.vue';
	export default {
		components: {
			Popup
		},
		data() {
			return {
				/*是否加载完成*/
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				/*支付类别*/
				withdraw_type: 30,
				pop_type:30,
				isData: false,
				driver: {},
				payType: [],
				words: {},
				/*小程序订阅消息*/
				temlIds: [],
				money: '',
				lowermoney: 0,
				isType:false,
				loading:true,
				realName: '',
				hasRealName: false
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
				self.loading = true;
				uni.showLoading({
					title: '加载中'
				});
				self._get('user.driver/cash', {
					platform: self.getPlatform()
				}, function(res) {
					self.driver = res.data.driver;
					self.lowermoney = res.data.settlement.min_money
					self.words = res.data.words;
					self.payType = res.data.settlement.pay_type;
					self.withdraw_type = self.payType[0];
					self.driver.isData = true;
					self.temlIds = res.data.template_arr;
					if (self.driver.real_name) {
						self.realName = self.driver.real_name;
						self.hasRealName = true;
					}
					self.loading = false;
					uni.hideLoading();
				});
			},
			getAll() {
				this.money = this.driver.money;
			},
			/*切换提现方式*/
			TabType(e) {
				this.withdraw_type = e;
			},
			typeFunc(n) {
				this.pop_type = n;
			},
			selectType() {
				this.withdraw_type = this.pop_type;
				this.isType = false;
			},
			/*判断是否存在*/
			hasType(e) {
				if (this.payType.indexOf(e) != -1) {
					return true;
				} else {
					return false;
				}
			},
			getThemeNum() {
				let theme = uni.getStorageSync('theme') || 0;
				return theme
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
					self._post('plus.driver.cash/submit', {
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

<style lang="scss">
	.box-cent {
		box-sizing: content-box;
	}

	.apply_inpt {
		border-radius: 8rpx;
		overflow: hidden;
		margin-top: 30rpx;
	}

	.apply_inpt_box {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.apply_all {
		color: #497DBB;
	}

	.apply-cash {
		padding: 30rpx 22rpx;
	}

	.form-wrap {
		
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
		width: 140rpx;
	}

	.form-item input {
		font-size: 28rpx;
	}

	.form-item .text-price {
		padding: 0 10rpx;
		height: 156rpx;
		font-size: 104rpx;
		line-height: 156rpx;
		border: none;
		background: none;
		font-weight: bold;
	}

	.agreement-content {
		max-height: 60vh;
		overflow-y: auto;
	}

	.form-item .active .iconfont.icon-xuanze {
		color: #04BE01;
	}

	.apply-cash .btn-red {
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 44rpx;
	}

	.inputholder {
		color: #666666;
		font-size: 36rpx;
	}
	.pop-improt {
		width: 622rpx;
		height:480rpx;
		box-sizing: border-box;
		border-radius: 24rpx;
		padding: 32rpx;
	}
	
	.pop-improt .icon-guanbi {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
		width: 30rpx;
		height: 30rpx;
		font-size: 26rpx;
		color: #666666;
	
	}
	
	.pop-improt.typeof {
		width: 750rpx;
		height: auto;
	}
	
	.pop-improt .close-text {
		position: absolute;
		top: 32rpx;
		left: 32rpx;
		font-size: 28rpx;
		font-weight: 600;
		@include font_color("font_color");
	
	}
	.p32{
		padding: 32rpx;
	}
	.cash-top {
		height: 168rpx;
		box-sizing: border-box;
		background: #ffffff;
		margin-bottom: 20rpx;
		border-radius: 15rpx;
	}
	
	.border-top {
		.border-box{
			box-sizing: border;
			border-radius: 40rpx 40rpx 0px 0px;
			background-color: #FFFFFF;
			height: 58rpx;
			width: 100%;
		}
		height: 58rpx;
		width: 100%;
		background-color: #f5f5f5;
		
	}
	.cash-icon {
		width: 40rpx;
		height: 40rpx;
	}
	
	.select-img {
		image{
			width: 48rpx;
			height: 48rpx;
		}
		width: 48rpx;
		height: 48rpx;
	}
	
	.pop-type-item {
		height: 138rpx;
		background: #FFFFFF;
		border-radius: 0px;
		line-height: 1.5;
	}
	.tl{
		text-align: left;
	}
	.mr16{
		margin-right: 16rpx;
	}
	.submitbtn {
		width: 558rpx;
		height: 80rpx;
		@include background_color("background_color");
		opacity: 1;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 80rpx;
		opacity: 1;
		margin: 0 auto;
	}
	.mr32{
		margin-right: 32rpx;
	}
	.center-box{
		padding: 32rpx 22rpx;
		border-radius: 15rpx;
		background-color: #FFFFFF;
	}
</style>
