<template>
  <div>
    <ContentHeaderCard
      :class="[index == checked ? 'active' : '']"
      v-for="(item, index) in list"
      :key="item.describe"
      @choose="
        (i) => {
          checked = i;
        }
      "
      :profile="item"
      :index="index"
    />

    
  </div>
</template>

<script lang="ts" setup>
  import ContentHeaderCard from "./ContentHeaderCard.vue";


  import { reactive, ref } from "vue";

  const list = reactive([
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

  const checked = ref<number>(0);


</script>

<style lang="less" scoped>
  .active {
    background: linear-gradient(90deg, #00c6ff, #0092ff);
  }
</style>
