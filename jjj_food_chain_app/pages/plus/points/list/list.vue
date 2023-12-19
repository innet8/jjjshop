<template>
	<view class="category-content" :data-theme='theme()' :class="theme() || ''">
		<view class="hang dominant" @click="gotoPage('/pages/plus/points/order/order')">兑换记录</view>
		<view class="prodcut-list-wrap">
			<view class="cotegory-type cotegory-type-3">
				<view class="category-tab">
					<scroll-view scroll-y="true" class="scroll-Y" :style="'height:'+scrollviewHigh+'px;'">
						<view :class="category_id==item.category_id?'item active':'item'"
							v-for="(item,index) in categoryList" :key="index" @click="selectCategory(item.category_id)">
							<text>{{item.name}}</text>
						</view>
					</scroll-view>
				</view>
				<view class="category-content pr ">
					<scroll-view scroll-y="true" class="scroll-Y scroll-3" :style="'height:'+scrollviewHigh+'px;'">
						<view class="list">
							<view class="item" v-for="(item,index) in listData" :key="index"
								@click="gotoList(item.product_id)">
								<image :src="item.file_path" mode="aspectFit"></image>
								<view class="ww100">
									<view class="type-name text-ellipsis">{{item.product_name}}</view>
									<view class="f24 gray9">
										<div>
											<text class="dominant f24">{{item.product_points}}</text> {{points_name}}
										<template v-if="item.product_price > 0">
											+ <text class="dominant f24">{{item.product_price}}</text> 元
										</template>
                    </div>
                  </view>
									<view class="f22 gray9">剩余库存：{{item.product_stock}}件</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
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
				phoneHeight: 0,
				scrollviewHigh: 0,
				select_index: 0,
				/*数据列表*/
				listData: [],
				categoryList: [],
				category_id: 0,
				/*最后一页码数*/
				last_page: 0,
				/*当前页面*/
				page: 1,
				/*每页条数*/
				list_rows: 10,
				no_more: false,
				my_points: 0,
				points_name: ''
			};
		},
		onLoad() {
			this.init();
			this.getCategory();
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
			/*初始化*/
			init() {
				let _this = this;
				uni.getSystemInfo({
					success(res) {
						_this.phoneHeight = res.windowHeight;
						_this.scrollviewHigh = _this.phoneHeight;
					}
				});
			},
			/*获取数据*/
			getCategory() {
				let self = this;
				self.loading = true;
				self._get(
					'plus.points.category/index', {

					},
					function(res) {
						self.categoryList = res.data.list.all;
						let item = {
							category_id: 0,
							name: "全部"
						}
						self.categoryList = [item, ...self.categoryList];
						self.loading = false;
						self.getData();
					}
				);
			},
			selectCategory(id) {
				if(id == this.category_id || this.loading){
					return
				}
				this.category_id = id;
				this.initData();
				this.getData();
			},
			initData() {
				this.listData = [];
				this.page = 1;
				this.no_more = false;
			},
			/*获取数据*/
			getData() {
				let self = this;
				self.loading = true;
				self._get(
					'plus.points.product/index', {
						page: self.page || 1,
						list_rows: self.list_rows,
						category_id: self.category_id
					},
					function(res) {
						self.loading = false;
						self.points_name = res.data.points_name;
						self.listData = self.listData.concat(res.data.list.data);
						self.last_page = res.data.list.last_page;
						if (res.data.list.last_page <= 1) {
							self.no_more = true;
						}
					}
				);
			},
			/*跳转产品列表*/
			gotoList(e) {
				this.gotoPage('/pages/plus/points/detail/detail?product_id=' + e);
			}
		}
	};
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	@import '@/common/mixin.scss';

	.foot_ {
		height: 98rpx;
		width: 100%;
	}

	.cotegory-type {
		line-height: 40rpx;
	}

	.cotegory-type image {
		width: 100%;
	}

	.cotegory-type-3 .list {
		padding: 0 27rpx 0 23rpx;
	}

	.cotegory-type-3 .list .item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.cotegory-type-3 {
		display: flex;
	}

	.cotegory-type-3 .category-tab {
		width: 190rpx;
		background:rgba($color: #FFCC00, $alpha: 0.03);
	}

	.cotegory-type-3 .category-tab .item {
		padding: 40rpx 0;
		font-size: 24rpx;
		text-align: center;
		color: #666666;
	}

	.cotegory-type-3 .category-tab .item.active {
		position: relative;
		@include font_color("font_color");
	}

	.cotegory-type-3 .category-tab .item.active::after {
		position: absolute;
		content: '';
		top: 40rpx;
		bottom: 40rpx;
		right: 0;
		width: 2rpx;
		height: 24rpx;
		margin: auto;
		@include background_color("background_color");
	}

	.cotegory-type-3 .category-content {
		flex: 1;
	}
	.cotegory-type-3 .list{
		padding-top: 26rpx;
	}
	.cotegory-type-3 .list .item {
		margin-bottom: 20rpx;
		font-size: 24rpx;
		flex-direction: initial;
		background: #FFFFFF;
		border-radius: 15rpx;
	}
	.cotegory-type-3 .list .item image {
		width: 162rpx;
		height: 162rpx;
		border-radius: 15rpx;
		margin-right: 17rpx;
		flex-shrink: 0;
	}

	.cotegory-type-3 .list .item .type-name {
		display: block;
		text-overflow: ellipsis;
		width: 100%;
		color: #333333;
		font-size: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-align: left;
	}

	.scroll-3 {
		
	}

	.letter-spacing1 {
		letter-spacing: 1rpx;
	}
	.hang{
		position: fixed;
		bottom: 300rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius:  30rpx 0 0 30rpx;
		width: 150rpx;
		right: 0;
		background-color: #FFFFFF;
		z-index: 100;
		text-align: center;
		font-weight: 800;
		box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.2);
		font-size: 26rpx;
		border: 1rpx solid #99999960;
	}
</style>
