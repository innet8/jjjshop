<template>
    <el-dialog :title="title" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">
            <template v-for="(item, index) in languageList" :key="index">
                <el-form-item :label="$t('自助餐名称') + `(${item.value})`" :prop="`name.${[item.key]}`" :rules="[{ required: true, message: $t('请输入自助餐名称') }]">
                    <el-input type="text" v-model="form.name[item.key]" :placeholder="$t('请输入自助餐名称')" :maxlength="50"></el-input>
                </el-form-item>
            </template>

            <el-form-item :label="$t('排序')" prop="sort">
                <el-input-number :controls="false" :min="0" :max="999" :placeholder="$t('接近0，排序等级越高')" v-model.number="form.sort"></el-input-number>
            </el-form-item>
            <el-form-item :label="$t('价格')" prop="price">
                <el-input-number :controls="false" :min="0" :max="1000000" :placeholder="$t('请输入价格')" v-model.number="form.price"></el-input-number>
            </el-form-item>
            <el-form-item :label="$t('限制用餐时间')" prop="is_time_limit" :rules="[{ required: true, message: '' }]">
                <el-radio-group v-model="form.is_time_limit">
                    <el-radio :label="0">{{ $t('不限制') }}</el-radio>
                    <el-radio :label="1">{{ $t('限制') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item v-if="form.is_time_limit == 1" :label="$t('')" class="display-none" prop="time_limit" :rules="[{ required: true, message: $t('请输入用餐时间') }]">
                <el-input-number :controls="false" :min="0" :max="999" :placeholder="$t('请输入用餐时间')" v-model.number="form.time_limit"></el-input-number>
                {{ $t('分') }}
            </el-form-item>

            <el-form-item :label="$t('状态')" prop="status" :rules="[{ required: true, message: '' }]">
                <el-radio-group v-model="form.status">
                    <el-radio :label="1">{{ $t('开启') }}</el-radio>
                    <el-radio :label="0">{{ $t('关闭') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('组合')" prop="is_comb" :rules="[{ required: true, message: '' }]">
                <el-radio-group v-model="form.is_comb">
                    <el-radio :label="1">{{ $t('开启') }}</el-radio>
                    <el-radio :label="0">{{ $t('关闭') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('商品')" prop="product_ids" :rules="[{
        required: true,
        validator: () => {
            return form.product_ids.length > 0 ? true : false;
        },
        message: $t('请选中商品')
    }]">
                <el-button type="primary" @click="selectList('select')">{{ $t('选中商品') }}</el-button>
                <div class="select-list" v-if="select_list.length > 0">

                    <template v-for="item, index in select_list">

                        <div class="select-button">
                            <div class="select-p">
                                <autoTips :content="item.product_name_text">{{ item.product_name_text }}</autoTips>
                            </div>

                            <el-icon class="select-icon" @click="deleteOne(index, item.product_id)">
                                <CircleCloseFilled />
                            </el-icon>
                        </div>

                    </template>
                </div>
            </el-form-item>

            <el-form-item :label="$t('限购')" prop="buy_limit_products" :rules="[{
        required: true,
        validator: () => {
            return (form.buy_limit_products.length == 0 && form.buy_limit_status == 1) ? false : true;
        },
        message: $t('请选中商品')
    }]">
                <el-radio-group v-model="form.buy_limit_status">
                    <el-radio :label="1">{{ $t('开启') }}</el-radio>
                    <el-radio :label="0">{{ $t('关闭') }}</el-radio>
                </el-radio-group>
                <div class="limit-list" v-if="form.buy_limit_status == 1">
                    <el-button type="primary" @click="selectList('limit')" :disabled="!limit_ids">{{ $t('选中商品')
                        }}</el-button>
                    <div class="limit-product">

                        <template v-for="item, index in form.buy_limit_products">
                            <div class="limit-product-list">
                                <div class="limit-product-box">
                                    <el-input type="text" v-model="item.name" readonly></el-input>
                                    <el-form-item label="" style="margin-top: 16px;" prop="item.limit_num" :rules="[{
        required: true,
        validator: () => {
            return item.limit_num ? true : false;
        },
        message: $t('请输入限购数量')
    }]">
                                        <el-input-number :controls="false" :min="0" :max="999" style="width: 200px !important;" :placeholder="$t('请输入限购数量')"
                                            v-model.number="item.limit_num"></el-input-number>
                                    </el-form-item>

                                    <el-icon class="delete-icon" @click="handleDelete(index)">
                                        <Delete />
                                    </el-icon>
                                </div>
                            </div>
                        </template>
                    </div>


                </div>
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible">{{ $t('取消') }}</el-button>
                <el-button type="primary" @click="submit" :loading="loading">{{ $t('确定') }}</el-button>
            </div>
        </template>
        <productList v-if="open_product" :open_product="open_product" :limit_ids="limit_ids" :selectType="selectType" :multiple_selection="multiple_selection"
            @closeDialogFunc="closeDialogFunc($event)">
        </productList>
    </el-dialog>
</template>

<script>
import PorductApi from '@/api/product.js';
import { languageStore } from '@/store/model/language.js';
import autoTips from './autoTips.vue';
import productList from './productList.vue';
const languageData = JSON.stringify(languageStore().languageData);
const languageList = languageStore().languageList;
export default {
    components: { productList, autoTips },
    data() {
        return {
            languageList: languageList,
            dialogVisible: false,
            loading: false,
            open_product: false,

            form: {
                name: JSON.parse(languageData),
                sort: null,
                price: null,
                is_time_limit: 1,
                time_limit: null,
                status: 1,
                is_comb: 1,
                buy_limit_status: 0,
                buy_limit_products: [],
                product_ids: '',
            },

            formRules: {

                price: [{
                    required: true,
                    message: $t('请输入价格'),
                    trigger: 'blur'
                }],
                sort: [{
                    required: true,
                    message: $t('排序不能为空')
                }, {
                    type: 'number',
                    message: $t('排序必须为数字')
                }],

                time: [{
                    required: true,
                    message: $t('请输入用餐时间'),
                    trigger: 'blur'
                }],
            },
            select_list: [],
            limit_list: [],
            multiple_selection: [],
            limit_ids: '',
            selectType: '',
        }
    },
    props: {
        open_dialog: {
            type: Boolean,
            default: false,
        },
        title: {
            default: '',
        },
        editData: {
            default: '',
        },
    },
    created() {
        this.dialogVisible = this.open_dialog;
        if (this.editData) {
            let cpdyData = JSON.parse(JSON.stringify(this.editData));
            this.form.id = cpdyData.id;
            this.form.name = JSON.parse(cpdyData.name);
            this.form.sort = Number(cpdyData.sort);
            cpdyData.time_limit > 0 ? this.form.is_time_limit = 1 : this.form.is_time_limit = 0;
            this.form.time_limit = Number(cpdyData.time_limit);
            this.form.status = cpdyData.status;
            this.form.is_comb = cpdyData.is_comb;
            this.select_list = cpdyData.buffetProducts;
            this.form.price = Number(cpdyData.price)
            this.form.product_ids = [];
            this.select_list.map((item, index) => {
                this.select_list[index].product_name_text = item.product.product_name_text;
                this.form.product_ids.push(item.product_id)
            })
            this.form.buy_limit_status = cpdyData.buy_limit_status;
            this.limit_ids = this.form.product_ids.join(',')
            this.limit_list = cpdyData.buffetLimitProducts;
            this.form.buy_limit_products = []
            this.limit_list.map(item => {
                this.form.buy_limit_products.push({
                    name: item.product.product_name_text,
                    product_id: item.product_id,
                    limit_num: item.limit_num,
                })
            })
        }
    },
    methods: {

        submit() {
            let self = this;
            self.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.editData) {
                        let params = JSON.parse(JSON.stringify(self.form));
                        params.name = JSON.stringify(params.name);
                        params.buffet_id = params.id;
                        params.product_ids = params.product_ids.join(',');
                        params.buy_limit_products = [];
                        self.form.buy_limit_products.map((item => {
                            params.buy_limit_products.push({
                                product_id: item.product_id,
                                limit_num: item.limit_num,
                            })
                        }))
                        self.loading = true;
                        PorductApi.editBuffet(params, true).then(data => {
                            self.loading = false;
                            this.$ElMessage({
                                message: $t('操作成功'),
                                type: 'success'
                            });
                            self.dialogFormVisible(true);
                        }).catch(error => {
                            self.loading = false;
                        });
                    }
                    else {
                        let params = JSON.parse(JSON.stringify(self.form));
                        params.name = JSON.stringify(params.name)
                        params.product_ids = params.product_ids.join(',')
                        params.buy_limit_products = [];
                        self.form.buy_limit_products.map((item => {
                            params.buy_limit_products.push({
                                product_id: item.product_id,
                                limit_num: item.limit_num,
                            })
                        }))
                        self.loading = true;
                        PorductApi.addBuffet(params, true).then(data => {
                            self.loading = false;
                            this.$ElMessage({
                                message: $t('添加成功'),
                                type: 'success'
                            });
                            self.dialogFormVisible(true);
                        }).catch(error => {
                            self.loading = false;
                        });
                    }
                }
            });
        },

        selectList(e) {
            if (e == 'select') {
                this.selectType = e;
                this.multiple_selection = this.select_list;
            }
            if (e == 'limit') {
                this.selectType = e;
                this.multiple_selection = this.limit_list;
                this.limit_ids = this.form.product_ids.join(',');
            }
            this.open_product = true;
        },

        /*关闭弹窗*/
        closeDialogFunc(e) {
            this.open_product = e.openDialog;
            if (e.type == 'select') {
                let map = new Map();
                [this.select_list, e.data].flat().forEach(obj => map.set(obj.product_id, obj));
                this.select_list = Array.from(map.values());

                this.form.product_ids = [];
                this.select_list.map(item => {
                    this.form.product_ids.push(item.product_id)
                })

                this.$refs.form.validateField('product_ids');
                this.limit_ids = this.form.product_ids.join(',');
            }
            if (e.type == 'limit') {
                let map = new Map();
                [this.limit_list, e.data].flat().forEach(obj => map.set(obj.product_id, obj));
                this.limit_list = Array.from(map.values());
                let arr = []
                this.form.buy_limit_products.map(item => {
                    arr.push(item.product_id)
                })
                this.limit_list.map(item => {
                    if (!arr.includes(item.product_id)) {
                        this.form.buy_limit_products.push({
                            name: item.product_name_text,
                            product_id: item.product_id,
                            limit_num: null,
                        })
                    }
                })
                this.$refs.form.validateField('buy_limit_products');
            }
        },

        deleteOne(index, product_id) {

            this.select_list.splice(index, 1)
            this.form.product_ids = []
            this.select_list.map(item => {
                this.form.product_ids.push(item.product_id)
            })
            this.limit_ids = this.form.product_ids.join(',')
            this.form.buy_limit_products.map((item, index) => {
                if (product_id == item.product_id) {
                    this.handleDelete(index)
                }
            })
            this.$refs.form.validateField('product_ids');
        },

        handleDelete(index) {
            this.form.buy_limit_products.splice(index, 1)
            this.limit_list.splice(index, 1)
            this.$refs.form.validateField('buy_limit_products');
        },

        /*关闭弹窗*/
        dialogFormVisible(e) {
            if (e) {
                this.$emit('closeDialog', {
                    type: 'success',
                    openDialog: false
                })
            } else {
                this.$emit('closeDialog', {
                    type: 'error',
                    openDialog: false
                })
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.select-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 16px;
    padding: 7px 7px 0 0;
    max-height: 400px;
    overflow: auto;
}

.limit-list {
    width: 100%;
    margin-top: 12px;

    .limit-product {
        max-height: 400px;
        overflow: auto;
    }

    .limit-product-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 16px;

        .limit-product-box {
            display: flex;
            border: solid 1px var(--el-color-tips);
            border-radius: 4px;
            padding: 6px 12px;
            gap: 12px;
            align-items: center;

            .delete-icon {
                font-size: 24px;
                cursor: pointer;
            }
        }
    }
}

.display-none {
    :deep(.el-form-item__content) {
        display: flex;
        flex-wrap: nowrap;
        gap: 12px;
    }

}

.select-button {
    flex: 1;
    max-width: calc(33% - 6px);
    min-width: 30%;
    border: solid 1px var(--el-color-tips);
    color: var(--el-color-tips);
    border-radius: 4px;
    position: relative;

    .select-p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
    }

    .select-icon {
        position: absolute;
        right: -7px;
        top: -7px;
        cursor: pointer;
        color: #c80000;
    }
}
</style>