<template>
  <div class=''></div>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh"></van-pull-refresh>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      data:[],
      isLoading: false,
    }
  },
  computed: {},
  components: {},
  created() { },
  mounted() { },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.getData().then((res) => {
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
    getData(){
      return new Promise((resolve, reject) => {
        this.data = [] //清空data列表 否则会导致数据显示不出来的bug
        this.dataLoading = true
        // resolve({ status: 'OK' })
        // reject({ status: 'Err', e })
      })
    }
  }
}
</script>
<style lang='less' scoped></style>
