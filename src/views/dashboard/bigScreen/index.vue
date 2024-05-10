<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <a-layout>
      <a-layout-header class="h">
        <Header />
      </a-layout-header>
      <a-layout-content class="contentStyle">Content</a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
 import Header from './header.vue';
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

    &-left {
      margin-left: 45px;
      height: 200px;
    }

    &-right {
      margin-right: 45px;
    }

    &-avatar {
      position: absolute;
      right: 35px;
    }
  }

  .contentStyle {
    height: calc(100% - 84px);
  }
</style>
