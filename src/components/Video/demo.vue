<template>
  <div class="hello-ezuikit-js">
    <div id="video-container" style="width: 600px; height: 400px"></div>
    <div>
      <button @click="init">init</button>
      <button @click="stop">stop</button>
      <button @click="play">play</button>
      <button @click="openSound">openSound</button>
      <button @click="closeSound">closeSound</button>
      <button @click="startSave">startSave</button>
      <button @click="stopSave">stopSave</button>
      <button @click="capturePicture">capturePicture</button>
      <button @click="fullScreen">fullScreen</button>
      <button @click="getOSDTime">getOSDTime</button>
      <button @click="ezopenStartTalk">开始对讲</button>
      <button @click="ezopenStopTalk">结束对讲</button>
      <button @click="destroy">销毁</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import EZUIKit from "ezuikit-js";
  import { onMounted, ref } from "vue";
  import { getUrl, getToken } from "./api";
  import { IPlayer } from "./index";

  let player: IPlayer;

  const play = () => {
    const playPromise = player.play();
    playPromise.then((data: any) => {
      console.log("promise 获取 数据", data);
    });
  };

  const stop = () => {
    const stopPromise = player.stop();
    stopPromise.then((data: any) => {
      console.log("promise 获取 数据", data);
    });
  };

  const getOSDTime = () => {
    const getOSDTimePromise = player.getOSDTime();
    getOSDTimePromise.then((data: any) => {
      console.log("promise 获取 数据", data);
    });
  };

  const capturePicture = () => {
    const capturePicturePromise = player.capturePicture(`${new Date().getTime()}`);
    capturePicturePromise.then((data: any) => {
      console.log("promise 获取 数据", data);
    });
  };

  const openSound = () => {
    const openSoundPromise = player.openSound();
    openSoundPromise.then((data: any) => {
      console.log("promise 获取 数据", data);
    });
  };

  const closeSound = () => {
    const openSoundPromise = player.closeSound();
    openSoundPromise.then((data: any) => {
      console.log("promise 获取 数据", data);
    });
  };

  const startSave = () => {
    const startSavePromise = player.startSave(`${new Date().getTime()}`);
    startSavePromise.then((data: any) => {
      console.log("promise 获取 数据", data);
    });
  };

  const stopSave = () => {
    const stopSavePromise = player.stopSave();
    stopSavePromise.then((data: any) => {
      console.log("promise 获取 数据", data);
    });
  };

  const ezopenStartTalk = () => {
    player.startTalk();
  };

  const ezopenStopTalk = () => {
    player.stopTalk();
  };

  const fullScreen = () => {
    player.fullScreen();
  };

  const destroy = () => {
    const destroyPromise = player.destroy();
    destroyPromise.then((data: any) => {
      console.log("promise 获取 数据", data);
    });
    player = null!;
  };

  const props = defineProps({
    cameraId: { type: String, required: true },
  });

  const getUrl = async () => {
    let res = await getUrl({ cameraId: props.cameraId });
    console.log(1111);
    console.log(res);
  };

  const getToken = async () => {
    let res = await getToken();
    console.log(22222);
    console.log(res);
    return res;
  };

  const init = () => {
    if (player) {
      destroy();
    }

    if (props.cameraId) {
      getUrl();
      getToken();
    }

    console.group("mounted 组件挂载完毕状态===============》");
    // fetch("https://open.ys7.com/jssdk/ezopen/demo/token")
    fetch("/ysPlatform/getAccessToken")
      .then((response) => response.json())
      .then((res) => {
        var accessToken = res.data.accessToken;
        player = new EZUIKit.EZUIKitPlayer({
          id: "video-container", // 视频容器ID
          accessToken: accessToken,
          url: "ezopen://open.ys7.com/G39444019/1.live",
          // simple: 极简版; pcLive: pc直播; pcRec: pc回放; mobileLive: 移动端直播; mobileRec: 移动端回放;security: 安防版; voice: 语音版;
          // template: "simple",
          plugin: ["talk"], // 加载插件，talk-对讲
          width: 600,
          height: 400,
        });
        (window as any).player = player;
      });
  };

  onMounted(() => {
    init();
  });
</script>
