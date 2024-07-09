<template>
  <a-row style="height: 100%">
    <a-col :span="4" class="left-tab">
      <a-menu
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="state.collapsed"
        :items="items"
      />
    </a-col>
    <a-col :span="18" class="right-tab" />
  </a-row>
</template>

<script lang="ts" setup>
  import { reactive } from "vue";

  const state = reactive({
    collapsed: false,
    selectedKeys: ["1"],
    openKeys: ["sub1"],
    preOpenKeys: ["sub1"],
  });

  const items = reactive([
    {
      key: "1",
      label: "Option 1",
      title: "Option 1",
    },
  ]);
</script>

<style lang="less" scoped>
  .left-tab {
    background-image: url(/@/assets/images/bigscreen/left-tab.png);
  }
  .right-tab {
    background-image: url(/@/assets/images/bigscreen/right-tab.png);
  }
</style>
