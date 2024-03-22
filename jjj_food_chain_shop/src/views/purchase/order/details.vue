<template>
    <div class="purchase-box">
        <el-form size="small" ref="form" class="purchase-form" :model="form" label-position="top" label-width="180px">
            <div class="common-button-wrapper">
                <el-button size="small" class="return-button" link @click="cancelFunc"><el-icon>
                        <ArrowLeftBold />
                    </el-icon>{{ $t('返回') }}</el-button>
            </div>
            <div class="purchase-form-flex" ref="formContainer">
                <!-- 基础设置 -->
                <basics></basics>
                <!-- 采购明细 -->
                <detail @check="check"></detail>

                <div>
                    <div class="common-form">{{ $t('操作记录') }}</div>
                    <div class="timeline-box">
                        <el-timeline class="timeline-main" >
                            <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon" :type="activity.type" :color="activity.color"
                                :size="activity.size" :hollow="activity.hollow" :timestamp="activity.timestamp">
                                {{ activity.content }}
                            </el-timeline-item>
                        </el-timeline>
                    </div>

                </div>
            </div>
            <!--提交-->

        </el-form>
    </div>
</template>
<script>
import basics from './components/basics.vue';
import detail from './components/detail.vue'
export default {
    components: {
        basics,
        detail
    },
    data() {
        return {
            activities: [
                {
                    content: '张三 操作 通过',
                    timestamp: '2018-04-03 20:46',
                    color: '#0bbd87',
                },
                {
                    content: '张三 操作 驳回（驳回原因：这是驳回原因）',
                    timestamp: '2018-04-03 20:46',
                },
            ],
            form: {
                applicant: "",
                time: "",
                way: 1,
                select_list: [],
            },
        }
    },
    provide: function () {
        return {
            form: this.form
        }
    },
    methods: {
        check() {
            this.$refs.form.validateField('select_list');
        },

        onSubmit() {
            this.$refs.form.validate(valid => {

            })
        },

        cancelFunc() {
            this.$router.push('/purchase/order/index');
        },
    },
}
</script>
<style scoped>
.purchase-box {
    height: calc(100% - 14px);
    overflow: hidden;
}

.purchase-form {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .purchase-form-flex {
        flex: 1 1 auto;
        overflow-y: auto;
    }

    .common-button-wrapper {
        flex: 0 0 auto;
        flex-shrink: 0;
        border: none;
        padding: 0 0 16px 0;
        justify-content: start;

        .return-button {
            padding: 0 !important;
        }
    }

    :deep(.el-select__placeholder) {
        font-size: 14px;
    }
}
.timeline-box{
    padding-left: 1px;
    .timeline-main{
        max-width: 800px;
        font-size: 14px;
    }
}
</style>