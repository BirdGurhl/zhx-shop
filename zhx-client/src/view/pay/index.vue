<template>
  <div class="container">
    <div class="topTitle">
      <i class="iconfont icon-zuojiantou1" @click="back"></i>
      <h2>支付订单</h2>
      <p>订单中心</p>
    </div>

    <!-- 价格 -->

    <div class="price-container">
      <p>
        <i class="iconfont icon-renmingbiriyuan"></i>
        <span>{{ totalPrice }}</span>
      </p>
    </div>

    <!-- 支付方式 -->
    <div class="type-container">
      <van-radio-group v-model="radio" checked-color="#ff5933">
        <ul>
          <li>
            <p>
              <img src="../../assets/zhifubao.png" alt="" />
              <span>支付宝支付</span>
            </p>
            <van-radio name="1"></van-radio>
          </li>
          <li>
            <p>
              <i class="iconfont icon-weixinzhifu"></i>
              <span>微信支付</span>
            </p>
            <van-radio name="2"></van-radio>
          </li>
        </ul>
      </van-radio-group>
    </div>

    <!-- sub -->
    <div class="subm">
      <van-button size="large" round type="info" :loading="isLoading" loading-text="支付中..." color="linear-gradient(to right, #ff7d29, #ff752f, #ff6c34, #ff643a, #ff5b3f)" @click="payOrder">确认付款</van-button>
    </div>
  </div>
</template>

<script>
import service from '@/api/user'
import { Dialog } from 'vant'
export default {
  data() {
    return {
      radio: '1',
      orderId: '',
      totalPrice: '',
      isLoading: false,
    }
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1)
    },
    getOrder() {
      service._getOrderFromId(this.orderId).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.totalPrice = res.data[0].total_price
        }
      })
    },
    payOrder() {
      this.isLoading = true;
      setTimeout(() => {
        let data = {
          orderId:this.orderId,
          orderStatus:"1",
          totalPrice:this.totalPrice,
          payType:this.radio == 2?'weixin':'zhifubao'
        }
        service._payOrder(data).then(res => {
          if (res.status === 200) {
            this.isLoading = false;
            Dialog.alert({
              message: '支付成功！',
            }).then(() => {
              // on close
              this.$router.go(-1);
            });
          }
        })
      }, 300)
    }
  },
  created() {
    this.orderId = this.$route.query.orderId
    this.getOrder()
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .topTitle {
    width: 100%;
    height: 0.45rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > i {
      width: 1rem;
      font-size: 0.24rem;
      box-sizing: border-box;
      padding: 0 0.1rem;
    }
    > h2 {
      width: 1rem;
      font-size: 0.18rem;
      text-align: center;
    }
    > p {
      width: 1rem;
      font-size: 0.14rem;
      text-align: right;
      box-sizing: border-box;
      padding-right: 0.1rem;
    }
  }

  .price-container {
    width: 100%;
    height: 1rem;
    position: relative;
    p {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 1rem;
      color: #ff5933;
      > i {
        font-size: 0.35rem;
      }
      > span {
        font-size: 0.4rem;
      }
    }
  }

  .type-container {
    width: 100%;
    box-sizing: border-box;
    padding: 0.15rem;
    ul {
      width: 100%;
      border-radius: 0.1rem;
      background-color: #fff;
      padding: 0.1rem 0;
      > li {
        width: 100%;
        height: 0.65rem;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding-right: 0.1rem;
        p {
          display: flex;
          align-items: center;
          img {
            width: 0.5rem;
          }
          i {
            text-align: center;
            width: 0.5rem;
            font-size: 0.4rem;
            color: #09bb07;
          }
          span {
            margin-left: 0.1rem;
          }
        }
      }
    }
  }

  .subm {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.15rem;
  }
}
</style>
