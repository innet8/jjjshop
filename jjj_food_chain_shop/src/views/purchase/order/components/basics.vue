<template>
    <div class="basic-setting-content">
        <!--基本信息-->
        <div class="common-form">{{ $t('基本信息') }}</div>
        <el-form-item :label="$t('采购名称')" :rules="[{ required: true, message: $t('请输入采购名称') }]" prop="name">
            <el-input :placeholder="$t('请输入采购名称')" :disabled="readOnly || change" v-model="form.name" class="max-w460"></el-input>
        </el-form-item>
        <el-form-item :label="$t('申请人')" :rules="[{ required: true, message: $t('请选择申请人') }]" prop="applicant_id">
            <el-select v-model="form.applicant_id" clearable :disabled="readOnly || change" class="max-w460" size="default" :placeholder="$t('请选择申请人')">
                <template v-for="item in userList">
                    <el-option :label="item.real_name" :value="item.shop_user_id"></el-option>
                </template>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('到货时间')" :rules="[{ required: true, message: $t('请选择时间') }]" prop="arrival_time">
            <el-date-picker size="small" :disabled="readOnly || change" v-model="form.arrival_time" class="max-w460" style="width: 100%;" type="date" value-format="YYYY-MM-DD"
                :placeholder="$t('请选择时间')"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('采购方式')" :rules="[{ required: true, message: $t('请选择采购方式') }]" prop="type">
            <el-radio-group v-model="form.type" :disabled="readOnly || change">
                <el-radio :label="10">{{ $t('总部采购') }}</el-radio>
                <el-radio :label="20">{{ $t('自行采购') }}</el-radio>
            </el-radio-group>
        </el-form-item>
    </div>
</template>
<script>
import AuthApi from '@/api/auth.js';
export default {
    inject: ['form'],
    props: {
        readOnly: {
            type: Boolean,
            required: false
        },
        change: {
            type: Boolean,
            required: false
        }
    },
    data() {
        return {
            userList: [],
        }
    },
    mounted() {
        this.getUserList();
    },
    methods: {
        /*获取列表*/
        getUserList() {
            let self = this;
            let Params = {};
            Params.page = self.curPage;
            Params.list_rows = 100;
            AuthApi.userList(Params, true)
                .then(data => {
                    self.loading = false;
                    self.userList = data.data.list.data;
                })
                .catch(error => { });
        },
    },
}
</script>
<style lang="">

</style>