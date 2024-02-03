<template>
	<!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-优惠券-优惠券列表-添加优惠券
      -->
	<div class="product-add">
		<!--form表单-->
		<el-form size="small" ref="form" :model="form" label-position="top" label-width="200px">
			<!--添加门店-->
			<div class="common-form">添加优惠券</div>
			<el-form-item label="优惠券名称" prop="name" :rules="[{ required: true, message: ' ' }]">
				<el-input v-model="form.name" placeholder="请输入优惠券名称"></el-input>
				<div class="tips">例如：满100减10</div>
			</el-form-item>
			<el-form-item label="优惠券颜色">
				<el-radio-group v-model="form.color">
					<el-radio label="10">蓝色</el-radio>
					<el-radio label="20">红色</el-radio>
					<el-radio label="30">紫色</el-radio>
					<el-radio label="40">黄色</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="优惠券类型">
				<el-radio-group v-model="form.coupon_type">
					<el-radio label="10">满减券</el-radio>
					<el-radio label="20">折扣券</el-radio>
				</el-radio-group>
			</el-form-item>
			<div v-if="form.coupon_type == 10">
				<el-form-item label="减免金额" prop="reduce_price" :rules="[{ required: true, message: ' ' }]">
					<el-input v-model="form.reduce_price" placeholder="请输入减免金额" type="number"></el-input>
				</el-form-item>
			</div>
			<div v-else>
				<el-form-item label="折扣率 " prop="discount" :rules="[{ required: true, message: ' ' }]">
					<el-input v-model="form.discount" placeholder="请输入折扣率" type="number"></el-input>
					<div class="tips">折扣率范围0-10，9.5代表9.5折，0代表不折扣</div>
				</el-form-item>
				<el-form-item label="最多优惠金额" prop="max_price" :rules="[{ required: true, message: ' ' }]">
					<el-input v-model="form.max_price" placeholder="请输入最多优惠金额" type="number"></el-input>
					<div class="tips">最大抵扣金额不能超出此金额，0代表不限制</div>
				</el-form-item>
			</div>

			<el-form-item label="最低消费金额" prop="min_price" :rules="[{ required: true, message: ' ' }]">
				<el-input v-model="form.min_price" placeholder="请输入最低消费金额" type="number"></el-input>
			</el-form-item>

			<el-form-item label="到期类型">
				<el-radio-group v-model="form.expire_type">
					<el-radio label="10">领取后生效</el-radio>
					<el-radio label="20">固定时间</el-radio>
				</el-radio-group>
			</el-form-item>
			<div v-if="form.expire_type == 10">
				<el-form-item label="有效天数"><el-input v-model="form.expire_day" placeholder="请输入有效天数"
						type="number"></el-input></el-form-item>
			</div>
			<div v-else>
				<el-form-item label="有效时间">
					<el-date-picker v-model="form.active_time" type="daterange" align="right" unlink-panels
						value-format="YYYY-MM-DD" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
						:picker-options="pickerOptions0"></el-date-picker>
				</el-form-item>
			</div>

			<el-form-item label="发放总数量 " prop="total_num" :rules="[{ required: true, message: ' ' }]">
				<el-input v-model="form.total_num" placeholder="请输入发放总数量" type="number"></el-input>
				<div class="tips">限制领取的优惠券数量，-1为不限制</div>
			</el-form-item>
			<el-form-item label="是否显示在领券中心">
				<el-radio-group v-model="form.show_center">
					<el-radio :label="1">显示</el-radio>
					<el-radio :label="0">不显示</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="排序"><el-input type="number" v-model="form.sort"
					placeholder="接近0，排序等級越高"></el-input></el-form-item>

			<!--提交-->
			<div class="common-button-wrapper">
				<el-button  size="small" @click="cancelFunc" :loading="loading">取消</el-button>
				<el-button type="primary" size="small" @click="onSubmit" :loading="loading">提交</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	import CouponApi from '@/api/coupon.js';
	export default {
		data() {
			return {
				/*切换菜单*/
				// activeIndex: '1',
				/*form表单数据*/
				form: {
					color: '10',
					coupon_type: '10',
					expire_type: '10',
					sort: 1,
					active_time: '',
					show_center: 1,
					max_price: ''
				},
				loading: false,
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
					}
				}
			};
		},
		created() {},

		methods: {
			/*添加用户*/
			onSubmit() {
				let self = this;
				let form = self.form;
				self.$refs.form.validate(valid => {
					if (valid) {
						self.loading = true;
						CouponApi.addCoupon(form, true)
							.then(data => {
								self.loading = false;
								this.$ElMessage({
									message: '恭喜你，添加成功',
									type: 'success'
								});
								self.$router.push('/plus/coupon/index');
							})
							.catch(error => {
								self.loading = false;
							});
					}
				});
			},

			/*取消*/
			cancelFunc() {
				this.$router.push({
					path: '/plus/coupon/index',
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.product-add {
	}

	.tips {
		color: #ccc;
	}
</style>