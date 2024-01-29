<template>
    <!--
      作者：luoyiming
      时间：2019-10-25
      描述：会员-用户列表-会员充值
  -->
    <el-dialog :title="$t('充值')" v-model="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('充值余额')" name="first">
                <el-form size="small" :model="form" ref="form" label-position="top">
                    <el-form-item :label="$t('当前余额')" :label-width="formLabelWidth">
                        <el-input v-model="form.balance" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('会员等级')" :label-width="formLabelWidth">
                        <el-input v-model="form.grade.name" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('充值方式')" :label-width="formLabelWidth" prop="balance.mode"
                        :rules="[{ required: true, message: '' }]">
                        <el-radio-group v-model="recharge.balance.mode">
                            <el-radio label="inc">{{ $t('增加') }}</el-radio>
                            <el-radio label="dec">{{ $t('减少') }}</el-radio>
                            <el-radio label="final">{{ $t('最终金额') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="$t('变更金额')" :label-width="formLabelWidth" prop="balance.money"
                        :rules="[{ required: true, message: $t('请输入变更金额') }]">
                        <el-input-number :controls="false" :min="0" :max="100000000" :placeholder="$t('请输入变更金额')"
                            v-model.number="recharge.balance.money"></el-input-number>
                    </el-form-item>
                    <el-form-item :label="$t('备注')" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="recharge.balance.remark" :placeholder="$t('请输入备注')"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane :label="$t('充值积分')" name="second">
                <el-form size="small" :model="form" label-position="top">
                    <el-form-item :label="$t('积分')" :label-width="formLabelWidth">
                        <el-input v-model="form.points" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('会员等级')" :label-width="formLabelWidth">
                        <el-input v-model="form.grade.name" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('充值方式')" :label-width="formLabelWidth">
                        <el-radio-group v-model="recharge.points.mode">
                            <el-radio label="inc">{{ $t('增加') }}</el-radio>
                            <el-radio label="dec">{{ $t('减少') }}</el-radio>
                            <el-radio label="final">{{ $t('最终积分') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="$t('变更数量')" :label-width="formLabelWidth" prop="points.value"
                        :rules="[{ required: true, message: $t('请输入变更数量') }]">
                        <el-input-number :controls="false" :min="0" :max="100000000" :placeholder="$t('请输入变更数量')"
                            v-model.number="recharge.points.value"></el-input-number>
                    </el-form-item>
                    <el-form-item :label="$t('备注')" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="recharge.points.remark" :placeholder="$t('请输入备注')"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible">{{ $t('取消') }}</el-button>
                <el-button type="primary" @click="addUser(form.user_id)" :loading="loading">{{ $t('确定') }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import UserApi from '@/api/user.js';
export default {
    data() {
        return {
            loading: false,
            /*左边长度*/
            formLabelWidth: '120px',
            /*是否显示*/
            dialogVisible: false,
            /*默认选中*/
            activeName: 'first',
            recharge: {
                balance: {
                    mode: 'inc',
                    remark: '',
                },
                points: {
                    mode: 'inc',
                    remark: '',
                }
            },
            source: 0,
        };
    },
    props: ['open_add', 'form'],
    created() {
        this.dialogVisible = this.open_add;
    },
    methods: {

        /*选中*/
        handleClick(tab, event) {
            this.source = tab.index;
        },
        /*充值*/
        addUser(e) {
            let self = this;
            self.$refs.form.validate(valid => {
                if (valid) {
                    let params = self.recharge;
                    let user_id = e;
                    let source = self.source;
                    self.loading = true;
                    UserApi.userRecharge({
                        params: params,
                        user_id: user_id,
                        source: source
                    }, true).then(data => {
                        self.loading = false;
                        if (data.code == 1) {
                            ElMessage({
                                message: '恭喜你，修改成功',
                                type: 'success'
                            });
                            self.dialogFormVisible(true);
                        } else {
                            self.loading = false;
                            ElMessage.error('错了哦，这是一条错误消息');
                        }
                    })
                        .catch(error => {
                            self.loading = false;
                        });
                }
            })

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


