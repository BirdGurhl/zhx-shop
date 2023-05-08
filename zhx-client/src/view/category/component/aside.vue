<template>
  <div class="aside-container">
    <van-sidebar v-model="activeKey">
      <van-sidebar-item v-for="(item, index) in cateList " :key="item.id" :ref="item.id" :title="item.title"
        @click="checkType(item.id)" />
    </van-sidebar>
  </div>
</template>

<script>
import service from "@/api/goods"
export default {
  data() {
    return {
      activeKey: 0,
      cateList: [],
    }
  },
  methods: {
    checkType(typeId) {
      this.$emit('checkType', typeId)
    },
    getType() {
      return new Promise((resolve, reject) => {
        service._allGroup().then(res => {
          console.log(res);
          this.cateList = res.list.map(item => {
            return {
              id: item.cate_id,
              title: item.type_name
            }
          })
          resolve({ request: "OK" })
        })
      })

    }
  },
  created() {
    this.getType().then(req => {
      if (req.request === "OK") {
        let typeId = this.$route.params.typeId ? this.$route.params.typeId : this.cateList[0].id
        this.checkType(typeId)
        this.activeKey = this.$route.params.index ? this.$route.params.index : 0
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.aside-container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;

  .van-sidebar-item {
    background-color: #fff;
  }
}

.aside-container::-webkit-scrollbar {
  display: none;
}

.van-sidebar-item--select::before {
  background-color: #fca7c3;
}

.van-sidebar-item--select {
  color: #fca7c3;
  transition: all 0.3s;
}</style>