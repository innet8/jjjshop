<template>
    <!--
      作者 luoyiming
      时间：2019-10-26
      描述：设置-小票打印设置
    -->
    <div class="product-add">
        <!--form表单-->
        <el-form size="small" ref="form" :model="form" label-position="top" label-width="200px">

            <el-form-item :label="$t('默认语言')" v-if="form.cashier_open == 1" class="cashier-item">
                <el-select v-model="form.cashier_printer_id" :placeholder="$t('请选择')">
                    <el-option :label="$t('收银打印机 自带')" :value="'0'">
                        <span style="float: left">{{ $t('收银打印机') }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ $t('自带') }}</span>
                    </el-option>
                    <el-option v-for="(item, index) in printerList" :key="index" :label="item.printer_name"
                        :value="item.printer_id + ''">
                    </el-option>
                </el-select>
            </el-form-item>
            <div v-if="form.cashier_open == 1" class="cashier-desc">{{ $t('小票显示的语言将根据选择的语言打印') }}</div>
            <!--提交-->
            <div class="common-button-wrapper">
                <el-button type="primary" @click="onSubmit" :loading="loading">{{ $t('提交') }}</el-button>
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
                buyer_open: '0',
                room_open: '0',
                seller_open: '0',
                buyer_printer_id: '',
                room_printer_id: '',
                seller_printer_id: '',
                cashier_open: '0',
                cashier_printer_id: '0'
            },
            checked: false,
            printerList: [],
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
                    let vars = data.data.vars.values;
                    self.form.buyer_open = vars.buyer_open;
                    self.form.seller_open = vars.seller_open;
                    self.form.room_open = vars.room_open;
                    self.form.cashier_open = vars.cashier_open;
                    self.form.buyer_printer_id = '' + vars.buyer_printer_id;
                    self.form.room_printer_id = '' + vars.room_printer_id;
                    self.form.seller_printer_id = '' + vars.seller_printer_id;
                    self.form.cashier_printer_id = '' + vars.cashier_printer_id;
                    self.printerList = data.data.vars.printerList;

                    if (vars.order_status != null && vars.order_status[0] == 20) {
                        self.checked = true;
                    }

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
                        message: $t('恭喜你，打印设置成功'),
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
