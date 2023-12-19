<template>
	<view :data-theme="theme()" :class="theme() || ''" class="pb50" v-if="!loading">
		<!-- 排队取号 -->
		<template v-if="detail == null">
			<view class="p-0-20 bg-white mt16">
				<view class="d-b-c top-title border-b">
					<view class="flex-1">餐桌类型</view>
					<view class="w200 tc">等待桌数</view>
					<view class="w200 tc">预计等待</view>
				</view>
				<view class="p-10-0">
					<view class="d-b-c top-item" v-for="(item, index) in tableList" :key="index">
						<view class="flex-1 f28">
							{{ item.table_name }}
							<text class="f24">({{ item.min_num }}-{{ item.max_num }})人</text>
						</view>
						<view class="w200 tc">
							<text class="dominant">{{ item.wait_num }}</text>
							<text class="f24">桌</text>
						</view>
						<view class="w200 tc">
							<text v-if="item.wait_times == 0" class="gray9">无需等待</text>
							<template v-else>
								<text class="dominant">{{ item.wait_times }}</text>
								<text class="f24">分钟</text>
							</template>
						</view>
					</view>
				</view>
			</view>
			<view class="bg-white mt16">
				<view class="p-0-20">
					<picker class="" range-key="num" @change="changeSelect" :range="tableNum">
						<view class="selectpicker">
							<view class="flex-1">就餐人数</view>
							<view class="d-c-c">
								<view class="make-item input-box ">{{ queue_num || '请选择' }}人</view>
								<view class="icon iconfont icon-jiantou ml20"></view>
							</view>
						</view>
					</picker>
				</view>
				<view class="p-0-20 pb14" v-if="queue_num">
					<view class="p-10-0 f26">餐桌类型</view>
					<view class="active-box theme-border">{{ table.table_name + ':预计等待' + table.wait_num + '桌,' + table.wait_times + '分钟' }}</view>
				</view>
				<view class="d-b-c p20">
					<view class="f26">手机号</view>
					<input class="mr10 flex-1 f26 p-10-0 tr" name="phone" type="number" placeholder-class="grary9" v-model="mobile" placeholder="请输入手机号" />
				</view>
			</view>
			<view class="mt24 mb40"><button type="default" class="theme-btn" @click="submit">确认取号</button></view>
			<view class="p20" v-if="content">
				<view class="p20" style="border-radius: 15rpx;background-color: #ededed;font-size: 32rpx;line-height: 1.5;"><u-parse :content="content"></u-parse></view>
			</view>
		</template>
		<template v-else>
			<view class="top-text">
				<u-icon name="volume-fill" color="#FF351A" size="30rpx"></u-icon>
				<view class="flex-1 ml10">{{ rule.notice }}</view>
			</view>
			<view class="section d-c">
				<view class="border-b p-40-0">
					<view class="f28 gray3 mb20">我的号码</view>
					<view class="text-group_1 d-c d-b-s">
						<view class="f48 dominant fb mb20">小桌{{ detail.queue_no }}</view>
						<view class="f28 gray3 mb20">
							<text class="">前方等待桌数</text>
							<text class="dominant">{{ detail.wait_num }}</text>
							<text class="">桌</text>
						</view>
					</view>
					<view class="f28 gray6">预计等待时长{{ detail.wait_time }}分钟</view>
				</view>
				<view class="paragraph_2 p-30-0 f28 gray6 border-b" style="line-height: 1.5;">
					<view class="mb20">
						<text>已等待：</text>
						<text>{{ detail.await_time }}分钟</text>
					</view>
					<view class="mb20">
						<text>手机号码：</text>
						<text>{{ detail.mobile }}</text>
					</view>
					<view class="mb20">
						<text>取号时间：</text>
						<text>{{ detail.create_time }}</text>
					</view>
					<view>
						<text>取号渠道：</text>
						<text>在线取号</text>
					</view>
				</view>
				<view class="pt20">
					<view class="f28 gray6 d-s-c mb10">
						<u-icon size="34rpx" :color="getThemeColor()" name="error-circle-fill"></u-icon>
						<text class="ml10">商家说明</text>
					</view>
					<view class="f24 gray6">{{ rule.explain }}</view>
				</view>
			</view>
			<view class="cancelFunc theme-borderbtn" @click="cancelFunc">取消排队</view>
		</template>
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
			/*是否正在加载*/
			loading: true,
			/*手机高度*/
			phoneHeight: 0,
			/*可滚动视图区域高度*/
			scrollviewHigh: 0,
			/*数据*/
			listData: [],
			/*最后一页码数*/
			last_page: 0,
			/*当前页面*/
			page: 1,
			/*每页条数*/
			list_rows: 10,
			/*有没有等多*/
			no_more: false,

			shop_supplier_id: 0,
			tableList: [],
			tableNum: [1, 2, 3, 4, 5, 6],
			queue_num: '',
			mobile: '',
			table_id: 0,
			type: 10,
			table: {},
			content: '',
			detail: null,
			rule: {}
		};
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
	onShow() {
		this.shop_supplier_id = uni.getStorageSync('selectedId');
		this.getData();
	},
	methods: {
		initData() {
			let self = this;
			self.page = 1;
			self.listData = [];
			self.no_more = false;
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
		},
		cancelFunc() {
			let self = this;
			uni.showModal({
				title: '提示',
				content: '确定要取消排队吗？',
				success(e) {
					if (e.confirm) {
						self._post(
							'plus.queue.Record/cancel',
							{
								shop_supplier_id: self.shop_supplier_id
							},
							res => {
								uni.showModal({
									title:'提示',
									content:res.msg
								})
								self.getData();
							}
						);
					}
				}
			});
		},
		getData() {
			let self = this;
			self.loading = true;
			self._get(
				'plus.queue.Record/index',
				{
					shop_supplier_id: self.shop_supplier_id
				},
				function(res) {
					self.loading = false;
					self.detail = res.data.detail;
					self.tableNum = res.data.tableNum;
					self.tableList = res.data.tableList;
					self.content = res.data.rule && res.data.rule.content;
					self.rule = res.data.rule;
				}
			);
		},
		submit() {
			let self = this;
			if (self.mobile == '') {
				self.showError('手机号不能为空');
				return;
			}
			if (self.queue_num == '') {
				self.showError('就餐人数不能为空');
				return;
			}
			self.loading = true;
			self._get(
				'plus.queue.Record/take',
				{
					shop_supplier_id: self.shop_supplier_id,
					queue_num: self.queue_num,
					mobile: self.mobile,
					table_id: self.table_id
				},
				function(res) {
					self.showSuccess('提交成功');
					self.getData();
					self.loading = false;
				},
				function() {
					self.loading = false;
				}
			);
		},
		changeSelect(e) {
			this.queue_num = this.tableNum[e.detail.value].num;
			this.table_id = this.tableNum[e.detail.value].table.table_id;
			this.table = this.tableNum[e.detail.value].table;
		},
		changeType(n) {
			if (this.loading) {
				return;
			}
			this.type = n;
			this.initData();
			this.getData();
		}
	}
};
</script>

<style lang="scss">
.w200 {
	width: 200rpx;
}

.top-title {
	height: 78rpx;
	line-height: 78rpx;
	font-size: 26rpx;
	color: #666;
}

.top-item {
	height: 80rpx;
	line-height: 80rpx;
	font-size: 28rpx;
	color: #666;
}

.selectpicker {
	height: 98rpx;
	line-height: 98rpx;
	box-sizing: border-box;
	font-size: 26rpx;
	font-weight: 500;
	color: #575757;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid #eeeeee;
}

.selectpicker .icon-jiantou {
	font-size: 22rpx;
	color: #575757;
}

.active-box {
	height: 65rpx;
	line-height: 65rpx;
	border: 1rpx solid;
	padding: 0 23rpx;
	margin: 10rpx 0;
	box-sizing: border-box;
	border-radius: 8rpx;
}

.theme-btn {
	width: 710rpx;
	height: 80rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	border-radius: 40rpx;
}

.pb50 {
	padding-bottom: 50rpx;
}

.pb150 {
	padding-bottom: 150rpx;
}
.top-text {
	width: 698rpx;
	background: rgba(#ffe1e1, 0.45);
	border-radius: 15rpx;
	padding: 30rpx 20rpx;
	box-sizing: border-box;
	margin: 20rpx auto;
	color: #ff351a;
	line-height: 1.5;
	display: flex;
	justify-content: center;
	align-items: center;
}
.section {
	width: 698rpx;
	padding: 0 20rpx 96rpx 20rpx;
	box-sizing: border-box;
	background: #ffffff;
	border-radius: 15rpx;
	margin: 20rpx auto;
}
.text-group_1 {
}
.f48 {
	font-size: 48rpx;
}
.cancelFunc {
	width: 700rpx;
	height: 92rpx;
	line-height: 92rpx;
	text-align: center;
	font-size: 32rpx;
	margin: 0 auto;
	position: fixed;
	bottom: 50rpx;
	left: 25rpx;
	box-sizing: border-box;
	border: 1px solid;
	border-radius: 46rpx;
}
</style>
