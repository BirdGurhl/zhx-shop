<template>
  <div class="container">
    <transition name="van-slide-left">
      <section class="container" v-if="!selectAddr">
        <!-- <div class="topbar">
          <i class="iconfont icon-zuojiantou1" @click="back"></i>
          <h2>确认订单</h2>
        </div> -->
        <topbar title="确认订单" :cb="back"></topbar>
        <div class="content">
          <!-- 当地址列表为空时显示这里 -->
          <div class="address-container-null" v-if="addrIsNull" @click="toAddressEdit('list')">
            <div class="addr">
              <i class="iconfont icon-dingwei"></i>
              <h2>添加新地址</h2>
            </div>
            <em class="iconfont icon-youjiantou"></em>
          </div>
          <!-- 地址列表不为空时显示这里 -->
          <div class="address-container" v-else @click="toAddressEdit('list')">
            <div class="addr">
              <p>{{ checkAddrInfo.detail }}</p>
              <h2>{{ checkAddrInfo.info }}</h2>
              <p>{{ checkAddrInfo.name }}&nbsp;&nbsp;{{ checkAddrInfo.phone }}</p>
            </div>
            <em class="iconfont icon-youjiantou"></em>
          </div>
          <!-- 商品列表 -->
          <div class="goods-container">
            <ul class="goods-list" v-for="userGroup in goodsArr">
              <div class="userContainer">
                <user :userId="userGroup.user_id" :disclickAble="true"></user>
              </div>
              <li v-for="goods in userGroup.goods" :key="goods.cartId">
                <div class="img">
                  <img :src="goods.thumb">
                </div>
                <div class="cont">
                  <p v-text="goods.title"></p>
                  <span v-text="goods.desc"></span>
                </div>
                <div class="price">
                  <p>￥{{ goods.price * goods.num }}</p>
                  <i>x{{ goods.num }}</i>
                  <select v-model="goods.sendType">
                    <option value="快递">快递</option>
                    <option value="自提">自提</option>
                  </select>
                </div>
              </li>
            </ul>
          </div>
          <!-- 运输方式 -->
          <!-- <div class="spanInfo">
            <ul>
              <li>
                <p>运输方式：</p>
                <van-dropdown-menu>
                  <van-dropdown-item v-model="sendType" :options="sendOption" :overlay="false"/>
                </van-dropdown-menu>
                <select v-model="sendType" @change="sendTypeChange">
                  <option value="快递">快递</option>
                  <option value="自提">自提</option>
                </select>

              </li>
            </ul>
          </div> -->
        </div>
        <aside class="order-submit">
          <h2>共{{ allCount }}件，合计：<font color="#ff5e00" style="font-size:0.18rem">￥{{ totalPrice / 100 }}</font>
          </h2>
          <div class="sub">
            <button @click="submitOrder">提交</button>
          </div>
        </aside>
      </section>
    </transition>

    <transition name="fade">
      <section class="container" v-if="selectAddr">
        <div>
          <topbar title="选择地址"></topbar>
          <address-list @checkAddr="checkAddr" />
        </div>
      </section>
    </transition>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { Dialog } from 'vant'
import addressList from "./addressList.vue"
import topbar from '../../../components/topbar.vue'
import user from '../../../components/user.vue'
import service from "@/api/user"
export default {
  components: {
    addressList,
    topbar,
    user
  },
  props: {
    goodsList: Array,
    totalPrice: Number
  },
  data() {
    return {
      addrIsNull: true,
      selectAddr: false,
      chosenAddressId: '1',
      checkAddrInfo: {},
      orderId: '',
      sendOption: [
        { text: '快递', value: 0 },
        { text: '自提', value: 1 },
      ],
      goodsArr: []
    }
  },
  computed: {
    allCount() {
      return this.goodsList.reduce((acc, element) => {
        return acc + element.goods.reduce((total, item) => total += item.num, 0)
      }, 0)
    }
  },

  methods: {
    back() {
      this.$emit("onBack");
    },
    changePage() {
      this.selectAddr = false;
    },
    toAddressEdit(opt) {
      // this.$router.push({ path: "/address", query: { opt } });
      this.selectAddr = true;
    },
    getAddress() {

    },
    checkAddr(addrInfo) {
      this.checkAddrInfo = addrInfo
      console.log(this.checkAddrInfo);
      this.addrIsNull = false
      this.selectAddr = false;
    },
    submitOrder() {
      if (this.addrIsNull) {
        Toast("请选择收货地址！")
      } else {
        Dialog.confirm({
          title: '',
          message: '确认提交订单？',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              let userId = this.$store.state.userInfo.userId;
              let addrId = this.checkAddrInfo.id;
              let goods = []

              this.goodsArr.forEach(element => {
                element.goods.forEach(good => { goods.push(good) })
              });
              goods = JSON.stringify(goods);

              let totalPrice = this.totalPrice / 100;
              let data = { userId, addrId, goods, totalPrice };
              service._subOrder(data).then(res => {
                console.log(res);
                if (res.status === 200) {
                  Toast("提交订单成功！")
                  this.orderId = res.orderId
                  done();
                  setTimeout(() => {
                    Dialog.confirm({
                      title: '下单成功!',
                      message: `赶紧联系卖家吧`,
                      confirmButtonText: "前往Ta的主页"
                    })
                      .then(() => {
                        // on confirm
                        this.$router.push({ path: `/userInfo/${this.goodsList[0].user_id}`})
                      })
                      .catch(() => {
                        // on cancel
                        this.$router.back()
                      });
                  }, 1000);
                }
                else {
                  throw new Error(res)
                }
              }).catch(err => {
                Toast("未知错误，提交订单失败！")
                console.log(err);
                done()
              })
            } else {
              done();
            }
          }
        })
      }
    },

    // 获取默认收货地址
    getDefaultAddress() {
      return new Promise((resolve, reject) => {
        let userId = this.$store.state.userInfo.userId;
        service._getAddress({ userId }).then(res => {
          if (res.status === 200) {
            let arr = res.data.filter(item => {
              return JSON.parse(item.isDefault)
            })
            this.checkAddrInfo = {
              id: arr[0].address_id,
              name: arr[0].receiver_name,
              phone: arr[0].receiver_phone,
              detail: arr[0].receiver_province + arr[0].receiver_city,
              info: arr[0].receiver_address
            }
            this.addrIsNull = false
            this.selectAddr = false;
            resolve(this.checkAddrInfo)
          } else {
            throw new Error('res.status !== 200')
          }
        })
          .catch(err => { reject(err) })
      })
    },
  },
  created() {
    this.getDefaultAddress()
    this.goodsArr = JSON.parse(JSON.stringify(this.goodsList))

  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;


  .content {
    width: 100%;
    height: 90%;
    box-sizing: border-box;
    padding: 00.15rem;
    overflow: scroll;
    padding-bottom: 1rem;

    .address-container-null {
      box-sizing: border-box;
      width: 100%;
      height: 0.6rem;
      background-color: #fff;
      margin: 0.1rem 0 0.2rem;
      border-radius: 0.1rem;
      display: flex;
      padding: 0.05rem;
      justify-content: space-between;
      align-items: center;

      .addr {
        display: flex;
        align-items: center;

        >i {
          width: 0.35rem;
          height: 0.35rem;
          text-align: center;
          line-height: 0.35rem;
          border-radius: 50%;
          background-color: #f6f6f6;
          margin-left: 0.1rem;
        }

        >h2 {
          font-size: 0.17rem;
          margin-left: 0.1rem;
          font-weight: 600;
          color: rgb(109, 109, 109);
        }
      }

      >em {
        font-size: 0.25rem;
        color: #bbbbbb;
      }
    }

    .address-container {
      box-sizing: border-box;
      width: 100%;
      height: 1rem;
      background-color: #fff;
      margin: 0.1rem 0 0.2rem;
      border-radius: 0.1rem;
      display: flex;
      padding: 0.05rem;
      padding-left: 0.1rem;
      justify-content: space-between;
      align-items: center;

      .addr {
        >p:first-of-type {
          font-size: 0.13rem;
        }

        h2 {
          font-size: 0.18rem;
          font-weight: 600;
          margin-top: 0.04rem;
        }

        >p:last-of-type {
          font-size: 0.13rem;
          margin-top: 0.04rem;
        }
      }

      >em {
        font-size: 0.25rem;
        color: #bbbbbb;
      }
    }

    .goods-container::-webkit-scrollbar {
      display: none;
    }

    .goods-container {
      width: 100%;
      overflow: auto;

      .goods-list {
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 0.1rem;
        margin-bottom: 0.1rem;

        position: relative;
        overflow: hidden;

        .userContainer {
          width: 70%;
          height: 0.25rem;
          padding: 0.1rem 0 0.05rem;
        }

        // padding: 0 0.1rem;

        >li {
          box-sizing: border-box;
          padding: 0 0.1rem;
          width: 100%;
          height: 1.5rem;
          border-radius: 0.1rem;
          background-color: #fff;
          margin: 0.1rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;

          >.img {
            width: 1rem;
            height: 1rem;
            // background-color: red;
            border-radius: 0.1rem;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          >.cont {
            width: 1.5rem;
            height: 1rem;

            >p {
              width: 100%;
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
              font-size: 0.17rem;
              // font-weight: 600;
            }

            >span {
              display: block;
              font-size: 0.14rem;
              color: #7f7f7f;
              margin-top: 0.1rem;
            }
          }

          >.price {
            width: 0.81rem;
            height: 1rem;
            padding-right: 0.1rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;

            >p {
              font-size: 0.16rem;
              // font-weight: 600;
              text-align: right;
            }

            >i {
              display: block;
              font-size: 0.16rem;
              color: #7f7f7f;
              margin-top: 0.1rem;
              font-style: normal;
              text-align: right;
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
      }
    }
  }

  .order-submit {
    width: 100%;
    // height: 0.5rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    h2 {
      width: 3rem;
      height: 100%;
      font-size: 0.15rem;
      box-sizing: border-box;
      padding: 0 0.15rem;
      line-height: 0.5rem;
    }

    .sub {
      >button {
        width: 1.1rem;
        height: 0.4rem;
        background-color: #fc9bbb;
        font-size: 0.15rem;
        border: none;
        outline: none;
        color: #fff;
        border-radius: 0.2rem;
        margin-right: 0.3rem;
        transition: 0.3s;
      }

      >button:active {
        background-color: #f881a8;
      }
    }
  }

  .spanInfo {
    width: 100%;
    // height: 1rem;
    box-sizing: border-box;
    padding: 0 0.15rem;
    background-color: #fff;
    border-radius: 0.1rem;
    margin-top: 0.2rem;

    >ul {
      width: 100%;

      >li {
        width: 100%;
        height: 0.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;


      }


    }
  }
}
</style>