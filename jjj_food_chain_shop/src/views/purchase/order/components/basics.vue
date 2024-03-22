<template>
    <div class="basic-setting-content">
        <!--基本信息-->
        <div class="common-form">{{ $t('基本信息') }}</div>
        <el-form-item :label="$t('申请人')" :rules="[{ required: true, message: $t('请选择申请人') }]" prop="applicant">
            <el-select v-model="form.applicant" clearable class="max-w460" size="default" :placeholder="$t('请选择申请人')">
                <template v-for="item in form.special" :key="item.itemegory_id">
                    <el-option :value="item.itemegory_id" :label="item.name_text"></el-option>
                </template>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('到货时间')" :rules="[{ required: true, message: $t('请选择时间') }]" prop="time">
            <el-date-picker size="small" v-model="form.time" class="max-w460" style="width: 100%;" type="datetime" value-format="YYYY-MM-DD" :placeholder="$t('请选择时间')"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('采购方式')">
            <el-radio-group v-model="form.way" :rules="[{ required: true, message: $t('请选择采购方式') }]" prop="way">
                <el-radio :label="1">{{ $t('总部采购') }}</el-radio>
                <el-radio :label="0">{{ $t('自行采购') }}</el-radio>
            </el-radio-group>
        </el-form-item>
    </div>
</template>
<script>
export default {
    inject: ['form'],
}
</script>
<style lang="">

</style>