<template>
    <!--
      作者 luoyiming
      时间：2019-10-26
      描述：设置-小票打印设置
    -->
    <div class="product-add">
        <!--form表单-->
        <el-form size="small" ref="form" :model="form" label-position="top" label-width="200px">

            <el-form-item :label="$t('默认语言')"  class="cashier-item" prop="default_language" :rules="[{ required: true, message: ' ' }]">
                <el-select class="max-w460" v-model="form.default_language" :placeholder="$t('请选择')">
                    <el-option v-for="(item, index) in langList" :key="index" :label="item.value"
                        :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>
            <div  class="cashier-desc">{{ $t('小票显示的语言将根据选择的语言打印') }}</div>
            <!--提交-->
            <div class="common-button-wrapper">
                <el-button  @click="getData" :loading="loading">{{ $t('重置') }}</el-button>
                <el-button type="primary" @click="onSubmit" :loading="loading">{{ $t('保存') }}</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import SettingApi from '@/api/setting.js';

export default {
    data() {
        return {
            /*切换菜单*/
            // activeIndex: '1',
            /*form表单数据*/
            form: {
                default_language: 'en',

            },
            checked: false,
            langList: [],
            loading: false,


        };
    },
    created() {
        this.getData()
    },

    methods: {
        getData() {
            let self = this;
            SettingApi.printingDetail({}, true)
                .then(data => {
                    self.form.default_language = '' + data.data.vars.values.default_language;
                    self.langList = data.data.vars.values.language_list;
                    console.log( self.langList);

                })
                .catch(error => { });
        },
        //提交表单
        onSubmit() {
            let self = this;
            let params = this.form;
            self.loading = true;
            SettingApi.editPrinting(params, true)
                .then(data => {
                    self.loading = false;
                    this.$ElMessage({
                        message: $t('保存成功'),
                        type: 'success'
                    });
                    // self.$router.push('/setting/Printing');

                })
                .catch(error => {
                    self.loading = false;
                });
        },
        //监听复选框选中
        handleCheckedCitiesChange(e) {
            let self = this;
            if (e) {
                self.form.order_status[0] = 20;
            } else {
                self.form.order_status = [];
            }
        },

    }

};
</script>

<style scoped>
.tips {
    color: #ccc;
}
.cashier-item{
    margin-bottom: 0 !important;
}
.cashier-desc{
    font-size: 14px;
    color: #ccc;
    margin-bottom: 20px;
    margin-top: 4px;
}
</style>
