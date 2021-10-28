module.exports =[
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
        path: '/work-manager/form-table',
        name: 'form-table',
        component: () => import('@/views/work-manager/form-stat/formTable.vue')
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