<template>
  <div id='histogram' style="width: 100%; height: 100%;"></div>
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
        mValue: [],
        cValue: []
      }
    },
    created () {
      for (let i in this.allData) {
        this.month.push(this.allData[i].month)
        this.mValue.push(this.allData[i].mValue)
        this.cValue.push(this.allData[i].cValue)
      }
    },
    mounted () {
      var histogram = echarts.init(document.getElementById('histogram'))
      let option = {
        legend: {
          data: ['月成交量', '累计成交量'],
          top: '15%'
        },
        title: {
          text: '月成交量和累计成交量',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        grid: [
          {x: '27%', y: '35%', width: '46%', height: '45%'}
        ],
        xAxis: {
          data: this.month
        },
        yAxis: [{
          type: 'value',
          scale: true,
          min: 0,
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLabel: {
            formatter: '{value} 万元'
          }
        }, {
          type: 'value',
          scale: true,
          min: 0,
          splitNumber: 4,
          boundaryGap: [0.01, 0.01],
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLabel: {
            formatter: '{value} 亿元'
          }
        }],
        color: ['#547B95', '#CD6C4A'],
        series: [{
          name: '月成交量',
          type: 'bar',
          barWidth: '50%',
          yAxisIndex: 0,
          itemStyle: this.itemStyle,
          data: this.mValue
        }, {
          name: '累计成交量',
          type: 'line',
          yAxisIndex: 1,
          data: this.cValue
        }]
      }
      histogram.setOption(option)
    }
  }
</script>