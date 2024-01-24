<template >
    <div class="product">
        <div class="common-level-rail">
            <el-button size="small" type="primary" @click="addClick" icon="Plus" v-auth="'/product/store/feature/add'">{{
                $t('添加分类') }}</el-button>
        </div>
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" row-key="category_id" default-expand-all
                    :tree-props="{ children: 'child' }" style="width: 100%" v-loading="loading">
                    <el-table-column prop="name_text" :label="$t('分类名称')" ></el-table-column>

                    <el-table-column prop="sort" :label="$t('状态')">
                        <template #default="scope">
                            <el-switch :disabled="!this.$filter.isAuth('/product/store/feature/state')" v-model="scope.row.status" :active-value="1" :inactive-value="0"
                                @change="statusSet($event, scope.row.category_id)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="$t('添加时间')"></el-table-column>
                    <el-table-column prop="sort" :label="$t('排序')"></el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="120">
                        <template #default="scope">
                            <el-button @click="editClick(scope.row)" type="primary" link size="small"
                                v-auth="'/product/store/feature/edit'">{{ $t('编辑') }}</el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small"
                                v-auth="'/product/store/feature/delete'">{{ $t('删除') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--添加-->
            <Add v-if="open_add" :open_add="open_add" :addform="categoryModel"
                @closeDialog="closeDialogFunc($event, 'add')">
            </Add>
            <!--修改-->
            <Edit v-if="open_edit" :open_edit="open_edit" :editform="categoryModel"
                @closeDialog="closeDialogFunc($event, 'edit')"></Edit>

        </div>
    </div>
</template>
<script>
import PorductApi from '@/api/product.js';
import Edit from './Edit.vue';
import Add from './Add.vue';
export default {
    components: {
        Edit,
        Add,
    },
    data() {
        return {
            loading: false,
            open_add: false,
            open_edit: false,
            categoryModel: {
                catList: [],
                model: {}
            },
            tableData:[],
        };
    },
    created() {
        /*获取列表*/
        this.getData();
    },
    methods: {
        /*打开添加*/
        addClick() {
            this.open_add = true;
        },

        /*打开编辑*/
        editClick(item) {
            this.categoryModel.model = item;
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
        },
        getData() {
            let self = this;
            self.loading = true;
            PorductApi.storeCatSP({}, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list;
                    self.categoryModel.catList = self.tableData;
                })
                .catch(error => {
                    self.loading = false;
                });
        },

        /*删除分类*/
        deleteClick(row) {
            let self = this;
            ElMessageBox.confirm($t('删除后不可恢复，确认删除该记录吗?'), $t('提示'), {
                type: 'warning'
            }).then(() => {
                PorductApi.storeCatDel({
                    category_id: row.category_id
                }).then(data => {
                    ElMessage({
                        message:$t('删除成功'),
                        type: 'success'
                    });
                    self.getData();
                });
            });
        },

        // 状态设置
        statusSet(e, id) {
            PorductApi.storeCatSet({
                category_id: id,
                status: e
            }).then(data => {
                ElMessage({
                    message: data.msg,
                    type: 'success'
                });
            });
        },

        statusSet(e, id) {
            let self = this;
            PorductApi.storeCatSet({
                category_id: id,
                status: e
            }).then(data => {
                ElMessage({
                    message: data.msg,
                    type: 'success'
                });
            });
        },
    },
}
</script>

<style scoped>
.common-level-rail{
    text-align: right;
}
</style>
