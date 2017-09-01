<template>
  <div class="tool-tips">
    <div class="button-block">
      <el-button type="primary" @click="timeBarVisible = !timeBarVisible">调研历史</el-button>
      <el-dropdown @command="selectRank">
        <el-button type="primary" trigger="click">
          所有等级<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided command="all">全部</el-dropdown-item>
          <el-dropdown-item divided command="AA">AA级</el-dropdown-item>
          <el-dropdown-item divided command="BB">BB级</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown @command="selectField">
        <el-button type="primary" trigger="click">
          所处领域<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided command="all">全部</el-dropdown-item>
          <el-dropdown-item divided command="金融">金融</el-dropdown-item>
          <el-dropdown-item divided command="体育">体育</el-dropdown-item>
          <el-dropdown-item divided command="计算机">计算机</el-dropdown-item>
          <el-dropdown-item divided command="工业">工业</el-dropdown-item>
          <el-dropdown-item divided command="航天">航天</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary" @click="showDialog">平台对比</el-button>
    </div>
    <transition name="bar-fade">
      <div class="time-bar" v-if="timeBarVisible">
        <i class="el-icon-arrow-left turnYear" @click="isActive--"></i>
        <div class="slider">
          <el-tooltip v-for="(item, index) in yearList" :key="item" effect="dark" :content="item" placement="top">
            <div class="slider-step" :class="isActive == index ? 'isActive' : ''" :style="itemPosition(index)" @click="isActive = index"></div>
          </el-tooltip>
        </div>
        <i class="el-icon-arrow-right turnYear" @click="isActive++"></i>
        <span class="nowYear">当前年份：{{ yearList[isActive] }}</span>
      </div>
    </transition>
  </div>
</template>
<script lang="babel">
export default {
  data () {
    return {
      timeBarVisible: false,
      yearList: ['全部', '2005', '2006', '2007', '2008', '2009', '2010'],
      isActive: 0
    }
  },
  watch: {
    isActive: function (isActive) {
      // console.log(isActive)
      this.isActive = (isActive + this.yearList.length) % this.yearList.length
      window.eventBus.$emit('changeYear', isActive)
    },
    timeBarVisible: function (val) {
      if (val) {
        this.isActive = 0
        window.eventBus.$emit('changeYear', 0)
      }
    }
  },
  methods: {
    itemPosition (index) {
      return {
        left: index * (100 / (this.yearList.length - 1)) + '%'
      }
    },
    selectRank (command) {
      this.timeBarVisible = false
      window.eventBus.$emit('currentRank', command)
    },
    selectField (command) {
      this.timeBarVisible = false
      window.eventBus.$emit('currentField', command)
    },
    showDialog () {
      window.eventBus.$emit('showDialog')
    }
  }
}
</script>

<style>
.tool-tips {
  bottom: 40px;
  left: 40px;
  position: fixed;
  width: 12.8%;
}
.button-block {
  background: transparent;
  text-align: center;
  width: 100%;
}
.button-block button {
  margin: 2px 0 !important;
}
.time-bar {
  display: table;
  height: 3.6rem;
  position: fixed;
  bottom: 4rem;
  left: 23rem;
  transition: opacity .8s;
}
.slider {
  background-color: #e4e8f1;
  color: #bfcbd9;
  display: inline-block;
  height: 4px;
  width: 35rem;
  position: relative;
  margin: 16px 0;
  vertical-align: middle;
}
.slider-step {
  background-color: #bfcbd9;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: -4px;
  height: 12px;
  width: 12px;
  transition: box-shadow 0.3s;
}
.slider-step:hover {
  box-shadow: 0 0 7px 2px #bfcbd9;
}
.isActive {
  background-color: red;
  height: 16px;
  width: 16px;
  top: -6px;
  box-shadow: 0 0 5px 1px red !important;
}
.turnYear{
  color: #bfcbd9;
  cursor: pointer;
  display: inline-block;
  font-size: 2.4rem;
  margin-left: 1.2rem; 
  position: relative;
  vertical-align: middle;
}
.turnYear:hover {
  color: red;
  transition: color 0.3s;
}
.nowYear {
  color: #bfcbd9;
  cursor: default;
  vertical-align: middle;
}
.bar-fade-enter, .bar-fade-leave-to {
  opacity: 0;
}

.button-block .el-button, .button-block>.el-dropdown{
  width: 100%;
}
.button-block .el-button{
  background: #555;
  border-color: #456885;
}
.button-block .el-button:hover{
  background: rgba(63, 63, 63, 0.7);
}
.el-dropdown-menu{
  text-align: center;
  width: 12.6%;
}
.el-dropdown-menu .el-dropdown-menu__item{
  font-size: 1.4rem;
}
</style>
