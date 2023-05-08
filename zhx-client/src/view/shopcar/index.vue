<template>
  <keep-alive>
    <div class="container">
      <transition name="van-slide-left">
        <section v-if="!isOrder">
          <!-- <div class="title">
          <h1>购物车</h1>
        </div> -->
          <topbar title="购物车"></topbar>
          <van-checkbox-group class="card-goods" v-model="checkedGoods">
            <div class="userGroup" v-for="userGroup in goods">
              <div class="userContainer">
                <user :userId="userGroup.user_id"></user>
              </div>
              <van-checkbox checked-color="#fc9bbb" class="card-goods__item" v-for="item in userGroup.goods"
                :key="item.id" :name="item.id" label-disabled icon-size="0.3rem">
                <van-swipe-cell>
                  <van-card @click="toDetail(item.id)" :title="item.title" :desc="item.desc"
                    :price="formatPrice(item.price, item.num)" :thumb="item.thumb">
                    <template #footer>
                      <van-stepper v-model="item.num" @click="stopPg" theme="round" button-size="20" :max="item.stock" @plus="plusNum(item.stock)"
                        @minus="minusNum(item.stock)" disable-input />
                    </template>
                  </van-card>
                  <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" @click="deleteCart(item.cartId)" />
                  </template>
                </van-swipe-cell>
              </van-checkbox>
            </div>
            <van-empty v-if="isNull" description="购物车空空如也~~" />
          </van-checkbox-group>
          <van-submit-bar button-color="#FC9BBB" :price="totalPrice" :disabled="!checkedGoods.length"
            :button-text="submitBarText" @submit="onSubmit" />
        </section>
      </transition>
      <!-- 订单页 -->
      <transition name="fade">
        <section v-if="isOrder">
          <check-order :goodsList="checkedGoodsInfo" :totalPrice="totalPrice" @onBack="backCart" />
        </section>
      </transition>
    </div>
  </keep-alive>
</template>

<script>
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from 'vant';
import service from "@/api/goods"
import Storage from "@/utils/storage"
import { Dialog } from "vant"
import checkOrder from "./component/checkOrder.vue"
import topbar from '../../components/topbar.vue';
import user from '../../components/user.vue';
export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    checkOrder,
    topbar,
    user
  },
  data() {
    return {
      checkedGoods: [],
      userId: '',
      goods: [],
      isOrder: false,
      checkedGoodsInfo: [],
    };
  },
  computed: {
    submitBarText() {
      const count = this.checkedGoods.length;
      return '下单' + (count ? `(${count})` : '');
    },
    totalPrice() {
      return this.goods.reduce((acc, element) => {
        return acc + element.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price * item.num : 0), 0) * 100;
      }, 0)
      // return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price * item.num : 0), 0) * 100;
    },
    isNull() {
      return this.goods.length === 0
    },

  },
  methods: {
    backCart() {
      this.isOrder = false;
      this.getCart();
    },
    formatPrice(price, num) {
      return (price * num).toFixed(2);
    },
    stopPg(){
      event.stopPropagation();
    },
    plusNum(stock) {
      console.log(event);
      event.stopPropagation();
      
    },
    minusNum(e,stock) {
      event.stopPropagation();
    },
    deleteCart(cartId) {
      // this.cartId = cartId
      Dialog.confirm({
        title: '移除商品',
        message: '是否将此商品移除购物车？',
        confirmButtonText: "移除",
        beforeClose: (action, done) => {
          if (action === 'confirm') {
            setTimeout(() => {
              service._deleteCart({ cartId }).then(res => {
                if (res.status === 200) {
                  done();
                  Toast("删除成功！")
                  this.getCart()
                }
              })
            }, 200)
          } else {
            done();
          }
        },
      })
    },
    onSubmit() {
      console.log(this.checkedGoods);
      console.log(this.goods);
      this.checkedGoodsInfo = []
      this.goods.forEach(item => {
        let checkGoods = item.goods.filter(goodsItem => this.checkedGoods.includes(goodsItem.id));
        if (checkGoods.length === 0) {
          return
        }
        
        this.checkedGoodsInfo.push({
          user_id: item.user_id,
          goods: checkGoods
        })
      });
      // this.checkedGoods.forEach(item => {
      //   this.goods.forEach(its => {
      //     its.goods.forEach(good => {
      //       if (item == good.id) {
      //         this.checkedGoodsInfo.push(good)
      //       }
      //     })

      //   })
      // })
      console.log(this.checkedGoodsInfo);
      this.isOrder = true;
    },
    toDetail(goodsId) {
      this.$router.push({ path: "/detail", query: { id: goodsId } })
    },
    getCart() {
      return new Promise((resolve, reject) => {
        service._getCartFromId(this.userId).then(res => {
          console.log(res);
          if (res.status === 200) {
            // this.goods = res.res.map(item => {
            //   return {
            //     id: item.goods_id,
            //     title: item.name,
            //     desc: '',
            //     price: item.price,
            //     num: 1,
            //     cartId: item.cart_id,
            //     thumb: JSON.parse(item.main_image)[0].url
            //   }
            // })
            this.goods = this.getGoodsOrderByUserId(res.res)
            this.$store.commit("SET_SHOPCARTS", res.res.length)
            Storage.setItem("cartsNum", res.res.length)
            resolve(this.goods)
          }
        }).catch(e => {
          reject(e)
        })
      })
    },
    // 根据userID给商品分类
    getGoodsOrderByUserId(originalArray) {
      const newArray = originalArray.reduce((acc, cur) => {
        // 在累加器中查找是否已有当前user_id的数据
        const existingData = acc.find((data) => data.user_id === cur.user_id);
        let good = {
          id: cur.goods_id,
          userId:cur.user_id,
          title: cur.name,
          desc: '',
          price: cur.price,
          num: 1,
          cartId: cur.cart_id,
          thumb: JSON.parse(cur.main_image)[0].url,
          stock:cur.stock,
          sendType:'自提'
        }
        if (existingData) {
          // 如果已有数据，将当前数据加入到对应的goods数组中
          existingData.goods.push(good);
        } else {
          // 如果没有数据，创建新的数据项并加入到累加器中
          acc.push({
            user_id: cur.user_id,
            goods: [good]
          });
        }
        return acc;
      }, [])
      return newArray
    },
  },
  created() {
    this.userId = this.$store.state.userInfo.userId
    this.getCart().then().catch(e => {
      Toast(e)
    })
  }
};
</script>

<style lang="scss" scoped>
.container {
  // position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;

  .title {
    width: 100%;
    height: 0.45rem;

    h1 {
      width: 100%;
      height: 100%;
      line-height: 0.45rem;
      text-align: center;
      font-size: 0.15rem;
    }
  }
}

.card-goods {
  // padding: 0.1rem;
  width: 100%;
  height: 88%;
  overflow: scroll;
  background-color: transparent;
  padding: 0.1rem 0 1rem;

  .userGroup {
    background-color: #fff;
    border-radius: 0.2rem 0 0 0.2rem;
    margin: 0.1rem;
    margin-right: 0;
    position: relative;
    overflow: hidden;

    .userContainer {
      width: 70%;
      height: 0.25rem;
      padding: 0.1rem 0 0.05rem;
    }
  }

  &__item {
    position: relative;
    background-color: #fff;
    margin-bottom: 0.1rem;

    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
      position: relative;
      left: 10%;
    }

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card__price {
      color: #f44;
    }

    .van-card {
      background-color: #fff;
    }
  }

  .card-goods__item:not(:last-of-type)::before {
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

::v-deep .van-submit-bar {
  position: absolute !important;
  bottom: 0.02rem;
}
</style>
<style>
.van-checkbox__label {
  width: 90%;
}

.van-button--square {
  height: 100%;
}

.van-image {
  box-sizing: border-box;
  padding: 0.05rem;
  border: 0.01rem solid rgb(216, 216, 216);
}

.van-stepper__plus {
  background-color: rgb(247, 144, 161) !important;
}

.van-stepper__minus {
  color: #f790a1 !important;
  border: 1px solid #f790a1 !important;
}

.van-checkbox__label {
  width: 90%;
  position: relative;
  left: 10%;
}

.van-checkbox__icon {
  position: absolute;
  width: 10%;
  box-sizing: border-box;
  -webkit-box-flex: 0;
  -webkit-flex: none;
  flex: none;
  font-size: 20px;
  line-height: 1em;
  cursor: pointer;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  left: 0.05rem;
}

.van-card {
  padding-left: 0;
}

section {
  /* position: relative; */
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>