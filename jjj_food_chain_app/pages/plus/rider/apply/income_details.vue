<template>
	<view class="p20 bg-white">
		<view class="d-b-c item" v-for="(item,index) in dataList" :key="index">
			<view>{{item.create_time}}</view>
			<view class="orange">+{{item.money}}</view>
		</view>
		<view class="d-c-c p30" v-if="dataList.length==0 && !loadding">
			<text class="iconfont icon-wushuju"></text>
			<text class="cont">亲，已经没有更多了</text>
		</view>
		<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more.vue";
	
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				dataList:[],
				/*底部加载*/
				loadding: true,
				/*没有更多*/
				no_more: false,
				/*当前页面*/
				page: 1,
				last_page:0
			}
		},
		mounted() {
			
			this.getData();
		},
		computed: {
			/*加载中状态*/
			loadingType() {
				if (this.loadding) {
					return 1;
				} else {
					if (this.dataList.length != 0 && this.no_more) {
						return 2;
					} else {
						return 0;
					}
				}
			}
		},
		methods: {
			restoreData() {
				this.datalist = [];
				this.page = 1;
				this.no_more = false;
				this.loading = true;
			},
			/*可滚动视图区域到底触发*/
			onReachBottom() {
				let self = this;
				if (self.no_more) {
					return;
				}
				self.page++;
				if (self.page <= self.last_page) {
					self.getData();
				} else {
					self.no_more = true;
				}
			},
			/*获取数据*/
			getData() {
				let self = this;
				uni.showLoading({
				    title: '加载中'
				});
				self._get('plus.driver.cash/incomelists', {
					page: self.page || 1
				}, function(res) {
					self.last_page = res.data.list.last_page;
					if (res.data.list.last_page <= 1) {
						self.no_more = true;
					} else {
						self.no_more = false;
					}
					self.total=res.data.list.total;
					self.dataList=self.dataList.concat(res.data.list.data);
					self.loadding=false;
					uni.hideLoading();
				});
			},
		}
	}
</script>

<style>
	.item{
		border-bottom: 1rpx solid #CACACA;
		font-size: 32rpx;
		padding: 30rpx 0;
		box-sizing: border;
	}
</style>
