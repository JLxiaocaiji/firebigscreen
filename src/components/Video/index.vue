<template>
  <div id="video-container" style="width: 600px; height: 400px"></div>

  <div class="video-bottoms">
    <span
      v-if="isPlay"
      @click="
        () => {
          isPlay = false;
          player.stop();
        }
      "
      title="开始播放"
    >
      <svg t="1567596200214" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1340" width="32" height="32">
        <path
          d="M884.736 896H139.264c-6.144 0-11.264-5.12-11.264-11.264V139.264c0-6.144 5.12-11.264 11.264-11.264h745.984c6.144 0 11.264 5.12 11.264 11.264v745.984c-0.512 5.632-5.632 10.752-11.776 10.752z"
          p-id="1341"
          fill="red"
        />
      </svg>
    </span>
    <span
      v-if="!isPlay"
      @click="
        () => {
          isPlay = true;
          player.play();
        }
      "
      title="结束播放"
    >
      <svg t="1567596067868" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1122" width="32" height="32">
        <path
          d="M320.552713 167.630858l467.602838 269.970688c57.836243 33.391505 57.836243 116.871801 0 150.263306L320.552713 857.836563c-57.836243 33.391505-130.131803-8.348132-130.131802-75.132165V242.763023c-0.001023-66.784032 72.294536-108.523669 130.131802-75.132165z"
          fill="#ffffff"
          p-id="1123"
        />
      </svg>
    </span>

    <span title="截图" @click="capturePicture">
      <svg t="1567596223445" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1558" width="32" height="32">
        <path
          d="M958.464 270.336h-70.656l-13.312-90.112c0-38.912-31.744-70.656-70.656-70.656H417.792c-38.912 0-70.656 31.744-70.656 70.656l-25.6 90.112h-83.968c0-19.456-19.456-38.912-38.912-38.912h-70.656c-19.456 0-38.912 19.456-38.912 38.912H70.656C31.744 270.336 0 303.104 0 348.16v495.616c0 38.912 31.744 70.656 70.656 70.656H952.32c38.912 0 70.656-31.744 70.656-70.656V348.16c6.144-45.056-25.6-77.824-64.512-77.824z m-791.552 122.88c-31.744 0-51.2-19.456-51.2-45.056 0-25.6 25.6-51.2 51.2-51.2s51.2 19.456 51.2 51.2c1.024 25.6-25.6 45.056-51.2 45.056zM611.328 849.92c-154.624 0-276.48-121.856-276.48-276.48s121.856-276.48 276.48-276.48 276.48 121.856 276.48 276.48-121.856 276.48-276.48 276.48z m0-476.16C501.76 373.76 411.648 463.872 411.648 573.44S501.76 772.096 611.328 772.096s199.68-90.112 199.68-199.68-90.112-198.656-199.68-198.656z m0 0"
          p-id="1559"
          fill="#ffffff"
        />
      </svg>
    </span>

    <span title="开始录制" v-if="isTranscribe" @click="startRecord">
      <svg t="1567596380579" class="icon" viewBox="0 0 1692 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2413" width="32" height="32">
        <path
          d="M1612.554484 866.112901l-227.951822-132.253664c-42.220868-25.596285-75.990132-51.19257-75.990132-93.877812V341.333333c0-42.666667 33.769264-63.990713 75.990132-89.605572l227.951822-132.253664c42.220868-25.596285 75.990132-4.272239 75.990132 38.394427v669.849949c0 46.920331-33.769264 63.990713-75.990132 38.394428z m-590.9807 157.868524H160.438971c-88.65825 0-160.413293-72.516616-160.413293-162.140763V162.140763C0.025678 72.553766 71.780721 0 160.438971 0h861.134813c88.639675 0 160.413293 72.553766 160.413293 162.140763v699.699899c0 89.624147-71.773618 162.140763-160.413293 162.140763zM329.266717 221.859237c-54.870411 8.563053-101.307793 55.483384-113.957336 115.201857-21.101146 102.38514 67.538529 196.262952 173.062836 174.938906 54.888986-12.798143 101.326368-59.718473 113.994486-119.474097 21.101146-106.657379-67.538529-196.262952-173.099986-170.666666z"
          p-id="2414"
          fill="#ffffff"
        />
      </svg>
    </span>

    <span title="结束录制" v-if="!isTranscribe" @click="endRecord">
      <svg t="1567596380579" class="icon" viewBox="0 0 1692 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2413" width="32" height="32">
        <path
          d="M1612.554484 866.112901l-227.951822-132.253664c-42.220868-25.596285-75.990132-51.19257-75.990132-93.877812V341.333333c0-42.666667 33.769264-63.990713 75.990132-89.605572l227.951822-132.253664c42.220868-25.596285 75.990132-4.272239 75.990132 38.394427v669.849949c0 46.920331-33.769264 63.990713-75.990132 38.394428z m-590.9807 157.868524H160.438971c-88.65825 0-160.413293-72.516616-160.413293-162.140763V162.140763C0.025678 72.553766 71.780721 0 160.438971 0h861.134813c88.639675 0 160.413293 72.553766 160.413293 162.140763v699.699899c0 89.624147-71.773618 162.140763-160.413293 162.140763zM329.266717 221.859237c-54.870411 8.563053-101.307793 55.483384-113.957336 115.201857-21.101146 102.38514 67.538529 196.262952 173.062836 174.938906 54.888986-12.798143 101.326368-59.718473 113.994486-119.474097 21.101146-106.657379-67.538529-196.262952-173.099986-170.666666z"
          p-id="2414"
          fill="red"
        />
      </svg>
    </span>

    <span
      title="全屏"
      @click="
        () => {
          player.fullScreen();
        }
      "
      ><svg
        t="1567596529514"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6774"
        width="32"
        height="32"
      >
        <path
          d="M795.5 192H581c-19.6 0-35.6 15.7-36 35.3-0.4 20.3 16.4 36.7 36.7 36.7h128.4L581 393.1c-14 14-14 36.9 0 50.9s36.9 14 50.9 0L760 315.9v129c0 19.6 15.8 35.6 35.3 36 20.2 0.4 36.7-16.4 36.7-36.7V228.5c0-20.1-16.3-36.5-36.5-36.5zM442.2 760H313.8L443 630.9c14-14 14-36.9 0-50.9s-36.9-14-50.9 0L264 708.1V579c0-19.6-15.8-35.6-35.3-36-20.2-0.4-36.7 16.4-36.7 36.7v215.6c0 20.3 16.4 36.7 36.7 36.7H443c19.6 0 35.6-15.7 36-35.3 0.3-20.3-16.5-36.7-36.8-36.7z"
          p-id="6775"
          fill="#ffffff"
        />
        <path
          d="M838 136c27.6 0 50 22.4 50 50v652c0 27.6-22.4 50-50 50H186c-27.6 0-50-22.4-50-50V186c0-27.6 22.4-50 50-50h652m0-72H186c-16.4 0-32.4 3.2-47.5 9.6-14.5 6.1-27.6 14.9-38.8 26.1-11.2 11.2-20 24.2-26.1 38.8-6.4 15.1-9.6 31.1-9.6 47.5v652c0 16.4 3.2 32.4 9.6 47.5 6.1 14.5 14.9 27.6 26.1 38.8 11.2 11.2 24.2 20 38.8 26.1 15.1 6.4 31.1 9.6 47.5 9.6h652c16.4 0 32.4-3.2 47.5-9.6 14.5-6.1 27.6-14.9 38.8-26.1 11.2-11.2 20-24.2 26.1-38.8 6.4-15.1 9.6-31.1 9.6-47.5V186c0-16.4-3.2-32.4-9.6-47.5-6.1-14.5-14.9-27.6-26.1-38.8-11.2-11.2-24.2-20-38.8-26.1-15.1-6.4-31.1-9.6-47.5-9.6z"
          p-id="6776"
          fill="#ffffff"
        />
      </svg>
    </span>
  </div>
</template>

<script lang="ts" setup name="Video">
  import { ref, onMounted, reactive } from "vue";
  import { getUrl, getToken } from "./api";
  import { IPlayer } from "./index";
  import EZUIKit from "ezuikit-js";
  import { useMessage } from "/@/hooks/web/useMessage";

  const { createMessage } = useMessage();

  // 播放器
  let player: IPlayer;

  // props
  const props = defineProps({
    cameraId: { type: String, required: true },
  });

  // 播放/暂停
  const isPlay = ref<boolean>(false);
  // 开始/结束 录制
  const isTranscribe = ref<boolean>(true);

  onMounted(() => {
    (window as any).player = player;
    init();
  });

  const destroy = () => {
    const destroyPromise = player.destroy();
    destroyPromise.then((data: any) => {
      console.log("promise 获取 数据", data);
    });
    player = null!;
  };

  const init = () => {
    if (player) {
      destroy();
    }

    console.group("mounted 组件挂载完毕状态===============》");

    // 获取萤石云Url 和 AccessToken
    Promise.all([getUrl({ cameraId: props.cameraId }), getToken()])
      .then((res) => {
        return res;
      })
      .then((res) => {
        player = new EZUIKit.EZUIKitPlayer({
          id: "video-container", // 视频容器ID
          accessToken: res[1].toString(),
          url: res[0],
          // simple: 极简版; pcLive: pc直播; pcRec: pc回放; mobileLive: 移动端直播; mobileRec: 移动端回放;security: 安防版; voice: 语音版;
          // template: "simple",
          plugin: ["talk"], // 加载插件，talk-对讲
          width: 600,
          height: 400,
        });
      })
      .then(() => {
        isPlay.value = true;
      })
      .catch((e: Error) => {
        createMessage.error("获取直播流出现异常!");
      });
  };

  // 截图
  const capturePicture = () => {
    const capturePicturePromise = player.capturePicture(`${new Date().getTime()}`);
    capturePicturePromise.then((data: any) => {
      console.log("promise 获取 数据", data);
    });
  };

  const startRecord = () => {
    isTranscribe.value = false;
    let startSavePromise = player.startSave(`${new Date().getTime()}`);
    startSavePromise.then((data: any) => {
      console.log("promise 获取 数据", data);
    });
  };
  const endRecord = () => {
    isTranscribe.value = true;
    let stopSavePromise = player.stopSave();
    stopSavePromise.then((data: any) => {
      console.log("promise 获取 数据", data);
    });
  };
</script>

<style lang="less" scoped>
  .video-bottoms {
    // display: inline-block;
    width: 100%;
    height: 42px;
    text-align: left;
    z-index: 1000;
    // position: absolute;
    bottom: 0px;
    left: 0;
    color: #fff;
    background: rgba(0, 0, 0, 0.65);
    padding: 5px 0;
    cursor: pointer;

    span {
      //   display: flex;
      //   align-items: center;
      margin-left: 20px;
      text-align: left;
      color: #fff;
      cursor: pointer;
    }
  }
</style>
