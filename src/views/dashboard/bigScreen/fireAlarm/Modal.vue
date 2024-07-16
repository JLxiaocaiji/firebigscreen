<template>
  <div class="vModal" ref="vModal">
    <a-modal :getContainer="() => $refs.vModal" :footer="null" v-model:open="open" width="620px" :mask="false" destroyOnClose>
      <template #title>
        <span style="line-height: 24px; font-size: 18px; color: #fff; margin: 15px">{{ modalTitle }}</span></template
      >
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
  .vModal {
    :deep(.ant-modal-wrap) {
      .ant-modal {
        .ant-modal-content {
          background: url("/@/assets/images/bigscreen/modal-bg.png");
          background-size: 100% 100%;

          #video-container-wrap {
            padding-left: 10px;
          }

          .ant-modal-header {
            background: url("/@/assets/images/bigscreen/modal-bg.png") no-repeat;
            background-size: 1% 10%;
          }

          .ant-modal-close {
            color: #fff;
          }
        }
      }
    }
  }
</style>
