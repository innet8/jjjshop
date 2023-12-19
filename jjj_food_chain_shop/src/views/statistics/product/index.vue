<template>
	<div class="pb50" v-loading="loading">
		<!--订单进度-->
		<!--内容-->
		<div id="">
			<el-tabs v-model="formInline.product_type" type="card" @tab-click="handleClick">
				<el-tab-pane label="外卖" name="0"></el-tab-pane>
				<el-tab-pane label="店内" name="1"></el-tab-pane>
			</el-tabs>
		</div>

		<div class="common-seach-wrap ww100">
			<el-form size="small" :model="formInline" class=" ww100">
				<div class="">
					<div>
						<el-form-item label="选择店铺" v-auth="'/auth/shop'">
							<el-select size="small" v-model="formInline.shop_supplier_id" placeholder="请选择"
								@change="handleClick">
								<el-option label="全部" :value="0"></el-option>
								<el-option v-for="(item, index) in supplierList" :key="index" :label="item.name"
									:value="item.shop_supplier_id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="查询日期">
							<el-radio-group v-model="formInline.type" size="medium" @change="handleClick">
								<el-radio-button :label="1">今天</el-radio-button>
								<el-radio-button :label="2">近七天</el-radio-button>
								<el-radio-button :label="3">近十五天</el-radio-button>
								<el-radio-button :label="4">自定义时间</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="起始时间" v-if="formInline.type==4">
							<div class="block">
								<span class="demonstration"></span>
								<el-date-picker @change="handleClick" size="small" v-model="formInline.time"
									type="daterange" value-format="YYYY-MM-DD" range-separator="至"
									start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
							</div>
						</el-form-item>
					</div>
					<el-form-item label="排行类型">
						<el-select size="small" v-model="formInline.sort" placeholder="请选择" @change="handleClick">
							<el-option :label="'销售额'" :value="0"></el-option>
							<el-option :label="'销量'" :value="1"></el-option>
						</el-select>
					</el-form-item>
				</div>
			</el-form>
		</div>

		<div class="product-content">
			<div class="common-form">实时概况</div>
			<div class="table-wrap">
				<el-row :gutter="20">
					<el-col :span="6">
						<div class="pb16 grid-content bg-purple">
							<div>商品总数</div>
							<div class="detail_prici">{{ detail.product_total }}</div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="pb16 grid-content bg-purple">
							<div>已上架商品</div>
							<div class="detail_prici">{{ detail.up_total }}</div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="pb16 grid-content bg-purple">
							<div>已下架商品</div>
							<div class="detail_prici">{{ detail.down_total }}</div>
						</div>
					</el-col>
				</el-row>
			</div>
			<!--内容-->
		</div>
		<el-button size="small" type="success" @click="onExport">商品导出</el-button>
		<div class="common-form">实时概况</div>
		<el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
			<el-table-column prop="product_name" label="商品名称"></el-table-column>
			<el-table-column prop="product_price" label="商品价格"></el-table-column>
			<el-table-column prop="total_num" label="商品总销量"></el-table-column>
			<el-table-column prop="total_price" label="商品总销售额"></el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
				:current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
				:total="totalDataNumber"></el-pagination>
		</div>
	</div>
</template>

<script>
	import StatisticsApi from '@/api/statistics.js';
	import qs from 'qs';
	import {
		useUserStore
	} from '@/store';
	const {
		token
	} = useUserStore();
	export default {
		data() {
			return {
				active: 0,
				/*是否加载完成*/
				loading: true,
				/*一页多少条*/
				pageSize: 10,
				/*一共多少条数据*/
				totalDataNumber: 0,
				/*当前是第几页*/
				curPage: 1,
				formInline: {
					product_type: 0,
					type: 1,
					shop_supplier_id: 0,
					time: '',
					sort: 0
				},
				/*订单数据*/
				detail: {
					total_price: '',
					income_money: '',
					order_count: '',
					refund_money: ''
				},
				supplierList: [],
				tableData: [],
				profileList: [],
				token,
			};
		},
		created() {
			/*获取列表*/
			this.getParams();
		},
		methods: {
			/*获取参数*/
			getParams() {
				let self = this;
				let params = self.formInline;
				params.page = self.curPage;
				params.list_rows = self.pageSize;
				self.loading = true;
				StatisticsApi.getProDate(params,
						true
					)
					.then(data => {
						self.detail = data.data.detail;
						self.supplierList = data.data.supplierList;
						self.profileList = data.data;
						self.tableData = data.data.list.data;
						self.totalDataNumber = data.data.list.total;
						self.loading = false;
					})
					.catch(error => {
						self.loading = false;
					});
			},
			handleClick() {
				let self = this;
				if (self.formInline.type == 4 && !self.formInline.time) {
					return
				}
				self.curPage = 1;
				self.getParams()
			},
			/*选择第几页*/
			handleCurrentChange(val) {
				let self = this;
				self.loading = true;
				self.curPage = val;
				self.getParams();
			},

			/*每页多少条*/
			handleSizeChange(val) {
				this.pageSize = val;
				this.getParams();
			},


			/*打开添加*/
			addClick(row) {
				let self = this;
				let params = row.finance_id;
				self.$router.push({
					path: '/cash/finance/detail',
					query: {
						finance_id: params
					}
				});
			},
			onExport() {
				let baseUrl = window.location.protocol + '//' + window.location.host;
				this.formInline.token = this.token;
				window.location.href = baseUrl + '/index.php/shop/statistics.product/export?' + qs.stringify(this
					.formInline);
			}
		}
	};
</script>
<style lang="scss">
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.grid-content {
		padding: 20px;
		border-radius: 4px;
		min-height: 36px;
	}

	.bg-purple {
		background: #f4f4f4;
	}

	.table-wrap {
		padding: 20px;
		padding-top: 0;
	}

	.common-form-data {
		margin-left: 15px;
		font-weight: 500;
	}

	.tips {
		padding: 15px;
		margin-bottom: 20px;
	}

	.tips_tit {
		font-size: 22px;
		margin-bottom: 10px;
	}

	.tips_txt {
		line-height: 25px;
		color: #666;
		font-size: 14px;
	}

	.detail_prici {
		font-size: 20px;
		color: #000;
		font-weight: bold;
		margin-top: 10px;
		max-width: 250px;
	}
</style>