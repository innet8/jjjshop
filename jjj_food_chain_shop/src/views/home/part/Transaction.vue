<template>
    <!--
          作者：luoyiming
          时间：2019-10-24
          描述：统计-销售统计-交易统计
      -->
    <div>
        <div class="">
            <div class="Echarts">
                <div id="TransactionChart"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import StatisticsApi from '@/api/statistics.js';
import {
    formatDate
} from '@/utils/DateTime.js'
let myChart = null;
export default {
    data() {
        let endDate = new Date();
        let startDate = new Date();
        startDate.setTime(startDate.getTime() - 3600 * 1000 * 24 * 7);
        return {
            /*是否正在加载*/
            loading: true,
            /*类别*/
            activeName: 'order',
            /*时间快捷选项*/
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }
                ]
            },
            datePicker: [formatDate(startDate, 'yyyy-MM-dd'), formatDate(endDate, 'yyyy-MM-dd')],
            /*数据对象*/
            dataList: null,
            /*交易统计图表对象*/
            // myChart: null,
            /*图表数据*/
            option: {
                title: {
                    text: $t('近七日数据'),
                    textStyle: {
                        fontWeight: 'bold',  // 设置文字粗细为粗体
                        color:'#100A05',
                    }
                },
                grid: {
                    left: '40px',
                    right: '40px',
                    bottom: '0px',
                    top: '60px',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis'
                },
                yAxis: {
                    type: 'value'
                }
            }
        };
    },
    created() {

    },
    mounted() {
        this.myEcharts();
    },
    methods: {

        /*切换*/
        handleClick(e) {
            this.getData();
        },

        /*选择时间*/
        changeDate() {
            this.getData();
        },

        /*创建图表对象*/
        myEcharts() {
            // 基于准备好的dom，初始化echarts实例
            myChart = echarts.init(document.getElementById('TransactionChart'));
            /*获取列表*/
            this.getData();
        },

        /*格式数据*/
        createOption() {
            if (!this.loading) {
                let names = [];
                let xAxis = this.dataList.days;
                let series1 = [];
                let series2 = [];
                this.dataList.data.forEach(item => {
                    series1.push(item.total_money);
                    series2.push(item.total_num);
                });
                if (this.activeName == 'order') {
                    names = [$t('成交额'), $t('订单量')];
                } else if (this.activeName == 'refund') {
                    names = ['退单额', '退单量'];
                }

                // 指定图表的配置项和数据
                this.option.xAxis = {
                    type: 'category',
                    boundaryGap: false,
                    data: xAxis
                };
                this.option.color = ["#FFBE00", "#FE852E"];

                this.option.legend = {
                    data: [{
                        name: names[0],
                        color: '#ccc'
                    }, {
                        name: names[1]
                    }],
                    right: 20
                };
                this.option.series = [{
                    name: names[0],
                    type: 'line',
                    data: series1,
                    lineStyle: {
                        color: '#FFBE00'
                    }
                },
                {
                    name: names[1],
                    type: 'line',
                    data: series2,
                    lineStyle: {
                        color: '#FE852E'
                    }
                }
                ];

                myChart.setOption(this.option);
                myChart.resize();
            }
        },

        /*获取列表*/
        getData() {
            let self = this;
            self.loading = true;
            StatisticsApi.getOrderByDate({
                search_time: self.datePicker,
                type: self.activeName
            },
                true
            )
                .then(res => {
                    self.dataList = res.data;
                    self.loading = false;
                    self.createOption();
                })
                .catch(error => { });
        }
    }
};
</script>

<style scoped>
.Echarts {
    box-sizing: border-box;
}

.Echarts>div {
    width: 100%;
    height: 400px;
    box-sizing: border-box;
}
</style>
