import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TipsFadeAway from '@/components/TipsFadeAway'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/tipsFadeAway',
      name: 'TipsFadeAway',
      component: TipsFadeAway
    }
  ]
})
