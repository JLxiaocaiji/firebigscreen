<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="h-left">
    <ButtonItem :itemList="list1" />
  </div>
  <div class="h-right">
    <ButtonItem :itemList="list2" />
  </div>
  <div class="h-avatar">
    <UserDropDown />
  </div>
</template>

<script lang="ts" setup name="Header">
  import ButtonItem from "./buttonItem.vue";
  import { list1, list2 } from "./index";
  import { UserDropDown } from "@/layouts/default/header/components";
</script>

<style lang="less" scoped>
  .h-left {
    margin-left: 45px;
  }

  .h-right {
    margin-right: 70px;
  }

  .h-avatar {
    position: absolute;
    right: 0px;
    top: 20px;
  }
</style>
