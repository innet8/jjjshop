<template>
	<!--
    作者：luoyiming
    时间：2020-06-25
    描述：插件中心-直播-微信直播
  -->
	<div>
		<div class="d-s-c">
			<div class="ml20 flex-1 d-b-c">
				<el-button type="primary" size="small" icon="Plus" @click="addClick">创建直播</el-button>
				<el-button type="primary" size="small" icon="Plus" @click="synLive">同步直播</el-button>
				<div>自动同步：<el-switch v-model="auto_syn" @change="setSyn"></el-switch></div>
				<el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
					<el-form-item label=""><el-input v-model="searchForm.search"
							placeholder="请输入直播间名称/主播昵称"></el-input></el-form-item>
					<el-form-item><el-button type="primary" icon="Search"
							@click="onSubmit">查询</el-button></el-form-item>
				</el-form>
			</div>
		</div>

		<!--内容-->
		<div class="live-list">
			<div class="table-wrap">
				<el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
					<el-table-column prop="roomid" label="直播间ID"></el-table-column>
					<el-table-column prop="name" label="直播间名称"></el-table-column>
					<el-table-column prop="anchor_name" label="主播昵称"></el-table-column>
					<el-table-column prop="start_time_text" label="直播开始时间"></el-table-column>
					<el-table-column prop="end_time_text" label="直播结束时间"></el-table-column>
					<el-table-column prop="live_status" label="直播间状态">
						<template #default="scope">
							{{ convertStatus(scope.row.live_status) }}
						</template>
					</el-table-column>
					<el-table-column prop="is_top" label="置顶">
						<template #default="scope">
							<span v-if="scope.row.is_top == 0" class="gray">未置顶</span>
							<span v-else class="red">已置顶</span>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="200">
						<template #default="scope">
							<div class="table-buttons">
								<el-button @click="openClick(scope.row)" type="primary" link size="small">商品</el-button>
								<el-button @click="delClick(scope.row)" type="primary" link size="small">删除</el-button>
								<el-button @click="editClick(scope.row)" type="primary" link size="small">编辑</el-button>
								<el-button @click="setTop(scope.row)" type="primary" link
									size="small">{{ scope.row.is_top == 0 ? '设为置顶' : '取消置顶' }}</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!--分页-->
		<div class="pagination">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
				:current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
				:total="totalDataNumber"></el-pagination>
		</div>
		<LiveProduct v-if="open_liveProduct" :open_liveProduct="open_liveProduct" :room_id="room_id" :live_id="live_id"
			@closeDialog="closeDialogFunc($event, 'product')"></LiveProduct>
		<!--添加-->
		<Add v-if="open_add" :open_add="open_add" @closeDialog="closeDialogFunc($event, 'add')"></Add>
		<!--修改-->
		<Edit v-if="open_edit" :open_edit="open_edit" :editform="roomModel"
			@closeDialog="closeDialogFunc($event, 'edit')"></Edit>
	</div>
</template>

<script>
	import LiveApi from '@/api/live.js';
	import LiveProduct from '../part/LiveProduct.vue';
	import Add from './Add.vue';
	import Edit from './Edit.vue';
	export default {
		components: {
			LiveProduct,
			Add,
			Edit
		},
		data() {
			return {
				/*搜索表单对象*/
				searchForm: {},
				/*是否正在加载*/
				loading: true,
				/*一页多少条*/
				pageSize: 10,
				/*是否打开编辑弹窗*/
				openAdd: true,
				/*一共多少条数据*/
				totalDataNumber: 0,
				/*当前是第几页*/
				curPage: 1,
				/*列表数据*/
				tableData: [],
				open_liveProduct: false,
				room_id: 0,
				live_id: 0,
				/*是否打开添加弹窗*/
				open_add: false,
				/*是否打开编辑弹窗*/
				open_edit: false,
				/*当前编辑的对象*/
				roomModel: {},
				auto_syn: false
			};
		},
		created() {
			this.getData();
		},
		methods: {
			convertStatus(num) {
				let str = '';
				switch (num) {
					case 101:
						str = '直播中';
						break;
					case 102:
						str = '未开始';
						break;
					case 103:
						str = '已结束';
						break;
					case 104:
						str = '禁播';
						break;
					case 105:
						str = '暂停';
						break;
					case 106:
						str = '异常';
						break;
					case 107:
						str = '已过期';
						break;
				}
				return str;
			},
			/*查询*/
			onSubmit() {
				this.curPage = 1;
				this.getData();
			},

			/*选择第几页*/
			handleCurrentChange(val) {
				let self = this;
				self.curPage = val;
				self.getData();
			},

			/*每页多少条*/
			handleSizeChange(val) {
				this.pageSize = val;
				this.getData();
			},

			/*获取列表*/
			getData() {
				let self = this;
				let Params = self.searchForm;
				Params.page = self.curPage;
				Params.list_rows = self.pageSize;
				self.loading = true;
				LiveApi.getList(Params, true)
					.then(res => {
						self.tableData = res.data.list.data;
						self.totalDataNumber = res.data.list.total;
						self.auto_syn = res.data.auto_syn;
						self.loading = false;
					})
					.catch(error => {
						self.loading = false;
					});
			},

			/*直播同步*/
			synLive() {
				let self = this;
				self.loading = true;
				LiveApi.syn({}, true)
					.then(res => {
						self.loading = false;
						self.curPage = 1;
						self.getData();
					})
					.catch(error => {
						self.loading = false;
					});
			},
			/*打开添加*/
			addClick() {
				this.open_add = true;
			},

			/*打开编辑*/
			editClick(item) {
				this.roomModel = item;
				this.open_edit = true;
			},
			/*关闭弹窗*/
			closeDialogFunc(e, f) {
				if (f == 'add') {
					this.open_add = e.openDialog;
					if (e.type == 'success') {
						this.getData();
					}
				}
				if (f == 'edit') {
					this.open_edit = e.openDialog;
					if (e.type == 'success') {
						this.getData();
					}
				}
				if (f == 'product') {
					this.open_liveProduct = e.openDialog;
					if (e.type == 'success') {
						this.getData();
					}
				}
			},
			/*设置是否置顶*/
			setTop(row) {
				let self = this;
				LiveApi.settop({
					live_id: row.live_id,
					is_top: row.is_top == 0 ? 1 : 0
				}).then(data => {
					ElMessage({
						message: '置顶成功',
						type: 'success'
					});
					self.getData();
				});
			},

			/*删除*/
			delClick(row) {
				let self = this;
				ElMessageBox.confirm('删除后不可恢复，确认删除该记录吗?', '提示', {
						type: 'warning'
					})
					.then(() => {
						LiveApi.deleteRoom({
							live_id: row.live_id
						}).then(data => {
							ElMessage({
								message: '删除成功',
								type: 'success'
							});
							self.getData();
						});
					});
			},
			openClick(row) {
				this.room_id = row.roomid;
				this.live_id = row.live_id
				this.open_liveProduct = true;
			},
			/*设置是否自动同步*/
			setSyn() {
				let self = this;
				LiveApi.setSyn({
					auto_syn: self.auto_syn
				}).then(data => {
					ElMessage({
						message: '设置成功',
						type: 'success'
					});
					self.getData();
				});
			},
		}
	};
</script>

<style scoped>
	.el-message-box__message p {
		word-break: break-all;
	}
</style>