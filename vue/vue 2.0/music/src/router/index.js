import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Singer from '@/pages/Singer'
import SingerDetail from '@/pages/SingerDetail'
import PlayMusic from '@/pages/PlayMusic'
import Search from '@/pages/Search'

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
      path: '/playMusic/:smid/:mid',
      name: 'PlayMusic',
      component: PlayMusic
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }

  ]
})
