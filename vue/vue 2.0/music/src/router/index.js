import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Singer from '@/pages/Singer'
import SingerDetail from '@/pages/SingerDetail'
import PlayMusic from '@/pages/PlayMusic'

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
    },
    {
      path: '/singer/:sid',
      name: 'SingerDetail',
      component: SingerDetail
    },
    {
      path: '/playMusic',
      name: 'PlayMusic',
      component: PlayMusic
    }

  ]
})
