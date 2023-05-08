<template>
  <div class='container'>
    <topbar title="Ta的主页" :cb="back"></topbar>
    <div class="top-container">
      <img class="userInfo-container-backgroud" :style="'background-image: url(' + userInfo.headImg + ')'">
      <div class="userInfo-container">
        <div class="img">
          <section>
            <img :src="userInfo.headImg" alt="">
          </section>
          <div class="info">
            <h1>{{ userInfo.nickname }}</h1>
          </div>
        </div>
        <div class="lastLoginTime">
          <span>最近上线:</span>
          <span>{{ userInfo.last_login_time }}</span>
        </div>
      </div>
      <div class="userDesc">
        <span>个人简介：</span>
        <span v-if="!userInfo.userDesc">这个人很懒，没有留下简介...</span>
        <span v-else v-html="userInfo.userDesc"></span>
      </div>
    </div>
    <div class="orderHistory">
      <orderHistory :userId="userId" :stickyTop="3.5"></orderHistory>
    </div>
  </div>
</template>

<script>
import serivce from "@/api/user"
import orderHistory from "./component/orderHistory.vue"
import topbar from "../../components/topbar.vue"

export default {
  name: 'userInfo',
  data() {
    return {
      userId: 10006,
      imghead: 'http://localhost:3000/public/upload/1681873571560.webp',
      nickName: '塚本高史',
      userInfo: {
        imghead: 'http://localhost:3000/public/upload/1681873571560.webp',
        nickName: '塚本高史',
      },
    }
  },
  components: {
    orderHistory,
    topbar
  },
  computed: {},
  watch: {
    // 利用watch方法检测路由变化：
    $route: function (to, from) {
      if (to.path !== from.path) {
        this.userId = this.$route.query.userId ? this.$route.query.userId : this.$route.params.userId
        this.getUserInfo()

      }
    }
  },
  created() {
    this.userId = this.$route.query.userId ? this.$route.query.userId : this.$route.params.userId
    this.getUserInfo()
  },
  mounted() { },
  methods: {
    back() {
      this.$router.back()
    },
    getUserInfo() {
      serivce._getUserInfo({ userId: this.userId }).then(res => {
        // console.log(res);
        // console.log(this.getTimeDiff(res.data[0].last_login_time));
        this.userInfo = {
          user_id: res.data[0].user_id,
          userphone: res.data[0].userphone,
          headImg: res.data[0].headImg,
          nickname: res.data[0].nickname,
          userDesc: res.data[0].userDesc ? res.data[0].userDesc.replace(/\n/g, '<br>') : '',
          last_login_time: this.getTimeDiff(res.data[0].last_login_time),
        }
        console.log(this.userInfo);
        // if (res.data.length === 0 || !res.data[0].headImg) {
        //   this.isNull = true
        //   this.imghead = require('@/assets/userIcon.jpg')
        //   this.bgimghead = require('@/assets/bg.png')
        //   this.$toast('请完善用户信息')
        //   return
        // }
        // this.imghead = res.data[0].headImg
        // this.bgimghead = res.data[0].headImg
        // this.nickName = res.data[0].nickname


      })
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
    },

    getTimeDiff(str) {
      if (!str) {
        return '很久以前'
      }
      const timestamp = Date.parse(str);
      const diffHours = (Date.now() - timestamp) / (1000 * 60 * 60);
      const diffDays = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
      if (diffHours === 0) {
        return '刚刚'
      }
      else if (diffHours < 48) {
        return Math.floor(diffHours) + '小时前';
      } else if (diffDays < 7) {
        return Math.floor(diffDays) + '天前';

      } else {
        return this.formatDate(timestamp);
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  z-index: 1;
  // display: flex;
  // flex-direction: column;
  // height: 100vh;
}

.top-container {
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  // padding: 0 0.15rem 0;
  position: relative;
  overflow: hidden;
  color: #fff;

  .userInfo-container-backgroud {
    position: absolute;
    top: 0;
    left: -5%;
    width: 110%;
    height: 2.5rem;
    z-index: -2;
    /* 将伪元素置于容器的最底层 */
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    filter: blur(0.15rem);
    /* 调整模糊度，数值越大模糊度越高 */
  }

  .userInfo-container {
    width: 100%;
    height: 0.65rem;
    // background-color: #bfa;
    margin-top: 0.4rem;
    padding: 0.1rem;
    display: flex;
    justify-content: space-between;
    background-color: hsl(0deg 0% 100% / 31%);
    // box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 0.1rem 0.05rem rgba(0, 0, 0, 0.1);

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

    .lastLoginTime {
      width: 30%;
      display: flex;
      flex-direction: column;
      color: #fff;
      justify-content: center;
      align-items: flex-start;

      span:first-of-type {
        margin-bottom: 0.05rem;
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

  .userDesc {
    padding: 0.15rem 0.25rem;
    box-sizing: border-box;
    display: flex;

    >span:last-of-type {
      width: 75%;
      line-height: 1.5em;
      // 只显示两行文字
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      display: -moz-box;
      -moz-line-clamp: 3;
      -moz-box-orient: vertical;
      word-wrap: break-word;
      word-break: break-all;
      white-space: normal;
    }
  }
}

.orderHistory {
  // flex-grow: 1;
  height: calc(100% - 3rem);
  ;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  // padding: 0.2rem 0.15rem 0.55rem;
  background-color: transparent;
  overflow: hidden;
  background-color: #f6f6f6;
}
</style>
