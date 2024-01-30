<template>
    <!--
        作者：luoyiming
        时间：2019-10-25
        描述：权限-管理员列表
    -->
    <div class="user">
        <!--添加管理员-->
        <div class="common-level-rail"><el-button size="small" type="primary" icon="Plus" @click="addClick"
                v-auth="'/auth/user/add'">{{$t('添加管理员')}}</el-button></div>

        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="shop_user_id" label="ID"></el-table-column>
                    <el-table-column prop="user_name" :label="$t('用户名')"></el-table-column>
                    <el-table-column prop="real_name" :label="$t('姓名')"></el-table-column>
                    <el-table-column prop="role.role_name" :label="$t('角色')">
                        <template #default="scope">
                            <div v-if="scope.row.is_super == 0">
                                <span class="mr10 green" v-for="(item, index) in scope.row.userRole" :key="index">{{
                                    item.role.role_name }}</span>
                            </div>
                            <div class="gray" v-if="scope.row.is_super == 1">{{ $t('超级管理员') }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="is_status" :label="$t('状态')" width="80">
                        <template #default="scope">
                            <el-switch
                                :disabled="!(scope.row.is_super < 1 || (scope.row.is_super == 1 && scope.row.user_type == 1)) || !this.$filter.isAuth('/auth/user/state')"
                                v-model="scope.row.is_status" :active-value="0" :inactive-value="1"
                                @change="isShowFunc(scope.row)" active-color="#13ce66" inactive-color="#cccccc"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" label="添加时间"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template #default="scope">
                            <el-button v-if="scope.row.is_super < 1" @click="editClick(scope.row)" type="primary" link
                                size="small" v-auth="'/auth/user/edit'">{{$t('编辑')}}</el-button>
                            <el-button
                                v-if="scope.row.is_super < 1 || (scope.row.is_super == 1 && scope.row.user_type == 1)"
                                @click="deleteClick(scope.row)" type="primary" link size="small"
                                v-auth="'/auth/user/delete'">{{$t('删除')}}</el-button>
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

        <Add :open="open_add" :roleList="roleList" @close="closeAdd"></Add>

        <Edit :open="open_edit" :roleList="roleList" :shop_user_id="curModel.shop_user_id" @close="closeEdit"></Edit>
    </div>
</template>

<script>
import AuthApi from '@/api/auth.js';
import Add from './dialog/Add.vue';
import Edit from './dialog/Edit.vue';
export default {
    components: {
        Add,
        Edit
    },
    inject: ['reload'],
    data() {
        return {
            /*是否加载完成*/
            loading: true,
            /*角色是否加载完成*/
            role_loading: true,
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
            curModel: {},
            /*角色列表*/
            roleList: []
        };
    },
    created() {
        /*获取列表*/
        this.getTableList();
    },
    methods: {
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
            AuthApi.userList(Params, true)
                .then(data => {
                    self.loading = false;
                    self.roleList = data.data.roleList;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber = data.data.list.total;
                })
                .catch(error => { });
        },

        /*打开添加*/
        addClick() {
            this.open_add = true;
        },

        /*关闭添加*/
        closeAdd(e) {
            this.open_add = false;
            if (e && e.type == 'success') {
                this.getTableList();
            }
        },

        /*打开编辑*/
        editClick(row) {
            this.curModel = row;
            this.open_edit = true;
        },

        /*关闭添加*/
        closeEdit(e) {
            this.open_edit = false;
            if (e && e.type == 'success') {
                this.getTableList();
            }
        },
        /*是否显示开关*/
        isShowFunc(e) {
            let self = this;
            AuthApi.setStatus({ shop_user_id: e.shop_user_id, status: e.is_status }, true)
                .then(data => {
                    if (data.code == 1) {
                        this.$ElMessage({
                            message: data.msg,
                            type: 'success'
                        });
                        self.getTableList();
                    }
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        /*删除*/
        deleteClick(row) {
            let self = this;
            ElMessageBox.confirm($t('删除后不可恢复，确认删除吗?'), $t('提示'), {
                confirmButtonText: $t('确定'),
                cancelButtonText: $t('取消'),
                type: 'warning'
            })
                .then(() => {
                    self.loading = true;
                    AuthApi.userDelete({
                        shop_user_id: row.shop_user_id
                    },
                        true
                    )
                        .then(data => {
                            self.loading = false;
                            if (data.code == 1) {
                                this.$ElMessage({
                                    message: $t('删除成功'),
                                    type: 'success'
                                });
                                //刷新页面
                                self.getTableList();
                            } else {
                                self.loading = false;
                            }
                        })
                        .catch(error => {
                            self.loading = false;
                        });
                })
                .catch(() => { });
        }
    }
};
</script>


