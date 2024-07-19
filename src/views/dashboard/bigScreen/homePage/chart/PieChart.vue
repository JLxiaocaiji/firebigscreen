<template>
  <div ref="pie"> </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watchEffect, watch, nextTick } from "vue";
  import * as echarts from "echarts";

  const pie = ref<HTMLDivElement>();

  const chart = ref();

  const props = defineProps({
    data: { type: Object, default: () => {} },
  });

  const initChart = () => {
    chart.value.setOption({
      legend: {
        orient: "vertical",
        right: "right",
        fontSize: 20,
        textStyle: {
          color: "#fff",
        },
      },
      series: [
        {
          name: "近30天火警处置情况",
          type: "pie",
          radius: "50%",
          ...props.data,
        },
      ],
    });
  };

  onMounted(() => {
    chart.value = echarts.init(pie.value);
  });

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
    width: 350px;
    height: 180px;
  }
</style>
