<template>
  <transition >
      <router-view></router-view>
  </transition>
</template>

<script>
export default { 
}
</script>

<style lang="scss" scoped>
.fade-enter {
  opacity: 0;
  transform: translateX(100%);
}
.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.fade-enter-active {
  transition: 0.5s;
}
</style>