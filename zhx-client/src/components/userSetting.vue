<template>
  <div class="container">
    <!-- <div class="topTitle">
      <i class="iconfont icon-zuojiantou1" @click="back"></i>
      <h2>设置</h2>
    </div> -->
    <Topbar title="设置" :cb="back"></Topbar>
    <div class="account">
      <h3>账号管理</h3>
      <ul>
        <li @click="goMyInfo">
          <span>个人资料</span>
          <i class="iconfont icon-youjiantou"></i>
        </li>
        <li @click="goAddress">
          <span>收货地址</span>
          <i class="iconfont icon-youjiantou"></i>
        </li>
      </ul>
    </div>
    <div class="exit">
      <button @click="exit">退出登录</button>
    </div>
  </div>
</template>

<script>
import Storage from "@/utils/storage"
import { Dialog } from 'vant'
import Topbar from "./topbar.vue"
export default {
  components:{
    Topbar
  },
  data() {
    return {

    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    goAddress() {
      this.$router.push({ path: '/addressList' })
    },
    goMyInfo(){
      this.$router.push({path:"/myInfomation"})
    },
    exit() {
      Dialog.confirm({
        message: '确认退出？',
      })
        .then(() => {
          Storage.clear()
          window.location.reload()
        })
        .catch(() => {
          // on cancel
        });
      
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;

  .topTitle {
    width: 100%;
    height: 0.45rem;
    box-sizing: border-box;
    padding: 0.15rem;
    display: flex;
    align-items: center;
    background-color: #fff;
    i {
      line-height: 0.45rem;
      font-size: 0.22rem;
      margin-right: 0.1rem;
    }
    h2 {
      line-height: 0.45rem;
      font-size: 0.18rem;
    }
  }

  .account {
    width: 100%;
    box-sizing: border-box;
    margin-top: 0.2rem;
    h3 {
      box-sizing: border-box;
      font-size: 0.15rem;
      font-weight: normal;
      padding: 0 0.15rem;
      line-height: 0.35rem;
    }
    ul {
      width: 100%;
      background-color: #fff;
      li {
        box-sizing: border-box;
        padding: 0 0.15rem;
        height: 0.45rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s;
        &:first-child {
          border-bottom: 0.01rem solid #f6f6f6;
        }

        &:active {
          background-color: #e6e6e6;
        }
      }
    }
  }
}

.exit {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    width: 2.1rem;
    height: 0.4rem;
    background-color: #fc9bbb;
    font-size: 0.15rem;
    border: none;
    outline: none;
    color: #fff;
    border-radius: 0.2rem;

    transition: 0.3s;
  }
  > button:active {
    background-color: #f881a8;
  }
}
</style>