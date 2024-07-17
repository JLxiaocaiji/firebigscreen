<template>
  <div id="map"> </div>
</template>

<script lang="ts" setup>
  import { initMap } from "@/utils/map";
  import "@amap/amap-jsapi-types";
  import { onMounted, onUnmounted, shallowRef } from "vue";
  import icon from "@/assets/images/people.png";

  //   const map = shallowRef();
  const map = shallowRef<typeof AMap | null>(null);

  const init = () => {
    initMap().then((AM: typeof AMap) => {
      (map.value as any) = new AM.Map("map", {
        viewMode: "3D",
        zoom: 10,
        resizeEnable: true,
      });
      (map.value as any)?.setMapStyle("amap://styles/darkblue");
      addMarker();
    });
  };

  onMounted(() => {
    init();
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
    map.value?.add(marker);
  };
</script>

<style lang="less" scoped>
  #map {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 0;
  }
</style>
