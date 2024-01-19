<template>
	<!--
    	作者：wangxw
    	时间：2019-10-26
    	描述：直播-修改
    -->
	<el-dialog title="修改直播" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
		:close-on-press-escape="false">
		<el-form size="small" :model="ruleForm" :rules="rules" ref="ruleForm">
			<el-form-item label="直播间名称" prop="name" :label-width="formLabelWidth">
				<el-input class="max-w460" v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="直播封面图" prop="cover_img" :label-width="formLabelWidth">
				<div>
					<el-button type="primary" @click="openUpload('cover')">上传图片</el-button>
					<img :src="ruleForm.cover_img" class="mt10" :width="120" v-if="ruleForm.cover_img != ''" />
					<div class="gray9">建议尺寸1080*1920,大小不超过2M</div>
				</div>
			</el-form-item>
			<el-form-item label="直播分享图" prop="share_img" :label-width="formLabelWidth">
				<div>
					<el-button type="primary" @click="openUpload('share')">上传图片</el-button>
					<img :src="ruleForm.share_img" class="mt10" :width="120" v-if="ruleForm.share_img != ''" />
					<div class="gray9">建议像素800*640，大小不超过1M</div>
					<!--上传图片组件-->
					<Upload v-if="isupload" :isupload="isupload" @returnImgs="returnImgsFunc">上传图片</Upload>
				</div>
			</el-form-item>
			<el-form-item label="购物封面图" prop="feeds_img" :label-width="formLabelWidth">
				<div>
					<el-button type="primary" @click="openUpload('feeds')">上传图片</el-button>
					<img :src="ruleForm.feeds_img" class="mt10" :width="120" v-if="ruleForm.feeds_img != ''" />
					<div class="gray9">建议像素800*800，大小不超过100KB</div>
				</div>
			</el-form-item>
			<el-form-item label="直播时间" :label-width="formLabelWidth">
				<div class="d-s-c">
					<el-form-item prop="start_time" style="margin-right: 20px;">
						<el-date-picker v-model="ruleForm.start_time" type="datetime" format="YYYY-MM-DD HH:mm:ss"
							value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择开始时间"></el-date-picker>
					</el-form-item>
					<!-- <el-col class="line" :span="2">-</el-col> -->
					<el-form-item prop="end_time">
						<el-date-picker v-model="ruleForm.end_time" type="end_time" format="YYYY-MM-DD HH:mm:ss"
							value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择结束时间"></el-date-picker>
					</el-form-item>
				</div>
			</el-form-item>
			<el-form-item label="主播昵称" prop="anchor_name" :label-width="formLabelWidth">
				<el-input class="max-w460" v-model="ruleForm.anchor_name"></el-input>
			</el-form-item>
			<el-form-item label="主播微信号" prop="anchor_wechat" :label-width="formLabelWidth">
				<el-input class="max-w460" v-model="ruleForm.anchor_wechat"></el-input>
			</el-form-item>
			<el-form-item label="直播间点赞" prop="close_like" :label-width="formLabelWidth">
				<el-radio-group v-model="ruleForm.close_like">
					<el-radio :label="0">开启</el-radio>
					<el-radio :label="1">关闭</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="直播货架" prop="close_goods" :label-width="formLabelWidth">
				<el-radio-group v-model="ruleForm.close_goods">
					<el-radio :label="0">开启</el-radio>
					<el-radio :label="1">关闭</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="直播间评论" prop="close_comment" :label-width="formLabelWidth">
				<el-radio-group v-model="ruleForm.close_comment">
					<el-radio :label="0">开启</el-radio>
					<el-radio :label="1">关闭</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="直播间回放" prop="close_replay" :label-width="formLabelWidth">
				<el-radio-group v-model="ruleForm.close_replay">
					<el-radio :label="0">开启</el-radio>
					<el-radio :label="1">关闭</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogFormVisible()">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">提交</el-button>
			</div>
		</template>
		<!--上传图片组件-->
		<Upload v-if="isupload" :isupload="isupload" :type="type" @returnImgs="returnImgsFunc">上传图片</Upload>
	</el-dialog>
</template>

<script>
	import LiveApi from '@/api/live.js';
	import Upload from '@/components/file/Upload.vue';
	export default {
		components: {
			Upload
		},
		data() {
			return {
				/*是否上传图片*/
				isupload: false,
				ruleForm: {
					live_id: 0,
					name: '',
					cover_img: 0,
					start_time: '',
					end_time: '',
					anchor_name: '',
					anchor_wechat: '',
					share_img: '',
					feeds_img: '',
					type: '',
					close_like: 0,
					close_goods: 0,
					close_comment: 0,
					close_replay: 0
				},
				rules: {
					name: [{
						required: true,
						message: '请输入直播间名称',
						trigger: 'blur'
					}, {
						min: 3,
						max: 17,
						message: '长度在 3 到 17 个字符',
						trigger: 'blur'
					}],
					anchor_name: [{
						required: true,
						message: '请输入主播昵称',
						trigger: 'blur'
					}, {
						min: 3,
						max: 15,
						message: '长度在 3 到 15 个字符',
						trigger: 'blur'
					}],
					anchor_wechat: [{
						required: true,
						message: '请输入主播微信号',
						trigger: 'blur'
					}],
					cover_img: [{
						required: true,
						message: '请选择封面图片',
						trigger: 'change'
					}],
					share_img: [{
						required: true,
						message: '请选择分享图片',
						trigger: 'change'
					}],
					feeds_img: [{
						required: true,
						message: '请选择购物封面图',
						trigger: 'change'
					}],
					start_time: [{
						required: true,
						message: '请选择开始时间',
						trigger: 'change'
					}],
					end_time: [{
						required: true,
						message: '请选择结束时间',
						trigger: 'change'
					}],
				},
				/*是否显示*/
				dialogVisible: false,
				/*左边长度*/
				formLabelWidth: '120px',
				loading: false
			};
		},
		props: ['open_edit', 'editform'],
		created() {
			this.dialogVisible = this.open_edit;
			this.ruleForm = this.editform;
			this.ruleForm.start_time = this.editform.start_time_text;
			this.ruleForm.end_time = this.editform.end_time_text;
		},
		methods: {
			submitForm(formName) {
				let self = this;
				self.loading = true;
				self.$refs[formName].validate(valid => {
					if (valid) {
						let param = self.ruleForm;
						LiveApi.editRoom(param)
							.then(data => {
								self.loading = false;
								ElMessage({
									message: '修改成功',
									type: 'success'
								});
								self.dialogFormVisible(true);
							})
							.catch(error => {
								self.loading = false;
							});
					} else {
						self.loading = false;
						return false;
					}
				});
			},
			/*上传*/
			openUpload(e) {
				this.type = e;
				this.isupload = true;
			},
			/*获取图片*/
			returnImgsFunc(e) {
				if (e != null && e.length > 0) {
					if (this.type == 'cover') {
						this.ruleForm.cover_img = e[0].file_path;
					} else if (this.type == 'share') {
						this.ruleForm.share_img = e[0].file_path;
					} else if (this.type == 'feeds') {
						this.ruleForm.feeds_img = e[0].file_path;
					}
				}
				this.isupload = false;
			},
			/*关闭弹窗*/
			dialogFormVisible(e) {
				if (e) {
					this.$emit('closeDialog', {
						type: 'success',
						openDialog: false
					})
				} else {
					this.$emit('closeDialog', {
						type: 'error',
						openDialog: false
					})
				}
			},

		}
	};
</script>

<style scoped>
	.img {
		margin-top: 10px;
	}
</style>