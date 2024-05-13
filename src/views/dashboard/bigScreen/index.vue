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

        <a-card :tab-list="tabList" :active-tab-key="key" @tab-change="(key) => onTabChange(key)">
          <template #title><img src="@/assets/images/card-title.png" /><span class="title">单位消防安全评分</span></template>
          <template #extra> <a href="#">更多</a></template>
          <div v-if="key === 'tab1'">
            <!-- <dv-scroll-board :config="config" /> -->
            11
          </div>
          <div v-else>2</div>
        </a-card>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import Header from "./header.vue";
  import ContentHeader from "./ContentHeader.vue";

  import ConditionChoose from "./ConditionChoose.vue";

  import { reactive, ref } from "vue";

  import { BorderBox1 as DvBorderBox1 } from "@kjgl77/datav-vue3";

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

  const config = reactive({
    header: ["时间", "病害信息", "数量", "标段"],
    data: [
      ["2019-07-01 19:25:00", "路面危害-松散", "5", "xxxxxxx"],
      ["2019-07-02 17:25:00", "路面危害-路面油污清理", "13", "xxxxxxx"],
      ["2019-07-03 16:25:00", "交安设施-交通标志牌结构", "6", "xxxxxxx"],
      ["2019-07-04 15:25:00", "路基危害-防尘网", "2", "xxxxxxx"],
      ["2019-07-05 14:25:00", "交安设施-交通标志牌结构", "1", "xxxxxxx"],
      ["2019-07-06 13:25:00", "路面危害-松散", "3", "xxxxxxx"],
      ["2019-07-07 12:25:00", "路基危害-防尘网", "4", "xxxxxxx"],
      ["2019-07-08 11:25:00", "路面危害-路面油污清理", "2", "xxxxxxx"],
      ["2019-07-09 10:25:00", "交安设施-交通标志牌结构", "5", "xxxxxxx"],
      ["2019-07-10 09:25:00", "路基危害-防尘网", "3", "xxxxxxx"],
    ],
    index: true,
    columnWidth: [50, 170, 300],
    align: ["center"],
    rowNum: 7,
    headerBGC: "#1981f6",
    headerHeight: 45,
    oddRowBGC: "rgba(0, 44, 81, 0.8)",
    evenRowBGC: "rgba(10, 29, 50, 0.8)",
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
    width: 322px;
    height: 248px;
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

    .ant-tabs {
    }

    a {
      color: #4cadf1;
      float: right;
      margin-right: 29px;
      margin-top: 5px;
      font-size: 14px;
    }
  }
</style>
