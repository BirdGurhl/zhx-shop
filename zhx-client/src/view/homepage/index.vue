<template>
  <div class="container">
    <div class="top-container">
      <h1>仲海鲜市场</h1>
      <div class="search-container">
        <div class="search">
          <input @click="toSearch" class="search-input" type="text" placeholder="请输入关键字搜索~">
        </div>
        <i class="iconfont icon-sanheng" @click="$router.push('/category')"></i>
      </div>

      <van-notice-bar class="top-nav" left-icon="volume-o" color="#fff" background="#fc9bbb" :scrollable="false"
        mode="closeable">
        <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
          <van-swipe-item v-for="(notice, index) in noticeData" :key="notice.goods_id">{{
            notice.content
          }}</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
      <div class="swiper-container">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(img, index) in bannerList" :key="img.goods_id" @click="moveDetail(img.goods_id)">
            <img class="swiper-bgimg" v-lazy="img.main_image[0].url"
              :style="'background-image: url(' + img.main_image[0].url + ');'">
            <img class="swiper-img" v-lazy="img.main_image[0].url">
            <p class="swiper-desc">{{ img.detail }}</p>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 分类栏 -->
      <div class="typeBox">
        <van-grid :gutter="10">
          <van-grid-item v-for="(item, index) in topNavType.slice(0,8)" :key="item.typeId"
            :icon="require(`@/assets/typeIcon/${item.name}.png`)" :text=item.name
            @click="toCategory(item.typeId, index)" />
        </van-grid>
      </div>
      <!-- 分类栏end -->

      <div class="product-container">
        <van-loading v-show="dataLoading" color="#fc9bbb" size="30" />
        <!-- <van-loading v-show="dataLoading" color="#fc9bbb" size="30"
          style="position: absolute; left: 50%; top: 2rem; transform: translate(-50%); z-index: 999;" /> -->
        <van-tabs v-model="activetype" @change="changeType" sticky animated swipeable>
          <van-tab v-for="item in topNavType.slice(0,8)" :title="item.name" :key="item.typeId" :name="item.typeId">
            <div class="water-product">
              <waterfall v-if="data.length > 0" :col="col" :data="data">
                <div class="product-list" v-for="its in data" @click="moveDetail(its.goodsId)" :key="its.goodsId">
                  <div class="user-contrainer">
                    <user :userId="its.userId"></user>
                  </div>
                  <img style="width: 100%;max-height: 50vw;" :src="its.imgs[0].url" />
                  <div class="infoClass">
                    <h2 v-text="its.name"></h2>
                    <p>
                      <i class="iconfont icon-renmingbiriyuan"></i>
                      <span>{{ its.price }}</span>
                    </p>
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
import service from '@/api/goods.js'
import user from '../../components/user.vue'
export default {
  components: {
    user
  },
  data() {
    return {
      name: 'homepage',
      data: [],
      bannerList: [],
      col: 2,
      isLoading: false,
      activetype: '',
      topNavType: [],
      dataLoading: false,
      noticeData:[]
    }
  },
  computed: {},
  methods: {
    toSearch() {
      this.$router.push({ path: '/search' })
    },
    onRefresh() {
      // setTimeout(() => {
        this.getGoodsFromType().then((res) => {
          if (res.status === 'OK') {
            Toast('刷新成功')
            this.isLoading = false
          }
        })
          .catch(err => {
            Toast('失败')
            this.isLoading = false
          })
      // }, 0)
    },
    formatGoodsType(data) {
      this.topNavType = data
        .filter((its) => its.status === 'on')
        .map((item) => {
          return {
            typeId: item.cate_id,
            status: item.status,
            name: item.type_name,
          }
        })
    },
    changeType() {
      this.getGoodsFromType()
      return true
    },
    // 获取商品列表
    getGoodsFromType() {
      return new Promise((resolve, reject) => {
        this.data = [] //清空data列表 否则会导致数据显示不出来的bug
        this.dataLoading = true
        // setTimeout(() => {
          service
            ._getGoodsFromType(this.activetype, this.$store.state.userInfo.userId)
            .then((res) => {
              this.data = res.data
                // .filter((its) => its.on_sale === '1')   // 过滤不在售的
                .map((item) => {
                  return {
                    name: item.name,
                    detail: item.detail,
                    goodsId: item.goods_id,
                    imgs: JSON.parse(item.main_image),
                    price: item.price,
                    userId: item.user_id
                  }
                })
              resolve({ status: 'OK' })
              this.dataLoading = false
            })
            .catch((e) => {
              reject({ status: 'Err', e })
            })
        // }, 0)
      })
    },
    moveDetail(id) {
      this.$router.push({ path: '/detail', query: { id } })
    },
    toCategory(typeId, index) {
      this.$router.push({
        name: 'category',
        params: {
          typeId,
          index
        }
      })
    },
    getNotice() {
      service._getAllNotice().then(res => {
        console.log(res);
        this.noticeData = res.data.map(item => {
          return {
            noticeId: item.notice_id,
            content: item.notice_detail,
            createUser: item.admin_name,
            createTime: item.create_time,
            updateTime: item.update_time === null ? '' : item.update_time
          }
        })
      })
    }
  },
  created() {
    this.getNotice()
    // 获取所有分类
    service._allGroup()
      .then((res) => {
        if (res.status === 200) {
          this.formatGoodsType(res.list)
          this.activetype = this.topNavType[0].typeId
          this.getGoodsFromType()
        }
      })
      .catch((e) => {
        throw new Error(e)
      })
    service._getLastGoods()
      .then(res => {
        if (res.status === 200) {
          this.bannerList = res.list.map(item => {
            return {
              ...item,
              main_image: JSON.parse(item.main_image)
            }
          })
        }
      })
      .catch((e) => {
        throw new Error(e)
      })
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // padding-top: 0.1rem;

  .top-container {
    width: 100%;
    // height: 2.52rem;
    // background-color: #ffb6ce;
    background: url(../../assets/bg.png) no-repeat top center;
    background-size: 100%;
    box-sizing: border-box;
    padding: 0 0.15rem 0;

    h1 {
      // width: 0.5rem;
      font-size: 0.2rem;
      text-align: center;
      line-height: 0.4rem;
      color: #fff;
    }

    .search-container {
      width: 100%;
      height: 0.4rem;
      display: flex;
      justify-content: space-between;

      // padding-top: 0.2rem;
      .search {
        // width: 2.8rem;
        flex: 1;
        box-sizing: border-box;
        padding: 0.02rem 0.15rem 0 0;

        ::v-deep .van-search {
          padding: 0;
          background-color: transparent;
        }
      }

      >i {
        display: block;
        text-align: center;
        line-height: 0.4rem;
        font-size: 0.25rem;
        width: 0.25rem;
        color: #fff;
      }
    }



    .top-nav {
      margin: 0.1rem 0;
      border-radius: 0.05rem;

      .notice-swipe {
        height: 0.5rem;
        line-height: 0.5rem;
      }

      .van-swipe-item {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }

  .swiper-container {
    width: 100%;
    height: 1.63rem;
    border-radius: 0.15rem;
    overflow: hidden;

    .my-swipe {
      width: 3.84rem;
      height: 1.63rem;
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;

      // background-color: #8bd3ff;
      .van-swipe-item {
        position: relative;
        overflow: hidden;
        /* 确保容器不会出现滚动条 */
        display: flex;
        justify-content: center;
        align-items: center;
      }


    }
  }

  .swiper-bgimg {
    // content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -2;
    /* 将伪元素置于容器的最底层 */
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    filter: blur(0.1rem);
    /* 调整模糊度，数值越大模糊度越高 */
  }

  .swiper-img {
    height: 98%;
    border-radius: 5%;
    display: block;
    filter: none;
  }

  .swiper-desc {
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 0 0.2rem;
    position: absolute;
    bottom: 0;
    // z-index: -1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    color: white;
    background-color: rgba(128, 128, 128, 0.5);
    backdrop-filter: blur(0.05);
    font-size: 0.15rem;
    height: 0.3rem;
    line-height: 0.3rem;
  }

  .recommend-container {
    width: 100%;
    // height: 1.77rem;
    box-sizing: border-box;
    padding: 0.2rem 0.15rem 0;
  }

  .recommend {
    width: 100%;
    // height: 1.77rem;
    background-color: #fff;
    border-radius: 0.1rem;

    >ul {
      width: 100%;
      display: flex;
      justify-content: space-around;
      padding-top: 0.2rem;

      >li {
        width: 0.81rem;
        height: 1.3rem;
        // background-color: #fc9bbb;
        border-radius: 0.1rem;

        h2 {
          width: 100%;
          font-size: 0.18rem;
          font-weight: 600;
          text-align: center;
        }

        div {
          width: 100%;
          height: 1rem;
          background-size: 100% !important;
          background-repeat: no-repeat !important;
          background-position: center center !important;
        }
      }
    }

    >h2 {
      font-size: 0.15rem;
      margin-top: 0.1rem;
      margin-left: 0.1rem;
      color: #333;
    }
  }

  .typeBox {
    margin-top: 5%;
  }

  .product-container {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    padding: 0.2rem 0.15rem 0.55rem;
    background-color: transparent;
    overflow: hidden;

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

            span {
              font-size: 0.18rem;
              color: #ff5e00;
              vertical-align: bottom;
            }
          }
        }
      }
    }
  }
}


::v-deep .van-tabs__line {
  background-color: #fc9bbb;
}

::v-deep .van-sticky {
  border-radius: 0.1rem;
  overflow: hidden;
}
</style>
