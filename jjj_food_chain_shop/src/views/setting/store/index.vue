<template>
    <!--
      作者 luoyiming
      时间：2019-10-26
      描述：设置-商城设置
  -->
    <div class="product-add">
        <!--form表单-->
        <el-form size="small" ref="form" :model="form" label-position="top" label-width="150px">
            <!--添加门店-->
            <el-form-item :label="$t('店铺名称')" :rules="[{ required: true, message: ' ' }]" prop="name">
                <el-input v-model="form.name" :placeholder="$t('商城名称')" class="max-w460"></el-input>
            </el-form-item>
            <el-form-item :label="$t('LOGO')" :rules="[{ required: true, message: ' ' }]" prop="name">
                <div class="ww100">
                    <el-button @click="chooseImg('logoUrl')">{{ $t('选择图片') }}</el-button>
                </div>
                <img class="mt10" v-img-url="form.logoUrl" :width="100">
                <div class="tips">{{ $t('支持JPG、JPEG、PNG格式，小于15MB，尺寸：120*120px') }}</div>
            </el-form-item>

            <el-form-item :label="$t('店铺ID')" prop="customer">
                <el-input v-model="form.shop.shop_supplier_id" disabled placeholder="" class="max-w460"></el-input>
            </el-form-item>
            <el-form-item :label="$t('机器码')" prop="key">
                <el-input v-model="form.shop.device_code" disabled placeholder="" class="max-w460"></el-input>
                <span class="time">{{ $t('剩余时间') }}:30天</span>
                <el-button @click="oneMoreTime" type="primary">{{ $t('重新授权') }}</el-button>
            </el-form-item>
            <template v-for="(item, index) in 4" :key="index">
                <el-form-item :label="$t('语言') + (index + 1) + (index == 0 ? '(' + $t('默认') + ')' : '')" :prop="`lang[${index}]`" :rules="[{
            required: true,
            validator: () => {
                return form.lang[index] ? true : false;
            },
            message: $t('请选择语言')
        }]">
                    <el-select v-model="form.lang[index]" clearable class="max-w460" :placeholder="$t('请选择语言')" size="default">
                        <template v-for="cat in langList" :key="cat.name">
                            <el-option :value="cat.name" :label="cat.value" :disabled="selectOne(cat.name)"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
            </template>
            <!--提交-->
            <div class="common-button-wrapper">
                <el-button @click="getParams" :loading="loading">{{ $t('重置') }}</el-button>
                <el-button type="primary" @click="onSubmit" :loading="loading">{{ $t('保存') }}</el-button>
            </div>
        </el-form>
        <!--上传图片-->
        <Upload v-if="isupload" :isupload="isupload" :type="type" :config="{ total: 1 }" @returnImgs="returnImgsFunc">
        </Upload>

        <el-dialog v-model="dialogVisible" :title="$t('授权码')" width="420" :before-close="handleClose" align-center>
            <el-input size="small" type="textarea" v-model="code" :placeholder="$t('请输入授权码')"></el-input>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">{{ $t('取消') }}</el-button>
                    <el-button type="primary" @click="dialogVisible = false"> {{ $t('确定') }}</el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog v-model="accreditShow" :title="$t('设备授权')" width="720" :before-close="handleClose" align-center>
            <div class="accredit-main">
                <p>{{ $t('请根据以下支持的设备数量上限调整绑定的设备') }}</p>
                <div class="accredit-num">
                    <p>{{ $t('收银机支持') }}<span>1</span></p>
                    <p>{{ $t('厨显支持') }}<span>1</span></p>
                    <p>{{ $t('平板支持') }}<span>1</span></p>
                </div>
                <p class="accredit-title">{{ $t('以下为收银机当前绑定设备') }}</p>
                <div class="accredit-one">
                    <el-input v-model="form.shop.device_code" disabled class="max-w460"></el-input>
                    <el-button @click="">{{ $t('解绑') }}</el-button>
                </div>

                <p class="accredit-title">{{ $t('以下为厨显当前绑定设备') }}</p>
                <div class="accredit-one">
                    <el-input v-model="form.shop.device_code" disabled class="max-w460"></el-input>
                    <el-button @click="">{{ $t('解绑') }}</el-button>
                </div>

                <p class="accredit-title">{{ $t('以下为平板当前绑定设备') }}</p>
                <div class="accredit-one">
                    <el-input v-model="form.shop.device_code" disabled class="max-w460"></el-input>
                    <el-button @click="">{{ $t('解绑') }}</el-button>
                </div>
            </div> 
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="accreditShow = false">{{ $t('取消') }}</el-button>
                    <el-button type="primary" @click="accreditShow = false"> {{ $t('确定') }}</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import SettingApi from '@/api/setting.js';
import Upload from '@/components/file/Upload.vue';
import { languageStore } from '@/store/model/language';
export default {
    components: {
        Upload
    },
    data() {
        return {
            /*是否正在加载*/
            loading: false,
            /*form表单数据*/
            form: {
                name: '',
                customer: '',
                key: '',
                sms_open: '',
                wx_open: '',
                is_get_log: 0,
                avatarUrl: '',
                shop: {
                },
                lang: [],
            },
            code:'',
            all_type: [],
            type: [],
            /*是否打开图片选择*/
            isupload: false,
            langList: [],
            dialogVisible: false,
            accreditShow: false,
        };
    },
    created() {
        this.getParams()
    },

    methods: {

        selectOne(lang) {
            let result = false;
            this.form.lang.map(item => {
                if (lang == item) {
                    result = true
                }
            })
            return result
        },

        /*获取配置数据*/
        getParams() {
            let self = this;
            self.loading = true;
            SettingApi.storeDetail({}, true).then(res => {
                let vars = res.data.vars.values;
                // self.form = formatModel(self.form, vars);
                self.form = Object.assign(self.form, vars);
                self.form.shop = res.data.shop;
                self.form.lang = [];
                res.data.vars.values.language.map(item => {
                    self.form.lang.push(item.name)
                })

                self.langList = res.data.shop.language;
                self.loading = false;
            })
                .catch(error => {

                });
        },
        /*提交*/
        onSubmit() {
            let self = this;
            let language = []
            this.form.lang.map((item, index) => {
                this.langList.map(items => {
                    if (items.name == item) {
                        language.push({
                            key: index + 1,
                            name: items.name,
                            value: items.value,
                        })
                    }
                })
            })
            this.form.language = language;
            let { lang, ...params } = this.form;
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    SettingApi.editStore(params, true)
                        .then(data => {
                            self.loading = false;
                            let nowLanguage = JSON.parse(localStorage.getItem("Language")).language;
                            if (self.form.lang.indexOf(nowLanguage) == -1) {
                                languageStore().setLanguage(self.form.lang[0])
                            }
                            languageStore().setLanguageList(params.language)
                            this.$ElMessage({
                                message: $t('操作成功'),
                                type: 'success'
                            });
                            setTimeout(() => {
                                location.reload();
                            }, 1000)
                        })
                        .catch(error => {
                            self.loading = false;
                        });
                }
            });
        },
        /*选择图片*/
        chooseImg(e) {
            this.type = e;
            this.isupload = true;
        },
        /*关闭选择图片*/
        returnImgsFunc(e) {
            this.isupload = false;
            if (e != null && e.length > 0) {
                if (this.type == 'avatarUrl') {
                    this.form.avatarUrl = e[0].file_path;
                } else if (this.type == 'logoUrl') {
                    this.form.logoUrl = e[0].file_path;
                }
            }
        },
        oneMoreTime() {
            this.dialogVisible = true;
        },
    }

};
</script>
<style scoped lang="scss">
.tips {
    color: #ccc;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type="number"] {
    -moz-appearance: textfield;
}

.time {
    margin: 0 16px;
}

.accredit-main{

}
.accredit-num{
    display: flex;
    margin-top: 8px;
    gap: 16px;
    span{
        color: #FF0000;
        margin-left: 4px;
        font-weight: bold;
    }
}
.accredit-title{
    margin-top: 16px;
}
.accredit-one{
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
}
</style>
