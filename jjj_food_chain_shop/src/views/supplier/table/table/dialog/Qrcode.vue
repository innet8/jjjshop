<template>
	<!--
      	作者：luoyiming
      	时间：2020-06-01
      	描述：插件中心-分销-提现申请-弹窗
      -->
	<div>
		<el-dialog :title="$t('下载二维码')" width="35%" v-model="dialogVisible" @close="dialogFormVisible"
			:close-on-click-modal="false" :close-on-press-escape="false">
			<el-form size="small">
				<el-form-item  :label-width="formLabelWidth">
					<!-- <el-radio-group v-model="source">
						<el-radio label="wx">{{ $t('微信小程序') }}</el-radio>
						<el-radio label="mp">{{ $t('公众号，H5网页') }}</el-radio>
					</el-radio-group> -->
           
				</el-form-item>
                <Qrcode :value="QRUrl" style="width: 200px;margin: auto;"></Qrcode>
			</el-form>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="dialogFormVisible">{{ $t('取消') }}</el-button>
					<el-button type="primary" @click="qrcodeClick">{{ $t('下载') }}</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script>
	import qs from 'qs';
    import Qrcode from 'vue-qrcode';
	import { useUserStore } from '@/store';
	const { token } = useUserStore();
	export default {
        components: {
    Qrcode,
  },
		data() {
			return {
				status: '',
				reject_reason: '',
				/*左边长度*/
				formLabelWidth: '120px',
				/*是否显示*/
				dialogVisible: false,
				loading: false,
				source: 'mp',
				token,
                QRUrl:''
			};
		},
		props: ['open', 'code_id'],
		watch: {
			open: function(n, o) {
				this.dialogVisible = this.open;
                let baseUrl = window.location.protocol + '//' + window.location.host;
				let params = {
					id: this.code_id,
					source: this.source,
					token: this.token
				};
                this.QRUrl = baseUrl + '/index.php/shop/store.table.table/qrcode?' + qs.stringify(params);
			}
		},
		created() {

        },
		methods: {
			qrcodeClick() {
				let baseUrl = window.location.protocol + '//' + window.location.host;
				let params = {
					id: this.code_id,
					source: this.source,
					token: this.token
				};
				window.location.href = baseUrl + '/index.php/shop/store.table.table/qrcode?' + qs.stringify(params);
                this.$emit('close', false);
			},

			/*关闭弹窗*/
			dialogFormVisible(e) {
				if (e) {
					this.$emit('close', true);
				} else {
					this.$emit('close', false);
				}
			}
		}
	};
</script>

