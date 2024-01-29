<template>
    <!--
      作者 luoyiming
      时间：2019-10-26
      描述：设置-打印机管理
  -->
    <div class="user">

        <!--添加等级-->
        <div class="common-level-rail"><el-button size="small" type="primary" @click="addClick"
                v-auth="'/supplier/printing/dishes/add'">{{ $t('添加') }}</el-button></div>

        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="name" :label="$t('名称')"></el-table-column>
                    <el-table-column prop="printer.printer_name" :label="$t('打印机')"></el-table-column>
                    <el-table-column prop="product_type" :label="$t('打印模式')">
                        <template #default="scope">
                            <div>{{ scope.row.print_type == 10 ? $t('付款打印') : $t('送厨打印') }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="print_method" :label="$t('打印方式')">
                        <template #default="scope">
                            <div v-if="scope.row.print_method == 10">{{ $t('整单打印') }}</div>
                            <div v-if="scope.row.print_method == 20">{{ $t('按商品分类打印') }}</div>
                            <div v-if="scope.row.print_method == 30">{{ $t('按标签打印') }}</div>
                            <div v-if="scope.row.print_method == 40">{{ $t('按一菜一单打印') }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="is_open" :label="$t('状态')">
                        <template #default="scope">
                            <!-- <div>{{ scope.row.is_open == 0 ? $t('关闭') : $t('开启') }}</div> -->
                            <el-switch :disabled="!this.$filter.isAuth('/supplier/printing/dishes/state')" :model-value="scope.row.is_open" :active-value="1" :inactive-value="0"
                                @click="changeStatus(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" :label="$t('添加时间')"></el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="120">
                        <template #default="scope">
                            <el-button @click="editClick(scope.row)" type="primary" link size="small"
                                v-auth="'/supplier/printing/dishes/edit'">{{ $t('编辑') }}</el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small"
                                v-auth="'/supplier/printing/dishes/delete'">{{ $t('删除') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!--分页-->
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                    :current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
                    :total="totalDataNumber"></el-pagination>
            </div>
        </div>

        <Add v-if="open_add" :open_add="open_add" @close="(e) => { open_add = false; if (e == 1) { this.getData(); } }">
        </Add>
        <Edit v-if="open_edit" :open_edit="open_edit" :editId="editId"
            @close="(e) => { open_edit = false; if (e == 1) { this.getData(); } }"></Edit>
    </div>
</template>

<script>
import SupplierApi from '@/api/supplier.js';
import Add from './add.vue';
import Edit from './edit.vue'
export default {
    components: { Add, Edit },
    data() {
        return {
            /*是否加载完成*/
            loading: true,
            /*列表数据*/
            tableData: [],
            /*一页多少条*/
            pageSize: 20,
            /*一共多少条数据*/
            totalDataNumber: 0,
            /*当前是第几页*/
            curPage: 1,
            /*横向表单数据模型*/
            formInline: {
                user: '',
                region: ''
            },
            /*是否打开添加弹窗*/
            open_add: false,
            /*是否打开编辑弹窗*/
            open_edit: false,
            editId: 0,
            /*当前编辑的对象*/
            userModel: {}
        };
    },
    created() {
        /*获取列表*/
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
            this.curPage = 1;
            this.pageSize = val;
            this.getData();
        },

        /*获取列表*/
        getData() {
            let self = this;
            let Params = {};
            Params.page = self.curPage;
            Params.list_rows = self.pageSize;
            SupplierApi.printingList(Params, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber = data.data.list.total;
                })
                .catch(error => { });
        },
        /*打开添加*/
        addClick() {
            this.open_add = true
        },

        /*打开编辑*/
        editClick(item) {
            this.editId = item.id
            this.open_edit = true

        },

        /*删除用户*/
        deleteClick(row) {
            let self = this;
            ElMessageBox.confirm($t('删除后不可恢复，确认删除吗?'), $t('提示'), {
                confirmButtonText: $t('确定'),
                cancelButtonText: $t('取消'),
                type: 'warning'
            })
                .then(() => {
                    self.loading = true;
                    SupplierApi.deletePrinting(
                        {
                            id: row.id
                        },
                        true
                    )
                        .then(data => {
                            self.loading = false;
                            ElMessage({
                                message: data.msg,
                                type: 'success'
                            });
                            self.getData();
                        })
                        .catch(error => {
                            self.loading = false;
                        });
                })
                .catch(() => {
                    self.loading = false;
                });
        },
        changeStatus(row) {
            let self = this;
            let params = {
                id: row.id,
                status: row.is_open == 1 ? 0 : 1,
            }
            let text = ''
            text = row.is_open == 1 ? $t('禁用') : $t('启用');
            ElMessageBox.confirm( $t("确定")+ text + $t("这个商品打印?"),  $t("提示"), {
                confirmButtonText: $t("确定"),
                cancelButtonText: $t("取消"),
                type: "warning",
            })
                .then(() => {
                    self.loading = true;
                    SupplierApi.setStatus(params, true)
                        .then(data => {
                            self.loading = false;
                            self.getData();
                        })
                        .catch(error => {
                            self.loading = false;
                        });
                })
                .catch(() => { });
        },
    }
};
</script>


