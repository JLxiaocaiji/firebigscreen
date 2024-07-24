<template>
  <a-form layout="inline" ref="formRef" :model="form" class="h-form" :wrapperCol="{ style: { width: '150px' } }">
    <a-form-item name="administrationRegion">
      <a-select v-model:value="form.administrationRegion" :options="options1" />
    </a-form-item>
    <a-form-item name="upUnitId">
      <a-select v-model:value="form.upUnitId" :options="options2" placeholder="请选择上级单位" />
    </a-form-item>
    <a-form-item name="unitId">
      <a-select v-model:value="form.unitId" :options="options3" placeholder="请选择单位" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="search">搜索</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { onBeforeMount, reactive, ref } from "vue";
  import type { SelectProps } from "ant-design-vue";
  import { indexSelectTypeFront } from "../api";
  import { FormState } from "../index.d";
  import REGION_DATA from "china-area-data";
  import { isString } from "@/utils/is";

  const formRef = ref();

  const form = reactive<FormState>({
    administrationRegion: "",
    upUnitId: "",
    unitId: "",
  });

  const options1 = ref<SelectProps["options"]>([]);
  const options2 = ref<SelectProps["options"]>([]);
  const options3 = ref<SelectProps["options"]>([]);

  onBeforeMount(async () => {
    let temp = (await indexSelectTypeFront()).data;

    options1.value = temp.administrationRegionList.reduce((acc, cur) => {
      if (isString(cur.administrationRegion) && cur.administrationRegion != "") {
        let temp1 = cur.administrationRegion.split(",")[1];
        let temp2 = cur.administrationRegion.split(",")[2];
        console.log(temp1);
        console.log(temp2);
        acc.push({ label: REGION_DATA[temp1 + "00"][temp2], value: cur.administrationRegion });
      }
      return acc;
    }, []);

    options2.value = temp.upUnit.map((item) => {
      return { label: item.unitName, value: item.id };
    });

    options3.value = temp.units.map((item) => {
      return { label: item.unitName, value: item.id };
    });
  });

  const emits = defineEmits(["change"]);
  const search = () => {
    console.log(form);

    emits("change", form);
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

  .form-item-style {
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #fff;
    background: #fff;
    // background: rgb(10, 50, 112);
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
      color: #fff !important;
    }
  }
  :deep(.ant-select-arrow) {
    color: #fff !important;
  }
</style>
