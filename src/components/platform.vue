<template>
  <div id="homeChart" style="width: 100%; height: 100%;" width="100%" height="100%"></div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    name: 'Home',
    props: ['allData'],
    data () {
      return {
        msg: 'oh mygod',
        month: []
      }
    },
    created () {
      for (let item in this.allData) {
        this.month.push(this.allData[item].month)
      }
    },
    mounted () {
      var myChart = echarts.init(document.getElementById('homeChart'))
      const context = this
      var arr = []
      for (var i in this.allData) {
        arr.push({
          name: this.allData[i].month,
          value: this.allData[i].value,
          rate: this.allData[i].rate
        })
      }
      var series = [
        {
          name: '1',
          type: 'pie',
          tooltip: false,
          hoverAnimation: false,
          radius: [15, 15.5],
          color: ['#fff'],
          center: ['50%', '50%'],
          labelLine: {
            normal: {
              show: false     // 不需要设置引导线
            }
          },
          data: [
            {value: 0, name: ''}
          ]
        },
        {
          name: '详细信息',
          type: 'pie',
          radius: [20, '35%'],
          center: ['50%', '50%'],
          roseType: 'area',
          data: arr
        }
      ]
      var option = {
        title: {
          text: '果树财富业务发布及公比',
          subtext: '单位：万元',
          x: 'center',
          y: '3%',
          textStyle: {
            color: '#555'
          }
        },
        tooltip: {
          formatter: function (params) {
            return `${params.data.name}: ${params.data.value} (${params.data.rate}%)`
          }
        },
        legend: {
          x: 'center',
          y: '81%',
          data: context.month
        },
        calculable: true,
        series: series
      }
      myChart.setOption(option)
    }
  }
</script>

<style>
<style>