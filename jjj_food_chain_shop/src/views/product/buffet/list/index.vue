<template >
    <div class="buffet-list">
        <div class="common-seach-wrap">
            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">

                <el-form-item :label="$t('商品状态')">
                    <el-select size="small" v-model="searchForm.status" :placeholder="$t('商品状态')">
                        <el-option :label="$t('全部状态')" value=""></el-option>
                        <el-option :label="$t('开启')" value="0"></el-option>
                        <el-option :label="$t('关闭')" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('自助餐名称')"><el-input size="small" v-model="searchForm.keyword"
                        :placeholder="$t('请输入自助餐名称')"></el-input></el-form-item>
                <el-form-item>
                    <el-button class="search-button" size="small" type="primary" icon="Search" @click="onSubmit">{{ $t('查询')
                    }}</el-button>
                </el-form-item>
            </el-form>
            <el-button size="small" type="primary" icon="Plus" v-auth="'/product/buffet/list/add'" @click="addClick">{{
                $t('添加商品') }}</el-button>
        </div>

                <!--内容-->
                <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="product_name" :label="$t('商品名称')" width="400px">
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
                    <el-table-column prop="category.path_name_text" :label="$t('分类')"></el-table-column>
                    <el-table-column prop="sales_actual" :label="$t('实际销量')"></el-table-column>
                    <el-table-column prop="product_stock" :label="$t('库存')"></el-table-column>
                    <el-table-column prop="product_status.text" :label="$t('状态')" width="100">
                        <template #default="scope">
                            <el-switch :disabled="!this.$filter.isAuth('/product/store/product/state')"
                                :model-value="scope.row.product_status.value == 10 ? true : false"
                                @click="undercarriage(scope.row, scope.row.product_status.value == 10 ? 20 : 10)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="$t('添加时间')"></el-table-column>
                    <el-table-column prop="product_sort" :label="$t('排序')"></el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="120">
                        <template #default="scope">
                            <el-button @click="editClick(scope.row)" type="primary" link size="small"
                                v-auth="'/product/store/product/edit'">{{ $t('编辑') }}</el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small"
                                v-auth="'/product/store/product/delete'">{{ $t('删除') }}</el-button>
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
    </div>
</template>
<script >
export default {
    data() {
        return {
            searchForm:{
                status: '',
    keyword: ''
            },
            tableData:[]
        }
    },
    methods:{
        onSubmit(){

        },

        addClick(){

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