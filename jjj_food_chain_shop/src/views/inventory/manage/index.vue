<template>
    <div class="inventory-list">
        <div class="common-seach-wrap">

            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item :label="$t('排序')">
                    <el-select size="small" v-model="searchForm.buyer" :placeholder="$t('全部库存')">
                        <el-option :label="$t('全部')" value=" "></el-option>
                        <el-option :label="$t('从小到大')" value="10"></el-option>
                        <el-option :label="$t('从大到小')" value="20"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('供应商')">
                    <el-select size="small" v-model="searchForm.supplier" :placeholder="$t('全部库存')">
                        <el-option :label="$t('全部')" value=" "></el-option>
                        <el-option :label="$t('库存低于10')" value="10"></el-option>
                        <el-option :label="$t('库存低于20')" value="20"></el-option>
                        <el-option :label="$t('库存低于50')" value="50"></el-option>
                    </el-select>
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
                    <el-table-column prop="category.path_name_text" :label="$t('类型')">
                        <template #default="scope">
                            {{ scope.row.type == 10 ? $t('成品') : $t('材料') }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="product_name_text" :label="$t('商品名称')" width="300"></el-table-column>
                    <el-table-column prop="category.path_name_text" :label="$t('商品条码')"></el-table-column>
                    <el-table-column prop="sales_actual" :label="$t('规格')"></el-table-column>
                    <el-table-column prop="supplier.name" :label="$t('供应商')"></el-table-column>
                    <el-table-column prop="supplier_price" :label="$t('售价')"></el-table-column>
                    <el-table-column prop="product_stock" :label="$t('当前库存')"></el-table-column>
                    <el-table-column :label="$t('库存金额')">
                        <template #default="scope">
                            {{ Number(scope.row.supplier_price) * Number(scope.row.product_stock) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="product_stock" :label="$t('历史进货数')"></el-table-column>
                    <el-table-column prop="product_stock" :label="$t('历史销售数')"></el-table-column>
                    <el-table-column prop="update_time" :label="$t('最后变动时间')" width="160">
                        <template #default="scope">
                            <div style="line-height: 20px;">{{ scope.row.update_time.split(" ")[0] || '-' }}<br/>{{ scope.row.update_time.split(" ")[1] || '-' }}</div>
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
import InventoryApi from '@/api/inventory.js';
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
                supplier: '',
            },
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
            InventoryApi.getErpInventory(Params, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber = data.data.list.total;

                })
                .catch(error => { });
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