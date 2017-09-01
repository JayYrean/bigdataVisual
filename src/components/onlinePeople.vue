<template>
  <div id="peopleChart" style="width:100%;height:90%;"></div>
</template>

<script>
  import echarts from 'echarts'
  export default{
    name: 'Home',
    props: ['allData'],
    data () {
      return {
        msg: 'oh mygod',
        month: [],
        iPeo: [],
        bPeo: [],
        tPeo: []
      }
    },
    created () {
      for (let i in this.allData) {
        this.month.push(this.allData[i].month)
        this.iPeo.push(this.allData[i].iNum)
        this.bPeo.push(this.allData[i].bNum)
        this.tPeo.push(this.allData[i].tNum)
      }
    },
    mounted () {
      var myChart = echarts.init(document.getElementById('peopleChart'))
      myChart.setOption({
        title: {
          text: '新增人数',
          left: 'left'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['新增投资人数', '新增借款人数', '新增交易人数'],
          right: '3%',
          top: '0%',
          orient: 'vertical',
          itemGap: 3
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.month
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '新增投资人数',
            type: 'bar',
            stack: 'people1',
            barWidth: 10,
            color: ['#008080'],
            data: this.iPeo
          },
          {
            name: '新增借款人数',
            type: 'bar',
            barWidth: 10,
            stack: 'people1',
            color: ['#87cecb'],
            data: this.bPeo
          },
          {
            name: '新增交易人数',
            type: 'bar',
            barWidth: 10,
            stack: 'allPeople',
            color: ['#4682b4'],
            data: this.tPeo
          }
        ]
      })
    }
  }
</script>