<template>
  <div class="root">
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 0,
        stretch: 50, // 紧凑度：卡片之间重叠的宽度(px)
        depth: 150, // 景深度：没获得焦点的卡片的景深度(px)
        modifier: 1, // 倍率：上方三个数值的倍率
        slideShadows: true // 聚焦卡片的阴影
      }"
      :pagination="true"
      :navigation="true"
      :modules="[EffectCoverflow, Pagination, Navigation]"
      :loop="true"
      class="mySwiper"
    >
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide>
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide>
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide>
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide>
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide>
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide>
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide>
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide>
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-9.jpg" /></swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts" name="swiperCoverflow">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { EffectCoverflow, Pagination, Navigation } from 'swiper'

// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/effect-coverflow'
import 'swiper/scss/pagination'
import 'swiper/scss/navigation'
</script>

<style scoped lang="scss">
.root {
  height: 100%;
  width: 100%;

  .swiper {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }
}
</style>
