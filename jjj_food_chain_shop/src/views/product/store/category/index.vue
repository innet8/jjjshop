<template>
    <div class="product">
        <!--搜索表单-->
        <div class="common-seach-wrap">
            <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item :label="$t('分类名称')"><el-input size="small" v-model="searchForm.name"
                        :placeholder="$t('请输入分类名称')"></el-input></el-form-item>
                <el-form-item>
                    <el-button class="search-button" size="small" type="primary" icon="Search" @click="onSubmit">{{ $t('查询') }}</el-button>
                </el-form-item>
            </el-form>
            <el-button size="small" type="primary" @click="addClick" icon="Plus" v-auth="'/product/store/category/add'">{{ $t('添加分类') }}</el-button>
        </div>
        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" row-key="category_id" default-expand-all
                    :tree-props="{ children: 'child' }" style="width: 100%" v-loading="loading">
                    <el-table-column prop="name_text" :label="$t('分类名称')" ></el-table-column>
                    <el-table-column prop="name_text" :label="$t('分类级别')" >
                        <template #default="scope">
                            <p v-if="scope.row.parent_id == 0">{{ $t('一级分类') }}</p>
                            <p v-else>{{ $t('二级分类') }}</p>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="" :label="$t('图片')" width="180">
                        <template #default="scope">
                            <img v-if="scope.row.images" v-img-url="scope.row.images.file_path" alt="" width="50" />
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="sort" :label="$t('分类排序')"></el-table-column>
                    <el-table-column prop="sort" :label="$t('状态')">
                        <template #default="scope">
                            <el-switch :disabled="!this.$filter.isAuth('/product/store/category/state')" v-model="scope.row.status" :active-value="1" :inactive-value="0"
                                @change="statusSet($event, scope.row.category_id)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="$t('添加时间')"></el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="120">
                        <template #default="scope">
                            <el-button @click="editClick(scope.row)" type="primary" link size="small"
                                v-auth="'/product/store/category/edit'">{{ $t('编辑') }}</el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small"
                                v-auth="'/product/store/category/delete'">{{ $t('删除') }}</el-button>
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
        <Add v-if="open_add" :open_add="open_add" :addform="categoryModel" @closeDialog="closeDialogFunc($event, 'add')">
        </Add>
        <!--修改-->
        <Edit v-if="open_edit" :open_edit="open_edit" :editform="categoryModel"
            @closeDialog="closeDialogFunc($event, 'edit')"></Edit>

    </div>
</template>

<script>
import PorductApi from '@/api/product.js';
import Add from './Add.vue';
import Edit from './Edit.vue';
export default {
    components: {
        Add,
        Edit
    },
    data() {
        return {
            /*是否加载完成*/
            loading: true,
            activeName: 'first',
            /*是否正在加载*/
            loading: true,
            /*一页多少条*/
            pageSize: 10,
            /*一共多少条数据*/
            totalDataNumber: 0,
            /*当前是第几页*/
            curPage: 1,
            /*列表数据*/
            tableData: [],
            /*是否打开添加弹窗*/
            open_add: false,
            /*是否打开编辑弹窗*/
            open_edit: false,
            /*当前编辑的对象*/
            categoryModel: {
                catList: [],
                model: {}
            },
            searchForm: {
                name: '',
            },
        };
    },
    created() {
        /*获取列表*/
        this.getData();
    },
    methods: {
        /*选择第几页*/
        handleCurrentChange(val) {
            this.loading = true;
            this.curPage = val;
            this.getData();
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
        
        /*切换菜单*/
        handleClick() {
            this.curPage = 1;
            this.getData();
        },
        
        /*获取列表*/
        getData() {
            let self = this;
            self.loading = true;
            PorductApi.storeCatList({
                name: self.searchForm.name,
                page: self.curPage,
                list_rows: self.pageSize,
            }, true).then(data => {
                self.loading = false;
                self.tableData = data.data.list.data || data.data.data || [];
                self.categoryModel.catList = self.tableData;
                self.totalDataNumber = data.data.list.total || 0;
            }).catch(error => {
                self.loading = false;
            });
        },
        /*打开添加*/
        addClick() {
            this.open_add = true;
        },

        /*打开编辑*/
        editClick(item) {
            this.categoryModel.model = item;
            this.open_edit = true;
        },

        // 状态设置
        statusSet(e, id) {
            PorductApi.storeCatSet({
                category_id: id,
                status: e
            }).then(data => {
                this.$ElMessage({
                    message: data.msg,
                    type: 'success'
                });
            });
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
        },
        /*删除分类*/
        deleteClick(row) {
            let self = this;
            ElMessageBox.confirm($t('删除后不可恢复，确认删除吗?'), $t('提示'), {
                type: 'warning'
            }).then(() => {
                PorductApi.storeCatDel({
                    category_id: row.category_id
                }).then(data => {
                    this.$ElMessage({
                        message: $t('删除成功'),
                        type: 'success'
                    });
                    self.getData();
                });
            });
        },
    }
};
</script>

<style scoped>
    .common-seach-wrap {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0;
    }
</style>