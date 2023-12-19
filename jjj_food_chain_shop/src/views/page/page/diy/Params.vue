<template>
	<!--
    	作者：luoyiming
    	时间：2020-06-20
    	描述：diy组件-参数设置
    -->
	<div id="diy-editor" ref="diy-editor" class="diy-editor form-horizontal">
		<template v-if="form.curItem">
			<!--顶部设置-->
			<template v-if="form.curItem.type == 'page'">
				<SetpagesIndex :curItem="form.curItem"></SetpagesIndex>
			</template>
			<!--图片轮播-->
			<template v-if="form.curItem.type == 'banner'">
				<Banner :curItem="form.curItem" :selectedIndex="form.selectedIndex"></Banner>
			</template>
			<!--图片-->
			<template v-if="form.curItem.type == 'imageSingle'">
				<ImageSingle :curItem="form.curItem" :selectedIndex="form.selectedIndex"></ImageSingle>
			</template>
			<!--图片橱窗-->
			<template v-if="form.curItem.type == 'window'">
				<Window :curItem="form.curItem" :selectedIndex="form.selectedIndex"></Window>
			</template>
			<!--标题-->
			<template v-if="form.curItem.type == 'title'">
				<Title :curItem="form.curItem" :selectedIndex="form.selectedIndex"></Title>
			</template>
			<!--视频组件-->
			<template v-if="form.curItem.type == 'video'">
				<Video :curItem="form.curItem" :selectedIndex="form.selectedIndex"></Video>
			</template>
			<!--文章组件-->
			<template v-if="form.curItem.type == 'article'">
				<Articleindex :curItem="form.curItem" :selectedIndex="form.selectedIndex"></Articleindex>
			</template>
			<!--头条快报-->
			<template v-if="form.curItem.type == 'special'">
				<Special :curItem="form.curItem" :selectedIndex="form.selectedIndex"></Special>
			</template>
			<!--公告组-->
			<template v-if="form.curItem.type == 'notice'">
				<Notice :curItem="form.curItem" :selectedIndex="form.selectedIndex"></Notice>
			</template>
			<!--导航组-->
			<template v-if="form.curItem.type == 'navBar'">
				<NavBar :curItem="form.curItem" :selectedIndex="form.selectedIndex"></NavBar>
			</template>
			<!--图文导航-->
			<!-- <template v-if="form.curItem.type == 'navBar'">
        <ImageNav :curItem="form.curItem" :selectedIndex="form.selectedIndex"></ImageNav>
      </template> -->
			<!--商品组-->
		<!-- 	<template v-if="form.curItem.type == 'product'">
				<Productindex :curItem="form.curItem" :selectedIndex="form.selectedIndex"></Productindex>
			</template> -->
			<!--优惠券-->
			<template v-if="form.curItem.type == 'coupon'">
				<Coupon :curItem="form.curItem" :selectedIndex="form.selectedIndex"></Coupon>
			</template>
			<!--门店-->
			<template v-if="form.curItem.type == 'store'">
				<Store :curItem="form.curItem" :selectedIndex="form.selectedIndex"></Store>
			</template>
			<!--客服-->
			<template v-if="form.curItem.type == 'service'">
				<Service :curItem="form.curItem" :selectedIndex="form.selectedIndex"></Service>
			</template>
			<!--视频号直播-->
			<template v-if="form.curItem.type == 'videoLive'">
				<ShipinLive :curItem="form.curItem" :selectedIndex="form.selectedIndex"></ShipinLive>
			</template>
			<!--富文本-->
			<template v-if="form.curItem.type == 'richText'">
				<RichText :curItem="form.curItem" :selectedIndex="form.selectedIndex"></RichText>
			</template>
			<!--辅助空白-->
			<template v-if="form.curItem.type == 'blank'">
				<Blank :curItem="form.curItem" :selectedIndex="form.selectedIndex"></Blank>
			</template>
			<!--辅助线-->
			<template v-if="form.curItem.type == 'guide'">
				<Guide :curItem="form.curItem" :selectedIndex="form.selectedIndex"></Guide>
			</template>
			<!--图文导航-->
			<template v-if="form.curItem.type == 'imageNav'"> 
				<ImageNav :curItem="form.curItem" :selectedIndex="form.selectedIndex"></ImageNav>
			</template>
			<!--广告导航-->
			<template v-if="form.curItem.type == 'adNav'">
				<adNav :curItem="form.curItem" :selectedIndex="form.selectedIndex"></adNav>
			</template>
			<!--砍价-->
			<template v-if="form.curItem.type == 'bargainProduct'">
				<BargainProduct :curItem="form.curItem" :selectedIndex="form.selectedIndex"></BargainProduct>
			</template>
			<!--微信直播-->
			<template v-if="form.curItem.type == 'wxlive'">
				<Wxlive :curItem="form.curItem" :selectedIndex="form.selectedIndex"></Wxlive>
			</template>
			<!-- 团购组 -->
			<template v-if="form.curItem.type == 'group'">
				<Groupindex :curItem="form.curItem" :selectedIndex="form.selectedIndex"></Groupindex>
			</template>
		</template>

		<!--上传图片-->
		<Upload v-if="isupload" :isupload="isupload" :config="{ total: 3 }" @returnImgs="returnImgsFunc"></Upload>

		<!--选择商品-->
		<ProductSelect :isproduct="isproduct" :excludeIds="excludeIds" :islist="islist" @closeDialog="closeProductDialogFunc($event)">产品列表弹出层</ProductSelect>

		<!--选择门店-->
		<StoreSelect :isstore="isstore" :islist="isstorelist"></StoreSelect>
	</div>
</template>

<script>
import { deepClone } from '@/utils/base.js';
import SetpagesIndex from './params/Setpages.vue';
import Banner from './params/Banner.vue';
import ImageSingle from './params/ImageSingle.vue';
import Window from './params/Window.vue';
import Video from './params/Video.vue';
import Articleindex from './params/Article.vue';
import Special from './params/Special.vue';
import ShipinLive from './params/ShipinLive.vue';
import Notice from './params/Notice.vue';
import NavBar from './params/NavBar.vue';
import ImageNav from './params/Imagenav.vue';
import Productindex from './params/Product.vue';
import Coupon from './params/Coupon.vue';
import Store from './params/Store.vue';
import Service from './params/Service.vue';
import RichText from './params/RichText.vue';
import Blank from './params/Blank.vue';
import Guide from './params/Guide.vue';
import adNav from './params/adNav.vue';
import BargainProduct from './params/BargainProduct.vue';
import Wxlive from './params/Wxlive.vue';
import Groupindex from './params/Group.vue';
import Title from './params/Title.vue';
import Upload from '@/components/file/Upload.vue';
import ProductSelect from '@/components/product/Product.vue';
import StoreSelect from '@/components/store/StoreSelect.vue';

export default {
	components: {
		/*顶部设置*/
		SetpagesIndex,
		/*图片轮播组件*/
		Banner,
		/*图片组件*/
		ImageSingle,
		/*图片橱窗*/
		Window,
		/*视频*/
		Video,
		/*文章*/
		Articleindex,
		/*文章*/
		Special,
		/*公告组*/
		Notice,
		/*导航组*/
		NavBar,
		/*商品组*/
		Productindex,
		/*优惠券*/
		Coupon,
		/*门店*/
		Store,
		/*客服*/
		Service,
		/*富文本*/
		RichText,
		/*辅助空白*/
		Blank,
		/*辅助线*/
		Guide,
		/*秒杀*/
		ImageNav,
		/*拼团*/
		adNav,
		/*砍价*/
		BargainProduct,
		/*上传图片*/
		Upload,
		/*商品选择*/
		ProductSelect,
		/*门店选中*/
		StoreSelect,
		/*直播*/
		Wxlive,
		Groupindex,
		/*标题*/
		Title,
		ShipinLive
	},
	data() {
		return {
			/*是否上传图片*/
			isupload: false,
			/*图片当前对象*/
			imgModel: null,
			/*是否打开产品弹出层*/
			isproduct: false,
			/*商品需要去重的*/
			excludeIds: [],
			/*是否多选*/
			islist: false,
			/*是否显示门店选中*/
			isstore: false,
			/*门店是否多选*/
			isstorelist: false
		};
	},
	props: ['form', 'defaultData', 'diyData', 'opts'],
	created() {},
	methods: {
		/**
		 * 编辑器：添加data元素
		 */
		onEditorAddData: function() {
			let self = this;
			// 新增data数据
			console.log(self.defaultData);
			console.log(self.form.curItem.type);
			var newDataItem = deepClone(self.defaultData[self.form.curItem.type].data[0]);
			self.form.curItem.data.push(newDataItem);
		},
		/**
		 * 编辑器：重置颜色
		 * @param holder
		 * @param attribute
		 * @param color
		 */
		onEditorResetColor: function(holder, attribute, color) { 
			console.log("holder",holder,"attribute",attribute,"color",color)
			holder[attribute] = color;
			// holder[attribute].titleBackgroundColor = color;
		},
		/**
		 * 编辑器：删除data元素
		 * @param index
		 * @param selectedIndex
		 */
		onEditorDeleleData: function(index, selectedIndex) {
			let self = this;
			if (self.diyData.items[selectedIndex].data.length <= 1) {
				ElMessage({
					message: '至少保留一个',
					type: 'error'
				});
				return false;
			}
			self.diyData.items[selectedIndex].data.splice(index, 1);
		},
		/**
		 * 编辑器：选择图片
		 * @param source
		 * @param index
		 */
		onEditorSelectImage: function(index, imgUrl) {
			this.isupload = true;
			this.imgModel = {
				index: index,
				imgUrl: imgUrl
			};
		},

		/*上传图片*/
		returnImgsFunc(e) {
			if (e != null) {
				this.imgModel.index[this.imgModel.imgUrl] = e[0]['file_path'];
			}
			this.isupload = false;
		},

		/*商品选择列表弹出层*/
		openProduct(list, islist) {
			let arr = [];
			list.forEach(item => {
				arr.push(item.product_id);
			});
			this.excludeIds = arr;
			if (islist && typeof islist != 'undefined') {
				this.islist = true;
			} else {
				this.islist = false;
			}
			this.isproduct = true;
		},

		/*商品选择关闭弹窗*/
		closeProductDialogFunc(e) {
			if (this.form.curItem == null) {
				return;
			}
			this.isproduct = false;
			if (e.type == 'success') {
				if (this.islist) {
					this.form.curItem.data = this.form.curItem.data.concat(e.params);
				} else {
					this.form.curItem.data.push(e.params);
				}
			}
		},

		/*商品选择列表弹出层*/
		openStore(list, islist) {
			let arr = [];
			list.forEach(item => {
				arr.push(item.store_id);
			});
			this.excludeIds = arr;
			if (islist && typeof islist != 'undefined') {
				this.isstorelist = true;
			} else {
				this.isstorelist = false;
			}
			this.isstore = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.param-img-item {
	position: relative;
	padding: 10px;
	margin-bottom: 10px;
	border: 1px solid #eeeeee;
	line-height: 20px;
	width: 100%;
}
.param-img-item .pic {
	margin-bottom: 6px;
}
.param-img-item .delete-box {
	position: absolute;
	top: 10px;
	right: 10px;
	font-size: 20px;
	cursor: pointer;
	color: #cccccc;
}
.param-img-item .delete-box:hover {
	color: rgb(255, 51, 0);
}
.param-img-item .pic img {
	width: 200px;
	height: 100px;
	margin: 0 auto;
}
.param-img-item .icon img {
	width: 100px;
	height: 100px;
	margin: 0 auto;
}
.param-img-item .url-box {
	display: flex;
	justify-content: flex-start;
	line-height: 32px;
}
.param-img-item .url-box .key-name {
	display: block;
	width: 80px;
}
.param-img-item .url-box .el-input {
	flex: 1;
}
</style>
