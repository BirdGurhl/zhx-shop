<template>
  <div class="container">
    <!-- <shop-info></shop-info> -->
    <div class="echarts">
      <Histogram width='500' height='300' />
      <line-chart width="600" height="300" />
      <Hist width='500' height='300' />
      <!-- <Map width="600" height="400" /> -->
    </div>
  </div>
</template>

<script>
import shopInfo from "./dashboardTmp/shopInfo.vue";
import Histogram from "@/components/Histogram"
import LineChart from "@/components/LineChart"
import Hist from "@/components/Hist"
import Map from "@/components/Map"
export default {
  components: {
    shopInfo, Histogram, LineChart, Hist, Map
  },
  mounted() {
  },
};
</script>

<style scoped>
.container{
  background: url(../../../assets/bg.jpg);
}
#dashmain {
  background-color: #fff;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 10px;
  margin: 20px 0;
}

.echarts{
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
