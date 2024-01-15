<template>
    <el-dialog title="修改分类" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">
            <el-form-item :label="$t('父级分类')">
                <el-select v-model="form.parent_id" :label="$t('无')">
                    <el-option :value="0" :label="$t('无')"></el-option>
                    <template v-for="cat in category" :key="cat.category_id">
                        <el-option :value="cat.category_id" :label="cat.name"></el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('分类名称') + '(ภาษาไทย)'" prop="name.th"
                :rules="[{ required: true, message: $t('请输入分类名称') }]">
                <el-input v-model="form.name.th" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('分类名称') + '(简体中文)'" prop="name.zh"
                :rules="[{ required: true, message: $t('请输入分类名称') }]">
                <el-input v-model="form.name.zh" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('分类名称') + '(繁體中文)'" prop="name.zhtw"
                :rules="[{ required: true, message: $t('请输入分类名称') }]">
                <el-input v-model="form.name.zhtw" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('分类名称') + '(English)'" prop="name.en"
                :rules="[{ required: true, message: $t('请输入分类名称') }]">
                <el-input v-model="form.name.en" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类图片" prop="image_id">
                <el-row>
                    <el-button type="primary" @click="openUpload">{{ $t('选择图片') }}</el-button>
                    <div v-if="form.image_id != ''" class="img">
                        <img :src="file_path" width="100" height="100" />
                    </div>
                </el-row>
            </el-form-item>

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
        <Upload v-if="isupload" :isupload="isupload" :type="type" @returnImgs="returnImgsFunc">上传图片</Upload>
    </el-dialog>
</template>

<script>
import PorductApi from '@/api/product.js';
import Upload from '@/components/file/Upload.vue';
import { languageStore } from '@/store/model/language.js';
const languageData = JSON.stringify(languageStore().languageData)
export default {
    components: {
        Upload
    },
    data() {
        return {
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
                name: [{
                    required: true,
                    message: '请输入分类名称',
                    trigger: 'blur'
                }],
                image_id: [{
                    required: true,
                    message: '请上传分类图片',
                    trigger: 'blur'
                }],
                sort: [{
                    required: true,
                    message: '分类排序不能为空'
                }, {
                    type: 'number',
                    message: '分类排序必须为数字'
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
        this.getParentCategory();
        this.dialogVisible = this.open_edit;
        this.form.category_id = this.editform.model.category_id;
        this.form.parent_id = this.editform.model.parent_id;
        this.form.name = JSON.parse(this.editform.model.name);
        this.form.sort = this.editform.model.sort;
        this.form.image_id = this.editform.model.image_id;
        this.file_path = this.editform.model.images.file_path;
    },
    methods: {
        /*获取父级分类*/
        getParentCategory: function () {
            let self = this;
            PorductApi.storeCatParentList({}, true)
                .then(res => {
                    self.loading = false;
                    // console.log(res.data);
                    // Object.assign(self.category, res.data.list);
                    // console.log(self.category)
                    this.category = res.data.list;
                })
                .catch(error => {
                    self.loading = false;
                });
        },
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
                        ElMessage({
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

<style>
.img {
    margin-top: 10px;
}</style>
