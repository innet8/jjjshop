<template>
	<!--
      作者：luoyiming
      时间：2019-10-25
      描述：应用-基础设置
  -->
	<div class="product-add">
		<!--form表单-->
		<el-form size="small" ref="form" :model="form" label-width="200px">
			<div class="common-form">支付方式设置</div>
			<el-form-item label="支付方式">
				<el-checkbox-group v-model="form.pay_type">
					<el-checkbox v-for="(item,index) in pay_type" :label="item.value"
						:key="index">{{item.name}}</el-checkbox>
				</el-checkbox-group>
				<div class="tips">注：支付方式至少选择一个</div>
			</el-form-item>
			<div class="common-form">微信支付设置</div>

			<el-form-item label="微信支付商户号 MCHID">
				<el-input v-model="form.mchid" class="max-w460"></el-input>
			</el-form-item>
			<el-form-item label="微信支付密钥 APIKEY ">
				<el-input v-model="form.apikey" class="max-w460"></el-input>
			</el-form-item>

			<el-form-item label="apiclient_cert.pem">
				<el-input type="textarea" :rows="4" placeholder="使用文本编辑器打开apiclient_cert.pem文件，将文件的全部内容复制进来"
					v-model="form.cert_pem" class="max-w460"></el-input>
				<div class="tips">使用文本编辑器打开apiclient_key.pem文件，将文件的全部内容复制进来</div>
			</el-form-item>
			<el-form-item label="apiclient_key.pem">
				<el-input type="textarea" :rows="4" placeholder="使用文本编辑器打开apiclient_cert.pem文件，将文件的全部内容复制进来"
					v-model="form.key_pem" class="max-w460"></el-input>
				<div class="tips">使用文本编辑器打开apiclient_key.pem文件，将文件的全部内容复制进来</div>
			</el-form-item>

			<div class="common-form">支付宝设置</div>
			<el-form-item label="支付宝 appid">
				<el-input v-model="form.alipay_appid" class="max-w460"></el-input>
			</el-form-item>
			<el-form-item label="支付宝公钥">
				<el-input type="textarea" :rows="4" v-model="form.alipay_publickey" class="max-w460"></el-input>
			</el-form-item>
			<el-form-item label="应用私钥">
				<el-input type="textarea" :rows="4" v-model="form.alipay_privatekey" class="max-w460"></el-input>
			</el-form-item>
			<!--提交-->
			<div class="common-button-wrapper"><el-button type="primary" @click="onSubmit">提交</el-button></div>
		</el-form>
	</div>
</template>

<script>
	import AppSettingApi from '@/api/appsetting.js';
	import {
		formatModel
	} from '@/utils/base.js'
	export default {
		data() {
			return {
				form: {
					pay_type: [],
					mchid: '',
					apikey: '',
					cert_pem: '',
					key_pem: '',
					alipay_appid: '',
					alipay_publickey: '',
					alipay_privatekey: ''
				},
				app: {},
				pay_type: [],
			};
		},
		created() {
			this.getData();
		},

		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				AppSettingApi.payDetail({}, true)
					.then(res => {
						self.app = res.data.app;
						self.pay_type = res.data.pay_type;
						self.form = formatModel(self.form, res.data.app);
						if (res.data.app.pay_type) {
							self.form.pay_type = res.data.app.pay_type;
						} else {
							self.form.pay_type = [];
						}
						for (let i = 0; i < self.form.pay_type.length; i++) {
							self.form.pay_type[i] = parseInt(self.form.pay_type[i]);
						}
						console.log(self.form);
					})
					.catch(error => {
						console.log(error);
					});
			},

			//提交表单
			onSubmit() {
				let self = this;
				let params = self.form;
				if (params.pay_type.length < 1) {
					ElMessage({
						message: '支付方式至少选择一种！',
						type: 'warning'
					});
					return;
				}
				AppSettingApi.editPay(params, true)
					.then(data => {
						ElMessage({
							message: '恭喜你，设置成功',
							type: 'success'
						});
					})
					.catch(error => {});
			},
		}
	};
</script>

<style>
</style>