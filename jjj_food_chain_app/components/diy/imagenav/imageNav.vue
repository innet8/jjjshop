<template>
	<view
		class="drag-optional"
		:style="{
			background: itemData.style.bgcolor,
			paddingLeft: itemData.style.paddingLeft * 2 + 'rpx',
			paddingRight: itemData.style.paddingLeft * 2 + 'rpx',
			paddingTop: itemData.style.paddingTop * 2 + 'rpx',
			paddingBottom: itemData.style.paddingBottom * 2 + 'rpx'
		}"
	>
		<view
			class="diy-navBar"
			:style="{
				background: itemData.style.background,
				borderTopLeftRadius: itemData.style.topRadio * 2 + 'rpx',
				borderTopRightRadius: itemData.style.topRadio * 2 + 'rpx',
				borderBottomLeftRadius: itemData.style.bottomRadio * 2 + 'rpx',
				borderBottomRightRadius: itemData.style.bottomRadio * 2 + 'rpx'
			}"
		>
			<template v-if="itemData.style.imgShape">
				<view class="list" :class="'column-' + itemData.style.rowsNum">
					<view class="item" :key="index" v-for="(navBar, index) in itemData.data" @click="gotoPage(navBar.linkUrl)">
						<view class="item-image">
							<image :src="navBar.imgUrl" mode="widthFix" />
						</view>
						<view class="item-text text-ellipsis" :style="{ color: navBar.color }">{{ navBar.text }}</view>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="list scroll-y">
					<view class="item columnFixed" :key="index" v-for="(navBar, index) in itemData.data" @click="gotoPage(navBar.linkUrl)">
						<view class="item-image">
							<image :src="navBar.imgUrl" mode="widthFix" />
						</view>
						<view class="item-text text-ellipsis" :style="{ color: navBar.color }">{{ navBar.text }}</view>
					</view>
				</view>
			</template>
			
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

<style lang="scss" scoped>
.diy-navBar .list {
	display: flex;
	flex-wrap: nowrap;
	align-items: flex-start;
	overflow-x: auto;
}
.diy-navBar .list .item {
	padding: 20rpx 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	flex-shrink: 0;
}
.diy-navBar{
	.list.column-3{
		display: grid;
		grid-template-columns: repeat(3,1fr);
	}
	.list.column-4{
		display: grid;
		grid-template-columns: repeat(4,1fr);
	}
	.list.column-5{
		display: grid;
		grid-template-columns: repeat(5,1fr);
	}
}
.diy-navBar .list .item-image {
	width: 60%;
}
.diy-navBar .list .item-image image {
	width: 100%;
}
.diy-navBar .list .item-text {
	width: 100%;
	padding: 8rpx 0;
	text-align: center;
}
.scroll-y{
	width: 100%;
	overflow-y: scroll;
}
.scroll-y{
	display: flex;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	overflow-x: auto;
}
.diy-navBar .columnFixed {
	width: 28%;
}
</style>
