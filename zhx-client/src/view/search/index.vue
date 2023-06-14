<template>
  <div class="container">
    <div class="top-search">
      <i class="iconfont icon-zuojiantou1" @click="back"></i>
      <input v-model="searchValue" ref="searchInput" @keyup.enter="findGoods" class="search-input" type="text"
        placeholder="输入商品名称或发布者民名称进行搜索~">
      <span @click="findGoods">搜索</span>
    </div>

    <div class="goods-List">
      <ul>
        <li v-for="goods in dataList" :key="goods.collId" @click="toDetail(goods.goodsId)">
          <div>
            <div class="user">
              <user :userId="goods.userId"></user>
            </div>
            <section>
              <div class="image">
                <img :src="goods.img[0].url">
              </div>
              <div class="contents">
                <p>{{ goods.name }}</p>
                <span>{{ goods.detail }}</span>
              </div>
              <div class="price">
                <span>￥{{ goods.price }}</span>

              </div>
            </section>
            <div class="time">
              <span></span>
            </div>
            <div class="btn">
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import service from "@/api/goods"
import user from "../../components/user.vue"
export default {
  components: {
    user
  },

  data() {
    return {
      dataList: [],
      searchValue: ''
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    toDetail(id) {
      this.$router.push({ path: '/detail', query: { id } })
    },
    findGoods() {
      if (this.searchValue !== '') {
        service._findGoods({ goodsName: this.searchValue }).then(res => {
          console.log(res);
          if (res.status === 200) {
            this.dataList = res.data.map(item => {
              return {
                collId: item.coll_id,
                detail: item.detail,
                img: JSON.parse(item.main_image),
                name: item.name,
                price: item.price,
                onSale: item.on_sale,
                goodsId: item.goods_id,
                userId: item.user_id
              }
            })
          }
        })
      }
    },
    saveSearchInput() {
      // 保存搜索关键词
      localStorage.setItem('searchValue', this.searchValue)
    },
    loadSearchInput() {
      // 加载搜索关键词
      this.searchValue = localStorage.getItem('searchValue')
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 执行一些其他的操作
      vm.loadSearchInput()
      if (vm.searchValue) {
        vm.findGoods()
        localStorage.removeItem('searchValue')
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'detail' && this.dataList) {
      this.saveSearchInput()

    }
    next()
  },
  mounted() {

    // setTimeout(() => {
    //   this.$nextTick(() => {
    //     this.$refs.searchInput.focus();
    //   })
    // }, 0)

  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  .top-search {
    width: 100%;
    height: 10%;
    box-sizing: border-box;
    padding: 0.15rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    i {
      width: 0.25rem;
      font-size: 0.22rem;
      line-height: 0.32rem;
    }

    input {
      width: 80%;
    }

    span {
      font-size: 0.16rem;
      color: #7f7f7f;
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
          margin-top: 0.1rem;

          // background: light;
          .user {
            width: 70%;
            height: 0.3rem;
            padding: 0.05rem 0;
            font-size: 0.15rem;
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

          .time {
            width: 100%;
            margin: 0 0.05rem;

            span {
              line-height: 0.33rem;
              font-size: 0.13rem;
            }
          }

        }
      }
    }
  }
}
</style>