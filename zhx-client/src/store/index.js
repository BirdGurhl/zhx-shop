import Vue from 'vue'
import Vuex from 'vuex'
import Storage from '@/utils/storage'
import service from '@/api/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(Storage.getItem('userInfo')) || '',
    token: Storage.getItem('token') || '',
    cartsNum:  Storage.getItem('cartsNum') || '',
    bossTradingNum:  Storage.getItem('bossTradingNum') || '',
    bossNotEvaluationNum:  Storage.getItem('bossNotEvaluationNum') || '',
    userNotReceivingNum:  Storage.getItem('userNotReceivingNum') || '',
    userReturningNum:  Storage.getItem('userReturningNum') || '',
    userNotEvaluationNum:  Storage.getItem('userNotEvaluationNum') || '',
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_SHOPCARTS(state, num) {
      state.cartsNum = num
    },

    SET_BOSSTRADINGNUM(state, num) {
      state.bossTradingNum = num
    },
    SET_BOSSNOTEVALUATIONNUM(state, num) {
      state.bossNotEvaluationNum = num
    },
    SET_USERNOTRECEIVINGNUM(state, num) {
      state.userNotReceivingNum = num
    },
    SET_USERRETURNINGNUM(state, num) {
      state.userReturningNum = num
    },
    SET_USERNOTEVALUATIONNUM(state, num) {
      state.userNotEvaluationNum = num
    },
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        let userPhone = userInfo.userPhone
        let password = userInfo.password
        service._login({ userPhone, password }).then((res) => {

          if (res.status === 200) {
            // 用户被封禁
            if (res.data.role == -1) {
              reject({
                code: -1,
                res
              })
              return
            }
            // 写入token
            Storage.setItem('userInfo', res.data)
            Storage.setItem('token', res.data.token)
            commit('SET_USERINFO', res.data)
            commit('SET_TOKEN', res.data.token)
            resolve(res)
          } else {
            // 用户名或密码错误
            reject(res)
          }
        }).catch((error) => {
          reject(error);
        });

      })
    },
  },
})
