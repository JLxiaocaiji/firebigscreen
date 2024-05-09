<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <video class="video" ref="video" id="video"> </video>
  <canvas class="canvas" ref="canvas" id="canvas"> </canvas>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onUnmounted } from "vue";

  const video = ref();
  const canvas = ref();

  onMounted(() => {
    initPlayer();
  });

  onUnmounted(() => {});

  const initPlayer = () => {
    var player = new PlayerControl({
      wsURL: "ws://10.50.7.130:80/rtspoverwebsocket",
      rtspURL: "rtsp://10.50.7.130:80/cam/realmonitor?channel=1&subtype=0&proto=Private3",
      username: "admin",
      password: "Admin123",
      //   events: {
      //     // 开始播放
      //     PlayStart: (e) => {
      //       console.log("PlayStart", e);
      //     },
      //     WorkerReady: (e) => {
      //       console.log("WorkerReady", e);
      //       player.connect();
      //     },
      //   },
    });

    player.on("PlayStart", (e) => {
      console.log(e);
    });

    player.on("WorkerReady", () => {
      //当文件准备完成后，开始拉流。
      player.connect();
    });
    console.log(PlayerControl);
    // console.log(player);

    // var v = document.getElementById("video");
    // var c = document.getElementById("canvas");

    // player.init(c, v);
    player.init(canvas.value, video.value);
    // player.connect();
  };
</script>

<style lang="less" scoped>
  .video {
    // display: flex;
    // flex-direction: column;
    // width: 100%;
    // height: 300px;

    // .player:first-child {
    //   height: calc(100% - 20px);
    // }

    // .bottom-menu {
    //   display: flex;
    //   align-items: center;
    //   justify-content: flex-end;
    //   height: 60px;
    //   flex-shrink: 0;

    //   > button {
    //     margin-right: 20px;
    //   }

    //   > i {
    //     font-size: 24px;
    //     margin-right: 20px;
    //   }

    //   .record-position {
    //     margin-right: 20px;
    //   }

    //   .wsIcon {
    //     font-size: 24px;
    //     margin-right: 16px;
    //   }

    //   .full-screen-icon {
    //     cursor: pointer;
    //   }
    // }
  }
  .canvas {
    width: 100%;
    height: auto;
  }
</style>
