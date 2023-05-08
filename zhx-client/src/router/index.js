import { Toast } from 'vant';
import Vue from 'vue'
import VueRouter from 'vue-router'
import { myroutes } from './router'
import service from "@/api/user"
import Storage from '@/utils/storage'

Vue.use(VueRouter)


// 路由
let routes = [...myroutes];


let router = new VueRouter({
  routes
})






// 创建路由白名单
const whiteList = ['/login', '/register', '/homepage', '/category', '/myInfo', '/detail', '/userInfo']


router.beforeEach((to, from, next) => {
  // 白名单放行
  if (whiteList.indexOf(to.path) !== -1) {
    next(true);
  } else {
    // 如果帐户被封禁
    if (Storage.getItem('userInfo') !== null) {
      service
        ._getUserInfo({
          userId: JSON.parse(Storage.getItem('userInfo')).userId,
        })
        .then((res) => {
          if (res.data[0].role == -1) {
            Storage.clear()
            Toast(`您因${res.data[0].banInfo}，该账号被封禁！`)
            next('/login')
          } else {
            next(true)
          }
        })
    }
    // token验证
    else if (localStorage.getItem("token")) {
      next(true)
    } else {
      Toast("请登录");
      next("/login");
    }
  }
})

export default router;