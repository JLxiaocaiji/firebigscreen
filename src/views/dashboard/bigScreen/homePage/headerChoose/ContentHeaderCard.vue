<template>
  <div class="card" @click="click">
    <div class="line1">
      <img :src="profile?.img" />
    </div>
    <div class="line2">
      <h3 class="number">{{ profile?.num }}</h3>
      <h6>{{ profile?.describe }}:</h6>
    </div>
    <div class="line3" v-if="profile?.detail">
      <div v-for="item in profile?.detail" :key="item.describe">
        <span>{{ item?.describe }}:</span>
        <span>{{ item.num }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    profile: { type: Object as PropType<Record<string, any>>, default: () => {} },
    index: { type: Number, default: () => 1 },
  });

  const emit = defineEmits<{
    choose: [index: number];
  }>();

  const click = () => {
    console.log(props.profile);
    console.log(props.index);
    emit("choose", props.index);
  };
</script>

<style lang="less" scoped>
  .card {
    cursor: pointer;
    position: relative;
    padding: 0 15px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    min-width: 150px;
    min-height: 75px;
    box-shadow: 1px 2px 5px rgb(12 20 54 / 35%);
    border-radius: 6px;
    margin: 0 5px;
    background: rgba(43, 80, 191, 0.6);

    .line1 {
      font-size: 16px;
      font-weight: 400;
      color: #abdcff;
      img {
        width: 40px;
        height: 40px;
      }
    }
    .line2 {
      color: #84b2d8;
      margin-left: auto;
      padding-right: 10px;
      .number {
        font-size: 30px;
        color: #fff;
        line-height: 30px;
        margin-bottom: auto;
      }
    }
    .line3 {
      font-weight: 400;
      color: #abdcff;
      padding-left: 10px;
      border-left: 1px solid #fff;

      span:first-child {
        width: auto;
        display: inline-block;
      }
    }
  }
</style>
