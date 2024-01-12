<template>
    <el-dialog class="product-add" @close="handleClose" v-model="dialogVisible" :close-on-click-modal="false"
        :close-on-press-escape="false" :title="$t('编辑小票打印机')">
        <!--form表单-->
        <el-form size="small" ref="form" :model="form" label-position="top" label-width="200px">
            <!--添加门店-->
            <el-form-item label="打印机名称 " prop="printer_name" :rules="[{ required: true, message: ' ' }]">
                <el-input v-model="form.printer_name" ></el-input>
            </el-form-item>
            <el-form-item label="打印机类型 ">
                <el-select v-model="form.printer_type" placeholder="请选择">
                    <el-option v-for="(item, index) in type" :key="index" :label="item" :value="index">
                    </el-option>
                </el-select>
                <div class="tips">目前支持 飞鹅打印机、365云打印</div>
            </el-form-item>


            <!-- 飞鹅打印机 -->
            <div v-if="form.printer_type == 'FEI_E_YUN'">
                <el-form-item label="USER" prop="FEI_E_YUN.USER" :rules="[{ required: true, message: ' ' }]">
                    <el-input v-model="form.FEI_E_YUN.USER" ></el-input>
                    <div class="tips">飞鹅云后台注册用户名</div>
                </el-form-item>

                <el-form-item label="UKEY" prop="FEI_E_YUN.UKEY" :rules="[{ required: true, message: ' ' }]">
                    <el-input v-model="form.FEI_E_YUN.UKEY" ></el-input>
                    <div class="tips">飞鹅云后台登录生成的UKEY</div>
                </el-form-item>

                <el-form-item label="打印机编号" prop="FEI_E_YUN.SN" :rules="[{ required: true, message: ' ' }]">
                    <el-input v-model="form.FEI_E_YUN.SN" ></el-input>
                    <div class="tips">打印机编号为9位数字，查看飞鹅打印机底部贴纸上面的编号</div>
                </el-form-item>
            </div>

            <!-- 飞鹅打印机 -->
            <div v-if="form.printer_type == 'FEI_E_YUN_TAG'">
                <el-form-item label="USER" prop="FEI_E_YUN_TAG.USER" :rules="[{ required: true, message: ' ' }]">
                    <el-input v-model="form.FEI_E_YUN_TAG.USER" ></el-input>
                    <div class="tips">飞鹅云后台注册用户名</div>
                </el-form-item>

                <el-form-item label="UKEY" prop="FEI_E_YUN_TAG.UKEY" :rules="[{ required: true, message: ' ' }]">
                    <el-input v-model="form.FEI_E_YUN_TAG.UKEY" ></el-input>
                    <div class="tips">飞鹅云后台登录生成的UKEY</div>
                </el-form-item>

                <el-form-item label="打印机编号" prop="FEI_E_YUN_TAG.SN" :rules="[{ required: true, message: ' ' }]">
                    <el-input v-model="form.FEI_E_YUN_TAG.SN" ></el-input>
                    <div class="tips">打印机编号为9位数字，查看飞鹅打印机底部贴纸上面的编号</div>
                </el-form-item>
            </div>

            <!-- 365云打印 -->
            <div v-if="form.printer_type == 'PRINT_CENTER'">
                <el-form-item label="打印机编号 " prop="PRINT_CENTER.deviceNo" :rules="[{ required: true, message: ' ' }]">
                    <el-input v-model="form.PRINT_CENTER.deviceNo" ></el-input>
                </el-form-item>

                <el-form-item label="打印机秘钥" prop="PRINT_CENTER.key" :rules="[{ required: true, message: ' ' }]">
                    <el-input v-model="form.PRINT_CENTER.key"></el-input>
                </el-form-item>
            </div>
            <el-form-item label="打印联数" prop="print_times" :rules="[{ required: true, message: ' ' }]">
                <el-input v-model="form.print_times" type="number" ></el-input>
                <div class="tips">同一订单，打印的次数</div>
            </el-form-item>

            <el-form-item label="排序">
                <el-input v-model="form.sort" type="number" ></el-input>
                <div class="tips">数字越小越靠前</div>
            </el-form-item>

            <!--提交-->

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">{{ $t('取消') }}</el-button>
                <el-button type="primary" @click="onSubmit" :loading="loading">{{ $t('确定') }}</el-button>
            </span>
        </template>

    </el-dialog>
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
                printer_id: '',
                printer_name: '',
                printer_type: '',
                sort: 1,
                print_times: '',
                FEI_E_YUN: {
                    USER: '',
                    UKEY: '',
                    SN: '',
                },
                FEI_E_YUN_TAG: {
                    USER: '',
                    UKEY: '',
                    SN: '',
                },
                PRINT_CENTER: {
                    deviceNo: '',
                    key: ''
                },
            },
            loading: false,
            dialogVisible: false,
            type: [],

        };
    },
    props: ['printer_id', 'open_edit'],
    created() {
        this.dialogVisible = this.open_edit
        this.getData();
    },

    methods: {
        getData() {
            let self = this;
            // 取到路由带过来的参数
            const params = this.printer_id
            SettingApi.printerDetail({
                printer_id: params
            }, true)
                .then(data => {
                    let detail = data.data.detail;
                    this.type = data.data.printerType;
                    this.form.printer_name = detail.printer_name;
                    this.form.printer_type = detail.printer_type.value;
                    this.form.sort = detail.sort;
                    this.form.printer_id = detail.printer_id;
                    this.form.print_times = detail.print_times;
                    if (detail.printer_type.value == 'FEI_E_YUN') {
                        this.form.FEI_E_YUN.USER = detail.printer_config.USER;
                        this.form.FEI_E_YUN.UKEY = detail.printer_config.UKEY;
                        this.form.FEI_E_YUN.SN = detail.printer_config.SN;
                    }
                    if (detail.printer_type.value == 'FEI_E_YUN_TAG') {
                        this.form.FEI_E_YUN_TAG.USER = detail.printer_config.USER;
                        this.form.FEI_E_YUN_TAG.UKEY = detail.printer_config.UKEY;
                        this.form.FEI_E_YUN_TAG.SN = detail.printer_config.SN;
                    }
                    if (detail.printer_type.value == 'PRINT_CENTER') {
                        this.form.PRINT_CENTER.deviceNo = detail.printer_config.deviceNo;
                        this.form.PRINT_CENTER.key = detail.printer_config.key;
                    }


                })
                .catch(error => {

                });
        },
        //提交表单
        onSubmit() {
            let self = this;
            let form = self.form;
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    SettingApi.editPrinter(form, true)
                        .then(data => {
                            self.loading = false;
                            ElMessage({
                                message: '恭喜你，修改成功',
                                type: 'success'
                            });
                            this.$emit('close',1)

                        })
                        .catch(error => {
                            self.loading = false;
                        });
                }
            });
        },

        handleClose() {
            this.$emit('close')
        },
    }

};
</script>

<style>
.tips {
    color: #ccc;
}
</style>
