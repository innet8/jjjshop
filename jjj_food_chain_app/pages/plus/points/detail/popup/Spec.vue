<template>
	<view :data-theme='theme()' :class="theme() || ''">
		<view :class="Visible ? 'product-popup open' : 'product-popup close'" @touchmove.stop.prevent=""
			@click="closePopup">
			<view class="popup-bg"></view>
			<view class="main" v-on:click.stop>
				<view class="header">
					<image :src="form.file_path" mode="aspectFit" class="avt"></image>
					<view class="price d-s-c gray9">
						<text class="">所需积分</text>
						<text class="f30 dominant">{{ form.product_points * sum }}</text>
						<template v-if="form.product_price>0">
							<text>+</text>
							<text class="old-price dominant">{{ form.product_price * sum }}</text>
							<text>元</text>
						</template>

					</view>
					<view class="stock">库存：{{ form.product_stock }}</view>
					<view class="close-btn" @click="closePopup"><text class="icon iconfont icon-jiantoushang"></text>
					</view>
				</view>

				<view class="body">
					<!--选择数量-->
					<view class="level-box count_choose">
						<text class="key">数量</text>
						<view class="btn-group">
							<button type="default" plain class="btn theme-borderbtn" size="min" hover-class="none"
								@click="sub()">
								<view class="icon icon-jian iconfont iconsami-select"></view>
							</button>
							<view class="number">{{ sum }}</view>
							<button type="primary" class="btn theme-btn" size="min" hover-class="none" @click="add()">
								<view class="icon icon-jia iconfont iconadd-select"></view>
							</button>
						</view>
					</view>
				</view>
				<view class="btns white"><button class="theme-btn" @click="confirmFunc(form)">确认</button></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		judgeSelect
	} from '@/common/specSelect.js';
	export default {
		data() {
			return {
				/*是否可见*/
				Visible: false,
				form: {},
				sum: 1,
				/*当前商品总库存*/
				stock: 0,
				/*选择提示*/
				selectSpec: '',
				/*规格是否选择完整*/
				isAll: false,
				/*是否改变*/
				is_change: false
			};
		},
		props: ['isPopup', 'productModel'],
		onLoad() {},
		mounted() {},
		computed: {
			/*判断增加数量*/
			isadd: function() {
				return this.sum >= this.stock || this.sum >= this.form.limit_num;
			},

			/*判断减少数量*/
			issub: function() {
				return this.sum <= 1;
			}
		},
		watch: {
			'isPopup': function(n, o) {
				if (n != o) {
					this.Visible = n;
					if (!this.isOpenSpec) {
						this.form = this.productModel;
						this.isOpenSpec = true;
					}
				}
			},
		},
		methods: {
			/*关闭弹窗*/
			closePopup() {
				this.$emit('close', this.form.specData, null);
			},

			/*确认提交*/
			confirmFunc() {
				if (this.form.specData != null && !this.isAll) {
					uni.showToast({
						title: '请选择规格',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				this.createdOrder();
			},
			/*更新商品规格信息*/
			updateSpecProduct() {

			},

			/*创建订单*/
			createdOrder() {
				let self = this;
				let product_id = self.form.product_id;
				let num = self.sum;

				self.gotoPage('/pages/order/points-order?product_num=' +
					num +
					'&product_id=' +
					product_id +
					'&order_type=points');

			},

			/*商品增加*/
			add() {
				if (this.form.product_stock <= 0) {
					return;
				}
				if (this.sum >= this.form.product_stock) {
					uni.showToast({
						title: '数量超过了库存',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				if (this.form.limit_num != 0 && this.sum >= this.form.limit_num) {
					uni.showToast({
						title: '数量超过了限购数量',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				this.sum++;
			},

			/*商品减少*/
			sub() {
				if (this.form.product_stock <= 0) {
					return;
				}
				if (this.sum < 2) {
					uni.showToast({
						title: '商品数量至少为1',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				this.sum--;
			}
		}
	};
</script>

<style lang="scss">
	.product-popup {}

	.product-popup .popup-bg {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, .6);
		z-index: 99;
	}

	.product-popup .main {
		position: fixed;
		width: 100%;
		bottom: 0;
		min-height: 200rpx;
		// max-height: 900rpx;
		background-color: #fff;
		transform: translate3d(0, 980rpx, 0);
		transition: transform .2s cubic-bezier(0, 0, .25, 1);
		border-radius: 12rpx;
		//bottom: env(safe-area-inset-bottom);
		z-index: 99;
	}

	.product-popup.open .main {
		transform: translate3d(0, 0, 0);
		z-index: 99;
	}

	.product-popup.close .popup-bg {
		display: none;
	}

	.product-popup.close .main {
		display: none;
		z-index: -1;
	}


	.product-popup .header {
		min-height: 200rpx;
		padding: 40rpx 0 40rpx 250rpx;
		position: relative;
		border-bottom: 1px solid #eeeeee;
	}

	.product-popup .header .avt {
		position: absolute;
		top: 40rpx;
		left: 30rpx;
		width: 200rpx;
		height: 200rpx;
		border: 2px solid #ffffff;
		background: #ffffff;
		border-radius: 12rpx;
	}

	.product-popup .header .stock {
		font-size: 26rpx;
		color: #999999;
	}

	.product-popup .close-btn {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		top: 40rpx;
		right: 30rpx;
	}

	.product-popup .price {
		height: 80rpx;
		font-size: 24rpx;
	}

	.product-popup .price .num {
		padding: 0 4rpx;
		font-size: 50rpx;
	}

	.product-popup .old-price {
		margin-left: 10rpx;
		font-size: 30rpx;
		color: #999999;
	}

	.product-popup .body {
		padding: 20rpx 30rpx 39rpx 30rpx;
		// max-height: 600rpx;
		overflow-y: auto;
	}

	.product-popup .level-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.product-popup .level-box .key {
		font-size: 24rpx;
		color: #999999;
	}

	.product-popup .level-box .icon-box {
		width: 48rpx;
		height: 40rpx;
		background: #e0e0e0;
	}

	.product-popup .num-wrap .iconfont {
		color: #666;
	}

	.product-popup .num-wrap.no-stock .iconfont {
		color: #cccccc;
	}

	.product-popup .level-box .text-wrap {
		margin: 0 4rpx;
		height: 60rpx;
		border: none;
		background: #ffffff;
	}

	.product-popup .level-box .text-wrap input {
		padding: 0 10rpx;
		height: 60rpx;
		line-height: 60rpx;
		width: 80rpx;
		text-align: center;
		font-size: 32rpx;
	}

	.specs .specs-list {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}

	.specs .specs-list button {
		margin-right: 10rpx;
		margin-bottom: 10rpx;
		font-size: 24rpx;
	}

	.specs .specs-list button:after,
	.product-popup .btns button,
	.product-popup .btns button:after {
		border: 0;
		margin-bottom: 55rpx;
		border-radius: 0;
	}

	.product-popup .btns button {
		width: 90%;
		margin: 0 auto;
		border-radius: 45rpx;
		margin-bottom: 55rpx;
	}
	.btn-group {
		display: flex;
		align-items: center;
		justify-content: space-around;
		
		.number {
			font-size:24rpx;
			width: 40rpx;
			height: 32rpx;
			line-height: 32rpx;
			text-align: center;
		}
		
		.btn {
			padding: 0;
			font-size: 22rpx;
			width: 32rpx;
			height: 32rpx;
			line-height: 32rpx;
			border-radius: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.iconsami-select{
				font-size: 20rpx;
				@include font_color('font_color');
			}
			.iconadd-select{
				color: #FFFFFF;
				font-size: 20rpx;
			}
			.cart-list .iconadd-select{
				font-size: 20rpx;
				@include font_color('font_color');
			}
		}
	}
</style>
