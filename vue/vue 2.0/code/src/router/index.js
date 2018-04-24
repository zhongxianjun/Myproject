import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import Indec from '@/pages/Indec'
import Transition from '@/components/Transition'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/indec',
      name: 'Indec',
      component: Indec
    },
    {
      path: '/transition',
      name: 'Transition',
      component: Transition
    }
  ]
})
