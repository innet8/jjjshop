<template>
	<view>
		<view class="drag optional" :style="{
				background: itemData.style.bgcolor,
				paddingLeft: itemData.style.paddingLeft * 2 + 'rpx ',
				paddingRight: itemData.style.paddingLeft * 2 + 'rpx ',
				paddingTop: itemData.style.paddingTop * 2 + 'rpx ',
				paddingBottom: itemData.style.paddingBottom * 2 + 'rpx'
			}" :class="{ selected: index === selectedIndex }">
			<view class="diy-navBar">
				<view class="list column-2" :style="{
						borderTopLeftRadius: itemData.style.topRadio * 2 + 'rpx ',
						borderTopRightRadius: itemData.style.topRadio * 2 + 'rpx ',
						borderBottomLeftRadius: itemData.style.bottomRadio * 2 + 'rpx ',
						borderBottomRightRadius: itemData.style.bottomRadio * 2 + 'rpx',
						backgroundImage: 'linear-gradient(to bottom, ' + (itemData.style.background1 || '#fff') + ', ' + (itemData.style.background2 || '#fff') + ')'
					}">
					<view class="item openline" :key="index" v-for="(navBar, index) in itemData.data"
						@click="gotoPage('/' + navBar.linkUrl)">
						<view class="item-navimg">
							<image :src="navBar.imgUrl" mode=""></image>
						</view>
						<view class="item-text1 text-ellipsis tc" :style="{ color: navBar.titlecolor }">
							{{ navBar.title }}</view>
						<view class="item-text2 text-ellipsis tc" :style="{ color: navBar.textcolor }">{{ navBar.text }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: ['itemData'],
		created() {},
		methods: {}
	};
</script>

<style scoped lang="scss">
	.title1 {
		width: 128rpx;
		height: 40rpx;
		font-size: 32px;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #3a3a3a;
		white-space: nowrap;
		margin-right: 90rpx;
	}

	.diy-navBar .list {
		box-sizing: border-box;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}

	.diy-navBar .list .item {
		padding: 20rpx;
		display: flex;
		box-sizing: border-box;
	}

	.diy-navBar .list.column-1 .item {
		flex: 1;
		height: 150rpx;
		margin: 0 auto;
		justify-content: space-between;
		align-items: center;
	}

	.diy-navBar .list.column-2 .item {
		flex: 1;
		height: 250rpx;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex-shrink: 0;
		overflow: hidden;
		position: relative;

		.item-navimg {
			margin-bottom: 12rpx;
		}
	}

	.diy-navBar .list.column-2 .item.openline::after {
		position: absolute;
		content: '';
		top: 0;
		bottom: 0;
		height: 60%;
		width: 2rpx;
		background-color: #eee;
		margin: auto;
		left: 0;
	}

	.diy-navBar .list.column-2 .item.openline:first-child::after {
		width: 0;
	}

	.diy-navBar .list .item-image {
		width: 60%;
	}

	.diy-navBar .list .item-image image {
		width: 100%;
	}

	.diy-navBar .list .item-text1 {
		width: 100%;
		font-size: 30rpx;
		font-weight: 600;
		color: #333333;
	}

	.diy-navBar .list .item-text2 {
		width: 100%;
		padding: 8rpx 0;
		font-weight: 400;
		color: #999999;
		font-size: 22rpx;
	}

	.item-navimg {
		width: 100rpx;
		height: 100rpx;

		image {
			width: 100rpx;
			height: 100rpx;
		}
	}

	.item-navimg1 {
		width: 100rpx;
		height: 100rpx;
		margin-left: 260rpx;
	}
</style>
