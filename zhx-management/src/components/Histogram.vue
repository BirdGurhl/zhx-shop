<template>
  <section class="container-section" :style=" { width : width + 'px',height : height + 'px'}">
    <div class="container" ref="hist"  :style=" { width : width + 'px',height : height + 'px'} ">
    </div>
    <aside>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </aside>
  </section>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    width: String,
    height: String
  },
  data() {
    return {
      chart: null,
      option: null

    }
  },
  computed: {},
  methods: {
    initDate() {
      this.option = {
        color: ["#2f89cf"],
        title: {
          text: "过去一周用户活跃数",
          textStyle: {
            color: "#fff",
            fontWeight: "normal",
            fontFamily: "宋体"
          },
        },
        legend: {
          type: "plain",
          itemStyle: {
            color: "#2F89CF"
          },
          textStyle: {
            color: "#fff",
            fontSize: 15,
            lineHeight: 30
          }
        },
        grid: {
          left: "3%",
          top: "20%",
          right: "3%",
          bottom: "10%",
          containLabel: true
        },
        tooltip: {},

        xAxis: {
          axisLabel: {
            color: "rgba(255,255,255,.6)",
            fontSize: "15"
          },
          axisLine: {
            show: false
          },
          data: ['周一', '周二', '周三', '周四', '周五', '周六']
        },
        yAxis: {
          axisLabel: {
            color: "rgba(255,255,255,.6)",
            fontSize: "15"
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)",
              width: 2
            }
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)",
              width: 1
            }
          }
        },
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "30%",
            itemStyle: {
              borderRadius: 7
            },
            data: [10, 10, 9.5, 8, 9, 10]
          }
        ]
      }
    }
  },
  created() {
    this.initDate();
  },
  mounted() {
    this.chart = echarts.init(this.$refs.hist)
    this.chart.setOption(this.option)
    window.onresize = () => {
      this.chart.resize();
    }
  }

}
</script>

<style scoped>
.container-section {
  position: relative;
  margin: 10px 0;

}
.container {
  position: relative;
  background: url(../assets/line.png) no-repeat center center;
  background-size: 100%;
  overflow: hidden;
  border: 1px solid rgba(25, 186, 139, 0.17);
  /* margin: 10px; */
  box-sizing: border-box;
  /* padding: 10px; */
}

aside i {
  position: absolute;
  width: 8px;
  height: 8px;
  border: 3px solid #02A6B5;
}
aside i:nth-of-type(1) {
  left: 0;
  top: 0;
  border-right-color: transparent;
  border-bottom-color: transparent;
}
aside i:nth-of-type(2) {
  right: 0;
  top: 0;
  border-left-color: transparent;
  border-bottom-color: transparent;
}
aside i:nth-of-type(3) {
  bottom: 0;
  left: 0;
  border-right-color: transparent;
  border-top-color: transparent;
}
aside i:nth-of-type(4) {
  right: 0;
  bottom: 0;
  border-left-color: transparent;
  border-top-color: transparent;
}
</style>