import login from "@/view/login/login"
import layout from "@/view/layout/layout"
import register from "@/view/register/register"

export const myroutes = [
  {
    path: '/login',
    name:'login',
    component: login,
  },
  {
    path: '/register',
    component: register,
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/homepage',
    component: layout,
    children: [
      {
        name: 'homepage',
        path: '/homepage',
        component: () => import('@/view/homepage/index'),
      },
      {
        name: 'category',
        path: '/category',
        component: () => import('@/view/category/index'),
      },
      {
        name: 'sell',
        path: '/sell',
        component: () => import('@/view/sell/index'),
      },
      {
        name: 'shopcar',
        path: '/shopcar',
        component: () => import('@/view/shopcar/index'),
      },
      {
        name: 'myInfo',
        path: '/myInfo',
        component: () => import('@/view/myInfo/index'),
      },
    ],
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/view/detail/index'),
  },
  {
    path: '/addressEdit',
    name: '/addressEdit',
    component: () => import('@/components/addressEdit'),
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/view/pay/index'),
  },
  {
    path: '/pendingPayment',
    name: 'pendingPayment',
    component: () => import('@/components/pendingPayment'),
  },
  {
    path: '/myCollection',
    name: 'myCollection',
    component: () => import('@/components/myCollection'),
  },
  {
    path: '/userSetting',
    name: 'userSetting',
    component: () => import('@/components/userSetting'),
  },
  {
    path: '/addressList',
    name: 'addressList',
    component: () => import('@/components/addressList'),
  },
  {
    path: '/myInfomation',
    name: 'myInfomation',
    component: () => import('@/components/myInfomation'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/view/search/index'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/mysell',
    name: 'mysell',
    component: () => import('@/view/sell/mysell'),
  },
  {
    path: '/editGood',
    name: 'editGood',
    component: () => import('@/view/sell/editGood'),
  },
  {
    path: '/userInfo/:userId',
    name: 'userInfo',
    component: () => import('@/view/user/index'),
  },
  {
    path: '/trading',
    name: 'trading',
    component: () => import('@/components/trading'),
  },
  {
    path: '/userTrading',
    name: 'userTrading',
    component: () => import('@/components/userTrading'),
  },

]