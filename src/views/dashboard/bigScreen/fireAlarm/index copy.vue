<template>
  <a-row style="height: 100%; background: url(../../../../assets/images/bigscreen/bg.png) 0% 0% / 100% 100% no-repeat">
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
      <a-form ref="formRef" class="form" layout="inline" :model="formState" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-row>
          <a-col :span="11">
            <a-form-item label="发生时间" name="startAndEndTime">
              <a-range-picker v-model:value="formState.startAndEndTime" format="YYYY/MM/DD HH:mm:ss" />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="单位名称" name="unitId">
              <a-select v-model:value="formState.unitId" :options="[]" />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="火警状态" name="">
              <a-select v-model:value="formState.fireAlarmType" :options="fireStateOptions" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item>
              <a-space>
                <a-button type="primary">
                  <SearchOutlined />
                </a-button>
                <a-button type="primary">导出</a-button>
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

      <div class="table">
        <!-- <BasicTable
          ref="tableRef"
          :canResize="true"
          :bordered="true"
          :loading="loading"
          :columns="columns"
          :showIndexColumn="false"
          :dataSource="dataSource"
          :pagination="pagination"
        >
          <template #tableTitle></template>
          <template #img="{ text }">
            <a-image :width="60" :src="text" />
          </template>
          <template #action="{ record }">
            <TableAction :actions="getTableAction(record)" />
          </template>
        </BasicTable> -->

        <BasicTable @register="registerTable" :rowSelection="rowSelection">
          <template #tableTop><span></span></template>
          <template #toolbar><span></span></template>
          <template #img="{ text }">
            <a-image :width="60" :src="text" />
          </template>
          <template #action="{ record }">
            <TableAction :actions="getTableAction(record)" />
          </template>
        </BasicTable>

        
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed, watch, h } from "vue";
  import type { UnwrapRef } from "vue";
  import type { FormActionType } from "@/components/Form";
  import { SearchOutlined } from "@ant-design/icons-vue";
  import { isArray } from "@/utils/is";
  import { BasicTable, TableAction, ActionItem } from "/@/components/Table";
  import { columns } from "./data";
  import { useListPage } from "/@/hooks/system/useListPage";
  import { list } from "./api";

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

  // form
  const formRef = ref<Nullable<FormActionType>>(null);
  const formState: UnwrapRef<Record<string, string | number>> = reactive({
    startAndEndTime: "",
    unitId: "",
    fireAlarmType: "",
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
  // 列表页面公共参数、方法
  const { tableContext } = useListPage({
    tableProps: {
      api: list,
      rowKey: "id",
      columns: columns,
      useSearchForm: false,
      canResize: true,
      actionColumn: {
        width: 100,
        title: "详情",
        dataIndex: "action",
        fixed: "right",
        slots: { customRender: "action" },
      },
    },
  });
  //注册table数据
  const [registerTable, { reload }, { rowSelection }] = tableContext;

  const loading = ref<boolean>(false);
  const dataSource = reactive<Record<string, any>[]>([]);
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    pageSizeOptions: ["10", "20", "30", "100", "200"],
    total: 0,
  });
  const checkedKeys = ref<Array<string | number>>([]);
  const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    console.log("checkedKeys------>", checkedKeys);
    checkedKeys.value = selectedRowKeys;
  };
  // 选择列配置
//   const rowSelection = {
//     type: "checkbox",
//     columnWidth: 30,
//     selectedRowKeys: checkedKeys,
//     onChange: onSelectChange,
//   };

  // 操作栏
  const getTableAction = (record): ActionItem[] => {
    return [
      {
        label: "详情",
        onClick: handleDetail.bind(null, record),
      },
    ];
  };
  // 详情
  async function handleDetail(record: Recordable) {
    console.log(record);
  }
</script>

<style lang="less" scoped>
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
        margin-right: 10px;
        vertical-align: top;
        .ant-form-item {
          margin-bottom: 22px;
          :deep(&-label) {
            label {
              color: #b3e4fe;
            }
          }
        }
      }
    }

    .table {
        width: 100%;
    }
  }
</style>
