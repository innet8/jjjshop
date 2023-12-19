<template>
	<div>
		<div class="common-form">
			<span>{{ curItem.name }}</span>
		</div>
		<el-form size="small" :model="curItem" label-width="100px">
			<div class="f16 gray3 form-subtitle">风格设置</div>
			<el-form-item label="风格：">
				<el-radio-group @change="changeType" v-model="curItem.style.type">
					<el-radio-button :label="1">风格一</el-radio-button>
					<el-radio-button :label="2">风格二</el-radio-button>
					<el-radio-button :label="3">风格三</el-radio-button>
					<el-radio-button :label="4">风格四</el-radio-button>
					<el-radio-button :label="5">风格五</el-radio-button>
					<el-radio-button :label="6">风格六</el-radio-button>
					<el-radio-button :label="7">风格七</el-radio-button>
					<el-radio-button :label="8">风格八</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">标题内容</div>
			<el-form-item label="标题名称："><el-input v-model="curItem.params.title" class="w-auto"></el-input></el-form-item>
			<el-form-item label="链接：">
				<el-input @click="changeLink('sublinkUrl')" v-model="curItem.params.sublinkUrl">
					<template #suffix>
						<el-icon color="#333" size="16px"><ArrowRight /></el-icon>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item
				label="副标题名称："
				v-if="curItem.style.type == 4 || curItem.style.type == 5 || curItem.style.type == 6 || curItem.style.type == 7 || curItem.style.type == 8"
			>
				<el-input v-model="curItem.params.subtitle" class="w-auto"></el-input>
			</el-form-item>
			<div class="form-chink"></div>
			<template v-if="curItem.style.type == 8">
				<div class="f16 gray3 form-subtitle">"更多"按钮内容</div>
				<el-form-item label="按钮文字："><el-input v-model="curItem.params.moretitle" class="w-auto"></el-input></el-form-item>
				<el-form-item label="链接：">
					<el-input @click="changeLink('morelinkUrl')" v-model="curItem.params.morelinkUrl">
						<template #suffix>
							<el-icon color="#333" size="16px"><ArrowRight /></el-icon>
						</template>
					</el-input>
				</el-form-item>
				<div class="form-chink"></div>
			</template>

			<div class="f16 gray3 form-subtitle">组件样式</div>
			<!--上下边距-->
			<div class="form-item">
				<div class="form-label">上边距：</div>
				<el-slider v-model="curItem.style.paddingTop" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--上下边距-->
			<div class="form-item">
				<div class="form-label">下边距：</div>
				<el-slider v-model="curItem.style.paddingBottom" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--左右边距-->
			<div class="form-item">
				<div class="form-label">左右边距：</div>
				<el-slider v-model="curItem.style.paddingLeft" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--上圆角-->
			<div class="form-item">
				<div class="form-label">上圆角：</div>
				<el-slider v-model="curItem.style.topRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--下圆角-->
			<div class="form-item">
				<div class="form-label">下圆角：</div>
				<el-slider v-model="curItem.style.bottomRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<div class="form-item">
				<div class="form-label">底部背景：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.bgcolor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.bgcolor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'bgcolor', '#F2F2F2')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-item">
				<div class="form-label">组件背景：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.background"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.background" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'background', '#ffffff')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">标题样式</div>
			<!--下圆角-->
			<div class="form-item">
				<div class="form-label">文字大小：</div>
				<el-slider v-model="curItem.style.textSize" :min="12" :max="20" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<el-form-item label="文字加粗：">
				<el-radio-group v-model="curItem.style.weight">
					<el-radio-button :label="400">标准</el-radio-button>
					<el-radio-button :label="800">加粗</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<div class="form-item">
				<div class="form-label">文字颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.textColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.textColor" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'textColor', '#333333')" type="primary" link>重置</el-button>
				</div>
			</div>
			<el-form-item label="是否显示辅助图：" v-if="curItem.style.type == 8">
				<el-radio-group v-model="curItem.style.isLine">
					<el-radio-button :label="1">是</el-radio-button>
					<el-radio-button :label="0">否</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<div class="form-item" v-if="curItem.style.type == 1 || curItem.style.type == 2 || curItem.style.type == 8">
				<div class="form-label">辅助图颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.lineColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.lineColor" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'lineColor', '#eeeeee')" type="primary" link>重置</el-button>
				</div>
			</div>
			<template v-if="curItem.style.type == 4 || curItem.style.type == 5 || curItem.style.type == 6 || curItem.style.type == 7 || curItem.style.type == 8">
				<div class="form-chink"></div>
				<div class="f16 gray3 form-subtitle">副标题样式</div>
				<el-form-item label="是否显示：" v-if="curItem.style.type == 8">
					<el-radio-group v-model="curItem.style.isSub">
						<el-radio-button :label="1">是</el-radio-button>
						<el-radio-button :label="0">否</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<!--下圆角-->
				<div class="form-item">
					<div class="form-label">文字大小：</div>
					<el-slider v-model="curItem.style.subtextSize" :min="12" :max="40" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
				</div>
				<div class="form-item">
					<div class="form-label">文字颜色：</div>
					<div class="flex-1 d-s-c" style="height: 36px;">
						<el-color-picker size="default" v-model="curItem.style.subtextColor"></el-color-picker>
						<el-input class="ml10" v-model="curItem.style.subtextColor" />
						<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'subtextColor', '#DDDDDD')" type="primary" link>
							重置
						</el-button>
					</div>
				</div>
				<div class="form-item" v-if="curItem.style.type == 7 || curItem.style.type == 8">
					<div class="form-label">背景颜色：</div>
					<div class="flex-1 d-s-c" style="height: 36px;">
						<el-color-picker size="default" v-model="curItem.style.subbackground"></el-color-picker>
						<el-input class="ml10" v-model="curItem.style.subbackground" placeholder="透明" />
						<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'subbackground', '#ffffff')" type="primary" link>
							重置
						</el-button>
					</div>
				</div>
			</template>
			<template v-if="curItem.style.type == 8">
				<div class="form-chink"></div>
				<div class="f16 gray3 form-subtitle">"更多"按钮样式</div>
				<el-form-item label="是否显示：">
					<el-radio-group v-model="curItem.style.isMore">
						<el-radio-button :label="1">是</el-radio-button>
						<el-radio-button :label="0">否</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<div class="form-item">
					<div class="form-label">文字颜色：</div>
					<div class="flex-1 d-s-c" style="height: 36px;">
						<el-color-picker size="default" v-model="curItem.style.moretextColor"></el-color-picker>
						<el-input class="ml10" v-model="curItem.style.moretextColor" />
						<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'moretextColor', '#999999')" type="primary" link>
							重置
						</el-button>
					</div>
				</div>
			</template>
			<!-- <el-form-item label="图标显示：">
				<el-radio-group v-model="curItem.params.show_icon">
					<el-radio label="yes">显示</el-radio>
					<el-radio label="no">不显示</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="标题图标：">
				<div class="diy-notice-icon">
					<img v-img-url="curItem.params.icon" alt="" style="width: 100%;height: auto;" @click="$parent.onEditorSelectImage(curItem.params, 'icon')" />
				</div>
				<div class="ww100">建议尺寸32×32</div>
			</el-form-item> -->
			<!-- 公告内容 -->
		</el-form>
		<Setlink v-if="is_linkset" :is_linkset="is_linkset" @closeDialog="closeLinkset">选择链接</Setlink>
	</div>
</template>

<script>
import Setlink from '@/components/setlink/Setlink.vue';
export default {
	components: {
		Setlink
	},
	data() {
		return {
			is_linkset: false,
			linkName: ''
		};
	},
	props: ['curItem', 'selectedIndex', 'opts'],
	created() {
		this.curItem.style.paddingTop = parseInt(this.curItem.style.paddingTop);
	},
	methods: {
		changeType(e) {
			let self = this;
			let params = self.curItem;
			if (e == 1) {
				params.style.paddingTop = 0;
				params.style.paddingBottom = 0;
				params.style.paddingLeft = 0;
				params.style.topRadio = 0;
				params.style.bottomRadio = 0;
				params.style.bgcolor = '#FFFFFF';
				params.style.background = '#FFFFFF';
				params.style.textSize = 20;
				params.style.weight = 800;
				params.style.textColor = '#FF0000';
				params.style.lineColor = '#FF0000';
			}
			if (e == 2) {
				params.style.paddingTop = 10;
				params.style.paddingBottom = 10;
				params.style.paddingLeft = 0;
				params.style.topRadio = 0;
				params.style.bottomRadio = 0;
				params.style.bgcolor = '#FFFFFF';
				params.style.background = '#FFFFFF';
				params.style.textSize = 20;
				params.style.weight = 800;
				params.style.textColor = '#FF0000';
				params.style.lineColor = '#DDDDDD';
			}
			if (e == 3) {
				params.style.paddingTop = 10;
				params.style.paddingBottom = 10;
				params.style.paddingLeft = 0;
				params.style.topRadio = 0;
				params.style.bottomRadio = 0;
				params.style.bgcolor = '#FFFFFF';
				params.style.background = '#FFFFFF';
				params.style.textSize = 18;
				params.style.weight = 800;
				params.style.textColor = '#FF0000';
				params.style.lineColor = '';
			}
			if (e == 4) {
				params.style.paddingTop = 10;
				params.style.paddingBottom = 10;
				params.style.paddingLeft = 0;
				params.style.topRadio = 0;
				params.style.bottomRadio = 0;
				params.style.bgcolor = '#FFFFFF';
				params.style.background = '#FFFFFF';
				params.style.textSize = 18;
				params.style.weight = 800;
				params.style.textColor = '#FF0000';
				params.style.lineColor = '';
				params.style.subtextSize = 12;
				params.style.subtextColor = '#DDDDDD';
			}
			if (e == 5) {
				params.style.paddingTop = 10;
				params.style.paddingBottom = 10;
				params.style.paddingLeft = 0;
				params.style.topRadio = 0;
				params.style.bottomRadio = 0;
				params.style.bgcolor = '#FFFFFF';
				params.style.background = '#FFFFFF';
				params.style.textSize = 20;
				params.style.weight = 800;
				params.style.textColor = '#FF0000';
				params.style.lineColor = '';
				params.style.subtextSize = 12;
				params.style.subtextColor = '#999999';
			}
			if (e == 6) {
				params.style.paddingTop = 10;
				params.style.paddingBottom = 10;
				params.style.paddingLeft = 0;
				params.style.topRadio = 0;
				params.style.bottomRadio = 0;
				params.style.bgcolor = '#FFFFFF';
				params.style.background = '#FFFFFF';
				params.style.textSize = 20;
				params.style.weight = 800;
				params.style.textColor = '#FF0000';
				params.style.lineColor = '';
				params.style.subtextSize = 18;
				params.style.subtextColor = '#eeeeee';
			}
			if (e == 7) {
				params.style.paddingTop = 10;
				params.style.paddingBottom = 10;
				params.style.paddingLeft = 0;
				params.style.topRadio = 0;
				params.style.bottomRadio = 0;
				params.style.bgcolor = '#FFFFFF';
				params.style.background = '#FFFFFF';
				params.style.textSize = 20;
				params.style.weight = 800;
				params.style.textColor = '#FF0000';
				params.style.lineColor = '';
				params.style.subtextSize = 14;
				params.style.subtextColor = '#FF0000';
				params.style.subbackground = '#FFCCCC';
			}
			if (e == 8) {
				params.style.paddingTop = 10;
				params.style.paddingBottom = 10;
				params.style.paddingLeft = 0;
				params.style.topRadio = 0;
				params.style.bottomRadio = 0;
				params.style.bgcolor = '#FFFFFF';
				params.style.background = '#FFFFFF';
				params.style.textSize = 18;
				params.style.weight = 800;
				params.style.textColor = '#FF0000';
				params.style.isLine = 1;
				params.style.lineColor = '#FF0000';
				params.style.isSub = 1;
				params.style.subtextSize = 14;
				params.style.subtextColor = '#FF0000';
				params.style.subbackground = '#FFCCCC';
				params.style.isMore = 1;
				params.style.moretextColor = '#FF0000';
			}
		},
		/*选择链接*/
		changeLink(e) {
			this.is_linkset = true;
			this.linkName = e;
		},

		/*获取链接并关闭弹窗*/
		closeLinkset(e) {
			this.is_linkset = false;
			if (e) {
				this.curItem.params[this.linkName] = e.url;
				// this.curItem.params.linkName = '链接到' + ' ' + e.type + ' ' + e.name;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.diy-notice-icon,
.diy-notice-icon img {
	width: 32px;
	height: 32px;
}
</style>
