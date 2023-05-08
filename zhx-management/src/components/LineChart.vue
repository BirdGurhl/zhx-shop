<template>
  <section class="container-section" :style=" { width : width + 'px',height : height + 'px'}">
    <div class="container" :style=" { width : width + 'px',height : height + 'px'}" ref="lines">

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
  methods: {
    initDate() {
      this.option = {
        // 颜色集
        color: ["#ED3F35", "#00F2F1"],
        // 标题
        title: {
          // 标题名
          text: "收益曲线",
          // 标题样式
          textStyle: {
            color: "#fff",
            fontWeight: "normal",
            fontFamily: "宋体"
          },
        },
        // 图例组件
        legend: {
          // 图例类型
          type: "plain",
          // 图例样式
          itemStyle: {
            color: "#fff"
          },
          // 图例字体样式
          textStyle: {
            color: "#fff",
            fontSize: 15,
            lineHeight: 30
          }
        },
        // 布局：图表相对于容器的位置
        grid: {
          left: "3%",
          top: "20%",
          right: "3%",
          bottom: "10%",
          containLabel: true
        },
        // 提示框组件
        tooltip: {
          trigger: "axis"
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            color: "rgba(255,255,255,.6)",
            fontSize: "15"
          },
          axisLine: {
            show: false
          },
          data: ['one', 'two', 'three', 'four', 'five', 'six']
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
            name: "本周",
            type: "line",
            smooth: true,
            itemStyle: {

            },
            data: [20, 10, 9.5, 19.5, 9, 10]
          },
          {
            name: "上周",
            type: "line",
            smooth: true,
            data: [10, 20, 19.5, 9.5, 10, 9]
          },
        ]
      }
    }
  },
  created() {
    this.initDate();
  },
  mounted() {
    this.chart = echarts.init(this.$refs.lines)
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
  border: 3px solid #02a6b5;
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