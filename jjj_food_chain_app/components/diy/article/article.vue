<template>
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
			class="diy-article"
			:style="{
				background: itemData.style.background,
				borderTopLeftRadius: itemData.style.topRadio * 2 + 'rpx',
				borderTopRightRadius: itemData.style.topRadio * 2 + 'rpx',
				borderBottomLeftRadius: itemData.style.bottomRadio * 2 + 'rpx',
				borderBottomRightRadius: itemData.style.bottomRadio * 2 + 'rpx'
			}"
		>
			<!--文章列表-->
			<view class="article-item" v-for="(item, index) in listData" :class="'show-type__' + itemData.style.display" :key="index" @click="gotoPageFunc(item)">
				<!-- 有图模式 -->
				<template v-if="itemData.style.display == 10">
					<view class="picture mr20" v-if="item.image != null && item.image.file_path != ''"><image :src="item.image.file_path" mode="aspectFill"></image></view>
					<view class="d-b-c d-stretch d-c flex-1">
						<view class="text-ellipsis-2 f24">{{ item.article_title }}</view>
						<view class="d-b-c gray9 f18">
							<view>
								<text class="icon iconfont icon-chakan"></text>
								<text class="ml10">{{ item.actual_views }}</text>
							</view>
							<view>
								<text class="icon iconfont icon-daojishi mr10"></text>
								{{ format(item.create_time) }}
							</view>
						</view>
					</view>
				</template>
				<!-- 无图模式-->
				<template v-if="itemData.style.display == 20">
					<!-- <view class="f24 text-ellipsis-2 lh200">
						{{ item.article_title }}
					</view> -->
					<view class="d-b-c d-stretch d-c flex-1" style="height: 140rpx;">
						<view class="text-ellipsis-2 f24">{{ item.article_title }}</view>
						<view class="d-b-c gray9 f18">
							<view>
								<text class="icon iconfont icon-chakan"></text>
								<text class="ml10">{{ item.actual_views }}</text>
							</view>
							<view class="show-type__10" style="display: flex;align-items: center;">
								<text class="icon iconfont icon-daojishi mr10"></text>
								{{ format(item.create_time) }}
							</view>
						</view>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			/*数据列表*/
			listData: []
		};
	},
	props: ['itemData'],
	created() {
		this.listData = this.itemData.data;
	},
	methods: {
		/*跳转页面*/
		gotoPageFunc(e) {
			let _url = 'pages/article/detail/detail?article_id=' + e.article_id;
			this.gotoPage(_url);
		},
		add0(m) {
			return m < 10 ? '0' + m : m;
		},
		format(t) {
			//shijianchuo是整数，否则要parseInt转换
			var time = new Date(t);
			var y = time.getFullYear();
			var m = time.getMonth() + 1;
			var d = time.getDate();
			return y + '-' + this.add0(m) + '-' + this.add0(d);
		}
	}
};
</script>

<style>
.diy-article {
	overflow: hidden;
	padding: 0 30rpx;
}

.diy-article .show-type__10,
.diy-article .show-type__20 {
	display: flex;
	padding: 30rpx 0;
	border-bottom: 1rpx solid #eeeeee;
}

.diy-article .show-type__10:last-child,
.diy-article .show-type__20:last-child {
	border-bottom: none;
}

.diy-article .show-type__10 .picture {
	width: 246rpx;
	height: 140rpx;
	border-radius: 12rpx;
}

.diy-article .show-type__10 .title {
	height: 80rpx;
}

.diy-article .show-type__10 .des {
	height: 36rpx;
}

.diy-article image {
	width: 100%;
	height: 100%;
	border-radius: 12rpx;
}

.diy-article .show-type__10 .icon.iconfont {
	font-size: 18rpx;
	color: #999999;
}
</style>
