<template>
	<view>
		<!--列表-->
		<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'" lower-threshold="50"
			@scrolltoupper="scrolltoupperFunc" @scrolltolower="scrolltolowerFunc">
			<view class="p-0-30 bg-white">
				<view class="d-b-c border-b p-20-0" v-for="(item,index) in tableData" :key="index">
					<view class="d-s-s f-w d-c flex-1">
						<text class="30">提现</text>
						<text class="gray9 f22">{{item.create_time}}</text>
					</view>
					<view class="d-s-e f-w d-c">
						<text class="red"> {{ item.money }}元</text>
						<text
							:class="item.apply_status.text=='审核通过'?'green':'gray9'">{{ item.apply_status.text }}</text>
					</view>
				</view>

				<!--<view class="">
					<view class="bottom-refresh">
						<view class="d-c-c p30" v-if="tableData.length && no_more">
							<text class="gray3">亲, 没有更多了</text>
						</view>
						<view v-if="loading" class="d-c-c p30">
							<text class="gray3">加载中...</text>
						</view>
					</view>
				</view>-->
				<!-- 没有记录 -->
				<view class="d-c-c p30" v-if="tableData.length==0 && !loading">
					<text class="iconfont icon-wushuju"></text>
					<text class="cont">亲，暂无相关记录哦</text>
				</view>
				<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
			</view>
		</scroll-view>

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

				/*手机高度*/
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				/*状态选中*/
				state_active: -1,
				/*数据列表*/
				tableData: [],
				no_more: false,
				loading: true,
				/*最后一页码数*/
				last_page: 0,
				/*当前页面*/
				page: 1,
				/*每页条数*/
				list_rows: 20,
				tableList: [],
			}
		},
		computed: {

			/*加载中状态*/
			loadingType() {
				if (this.loading) {
					return 1;
				} else {
					if (this.tableData.length != 0 && this.no_more) {
						return 2;
					} else {
						return 0;
					}
				}
			}
		},
		mounted() {
			/*初始化*/
			this.init();
			/*获取数据*/
			this.getData();
		},
		methods: {
			/*初始化*/
			init() {
				let self = this;
				uni.getSystemInfo({
					success(res) {
						self.phoneHeight = res.windowHeight;
						self.scrollviewHigh = res.windowHeight;
					}
				});
			},
			/*获取数据*/
			getData() {
				let self = this;
				let page = self.page;
				self.loading = true;
				let list_rows = self.list_rows;
				self._get('user.cash/lists', {
					status: -1,
					page: page || 1,
					list_rows: list_rows,
				}, function(data) {
					self.loading = false;
					self.tableData = self.tableData.concat(data.data.list.data);
					self.last_page = data.data.list.last_page;
					if (data.data.list.last_page <= 1) {
						self.no_more = true;
						return false;
					}
				});
			},

			/*切换*/
			stateFunc(e) {
				let self = this;
				if (e != self.state_active) {
					self.tableData = [];
					self.page = 1;
					self.state_active = e;
					self.getData();
				}
			},

			/*可滚动视图区域到顶触发*/
			scrolltoupperFunc() {
				console.log('滚动视图区域到顶');
			},

			/*可滚动视图区域到底触发*/
			scrolltolowerFunc() {
				let self = this;
				if (self.page < self.last_page) {
					self.page++;
					self.getData();
				}
				self.no_more = true;
			}
		}
	}
</script>

<style>

</style>
