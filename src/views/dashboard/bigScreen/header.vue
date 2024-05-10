<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="h-left">
    <ButtonItem :itemList="list1" />
  </div>
  <div class="h-right">
    <ButtonItem :itemList="list2" />
  </div>
  <div class="h-avatar">
    <a-avatar>
      <template #icon>
        <UserOutlined />
      </template>
    </a-avatar>
  </div>
</template>

<script lang="ts" setup>
  import { UserOutlined } from "@ant-design/icons-vue";
  import ButtonItem from "./buttonItem.vue";
  import { list1, list2 } from "./index";
</script>

<style lang="" scoped></style>
