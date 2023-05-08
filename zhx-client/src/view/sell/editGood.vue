<template>
  <div class='container'>
    <header>
      <div class="back" @click="onClickLeft">&lt;</div>
      <div class="nav__title">编辑商品</div>
    </header>
    <goodFrom></goodFrom>
  </div>
</template>

<script>
import goodFrom from './components/goodFrom.vue';
import { Dialog } from 'vant';
export default {
  name: 'editGood',
  data() {
    return {}
  },
  computed: {},
  components: { goodFrom },
  created() { },
  mounted() { },
  methods: {
    // 返回
    onClickLeft() {
      Dialog.confirm({
        title: '',
        message: '是否放弃更改？',
        confirmButtonText: "确定"
      })
        .then(() => {
          // on confirm
          this.$router.back()
        })
        .catch(() => {
          // on cancel
        });
    },

  }
}
</script>
<style lang='scss' scoped>
.contrainer {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

header {
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

  .back {
    font-size: 0.3rem;
    position: absolute;
    left: 0;
    color: ghostwhite;
    width: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
  }

  .nav__title {
    font-size: 0.2rem;
    color: white;
  }
}
</style>
