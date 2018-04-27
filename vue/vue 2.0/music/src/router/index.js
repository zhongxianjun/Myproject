import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Singer from '@/pages/Singer'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    }
  ]
})
