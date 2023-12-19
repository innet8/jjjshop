<template>
	<view class="container" :data-theme="theme()" :class="theme() || ''">
		<view class="main">
			<view class="nav">
				<view class="d-b-c top-status" v-if="table_id != 0 && table_detail">
					<view>当前桌号:{{ table_detail.table_no }}</view>
					<view class="flex-1 tc f28 dominant" v-if="order_id"
						@click="gotoPage('/pages/order/store_order?order_id=' + order_id + '&pnum=' + num)">查看订单</view>
					<view class="d-e-c" @click="goBack">
						人数:{{ num }}人
						<u-icon name="edit-pen-fill" size="19"></u-icon>
					</view>
				</view>
				<view class="header">
					<view class="left">
						<view class="store-name">
							<text class="fb">{{ supplier.name }}</text>
						</view>
					</view>
					<view class="right" v-if="table_id == 0">
						<template v-for="(item, index) in store_set" :key="item">
							<view class="takeout" v-if="item == '30'" :class="orderType == 'takeout' ? 'active' : ''"
								@tap="takout">
								<text>打包</text>
							</view>
						</template>
						<template v-for="(item, index) in store_set" :key="item">
							<view class="dinein" v-if="item == '40'" :class="orderType == 'takein' ? 'active' : ''"
								@tap="takein">
								<text>店内</text>
							</view>
						</template>
					</view>
				</view>
				<view class="reduce_list" v-if="table_id == 0">
					<view v-for="(item, index) in reduceList" :key="index" class="reduce_item fb">{{ item.active_name }}
					</view>
				</view>
			</view>
			<view class="content">
				<scroll-view class="menus" :style="'height:' + scrollviewHigh + 'px;'"
					:scroll-into-view="menuScrollIntoView" :scroll-with-animation="true" :scroll-animation-duration="1"
					scroll-y>
					<view class="wrapper">
						<template v-for="(item, index) in goods_list" :key="index">
							<view class="menu" :id="`menu-${item.category_id}`"
								:class="{ current: item.category_id === currentCateId }"
								v-if="item.products.length != 0" @tap="handleMenuTap(item.category_id)">
								<image v-if="item.images" class="f-s-0 mr10" :src="item.images.file_path"
									mode="aspectFill" style="width: 30rpx;height: 30rpx;"></image>
								<text>{{ item.name }}</text>
								<view class="dot" v-if="menuCartNum(item.category_id)">
									{{ menuCartNum(item.category_id) }}
								</view>
							</view>
						</template>
					</view>
				</scroll-view>
				<!-- goods list begin -->
				<scroll-view class="goods pr" :style="'height:' + scrollviewHigh + 'px;'" :scroll-with-animation="true"
					:scroll-animation-duration="1" scroll-y :scroll-top="cateScrollTop" @scroll="handleGoodsScroll">
					<view class="wrapper">
						<view class="list">
							<!-- category begin -->
							<template v-for="(item, index) in goods_list" :key="index">
								<view class="category" v-if="item.products.length != 0"
									:id="`cate-${item.category_id}`">
									<view class="title">
										<text>{{ item.name }}</text>
									</view>
									<view class="items">
										<!-- 商品 begin -->
										<view class="good" @click="gotoDetail(good)"
											v-for="(good, key) in item.products" :key="key">
											<image :src="good.product_image" class="image"></image>
											<view class="right">
												<text class="name">{{ good.product_name }}</text>
												<text class="discount"
													v-if="good.discount > 0">第二件{{ good.discount }}折</text>
												<text class="tips text-ellipsis">{{ good.selling_point }}</text>
												<view class="price_and_action">
													<view>
														<text style="color: #FF5800;font-size: 22rpx;">￥</text>
														<text class="price">{{ good.product_price * 1 }}</text>
														<text class="linprice"
															v-if="good.product_price * 1 != good.line_price * 1">￥{{ good.line_price * 1 }}</text>
													</view>
													<view class="btn-group" v-if="good.spec_types == 20">
														<button type="primary" class="btn property_btn"
															hover-class="none" size="min"
															@tap.stop="gotoDetail(good)">选规格</button>
														<view class="dot" v-if="good.cart_num != 0">{{ good.cart_num }}
														</view>
													</view>
													<view class="btn-group" v-else>
														<button v-if="good.cart_num != 0" plain class="btn reduce_btn"
															size="min" hover-class="none" @tap.stop="reduceFunc(good)">
															<view class="iconfont  icon icon-jian iconsami-select">
															</view>
														</button>
														<view class="number" v-if="good.cart_num != 0">
															{{ good.cart_num }}
														</view>
														<button class="btn add_btn" size="min" hover-class="none"
															@tap.stop="addCart(good)">
															<view class="iconfont  icon icon-jia iconadd-select"></view>
														</button>
													</view>
												</view>
											</view>
										</view>
										<!-- 商品 end -->
									</view>
								</view>
							</template>

							<!-- category end -->
						</view>
					</view>
				</scroll-view>
				<!-- goods list end -->
			</view>
			<!-- content end -->
			<!-- 购物车栏 begin -->
			<view class="cart-box" v-if="cart_total_num > 0">
				<view class="mark">
					<image src="/static/images/menu/cart.png" class="cart-img" @tap="openCartPopup"></image>
					<view class="tag">{{ cart_total_num }}</view>
				</view>
				<view class="price">
					<view>
						<text class="f22">￥</text>
						{{ total_price }}
						<text class="gray9 f22 text-d-line fn ml10">{{ line_price }}</text>
					</view>
					<view class="gray9 f22 fn" v-if="total_bag_price != 0">
						<text class="">包含包装费￥</text>
						{{ total_bag_price }}
					</view>
				</view>
				<template v-if="table_id != 0">
					<button v-if="order_id == 0" type="primary" class="pay-btn" @tap="toPay"><text>下单</text></button>
					<button v-else type="primary" class="pay-btn" @tap="addpay">去加餐</button>
				</template>
				<template v-else>
					<button v-if="addorder_id == 0" type="primary" class="pay-btn"
						@tap="toPay"><text>去结算</text></button>
					<button v-else type="primary" class="pay-btn" @tap="addpay">去加餐</button>
				</template>
			</view>
			<!-- 购物车栏 end -->
		</view>
		<prospec :productModel="productModel" :goodDetailModalVisible="goodDetailModalVisible" :orderType="orderType"
			:bag_type="bag_type" @closeGoodDetailModal="closeGoodDetailModal" :table_id="table_id"
			:dinner_type="dinner_type" :cart_type="cart_type"></prospec>
		<!-- 购物车详情popup -->
		<popup-layer direction="top" :show-pop="cartPopupVisible" class="cart-popup" v-if="cart_total_num > 0">
			<template #content>
				<view class="cart-popup">
					<view class="d-b-c top-title" v-if="reduce && table_id == 0">
						<view class="mj d-c-c">
							<view v-if="reduce.now">
								已
								<text class="">{{ reduce.now.active_name }}</text>
								<text v-if="reduce.next">，</text>
							</view>
							<view v-if="reduce.next">
								<text class="">{{ reduce.next.active_name }}</text>
								还差
								<text class="">{{ reduce_diff_value }}</text>
								{{ reduce.next.full_type == 1 ? '元' : '件' }}
							</view>
						</view>
					</view>
					<view class="top d-b-c">
						<view>已选商品</view>
						<view @tap="handleCartClear">清空购物车</view>
					</view>
					<scroll-view class="cart-list" scroll-y>
						<view class="wrapper">
							<template v-for="(item, index) in cart_list" :key="index">
								<view class="item" v-if="item.product_num > 0">
									<view class="d-s-c">
										<view class="cart-image">
											<image style="" :src="item.image.file_path" mode="aspectFill"></image>
										</view>
										<view class="left">
											<view>
												<view class="name">{{ item.product.product_name }}</view>
												<view class="gray9">{{ item.describe }}</view>
											</view>
											<view class="center">
												<text class="fb">￥{{ item.price }}</text>
												<template
													v-if="bag_type != 1 && item.bag_price > 0 && orderType == 'takeout'">
													<text class="f24 gray9">(包装费：￥{{ item.bag_price }})</text>
												</template>
											</view>
										</view>
									</view>
									<view class="right">
										<button plain size="min" class="btn theme-borderbtn" hover-class="none"
											@tap="cartReduce(item)">
											<view class="iconfont icon icon-jian iconsami-select"></view>
										</button>
										<view class="number">{{ item.product_num }}</view>
										<button class="btn theme-btn" size="min" hover-class="none"
											@tap="cartAdd(item)">
											<view class="iconfont icon icon-jia iconadd-select"></view>
										</button>
									</view>
								</view>
							</template>
						</view>
					</scroll-view>
				</view>
			</template>
		</popup-layer>
		<!-- 购物车详情popup -->
	</view>

	<view class="loading" v-if="loading">
		<image src="/static/images/loading.gif"></image>
	</view>
</template>

<script>
	import utils from '@/common/utils.js';
	import prospec from './popup/spec.vue';
	import modal from '@/components/modal/modal';
	import popupLayer from '@/components/popup-layer/popup-layer';
	export default {
		components: {
			modal,
			popupLayer,
			prospec
		},
		data() {
			return {
				isLoading: true,
				goods: [], //所有商品
				supplier: {
					name: ''
				},
				ads: [],
				loading: true,
				currentCateId: 6905, //默认分类
				cateScrollTop: 0,
				menuScrollIntoView: '',
				cart: [], //购物车
				goodDetailModalVisible: false, //是否饮品详情模态框
				good: {}, //当前饮品
				category: {}, //当前饮品所在分类
				cartPopupVisible: false,
				sizeCalcState: false,
				listData: [],
				goods_list: [],
				productModel: {},
				clock: false,
				cart_total_num: 0,
				total_price: 0,
				total_bag_price: 0,
				cart_list: [],
				orderType: 'takein',
				takeout_address: {},
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				delivery_time: ['00:00', '00:00'],
				store_time: ['00:00', '00:00'],
				officeTime: {
					now: 0,
					delivery_start: 0,
					delivery_end: 0,
					store_start: 0,
					store_end: 0
				},
				addclock: false,
				longitude: 0,
				latitude: 0,
				bag_type: 1,
				shop_supplier_id: 0,
				/* 10配送20自提30店内 */
				dinner_type: 30,
				cart_type: 1,
				table_id: 0,
				order_id: 0,
				addorder_id: 0,
				reduceList: [],
				reduce: {},
				reduce_diff_value: 0,
				line_price: 0,
				isFirst: true,
				store_set: [],
				num: 1,
				table_detail: null,
				options: {},
				settle_type: 0
			};
		},
		onLoad(e) {
			let self = this;
			let scene = utils.getSceneData(e);
			self.options = e;
			self.shop_supplier_id = e.shop_supplier_id ? e.shop_supplier_id : scene.s_id;
			self.table_id = e.table_id || 0;
			if (self.table_id == 0) {
				self.shop_supplier_id = uni.getStorageSync('selectedId') ? uni.getStorageSync('selectedId') : 0;
			}
			self.num = e.num || 0;
			self.addorder_id = e.order_id || 0;
			uni.setNavigationBarTitle({
				title: self.table_id == 0 ? '快餐模式' : '堂食点餐'
			});
		},
		onShow() {
			let self = this;
			self.init();
		},
		computed: {
			menuCartNum() {
				return id =>
					this.cart.reduce((acc, cur) => {
						if (cur.cate_id === id) {
							return (acc += cur.number);
						}
						return acc;
					}, 0);
			}
		},
		methods: {
			goBack() {
				// #ifndef H5
				uni.navigateBack({
					delta: 1
				});
				// #endif
				// #ifdef H5
				history.go(-1);
				// #endif
			},
			scrollInit() {
				let self = this;
				uni.getSystemInfo({
					success(res) {
						self.phoneHeight = res.windowHeight;
						// 计算组件的高度
						let view = uni.createSelectorQuery().select('.nav');
						view.boundingClientRect(data => {
							let h = self.phoneHeight - data.height;
							self.scrollviewHigh = h;
						}).exec();
					}
				});
			},
			takout() {
				if (this.orderType == 'takeout') return;
				this.orderType = 'takeout';
				this.dinner_type = 10;
				this.init();
			},
			takein() {
				if (this.orderType == 'takein') return;
				this.orderType = 'takein';
				this.dinner_type = 20;
				this.init();
			},
			init() {
				//页面初始化
				this.addclock = false;
				this.category = {};
				this.good = {};
				this.goodDetailModalVisible = false;
				this.clock = false;
				this.loading = true;
				this.isLoading = true;
				this.getCategory();
				this.sizeCalcState = false;
			},
			/* 获取商品类型 */
			getCategory() {
				let self = this;
				this.sizeCalcState = false;
				uni.showLoading({
					title: '加载中'
				});
				self._get(
					'product.category/index', {
						/* 0外卖分类，1堂食分类 */
						type: 1,
						shop_supplier_id: self.shop_supplier_id,
						longitude: 0,
						latitude: 0,
						table_id: self.table_id,
						/* 30 打包 40店内 */
						delivery: self.orderType == 'takeout' ? 30 : 40,
						order_type: self.table_id == 0 ? 1 : 2
					},
					function(res) {
						self.settle_type = res.data.supplier.settle_type;
						self.reduceList = res.data.reduceList;
						self.goods_list = res.data.list;
						self.supplier = res.data.supplier;
						self.store_set = res.data.supplier.store_set;
						if (self.table_id != 0) {
							self.orderType = 'takein';
						} else if (self.isFirst && self.orderType == '') {
							if (self.store_set.indexOf(30) != -1) {
								self.orderType = 'takeout';
							} else {
								self.orderType = 'takein';
							}
							self.isFirst = false;
						}
						self.shop_supplier_id = res.data.supplier.shop_supplier_id;
						self.bag_type = res.data.supplier.storebag_type;
						self.loading = false;
						self.isLoading = false;
						self.$nextTick(function() {
							self.scrollInit();
						});
						if (self.getUserId()) {
							self.getCart();
						}
						uni.hideLoading();
					},
					function() {
						self.gotoPage('/pages/index/index');
					}
				);
			},
			/*获取数据*/
			getProduct(item) {
				let self = this;
				if (self.clock == true) {
					return;
				}
				self.clock = true;
				self.good = item;
				let product_id = item.product_id;
				self.detail = item;
				self.showGoodDetailModal();
			},
			reCart(res) {
				let self = this;
				self.cart_total_num = res.data.cartInfo.cart_total_num;
				self.total_price = res.data.cartInfo.total_pay_price;
				self.line_price = res.data.cartInfo.total_line_money;
				self.total_bag_price = res.data.cartInfo.total_bag_price;
				self.reduce = res.data.cartInfo.reduce;
				self.reduce_diff_value = res.data.cartInfo.reduce_diff_value;
			},
			addCart(goods) {
				let self = this;
				if (self.addclock) {
					return;
				}
				if (goods.limit_num != 0 && goods.limit_num <= goods.cart_num) {
					uni.showToast({
						icon: 'none',
						title: '超过限购数量'
					});
					return;
				}
				if (goods.product_stock <= 0 || goods.product_stock <= goods.cart_num) {
					uni.showToast({
						icon: 'none',
						title: '没有更多库存了'
					});
					return;
				}
				let params = {
					product_id: goods.product_id,
					product_num: 1,
					product_sku_id: goods.sku[0].product_sku_id,
					attr: '',
					feed: '',
					describe: '',
					price: goods.sku[0].product_price,
					bag_price: goods.sku[0].bag_price,
					shop_supplier_id: self.shop_supplier_id,
					table_id: self.table_id,
					cart_type: 1,
					dinner_type: self.dinner_type,
					product_price: goods.sku[0].line_price,
					delivery: self.orderType == 'takeout' ? 30 : 40
				};
				self.addclock = true;
				let url = 'order.cart/add';
				if (self.table_id != 0) {
					url = 'order.HallCart/add';
				}
				self._post(
					url,
					params,
					function(res) {
						let num = 1;
						self.reCart(res);
						if (goods.cart_num) {
							num = goods.cart_num + 1;
						}
						self.goods_list.forEach((item, index) => {
							item.products.forEach((product, product_index) => {
								if (product.product_id == goods.product_id) {
									self.$set(product, 'cart_num', product.cart_num + 1);
								}
							});
						});
						self.addclock = false;
						self.getCategory();
					},
					function(err) {
						self.addclock = false;
					}
				);
			},
			reduceFunc(goods) {
				let self = this;
				if (self.addclock || goods.cart_num <= 0) {
					return;
				}
				let product_id = goods.product_id;
				self.addclock = true;
				let url = 'order.cart/productSub';
				if (self.table_id != 0) {
					url = 'order.HallCart/productSub';
				}
				self._post(
					url, {
						product_id: product_id,
						type: 'down',
						cart_type: 1,
						shop_supplier_id: self.shop_supplier_id,
						table_id: self.table_id,
						dinner_type: self.dinner_type,
						delivery: self.orderType == 'takeout' ? 30 : 40
					},
					function(res) {
						self.reCart(res);
						self.goods_list.forEach((item, index) => {
							item.products.forEach((product, product_index) => {
								if (product.product_id == goods.product_id) {
									self.$set(product, 'cart_num', product.cart_num - 1);
								}
							});
						});
						self.addclock = false;
						self.getCategory();
					},
					function() {
						self.addclock = false;
					}
				);
			},
			getCart() {
				let id = uni.getStorageSync('user_id');
				if (!id) {
					return;
				}
				let self = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				if (self.table_id != 0) {
					self.getTableCart();
				} else {
					self.getFastCart();
				}
			},
			getFastCart() {
				let self = this;
				self._get(
					'order.cart/lists', {
						shop_supplier_id: self.shop_supplier_id,
						cart_type: 1,
						delivery: self.orderType == 'takeout' ? 30 : 40
					},
					function(res) {
						uni.hideLoading();
						self.isLoading = true;
						self.reCart(res);
						self.cart_list = res.data.productList;
					}
				);
			},
			getTableCart() {
				let self = this;
				self._get(
					'order.HallCart/lists', {
						shop_supplier_id: self.shop_supplier_id,
						table_id: self.table_id,
						cart_type: 1,
						delivery: self.orderType == 'takeout' ? 30 : 40
					},
					function(res) {
						self.isLoading = true;
						if (res.data.orderInfo) {
							self.order_id = res.data.orderInfo.order_id;
						}
						self.reCart(res);
						self.cart_list = res.data.productList;
						self.table_detail = res.data.detail;
						uni.hideLoading();
					}
				);
			},
			/* 购物车商品添加 */
			cartAdd(goods) {
				let self = this;
				if (self.addclock) {
					return;
				}
				self.addclock = true;
				let num = goods.product_num + 1;
				let product_id = goods.product_id;
				let total_num = 1;
				let url = 'order.cart/sub';
				/* 堂食模式 */
				if (self.table_id != 0) {
					url = 'order.HallCart/sub';
				}
				self._post(
					url, {
						product_id: product_id,
						total_num: total_num,
						cart_id: goods.cart_id,
						type: 'up',
						cart_type: 1,
						dinner_type: self.dinner_type,
						shop_supplier_id: self.shop_supplier_id,
						table_id: self.table_id,
						delivery: self.orderType == 'takeout' ? 30 : 40
					},
					function(res) {
						self.addclock = false;
						self.reCart(res);
						self.goods_list.forEach((item, index) => {
							item.products.forEach((product, product_index) => {
								if (product.product_id == goods.product_id) {
									self.$set(product, 'cart_num', product.cart_num + 1);
								}
							});
						});
						self.$set(goods, 'product_num', num);
						self.$set(goods, 'total_num', goods.total_num + 1);
						self.addclock = false;
						self.getCategory();
					},
					function() {
						self.addclock = false;
					}
				);
			},
			/* 购物车商品减少 */
			cartReduce(goods) {
				let self = this;
				if (self.addclock) {
					return;
				}
				self.addclock = true;
				let product_id = goods.product_id;
				let num = goods.product_num;
				let url = 'order.cart/sub';
				/* 堂食模式 */
				if (self.table_id != 0) {
					url = 'order.HallCart/sub';
				}
				self._post(
					url, {
						product_id: product_id,
						total_num: 1,
						cart_id: goods.cart_id,
						type: 'down',
						cart_type: 1,
						dinner_type: self.dinner_type,
						shop_supplier_id: self.shop_supplier_id,
						table_id: self.table_id,
						delivery: self.orderType == 'takeout' ? 30 : 40
					},
					function(res) {
						num--;
						self.reCart(res);
						self.goods_list.forEach((item, index) => {
							item.products.forEach((product, product_index) => {
								if (product.product_id == goods.product_id) {
									self.$set(product, 'cart_num', product.cart_num - 1);
								}
							});
						});
						self.$set(goods, 'product_num', num);
						self.$set(goods, 'total_num', goods.total_num - 1);
						self.addclock = false;
						self.getCategory();
					},
					function() {
						self.addclock = false;
					}
				);
			},
			//清空购物车
			handleCartClear() {
				let self = this;
				uni.showModal({
					title: '提示',
					content: '确定清空购物车么',
					success(res) {
						if (res.confirm) {
							self.clearCart();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			/*  清空 */
			clearCart() {
				let self = this;
				let url = 'order.cart/delete';
				let params = {
					shop_supplier_id: self.shop_supplier_id,
					cart_type: 1
				};
				if (self.table_id != 0) {
					url = 'order.HallCart/delete';
					params.table_id = self.table_id;
				}
				self._post(url, params, function(res) {
					self.cartPopupVisible = false;
					self.cart_list = [];
					self.init();
				});
			},
			/* 提交 */
			toPay() {
				let self = this;
				if (self.table_id != 0) {
					self.tableToPay();
				} else {
					self.fastToPay();
				}
			},
			/* 堂食提交 */
			tableToPay() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self._get(
					'order.HallCart/lists', {
						shop_supplier_id: self.shop_supplier_id,
						table_id: self.table_id,
						cart_type: 1,
						delivery: self.orderType == 'takeout' ? 30 : 40
					},
					function(res) {
						self.reCart(res);
						self.cart_list = res.data.productList;
						let arrIds = [];
						self.cart_list.forEach(item => {
							arrIds.push(item.cart_id);
						});
						if (arrIds.length == 0) {
							uni.showToast({
								title: '请选择商品',
								icon: 'none'
							});
							return false;
						}
						uni.hideLoading();
						if (!self.order_id) {
							if (self.settle_type == 20) {
								uni.showModal({
									title: '温馨提示',
									content: '订单提交后,我们将会尽快制作,是否确认提交?',
									success: function(res) {
										if (res.confirm) {
											self.submitOrder(arrIds);
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								});
							} else {
								uni.showModal({
									title: '温馨提示',
									content: '是否确认提交提单并前往付款?',
									success: function(res) {
										if (res.confirm) {
											self.submitOrder(arrIds);
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								});
							}

						}
					}
				);
			},
			/* 快餐结算 */
			fastToPay() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				let delivery = self.orderType == 'takeout' ? 30 : 40;
				self._get(
					'order.cart/lists', {
						shop_supplier_id: self.shop_supplier_id,
						cart_type: 1,
						delivery: delivery
					},
					function(res) {
						self.reCart(res);
						self.cart_list = res.data.productList;
						let arrIds = [];
						self.cart_list.forEach(item => {
							arrIds.push(item.cart_id);
						});
						if (arrIds.length == 0) {
							uni.showToast({
								title: '请选择商品',
								icon: 'none'
							});
							return false;
						}
						uni.hideLoading();
						uni.navigateTo({
							url: '/pages/order/confirm-order?order_type=cart&cart_ids=' +
								arrIds.join(',') +
								'&delivery=' +
								delivery +
								'&shop_supplier_id=' +
								self.shop_supplier_id +
								'&cart_type=1' +
								'&dinner_type=30&table_id=' +
								self.table_id
						});
					}
				);
			},
			submitOrder(arrIds) {
				let self = this;
				let params = {
					delivery: self.orderType == 'takeout' ? 30 : 40,
					coupon_id: 0,
					is_use_points: 0,
					linkman: '',
					phone: '',
					remark: '',
					mealtime: '',
					meal_num: self.num,
					cart_ids: arrIds.join(',') || 0,
					dinner_type: self.dinner_type,
					shop_supplier_id: self.shop_supplier_id || 0,
					order_type: 1,
					table_id: self.table_id
				};
				self._post(
					'order.order/tableBuy',
					params,
					function(res) {
						self.order_id = res.data.order_id;
						self.gotoPage('/pages/order/store_order?order_id=' + self.order_id + '&pnum=' + self.num);
					},
					function(err) {
						self.init();
					}
				);
			},
			/* 加餐 */
			addpay() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				if (self.table_id != 0) {
					self.tableAddPay();
				} else {
					self.addpayFunc();
				}
			},
			/* 快餐模式加餐 */
			addpayFunc() {
				let self = this;
				self._get(
					'order.cart/lists', {
						shop_supplier_id: self.shop_supplier_id,
						cart_type: 1,
						delivery: self.orderType == 'takeout' ? 30 : 40
					},
					function(res) {
						self.cart_total_num = res.data.cartInfo.cart_total_num;
						self.total_price = res.data.cartInfo.total_price;
						self.cart_list = res.data.productList;
						let arrIds = [];
						self.cart_list.forEach(item => {
							arrIds.push(item.cart_id);
						});
						if (arrIds.length == 0) {
							uni.showToast({
								title: '请选择商品',
								icon: 'none'
							});
							return false;
						}
						uni.hideLoading();
						let url =
							'/pages/order/addorder?order_type=cart&cart_ids=' +
							arrIds.join(',') +
							'&delivery=40&shop_supplier_id=' +
							self.shop_supplier_id +
							'&cart_type=1' +
							'&dinner_type=30&table_id=' +
							self.table_id +
							'&order_id=' +
							self.addorder_id;
						self.gotoPage(url);
					}
				);
			},
			/* 堂食模式加餐 */
			tableAddPay() {
				let self = this;
				self._get(
					'order.HallCart/lists', {
						shop_supplier_id: self.shop_supplier_id,
						table_id: self.table_id,
						cart_type: 1,
						delivery: self.orderType == 'takeout' ? 30 : 40
					},
					function(res) {
						self.cart_total_num = res.data.cartInfo.cart_total_num;
						self.total_price = res.data.cartInfo.total_price;
						self.cart_list = res.data.productList;
						let arrIds = [];
						self.cart_list.forEach(item => {
							arrIds.push(item.cart_id);
						});
						if (arrIds.length == 0) {
							uni.showToast({
								title: '请选择商品',
								icon: 'none'
							});
							return false;
						}
						uni.hideLoading();
						self.tableAddOrder(arrIds);
					}
				);
			},
			/* 堂食模式加餐 */
			tableAddOrder(arrIds) {
				let self = this;
				let params = {
					delivery: self.orderType == 'takeout' ? 30 : 40,
					coupon_id: 0,
					is_use_points: 0,
					linkman: '',
					phone: '',
					remark: '',
					mealtime: '',
					meal_num: self.num,
					cart_ids: arrIds.join(',') || 0,
					dinner_type: self.dinner_type,
					shop_supplier_id: self.shop_supplier_id || 0,
					order_type: 1,
					table_id: self.table_id,
					order_id: self.order_id
				};
				self._post(
					'order.order/tableAddMeal',
					params,
					function(res) {
						self.order_id = res.data.order_id;
						self.gotoPage('/pages/order/store_order?order_id=' + self.order_id + '&pnum=' + self.num);
					},
					function(err) {
						self.init();
					}
				);
			},
			gotoDetail(e) {
				let self = this;
				let delivery = self.orderType == 'takeout' ? 30 : 40;
				/* 快餐模式加餐 */
				let url =
					'/pages/product/detail/detail?product_id=' +
					e.product_id +
					'&delivery=' +
					delivery +
					'&bag_type=' +
					this.bag_type +
					'&dinner_type=' +
					this.dinner_type +
					'&cart_type=' +
					this.cart_type;
				/* 堂食模式加餐 */
				if (self.table_id != 0) {
					url = url + '&table_id=' + this.table_id;
				}
				uni.navigateTo({
					url: url
				});
			},
			//点击菜单项事件
			handleMenuTap(id) {
				if (!this.sizeCalcState) {
					this.calcSize();
				}
				this.currentCateId = id;
				this.$nextTick(() => (this.cateScrollTop = this.goods_list.find(item => item.category_id == id).top));
			},
			//商品列表滚动事件
			handleGoodsScroll({
				detail
			}) {
				if (!this.sizeCalcState) {
					this.calcSize();
				}
				const {
					scrollTop
				} = detail;
				let tabs = this.goods_list.filter(item => item.top <= scrollTop).reverse();
				if (tabs.length > 0) {
					this.currentCateId = tabs[0].category_id;
				}
			},
			calcSize() {
				let h = 10;
				this.goods_list.forEach(item => {
					let view = uni.createSelectorQuery().select(`#cate-${item.category_id}`);
					view.fields({
							size: true
						},
						data => {
							item.top = h;
							if (data != null) {
								h += data.height;
							}
							item.bottom = h;
						}
					).exec();
				});
				this.sizeCalcState = true;
			},
			//打开商品详情模态框
			showGoodDetailModal() {
				this.detail.sku.forEach((item, index) => {
					item.checked = false;
				});
				let obj = {
					specData: this.detail.sku,
					detail: this.detail,
					shop_supplier_id: this.shop_supplier_id,
					productSpecArr: this.specData != null ? new Array(this.specData.spec_attr.length) : [],
					show_sku: {
						sku_image: '',
						seckill_price: 0,
						attr: [],
						product_sku_id: [],
						feed: [],
						line_price: 0,
						seckill_stock: 0,
						seckill_product_sku_id: 0,
						sum: 1
					}
				};
				this.productModel = obj;
				this.goodDetailModalVisible = true;
			},
			//关闭商品详情模态框
			closeGoodDetailModal(num, res) {
				this.goodDetailModalVisible = false;
				this.clock = false;
				if (num) {
					this.$set(this.good, 'cart_num', this.good.cart_num ? this.good.cart_num + num : num);
					this.reCart(res);
				}
				this.category = {};
				this.good = {};
			},
			//打开/关闭购物车列表popup
			openCartPopup() {
				this.getCart();
				this.cartPopupVisible = !this.cartPopupVisible;
			},
			time_to_sec(time) {
				if (time !== null) {
					var s = '';
					var hour = time.split(':')[0];
					var min = time.split(':')[1];
					s = Number(hour * 3600) + Number(min * 60);
					return s;
				}
			}
		}
	};
</script>

<style lang="scss">
	@import './menu.scss';

	.top-status {
		padding: 0 26rpx;
		height: 104rpx;
		line-height: 104rpx;
		font-size: 28rpx;
		border-bottom: 1rpx solid;
		@include border_color('border_color');
		@include background_color('opacify_background_0');
	}

	.pop-order {
		position: fixed;
		right: 0rpx;
		bottom: 70vh;
		z-index: 8;
		width: 140rpx;
		height: 60rpx;
		word-break: break-all;
		border-top-left-radius: 30rpx;
		border-bottom-left-radius: 30rpx;
		font-size: 26rpx;
		line-height: 60rpx;
		text-align: center;
		@include font_color('text_color');
		@include background_color('background_color');
	}
</style>