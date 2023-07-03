<template>
  <div class="root">
    <swiper
      class="my-swiper"
      :modules="[Mousewheel, Pagination]"
      direction="vertical"
      slides-per-view="auto"
      :space-between="0"
      :mousewheel="true"
      :pagination="{ clickable: true }"
    >
      <swiper-slide style="height: 100px; --bgColor: rgb(19, 19, 19)">Top</swiper-slide>
      <swiper-slide style="--bgColor: rgb(238, 68, 48)">Slide 1</swiper-slide>
      <swiper-slide style="--bgColor: rgb(250, 123, 69)">Slide 2</swiper-slide>
      <swiper-slide style="--bgColor: rgb(251, 159, 66)">Slide 3</swiper-slide>
      <swiper-slide style="--bgColor: rgb(252, 200, 58)">Slide 4</swiper-slide>
      <swiper-slide style="height: 100px; --bgColor: rgb(0, 0, 0)">Bottom</swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts" name="SwiperMousewheel">
import { Mousewheel, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'
import 'swiper/scss/pagination'
</script>

<style scoped lang="scss">
.root {
  height: 100%;
  width: 100%;

  .swiper {
    height: 320px;
    width: 320px;

    .swiper-slide {
      background-color: var(--bgColor);
      align-items: center;
      display: flex;
      color: lightgray;
      font-size: 22px;
      font-weight: bold;
      justify-content: center;
      user-select: none;
    }
  }
}
</style>
