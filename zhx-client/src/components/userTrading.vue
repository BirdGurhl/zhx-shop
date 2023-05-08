<template>
  <div class='container'>
    <header>
      <topbar :title="title" :cb="onClickLeft"></topbar>
    </header>
    <div class="goods-List" v-if="dataList.length < 1">
      <van-empty class="custom-image" :image="require('@/assets/custom-empty-image.png')" description="空空如也" />
    </div>
    <div class="goods-List">
      <ul>
        <li v-for="order in dataList" :key="order.order_item_id">
          <div>
            <div class="top">
              <!-- 下单用户 -->
              <div class="user">
                <user :userId="order.boss_id"></user>
              </div>
              <i v-if="order.order_status == 0" class="orderState" style="background-color:#ff8500">待发货...</i>
              <i v-if="order.order_status == 1" class="orderState" style="background-color:#409eff">运输中...</i>
              <i v-if="order.order_status == -1" class="orderState" style="background-color:red">退货中...</i>

              <i v-if="order.order_status == 2 && order.return_status != 1" class="orderState"
                style="background-color:#07c160">已完成</i>
              <i v-if="order.order_status == 2 && order.return_status == 1" class="orderState"
                style="background-color:#606266">已退货</i>

              <i v-if="order.order_status == -2 && order.return_status != 1" class="orderState"
                style="background-color:#606266">已取消</i>
              <i v-if="order.order_status == -2 && order.return_status == 1" class="orderState"
                style="background-color:#f56c6c">拒绝退货</i>
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
                <span v-if="order.send_time">发货时间：{{ order.send_time }}</span>
                <span v-if="order.order_status == -1">退货时间：{{ order.update_time }}</span>
                <span v-if="order.order_status == -1">退货理由：{{ order.return_info }}</span>
                <span v-if="order.order_status == -2 && order.return_status == 1">拒绝理由：{{ order.close_info }}</span>
                <span v-if="order.order_status == 2 && order.boss_evaluation">卖家评论：{{ order.boss_evaluation }}</span>
                <span v-if="order.order_status == 2 && order.user_evaluation">我的评论：{{ order.user_evaluation }}</span>
              </div>

              <div class="btn" v-if="$route.query.state != 'userAllOrder'">
                <!-- 待发货---关闭订单操作 -->
                <div class="button" v-if="order.order_status == 0">
                  <van-button size="small" color="#ff0000b8"
                    @click="dialogBtn(order, 'showCloseDialog')">取消订单</van-button>
                </div>
                <!-- 运输中---收货操作 -->
                <div class="button" v-if="order.order_status == 1">
                  <van-button size="small" color="#ffb6ce" @click="confimDialog(order, '确认收货', 2)">收货</van-button>
                </div>

                <!-- 退货中---取消退货 -->
                <div class="button" v-if="order.order_status == -1">
                  <!-- 其实就是取消订单 -->
                  <van-button size="small" color="#ff0000b8"
                    @click="confimDialog(order, '确认取消退货', 2, { return_info: '' })">取消退货</van-button>
                </div>

                <!-- 评价与退货,已完成或已退货的订单 -->
                <div class="button" v-if="order.order_status == 2">
                  <van-button size="small" color="#ff0000b8" @click="dialogBtn(order, 'showReturnDialog')"
                    v-if="order.return_status !== '1'">退货</van-button>
                  <van-button size="small" color="#ffb6ce" v-if="!Boolean(order.user_evaluation)"
                    @click="dialogBtn(order, 'showEvaluationDialog')">评价</van-button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 取消订单弹窗 -->
    <van-dialog v-model="showCloseDialog" title="取消订单信息填写" show-cancel-button :before-close="onBeforeClose"
      @confirm="handleConfirm('closeform', -2, 'showCloseDialog')">
      <van-form ref="closeform">
        <van-field v-model="checkOrder.close_info" name="message" label="取消理由:" rows="2" autosize type="textarea"
          maxlength="50" show-word-limit placeholder="请输入取消理由" :rules="[
            { required: true, message: '' }
          ]" />
      </van-form>
    </van-dialog>
    <!-- 退货弹窗 -->
    <van-dialog v-model="showReturnDialog" title="退货信息填写" show-cancel-button :before-close="onBeforeClose"
      @confirm="handleConfirm('returnform', -1, 'showReturnDialog')">
      <van-form ref="returnform">
        <van-field v-model="checkOrder.return_info" name="message" label="退货原因:" rows="2" autosize type="textarea"
          maxlength="50" show-word-limit placeholder="请输入退货原因" :rules="[
            { required: true, message: '' }]" />
      </van-form>
    </van-dialog>
    <!-- 评价弹窗 -->
    <van-dialog v-model="showEvaluationDialog" title="评价信息填写" show-cancel-button :before-close="onBeforeClose"
      @confirm="handleConfirm('evaluationform', 2, 'showEvaluationDialog')">
      <van-form ref="evaluationform">
        <van-field v-model="checkOrder.user_evaluation" name="message" label="评价:" rows="2" autosize type="textarea"
          maxlength="50" show-word-limit placeholder="请输入你的评价" :rules="[
            { required: true, message: '' }]" />
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
  name: 'userTrading',
  data() {
    return {
      dataList: [],
      checkOrder: {},
      showCloseDialog: false,
      showEvaluationDialog: false,
      showReturnDialog: false,
      showPicker: false,
      columns: ['自提', '快递'],
    }
  },
  computed: {
    title() {
      switch (this.$route.query.state) {
        case 'userTrade':
          return '待收货'
          break;
        case 'userReturning':
          return '退货'
          break;
        case 'userReceived':
          return '已收货'
          break;
        case 'userAllOrder':
          return '全部订单'
          break;
        default:
          break;
      }
    }
  },
  components: { user, topbar },
  created() {
    this.getTradingOrder()
  },
  mounted() { },
  methods: {

    // 确认弹出框事件,提交更改confimDialog
    confimDialog(order, title, order_status, ...arr) {

      Dialog.confirm({
        title: `是否${title}?`,
        message: '',
      })
        .then(() => {
          // on confirm
          let data = {}
          if (arr.length > 0) {
            data = {
              ...order,
              ...arr[0],
              order_status
            }
          } else {
            data = {
              ...order,
              order_status
            }
          }

          console.log(data);
          service._changeOrderItem(data).then(res => {
            if (res.status === 200) {
              this.$toast('成功');
              this.getTradingOrder()
            } else {
              throw new Error(res.err)
            }
          })

        })
        .catch(() => {
          // on cancel
          this.$toast('取消')
        });
    },

    // 输入弹出框确认事件,提交更改
    handleConfirm(formRef, order_status, showdialog) {
      this.$refs[formRef].validate()
        .then(() => { })
        .catch(() => {
          this.$toast('输入为空!')
          return
        });
      let data = {
        ...this.checkOrder,
        order_status
      }
      service._changeOrderItem(data).then(res => {
        if (res.status === 200) {
          this.$toast('成功');
          this[showdialog] = false
          this.getTradingOrder()
        } else {
          throw new Error(res.err)
        }
      }).catch(err => {
        this.$toast(err.toString())
      })
    },

    // 点击按钮显示弹窗
    dialogBtn(order, showdialog) {
      if (showdialog == 'showReturnDialog') {
        let flag1 = order.return_status == '0'    // 已经退货过,然后取消退货了
        let flag2 = !this.getTimeDiff(order.update_time)   // 大于7天
        if (flag1 || flag2) {
          Dialog.alert({
            title: flag1 ? '已经退货过一次!' : '距离收货时间大于7天!',
          }).then(() => {
            // on close
            return
          });
        }
        if (flag1 || flag2) return
      }
      console.log(order);
      this.checkOrder = JSON.parse(JSON.stringify(order))
      this[showdialog] = true
    },

    // 取消弹窗回调,重置表单验证提示
    onBeforeClose(action, done) {
      if (action === "confirm") {
        return done(false);
      } else {
        // 重置表单校验提示
        this.$refs.closeform && this.$refs.closeform.resetValidation("message");
        this.$refs.returnform && this.$refs.returnform.resetValidation("message");
        this.$refs.evaluationform && this.$refs.evaluationform.resetValidation("message");
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
      let orderStatus = []
      switch (this.$route.query.state) {
        case 'userTrade':
          orderStatus = [0, 1]
          orderStatus.forEach(Element => {
            let data = { userId: this.$store.state.userInfo.userId, orderStatus: Element, onlyUser: true }
            this.getData(data).then(res => {
              this.dataList = [...this.dataList, ...res]
              this.dataList = this.dataList.sort((a, b) => {
                return Date.parse(b.update_time) - Date.parse(a.update_time);
              });
            }).catch(err => {
              this.$toast('未知错误,' + err.toString())
            })
          })
          break;
        case 'userReturning':
          // 退货中、已退货、拒绝退货的订单   需要过滤
          orderStatus = [-1, 2, -2]
          orderStatus.forEach(Element => {
            let data = { userId: this.$store.state.userInfo.userId, orderStatus: Element, onlyUser: true }
            this.getData(data).then(res => {
              // 如果是获取已退货
              if (Element == 2) {
                this.dataList = [...this.dataList, ...res.filter(item => item.return_status === '1')]
              } //如果是获取拒绝退货
              else if (Element == -2) {
                this.dataList = [...this.dataList, ...res.filter(item => item.return_status === '1')]
              }
              else {
                this.dataList = [...this.dataList, ...res]
              }
              this.dataList = this.dataList.sort((a, b) => {
                return Date.parse(b.update_time) - Date.parse(a.update_time);
              });
            }).catch(err => {
              this.$toast('未知错误,' + err.toString())
            })
          })
          break;
        case 'userReceived':
          // 已完成、已退货、拒绝退货(退货失败)     需要过滤
          orderStatus = [2, -2]
          orderStatus.forEach(Element => {
            let data = { userId: this.$store.state.userInfo.userId, orderStatus: Element, onlyUser: true }
            this.getData(data).then(res => {
              //如果是获取拒绝退货
              if (Element == -2) {
                this.dataList = [...this.dataList, ...res.filter(item => item.return_status === '1')]
              }
              else {
                this.dataList = [...this.dataList, ...res]
              }
              this.dataList = this.dataList.sort((a, b) => {
                return Date.parse(b.update_time) - Date.parse(a.update_time);
              });
            }).catch(err => {
              this.$toast('未知错误,' + err.toString())
            })
          })
          break;
        case 'userAllOrder':
          // 已完成、已退货、发货中、待发货、退货中、拒绝退货、已取消
          let data = { userId: this.$store.state.userInfo.userId, onlyUser: true }
          this.getData(data).then(res => {
            this.dataList = [...this.dataList, ...res]
            this.dataList = this.dataList.sort((a, b) => {
              return Date.parse(b.update_time) - Date.parse(a.update_time);
            });
          }).catch(err => {
            this.$toast('未知错误,' + err.toString())
          })
          break;

        default:
          break;
      }

    },


    getData(data) {
      return new Promise((resolve, reject) => {
        let response = []
        service._getOrderItemByUserId(data).then(res => {
          if (res.status === 200 && res.data.length != 0) {
            console.log(res.data);
            response = res.data

            console.log(response);
            resolve(response)
          }
        }).catch(err => {
          console.log(err);
          reject(err)
        })
      })

    },

    getDate(n) {
      n = new Date(n)
      // return n.toLocaleDateString().replace(/\//g, "-") + " " + n.toTimeString().substr(0, 8)
      return n.toLocaleDateString().replace(/\//g, "-")
    },

    getTimeDiff(str) {
      if (!str) {
        return false
      }
      const timestamp = Date.parse(str);
      const diffDays = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
      if (diffDays < 7) {
        return true
      } else {
        return false
      }
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
            margin: 0.1rem 0.05rem 0;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            span {
              line-height: 1.5em;
              font-size: 0.13rem;
              color: grey;
            }
          }

          .btn {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .button {
            display: flex;
            align-items: center;
            justify-content: space-around;
            min-width: 1.1rem;
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
