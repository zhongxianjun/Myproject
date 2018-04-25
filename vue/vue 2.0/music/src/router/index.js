import Vue from 'vue'
import Router from 'vue-router'
import HeaderTab from '@/components/HeaderTab'
import Index from '@/pages/Index'


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
      path: '/headerTab',
      name: 'HeaderTab',
      component: HeaderTab
    }
  ]
})
