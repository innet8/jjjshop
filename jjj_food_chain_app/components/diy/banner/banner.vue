<template>
	<view
		class="diy-banner-box pr"
		:style="{
			background: itemData.style.background,
			paddingLeft: itemData.style.paddingLeft * 2 + 'rpx',
			paddingRight: itemData.style.paddingLeft * 2 + 'rpx',
			paddingTop: itemData.style.paddingTop * 2 + 'rpx',
			paddingBottom: itemData.style.paddingBottom * 2 + 'rpx'
		}"
	>
		<swiper class="swiper" :autoplay="autoplay" :interval="2000" :duration="duration" @change="changeSwiper" :style="'height:' + itemData.style.height + 'rpx;'">
			<swiper-item
				class="o-h"
				:style="{
					height: itemData.style.height + 'rpx',
					borderRadius:
						itemData.style.topRadio * 2 +
						'rpx ' +
						itemData.style.topRadio * 2 +
						'rpx ' +
						itemData.style.bottomRadio * 2 +
						'rpx ' +
						itemData.style.bottomRadio * 2 +
						'rpx'
				}"
				v-for="(item, index) in itemData.data"
				:key="index"
				@click="gotoPage(item.linkUrl)"
			>
				<image
					:style="{
						height: itemData.style.height + 'rpx',
						borderRadius:
							itemData.style.topRadio * 2 +
							'rpx ' +
							itemData.style.topRadio * 2 +
							'rpx ' +
							itemData.style.bottomRadio * 2 +
							'rpx ' +
							itemData.style.bottomRadio * 2 +
							'rpx'
					}"
					:src="item.imgUrl"
				></image>
				<view class="swiper-dots ww100 d-c-c" :class="itemData.style.imgShape">
					<view
						:class="current == index ? 'swiper-dot active' : 'swiper-dot'"
						v-for="(item, index) in itemData.data"
						:style="'background-color:' + indicatorActiveColor"
						:key="index"
					></view>
				</view>
			</swiper-item>
			
		</swiper>
		<!-- 个人信息 -->
		<div class="diy-user-wrap" :style="{
			bottom: `-${itemData.style.loginHeight/2*2}rpx`
		}">
			<div class="diy-user-bg" :style="{
				width: `calc(100% - ${itemData.style.loginMarginLeft*2}rpx)`, 
				height: itemData.style.loginHeight*2+'rpx',
				borderRadius: `${itemData.style.loginTopRadio*2}rpx ${itemData.style.loginTopRadio*2}rpx ${itemData.style.loginBottomRadio*2}rpx ${itemData.style.loginBottomRadio*2}rpx`,
			}">
				<template v-if="itemData.style.loginBgType == 1">
					<div class="bg"  :style="{
						background: itemData.style.loginBackground ? itemData.style.loginBackground : '#FFCC00',
						opacity: itemData.style.loginOpacity/100
					}"></div>
				</template>
				<template v-else>
					<img class="bg" :src="itemData.style.loginBgImage" :style="{
						opacity: itemData.style.loginOpacity/100
					}"  />
				</template>
				<div class="diy-user-content" :style="{
					padding:` 0 ${itemData.style.loginPaddingLeft*2}rpx`,
				}">
				<template v-if="isLogin">
					<div class="login-wrap">
						<div class="d-s-c">
							<image  
								:src="userInfo.avatarUrl"
								class="img"
								:style="{
									width: `${itemData.style.loginHeight*(itemData.style.loginAvatarSize/100)*2}rpx`,
									height: `${itemData.style.loginHeight*(itemData.style.loginAvatarSize/100)*2}rpx`,
									borderRadius: itemData.style.loginAvatarRadius+'px',
								}"
							>
							</image>
							<div class="txt" :style="{
								color: itemData.style.loginAfterTxtColor,
							}">{{ userInfo.nickName }}</div>
						</div>
						<div class="level" :style="{
							color: itemData.style.loginAfterRightTxtColor,
						}">{{ userInfo.grade && userInfo.grade.name }}</div>
					</div>
				</template>
				<template v-else>
					<div class="no-login-wrap">
						<div class="txt" :style="{
							color: itemData.style.loginBeforeTxtColor,
						}">为给您提供更好的服务请授权登录</div>
						<div class="btn" 
						@click="gotoLogin"
						:style="{
							color: itemData.style.loginBtnTxtColor,
							background: itemData.style.loginBtnBg,
							borderRadius: itemData.style.loginBtnRadius+'px',
						}">登录/注册</div>
					</div>
				</template>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			indicatorActiveColor: '#ffffff',
			current: 0,
			userInfo: {},
			isLogin: false,
			loading: true,
		};
	},
	props: ['itemData'],
	created() {
		this.indicatorActiveColor = this.itemData.style.btnColor;
	},
	mounted(){
		this.getUserInfo();
	},
	methods: {
		changeSwiper(e) {
			this.current = e.detail.current;
		},
		/*跳转页面*/
		gotoPages(e) {
			this.gotoPage(e.linkUrl);
		},
		getUserInfo(){
			let self = this;
			self.loading = true;
			self.isLogin = false;
			self._get(
				'index/userInfo',
				{},
				function(res) {
					if(res.data && res.data.user){
						self.userInfo = res.data.user;
						self.isLogin = true;
						self.loading = false;
					}
				}
			);
		},
		gotoLogin(){
			this.doLogin();
		}
	}
};
</script>

<style lang="scss" scoped>
.diy-banner-box {
	// overflow: hidden;
	box-sizing: border-box;
	position: relative;
}
.diy-banner-box,
.diy-banner-box .swiper {
	width: 100%;
	/* background-color: #FFFFFF; */
}
.diy-banner-box image {
	width: 100%;
}
.diy-banner-box .swiper-dots {
	position: absolute;
	bottom: 20rpx;
	left: 0;
	right: 0;
	margin: auto;
	width: 100%;
	z-index: 2;
}

.swiper-dots.square .swiper-dot {
	width: 14rpx;
	height: 14rpx;
	margin: 0 4rpx;
	background: #ebedf0;
	opacity: 0.3;
}

.swiper-dots.round .swiper-dot {
	width: 22rpx;
	height: 22rpx;
	margin: 0 4rpx;
	background: #ebedf0;
	opacity: 0.3;
	border-radius: 50%;
}

.swiper-dots.rectangle .swiper-dot {
	width: 40rpx;
	height: 6rpx;
	margin: 0 4rpx;
	background: #ebedf0;
	opacity: 0.3;
	border-radius: 4rpx;
}

.swiper-dots.round .swiper-dot.active,
.swiper-dots.square .swiper-dot.active,
.swiper-dots.rectangle .swiper-dot.active {
	opacity: 1;
}
/* 登录状态 */
.diy-user-wrap{
	position: absolute;
	left: 50%;
	width: 100%;
	transform: translateX(-50%);
	bottom: 0;
	z-index: 1;
}
.diy-user-bg{
	// width: 670rpx;
	margin: 0 auto;
	height: 84rpx;
	box-shadow: 0px 10rpx 24rpx 0px rgba(6,0,1,0.03);
	border-radius: 30rpx;
	position: relative;
	overflow: hidden;
	.bg{
		width: 100%;
		height: 100%;
		opacity: 1;
		position: absolute;
		bottom: 0;
	}
	.diy-user-content{
		position: absolute;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
	.no-login-wrap{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		.txt{
			color: #fff;
		}
		.btn{
			background: #fff;
			padding: 10rpx 16rpx;
			border-radius: 30rpx;
			color: #FFCC00;
		}
	}
	.login-wrap{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		color: #fff;
		.img{
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
		}
		.txt{
			margin-left: 8rpx;
		}
	}
}
</style>
