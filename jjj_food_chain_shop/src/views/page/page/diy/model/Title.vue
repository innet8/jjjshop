<template>
	<div>
		<div @click.stop="$parent.$parent.onEditer(index)">
			<div
				class="drag optional"
				:style="{
					padding: item.style.paddingTop + 'px ' + item.style.paddingLeft + 'px ' + item.style.paddingBottom + 'px ' + item.style.paddingLeft + 'px',
					background: item.style.bgcolor
				}"
				:class="{ selected: index === selectedIndex }"
			>
				<div
					class="diy-title"
					:class="'diy-title-' + item.style.type"
					:style="{
						background: item.style.background,
						borderRadius: item.style.topRadio + 'px ' + item.style.topRadio + 'px ' + item.style.bottomRadio + 'px ' + item.style.bottomRadio + 'px '
					}"
				>
					<!-- 风格五的副标题 -->
					<div v-if="item.style.type == 5" :style="{ color: item.style.subtextColor, fontSize: item.style.subtextSize + 'px' }">{{ item.params.subtitle }}</div>
					<!-- 风格八的 -->
					<div
						v-if="item.style.type == 8 && item.style.isLine"
						class="type8-before"
						:style="{ background: item.style.lineColor || '', height: item.style.textSize + 'px' }"
					></div>
					<div class="d-b-c">
						<!-- 风格六的副标题 -->
						<span class="text-type6" v-if="item.style.type == 6" :style="{ color: item.style.subtextColor, fontSize: item.style.subtextSize + 'px' }">
							{{ item.params.subtitle }}
						</span>
						<!-- 风格四的图形 -->
						<div class="text-type4" v-if="item.style.type == 4">
							<div class="line" :style="{ background: item.style.textColor }"></div>
							<div class="dot" :style="{ borderColor: item.style.textColor }"></div>
						</div>
						<!-- 风格一的图形 -->
						<div class="text-type1" style="margin-right: 20px;" v-if="item.style.type == 1">
							<span class="line fb op3" :style="{ color: item.style.lineColor || '' }"></span>
							<span class="line fb" :style="{ color: item.style.lineColor || '' }"></span>
						</div>
						<!-- 主标题 -->
						<span
							class="title-text text-ellipsis pr"
							:class="{ noBg: item.style.type == 6 }"
							:style="{ color: item.style.textColor, background: item.style.background, fontSize: item.style.textSize + 'px', fontWeight: item.style.weight || 400 }"
						>
							{{ item.params.title }}
						</span>
						<!-- 风格四的图形 -->
						<div class="text-type4" v-if="item.style.type == 4">
							<div class="dot" :style="{ borderColor: item.style.textColor }"></div>
							<div class="line" :style="{ background: item.style.textColor }"></div>
						</div>
						<!-- 风格一的图形 -->
						<div class="text-type1" style="margin-left: 20px;" v-if="item.style.type == 1">
							<span class="line fb" :style="{ color: item.style.lineColor || '' }"></span>
							<span class="line fb op3" :style="{ color: item.style.lineColor || '' }"></span>
						</div>
						<!-- 风格三的底部线条 -->
						<div class="title-line" :style="{ background: item.style.lineColor || '' }" v-if="item.style.type == 2"></div>
						<!-- 风格三的底部方块 -->
						<div class="title-line3" v-if="item.style.type == 3"><div class="block3"></div></div>
					</div>
					<!-- 风格八的副标题 -->
					<div class="flex-1 d-s-c" v-if="item.style.type == 8">
						<div
							class="type8-subbox"
							v-if="item.style.type == 8 && item.style.isSub"
							:style="{ color: item.style.subtextColor, fontSize: item.style.subtextSize + 'px', background: item.style.subbackground }"
						>
							{{ item.params.subtitle }}
						</div>
					</div>
					<!-- 风格八的更多 -->
					<div v-if="item.style.type == 8 && item.style.isMore" class="more" :style="{ color: item.style.moretextColor }">{{ item.params.moretitle }}</div>
					<!-- 风格七的副标题 -->
					<div
						class="type7-subbox"
						v-if="item.style.type == 7"
						:style="{ color: item.style.subtextColor, fontSize: item.style.subtextSize + 'px', background: item.style.subbackground }"
					>
						{{ item.params.subtitle }}
					</div>
					<!-- 风格五的底部方块 -->
					<div class="block5" v-if="item.style.type == 5"></div>
					<!-- 风格六的底部方块 -->
					<div class="block6" v-if="item.style.type == 6"></div>
					<!-- 风格四的底部文字 -->
					<div v-if="item.style.type == 4" :style="{ color: item.style.subtextColor, fontSize: item.style.subtextSize + 'px' }">{{ item.params.subtitle }}</div>
				</div>
				<div class="btn-edit-del"><div class="btn-del" @click.stop="$parent.$parent.onDeleleItem(index)">删除</div></div>
			</div>
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
.diy-title-1,
.diy-title-2,
.diy-title-3 {
	display: flex;
	justify-content: center;
	align-items: center;
}
.diy-title-4,
.diy-title-5,
.diy-title-7 {
	flex-direction: column;
	display: flex;
	justify-content: center;
	align-items: center;
}
.diy-title-8 {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.optional .diy-title {
	padding: 10px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}

.optional .diy-title .title-icon {
	width: 32px;
	height: 32px;
	padding: 5px;
	z-index: 1;
}

.diy-title .title-text {
	overflow: hidden;
	white-space: nowrap;
	padding: 0 5px;
	z-index: 1;
	font-size: 12px;
	font-weight: 800;
}
.diy-title .title-text.noBg {
	background: none !important;
}
.text-type1 {
	display: flex;
	align-items: flex-end;
}
.text-type4 {
	display: flex;
	justify-content: center;
	align-items: center;
}
.text-type6 {
	position: absolute;
	z-index: 0;
	font-weight: bold;
	top: 0px;
	left: 0;
	right: 0;
	margin: auto;
	text-align: center;
}
.text-type4 .line {
	width: 40px;
	height: 1px;
	background-color: #eee;
}
.text-type4 .dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	border: 2px solid #eee;
}
.diy-title .text-type1 .line {
	border-left: 4px solid;
	transform: rotate(25deg);
	border-radius: 20px;
	height: 16px;
	display: block;
	margin-right: 6px;
}
.diy-title .text-type1 .line:nth-of-type(2) {
	height: 16px;
	margin-right: 5px;
	position: relative;
}
.op3 {
	opacity: 0.3;
}
.diy-title .text-type1 .trd {
	transform: rotate(40deg);
	line-height: 0;
	position: relative;
	top: 2px;
}
.title-line {
	width: 245px;
	height: 1px;
	background-color: #eeeeee;
	border-radius: 1px;
	position: absolute;
	left: 0;
	bottom: 0;
	top: 0;
	right: 0;
	margin: auto;
	z-index: 0;
}
.title-line3 {
	width: 245px;
	height: 1px;
	background-color: #eeeeee;
	position: absolute;
	left: 0;
	bottom: 6px;
	right: 0;
	margin: auto;
	z-index: 4;
}
.title-line3 .block3 {
	width: 40px;
	height: 3px;
	left: 0;
	right: 0;
	bottom: 1px;
	margin: auto;
	background: #000;
	position: absolute;
	display: inline-block;
	z-index: 1;
}
.block5,
.block6 {
	width: 30px;
	height: 3px;
	left: 0;
	right: 0;
	bottom: 4px;
	margin: auto;
	background: #000;
	position: absolute;
	display: inline-block;
	z-index: 1;
}
.type7-subbox {
	padding: 6px 16px;
	border-radius: 200px;
	line-height: 1;
}
.type8-subbox {
	padding: 6px 14px;
	border-radius: 200px;
	line-height: 1;
}
.type8-before {
	width: 4px;
	margin-right: 6px;
}
</style>
