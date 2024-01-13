<template >
    <div>
        <vue-cropper ref="cropper" :src="img" :aspectRatio="1.333" alt="Source Image"></vue-cropper>
    </div>
</template>
<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
    components: { VueCropper },
    props: ['imgSrc'],
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
    },
}
</script>
<style ></style>