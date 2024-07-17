<template>
  <div ref="radar"> </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import * as echarts from "echarts";

  const radar = ref<HTMLDivElement>();

  const initChart = () => {
    let chart = echarts.init(radar.value);

    chart.setOption({
      // 图例组件
      // legend: {},
      // 提示框
      tooltip: {},
      // 工具栏
      toolbox: {},
      //   雷达图坐标系
      radar: {
        // 雷达图指示器
        indicator: [
          { name: "火灾报警", max: 60000 },
          { name: "电气火灾监控", max: 100 },
          { name: "独立式火灾探测器", max: 300 },
          { name: "消防供水", max: 1000 },
        ],
        // center: ["50%", "50%"],
        // axisName: {
        //   padding: [9, -2, -3, -4],
        // },
      },
      series: [
        {
          name: "重要设备监测情况",
          type: "radar",
          lineStyle: {
            color: "#0698e7",
          },
          itemStyle: {
            color: "#0698e7",
          },
          data: [
            {
              value: [56135, 51, 221, 822],
              name: "重要设备监测情况",
            },
          ],
        },
      ],
    });
  };

  onMounted(() => {
    initChart();
  });
</script>

<style lang="less" scoped>
  div {
    width: 390px;
    height: 120px;
  }
</style>
