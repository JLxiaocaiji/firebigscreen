<template>
  <div ref="line"> </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch, nextTick } from "vue";
  import * as echarts from "echarts";

  const line = ref<HTMLDivElement | null>(null);

  const props = defineProps({
    data: { type: Object, default: () => {} },
  });

  const chart = ref();

  onMounted(() => {
    chart.value = echarts.init(line.value);
  });

  const initChart = () => {
    chart.value.setOption({
      // 图例组件
      legend: { ...(props.data?.legend || {}) },
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

  watch(
    () => props.data,
    () => {
      props.data &&
        nextTick(() => {
          initChart();
        });
    },
    { deep: true }
  );
</script>

<style lang="less" scoped>
  div {
    width: 380px;
    height: 200px;
  }
</style>
