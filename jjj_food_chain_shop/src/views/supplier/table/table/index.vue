<template>
    <!--
    	作者：wangxw
    	时间：2019-10-26
    	描述：产品分类管理
    -->
    <div class="product">
        <!--添加产品分类-->
        <div class="common-level-rail flex">
            <el-form size="small" :inline="true" :model="form" class="demo-form-inline d-s-c">
                <el-form-item :label="$t('桌位名称')">
                    <el-input v-model="form.search" autocomplete="off" :placeholder="$t('桌位名称')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('选择区域')">
                    <el-select size="small" v-model="form.area_id" :placeholder="$t('请选择')">
                        <el-option :label="$t('全部')" value=""></el-option>
                        <el-option v-for="(item, index) in area_list" :key="index" :label="item.area_name"
                            :value="item.area_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('选择类型')">
                    <el-select size="small" v-model="form.type_id" :placeholder="$t('请选择')">
                        <el-option :label="$t('全部')" value=""></el-option>
                        <el-option v-for="(item, index) in type_list" :key="index" :label="item.type_name"
                            :value="item.type_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="search-button" type="primary" icon="Search" @click="onSubmit">{{ $t('查询') }}</el-button>
                </el-form-item>
            </el-form>
            <el-button size="small" type="primary" @click="addClick" icon="Plus" v-auth="'/supplier/table/table/add'">
                {{ $t('添加桌位') }}</el-button>
        </div>
        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" style="width: 100%" v-loading="loading">
                    <el-table-column prop="table_id" label="ID"></el-table-column>
                    <el-table-column prop="area_name" :label="$t('所属区域')"></el-table-column>
                    <el-table-column prop="type_name" :label="$t('所属类型')"></el-table-column>
                    <el-table-column prop="table_no" :label="$t('人数区间')">
                        <template #default="scope">
                            {{ scope.row.min_num }}-{{ scope.row.max_num }}人
                        </template>
                    </el-table-column>
                    <el-table-column prop="table_no" :label="$t('桌位名称')"></el-table-column>
                    <el-table-column prop="sort" :label="$t('排序')"></el-table-column>
                    <el-table-column prop="create_time" :label="$t('添加时间')"></el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="190">
                        <template #default="scope">
                            <!-- <el-button @click="qrcode(scope.row)" type="primary" link size="small"
                                v-auth="'/supplier/table/table/edit'">
                                {{ $t('二维码') }}</el-button> -->
                            <el-button @click="editClick(scope.row)" type="primary" link size="small"
                                v-auth="'/supplier/table/table/edit'">{{ $t('编辑') }}
                            </el-button>
                            <el-button :disabled="scope.row.is_bind == 0" @click="untieClick(scope.row)" type="primary" link size="small"
                                v-auth="'/supplier/table/table/untie'">{{ $t('解绑') }}
                            </el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" :disabled="scope.row.status == 30" link size="small"
                                v-auth="'/supplier/table/table/delete'">
                                {{ $t('删除') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--添加-->
        <Add v-if="open_add" :open_add="open_add" :type='type_list' :area_list="area_list" :addform="categoryModel"
            @closeDialog="closeDialogFunc($event, 'add')">
        </Add>
        <!--修改-->
        <Edit v-if="open_edit" :open_edit="open_edit" :editform="categoryModel" :type='type_list' :area_list="area_list"
            @closeDialog="closeDialogFunc($event, 'edit')"></Edit>
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
                :total="totalDataNumber"></el-pagination>
        </div>
        <Qrcode :open='isqrcode' :code_id='code_id' @close="closeQrcode"></Qrcode>
    </div>
</template>

<script>
import StoreApi from '@/api/store.js';
import Add from './add.vue';
import Edit from './edit.vue';
import qs from 'qs';
import Qrcode from './dialog/Qrcode.vue';
export default {
    components: {
        Add,
        Edit,
        Qrcode
    },
    data() {
        return {
            /*是否加载完成*/
            loading: true,
            /*列表数据*/
            tableData: [],
            /*是否打开添加弹窗*/
            open_add: false,
            /*是否打开编辑弹窗*/
            open_edit: false,
            /*当前编辑的对象*/
            categoryModel: {
                model: ''
            },
            form: {
                search: '',
                area_id: '',
                type_id: ''
            },
            type_list: [],
            area_list: [],
            source: 'wx',
            /*一页多少条*/
            pageSize: 20,
            /*一共多少条数据*/
            totalDataNumber: 0,
            /*当前是第几页*/
            curPage: 1,
            isqrcode: false,
            code_id: ''
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
            self.loading = true;
            let params = self.form
            params.page = self.curPage;
            params.list_rows = self.pageSize;
            StoreApi.tablelist(params, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber = data.data.list.total;
                    self.type_list = data.data.type_list;
                    self.area_list = data.data.area_list;
                    self.categoryModel = data.data.list.data;
                })
                .catch(error => {
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
        /*解除绑定*/
        untieClick(row) {
            let self = this;
            ElMessageBox.confirm($t('确定解除与平板设备的绑定关系吗？'), $t('提示'), {
                type: 'warning'
            }).then(() => {
                StoreApi.unbindTable({
                    table_id: row.table_id
                }).then(data => {
                    this.$ElMessage({
                        message: $t('操作成功'),
                        type: 'success'
                    });
                    self.getData();
                });
            });
        },
        /*删除*/
        deleteClick(row) {
            let self = this;
            ElMessageBox.confirm($t('删除后不可恢复，确认删除吗？'), $t('提示'), {
                type: 'warning'
            }).then(() => {
                StoreApi.deleteTable({
                    table_id: row.table_id
                }).then(data => {
                    this.$ElMessage({
                        message: $t('删除成功'),
                        type: 'success'
                    });
                    self.getData();
                });
            });
        },
        qrcode(row) {
            let self = this;
            self.code_id = row.table_id;
            self.isqrcode = true;
        },
        closeQrcode() {
            let self = this;
            self.isqrcode = false;
        },
        onSubmit() {
            this.curPage = 1;
            this.getData();
        }
    }
};
</script>

