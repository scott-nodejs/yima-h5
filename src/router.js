import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Home from './views/work-manager/index.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/work-manager/list',
      children: [
        {
          path: '/work-manager/list',
          name: 'work-manager-list',
          component: () => import('@/views/work-manager/list.vue')
        }
      ]
    }
  ]
})
