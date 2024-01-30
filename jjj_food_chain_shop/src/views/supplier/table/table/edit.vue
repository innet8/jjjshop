<template>
    <!--
    	作者：wangxw
    	时间：2019-10-26
    	描述：区域-修改
    -->
    <el-dialog :title="$t('编辑桌位')" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">
            <el-form-item :label="$t('桌位名称')" prop="table_no" :label-width="formLabelWidth">
                <el-input :maxlength="50" v-model="form.table_no" autocomplete="off" :placeholder="$t('请输入桌位名称')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('所属类型')" prop="type_id" :label-width="formLabelWidth">
                <el-select v-model="form.type_id" :placeholder="$t('所属类型')">
                    <el-option v-for="item in type" :key="item.type_id" :label="item.type_name" :value="item.type_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('所属区域')" prop="area_id" :label-width="formLabelWidth">
                <el-select v-model="form.area_id" :placeholder="$t('所属区域')">
                    <el-option v-for="item in area_list" :key="item.area_id" :label="item.area_name" :value="item.area_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('排序')" prop="sort" :label-width="formLabelWidth">
                <el-input-number :controls="false" :min="0" :max="999" :placeholder="$t('接近0，排序等級越高')" v-model.number="form.sort"></el-input-number>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible">{{ $t('取消') }}</el-button>
                <el-button type="primary" @click="addUser" :loading="loading">{{ $t('确定') }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import StoreApi from '@/api/store.js';
export default {
    components: {
    },
    data() {
        return {
            form: {
                table_id: 0,
                table_no: '',
                area_id: 1,
                type_id: 1,
                sort: null,
            },
            file_path: '',
            formRules: {
                table_no: [{
                    required: true,
                    message: $t('请输入桌位名称'),
                    trigger: 'blur'
                }],
                area_id: [{
                    required: true,
                    message: $t('请选择所属区域'),
                    trigger: 'change'
                }],
                type_id: [{
                    required: true,
                    message: $t('请选择类型名称'),
                    trigger: 'change'
                }],
                sort: [
                    { required: true,  message: $t('排序不能为空') },
                    { type: 'number', message: $t('排序必须为数字') },
                    { type: 'number', min: 0, message: $t('请输入不小于0的数字'), trigger: 'blur' }
                ]
            },
            /*左边长度*/
            formLabelWidth: '120px',
            /*是否显示*/
            dialogVisible: false,
            loading: false,
            /*是否上传图片*/
            isupload: false,
        };
    },
    props: ['open_edit', 'editform', 'type', 'area_list'],
    created() {
        this.dialogVisible = this.open_edit;
        this.form.table_id = this.editform.model.table_id;
        this.form.table_no = this.editform.model.table_no;
        this.form.area_id = this.editform.model.area_id;
        this.form.type_id = this.editform.model.type_id;
        this.form.sort = this.editform.model.sort;
    },
    methods: {
        /*修改用户*/
        addUser() {
            let self = this;
            let params = self.form;
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    StoreApi.editTable(params, true).then(data => {
                        self.loading = false;
                        this.$ElMessage({
                            message: '修改成功',
                            type: 'success'
                        });
                        self.dialogFormVisible(true);
                    }).catch(error => {
                        self.loading = false;
                    });
                }
            });
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
        },
    }
};
</script>

<style scoped>
.img {
    margin-top: 10px;
}
</style>
