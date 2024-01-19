<template>
	<el-dialog title="下载推广码" v-model="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
		:close-on-press-escape="false">
		<el-form size="small" :model="form" label-position="top">
			<el-form-item label="下载类型" :label-width="formLabelWidth">
				<el-radio-group v-model="source">
					<el-radio label="wx">微信小程序</el-radio>
					<el-radio label="mp">公众号，H5网页</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogFormVisible">取 消</el-button>
				<el-button type="primary" @click="qrcodeClick">确 定</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script>
	import qs from 'qs';
	import { useUserStore } from '@/store';
	const { token } = useUserStore();
	export default {
		data() {
			return {
				/*左边长度*/
				formLabelWidth: '120px',
				dialogVisible: false,
				source: 'wx',
				token,
			};
		},
		props: ['open_qrcode', 'form'],
		created() {
			this.dialogVisible = this.open_qrcode;
		},
		methods: {
			qrcodeClick() {
				let baseUrl = window.location.protocol + '//' + window.location.host;
				let params = {
					id: this.form.invitation_gift_id,
					source: this.source,
					token: this.token
				};
				window.location.href = baseUrl + '/index.php/shop/plus.invitation.Active/qrcode?' + qs.stringify(params);
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
			}

		}
	};
</script>

