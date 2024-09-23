<template>
  <div class="root">
    <el-carousel :autoplay="false" :interval="4000" type="card" indicator-position="outside">
      <el-carousel-item>
        <img v-lazy="'https://swiperjs.com/demos/images/nature-1.jpg'" />
      </el-carousel-item>
      <el-carousel-item>
        <img v-lazy="'https://swiperjs.com/demos/images/nature-2.jpg'" />
      </el-carousel-item>
      <el-carousel-item>
        <img v-lazy="'https://swiperjs.com/demos/images/nature-3.jpg'" />
      </el-carousel-item>
      <el-carousel-item>
        <img v-lazy="'https://swiperjs.com/demos/images/nature-4.jpg'" />
      </el-carousel-item>
      <el-carousel-item>
        <img v-lazy="'https://swiperjs.com/demos/images/nature-5.jpg'" />
      </el-carousel-item>
      <el-carousel-item>
        <img v-lazy="'https://swiperjs.com/demos/images/nature-6.jpg'" />
      </el-carousel-item>
      <el-carousel-item>
        <img v-lazy="'https://swiperjs.com/demos/images/nature-7.jpg'" />
      </el-carousel-item>
      <el-carousel-item>
        <img v-lazy="'https://swiperjs.com/demos/images/nature-8.jpg'" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts" name="EleSwipercard">
</script>

<style scoped lang="scss">
.root {
  height: 100%;
  width: 100%;
  .el-carousel__item {
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>
