<template>
  <div class="container">
    <topbar :title="title" :cb="back"></topbar>
    <div v-if="orderList.length === 0" class="list-section">
      <van-empty class="custom-image" :image="require('@/assets/custom-empty-image.png')" description="空空如也" />
    </div>
    <!-- 列表部分 -->
    <div class="list-section">
      <ul>
        <li v-for="order in orderList" :key="order.order_id">
          <h2>订单编号:<span>{{ order.order_id }}</span>
            <!-- 未付款页面 -->
            <i v-if="order.order_status == '0'" style="background-color:#ff2448">未支付</i>
            <!-- 待收货页面 -->
            <i v-if="order.order_status == '1' && order.send_status !== '1'" style="background-color:#F790A1">待发货</i>
            <i v-if="order.order_status == '1' && order.send_status === '1'" style="background-color:#fc617b">已发货</i>
            <!-- 已完成页面 -->
            <i v-if="order.order_status == '2'" style="background-color:#bfa">已完成</i>
            <!-- 退货页面 -->
            <i v-if="order.order_status == '-1' && order.return_status !== '1'" style="background-color:red">处理中</i>
            <i v-if="order.order_status == '-1' && order.return_status == '1'" style="background-color:#bfa;width:0.7rem">退货成功</i>
          </h2>

          <div>
            <section v-for="item in order.itemList" :key="item.order_item_id">
              <div class="image">
                <img :src="item.goods_image">
              </div>
              <div class="contents">
                <p>{{ item.goods_name }}</p>
                <span>x{{ item.quantity }}</span>
              </div>
              <div class="price">
              </div>
            </section>
            <div class="time">
              <span>创建时间：{{ order.create_time }}</span>
            </div>
            <div class="btn">
              <span>￥{{ order.total_price }}</span>
              <!-- 未付款页面：显示「去付款」 -->
              <van-button v-if="opt === 'pending'" round type="info" size="small"
                @click="toPay(order.order_id)">去付款</van-button>
                <!-- 待收货页面：显示「确认收货」 -->
              <van-button v-if="opt === 'receiving'" round type="info" size="small"
                @click="checkReciving(order.order_id)">确认收货</van-button>
                <!-- 已完成页面：显示「退货」 -->
              <van-button v-if="opt === 'finishOrder'" round type="info" size="small"
                @click="returnGoods(order.order_id)">退货</van-button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <van-dialog v-model="showDialog" title="退货信息填写" show-cancel-button :before-close="onBeforeClose"
      @confirm="handleConfirm">
      <van-form ref="myform">
        <van-field v-model="returnMessage" name="message" label="信息:" rows="2" autosize type="textarea" maxlength="50"
          show-word-limit placeholder="请输入退货理由" :rules="[
            { required: true, message: '' }
          ]" />
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
import service from "@/api/user"
import { Dialog, Toast } from "vant"
import topbar from "./topbar.vue"
export default {
  components: {
    topbar
  },
  data() {
    return {
      payCode: '',
      userId: '',
      orderList: [],
      opt: '',
      showDialog: false,
      returnMessage: '',
      checkOrder: ''
    }
  },
  computed: {
    title() {
      switch (this.opt) {
        case 'pending': return '待付款'
        case 'receiving': return '待收货'
        case 'finishOrder': return '已收货'
        case 'returnOrder': return '退货'
        case 'allOrder': return '我的订单'
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    getOrder() {
      let data = { userId: this.userId, orderStatus: this.payCode }
      service._getOrderFromStatus(data).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.orderList = res.res
        }
      })
    },

    toPay(orderId) {
      this.$router.push({ path: '/pay', query: { orderId } })
    },
    checkReciving(orderId) {
      Dialog.confirm({
        title: '',
        message: '确认收货？',
        beforeClose: (action, done) => {
          if (action === 'confirm') {
            setTimeout(() => {
              service._changeOrderStatus({ orderId: orderId, orderStatus: "2" }).then(res => {
                if (res.status === 200) {
                  Toast("收货成功");
                  this.getOrder()
                  done();
                }
              })
            }, 300)
          } else {
            done();
          }
        }
      })
    },
    returnGoods(orderId) {
      this.checkOrder = orderId
      this.showDialog = true
    },
    handleConfirm() {
      this.$refs["myform"]
        .validate()
        .then(() => {
          let data = {
            orderId: this.checkOrder,
            message: this.returnMessage,
            orderStatus: "-1"
          }
          console.log(data);
          service._returnOrder(data).then(res => {
            if (res.status === 200) {
              Toast("提交成功")
              this.getOrder()
              this.showDialog = false
            }
          })
        })
        .catch(() => { });
    },
    onBeforeClose(action, done) {
      if (action === "confirm") {
        return done(false);
      } else {
        // 重置表单校验提示
        this.$refs["myform"].resetValidation("message");
        this.message = '';
        return done();
      }
    },
  },
  created() {
    this.opt = this.$route.query.opt
    this.userId = this.$store.state.userInfo.userId
    // -1退货、0未支付、1待收货、2已完成
    if (this.opt === 'pending') {
      this.payCode = 0
      this.getOrder()
    }
    if (this.opt === 'receiving') {
      this.payCode = 1
      this.getOrder()
    }
    if (this.opt === 'finishOrder') {
      this.payCode = 2
      this.getOrder()
    }
    if (this.opt === 'returnOrder') {
      this.payCode = -1;
      this.getOrder();
    }
    if (this.opt === 'allOrder') {
      this.payCode = null;
      this.getOrder();
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;

  .list-section {
    width: 100%;
    padding: 0.1rem 0.15rem;
    overflow: auto;
    height: 90%;

    box-sizing: border-box;

    ul {
      width: 100%;
      box-sizing: border-box;

      li {
        width: 100%;
        box-sizing: border-box;
        padding: 0.1rem 0.15rem;
        background-color: #fff;
        border-radius: 0.1rem;
        margin: 0.1rem 0;

        h2 {
          width: 100%;
          font-size: 0.15rem;
          position: relative;

          span {
            margin-left: 0.1rem;
            color: #9c9c9c;
          }

          i {
            font-style: normal;
            position: absolute;
            width: 0.5rem;
            height: 0.25rem;
            right: 0;
            border-radius: 0.15rem;
            color: #fff;
            font-size: 0.13rem;
            line-height: 0.25rem;
            text-align: center;
          }
        }

        >div {
          width: 100%;
          margin-top: 0.1rem;

          >section {
            display: flex;
            justify-content: space-between;

            .image {
              width: 0.85rem;
              height: 0.85rem;
              overflow: hidden;
              box-sizing: border-box;
              padding: 0.05rem;
              border-radius: 0.1rem;

              img {
                display: block;
                width: 100%;
              }
            }

            .contents {
              width: 2rem;

              >p {
                font-size: 0.15rem;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
              }

              span {
                font-size: 0.13rem;
                display: block;
                margin-top: 0.1rem;
                color: #9c9c9c;
              }
            }

            .price {
              width: 0.5rem;
            }
          }

          .time {
            width: 100%;
            margin: 0 0.05rem;

            span {
              line-height: 0.26rem;
              font-size: 0.13rem;
            }
          }

          .btn {
            display: flex;
            justify-content: space-between;
            align-items: center;

            >span {
              color: #ff5933;
              font-size: 0.18rem;
            }
          }
        }
      }
    }
  }
}</style>