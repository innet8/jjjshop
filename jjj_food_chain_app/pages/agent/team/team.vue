<template>
	<view>
		<view class="top-container">
			<view class="top-tabbar">
				<view v-for="(item,index) in tabList" :key="index" :class="state_active == index ? 'tab-item active' : 'tab-item'"
				 @click="stateFunc(index)">
					{{item.text}}( {{item.total}})
				</view>
			</view>

			<view class="total p-0-30 d-s-c f24 gray9">
				团队总人数：
				<text class="red">{{teamTotal}}</text>
				人
			</view>
		</view>

		<!--列表-->
		<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'" lower-threshold="50"
		 @scrolltolower="scrolltolowerFunc">
			<view class="p-0-30 bg-white">
				<view class="border-b p-20-0" v-for="(item,index) in tableData" :key="index">
					<view class="d-b-c">
						<view class="agent-team-photo">
							<image :src="item.user.avatarUrl" mode="aspectFill"></image>
						</view>
						<view class="flex-1 ml20 f24">
							<view class="d-b-c">
								<text class="f28 gray3">{{ item.user.nickName }}</text>
								<text class="gray9">{{ item.create_time }}</text>
							</view>
							<view class="d-b-c">
								<text class="gray9">￥{{ item.user.expend_money }}</text>
								<text class="gray9" v-if="item.agent"> {{ item.agent.first_num + item.agent.second_num + item.agent.third_num }}个成员</text>
							</view>
						</view>
					</view>
				</view>
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
				state_active: 0,
				/*数据列表*/
				tableData: [],
				setting: [],
				teamTotal: 0,
				page: 1,
				no_more: false,
				tabList: [],
				list_rows: 15,
				loading: true,
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
						// 计算组件的高度
						let view = uni.createSelectorQuery().select('.top-container');
						view.boundingClientRect(data => {
							let h = self.phoneHeight - data.height;
							self.scrollviewHigh = h;
						}).exec();
					}
				});
			},
			
			/*获取数据*/
			getData() {
				let self = this;
				self.loading = true;
				self._get('plus.agent.team/lists', {
					level: self.state_active + 1,
					page: self.page || 1,
					list_rows: self.list_rows,
				}, function(res) {
					self.loading = false;
					self.teamTotal = res.data.agent.first_num;
					let data = res.data;
					// 导航栏数据
					self.tabList = [{
						value: 1,
						text: data.words.team.words.first.value,
						total: data.agent.first_num
					}];
					if (data.setting.level >= 2) {
						self.tabList.push({
							value: 2,
							text: data.words.team.words.second.value,
							total: data.agent.second_num
						});
						self.teamTotal += data.agent.second_num;
					}
					if (data.setting.level == 3) {
						self.tabList.push({
							value: 3,
							text: data.words.team.words.third.value,
							total: data.agent.third_num
						});
						self.teamTotal += data.agent.third_num;
					}
					self.tableData = self.tableData.concat(data.list.data);
					self.last_page = data.list.last_page;
					if (self.last_page <= 1) {
						self.no_more = true;
					}
				},null,function(){
					self.loading = false;
				});
			},

			/*切换类别*/
			stateFunc(e) {
				let self = this;
				if(e!=self.state_active){
					self.tableData = [];
					self.page = 1;
					self.state_active = e;
					self.getData();
				}
			},

			/*可滚动视图区域到底触发*/
			scrolltolowerFunc() {
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
			}
		}
	}
</script>

<style>
	.top-container .total {
		height: 80rpx;
	}

	.agent-team-photo,
	.agent-team-photo image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
</style>
