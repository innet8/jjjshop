<template>
    <div class="log-list">
        <div class="common-seach-wrap">

            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item :label="$t('类型')">
                    <el-select size="small" v-model="searchForm.buyer" :placeholder="$t('所有类型')">
                        <el-option :label="$t('销售出库')" value="10"></el-option>
                        <el-option :label="$t('调整出库')" value="20"></el-option>
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
                    <el-table-column prop="category.path_name_text" :label="$t('编号')"></el-table-column>
                    <el-table-column prop="category.path_name_text" :label="$t('类型')"></el-table-column>
                    <el-table-column prop="product_name" :label="$t('采购/商品名称')" width="300"></el-table-column>
                    <el-table-column prop="category.path_name_text" :label="$t('商品数量')"></el-table-column>
                    <el-table-column prop="sales_actual" :label="$t('备注')"></el-table-column>
                    <el-table-column prop="product_stock" :label="$t('状态')"></el-table-column>
                    <el-table-column prop="product_stock" :label="$t('操作人')"></el-table-column>
                    <el-table-column prop="product_stock" :label="$t('时间')"></el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="220">
                        <template #default="scope">
                            <el-button @click="cancelClick(scope.row)" type="primary" link size="small" v-auth="'/inventory/log/cancel'">{{ $t('查看') }}</el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small" v-auth="'/inventory/log/delete'">{{ $t('删除') }}</el-button>
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
                buyer: '',
                create_time: '',
            },
        }
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

        /*撤销*/
        cancelClick(row) {
            let self = this;
            ElMessageBox.confirm($t('确定要撤销吗?'), $t('提示'), {
                confirmButtonText: $t('确定'),
                cancelButtonText: $t('取消'),
                type: 'warning'
            })
                .then(() => {
                    // self.loading = true;
                    // AuthApi.userDelete({
                    //     shop_user_id: row.shop_user_id
                    // },
                    //     true
                    // )
                    //     .then(data => {
                    //         self.loading = false;
                    //         if (data.code == 1) {
                    //             this.$ElMessage({
                    //                 message: $t('删除成功'),
                    //                 type: 'success'
                    //             });
                    //             //刷新页面
                    //             self.getTableList();
                    //         } else {
                    //             self.loading = false;
                    //         }
                    //     })
                    //     .catch(error => {
                    //         self.loading = false;
                    //     });
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
                    // self.loading = true;
                    // AuthApi.userDelete({
                    //     shop_user_id: row.shop_user_id
                    // },
                    //     true
                    // )
                    //     .then(data => {
                    //         self.loading = false;
                    //         if (data.code == 1) {
                    //             this.$ElMessage({
                    //                 message: $t('删除成功'),
                    //                 type: 'success'
                    //             });
                    //             //刷新页面
                    //             self.getTableList();
                    //         } else {
                    //             self.loading = false;
                    //         }
                    //     })
                    //     .catch(error => {
                    //         self.loading = false;
                    //     });
                })
                .catch(() => { });
        }
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