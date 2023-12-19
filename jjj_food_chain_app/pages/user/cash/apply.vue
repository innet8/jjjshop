<template>
	<view class="apply-cash" v-if="!loadding" :data-theme='theme()' :class="theme() || ''">
		<!--申请成功-->
		<view class="form-wrap ">
			<form @submit="formSubmit">
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
							<view class="f32">银行卡</view>
							<view class="f24 gray6 flex-1">预计2小时内到账</view>
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
				<view class="border-top">
					<view class="border-box"></view>
				</view>
				<view class="p-0-32">
					<template v-if="withdraw_type==20">
						<view class="f28 mb16">提现支付宝</view>
						<view class="cash-input-item">
							<view class="input-label">姓名</view>
							<input class="p20 flex-1" name="alipay_name" type="text"   placeholder-class="grary"
								placeholder="请输入姓名" />
						</view>
						<view class="cash-input-item mb48">
							<view class="input-label">账号</view>
							<input class="p20 flex-1" name="alipay_account" type="text"
								placeholder-class="grary" placeholder="请输入支付宝账号" />
						</view>
					</template>
					<template v-if="withdraw_type==30">
						<view class="f28 mb16">提现银行卡</view>
						<view class="cash-input-item">
							<view class="input-label">开户名</view>
							<input class="p20 flex-1" name="bank_account" type="text"   placeholder-class="grary"
								placeholder="请输入开户名" />
						</view>
						<view class="cash-input-item">
							<view class="input-label">账号</view>
							<input class="p20 flex-1" name="bank_card" type="text"   placeholder-class="grary"
								placeholder="请输入银行卡号" />
						</view>
						<view class="cash-input-item mb48">
							<view class="input-label">开户行</view>
							<input class="p20 flex-1" name="bank_name" type="text"   placeholder-class="grary"
								placeholder="请输入开户行名称/地址" />
						</view>
					</template>
					<view class=" txje">提现金额</view>
					<view class="mb48">
						<view class="withd-bc">
							<view class="withd-bct">
								<view style="height: 100%;display: flex;align-items: center;">
									<text style="font-size: 48rpx;">￥</text>
									<input class="tx-inpt" name="money" v-model="money" type="number" />
								</view>
							</view>
							<view class="withd-bcb f26" v-if="money*1>balance*1">
								<text class="red">输入金额超过可提现金额</text>
							</view>
							<view class="withd-bcb gray6 f26" v-else>
								可提现余额{{balance}}元,<text @click="getAll" class="dominant fb">全部提现</text>
							</view>
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
					</view>
					<view class="d-c-c" style="border: 16rpx solid #ffffff">
						<button v-if="money*1<=balance*1"  class="btn-red theme-btn flex-1"
							@click="popup">提交申请</button>
						<button v-else disabled class="btn-red-disabled flex-1" @click="popup">提交申请</button>
					</view>
					<!-- <view class="login_index_seller_rule">
						<label class="">
							<radio class="radio" value="r1" :checked="ifchecked" 
								@click="checkedme(false)" />
						</label>
						<text class="gray6">我已阅读并同意</text>
						<text class="dominant"
							@click="gotoPage('/pages/agent/cash/apply/webview')">《提现规则》</text>
					</view> -->
					<view class="f28 gray9 tc pt20" @click="gotoPage('/pages/user/cash/list')">提现记录</view>
				</view>

				<Popup :show="isPopup" :width='622' :padding="0" type="middle">
					<view class="ww100 box-s-b pop-improt pr">
						<view class="d-c-c mb48">
							<text class="f34 fb">实际到账</text>
							<view class="icon iconfont icon-guanbi" @click="hidePopupFunc(1)"></view>
						</view>
						<view class="tc f40 mb48 fb">
							￥<text class="f64">{{overMoney}}</text>
						</view>
						<view class="d-b-c mb60" style="line-height: 48rpx;">
							<view class="gray6 f28">提现比例</view>
							<view class="gray3 f28">{{cash_ratio}}%</view>
						</view>
						<button form-type="submit" class="submitbtn theme-btn">确认提交</button>
					</view>
				</Popup>
				<Popup :show="isType" :width='750' :padding="0" type="bottom">
					<view class="ww100 box-s-b pop-improt typeof pr">
						<view class="d-c-c mb48">
							<text class="f34 fb">选择提现方式</text>
							<view class="close-text" @click="isType=false">取消</view>
						</view>
						<view class="d-b-c pop-type-item" @click="typeFunc(10)">
							<view class="mr16">
								<image class="cash-icon" src="/static/wx.png" mode=""></image>
							</view>
							<view class="d-b-c flex-1">
								<view class="flex-1  tl">
									<view class="f32 gray6 mb6">微信钱包</view>
									<view class="f24 gray6">实时到账</view>
								</view>
								<view class="select-img" v-if="pop_type==10">
									<image src="/static/select.png" mode=""></image>
								</view>
							</view>
						</view>
						<view class="d-b-c pop-type-item" @click="typeFunc(20)">
							<view class="mr16">
								<image class="cash-icon" src="/static/zfb.png" mode=""></image>
							</view>
							<view class="d-b-c flex-1">
								<view class="flex-1  tl">
									<view class="f32 gray6 mb6">支付宝</view>
									<view class="f24 gray6">实时到账</view>
								</view>
								<view class="select-img" v-if="pop_type==20">
									<image src="/static/select.png" mode=""></image>
								</view>
							</view>
						</view>
						<view class="d-b-c pop-type-item" @click="typeFunc(30)">
							<view class="mr16">
								<image class="cash-icon" src="/static/yhk.png" mode=""></image>
							</view>
							<view class="d-b-c flex-1">
								<view class="flex-1 tl">
									<view class="f32 gray6 mb6">银行卡</view>
									<view class="f24 gray6">预计2小时内到账</view>
								</view>
								<view class="select-img" v-if="pop_type==30">
									<image src="/static/select.png" mode=""></image>
								</view>
							</view>
						</view>
						<button @click="selectType" class="submitbtn">确定</button>
					</view>
				</Popup>
			</form>
		</view>

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
				loadding: true,
				/*是否加载完成*/
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				/*支付类别*/
				withdraw_type: 10,
				agent: {},
				payType: [],
				words: {},
				/*小程序订阅消息*/
				temlIds: [],
				money: '',
				ifchecked: false,
				urls: '',
				isPopup: false,
				cash_ratio: 0,
				cash_ratioMoney: '',
				overMoney: '',
				isType: false,
				pop_type: 10,
				balance: '',
				realName: '',
				hasRealName: false
			}
		},
		mounted() {
			/*获取数据*/
			this.getData();
		},
		onLoad() {
			// this.url = this.config.app_url + '/agreement/cash.docx';
		},
		watch: {
			'money': function(n, o) {
				let self = this;
				if (n != o) {
					self.cash_ratioMoney = self.cash_ratio_percent();
					self.overMoney = self.overprice();

				}
			}
		},
		methods: {
			typeFunc(n) {
				this.pop_type = n;
			},
			/*获取数据*/
			getData() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self.loadding = true;
				self._get('user.cash/index', {
					platform: self.getPlatform()
				}, function(res) {
					self.balance = res.data.balance;
					self.cash_ratio = res.data.cash_ratio;
					if (res.data.real_name) {
						self.realName = res.data.real_name;
						self.hasRealName = true;
					}
					// self.payType = self.agent.settlement.pay_type;
					self.loadding = false;
					uni.hideLoading();
				});
			},

			checkedme(e) {
				let self = this;
				self.ifchecked = !self.ifchecked;
			},
			/*切换提现方式*/
			TabType(e) {
				this.withdraw_type = e;
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
			popup() {
				this.isPopup = true;
			},
			hidePopupFunc() {
				this.isPopup = false;
			},
			getAll() {
				this.money = this.balance;
			},
			// openDoc(e) {
			// 	var that = this;
			// 	var filePath = e.currentTarget.dataset.url; //对应的网络路径，可以是内网的或者外网
			// 	var fileType = e.currentTarget.dataset.type;
			// 	console.log(filePath)
			// 	wx.downloadFile({ //下载对应文件
			// 		url: filePath,
			// 		filePath: wx.env.USER_DATA_PATH + "/汇乐宝提现规则.docx",
			// 		success: function(res) {
			// 			var filePath = res.filePath; //文件路径    
			// 			wx.openDocument({
			// 				filePath: filePath, // 装载对应文件的路径
			// 				fileType: fileType, // 指定打开的文件类型
			// 				showMenu: true, // 右上角的菜单转发分享操作
			// 				success: function(res) {
			// 					console.log("打开成功");
			// 				},
			// 				fail: function(res) {}
			// 			})
			// 		},
			// 		fail: function(res) {
			// 			console.log(res);
			// 		}
			// 	})
			// },
			cash_ratio_percent() {
				let money = this.money;
				let num = money * this.cash_ratio / 100;
				num = num.toFixed(2);
				return num
			},
			overprice() {
				let money = this.money * this.cash_ratio / 100;
				money = money.toFixed(2);
				console.log(money)
				return money
			},
			/*申请*/
			formSubmit: function(e) {
				console.log(111)
				let self = this;
				var formdata = e.detail.value;
				formdata.pay_type = self.withdraw_type;
				// if (self.ifchecked != true) {
				// 	uni.showToast({
				// 		title: '请阅读并勾选《提现规则》',
				// 		duration: 1000,
				// 		icon: 'none'
				// 	});
				// 	return false;
				// }
				var data = JSON.stringify(formdata);
				uni.showLoading({
					title: '正在提交',
					mask: true
				})
				self._post('user.cash/submit', {
					data: data
				}, function(res) {
					uni.hideLoading();
					uni.showModal({
						title: '提示',
						content: res.msg,
						success() {
							self.getData();
							self.isPopup = false;
						}
					})

				}, (err) => {
					self.isPopup = false;
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.dominant {
		@include font_color("font_color");
	}

	.txje {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.apply-cash {
		/* padding-top: 16rpx; */
	}

	.form-wrap {
		/* border-radius: 20rpx; */
		// background: #FFFFFF;
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
		width: 686rpx;
		height: 96rpx;
		line-height: 96rpx;
		@include background_color("background_color");
		opacity: 1;
		border-radius: 16rpx;
		border: none;
		font-size: 28rpx;
	}

	.apply-cash .btn-red-disabled {
		width: 686rpx;
		height: 96rpx;
		line-height: 96rpx;
		background-color: #F5F5F5;
		background: #F5F5F5;
		opacity: 1;
		border-radius: 16rpx;
		color: rgba(0, 0, 0, 0.24);
		border: none;
		font-size: 28rpx;
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
		padding: 27rpx 0 49rpx 0;
	}

	.withdrawal-btn {
		margin: 0 30rpx;
		@include background_color("background_color");
		height: 60rpx;
		line-height: 60rpx;
		color: #FFFFFF;
		text-align: center;
		border-radius: 30rpx;
		padding: 0;
		font-size: 24rpx;
	}

	.login_index_seller_rule {
		width: 90%;
		margin: 0 auto;
		text-align: center;
		font-size: 24rpx;
	}

	.radio {
		transform: scale(0.7)
	}

	.pop-improt {
		width: 622rpx;
		height: 480rpx;
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

	.submitbtn {
		width: 558rpx;
		height: 80rpx;
		@include background_color("background_color");
		opacity: 1;
		border-radius: 16rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 80rpx;
		opacity: 1;
		margin: 0 auto;
	}

	.cash-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.select-img {
		image {
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

	.cash-input-item {
		height: 88rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;

		.input-label {
			width: 160rpx;
			text-align: left;
		}
	}

	.cash-top {
		height: 146rpx;
		box-sizing: border-box;
		background: #F5F5F5;
	}

	.border-top {
		.border-box {
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

	.mb48 {
		margin-bottom: 48rpx;
	}
	.mb6{
		margin-bottom: 6rpx;
	}
	.mb60 {
		margin-bottom: 60rpx;
	}
	.p32{
		padding: 32rpx;
	}
	.mr32{
		margin-right: 32rpx;
	}
	.mr16{
		margin-right: 16rpx;
	}
	.p-0-32{
		padding: 0 32rpx;
	}
</style>