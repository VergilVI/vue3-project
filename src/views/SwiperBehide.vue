<template>
  <div class="root">
    <div>
      <span>自动播放：</span>
      <el-switch
        v-model="switchAutoplay"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
      />
      <span>{{ swiperAttr.autoplay }}</span>
    </div>
    <swiper
      class="my-swiper"
      watch-slides-progress
      centered-slides
      loop
      slidesPerView="auto"
      :looped-slides="3"
      :modules="[Autoplay, Keyboard, Pagination, Navigation]"
      :autoplay="swiperAttr.autoplay"
      keyboard
      :pagination="{ clickable: true }"
      navigation
      @progress="onProgress"
      @setTransition="onSetTransition"
    >
      <!-- :autoplay="{
        delay: 500,
        disableOnInteraction: false // 设为false，会在用户滑动后继续自动滚动
      }" -->
      <!-- @progress="swiperProgress" -->
      <swiper-slide style="--bgColor: rgba(238, 68, 48, 1)"> Slide 1 </swiper-slide>
      <swiper-slide style="backdrop-filter: blur(3px); --bgColor: rgba(250, 123, 69, 0.1)">
        Slide 2
      </swiper-slide>
      <swiper-slide style="--bgColor: rgb(251, 159, 66)">Slide 3</swiper-slide>
      <swiper-slide style="--bgColor: rgb(252, 200, 58)">Slide 4</swiper-slide>
      <swiper-slide style="--bgColor: rgb(252, 245, 69)">Slide 5</swiper-slide>
      <swiper-slide style="--bgColor: rgb(117, 187, 54)">Slide 6</swiper-slide>
      <swiper-slide style="--bgColor: rgb(0, 149, 60)">Slide 7</swiper-slide>
      <swiper-slide style="--bgColor: rgb(0, 160, 153)">Slide 8</swiper-slide>
      <swiper-slide style="--bgColor: rgb(0, 107, 189)">Slide 9</swiper-slide>
      <swiper-slide style="--bgColor: rgb(15, 50, 152)">Slide 10</swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts" name="SwiperBehide">
import { ref, reactive, computed } from 'vue'
import { Autoplay, Keyboard, Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType, AutoplayOptions } from 'swiper/types'
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/navigation'

interface slidesType extends HTMLElement {
  progress: number
}

const switchAutoplay = ref<boolean>(false)
const swiperAttr: { autoplay: boolean | AutoplayOptions } = reactive({
  autoplay: computed(() =>
    switchAutoplay.value ? { delay: 1500, disableOnInteraction: false } : false
  )
})
// { delay: 1500, disableOnInteraction: false }
function onProgress(swiper: SwiperType) {
  for (let i = 0; i < swiper.slides.length; i++) {
    const slide = swiper.slides[i]
    const slideProgress = (swiper.slides[i] as slidesType).progress
    let modify = 1
    if (Math.abs(slideProgress) > 1) {
      modify = (Math.abs(slideProgress) - 1) * 0.3 + 1
    }
    // translate = slideProgress * modify * 260 + "px"; // 调整该数值，控制同时显示的卡片数
    const translate = `${slideProgress * modify * 50}%` // 调整该数值，控制同时显示的卡片数
    const scale = 1 - Math.abs(slideProgress) / 5
    const zIndex = 999 - Math.abs(Math.round(10 * slideProgress))
    // slide.transform('translateX(' + translate + ') scale(' + scale + ')')
    slide.style.transform = `translateX(${translate}) scale(${scale})`
    // slide.css('zIndex', zIndex)
    slide.style.zIndex = zIndex.toString()
    // slide.css('opacity', 1)
    slide.style.opacity = '1'
    if (Math.abs(slideProgress) > 3) {
      // slide.css('opacity', 0)
      slide.style.opacity = '0'
    }
  }
}
function onSetTransition(swiper: SwiperType, transition: number) {
  for (let i = 0; i < swiper.slides.length; i++) {
    const slide = swiper.slides[i]
    // slide.transition(transition)
    slide.style.transitionDuration = `${transition}ms`
  }
}
</script>

<style scoped lang="scss">
.root {
  border: 1px solid green;
  position: relative;
  width: 100%;
  //   margin: 0 auto;
  //   padding: 30px 0 30px 0;
  //   height: 100%;

  .swiper {
    // border: 1px solid blue;
    height: 320px;
    width: 100%;
    // width: 900px;
    margin: 10px auto 0;
    padding-bottom: 60px;
  }

  .swiper-slide {
    background-color: var(--bgColor);
    box-shadow: 0 8px 30px #ddd;
    border: 1px solid black;
    border-radius: 15px;

    align-items: center;
    color: #fff;
    display: flex;
    font-size: 22px;
    font-weight: bold;
    justify-content: center;
    width: 240px;
    user-select: none;
  }
}
</style>
