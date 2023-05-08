<template>
  <div class='container'>
    <header>
      <topbar title="我的发布" :cb="onClickLeft"></topbar>
    </header>
    <div class="goods-List" v-if="dataList.length < 1">
      <van-empty class="custom-image" :image="require('@/assets/custom-empty-image.png')" description="空空如也" />
    </div>
    <div class="goods-List">
      <ul>
        <li v-for="goods in dataList" :key="goods.collId">
          <div>
            <div class="top">
              <div class="user">
                <user :userId="$store.state.userInfo.userId"></user>
              </div>
            </div>
            <section @click="toDetail(goods.goodsId)">
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
            <div class="buttom">
              <div class="time">
                <span>创建时间：{{ goods.createTime }}</span>
                <span>最后更新：{{ goods.updateTime }}</span>
              </div>

              <div class="button">
                <van-button size="small" color="#ffb6ce" :to="'/editGood?goodId=' + goods.goodsId">编辑</van-button>
                <van-button size="small" color="#ff0000b8" @click="deleteBtn(goods.goodsId)">删除</van-button>
              </div>
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
import topbar from "../../components/topbar.vue";
import { Dialog } from 'vant';
export default {
  name: 'mysell',
  data() {
    return {
      dataList: [],
    }
  },
  computed: {},
  components: { user, topbar },
  created() {
    this.getMysell()
  },
  mounted() { },
  methods: {
    deleteBtn(goodId) {
      Dialog.confirm({
        title: '',
        message: '是否删除该商品？',
        confirmButtonText: "确定"
      })
        .then(() => {
          this.deleteGood(goodId)
        })
        .catch(() => {
          // on cancel
        });
    },
    deleteGood(goodId) {
      service._deleteGoods(goodId)
        .then(res => {
          console.log(res);
          if (res.status !== 200) {
            return this.$toast('删除失败！')
          }
          this.$toast('删除成功')
          setTimeout(() => {
            this.getMysell()
          }, 500);
        }).catch(err => {
          console.log(err);
          return this.$toast('删除失败！')
        })
    },
    onClickLeft() {
      this.$router.back()
    },
    toDetail(goodsId) {
      this.$router.push({
        name: 'detail',
        query: {
          id: goodsId
        }
      })
    },
    getMysell() {
      service._goodsFromUserId(this.$store.state.userInfo.userId).then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data);
          this.dataList = res.data.map(item => {
            return {
              collId: item.coll_id,
              detail: item.detail,
              img: JSON.parse(item.main_image),
              name: item.name,
              price: item.price,
              onSale: item.on_sale,
              goodsId: item.goods_id,
              createTime: this.getData(item.create_time),
              updateTime: this.getData(item.update_time)
            }
          })
        }
      })
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
              line-height: 0.1rem;
              font-size: 0.13rem;
              color: grey;
            }
          }
          .van-button {
              margin-right: 0.1rem;
            }
        }
      }
    }
  }
}</style>
