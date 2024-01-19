<template>
    <!--
    	描述：商品-加料库-添加加料
    -->
    <el-dialog :title="$t('添加加料')" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">
            <template v-for="(item, index) in languageList" :key="index">
                <el-form-item :label="$t('加料名称') + `(${item.label})`" :prop="`feed_name.${[item.key]}`"
                    :rules="[{ required: true, message: $t('请输入加料名称') }]">
                    <el-input type="text" v-model="form.feed_name[item.key]"></el-input>
                </el-form-item>
            </template>

            <el-form-item :label="$t('排序')" prop="sort">
                <el-input type="text" v-model.number="form.sort"></el-input>
            </el-form-item>
            <el-form-item :label="$t('价格')" prop="price">
                <el-input type="number" v-model="form.price"></el-input>
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
                feed_name: JSON.parse(languageData),
                sort: 100,
                price: ''
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
    props: ['open_add', 'addform'],
    created() {
        this.dialogVisible = this.open_add;
    },
    methods: {
        addvalue() {
            this.form.attribute_value.push('')
        },
        deleteattr(i) {
            this.form.attribute_value.splice(i, 1)
        },
        submit() {
            let self = this;
            let params = JSON.parse(JSON.stringify(self.form));
            params.feed_name = JSON.stringify(params.feed_name)
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    PorductApi.addFeed(params).then(data => {
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

    }
};
</script>

<style scoped>
.img {
    margin-top: 10px;
}
</style>
