<template>
    <div class="log-list">
        <!--搜索表单-->
        <div class="common-seach-wrap">

            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">

                <el-form-item :label="$t('所有类型')">
                    <el-select size="small" v-model="searchForm.type" :placeholder="$t('所有类型')">
                        <el-option :label="$t('所有类型')" value="all"></el-option>
                        <el-option :label="$t('采购入库')" value="sell"></el-option>
                        <el-option :label="$t('调整入库')" value="lower"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('起始时间')">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker size="small" v-model="searchForm.create_time" type="daterange" value-format="YYYY-MM-DD" range-separator="~" :start-placeholder="$t('开始日期')"
                            :end-placeholder="$t('结束日期')"></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button class="search-button" size="small" type="primary" icon="Search" @click="onSubmit">{{ $t('查询')
                        }}</el-button>
                </el-form-item>
            </el-form>
        </div>


        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="number" :label="$t('编号')"></el-table-column>
                    <el-table-column prop="category.path_name_text" :label="$t('类型')">
                        <template #default="scope">
                            {{ typeS(scope.row.type) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="product_name" :label="$t('采购名称')" width="240">
                        <template #default="scope">
                            {{  scope.row.product ? scope.row.product.product_name_text :  scope.row.purchaseOrder.name }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="num" :label="$t('商品数量')"></el-table-column>
                    <el-table-column prop="remark" :label="$t('备注')">
                        <template #default="scope">
                            {{  scope.row.remark || '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" :label="$t('状态')" width="100">
                        <template #default="scope">
                           {{ statusJudgment(scope.row.status) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="operator.real_name" :label="$t('操作人')"></el-table-column>
                    <el-table-column prop="create_time" :label="$t('时间')"  width="120">
                        <template #default="scope">
                            <div style="line-height: 20px;">{{ scope.row.create_time.split(" ")[0] || '-' }}<br />{{ scope.row.create_time.split(" ")[1] || '-' }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="140">
                        <template #default="scope">
                            <el-button @click="cancelClick(scope.row)" type="primary" link size="small" v-auth="'/purchase/log/cancel'">{{ $t('撤销') }}</el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small" v-auth="'/purchase/log/delete'">{{ $t('删除') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--分页-->
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="curPage" :page-size="pageSize"
                layout="total, prev, pager, next, jumper" :total="totalDataNumber"></el-pagination>
        </div>
    </div>
</template>
<script>
import PurchaseApi from '@/api/purchase.js';
export default {
    data() {
        return {
            /*是否正在加载*/
            loading: false,
            /*一页多少条*/
            pageSize: 10,
            /*一共多少条数据*/
            totalDataNumber: 0,
            /*当前是第几页*/
            curPage: 1,
            /*列表数据*/
            tableData: [],
            searchForm: {
                type: 'all',
                create_time: '',
            },
            tableData: [],
        }
    },
    mounted(){
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
        /*搜索查询*/
        onSubmit() {
            this.curPage = 1;
            this.getData();
        },

        // 获取
        getData() {
            let self = this;
            let Params = {};
            Params.page = self.curPage;
            Params.list_rows = self.pageSize;
            Params.name = self.searchForm.name;
            PurchaseApi.getErpInventoryRecordIn(Params, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber = data.data.list.total;

                })
                .catch(error => { });
        },
        /*撤销*/
        cancelClick(row) {
            let self = this;
            ElMessageBox.confirm($t('确定要撤销吗?'), $t('提示'), {
                confirmButtonText: $t('确定'),
                cancelButtonText: $t('取消'),
                type: 'warning'
            })
                .then(() => {
                    self.loading = true;
                    PurchaseApi.cancelErpInventoryRecordIn({
                        erp_inventory_id: row.id
                    },
                        true
                    )
                        .then(data => {
                            self.loading = false;
                            if (data.code == 1) {
                                this.$ElMessage({
                                    message: $t('操作成功'),
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
                    PurchaseApi.deleteErpInventoryRecordIn({
                        erp_inventory_id: row.id
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

        typeS(e){
            let result = '';
            if(e == '10') return result = $t('采购入库');
            if(e == '20') return result = $t('调整入库');
            if(e == '30') return result = $t('销售出库');
            if(e == '40') return result = $t('调整出库');
        },

        statusJudgment(e){
            let result = '';
            if(e == '10') return result = $t('已入库');
            if(e == '20') return result = $t('已出库');
            if(e == '30') return result = $t('已撤销');
        },
    },
}
</script>
<style lang="scss" scoped></style>