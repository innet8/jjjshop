<template>
    <el-dialog :title="title" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">
            <el-form-item :label="$t('供应商名称')" prop="name" :rules="[{ required: true, message: $t('请输入供应商名称') }]">
                <el-input v-model="form.name" :placeholder="$t('请输入标签名称')" :maxlength="100" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('供应商地址')" prop="address" :rules="[{ required: true, message: $t('请输入供应商地址') }]">
                <el-input v-model="form.address" :placeholder="$t('请输入供应商地址')" :maxlength="100" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('联系人')" prop="sort">
                <el-input v-model="form.contact" :placeholder="$t('请输入联系人')" :maxlength="100" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('联系电话')" prop="sort">
                <el-input v-model="form.tel" :placeholder="$t('请输入联系电话')" :maxlength="50" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('职位')" prop="position">
                <el-input v-model="form.position" :placeholder="$t('请输入职位')" :maxlength="999" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('采购负责人')"  prop="purchase" :rules="[{ required: true, message: $t('请选择采购负责人') }]" >
                <el-select size="small" v-model="form.purchase" :placeholder="$t('商品状态')">
                        <el-option :label="$t('全部')" value="all"></el-option>
                        <el-option :label="$t('上架中')" value="sell"></el-option>
                        <el-option :label="$t('下架中')" value="lower"></el-option>
                    </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible">{{ $t('取消') }}</el-button>
                <el-button type="primary" @click="submit" :loading="loading">{{ $t('确定') }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
            dialogVisible: false,
            loading: false,
            form: {
                name: '',
                address: '',
                contact: '',
                tel: '',
                position: '',
                purchase: '',
            },
        }
    },
    props: {
        open_add: {
            type: Boolean,
            default: false,
        },
        title:{
            type:String,
            default:$t('添加供应商'),
        },
    },
    created() {
        this.dialogVisible = this.open_add;
    },
    methods: {
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
        },
    },
}
</script>
<style lang="scss" scoped></style>