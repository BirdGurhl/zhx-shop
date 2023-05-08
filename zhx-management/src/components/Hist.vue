<template>
  <section class="container-section" :style=" { width : width + 'px',height : height + 'px'}">
    <div class="container" ref="hist" :style=" { width : width + 'px',height : height + 'px'} ">
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
      option: null,
      colorArr: ["#1089e7", "#f57474", "#56d0e3", "#f8b448", "#8b78f6"],

    }
  },
  computed: {},
  methods: {
    initDate() {
      this.option = {
        
        grid: {
          left: '10%',
          right: '20%',
          bottom: '3%',
          top:'3%'
        },
        xAxis: {
          show: false,

        },
        yAxis: [{
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri',],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#fff",
            fontSize: 16
          }
        }, {
          type: 'category',
          data: [722,722,722,722,722],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#fff",
            fontSize: 16
          }
        }],
        series: [
          {
            name: '柱',
            type: 'bar',
            label: {
              show: true
            },
            yAxisIndex:0,
            itemStyle: {
              barBorderRadius: 20,
              color: (params) => this.colorArr[params.dataIndex]
            },
            barCategoryGap: 50,
            barWidth: 13,
            data: [70, 80, 60, 60, 80],
            label: {
              show: true,
              color:"#fff",
              position: "inside",
              formatter: "{c}%"
            }
          },
          {
            name: '框',
            type: 'bar',
            barCategoryGap: 50,
            barWidth: 20,
            yAxisIndex:1,

            itemStyle: {
              color: "none",
              borderColor: "#00c1de",
              borderWidth: 3,
              barBorderRadius: 15
            },
            data: [100, 100, 100, 100, 100]
          },
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