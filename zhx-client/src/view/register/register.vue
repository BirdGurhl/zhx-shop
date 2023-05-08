<template>
  <div class="container" v-if="isShow">
    <div class="back" @click="backOut">
      <i class="iconfont icon-zuojiantou1"></i>
    </div>
    <div class="title">
      <h1>hello，欢迎注册仲海鲜账户</h1>
      <!-- <h1>手机号注册</h1> -->
      <!-- <p>hello，欢迎注册仲海鲜账户</p> -->
    </div>
    <div class="addAccount">
      <span>+86</span>
      <input v-inputfocus v-model="userInfo.userPhone" type="number" placeholder="请输入您的手机号">
    </div>
    <div class="addAccount">
      <span>密码：</span>
      <input v-inputfocus v-model="userInfo.password" type="password" placeholder="请输入您的密码">
    </div>
    <div class="addAccount verify">
      <span>验证</span>
      <input v-inputfocus v-model="inputCode" placeholder="请输入验证码">
      <CanvasCode :inputCode.sync="inputCode" ref="verify"></CanvasCode>
    </div>

    <div class="add">
      <button @click="sendCode">同意协议并立即注册</button>
    </div>
    <van-checkbox class="checkbox" v-model="checkedProtocol" checked-color="#f56d9a">已阅读并同意协议:<span style="color:skyblue"
        @click="showMustToKnow">《仲海鲜平台用户手册》</span>
    </van-checkbox>
  </div>

  <!-- <transition class="code-container" name="van-slide-right" v-else>
    <check-code @exit="exitCode" :userInfo="userInfo" />
  </transition> -->
</template>

<script>
import CheckCode from "./components/CheckCode.vue"
import { phone } from "@/utils/regula.js"
import { Toast } from 'vant'
import { Dialog } from 'vant'
import CanvasCode from "./components/canvasCode.vue"
import service from "@/api/user.js"

export default {
  data() {
    return {
      checkedProtocol: true,
      isShow: true,
      userInfo: {
        userPhone: "",
        password: "",
        role: 0
      },
      inputCode: ''
    }
  },
  components: {
    CheckCode,
    CanvasCode
  },
  computed: {},
  methods: {
    showMustToKnow(){
      Dialog.confirm({
        title: `仲海鲜平台用户手册`,
        message: '仲恺人不骗仲恺人！骗子请绕道！',
      })
        .then(() => {
          // on confirm

        })
        .catch(() => {
          // on cancel
          this.checkedProtocol=false
        });
    },
    backOut() {
      this.$router.push('/login')
    },
    exitCode() {
      this.isShow = true
    },
    sendCode() {
      if (this.checkedProtocol) { // 勾选用户协议
        if (phone.test(this.userInfo.userPhone)) { // 表单校验-手机号
          setTimeout(() => {
            let flag = this.$refs.verify.checkCode()  //表单是否为空
            if (flag) {
              this.register()
            }
          }, 500)
        } else {
          Toast("请输入合法手机号！")
        }
      } else {
        Toast("请勾选用户协议")
      }

    },
    register() {
      service._register(this.userInfo).then(res => {
        if (res.status === 201) {
          Toast(res.msg)  // 201 手机号码以及被注册过
        } else if (res.status === 200) {
          Toast(res.msg)
          this.$router.push({
            name: 'login',
            params: {
              phone: this.userInfo.userPhone
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.code-container {
  width: 100%;
  height: 100%;
}

.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0.17rem;

  .back {
    >i:first-of-type {
      color: #b7b7b7;
      font-size: 0.25rem;
    }
  }

  .title {
    width: 100%;
    box-sizing: border-box;
    margin-top: 0.55rem;

    h1 {
      font-size: 0.25rem;
      letter-spacing: 0.03rem;
      color: rgb(58, 58, 58);
    }

    p {
      width: 100%;
      letter-spacing: 0.02rem;
      line-height: 0.3rem;
      font-size: 0.15rem;
      color: #b7b7b7;
    }
  }

  .addAccount {
    position: relative;
    width: 100%;
    margin-top: 0.3rem;

    >span {
      width: 0.5rem;
      height: 0.38rem;
      line-height: 0.38rem;
      position: absolute;
      left: 0;
      top: 0;
    }

    >input {
      box-sizing: border-box;
      display: block;
      outline: none;
      border: none;
      margin: 0 auto;
      width: 100%;
      height: 0.38rem;
      font-size: 0.18rem;
      border-bottom: 0.01rem solid #d9d9d9;
      padding-left: 0.5rem;
      color: #6d6d6d;
      transition: border-bottom 0.3s;
    }

    input::-webkit-input-placeholder {
      font-size: 0.13rem;
      color: #bdbdbd;
      letter-spacing: 0.01rem;
    }
  }

  .verify {
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;
    margin-top: 0.3rem;
    height: 0.38rem;
  }

  .add {
    width: 100%;
    margin-top: 0.45rem;

    >button {
      display: block;
      margin: 0 auto;
      outline: none;
      border: none;
      width: 100%;
      height: 0.42rem;
      border-radius: 0.21rem;
      background-color: #fcaac5;
      transition: 0.3s;
      color: #fff;
    }

    >button:active {
      background-color: #fd87ae;
    }
  }
}

::v-deep .checkbox {
  margin-top: 0.2rem;

  span {
    font-size: 0.14rem;
    color: #b7b7b7;
  }
}

.changeBotton {
  border-bottom: 0.01rem solid #f88eb1 !important;
}
</style>