<template>
  <div>
    <ul>
      <li v-for="item in itemList" :key="item.label" class="item" @click="routerJump(item.url)">{{ item.label }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { HeaderItem } from "./index.d";
  // 在用运行时 props 声明时给一个 prop 标注更复杂的类型定义
  import type { PropType } from "vue";
  import { router } from "/@/router";

  defineProps({
    itemList: { type: Array as PropType<HeaderItem[]>, default: () => [] },
  });

  const routerJump = (path: string) => {
    console.log(path);
    router.push({
      path: path,
      // query: { },
    });
  };
</script>

<style lang="less" scoped>
  @item-width: 200px;
  @item-height: 100px;
  .container {
    width: @item-width;
    height: @item-height;
    text-align: center;
    align-items: center;
    line-height: 200px;

    .dv-border {
      width: @item-width / 50 * 15;
      height: @item-height / 20 * 15;
    }
  }

  .item {
    background: url("@/assets/images/menuBg.png") no-repeat;
    width: 123px;
    height: 55px;
    display: inline-block;
    text-align: center;
    line-height: 55px;
    font-size: 14px;
    cursor: pointer;
  }
</style>
