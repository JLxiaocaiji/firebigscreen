<template>
  <div class="modal">
    <a-modal v-model:open="open" width="600px" destroyOnClose v-model:title="modalTitle" wrapClassName="ant-modal-content">
      <Video :cameraId="cameraId" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from "vue";
  import Video from "@/components/Video/index.vue";

  const open = defineModel<boolean>("open");

  const props = defineProps({
    title: { type: String, default: "" },
    cameraId: { type: String, default: "" },
  });
  const modalTitle = computed(() => {
    return props.title + "消控室视频";
  });
</script>

<style lang="less" scoped>
  :deep(.ant-modal-content) {
    background: url(/@/assets/images/bigscreen/modal-bg.png) no-repeat;
    background-size: 100% 100%;
  }
  .modal {
    background: url(/@/assets/images/bigscreen/modal-bg.png) no-repeat;
    background-size: 100% 100%;
  }
</style>
