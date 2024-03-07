<template >
    <div class="kitchen">
        <el-form size="small" ref="form" :model="form" label-position="top">

            <el-form-item :label="$t('服务器连接地址')" prop="server" :rules="[{ required: true, message: $t('请输入服务器连接地址') }]">
                <el-input style="width: 200px;" disabled v-model="form.server.ip"></el-input>
                <p>:</p>
                <el-input style="width: 100px;" disabled v-model="form.server.port"></el-input>
            </el-form-item>

            <el-form-item :label="$t('等待时长颜色：')" :rules="[{ required: true, message: '' }]">
                <el-radio-group v-model="form.is_wait_color">
                    <el-radio label="1">{{ $t('开') }}</el-radio>
                    <el-radio label="0">{{ $t('关') }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.is_wait_color == 1" label="" :rules="[{ required: true, message: '' }]">
                <div class="max-w460 color-box">
                    <el-input v-model="input1" disabled></el-input>
                    <el-select v-model="form.wait_color[0]"  size="default">
                        <el-option value="red" :label="$t('红色')">{{ $t('红色') }}</el-option>
                        <el-option value="yellow" :label="$t('黄色')">{{ $t('黄色') }}</el-option>
                    </el-select>
                </div>
                <div class="max-w460 color-box">
                    <el-input v-model="input2" disabled></el-input>
                    <el-select v-model="form.wait_color[1]"  size="default">
                        <el-option value="red" :label="$t('红色')">{{ $t('红色') }}</el-option>
                        <el-option value="yellow" :label="$t('黄色')">{{ $t('黄色') }}</el-option>
                    </el-select>
                </div>

            </el-form-item>


            <el-form-item :label="$t('高级设置密码')" prop="password" :rules="[{ required: true, message: '' }]">
                <el-input class="max-w460" v-model="password" type="password" disabled></el-input>
                <el-button @click="setPassword" type="primary" link size="small">{{ $t('设置密码') }}</el-button>
            </el-form-item>

            <el-form-item :label="$t('常用语言')" prop="language" :rules="[{ required: true, message: $t('请选择常用语言') }]">
                <el-checkbox-group v-model="form.language">
                    <el-checkbox v-for="item in languageList" :key="item.key" :label="item.key"
                        :disabled="form.language.length == 1 && form.language.includes(item.key)">
                        {{ item.value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item :label="$t('默认语言')" prop="default_language" :rules="[{ required: true, message: $t('请选择常用语言') }]">
                <el-select v-model="form.default_language">
                    <template v-for="(item, index) in defaultLanguageList" :key="index">
                        <el-option :value="item.key" :label="item.value">{{ item.value }}</el-option>
                    </template>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="common-button-wrapper">
            <el-button size="small"  @click="getData">{{ $t('重置') }}</el-button>
            <el-button size="small" type="primary" @click="onSubmit" :loading="loading">{{ $t('保存') }}</el-button>
        </div>
        <setPassword :advancedPassword="form.advanced_password" v-if="open" :open="open"  @close="(e) => { open = false; if (e == 1) { this.getData(); } }">
        </setPassword>
    </div>
</template>
<script>
import Terminal from '@/api/terminal.js';
import setPassword from './setPassword.vue';
export default {
    components:{setPassword},
    data() {
        return {
            form: {
                is_wait_color: 1,
                server: {
                    ip: '',
                    port: 8080,
                },
                language: [],
                default_language: null,
                advanced_password: false,
                wait_color: ['', ''],
            },
            input1: $t('10分钟'),
            input2: $t('20分钟及以上'),
            languageList: [],
            open:false,
            loading:false,
            password:'',
        }
    },
    created() {
        this.getData();
    },
    computed: {
        defaultLanguageList() {
            let result = []
            this.languageList.map((item) => {
                if ((this.form.language || []).includes(item.key)) {
                    result.push(item)
                }
                if (!(this.form.language || []).includes(this.form.default_language)) {
                    this.form.default_language = this.form.language[0]
                }
            })
            return result
        },
    },
    methods: {
        setPassword() {
            this.open = true
        },
        getData() {
            let self = this;
            self.loading = true;
            Terminal.getKitchen().then(data => {
                self.loading = false;
                self.form = data.data.vars.values
                self.languageList = data.data.vars.values.language_list
                if (self.form.advanced_password) {
                    self.password = 666666
                }
                self.form.language = self.form.language.filter(lang => {
                    return self.languageList.map(h=>h.key).indexOf(lang) != -1;
                })
            }).catch(error => {
                self.loading = false;
            });
        },
        onSubmit() {
            let self = this;
            let params = JSON.parse(JSON.stringify(self.form));
            self.loading = true;
            Terminal.saveKitchen(params, true).then(data => {
                self.loading = false;
                this.$ElMessage({
                    message: $t('保存成功'),
                    type: 'success'
                });
                self.dialogFormVisible(true);
            }).catch(error => {
                self.loading = false;
            });
        },
    },
}
</script>
<style scoped>
.color-box {
    display: flex;
    gap: 12px;
    margin-right: 16px;
}
</style>
