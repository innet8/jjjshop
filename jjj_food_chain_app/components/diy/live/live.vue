<template>
	<view class="diy-live" v-if="itemData.data.length>0">
		<view class="diy-head d-b-c">
			<view class="left d-c-c">
				<image src="../../../static/icon/activity.png" mode="aspectFill" style="height: 32rpx;width: 32rpx;margin-right: 18rpx;"></image>
				<view class="name">热门直播</view>
			</view>
			<view class="right" @click="gotoList">
				<text @click="gotoPage('/pagesLive/live/index')" class="gray9">更多</text>
				<text class="iconfont icon-jiantou white" style="font-size: 22rpx;color: #999999;"></text>
			</view>
		</view>
		<view class="list d-s-c f-w">
			<view class="item" v-for="(item, index) in itemData.data" :key="index" @click="gotoDetail(item)">
				<view class="pic pr">
					<text class="state" :class="{bg101:item.live_status==101,bg102:item.live_status==102,bg103:item.live_status==104}"
					 v-if="item.live_status==101||item.live_status==102||item.live_status==104">
						{{convertStatus(item.live_status)}}
					</text>
					<image :src="item.share.file_path" mode="aspectFit"></image>
				</view>
				<view class="text-ellipsis f30 live_name tc">{{ item.name }}</view>
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
		created() {

		},
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
			gotoPage(path) {
				uni.navigateTo({
					url: path
				});
			},
			/*跳转产品详情*/
			gotoDetail(item) {
				// 第三方直播
				uni.navigateTo({
					url: '/pagesLive/live/live?room_id=' + item.room_id + "&sence=join"
				});
			}
		}
	};
</script>

<style lang="scss">
	.diy-live {
		margin: 20rpx;
		border-radius: 20rpx;
		padding: 0 20rpx 20rpx;
		background: #ffffff;
	}

	.diy-live .diy-head {
		height: 100rpx;
	}

	.diy-live .diy-head .name {
		font-size: 32rpx;
		font-weight: bold;
	}

	.diy-live .list .item {
		width: 300rpx;
		margin-right: 20rpx;
	}

	.diy-live .list .item:nth-child(2n + 0) {
		margin-right: 0;
	}

	.diy-live .list .item .pic {
		width: 300rpx;
		height: 240rpx;
	}

	.diy-live .list .item .pic .state {
		position: absolute;
		top: 0;
		left: 0;
		padding: 4rpx 8rpx;
		background: red;
		color: #FFFFFF;
		font-size: 22rpx;
		border-radius: 12rpx 0px 12rpx 0px;
		z-index: 100;
	}

	.diy-live .list .item .pic .state.bg101 {
		background: linear-gradient(0deg, #F6220C 0%, #FF7668 100%);
	}

	.diy-live .list .item .pic .state.bg102 {
		background: linear-gradient(0deg, #F87B16 0%, #FFA336 100%);
	}

	.diy-live .list .item .pic .state.bg103 {
		background: #333333;
	}

	.diy-live .list .item image {
		width: 300rpx;
		height: 240rpx;
		border-radius: 12rpx;
	}

	.live_name {
		margin: 20rpx 0;
	}
</style>
