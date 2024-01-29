<template>
	<!--
    	作者：luoyiming
    	时间：2019-10-25
    	描述：组件-选择商品
    -->
	<el-dialog title="选择商品" v-model="dialogVisible" @close="dialogFormVisible" :modal-append-to-body="false"
		:close-on-click-modal="false" :close-on-press-escape="false" width="900px">
		<div class="common-seach-wrap" style="margin-bottom: 10px;"><el-button type="primary" size="small" icon="Plus"
				@click="addClick">导入商品</el-button></div>

		<!--内容-->
		<div class="product-content">
			<div class="table-wrap">
				<el-table size="small" :data="productList" border style="width: 100%" highlight-current-row
					v-loading="loading" @selection-change="tableCurrentChange">
					<el-table-column width="70" label="商品图片">
						<template #default="scope">
							<img v-if="scope.row.product" :src="scope.row.product.cover_img" width="30" height="30" />
						</template>
					</el-table-column>
					<el-table-column prop="name" label="商品名称">
						<template #default="scope">
							<span v-if="scope.row.product">{{scope.row.product.name}}</span>
						</template>
					</el-table-column>
					<el-table-column width="140" prop="onSale" label="上架状态">
						<template #default="scope">
							<el-switch @change="onSaleChange($event, scope.row)" v-model="scope.row.on_sale"
								:active-value="1" :inactive-value="0"></el-switch>
						</template>
					</el-table-column>
					<el-table-column prop="isPush" width="180" label="推送状态">
						<template #default="scope">
							<el-button :disabled="scope.row.isPush == 0" @click="pushChange(scope.row)" size="small"
								type="primary">推送</el-button>
							<el-button @click="delClick(scope.row)" size="small" type="primary">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<!--分页-->
			<div class="pagination">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
					:current-page="curPage" :page-sizes="[2, 10, 20, 50, 100]" :page-size="pageSize"
					layout="total, prev, pager, next, jumper" :total="totalDataNumber"></el-pagination>
			</div>
		</div>
		<ImportProduct v-if="open_import" :open_import="open_import" :islist="true" :room_id="room_id"
			@closeDialog="closePop"></ImportProduct>
	</el-dialog>
</template>

<script>
	import LiveApi from '@/api/live.js';
	import ImportProduct from './ImportProduct.vue';
	export default {
		components: {
			ImportProduct
		},
		data() {
			return {
				open_import: false,
				excludeIds: [],
				/*是否加载完成*/
				loading: true,
				/*当前是第几页*/
				curPage: 1,
				/*一页多少条*/
				pageSize: 20,
				/*一共多少条数据*/
				totalDataNumber: 0,
				formInline: {},
				//商品分类列表
				categoryList: [],
				//商品列表
				productList: [],
				//类别列表
				status: [{
						id: 10,
						name: '上架'
					},
					{
						id: 20,
						name: '下架'
					}
				],
				multipleSelection: [],
				/*左边长度*/
				formLabelWidth: '120px',
				/*是否显示*/
				dialogVisible: false,
				/*结果类别*/
				type: 'error',
				/*传出去的参数*/
				params: null
			};
		},
		props: ['open_liveProduct', 'room_id', 'live_id'],
		created() {
			this.dialogVisible = this.open_liveProduct;
			this.getData();
		},
		methods: {
			pushChange(row) {
				let self = this;
				let params = self.formInline;
				params.live_product_id = row.live_product_id;
				LiveApi.pushProduct(params, true)
					.then(res => {
						if (res.code == 1) {
							ElMessage({
								message: '推送成功',
								type: 'success'
							});
							self.getData();
							self.loading = false;
						}
					})
					.catch(error => {});
			},
			onSaleChange(e, row) {
				let self = this;
				let params = self.formInline;
				params.live_product_id = row.live_product_id;
				params.on_sale = e;
				LiveApi.onSale(params, true)
					.then(res => {
						if (res.code == 1) {
							ElMessage({
								message: '操作成功',
								type: 'success'
							});
							self.getData();
							self.loading = false;
						}
					})
					.catch(error => {});
			},
			/*是否可以勾选*/
			selectableFunc(e) {
				if (typeof e.noChoose !== 'boolean') {
					return true;
				}
				return e.noChoose;
			},

			/*选择第几页*/
			handleCurrentChange(val) {
				this.curPage = val;
				this.getData();
			},

			/*每页多少条*/
			handleSizeChange(val) {
				this.curPage = 1;
				this.pageSize = val;
				this.getData();
			},

			/*获取商品列表*/
			getData() {
				let self = this;
				let params = self.formInline;
				params.page = self.curPage;
				params.list_rows = self.pageSize;
				params.room_id = self.room_id;
				LiveApi.liveProduct(params, true)
					.then(res => {
						if (res.code == 1) {
							self.loading = false;
							self.productList = res.data.list.data;
							self.totalDataNumber = res.data.list.total;
						}
					})
					.catch(error => {});
			},

			/*单选*/
			SingleFunc(row) {
				this.multipleSelection = [row];
				this.addClerk();
			},

			//点击确定
			addClerk() {
				let self = this;
				let params = null;
				let type = 'success';
				if (self.multipleSelection.length < 1) {
					ElMessage({
						message: '请至少选择一件产品商品！',
						type: 'error'
					});
					return;
				}
				if (self.islist && typeof self.islist != 'undefined') {
					self.multipleSelection.forEach(item => {
						item.image = item.imagePath;
					});
					params = self.multipleSelection;
				} else {
					params = self.multipleSelection[0];
					params.image = params.imagePath;
				}
				self.params = params;
				self.type = 'success';
				self.dialogVisible = false;
			},

			/*关闭弹窗*/
			dialogFormVisible() {
				this.$emit('closeDialog', {
					type: this.type,
					openDialog: false,
					params: this.params
				});
			},

			/*监听复选按钮选中事件*/
			tableCurrentChange(val) {
				this.multipleSelection = val;
			},
			addClick() {
				this.open_import = true;
			},
			closePop(e) {
				let self = this;
				self.open_import = false;
				if (e.type == 'success') {
					let arr = [];
					for (let i = 0; i < e.params.length; i++) {
						let item = e.params[i];
						arr.push(item.goods_id);
					}
					self.importProductsFunc(arr);
				}
			},
			importProductsFunc(list) {
				let self = this;
				let params = {
					room_id: self.room_id,
					live_id: self.live_id,
					productIds: list
				};
				LiveApi.liveAddProduct(params, true)
					.then(res => {
						if (res.code == 1) {
							ElMessage({
								message: '导入成功',
								type: 'success'
							});
							self.curPage = 1;
							self.getData();
						}
					})
					.catch(error => {});
			},
			/*删除*/
			delClick(row) {
				let self = this;
				ElMessageBox.confirm('删除后不可恢复，确认删除吗？', '提示', {
						type: 'warning'
					})
					.then(() => {
						LiveApi.deleteLiveProduct({
							live_product_id: row.live_product_id
						}).then(data => {
							ElMessage({
								message: '删除成功',
								type: 'success'
							});
							self.getData();
						});
					});
			},
		}
	};
</script>

<style scoped>
	.no-list .el-checkbox {
		display: none;
	}
</style>