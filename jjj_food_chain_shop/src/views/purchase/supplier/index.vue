<template>
    <div class="supplier-list">
        <!--搜索表单-->
        <div class="common-seach-wrap">
            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item :label="$t('采购名称/申请人')"><el-input size="small" v-model="searchForm.name" :placeholder="$t('供应商名称')"></el-input></el-form-item>
                <el-form-item>
                    <el-button class="search-button" size="small" type="primary" icon="Search" @click="onSubmit">{{ $t('查询')
                        }}</el-button>
                </el-form-item>
            </el-form>
            <el-button size="small" type="primary" icon="Plus" v-auth="'/purchase/supplier/add'" @click="addClick">{{ $t('添加') }}</el-button>
        </div>
        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="name" :label="$t('供应商名称')" width="200"> </el-table-column>
                    <el-table-column prop="address" :label="$t('供应商地址')"></el-table-column>
                    <el-table-column prop="contact_person" :label="$t('联系人')"></el-table-column>
                    <el-table-column prop="contact_phone" :label="$t('联系电话')"></el-table-column>
                    <el-table-column prop="position" :label="$t('职位')"></el-table-column>
                    <el-table-column prop="purchaser.real_name" :label="$t('采购负责人')"></el-table-column>
                    <el-table-column prop="create_time" :label="$t('时间')" width="220">
                        <template #default="scope">
                            <div>
                                <p>{{ $t('添加') + ':' + scope.row.create_time }}</p>
                                <p>{{ $t('更新') + ':' + scope.row.update_time }}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="120">
                        <template #default="scope">
                            <el-button @click="editClick(scope.row)" type="primary" link size="small" v-auth="'/purchase/supplier/edit'">{{ $t('编辑') }}</el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small" v-auth="'/purchase/supplier/delete'">{{ $t('删除') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--分页-->
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="curPage" :page-size="pageSize"
                    layout="total, prev, pager, next, jumper" :total="totalDataNumber"></el-pagination>
            </div>
        </div>

        <addEdit v-if="open_add" :open_add="open_add" @closeDialog="closeDialog" :title="title" :editData="editData"></addEdit>
    </div>
</template>
<script>
import addEdit from './addEdit.vue';
import PurchaseApi from '@/api/purchase.js';
export default {
    components: {
        addEdit
    },
    data() {
        return {
            /*是否加载完成*/
            loading: true,
            /*当前是第几页*/
            curPage: 1,
            /*一页多少条*/
            pageSize: 20,
            /*一共多少条数据*/
            totalDataNumber: 0,
            open_add: false,
            searchForm: {
                name: '',
            },
            tableData: [],
            editData: null,
            title: null,
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        /*选择第几页*/
        handleCurrentChange(val) {
            let self = this;
            self.loading = true;
            self.curPage = val;
            self.getData();
        },

        /*每页多少条*/
        handleSizeChange(val) {
            this.pageSize = val;
            this.getData();
        },

        getData() {
            let self = this;
            let Params = {};
            Params.page = self.curPage;
            Params.list_rows = self.pageSize;
            Params.name = self.searchForm.name;
            PurchaseApi.supplierList(Params, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber =  data.data.list.total;

                })
                .catch(error => { });
        },

        /*搜索查询*/
        onSubmit() {
            this.curPage = 1;
            this.getData();
        },
        /*添加*/
        addClick() {
            this.title = $t('添加供应商');
            this.open_add = true;
        },
        /*编辑*/
        editClick(row) {
            this.editData = row;
            this.title = $t('编辑供应商');
            this.open_add = true;
        },

        /*删除*/
        deleteClick(row) {
            let self = this;
            ElMessageBox.confirm($t('删除后不可恢复，确认删除吗?'), $t('提示'), {
                confirmButtonText: $t('确定'),
                cancelButtonText: $t('取消'),
                type: 'warning'
            })
                .then(() => {
                    self.loading = true;
                    PurchaseApi.supplierdDelete({
                        erp_supplier_id: row.id
                    },
                        true
                    )
                        .then(data => {
                            self.loading = false;
                            if (data.code == 1) {
                                this.$ElMessage({
                                    message: $t('删除成功'),
                                    type: 'success'
                                });
                                //刷新页面
                                self.getData();
                            } else {
                                self.loading = false;
                            }
                        })
                        .catch(error => {
                            self.loading = false;
                        });
                })
                .catch(() => { });
        },
        /*关闭弹窗*/
        closeDialog(e) {
            this.open_add = e.openDialog;
            this.editData = null;
            if (e.type == 'success') {
                this.getData();
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.common-seach-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;
}
</style>