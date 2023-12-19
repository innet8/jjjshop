<template>
	<div
		class="drag optional"
		@click.stop="$parent.$parent.onEditer(index)"
		:class="{ selected: index === selectedIndex }"
		:style="{
			background: item.style.background,
			paddingLeft: item.style.paddingLeft + 'px',
			paddingRight: item.style.paddingLeft + 'px',
			paddingTop: item.style.paddingTop + 'px',
			paddingBottom: item.style.paddingBottom + 'px'
		}"
	>
		<div class="diy-banner" :style="'height:' + item.style.height * 0.5 + 'px;'">
			<div class="img-list pr">
				<img
					class="banner-img"
					style="display: block;"
					:style="{
						height: item.style.height * 0.5 + 'px',
						borderTopLeftRadius: item.style.topRadio + 'px',
						borderTopRightRadius: item.style.topRadio + 'px',
						borderBottomLeftRadius: item.style.bottomRadio + 'px',
						borderBottomRightRadius: item.style.bottomRadio + 'px'
					}"
					v-img-url="item.data[0] && item.data[0].imgUrl"
				/>
				<div class="dots center d-c-c">
					<div
						:key="index"
						:class="index == 0 ? 'active ' + item.style.imgShape : item.style.imgShape"
						v-for="(banner, index) in item.data"
						:style="index == 0 ? 'background:' + item.style.btnColor : 'background:' + item.style.btnColor + ';opacity: 0.4;'"
					></div>
				</div>
			</div>
		</div>
		<!-- 登录状态 -->
		<!-- 个人信息 -->
		<div class="diy-user-wrap" :style="{
			bottom: `-${item.style.loginHeight/2}px`
		}">
			<div class="diy-user-bg" :style="{
				width: `calc(100% - ${item.style.loginMarginLeft}px)`, 
				height: item.style.loginHeight+'px',
				borderRadius: `${item.style.loginTopRadio}px ${item.style.loginTopRadio}px ${item.style.loginBottomRadio}px ${item.style.loginBottomRadio}px`,
			}">
				<div class="bg" v-if="item.style.loginBgType == 1" :style="{
					background: item.style.loginBackground ? item.style.loginBackground : '#FFCC00',
					opacity: item.style.loginOpacity/100
				}"></div>
				<img class="bg" :src="item.style.loginBgImage" :style="{
					opacity: item.style.loginOpacity/100
				}" v-else />
				<div class="diy-user-content" :style="{
					padding:` 0 ${item.style.loginPaddingLeft}px`,
				}">
				
					<div class="no-login-wrap" v-if="item.style.isLogin == 0">
					<div class="txt" :style="{
						color: item.style.loginBeforeTxtColor,
					}">为给您提供更好的服务请授权登录</div>
					<div class="btn" :style="{
						color: item.style.loginBtnTxtColor,
						background: item.style.loginBtnBg,
						borderRadius: item.style.loginBtnRadius+'px',
					}">登录/注册</div>
				</div>
				<div class="login-wrap" v-else>
					<div class="d-s-c">
						<img 
							src="@/assets/img/default.png"
							class="img"
							:style="{
								width: `${item.style.loginHeight*(item.style.loginAvatarSize/100)}px`,
								height: `${item.style.loginHeight*(item.style.loginAvatarSize/100)}px`,
								borderRadius: item.style.loginAvatarRadius+'px',
							}"
						 />
						<div class="txt" :style="{
							color: item.style.loginAfterTxtColor,
						}">用户名称</div>
					</div>
					<div class="level" :style="{
						color: item.style.loginAfterRightTxtColor,
					}">普通会员</div>
				</div>
				</div>
			</div>
		</div>
		<div class="btn-edit-del"><div class="btn-del" @click.stop="$parent.$parent.onDeleleItem(index)">删除</div></div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ['item', 'index', 'selectedIndex'],
	methods: {}
};
</script>

<style lang="scss" scoped>
.banner-img{
	width: 100%;
}
.drag.optional{
	position: relative;
}
.p15 {
	padding: 15px;
}
.diy-banner.round {
	padding: 12px;
	box-sizing: content-box;
	overflow: hidden;
	text-align: center;
}

.diy-banner.round img {
	width: 100%;
	height: 100px;
	object-fit: fill;
	border-radius: 10px;
	margin-bottom: 12px;
	box-sizing: content-box;
}

.diy-banner.square {
	height: 100px;
	overflow: hidden;
	text-align: center;
}

.diy-banner.square img {
	width: 100%;
	height: 100px;
	object-fit: fill;
}

.diy-banner .dots {
	position: absolute;
	left: 0;
	right: 0;
	margin: 0 auto;
	bottom: 10px;
	width: 100%;
	z-index: 1;
}

.diy-banner.round .dots {
	position: absolute;
	left: 0;
	right: 0;
	margin: 0 auto;
	bottom: 20px;
}

.diy-banner .dots .square,
.diy-banner .dots .round,
.diy-banner .dots .rectangle {
	bottom: 40rpx;
	left: 0;
	right: 0;
	margin: auto;
}

.diy-banner .dots .square {
	width: 7px;
	height: 7px;
	margin: 0 2px;
	background: #ebedf0;
	opacity: 0.3;
}

.diy-banner .dots .round {
	width: 11px;
	height: 11px;
	margin: 0 2px;
	background: #ebedf0;
	opacity: 0.3;
	border-radius: 50%;
}

.diy-banner .dots .rectangle {
	width: 20px;
	height: 3px;
	margin: 0 2px;
	background: #ebedf0;
	opacity: 0.3;
	border-radius: 4rpx;
}

.diy-banner .dots .active {
	opacity: 1;
}
/* 登录状态 */
.diy-user-wrap{
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 0;
	z-index: 1;
	width: 100%;
	box-sizing: border-box;
}
.diy-user-bg{
	margin: 0 auto;
	width: 100%;
	box-sizing: border-box;
	// width: 335px;
	height: 42px;
	box-shadow: 0px 5px 12px 0px rgba(6,0,1,0.03);
	border-radius: 15px;
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
			padding: 5px 8px;
			border-radius: 15px;
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
			width: 30px;
			height: 30px;
			border-radius: 50%;
		}
		.txt{
			margin-left: 4px;
		}
	}
}
</style>
