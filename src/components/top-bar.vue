<template>
  <div class="top-bar">
      <el-menu theme="dark" :default-active="activeIndex" class="header-slider" mode="horizontal" @select="handleSelect" style="position: fixed;;width: 100%;height: 80px">
        <div style="margin-top: 10px">
          <el-menu-item index="1" class="title">金融信息管理平台</el-menu-item>
          <el-menu-item  class="admin" index="3"><el-tooltip class="item" content="注销" placement="bottom" effect="light"><el-button type="text">Admin</el-button>  </el-tooltip>
          </el-menu-item>
        </div>

      </el-menu>
    </div>
</template>
<script lang="babel">
  import ElCol from 'element-ui/packages/col/src/col'
  import ElRow from 'element-ui/packages/row/src/row'

  export default {
    components: {
      ElRow,
      ElCol
    },
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },

    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
}
</script>

<style>
  body{
    margin-left: 0px;
    margin-top: 0px
  }
  .top-bar{position: fixed;top: 0;}
  .title{border-bottom:none !important;font-size:2rem;font-family:kaiti;}
  .admin{border-bottom:none !important;float: right !important;}
</style>
