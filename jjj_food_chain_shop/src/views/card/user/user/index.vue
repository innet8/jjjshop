<template>
    <!--
          作者：luoyiming
          时间：2019-10-25
          描述：会员-用户列表
      -->
    <div class="user">
        <!--搜索表单-->
        <div class="common-seach-wrap flex">
            <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
      
                <el-form-item :label="$t('会员等级')">
                    <el-select v-model="formInline.grade_id" :placeholder="$t('选择等级')">
                        <el-option :label="$t('全部')" value="0"></el-option>
                        <el-option v-for="(item, index) in gradeList" :key="index" :label="item.name"
                            :value="item.grade_id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('昵称/手机号/ID')"><el-input v-model="formInline.keyword"
                    :placeholder="$t('请输入昵称/手机号/ID')"></el-input></el-form-item>
                <el-form-item :label="$t('注册时间')">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker v-model="formInline.reg_date" type="daterange" value-format="YYYY-MM-DD"
                        :range-separator="$t('至')" :start-placeholder="$t('开始日期')" :end-placeholder="$t('结束日期')"></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item><el-button type="primary" icon="Search" @click="onSubmit">{{ $t('查询') }}</el-button></el-form-item>

            </el-form>
            <div class="common-level-rail"> <el-button type="primary" v-auth="'/card/user/user/add'" icon="Plus" @click="addMenber">{{ $t('添加会员') }}</el-button></div>
        </div>
        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="user_id" label="ID" width="80"></el-table-column>
                    <el-table-column prop="nickName" :label="$t('昵称')"></el-table-column>

                    <el-table-column prop="gender" :label="$t('性别')">
                        <template #default="scope">
                            <span v-if="scope.row.gender == 0">{{ $t('女') }}</span>
                            <span v-else-if="scope.row.gender == 1">{{ $t('男') }}</span>
                            <span v-else>{{ $t('其他') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" :label="$t('会员卡')">
                        <template #default="scope">
                            <span v-if="scope.row.card_id == 0">-</span>
                            <span v-else>{{ scope.row.card?.card_name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" :label="$t('会员等级')">
                        <template #default="scope">
                            <span v-if="scope.row.grade_id == 0">{{ $t('无等级') }}</span>
                            <span v-else>{{ scope.row.grade.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="balance" :label="$t('余额')"></el-table-column>
                    <el-table-column prop="points" :label="$t('积分')"></el-table-column>
                    <el-table-column prop="mobile" :label="$t('手机号')"></el-table-column>
                    <el-table-column prop="birthday" :label="$t('生日')"></el-table-column>
                    <el-table-column prop="create_time" :label="$t('添加时间')" width="140"></el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="180">
                        <template #default="scope">
                            <el-button @click="editClick(scope.row)" type="primary" link size="small"
                                v-auth="'/card/user/user/edit'">{{ $t('编辑') }}</el-button>
                            <el-button @click="addClick(scope.row)" type="primary" link size="small"
                                v-auth="'/card/user/user/recharge'">{{ $t('充值') }}</el-button>
                            <!-- <el-button @click="gradeClick(scope.row)" type="primary" link size="small"
                                v-auth="'/card/user/user/grade'">会员等级</el-button> -->
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small"
                                v-auth="'/card/user/user/delete'">{{ $t('删除') }}</el-button>
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

        <!--会员充值-->
        <Recharge v-if="open_add" :open_add="open_add" :form="userModel" :gradeList="gradeList"
            @closeDialog="closeDialogFunc($event, 'add')"></Recharge>

        <!--会员等级-->
        <Grade v-if="open_edit" :open_edit="open_edit" :form="userModel" :gradeList="gradeList"
            @closeDialog="closeDialogFunc($event, 'edit')"></Grade>

        <AddEdit v-if="open_addDdit" :title="title" :editData="editData" :open="open_addDdit" :gradeList="gradeList" :editform="editform" @closeDialog="closeAddMenber">
        </AddEdit>
    </div>
</template>

<script>
import UserApi from '@/api/user.js';
import Grade from './dialog/Grade.vue';
import Recharge from './dialog/Recharge.vue';
import AddEdit from './dialog/AddEdit.vue';
export default {
    components: {   
        /*编辑组件*/
        Grade,
        Recharge,
        AddEdit,
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
                keyword: '',
                grade_id: '',
                reg_date: '',
            },
            /*是否打开添加弹窗*/
            /*是否打开编辑弹窗*/
            open_add: false,
            open_edit: false,

            open_addDdit: false,
            /*当前编辑的对象*/
            userModel: {},
            /*等级*/
            gradeList: [],
            editform: {

            },
            title: "",
            editData:'',
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
            let Params = self.formInline;
            Params.page = self.curPage;
            Params.list_rows = self.pageSize;
            UserApi.userlist(Params, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber = data.data.list.total;
                    self.gradeList = data.data.grade;
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        /*添加会员*/
        addMenber() {
            this.title = $t('添加会员')
            this.open_addDdit = true
        },
        /*关闭弹窗*/
        closeAddMenber(e) {
            this.open_addDdit = false;
            this.editData = ''
            if(e == 1){
                this.getTableList();
            }
        },

        /*搜索查询*/
        onSubmit() {
            let self = this;
            self.loading = true;
            let Params = self.formInline;
            self.getTableList();
        },

        /*打开添加*/
        addClick(item) {
            this.userModel = item;
            this.open_add = true;
        },

        /*打开编辑*/
        gradeClick(item) {
            this.userModel = item;
            this.open_edit = true;
        },

        /*打开编辑*/
        editClick(item) {
            this.title = $t('编辑会员')
           this.editData = item
           this.open_addDdit = true
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
            })
                .then(() => {
                    self.loading = true;
                    UserApi.deleteuser(
                        {
                            user_id: row.user_id
                        },
                        true
                    )
                        .then(data => {
                            self.loading = false;
                            if (data.code == 1) {
                                ElMessage({
                                    message: $t('恭喜你，用户删除成功'),
                                    type: 'success'
                                });
                                self.getTableList();
                            } else {
                                self.loading = false;
                            }
                        })
                        .catch(error => {
                            self.loading = false;
                        });
                })
                .catch(() => {
                    self.loading = false;
                });
        }
    }
};
</script>

