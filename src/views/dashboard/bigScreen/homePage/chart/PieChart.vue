<template>
  <div ref="pie"> </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import * as echarts from "echarts";

  const pie = ref<HTMLDivElement>();

  const props = defineProps({
    data: { type: Object, default: () => {} },
  });

  const initChart = () => {
    let chart = echarts.init(pie.value);

    chart.setOption({
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
    initChart();
  });
</script>

<style lang="less" scoped>
  div {
    width: 350px;
    height: 350px;
  }
</style>
