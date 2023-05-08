import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import ElementUI from "element-ui";
import animated from "animate.css";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/global.scss"
import role from "@/directive/index"
Vue.config.productionTip = false;
Vue.use(role)
Vue.use(ElementUI);
Vue.use(animated);
import "./utils/service";
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
