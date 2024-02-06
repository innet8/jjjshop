<template>
    <!--
    	描述：商品-规格库-添加规格
    -->
    <el-dialog :title="$t('编辑规格')" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">

            <template v-for="(item, index) in languageList" :key="index">
                <el-form-item :label="$t('规格名称') + `(${item.label})`" :prop="`spec_name.${item.key}`">
                    <el-input v-model="form.spec_name[item.key]" :placeholder="$t('请输入规格名称')" :maxlength="50"
                        autocomplete="off"></el-input>
                </el-form-item>
            </template>
            <el-form-item :label="$t('规格排序')" prop="sort">
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

        const specnameRules = {}
        for (let key in JSON.parse(languageData)) {
            specnameRules[key] = [{ required: true, message: $t('请输入规格名称'), trigger: 'blur'}]
        }

        return {
            languageList: languageList,
            form: {
                spec_id: '',
                spec_name: JSON.parse(languageData),
                sort: null,
                spec_value: []
            },
            formRules: {
                spec_name: specnameRules,
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
        this.form.spec_id = this.editform.spec_id;
        this.form.spec_name = JSON.parse(this.editform.spec_name);
        this.form.sort = this.editform.sort;
    },
    methods: {
        addvalue() {
            this.form.spec_value.push('')
        },
        deleteattr(i) {
            this.form.spec_value.splice(i, 1)
        },
        submit() {
            let self = this;
            let params = JSON.parse(JSON.stringify(self.form));
            params.spec_name = JSON.stringify(params.spec_name)
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    PorductApi.editSpec(params,true).then(data => {
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
