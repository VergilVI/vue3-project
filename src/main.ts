import './assets/style/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueLazyLoad from 'vue3-lazyload'

import App from './App.vue'
import router from './router'

import loadingGIF from '@/assets/image/icon-loading.gif'
import ElTableInfiniteScroll from 'el-table-infinite-scroll'

import './assets/font/fontFace.css'
import './assets/style/contextMenu.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueLazyLoad, {
  loading: loadingGIF
})
/* @ts-ignore */
app.use(ElTableInfiniteScroll)

app.directive('dialogDragSize', (el, binding) => {
  // 由于使用 binding 获取不到 dom 元素，所以我就改用了 固定布局的方式来获取窗体元素。
  const dragDom = el.parentNode.parentNode // 窗体中间嵌套了一层：dialog -> div -> dragDom
  // 由于使用的是一个指令绑定到了三个 dragdom 上面，所以做了参数判断。
  // corner: 右下角；right: 右侧；bottom：底部；
  // 参数可根据自身编码习惯修改
  const value = binding.value || 'corner'
  if (!dragDom) return // 错误处理
  el.onmousedown = (e: any) => {
    // 鼠标按下，在原来页面上增加透明遮罩，防止部分元素例如iframe监听不到鼠标事件
    const mask = document.createElement('div')
    mask.setAttribute(
      'style',
      'position:fixed;top:0px;bottom:0px;left:0px;right:0px;background:rgba(0,0,0,0)'
    )
    document.body.appendChild(mask)
    // 计算当前元素距离可视区的距离
    const disX = e.clientX - el.offsetLeft
    const disY = e.clientY - el.offsetTop

    document.body.onmousemove = function (e) {
      e.preventDefault() // 移动时禁用默认事件

      // 通过事件委托，计算移动的距离
      const l = e.clientX - disX
      const h = e.clientY - disY

      // 一个方法实现三种方式，所以根据参数来判断 size 方向
      if (value === 'right' || value === 'corner') {
        dragDom.style.width = `${l}px`
      }
      // 判断弹窗高度，防止用于拖动的点移出可视区
      if (value === 'bottom' || value === 'corner') {
        dragDom.style.height = `${
          h > document.body.offsetHeight ? document.body.offsetHeight : h
        }px`
      }
    }

    document.body.onmouseup = function () {
      document.body.removeChild(mask) // 移除mask遮罩
      document.body.onmousemove = null
      document.body.onmouseup = null
    }
  }
})

app.mount('#app')
