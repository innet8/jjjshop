<template>
	<view class="pr layout" :data-theme='theme()' :class="theme() || ''">
		<image class="bg-1" src="/static/images/welcome1.jpg" mode="widthFix"></image>
		<image class="bg-2" src="/static/images/welcome2.jpg" mode="widthFix"></image>
		<view class="pr">
			<image class="login-log" :src="detail.logo || ''" mode=""></image>
			<view class="f36 gray3 mb40 tc">{{store_name}}({{detail.name}}）</view>
			<view class="dominant tc f36">{{table_no}}桌</view>
		</view>
		<view class="tc gray6 f28 p20">请选择就餐人数</view>
		<view class="table-num-list pr">
			<view class="table-num" @click="num = index + 1" :class="{active: num == index + 1 }" v-for="(item,index) in 12"
				:key="index">{{index + 1}}</view>
		</view>
		<button class="sub-btn theme-btn pr"
			@click="gotoPage('/pages/product/list/store?table_id='+table_id+'&shop_supplier_id='+shop_supplier_id+'&num='+num)">开始点餐</button>
	</view>
</template>

<script>
	import utils from '@/common/utils.js';
	export default {
		data() {
			return {
				num: 1,
				table_id: 0,
				shop_supplier_id: 0,
				detail:{
					name:'',
					logo:''
				},
				store_name:'',
				table_no:''
			}
		},
		onLoad(e) {
			let scene = utils.getSceneData(e);
			this.shop_supplier_id = uni.getStorageSync('selectedId') || 0;
			this.table_id = e.table_id ? e.table_id : scene.tid;
			this.shop_supplier_id = e.shop_supplier_id ? e.shop_supplier_id : scene.sid;
		},
		onShow() {
			this.getData();
		},
		methods: {
			getData() {
				let self = this;
				self._get('order.HallCart/tableDetail', {
					table_id: self.table_id,
					shop_supplier_id: self.shop_supplier_id
				}, (res) => {
					self.detail = res.data.supplier;
					self.store_name = res.data.store_name;
					self.table_no = res.data.detail.table_no;
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fafafa;
	}

	.layout {
		min-height: 100vh;
		overflow: hidden;
	}

	.login-log {
		width: 112rpx;
		height: 112rpx;
		border-radius: 50%;
		margin: 0 auto;
		margin-top: 80rpx;
		margin-bottom: 30rpx;
	}

	.table-num-list {
		margin-top: 35rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		padding: 0 73rpx;
	}

	.table-num {
		width: 128rpx;
		height: 94rpx;
		border: 1rpx solid #EEEEEE;
		box-sizing: border-box;
		font-size: 32rpx;
		color: #666666;
		line-height: 94rpx;
		text-align: center;
		margin-right: 30rpx;
		margin-bottom: 24rpx;
		background-color: #ffffff;
	}

	.table-num.active {
		border: 1rpx solid;
		@include background_color('opacify_background_0');
		@include border_color('border_color');
	}

	.table-num:nth-child(4n) {
		margin-right: 0;
	}

	.sub-btn {
		width: 565rpx;
		height: 92rpx;
		line-height: 92rpx;
		color: #ffffff;
		border-radius: 46rpx;
		margin: 0 auto;
		margin-top: 112rpx;
	}

	.bg-1 {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.bg-2 {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 0;
	}
</style>
