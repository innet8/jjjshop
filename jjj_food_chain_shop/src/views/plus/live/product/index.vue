<template>
	<!--
        作者：luoyiming
        时间：2020-07-25
        描述：插件中心-视频-视频列表
    -->
	<div class="list">
		<!--搜索表单-->
		<div class="d-s-c">
			<div class="flex-1 d-b-c">
				<el-button size="small" type="primary" icon="Plus" @click="openAdd">添加商品</el-button>
			</div>
		</div>
		<el-tabs v-model="searchForm.status" type="card" @tab-change="handleClick" style="margin-top: 18px;">
			<el-tab-pane label="待审核" :name="0">
				<template #label>
					<span>待审核</span>
				</template>
			</el-tab-pane>
			<el-tab-pane label="审核中" :name="1">
				<template #label>
					<span>审核中</span>
				</template>
			</el-tab-pane>
			<el-tab-pane label="已通过" :name="2">
				<template #label>
					<span>已通过</span>
				</template>
			</el-tab-pane>
			<el-tab-pane label="未通过" :name="3">
				<template #label>
					<span>未通过</span>
				</template>
			</el-tab-pane>
		</el-tabs>

		<!--内容-->
		<div class="product-content">
			<div class="table-wrap">
				<el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
					<el-table-column prop="goods_id" label="小程序商品Id"></el-table-column>
					<el-table-column prop="name" label="名称"></el-table-column>
					<el-table-column label="商品图片">
						<template #default="scope">
							<img :src="scope.row.cover_img" width="30" height="30" />
						</template>
					</el-table-column>
					<el-table-column prop="price_type_text" label="价格类型"></el-table-column>
					<el-table-column prop="price_text" label="价格" width="200"></el-table-column>
					<el-table-column prop="audit_status_text" label="审核状态" width="100"></el-table-column>
					<el-table-column prop="create_time" label="创建时间"></el-table-column>
					<el-table-column fixed="right" label="操作">
						<template #default="scope">
							<el-button v-if="scope.row.audit_status!=3" type="primary" link size="small"
								@click="openEdit(scope.row)">编辑</el-button>
							<el-button type="primary" link size="small" @click="delClick(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<!--分页-->
			<div class="pagination">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
					:current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
					:total="totalDataNumber"></el-pagination>
			</div>
		</div>
		<Add :open_add="open_add" :productId="wx_product_id" @closeDialog="closeDialogFunc($event, 'add')"></Add>
		<Edit :open_edit="open_edit" :editform="productModel" @closeDialog="closeDialogFunc($event, 'edit')"></Edit>
	</div>
</template>

<script>
	import LiveApi from '@/api/live.js';
	import Add from './add.vue';
	import Edit from './edit.vue';
	export default {
		components: {
			Add,
			Edit
		},
		inject: ['reload'],
		data() {
			return {
				open_add: false,
				open_edit: false,
				/*是否加载完成*/
				loading: false,
				/*列表数据*/
				tableData: [],
				/*一页多少条*/
				pageSize: 20,
				/*一共多少条数据*/
				totalDataNumber: 0,
				/*当前是第几页*/
				curPage: 1,
				/*是否打开添加页面*/
				open_audit: false,
				/*编辑对象*/
				wx_product_id: 0,
				/*横向表单数据模型*/
				searchForm: {
					status: 0
				},
				/*当前编辑的对象*/
				productModel: {},
			};
		},
		created() {
			/*获取列表*/
			this.getTableList();
		},
		methods: {
			openAdd() {
				this.open_add = true;
			},

			openEdit(row) {
				this.productModel = row;
				this.open_edit = true;
			},

			/*选择第几页*/
			handleCurrentChange(val) {
				let self = this;
				self.curPage = val;
				self.getTableList();
			},

			/*每页多少条*/
			handleSizeChange(val) {
				this.curPage = 1;
				this.pageSize = val;
				this.getTableList();
			},

			/*切换菜单*/
			handleClick(tab) {
				let self = this;
				self.curPage = 1;
				self.searchForm.status = tab;
				self.getTableList();
			},

			delClick: function(row) {
				let self = this;
				let msg = '删除后不可恢复，确认删除该记录吗?';
				ElMessageBox.confirm(msg, '提示', {
						type: 'warning'
					})
					.then(() => {
						LiveApi.deleteProduct({
							wx_product_id: row.wx_product_id
						}).then(data => {
							ElMessage({
								message: '删除成功',
								type: 'success'
							});
							self.getTableList();
						});
					});
			},

			/*获取列表*/
			getTableList() {
				let self = this;
				let Params = self.searchForm;
				Params.page = self.curPage;
				Params.list_rows = self.pageSize;
				self.loading = true;
				LiveApi.productList(Params, true)
					.then(res => {
						self.loading = false;
						self.tableData = res.data.list.data;
						self.totalDataNumber = res.data.list.total;
					})
					.catch(error => {
						self.loading = false;
					});
			},
			/*关闭弹窗*/
			closeDialogFunc(e, f) {
				if (f == 'add') {
					this.open_add = e.openDialog;
					if (e.type == 'success') {
						this.getTableList();
					}
				}
				if (f == 'edit') {
					this.open_edit = e.openDialog;
					if (e.type == 'success') {
						this.getTableList();
					}
				}
			},
		}
	};
</script>

<style></style>