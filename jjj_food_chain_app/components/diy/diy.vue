<template>
	<view>
		<block v-for="(item,index) in diyItems" :key="index">
			<!--轮播图-->
			<template v-if="item.type==='banner'&&item.data!=null">
				<banner :itemData="item" ref="bannerRef"></banner>
			</template>

			<!--单组图-->
			<template v-if="item.type==='imageSingle'&&item.data!=null">
				<imagesingle :itemData="item"></imagesingle>
			</template>

			<!-- 橱窗-->
			<template v-if="item.type == 'window'&&item.data!=null">
				<windows :itemData="item"></windows>
			</template>

			<!-- 视频组-->
			<template v-if="item.type == 'video'">
				<videos :itemData="item"></videos>
			</template>

			<!--文章-->
			<template v-if="item.type == 'article'&&item.data!=null">
				<articles :itemData="item"></articles>
			</template>

			<!--头条快报-->
			<template v-if="item.type == 'special'&&item.data!=null">
				<special :itemData="item"></special>
			</template>

			<!--公告组-->
			<template v-if="item.type == 'notice'">
				<notice :itemData="item"></notice>
			</template>

			<!--导航组-->
			<template v-if="item.type==='navBar'&&item.data!=null">
				<navBar :itemData="item" @scanQrcode="scanQrcode"></navBar>
			</template>

			<!--优惠券-->
			<template v-if="item.type==='coupon'&&item.data!=null">
				<coupon :itemData="item"></coupon>
			</template>

			<!--门店-->
			<template v-if="item.type == 'store'&&item.data!=null">
				<store :itemData="item"></store>
			</template>

			<!--客服-->
			<template v-if="item.type == 'service'">
				<service :itemData="item"></service>
			</template>

			<!--富文本-->
			<template v-if="item.type==='richText'">
				<richText :itemData="item"></richText>
			</template>

			<!--辅助空白-->
			<template v-if="item.type == 'blank'">
				<blank :itemData="item"></blank>
			</template>

			<!--辅助线-->
			<template v-if="item.type == 'guide'">
				<guide :itemData="item"></guide>
			</template>
			<!--标题组-->
			<template v-if="item.type == 'title'">
				<titles :itemData="item"></titles>
			</template>
			<!--图文导航-->
			<template v-if="item.type == 'imageNav'&&item.data!=null">
				<imageNavIndex :itemData="item"></imageNavIndex>
			</template>

			<!--广告导航-->
			<template v-if="item.type == 'adNav'&&item.data!=null">
				<adNav :itemData="item"></adNav>
			</template>
			<!--直播-->
			<template v-if="item.type == 'live'&&item.data!=null">
				<live :itemData="item"></live>
			</template>
			<!-- #ifdef MP-WEIXIN -->
			<!--微信直播-->
			<template v-if="item.type == 'wxlive'&&item.data!=null">
				<wxlive :itemData="item"></wxlive>
			</template>
			<!-- #endif -->
			<!--团购-->
			<template v-if="item.type == 'group'&&item.data!=null">
				<group :itemData="item"></group>
			</template>
			<!--视频直播-->
			<template v-if="item.type == 'videoLive'">
				<shipinLiveIndex :itemData="item" ref="shipinLiveRef"></shipinLiveIndex>
			</template>
		</block>
		
	</view>
</template>

<script>
	import banner from './banner/banner';
	import imagesingle from './imagesingle/imagesingle';
	import windows from './window/window';
	import titles from './title/title.vue';
	import videos from './videos/videos';
	import articles from './article/article';
	import special from './special/special';
	import notice from './notice/notice';
	import coupon from './coupon/coupon';
	import richText from './richText/richText';
	import navBar from './navBar/navBar';
	import store from './store/store';
	import service from './service/service';
	import blank from './blank/blank';
	import guide from './guide/guide';
	import productindex from './product/product';
	import imageNavIndex from './imageNav/imageNav';
	import adNav from './adNav/adNav';
	import live from './live/live';
	import wxlive from './wxlive/wxlive';
	import group from './group/group';
	import shipinLiveIndex from './shipinLive/shipinLive.vue';
	export default {
		components: {
			banner,
			imagesingle,
			windows,
			videos,
			articles,
			special,
			notice,
			coupon,
			richText,
			navBar,
			titles,
			store,
			service,
			blank,
			guide,
			productindex,
			imageNavIndex,
			adNav,
			live,
			wxlive,
			group,
			shipinLiveIndex,
		},
		data() {
			return {

			}
		},
		props: ['diyItems'],
		created() {},
		methods: {
			scanQrcode() {
				this.$emit('scanQrcode')
			},
			getUserInfo(){
				this.$nextTick(()=>{
					if(this.$refs.bannerRef){
						this.$refs.bannerRef[0].getUserInfo();
					}
				})
			},
		}
	}
</script>

<style>
</style>
