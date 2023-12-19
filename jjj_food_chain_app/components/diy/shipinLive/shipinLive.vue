<template>
  <view class="shipin-live drag optional drag__nomove" v-if="isLive == 2 || isLive == 3"
  :style="{ right: itemData.style.right + '%', bottom: itemData.style.bottom + '%', opacity: itemData.style.opacity / 100 }">
    <view class="shipin-wrap"  @click="gotoShiPinLive(itemData.params.finderUserName)">
      <image :src="itemData.params.image" class="img" mode="widthFix"></image>
      <view class="txt">{{ isLive == 2 ? '直播中' : isLive == 3 ? '已结束' :  '未开始' }}</view>
    </view>
    <!-- <button class="service-icon"  @click="gotoShiPinLive(itemData.params.finderUserName)">
      <image :src="itemData.params.image" mode="aspectFill"></image>
    </button> -->
  </view>
</template>

<script>
	export default {
		data() {
			return {
        nowTime:'', //当前时间
        liveList:[], //直播数据
        isLive:'',  //直播状态
      };
		},
		props: ['itemData'],
    mounted() {
      this.getData();
    },
		methods: {
      getData(){
        // #ifdef  MP-WEIXIN
        let self = this;
        let finderUserName = this.$props.itemData && this.$props.itemData.params.finderUserName;
        wx.getChannelsLiveInfo({
              //视频号ID,在登录视频号中获取
              finderUserName: finderUserName,
              success: res => {
                if (res.errMsg === "getChannelsLiveInfo:ok") {
                  console.log("getChannelsLiveInfo成功",res);
                  self.isLive = res.status;
                }
              },
              fail: res => {
                console.log("getChannelsLiveInfo失败",res)
              }
            })
        // #endif
      },
      gotoShiPinLive(finderUserName){
        // #ifdef  MP-WEIXIN
        if(finderUserName){
          // 视频号直播
          wx.getChannelsLiveInfo({
            //视频号ID,在登录视频号中获取
            finderUserName: finderUserName,
            success: res => {
              if (res.errMsg === "getChannelsLiveInfo:ok") {
                console.log("getChannelsLiveInfo成功",res);
                if(res.status == 2 || res.status == 3){
                  res.finderUserName = finderUserName;
                  this.zhibo(res);
                }
                // 返回内容
                // feedId:直播 feedId
                // nonceId:直播 nonceId
                // description:直播主题
                // status:直播状态，2直播中，3直播结束
                // headUrl:直播封面
                // nickname:视频号昵称
              }
            },
            fail: res => {
              console.log("getChannelsLiveInfo失败",res)
            }
          })
        }
        // #endif
			},
      zhibo(res){
        wx.openChannelsLive({
          finderUserName: res.finderUserName,
          feedId: res.feedId,
          nonceId: res.nonceId,
          success: res => {
            console.log("openChannelsLive成功",res);
          },
          fail: res => {
            console.log("openChannelsLive失败",res);
          }
        })
      },
		}
	};
</script>

<style lang="scss" scoped>
  .shipin-wrap{
    padding: 20rpx 18rpx;
    background: rgba(255,255,255,0.8);
    border: 1px solid #E2E2E2;
    border-radius: 20rpx;
    .img{
      width: 90rpx;
      // height: 90rpx;
    }
    .txt{
      margin-top: 20rpx;
      font-size: 24rpx;
      font-weight: bold;
      color: #1F1F1F;
      text-align: center;
    }
  }
	.shipin-live {
		position: fixed;
		width: 120rpx;
		// height: 1020rpx;
		z-index: 100;
		right: 0;
		bottom: 0;
	}
</style>
