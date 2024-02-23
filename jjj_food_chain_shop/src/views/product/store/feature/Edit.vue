<template>
    <el-dialog :title="$t('编辑特色分类')" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">
            <template v-for="(item, index) in languageList" :key="index">
                <el-form-item :label="$t('分类名称') + `(${item.value})`" :prop="`form.name.${item.key}.`"
                    :rules="[{ validator: ()=>{
                    return form.name[item.key] ? true : false ;
                    }, message: $t('请输入分类名称') }]"
                >
                    <el-input v-model="form.name[item.key]" :placeholder="$t('请输入分类名称')" :maxlength="50" autocomplete="off"></el-input>
                </el-form-item>
            </template>

            <el-form-item :label="$t('分类排序')" prop="sort">
                <el-input v-model.number="form.sort" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible">{{ $t('取消') }}</el-button>
                <el-button type="primary" @click="addUser" :loading="loading">{{ $t('确定') }}</el-button>
            </div>
        </template>
        <!--上传图片组件-->
        <Upload v-if="isupload" :isupload="isupload" :type="type" @returnImgs="returnImgsFunc">{{ $t('上传图片') }}</Upload>
    </el-dialog>
</template>

<script>
import PorductApi from '@/api/product.js';
import Upload from '@/components/file/Upload.vue';
import { languageStore } from '@/store/model/language.js';
const languageData = JSON.stringify(languageStore().languageData);
const languageList = languageStore().languageList;
export default {
    components: {
        Upload
    },
    data() {
        return {
            languageList:languageList,
            category: [],
            form: {
                parent_id: 0,
                category_id: 0,
                name: JSON.parse(languageData),
                image_id: '',
                sort: ''
            },
            file_path: '',
            formRules: {
                image_id: [{
                    required: true,
                    message: $t('请上传分类图片'),
                    trigger: 'blur'
                }],
                sort: [{
                    required: true,
                    message: $t('分类排序不能为空')
                }, {
                    type: 'number',
                    message: $t('分类排序必须为数字')
                }]
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
        /*获取父级分类*/
        this.dialogVisible = this.open_edit;
        this.form.category_id = this.editform.model.category_id;
        this.form.parent_id = this.editform.model.parent_id;
        this.form.name = JSON.parse(this.editform.model.name);
        this.form.sort = this.editform.model.sort;
        this.form.image_id = this.editform.model.image_id;
        this.file_path = this.editform.model.images?.file_path;
    },
    methods: {

        /*修改用户*/
        addUser() {
            let self = this;
            let params = JSON.parse(JSON.stringify(self.form));
            params.name = JSON.stringify(params.name)
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    PorductApi.storeCatEdit(params, true).then(data => {
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
        /*上传*/
        openUpload(e) {
            this.type = e;
            this.isupload = true;
        },
        /*获取图片*/
        returnImgsFunc(e) {
            if (e != null && e.length > 0) {
                this.file_path = e[0].file_path;
                this.form.image_id = e[0].file_id;
            }
            this.isupload = false;
        },

    }
};
</script>

<style scoped>
.img {
    margin-top: 10px;
}
</style>
