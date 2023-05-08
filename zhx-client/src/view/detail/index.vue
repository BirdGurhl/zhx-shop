<template>
  <div class="container">
    <!-- <div class="top-back" >
      <i class="iconfont icon-zuojiantou1" @click="back"></i>
      <span>商品详情</span>
    </div> -->
    <topbar title="商品详情" :cb="back"></topbar>

    <!-- 图片轮播 -->
    <div class="img-list-container">
      <div class="swiper-container">
        <van-swipe class="my-swipe" indicator-color="white" @change="onChange">
          <van-swipe-item v-for="(imgs, index) in imgList" :key="imgs.name" @click="previewImg(index)">
            <img class="swiper-bgimg" v-lazy="imgs.url" :style="'background-image: url(' + imgs.url + ');'">
            <img class="swiper-list" :src="imgs.url">
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">{{ current + 1 }}/{{ imgList.length }}</div>
          </template>
        </van-swipe>
      </div>
    </div>
    <!-- 商品信息 -->
    <div class="shop-info" v-if="goodsInfo">
      <div class="h2">
        <div class="user">
          <user :userId="goodsInfo.user_id"></user>
        </div>
        <h2>
          <i class="iconfont icon-renmingbi"></i>
          <span v-text="goodsInfo.price"></span>
        </h2>
      </div>
      <van-divider />
      <div class="goods-name">
        <p v-text="goodsInfo.name"></p>
      </div>
      <div class="detail">
        <div v-html="goodsInfo.detail"></div>
      </div>
    </div>
    <!-- 底部操作 -->
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" @click="toCart" />
      <van-goods-action-icon v-if="!collFlag" icon="star-o" text="收藏" @click="addCollection" />
      <van-goods-action-icon v-else icon="star" color="#F790A1" text="收藏" @click="deleteCollection" />
      <van-goods-action-button color="#f790a1" type="warning" text="加入购物车" @click="saveCart" />
    </van-goods-action>
  </div>
</template>

<script>
import service from "@/api/goods"
import { Toast } from 'vant'
import { Dialog } from "vant"
import { ImagePreview } from 'vant';
import Storage from "@/utils/storage"
import user from "../../components/user.vue"
import topbar from "../../components/topbar.vue";
export default {
  components: {
    user,
    topbar
  },
  data() {
    return {
      userId: "",
      current: 0,
      goodsId: "",
      imgList: [],
      goodsInfo: null,
      overlayShow: false,
      collFlag: false,
      collId: "",
      nullUser: false
    }
  },
  computed: {

  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    toCart() {
      this.$router.push("/shopcar")
    },
    previewImg(index) {
      let images = this.imgList.map(img => {
        return img.url
      })
      ImagePreview({
        images: images,
        closeable: true,
        startPosition: index
      });
    },
    onChange(index) {
      this.current = index;
    },
    getIsCollection() {
      if (this.nullUser) {
        return
      }
      let data = {
        userId: this.userId,
        goodsId: this.goodsId
      }
      service._isCollection(data).then(res => {
        console.log(res);
        if (res.isCode === 0) {
          this.collFlag = false
        } else if (res.isCode === 1) {
          this.collFlag = true
          this.collId = (res.data[0].coll_id).toString()
        }
      })
    },
    addCollection() {
      if (this.nullUser) {
        this.toCart()
        return
      }
      if (this.userId == this.goodsInfo.user_id) {
        this.$toast('失败，不可收藏本人发售得商品')
        return
      }
      let data = {
        userId: this.userId,
        goodsId: this.goodsId
      }
      service._addCollection(data).then(res => {
        if (res.status === 200) {
          Toast("收藏成功")
          this.getIsCollection()
        }
      }).catch(err => {
        alert(err)
      })
    },
    deleteCollection() {
      if (this.nullUser) {
        this.toCart()
        return
      }
      if (this.collId !== '') {
        service._deleteCollection({ collId: this.collId }).then(res => {
          if (res.status === 200) {
            Toast("取消成功")
            this.getIsCollection()
          }
        })
      }
    },
    getGoodsFromId() {
      return new Promise((resolve, reject) => {
        service._getGoodsFromId(this.goodsId).then(res => {
          if (res.status === 200) {
            this.goodsInfo = res.data
            // 处理换行符
            this.goodsInfo.detail = this.goodsInfo.detail.replace(/\n/g, '<br>')
            this.imgList = JSON.parse(res.data.main_image)
            resolve({ status: "OK" })
          }
        }).catch(e => {
          reject(e)
        })
      })
    },
    saveCart() {
      if (this.nullUser) {
        this.toCart()
        return
      }
      if (this.userId == this.goodsInfo.user_id) {
        this.$toast('失败，不可添加本人发售得商品')
        return
      }
      this.userId = JSON.parse(Storage.getItem("userInfo")).userId
      if (Storage.getItem("userInfo")) {
        if (this.userId !== '' && this.goodsId !== '') {
          service._saveCart({ userId: this.userId, goodsId: this.goodsId }).then(res => {
            if (res.status === 200) {
              Dialog.confirm({
                title: '',
                message: '商品已添加成功',
                confirmButtonText: "前往购物车"
              })
                .then(() => {
                  // on confirm
                  this.$router.push("/shopcar")
                })
                .catch(() => {
                  // on cancel
                });
            } else if (res.status === 201) {
              // Toast("该商品已存在于您的购物车~~")
              Dialog.confirm({
                title: '',
                message: '该商品已存在于您的购物车~~',
                confirmButtonText: "前往购物车"
              })
                .then(() => {
                  // on confirm
                  this.$router.push("/shopcar")
                })
                .catch(() => {
                  // on cancel
                });
            }
          }).catch(e => {
            throw new Error(e)
          })
        }
      } else {
        this.$router.push("/login")
        Toast("请先登录")
      }
    }

  },
  created() {
    if (Storage.getItem('userInfo') !== null) {
      this.userId = JSON.parse(Storage.getItem("userInfo")).userId
    } else {
      this.nullUser = true
    }
    this.goodsId = this.$route.query.id
    this.getGoodsFromId().then().catch(e => {
      Toast(e)
    })
    this.getIsCollection()
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .top-back {
    background-color: #ffb6ce;
    width: 100%;
    display: flex;
    height: 0.5rem;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    position: relative;

    >i {
      position: absolute;
      width: 0.3rem;
      height: 0.3rem;
      transform: translateX(50%);
      background-color: #b2b2b2;
      border-radius: 50%;
      color: #fff;
      font-size: 0.18rem;
      text-align: center;
      line-height: 0.3rem;
    }

    >span {
      margin: 0 auto;
      color: white;
    }
  }

  .img-list-container {
    width: 100%;
    height: 3.5rem;

    .swiper-container {
      width: 100%;
      height: 100%;
    }
  }

  .shop-info {
    width: 100%;
    height: 2rem;
    box-sizing: border-box;
    padding: 0.15rem;

    .h2 {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 0.4rem;

      .user {
        width: 80%;
        font-size: 0.2rem;

        ::v-deep .contrainer {
          padding-left: 0 !important;
        }
      }

      h2 {
        line-height: 0.4rem;

        >i {
          font-size: 0.2rem;
          color: #ff5e00;
        }

        >span {
          font-size: 0.3rem;
          color: #ff5e00;
          vertical-align: bottom;
        }
      }
    }

    .van-divider::after,
    .van-divider::before {
      border-width: 0.02rem 0 0;
    }


    .detail {
      width: 100%;

      >div {
        font-size: 0.16rem;
        line-height: 0.3rem;
        color: #505050;
      }
    }
  }
}

.custom-indicator {
  position: absolute;
  right: 0.15rem;
  bottom: 0.1rem;
  width: 0.4rem;
  height: 0.22rem;
  font-size: 12px;
  background: #939393;
  color: #fff;
  text-align: center;
  border-radius: 0.1rem;
  line-height: 0.22rem;
  letter-spacing: 0.02rem;
}

.my-swipe {
  height: 100%;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  // background-color: #39a9ed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.2rem;
  box-sizing: border-box;

  .swiper-bgimg {
    // content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: -2;
    /* 将伪元素置于容器的最底层 */
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    filter: blur(0.1rem);
    /* 调整模糊度，数值越大模糊度越高 */
  }

  .swiper-list {
    max-width: 100%;
    max-height: 100%;
    object-fit: scale-down;
  }
}

.goods-name {
  width: 100%;
  font-size: 0.19rem;
  font-weight: 600;
  margin: 0.1rem 0;
}
</style>