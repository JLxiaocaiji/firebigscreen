<template>
  <div class="water">
    <div ref="waterPolo" class="chart"> </div>
    <span>{{ title }}</span>
  </div>
</template>

<script lang="ts" setup>
  import * as echarts from "echarts";
  import "echarts-liquidfill";
  import { ref, onMounted } from "vue";

  const props = defineProps({
    value: { type: Number, default: () => {} },
    title: { type: String, default: () => "" },
    color1: { type: String, default: () => "" },
    color2: { type: String, default: () => "" },
  });

  const waterPolo = ref<HTMLDivElement>();
  const initChart = () => {
    let chart = echarts.init(waterPolo.value);

    chart.setOption({
      series: [
        {
          // 水球图
          type: "liquidFill", // 水球图
          name: "Liquid Fill1", // 水球图名称
          radius: "100%", // 水球图半径
          itemStyle: {
            // 水球图样式
            opacity: 1, // 水球图透明度
            shadowBlur: 0, // 波浪的阴影范围
          },
          data: [
            {
              // 水球图数据
              name: "score", // 水球图数据名称
              direction: "right", // 水球图数据方向
              value: props.value, // 水球图数据值
              itemStyle: {
                // 水球图数据样式
                opacity: 1, // 水球图数据透明度
                normal: {
                  // 水球图数据正常样式
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: props.color1,
                    },
                    {
                      offset: 1,
                      color: props.color2,
                    },
                  ]), // 水球图数据正常样式颜色
                },
              },
            },
          ],
          backgroundStyle: {
            // 设置水球图内部背景色
            // color: "#ffe5e0", //水球图内部背景色
          },
          label: {
            // 设置百分比展示
            color: "#f70", // 百分比颜色
            normal: {
              // 百分比正常样式
              textStyle: {
                // 百分比正常样式字体
                fontSize: 20, // 百分比正常样式字体大小
                color: "#333",
              },
              formatter: function (param) {
                // 百分比正常样式字体格式
                return param.value * 100 + "%"; // 百分比正常样式字体格式
              },
            },
          },
          //外部细圆
          outline: {
            // 是否显示外圈
            show: false,
            borderDistance: 6, // 外部圆线距离水球的距离
            itemStyle: {
              // 外部圆线样式
              borderWidth: 3, // 外部圆线宽度
              borderColor: "#e25d3e", // 外部圆线颜色
              //shadowBlur: 20, // 外部圆线阴影范围
              //shadowColor: 'rgba(0, 0, 0, 0.25)' // 外部圆线阴影颜色
            },
          },
        },
      ],
    });
  };

  onMounted(() => {
    initChart();
  });
</script>

<style lang="less" scoped>
  .water {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    .chart {
      width: 100px;
      height: 100px;
    }
    span {
      width: 50px;
      text-align: center;
      color: #fff;
      margin: 0;
      padding: 0;
    }
  }
</style>
