<template >
    <div class="salb">
        <el-form size="small" ref="form" :model="form" label-position="top">
            <el-form-item :label="$t('轮播内容')" prop="image" :rules="[{ required: true, message: $t(' ') }]">
                <div class="draggable-list">
                    <flieUpload></flieUpload>
                </div>
            </el-form-item>

            <el-form-item :label="$t('呼叫服务员：')" :rules="[{ required: true, message: $t(' ') }]">
                <el-radio-group v-model="form.call">
                    <el-radio :label="1">{{ $t('开') }}</el-radio>
                    <el-radio :label="0">{{ $t('关') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('顾客可开桌：')" :rules="[{ required: true, message: $t(' ') }]">
                <el-radio-group v-model="form.open">
                    <el-radio :label="1">{{ $t('开') }}</el-radio>
                    <el-radio :label="0">{{ $t('关') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('服务器连接地址')" prop="ip" :rules="[{ required: true, message: $t('请输入服务器连接地址') }]">
                <el-input style="width: 200px;" v-model="form.ip"></el-input>
                <p>:</p>
                <el-input style="width: 100px;" v-model="form.port"></el-input>
            </el-form-item>

            <el-form-item :label="$t('高级设置密码')" prop="name" :rules="[{ required: true, message: $t('') }]">
                <el-input class="max-w460" v-model="form.name"></el-input>
                <el-button @click="setPassword" type="primary" link size="small">{{ $t('设置密码') }}</el-button>
            </el-form-item>

            <el-form-item :label="$t('常用语言')" prop="commonLanguage" :rules="[{ required: true, message: $t('请选择常用语言') }]">
                <el-radio-group v-model="form.commonLanguage">
                    <el-radio label="th">ภาษาไทย</el-radio>
                    <el-radio label="zh">简体中文</el-radio>
                    <el-radio label="tc">繁體中文</el-radio>
                    <el-radio label="en">English</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('默认语言')" prop="defaultLanguage" :rules="[{ required: true, message: $t('请选择常用语言') }]">
                <el-radio-group v-model="form.defaultLanguage">
                    <el-radio label="th">ภาษาไทย</el-radio>
                    <el-radio label="zh">简体中文</el-radio>
                    <el-radio label="tc">繁體中文</el-radio>
                    <el-radio label="en">English</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div class="common-button-wrapper">
            <el-button size="small" type="info" @click="cancelFunc">{{ $t('重置') }}</el-button>
            <el-button size="small" type="primary" @click="onSubmit" :loading="loading">{{ $t('保存') }}</el-button>
        </div>
        <setPassword v-if="open" :open="open"  @close="(e) => { open = false; if (e == 1) { this.getData(); } }">
        </setPassword>
    </div>
</template>
<script>
import flieUpload from '@/components/flieUpload/upLoad.vue'
import setPassword from './setPassword.vue';
export default {
    components: { flieUpload ,setPassword },
    data() {
        return {
            form:{
                image:"",
                call:1,
                open:1,
                ip:'',
                port:8080,
                commonLanguage: 'th',
                defaultLanguage: 'th',
            },
            open:false,
            loading:false,
        }
    },
    methods:{
        setPassword() {
            this.open = true
        },
    },
}
</script>
<style lang="">
    
</style>