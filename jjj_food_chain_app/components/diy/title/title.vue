<template>
	<div>
		<div>
			<div
				class="drag optional"
				:style="{
					padding: itemData.style.paddingTop*2 + 'rpx ' + itemData.style.paddingLeft*2 + 'rpx ' + itemData.style.paddingBottom*2 + 'rpx ' + itemData.style.paddingLeft*2 + 'rpx',
					background: itemData.style.bgcolor
				}"
			>
				<div
					class="diy-title"
					:class="'diy-title-' + itemData.style.type"
					:style="{
						background: itemData.style.background,
						borderRadius: itemData.style.topRadio*2 + 'rpx ' + itemData.style.topRadio*2 + 'rpx ' + itemData.style.bottomRadio*2 + 'rpx ' + itemData.style.bottomRadio*2 + 'rpx '
					}"
					@click.stop="gotoPage(itemData.params.sublinkUrl)"
				>
					<!-- 风格五的副标题 -->
					<div v-if="itemData.style.type == 5" :style="{ color: itemData.style.subtextColor, fontSize: itemData.style.subtextSize*2 + 'rpx' }">{{ itemData.params.subtitle }}</div>
					<!-- 风格八的 -->
					<div
						v-if="itemData.style.type == 8 && itemData.style.isLine"
						class="type8-before"
						:style="{ background: itemData.style.lineColor || '', height: itemData.style.textSize*2 + 'rpx' }"
					></div>
					<div class="d-b-c">
						<!-- 风格六的副标题 -->
						<span class="text-type6" v-if="itemData.style.type == 6" :style="{ color: itemData.style.subtextColor, fontSize: itemData.style.subtextSize*2 + 'rpx' }">
							{{ itemData.params.subtitle }}
						</span>
						<!-- 风格四的图形 -->
						<div class="text-type4" v-if="itemData.style.type == 4">
							<div class="line" :style="{ background: itemData.style.textColor }"></div>
							<div class="dot" :style="{ borderColor: itemData.style.textColor }"></div>
						</div>
						<!-- 风格一的图形 -->
						<div class="text-type1" style="margin-right: 20rpx;" v-if="itemData.style.type == 1">
							<span class="line fb op3" :style="{ color: itemData.style.lineColor || '' }"></span>
							<span class="line fb" :style="{ color: itemData.style.lineColor || '' }"></span>
						</div>
						<!-- 主标题 -->
						<span
							class="title-text text-ellipsis pr"
							:class="{ noBg: itemData.style.type == 6 }"
							:style="{ color: itemData.style.textColor, background: itemData.style.background, fontSize: itemData.style.textSize*2 + 'rpx', fontWeight: itemData.style.weight || 400 }"
						>
							{{ itemData.params.title }}
						</span>
						<!-- 风格四的图形 -->
						<div class="text-type4" v-if="itemData.style.type == 4">
							<div class="dot" :style="{ borderColor: itemData.style.textColor }"></div>
							<div class="line" :style="{ background: itemData.style.textColor }"></div>
						</div>
						<!-- 风格一的图形 -->
						<div class="text-type1" style="margin-left: 40rpx;" v-if="itemData.style.type == 1">
							<span class="line fb" :style="{ color: itemData.style.lineColor || '' }"></span>
							<span class="line fb op3" :style="{ color: itemData.style.lineColor || '' }"></span>
						</div>
						<!-- 风格三的底部线条 -->
						<div class="title-line" :style="{ background: itemData.style.lineColor || '' }" v-if="itemData.style.type == 2"></div>
						<!-- 风格三的底部方块 -->
						<div class="title-line3" v-if="itemData.style.type == 3"><div class="block3"></div></div>
					</div>
					<!-- 风格八的副标题 -->
					<div class="flex-1 d-s-c" v-if="itemData.style.type == 8">
						<div
							class="type8-subbox"
							v-if="itemData.style.type == 8 && itemData.style.isSub"
							:style="{ color: itemData.style.subtextColor, fontSize: itemData.style.subtextSize*2 + 'rpx', background: itemData.style.subbackground }"
						>
							{{ itemData.params.subtitle }}
						</div>
					</div>
					<!-- 风格八的更多 -->
					<div @click.stop="gotoPage(itemData.params.morelinkUrl)" v-if="itemData.style.type == 8 && itemData.style.isMore" class="more" :style="{ color: itemData.style.moretextColor }">{{ itemData.params.moretitle }}</div>
					<!-- 风格七的副标题 -->
					<div
						class="type7-subbox"
						v-if="itemData.style.type == 7"
						:style="{ color: itemData.style.subtextColor, fontSize: itemData.style.subtextSize*2 + 'rpx', background: itemData.style.subbackground }"
					>
						{{ itemData.params.subtitle }}
					</div>
					<!-- 风格五的底部方块 -->
					<div class="block5" v-if="itemData.style.type == 5"></div>
					<!-- 风格六的底部方块 -->
					<div class="block6" v-if="itemData.style.type == 6"></div>
					<!-- 风格四的底部文字 -->
					<div v-if="itemData.style.type == 4" :style="{ color: itemData.style.subtextColor, fontSize: itemData.style.subtextSize*2 + 'rpx' }">{{ itemData.params.subtitle }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ['itemData'],
	created() {},
	methods: {
		/*跳转页面*/
		gotoPages(e) {
			this.gotoPage(e.linkUrl);
		}
	}
};
</script>

<style>
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
	padding: 20rpx;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}

.optional .diy-title .title-icon {
	width: 64rpx;
	height: 64rpx;
	padding: 10rpx;
	z-index: 1;
}

.diy-title .title-text {
	overflow: hidden;
	white-space: nowrap;
	padding: 0 10rpx;
	z-index: 1;
	font-size: 24rpx;
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
	width: 80rpx;
	height: 2rpx;
	background-color: #eee;
}
.text-type4 .dot {
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	border: 4rpx solid #eee;
}
.diy-title .text-type1 .line {
	border-left: 8rpx solid;
	transform: rotate(25deg);
	border-radius: 40rpx;
	height: 32rpx;
	display: block;
	margin-right: 12rpx;
}
.diy-title .text-type1 .line:nth-of-type(2) {
	height: 32rpx;
	margin-right: 10rpx;
	position: relative;
}
.op3 {
	opacity: 0.3;
}
.diy-title .text-type1 .trd {
	transform: rotate(40deg);
	line-height: 0;
	position: relative;
	top: 4rpx;
}
.title-line {
	width: 490rpx;
	height: 2rpx;
	background-color: #eeeeee;
	border-radius: 2rpx;
	position: absolute;
	left: 0;
	bottom: 0;
	top: 0;
	right: 0;
	margin: auto;
	z-index: 0;
}
.title-line3 {
	width: 490rpx;
	height: 2rpx;
	background-color: #eeeeee;
	position: absolute;
	left: 0;
	bottom: 12rpx;
	right: 0;
	margin: auto;
	z-index: 4;
}
.title-line3 .block3 {
	width: 80rpx;
	height: 6rpx;
	left: 0;
	right: 0;
	bottom: 2rpx;
	margin: auto;
	background: #000;
	position: absolute;
	display: inline-block;
	z-index: 1;
}
.block5,
.block6 {
	width: 60rpx;
	height: 6rpx;
	left: 0;
	right: 0;
	bottom: 8rpx;
	margin: auto;
	background: #000;
	position: absolute;
	display: inline-block;
	z-index: 1;
}
.type7-subbox {
	padding: 12rpx 32rpx;
	border-radius: 400rpx;
	line-height: 1;
}
.type8-subbox {
	padding: 12rpx 28rpx;
	border-radius: 400rpx;
	line-height: 1;
}
.type8-before {
	width: 8rpx;
	margin-right: 12rpx;
}
</style>
