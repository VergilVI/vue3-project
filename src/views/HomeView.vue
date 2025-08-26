<script setup lang="ts" name="Home">
import OngingTask from '@/components/OngingTask.vue'
import EchartTest from '@/components/EchartTest.vue'
import SeamlessScroll from '@/components/SeamlessScroll.vue'
// import TheWelcome from '../components/TheWelcome.vue'

</script>

<template>
  <main>
    <div class="describe">尚未设计的首页~</div>
    <!-- <TheWelcome /> -->
    <div class="echart_group">
      <OngingTask class="echart_box" />
      <EchartTest class="echart_box" />
      <SeamlessScroll />
    </div>
  </main>
</template>

<style scoped lang="scss">
.describe {
  font-size: 45px;
  font-weight: 600;
  width: 350px;
  text-align: center;
  margin: 45px auto 0px;
  background-image: linear-gradient(to right, red, yellow);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.echart_group {
  display: flex;
  column-gap: 8px;

  .echart_box {
    height: 300px;
    width: 30vw;
    background: #333;
  }
}
</style>
