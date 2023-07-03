<template>
  <RouterView v-slot="{ Component }">
    <transition>
      <div class="router-box">
        <keep-alive>
          <component :is="Component" :key="route.meta.path" />
        </keep-alive>
      </div>
    </transition>
  </RouterView>
  <!-- <RouterView /> -->
</template>

<script setup lang="ts">
// import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'

/** 获取路由状态对象 */
const route = useRoute()
</script>

<style scoped lang="scss"></style>
