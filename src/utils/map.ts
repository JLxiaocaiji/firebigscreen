import AMapLoader from "@amap/amap-jsapi-loader";

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
      .then((AMap) => {
        resolve(AMap);
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};
