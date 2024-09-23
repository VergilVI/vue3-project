<template>
  <div class="app-box">
    <el-config-provider :locale="zhCn">
      <RouterView />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
// import { computed } from 'vue'
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

</script>

<style scoped lang="scss">
.app-box {
  box-sizing: border-box;
  padding: 8px;
  height: 100vh;
  overflow: auto;
}
</style>
