<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <a-layout>
      <a-layout-content class="c">
        <ContentHeader class="c-home-content" @change-com="(i) => (cardIndex = i)" />
        <ConditionChoose @change="select" v-if="cardIndex == 0" />
        <div class="device-map" v-if="cardIndex == 1">
          <span @click="isActive = true" :class="{ 'device-map-active': isActive }">隐患地图</span>
          <span @click="isActive = false" :class="{ 'device-map-active': !isActive }">隐患热力图</span>
        </div>

        <div class="chart">
          <div class="chart-left">
            <a-card
              :class="[isHideLeft ? 'active-left-column' : 'deActive-left-column']"
              :tab-list="tabList"
              :active-tab-key="key"
              @tab-change="(key) => onTabChange(key)"
            >
              <template #title><img src="@/assets/images/card-title.png" /><span class="title">单位消防安全评分</span></template>
              <template #extra> <a href="#">更多</a></template>
              <div v-if="key === 'tab1'">
                <dv-scroll-board :config="config" style="width: 360px; height: 170px; margin: 10px -1px 0px 5px" />
              </div>
              <div v-else><dv-scroll-board :config="config" style="width: 360px; height: 170px; margin: 10px -1px 0px 5px" /></div>
            </a-card>

            <a-card :class="[isHideLeft ? 'active-left-column' : 'deActive-left-column']">
              <template #title><img src="@/assets/images/card-title.png" /><span class="title">单位设备统计</span></template>
              <template #extra> <a href="#">更多</a></template>
              <div class="device-stat">
                <WaterPolo
                  v-for="item in stat"
                  :key="item.title"
                  :value="item.value"
                  :title="item.title"
                  :color1="item.color1"
                  :color2="item.color2"
                />
              </div>
            </a-card>

            <a-card :class="[isHideLeft ? 'active-left-column' : 'deActive-left-column']">
              <template #title><img src="@/assets/images/card-title.png" /><span class="title">近30天火警处置情况</span></template>
              <template #extra> <a href="#">更多</a></template>
              <PieChart :data="fireSum" />
            </a-card>
          </div>

          <div class="chart-right">
            <a-card :class="[isHideRight ? 'active-right-column' : 'deActive-right-column']">
              <template #title><img src="@/assets/images/card-title.png" /><span class="title">视频监控</span></template>
              <template #extra> <a href="#">更多</a></template>
            </a-card>

            <a-card :class="[isHideRight ? 'active-right-column' : 'deActive-right-column']">
              <template #title><img src="@/assets/images/card-title.png" /><span class="title">单位设备监测情况趋势</span></template>
              <template #extra> <a-select :options="options" v-model:value="address" placeholder="请选择单位" /></template>
              <LineChart :data="lineData1" />
            </a-card>
            <a-card :class="[isHideRight ? 'active-right-column' : 'deActive-right-column']">
              <template #title><img src="@/assets/images/card-title.png" /><span class="title">重要设备监测情况</span></template>
              <template #extra> <a href="#">更多</a></template>
              <RadarChart />
            </a-card>
          </div>
        </div>
        <div class="chart-bottom">
          <a-card :class="[isHideBottom ? 'active-bottom-column' : 'deActive-bottom-column']">
            <template #title><img src="@/assets/images/card-title.png" /><span class="title">火警趋势</span></template>
            <template #extra> <a-select :options="options" v-model:value="address" placeholder="请选择单位" /></template>
            <LineChart :data="lineData2" />
          </a-card>
          <a-card :class="[isHideBottom ? 'active-bottom-column' : 'deActive-bottom-column']">
            <template #title><img src="@/assets/images/card-title.png" /><span class="title">火警来源分析</span></template>
            <template #extra> <a-select :options="options" v-model:value="address" placeholder="请选择单位" /></template>
            <PieChart :data="fireSource" />
          </a-card>
          <a-card :class="[isHideBottom ? 'active-bottom-column' : 'deActive-bottom-column']">
            <template #title><img src="@/assets/images/card-title.png" /><span class="title">设备异常趋势</span></template>
            <template #extra> <a-select :options="options" v-model:value="address" placeholder="请选择单位" /></template>
            <LineChart :data="lineData3" />
          </a-card>
        </div>

        <div class="icon">
          <div
            class="arrow-left"
            @click="
              () => {
                isHideLeft = !isHideLeft;
              }
            "
            :class="[isHideLeft ? 'active-left-button' : 'deActive-left-button']"
          >
            <img src="@/assets/images/bigscreen/button-1.png" />
          </div>
          <div
            class="arrow-right"
            @click="
              () => {
                isHideRight = !isHideRight;
              }
            "
            :class="[isHideRight ? 'active-right-button' : 'deActive-right-button']"
          >
            <img src="@/assets/images/bigscreen/button-1.png" />
          </div>
          <div
            class="arrow-bottom"
            @click="
              () => {
                isHideBottom = !isHideBottom;
              }
            "
            :class="[isHideBottom ? 'active-bottom-button' : 'deActive-bottom-button']"
          >
            <img src="@/assets/images/bigscreen/button-1.png" />
          </div>
        </div>
      </a-layout-content>
    </a-layout>
    <Map />
  </div>
</template>

<script lang="ts" setup>
  import ContentHeader from "./headerChoose/ContentHeader.vue";
  import ConditionChoose from "./headerChoose/ConditionChoose.vue";
  import { onBeforeMount, reactive, ref } from "vue";
  import { selectUnitList, fireAlarmSituation, fireAlarmTrends } from "./api";
  // 图表
  import WaterPolo from "./chart/WaterPolo.vue";
  import PieChart from "./chart/PieChart.vue";
  import LineChart from "./chart/LineChart.vue";
  import RadarChart from "./chart/RadarChart.vue";
  // 地图
  import Map from "./Map.vue";

  onBeforeMount(async () => {
    console.log(2222);
    // 接入单位列表
    // let res = await selectUnitList();
    // console.log(res);

    // 近30天火警处置情况
    let temp = await fireAlarmSituation();
    fireSum.data[0].value = temp.truePolice;
    fireSum.data[1].value = temp.falsePolice;

    // 火警趋势
    let temp1 = await fireAlarmTrends();
    lineData2.series[0].data = temp1.map((item) => {
      return item.truePolice;
    });
    lineData2.series[1].data = temp1.map((item) => {
      return item.falsePolice;
    });
    lineData2.xAxis.data = temp1.map((item) => {
      return item.date;
    });

    console.log(temp);
    console.log(temp1);
    console.log(lineData2);
  });

  const select = (i) => {
    console.log(i);
  };

  const tabList = [
    {
      key: "tab1",
      tab: "企业单位",
    },
    {
      key: "tab2",
      tab: "维保单位",
    },
  ];
  const key = ref("tab1");
  const onTabChange = (value: string) => {
    console.log(value);
    key.value = value;
  };

  // 跟随顶部 card 切换组件
  const cardIndex = ref(0);

  const isActive = ref<boolean>(true);

  /**
   * 图表相关
   */

  // 单位消防
  const config = reactive({
    data: [
      ["1", "单位1", "80"],
      ["2", "单位2", "80"],
      ["3", "单位3", "80"],
      ["4", "单位4", "80"],
      ["5", "单位5", "80"],
      ["6", "单位6", "80"],
      ["7", "单位7", "81"],
      ["8", "单位8", "81"],
      ["9", "单位9", "81"],
      ["10", "单位10", "81"],
      ["11", "单位11", "81"],
    ],
    // index: true,
    columnWidth: [50, 200],
    align: ["center"],
    rowNum: 7,
    waitTime: 1000,
    oddRowBGC: "#84b2d8",
    evenRowBGC: "#919EA8",
  });

  // 单位设备统计
  const stat = reactive<Record<string, any>[]>([
    { value: 0.98, title: "设备在线率", color1: "#f2d71f", color2: "#ef7a10" },
    { value: 0.78, title: "设备正常率", color1: "#7BCDE4", color2: "#0d95f0" },
    { value: 0.92, title: "任务完成率", color1: "#29e1a0", color2: "#13b2d7" },
    { value: 0.95, title: "事件处置率", color1: "#9953f6", color2: "#dc13f0" },
  ]);

  // 近30天火警处置情况
  const fireSum = reactive({
    data: [
      { value: 1, name: "真警", itemStyle: { color: "#1ddd96" } },
      { value: 2, name: "虚警", itemStyle: { color: "#ffc452" } },
    ],
  });

  // 单位设备监测情况趋势
  const address = ref<number>();
  const options = [
    { label: "地点1", value: 1 },
    { label: "地点2", value: 2 },
    { label: "地点3", value: 3 },
    { label: "地点4", value: 4 },
  ];
  const lineData1 = reactive({
    legend: {
      //   textStyle: {
      //     color: "#fff",
      //   },
      show: false,
    },
    xAxis: {
      data: ["2024-05-08", "2024-05-09", "2024-05-10", "2024-05-11", "2024-05-12", "2024-05-13", "2024-05-14"],
    },
    yAxis: {
      min: "dataMin",
      max: "dataMax",
    },
    series: [
      {
        name: "设备总数",
        type: "line",
        smooth: true,
        data: [61176, 61176, 61176, 61176, 61176, 61176, 61176],
        itemStyle: { color: "#33747d" },
      },
      {
        name: "被监听设备总数",
        type: "line",
        smooth: true,
        data: [18561, 18561, 18561, 18561, 18561, 18561, 18561],
        itemStyle: { color: "#1562b4" },
      },
      {
        name: "在线设备数",
        type: "line",
        smooth: true,
        data: [61273, 61273, 61273, 61273, 61273, 61273, 61273],
        itemStyle: { color: "#4fc96e" },
      },
      {
        name: "异常设备数",
        type: "line",
        smooth: true,
        data: [8472, 8472, 8472, 8472, 8472, 8472, 8472],
        itemStyle: { color: "#E4E70C" },
      },
    ],
  });

  // 重要设备监测情况

  // 火警趋势
  const lineData2 = reactive({
    legend: {
      data: ["真警", "虚警"],
      right: "10%",
      textStyle: {
        color: "#fff",
      },
    },

    xAxis: {
      data: ["05-15", "05-14", "05-13", "05-12", "05-11", "05-10", "05-09"],
    },
    yAxis: { min: 0, max: 35 },

    series: [
      {
        name: "真警",
        smooth: true,
        type: "line",
        lineStyle: {
          width: 4,
          color: "#228efe",
        },
        data: [0, 0, 0, 0, 0, 0, 0],
        itemStyle: { color: "#228efe" },
      },
      {
        name: "虚警",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 4,
          color: "#e85c27",
        },
        data: [1, 0, 0, 10, 4, 33, 0],
        itemStyle: { color: "#e85c27" },
      },
    ],
  });

  // 火警来源分析
  const fireSource = reactive({
    data: [
      { value: 1, name: "消防设备预警", itemStyle: { color: "#fd6585" } },
      { value: 0, name: "监控智能预警", itemStyle: { color: "#51b7ff" } },
    ],
  });

  // 设备异常趋势
  const lineData3 = reactive({
    legend: {
      data: ["设备异常", "视频异常", "预警逾期"],
      right: "10%",
      textStyle: {
        color: "#fff",
      },
    },

    xAxis: {
      data: ["05-15", "05-14", "05-13", "05-12", "05-11", "05-10", "05-09"],
    },
    yAxis: { min: 0, max: 350 },

    series: [
      {
        name: "设备异常",
        smooth: true,
        type: "line",
        lineStyle: {
          width: 4,
          color: "#c23531",
        },
        data: [2, 0, 0, 24, 9, 50, 0],
        itemStyle: { color: "#c23531" },
      },
      {
        name: "视频异常",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 4,
          color: "#228af7",
        },
        data: [69, 291, 299, 294, 249, 266, 91],
        itemStyle: { color: "#228af7" },
      },
      {
        name: "预警逾期",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 4,
          color: "#61a0a8",
        },
        data: [0, 0, 0, 10, 6, 4, 0],
        itemStyle: { color: "#61a0a8" },
      },
    ],
  });

  const isHideLeft = ref<boolean>(false);
  const isHideRight = ref<boolean>(false);
  const isHideBottom = ref<boolean>(false);
</script>

<style lang="less" scoped>
  .c {
    height: calc(100% - 84px);
    z-index: 1;

    &-home-content {
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      width: 100%;
      height: 50%;
    }

    .device-map {
      display: flex;
      justify-content: center;
      margin-top: 1.25rem;
      align-items: center;
      color: #fff;
      span {
        // width: 130px;
        height: 48px;
        text-align: center;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        line-height: 48px;
        display: block;
        width: 245px;
        margin-left: -57px;
        &:first-child {
          background: url("@/assets/images/hmap_bg.png") no-repeat 0 0;
        }
        &:last-child {
          background: url("@/assets/images/hmap_bg1.png") no-repeat 0 0;
        }
      }
      &-active {
        width: 300px !important;
        height: 60px !important;
        line-height: 60px !important;
        background: url("@/assets/images/hmap_active_bg.png") no-repeat 0 0 !important;
      }
    }
  }

  .chart {
    display: flex;
    justify-content: space-between;
    margin-top: -45px;

    &-bottom {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 0px;
      left: 0px;
      right: 0px;
      margin: auto;
    }
  }

  .ant-card {
    width: 380px;
    height: 250px;
    padding: 4px;
    overflow: hidden;
    background: url("@/assets/images/cardBg.png") 0 0 / 100% 100% no-repeat;
    // cursor: pointer;
    border-radius: 4px;

    .title {
      background: linear-gradient(0deg, rgba(122, 200, 255, 0.7), hsla(0, 0%, 100%, 0.7));
      color: #abdcff;
      // 延申到 text
      -webkit-background-clip: text;
      // 渐变
      -webkit-text-fill-color: transparent;
      font-weight: 700;
    }

    :deep(&-head) {
      border-bottom: unset;
      height: 50px;
      & > .ant-tabs > .ant-tabs-nav {
        margin-bottom: -10px;
        height: 35px;
        .ant-tabs-nav-wrap {
          width: 100%;
          .ant-tabs-nav-list {
            width: 100%;
            justify-content: space-around;
            color: #fff;
          }
        }
      }

      &-wrapper {
        height: 25px;
      }
    }

    :deep(&-body) {
      padding: unset;
    }

    a {
      color: #4cadf1;
      float: right;
      margin-right: 29px;
      margin-top: 5px;
      font-size: 14px;
    }

    :deep(.ant-select-selector) {
      background: transparent;
      border: 1px solid transparent;
    }

    .device-stat {
      display: grid;
      grid-template-columns: 190px 190px;
      grid-template-rows: 90px 90px;
    }
  }

  .pic {
    width: 29px;
    position: absolute;
  }
  .icon {
    img {
      display: block;
      margin: 10px auto;
      scale: 0.7;
    }
    .arrow-left {
      background: url(@/assets/images/bigscreen/button.png) no-repeat;
      background-size: 100% 100%;
      left: 378px;
      top: 500px;
      &:extend(.pic);
    }
    .arrow-right {
      background: url(@/assets/images/bigscreen/button.png) no-repeat;
      background-size: 100% 100%;
      right: 378px;
      top: 500px;
      transform: rotate(180deg);
      z-index: 1;
      &:extend(.pic);
    }
    .arrow-bottom {
      background: url(@/assets/images/bigscreen/button.png) no-repeat;
      background-size: 100% 100%;
      left: 50%;
      //   bottom: 230px;
      transform: rotate(-90deg);
      &:extend(.pic);
    }
  }

  // 左侧箭头
  .active-left-button {
    left: 0px !important;
    transition: left 0.6s linear;
    img {
      transform: rotate(180deg);
      transition: transform 0.6s linear;
    }
  }
  .deActive-left-button {
    left: 380px;
    transition: left 0.6s linear;
    img {
      transform: rotate(180deg) 0.6s;
      transition: transform 0.6s linear;
    }
  }
  .active-left-column {
    width: 0px;
    transition: width 0.6s linear;
  }
  .deActive-left-column {
    width: 380px;
    transition: width 0.6s linear;
  }

  // 右侧箭头
  .active-right-button {
    right: 0px !important;
    transition: right 0.6s linear;
    img {
      transform: rotate(180deg);
      transition: transform 0.6s linear;
    }
  }
  .deActive-right-button {
    right: 380px;
    transition: right 0.6s linear;
    img {
      transform: rotate(180deg) 0.6s;
      transition: transform 0.6s linear;
    }
  }
  .active-right-column {
    width: 0px;
    transition: width 0.6s linear;
  }
  .deActive-right-column {
    width: 380px;
    transition: width 0.6s linear;
  }

  // 下方箭头
  .active-bottom-button {
    bottom: 0;
    transition: bottom 0.6s linear;
    img {
      transform: rotate(180deg);
      transition: transform 0.6s linear;
    }
  }
  .deActive-bottom-button {
    bottom: 220px;
    transition: bottom 0.6s linear;
    img {
      transform: rotate(180deg) 0.6s;
      transition: transform 0.6s linear;
    }
  }
  .active-bottom-column {
    height: 0px;
    transition: height 0.6s linear;
  }
  .deActive-bottom-column {
    height: 230px;
    transition: height 0.6s linear;
  }
</style>
