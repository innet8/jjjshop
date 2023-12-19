<template>
	<!-- 直播组 -->
	<view
		:style="{
			background: itemData.style.bgcolor,
			paddingLeft: itemData.style.paddingLeft * 2 + 'rpx',
			paddingRight: itemData.style.paddingLeft * 2 + 'rpx',
			paddingTop: itemData.style.paddingTop * 2 + 'rpx',
			paddingBottom: itemData.style.paddingBottom * 2 + 'rpx'
		}"
	>
		<view
			class="diy-live"
			:style="{
				background: itemData.style.background,
				borderTopLeftRadius: itemData.style.topRadio * 2 + 'rpx',
				borderTopRightRadius: itemData.style.topRadio * 2 + 'rpx',
				borderBottomLeftRadius: itemData.style.bottomRadio * 2 + 'rpx',
				borderBottomRightRadius: itemData.style.bottomRadio * 2 + 'rpx'
			}"
			v-if="itemData.data.length > 0"
		>
			<view class="diy-head d-e-c" :style="'background-image: url(' + itemData.style.background_image + ');'">
				<view class="right" @click="gotoList">
					<text class="white">更多</text>
					<text class="iconfont icon-you mr20" style="font-size: 24rpx;color: #999999;"></text>
				</view>
			</view>
			<view class="list d-s-c f-w">
				<view class="item" v-for="(item, index) in itemData.data" :key="index" @click="gotoDetail(item)">
					<view class="pic pr">
						<text
							class="state"
							:class="{ bg101: item.live_status == 101, bg102: item.live_status == 102, bg103: item.live_status == 103 }"
							v-if="item.live_status == 101 || item.live_status == 102 || item.live_status == 103"
						>
							{{ convertStatus(item.live_status) }}
						</text>
						<image :src="item.share_img" mode="aspectFill"></image>
						<!-- <view class="anchor">{{item.anchor_name}}</view> -->
					</view>
					<view class="p20">
						<view class="text-ellipsis-2 f26">{{ item.name }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	props: ['itemData'],
	created() {},
	methods: {
		scroll(e) {},

		/*状态转换*/
		convertStatus(num) {
			let str = '';
			switch (num) {
				case 101:
					str = '直播中';
					break;
				case 102:
					str = '未开始';
					break;
				case 103:
					str = '已结束';
					break;
				case 104:
					str = '禁播';
					break;
				case 105:
					str = '暂停';
					break;
				case 106:
					str = '异常';
					break;
				case 107:
					str = '已过期';
					break;
			}
			return str;
		},

		/*跳转列表*/
		gotoList() {
			let url = '/pages/plus/live/wx/list';
			this.gotoPage(url);
		},

		/*跳转产品详情*/
		gotoDetail(item) {
			let roomId = item.roomid;
			let customParams = {
				path: 'pages/index/index'
			};
			wx.navigateTo({
				url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${encodeURIComponent(JSON.stringify(customParams))}`
			});
		}
	}
};
</script>

<style lang="scss">
.diy-live {
	// margin: 20rpx;
	// border-radius: 20rpx;
	// background: #ffffff;
	// box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.1);
	overflow: hidden;
}

.diy-live .diy-head {
	height: 90rpx;
	align-items: center;
	background-size: 100% 100%;
}

.diy-live .diy-head .name {
	font-size: 36rpx;
	font-weight: bold;
	width: 200rpx;
}

.diy-live .list {
	padding: 20rpx;
	padding-bottom: 0;
	display: grid;
	grid-template-columns: repeat(2,1fr);
	grid-gap: 30rpx;
}

.diy-live .list .item {
	// width: 320rpx;
	// margin-right: 30rpx;
	// margin-bottom: 30rpx;
	// height: 340rpx;
	// background-color: #f6f6f6;
	// border-radius: 12rpx;
	// overflow: hidden;
}

// .diy-live .list .item:nth-child(2n + 0) {
// 	margin-right: 0;
// }

.diy-live .list .item .pic {
	// width: 246rpx;
	width: 100%;
	height: 240rpx;
}

.diy-live .list .item .pic .state {
	position: absolute;
	z-index: 80;
	top: 20rpx;
	left: 20rpx;
	padding: 4rpx 8rpx;
	background: red;
	color: #ffffff;
	border-radius: 8rpx;
}

.diy-live .list .item .pic .state.bg101 {
	background: red;
}

.diy-live .list .item .pic .state.bg102 {
	background: #ffb100;
}

.diy-live .list .item .pic .state.bg103 {
	background: #333333;
}

.diy-live .list .item image {
	width: 100%;
	height: 240rpx;
	border-radius: 12rpx;
}

.diy-live .anchor {
	position: absolute;
	bottom: 12rpx;
	left: 18rpx;
	font-size: 24rpx;
	line-height: 24rpx;
}
</style>
