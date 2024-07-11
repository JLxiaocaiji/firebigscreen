import { FormSchema, BasicColumn } from "/@/components/Table";
import { unitList } from "./api";

export const formSchema: FormSchema[] = [
  {
    label: "发生时间",
    field: "time",
    component: "RangePicker",
    componentProps: {
      valueType: "YYYY-MM-DD",
    },
  },
  {
    label: "单位名称",
    field: "unitName",
    component: "ApiSelect",
    componentProps: {
      api: unitList,
      labelField: "unitName",
      valueField: "id",
      tag: "user-unitId",
    },
  },
  {
    label: "火警状态",
    field: "status",
    component: "Select",
    componentProps: {
      options: [
        { label: "已处理", value: "1" },
        { label: "未处理", value: "0" },
      ],
    },
  },
];

export const columns: BasicColumn[] = [
  {
    title: "",
    dataIndex: "",
    width: 50,
    align: "center",
    customRender: ({ text, record, index, column }) => {
      return index + 1;
    },
  },
  { title: "单位名称", dataIndex: "unitName", width: 100, align: "center" },
  {
    title: "火警状态",
    dataIndex: "status",
    width: 100,
    align: "center",
    // customRender: ({ text, record, index, column }) => {
    //   return <Tag :color="text == '1' ? 'green' : text == '0' ? 'red'">{ () => { text == "1" ? "待处理" : text == "0" ? "已处理" : ""}}</Tag>

    // },
  },
  { title: "设备名称", dataIndex: "deviceName", width: 100, align: "center" },
  { title: "设备位置", dataIndex: "address", width: 100, align: "center" },
  { title: "发生时间", dataIndex: "time", width: 100, align: "center" },
  { title: "预警次数", dataIndex: "warning_num", width: 100, align: "center" },
  { title: "关联视频", dataIndex: "relatedValue", width: 100, align: "center", slots: { customRender: "img" } },
  { title: "详情", dataIndex: "action", width: 100, align: "center" },
];
