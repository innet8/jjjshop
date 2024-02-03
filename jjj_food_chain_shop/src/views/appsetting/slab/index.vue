<template >
    <div class="salb">
        <el-form size="small" ref="form" :model="form" label-position="top">
            <el-form-item :label="$t('轮播内容')" prop="carousel" :rules="[{ required: true, message: '' }]">
                <div class="draggable-list">
                    <flieUpload @upLoad="upLoad" :imgSize="2" :videoSize="10"
                        :tips1="$t('图片：支持JPG、JPEG、PNG格式，小于2MB，尺寸：1160*1104px')"
                        :tips2="$t('视频：支持AVI、MPEG、MOV、MP4格式，小于10MB，尺寸：1160*1104px')"></flieUpload>
                    <el-table size="small" :data="form.carousel" border style="width: 100%" v-loading="loading">
                        <el-table-column prop="real_name" :label="$t('图片名称')"></el-table-column>
                        <el-table-column prop="sort" :label="$t('排序')">
                            <template #default="scope">
                                <el-form-item ref="form-item" style="margin-top: 16px;" :rules="[{
                                    required: true,
                                    validator: () => {
                                        return scope.row.sort >= 0 && typeof scope.row.sort == 'number' ? true : false;
                                    },
                                    message: $t('请输入排序')
                                }]" prop="scope.row.sort">
                                    <el-input-number :controls="false" :min="0" :max="999"
                                        :placeholder="$t('接近0，排序等级越高')" v-model.number="scope.row.sort"></el-input-number>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="file_path" :label="$t('链接地址')">
                            <template #default="scope">
                                <el-input v-model="scope.row.file_path" disabled></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="file_path" width="100" :label="$t('操作')">
                            <template #default="scope">
                                <div class="delete-box" :class="form.carousel.length == 1 ? 'delete-box-one':''">
                                    <el-icon size="24">
                                        <Delete @click="deleteOne(scope)" />
                                    </el-icon>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form-item>

            <el-form-item :label="$t('呼叫服务员：')" :rules="[{ required: true, message: '' }]">
                <el-radio-group v-model="form.is_call_service">
                    <el-radio label="1">{{ $t('开') }}</el-radio>
                    <el-radio label="0">{{ $t('关') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('顾客可开桌：')" :rules="[{ required: true, message: '' }]">
                <el-radio-group v-model="form.is_customer_order">
                    <el-radio label="1">{{ $t('开') }}</el-radio>
                    <el-radio label="0">{{ $t('关') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('服务器连接地址')" prop="server" :rules="[{ required: true, message: $t('请输入服务器连接地址') }]">
                <el-input style="width: 200px;" disabled v-model="form.server.ip"></el-input>
                <p>:</p>
                <el-input style="width: 100px;" disabled v-model="form.server.port"></el-input>
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
            <el-button size="small"  @click="getData()">{{ $t('重置') }}</el-button>
            <el-button size="small" type="primary" @click="onSubmit" :loading="loading">{{ $t('保存') }}</el-button>
        </div>
        <setPassword :advancedPassword="form.advanced_password" v-if="open" :open="open"
            @close="(e) => { open = false; if (e == 1) { this.getData(); } }">
        </setPassword>
    </div>
</template>
<script>
import flieUpload from '@/components/flieUpload/upLoad.vue'
import setPassword from './setPassword.vue';
import Terminal from '@/api/terminal.js';
export default {
    components: { flieUpload, setPassword },
    data() {
        return {
            form: {
                carousel: [],
                is_auto_send: 0,
                auto_lock_screen: 300,
                language: [],
                default_language: 'th',
                advanced_password: false,
                server: {
                    ip: '',
                    port: '',
                },
            },
            languageList: [],
            open: false,
            loading: false,
            password: '',
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
        onSubmit() {
            let self = this;
            this.$refs["form-item"].validate()
            for (let i = 0; i < self.form.carousel.length; i++) {
                if(self.form.carousel[i].sort==null) {return};
            }
            this.sortOne();
            let params = JSON.parse(JSON.stringify(self.form));
            self.loading = true;
            Terminal.saveTablet(params, true).then(data => {
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
        getData() {
            let self = this;
            self.loading = true;
            Terminal.getTablet().then(data => {
                self.loading = false;
                self.form = data.data.vars.values
                self.languageList = data.data.vars.values.language_list
                if (self.form.advanced_password) {
                    self.password = 666666
                }
            }).catch(error => {
                self.loading = false;
            });
        },
        upLoad(data) {
            var type = ''
            if (data.file_type.includes('video')) {
                type = 'video'
            }
            if (data.file_type.includes('image')) {
                type = 'image'
            }
            this.form.carousel.push(
                {
                    real_name: data.real_name,
                    file_path: data.file_path,
                    sort: 0,
                    type: type,
                }
            )
        },
        deleteOne(scope) {
            if(this.form.carousel.length == 1) return;
            this.form.carousel.splice(scope.$index, 1)
            this.form.carousel.sort((a, b) => {
                return a.sort - b.sort; // 按照数值大小进行排序
            });
        },
        sortOne() {
            this.form.carousel.sort((a, b) => {
                return a.sort - b.sort; // 按照数值大小进行排序
            });
        },
    },
}
</script>
<style scoped>
.delete-box {
    display: flex;
    align-items: center;
    cursor: pointer;
}
.delete-box-one{
    color: var(--el-color-tips);
    cursor: not-allowed;
}
</style>