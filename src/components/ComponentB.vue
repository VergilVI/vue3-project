<template>
  <div class="root">
    <div>组件B</div>
    <div>当前数字:{{ numberValue }}</div>
    <button
      class="btn"
      @click="
        () => {
          numberValue++
        }
      "
    >
      点击数字+1
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const numberValue = ref<number>(0)
</script>

<style scoped>
.root {
  .btn {
    padding: 10px 20px;
  }
}
</style>
