<template >
    <div class="setting">
        <el-form class="form-setting" size="small" ref="form" :model="form" label-position="top">
            <el-form-item :label="$t('自助餐')" :rules="[{ required: true, message: '' }]">
                <el-radio-group v-model="form.is_open">
                    <el-radio label="1">{{ $t('开') }}</el-radio>
                    <el-radio label="0">{{ $t('关') }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('平板结束时间提醒')" prop="tablet_end_time"
                :rules="[{ required: true, message: $t('请输入平板结束时间提醒') }]">
                <div class="max-w460 color-box">
                    <el-input-number :controls="false" :min="0" :max="999" style="width: 200px !important;"
                        :placeholder="$t('请输入平板结束时间提醒')" v-model.number="form.tablet_end_time"></el-input-number>
                    {{ $t('分') }}
                </div>
            </el-form-item>

            <el-form-item :label="$t('非自助餐商品到时继续选购')" :rules="[{ required: true, message: '' }]">
                <el-radio-group v-model="form.is_buy_continue">
                    <el-radio label="1">{{ $t('开') }}</el-radio>
                    <el-radio label="0">{{ $t('关') }}</el-radio>
                </el-radio-group>
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
                                    <el-input type="text" style="margin-top: 16px;min-width: 160px;" v-model="item.name"
                                        :placeholder="$t('名称')"></el-input>
                                </el-form-item>
                                <el-form-item label="" :prop="`add_clock[${index}].delay_time`" :rules="[{
                                    required: true,
                                    validator: () => {
                                        return item.delay_time ? true : false;
                                    },
                                    message: $t('请输入时间')
                                }]">
                                    <el-input-number :controls="false" :min="0" :max="999"
                                        style="width: 160px !important;margin-top: 16px;" :placeholder="$t('请输入时间')"
                                        v-model.number="item.delay_time"></el-input-number>
                                </el-form-item>
                                <p class="limit-product-p">{{ $t('分') }}</p>
                                <el-form-item label="" :prop="`add_clock[${index}].price`" :rules="[{
                                    required: true,
                                    validator: () => {
                                        return item.price ? true : false;
                                    },
                                    message: $t('请输入价格')
                                }]">
                                    <el-input-number :controls="false" :min="0" :max="999"
                                        style="width: 160px !important;margin-top: 16px;" :placeholder="$t('请输入价格')"
                                        v-model.number="item.price"></el-input-number>
                                </el-form-item>
                                <el-icon class="delete-icon" :class="unDelete ? 'delete-icon-none':''" @click="handleDelete(index)">
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
    </div>
</template>
<script>
import PorductApi from '@/api/product.js';
export default {
    data() {
        return {
            loading: false,
            form: {
                is_open: "1",
                tablet_end_time: null,
                is_buy_continue: "1",
                is_add_clock: "1",
                add_clock: [],
            },
            unDelete: false,
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
                if (result == 1){
                    this.unDelete = true
                }else{
                    this.unDelete = false
                }
            },
            deep: true,
            immediate: true,
        }
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

            }).catch(error => {
                self.loading = false;
            });
        },
        onSubmit() {
            let self = this;
            let params = JSON.parse(JSON.stringify(self.form));
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
    },
}
</script>
<style lang="scss" scoped>
.setting{
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
}
.form-setting{
    flex: 1 1 auto;
    overflow-y: auto;
    overflow-x: hidden;
}
.common-button-wrapper{
    flex:  0 0 auto;
    flex-shrink: 0;
}
.color-box {
    display: flex;
    align-items: center;
    gap: 12px;
}
.p-tips{
    color: var(--el-color-tips);
}
.limit-list {
    width: 100%;
    margin-top: 12px;

    .limit-product-list {
        width: 100%;
        max-width: 600px;
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
            .delete-icon-none{
                cursor: not-allowed;
                color: var(--el-color-tips);
            }
        }
    }
}
</style>