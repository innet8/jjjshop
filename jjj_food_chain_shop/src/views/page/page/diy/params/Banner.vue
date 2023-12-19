<template>
	<div>
		<div class="common-form">
			<span>{{ curItem.name }}</span>
		</div>
		<el-form size="small" :model="curItem" label-width="100px">
			<div class="f16 gray3 form-subtitle">颜色设置</div>
			<div class="form-item">
				<div class="form-label">底部背景：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.background"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.background" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'background', '#ffffff')" type="primary" link>重置</el-button>
				</div>
			</div>
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">指示器设置</div>
			<div class="form-item">
				<div class="form-label">指示点颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.btnColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.btnColor" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'btnColor', '#ffffff')" type="primary" link>重置</el-button>
				</div>
			</div>
			<el-form-item label="指示点形状：">
				<el-radio-group v-model="curItem.style.imgShape">
					<el-radio-button label="round">圆形</el-radio-button>
					<el-radio-button label="square">正方形</el-radio-button>
					<el-radio-button label="rectangle">长方形</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<!-- <el-form-item label="指示点位置：">
				<el-radio-group v-model="curItem.style.btnShape">
					<el-radio-button label="round">居左</el-radio-button>
					<el-radio-button label="square">居中</el-radio-button>
					<el-radio-button label="rectangle">居右</el-radio-button>
				</el-radio-group>
			</el-form-item> -->
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">边距设置</div>
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
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">圆角设置</div>
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
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle" style="margin-bottom: 10px;">
				图片设置
				<span class="gray9 f12">建议上传尺寸相同的图片，建议尺寸750px*340px</span>
			</div>
			<!--上下边距-->
			<div class="form-item">
				<div class="form-label">图片高度：</div>
				<el-slider v-model="curItem.style.height" :min="100" :max="1900" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<template v-if="curItem.data && curItem.data.length > 0">
				<draggable v-model="curItem.data" group="people" item-key="index" class="draggable-list">
					<template #item="{ element,index }">
						<div class="d-c-c param-img-item navbar">
							<div class="right pr">
								<el-icon class="el-icon-DeleteFilled" @click="$parent.onEditorDeleleData(index, selectedIndex)"><CloseBold /></el-icon>
								<div class="icon">
									<img
										:style="{ height: curItem.style.height * 0.5 + 'px' }"
										v-img-url="element.imgUrl"
										alt=""
										@click="$parent.onEditorSelectImage(element, 'imgUrl')"
									/>
								</div>
								<div class="d-s-c  ww100">
									<div class="url-box flex-1 d-s-c">
										<span class="key-name">链接</span>
										<el-input v-model="element.linkUrl">
											<template #suffix>
												<el-icon @click="changeLink(index)" color="#333" size="16px"><ArrowRight /></el-icon>
											</template>
										</el-input>
									</div>
								</div>
							</div>
						</div>
					</template>
				</draggable>
			</template>
			<div class="d-c-c pb16"><el-button plain type="primary" @click="$parent.onEditorAddData">+添加一个</el-button></div>
			<!-- 登录状态 -->
			<div class="common-form">
				登录状态
			</div>
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">登录状态</div>
			<el-form-item label="登录状态：">
				<el-radio-group v-model="curItem.style.isLogin">
					<el-radio-button :label="1">开启</el-radio-button>
					<el-radio-button :label="0">关闭</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">背景设置</div>
			<!-- 组件背景 -->
			<el-form-item label="组件背景：">
				<el-radio-group v-model="curItem.style.loginBgType">
					<el-radio-button :label="1">背景色</el-radio-button>
					<el-radio-button :label="2">背景图片</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<template v-if="curItem.style.loginBgType == 1">
				<div class="form-item">
					<div class="form-label">背景颜色：</div>
					<div class="flex-1 d-s-c" style="height: 36px;">
						<el-color-picker size="default" v-model="curItem.style.loginBackground"></el-color-picker>
						<el-input class="ml10" v-model="curItem.style.loginBackground" placeholder="透明" />
						<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'loginBackground', '#FFCC00')" type="primary" link>重置</el-button>
					</div>
				</div>
			</template>
			<template v-if="curItem.style.loginBgType == 2">
				<el-form-item label="背景图片：">
					<div class="diy-special-cover">
						<img v-img-url="curItem.style.loginBgImage" alt="" @click="$parent.onEditorSelectImage(curItem.style, 'loginBgImage')" />
						<div>建议尺寸706px*288px</div>
					</div>
				</el-form-item>
			</template>
			<el-form-item label="不透明度：">
				<el-slider v-model="curItem.style.loginOpacity" show-input></el-slider>
			</el-form-item>
			<!-- 样式设置 -->
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">样式设置</div>
			<!--组件高度-->
			<div class="form-item mt10">
				<div class="form-label">组件高度：</div>
				<el-slider v-model="curItem.style.loginHeight" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--上圆角-->
			<div class="form-item">
				<div class="form-label">上圆角：</div>
				<el-slider v-model="curItem.style.loginTopRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--下圆角-->
			<div class="form-item">
				<div class="form-label">下圆角：</div>
				<el-slider v-model="curItem.style.loginBottomRadio" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--左右边距-->
			<div class="form-item">
				<div class="form-label">左右内边距：</div>
				<el-slider v-model="curItem.style.loginPaddingLeft" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!--左右外边距-->
			<div class="form-item">
				<div class="form-label">左右外边距：</div>
				<el-slider v-model="curItem.style.loginMarginLeft" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!-- 登录前内容设置 -->
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">登录前内容设置</div>
			<!-- 主题文字颜色 -->
			<div class="form-item">
				<div class="form-label">主题文字颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.loginBeforeTxtColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.loginBeforeTxtColor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'loginBeforeTxtColor', '#FFFFFF')" type="primary" link>重置</el-button>
				</div>
			</div>
			<!-- 按钮背景颜色 -->
			<div class="form-item">
				<div class="form-label">按钮背景颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.loginBtnBg"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.loginBtnBg" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'loginBtnBg', '#FFFFFF')" type="primary" link>重置</el-button>
				</div>
			</div>
			<!-- 按钮文字颜色 -->
			<div class="form-item">
				<div class="form-label">按钮文字颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.loginBtnTxtColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.loginBtnTxtColor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'loginBtnTxtColor', '#FFCC00')" type="primary" link>重置</el-button>
				</div>
			</div>
			<!-- 按钮弧度设置 -->
			<div class="form-item">
				<div class="form-label">按钮弧度设置：</div>
				<el-slider v-model="curItem.style.loginBtnRadius" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!-- 登录后内容设置 -->
			<div class="form-chink"></div>
			<div class="f16 gray3 form-subtitle">登录后内容设置</div>
			<!-- 头像设置 -->
			<div class="form-item">
				<div class="form-label">头像大小设置：</div>
				<el-slider v-model="curItem.style.loginAvatarSize" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!-- 头像弧度设置 -->
			<div class="form-item">
				<div class="form-label">头像弧度设置：</div>
				<el-slider v-model="curItem.style.loginAvatarRadius" size="small" show-input :show-input-controls="false" input-size="small"></el-slider>
			</div>
			<!-- 主题文字颜色 -->
			<div class="form-item">
				<div class="form-label">主题文字颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.loginAfterTxtColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.loginAfterTxtColor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'loginAfterTxtColor', '#FFFFFF')" type="primary" link>重置</el-button>
				</div>
			</div>
			<!-- 右侧文字颜色 -->
			<div class="form-item">
				<div class="form-label">右侧文字颜色：</div>
				<div class="flex-1 d-s-c" style="height: 36px;">
					<el-color-picker size="default" v-model="curItem.style.loginAfterRightTxtColor"></el-color-picker>
					<el-input class="ml10" v-model="curItem.style.loginAfterRightTxtColor" placeholder="透明" />
					<el-button style="margin-left: 10px;" @click.stop="$parent.onEditorResetColor(curItem.style, 'loginAfterRightTxtColor', '#FFFFFF')" type="primary" link>重置</el-button>
				</div>
			</div>
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
	props: ['curItem', 'selectedIndex'],
	methods: {
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

<style lang="scss" scoped>
.param-img-item.navbar {
	min-height: 132px;
	height: auto;
}
.param-img-item.navbar .icon img {
	width: 408px;
	height: 202px;
	background: #eeeeee;
	margin-bottom: 10px;
}
</style>
