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
                component: () => import('@/views/work-manager/form-stat/index1.vue')
            },
            {
                path: '/work-manager/setting',
                name: 'setting',
                component: () => import('@/views/work-manager/setting/Setting.vue'),
                children: [
                    {
                        path: 'profile',
                        name: 'settingProfile',
                        component: () => import('@/views/work-manager/setting/person-center.vue') // 修改资料
                    },
                    {
                        path: 'reset-password',
                        name: 'settingResetPassword',
                        component: () => import('@/views/work-manager/setting/ResetPassword.vue') // 重置密码
                    }
                ],
                redirect: { name: 'settingProfile' }
            },
        ]
      },
      {
          path: '/login',
          name: 'login',
          component: Login
      },
      {
          path: '/register',
          name: 'register',
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

router.beforeEach((to, from, next)=>{
    let islogin = cookie.get("islogin")
    console.log(to.name)
    if(to.name !== 'login' && islogin !== '1'){
        if(to.name === 'resetPassword' || to.name === 'register'){
            return next()
        }
        return next('/login')
    }
    next()
})

export default router
