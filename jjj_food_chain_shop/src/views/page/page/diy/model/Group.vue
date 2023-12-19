<template>
	<div
		class="drag optional"
		:class="{ selected: index === selectedIndex }"
		:style="{
			background: item.style.bgcolor,
			paddingLeft: item.style.paddingLeft + 'px',
			paddingRight: item.style.paddingLeft + 'px',
			paddingTop: item.style.paddingTop + 'px',
			paddingBottom: item.style.paddingBottom + 'px'
		}"
		@click.stop="$parent.$parent.onEditer(index)"
		v-if="item.style"
	>
		<div
			class="diy-sharpproduct"
			:style="{
				borderTopLeftRadius: item.style.topRadio + 'px',
				borderTopRightRadius: item.style.topRadio + 'px',
				borderBottomLeftRadius: item.style.bottomRadio + 'px',
				borderBottomRightRadius: item.style.bottomRadio + 'px',
				background: item.style.background
			}"
		>
			<ul class="product-list assemble column__3 d-s-c">
				<li
					:style="{
						borderTopLeftRadius: item.style.product_topRadio + 'px',
						borderTopRightRadius: item.style.product_topRadio + 'px',
						borderBottomLeftRadius: item.style.product_bottomRadio + 'px',
						borderBottomRightRadius: item.style.product_bottomRadio + 'px',
						background: item.style.productBg
					}"
					class="product-item"
					v-for="(product, index) in item.defaultData"
					:key="index"
				>
					<div
						class="product-cover"
						:style="{
							borderRadius: item.style.product_imgRadio + 'px'
						}"
					>
						<img :src="product.image" />
					</div>
					<div class="">
						<div class="f14 fb text-ellipsis" :style="{ color: item.style.productNameColor }" v-if="item.params.productName">{{ product.group_name }}</div>
						<div :style="{ color: item.style.productRemarksColor }" v-if="item.params.productRemarks">
							<span class="product-title  tc">{{ product.describe }}</span>
						</div>
						<div class="sharpproduct-head d-b-c">
							<div>
								<div class="price" v-if="item.params.producPrice || item.params.productDiscount">
									<span :style="{ color: item.style.productPriceColor }" v-if="item.params.producPrice">¥{{ product.group_price }}</span>
									<span
										class="discount"
										:style="{ color: item.style.productTipsColor, borderColor: item.style.productTipsColor }"
										v-if="item.params.productDiscount"
									>
										{{ product.discount }}
									</span>
								</div>
								<div class="lineprice1 text-d-line" :style="{ color: item.style.productLineColor }" v-if="item.params.productLine">￥{{ product.line_price }}</div>
							</div>
							<div class="d-e-c d-c">
								<div
									:style="{
										borderRadius: item.style.product_btnRadio + 'px',
										background: item.style.btnBg,
										color: item.style.btnColor
									}"
									v-if="item.params.productBtn"
									class="assemble_btns  tc right"
								>
									抢购
								</div>
								<div :style="{ color: item.style.productSalesColor }" v-if="item.params.productSales" class="lineprice">季售{{ product.group_sales }}+</div>
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
		getUlwidth(item) {
			if (item.style.display == 'slide') {
				let total = 0;
				if (item.params.source == 'choice') {
					total = item.data.length;
				} else {
					total = item.defaultData.length;
				}
				let w = 0;
				if (item.style.column == 2) {
					w = total * 150;
				} else {
					w = total * 100;
				}
				return 'width:' + w + 'px;';
			}
		}
	}
};
</script>

<style scoped lang="scss">
.lineprice1 {
	color: #999999;
	font-size: 12px;
}
.discount {
	color: red;
	border: 1px solid #ffffff;
	padding: 2px 6px;
	font-size: 11px;
	margin-left: 6px;
}
.diy-sharpproduct {
	box-sizing: border-box;
	overflow: hidden;
}
.lineprice {
	color: #999999;
	font-size: 10px;
	white-space: nowrap;
	padding-top: 5px;
}
.diy-sharpproduct .product-list.assemble {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 0 10px;
}

.diy-sharpproduct .product-list.assemble .product-title {
	margin-bottom: 18px;
}

.diy-sharpproduct .product-list.assemble .price {
	margin-bottom: 5px;
	font-size: 13px;
	overflow: hidden;
}

.diy-sharpproduct .display__list .column__3 {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.diy-sharpproduct .product-list.assemble.column__3 {
	flex-wrap: wrap;
}

.diy-sharpproduct .product-list.assemble.column__3 .product-item {
	width: 161px;
	overflow: hidden;
	background-color: #ffffff;
	flex-shrink: 0;
	box-sizing: border-box;
}
.diy-sharpproduct .product-list.assemble.column__3 .product-item .product-cover {
	overflow: hidden;
}
.diy-sharpproduct .product-list.assemble.column__3 .product-item .product-cover img {
	width: 160px;
	height: 81px;
	overflow: hidden;
	position: relative;
}

.diy-sharpproduct .product-list.assemble.column__3 .product-title {
	margin-bottom: 0;
	margin-top: 0;
	font-size: 10px;
	margin-right: 90px;
	white-space: nowrap;
}

.sharpproduct-head {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.sharpproduct-head .name {
	font-size: 16px;
	font-weight: bold;
	padding-left: 10px;
	color: #000000;
	width: 100px;
}
.sharpproduct-head .name2 {
	padding-right: 10px;
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

.sharpproduct-head .datetime .box {
	padding: 2px;
	background: #000000;
	color: #ffffff;
}

.diy-sharpproduct .product-list.assemble .assemble_btns {
	font-size: 10px;
	text-align: center;
	width: 54px;
	height: 24px;
	line-height: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 20px;
	background-color: #ffcc00;
}
.titleImg {
	width: 100%;
	height: 44px;
}
</style>
