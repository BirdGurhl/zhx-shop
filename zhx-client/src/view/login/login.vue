<template>
  <div class="container">
    <div class="back" @click="back">
      <i class="iconfont icon-guanbi1"></i>
    </div>
    <div class="logo-container">
      <h1>账户登录</h1>
      <img src="../../assets/login.svg" alt="">
    </div>
    <div class="form">
      <div class="user-phone">
        <input v-inputfocus v-model="userInfo.userPhone" placeholder="请输入账号">
      </div>
      <div class="user-phone">
        <input v-inputfocus v-model="userInfo.password" type="password" placeholder="请输入密码">
      </div>
      <div class="user-phone verify">
        <input v-inputfocus v-model="inputCode" placeholder="请输入验证码">
        <CanvasCode :inputCode="inputCode" ref="verify"></CanvasCode>
      </div>
      <div class="span-title">
        <span @click="toRegister">去注册<i class="iconfont icon-youjiantou"></i></span>
      </div>
      <div class="submit">
        <button @click="onSubmit">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant"
import CanvasCode from "./canvasCode.vue"

export default {
  components: { CanvasCode },
  data() {
    return {
      userInfo: {
        userPhone: "",
        password: ""
      },
      inputCode: ''
    }
  },
  methods: {
    back() {
      this.$router.push({ path: "/homepage" })
    },
    onSubmit() {

      let flag = this.$refs.verify.checkCode()
      if (!flag) {
        return
      }
      if (this.userInfo.userPhone !== '' && this.userInfo.password !== '') {  // 不为空
        // 因为登录后要在Vuex和localStorage中存储用户信息，所以在在Vuex中操作登录请求
        this.$store.dispatch("login", this.userInfo).then(res => {
          console.log("22", res);
          if (res.status === 200) {
            Toast("登录成功")
            this.$router.push("/myInfo")
          }
        }).catch(err => {
          // 用户被封禁
          if (err.res && err.res.data.role == -1) {
            let errInfo = err.res.data.banInfo
            Toast(`您因${errInfo},该账号已被封禁！`)
          } else {
            Toast(err.msg)
          }
        })
      } else {
        Toast("账号或密码不能为空！")
      }


    },
    toRegister() {
      this.$router.push({ path: "/register" })
    },

  },
  created() {
    if (this.$route.params.phone) {
      this.userInfo.userPhone = this.$route.params.phone
    }
  }

}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0.17rem;

  .back {
    >i:first-of-type {
      color: #b7b7b7;
      font-size: 0.17rem;
    }
  }

  .logo-container {
    width: 100%;
    padding-top: 0.2rem;

    >h1 {
      text-align: center;
      font-size: 0.2rem;
      color: #6d6d6d;
      margin-bottom: 0.25rem;
    }

    img {
      display: block;
      margin: 0 auto;
      width: 0.4rem;
      height: 0.4rem;
    }
  }

  .form {
    width: 100%;
    box-sizing: border-box;
    // padding: 0.15rem;
    margin-top: 1rem;

    >div {
      margin: 0.25rem 0.1rem;
    }

    .verify {
      display: flex;
      justify-content: space-between;
      position: relative;
      width: 100%;
      margin-top: 0.3rem;
      height: 0.38rem;
    }

    input {
      box-sizing: border-box;
      display: block;
      outline: none;
      border: none;
      margin: 0 auto;
      width: 100%;
      height: 0.38rem;
      font-size: 0.18rem;
      border-bottom: 0.01rem solid #d9d9d9;
      padding-left: 0.12rem;
      color: #6d6d6d;
      transition: border-bottom 0.3s;
    }

    input::-webkit-input-placeholder {
      font-size: 0.13rem;
      color: #bdbdbd;
      letter-spacing: 0.01rem;
    }
  }

  .span-title {
    height: 0.3rem;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;

    span:first-of-type {
      font-size: 0.13rem;
      color: #848484;
      line-height: 0.3rem;

      .icon-youjiantou {
        font-size: 0.15rem;
      }
    }
  }

  .submit {
    button {
      width: 100%;
      height: 0.43rem;
      border-radius: 0.05rem;
      outline: none;
      border: none;
      margin-top: 0.25rem;
      background-color: #f89dbb;
      color: #fff;
      transition: all 0.3s;
    }

    button:active {
      background-color: #f781a8;
    }
  }
}

.changeBotton {
  border-bottom: 0.01rem solid #f88eb1 !important;
}
</style>
