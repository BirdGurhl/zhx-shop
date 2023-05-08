<template>
  <div id="app">
    <transition name="van-slide-left">
      <router-view />
    </transition>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
