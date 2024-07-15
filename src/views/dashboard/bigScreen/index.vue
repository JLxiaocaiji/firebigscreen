<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <a-layout>
      <a-layout-header class="h"> <Header /></a-layout-header>
      <!-- <a-layout-content class="c"> -->
      <router-view />
      <!-- </a-layout-content> -->
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import Header from "./header.vue";
</script>

<style lang="less" scoped>
  .h {
    background: url("@/assets/images/bsTitle.png") no-repeat;
    background-size: 80%;
    background-position: 50%;
    height: 84px;
    line-height: 84px;
    position: relative;
    z-index: 999;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    color: #fff;
    font-size: 22px;
    padding: 0 20px;
  }

  // transition
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .c {
    height: calc(100% - 84px);

    &-home-content {
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      width: 100%;
      height: 50%;
    }

    .device-map {
      display: flex;
      justify-content: center;
      margin-top: 1.25rem;
      align-items: center;
      color: #fff;
      span {
        // width: 130px;
        height: 48px;
        text-align: center;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        line-height: 48px;
        display: block;
        width: 245px;
        margin-left: -57px;
        &:first-child {
          background: url("@/assets/images/hmap_bg.png") no-repeat 0 0;
        }
        &:last-child {
          background: url("@/assets/images/hmap_bg1.png") no-repeat 0 0;
        }
      }
      &-active {
        width: 300px !important;
        height: 60px !important;
        line-height: 60px !important;
        background: url("@/assets/images/hmap_active_bg.png") no-repeat 0 0 !important;
      }
    }
  }

  .chart {
    display: flex;
    justify-content: space-between;
    &-bottom {
      display: flex;
      justify-content: center;
    }
  }

  .ant-card {
    width: 400px;
    height: 400px;
    padding: 4px;
    overflow: hidden;
    background: url("@/assets/images/cardBg.png") 0 0 / 100% 100% no-repeat;
    // cursor: pointer;
    border-radius: 4px;
    z-index: 9;

    .title {
      background: linear-gradient(0deg, rgba(122, 200, 255, 0.7), hsla(0, 0%, 100%, 0.7));
      color: #abdcff;
      // 延申到 text
      -webkit-background-clip: text;
      // 渐变
      -webkit-text-fill-color: transparent;
      font-weight: 700;
    }

    :deep(&-head) {
      border-bottom: unset;
      & > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap {
        width: 100%;
        .ant-tabs-nav-list {
          width: 100%;
          justify-content: space-around;
          color: #fff;
        }
      }
    }

    :deep(&-body) {
      padding: unset;
    }

    a {
      color: #4cadf1;
      float: right;
      margin-right: 29px;
      margin-top: 5px;
      font-size: 14px;
    }

    :deep(.ant-select-selector) {
      background: transparent;
      border: 1px solid transparent;
    }

    .device-stat {
      display: grid;
      grid-template-columns: 200px 200px;
      grid-template-rows: 160px 160px;
    }
  }
</style>
