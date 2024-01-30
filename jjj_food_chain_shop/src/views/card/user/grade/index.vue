<template>
    <!--
          作者 luoyiming
          时间：2020-06-09
          描述：会员-等级管理
      -->
    <div class="user">
        <!--添加等级-->
        <div class="common-level-rail">
            <el-button size="small" type="primary" @click="addClick" icon="Plus"
                v-auth="'/card/user/grade/add'">{{ $t('添加等级') }}</el-button>
        </div>

        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="name" :label="$t('等级名称')"></el-table-column>
                    <el-table-column prop="weight" :label="$t('排序')"></el-table-column>
                    <el-table-column prop="equity" :label="$t('折扣')" >
                        <template #default="scope">
                            <span class="red fb">{{ scope.row.equity }}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" :label="$t('升级条件')">
                        <template #default="scope">
                            <div v-html="keepTextStyle(scope.row.remark)"></div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="120">
                        <template #default="scope">
                            <el-button @click="editClick(scope.row)" type="primary" link size="small"
                                v-auth="'/card/user/grade/edit'">{{ $t('编辑') }}</el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small"
                                v-if="scope.row.is_default == 0" v-auth="'/card/user/grade/delete'">{{ $t('删除') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!--分页-->
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                    :current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
                    :total="totalDataNumber">
                </el-pagination>
            </div>
        </div>

        <!--添加-->
        <Add v-if="open_add" :open_add="open_add" @closeDialog="closeDialogFunc($event, 'add')"></Add>

        <!--编辑-->
        <Edit v-if="open_edit" :open_edit="open_edit" :form="userModel" @closeDialog="closeDialogFunc($event, 'edit')">
        </Edit>
    </div>
</template>

<script>
import UserApi from '@/api/user.js';
import Edit from './Edit.vue';
import Add from './Add.vue';
import { deepClone } from '@/utils/base.js';
export default {
    components: {
        /*编辑组件*/
        Edit,
        Add
    },
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
            /*当前编辑的对象*/
            userModel: {}
        };
    },
    created() {

        /*获取列表*/
        this.getTableList();

    },
    methods: {

        /*换行*/
        keepTextStyle(val) {
            let str = val.replace(/(\\r\\n)/g, '<br/>');
            return str;
        },

        /*选择第几页*/
        handleCurrentChange(val) {
            let self = this;
            self.curPage = val;
            self.loading = true;
            self.getTableList();
        },

        /*每页多少条*/
        handleSizeChange(val) {
            this.curPage = 1;
            this.pageSize = val;
            this.getTableList();
        },

        /*获取列表*/
        getTableList() {
            let self = this;
            let Params = {};
            Params.page = self.curPage;
            Params.list_rows = self.pageSize;
            UserApi.gradelist(Params, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber = data.data.list.total
                })
                .catch(error => {

                });
        },

        /*打开添加*/
        addClick() {
            this.open_add = true;
        },

        /*打开编辑*/
        editClick(item) {
            this.userModel = deepClone(item);
            this.open_edit = true;
        },

        /*关闭弹窗*/
        closeDialogFunc(e, f) {
            if (f == 'add') {
                this.open_add = e.openDialog;
                if (e.type == 'success') {
                    this.getTableList();
                }
            }
            if (f == 'edit') {
                this.open_edit = e.openDialog;
                if (e.type == 'success') {
                    this.getTableList();
                }
            }
        },

        /*删除用户*/
        deleteClick(row) {
            let self = this;
            ElMessageBox.confirm($t('删除后不可恢复，确认删除吗?'), $t('提示'), {
                confirmButtonText: $t('确定'),
                cancelButtonText: $t('取消'),
                type: 'warning'
            }).then(() => {
                self.loading = true;
                UserApi.deletegrade({
                    grade_id: row.grade_id
                }, true)
                    .then(data => {
                        self.loading = false;
                        if (data.code == 1) {
                            this.$ElMessage({
                                message: data.msg,
                                type: 'success'
                            });
                            self.getTableList();
                        } else {
                            ElMessage.error($t('删除失败'));
                        }
                    })
                    .catch(error => {
                        self.loading = false;
                    });

            }).catch(() => {

            });
        }

    }
};
</script>


