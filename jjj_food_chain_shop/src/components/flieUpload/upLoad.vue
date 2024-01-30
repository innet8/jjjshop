<template>
    <el-upload class="upload-demo" accept="image/jpeg,image/png,image/jpg,video/*" action="" multiple
        :show-file-list="false" :before-upload="onBeforeUploadImage" :on-change="fileChange" :http-request="UploadImage">
        <el-button type="primary">{{ $t('上传') }}</el-button>
        <template #tip>
            <div class="el-upload__tip">
                <p>{{ tips1 }}</p>
                <p>{{ tips2 }}</p>
            </div>
        </template>
    </el-upload>
</template>
<script >
import FileApi from '@/api/file.js';
export default {
    props:{
        tips1: {
        type: String,
        default: $t('图片：支持JPG、JPEG、PNG格式，小于2MB，尺寸：1024*600px')
      },
      tips2: {
        type: String,
        default: $t('视频：支持AVI、MPEG、MOV、MP4格式，小于10MB，尺寸：1024*600px')
      },
      imgSize:{
        type: String,
        default: 15,
      },
      videoSize:{
        type: String,
        default: 30,
      },
    },
    methods: {
        /*选择上传图片*/
        fileChange(e) {

        },

        /*选择图片之前*/
        onBeforeUploadImage(file) {
            if(file.size > (this.imgSize * 1024 *1024) && file.type.includes('image') ){
                this.$ElMessage({
                        message: $t("图片大小超出限制！"),
                        type: "warning",
                    });
                return false;
            }
            if(file.size > (this.videoSize * 1024 *1024) && file.type.includes('video') ){
                this.$ElMessage({
                        message: $t("视频大小超出限制！"),
                        type: "warning",
                    });
                return false;
            }
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
            let type = ''
            if(param.file.type.includes('video')){
                type ='video'
            }
            if(param.file.type.includes('image')){
                type ='image'
            }
            const formData = new FormData();
            formData.append("iFile", param.file);
            formData.append("file_type", type);
            FileApi.uploadFile(formData)
                .then((response) => {
                    loading.close();
                    this.$ElMessage({
                        message: $t("本次上传成功"),
                        type: "success",
                    });
                    self.$emit('upLoad',response.data)
                })
                .catch((response) => {
                    loading.close();
                    this.$ElMessage({
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