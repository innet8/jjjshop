<template>
    <el-dialog :title="title" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" ref="form">
            <el-form-item :label="$t('供应商名称')" prop="name" :rules="[{ required: true, message: $t('请输入供应商名称') }]">
                <el-input v-model="form.name" :placeholder="$t('请输入标签名称')" :maxlength="100" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('供应商地址')" prop="address" :rules="[{ required: true, message: $t('请输入供应商地址') }]">
                <el-input v-model="form.address" :placeholder="$t('请输入供应商地址')" :maxlength="100" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('联系人')" prop="contact_person">
                <el-input v-model="form.contact_person" :placeholder="$t('请输入联系人')" :maxlength="100" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('联系电话')" prop="contact_phone">
                <el-input v-model="form.contact_phone" :placeholder="$t('请输入联系电话')" :maxlength="50" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('职位')" prop="position">
                <el-input v-model="form.position" :placeholder="$t('请输入职位')" :maxlength="999" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('采购负责人')" prop="purchaser_id" :rules="[{ required: true, message: $t('请选择采购负责人') }]">
                <el-select size="small" v-model="form.purchaser_id" filterable :placeholder="$t('商品状态')">
                    <template v-for="item in userList">
                        <el-option :label="item.user_name" :value="item.shop_user_id"></el-option>
                    </template>

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
import PurchaseApi from '@/api/purchase.js';
import AuthApi from '@/api/auth.js';
export default {
    data() {
        return {
            loading: false,
            dialogVisible: false,
            loading: false,
            form: {
                name: '',
                address: '',
                contact_person: '',
                contact_phone: '',
                position: '',
                purchaser_id: '',
            },
            userList: [],
            list: [],
        }
    },
    props: {
        open_add: {
            type: Boolean,
            default: false,
        },
        editData: {
            type: Object,
            default: {},
        },
        title: {
            type: String,
            default: $t('添加供应商'),
        },
    },
    created() {
        this.dialogVisible = this.open_add;
        if (this.editData) {
            this.form = JSON.parse(JSON.stringify(this.editData))
        }
        this.getUserList();
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

        submit() {
            let self = this;
            self.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.editData) {
                        let Params = {
                        erp_supplier_id: self.form.id,
                        name: self.form.name,
                        address: self.form.address,
                        contact_person: self.form.contact_person,
                        contact_phone: self.form.contact_phone,
                        position: self.form.position,
                        purchaser_id: self.form.purchaser_id,
                    };
                        PurchaseApi.supplierEdit(Params, true)
                            .then(data => {
                                self.loading = false;
                                this.$ElMessage({
                                    message: $t('操作成功'),
                                    type: 'success'
                                });
                                self.dialogFormVisible(true);
                            })
                            .catch(error => { });
                    } else {
                        let Params = self.form;
                        PurchaseApi.supplierAdd(Params, true)
                            .then(data => {
                                self.loading = false;
                                this.$ElMessage({
                                    message: $t('操作成功'),
                                    type: 'success'
                                });
                                self.dialogFormVisible(true);
                            })
                            .catch(error => { });
                    }

                }
            })

        },

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
                    self.list = data.data.list.data;
                })
                .catch(error => { });
        },

    },
}
</script>
<style lang="scss" scoped></style>