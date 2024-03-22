<template>
    <div class="order-list">
        <!--搜索表单-->
        <div class="common-seach-wrap">

            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item :label="$t('供应商')">
                    <el-select size="small" v-model="searchForm.supplier" :placeholder="$t('全部库存')">
                        <el-option :label="$t('全部')" value=" "></el-option>
                        <el-option :label="$t('库存低于10')" value="10"></el-option>
                        <el-option :label="$t('库存低于20')" value="20"></el-option>
                        <el-option :label="$t('库存低于50')" value="50"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('采购员')">
                    <el-select size="small" v-model="searchForm.buyer" :placeholder="$t('全部库存')">
                        <el-option :label="$t('全部')" value=" "></el-option>
                        <el-option :label="$t('库存低于10')" value="10"></el-option>
                        <el-option :label="$t('库存低于20')" value="20"></el-option>
                        <el-option :label="$t('库存低于50')" value="50"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('商品状态')">
                    <el-select size="small" v-model="searchForm.status" :placeholder="$t('商品状态')">
                        <el-option :label="$t('全部')" value="all"></el-option>
                        <el-option :label="$t('上架中')" value="sell"></el-option>
                        <el-option :label="$t('下架中')" value="lower"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('采购名称/申请人')"><el-input size="small" v-model="searchForm.name" :placeholder="$t('请输入采购名称/申请人')"></el-input></el-form-item>
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
            <el-button size="small" type="primary" icon="Plus" v-auth="'/purchase/order/add'" @click="addClick">{{
                $t('添加') }}</el-button>
        </div>

        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="category.path_name_text" :label="$t('编号')"></el-table-column>
                    <el-table-column prop="category.path_name_text" :label="$t('采购方式')"></el-table-column>
                    <el-table-column prop="product_name" :label="$t('采购名称')" width="300">
                        <template #default="scope">
                            <div class="product-info">
                                <div class="pic"><img v-img-url="scope.row.image[0].file_path" alt="" /></div>
                                <div class="info">
                                    <div class="name">{{ scope.row.product_name_text }}</div>
                                    <div class="price">{{ $t('销售价：') }}{{ scope.row.product_price }}</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="category.path_name_text" :label="$t('商品数量')"></el-table-column>
                    <el-table-column prop="sales_actual" :label="$t('供应商')"></el-table-column>
                    <el-table-column prop="product_stock" :label="$t('采购员')"></el-table-column>
                    <el-table-column prop="product_stock" :label="$t('申请人')"></el-table-column>
                    <el-table-column prop="product_status.text" :label="$t('状态')" width="100">
                        <template #default="scope">
                            <el-switch :disabled="!this.$filter.isAuth('/product/store/product/state')" :model-value="scope.row.product_status.value == 10 ? true : false"
                                @click="undercarriage(scope.row, scope.row.product_status.value == 10 ? 20 : 10)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="$t('申请时间')"></el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="220">
                        <template #default="scope">
                            <el-button @click="editClick(scope.row)" type="primary" link size="small">{{ $t('查看') }}</el-button>
                            <el-button @click="editClick(scope.row)" type="primary" link size="small" v-auth="'/purchase/order/edit'">{{ $t('编辑') }}</el-button>
                            <el-button @click="editClick(scope.row)" type="primary" link size="small" v-auth="'/purchase/order/examine'">{{ $t('通过') }}</el-button>
                            <el-button @click="editClick(scope.row)" type="primary" link size="small" v-auth="'/purchase/order/examine'">{{ $t('驳回') }}</el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small" v-auth="'/purchase/order/delete'">{{ $t('删除') }}</el-button>
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
            /*搜索参数*/
            searchForm: {
                supplier: '',
                buyer: '',
                status: '',
                name: '',
                create_time: ''
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

        /*打开添加*/
        addClick() {
            this.$router.push('/purchase/order/addEdit');
        },
    },
}
</script>
<style scoped>
.common-seach-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;
}
</style>