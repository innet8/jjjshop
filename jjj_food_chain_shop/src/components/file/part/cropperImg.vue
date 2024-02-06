<template >
    <div>
        <vue-cropper ref="cropper" :src="img" :aspectRatio="aspectRatio" alt="Source Image"></vue-cropper>
        <span class="dialog-footer">
            <el-button @click="handleClose"> {{ $t('取消') }}</el-button>
            <el-button type="primary" @click="handelCropper"> {{ $t('确定') }} </el-button>
        </span>
    </div>
</template>
<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
    components: { VueCropper },
    props: {
        imgSrc: {
            type: String,
            default: '',
        },
        aspectRatio: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            img: '',
            afterImg: '',
        }
    },
    created() {
        this.img = this.imgSrc
    },
    methods: {
        sureSava() {
            this.afterImg = this.$refs.cropper
                .getCroppedCanvas({
                    imageSmoothingQuality: 'high'
                })
                .toDataURL('image/jpeg')
            this.$emit('upload', this.base64ToBlob(this.afterImg))
        },

        base64ToBlob(code) {
            const parts = code.split(';base64,')
            const contentType = parts[0].split(':')[1]
            const raw = window.atob(parts[1])
            const rawLength = raw.length
            const uInt8Array = new Uint8Array(rawLength)
            for (let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i)
            }
            return new Blob([uInt8Array], {
                type: contentType
            })
        },
        handelCropper() {
            this.sureSava();
        },

        handleClose() {
            this.$emit('handleClose')
        },
    },
}
</script>
<style scoped>
.dialog-footer {
    margin-top: 20px;
}
</style>