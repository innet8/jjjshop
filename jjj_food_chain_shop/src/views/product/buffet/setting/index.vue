<template>
    <div class="setting">
        <el-form class="form-setting" size="small" ref="form" :model="form" label-position="top">
            <el-form-item :label="$t('自助餐')" :rules="[{ required: true, message: '' }]">
                <el-radio-group v-model="form.is_open">
                    <el-radio label="1">{{ $t('开') }}</el-radio>
                    <el-radio label="0">{{ $t('关') }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('平板结束时间提醒')" prop="tablet_end_time" :rules="[{ required: true, message: $t('请输入平板结束时间提醒') }]">
                <div class="max-w460 color-box">
                    <el-input-number :controls="false" :min="0" :max="999" style="width: 200px !important;" :placeholder="$t('请输入平板结束时间提醒')"
                        v-model.number="form.tablet_end_time"></el-input-number>
                    {{ $t('分') }}
                </div>
            </el-form-item>

            <el-form-item :label="$t('非自助餐商品到时继续选购')" :rules="[{ required: true, message: '' }]">
                <el-radio-group v-model="form.is_buy_continue">
                    <el-radio label="1">{{ $t('开') }}</el-radio>
                    <el-radio label="0">{{ $t('关') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('自助餐优惠折扣')" :rules="[{ required: true, message: '' }]">
                <el-radio-group v-model="form.is_buffet_discount">
                    <el-radio label="1">{{ $t('开') }}</el-radio>
                    <el-radio label="0">{{ $t('关') }}</el-radio>
                </el-radio-group>
                <div class="favorable-list" v-if="form.is_buffet_discount == '1'">
                    <el-button type="primary" @click="addFavorable">{{ $t('添加') }}</el-button>
                    <div class="favorable-list-box">
                        <template v-for="item, index in form.add_buffet_discount">
                            <div v-if="item.action != 'delete'" class="favorable-box">
                                <div class="favorable-box-l">
                                    <el-form-item label="" :prop="`add_buffet_discount[${index}].name`" :rules="[{
                                        required: true,
                                        validator: () => {
                                            return item.name ? true : false;
                                        },
                                        message: $t('请输入优惠名称')
                                    }]">
                                        <el-input type="text" style="margin-top: 16px;width: 100%;" v-model="item.name" :placeholder="$t('请输入优惠名称')"></el-input>
                                    </el-form-item>

                                    <el-form-item label="" style="margin-bottom: 4px !important;" :rules="[{ required: true, message: '' }]">
                                        <el-radio-group v-model="item.discount_type">
                                            <el-radio :label="1">{{ $t('按比例') }}</el-radio>
                                            <el-radio :label="2">{{ $t('按折扣金额') }}</el-radio>
                                        </el-radio-group>
                                    </el-form-item>

                                    <el-form-item class="favorable-box-item" label="" :prop="item.discount_type == '1' ? `add_buffet_discount[${index}].discount_ratio` :  `add_buffet_discount[${index}].discount_price`" :rules="[{
                                        required: true,
                                        validator: () => {
                                            return (item.discount_type == '1' ? item.discount_ratio : item.discount_price) ? true : false;
                                        },
                                        message: $t('请输入比例')
                                    }]">
                                        <el-input-number v-if="item.discount_type == '1'" :controls="false" :min="0" :max="100" style="width: 100%;" :placeholder="$t('请输入')"
                                            v-model.number="item.discount_ratio"></el-input-number>
                                        <el-input-number v-else :controls="false" :min="0" :max="10000000" style="width: 100%;" :placeholder="$t('请输入折扣金额')"
                                            v-model.number="item.discount_price"></el-input-number>
                                        <p class="p-unit">{{ item.discount_type == '1' ? '%' : currency.unit }}</p>
                                    </el-form-item>
                                    <el-form-item label="" :prop="`add_buffet_discount[${index}].buffet_ids`" :rules="[{
                                        required: true,
                                        validator: () => {
                                            return item.buffet_ids.length > 0 ? true : false;
                                        },
                                        message: $t('请选择自助餐')
                                    }]">
                                        <el-button type="primary" @click="selectFavorable(item, index)">{{ $t('选择自助餐') }}</el-button>
                                        <div class="select-list" v-if="select_list[index].length > 0">
                                        <template v-for="items, indexs in select_list[index]">
                                            <div class="select-button">
                                                <div class="select-p">
                                                    <autoTips :content="items.name_text">{{ items.name_text }}</autoTips>
                                                </div>
                                                <p class="price-p" v-if="item.discount_type == '1'">
                                                    {{(Number(items.price) * Number(item.discount_ratio/100)).toFixed(2) }}
                                                </p>
                                                <el-icon class="select-icon" @click="deleteOne(index,indexs)">
                                                    <CircleCloseFilled />
                                                </el-icon>
                                            </div>

                                        </template>
                                        </div>
                                    </el-form-item>
                                </div>
                                <el-icon class="delete-icon" :class="unFavDelete ? 'delete-icon-none' : ''" @click="handleDeleteFav(index)">
                                    <Delete />
                                </el-icon>
                            </div>
                        </template>
                    </div>
                </div>
            </el-form-item>

            <el-form-item :label="$t('加钟')" :rules="[{ required: true, message: '' }]">
                <el-radio-group v-model="form.is_add_clock" @change="handleChange">
                    <el-radio label="1">{{ $t('开') }}</el-radio>
                    <el-radio label="0">{{ $t('关') }}</el-radio>
                </el-radio-group>
                <div class="limit-list" v-if="form.is_add_clock == 1">
                    <el-button type="primary" @click="add">{{ $t('添加') }}</el-button>

                    <div class="limit-product-list">
                        <template v-for="item, index in form.add_clock" :key="index">
                            <div v-if="item.action != 'delete'" class="limit-product-box">
                                <el-form-item label="" :prop="`add_clock[${index}].name`" :rules="[{
                                    required: true,
                                    validator: () => {
                                        return item.name ? true : false;
                                    },
                                    message: $t('请输入名称')
                                }]">
                                    <el-input type="text" style="margin-top: 16px;min-width: 160px;" v-model="item.name" :placeholder="$t('名称')"></el-input>
                                </el-form-item>
                                <el-form-item label="" :prop="`add_clock[${index}].delay_time`" :rules="[{
                                    required: true,
                                    validator: () => {
                                        return item.delay_time ? true : false;
                                    },
                                    message: $t('请输入时间')
                                }]">
                                    <el-input-number :controls="false" :min="0" :max="999" style="width: 160px !important;margin-top: 16px;" :placeholder="$t('请输入时间')"
                                        v-model.number="item.delay_time"></el-input-number>
                                </el-form-item>
                                <p class="limit-product-p">{{ $t('分') }}</p>
                                <el-form-item label="" :prop="`add_clock[${index}].price`" :rules="[{
                                    required: true,
                                    validator: () => {
                                        return (typeof item.price == 'object') ? false : true;
                                    },
                                    message: $t('请输入价格')
                                }]">
                                    <el-input-number :controls="false" :min="0" :max="999" style="width: 160px !important;margin-top: 16px;" :placeholder="$t('请输入价格')"
                                        v-model.number="item.price"></el-input-number>
                                </el-form-item>
                                <p class="limit-product-p">{{ currency.unit }}</p>
                                <el-icon class="delete-icon" :class="unDelete ? 'delete-icon-none' : ''" @click="handleDelete(index)">
                                    <Delete />
                                </el-icon>
                            </div>

                        </template>
                    </div>

                </div>
            </el-form-item>


        </el-form>
        <div class="common-button-wrapper">
            <el-button size="small" @click="getData">{{ $t('重置') }}</el-button>
            <el-button size="small" type="primary" @click="onSubmit" :loading="loading">{{ $t('保存') }}</el-button>
        </div>
        <productList v-if="open_product" :open_product="open_product" :openIndex="openIndex" :multiple_selection="multiple_selection" @closeDialogFunc="closeDialogFunc($event)">
        </productList>
    </div>
</template>
<script>
import PorductApi from '@/api/product.js';
import autoTips from '../list/autoTips.vue';
import productList from './productList.vue';
import { useUserStore } from '@/store';
const { currency } = useUserStore();
export default {
    components: { productList, autoTips },
    data() {
        return {
            open_product: false,

            currency: currency,
            loading: false,
            form: {
                is_open: "1",
                tablet_end_time: null,
                is_buy_continue: "1",
                is_buffet_discount: "1",
                add_buffet_discount: [],
                is_add_clock: "1",
                add_clock: [],
                fav: [],
            },
            unDelete: false,
            unFavDelete: false,
            select_list: [],
            multiple_selection: [],
            openIndex: 0,
        }
    },
    mounted() {
        this.getData();
    },
    watch: {
        'form.add_clock': {
            handler(val) {
                let result = 0
                val.map(item => {
                    if (item.action != 'delete') {
                        result++;
                    }
                })
                if (result == 1) {
                    this.unDelete = true
                } else {
                    this.unDelete = false
                }
            },
            deep: true,
            immediate: true,
        },
        'form.add_buffet_discount': {
            handler(val) {
                let result = 0
                val.map(item => {
                    if (item.action != 'delete') {
                        result++;
                    }
                })
                if (result == 1) {
                    this.unFavDelete = true
                } else {
                    this.unFavDelete = false
                }
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        getData() {
            let self = this;
            self.loading = true;
            PorductApi.getSettingBuffet().then(data => {
                self.loading = false;
                this.form = data.data.vars.values;
                this.form.add_clock.map((item, index) => {
                    this.form.add_clock[index].action = 'edit';
                    this.form.add_clock[index].price = Number(item.price)
                })
                this.form.tablet_end_time = Number(this.form.tablet_end_time);
                this.form.add_buffet_discount.map((item,index)=>{
                    this.select_list.push(item.buffets)
                    this.form.add_buffet_discount[index].buffet_ids = []
                    this.form.add_buffet_discount[index].action = 'edit'
                })
                this.select_list.map((item,index)=>{
                    item.map(items=>{
                        this.form.add_buffet_discount[index].buffet_ids.push(items.id)
                    })
                })
            }).catch(error => {
                self.loading = false;
            });
        },
        onSubmit() {
            let self = this;
            let params = JSON.parse(JSON.stringify(self.form));
            let copyData = JSON.parse(JSON.stringify(self.form));
            params.add_buffet_discount = []
            copyData.add_buffet_discount.map(item=>{
                params.add_buffet_discount.push({
                    id: item.id,
                    name: item.name,
                    discount_type: item.discount_type,
                    discount_ratio: item.discount_ratio,
                    discount_price: item.discount_price,
                    buffet_ids: item.buffet_ids.join(','),
                    action: item.action,
                    sort:item.sort,
                })
            })
            self.$refs.form.validate((valid) => {
                if (valid) {
                    self.loading = true;
                    PorductApi.setSettingBuffet(params, true).then(data => {
                        self.loading = false;
                        this.$ElMessage({
                            message: $t('保存成功'),
                            type: 'success'
                        });
                        this.getData();
                    }).catch(error => {
                        self.loading = false;
                    });
                }
            })

        },
        add() {
            this.form.add_clock.push({
                id: 0,
                name: '',
                delay_time: null,
                price: null,
                action: 'add',
            })
        },


        handleChange() {
            if (this.form.add_clock.length == 0) {
                this.add();
            }
        },
        handleDelete(index) {
            let result = 0
            this.form.add_clock.map(item => {
                if (item.action != 'delete') {
                    result++;
                }
            })
            if (result == 1) return;
            if (this.form.add_clock[index].id == 0) {
                this.form.add_clock.splice(index, 1)
            } else {
                this.form.add_clock[index].action = 'delete';
            }

        },

        selectFavorable(item, index) {
            this.openIndex = index
            this.multiple_selection = item.buffet_ids
            this.open_product = true
        },

        addFavorable() {
            this.select_list.push([])
            this.form.add_buffet_discount.push({
                id: 0,
                name: '',
                discount_type: 1,
                discount_ratio: null,
                discount_price: null,
                buffet_ids: [],
                action: 'add',
            })
        },

        handleDeleteFav(index) {
            let result = 0
            this.form.add_buffet_discount.map(item => {
                if (item.action != 'delete') {
                    result++;
                }
            })
            if (result == 1) return;
            if (this.form.add_buffet_discount[index].id == 0) {
                this.form.add_buffet_discount.splice(index, 1)
            } else {
                this.form.add_buffet_discount[index].action = 'delete';
            }
        },

        deleteOne(index,indexs) {
            this.select_list[index].splice(indexs, 1)
            this.form.add_buffet_discount[index].buffet_ids = []
            this.select_list[index].map(item => {
                this.form.add_buffet_discount[index].buffet_ids.push(item.id)
            })
            this.$refs.form.validateField(`add_buffet_discount[${index}].buffet_ids`);
        },

        closeDialogFunc(e) {
            this.open_product = e.openDialog;
            if (e.type == 'submit') {
                let map = new Map();
                [this.select_list[e.index], e.data].flat().forEach(obj => map.set(obj.id, obj));
                this.select_list[e.index] = Array.from(map.values());

                this.form.add_buffet_discount[e.index].buffet_ids = [];
                this.select_list[e.index].map(item => {
                    this.form.add_buffet_discount[e.index].buffet_ids.push(item.id)
                })
                this.$refs.form.validateField(`add_buffet_discount[${e.index}].buffet_ids`);
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.setting {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
}

.form-setting {
    flex: 1 1 auto;
    overflow-y: auto;
    overflow-x: hidden;
}

.common-button-wrapper {
    flex: 0 0 auto;
    flex-shrink: 0;
}

.color-box {
    display: flex;
    align-items: center;
    gap: 12px;
}

.p-tips {
    color: var(--el-color-tips);
}

.limit-list {
    width: 100%;
    margin-top: 12px;

    .limit-product-list {
        width: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        margin-top: 16px;

        .limit-product-box {
            display: flex;
            gap: 12px;
            align-items: center;

            .limit-product-p {
                flex-shrink: 0;
            }

            .delete-icon {
                font-size: 24px;
                cursor: pointer;
            }

            .delete-icon-none {
                cursor: not-allowed;
                color: var(--el-color-tips);
            }
        }
    }
}

.favorable-list {
    width: 100%;
    margin-top: 12px;

    .favorable-list-box {
        width: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        margin-top: 16px;
        gap: 12px;

        .favorable-box {
            display: flex;
            gap: 12px;
            max-width: 620px;
            overflow: hidden;
            .favorable-box-l {
                width: 100%;
                max-width: 584px;
                border: 1px solid var(--el-color-border);
                border-radius: 4px;
                padding: 0 16px;

                .favorable-box-item {
                    :deep(.el-form-item__content) {
                        display: flex;
                        align-items: center;
                        flex-wrap: nowrap;
                        gap: 12px;

                        .p-unit {}
                    }

                }
            }

            .delete-icon {
                font-size: 24px;
                cursor: pointer;
                margin-top: 18px;
                flex-shrink: 0;
            }

            .delete-icon-none {
                cursor: not-allowed;
                color: var(--el-color-tips);
            }
        }
    }
}
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
.select-button {
    flex: 1;
    max-width: calc(33% - 6px);
    min-width: 30%;
    border: solid 1px var(--el-color-tips);
    color: var(--el-color-tips);
    border-radius: 4px;
    position: relative; 
    display: flex;
    align-items: center;
    justify-content: space-between;
    .price-p{
        margin-right: 6px;
        flex-shrink: 0;
        color: #c80000;
    }
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