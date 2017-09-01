<template>
	<div id="moneyChange" style="width:100%; height: 100%;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      month: [],
      value: []
    }
  },
  mounted () {
    var moneyChange = echarts.init(document.getElementById('moneyChange'))
    var labelRight = {
      normal: {
        position: 'right'
      }
    }
    var labelLeft = {
      normal: {
        position: 'left'
      }
    }
    var option = {
      title: {
        text: '现金流变化',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        extraCssText: 'height: 50px;'
      },
      grid: {
        top: '25%',
        bottom: 5
      },
      xAxis: {
        type: 'value',
        position: 'top',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'category',
        axisLine: {show: false},
        axisLabel: {show: false},
        axisTick: {show: false},
        splitLine: {show: false},
        data: ['你我贷', '拍拍贷', '联邦创投', '小九金服', '稳贷网']
      },
      series: [
        {
          name: '生活费',
          type: 'bar',
          stack: '总量',
          barWidth: '50%',
          label: {
            normal: {
              show: true,
              formatter: '{b}'
            }
          },
          data: [
            {value: -0.07, label: labelRight},
            {value: -0.09, label: labelRight},
            {value: 0.2, label: labelLeft},
            {value: -0.23, label: labelRight},
            {value: 0.08, label: labelLeft}
          ]
        }
      ]
    }
    moneyChange.setOption(option)
  }
}
</script>