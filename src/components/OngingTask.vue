<script setup lang="ts" name="ongingTask">
//#region 引用
import { reactive, ref, shallowRef, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { debounce } from 'lodash-es'
import { deepCopyFunc, formatterBigNumber } from '@/assets/js/utils'
//#endregion

//#region 声明与引用的Interface & Type
type EChartsOption = echarts.EChartsOption
type typeState = 'going' | 'error' | 'success'
/** 任务状态数据类型 */
interface TaskState {
  id: number
  label: string
  state: typeState
  fontColor: string
  count: number | string
}
//#endregion

//#region 声明变量
const loading = ref<boolean>(false)
/** 任务状态 */
const stateList = reactive<TaskState[]>([
  { id: 1, label: '执行中', state: 'going', fontColor: '#fff', count: 0 },
  { id: 2, label: '异常', state: 'error', fontColor: '#f43f47', count: 0 },
  { id: 3, label: '已完成', state: 'success', fontColor: '#01f4b4', count: 0 },
])
/** 任务进度 */
let dataList = reactive<(number | string)[]>([])
let dataXAxis = reactive<string[]>([])

const refEchartBar = shallowRef<HTMLElement>()
const echartObj = shallowRef<echarts.ECharts>()
const resizeObserverObj = shallowRef<ResizeObserver>()
const intervalId = shallowRef<number>()
//#endregion

//#region 声明函数
//#region 数据请求
/** 获取任务数据
 * @param showLoading 是否显示加载动画
 */
async function apiGetTaskData(showLoading = false) {
  if (showLoading) loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 0))
  loading.value = false
  stateList[0].count = 5
  stateList[1].count = 1
  stateList[2].count = 2
  const resData = [
    { label: '任务任务任务', number: 20 },
    { label: '任务任务任', number: 35 },
    { label: '任务3', number: 40 },
    { label: '任务4', number: 50 },
    { label: '任务5', number: 70 },
    { label: '任务6', number: 85 },
    { label: '任务7', number: 45 },
    { label: '任务8', number: 35 },
    { label: '任务9', number: 15 },
  ].filter((item, index) => index < 10)
  dataList = resData.map((item) => item.number)
  dataXAxis = resData.map((item) => item.label)
  setTimeout(updataEchart, 0)
}
//#endregion

//#region Echart图表
/** 更新Echart图表 */
function updataEchart(paramArr?: (number | string)[]) {
  const echartEle = refEchartBar.value
  if (!echartEle) return

  // 初始化
  if (!echartObj.value) {
    echartObj.value = echarts.init(echartEle)
    // 监听chart容器大小变化
    echartObj.value.on('finished', () => {
      resizeObserverObj.value = new ResizeObserver(debounce(echartObj.value?.resize as () => {}, 300))
      resizeObserverObj.value.observe(echartEle)
      echartObj.value?.off('finished')
    })
  }

  const echartData = deepCopyFunc(paramArr ? paramArr : dataList)
  const echartXAxis = dataXAxis ? deepCopyFunc(dataXAxis) : []
  const options: EChartsOption = {
    // animationDuration: 2000,
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value) => `${value?.toString()}%`,
    },
    yAxis: {
      type: 'category',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        width: 80,
        overflow: 'truncate',
      },
      inverse: true,
      boundaryGap: false,
      data: echartXAxis,
    },
    xAxis: {
      type: 'value',
      max: 100,
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
    },
    grid: {
      top: 10,
      right: 0,
      bottom: 10,
      left: 0,
      containLabel: true,
    },
    series: [
      {
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          borderRadius: 10,
          color: '#3C7EFF',
        },
        showBackground: true,
        backgroundStyle: {
          borderRadius: 10,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#FC5500' },
            { offset: 1, color: '#FEC600' },
          ]),
        },
        data: echartData,
      },
    ],
  }
  echartObj.value.setOption(options)
}
//#endregion
//#endregion

//#region 生命周期
onBeforeUnmount(() => {
  console.log('ongoningTask onBeforeUnmount')
  clearInterval(intervalId.value)
  intervalId.value = undefined

  echartObj.value?.dispose()
  echartObj.value = undefined
})

console.log('ongoningTask onSetup')
apiGetTaskData(true)
// intervalId.value = setInterval(apiGetTaskData, 5000)
//#endregion
</script>

<template>
  <div class="root_ongingTask">
    <div class="taskState_box">
      <div class="taskState_item" v-for="item in stateList" :key="item.id" :style="{ color: item.fontColor || '#fff' }">
        <span>{{ item.label }}:</span>
        <span :title="String(item.count)">{{ formatterBigNumber(item.count, 0) }}</span>
      </div>
    </div>
    <div class="echart_box" ref="refEchartBar"></div>
  </div>
</template>

<style lang="scss" scoped>
.default_ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.root_ongingTask {
  position: relative;
  padding: 20px 0;
}

.taskState_box {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .taskState_item {
    @extend .default_ellipsis;
    line-height: 24px;
  }
}

.echart_box {
  box-sizing: border-box;
  height: calc(100% - 24px);
  padding-top: 20px;
}
</style>
