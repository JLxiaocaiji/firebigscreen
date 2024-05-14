<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <a-layout>
      <a-layout-header class="h">
        <Header />
      </a-layout-header>
      <a-layout-content class="c">
        <ContentHeader class="c-home-content" />
        <ConditionChoose @change="select" />

        <div class="c-left">
          <a-card :tab-list="tabList" :active-tab-key="key" @tab-change="(key) => onTabChange(key)">
            <template #title><img src="@/assets/images/card-title.png" /><span class="title">单位消防安全评分</span></template>
            <template #extra> <a href="#">更多</a></template>
            <div v-if="key === 'tab1'">
              <!-- <dv-scroll-board :config="config" /> -->
            </div>
            <div v-else><dv-scroll-board :config="config" /></div>
          </a-card>

          <a-card>
            <template #title><img src="@/assets/images/card-title.png" /><span class="title">单位设备统计</span></template>
            <template #extra> <a href="#">更多</a></template>
            <div class="device-stat">
              <WaterPolo v-for="item in stat" :key="item.title" :value="item.value" :title="item.title" :color1="item.color1" :color2="item.color2" />
            </div>
          </a-card>

          <a-card>
            <template #title><img src="@/assets/images/card-title.png" /><span class="title">近30天火警处置情况</span></template>
            <template #extra> <a href="#">更多</a></template>
            <PieChart :data="fireSum" />
          </a-card>
        </div>

        <div class="c-right">
            <a-card>
            <template #title><img src="@/assets/images/card-title.png" /><span class="title">视频监控</span></template>
            <template #extra> <a href="#">更多</a></template>
            
          </a-card>

            <a-card>
            <template #title><img src="@/assets/images/card-title.png" /><span class="title">单位设备监测情况趋势</span></template>
            <template #extra> <a href="#">更多</a></template>
            
          </a-card>
            <a-card>
            <template #title><img src="@/assets/images/card-title.png" /><span class="title">重要设备监测情况</span></template>
            <template #extra> <a href="#">更多</a></template>
            
          </a-card>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import Header from "./header.vue";
  import ContentHeader from "./ContentHeader.vue";

  import ConditionChoose from "./ConditionChoose.vue";

  import { reactive, ref } from "vue";

  import WaterPolo from "./WaterPolo.vue";
  import PieChart from "./PieChart.vue";

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

  // 单位消防
  const config = reactive({
    // header: ["", "", "", ""],
    data: [
      ["1", "路面危害-松散", "5"],
      ["2", "路面危害-路面油污清理", "13"],
      ["3", "交安设施-交通标志牌结构", "6"],
      ["4", "路基危害-防尘网", "2"],
      ["5", "交安设施-交通标志牌结构", "1"],
      ["6", "路面危害-松散", "3"],
      ["7", "路基危害-防尘网", "4"],
      ["8", "路面危害-路面油污清理", "2"],
      ["9", "交安设施-交通标志牌结构", "5"],
      ["10", "路基危害-防尘网", "3"],
    ],
    index: true,
    columnWidth: [50],
    align: ["center"],
    rowNum: 7,
    // // headerBGC: "#1981f6",
    // // headerHeight: 45,
    // oddRowBGC: "rgba(0, 44, 81, 0.8)",
    // evenRowBGC: "rgba(10, 29, 50, 0.8)",
  });

  // 单位设备统计
  const stat = reactive<Record<string, any>[]>([
    { value: 0.98, title: "设备在线率", color1: "#f2d71f", color2: "#ef7a10" },
    { value: 0.78, title: "设备正常率", color1: "#7BCDE4", color2: "#0d95f0" },
    { value: 0.92, title: "任务完成率", color1: "#29e1a0", color2: "#13b2d7" },
    { value: 0.95, title: "事件处置率", color1: "#9953f6", color2: "#dc13f0" },
  ]);

  // 火警情况
  const fireSum = reactive({
    real: 1,
    fake: 985,
  });
</script>

<style lang="less" scoped>
  .h {
    background: url("@/assets/images/bsTitle.png") no-repeat;
    background-size: 80%;
    background-position: 50%;
    height: 84px;
    line-height: 84px;
    position: relative;
    z-index: 999;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    color: #fff;
    font-size: 22px;
    padding: 0 20px;
  }

  .c {
    height: calc(100% - 84px);

    &-home-content {
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      width: 100%;
      height: 50%;
    }
  }

  .ant-card {
    width: 400px;
    height: 400px;
    padding: 4px;
    overflow: hidden;
    background: url("@/assets/images/cardBg.png") 0 0 / 100% 100% no-repeat;
    cursor: pointer;
    border-radius: 4px;
    z-index: 9;

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
      & > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap {
        width: 100%;
        .ant-tabs-nav-list {
          width: 100%;
          justify-content: space-around;
          color: #fff;
        }
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

    .device-stat {
      display: grid;
      grid-template-columns: 200px 200px;
      grid-template-rows: 160px 160px;
    }
  }
</style>
