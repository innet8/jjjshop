<template >
    <el-dialog class="" @close="handleClose" v-model="dialogVisible" :close-on-click-modal="false"
        :close-on-press-escape="false" :title="title">
        <el-form size="small" ref="form" :model="form" label-position="top">
            <el-form-item :label="$t('名称')" prop="name" :rules="[{ required: true, message: $t('请输入名称') }]">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('图片')" prop="image" :rules="[{ required: true, message: '' }]">
                <div class="draggable-list">
                    <draggable class="wrapper" v-model="form.image">
                        <transition-group>
                            <div class="item" v-for="(item, index) in form.image" :key="item.file_path">
                                <img v-img-url="item.file_path" />
                                <a href="javascript:void(0);" class="delete-btn" @click.stop="deleteImg(index)"><el-icon>
                                        <Close />
                                    </el-icon></a>
                            </div>
                        </transition-group>
                    </draggable>
                    <div class="item img-select" v-if="form.image.length == 0" @click="openProductUpload">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </div>
                </div>
            </el-form-item>
            <el-form-item :label="$t('排序')" prop="name" :rules="[{ required: true, message: $t('请输入排序') }]">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">{{ $t('取消') }}</el-button>
                <el-button type="primary" @click="onSubmit" :loading="loading">{{ $t('确定') }}</el-button>
            </span>
        </template>
        <Upload v-if="isProductUpload" :config="{ total: 9 }" :isupload="isProductUpload"
            @returnImgs="returnProductImgsFunc">上传图片</Upload>
    </el-dialog>
</template>
<script>
import Upload from '@/components/file/Upload.vue';
export default {
    components: { Upload },
    props: ['title', 'open'],
    created() {
        this.dialogVisible = this.open
    },
    data() {
        return {
            isProductUpload: false,
            loading: false,
            form: {
                name: "",
                image: [],
            },
        }
    },
    methods: {
        /*打开上传图片*/
        openProductUpload: function () {
            this.isProductUpload = true;
        },

        /*上传商品图片*/
        returnProductImgsFunc(e) {
            if (e != null) {
                let imgs = this.form.image.concat(e);
                this.form['image'] = imgs;
            }
            this.isProductUpload = false;
        },
        /*删除商品图片*/
        deleteImg(index) {
            this.form.image.splice(index, 1);
        },

        //提交表单
        onSubmit() {
            let self = this;
            let form = self.form;
            self.$refs.form.validate((valid) => {
                if (valid) {
                    // self.loading = true;
                    // SettingApi.addPrinter(form, true)
                    //     .then(data => {
                    //         self.loading = false;
                    //         ElMessage({
                    //             message: '恭喜你，添加成功',
                    //             type: 'success'
                    //         });
                    //         this.$emit('close',1)

                    //     }).catch(error => {
                    //         self.loading = false;
                    //     });
                }
            });
        },

        handleClose() {
            this.$emit('close')
        },
    },
}
</script>
