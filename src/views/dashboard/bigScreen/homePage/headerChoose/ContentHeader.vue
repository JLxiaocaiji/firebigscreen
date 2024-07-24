<template>
  <div>
    <ContentHeaderCard
      :class="[index == checked ? 'active' : '']"
      v-for="(item, index) in list"
      :key="item.describe"
      @choose="
        (i) => {
          $emit('change-com', i);
          checked = i;
        }
      "
      :profile="item"
      :index="index"
    />
  </div>
</template>

<script lang="ts" setup>
  import ContentHeaderCard from "./ContentHeaderCard.vue";
  import { ref } from "vue";

  const props = defineProps(["list"]);

  defineEmits(["change-com"]);

  const checked = ref<number>(0);
</script>

<style lang="less" scoped>
  .active {
    background: linear-gradient(90deg, #00c6ff, #0092ff);
  }
</style>
