<template>
  <a-modal v-model:open="open" v-model:title="modalTitle"> 111 </a-modal>
</template>

<script lang="ts" setup>
  import { computed } from "vue";

  const open = defineModel<boolean>("open");

  const props = defineProps({
    title: { type: String, default: "" },
  });
  const modalTitle = computed(() => {
    return props.title + "消控室视频";
  });
</script>

<style lang="less" scoped>
  //   . {
  //     background: url(/@/assets/images/bigscreen/modal-bg.png) no-repeat;
  //     background-size: 100% 100%;
  //   }
</style>
