<template >
    <div class="kitchen">
        <el-form size="small" ref="form" :model="form" label-position="top">
            <el-form-item :label="$t('服务器连接地址')" prop="ip" :rules="[{ required: true, message: $t('请输入服务器连接地址') }]">
                <el-input style="width: 200px;" v-model="form.ip"></el-input>
                <p>:</p>
                <el-input style="width: 100px;" v-model="form.port"></el-input>
            </el-form-item>

            <el-form-item :label="$t('等待时长颜色：')" :rules="[{ required: true, message: $t(' ') }]">
                <el-radio-group v-model="form.open">
                    <el-radio :label="1">{{ $t('开') }}</el-radio>
                    <el-radio :label="0">{{ $t('关') }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.open == 1" label="" :rules="[{ required: true, message: $t(' ') }]">
                <div class="max-w460 color-box">
                    <el-input v-model="input2">
                        <template #append>{{ $t('10分钟') }}</template>
                    </el-input>
                    <el-select v-model="form.color1">
                        <el-option value="red" :label="$t('红色')">{{ $t('红色') }}</el-option>
                        <el-option value="yellow" :label="$t('黄色')">{{ $t('黄色') }}</el-option>
                    </el-select>
                </div>
                <div class="max-w460 color-box">
                    <el-input v-model="input2">
                        <template #append>{{ $t('10分钟及以上') }}</template>
                    </el-input>
                    <el-select v-model="form.color2">
                        <el-option value="red" :label="$t('红色')">{{ $t('红色') }}</el-option>
                        <el-option value="yellow" :label="$t('黄色')">{{ $t('黄色') }}</el-option>
                    </el-select>
                </div>

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
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                open: 1,
                ip: '',
                port: 8080,
                commonLanguage: 'th',
                defaultLanguage: 'th',
                color1:"",
                color2:"",
            }
        }
    },
}
</script>
<style scoped>
    .color-box{
        display: flex;
        gap:12px;
        margin-right: 16px;
    }
</style>