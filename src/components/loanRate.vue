<template>
  <div id='loanRate' style="width: 100%; height: 100%;"></div>
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
      var loanRate = echarts.init(document.getElementById('loanRate'))
      let option = {
        legend: {
          data: ['平均借款期限', '综合利率'],
          top: '15%'
        },
        title: {
          text: '借款期限及综合利率变化',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          },
          padding: [5, -10],
          extraCssText: 'height: 80px;'
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
            formatter: '{value} 个月'
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
            formatter: '{value} 利率'
          }
        }],
        color: ['#547B95', '#CD6C4A'],
        series: [{
          name: '平均借款期限',
          type: 'bar',
          barWidth: '50%',
          yAxisIndex: 0,
          itemStyle: this.itemStyle,
          data: this.mValue
        }, {
          name: '综合利率',
          type: 'line',
          yAxisIndex: 1,
          data: this.cValue
        }]
      }
      loanRate.setOption(option)
    }
  }
</script>