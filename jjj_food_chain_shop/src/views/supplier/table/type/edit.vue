<template>
    <!--
    	作者：wangxw
    	时间：2019-10-26
    	描述：区域-修改
    -->
    <el-dialog :title="$t('修改类型')" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">
            <el-form-item :label="$t('类型名称')" prop="type_name" :label-width="formLabelWidth">
                <el-input v-model="form.type_name" autocomplete="off" :placeholder="$t('请输入类型名称')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('最少人数')" prop="min_num" :label-width="formLabelWidth">
                <el-input v-model.number="form.min_num" autocomplete="off" type="number" :placeholder="$t('请输入最少人数')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('最多人数')" prop="max_num"  :label-width="formLabelWidth">
                <el-input v-model.number="form.max_num" autocomplete="off" type="number" :placeholder="$t('请输入最多人数')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('排序')" prop="sort" :label-width="formLabelWidth">
                <el-input v-model.number="form.sort" autocomplete="off" :placeholder="$t('接近0，排序等級越高')"></el-input>
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
                type_id: 0,
                type_name: '',
                min_num: 1,
                max_num: 1,
                sort: null,
            },
            file_path: '',
            formRules: {
                type_name: [{
                    required: true,
                    message: $t('请输入类型名称'),
                    trigger: 'blur'
                }],
                min_num: [
                    { required: true, message: $t('请输入最少人数'), trigger: 'blur'},
                    { type: 'number', min: 0, max: 100, message: $t('请输入1-100之间的数'), trigger: 'blur' },
                ],
                max_num: [
                    { required: true, message: $t('请输入最多人数'), trigger: 'blur'},
                    { type: 'number', min: 0, max: 100, message: $t('请输入1-100之间的数'), trigger: 'blur' },
                ],
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
    props: ['open_edit', 'editform'],
    created() {
        this.dialogVisible = this.open_edit;
        this.form.type_id = this.editform.model.type_id;
        this.form.type_name = this.editform.model.type_name;
        this.form.min_num = this.editform.model.min_num;
        this.form.max_num = this.editform.model.max_num;
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
                    StoreApi.editType(params, true).then(data => {
                        self.loading = false;
                        this.$ElMessage({
                            message: $t('保存成功'),
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
