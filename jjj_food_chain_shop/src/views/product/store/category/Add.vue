<template>
    <el-dialog :title="$t('添加分类')" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">
            <el-form-item :label="$t('父级分类')">
                <el-select v-model="form.parent_id" :label="$t('无')">
                    <el-option :value="0" :label="$t('无')"></el-option>
                    <template v-for="cat in category" :key="cat.category_id">
                        <el-option :value="cat.category_id" :label="cat.name_text"></el-option>
                    </template>
                </el-select>
            </el-form-item>
            <template v-for="(item, index) in languageList" :key="index">
                <el-form-item :label="$t('分类名称') + `(${item.label})`" prop="name.th"
                    :rules="[{ required: true, message: $t('请输入分类名称') }]">
                    <el-input v-model="form.name[item.key]" autocomplete="off"></el-input>
                </el-form-item>
            </template>

            <!-- <el-form-item :label="$t('分类图片')" prop="image_id">
                <el-row>
                    <el-button type="primary" @click="openUpload">{{ $t('选择图片') }}</el-button>
                    <div v-if="form.image_id != ''" class="img">
                        <img :src="file_path" width="100" height="100" />
                    </div>
                </el-row>
            </el-form-item> -->

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
const languageData = JSON.stringify(languageStore().languageData)
const languageList = languageStore().languageList;
export default {
    components: {
        Upload
    },
    data() {
        return {
            languageList: languageList,
            category: [],
            form: {
                parent_id: 0,
                category_id: 0,
                name: JSON.parse(languageData),
                sort: 100,
                image_id: ''
            },
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
            /*是否显示*/
            dialogVisible: false,
            loading: false,
            /*是否上传图片*/
            isupload: false,
        };
    },
    props: ['open_add', 'addform'],
    created() {
        this.dialogVisible = this.open_add;
        /*获取父级分类*/
        this.getParentCategory();
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
        /*添加用户*/
        addUser() {
            let self = this;
            let params = JSON.parse(JSON.stringify(self.form));
            params.name = JSON.stringify(params.name)
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    PorductApi.storeCatAdd(params).then(data => {
                        self.loading = false;
                        ElMessage({
                            message: $t('添加成功'),
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
}
</style>
