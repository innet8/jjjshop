<template>
    <!--
    	描述：商品-单位库-添加单位
    -->
    <el-dialog :title="$t('编辑单位')" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">

            <template v-for="(item, index) in languageList" :key="index">
                <el-form-item :label="$t('单位名称') + `(${item.label})`" :rules="[{ required: true, message: $t('请输入单位名称') }]"
                    :prop="`unit_name.${[item.key]}`">
                    <el-input v-model="form.unit_name[item.key]" :placeholder="$t('请输入单位名称')" :maxlength="50" autocomplete="off"></el-input>
                </el-form-item>
            </template>
            <el-form-item :label="$t('单位排序')" prop="sort">
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
            languageList: languageList,
            form: {
                unit_id: '',
                unit_name: JSON.parse(languageData),
                sort: 100,
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
        this.form.unit_id = this.editform.unit_id;
        this.form.unit_name = JSON.parse(this.editform.unit_name);
        this.form.sort = this.editform.sort;
    },
    methods: {
        addvalue() {
            this.form.unit_value.push('')
        },
        deleteattr(i) {
            this.form.unit_value.splice(i, 1)
        },
        submit() {
            let self = this;
            let params = JSON.parse(JSON.stringify(self.form));
            params.unit_name = JSON.stringify(params.unit_name)
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    PorductApi.editUnit(params).then(data => {
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
