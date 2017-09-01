<template>
  <div class="map">
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
              <td rowspan="2" width="30%" height="480px">
                <platform :allData="platformData"></platform>
              </td>
              <td width="30%" height="240px">
                <deal :allData="dealData"></deal>
              </td>
              <td width="30%" height="240px%">
                <all-count :allData="allCountData"></all-count>
              </td>
            </tr>
            <tr>
              <td width="30%" height="240px">
                <money-flow :allData="moneyFlowData"></money-flow>
              </td>
              <td width="30%" height="240px">
                <online-people :allData="onlinePeopleData"></online-people>
              </td>
            </tr>
          </tbody>
        </table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="请选择平台"
      :visible.sync="dialogVisible2"
      size="small"
      top="30%"
      :before-close="handleClose">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedBox" @change="handleCheckedBoxChange">
          <el-checkbox v-for="platformName in platformArr" :label="platformName" :key="platformName">{{platformName}}</el-checkbox>
        </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendPlatformData">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="平台对比数据"
      :visible.sync="dialogVisible3"
      size="large"
      :before-close="handleClose">
        <div class="figureDiv1" style="width: 100%; height: 250px;">
          <div>
            <contrast-pie-chart1></contrast-pie-chart1>
          </div>
          <div>
            <contrast-pie-chart2></contrast-pie-chart2>
          </div>
          <div>
            <contrast-pie-chart3></contrast-pie-chart3>
          </div>
        </div>
        <div class="figureDiv2" style="width: 100%; height: 250px;">
          <div>
            <money-change :allData="moneyChangeData"></money-change>
          </div>
          <div>
            <loan-rate :allData="loanRateData"></loan-rate>
          </div>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import echarts from 'echarts'
import deal from './deal'
import platform from './platform'
import allCount from './allCount'
import moneyFlow from './moneyFlow'
import onlinePeople from './onlinePeople'
import moneyChange from './moneyChange'
import loanRate from './loanRate'
import contrastPieChart1 from './contrastPieChart1'
import contrastPieChart2 from './contrastPieChart2'
import contrastPieChart3 from './contrastPieChart3'
import 'echarts/map/js/china.js'

export default {
  name: 'map',
  data: function () {
    return {
      title: '',
      tableData: {},     // 表格数据
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      map: {},           // 地图数据(名称、经纬度)
      allData: [],        // 所有数据(各个地点的详细数据)
      platformData: [],    // 饼图数据
      dealData: [],
      moneyFlowData: [],
      allCountData: [],
      onlinePeopleData: [],
      loanRateData: [],
      moneyChangeData: [],
      currentTime: 0,       // 时间条的当前年份
      currentRank: 'all',   // 平台等级
      currentField: 'all',  // 所处领域
      platformArr: [],
      checkedBox: [],
      checkAll: false,
      isIndeterminate: true,
      contrastAllData: []
    }
  },
  components: {
    platform,
    deal,
    onlinePeople,
    moneyFlow,
    allCount,
    moneyChange,
    loanRate,
    contrastPieChart1,
    contrastPieChart2,
    contrastPieChart3
  },
  created () {          // 初始化数据
    let context = this
    this.platformArr = ['你我贷', '拍拍贷', '联邦创投', '小九金服', '稳带网']
    this.map = {
      '上海': [121.4648, 31.2891],
      '北京': [116.4551, 40.2539],
      '广州': [113.5107, 23.2196],
      '成都': [103.9526, 30.7617],
      '杭州': [119.5313, 29.8773],
      '武汉': [114.3896, 30.6628],
      '长沙': [113.0823, 28.2568]
    }
    this.allData = [
      [{name: '长沙'}, {
        name: '上海',           // 公司名称
        value: {
          rank: 'AA',          // 等级
          message: {
            local: '上海',      // 公司地点
            bg: '风投系',       // 公司背景
            team: '经验型',     // 团队
            time: '2005年7月',  // 上线时间
            type: '金融'        // 业务类型
          },
          situation: '6月1号开始普遍降息1.5个点，导致满标速度变慢，现开始加息活动，加息1-2个点',
          map1: [{    // 果树财务发布及公比图
            month: '优车贷1月',
            value: 2133,
            rate: 27.20
          }, {
            month: '优车贷2月',
            value: 631,
            rate: 12.00
          }, {
            month: '优车贷3月',
            value: 4841,
            rate: 12.50
          }, {
            month: '优车贷6月',
            value: 1203,
            rate: 13.00
          }, {
            month: '优车贷12月',
            value: 3788,
            rate: 14.50
          }, {
            month: '优车贷14月',
            value: 883,
            rate: 15.50
          }, {
            month: '优车贷18月',
            value: 1597,
            rate: 16.50
          }, {
            month: '优车贷24月',
            value: 286,
            rate: 10.50
          }],
          map2: [{  // 月成交量及累计成交量图
            month: '2月',
            mValue: 6714.45,    // 月成交量
            cValue: 8.46        // 累计成交量
          }, {
            month: '3月',
            mValue: 3819.78,
            cValue: 8.69
          }, {
            month: '4月',
            mValue: 6074.64,
            cValue: 9.31
          }, {
            month: '5月',
            mValue: 7327.78,
            cValue: 9.93
          }, {
            month: '6月',
            mValue: 8037.95,
            cValue: 11.25
          }, {
            month: '7月',
            mValue: 8038,
            cValue: 12.06
          }],
          map3: [{              // 总待收图
            month: '2月',
            value: 2.52
          }, {
            month: '3月',
            value: 2.47
          }, {
            month: '4月',
            value: 2.53
          }, {
            month: '5月',
            value: 2.57
          }, {
            month: '6月',
            value: 2.86
          }, {
            month: '7月',
            value: 3.1
          }],
          map4: [{
            month: '2月',
            value: 2267.76
          }, {
            month: '3月',
            value: -458.89
          }, {
            month: '4月',
            value: 623.63
          }, {
            month: '5月',
            value: 260.78
          }, {
            month: '6月',
            value: 2213.83
          }, {
            month: '7月',
            value: 2214.99
          }],
          map5: [{                // 新增投资人数、新增借款人数、新增交易人数图
            month: '2月',
            iNum: 3443,           // 新增投资人数
            bNum: 722,            // 新增借款人数
            tNum: 4165            // 新增交易人数
          }, {
            month: '3月',
            iNum: 4259,
            bNum: 1053,
            tNum: 5312
          }, {
            month: '4月',
            iNum: 4088,
            bNum: 1008,
            tNum: 5096
          }, {
            month: '5月',
            iNum: 4891,
            bNum: 1053,
            tNum: 5944
          }, {
            month: '6月',
            iNum: 4297,
            bNum: 1185,
            tNum: 5482
          }, {
            month: '7月',
            iNum: 4397,
            bNum: 1421,
            tNum: 5818
          }]
        }
      }], [{name: '长沙'}, {
        name: '北京',
        value: {
          rank: 'AA',
          message: {
            local: '北京',      // 公司地点
            bg: '风投系',       // 公司背景
            team: '经验型',     // 团队
            time: '2006年7月',  // 上线时间
            type: '体育'        // 业务类型
          },
          situation: '6月1号开始普遍降息1.5个点，导致满标速度变慢，现开始加息活动，加息1-2个点',
          map1: [{    // 果树财务发布及公比图
            month: '优车贷1月',
            value: 2133,
            rate: 27.20
          }, {
            month: '优车贷2月',
            value: 631,
            rate: 12.00
          }, {
            month: '优车贷3月',
            value: 4841,
            rate: 12.50
          }, {
            month: '优车贷6月',
            value: 1203,
            rate: 13.00
          }, {
            month: '优车贷12月',
            value: 3788,
            rate: 14.50
          }, {
            month: '优车贷14月',
            value: 883,
            rate: 15.50
          }, {
            month: '优车贷18月',
            value: 1597,
            rate: 16.50
          }, {
            month: '优车贷24月',
            value: 286,
            rate: 10.50
          }],
          map2: [{  // 月成交量及累计成交量图
            month: '2月',
            mValue: 6714.45,    // 月成交量
            cValue: 8.46        // 累计成交量
          }, {
            month: '3月',
            mValue: 3819.78,
            cValue: 8.69
          }, {
            month: '4月',
            mValue: 6074.64,
            cValue: 9.31
          }, {
            month: '5月',
            mValue: 7327.78,
            cValue: 9.93
          }, {
            month: '6月',
            mValue: 8037.95,
            cValue: 11.25
          }, {
            month: '7月',
            mValue: 8038,
            cValue: 12.06
          }],
          map3: [{              // 总待收图
            month: '2月',
            value: 2.52
          }, {
            month: '3月',
            value: 2.47
          }, {
            month: '4月',
            value: 2.53
          }, {
            month: '5月',
            value: 2.57
          }, {
            month: '6月',
            value: 2.86
          }, {
            month: '7月',
            value: 3.1
          }],
          map4: [{
            month: '2月',
            value: 2267.76
          }, {
            month: '3月',
            value: -458.89
          }, {
            month: '4月',
            value: 623.63
          }, {
            month: '5月',
            value: 260.78
          }, {
            month: '6月',
            value: 2213.83
          }, {
            month: '7月',
            value: 2214.99
          }],
          map5: [{                // 新增投资人数、新增借款人数、新增交易人数图
            month: '2月',
            iNum: 3443,           // 新增投资人数
            bNum: 722,            // 新增借款人数
            tNum: 4165            // 新增交易人数
          }, {
            month: '3月',
            iNum: 4259,
            bNum: 1053,
            tNum: 5312
          }, {
            month: '4月',
            iNum: 4088,
            bNum: 1008,
            tNum: 5096
          }, {
            month: '5月',
            iNum: 4891,
            bNum: 1053,
            tNum: 5944
          }, {
            month: '6月',
            iNum: 4297,
            bNum: 1185,
            tNum: 5482
          }, {
            month: '7月',
            iNum: 4397,
            bNum: 1421,
            tNum: 5818
          }]
        }
      }], [{name: '长沙'}, {
        name: '广州',
        value: {
          rank: 'BB',
          message: {
            local: '广州',      // 公司地点
            bg: '风投系',       // 公司背景
            team: '经验型',     // 团队
            time: '2007年7月',  // 上线时间
            type: '计算机'        // 业务类型
          },
          situation: '6月1号开始普遍降息1.5个点，导致满标速度变慢，现开始加息活动，加息1-2个点',
          map1: [{    // 果树财务发布及公比图
            month: '优车贷1月',
            value: 2133,
            rate: 27.20
          }, {
            month: '优车贷2月',
            value: 631,
            rate: 12.00
          }, {
            month: '优车贷3月',
            value: 4841,
            rate: 12.50
          }, {
            month: '优车贷6月',
            value: 1203,
            rate: 13.00
          }, {
            month: '优车贷12月',
            value: 3788,
            rate: 14.50
          }, {
            month: '优车贷14月',
            value: 883,
            rate: 15.50
          }, {
            month: '优车贷18月',
            value: 1597,
            rate: 16.50
          }, {
            month: '优车贷24月',
            value: 286,
            rate: 10.50
          }],
          map2: [{  // 月成交量及累计成交量图
            month: '2月',
            mValue: 6714.45,    // 月成交量
            cValue: 8.46        // 累计成交量
          }, {
            month: '3月',
            mValue: 3819.78,
            cValue: 8.69
          }, {
            month: '4月',
            mValue: 6074.64,
            cValue: 9.31
          }, {
            month: '5月',
            mValue: 7327.78,
            cValue: 9.93
          }, {
            month: '6月',
            mValue: 8037.95,
            cValue: 11.25
          }, {
            month: '7月',
            mValue: 8038,
            cValue: 12.06
          }],
          map3: [{              // 总待收图
            month: '2月',
            value: 2.52
          }, {
            month: '3月',
            value: 2.47
          }, {
            month: '4月',
            value: 2.53
          }, {
            month: '5月',
            value: 2.57
          }, {
            month: '6月',
            value: 2.86
          }, {
            month: '7月',
            value: 3.1
          }],
          map4: [{
            month: '2月',
            value: 2267.76
          }, {
            month: '3月',
            value: -458.89
          }, {
            month: '4月',
            value: 623.63
          }, {
            month: '5月',
            value: 260.78
          }, {
            month: '6月',
            value: 2213.83
          }, {
            month: '7月',
            value: 2214.99
          }],
          map5: [{                // 新增投资人数、新增借款人数、新增交易人数图
            month: '2月',
            iNum: 3443,           // 新增投资人数
            bNum: 722,            // 新增借款人数
            tNum: 4165            // 新增交易人数
          }, {
            month: '3月',
            iNum: 4259,
            bNum: 1053,
            tNum: 5312
          }, {
            month: '4月',
            iNum: 4088,
            bNum: 1008,
            tNum: 5096
          }, {
            month: '5月',
            iNum: 4891,
            bNum: 1053,
            tNum: 5944
          }, {
            month: '6月',
            iNum: 4297,
            bNum: 1185,
            tNum: 5482
          }, {
            month: '7月',
            iNum: 4397,
            bNum: 1421,
            tNum: 5818
          }]
        }
      }], [{name: '长沙'}, {
        name: '成都',
        value: {
          rank: 'AA',
          message: {
            local: '成都',      // 公司地点
            bg: '风投系',       // 公司背景
            team: '经验型',     // 团队
            time: '2008年7月',  // 上线时间
            type: '工业'        // 业务类型
          },
          situation: '6月1号开始普遍降息1.5个点，导致满标速度变慢，现开始加息活动，加息1-2个点',
          map1: [{    // 果树财务发布及公比图
            month: '优车贷1月',
            value: 2133,
            rate: 27.20
          }, {
            month: '优车贷2月',
            value: 631,
            rate: 12.00
          }, {
            month: '优车贷3月',
            value: 4841,
            rate: 12.50
          }, {
            month: '优车贷6月',
            value: 1203,
            rate: 13.00
          }, {
            month: '优车贷12月',
            value: 3788,
            rate: 14.50
          }, {
            month: '优车贷14月',
            value: 883,
            rate: 15.50
          }, {
            month: '优车贷18月',
            value: 1597,
            rate: 16.50
          }, {
            month: '优车贷24月',
            value: 286,
            rate: 10.50
          }],
          map2: [{  // 月成交量及累计成交量图
            month: '2月',
            mValue: 6714.45,    // 月成交量
            cValue: 8.46        // 累计成交量
          }, {
            month: '3月',
            mValue: 3819.78,
            cValue: 8.69
          }, {
            month: '4月',
            mValue: 6074.64,
            cValue: 9.31
          }, {
            month: '5月',
            mValue: 7327.78,
            cValue: 9.93
          }, {
            month: '6月',
            mValue: 8037.95,
            cValue: 11.25
          }, {
            month: '7月',
            mValue: 8038,
            cValue: 12.06
          }],
          map3: [{              // 总待收图
            month: '2月',
            value: 2.52
          }, {
            month: '3月',
            value: 2.47
          }, {
            month: '4月',
            value: 2.53
          }, {
            month: '5月',
            value: 2.57
          }, {
            month: '6月',
            value: 2.86
          }, {
            month: '7月',
            value: 3.1
          }],
          map4: [{
            month: '2月',
            value: 2267.76
          }, {
            month: '3月',
            value: -458.89
          }, {
            month: '4月',
            value: 623.63
          }, {
            month: '5月',
            value: 260.78
          }, {
            month: '6月',
            value: 2213.83
          }, {
            month: '7月',
            value: 2214.99
          }],
          map5: [{                // 新增投资人数、新增借款人数、新增交易人数图
            month: '2月',
            iNum: 3443,           // 新增投资人数
            bNum: 722,            // 新增借款人数
            tNum: 4165            // 新增交易人数
          }, {
            month: '3月',
            iNum: 4259,
            bNum: 1053,
            tNum: 5312
          }, {
            month: '4月',
            iNum: 4088,
            bNum: 1008,
            tNum: 5096
          }, {
            month: '5月',
            iNum: 4891,
            bNum: 1053,
            tNum: 5944
          }, {
            month: '6月',
            iNum: 4297,
            bNum: 1185,
            tNum: 5482
          }, {
            month: '7月',
            iNum: 4397,
            bNum: 1421,
            tNum: 5818
          }]
        }
      }], [{name: '长沙'}, {
        name: '杭州',
        value: {
          rank: 'AA',
          message: {
            local: '杭州',      // 公司地点
            bg: '风投系',       // 公司背景
            team: '经验型',     // 团队
            time: '2009年7月',  // 上线时间
            type: '航天'        // 业务类型
          },
          situation: '6月1号开始普遍降息1.5个点，导致满标速度变慢，现开始加息活动，加息1-2个点',
          map1: [{    // 果树财务发布及公比图
            month: '优车贷1月',
            value: 2133,
            rate: 27.20
          }, {
            month: '优车贷2月',
            value: 631,
            rate: 12.00
          }, {
            month: '优车贷3月',
            value: 4841,
            rate: 12.50
          }, {
            month: '优车贷6月',
            value: 1203,
            rate: 13.00
          }, {
            month: '优车贷12月',
            value: 3788,
            rate: 14.50
          }, {
            month: '优车贷14月',
            value: 883,
            rate: 15.50
          }, {
            month: '优车贷18月',
            value: 1597,
            rate: 16.50
          }, {
            month: '优车贷24月',
            value: 286,
            rate: 10.50
          }],
          map2: [{  // 月成交量及累计成交量图
            month: '2月',
            mValue: 6714.45,    // 月成交量
            cValue: 8.46        // 累计成交量
          }, {
            month: '3月',
            mValue: 3819.78,
            cValue: 8.69
          }, {
            month: '4月',
            mValue: 6074.64,
            cValue: 9.31
          }, {
            month: '5月',
            mValue: 7327.78,
            cValue: 9.93
          }, {
            month: '6月',
            mValue: 8037.95,
            cValue: 11.25
          }, {
            month: '7月',
            mValue: 8038,
            cValue: 12.06
          }],
          map3: [{              // 总待收图
            month: '2月',
            value: 2.52
          }, {
            month: '3月',
            value: 2.47
          }, {
            month: '4月',
            value: 2.53
          }, {
            month: '5月',
            value: 2.57
          }, {
            month: '6月',
            value: 2.86
          }, {
            month: '7月',
            value: 3.1
          }],
          map4: [{
            month: '2月',
            value: 2267.76
          }, {
            month: '3月',
            value: -458.89
          }, {
            month: '4月',
            value: 623.63
          }, {
            month: '5月',
            value: 260.78
          }, {
            month: '6月',
            value: 2213.83
          }, {
            month: '7月',
            value: 2214.99
          }],
          map5: [{                // 新增投资人数、新增借款人数、新增交易人数图
            month: '2月',
            iNum: 3443,           // 新增投资人数
            bNum: 722,            // 新增借款人数
            tNum: 4165            // 新增交易人数
          }, {
            month: '3月',
            iNum: 4259,
            bNum: 1053,
            tNum: 5312
          }, {
            month: '4月',
            iNum: 4088,
            bNum: 1008,
            tNum: 5096
          }, {
            month: '5月',
            iNum: 4891,
            bNum: 1053,
            tNum: 5944
          }, {
            month: '6月',
            iNum: 4297,
            bNum: 1185,
            tNum: 5482
          }, {
            month: '7月',
            iNum: 4397,
            bNum: 1421,
            tNum: 5818
          }]
        }
      }], [{name: '长沙'}, {
        name: '武汉',
        value: {
          rank: 'BB',
          message: {
            local: '武汉',      // 公司地点
            bg: '风投系',       // 公司背景
            team: '经验型',     // 团队
            time: '2010年7月',  // 上线时间
            type: '计算机'        // 业务类型
          },
          situation: '6月1号开始普遍降息1.5个点，导致满标速度变慢，现开始加息活动，加息1-2个点',
          map1: [{    // 果树财务发布及公比图
            month: '优车贷1月',
            value: 2133,
            rate: 27.20
          }, {
            month: '优车贷2月',
            value: 631,
            rate: 12.00
          }, {
            month: '优车贷3月',
            value: 4841,
            rate: 12.50
          }, {
            month: '优车贷6月',
            value: 1203,
            rate: 13.00
          }, {
            month: '优车贷12月',
            value: 3788,
            rate: 14.50
          }, {
            month: '优车贷14月',
            value: 883,
            rate: 15.50
          }, {
            month: '优车贷18月',
            value: 1597,
            rate: 16.50
          }, {
            month: '优车贷24月',
            value: 286,
            rate: 10.50
          }],
          map2: [{  // 月成交量及累计成交量图
            month: '2月',
            mValue: 6714.45,    // 月成交量
            cValue: 8.46        // 累计成交量
          }, {
            month: '3月',
            mValue: 3819.78,
            cValue: 8.69
          }, {
            month: '4月',
            mValue: 6074.64,
            cValue: 9.31
          }, {
            month: '5月',
            mValue: 7327.78,
            cValue: 9.93
          }, {
            month: '6月',
            mValue: 8037.95,
            cValue: 11.25
          }, {
            month: '7月',
            mValue: 8038,
            cValue: 12.06
          }],
          map3: [{              // 总待收图
            month: '2月',
            value: 2.52
          }, {
            month: '3月',
            value: 2.47
          }, {
            month: '4月',
            value: 2.53
          }, {
            month: '5月',
            value: 2.57
          }, {
            month: '6月',
            value: 2.86
          }, {
            month: '7月',
            value: 3.1
          }],
          map4: [{
            month: '2月',
            value: 2267.76
          }, {
            month: '3月',
            value: -458.89
          }, {
            month: '4月',
            value: 623.63
          }, {
            month: '5月',
            value: 260.78
          }, {
            month: '6月',
            value: 2213.83
          }, {
            month: '7月',
            value: 2214.99
          }],
          map5: [{                // 新增投资人数、新增借款人数、新增交易人数图
            month: '2月',
            iNum: 3443,           // 新增投资人数
            bNum: 722,            // 新增借款人数
            tNum: 4165            // 新增交易人数
          }, {
            month: '3月',
            iNum: 4259,
            bNum: 1053,
            tNum: 5312
          }, {
            month: '4月',
            iNum: 4088,
            bNum: 1008,
            tNum: 5096
          }, {
            month: '5月',
            iNum: 4891,
            bNum: 1053,
            tNum: 5944
          }, {
            month: '6月',
            iNum: 4297,
            bNum: 1185,
            tNum: 5482
          }, {
            month: '7月',
            iNum: 4397,
            bNum: 1421,
            tNum: 5818
          }]
        }
      }]
    ]
    this.loanRateData = this.allData[0][1].value.map2
    window.eventBus.$on('changeYear', function (msg) {
      context.currentRank = 'cache'
      context.currentField = 'cache'
      context.currentTime = msg
    })
    window.eventBus.$on('currentRank', function (msg) {
      context.currentTime = -1
      context.currentField = 'cache'
      context.currentRank = msg
    })
    window.eventBus.$on('currentField', function (msg) {
      context.currentTime = -1
      context.currentRank = 'cache'
      context.currentField = msg
    })
    window.eventBus.$on('showDialog', function () {
      context.dialogVisible2 = !context.dialogVisible2
    })
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
          message: '地点: ' + params.data.value[2].message.local + ' 背景: ' + params.data.value[2].message.bg + ' 团队: ' + params.data.value[2].message.team + ' 上线时间: ' + params.data.value[2].message.time + ' 业务类型: ' + params.data.value[2].message.type,
          situation: params.data.value[2].situation
        }
        context.platformData = params.data.value[2].map1
        context.dealData = params.data.value[2].map2
        context.allCountData = params.data.value[2].map3
        context.moneyFlowData = params.data.value[2].map4
        context.onlinePeopleData = params.data.value[2].map5
        context.dialogVisible = true
      }
    })
    var geoCoordMap = this.map
    var CSData = this.allData

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

    var refreshMap = function (arr, val) {
      series[0].data = convertData(arr)
      series[1].data = val === 0 ? [] : convertData(arr)
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
        }
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
    this.$watch('currentTime', function (newVal, oldVal) {
      if (newVal === -1) {
        return
      }
      let arr = CSData
      arr = arr.filter(function (item) {
        return item[1].value.message.time.slice(0, 4) === (newVal + 2004).toString()
      })
      arr = newVal === 0 ? CSData : arr
      refreshMap(arr, newVal)
      // console.log('time', newVal)
    })
    this.$watch('currentRank', function (newVal, oldVal) {
      // console.log(newVal)
      if (newVal === 'cache') {
        return
      }
      let arr = CSData
      arr = arr.filter(function (item) {
        return item[1].value.rank === newVal
      })
      newVal === 'all' ? refreshMap(CSData, 0) : refreshMap(arr, 1)
      // console.log('rank')
    })
    this.$watch('currentField', function (newVal, oldVal) {
      if (newVal === 'cache') {
        return
      }
      let arr = CSData
      arr = arr.filter(function (item) {
        return item[1].value.message.type === newVal
      })
      newVal === 'all' ? refreshMap(CSData, 0) : refreshMap(arr, 1)
      // console.log('field')
    })
  },
  methods: {
    handleClose: function (done) {
      done()
    },
    handleCheckAllChange: function (event) {
      this.checkedBox = event.target.checked ? this.platformArr : []
      this.isIndeterminate = false
    },
    handleCheckedBoxChange: function (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.platformArr.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.platformArr.length
    },
    sendPlatformData: function () {
      this.dialogVisible2 = false
      this.dialogVisible3 = true
    }
  },
  beforeDestory () {
    window.eventBus.$off('currentYear')
    window.eventBus.$off('currentRank')
    window.eventBus.$off('currentField')
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
.figureDiv1>div{
  box-sizing:border-box;
  border: 0.5px solid #dfe6ec;
  float: left;
  width: 33.33%;
  height: 100%;
}
.figureDiv2>div{
  box-sizing: border-box;
  border: 1px solid #dfe6ec;
  float: left;
  width: 50%;
  height: 100%;
}
.map .el-dialog__body .figureDiv1>div:hover, .map .el-dialog__body .figureDiv2>div:hover{
  background: #eee;
  cursor: pointer;
}

.map .el-dialog__body tr:first-child td{
  background: #fafafa;
}
.map .el-dialog__body td:hover{
  background: #eee;
  cursor: pointer;
}
</style>