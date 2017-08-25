<template>
  <div class="map ">
  	<div id="map"></div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      size="large"
      :before-close="handleClose">
        <table>
          <tbody>
            <tr>
              <td>{{ tableData.name }}</td>
              <td>{{ tableData.rank }}</td>
              <td>{{ tableData.message }}</td>
            </tr>
            <tr>
              <td>舆情</td>
              <td colspan="2">{{ tableData.situation }}</td>
            </tr>
            <tr>
              <td rowspan="2">{{ tableData.map1 }}</td>
              <td>{{ tableData.map2 }}</td>
              <td>{{ tableData.map3 }}</td>
            </tr>
            <tr>
              <td>{{ tableData.map4 }}</td>
              <td>{{ tableData.map5 }}</td>
            </tr>
          </tbody>
        </table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'

export default {
  name: 'map',
  data: function () {
    return {
      title: '',
      tableData: {},
      dialogVisible: false
    }
  },
  mounted () {
    var myMap = echarts.init(document.getElementById('map'))
    var context = this
    myMap.on('click', function (params) {
      if (params.componentType === 'series' && params.componentSubType !== 'lines') {
        context.title = params.name
        context.tableData = {
          name: params.data.name,
          rank: params.data.value[2].rank,
          message: params.data.value[2].message,
          situation: params.data.value[2].situation,
          map1: params.data.value[2].map1,
          map2: params.data.value[2].map2,
          map3: params.data.value[2].map3,
          map4: params.data.value[2].map4,
          map5: params.data.value[2].map5
        }
        context.dialogVisible = true
        console.log(params)
      }
    })
    var geoCoordMap = {
      '上海': [121.4648, 31.2891],
      '北京': [116.4551, 40.2539],
      '广州': [113.5107, 23.2196],
      '成都': [103.9526, 30.7617],
      '杭州': [119.5313, 29.8773],
      '武汉': [114.3896, 30.6628],
      '长沙': [113.0823, 28.2568]
    }
    var CSData = [
      [{name: '长沙'}, {name: '上海', value: {rank: 'AAA', message: '地点: 上海 背景: 风投系 团队: 经验型 上线时间: 2014年7月 业务类型: 车贷', situation: '6月1号开始普遍降息1.5个点，导致满标速度变慢，现开始加息活动，加息1-2个点', map1: '平台标的及业务占比图数据', map2: '月成交量和累计成交额数据', map3: '总待收数据', map4: '现金流数据', map5: '注册人数、投资人数、借款人数数据'}}],
      [{name: '长沙'}, {name: '北京', value: {rank: 'AAA', message: '地点: 上海 背景: 风投系 团队: 经验型 上线时间: 2014年7月 业务类型: 车贷', situation: '6月1号开始普遍降息1.5个点，导致满标速度变慢，现开始加息活动，加息1-2个点', map1: '平台标的及业务占比图数据', map2: '月成交量和累计成交额数据', map3: '总待收数据', map4: '现金流数据', map5: '注册人数、投资人数、借款人数数据'}}],
      [{name: '长沙'}, {name: '广州', value: {rank: 'A', message: '地点: 上海 背景: 风投系 团队: 经验型 上线时间: 2014年7月 业务类型: 车贷', situation: '6月1号开始普遍降息1.5个点，导致满标速度变慢，现开始加息活动，加息1-2个点', map1: '平台标的及业务占比图数据', map2: '月成交量和累计成交额数据', map3: '总待收数据', map4: '现金流数据', map5: '注册人数、投资人数、借款人数数据'}}],
      [{name: '长沙'}, {name: '成都', value: {rank: 'AA', message: '地点: 上海 背景: 风投系 团队: 经验型 上线时间: 2014年7月 业务类型: 车贷', situation: '6月1号开始普遍降息1.5个点，导致满标速度变慢，现开始加息活动，加息1-2个点', map1: '平台标的及业务占比图数据', map2: '月成交量和累计成交额数据', map3: '总待收数据', map4: '现金流数据', map5: '注册人数、投资人数、借款人数数据'}}],
      [{name: '长沙'}, {name: '杭州', value: {rank: 'AAA', message: '地点: 上海 背景: 风投系 团队: 经验型 上线时间: 2014年7月 业务类型: 车贷', situation: '6月1号开始普遍降息1.5个点，导致满标速度变慢，现开始加息活动，加息1-2个点', map1: '平台标的及业务占比图数据', map2: '月成交量和累计成交额数据', map3: '总待收数据', map4: '现金流数据', map5: '注册人数、投资人数、借款人数数据'}}],
      [{name: '长沙'}, {name: '武汉', value: {rank: 'A', message: '地点: 上海 背景: 风投系 团队: 经验型 上线时间: 2014年7月 业务类型: 车贷', situation: '6月1号开始普遍降息1.5个点，导致满标速度变慢，现开始加息活动，加息1-2个点', map1: '平台标的及业务占比图数据', map2: '月成交量和累计成交额数据', map3: '总待收数据', map4: '现金流数据', map5: '注册人数、投资人数、借款人数数据'}}]
    ]

    var convertData = function (data) {
      var res = []
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i]
        var fromCoord = geoCoordMap[dataItem[0].name]
        var toCoord = geoCoordMap[dataItem[1].name]
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord]
          })
        }
      }
      return res
    }

    var refreshMap = function (arr) {
      series[0].data = convertData(arr)
      series[1].data = convertData(arr)
      series[2].data = arr.map(function (arrItem) {
        return {
          name: arrItem[1].name,
          value: geoCoordMap[arrItem[1].name].concat([arrItem[1].value])
        }
      })
      myMap.setOption(option)
    }

    var series = [
      {
        name: '长沙',
        type: 'lines',
        zlevel: 1,
        effect: {
          show: false,
          period: 6,
          trailLength: 0.7,
          color: '#fff',
          symbolSize: 2
        },
        lineStyle: {
          normal: {
            color: '#a6c84c',
            width: 0,
            curveness: 0.2
          }
        },
        data: convertData(CSData)
      },
      {
        name: '长沙',
        type: 'lines',
        zlevel: 2,
        symbol: ['none', 'arrow'],
        symbolSize: 10,
        tooltip: {
          formatter: function (params) {
            return params.data.fromName + ' -> ' + params.data.toName
          }
        },
        effect: {
          show: true,
          period: 3,
          trailLength: 0,
          symbol: 'arrow',
          symbolSize: 10
        },
        lineStyle: {
          normal: {
            color: '#a6c84c',
            width: 1,
            opacity: 0.6,
            curveness: 0.2
          }
        },
        data: convertData(CSData)
      },
      {
        name: '长沙',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        symbolSize: 10,
        itemStyle: {
          normal: {
            color: '#a6c84c'
          }
        },
        data: CSData.map(function (dataItem) {
          return {
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
          }
        })
      }
    ]

    var option = {
      backgroundColor: '#404a59',
      title: {
        text: '星火钱包',
        subtext: '数据纯属虚构',
        left: 'center',
        top: '10%',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false
          }
        },
        roam: false,
        itemStyle: {
          normal: {
            areaColor: '#323c48',
            borderColor: '#456885'
          },
          emphasis: {
            areaColor: '#2a333d'
          }
        }
      },
      series: series
    }
    myMap.setOption(option)
    console.log(refreshMap)
    // refreshMap(CSData)
  },
  methods: {
    handleClose: function (done) {
      done()
    }
  }

}
</script>

<style>
.map, #map{
  width: 100%;
  height: 100%;
}
.map{
  margin-top:8rem;
}
.map .el-dialog__body table{
  background: #dfe6ec;
  width: 100%;
  height: 100%;
}
.map .el-dialog__body td{
  padding: 0.4rem 0.7rem;
  background: #fff;
  color: #1f2d3d;
}
.map .el-dialog__body tr:first-child td{
  background: #fafafa;
}
.map .el-dialog__body td:hover{
  background: #eee;
  cursor: pointer;
}
</style>