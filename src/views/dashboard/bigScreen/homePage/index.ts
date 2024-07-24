import { reactive } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
/*
    类型 import 
*/
import { HeaderItem, headerDataType } from "./index.d";

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

export const list: headerDataType[] = reactive([
  {
    img: "/src/assets/images/unit.png",
    describe: "接入单位",
    num: 219,
    detail: [
      { describe: "在线单位数", num: 219 },
      { describe: "离线单位数", num: 0 },
    ],
  },
  {
    img: "/src/assets/images/device.png",
    describe: "接入设备数",
    num: 61341,
    detail: [
      { describe: "用传装置数", num: 216 },
      { describe: "4 G 网关数 ", num: 196 },
      { describe: "其他设备数", num: 60929 },
    ],
  },
  {
    img: "/src/assets/images/video.png",
    describe: "接入视频数",
    num: 373,
  },
  {
    img: "/src/assets/images/xiaofangshuan.png",
    describe: "消防水系统",
    num: 822,
  },
  {
    img: "/src/assets/images/huojing.png",
    describe: "实时火警",
    num: 0,
  },
]);

// 地图
export const initMap = async () => {
  return new Promise((resolve, reject) => {
    window["_AMapSecurityConfig"] = {
      securityJsCode: "783120201b461740eb6c65c6bd698282",
    };
    AMapLoader.load({
      key: "976ff2c71f7506540685d319be1eadbe",
      version: "2.0",
      plugins: [
        "AMap.Scale",
        "AMap.ToolBar",
        "AMap.ControlBar",
        "AMap.MouseTool",
        "AMap.MapType",
        "AMap.HawkEye",
        "AMap.PlaceSearch",
        "AMap.AutoComplete",
        "AMap.Driving",
        "AMap.Marker",
        "AMap.DistrictSearch",
        "AMap.CitySearch",
        "AMap.LabelMarker",
      ],
    })
      .then((Map: typeof AMap) => {
        resolve(Map);
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};
