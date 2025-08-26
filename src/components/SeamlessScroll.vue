<script setup lang="ts" name="SeamlessScroll">
//#region 引用
import { ref, reactive } from 'vue'
//#endregion

//#region 引用组件
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
//#endregion

//#region 声明与引用的Interface & Type
//#endregion

//#region 暴露接口&方法
//#endregion

//#region 声明变量
const dataList = ref<{ id: number; name: string }[]>(
  Array.from({ length: 10000 }, (item, index) => ({
    id: Date.now() + index + 1,
    name: `Vue3.0无缝滚动展示数据第${index + 1}条`,
  }))
)
/** 是否开启滚动 */
const startScroll = ref(true)
const scrollOptions = reactive({
  step: 0.5, // 数值越大速度滚动越快
  hover: true, // 是否开启鼠标悬停stop
  direction: 'up', // 控制滚动方向，可选值up，down，left，right
  ease: 'linear', // 动画效果，可以传入贝塞尔曲线数值
})
//#endregion

//#region 声明函数
//#region 数据请求
//#endregion

//#region Echart图表
//#endregion
//#endregion

//#region 生命周期
//#endregion
</script>

<template>
  <div class="root_SeamlessScroll">
    <vue3-seamless-scroll v-model="startScroll" :list="dataList" v-bind="scrollOptions">
      <template v-slot="{ data }">
        <span style="width: 100%; display: block; line-height: 30px">
          <div>{{ data.name }}</div>
        </span>
      </template>
    </vue3-seamless-scroll>
  </div>
</template>

<style lang="scss" scoped>
.root_SeamlessScroll {
  height: 300px;
  width: 300px;
  overflow: hidden;
  position: relative;
}
</style>
