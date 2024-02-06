<template>
    <!--
    	描述：商品-单位库-添加单位
    -->
    <el-dialog :title="$t('编辑标签')" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">
            <el-form-item :label="$t('标签名称')" :prop="`label_name`"
                :rules="[{ required: true, message: $t('请输入标签名称') }]">
                <el-input v-model="form.label_name" :placeholder="$t('请输入标签名称')" :maxlength="50" autocomplete="off"></el-input>
            </el-form-item>

            <!-- <template v-for="(item, index) in languageList" :key="index">
                <el-form-item :label="$t('标签名称') + `(${item.label})`" :prop="`label_name.${item.key}`"
                    :rules="[{ required: true, message: $t('请输入标签名称') }]">
                    <el-input v-model="form.label_name[item.key]" :placeholder="$t('请输入标签名称')" :maxlength="50" autocomplete="off"></el-input>
                </el-form-item>
            </template> -->
            <el-form-item :label="$t('标签排序')" prop="sort">
                <el-input-number :controls="false" :min="0" :max="999" :placeholder="$t('接近0，排序等级越高')" v-model.number="form.sort" autocomplete="off"></el-input-number>
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
            form: {
                unit_id: '',
                unit_name: JSON.parse(languageData),
                sort: null,
            },
            formRules: {
                sort: [{
                    required: true,
                    message: $t('排序不能为空')
                }, {
                    type: 'number',
                    message: $t('排序必须为数字')
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
        this.dialogVisible = this.open_edit;
        this.form.label_id = this.editform.label_id;
        this.form.label_name = this.editform.label_name;
        this.form.sort = this.editform.sort;
    },
    methods: {
        submit() {
            let self = this;
            let params = JSON.parse(JSON.stringify(self.form));
            params.label_name = params.label_name
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    PorductApi.editLabel(params,true).then(data => {
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
