<template>
   <div id="contrstPieChart2" style="width: 100%;height: 100%;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  mounted: function () {
    var myChart = echarts.init(document.getElementById('contrstPieChart2'))
    var option = {
      baseOption: {
        timeline: {
          axisType: 'category',
          autoPlay: true,
          playInterval: 1000,
          symbolSize: 10,
          left: '3%',
          right: '3%',
          orient: 'horizontal',
          lineStyle: {
            color: '#0072ec',
            type: 'dashed',
            width: '1'
          },
          controlStyle: {
            position: 'left',
            normal: {
              color: '#0072ec',
              borderColor: '#0072ec'
            },
            emphasis: {
              borderColor: '#0072ec'
            }
          },
          checkpointStyle: {
            color: '#0072ec',
            borderColor: '#66b3ff',
            borderWidth: 2
          },
          itemStyle: {
            emphasis: {
              color: '#0072ec',
              borderWidth: 2
            },
            normal: {
              color: '#0072ec'
            }
          },
          data: [
            {
              value: '201701',
              tooltip: {
                formatter: '2017年1月'
              }
            },
            {
              value: '201702',
              tooltip: {
                formatter: '2017年2月'
              }
            },
            {
              value: '201703',
              tooltip: {
                formatter: '2017年3月'
              }
            },
            {
              value: '201704',
              tooltip: {
                formatter: '2017年4月'
              }
            },
            {
              value: '201705',
              tooltip: {
                formatter: '2017年5月'
              }
            },
            {
              value: '201706',
              tooltip: {
                formatter: '2017年6月'
              }
            }
          ],
          label: {
            formatter: function (s) {
              return (new Date(s)).getFullYear()
            }
          }
        },
        title: {
          text: '月成交量变化',
          left: 'center',
          textStyle: {
            color: '#66b3ff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          extraCssText: 'height: 50px; width: 180px; text-align: center;'
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          top: '15%',
          padding: 0,
          data: ['你我贷', '拍拍贷', '联邦创投', '小九金服', '稳贷网']
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: [0, '30%'],
          center: ['50%', '50%'],
          data: [
            {value: 160, name: '你我贷'},
            {value: 160, name: '拍拍贷'},
            {value: 234, name: '联邦创投'},
            {value: 380, name: '小九金服'},
            {value: 850, name: '稳贷网'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      options: [{
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: [0, '35%'],
          center: ['50%', '60%'],
          data: [
            {value: 160, name: '你我贷'},
            {value: 160, name: '拍拍贷'},
            {value: 234, name: '联邦创投'},
            {value: 380, name: '小九金服'},
            {value: 850, name: '稳贷网'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      {
        series: [{
          data: [
            {value: 60, name: '你我贷'},
            {value: 160, name: '拍拍贷'},
            {value: 234, name: '联邦创投'},
            {value: 380, name: '小九金服'},
            {value: 850, name: '稳贷网'}
          ]
        }]
      },
      {
        series: [{
          data: [
            {value: 160, name: '你我贷'},
            {value: 60, name: '拍拍贷'},
            {value: 234, name: '联邦创投'},
            {value: 380, name: '小九金服'},
            {value: 850, name: '稳贷网'}
          ]
        }]
      },
      {
        series: [{
          data: [
            {value: 160, name: '你我贷'},
            {value: 160, name: '拍拍贷'},
            {value: 34, name: '联邦创投'},
            {value: 380, name: '小九金服'},
            {value: 850, name: '稳贷网'}
          ]
        }]
      },
      {
        series: [{
          data: [
            {value: 160, name: '你我贷'},
            {value: 160, name: '拍拍贷'},
            {value: 234, name: '联邦创投'},
            {value: 80, name: '小九金服'},
            {value: 850, name: '稳贷网'}
          ]
        }]
      },
      {
        series: [{
          data: [
            {value: 60, name: '你我贷'},
            {value: 160, name: '拍拍贷'},
            {value: 234, name: '联邦创投'},
            {value: 380, name: '小九金服'},
            {value: 50, name: '稳贷网'}
          ]
        }]
      }]
    }
    myChart.setOption(option)
  }
}
</script>
