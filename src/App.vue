<template>
  <el-config-provider :locale="zhCn">
    <RouterView v-slot="{ Component }">
      <transition>
        <div class="router-box">
          <keep-alive>
            <component :is="Component" :key="route.meta.path" />
          </keep-alive>
        </div>
      </transition>
    </RouterView>
  </el-config-provider>
  <!-- <RouterView /> -->
</template>

<script setup lang="ts">
// import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

/** 获取路由状态对象 */
const route = useRoute()
</script>

<style scoped lang="scss"></style>
