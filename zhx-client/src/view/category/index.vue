<template>
  <div class="container">
    <section>
      <div class="top-search-container">
        <input @click="toSearch" class="search-input" type="text" placeholder="请输入关键字搜索~">
      </div>
      <div class="infomation">
        <i class="iconfont icon-62"></i>
      </div>
    </section>
    <div class="main-container">
      <aside>
        <cate-aside @checkType="checkCateType" />
      </aside>
      <main>
        <cate-content :goodsList="goodsList" />
      </main>
    </div>
  </div>
</template>

<script>
import CateAside from "./component/aside.vue"
import CateContent from "./component/content.vue"
import service from "@/api/goods"
export default {
  name: "category",
  components: {
    CateAside, CateContent
  },
  data() {
    return {
      value: '',
      goodsList: [],
      typeId: "",
    }
  },
  methods: {
    checkCateType(typeId) {
      this.typeId = typeId
      this.getGoodsFromId()
    },
    getGoodsFromId() {
      service._getGoodsFromType(this.typeId).then(res => {
        if (res.status === 200) {
          this.goodsList = res.data
        }
      })
    },
    toSearch() {
      this.$router.push({ path: '/search' })
    },
  },
  created(){
    // console.log(this.$route.params);
  }

}
</script>

<style lang='scss' scoped>
.container {
  // background-color: #bfa;
  width: 100%;
  height: 100%;
  section {
    width: 100%;
    height: 8%;
    box-sizing: border-box;
    padding: 0.2rem 0.15rem 0;
    display: flex;
    justify-content: space-between;
    .top-search-container {
      width: 90%;
      .van-search {
        padding: 0;
        border-radius: 0.05rem;
        border: 0.01rem solid rgb(233, 232, 232);
        overflow: hidden;
        .van-search__content {
          background-color: #fff;
        }
      }
    }
    .infomation {
      width: 10%;
      > i {
        width: 100%;
        display: block;
        text-align: center;
        line-height: 0.31rem;
        font-size: 0.25rem;
        font-weight: 600;
        color: rgb(165, 165, 165);
      }
    }
  }
}

.main-container {
  width: 100%;
  height: 92%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.15rem;
  background-color: #fff;
  border: 0.01rem solid #eee;
  border-left: none;
  border-right: none;

  > aside {
    width: 20%;
    // border-right: 0.01rem solid #eee;
    // background-color: red;
    // height: 3rem;
  }
  > main {
    width: 78%;
    background-color: #fff;
    // height: 3rem;
    border-left: 0.01rem solid #eee;
  }
}
</style>