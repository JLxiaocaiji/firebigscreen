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
      legend: { ...props.data?.legend },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      // 工具栏
      toolbox: {},
      // x 轴
      xAxis: {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          inside: false,
          rotate: 45,
          textStyle: {
            color: "#77a0c8",
          },
        },
        ...props.data.xAxis,
      },
      yAxis: {
        ...props.data.yAxis,
      },
      series: [...props.data.series],
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
