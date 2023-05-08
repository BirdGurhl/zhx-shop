<template>
  <div class='container'>
    <header>
      <topbar title="交易完成" :cb="onClickLeft"></topbar>
    </header>
    <div class="goods-List" v-if="dataList.length < 1">
      <van-empty class="custom-image" :image="require('@/assets/custom-empty-image.png')" description="空空如也" />
    </div>
    <div class="goods-List">
      <ul>
        <li v-for="order in dataList" :key="order.order_item_id">
          <div>
            <div class="top">
              <div class="user">
                <user :userId="order.user_id"></user>
              </div>
              <i v-if="order.order_status == 0" class="orderState" style="background-color:#ff8500">待发货...</i>
              <i v-if="order.order_status == -1" class="orderState" style="background-color:red">退货中...</i>
            </div>
            <section @click="toDetail(order.goods_id)">
              <div class="image">
                <img :src="order.goods_image">
              </div>
              <div class="contents">
                <p>{{ order.goods_name }}</p>
                <span>x{{ order.quantity }}</span>
                <span>运输方式：{{ order.send_type }}</span>
                <span v-if="order.waybill_code">运单号：{{ order.waybill_code }}</span>
              </div>
              <div class="price">
                <span>￥{{ order.total_price_item }}</span>
              </div>
            </section>
            <div class="buttom">
              <div class="time">

                <span>订单编号：{{ order.order_id }}</span>
                <span>创建时间：{{ order.create_time }}</span>
                <span v-if="order.order_status == 0">下单时间：{{ order.update_time }}</span>
                <span v-if="order.order_status == -1">退货时间：{{ order.update_time }}</span>
                <span v-if="order.order_status == -1">退货理由：{{ order.return_info }}</span>
              </div>

              <!-- 发货操作 -->
              <div class="button" v-if="order.order_status == 0">
                <van-button size="small" color="#ffb6ce" @click="sendgood(order)">发货</van-button>
                <van-button size="small" color="#ff0000b8" @click="closeOrder(order)">关闭订单</van-button>
              </div>

              <!-- 退货操作 -->
              <div class="button" v-if="order.order_status == -1">
                <van-button size="small" color="#ffb6ce" @click="agreeReturn(order)">同意</van-button>
                <van-button size="small" color="#ff0000b8" @click="disAgreeReturn(order)">拒绝</van-button>
              </div>
            </div>
            <div class="btn">

            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 发货弹窗 -->
    <van-dialog v-model="showSendDialog" title="选择运输方式" confirmButtonText="确认发货" show-cancel-button
      :before-close="onBeforeClose" @confirm="handleConfirm">
      <div class="sendTypeSelect">
        <span>运输方式</span>
        <select v-model="checkOrder.send_type">
          <option value="快递">快递</option>
          <option value="自提">自提</option>
        </select>
      </div>
      <van-form ref="sendform" class="sendTypeSelect" v-if="checkOrder.send_type == '快递'">
        <van-field v-model="checkOrder.waybill_code" name="运单号" label="运单号" placeholder="运单号"
          :rules="[{ required: true, message: '请填写运单号' }]" />
      </van-form>
    </van-dialog>
    <!-- 取消订单弹窗 -->
    <van-dialog v-model="showCloseDialog" title="取消订单信息填写" show-cancel-button :before-close="onBeforeClose"
      @confirm="closeConfirm">
      <van-form ref="closeform">
        <van-field v-model="checkOrder.close_info" name="message" label="取消理由:" rows="2" autosize type="textarea"
          maxlength="50" show-word-limit placeholder="请输入取消理由" :rules="[
            { required: true, message: '' }
          ]" />
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
import service from "@/api/user"
import { Dialog } from 'vant';
import user from "./user.vue";
import topbar from "./topbar.vue";
export default {
  name: 'trading',
  data() {
    return {
      dataList: [],
      checkOrder: {},
      showSendDialog: false,
      showCloseDialog: false,
      sendType: '',
      showPicker: false,
      columns: ['自提', '快递'],
    }
  },
  computed: {},
  components: { user, topbar },
  created() {
    this.getTradingOrder()
  },
  mounted() { },
  methods: {

    // 同意退货
    agreeReturn(order) {
      Dialog.confirm({
        title: '',
        message: '是否同意退货?',
        // confirmButtonText: "前往购物车"
      })
        .then(() => {
          // on confirm
          let data = {
            ...order,
            order_status: '-2'
          }
          console.log(data);
          service._changeOrderItem(data).then(res => {
            if (res.status === 200) {
              this.$toast('成功');
              this.getTradingOrder()
            } else {
              throw new Error(res.err)
            }
          }).catch(err => {
            this.$toast(err.toString())
          })
        })
        .catch(() => {
          // on cancel
          this.$toast('已取消')
        });
    },

    // 确认取消订单
    closeConfirm() {
      this.$refs.closeform.validate()
        .then(() => { console.log('确认取消订单'); })
        .catch(() => {
          this.$toast('请输入取消理由！')
          return
        });

      let data = {
        ...this.checkOrder,
        order_status: '-2'
      }
      service._changeOrderItem(data).then(res => {
        if (res.status === 200) {
          this.$toast('成功');
          this.showCloseDialog = false
          this.getTradingOrder()
        } else {
          throw new Error(res.err)
        }
      }).catch(err => {
        this.$toast(err.toString())
      })
    },

    // 点击关闭订单
    closeOrder(order) {
      console.log('关闭订单');
      this.checkOrder = JSON.parse(JSON.stringify(order))
      this.showCloseDialog = true
    },

    // 确认发货
    handleConfirm() {
      if (this.checkOrder.send_type == '快递') {
        this.$refs.sendform.validate()
          .then(() => { console.log('确认发货'); })
          .catch(() => {
            this.$toast('请输入运单号！')
            return
          });
      }
      let data = {
        ...this.checkOrder,
        order_status: '1'
      }
      service._changeOrderItem(data).then(res => {
        if (res.status === 200) {
          this.$toast('成功');
          this.showSendDialog = false
          this.getTradingOrder()
        } else {
          throw new Error(res.err)
        }
      }).catch(err => {
        this.$toast(err.toString())
      })
    },

    // 选择发货方式
    sendOnConfirm(value, order) {
      console.log(value);
      console.log(order);
      this.sendType = value;
      this.showPicker = false;
    },
    // 点击发货
    sendgood(order) {
      this.checkOrder = JSON.parse(JSON.stringify(order))
      this.showSendDialog = true
    },

    // 取消弹窗回调,重置表单验证提示
    onBeforeClose(action, done) {
      if (action === "confirm") {
        return done(false);
      } else {
        // 重置表单校验提示
        this.$refs.sendform && this.$refs.sendform.resetValidation("message");
        this.$refs.closeform && this.$refs.closeform.resetValidation("message");
        this.message = '';
        return done();
      }
    },

    // 顶部返回键路由跳转
    onClickLeft() {
      this.$router.back()
    },

    // 跳转详情
    toDetail(goodsId) {
      this.$router.push({
        name: 'detail',
        query: {
          id: goodsId
        }
      })
    },

    // 获取列表
    getTradingOrder() {
      this.dataList = []
      
      let orderStatus = this.$route.query.state == 'complete' ? [2] : [-1, 0]  //查找退货中和待发货的订单
      orderStatus.forEach(Element => {
        let data = { userId: this.$store.state.userInfo.userId, orderStatus: Element }
        service._getOrderItemByBossId(data).then(res => {
          if (res.status === 200 && res.data.length != 0) {
            res.data.forEach(item => {
              // let obj =  {
              //   collId: item.coll_id,
              //   detail: item.detail,
              //   img: JSON.parse(item.main_image),
              //   name: item.name,
              //   price: item.price,
              //   onSale: item.on_sale,
              //   goodsId: item.goods_id,
              //   createTime: this.getData(item.create_time),
              //   updateTime: this.getData(item.update_time)
              // }
              // let obj = {
              //   ...item,
              //   create_time:this.getData(item.create_time),
              //   update_time:this.getData(item.update_time),
              //   create_time:this.getData(item.create_time),
              // }
              this.dataList.push(item)
            })
          }
        })
      })
      this.dataList = this.dataList.sort((a, b) => {
        return Date.parse(b.update_time) - Date.parse(a.update_time);
      });
      console.log(this.dataList);
    },
    getData(n) {
      n = new Date(n)
      // return n.toLocaleDateString().replace(/\//g, "-") + " " + n.toTimeString().substr(0, 8)
      return n.toLocaleDateString().replace(/\//g, "-")
    }
  }
}
</script>
<style lang='scss' scoped>
.container {
  width: 100%;
  height: 100%;

  header {
    width: 100%;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    height: 0.5rem;
    background-color: #ffb6ce;

    .top {
      width: 100%;
      position: relative;
      height: 0.4rem;
      background-color: #ffb6ce;
      color: whitesmoke;

      i {
        position: absolute;
        left: 0.15rem;
        font-size: 0.24rem;
        line-height: 0.4rem;
      }

      h1 {
        text-align: center;
        font-size: 0.18rem;
        line-height: 0.4rem;
      }
    }

    .van-nav-bar .van-icon,
    .van-nav-bar__text,
    .van-nav-bar__title {
      font-size: 0.2rem;
      color: white;
    }
  }

  .goods-List {
    width: 100%;
    overflow: auto;
    height: 90%;
    background-color: #c8c9cc52;

    box-sizing: border-box;

    ul {
      width: 100%;
      box-sizing: border-box;

      li {
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 0.1rem 0.15rem;
        background-color: #fff;
        border-radius: 0.1rem;
        margin: 0.1rem 0;
        border-bottom: 0.01rem solid #eee;

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
          margin-bottom: 0.1rem;

          // background: light;
          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .user {
              width: 70%;
              height: 0.3rem;
              padding: 0.05rem 0;
              font-size: 0.15rem;

              ::v-deep .contrainer {
                padding-left: 0 !important;
              }
            }

            i.orderState {
              font-style: normal;
              border-radius: 0.15rem;
              color: #fff;
              font-size: 0.13rem;
              line-height: 0.25rem;
              text-align: center;
              width: 0.7rem;
              margin-right: 1em;
            }

          }



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
              display: flex;
              align-items: center;

              img {
                display: block;
                width: 100%;
              }
            }

            .contents {
              width: 2rem;

              >p {
                font-size: 0.13rem;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
              }

              span {
                font-size: 0.1rem;
                display: block;
                margin-top: 0.05rem;
                color: #9c9c9c;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }

            .price {
              width: 0.5rem;
              display: flex;
              justify-content: center;
              align-items: center;

              >span {
                color: #ff5933;
                font-size: 0.15rem;
              }
            }
          }

          .buttom {
            display: flex;
            justify-content: space-between;
          }

          .time {
            margin: 0 0.05rem;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            span {
              line-height: 1.5em;
              font-size: 0.13rem;
              color: grey;
            }
          }

          .button {
            display: flex;
            align-items: center;
          }

          .van-button {
            margin-right: 0.1rem;
          }
        }
      }
    }
  }

  .van-dialog {
    .sendTypeSelect {
      display: flex;
      justify-content: space-around;
      padding: 0.2rem;
    }

    select {
      border: 0;
      padding: 0 0.1rem;
      outline: none;
      position: relative;
      margin-top: auto;
      // appearance: none;
      // /*清除select下拉框默认样式*/
      // -moz-appearance: none;
      // -webkit-appearance: none;
    }

    option {
      background: #fff;
      line-height: 20px;
    }

    select:focus {
      // border: 2px #ddd solid;
      // box-shadow: 0 0 15px 1px #DDDDDD;
      outline: none;
    }

    option:hover {
      background: #fc9bbb;

    }
  }
}
</style>
