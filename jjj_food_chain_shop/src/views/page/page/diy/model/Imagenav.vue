<template>
	<!--
      	作者：luoxiang
      	时间：2023-09-18
      	描述：diy组件-模拟显示-导航组
      -->
	<div
		@click.stop="$parent.$parent.onEditer(index)"
		:style="{
			background: item.style.bgcolor,
			paddingLeft: item.style.paddingLeft + 'px',
			paddingRight: item.style.paddingLeft + 'px',
			paddingTop: item.style.paddingTop + 'px',
			paddingBottom: item.style.paddingBottom + 'px'
		}"
	>
		<div class="drag optional" :class="{ selected: index === selectedIndex }">
			<div
				class="diy-navBar"
				:style="{
					background: item.style.background,
					borderTopLeftRadius: item.style.topRadio + 'px',
					borderTopRightRadius: item.style.topRadio + 'px',
					borderBottomLeftRadius: item.style.bottomRadio + 'px',
					borderBottomRightRadius: item.style.bottomRadio + 'px'
				}"
			>
				<!-- 固定显示 -->
				<template v-if="item.style.imgShape">
					<ul class="list" :class="'column-' + item.style.rowsNum">
						<li class="item" :key="index" v-for="(navBar, index) in item.data">
							<div class="item-image"><img v-img-url="navBar.imgUrl" /></div>
							<div class="item-text text-ellipsis" :style="{ color: navBar.color }">{{ navBar.text }}</div>
						</li>
					</ul>
				</template>
				<!-- 单行滑动 -->
				<template v-else>
					<ul class="list columnFixed">
						<li class="item" :key="index" v-for="(navBar, index) in item.data">
							<div class="item-image"><img v-img-url="navBar.imgUrl" /></div>
							<div class="item-text text-ellipsis" :style="{ color: navBar.color }">{{ navBar.text }}</div>
						</li>
					</ul>
				</template>
				
			</div>
			<div class="btn-edit-del"><div class="btn-del" @click.stop="$parent.$parent.onDeleleItem(index)">删除</div></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ['item', 'index', 'selectedIndex'],
	methods: {}
};
</script>

<style lang="scss" scoped>
.diy-navBar .list {
	display: flex;
	flex-wrap: nowrap;
	align-items: flex-start;
	overflow-x: auto;
}
.diy-navBar .list .item {
	padding: 10px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	flex-shrink: 0;
}
.diy-navBar{
	.list.column-3{
		display: grid;
		grid-template-columns: repeat(3,1fr);
	}
	.list.column-4{
		display: grid;
		grid-template-columns: repeat(4,1fr);
	}
	.list.column-5{
		display: grid;
		grid-template-columns: repeat(5,1fr);
	}
}
.columnFixed .item{
	width: 28%;
}
.diy-navBar .list .item-image {
	width: 60%;
}
.diy-navBar .list .item-image img {
	width: 100%;
}
.diy-navBar .list .item-text {
	width: 100%;
	padding: 4px 0;
	text-align: center;
}
</style>
