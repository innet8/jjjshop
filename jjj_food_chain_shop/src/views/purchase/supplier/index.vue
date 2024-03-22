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
                    <el-table-column prop="product_name_text" :label="$t('供应商名称')" width="300"> </el-table-column>
                    <el-table-column prop="category.path_name_text" :label="$t('供应商地址')"></el-table-column>
                    <el-table-column prop="sales_actual" :label="$t('联系人')"></el-table-column>
                    <el-table-column prop="product_stock" :label="$t('联系电话')"></el-table-column>
                    <el-table-column prop="product_stock" :label="$t('职位')"></el-table-column>
                    <el-table-column prop="product_stock" :label="$t('采购负责人')"></el-table-column>
                    <el-table-column prop="create_time" :label="$t('时间')">
                        <template #default="scope">
                            <div>
                                添加:
                                更新:
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="220">
                        <template #default="scope">
                            <el-button @click="editClick(scope.row)" type="primary" link size="small" v-auth="'/purchase/supplier/edit'">{{ $t('编辑') }}</el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small" v-auth="'/purchase/supplier/delete'">{{ $t('删除') }}</el-button>
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
        <addEdit v-if="open_add" :open_add="open_add" @closeDialog="closeDialog"></addEdit>
    </div>
</template>
<script>
import addEdit from './addEdit.vue';
export default {
    components: {
        addEdit
    },
    data() {
        return {
            open_add: false,
            searchForm: {
                name: '',
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

        addClick() {
            this.open_add = true;
        },
        /*关闭弹窗*/
        closeDialog(e) {
            this.open_add = e.openDialog;
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