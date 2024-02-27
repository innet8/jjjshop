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
            <el-button size="small" type="primary" icon="Plus" v-auth="'/product/buffet/list/add'"
                @click="addClick">{{
                    $t('添加商品') }}</el-button>
        </div>

        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="name_text" :label="$t('自助餐名称')" width="400px">
                        <template #default="scope">
                            <div class="product-info">
                                <div class="info">
                                    <div class="name">{{ scope.row.name_text }}</div>
                                    <div class="price">{{ $t('销售价：') }}{{ scope.row.price }}</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sale_num" :label="$t('实际销量')"></el-table-column>
                    <el-table-column prop="time_limit" :label="$t('用餐时间')"></el-table-column>
                    <el-table-column prop="is_comb" :label="$t('组合')" width="100">
                        <template #default="scope">
                            <el-switch :disabled="!this.$filter.isAuth('/product/buffet/list/assembly')"
                                :model-value="scope.row.is_comb == 1 ? true : false"
                                @click="handleComb(scope.row, scope.row.is_comb == 1 ? 0 : 1)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" :label="$t('状态')" width="100">
                        <template #default="scope">
                            <el-switch :disabled="!this.$filter.isAuth('/product/buffet/list/status')"
                                :model-value="scope.row.status == 1 ? true : false"
                                @click="handleStatus(scope.row, scope.row.status == 1 ? 0 : 1)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="$t('添加时间')" width="180"></el-table-column>
                    <el-table-column prop="sort" :label="$t('排序')"></el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="120">
                        <template #default="scope">
                            <el-button @click="editClick(scope.row)" type="primary" link size="small"
                                v-auth="'/product/buffet/list/edit'">{{ $t('编辑') }}</el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small"
                                v-auth="'/product/buffet/list/delete'">{{ $t('删除') }}</el-button>
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
        <!--添加-->
        <addEdit v-if="open_dialog" :title="title" :open_dialog="open_dialog"  @closeDialog="closeDialogFunc($event)">
        </addEdit>
    </div>
</template>
<script >
import addEdit from './addEdit.vue';
import PorductApi from '@/api/product.js';
export default {
    components: { addEdit },
    data() {
        return {
            loading:false,
            searchForm: {
                status: '',
                keyword: ''
            },
            /*一页多少条*/
            pageSize: 10,
            /*一共多少条数据*/
            totalDataNumber: 0,
            /*当前是第几页*/
            curPage: 1,
            tableData: [],
            open_dialog: false,
            title: '',
        }
    },
    mounted(){
        this.getData();
    },
    methods: {
        onSubmit() {

        },

        addClick(e) {
            this.title = $t('添加自助餐');
            this.open_dialog = true;
        },

        editClick(row){
            this.title = $t('编辑自助餐')
            this.open_dialog = true;
        },

        getData() {
            let self = this;
            self.loading = true;
            let Params = {};
            Params.page = self.curPage;
            Params.list_rows = self.pageSize;
            PorductApi.getBuffetList(Params, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber = data.data.list.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //改变组合
        handleComb(e){},

        //改变状态
        handleStatus(e){
            
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
            this.curPage = 1;
            this.getData();
        },

        /*关闭弹窗*/
        closeDialogFunc(e) {
            this.open_dialog = e.openDialog;
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
.el-button--primary.is-link{
    color: var(--el-color-primary);
}
</style>