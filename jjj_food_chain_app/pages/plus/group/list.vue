<template>
	<view :data-theme="theme()" :class="theme() || ''" class="list">
		<view class="item d-b-c" v-for="(item, index) in listData" :key="index" @click="gotoPage('/pages/plus/group/detail?group_id=' + item.group_id)">
			<image :src="item.image[0].file_path" mode="aspectFill" class="pro-image"></image>
			<view class="pro-info d-b-c flex-1" style="height: 148rpx;">
				<view class="d-c d-b-s flex-1 hh100">
					<view class="f30 gray3 text-ellipsis">{{ item.group_name }}</view>
					<view class="f24 gray9">{{ item.describe }}</view>
					<view class="d-s-c ">
						<view class="f26" style="color: #FF5800;">￥{{ item.group_price }}</view>
						<view class="text-tips" v-if="item.discount">{{ item.discount }}</view>
						<view class="text-d-line f24 gray9">￥{{ item.line_price }}</view>
					</view>
				</view>
				<view class="d-c d-b-e hh100">
					<view class="d-e-c ww100"><text class="icon iconfont icon-jiantou" style="font-size: 22rpx;color: #333;"></text></view>
					<view class="theme-btn buy-btn">抢购</view>
					<view class="gray9 f26">已售{{ item.group_sales }}</view>
				</view>
			</view>
		</view>
		<!-- 没有记录 -->
		<view class="d-c-c p30" v-if="listData.length == 0 && !loading">
			<text class="iconfont icon-wushuju"></text>
			<text class="cont">亲，暂无相关记录哦</text>
		</view>
		<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more.vue';
export default {
	components: {
		uniLoadMore
	},
	data() {
		return {
			/*是否加载完成*/
			loading: true,
			/*数据列表*/
			listData: [],
			/*最后一页码数*/
			last_page: 0,
			/*当前页面*/
			page: 1,
			/*每页条数*/
			list_rows: 10,
			no_more: false
		};
	},
	onShow() {
		this.page = 1;
		this.listData = [];
		this.getData();
	},
	computed: {
		/*加载中状态*/
		loadingType() {
			if (this.loading) {
				return 1;
			} else {
				if (this.listData.length != 0 && this.no_more) {
					return 2;
				} else {
					return 0;
				}
			}
		}
	},
	onReachBottom() {
		let self = this;
		if (self.page < self.last_page) {
			self.page++;
			self.getData();
		}
		self.no_more = true;
	},
	methods: {
		/*获取数据*/
		getData() {
			let self = this;
			self.loading = true;
			self._get(
				'plus.group.Group/list',
						{
			page: self.page || 1,
					list_rows: self.list_rows
				},
				function(res) {
					self.loading = false;
					self.listData = self.listData.concat(res.data.list.data);
					self.last_page = res.data.list.last_page;
					if (res.data.list.last_page <= 1) {
						self.no_more = true;
					}
				}
			);
		}
	}
};
</script>

<style lang="scss">
.list {
	padding: 20rpx 0;
}

.item {
	margin: 0 auto 20rpx auto;
	width: 700rpx;
	height: 198rpx;
	background: #ffffff;
	border-radius: 25rpx;
	padding: 28rpx 19rpx 22rpx 16rpx;
	box-sizing: border-box;

	.pro-image {
		width: 148rpx;
		height: 148rpx;
		border-radius: 8rpx;
		display: block;
		margin-right: 17rpx;
	}

	.buy-btn {
		width: 108rpx;
		height: 59rpx;
		border-radius: 29rpx;
		font-size: 28rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.text-tips {
	font-size: 22rpx;
	color: #ff5800;
	padding: 6rpx 12rpx;
	margin: 0 10rpx;
	display: inline-block;
	border: 1rpx solid #ff5800;
	border-radius: 5rpx;
}
</style>
