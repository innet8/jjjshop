<template>
	<div>
		<div class="common-form">
			<span>{{ curItem.name }}</span>
		</div>
		<div class="f16 gray3 form-subtitle">样式设置</div>
		<el-form size="small" :model="curItem" label-width="100px">
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
			<!--左右边距-->
			<div class="form-item">
				<div class="form-label">上圆角：</div>
				<el-slider v-model="curItem.style.topRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--左右边距-->
			<div class="form-item">
				<div class="form-label">下圆角：</div>
				<el-slider v-model="curItem.style.bottomRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
				<div class="form-item">
				<div class="form-label">底部背景：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.background"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.background" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'background', '#ffffff')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-item">
				<div class="form-label">组件背景：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.bgcolor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.bgcolor" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'bgcolor', '#f2f2f2')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">导航模式</div>
			<el-form-item label="展示风格：">
				<el-radio-group v-model="curItem.style.imgShape">
					<el-radio-button :label="true">固定显示</el-radio-button>
					<el-radio-button :label="false">单行滑动</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<!--每行数量-->
			<template v-if="curItem.style.imgShape">
				<el-form-item label="每行数量：">
					<el-radio-group v-model="curItem.style.rowsNum" @change="changRowsNum">
						<el-radio :label="3">3个</el-radio>
						<el-radio :label="4">4个</el-radio>
						<el-radio :label="5">5个</el-radio>
					</el-radio-group>
				</el-form-item>
			</template>
			
			<!--图文模式-->
			<!-- <el-form-item label="图文模式：">
				<el-radio-group v-model="curItem.style.type">
					<el-radio :label="3">图文</el-radio>
					<el-radio :label="4">图片</el-radio>
					<el-radio :label="5">文字</el-radio>
				</el-radio-group>
			</el-form-item> -->
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">
				图片设置
				<span class="gray9 f12">图片建议宽度88*88px；鼠标拖拽左侧圆点可调整导航顺序</span>
			</div>
			<template v-if="curItem.data && curItem.data.length > 0">
				<draggable v-model="curItem.data" group="people" item-key="index" class="draggable-list">
					<template #item="{ element,index }">
						<div class="d-c-c param-img-item navbar">
							<div class="d-c d-c-c" style="margin-right: 28px;">
								<div class="icon"><img v-img-url="element.imgUrl" alt="" @click="$parent.onEditorSelectImage(element, 'imgUrl')" /></div>
							</div>
							<div class="right">
								<el-icon class="el-icon-DeleteFilled" @click="$parent.onEditorDeleleData(index, selectedIndex)"><CloseBold /></el-icon>
								<div class="url-box mb16 flex-1 d-s-c ww100">
									<span class="key-name">名称</span>
									<el-input maxlength="6" show-word-limit v-model="element.text"></el-input>
								</div>
								<div class="d-s-c  ww100">
									<div class="url-box flex-1 d-s-c">
										<span class="key-name">链接</span>
										<el-input @click="changeLink(index)" v-model="element.linkUrl">
											<template #suffix>
												<el-icon color="#333" size="16px"><ArrowRight /></el-icon>
											</template>
										</el-input>
									</div>
								</div>
							</div>
						</div>
					</template>
				</draggable>
			</template>
			<!-- <div class="param-img-item" :key="index" v-for="(navBar, index) in curItem.data">
				<div class="delete-box">
					<el-icon @click="$parent.onEditorDeleleData(index, selectedIndex)"><DeleteFilled /></el-icon>
				</div>
				<div class="icon"><img v-img-url="navBar.imgUrl" alt="" @click="$parent.onEditorSelectImage(navBar, 'imgUrl')" /></div>
				<p class="tc gray9">建议尺寸100x100</p>
				<div class="url-box">
					<span class="key-name">文字内容：</span>
					<el-input v-model="navBar.text"></el-input>
				</div>
				<div class="url-box">
					<span class="key-name">颜色：</span>
					<div class="d-s-c">
						<el-color-picker v-model="navBar.color"></el-color-picker>
						<el-button type="button" style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(navBar, 'color', '#666666')">重置</el-button>
					</div>
				</div>
				<div class="d-s-c">
					<div class="url-box flex-1">
						<span class="key-name">链接名称：</span>
						<el-input v-model="navBar.name"></el-input>
					</div>
					<div class="url-box ml10"><el-button type="primary" @click="changeLink(index)">选择链接</el-button></div>
				</div>
			</div> -->
			<div class="d-c-c pb16"><el-button plain type="primary" @click="$parent.onEditorAddData">+添加图文导航</el-button></div>
		</el-form>
		<Setlink v-if="is_linkset" :is_linkset="is_linkset" @closeDialog="closeLinkset">选择链接</Setlink>
	</div>
</template>

<script>
import Setlink from '@/components/setlink/Setlink.vue';
import draggable from 'vuedraggable';
export default {
	components: {
		Setlink,
		draggable
	},
	data() {
		return {
			/*是否选择链接*/
			is_linkset: false,
			index: null
		};
	},
	props: ['curItem', 'selectedIndex', 'opts'],
	methods: {
		changRowsNum(num){
			// let flagNum = this.curItem.data && this.curItem.data.length || 0;
			// if(flagNum > num){
			// 	this.curItem.data = this.curItem.data.slice(`-${num}`)
			// }
		},
		/*选择链接*/
		changeLink(index) {
			this.is_linkset = true;
			this.index = index;
		},

		/*获取链接并关闭弹窗*/
		closeLinkset(e) {
			this.is_linkset = false;
			if (e) {
				this.curItem.data[this.index].linkUrl = e.url;
				this.curItem.data[this.index].name = '链接到' + ' ' + e.type + ' ' + e.name;
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>
