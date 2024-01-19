<template>
    <!--
      作者：luoyiming
      时间：2019-10-25
      描述：会员-用户列表-会员等级
  -->
    <el-dialog title="会员等级" v-model="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
        :close-on-press-escape="false" :modal-append-to-body="false" width='600px'>
        <el-form size="small" :model="form" label-position="top">
            <el-form-item>
                <div class="d-c-s">
                    <el-card class="box-card mr10">
                        <div class="d-b-s">
                            <div class="fb mr10">{{ $t('会员卡名称') }}</div>
                            <div class="text item">
                                <div>{{ form.card.card_name }}</div>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="box-card">
                        <div class="d-b-s">
                            <div class="fb mr10">{{ $t('会员卡信息') }}</div>
                            <div class="text item">
                                <div> {{ $t('卡ID:') }}{{ form.card.card_id }}</div>
                                <div>:{{ $t('有效期') }}
                                    <span v-if="form.expire_time > 0">{{ form.expire_time_text }}</span>
                                    <span v-else>{{ $t('永久有效') }}</span>
                                </div>
                                <div>{{ $t('折扣:') }} <span v-if="form.card.is_discount > 0">{{ form.card.discount }}{{ $t('折')
                                }}</span>
                                    <span v-else>{{ $t('无') }}</span>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>

            </el-form-item>
            <el-form-item class="d-c-c">
                <div class="d-c-c">
                    {{ $t('选择日期：') }}
                    <el-date-picker v-model="expire_time" type="date" :placeholder="$t('选择日期')"
                        :picker-options="pickerOptions" format="YYYY-MM-DD" value-format="YYYY-MM-DD">
                    </el-date-picker>
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible">{{ $t('取消') }}</el-button>
                <el-button type="primary" @click="editUser" :loading="loading">{{ $t('确定') }}</el-button>
            </div>
        </template>
        <!--选择用户-->
        <GetUser :is_open="open_getuser" @close="closeGetuserFunc"></GetUser>
    </el-dialog>
</template>

<script>
import CardApi from '@/api/card.js';
import GetUser from '@/components/user/GetUser.vue';
export default {
    components: {
        GetUser,
    },
    data() {
        return {
            /*左边长度*/
            formLabelWidth: '120px',
            /*是否显示*/
            loading: false,
            dialogVisible: false,
            /*获取用户是否显示*/
            open_getuser: false,
            user_ids: '',
            /*选择的用户列表*/
            select_list: [],
            expire_time: '',
            /*如果没有后面的-8.64e7就是不可以选择今天的*/
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                }
            }
        };
    },
    props: ['open_edit', 'form'],
    created() {
        this.dialogVisible = this.open_edit;
    },
    methods: {

        /*延期*/
        editUser() {
            let self = this;
            self.loading = true;
            let params = {};
            params.order_id = self.form.order_id;
            params.expire_time = self.expire_time;
            CardApi.delay(params, true)
                .then(data => {
                    self.loading = false;
                    if (data.code == 1) {
                        ElMessage({
                            message: $t('恭喜你，用户修改成功') ,
                            type: 'success'
                        });
                        self.dialogFormVisible(true);
                    }
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        /*打开获取用户*/
        openGetuser() {
            this.open_getuser = true;
        },
        /*关闭获取用户*/
        closeGetuserFunc(e) {
            if (e.type != 'error') {
                this.select_list = [e.params];
            }
            this.open_getuser = false;
        },
        /*关闭弹窗*/
        dialogFormVisible(e) {
            if (e) {
                this.$emit('closeDialog', {
                    type: 'success',
                    openDialog: false
                })
            } else {
                this.$emit('closeDialog', {
                    type: 'error',
                    openDialog: false
                })
            }
        }

    }
};
</script>

<style scoped>
.d-c-s {
    display: flex;
    justify-content: center;
    align-items: flex-start;
}
</style>
