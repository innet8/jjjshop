<template>
	<view class="qrcode">
		<image :src="qrcode_url" mode="widthFix"></image>
		<view class="btns-wrap">
			<!-- #ifdef MP || APP-PLUS -->
			<button class="btn-red" type="default" @click="savePosterImg">保存图片</button>
			<!-- #endif  -->
			<!-- #ifdef H5 -->
			<view class="f34 tc ww100" type="default">长按保存图片</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qrcode_url: ''
			}
		},
		mounted() {
			/*获取数据*/
			this.getData();
		},
		methods: {

			/*获取数据*/
			getData() {
				let self = this;
				uni.showLoading({
					title: '加载中',
				});
				let source = self.getPlatform();
				self._get('plus.agent.qrcode/poster', {
					source: source
				}, function(data) {
					uni.hideLoading();
					self.qrcode_url = data.data.qrcode;
				});
			},
			
			/*保存图片*/
			savePosterImg() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				// 下载海报图片
				uni.downloadFile({
					url: self.qrcode_url,
					success(res) {
						uni.hideLoading();
						// 图片保存到本地
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(data) {
								uni.showToast({
									title: '保存成功',
									icon: 'success',
									duration: 2000
								});
								// 关闭商品海报
								self.isCreatedImg = false;
							},
							fail(err) {
								console.log(err.errMsg);
								if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
									uni.showToast({
										title: '请允许访问相册后重试',
										icon: 'none',
										duration: 1000
									});
									setTimeout(() => {
										uni.openSetting();
									}, 1000);
								}
							},
							complete(res) {
								console.log('complete');
							}
						});
					}
				});
			}
		}
	}
</script>

<style>
	.qrcode{
		
	}
	.qrcode image {
		width: 100%;
	}
	.btns-wrap {
		position: fixed;
		height: 88rpx;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		z-index: 10;
	}
.btns-wrap .btn-red{
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 0;
	}
</style>
