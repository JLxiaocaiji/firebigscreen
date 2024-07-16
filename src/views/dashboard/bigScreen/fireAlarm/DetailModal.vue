<template>
  <div class="dModal" ref="dModal">
    <a-modal :getContainer="() => $refs.dModal" :footer="null" v-model:open="open" width="600px" wrapClassName="modal" destroyOnClose>
      <template #title> <span style="line-height: 24px; font-size: 18px; color: #fff; margin: 15px">火警事件详情</span></template>
      <a-descriptions>
        <a-descriptions-item v-for="item in Object.keys(arr)" :key="item" :label="item">
          <template v-if="item == '状态'">
            {{ res[arr[item]] == "0" ? "未处理" : "已处理" }}
          </template>
          <template v-else-if="item == '确认状态'">
            {{ res[arr[item]] == "0" ? "未确认" : "已确认" }}
          </template>
          <template v-else>
            {{ res[arr[item]] }}
          </template>
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, onMounted, watch, ref } from "vue";
  import { keys, values, obj } from "./data";
  import { detail } from "./api";

  const open = defineModel<boolean>("open");
  console.log(2222);
  console.log(open);
  const arr = obj(keys, values);
  const res = ref({});

  const props = defineProps(["id"]);

  watch(
    () => props.id,
    () => {
      props.id && getDetail();
    }
  );

  const getDetail = async () => {
    res.value = await detail({ id: props.id });
  };
</script>

<style lang="less" scoped>
  .dModal {
    :deep(.ant-modal-wrap) {
      .ant-modal {
        .ant-modal-content {
          background: url("/@/assets/images/bigscreen/modal-bg.png");
          background-size: 100% 100%;

          .ant-descriptions-item-container {
            margin-left: 25px;
            span {
              color: #fff;
            }
          }

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
