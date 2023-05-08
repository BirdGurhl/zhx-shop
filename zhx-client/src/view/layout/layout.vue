<template>
  <div class="container">
    <section class="main-container">
      <keep-alive>
      <Main />
      </keep-alive>
    </section>
    <aside class="tagbar">
      <tag-bar />
    </aside>
  </div>
</template>

<script>
import Main from "./components/main.vue"
import tagBar from "./components/tagBar.vue"
export default {
  components: {
    Main, tagBar
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
}
.main-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 0.55rem;
  background-color: #f6f6f6;
  overflow-x: hidden ;
  overflow-y:auto ;
}
.tagbar {
  width: 100%;
  height: 0.55rem;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  box-shadow:
  0px 0px 1px rgba(0, 0, 0, 0.006),
  0px 0px 2.8px rgba(0, 0, 0, 0.009),
  0px 0px 6px rgba(0, 0, 0, 0.011),
  0px 0px 12.1px rgba(0, 0, 0, 0.014),
  0px 0px 26px rgba(0, 0, 0, 0.02)
;

  // background-color: #fc9bbb;
}
</style>