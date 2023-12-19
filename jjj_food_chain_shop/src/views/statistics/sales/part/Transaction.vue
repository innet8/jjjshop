<template>
  <!--
          作者：luoyiming
          时间：2019-10-24
          描述：统计-销售统计-交易统计
      -->
  <div class="mt30">
    <div class="common-form">交易统计</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="订单数" name="order"></el-tab-pane>
    </el-tabs>
    <div class="">
      <div class="Echarts"><div id="TransactionChart"></div></div>
    </div>
  </div>
</template>

<script>
import StatisticsApi from '@/api/statistics.js';
import * as echarts from "echarts";
let myChart;
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
      // pickerOptions: {
      //   shortcuts: [
      //     {
      //       text: '最近一周',
      //       onClick(picker) {
      //         const end = new Date();
      //         const start = new Date();
      //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      //         picker.$emit('pick', [start, end]);
      //       }
      //     },
      //     {
      //       text: '最近一个月',
      //       onClick(picker) {
      //         const end = new Date();
      //         const start = new Date();
      //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      //         picker.$emit('pick', [start, end]);
      //       }
      //     },
      //     {
      //       text: '最近三个月',
      //       onClick(picker) {
      //         const end = new Date();
      //         const start = new Date();
      //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      //         picker.$emit('pick', [start, end]);
      //       }
      //     }
      //   ]
      // },
      // datePicker: [formatDate(startDate, 'yyyy-MM-dd'), formatDate(endDate, 'yyyy-MM-dd')],
      /*数据对象*/
      dataList: null,
      /*交易统计图表对象*/
      // myChart: null,
      /*图表数据*/
      option: {
        title: {
          //text: 'ECharts 入门示例'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '6%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        yAxis: {}
      }
    };
  },
  props: ['shop_supplier_id', 'datePicker'],
  created() {},
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
        this.dataList.orderData.forEach(item => {
          series1.push(item.total_money);
          series2.push(item.total_num);
        });
        console.log(111111111111)
        names = ['成交额', '成交量'];
        // 指定图表的配置项和数据
        this.option.xAxis = {
          type: 'category',
          boundaryGap: false,
          data: xAxis
        };
        this.option.color = ['red', '#409EFF'];

        this.option.legend = {
          data: [{ name: names[0], color: '#ccc' }, { name: names[1] }]
        };
        this.option.series = [
          {
            name: names[0],
            type: 'line',
            data: series1,
            lineStyle: {
              color: 'red'
            }
          },
          {
            name: names[1],
            type: 'line',
            data: series2,
            lineStyle: {
              color: '#409EFF'
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
      console.log(1);
      StatisticsApi.getOrderTotal(
        {
          days: self.datePicker,
          // type: self.activeName
          shop_supplier_id: self.shop_supplier_id
        },
        true
      )
        .then(res => {
          self.dataList = res.data;
          console.log(self.dataList);
          self.loading = false;
          self.createOption();
        })
        .catch(error => {});
    }
  }
};
</script>

<style>
.Echarts {
  box-sizing: border-box;
}
.Echarts > div {
  width: 100%;
  height: 400px;
  box-sizing: border-box;
}
</style>
