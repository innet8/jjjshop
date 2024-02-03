<template>
    <!--
    	描述：商品-加料库-添加加料
    -->
    <el-dialog :title="$t('编辑加料')" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">
            <template v-for="(item, index) in languageList" :key="index">
                <el-form-item :label="$t('加料名称') + `(${item.label})`" :prop="`feed_name.${[item.key]}`"
                    :rules="[{ required: true, message: $t('请输入加料名称') }]">
                    <el-input type="text" v-model="form.feed_name[item.key]" :placeholder="$t('如：番茄酱')"></el-input>
                </el-form-item>
            </template>
            <el-form-item :label="$t('加料排序')" prop="sort">
                <el-input-number :controls="false" :min="0" :max="999" :placeholder="$t('请输入加料排序')" v-model.number="form.sort"></el-input-number>
            </el-form-item>
            <el-form-item :label="$t('价格')" prop="price">
                <el-input type="number" v-model="form.price" :placeholder="$t('请输入价格')"></el-input>
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
                feed_id: '',
                feed_name:  JSON.parse(languageData),
                sort: null,
                price: '',
                feed_value: []
            },
            formRules: {

                price: [{
                    required: true,
                    message: $t('请输入价格'),
                    trigger: 'blur'
                }],
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
        this.form.feed_id = this.editform.feed_id;
        this.form.feed_name = JSON.parse(this.editform.feed_name);
        this.form.price = this.editform.price;
        this.form.sort = this.editform.sort;
    },
    methods: {
        addvalue() {
            this.form.feed_value.push('')
        },
        deleteattr(i) {
            this.form.feed_value.splice(i, 1)
        },
        submit() {
            let self = this;
            let params = JSON.parse(JSON.stringify(self.form));
            params.feed_name = JSON.stringify(params.feed_name);
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    PorductApi.editFeed(params).then(data => {
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
