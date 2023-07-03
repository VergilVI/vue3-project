<template>
  <div class="root">
    <!-- :navigation="navigation" -->
    <!-- :modules="modules" -->
    <!-- :pagination="{ clickable: true }" -->
    <!-- :scrollbar="{ draggable: true }" -->
    <!-- :autoplay="{ delay: 1000, disableOnInteraction: false }" -->
    <!-- :loop="true"
      :slides-per-view="3"
      :slides-per-group="1"
      :space-between="10" -->
    <swiper
      class="my-swiper"
      :modules="[EffectCards]"
      effect="cards"
      grab-cursor
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide style="--bgColor: rgb(255, 0, 0)">Slide 1</swiper-slide>
      <swiper-slide style="--bgColor: rgb(255, 165, 0)">Slide 2</swiper-slide>
      <swiper-slide style="--bgColor: rgb(255, 255, 0)">Slide 3</swiper-slide>
      <swiper-slide style="--bgColor: rgb(0, 255, 0)">Slide 4</swiper-slide>
      <swiper-slide style="--bgColor: rgb(0, 127, 255)">Slide 5</swiper-slide>
      <swiper-slide style="--bgColor: rgb(0, 0, 255)">Slide 6</swiper-slide>
      <swiper-slide style="--bgColor: rgb(139, 0, 255)">Slide 7</swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts" name="swiper">
import { onMounted } from 'vue'
import { EffectCards } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'
import 'swiper/scss/effect-cards'

onMounted(() => {})

const onSwiper = (swiper: any) => {
  console.log('onSwiper: ', swiper)
}

const onSlideChange = () => {
  console.log('slide changed')
}
</script>

<style scoped lang="scss">
.root {
  height: 100%;
  width: 100%;
  .swiper {
    height: 320px;
    // padding: 20px;
    width: 240px;

    .swiper-slide {
      background-color: var(--bgColor);
      border-radius: 18px;
      align-items: center;
      color: #fff;
      display: flex;
      font-size: 22px;
      font-weight: bold;
      justify-content: center;
      user-select: none;
    }

    // .swiper-button-next,
    // .swiper-button-prev {
    //   --swiper-theme-color: red;
    //   --swiper-navigation-size: 20rem;
    // }
    // // 改变小圆点的样式
    // .swiper-pagination-bullet-active {
    //   background: white;
    // }
  }
}
</style>
