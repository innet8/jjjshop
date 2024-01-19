<template>
	<!--
    作者：luoyiming
    时间：2020-06-04
    描述：插件中心-直播-直播房间列表-修改
  -->
	<el-dialog title="添加商品" :modal-append-to-body="false" :before-close="closeFunc" v-model="dialogVisible"
		:close-on-click-modal="false" :close-on-press-escape="false" width="500px">
		<el-form size="small" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item prop="product_id" label="选择商品" :rules="[{ required: true, message: '请绑定商品' }]">
				<el-button @click="openProduct()">选择商品</el-button>
			</el-form-item>
			<el-form-item v-if="ruleForm.product_id != ''">{{ productName }}</el-form-item>
			<el-form-item><img :src="product_img" class="mt10" :width="120" v-if="product_img != ''" /></el-form-item>

			<el-form-item label="商品名称" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>

			<el-form-item label="商品封面图" prop="cover_img" :rules="[{ required: true, message: '请上传商品封面图' }]">
				<div>
					<el-button type="primary" @click="openUpload('cover')">上传图片</el-button>
					<img :src="ruleForm.cover_img" class="mt10" :width="120" v-if="ruleForm.cover_img != ''" />
					<div class="gray9">建议尺寸300*300,大小不超过2M</div>
					<!--上传图片组件-->
					<Upload v-if="isupload" :isupload="isupload" @returnImgs="returnImgsFunc">上传图片</Upload>
				</div>
			</el-form-item>
			<el-form-item label="价格类型" prop="type">
				<el-radio-group v-model="ruleForm.price_type">
					<el-radio :label="1">一口价</el-radio>
					<el-radio :label="2">价格区间</el-radio>
					<el-radio :label="3">折扣价</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="价格：" prop="price" :rules="[{ required: true, message: '请输入最低价格', trigger: 'change' }]"
				v-if="ruleForm.price_type == 1">
				<el-input type="text" min="0" v-model="ruleForm.price" class="mb16 max-w460"
					placeholder="请输入价格"></el-input>
			</el-form-item>
			<el-form-item label="价格：" prop="price" :rules="[{ required: true, message: '请输入最低价格', trigger: 'change' }]"
				v-if="ruleForm.price_type == 2">
				<el-input type="text" min="0" v-model="ruleForm.price" class="mb16 max-w460"
					placeholder="请输入最低价格"></el-input>
			</el-form-item>
			<el-form-item label="价格：" prop="price2" :rules="[{ required: true, message: '请输入最高价格', trigger: 'change' }]"
				v-if="ruleForm.price_type == 2">
				<el-input type="text" min="0" v-model="ruleForm.price2" class="mb16 max-w460"
					placeholder="请输入最高价格"></el-input>
			</el-form-item>
			<el-form-item prop="price" :rules="[{ required: true, message: '请输入原价', trigger: 'change' }]" label="价格："
				v-if="ruleForm.price_type == 3">
				<el-input type="text" min="0" v-model="ruleForm.price" class="mb16 max-w460"
					placeholder="请输入原价"></el-input>
			</el-form-item>
			<el-form-item prop="price2" :rules="[{ required: true, message: '请输入现价', trigger: 'change' }]" label="价格："
				v-if="ruleForm.price_type == 3">
				<el-input type="text" min="0" v-model="ruleForm.price2" class="mb16 max-w460"
					placeholder="请输入现价"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button size="small" @click="closeFunc()">取 消</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">立即提交</el-button>
			</div>
		</template>
		<!--商品选择-->
		<Group :isgroup="isgroup" :excludeIds="exclude_ids" :islist="false" @closeDialog="closeProductFunc">
		</Group>
	</el-dialog>
</template>

<script>
	import LiveApi from '@/api/live.js';
	import Upload from '@/components/file/Upload.vue';
	import Group from '@/components/group/Group.vue';

	export default {
		components: {
			/*图片上传*/
			Upload,
			/*选择商品*/
			Group
		},

		data() {
			return {
				/*是否上传图片*/
				isupload: false,
				productName: '',
				product_img: '',
				ruleForm: {
					name: '',
					cover_img: '',
					price_type: 1,
					price: '',
					price2: '',
					product_id: '',
					shop_supplier_id: 0
				},
				rules: {
					name: [{
							required: true,
							message: '请输入商品名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 17,
							message: '长度在 3 到 17 个字符',
							trigger: 'blur'
						}
					],
					price: [{
						required: true,
						message: '请输入价格',
						trigger: 'change'
					}]
				},

				/*是否加载完成*/
				loading: false,
				/*是否打开选择商品*/
				isgroup: false,
				/*已有的id*/
				exclude_ids: [],
				imageType: '',
				/*左边长度*/
				formLabelWidth: '120px',
				/*是否显示*/
				dialogVisible: false,
			};
		},

		props: ['open_add'],
		watch: {
			open_add: function(n, o) {
				if (n != o) {
					this.dialogVisible = n;
				}
			}
		},

		created() {},

		methods: {
			/*关闭弹窗*/
			closeFunc(e) {
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
				this.$refs['ruleForm'].resetFields();
			},

			submitForm(formName) {
				let self = this;
				self.loading = true;
				self.$refs[formName].validate(valid => {
					if (valid) {
						let param = self.ruleForm;
						LiveApi.addProduct(param,true)
							.then(data => {
								self.loading = false;
								ElMessage({
									message: '创建成功',
									type: 'success'
								});
								this.dialogVisible = false;
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

			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.productName = '';
				this.product_img = '';
			},

			/*上传*/
			openUpload(e) {
				this.imageType = e;
				this.isupload = true;
			},

			/*关闭商品选择*/
			closeProductFunc(e) {
				if (e.type == 'success') {
					this.ruleForm.product_id = e.params.group_id;
					this.product_img = e.params.image ? e.params.image : '';
					this.productName = e.params.group_name;
					this.ruleForm.name = e.params.group_name;
					this.ruleForm.cover_img = e.params.image ? e.params.image : '';
				}
				this.isgroup = false;
			},

			/*关闭弹窗*/
			cancelFunc(e) {
				this.$emit('close', {
					type: 'error'
				});
			},

			/*打开添加*/
			openProduct() {
				this.isgroup = true;
			},

			/*获取图片*/
			returnImgsFunc(e) {
				if (e != null && e.length > 0) {
					this.ruleForm.cover_img = e[0].file_path;
				}
				this.isupload = false;
			}
		}
	};
</script>

<style scoped>
	.img {
		margin-top: 10px;
	}
</style>