<template>
	<!--
    	作者：luoyiming
    	时间：2020-06-20
    	描述：diy组件-模拟显示-微信直播
    -->
	<div
		:style="{
			background: item.style.bgcolor,
			paddingLeft: item.style.paddingLeft + 'px',
			paddingRight: item.style.paddingLeft + 'px',
			paddingTop: item.style.paddingTop + 'px',
			paddingBottom: item.style.paddingBottom + 'px'
		}"
		class="drag optional p10"
		:class="{ selected: index === selectedIndex }"
		@click.stop="$parent.$parent.onEditer(index)"
	>
		<div
			class="diy-wxlive"
			:style="{
				background: item.style.background,
				borderTopLeftRadius: item.style.topRadio + 'px',
				borderTopRightRadius: item.style.topRadio + 'px',
				borderBottomLeftRadius: item.style.bottomRadio + 'px',
				borderBottomRightRadius: item.style.bottomRadio + 'px'
			}"
		>
			<div class="wxlive-head d-b-c"><img v-img-url="item.style.background_image" /></div>
			<ul class="wxlive-list d-s-c f-w" :style="getUlwidth(item)">
				<li class="item" v-for="(live, index) in item.data" :key="index">
					<div class="box">
						<div class="pic"><img v-img-url="live.image" /></div>
						<div>{{ live.name }}</div>
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

<style lang="scss" scoped>
.diy-wxlive {
	overflow: hidden;
}

.diy-wxlive .wxlive-head {
	height: 40px;
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;
	overflow: hidden;
}

.diy-wxlive .wxlive-head .name {
	font-size: 18px;
	font-weight: bold;
}

.diy-wxlive .wxlive-list {
}

.diy-wxlive .wxlive-list .item {
	width: 50%;
}

.diy-wxlive .wxlive-list .item .box {
	padding: 10px;
}

.diy-wxlive .wxlive-list .item img {
	width: 100%;
}
.wxlive-head{
	img{
		width: 100%;
	}
}
</style>
