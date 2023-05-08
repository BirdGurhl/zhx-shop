import login from '@/view/login/login'
import main from '@/view/body/main'
import editGoods from '@/view/body/component/editGoods'
import goodsShow from '@/view/body/component/goodsShow'
import dashboard from '@/view/body/component/dashboard'
import typeManage from '@/view/body/component/typeManage'
import page401 from '@/view/errPage/401.vue'
import upload from '@/view/errPage/upload.vue'
export const corerouter = [
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/',
    name: '/main',
    redirect: '/goodsShow',
    meta: { title: '首页' },
    component: main,
    children: [
      {
        path: '/addGoods',
        name: 'addGoods',
        component: editGoods,
        meta: {
          title: '添加商品',
          breadCrumb: [
            { title: '商品管理', path: '/'  },
            { title: '商品列表' , path: '/goodsShow' },
            { title: '添加商品' , path: '' },
          ]
        },
      },
      {
        path: '/goodsShow',
        name: 'goodsShow',
        component: goodsShow,
        meta: {
          title: '商品列表',
          breadCrumb: [
            { title: '商品管理', path: '/'  },
            { title: '商品列表' , path: '' },
          ]
        },
        children: [
          {
            path: '/goodsShow/editGoods',
            name: 'editGoods',
            component: editGoods,
            meta: {
              title: '商品编辑',
              breadCrumb: [
                { title: '商品管理', path: '/'  },
                { title: '商品列表' , path: '/goodsShow' },
                { title: '商品编辑' , path: '' },
              ]
            },
          },
        ],
      },
      {
        path: '/vipManage',
        name: 'vipManage',
        meta: {
          title: '用户列表',
          breadCrumb: [
            { title: '用户管理' , path: '/vipManage' },
            { title: '用户列表' , path: '' },
          ]
        },
        component: () => import('@/view/vipManage/index'),
      },
      {
        path: '/notice',
        name: 'notice',
        meta: {
          title: '公告列表',
          breadCrumb: [
            { title: '公告管理' , path: '/notice' },
            { title: '公告列表' , path: '' },
          ]
        },
        component: () => import('@/view/notice/index'),
      },
      {
        path: '/order',
        name: 'order',
        meta: {
          title: '订单管理',
          breadCrumb: [
            { title: '订单管理' , path: '/order' },
            { title: '订单列表' , path: '' },
          ]
        },
        component: () => import('@/view/order/index'),
      },
      {
        path: '/returnOrder',
        name: 'returnOrder',
        meta: {
          title: '订单管理',
          breadCrumb: [
            { title: '订单管理' , path: '/order' },
            { title: '退货列表' , path: '' },
          ]
        },
        component: () => import('@/view/order/returnOrder'),
      },
      {
        path: '/adminManage',
        name: 'adminManage',
        component: () => import('@/view/adminManage/index'),
      },
      {
        path: '/editManage',
        name: 'editManage',
        meta: {
          title: '管理员管理',
          breadCrumb: [
            { title: '管理员管理' , path: '' },
            { title: '管理员列表' , path: '/editManage' },
            { title: '管理员录入' , path: '' },
          ]
        },
        component: () => import('@/view/adminManage/component/editManage'),
      },
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   component: dashboard,
      //   meta: { title: '首页' },
      // },
      {
        path: '/typeManage',
        name: 'typeManage',
        component: typeManage,
        meta: {
          title: '分类管理',
          breadCrumb: [
            { title: '分类管理' , path: '/typeManage' },
            { title: '分类列表' , path: '' },
          ]
        },
      },
      {
        path: '/401',
        name: '401',
        component: page401,
      },
      {
        path: '/upload',
        name: 'upload',
        component: upload,
      },
    ],
  },
]
