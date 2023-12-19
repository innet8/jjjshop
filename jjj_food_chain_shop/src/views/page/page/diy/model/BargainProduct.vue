<template>
	<!--
    	作者：luoxiang
    	时间：2023-09-27
    	描述：diy组件-模拟显示-砍价
    -->
	<div
		class="drag optional "
		:style="{
			background: item.style.bgcolor,
			paddingLeft: item.style.paddingLeft + 'px',
			paddingRight: item.style.paddingLeft + 'px',
			paddingTop: item.style.paddingTop + 'px',
			paddingBottom: item.style.paddingBottom + 'px'
		}"
		:class="{ selected: index === selectedIndex }"
		@click.stop="$parent.$parent.onEditer(index)"
	>
		<div
			class="diy-sharpproduct"
			:style="{
				background: item.style.background,
				borderTopLeftRadius: item.style.topRadio + 'px',
				borderTopRightRadius: item.style.topRadio + 'px',
				borderBottomLeftRadius: item.style.bottomRadio + 'px',
				borderBottomRightRadius: item.style.bottomRadio + 'px'
			}"
		>
			<div
				class="sharpproduct-head d-b-c"
				:style="{
					backgroundImage: item.style.bgimage ? 'url(' + item.style.bgimage + ')' : ''
				}"
			>
				<div class="left d-s-c">
					<div
						v-if="item.style.titleType == 1"
						:style="{
							color: item.style.titleColor,
							fontSize: item.style.titleSize + 'px'
						}"
						class="name"
					>
						{{ item.params.title }}
					</div>
					<img v-if="item.style.titleType == 2" class="titleImg" :src="item.style.title_image" alt="" />
				</div>
				<div
					class="right white d-c-c"
					style="line-height: 1;"
					:style="{
						color: item.style.moreColor,
						fontSize: item.style.moreSize + 'px'
					}"
				>
					{{ item.params.more }}
					<el-icon size="14px"><ArrowRight /></el-icon>
				</div>
			</div>
			<ul class="product-list column__3" :style="getUlwidth(item)">
				<li
					class="product-item"
					:style="{
						background: item.style.productBg_color,
						borderBottomLeftRadius: item.style.product_bottomRadio + 'px',
						borderBottomRightRadius: item.style.product_bottomRadio + 'px',
						borderTopLeftRadius: item.style.product_topRadio + 'px',
						borderTopRightRadius: item.style.product_topRadio + 'px'
					}"
					v-for="(product, index) in item.data"
					:key="index"
				>
					<!-- 两列三列 -->
					<div class="product-cover pr">
						<img :style="{ borderRadius: item.style.product_imgRadio + 'px' }" v-img-url="product.image" />
						<div
							:style="{
								color: item.style.salesColor,
								background: item.style.bgSales
							}"
							v-if="item.style.product_sales == 1"
							class="product-sales"
						>
							已砍13人
						</div>
					</div>
					<div class="product-info p-0-10">
						<div class="price ww100 f12 tc">
							<div
								class="f12 tc text-ellipsis"
								v-if="item.style.product_name == 1"
								:style="{
									color: item.style.productName_color
								}"
							>
								商品名称
							</div>
							<div
								class="f14 tc"
								v-if="item.style.product_price == 1"
								:style="{
									color: item.style.productPrice_color
								}"
							>
								¥120
							</div>
							<div
								v-if="item.style.product_lineprice == 1"
								:style="{
									color: item.style.productLine_color
								}"
								class="f12 text-d-line"
							>
								¥233
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="btn-edit-del"><div class="btn-del" @click.stop="$parent.$parent.onDeleleItem(index)">删除</div></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			/*商品列表*/
			tableData: [],
			/*分类id*/
			category_id: 0
		};
	},
	created() {},
	props: ['item', 'index', 'selectedIndex'],
	methods: {
		/*计算宽度*/
		// getUlwidth(item) {
		// 	if (item.style.display == 'slide') {
		// 		let total = 0;
		// 		if (item.params.source == 'choice') {
		// 			total = item.data.length;
		// 		} else {
		// 			total = item.defaultData.length;
		// 		}
		// 		let w = 0;
		// 		if (item.style.column == 2) {
		// 			w = total * 150;
		// 		} else {
		// 			w = total * 100;
		// 		}
		// 		return 'width:' + w + 'px;';
		// 	}
		// }
	}
};
</script>

<style lang="scss" scoped>
.diy-sharpproduct {
	overflow: hidden;
	// padding: 10px;
}

.diy-sharpproduct .product-list {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	padding-top: 11px;
	padding-left: 10px;
	box-shadow: 0px 4px 2px 0px rgba(6, 0, 1, 0.03);
	padding-bottom: 10px;
}

.diy-sharpproduct .display__list .column__3 {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 10px;
}

.diy-sharpproduct .product-list.column__3 .product-item {
	width: 99px;
	margin-right: 19px;
	padding-bottom: 5px;
	overflow: hidden;
}
.diy-sharpproduct .product-list.column__3 .product-item:last-child {
	margin-right: 0;
}
.diy-sharpproduct .product-list.column__3 .product-item .product-cover {
	width: 99px;
	height: 99px;
	position: relative;
	overflow: hidden;
	margin-bottom: 6px;
}

.diy-sharpproduct .product-list.column__3 .product-item .product-cover img {
	width: 99px;
	height: 99px;
}
.diy-sharpproduct .sharpproduct-head {
	height: 44px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	margin: 0;
	padding: 0 10px;
	background-repeat: no-repeat;
	background-size: cover;
	line-height: 1;
}

.sharpproduct-head .name {
	font-size: 18px;
	font-weight: bold;
	width: 100px;
}

.sharpproduct-head .datetime {
	margin-left: 20px;
}

.sharpproduct-head .datetime > span {
	display: inline-block;
}

.sharpproduct-head .datetime .text {
	padding: 0 2px;
}

.diy-sharpproduct .product-list .barginbtns {
	width: 100px;
	background: linear-gradient(90deg, #ff4545 0%, #f6220c 100%);
	height: 25px;
	line-height: 25px;
	font-size: 13px;
	text-align: center;
	color: #ffffff;
	margin: 0 auto;
	border-radius: 13px;
}

.left .datetime {
	padding: 1px;
	border-radius: 200px 0 200px 200px;
	border: 1px solid #eeeeee;
	padding-right: 4px;
}

.left .datetime .daybox {
	padding: 0 10px;
	border-radius: 200px;
	margin-right: 5px;
}
.titleImg {
	width: auto;
	height: 44px;
}
.product-info {
	height: auto;
}
.product-sales {
	font-size: 12px;
	text-align: center;
	width: 81px;
	line-height: 1.2;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
}
</style>
