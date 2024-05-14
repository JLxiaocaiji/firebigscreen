<template>
  <div ref="line"> </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import * as echarts from "echarts";

  const line = ref<HTMLDivElement>();

  const props = defineProps({
    data: { type: Object, default: () => {} },
  });

  const initChart = () => {
    let chart = echarts.init(line.value);

    chart.setOption({
      // 图例组件
      // legend: {},
      // 提示框
      tooltip: {},
      // 工具栏
      toolbox: {},
      // x 轴
      xAxis: {
        type: "category",
        axisLabel: {
          inside: false,
          rotate: 45,
          textStyle: {
            color: "#77a0c8",
          },
        },
        data: ["2024-05-08", "2024-05-09", "2024-05-10", "2024-05-11", "2024-05-12", "2024-05-13", "2024-05-14"],
      },
      yAxis: {
        min: 0,
        max: 70000,
      },
      series: [
        {
          name: "设备总数",
          type: "line",
          data: [61176, 61176, 61176, 61176, 61176, 61176, 61176],
        },
        {
          name: "被监听设备总数",
          type: "line",
          data: [18561, 18561, 18561, 18561, 18561, 18561, 18561],
        },
        {
          name: "在线设备数",
          type: "line",
          data: [61273, 61273, 61273, 61273, 61273, 61273, 61273],
        },
        {
          name: "异常设备数",
          type: "line",
          data: [8472, 8472, 8472, 8472, 8472, 8472, 8472],
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
    width: 400px;
    height: 300px;
  }
</style>
