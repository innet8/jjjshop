<template>
	<!--
      作者 luoyiming
      时间：2019-10-26
      描述：设置-商城设置
  -->
	<div class="d-s-s product-add">
		<!--分类不同样式展示-->
		<div class="model-container flex-1">
			<div class="img-box">
				<el-image v-if="form.theme == '0'" :src="theme1_url" fit="fill"></el-image>
				<el-image v-if="form.theme == '1'" :src="theme2_url" fit="fill"></el-image>
				<el-image v-if="form.theme == '2'" :src="theme3_url" fit="fill"></el-image>
				<el-image v-if="form.theme == '3'" :src="theme4_url" fit="fill"></el-image>
				<el-image v-if="form.theme == '4'" :src="theme5_url" fit="fill"></el-image>
				<el-image v-if="form.theme == '5'" :src="theme6_url" fit="fill"></el-image>
				<el-image v-if="form.theme == '6'" :src="theme7_url" fit="fill"></el-image>
			</div>
		</div>
		<!--图片展示参数-->
		<div class="param-container ">
			<div class="form-title">主题选择</div>
			<el-form size="small" :model="form" label-width="100px" class="mt10">
				<el-form-item label="风格：">
					<el-radio-group v-model="form.theme">
						<el-radio-button label="0">主题一</el-radio-button>
						<el-radio-button label="1">主题二</el-radio-button>
						<el-radio-button label="2">主题三</el-radio-button>
						<el-radio-button label="3">主题四</el-radio-button>
						<el-radio-button label="4">主题五</el-radio-button>
						<el-radio-button label="5">主题六</el-radio-button>
					</el-radio-group>
				</el-form-item>
			</el-form>
		</div>
		<!--提交-->
		<div class="common-button-wrapper"><el-button size="small" type="primary" @click="onSubmit" :loading="loading">保存</el-button></div>
	</div>
</template>

<script>
import PageApi from '@/api/page.js';
import theme1 from '@/assets/img/theme1.jpg';
import theme2 from '@/assets/img/theme2.jpg';
import theme3 from '@/assets/img/theme3.jpg';
import theme4 from '@/assets/img/theme4.jpg';
import theme5 from '@/assets/img/theme5.jpg';
import theme6 from '@/assets/img/theme6.jpg';
export default {
	data() {
		return {
			/*是否正在加载*/
			loading: false,
			/*form表单数据*/
			form: {
				theme: 'red'
			},
			all_type: [],
			type: [],
			/*是否打开图片选择*/
			isupload: false,
			theme6_url: theme6,
			theme5_url: theme5,
			theme4_url: theme4,
			theme3_url: theme3,
			theme2_url: theme2,
			theme1_url: theme1
		};
	},
	created() {
		this.getParams();
	},

	methods: {
		/*获取配置数据*/
		getParams() {
			let self = this;
			PageApi.themeDetail({}, true)
				.then(res => {
					self.form.theme = res.data.vars.values.theme;
					self.loading = false;
				})
				.catch(error => {});
		},

		/*提交*/
		onSubmit() {
			let self = this;
			let params = this.form;
			self.loading = true;
			PageApi.editTheme(params, true)
				.then(data => {
					self.loading = false;
					ElMessage({
						message: '恭喜你，设置成功',
						type: 'success'
					});
					self.$router.push('/page/page/theme/index');
				})
				.catch(error => {
					self.loading = false;
				});
		}
	}
};
</script>
<style lang="scss" scoped="scoped">
.product-add {
	margin: 0;
	padding: 0;
	background: none;
}
.mb10 {
	margin-bottom: 10px;
}

.mr10 {
	margin-right: 10px;
}

.phone-theme > img {
	width: 250px;
}

.d-c-s {
	display: flex;
	justify-content: center;
	align-items: flex-start;
}
.model-container {
	width: 300px;
	height: calc(100vh - 98px);
	// margin-right: 30px;
	overflow-y: auto;
}

.model-container .img-box .el-image {
	max-width: 362px;
	// height: 645px;
	flex: 1;
	margin-right: 60px;
	margin-bottom: 20px;
	border: 3px solid;
	border-color: rgba(0, 0, 0, 0);
	box-sizing: border-box;
}

.model-container .img-box .el-image.active {
	border-color: #409eff;
}

.model-container .img-box .el-image:last-child {
	margin-right: 0;
}

.model-container .img-box {
	// box-shadow: 0 0 16px 0 rgba(0, 0, 0, .1);
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	padding: 70px 40px 0 40px;
  background-color: #f8fafb;
}

.param-container {
	width: 376px;
	height: calc(100vh - 98px);
	overflow-y: auto;
	background: #fff;
	/* border: 1px solid #cccccc; */
}

.param-container .el-form-item {
	--font-size: 14px !important;
}

.form-title {
	padding: 0 22px;
	height: 62px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-bottom: 1px solid #eee;
	font-size: 16px;
	color: #666;
	font-weight: bold;
}

.key-name {
	font-size: 16px;
	color: #666;
	white-space: nowrap;
	margin-right: 30px;
}

.form-item {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	padding: 10px;
	padding-right: 18px;
}

.form-label {
	width: 122px;
	margin-right: 10px;
	text-align: right;
}
</style>
