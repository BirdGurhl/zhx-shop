import service from "@/api/user"

import Vue from "vue";
import Vuex from "vuex";
import { getToken } from "../utils/auth";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: getToken() || '',
    userId: "",
    adminInfo: localStorage.getItem("adminInfo") ? JSON.parse(localStorage.getItem("adminInfo")) : '',
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    SET_USERINFO: (state, adminInfo) => {
      state.adminInfo = adminInfo;
    },
  },
  actions: {
    login({ commit }, adminInfo) {
      return new Promise((resolve, reject) => {
        service._adminLogin(adminInfo)
          .then((res) => {
            console.log(res);
            if (res.data.status == 200) {
              localStorage.setItem('adminInfo', JSON.stringify(res.data.data))
              commit('SET_USERID', res.data.data.adminId)
              commit('SET_USERINFO', res.data.data)
              resolve(res)
            } else {
              throw new Error(res.data.msg)
            }
          })
          .catch((err) => {
            reject(err)
            console.log(err)
          })
      });
    },
  },
});
