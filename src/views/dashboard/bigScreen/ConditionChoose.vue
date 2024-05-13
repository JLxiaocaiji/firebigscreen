<template>
  <a-form layout="inline" ref="formRef" :model="form" class="h-form" :wrapperCol="{ style: { width: '150px' } }">
    <a-form-item name="region">
      <a-select v-model:value="form.region" :options="options1" @change="search" />
    </a-form-item>
    <a-form-item name="superior">
      <a-select v-model:value="form.superior" :options="options2" @change="search" />
    </a-form-item>
    <a-form-item name="unitType">
      <a-select v-model:value="form.unitType" :options="options3" @change="search" />
    </a-form-item>
    <a-form-item name="unit">
      <a-select v-model:value="form.unit" :options="options4" @change="search" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive, ref } from "vue";
  import type { SelectProps } from "ant-design-vue";

  import { FormState } from "./index.d";

  const formRef = ref();

  const form = reactive<FormState>({
    region: 0,
    superior: 0,
    unitType: 1,
    unit: 2,
  });

  const options1 = ref<SelectProps["options"]>([
    { label: "全部", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ]);
  const options2 = ref<SelectProps["options"]>([
    { label: "全部", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ]);
  const options3 = ref<SelectProps["options"]>([
    { label: "全部", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ]);
  const options4 = ref<SelectProps["options"]>([
    { label: "全部", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ]);

  const search = (i) => {
    console.log(i);
    console.log(form);
  };
</script>

<style lang="less" scoped>
  .h-form {
    justify-content: center;
    margin-top: 1.25rem;
  }

  :deep(.ant-select > .ant-select-selector) {
    background: transparent;
    width: 145px;
    height: 34px;
    color: #4fb9f3;
  }
</style>
