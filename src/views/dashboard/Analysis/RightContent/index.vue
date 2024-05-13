<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <a-card class="video-card">
    <div style="width: 100%; height: 300px"><Camera /></div>
    <a-form ref="formRef" name="form" :model="form" colon:false :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
      <a-form-item name="monitor" label="监控列表" :rules="[{ required: true }]">
        <a-select
          v-model:value="form.monitor"
          :options="[
            { label: '双创产业园消控室', value: '1' },
            { label: '双创产业园消控室1', value: '2' },
            { label: '双创产业园消控室2', value: '3' },
          ]"
        />
      </a-form-item>
    </a-form>
  </a-card>

  <a-card title="值班信息" class="card">
    <template #extra><a href="#">人工报警</a></template>
    <div></div>
  </a-card>

  <a-card title="巡查巡检" class="card">
    <template #extra><a-button type="link">查看更多</a-button></template>
    <a-row>
      <a-col v-for="item in pollingResult" :span="6" :key="item.des" class="polling-style">
        <div class="num" :style="{ color: item.color }">{{ item.num }}</div>
        <div class="des">{{ item.des }}</div>
      </a-col>
    </a-row>
  </a-card>

  <a-card class="card" :active-tab-key="key" :tab-list="tabList" @tab-change="(key) => onTabChange(key)">
    <div v-if="key === 'tab1'">
      <div v-for="item in deviceMSgList" :key="item.deviceName" class="tab1">
        <div>
          <span class="name">{{ item.deviceName }}</span>
          <span>{{ item.address }}</span>
        </div>
        <div>
          <span :class="[item.type == '1' ? 'green' : item.type == '2' ? 'yellow' : item.type == '3' ? 'red' : null]">
            {{ item.type == "1" ? "正常" : item.type == "2" ? "异常" : item.type == "3" ? "告警" : "" }}
          </span>
          <span class="time"><svg t="1714352576278" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2288" width="12" height="12"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" p-id="2289"/><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" p-id="2290"/></svg>{{ item.time }}</span>
        </div>
      </div>
    </div>
    <div v-else-if="key === 'tab2'"> </div>
    <div else></div>
    <template #tabBarExtraContent><a-button type="link">查看更多</a-button></template>
  </a-card>
</template>

<script lang="ts" setup>
  import { reactive, watch, ref } from "vue";
  import { pollingResult } from "./index";
  import { deviceMSgList } from "./index";
  import Camera from "../Camera/index";

  /*
    视频信息
  */
  const formRef = ref();
  const form = reactive<Record<string, string | number>>({
    monitor: "1",
  });

  watch(
    () => form.monitor,
    (val) => {
      console.log(val);
    }
  );

  /*
    监测信息
  */
  const key = ref("tab1");

  const tabList = [
    {
      key: "tab1",
      tab: "设备监测",
    },
    {
      key: "tab2",
      tab: "火警监测",
    },
  ];

  const onTabChange = (value: string) => {
    console.log(value);
    key.value = value;
  };
</script>

<style lang="less" scoped>
  .common {
    background: #fff;
    border-radius: 8px;
    box-shadow: 1px 1px 5px #ccc;
    padding: 1px;
    margin-top: 15px;
  }

  .common-mark {
    color: #fff;
    padding: 0 10px;
  }

  .video-card:extend(.common) {
    margin-top: 0px;
  }

  .ant-card:extend(.common) {
    :deep(.ant-card-head-title) {
      font-weight: 500;
      font-size: 14px;
    }

    .polling-style {
      text-align: center;
      &:not(:last-child) {
        border-right: 1px solid #e8eaec;
      }
      .num {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 5px;
      }
    }

    .tab1 {
      font-size: 16px;
      margin-bottom: 15px;

      .name {
        padding-right: 10px;
        border-right: 1px solid rgb(185, 204, 221);
      }

      .yellow:extend(.common-mark) {
        background: #fae600;
      }
      .green:extend(.common-mark) {
        background: #14850a;
      }
      .red:extend(.common-mark) {
        background: #ca4339;
      }

      .time {
        font-size: 16px;
        margin-left: 15px;
      }
    }
  }
</style>
