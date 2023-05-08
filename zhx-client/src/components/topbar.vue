<template>
  <div class="top">
    <i class="iconfont icon-zuojiantou1" @click="cb" v-if="backVisible"></i>
    <h1 v-if="Boolean(title)">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'topbar',
  data() {
    return {}
  },
  props: ['title', 'cb'],
  computed: {
    backVisible(){
      return Boolean(this.cb)}
  },
  components: {},
  created() { },
  mounted() { },
  methods: {
    onClick() {
      this.$emit('cb')
    }
  }
}
</script>
<style lang='scss' scoped>
.top {
  width: 100%;
  position: relative;
  height: 0.5rem;
  background-color: #ffb6ce;
  color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;

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
</style>
