import { reactive } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
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

/*
    组件 export
*/
export { default as ContentHeader } from "@/views/dashboard/bigScreen/ContentHeader.vue";
export { default as ContentHeaderCard } from "./ContentHeaderCard.vue";
