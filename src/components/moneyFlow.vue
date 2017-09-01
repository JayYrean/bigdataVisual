<template>
  <div id='money' style="width: 100%; height: 100%;">
  </div>
</template>
<script lang='babel'>
  import echarts from 'echarts'
  export default {
    props: ['allData'],
    data () {
      return {
        itemStyle: {
          emphasis: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
          }
        },
        month: [],
        value: []
      }
    },
    created () {
      var labelRight = {
        normal: {
          position: 'right'
        }
      }
      for (let i in this.allData) {
        this.month.push(this.allData[i].month)
        this.value.push({
          value: this.allData[i].value,
          label: labelRight
        })
      }
    },
    mounted () {
      var histogram = echarts.init(document.getElementById('money'))
      histogram.setOption({
        legend: {
          data: ['现金流'],
          right: '3%'
        },
        title: {
          text: '现金流',
          subtext: 'From ExcelHome',
          left: '10%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 80,
          bottom: 30,
          left: '20%'
        },
        yAxis: {
          type: 'value',
          position: 'top',
          splitLine: {lineStyle: {type: 'dashed'}}
        },
        xAxis: {
          type: 'category',
          axisLine: {show: false},
          axisLabel: {show: true},
          axisTick: {show: false},
          splitLine: {show: false},
          data: this.month
        },
        series: [
          {
            name: '现金流',
            type: 'bar',
            stack: '总量',
            barWidth: '50%',
            label: {
              normal: {
                show: false
              }
            },
            color: ['#008080'],
            data: this.value
          }
        ]
      })
    }
  }
</script>
<style>
  #histogram {
    width: 1000px;
    height: 500px;
  }
</style>