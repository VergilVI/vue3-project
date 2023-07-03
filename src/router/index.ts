import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import LayoutView from '../views/LayoutView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: LayoutView,
      redirect: '/home',
      children: [{
        path: '/home',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: HomeView,
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        meta: { title: '关于' },
        component: () => import('../views/AboutView.vue')
      }, {
        path: '/myPage',
        name: 'myPage',
        meta: { title: '自定义', keepAlive: true },
        component: () => import('../views/MyPage.vue')
      }, {
        path: '/eleSwipercard',
        name: 'eleSwipercard',
        meta: { title: 'Element-轮播图卡片' },
        component: () => import('../views/EleSwipercard.vue')
      }, {
        path: '/swiperCards',
        name: 'swiperCards',
        meta: { title: '轮播图-卡片' },
        component: () => import('../views/SwiperCards.vue')
      }, {
        path: '/swiperMousewheel',
        name: 'swiperMousewheel',
        meta: { title: '轮播图-滑动分页' },
        component: () => import('../views/SwiperMousewheel.vue')
      }, {
        path: '/swiperBehide',
        name: 'swiperBehide',
        meta: { title: '轮播图-横向循环焦点图片' },
        component: () => import('../views/SwiperBehide.vue')
      }, {
        path: '/swiperCoverflow',
        name: 'swiperCoverflow',
        meta: { title: '轮播图-3D旋转' },
        component: () => import('../views/SwiperCoverflow.vue')
      }]
    }, {
      path: '/404',
      name: '404',
      meta: { title: '404页面' },
      component: () => import('../views/404View.vue')
    }, {
      path: '/:catchAll(.*)',// vue3路由配置写法
      redirect: '/404'
    }
  ]
})

/** 前置路由守卫 */
router.beforeEach((to, from, next) => {
  console.log('前置路由守卫-->to: ', to)
  console.log('前置路由守卫-->from: ', from);
  if (to.meta.title) document.title = to.meta.title.toString();
  next();
})

export default router
