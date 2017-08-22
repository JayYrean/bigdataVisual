<template>
  <div id="app">
    <TopBar></TopBar>
    <router-view></router-view>
    <ButtonBlock></ButtonBlock>
  </div>
</template>

<script>
import TopBar from './components/top-bar.vue'
import ButtonBlock from './components/button-block.vue'

export default {
  name: 'app',
  components: {
    TopBar,
    ButtonBlock
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
