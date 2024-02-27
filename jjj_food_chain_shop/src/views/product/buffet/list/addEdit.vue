<template >
    <el-dialog :title="title" v-model="dialogVisible" @close="dialogFormVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form size="small" :model="form" label-position="top" :rules="formRules" ref="form">
            <template v-for="(item, index) in languageList" :key="index">
                <el-form-item :label="$t('自助餐名称') + `(${item.value})`" :prop="`feed_name.${[item.key]}`"
                    :rules="[{ required: true, message: $t('请输入自助餐名称') }]">
                    <el-input type="text" v-model="form.feed_name[item.key]" :placeholder="$t('请输入自助餐名称')"></el-input>
                </el-form-item>
            </template>

            <el-form-item :label="$t('加料排序')" prop="sort">
                <el-input-number :controls="false" :min="0" :max="999" :placeholder="$t('接近0，排序等级越高')"
                    v-model.number="form.sort"></el-input-number>
            </el-form-item>
            <el-form-item :label="$t('价格')" prop="price">
                <el-input-number :controls="false" :min="0" :max="1000000" :placeholder="$t('请输入价格')"
                    v-model.number="form.price"></el-input-number>
            </el-form-item>
            <el-form-item :label="$t('限制用餐时间')" prop="parent">
                <el-radio-group v-model="parent" @change="radioChange">
                    <el-radio :label="1">{{ $t('不限制') }}</el-radio>
                    <el-radio :label="0">{{ $t('限制') }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="parent == 0" :label="$t('')" prop="time">
                <el-input-number :controls="false" :min="0" :max="999" :placeholder="$t('请输入用餐时间')"
                    v-model.number="form.time"></el-input-number>
            </el-form-item>

            <el-form-item :label="$t('状态')" prop="status" :rules="[{ required: true, message: '' }]">
                <el-radio-group v-model="form.status" @change="radioChange">
                    <el-radio :label="1">{{ $t('开启') }}</el-radio>
                    <el-radio :label="0">{{ $t('关闭') }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('组合')" prop="status" :rules="[{ required: true, message: '' }]">
                <el-radio-group v-model="form.status" @change="radioChange">
                    <el-radio :label="1">{{ $t('开启') }}</el-radio>
                    <el-radio :label="0">{{ $t('关闭') }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('商品')" prop="product" :rules="[{ required: true, message: '' }]">
                <el-button type="primary" @click="selectList">{{ $t('选中商品') }}</el-button>
                <div class="select-list" v-if="select_list.length > 0">
                    <template v-for="item, index in select_list">
                        <el-tooltip class="box-item" effect="dark" :content="item.nickName" placement="top">
                            <div class="select-button">
                                <p>{{ item.nickName }}</p>
                                <el-icon class="select-icon" @click="deleteOne(index)">
                                    <CircleCloseFilled />
                                </el-icon>
                            </div>
                        </el-tooltip>
                    </template>
                </div>
            </el-form-item>

            <el-form-item :label="$t('限购')" prop="Limited" :rules="[{ required: true, message: '' }]">
                <el-radio-group v-model="Limited" @change="radioChange">
                    <el-radio :label="1">{{ $t('开启') }}</el-radio>
                    <el-radio :label="0">{{ $t('关闭') }}</el-radio>
                </el-radio-group>
                <div class="limit-list"  v-if="Limited == 1" >
                    <el-button type="primary" @click="">{{ $t('选中商品') }}</el-button>
                    <div class="limit-product-list">
                        <div class="limit-product-box">
                            <el-input type="text" v-model="time" disabled></el-input>
                            <el-input-number :controls="false" :min="0" :max="999" style="width: 200px !important;" :placeholder="$t('请输入限购数量')"
                                v-model.number="form.time"></el-input-number>
                            <el-icon class="delete-icon" @click="handleDelete(index)">
                                <Delete />
                            </el-icon>
                        </div>
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

    </el-dialog>
    <productList v-if="open_product" :open_product="open_product"  @closeDialog="closeDialogFunc($event)"></productList>
</template>
<script>
import { languageStore } from '@/store/model/language.js';
import productList from './productList.vue';
const languageData = JSON.stringify(languageStore().languageData);
const languageList = languageStore().languageList;
export default {
    components:{productList},
    data() {
        return {
            languageList: languageList,
            dialogVisible: false,
            loading: false,
            open_product: false,

            form: {
                feed_name: JSON.parse(languageData),
                sort: null,
                price: null,
                time: null,
                status: 1,
            },

            Limited: 1,
            parent: 1,
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
            select_list: [
                {
                    nickName: 'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
                },
                {
                    nickName: 111,
                },
                {
                    nickName: 111,
                },
                {
                    nickName: 111,
                }
            ],
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
    },
    created() {
        this.dialogVisible = this.open_dialog;
    },
    methods: {

        submit() {
            // let self = this;
            // let params = JSON.parse(JSON.stringify(self.form));
            // params.feed_name = JSON.stringify(params.feed_name)
            // self.$refs.form.validate((valid) => {
            //     if (valid) {
            //         self.loading = true;
            //         PorductApi.addFeed(params,true).then(data => {
            //             self.loading = false;
            //             this.$ElMessage({
            //                 message: $t('添加成功'),
            //                 type: 'success'
            //             });
            //             self.dialogFormVisible(true);
            //         }).catch(error => {
            //             self.loading = false;
            //         });
            //     }
            // });
        },

        selectList(){
            this.open_product = true;
        },

        /*关闭弹窗*/
        closeDialogFunc(e) {
            this.open_product = e.openDialog;
            if (e.type == 'success') {
              
            }
        },

        deleteOne(index) {
            this.select_list.splice(index, 1)
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
}

.limit-list {
    width: 100%;
    margin-top: 12px;

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

.select-button {
    flex: 1;
    max-width: calc(33% - 6px);
    min-width: 30%;
    border: solid 1px var(--el-color-tips);
    color: var(--el-color-tips);
    padding: 0 16px;
    border-radius: 4px;
    position: relative;

    p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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