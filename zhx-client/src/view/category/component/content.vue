<template>
  <div class="content-container">
    <ul>
      <li v-for="goods in goodsList" :key="goods.goods_id" @click="toDetail(goods.goods_id)">
        <div class="img-container">
          <img :src="goodsImg(goods.main_image)" alt="">
        </div>
        <p>{{ goods.name }}</p>
      </li>
      <div class="empty" v-if="goodsList.length === 0">
        <van-empty image="error" description="管理员还未上架商品哦~" />
      </div>
    </ul>

  </div>
</template>

<script>
export default {
  props: {
    goodsList: Array
  },
  data() {
    return {

    }
  },
  computed: {
    goodsImg() {
      return function (images) {
        return JSON.parse(images)[0].url
      }
    }
  },
  methods: {
    toDetail(goodsId) {
      this.$router.push({ path: "/detail", query: { id: goodsId } })
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  width: 100%;
  height: 100%;
  overflow: hidden;

  >ul {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    li {
      width: 0.8rem;
      height: 1.3rem;
      // background-color: #bfa;
      border-radius: 0.1rem;
      margin-top: 0.15rem;
      margin-left: 0.2rem;
      overflow: hidden;

      .img-container {
        width: 100%;
        height: 0.9rem;
        overflow: hidden;
        display: flex;
        align-items: center;

        img {
          display: block;
          width: 100%;
          border-radius: 0.1rem;
        }
      }

      p {
        width: 100%;
        height: 0.32rem;
        font-size: 0.13rem;
        text-align: center;
        margin-top: 0.06rem;
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
    }
  }
}
</style>