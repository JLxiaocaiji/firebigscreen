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
    <a-col :span="18" class="right-tab">
      <a-form ref="formRef" class="form" :model="formState" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-row>
          <a-col :xs="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 6 }">
            <a-form-item label="发生时间" name="startAndEndTime">
              <a-range-picker v-model:value="formState.startAndEndTime" format="YYYY/MM/DD HH:mm:ss" />
            </a-form-item>
          </a-col>
          <a-col :xs="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 6 }">
            <a-form-item label="单位名称" name="unitId">
              <a-select v-model:value="formState.unitId" :options="unitOptions" placeholder="请选择" allowClear />
            </a-form-item>
          </a-col>
          <a-col :xs="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 6 }">
            <a-form-item label="火警状态" name="status">
              <a-select v-model:value="formState.status" :options="fireStateOptions" placeholder="请选择" allowClear />
            </a-form-item>
          </a-col>
          <a-col :xs="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 6 }">
            <a-form-item>
              <a-space>
                <a-button type="primary" @click="search" style="margin-left: 50px">
                  <SearchOutlined />
                </a-button>
                <a-button type="primary">导出</a-button>
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

      <div class="table">
        <a-table :columns="columns" :data-source="dataSource" :pagination="pagination">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'status'">
              <span :style="{ color: record.status == '0' ? 'red' : record.status == '1' ? 'green' : '' }">{{
                record.status == "0" ? "待处理" : record.status == "1" ? "已处理" : ""
              }}</span>
            </template>

            <template v-else-if="column.dataIndex == 'action'">
              <a style="color: #fff"> 详情 </a>
            </template>
          </template>

          <template #ellipsisText="{ text }">
            <JEllipsis :value="text" :length="8" />
          </template>

          <template #img="{ text, column, record, index }">
            <img
              style="width: 30px; height: 30px"
              src="../../../../assets/images/bigscreen/camera.png"
              @click="
                () => {
                  open = true;
                  console.log(text);
                  console.log(column);
                  console.log(record);
                  console.log(index);

                  title = record.unitName;
                  open = true;
                }
              "
            />
          </template>
        </a-table>

        <!-- <a-pagination v-model:current="pagination.pageNo" show-quick-jumper :total="pagination.total" @change="search" /> -->
      </div>
    </a-col>
  </a-row>

  <Modal v-model:open="open" v-model:title="title" />
</template>

<script lang="ts" setup>
  import { reactive, ref, computed, watch, h, onBeforeMount } from "vue";
  import type { UnwrapRef } from "vue";
  import type { FormActionType } from "@/components/Form";
  import { SearchOutlined } from "@ant-design/icons-vue";
  import { isArray } from "@/utils/is";
  import { BasicTable, TableAction, ActionItem } from "/@/components/Table";
  import JEllipsis from "/@/components/Form/src/jeecg/components/JEllipsis.vue";
  import { columns } from "./data";
  import { list, unitList } from "./api";
  import Modal from "./Modal.vue";

  const state = reactive({
    collapsed: false,
    selectedKeys: ["1"],
    openKeys: ["sub1"],
    preOpenKeys: ["sub1"],
  });

  const items = reactive([
    {
      key: "1",
      label: "火警事件列表",
      title: "火警事件列表",
    },
  ]);

  /**
   * form
   *
   */
  const formRef = ref<Nullable<FormActionType>>(null);
  const formState: UnwrapRef<Record<string, string | number | undefined | string[]>> = reactive({
    startAndEndTime: [],
    unitId: undefined,
    status: undefined,
  });

  const unitOptions = ref<Record<string, any>>([]);

  onBeforeMount(async () => {
    unitOptions.value = (await unitList()).map((item) => {
      return { label: item.unitName, value: item.id.toString() };
    });

    search();
  });

  // 开始、结束时间
  const startTime = computed(() => {
    if (isArray(formState.startAndEndTime) && formState.startAndEndTime?.length == 2) {
      return formState.startAndEndTime[0];
    } else {
      return "";
    }
  });

  const endTime = computed(() => {
    if (isArray(formState.startAndEndTime) && formState.startAndEndTime?.length == 2) {
      return formState.startAndEndTime[0];
    } else {
      return "";
    }
  });

  const provinceData = ["Zhejiang", "Jiangsu"];
  const cityData = {
    Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
    Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"],
  };

  const fireStateOptions = [
    { label: "已处理", value: 1 },
    { label: "未处理", value: 0 },
  ];

  /**
   * table
   */
  const loading = ref<boolean>(false);
  const dataSource = ref<Record<string, any>[]>([]);
  const pagination = reactive({
    pageNo: 1,
    pageSize: 10,
    pageSizeOptions: ["10", "20", "30", "100", "200"],
    total: 0,
  });
  const checkedKeys = ref<Array<string | number>>([]);
  const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    console.log("checkedKeys------>", checkedKeys);
    checkedKeys.value = selectedRowKeys;
  };

  const search = async () => {
    let obj = {
      startTime: startTime.value,
      endTime: endTime.value,
      unitId: formState.unitId,
      status: formState.status,
      pageNo: pagination.pageNo,
      pageSize: pagination.pageSize,
    };
    dataSource.value = (await list(obj))?.records;
    pagination.total = dataSource.value.length;
  };

  // 选择列配置
  //   const rowSelection = {
  //     type: "checkbox",
  //     columnWidth: 30,
  //     selectedRowKeys: checkedKeys,
  //     onChange: onSelectChange,
  //   };

  // 视频列
  const open = ref<boolean>(false);
  const title = ref<string>("");

  // 操作栏
</script>

<style lang="less" scoped>
  .ant-row {
    background: url(/@/assets/images/bigscreen/bg.png) 0% 0% / 100% 100% no-repeat;
  }

  .form-item-style {
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #fff;
    background: rgb(10, 50, 112);
  }

  .left-tab {
    background: url(/@/assets/images/bigscreen/left-tab.png) no-repeat;
    background-size: 100% 100%;
    width: 14.71vw;
    height: 87vh;
    margin-left: 46px;

    .ant-menu {
      background: transparent;
      color: #fff;
      border-right: none;
      margin-top: 8vh;

      &-item {
        padding-left: 20px;
        color: #fff;
        background: url(/@/assets/images/bigscreen/menu-active.png) no-repeat;
        background-size: cover;

        text-align: center;
        font-size: 18px;
        width: 90%;
        margin-left: 15px;
        margin-bottom: 15px;
      }
    }
  }
  .right-tab {
    background: url(/@/assets/images/bigscreen/right-tab.png) no-repeat;
    background-size: 100% 100%;
    height: 84.21vh;
    width: 80.72vw;
    margin-top: 2vh;
    padding-top: 32px;
    .form {
      overflow: hidden;
      margin: 0 2%;
      margin-top: 20px;
      .ant-col {
        // margin-right: 10px;
        vertical-align: top;
        .ant-form-item {
          margin-bottom: 22px;
          :deep(&-label) {
            label {
              color: #b3e4fe;
            }
          }
          :deep(.ant-picker):extend(.form-item-style) {
            .ant-picker-input {
              input {
                color: #fff;
                &::placeholder {
                  color: #fff;
                }
              }
            }
            .ant-picker-separator {
              color: #fff;
            }
            .ant-picker-suffix {
              color: #fff;
            }
          }
          :deep(.ant-select-selector):extend(.form-item-style) {
            .ant-select-selection-item,
            .ant-select-selection-placeholder {
              color: #fff;
            }
          }
          :deep(.ant-select-arrow) {
            color: #fff !important;
          }
        }
      }
    }

    .table {
      width: 100%;
      :deep(.ant-table) {
        background: transparent;
        .ant-table-container {
          .ant-table-thead {
            th {
              background: #135ba4;
              color: #4fb9f3;
              border-bottom: unset;
              &:before {
                background-color: unset !important;
              }
            }
          }
          .ant-table-tbody {
            color: #fff;
            td {
              border-top: unset;
              border-bottom: unset;
            }
            .ant-table-cell-row-hover {
              color: unset;
              background-color: unset;
              //   background: transparent;
              transition: unset;
              background: unset;
            }
          }
        }
      }
    }
  }

  :deep(.ant-table-tbody) > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
    background: unset;
    transition: unset;
  }

  :deep(.ant-table-pagination-right) {
    justify-content: center;
  }
</style>
