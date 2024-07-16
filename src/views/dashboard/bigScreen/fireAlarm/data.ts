import { BasicColumn } from "/@/components/Table";

export const columns: BasicColumn[] = [
  {
    title: "",
    dataIndex: "",
    width: 50,
    align: "center",
    customRender: ({ index }) => {
      return index + 1;
    },
    slots: { customRender: "ellipsisText" },
  },
  { title: "单位名称", dataIndex: "unitName", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  {
    title: "火警状态",
    dataIndex: "status",
    width: 100,
    align: "center",
    // customRender: ({ text, record, index, column }) => {
    //   return <Tag :color="text == '1' ? 'green' : text == '0' ? 'red'">{ () => { text == "1" ? "待处理" : text == "0" ? "已处理" : ""}}</Tag>

    // },
  },
  { title: "设备名称", dataIndex: "deviceName", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  { title: "设备位置", dataIndex: "address", width: 100, align: "center" },
  { title: "发生时间", dataIndex: "time", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  { title: "预警次数", dataIndex: "warningNum", width: 100, align: "center" },
  { title: "关联视频", dataIndex: "relatedValue", width: 100, align: "center", slots: { customRender: "img" } },
  { title: "详情", dataIndex: "action", width: 100, align: "center" },
];

export const keys: string[] = [
  "设备名称",
  "设备编码",
  //   "区域码",
  "设备类别名称",
  "设备类别编码",
  "报警类型",
  "状态",

  "负责人",
  "确认状态",
  "处理人",
  "处理时间",
  "火警备注",
  "火警图片",
  "火警签名",
];

export const values: string[] = [
  "deviceName",
  "deviceCode",
  "deviceTypeName",
  "deviceTypeCode",

  "alarmType",
  "status",
  "headName",
  "taskStatus",
  "handle",
  "handleTime",
  "fireAlarmRemarks",
  "fireAlarmPictures",
  "fireAlarmSignature",
];

export const obj = (keys: string[], values: string[]) => {
  const temp = {};
  for (let i = 0; i < keys.length; i++) {
    temp[keys[i]] = values[i];
  }
  return temp;
};
