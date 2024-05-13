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

        <div>
          <a-card :tab-list="tabList" :active-tab-key="key" @tab-change="(key) => onTabChange(key, 'key')">
            <template #title><img src="@/assets/images/card-title.png" />单位消防安全评分</template>
            <template #extra> <a href="#">更多</a></template>
            <div v-if="key === 'tab1'">1</div>
            <div v-else>2</div>
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
  const onTabChange = (value: string, type: string) => {
    console.log(value, type);
    if (type === "key") {
      key.value = value;
    }
  };
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
</style>
