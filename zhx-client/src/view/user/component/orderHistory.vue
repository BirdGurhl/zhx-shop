<template>
  <div class='orderHistory-container'>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div>
        <van-loading v-show="dataLoading" color="#fc9bbb" size="30" />
        <van-tabs v-model="activetype" @change="changeType" sticky animated swipeable
          :offset-top="stickyTop - 0.01 + 'rem'">
          <van-tab :title="isMe ? '我的交易' : 'Ta的交易'">
            <div class="water-product">
              <waterfall v-if="goodsList.length > 0" :col="2" :data="goodsList" :lazy-distance="400" :load-distance="400">
                <div class="product-list" v-for="its in goodsList" @click="moveDetail(its.goods_id, its.on_sale)"
                  :key="its.goods_id">
                  <div :class="{ 'complete-product': its.on_sale != 1 }">
                    <div class="user-contrainer">
                      <user :userId="userId" :disclickAble="true"></user>
                    </div>
                    <img style="width: 100%;max-height: 50vw;" :lazy-src="its.main_image[0].url" />
                    <div class="infoClass">
                      <h2 v-text="its.name"></h2>
                      <p>
                        <i class="iconfont icon-renmingbiriyuan"></i>
                        <span class="price">{{ its.price }}</span>
                        <span class="time">{{ its.update_time }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="complete" v-if="its.on_sale != 1"><img :src="require('@/assets/complete.png')" alt=""></div>

                </div>
              </waterfall>
              <van-empty v-else description="空空如也" />
            </div>
          </van-tab>
          <van-tab :title="isMe ? '我的评价' : 'Ta的评价'">
            <div class="water-product">
              <waterfall v-if="orderList.length > 0" :col="1" :data="orderList">
                <div class="order-list" v-for="its in orderList" :key="its.order_item_id">
                  <div class="user-contrainer">
                    <user :userId="its.userId"></user>
                  </div>
                  <div class="evaluation">
                    {{ its.evaluation }}
                  </div>
                  <div class="time">
                    {{ its.close_time }}
                  </div>
                </div>
              </waterfall>
              <van-empty v-else description="空空如也" />
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from 'vant'
import goodService from '@/api/goods.js'
import userService from '@/api/user.js'
import user from '../../../components/user.vue'
export default {
  name: 'orderHistory',
  data() {
    return {
      isLoading: false,
      dataLoading: false,
      activetype: 0,
      goodsList: [],
      orderList: []
    }
  },
  props: ['userId', 'stickyTop'],
  computed: {
    isMe() {
      return this.userId == this.$store.state.userInfo.userId
    }
  },
  components: {
    user
  },
  created() {
    this.getGoodsHistory()
    this.getcompleteOrder()
  },
  mounted() { },
  methods: {
    moveDetail(goodId, onSale) {
      // 如果是已完成的商品
      if (onSale != 1) {
        // 如果没有登录或者不是本人
        if (!this.isMe) {
          return
        }
      }
      this.$router.push({ path: '/detail', query: { id: goodId } })

    },
    changeType() {

    },
    onRefresh() {
      setTimeout(() => {
        this.getGoodsHistory().then((res) => {
          if (res.status === 'OK') {
            Toast('刷新成功')
            this.isLoading = false
          }
        })
          .catch(err => {
            Toast('失败')
            this.isLoading = false
          })
      }, 0)
    },

    // 获取用户完成了的订单
    getcompleteOrder() {
      this.orderList = []
      this.dataLoading = true
      setTimeout(() => {
        userService
          ._getOrderItemByUserId({ userId: this.userId, orderStatus: 2 })  // 2:订单状态已完成
          .then((res) => {
            console.log(res);
            this.orderList = res.data.filter(item => {  // 过滤没有评论的
              let isBoss = this.userId == item.boss_id
              if (isBoss) {
                return Boolean(item.user_evaluation ? item.user_evaluation.trim() : item.user_evaluation)
              } else {
                return Boolean(item.boss_evaluation ? item.boss_evaluation.trim() : item.boss_evaluation)
              }
            })
              .map(item => {
                let isBoss = this.userId == item.boss_id
                return {
                  ...item,
                  isBoss,
                  userId: isBoss ? item.user_id : item.boss_id,
                  evaluation: isBoss ? item.user_evaluation : item.boss_evaluation
                }
              })
            this.dataLoading = false
            console.log(this.orderList);
          })
          .catch((e) => {
            this.dataLoading = false
            console.log(e);
          })
      }, 200)
    },

    // 获取用户发布过的商品
    getGoodsHistory() {
      return new Promise((resolve, reject) => {
        this.goodsList = [] //清空 否则会导致数据显示不出来的bug
        this.dataLoading = true
        setTimeout(() => {
          goodService
            ._goodsFromUserId(this.userId)
            .then((res) => {
              this.goodsList = res.data
                .map((item) => {
                  return {
                    ...item,
                    main_image: JSON.parse(item.main_image),
                    update_time: this.getTimeDiff(item.update_time)
                  }
                })
              this.dataLoading = false
              resolve({ status: 'OK' })
            })
            .catch((e) => {
              this.dataLoading = false
              reject({ status: 'Err', e })
            })
        }, 200)
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
      const timestamp = Date.parse(str);
      const diffHours = (Date.now() - timestamp) / (1000 * 60 * 60);
      const diffDays = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
      if (diffHours === 0) {
        return '刚刚'
      }
      else if (diffHours < 48) {
        return Math.floor(diffHours) + '小时前';
      }
      else if (diffDays < 7) {
        return Math.floor(diffDays) + '天前';
      } else {
        return this.formatDate(timestamp);
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.orderHistory-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 0.2rem 0.15rem 0.55rem;
  background-color: transparent;
  overflow: scroll;

}

.van-loading {
  position: absolute;
  left: 50%;
  top: 2rem;
  transform: translate(-50%);
  z-index: 999;
}

.water-product {
  box-sizing: border-box;
  // padding: 0 0.09rem 0;
  min-height: 3rem;
  width: 100%;
  background-color: transparent;
  position: realative;

  .product-list {
    width: 100%;
    // background-color: #fff;
    // min-height: 1rem;
    box-sizing: border-box;
    padding: 0.1rem;
    position: relative;

    img {
      display: block;
    }

    .user-contrainer {
      background: linear-gradient(to bottom right, #fc9bbb63, #fff);
      width: 100%;
      border-radius: 0.15rem 0.15rem 0 0;
      height: 0.25rem;
      line-height: 0.25rem;
      padding: 0.05rem 0;
      font-size: 0.15rem;
    }

    .infoClass {
      background-color: #fff;
      padding: 0.1rem;
      border-radius: 0 0 0.15rem 0.15rem;

      h2 {
        font-size: 0.16rem;
        line-height: 1.5em;
        font-weight: 600;
        // 只显示两行文字
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -moz-box;
        -moz-line-clamp: 2;
        -moz-box-orient: vertical;
        word-wrap: break-word;
        word-break: break-all;
        white-space: normal;
      }

      p {
        line-height: 0.35rem;
        display: flex;

        .iconfont {
          font-size: 0.18rem;
          // color:#ff5e00;
          line-height: 0.35rem;
          vertical-align: middle;
        }

        span.price {
          font-size: 0.18rem;
          color: #ff5e00;
          vertical-align: bottom;
        }

        span.time {
          font-size: 0.1rem;
          margin-left: auto;
          vertical-align: bottom;
          color: #969799;
        }
      }
    }



    .complete {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 1;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 3;

      img {
        width: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
  }

  .complete-product {
    // background: rgba(#0080ff00, 0.1);
    opacity: .5;
  }
  .order-list:first-of-type{
    margin-top: 0.1rem;
    border-radius: 0.1rem 0.1rem 0 0;
  }
  .order-list:last-of-type{
    border-radius: 0 0 0.1rem 0.1rem;
  }
  .order-list {
    // width: 100%;
    background: #fff;
    padding: 0.1rem;
    padding-bottom: 0.2rem;
    position: relative;

    .user-contrainer {
      height: 0.3rem;
      padding-left: 0.1rem;
      ::v-deep .contrainer {
        padding-left: 0;
        color: #969799;
      }
    }
    .evaluation {
      // color:#969799;
      padding: 0.2rem 0;
      margin-left: 0.1rem;

    }
    .time {
      color: #969799;
      margin-left: 0.1rem;
    }
  }
  .order-list:not(:last-of-type)::before {
    content: "";
    position: absolute;
    left: 2.5%;
    bottom: 0;
    width: 95%;
    height: 0.01rem;
    background-color: #f790a1;
    z-index: 2;
  }
}

::v-deep .van-tabs__line {
  background-color: #fc9bbb;
}

::v-deep .van-sticky {
  // top:3rem;/*这里填入你需要吸顶到顶部的距离*/ 
  border-radius: 0.1rem;
  overflow: hidden;
}
</style>
