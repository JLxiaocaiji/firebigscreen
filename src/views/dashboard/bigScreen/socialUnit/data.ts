import { FormSchema, BasicColumn } from "/@/components/Table";
import { unitList } from "./api";

export const columns: BasicColumn[] = [
  {
    title: "",
    dataIndex: "",
    width: 50,
    align: "center",
    customRender: ({ text, record, index, column }) => {
      return index + 1;
    },
    slots: { customRender: "ellipsisText" },
  },
  { title: "单位名称", dataIndex: "unitName", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  { title: "所属行政区划", dataIndex: "unitName", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  { title: "设备总数", dataIndex: "unitName", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  { title: "设备总数(合计:1)", dataIndex: "unitName", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  { title: "火警数(合计:1)", dataIndex: "unitName", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  { title: "异常数(合计:8912)", dataIndex: "unitName", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  { title: "离线数(合计:395)", dataIndex: "unitName", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  { title: "离线数(合计:395)", dataIndex: "unitName", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  { title: "任务完成率", dataIndex: "unitName", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  { title: "企业评分", dataIndex: "unitName", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  { title: "联系人", dataIndex: "unitName", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  { title: "联系电话", dataIndex: "unitName", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  { title: "操作", dataIndex: "action", width: 100, align: "center" },


  { title: "发生时间", dataIndex: "time", width: 100, align: "center", slots: { customRender: "ellipsisText" } },
  { title: "关联视频", dataIndex: "relatedValue", width: 100, align: "center", slots: { customRender: "img" } },
  { title: "详情", dataIndex: "action", width: 100, align: "center" },
];
