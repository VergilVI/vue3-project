<template>
  <header id="header-box">
    <div class="top-box">
      <el-button
        class="btn"
        type="primary"
        @click="routerJump"
        data-path="/home"
        :loading="butLoading"
      >
        路由跳转首页
      </el-button>
      <el-button class="btn" type="success" @click="routerJump" data-path="/mypage">
        路由跳转自定义页面
      </el-button>
    </div>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/image/logo.svg" width="125" height="125" /> -->
    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->

      <nav>
        <RouterLink to="/demo">TableDemo</RouterLink>
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/myPage">MyPage</RouterLink>
        <RouterLink to="/eleSwipercard">Ele-Swipercard</RouterLink>
        <RouterLink to="/swiperCards">Swiper-Cards</RouterLink>
        <RouterLink to="/swiperMousewheel">Swiper-Mousewheel</RouterLink>
        <RouterLink to="/swiperBehide">Swiper-Behide</RouterLink>
        <RouterLink to="/swiperCoverflow">Swiper-Coverflow</RouterLink>
      </nav>

      <div style="text-align: center">key: {{ route.path }}</div>
    </div>
  </header>

  <RouterView v-slot="{ Component }">
    <transition>
      <!-- <div class="router-box"> -->
        <keep-alive>
          <component :is="Component" :key="route.meta.path" />
        </keep-alive>
      <!-- </div> -->
    </transition>
  </RouterView>
  <!-- <RouterView /> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute, RouterLink, RouterView } from 'vue-router'
// import HelloWorld from '../components/HelloWorld.vue'

const butLoading = ref<boolean>(false)

/** 获取路由状态对象 */
const route = useRoute()

/** 跳转路由对象 */
const router = useRouter()
/** 路由跳转方法 */
function routerJump(e: any) {
  const { path } = e.currentTarget.dataset
  const query = path === '/mypage' ? { custom: '路由携带值' } : undefined
  butLoading.value = true
  setTimeout(() => {
    butLoading.value = false
  }, 1500)
  router.push({
    path,
    query
  })
}
</script>

<style scoped lang="scss">
header {
  line-height: 1.5;
  max-height: 100vh;
  margin: 0 auto;
  width: 100%;

  .top-box {
    text-align: center;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }
}

nav {
  width: 100%;
  // font-size: 12px;
  text-align: center;
  margin-top: 2rem;

  a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid rgba(60, 60, 60, 0.12);

    &:first-of-type {
      border: 0;
    }

    &.router-link-exact-active {
      color: var(--color-text);

      &:hover {
        background-color: transparent;
      }
    }
  }
}
</style>
