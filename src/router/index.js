import Vue from 'vue'
import Router from 'vue-router'
import map from '@/components/map'
import moneyChange from '@/components/moneyChange'
// import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  // routes: [
  //   {
  //     path: '/',
  //     name: 'Hello',
  //     component: Hello
  //   }
  // ]
  routes: [
    {
      path: '/map',
      name: 'map',
      component: map
    }, {
      path: '/debug',
      name: 'debug',
      component: moneyChange
    }
  ]
})
