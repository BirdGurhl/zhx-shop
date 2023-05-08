<template>
  <div class='sell-contrainer'>
    <header>
      <topbar  title="发布闲置"></topbar>
    </header>
    <goodFrom></goodFrom>
  </div>
</template>

<script>
import goodFrom from './components/goodFrom.vue';
import topbar from '../../components/topbar.vue';
export default {
  name: 'sell',
  data() {
    return {
    }
  },
  computed: {
  },
  components: {
    goodFrom,
    topbar
  },
  created() {
  },
  mounted() {
  },
  methods: {

  }
}
</script>
<style lang='scss' scoped>
.sell-contrainer {
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

  .nav__title {
    font-size: 0.2rem;
    color: white;
  }
}

</style>
