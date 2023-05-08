<template>
  <van-tabbar style="height:0.59rem" v-model="active" active-color="#fc9bbb" route>
    <van-tabbar-item name="home" icon="home-o" to="/homepage">
      <span>首页</span>
      <template #icon="props">
        <img :src="
          props.active ? icons.indexIcon.active : icons.indexIcon.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="cate" icon="home-o" to="/category">
      <span>分类</span>
      <template #icon="props">
        <img :src="props.active ? icons.cateIcon.active : icons.cateIcon.inactive" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item name="sell" icon="home-o" to="/sell">
      <span>发布</span>
      <template #icon="props">
        <img :src="props.active ? icons.sell.active : icons.sell.inactive" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item name="shopcar" icon="home-o" :badge="cartsNum" to="/shopcar">
      <span>购物车</span>
      <template #icon="props">
        <img :src="props.active ? icons.shopcar.active : icons.shopcar.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="mine" icon="home-o" :dot="myInfoDot" to="/myInfo">
      <span>我的</span>
      <template #icon="props">
        <img :src="props.active ? icons.mine.active : icons.mine.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import userservice from "@/api/user"
import goodservice from "@/api/goods"
import Storage from "@/utils/storage"
export default {
  data() {
    return {
      active: 'home',
      icons: {
        indexIcon: {
          active: require('../../../assets/tagBar/indexActive.png'),
          inactive: require('../../../assets/tagBar/index.png'),
        },
        cateIcon: {
          active: require('../../../assets/tagBar/categoryActive.png'),
          inactive: require('../../../assets/tagBar/category.png'),
        },
        sell: {
          active: require('../../../assets/tagBar/sellActive.png'),
          inactive: require('../../../assets/tagBar/sell.png'),
        },
        shopcar: {
          active: require('../../../assets/tagBar/shopcarActive.png'),
          inactive: require('../../../assets/tagBar/shopcar.png'),
        },
        mine: {
          active: require('../../../assets/tagBar/myActive.png'),
          inactive: require('../../../assets/tagBar/my.png'),
        },
      },
      notDeelInfo: {}
    }
  },
  computed: {
    cartsNum() {
      return this.$store.state.cartsNum == 0 ? '' : this.$store.state.cartsNum
    },
    // 是否展示底部导航栏「我的」右上角红点
    myInfoDot() {
      let flag = false
      !this.$store.state.bossTradingNum || this.$store.state.bossTradingNum === 0 ? '' : flag = true
      !this.$store.state.bossNotEvaluationNum || this.$store.state.bossNotEvaluationNum === 0 ? '' : flag = true
      !this.$store.state.userNotReceivingNum || this.$store.state.userNotReceivingNum === 0 ? '' : flag = true
      !this.$store.state.userReturningNum || this.$store.state.userReturningNum === 0 ? '' : flag = true
      !this.$store.state.userNotEvaluationNum || this.$store.state.userNotEvaluationNum === 0 ? '' : flag = true
      return flag
    },
  },
  watch: {
    'active': {
      handler: function (val, old) {
        // console.log(val)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 获取购物车数量
    getCartNum() {
      goodservice._getCartFromId(this.$store.state.userInfo.userId).then(res => {
        if (res.status === 200) {
          this.$store.commit("SET_SHOPCARTS", res.res.length)
          Storage.setItem("cartsNum", res.res.length)
        } else {
          throw new Error(res)
        }
      }).catch(e => {
        console.log(e); 
      })
    },
    // 获取用户未处理订单数量
    getNotDeelOrderNum() {
      let data = { userId: this.$store.state.userInfo.userId }
      userservice._getOrderNotDeel(data).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setNotDeelNum(res.data)
        }
      })
    },
    setNotDeelNum(obj) {
      this.notDeelInfo = {
        bossTradingNum:obj.bossTradingNum,
        bossNotEvaluationNum:obj.bossNotEvaluationNum,
        
        userNotReceivingNum:obj.userNotReceivingNum,
        userReturningNum:obj.userReturningNum,
        userNotEvaluationNum:obj.userNotEvaluationNum,
      }
      this.$store.commit("SET_BOSSTRADINGNUM", this.notDeelInfo.bossTradingNum)
      Storage.setItem("bossTradingNum", this.notDeelInfo.bossTradingNum)

      this.$store.commit("SET_BOSSNOTEVALUATIONNUM", this.notDeelInfo.bossNotEvaluationNum)
      Storage.setItem("bossNotEvaluationNum", this.notDeelInfo.bossNotEvaluationNum)

      this.$store.commit("SET_USERNOTRECEIVINGNUM", this.notDeelInfo.userNotReceivingNum)
      Storage.setItem("userNotReceivingNum", this.notDeelInfo.userNotReceivingNum)

      this.$store.commit("SET_USERRETURNINGNUM", this.notDeelInfo.userReturningNum)
      Storage.setItem("userReturningNum", this.notDeelInfo.userReturningNum)

      this.$store.commit("SET_USERNOTEVALUATIONNUM", this.notDeelInfo.userNotEvaluationNum)
      Storage.setItem("userNotEvaluationNum", this.notDeelInfo.userNotEvaluationNum)

    }
  },
  created() {
    this.getNotDeelOrderNum()
    this.getCartNum()
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-tabbar-item__icon img {
  height: 0.25rem;
}

::v-deep .van-tabbar-item__text {
  font-size: 0.12rem;
}
</style>

