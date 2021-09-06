import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
import Home from './views/work-manager/index.vue'
import strapi from './utils/strapi'
import {cookie} from "./utils/cookie";

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
      {
        path: '/',
        redirect: '/login'
      },
      {
        path: '/home',
        name: 'home',
        component: Home,
        redirect: '/work-manager/list',
        children: [
              {
                path: '/work-manager/list',
                name: 'work-manager-list',
                component: () => import('@/views/work-manager/list.vue')
              },
            {
                path: '/work-manager/form-stat',
                name: 'form-stat',
                component: () => import('@/views/work-manager/form-stat/index.vue')
            },
        ]
      },
      {
          path: '/login',
          name: 'login',
          component: Login
      },
      {
          path: '/logout',
          name: 'logout',
          component: () => import('./views/SignUp.vue')
      },
      {
          path: '/resetPassword',
          name: 'resetPassword',
          component: () => import('./views/ResetPassword.vue')
      },
      {
        path: '/editor/:workId', // #!zh 编辑器页面，核心功能部分
        name: 'editor',
        component: () => import('./views/Editor.vue')
      }
  ]
});

// router.beforeEach((to, from, next)=>{
//     let islogin = cookie.get("islogin")
//     console.log(to.name)
//     if(to.name !== 'login' && islogin === '1'){
//         next()
//     }else if(islogin === 'undefined'){
//         next({ name : 'login'})
//     }else{
//         next()
//     }
// })

export default router
