<template>
	<view class="user-index pb60" :data-theme='theme()' :class="theme() || ''">
		<!-- #ifdef APP-PLUS -->
		<header-bar></header-bar>
		<!-- #endif -->
		<!--个人信息-->
		<view v-if="!loadding">
			<view class="user-header pr theme-bg">
				<image class="bg-img" src="/static/bg-user.png" mode=""></image>
				<image class="bg-img2" src="/static/bg-user2.png" mode=""></image>
				<view class="card-box d-b-c" v-if="card_detail!=''"
					@click.stop="jumpPage('/pages/order/card?state_active=1&order_id=' + card_detail.order_id)">
					<view class="d-s-c">
						<image class="v-log" src="/static/icon/log-vip.png" mode=""></image>
						{{card_detail.card.card_name}}{{card_detail.expire_time_text}}
					</view>
					<view class="btn-card-box">查看详情<text class="icon iconfont icon-jiantou"></text></view>
				</view>
				<view class="card-box d-b-s" v-else @click.stop="jumpPage('/pages/user/card/list')">
					<view class="d-s-c">
						<image class="v-log" src="/static/icon/log-vip.png" mode=""></image>领取会员卡，各种优惠享不停
					</view>
					<view class="btn-card-box">立即领取<text class="icon iconfont icon-jiantou"></text></view>
				</view>
				<view class="user-header-inner">
					<view class="user-info">
						<view class="photo" @click="changeInfo">
							<image :src="detail.avatarUrl" mode="aspectFill"></image>
						</view>
						<view class="info d-c d-c-s">
							<view class="d-c-c">
								<view class="name">{{ detail.nickName }}</view>
								<text class="ml10" v-if="detail.grade">{{detail.grade.name}}</text>
							</view>
							<view class="tel d-s-c">
								<text class="f26">用户ID:{{ detail.user_id }}</text>
								<text class="copy-btn" @click="copyFunc(detail.user_id+'')">复制</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--我的订单-->
			<view class="my-order">
				<view class="order-top">
					<view class="order-title">我的订单</view>
					<view class="order-all" @click="gotoPage('/pages/order/myorder')">全部订单<text
							class="icon iconfont icon-jiantou"></text></view>
				</view>
				<view class="list d-a-c flex-1">
					<view class="item d-c-c d-c" @click="gotoPage('/pages/user/my-wallet/my-wallet')">
						<view class=" red_mini">{{ detail.balance }}</view>
						<text class="pt16 f28 gray3">金额<text class="f22 gray9">(元)</text></text>
					</view>
					<view class="item d-c-c d-c" @click="gotoPage('/pages/user/points/points')">
						<view class=" red_mini">{{ detail.points }}</view>
						<text class="pt16 f28 gray3">{{setting.points_name}}</text>
					</view>
					<view class="item d-c-c d-c" @click="gotoPage('/pages/user/my-coupon/my-coupon')">
						<view class="red_mini">{{ coupon }}</view>
						<text class="pt16 f28 gray3">优惠券</text>
					</view>
				</view>
			</view>
			<view class="bind_phone" v-if="!detail.mobile">
				<view class="bind_content">
					<view class="bind_txt">点击绑定手机号，确保账户安全</view>
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="getPhoneNumber" class="bind_btn theme-btn"
						@getphonenumber="getPhoneNumber">去绑定</button>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<button class="bind_btn theme-btn" @click="bindMobile">去绑定</button>
					<!-- #endif -->
				</view>
			</view>
			<!--菜单-->
			<view class="menu-wrap">
				<view class="order-top">
					<view class="order-title">服务功能</view>
				</view>
				<view class="group-bd f-w">
					<template v-for="(item, index) in menus" :key="index" >
						<view class="item" v-if="item.status==1"
							@click="jumpPage(item.link_url)">
							<view class="icon-round d-c-c">
								<image class="icon-round" :src="item.image_url" mode="aspectFit"></image>
							</view>
							<text class="name">{{ item.title }}</text>
						</view>
					</template>
				</view>
			</view>
		</view>
		<template v-if="isPopup">
			<view class="pop-bg" @click="closeFunc(null)"></view>
			<view class="pop-input d-c d-c-c">
				<form @submit="subName">
					<view class="ww100 flex-1 pop-top">
						<text class="icon iconfont icon-guanbi" @click="closeFunc(null)"></text>
						<view class="pop-title tc">资料修改</view>
						<view class="d-c-c" style="margin-bottom: 30rpx;">
							<view class="info-image">
								<!-- #ifndef MP-WEIXIN -->
								<view class="d-e-c" @click="changeAvatarUrl">
									<image :src="avatarUrl || '/static/login-log.jpg'" mode=""></image>
								</view>
								<!-- #endif -->
								<!-- #ifdef MP-WEIXIN -->
								<button class="wxbtn" style="padding: 0;border-radius: 50%;" open-type="chooseAvatar"
									@chooseavatar="onChooseAvatar">
									<image :src="avatarUrl || '/static/login-log.jpg'" mode=""></image>
								</button>
								<!-- #endif -->
							</view>
						</view>
						<view class="input-box d-c-c">
							昵称
							<input type="nickname" name="nickName" :value="nickName" @input="changeinput" />
						</view>
					</view>
					<button class="d-c-c pop-btn theme-btn" form-type="submit">确认</button>
				</form>
			</view>
		</template>
		<!-- 上传头像 -->
		<Upload v-if="isUpload" :num="1" @getImgs="getImgsFunc"></Upload>
	</view>
</template>

<script>
	import Upload from '@/components/upload/upload.vue';
	import utils from '@/common/utils.js';
	export default {
		components: {
			Upload
		},
		data() {
			return {
				isloadding: true,
				/*签到数据*/
				sign: {},
				/*是否加载完成*/
				loadding: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				/*菜单*/
				menus: [],
				detail: {
					balance: 0,
					points: 0,
					grade: {
						name: ''
					},
					mobile: ''
				},
				orderCount: {},
				coupon: 0,
				setting: {},
				card_detail: null,
				sessionKey: '',
				urldata: '',
				isPopup: false,
				avatarUrl: '',
				nickName: '',
				imageList:[],
				isUpload: false,
			};
		},
		onPullDownRefresh() {
			let self = this;
			self.getData();
		},
		onLoad(e) {
			let self = this;
			//#ifdef H5
			if (this.isWeixin()) {
				this.urldata = window.location.href;
			}
			//#endif
			if (e.invitation_id) {
				uni.setStorageSync('invitation_id', e.invitation_id);
			}
			if (e.referee_id) {
				uni.setStorageSync('referee_id', e.referee_id);
			}
			//#ifdef MP-WEIXIN
			wx.login({
				success(res) {
					// 发送用户信息
					self._post('user.user/getSession', {
						code: res.code
					}, result => {
						self.sessionKey = result.data.session_key;
					});
				}
			});
			//#endif
		},
		onShow() {
			/*获取个人中心数据*/
			this.getData();
		},
		methods: {
			/* 修改头像 */
			changeAvatarUrl() {
				let self = this;
				self.isUpload = true;
			},
			changeInfo() {
				this.avatarUrl = this.detail.avatarUrl;
				this.nickName = this.detail.nickName;
				this.isPopup = true;
			},
			/*获取数据*/
			getData() {
				let self = this;
				self.isloadding = true;
				self._get('user.index/detail', {
					url: self.urldata,
				}, function(res) {
					//#ifdef MP-WEIXIN
					if (res.data.getPhone) {
						self.gotoPage('/pages/login/bindmobile');
						return;
					}
					//#endif
					self.detail = res.data.userInfo;
					self.sign = res.data.sign;
					self.coupon = res.data.coupon;
					self.menus = res.data.menus;
					self.setting = res.data.setting;
					self.loadding = false;
					self.card_detail = res.data.cardDetail
					uni.stopPullDownRefresh();
					self.isloadding = false;
					// 配置微信扫一扫参数
					//#ifdef H5
					if (self.urldata != '') {
						self.jweixin = self.configWxScan(res.data.signPackage);
					}
					//#endif
				});
			},
			bindMobile() {
				this.gotoPage('/pages/user/modify-phone/modify-phone');
			},
			/*跳转页面*/
			jumpPage(path) {
				let self = this;
				if (self.isloadding) {
					return
				}
				if (path.startsWith('/')) {
					self.gotoPage(path);
				} else {
					self[path]();
				}
			},
			toinvitation(id) {
				if (id == 0) {
					uni.showToast({
						title: '暂无活动'
					})
				} else {
					this.gotoPage('/pages/user/invite/invite?invitation_gift_id=' + id);
				}
			},
			/*扫一扫核销*/
			scanQrcode: function() {
				this.gotoPage('/pages/user/scan/scan');
			},
			/*扫一扫核销*/
			receipt: function() {
				let self = this;
				//#ifdef H5
				if (this.isWeixin()) {
					// 只允许通过相机扫码
					self.jweixin.scanQRCode({
						needResult: 1,
						scanType: ['qrCode', 'barCode'],
						success: function(res) {
							window.location.href = res.resultStr;
						},
						error: function(res) {
							uni.showToast({
								title: '扫码失败，请重试'
							});
						}
					});
				} else {
					console.log('H5暂只支持公众号扫码');
				}
				//#endif
				//#ifndef H5
				// 只允许通过相机扫码
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						// let ulr = self.getQr(res.path);
						let ulr = res.path;
						console.log(res)
						console.log(ulr)
						if (res.errMsg == 'scanCode:ok') {
							self.gotoPage(ulr);
						} else {
							uni.showToast({
								title: '扫码失败，请重试'
							})
						}
					}
				});
				//#endif
			},
			getQr(url) {
				var querys = url.substring(url.indexOf('?') + 1).split('&');
				var result = [];
				for (var i = 0; i < querys.length; i++) {
					var temp = querys[i].split('=');
					if (temp.length < 2) {
						result[temp[0]] = '';
					} else {
						result[temp[0]] = temp[1];
					}
				}
				return '/pages/order/group/receipt?scene=' + result.scene;
				console.log(result);
			},
			getPhoneNumber(e) {
				var self = this;
				if (e.detail.errMsg !== 'getPhoneNumber:ok') {
					return false;
				}
				uni.showLoading({
					title: '加载中'
				})
				// 发送用户信息
				self._post('user.user/bindMobile', {
					session_key: self.sessionKey,
					encrypted_data: e.detail.encryptedData,
					iv: e.detail.iv,
				}, result => {
					uni.showToast({
						title: '绑定成功'
					});
					// 执行回调函数
					self.getData();
				}, false, () => {
					uni.hideLoading();
				});
			},
			copyFunc(e) {
				//#ifdef MP-WEIXIN
				uni.setClipboardData({
					//准备复制的数据
					data: e,
					success: function(res) {
						uni.showToast({
							title: '复制成功',
							icon: 'success',
							mask: true,
							duration: 2000
						});
					}
				});
				//#endif
				//#ifdef H5
				var input = document.createElement("input");
				input.value = e;
				document.body.appendChild(input);
				input.select();
				input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
				document.body.removeChild(input);
				uni.showToast({
					title: '复制成功',
					icon: 'success',
					mask: true,
					duration: 2000
				});
				//#endif
			},
			onChooseAvatar(e) {
				let self = this;
				console.log(e);
				self.uploadFile([e.detail.avatarUrl]);
			},
			/*上传图片*/
			uploadFile: function(tempList) {
				let self = this;
				let i = 0;
				let img_length = tempList.length;
				let params = {
					token: uni.getStorageSync('token'),
					app_id: self.getAppId()
				};
				uni.showLoading({
					title: '图片上传中'
				});
				tempList.forEach(function(filePath, fileKey) {
					uni.uploadFile({
						url: self.websiteUrl + '/index.php?s=/api/file.upload/image',
						filePath: filePath,
						name: 'iFile',
						formData: params,
						success: function(res) {
							let result = typeof res.data === 'object' ? res.data : JSON.parse(res
								.data);
							if (result.code === 1) {
								self.imageList.push(result.data);
							} else {
								self.showError(result.msg);
							}
						},
						complete: function() {
							i++;
							if (img_length === i) {
								uni.hideLoading();
								// 所有文件上传完成
								self.getImgsFunc(self.imageList);
							}
						}
					});
				});
			},
			/*获取上传的图片*/
			getImgsFunc(e) {
				let self = this;
				if (e && typeof e != 'undefined') {
					let self = this;
					self.avatarUrl = e[0].file_path;
					// self.update();
					self.isUpload = false;
				}
			},
			changeinput(e) {
				this.nickName = e.target.value;
			},
			closeFunc(e) {
				this.isPopup = false;
			},
			subName(e) {
				let self = this;
				if (self.loading) {
					return;
				}
				uni.showLoading({
					title: '加载中'
				});
				let params = {
					avatarUrl: self.avatarUrl,
					nickName: e.detail.value.nickName
				};
				self.loading = true;
				self._post('user.user/updateInfo', params, function(res) {
					self.showSuccess(
						'修改成功',
						function() {
							self.loading = false;
							self.isPopup = false;
							uni.hideLoading();
							self.getData();
						},
						function(err) {
							uni.hideLoading();
							self.loading = false;
							self.isPopup = false;
						}
					);
				});
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #EBEBEB;
	}

	.w100 {
		width: 100%;
	}

	.foot_ {
		height: 98rpx;
		width: 100%;
	}

	.user-header {
		position: relative;
		// background-image: url('/static/bg-user.png');
		// background-size: 750rpx 284rpx;
		height: 284rpx;
		position: relative;
		z-index: 1;
		overflow: hidden;

		.bg-img {
			position: absolute;
			left: 0;
			right: 0;
			margin: auto;
			bottom: -4rpx;
			z-index: 1;
			width: 704rpx;
			height: 118rpx;
		}

		.bg-img2 {
			position: absolute;
			left: 0;
			right: 0;
			margin: auto;
			bottom: -2rpx;
			z-index: 2;
			width: 100%;
			height: 30rpx;
		}
	}

	.user-header .user-header-inner {
		position: relative;
		padding: 30rpx 30rpx 120rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
		z-index: 1;
	}


	.user-header .user-header-inner::before {
		width: 200rpx;
		height: 200rpx;
		left: -60rpx;
		top: -20rpx;
		background-image: radial-gradient(-90deg, rgba(255, 255, 255, 0.2) 10%, rgba(255, 255, 255, 0));
	}

	.user-header .user-info {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.user-header .photo,
	.user-header .photo image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.user-header .photo {
		border: 4rpx solid #ffffff;
	}

	.user-header .info {
		padding-left: 20rpx;
		box-sizing: border-box;
		overflow: hidden;
		color: #ffffff;
	}

	.user-header .info .name {
		font-weight: bold;
		font-size: 32rpx;
	}

	.user-header .info .tel {
		font-size: 26rpx;
	}

	.user-header .info .grade {
		display: block;
		padding: 4px 16rpx;
		font-size: 22rpx;
		/* height: 36rpx; */
		line-height: 36rpx;
		border-radius: 40rpx;
		font-family: PingFang SC;
	}

	.order_center {
		border-left: 1rpx solid #D9D9D9;
		border-right: 1rpx solid #D9D9D9;
	}

	.menu-wrap {
		margin: 0 24rpx;
		margin-top: 26rpx;
		background: #ffffff;
		border-radius: 16rpx;
		padding: 0 35rpx;
	}

	.menu-wrap .group-bd {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		padding-bottom: 28rpx;
	}

	.menu-wrap .item {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 25%;
		height: 150rpx;
		font-size: 24rpx;
		margin: 28rpx 0;
	}

	.menu-wrap .icon-round {
		width: 70rpx;
		height: 70rpx;
		color: #ffffff;
	}

	.menu-wrap .item .iconfont {
		font-size: 40rpx;
		color: #ffffff;
	}

	.menu-wrap .item .name {
		margin-top: 19rpx;
	}

	.bind_phone {
		width: 100%;
		height: 80rpx;
		padding: 0 26rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
	}

	.bind_content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #ffffff;
		/* box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, 0.1); */
		border-radius: 16rpx;
		height: 100%;
		padding: 0 20rpx;
	}

	.bind_btn {
		width: 134rpx;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 22rpx;
		border-radius: 25rpx;
		text-align: center;
	}

	.my-order {
		margin: 0 24rpx;
		padding: 0 35rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		background: #ffffff;
		margin-bottom: 26rpx;
		margin-top: 24rpx;
		position: relative;



		.red_mini {
			font-size: 45rpx;
			color: #282828;
			font-weight: 800;
		}
	}

	.order-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 94rpx;
		padding-left: 26rpx;
		box-sizing: border-box;
		border-bottom: 1rpx solid #EEEEEE;

		.order-title {
			position: relative;
			font-size: 28rpx;
		}

		.order-title::after {
			content: '';
			width: 10rpx;
			height: 27rpx;
			// background: #FFCC00;
			@include background_color('background_color');
			border-radius: 5rpx;
			position: absolute;
			top: 0;
			bottom: 0;
			left: -27rpx;
			margin: auto;
		}

		.order-all {
			color: #28282870;
		}

		.icon.iconfont {
			color: #a0a0a0;
			font-size: 22rpx;
		}
	}

	.my-order .item {
		display: flex;
		margin: 40rpx 0;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 26rpx;
		flex: 1;
	}

	.my-order .icon-box {
		width: 60rpx;
		height: 60rpx;
	}

	.my-order .icon-box .iconfont {
		font-size: 50rpx;
		color: #333333;
	}

	.activity_img {}

	.activity_img image {
		width: 676rpx;
		height: 188rpx;
		margin: 0 auto;
		margin-top: 15rpx;
	}

	.card-box {
		position: absolute;
		width: 680rpx;
		left: 0;
		right: 0;
		margin: auto;
		bottom: -4rpx;
		height: 118rpx;
		padding: 18rpx 27rpx 30rpx 27rpx;
		color: #ffe49b;
		line-height: 52rpx;
		font-size: 26rpx;
		box-sizing: border-box;
		z-index: 20;
	}

	.btn-card-box {
		width: 164rpx;
		height: 52rpx;
		line-height: 52rpx;
		border-radius: 26rpx;
		background-color: #ffe49b;
		font-size: 22rpx;
		color: #54412c;
		text-align: center;
		font-weight: 600;
	}

	.btn-card-box .icon.iconfont.icon-jiantou {
		font-size: 22rpx;
		color: #54412c;
	}

	.v-log {
		width: 31rpx;
		height: 28rpx;
		margin-right: 8rpx;
	}

	.copy-btn {
		font-size: 22rpx;
		display: block;
		width: 71rpx;
		height: 38rpx;
		border: 2rpx solid #FFFFFF;
		border-radius: 20rpx;
		line-height: 38rpx;
		text-align: center;
		color: #FFFFFF;
		margin-left: 20rpx;
		box-sizing: border-box;
	}

	.pop-bg {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		z-index: 98;
		background-color: rgba(0, 0, 0, 0.65);
	}

	.icon.icon-guanbi {
		font-size: 32rpx;
		color: #999;
		position: absolute;
		right: 25rpx;
		top: 22rpx;
		z-index: 101;
	}

	.pop-input {
		width: 538rpx;
		// height: 559rpx;
		background: #ffffff;
		border-radius: 25rpx;
		position: fixed;
		left: 0;
		right: 0;
		top: 20%;
		// bottom: 0;
		margin: auto;
		z-index: 100;
	}

	.pop-top {
		padding: 50rpx 34rpx 0 52rpx;
		box-sizing: border-box;
	}

	.pop-title {
		font-size: 30rpx;
		color: #333;
		margin-bottom: 31rpx;
	}

	.input-box {
		margin-top: 30rpx;
		height: 64rpx;
		background: #ffffff;
		font-size: 28rpx;
		line-height: 64rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;

		input {
			margin-left: 20rpx;
			border-bottom: 1rpx solid #dddddd;
			font-size: 28rpx;
			height: 64rpx;
			line-height: 64rpx;
			flex: 1;
		}
	}

	.input-pop {
		box-sizing: border-box;
		border-radius: 32rpx;
		line-height: 1.5;
		font-size: 28rpx;
		color: #333;
		padding: 0 25rpx;
		border: none;
		flex: 1;
		outline-offset: 0;
	}

	.info-image {
		width: 112rpx;
		height: 112rpx;
		border-radius: 50%;
		// margin-right: 20rpx;
		
		image {
			width: 112rpx;
			height: 112rpx;
			border-radius: 50%;
		}
	}

	.pop-btn {
		width: 452rpx;
		height: 76rpx;
		background: #9b90c3;
		border-radius: 38rpx;
		color: #ffffff;
		line-height: 1.5;
		border-radius: 38rpx;
		text-align: center;
		font-size: 28rpx;
		margin-top: 30rpx;
		margin-bottom: 44rpx;
	}
</style>