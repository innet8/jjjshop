<template>
    <!--
    	描述：商品-属性库-添加属性
    -->
    <el-dialog :title="$t('添加属性')" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">


            <template v-for="(item, index) in languageList" :key="index">
                <el-form-item :label="$t('属性名称') + `(${item.label})`" :prop="`attribute_name.${[item.key]}`"
                    :rules="[{ required: true, message: $t('请输入属性名称') }]">
                    <el-input v-model="form.attribute_name[item.key]" :placeholder="$t('如：温度')" :maxlength="50" autocomplete="off"></el-input>

                </el-form-item>
                <el-form-item :label="$t('属性值')" class="attribute-value">
                    <div v-for="(items, indexs) in form.attribute_value" :key='indexs'>
                        <el-input v-model="items[item.key]"  :placeholder="$t('请输入')" :maxlength="50" autocomplete="off"></el-input>
                    </div>
                    <el-icon class="add-button" @click="addvalue">
                        <CirclePlusFilled />
                    </el-icon>
                    <el-icon class="add-button" @click="deleteattr">
                        <RemoveFilled />
                    </el-icon>
                </el-form-item>
            </template>
            <el-form-item :label="$t('属性排序')" prop="sort">
                <el-input v-model.number="form.sort" autocomplete="off"></el-input>
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
                sort: 100,
                attribute_name: JSON.parse(languageData),
                attribute_value: [],
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
            this.form.attribute_value.push(JSON.parse(languageData))
        },
        deleteattr() {
            this.form.attribute_value.pop()
        },
        submit() {
            let self = this;
            let params = JSON.parse(JSON.stringify(self.form));
            params.attribute_name = JSON.stringify(params.attribute_name)
            params.attribute_value = JSON.stringify(params.attribute_value)
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    PorductApi.addAttribute(params, true).then(data => {
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

.attribute-value :deep(.el-form-item__content) {
    gap: 12px;
}

.attribute-value :deep(.el-form-item__content) .add-button {
    cursor: pointer;
    font-size: 24px;
}
</style>

