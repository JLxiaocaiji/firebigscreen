<template>
  <div id="map"> </div>
</template>

<script lang="ts" setup>
  import AMapLoader from "@amap/amap-jsapi-loader";
  import { onMounted, onUnmounted, shallowRef } from "vue";
  import icon from "@/assets/images/people.png";

  //   const map = shallowRef();
  const map = shallowRef<typeof AMap | null>(null);

  const initMap = async () => {
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
          map.value = new AMap.Map("map", {
            viewMode: "3D", // 是否为3D地图模式
            zoom: 12, // 初始化地图级别
            center: [115.782939, 33.869338], // 初始化地图中心点位置
          });
          map.value.setMapStyle("amap://styles/darkblue");
          addMarker();
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  };

  onMounted(() => {
    initMap();
    addMarker();
  });

  onUnmounted(() => {
    map.value?.destroy();
  });

  // 添加地图标记点
  const addMarker = () => {
    let arr = [115.782939, 33.869338];
    let marker = new AMap.Marker({
      position: [...arr],
      icon: icon,
    });
    map.value.add(marker);
  };

  // 添加多个点标记
  const addMarkers = (arr: number[]) => {};

  // 添加海量点标记
  const addMassMarker = (arr: number[]) => {};
</script>

<style lang="less" scoped>
  #map {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
  }
</style>
