<template>
	<view class="pay-wrap" v-if="!loading">
		<view v-html='content'></view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				order_id: 0,
				order_type: '',
				pay_source: '',
				content: '',
				/*加载中*/
				loading: true,
				intervalId: null
			}
		},
		onLoad(e) {
			this.order_id = e.order_id;
			this.order_type = e.order_type;
			if(e.platform){
				this.pay_source = 'payAppH5';
			}else{
				this.pay_source = 'payH5';
			}
			uni.showLoading({
				title: '加载中'
			});
			/*获取数据*/
			this.getData();
		},
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				console.log('self.pay_source='+self.pay_source);
				self._post('user.userweb/alipayH5', {
					order_id: self.order_id,
					order_type: self.order_type,
					pay_source: self.pay_source
				}, function(res) {
					uni.hideLoading();
					self.loading = false;
					self.content = res.data.payment;
					self.intervalId = setInterval(function(){
						if(document.forms['alipaysubmit']){
							clearInterval(self.intervalId);
							document.forms['alipaysubmit'].submit();
						}
					},500);
				});
			}

		}
	}
</script>

<style>
	.product-pay-list {
		text-align: left;
	}

	.product-pay-list .pic {
		width: 120rpx;
		height: 120rpx;
	}

	.product-name {
		font-size: 30rpx;
	}

	.top-container {
		padding: 100rpx 0;
		text-align: center;
		background: #eeeeee;
		color: #333333;
	}

	.top-container .pay-title {
		font-size: 40rpx;
		font-weight: bold;
	}

	.pay-wrap .pay {
		display: block;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		text-align: center;
		border-radius: 8rpx;
		color: #FFFFFF;
		background: #04be01;
	}
</style>
