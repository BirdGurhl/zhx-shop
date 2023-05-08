import Vue from "vue";
import VueRouter from "vue-router";
import { corerouter } from "./corerouter";
import { Message } from "element-ui";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

let routes = [...corerouter];

let router = new VueRouter({
  routes,
});
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

router.beforeEach((to, from, next) => {
  nProgress.start();
  console.log("路由前置守卫");
  if (to.path == "/login") {
    next(true);
    nProgress.done();
  } else {
    if (localStorage.getItem("adminInfo")) {
      next(true);
      nProgress.done();
    } else {
      
      Message({
        message: "请先登录",
        type: "warning",
      });
      next("/login");
      nProgress.done();
    }
  }
});


export default router;
