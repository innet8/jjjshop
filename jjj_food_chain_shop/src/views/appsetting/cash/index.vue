<template >
    <div class="cash">
        <el-form size="small" ref="form" :model="form" label-position="top">
            <el-form-item :label="$t('轮播内容')" prop="image" :rules="[{ required: true, message: $t(' ') }]">
                <div class="draggable-list">
                    <flieUpload></flieUpload>
                </div>
            </el-form-item>
            <el-form-item :label="$t('收银结账自动送厨房：')">
                <el-radio-group v-model="form.auto">
                    <el-radio :label="1">{{ $t('开') }}</el-radio>
                    <el-radio :label="0">{{ $t('关') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('钱箱密码')" prop="name" :rules="[{ required: true, message: $t('') }]">
                <el-input class="max-w460" v-model="form.name"></el-input>
                <el-button @click="setPassword" type="primary" link size="small">{{ $t('设置密码') }}</el-button>
            </el-form-item>

            <el-form-item :label="$t('自动锁屏')" prop="lock" :rules="[{ required: true, message: $t('请选择锁屏时间') }]">
                <el-select v-model="form.lock">
                    <template v-for="(item, index) in lockList" :key="index">
                        <el-option :value="item.key" :label="item.label">{{ item.label }}</el-option>
                    </template>
                </el-select>
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
    components: { flieUpload, setPassword },
    data() {
        return {
            open: false,
            loading: false,
            form: {
                name: "",
                image: [],
                auto: 1,
                lock: 300,
                commonLanguage: 'th',
                defaultLanguage: 'th',
            },
            lockList: [
                {
                    label: $t('无操作15秒'),
                    key: 15,
                },
                {
                    label: $t('无操作30秒'),
                    key: 30,
                },
                {
                    label: $t('无操作1分钟'),
                    key: 60,
                },
                {
                    label: $t('无操作2分钟'),
                    key: 120,
                },
                {
                    label: $t('无操作5分钟'),
                    key: 300,
                },
                {
                    label: $t('无操作10分钟'),
                    key: 600,
                },
            ],
        }
    },
    methods: {
        setPassword() {
            this.open = true
        },


    },
}
</script>
<style lang="">
    
</style>