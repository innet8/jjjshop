<template>
	<view class="product-detail" v-if="!loadding"  :data-theme='theme()' :class="theme() || ''">
		<!--图片-->
		<view class="product-pic">
			<image :src="detail.file_path" mode="aspectFit"></image>
		</view>

		<!--基本信息-->
		<view class="bg-white">
			<view class="product-name">
				{{detail.product_name}}
			</view>
			<view class="price-wrap">
				<view class="flex-1 d-s-s d-c">
					<view class="new-price gray9 f24">
						<text class="dominant f26">{{detail.product_points}} </text>
						<text> 积分</text>
						<template v-if="detail.product_price > 0">
							<text class="gray9">+</text>
							<text class="num dominant f26">{{detail.product_price}} </text>
							<text class="gray9"> 元</text>
						</template>
					</view>
				</view>
				<view class="already-sale">剩余<text class="dominant">{{detail.product_stock}}</text>件</view>
			</view>
		</view>
		<!--详情内容-->
		<view class="product-content">
			<view class="group-hd border-b-e">
				<view class="left"><text class="min-name">商品介绍</text></view>
			</view>
			<view class="content-box p30" v-html="detail.content"></view>
		</view>

		<!--底部按钮-->
		<view class="btns-wrap">
			<button type="primary" class="theme-btn" @click="openPopup()">立即抢购</button>
		</view>
		<!--购物确定-->
		<spec :isPopup="isPopup" :productModel="detail" @close="closePopup"></spec>
	</view>
</template>

<script>
	import utils from '@/common/utils.js';
	import spec from './popup/Spec.vue';
	import uniPopup from '@/components/uni-popup.vue';
	export default {
		components: {
			spec,
			uniPopup
		},
		data() {
			return {
				/*手机高度*/
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				/*是否加载完成*/
				loadding: true,
				/*积分商品id*/
				product_id: null,
				/*详情*/
				detail: {
					/*商品规格*/
					product_sku: {},
					/*当前规格对象*/
					show_sku: {
						/*商品价格*/
						product_price: '',
						/*商品规格ID*/
						product_sku_id: 0,
						/*划线价*/
						line_price: '',
						/*库存*/
						stock_num: 0,
						/*图片*/
						sku_image: ''
					},
					show_point_sku: {}
				},
				/*是否确定购买弹窗*/
				isPopup: false,
				/*子级页面传参*/
				productModel: {},
				/*商品规格*/
				productSku: [],
				/*是否打开客服*/
				isMpservice: false,
				serverList: '', //保障
				isguarantee: false,
				shop_info: {},
				store_open: 1,
			};
		},
		onLoad(e) {
			/*分类id*/
			this.product_id = e.product_id;
		},
		mounted() {
			/*获取产品详情*/
			this.getData();
		},
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				let product_id = self.product_id;
				uni.showLoading({
					title: '加载中'
				});
				self._get(
					'plus.points.product/detail', {
						product_id: product_id
					},
					function(res) {
						/*详情内容格式化*/
						res.data.detail.content = utils.format_content(res.data.detail.content);
						self.detail = res.data.detail;
						self.loadding = false;
						uni.hideLoading();
					}
				);
			},
			openPopup(){
				this.isPopup = true;
			},
			/*关闭弹窗*/
			closePopup(e, cart_total_num) {
				this.isPopup = false;
			},
		}
	};
</script>

<style lang="scss">
	.product-detail {
		padding-bottom: 90rpx;
	}

	.product-detail .product-pic,
	.product-detail .product-pic .swiper,
	.product-detail .product-pic image {
		width: 750rpx;
		height: 750rpx;
	}

	.product-detail .price-wrap {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.product-detail .price-wrap .old-price {
		padding: 10rpx 0;
		font-size: 30rpx;
		color: #888888;
		text-decoration: line-through;
	}

	.product-detail .already-sale {
		font-size: 24rpx;
		color: #999999;
	}

	.product-detail .product-name {
		padding: 20rpx 20rpx 0;
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}

	.product-detail .product-describe {
		padding: 20rpx;
		line-height: 40rpx;
		font-size: 26rpx;
		color: red;
	}

	.product-comment,
	.product-content {
		margin-top: 20rpx;
		background: #ffffff;
	}

	.product-content .content-box p image {
		width: 100%;
	}

	.product-content .content-box {
		font-size: 36rpx;
	}

	.btns-wrap {
		position: fixed;
		height: 90rpx;
		right: 0;
		bottom: env(safe-area-inset-bottom);
		left: 0;
		display: flex;
		background: #ffffff;
	}
	.btns-wrap button{
		width: 90%;
		height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 45rpx;
		margin: 0 auto;
		font-size: 28rpx;
	}
</style>
