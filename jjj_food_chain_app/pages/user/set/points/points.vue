<template>
	<view>
		<view class="points-top d-b-c">
			<view class="">
				<text class="f26">积分总数：</text>
				<text class="f34 fb">{{points}}</text>
			</view>
			<button v-if="is_open" type="default" class="btn-red-border" @click="gotoShop">积分商城</button>
		</view>
		<!--列表-->

		<view class="p-0-30 bg-white">
			<view class="d-b-c border-b p-30-0" v-for="(item, index) in tableData" :key="index">
				<view class="d-s-s f-w d-c flex-1">
					<text class="f24">{{item.describe}}</text>
					<text class="pt10 gray9 f22">{{item.create_time}}</text>
				</view>
				<view class="red" v-if="item.value>0">+{{item.value}}</view>
				<view class="red" v-else="">{{item.value}}</view>
			</view>
			<!-- 没有记录 -->
			<view class="d-c-c p30" v-if="tableData.length==0 && !loading">
				<text class="iconfont icon-wushuju"></text>
				<text class="cont">亲，暂无相关记录哦</text>
			</view>
			<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
		</view>
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
				/*是否加载完成*/
				loadding: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				/*顶部刷新*/
				topRefresh: false,
				/*手机高度*/
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				/*数据列表*/
				tableData: [],
				/*最后一页码数*/
				last_page: 0,
				/*当前页面*/
				page: 1,
				/*每页条数*/
				list_rows: 20,
				no_more: false,
				loading: true,
				points: 0,
				is_open: false
			};
		},
        computed:{

			/*加载中状态*/
            loadingType(){
                if(this.loading){
                    return 1;
                }else{
                    if(this.tableData.length!=0&&this.no_more){
                        return 2;
                    }else{
                        return 0;
                    }
                }
            }
        },
		mounted() {
			/*获取数据*/
			this.getData();
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
				let page = self.page;
				let list_rows = self.list_rows;
				self._get('points.log/index', {
					page: page || 1,
					list_rows: list_rows,
				}, function(data) {
					self.loading = false;
					self.points = data.data.points;
					self.is_open = data.data.is_open;
					self.tableData = self.tableData.concat(data.data.list.data);
					self.last_page = data.data.list.last_page;
					if (data.data.list.last_page <= 1) {
						self.no_more = true;
						return false;
					}

				});
			},
			
			/*跳转积分商城*/
			gotoShop(){
				uni.navigateTo({
				    url: '/pages/plus/points/list/list'
				});
			}

		}
	};
</script>

<style>
	.points-top {
		height: 100rpx;
		padding: 0 30rpx;
		color: #FFFFFF;
		background: #f44f47;
	}
</style>
