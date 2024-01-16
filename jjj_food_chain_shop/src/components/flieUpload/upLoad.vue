<template>
    <el-upload class="upload-demo" accept="image/jpeg,image/png,image/jpg,video/*" action="" multiple
        :show-file-list="false" :before-upload="onBeforeUploadImage" :on-change="fileChange" :http-request="UploadImage">
        <el-button type="primary">{{ $t('上传') }}</el-button>
        <template #tip>
            <div class="el-upload__tip">
                <p>{{ $t('图片：支持JPG、JPEG、PNG格式，小于2MB，尺寸：1024*600px') }}</p>
                <p>{{ $t('视频：支持AVI、MPEG、MOV、MP4格式，小于10MB，尺寸：1024*600px') }}</p>
            </div>
        </template>
    </el-upload>
</template>
<script >
import FileApi from '@/api/file.js';
export default {
    methods: {
        /*选择上传图片*/
        fileChange(e) {

        },

        /*选择图片之前*/
        onBeforeUploadImage(file) {
            return true;
        },

        /*上传图片*/
        UploadImage(param) {
            let self = this;
            const loading = ElLoading.service({
                lock: true,
                text: "上传中,请等待",
                background: "rgba(0, 0, 0, 0.7)",
            });
            const formData = new FormData();
            formData.append("iFile", param.file);
            formData.append("file_type", param.file.file_type);
            FileApi.uploadFile(formData)
                .then((response) => {
                    loading.close();
                    ElMessage({
                        message: $t("本次上传成功"),
                        type: "success",
                    });
                    self.$emit('upLoad',response.data)
                })
                .catch((response) => {
                    loading.close();
                    ElMessage({
                        message: $t("本次上传失败"),
                        type: "warning",
                    });
                });
        },

    },
}
</script>
<style scoped>
.el-upload__tip {
    line-height: 1.7;
    color: var(--el-color-tips);
}
</style>