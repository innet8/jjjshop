<template>
	<view class="">
		<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'" lower-threshold="50" @scrolltolower="scrolltolowerFunc">
		<view class="hall_list">
			<view class="hall_item p30" v-for="(item,index) in dataList" :key="index">  
				<view class="d-b-c mb-20">
					<view>{{item.create_time}}</view>
					<view class="f26">配送费用: <text class="red"> {{item.take_fee}}元</text></view>
				</view>
				<view class="d-b-c ">
					<scroll-view class="scroll_x" scroll-x="true" >
						<view class="d-s-c">
							<view class="produc_imgs" v-for="(img_item,image_index) in item.product"><image class="product_img" :src="img_item.image.file_path" mode="scaleToFill"></image></view>
						</view>
					</scroll-view>
					<view class="mid_btn btn_close" v-if="item.receipt_status.value==10">派送中</view>
					<view class="mid_btn btn_close" v-if="item.receipt_status.value==20">已送达</view>
				</view>
				<!-- <view class="f26 pt20">送达时间：xx时xx分</view> -->
				<view class="d-b-c f26 pt20">
					<view class="address_text f26">送货地址：{{item.address.detail+item.address.address}}</view>
					
				</view>
			</view>
			<!-- 没有记录 -->
			<view class="d-c-c p30" v-if="dataList.length==0 && !loadding">
				<text class="iconfont icon-wushuju"></text>
				<text class="cont">亲，已经没有更多了</text>
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
				dataList:[],
				take_fee:'',
				/*底部加载*/
				loadding: true,
				/*没有更多*/
				no_more: false,
				/*当前页面*/
				page: 1,
				last_page:0,
				type:1,
				scrollviewHigh:0,
				phoneHeight:0
				
			}
		},
		onLoad() {
			
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
		mounted() {
			this.init()
			this.restoreData();
			this.getData();
		},
		methods: {
			restoreData() {
				this.dataList = [];
				this.page = 1;
				this.no_more = false;
				this.loading = true;
			},
			init() {
				let self = this;
				uni.getSystemInfo({
					success(res) {
						self.phoneHeight = res.windowHeight;
						self.scrollviewHigh = self.phoneHeight;
					}
				});
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
			getData(){
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self._post('plus.driver.TakeOrder/driverList', {
					type:0
				}, function(res) {
					self.last_page = res.data.list.last_page;
					if (res.data.list.last_page <= 1) {
						self.no_more = true;
					} else {
						self.no_more = false;
					}
					self.take_fee=res.data.take_fee;
					self.dataList=self.dataList.concat(res.data.list.data);
					uni.hideLoading();
					self.loadding=false;
				});
			},
		}
	}
</script>

<style lang="scss">
	.header {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
	}
	
	.header_item {
		color: #999999;
		font-size: 32rpx;
		padding: 24rpx 18rpx;
		border-bottom: 6rpx solid #FFFFFF;
	}
	
	.header .active {
		color: #000000;
		border-bottom: 6rpx solid #f5a654;
		@include border_color('border_color');
	}
	.hall_list{
		padding: 30rpx;
	}
	.hall_item{
		background-color: #FFFFFF;
		border-radius: 16rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
	}
	.produc_imgs{
		flex-shrink: 0;
		padding-right: 10rpx;
	}
	.product_img{
		width: 80rpx;
		height: 80rpx;
		border-radius: 8rpx;
	}
	.scroll_x{
		width: 78%;
	}
	.mid_btn{
		/* background-color: #F68F2A; */
		@include background_color('background_color');
		color: #FFFFFF;
		text-align: center;
		width: 120rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30rpx;
	}
	.address_text{
		/* width: 65%; */
		display: -webkit-box ;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp:2;	
	}
	.hall_head{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.btn_close{
		background-color: #c3c3c3 !important;
	}
</style>
