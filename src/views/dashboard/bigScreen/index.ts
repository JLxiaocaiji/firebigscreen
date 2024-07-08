import { reactive } from "vue";
/*
    类型 import 
*/
import { HeaderItem } from "./index.d";

export const list1 = reactive<HeaderItem[]>([
  { label: "首页", value: "1", url: "" },
  { label: "社会单位", value: "2", url: "" },
  { label: "视频管理", value: "3", url: "" },
  { label: "监督管理", value: "4", url: "" },
]);
export const list2 = reactive<HeaderItem[]>([
  { label: "系统管理", value: "1", url: "" },
  { label: "火警信息", value: "2", url: "" },
  { label: "安全分析", value: "3", url: "" },
  { label: "消息通知", value: "4", url: "" },
]);
