<template>
  <div class="root">
    <div class="label">子组件接受内容： {{ props.value }}</div>
    <button class="btn" @click="trigger">点击触发父级组件传递的函数</button>
    <div>组件内输入的内容：{{ inputValue }}</div>
    <input type="text" v-model="inputValue" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface changeValueType {
  (param: string): void
}

/** 接收[数据]传参-ts */
const props = defineProps<{ value?: String }>()
/** 接受[函数]传参-ts */
const emit = defineEmits<{ (e: 'changeValue', param: string): void }>()
const inputValue = ref<string>()

function trigger() {
  emit('changeValue', '子组件自定义内容')
}
</script>

<style scoped lang="scss">
.root {
  .label {
    color: green;
    font-weight: bolder;
  }
  .btn {
    display: block;
    padding: 10px 20px;
  }
}
</style>
