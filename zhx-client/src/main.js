import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store/index"
import vant from "vant"
import { Toast } from 'vant'
import { Lazyload } from 'vant';
import "./style/iconfont.css"
import "./style/global.css"
import 'vant/lib/index.css'
import inputFocus from "./directive/focus/index"
import waterfall from "vue-waterfall2"
import { AddressEdit } from 'vant'
import { AddressList } from 'vant'

Vue.use(AddressList)
Vue.use(AddressEdit)
Vue.config.productionTip = false
Vue.use(vant)
Vue.use(Toast)
Vue.use(Lazyload)
Vue.use(inputFocus)
Vue.use(waterfall)
new Vue({
  router,store,
  render: h => h(App),
}).$mount('#app')
