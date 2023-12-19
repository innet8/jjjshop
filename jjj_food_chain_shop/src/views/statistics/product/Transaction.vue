<template>
  <!--
          作者：luoyiming
          时间：2019-10-24
          描述：统计-销售统计-交易统计
      -->
  <div class="mt30">
    <div class="d-b-c">
    </div>
    <div class="">
      <div class="Echarts">
        <div id="TransactionChart"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import StatisticsApi from '@/api/statistics.js';
  import {
    formatDate
  } from '@/utils/DateTime.js'
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
        myChart: null,
        /*图表数据*/
        option: {
          title: {
            //text: 'ECharts 入门示例'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis'
          },
          yAxis: {}
        }
      };
    },
    props:['profileList'],
    watch:{
      'profileList':function(n,o){
        if(n!=o){
          this.dataList=n;
          this.loading=false;
          this.getData();
        }
      }
    },
    created() {

    },
    mounted() {
      this.myEcharts();
    },
    methods: {
      /*创建图表对象*/
      myEcharts() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById('TransactionChart'));
        /*获取列表*/
        this.getData();
      },

      /*格式数据*/
      createOption() {
        if (!this.loading) {
          console.log(11111111111)
          let names = [];
          let xAxis = this.dataList.days;
          let series1 = [];
          let series2 = [];
          let series3 = [];
          let series4 = [];
          this.dataList.profileList.forEach(item => {
            series1.push(item.income_price);
            series2.push(item.order_total);
            series3.push(item.refund_money);
            series4.push(item.total_money);
          });
            names = ['成交额', '成交量','成交量2','成交量3'];
          // 指定图表的配置项和数据
          this.option.xAxis = {
            type: 'category',
            boundaryGap: false,
            data: xAxis
          };
          this.option.color = ["#5E73E3", "#31C0D0",'#409eff','#155bd4'];

          this.option.legend = {
            data: [{
              name: names[0],
              color: '#ccc'
            }, {
              name: names[1]
            }]
          };
          this.option.series = [{
              name: names[0],
              type: 'line',
              data: series1,
              lineStyle: {
                color: '#5E73E3'
              }
            },
            {
              name: names[1],
              type: 'line',
              data: series2,
              lineStyle: {
                color: '#31C0D0'
              }
            },
            {
              name: names[2],
              type: 'line',
              data: series3,
              lineStyle: {
                color: '#409eff'
              }
            },
            {
              name: names[3],
              type: 'line',
              data: series4,
              lineStyle: {
                color: '#155bd4'
              }
            }
          ];

          this.myChart.setOption(this.option);
          this.myChart.resize();
        }
      },

      /*获取列表*/
      getData() {
        let self = this;
        self.createOption();
      }
    }
  };
</script>

<style>
  .Echarts {
    box-sizing: border-box;
  }

  .Echarts>div {
    width: 100%;
    height: 400px;
    box-sizing: border-box;
  }
</style>
