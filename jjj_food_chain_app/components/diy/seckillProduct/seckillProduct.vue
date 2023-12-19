<template>
	<view class="diy">
		<!--图标入口-->
		<view
			class="diy-navbar"
			:style="{
				background: itemData.style.bgcolor,
				padding:
					itemData.style.paddingTop * 2 +
					'rpx ' +
					itemData.style.paddingLeft * 2 +
					'rpx ' +
					itemData.style.paddingBottom * 2 +
					'rpx ' +
					itemData.style.paddingLeft * 2 +
					'rpx'
			}"
		>
			<view
				class="diy-navBar"
				:style="{
					background: itemData.style.background,
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
			>
				<view class="item" v-for="(item, index) in itemData.data" :key="index" :style="'width:' + item_width + ';'" @click="gotoDetail(item)">
					<image :src="item.imgUrl" mode="widthFix"></image>
					<text class="gray3" :style="{ color: item.color }">{{ item.text }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//单个宽度
			item_width: '25%'
		};
	},
	props: ['itemData'],
	created() {
		this.item_width = 100 / Math.abs(this.itemData.style.rowsNum) + '%';
	},
	methods: {
		/*跳转页面*/
		gotoDetail(e) {
			this.gotoPage(e.linkUrl);
		}
	}
};
</script>

<style>
	.diy{
		padding-left: 28rpx;
	}
.diy-navBar {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	border-bottom-left-radius: 30rpx;
	border-bottom-right-radius: 30rpx;
	width: 690rpx;
}
.diy-navbar .item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: -30rpx;
	margin-bottom: 30rpx;
	width: 120rpx;
	height: 140rpx;
	z-index: 1000;
	
}

.diy-navbar .item image {
	width: 70rpx;
	height: 70rpx;
}

.diy-navbar .item text {
	display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 100%;
	overflow: hidden;
	line-height: 66rpx;
	font-size: 24rpx;
	text-align: center;
}
</style>
