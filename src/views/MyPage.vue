<template>
  <div class="root">
    <button class="btn" @click="() => (ejectPageShow = !ejectPageShow)">点击弹出页面</button>
    <div class="label">路由携带传参：{{ route.query }}</div>
    <div class="label">StateRef: {{ StateRef }}</div>
    <div class="label">Count: {{ Count }}</div>
    <div class="label">ValueToRef: {{ ValueToRef }}</div>
    <div class="switch-box">
      <button class="btn" @click="increment">点击+1</button>
      <button class="btn" @click="stopEffect">点击停止Hook监听</button>
    </div>
    <div class="split-line" />
    <div class="switch-box">
      <button class="btn" @click="() => (comName = 'componentA')">点击组件-A</button>
      <button class="btn" @click="() => (comName = 'componentB')">点击组件-B</button>
    </div>
    <!-- <div class="split-line" /> -->
    <!-- <componentA :value="Count.name" @change-value="changeValueFunc" /> -->
    <div class="component-box">
      <Transition name="fade" mode="out-in" appear>
        <keep-alive>
          <component :is="comObj[comName]" :value="Count.name" @change-value="changeValueFunc" />
        </keep-alive>
      </Transition>
    </div>
    <Transition name="eject">
      <div class="eject-page" v-if="ejectPageShow" @click="() => (ejectPageShow = false)"></div>
    </Transition>
  </div>
</template>

<script setup lang="ts" name="MyPage">
/** 调用vue3的Hooks */
import {
  reactive,
  ref,
  toRef,
  watch,
  watchEffect,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import componentA from '@/components/ComponentA.vue'
import componentB from '@/components/ComponentB.vue'
/** 组件集合对象 */
const comObj = { componentA, componentB }

interface countType {
  value?: number
  name?: string
  //   [propName: string]: any
}
/** ref声明，通过ref.value调用 */
const StateRef = ref<number>(0)
type componentName = 'componentA' | 'componentB'
/** 修改注册的组件名 */
const comName = ref<componentName>('componentA')
/** 状态的声明 */
const Count = reactive<countType>({ value: 0, name: '从父组件传递信息' })
/** 解构对象单个属性 */
const ValueToRef = toRef(Count, 'value')
/** 弹出页面状态 */
const ejectPageShow = ref<number | boolean>(false)

/** 监听函数，监听对象属性 */
watch(
  () => Count.name,
  (newVal, oldVal) => {
    console.log('Count.name发生变化', newVal, oldVal)
  }
)

const stopEffect = watchEffect((oninvalidate) => {
  console.log('watchEffect -- Count.value', Count.value)
  console.log('watchEffect -- StateRef.value', StateRef.value)
  oninvalidate(() => {
    console.log('effect触发之前', Count.value)
    console.log('effect触发之前', StateRef.value)
  })
})

//#region 声明周期
/** 挂在前 */
onBeforeMount(() => {
  console.log('---挂载之前---')
})
/** 挂在 */
onMounted(() => {
  console.log('---挂载---')
  increment()
})
/** 更新前 */
onBeforeUpdate(() => {
  console.log('---更新之前---')
})
/** 更新 */
onUpdated(() => {
  console.log('---更新---')
})
/** 卸载前 */
onBeforeUnmount(() => {
  console.log('---卸载之前---')
})
/** 卸载 */
onUnmounted(() => {
  console.log('---卸载---')
})
//#endregion

function increment() {
  StateRef.value++
  if (Count.value) Count.value += 2
  Count.name = '这是新的信息s'
}

function changeValueFunc(param: string) {
  Count.name = param.toString()
}
</script>

<style scoped lang="scss">
.root {
  position: relative;

  .label {
    color: blue;
    font-size: larger;
    font-weight: bolder;
  }

  .btn {
    display: block;
    padding: 10px 20px;
  }

  .split-line {
    background-color: gray;
    height: 2px;
    margin: 10px 0;
  }

  .switch-box {
    // align-items: center;
    display: flex;
    justify-content: center;
    column-gap: 20px;
    transition: all 0.5s cubic-bezier(0.18, 0.89, 1, 1.63);
  }

  .component-box {
    overflow: hidden;
    padding-left: 20px;
  }

  .eject-page {
    background-color: rgba(0, 128, 0, 0.4);
    border: 1px solid green;
    // border-radius: 100%;
    box-shadow: inset 0 0px 100px 50px black;
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
  }

  // #region 过渡标签
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s cubic-bezier(0.18, 0.89, 1, 1.63);
  }

  .fade-enter-from,
  .fade-leave-to {
    transform: translateX(30px);
    opacity: 0;
  }

  .eject-enter-active,
  .eject-leave-active {
    transition: all 0.5s cubic-bezier(0.99, 0, 0.03, 1.57);
  }

  .eject-enter-from,
  .eject-leave-to {
    transform: scale(0);
  }
  // #endregion
}
</style>
