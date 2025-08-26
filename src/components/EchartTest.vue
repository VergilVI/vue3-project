<script setup lang="ts" name="EchartTest">
//#region 引用
import { nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import * as echarts from 'echarts'
import { debounce } from 'lodash-es'
//#endregion

//#region 声明与引用的Interface & Type
type EChartsOption = echarts.EChartsOption
//#endregion

//#region 声明变量
const refEchartBar = ref<HTMLDivElement>()
const echartObj = shallowRef<echarts.ECharts>()
const resizeObserverObj = shallowRef<ResizeObserver>()
//#endregion

//#region 声明函数
//#region 数据请求
//#endregion

//#region Echart图表
function updataEchart() {
  const echartEle = refEchartBar.value
  if (!echartEle) return

  // 初始化
  if (!echartObj.value) {
    echartObj.value = echarts.init(echartEle)
    // 监听chart容器大小变化
    // new ResizeObserver(debounce(() => echartObj.value?.resize(), 300)).observe(echartEle)
    echartObj.value.on('finished', () => {
      resizeObserverObj.value = new ResizeObserver(debounce(echartObj.value?.resize as () => {}, 300))
      resizeObserverObj.value.observe(echartEle)
      echartObj.value?.off('finished')
    })
  }

  const options: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  }
  echartObj.value.setOption(options, true)
}
//#endregion
//#endregion

//#region 生命周期
onMounted(() => {
  nextTick(updataEchart)
})
onBeforeUnmount(() => {
  console.log('EchartTest onBeforeUnmount')
  resizeObserverObj.value?.unobserve(refEchartBar.value as Element)
  echartObj.value?.dispose()
  echartObj.value = undefined
})

console.log('EchartTest onSetup')
//#endregion
</script>

<template>
  <div class="root_EchartTest">
    <div class="echart_box" ref="refEchartBar"></div>
  </div>
</template>

<style lang="scss" scoped>
.root_EchartTest {
  position: relative;
}

.echart_box {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
</style>
