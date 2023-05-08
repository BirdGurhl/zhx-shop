<template>
  <div class="container">
    <!-- <Topbar title="我的"></Topbar> -->
    <div class="top-container">
      <!-- <div class="top-container-backgroud" :style="'background-image: url(' + imghead + ');'"> -->
      <img class="top-container-backgroud" :class="{ 'isNull': isNull }"
        :style="'background-image: url(' + bgimghead + ')'" alt="">
      <div class="user-info-container" @click="toSetting">
        <div class="img">
          <section>
            <img :src="imghead" alt="">
          </section>
          <div class="info" v-if="showLogin">
            <h1>登录/注册</h1>
          </div>
          <div class="info" v-if="!showLogin">
            <h1>{{ userInfo.nickname }}</h1>
          </div>
        </div>
        <div class="config">
          <i class="iconfont icon-shezhi"></i>
        </div>
      </div>
      <!-- <nav class="top-nav">
        <ul>
          <li>
            <i class="iconfont icon-wode"></i>
            <p>优惠券</p>
          </li>
        </ul>
      </nav> -->
      <div class="intro">
        <van-tabbar active-color="black" route>
          <van-tabbar-item icon="star-o" to="/myCollection">
            <p>我的收藏</p>
          </van-tabbar-item>
          <van-tabbar-item icon="guide-o" to="/mysell">
            <p>我的发布</p>
          </van-tabbar-item>
          <van-tabbar-item icon="exchange" :badge="badge.bossTradingNum" :to="{path:'/trading',query:{state:'trading'}}">
            <p>交易中</p>
          </van-tabbar-item>
          <van-tabbar-item icon="completed" :badge="badge.bossNotEvaluationNum" :to="{path:'/trading',query:{state:'complete'}}">
            <p>交易完成</p>
          </van-tabbar-item>
        </van-tabbar>
      </div>
      <div class="shop-modules">

        <van-tabbar active-color="black" route>
          <van-tabbar-item :badge="badge.userNotReceivingNum" :to="{ path: '/userTrading', query: { state: 'userTrade' } }">
            <template #icon="props">
              <i class="iconfont icon-daishouhuo"></i>
            </template>
            <p>待收货</p>
          </van-tabbar-item>
          <van-tabbar-item :badge="badge.userReturningNum"
            :to="{ path: '/userTrading', query: { state: 'userReturning' } }">
            <template #icon="props">
              <i class="iconfont icon-tuihuanhuo"></i>
            </template>
            <p>退货</p>
          </van-tabbar-item>
          <van-tabbar-item :badge="badge.userNotEvaluationNum" :to="{ path: '/userTrading', query: { state: 'userReceived' } }">
            <template #icon="props">
              <i class="iconfont icon-31daifukuan"></i>
            </template>
            <p>已收货</p>
          </van-tabbar-item>
          <van-tabbar-item :to="{ path: '/userTrading', query: { state: 'userAllOrder' } }">
            <template #icon="props">
              <i class="iconfont icon-quanbudingdan"></i>
            </template>
            <p>全部订单</p>
          </van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
    <div class="orderHistory">
      <orderHistory :userId="$store.state.userInfo.userId" :stickyTop="3.25"></orderHistory>
      
    </div>
  </div>
</template>

<script>
import serivce from "@/api/user"
import Topbar from "../../components/topbar.vue"
import orderHistory from "../user/component/orderHistory.vue"

export default {
  name: "myInfo",
  components: { Topbar,orderHistory },
  data() {
    return {
      isLogin: false,
      userInfo: '',
      imghead: '',
      nickName: '',
      bgimghead: '',
      isNull: false

    }
  },
  computed: {
    showLogin() {
      const userInfo = this.$store.state.userInfo
      const token = this.$store.state.token
      console.log(userInfo);
      if (userInfo && token) {
        this.userInfo = userInfo
        return false
      }
      return true
    },
    badge() {
      return {
        bossTradingNum: this.$store.state.bossTradingNum == 0 ? '' : this.$store.state.bossTradingNum,
        bossNotEvaluationNum: this.$store.state.bossNotEvaluationNum == 0 ? '' : this.$store.state.bossNotEvaluationNum,
        userNotReceivingNum: this.$store.state.userNotReceivingNum == 0 ? '' : this.$store.state.userNotReceivingNum,
        userReturningNum: this.$store.state.userReturningNum == 0 ? '' : this.$store.state.userReturningNum,
        userNotEvaluationNum: this.$store.state.userNotEvaluationNum == 0 ? '' : this.$store.state.userNotEvaluationNum,
      }
    },

  },
  methods: {
    toLogin() {
      this.$router.push({ path: "/login" })
    },
    toSetting() {
      this.$router.push({ path: "/userSetting" })
    },
    getUserInfo() {
      serivce._getUserInfo({ userId: this.$store.state.userInfo.userId }).then(res => {
        
        if (res.data.length === 0 || !res.data[0].headImg) {
          this.isNull = true
          this.imghead = require('@/assets/userIcon.jpg')
          this.bgimghead = require('@/assets/bg.png')
          this.$toast('请完善用户信息')
          return
        }
        this.imghead = res.data[0].headImg
        this.bgimghead = res.data[0].headImg
        this.nickName = res.data[0].nickname


      })
    },

  },
  created() {
    this.getUserInfo()
  }

}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 1;

  .top-container {
    width: 100%;
    // background: url(../../assets/bg.png) no-re  peat top center;
    // background-size: 100%;
    box-sizing: border-box;
    padding: 0 0.15rem 0;
    position: relative;

    .top-container-backgroud {
      position: absolute;
      top: 0;
      left: -5%;
      width: 110%;
      height: 3rem;
      z-index: -2;
      /* 将伪元素置于容器的最底层 */
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      filter: blur(0.15rem);
      /* 调整模糊度，数值越大模糊度越高 */
    }

    .isNull {
      filter: blur(0);

    }

    .user-info-container {
      width: 100%;
      height: 0.65rem;
      // background-color: #bfa;
      padding-top: 0.4rem;
      display: flex;
      justify-content: space-between;

      .img {
        display: flex;
        width: 70%;
        justify-content: space-between;

        >section {
          width: 0.55rem;
          height: 0.55rem;
          border: 1px solid #fff;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
          }
        }

        .info {
          width: 2rem;

          h1 {
            width: 100%;
            text-align: left;
            font-size: 0.16rem;
            color: #fff;
            line-height: 0.55rem;
            font-weight: 600;
            letter-spacing: 0.02rem;
          }
        }
      }

      .config {
        width: 0.5rem;
        line-height: 0.55rem;
        display: flex;

        i {
          display: block;
          font-size: 0.3rem;
          color: #fff;
          text-align: right;
        }
      }
    }

    .top-nav {
      width: 100%;
      height: 0.55rem;
      // background-color: #fff;

      >ul {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: space-between;

        >li {
          width: 0.5rem;
          margin-top: 0.061rem;
          color: #fff;

          i {
            display: block;
            text-align: center;
            font-size: 0.25rem;
          }

          p {
            font-size: 0.14rem;
            text-align: center;
          }
        }
      }
    }

    .intro {
      width: 100%;
      height: 0.8rem !important;
      background-color: #fff;
      margin-top: 0.2rem;
      border-radius: 0.1rem;

      [class*=van-hairline]::after {
        border: none;
      }
    }

    .shop-modules,
    .intro {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 1rem;
      background-color: #fff;
      margin-top: 0.2rem;
      border-radius: 0.1rem;
      box-sizing: border-box;
      padding: 0 0.15rem;

      [class*=van-hairline]::after {
        border: none;
      }

      >ul,
      .van-tabbar {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;

        li,
        .van-tabbar-item {
          width: 0.6rem;
          height: 0.6rem;
          margin: 0 0.1rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;

          ::v-deep .van-tabbar-item__icon {
            margin-bottom: 0 !important;
          }

          i,
          .van-icon {
            font-size: 0.27rem;
            width: 0.3rem;
            height: 0.3rem;
          }

          p {
            font-size: 0.15rem;
            margin-top: 0.04rem;

          }
        }

        // :not(li:last-of-type){
        //   margin
        // }
      }
    }
  }


  .orderHistory {
  // flex-grow: 1;
  height: calc(100% - 3.25rem);;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  // padding: 0.2rem 0.15rem 0.55rem;
  background-color: transparent;
  overflow: hidden;
  background-color: #f6f6f6;
}
}
</style>