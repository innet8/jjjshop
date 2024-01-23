<template>
    <!--
          作者 luoyiming
          时间：2020-06-09
          描述：会员-等级管理
      -->
    <div class="user">
        <!--添加等级-->
        <div class="common-level-rail">
            <el-button size="small" type="primary" @click="addClick" icon="Plus" v-auth="'/card/card/add'">{{ $t('添加会员卡') }}
            </el-button>
        </div>
        <!--搜索表单-->
        <div class="common-seach-wrap">
            <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item :label="$t('状态')">
                    <el-select v-model="formInline.status" :placeholder="$t('请选择')">
                        <el-option :label="$t('全部')" :value="-1"></el-option>
                        <el-option :label="$t('启用')" :value="0"></el-option>
                        <el-option :label="$t('关闭')" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('会员卡名称')">
                    <el-input v-model="formInline.card_name" :placeholder="$t('请输入会员卡名称')"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" icon="Search" @click="onSubmit">{{ $t('查询') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--内容-->
        <div class="product-content">
            <div class="table-wrap">
                <el-table size="small" :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="card_id" label="ID"></el-table-column>
                    <el-table-column prop="card_name" :label="$t('会员卡名称')"></el-table-column>
                    <el-table-column prop="expire" :label="$t('有效期')">
                        <template #default="scope">
                            <span v-if="scope.row.expire > 0">{{ scope.row.expire }}月</span>
                            <span v-else>{{ $t('永久有效') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="money" :label="$t('价格')"></el-table-column>
                    <el-table-column prop="discount" :label="$t('折扣')">
                        <template #default="scope">
                            <span v-if="scope.row.is_discount > 0">{{ Number(scope.row.discount || 0) }}折</span>
                            <span v-else>{{ $t('无') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="stock" :label="$t('领取数量')">
                        <template #default="scope">
                            <span>{{ scope.row.receive_num }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" :label="$t('状态')">
                        <template #default="scope">
                            <el-switch :disabled="!this.$filter.isAuth('/card/card/state')" :model-value="scope.row.status == 0 ? true : false" @click="handleChange(scope.row)"
                                :loading="loading" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="sort" :label="$t('排序')"></el-table-column>
                    <el-table-column prop="create_time" :label="$t('添加时间')"></el-table-column>
                    <el-table-column fixed="right" :label="$t('操作')" width="200">
                        <template #default="scope">
                            <el-button @click="putClick(scope.row)" type="primary" link size="small"
                                v-auth="'/card/card/put'" v-if="scope.row.type_id != 3">{{ $t('发卡') }}</el-button>
                            <el-button @click="editClick(scope.row)" type="primary" link size="small"
                                v-auth="'/card/card/edit'">{{ $t('编辑') }}
                            </el-button>
                            <el-button @click="deleteClick(scope.row)" type="primary" link size="small"
                                v-auth="'/card/card/delete'">{{ $t('删除') }}
                            </el-button>
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
        <!--发卡-->
        <Put v-if="open_edit" :open_edit="open_edit" :form="userModel" @closeDialog="closeDialogFunc($event, 'edit')"></Put>
    </div>
</template>

<script>
import CardApi from '@/api/card.js';
import Put from '../dialog/put.vue';

export default {
    components: {
        Put
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
                card_name: '',
                status: -1
            },
            /*是否打开编辑弹窗*/
            open_edit: false,
            /*当前编辑的对象*/
            userModel: {},
        };
    },
    created() {
        /*获取列表*/
        this.getTableList();
    },
    methods: {
        handleChange(row) {
            let self = this;
            let war = $t('禁用')
            if (row.status == 1) {
                war = $t('启用')
            }
            ElMessageBox.confirm($t("确认要") + war + $t("吗?"), $t('提示'), {type: 'warning' }).then(() => {
                    self.loading = true
                    let Params = {}
                    
                    Params.card_id = row.card_id,
                        CardApi.setStatus(Params, true)
                            .then(data => {
                                ElMessage({
                                    message: war + $t('成功'),
                                    type: 'success'
                                });
                                self.loading = false
                                self.getTableList();
                            })
                            .catch(error => {
                                console.log(error)
                                self.loading = false
                            });
                })
        },

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
            let Params = self.formInline;
            Params.page = self.curPage;
            Params.list_rows = self.pageSize;
            CardApi.cardlist(Params, true)
                .then(data => {
                    self.loading = false;
                    self.tableData = data.data.list.data;
                    self.totalDataNumber = data.data.list.total;
                })
                .catch(error => {

                });
        },
        /*搜索查询*/
        onSubmit() {
            let self = this;
            self.loading = true;
            self.curPage = 1;
            self.getTableList();
        },
        /*打开添加*/
        addClick() {
            this.$router.push('/card/card/add');
        },
        /*打开编辑*/
        editClick(item) {
            this.$router.push({
                path: '/card/card/edit',
                query: {
                    card_id: item.card_id,
                }
            });
        },
        /*打开编辑*/
        putClick(item) {
            this.userModel = item;
            this.open_edit = true;
        },

        /*关闭弹窗*/
        closeDialogFunc(e, f) {
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
            ElMessageBox.confirm($t('此操作将永久删除该记录, 是否继续?'), $t('提示'), {
                confirmButtonText: $t('确定'),
                cancelButtonText: $t('取消'),
                type: 'warning'
            }).then(() => {
                self.loading = true;
                CardApi.deletecard({
                    card_id: row.card_id
                }, true)
                    .then(data => {
                        self.loading = false;
                        if (data.code == 1) {
                            ElMessage({
                                message: data.msg,
                                type: 'success'
                            });
                            self.getTableList();
                        } else {
                            ElMessage.error($t('操作失败'));
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


