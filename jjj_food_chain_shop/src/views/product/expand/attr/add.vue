<template>
    <!--
    	描述：商品-属性库-添加属性
    -->
    <el-dialog title="添加属性" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">
            <el-form-item label="排序" prop="sort">
                <el-input v-model.number="form.sort" autocomplete="off"></el-input>
            </el-form-item>

            <template v-for="(item, index) in form.nameList" :key="index">
                <el-form-item :label="$t('属性名称') + item.label" prop="attribute_name">
                    <el-input v-model="item.attribute_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="属性值" prop="attribute_value" class="attribute-value">
                    <div v-for="(items, indexs) in item.attribute_value" :key='indexs'>
                        <el-input v-model="item.attribute_value[indexs]" autocomplete="off"></el-input>
                    </div>
                    <el-icon class="add-button" @click="addvalue">
                        <CirclePlusFilled />
                    </el-icon>
                    <el-icon class="add-button" @click="deleteattr">
                        <RemoveFilled />
                    </el-icon>
                </el-form-item>
            </template>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible">取 消</el-button>
                <el-button type="primary" @click="submit" :loading="loading">确 定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import PorductApi from '@/api/product.js';
import Upload from '@/components/file/Upload.vue';
export default {
    components: {
        Upload
    },
    data() {
        return {
            form: {
                sort: 100,
                nameList: [
                    {
                        label: '(ภาษาไทย)',
                        attribute_name: '',
                        attribute_value: [],
                    },
                    {
                        label: '(简体中文)',
                        attribute_name: '',
                        attribute_value: [],
                    },
                    {
                        label: '(繁體中文)',
                        attribute_name: '',
                        attribute_value: [],
                    },
                    {
                        label: '(English)',
                        attribute_name: '',
                        attribute_value: [],
                    },
                ]

            },
            formRules: {
                attribute_name: [{
                    required: true,
                    message: '请输入属性名称',
                    trigger: 'blur'
                }],
                attribute_value: [{
                    required: true,
                    message: '请输入属性值',
                    trigger: 'blur'
                }],
                sort: [{
                    required: true,
                    message: '排序不能为空'
                }, {
                    type: 'number',
                    message: '排序必须为数字'
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
            this.form.nameList.map((item, index) => {
                this.form.nameList[index].attribute_value.push('')
                console.log(this.form.nameList[index]);
            })
        },
        deleteattr() {
            this.form.nameList.map((item, index) => {
                this.form.nameList[index].attribute_value.pop()
            })
        },
        submit() {
            let self = this;
            let params = self.form;
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    PorductApi.addAttribute(params).then(data => {
                        self.loading = false;
                        ElMessage({
                            message: '添加成功',
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

