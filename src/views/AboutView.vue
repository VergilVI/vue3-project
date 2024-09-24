<template>
  <div class="about">
    <span class="rainbow_text">This is a graph chart, please click it 1234</span>
    <div class="icons_line">
      <el-button type="primary" :icon="Search" @click="apiGetTempData">搜索</el-button>
      <el-button type="info" :icon="Edit">编辑</el-button>
      <el-button type="danger" :icon="Delete">删除</el-button>
      <el-icon><VideoCameraFilled /></el-icon>
      <el-icon><Connection /></el-icon>
      <el-icon class="is-loading"><Loading /></el-icon>
      <el-icon class="is-loading reverse"><Refresh /></el-icon>
      <el-icon class="is-loading"><RefreshRight /></el-icon>
      <el-icon class="is-loading reverse"><RefreshLeft /></el-icon>
      <i class="el-icon" style="background: #6380df; border-radius: 50%"></i>
    </div>
    <div class="chart_box" ref="refTempGraph" v-loading="tempGraph.loading"></div>

    <el-dialog v-model="editNode.visible" :title="editNode.isEdit ? '编辑节点' : '创建节点'" destroyOnClose @closed="onModal_afterClose">
      <el-form ref="refEditNodeForm" :model="editNode.form" :rules="editNode.rules" label-width="70px" label-suffix=":">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editNode.form.name" placeholder="请输入名字" clearable />
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-input v-model="editNode.form.color" type="color" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="editNode.form.desc" placeholder="请输入描述" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="onModal_cancel">取消</el-button>
        <el-button type="primary" @click="onModal_ok" :loading="editNode.loading">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="About">
//#region 引用
import { reactive, shallowRef, onBeforeUnmount, nextTick, h } from 'vue'
import { FormInstance } from 'element-plus'
import { Plus, Delete, Edit, Search, VideoCameraFilled, Connection, Loading, Refresh, RefreshRight, RefreshLeft } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import { throttle } from 'lodash-es'
import ContextMenu from '@imengyu/vue3-context-menu'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import { deepCopyFunc } from '@/assets/js/utils'
//#endregion

//#region 声明与引用的Interface & Type
import type { GraphicComponentOption } from 'echarts/components'
import type { ComposeOption } from 'echarts/core'
import type { FormRules } from 'element-plus'

/** echart图表数据类型 */
interface TechartData {
  id: number | string
  parentId: number | string
  name: string
  color?: string
  desc?: string
  children?: TechartData[]
  [x: string]: any
}
//#endregion

//#region 声明变量
const refTempGraph = shallowRef<HTMLElement>()
const chartObj_tempGraph = shallowRef<echarts.ECharts>()
const tempGraph = reactive({
  loading: false,
  dataList: [] as TechartData[],
})

/** 创建/编辑节点 */
const editNode = reactive({
  visible: false,
  loading: false,
  isEdit: false,
  form: {
    color: '#1890ff',
  } as TechartData,
  rules: {
    name: [{ required: true, message: '请输入节点名', trigger: 'blur' }],
  } as FormRules<TechartData>,
})
const refEditNodeForm = shallowRef<FormInstance>()
//#endregion

//#region 右键菜单
function onClick_customMenu(param: any) {
  const { color, data, dataType, event } = param
  if (dataType !== 'node') return
  const mEvent: MouseEvent = event?.event
  mEvent?.preventDefault()

  const nodeName = {
    label: data.name,
    icon: h('i', { class: 'el-icon', style: { background: color, borderRadius: '50%' } }),
    customClass: 'cursorD',
    divided: true,
  }
  const addBtn = { label: '新增节点', icon: h('i', { class: 'el-icon' }, [h(Plus)]), onClick: () => onClick_addNode(param) }
  const editBtn = { label: '编辑节点', icon: h('i', { class: 'el-icon' }, [h(Edit)]), onClick: () => onClick_editNode(param) }
  const delBtn = { label: '删除节点', icon: h('i', { class: 'el-icon' }, [h(Delete)]), onClick: () => onClick_deleteNode(param) }
  const items = [nodeName, addBtn, editBtn, delBtn]
  ContextMenu.showContextMenu({ items, x: mEvent.x, y: mEvent.y })
}
function onClick_addNode(nodeItem: any) {
  const { id, color } = nodeItem.data
  editNode.isEdit = false
  // 这里的Id为新增节点的父级Id
  editNode.form = { ...editNode.form, id, color }
  editNode.visible = true
}
function onClick_editNode(nodeItem: any) {
  const { id, parentId, name, color, desc } = nodeItem.data
  editNode.isEdit = true
  editNode.form = { id, parentId, name, color, desc }
  editNode.visible = true
}
function onClick_deleteNode(nodeItem: any) {
  ElMessageBox.confirm(`确认删除节点【${nodeItem.name}】，以及它的子节点吗？`, '提示', { type: 'warning' }).then(() => {
    apiPostDeleteNode({ id: nodeItem.data.id })
  })
}
//#endregion

//#region 对话框：创建/编辑节点
function onModal_ok() {
  refEditNodeForm.value?.validate((valid) => {
    if (valid) {
      const requestFunc = editNode.isEdit ? apiPostEditNode : apiPostAddNode
      requestFunc(editNode.form)
    }
  })
}
function onModal_cancel() {
  editNode.visible = false
}
function onModal_afterClose() {
  editNode.form = {} as TechartData
  editNode.loading = false
}
//#endregion

//#region 数据请求
/** 获取【关系图】数据
 * @param forceUpdate 是否强制更新Echart图，默认：true
 */
async function apiGetTempData(forceUpdate = true) {
  try {
    tempGraph.loading = true
    await new Promise((resolve) => setTimeout(resolve, 1500))
    tempGraph.loading = false
    const sourceData: TechartData[] = [
      {
        id: 100,
        parentId: 0,
        name: '戒网 - 村西、王馨悦',
        desc: '描述内容-prop根节点名称',
        color: '#f97a76',
        children: [
          {
            id: 101,
            parentId: 100,
            name: '02国家安全部',
            desc: '描述内容-国家安全部',
            color: '#38c1e3',
            children: [
              {
                id: 105,
                parentId: 101,
                name: '06网络安全',
                desc: '描述内容-网络安全',
                color: '#38c1e3',
                children: [
                  {
                    id: 107,
                    parentId: 105,
                    name: '08短信',
                    desc: '描述内容-短信',
                    color: '#38c1e3',
                  },
                  {
                    id: 108,
                    parentId: 105,
                    name: '09大学生',
                    desc: '描述内容-大学生',
                    color: '#38c1e3',
                  },
                  {
                    id: 109,
                    parentId: 105,
                    name: '10下架',
                    desc: '描述内容-下架',
                    color: '#38c1e3',
                  },
                ],
              },
              {
                id: 106,
                parentId: 101,
                name: '07工作过程中',
                desc: '描述内容-工作过程中',
                color: '#ffcb2b',
              },
            ],
          },
          {
            id: 102,
            parentId: 100,
            name: '03仍然很大',
            desc: '描述内容-仍然很大',
            color: '#9b8bdb',
          },
          {
            id: 103,
            parentId: 100,
            name: '04大学生国家安全法',
            desc: '描述内容-国家安全法',
            color: '#fe9d05',
            children: [
              {
                id: 110,
                parentId: 103,
                name: '11国安法',
                desc: '描述内容-国安法',
                color: '#6380df',
              },
              {
                id: 111,
                parentId: 103,
                name: '12谢邀',
                desc: '描述内容-谢邀',
                color: '#fe9d05',
                children: [
                  {
                    id: 112,
                    parentId: 111,
                    name: '13家网',
                    desc: '描述内容-家网',
                    color: '#fe9d05',
                    children: [
                      {
                        id: 113,
                        parentId: 112,
                        name: '14大排挡宽面',
                        desc: '描述内容-大排挡宽面',
                        color: '#fe9d05',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 104,
            parentId: 100,
            name: '05王一博',
            desc: '描述内容-王一博',
            color: '#45d09c',
            children: [
              {
                id: 114,
                parentId: 104,
                name: '15审查',
                desc: '描述内容-审查',
                color: '#45d09c',
                children: [
                  {
                    id: 115,
                    parentId: 114,
                    name: '16新用户',
                    desc: '描述内容-新用户',
                    color: '#45d09c',
                    children: [
                      {
                        id: 116,
                        parentId: 115,
                        name: '17今天网',
                        desc: '描述内容-今天网',
                        color: '#45d09c',
                        children: [
                          {
                            id: 117,
                            parentId: 116,
                            name: '18国安部',
                            desc: '描述内容-国安部',
                            color: '#45d09c',
                          },
                          {
                            id: 119,
                            parentId: 116,
                            name: '20面梳',
                            desc: '描述内容-面梳',
                            color: '#45d09c',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 118,
                    parentId: 114,
                    name: '19第一滴血',
                    desc: '描述内容-第一滴血',
                    color: '#91a4cb',
                  },
                  {
                    id: 120,
                    parentId: 114,
                    name: '21诈骗惯犯',
                    desc: '描述内容-诈骗惯犯',
                    color: '#7b7f87',
                  },
                ],
              },
            ],
          },
        ],
      },
    ]
    tempGraph.dataList = deepCopyFunc(sourceData)
    nextTick(() => updateEchartTemp([], forceUpdate))
  } catch (error) {
    tempGraph.loading = false
    console.error(error)
  }
}
/** 提交【新增节点】
 * @param params 传参对象
 */
async function apiPostAddNode(params: TechartData) {
  try {
    editNode.loading = true
    await new Promise((resolve) => setTimeout(resolve, 1000))
    editNode.visible = false
    ElMessage.success('新增成功')
    //#region 模拟接口
    dealNestedArray(tempGraph.dataList, params.id, (pNodes, pResIndex) => {
      const currNode = pNodes[pResIndex]
      if (!currNode.children) currNode.children = []
      currNode.children.push({
        ...params,
        id: (Math.random() * 100 + 100).toFixed(),
        parentId: params.id,
      })
    })
    updateEchartTemp([], false)
    //#endregion
  } catch (error) {
    editNode.loading = false
    console.error(error)
  }
}
/** 提交【编辑节点】
 * @param params 传参对象
 */
async function apiPostEditNode(params: TechartData) {
  try {
    editNode.loading = true
    await new Promise((resolve) => setTimeout(resolve, 1000))
    editNode.visible = false
    ElMessage.success('编辑成功')
    //#region 模拟接口
    dealNestedArray(tempGraph.dataList, params.id, (pNodes, pResIndex) => {
      pNodes[pResIndex] = { ...pNodes[pResIndex], ...params }
    })
    updateEchartTemp([], false)
    //#endregion
  } catch (error) {
    editNode.loading = false
    console.error(error)
  }
}
/** 提交【删除节点】 */
async function apiPostDeleteNode(params: { id: TechartData['id'] }) {
  try {
    tempGraph.loading = true
    await new Promise((resolve) => setTimeout(resolve, 1000))
    tempGraph.loading = false
    ElMessage.success('删除成功')
    //#region 模拟接口
    dealNestedArray(tempGraph.dataList, params.id, (pNodes, pResIndex) => pNodes.splice(pResIndex, 1))
    updateEchartTemp([], false)
    //#endregion
  } catch (error) {
    tempGraph.loading = false
    console.error(error)
  }
}
//#endregion

//#region Echart图表
/** 更新「关系图」Echart图 */
function updateEchartTemp(paramArr?: TechartData[], forceUpdate = true) {
  const echartEle = refTempGraph.value
  if (!echartEle) return

  // 初始化
  if (!chartObj_tempGraph.value) {
    chartObj_tempGraph.value = echarts.init(echartEle)
    // 监听chart容器大小变化
    new ResizeObserver(throttle(() => chartObj_tempGraph.value?.resize(), 400, { leading: true })).observe(echartEle)
  }

  const echartData = paramArr && paramArr?.length > 0 ? [...paramArr] : flattenNestedArray(deepCopyFunc(tempGraph.dataList))
  if (echartData[0]) echartData[0] = { ...echartData[0], symbolSize: 100, draggable: false, fixed: echartData.length > 1, x: 500, y: 0 }
  const options: ComposeOption<GraphicComponentOption> = {
    tooltip: {
      extraCssText: 'z-index: 3;',
      formatter: (param: any) => {
        const { marker, data } = param
        return `${marker}${data.desc || '暂无描述'}`
      },
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        center: echartData.length > 1 ? ['50%', '40%'] : undefined,
        force: {
          // initLayout: 'circular',
          repulsion: 800,
          gravity: 0.3,
          edgeLength: [50, 120],
        },
        emphasis: { scale: false },
        edgeSymbol: ['none', 'arrow'],
        edgeLabel: { show: false },
        symbolSize: 60,
        draggable: true,
        label: {
          show: true,
          fontSize: 16,
          formatter: '{b}',
          color: '#fff',
          textBorderColor: 'inherit',
          textBorderWidth: 2,
        },
        links: echartData
          .filter((item, index) => index > 0)
          .map((item) => ({
            source: String(item.parentId),
            target: String(item.id),
            value: 10,
            tooltip: { show: false },
          })),
        lineStyle: {
          color: '#777777',
          width: 3,
          type: 'solid',
          opacity: 1,
        },
        data: echartData.map((item) => ({ ...item, id: String(item.id), parentId: String(item.parentId), itemStyle: { color: item.color } })),
      },
    ],
  }
  chartObj_tempGraph.value.off('contextmenu')
  chartObj_tempGraph.value.on('contextmenu', onClick_customMenu)
  chartObj_tempGraph.value.setOption(options, forceUpdate)
}
//#endregion

//#region 工具函数
/**  扁平化嵌套数组
 * @param nodes 嵌套数组
 */
function flattenNestedArray(nodes: TechartData[]) {
  const result: TechartData[] = []
  function flatten(node: TechartData) {
    result.push(node)
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => flatten(child))
      delete node.children
    }
  }
  nodes.forEach((node) => flatten(node))
  return deepCopyFunc(result)
}
/** 递归遍历锁定嵌套数组，并进行自定义处理
 * @param nodes 嵌套数组
 * @param currId 目标Id
 * @param callback 自定义处理方法
 */
function dealNestedArray(nodes: TechartData[], currId: number | string, callback: (arg01: TechartData[], arg02: number) => void) {
  let resIndex = nodes ? nodes.findIndex((node) => node.id == currId) : -1
  if (resIndex == -1) {
    if (nodes.length > 0) {
      for (let i = 0; i < nodes.length; i++) {
        const currChildren = nodes[i].children
        if (!currChildren) continue
        const res = dealNestedArray(currChildren, currId, callback)
        if (res) return true
      }
    }
    return false
  } else {
    callback(nodes, resIndex)
    return true
  }
}
//#endregion

//#region 生命周期
onBeforeUnmount(() => {
  chartObj_tempGraph.value?.dispose()
  chartObj_tempGraph.value = undefined
})

apiGetTempData()
//#endregion
</script>

<style scoped lang="scss">
.el-icon.is-loading.reverse {
  animation: rotatingR 2s linear infinite;
}

@keyframes rotatingR {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-1turn);
  }
}

.about {
  text-align: center;

  .rainbow_text {
    display: inline-block;
    font-size: 64px;
    font-weight: bold;
    font-family: 'DS-Digital';
    color: transparent;
    background-image: linear-gradient(to right, rgb(255, 0, 0), rgb(0, 255, 0), rgb(0, 0, 255));
    background-clip: text;
    -webkit-background-clip: text;
    margin: 21px 0;
  }

  .icons_line {
    display: flex;
    column-gap: 12px;
    justify-content: center;
    font-size: 32px;
    margin-bottom: 21px;
  }

  .chart_box {
    border: 10px solid;
    border-image: linear-gradient(110deg, rgb(255, 0, 0), rgb(0, 255, 0), rgb(0, 0, 255)) 10;
    height: 800px;
    max-width: 1000px;
    margin: 0 auto;
  }
}

// @media (min-width: 1024px) {
//   .about {
//     /* min-height: 100vh; */
//     display: flex;
//     align-items: center;
//     justify-content: center;

//     &::after {
//       background: black;
//       content: '';
//       display: inline-block;
//       height: 10px;
//       width: 10px;
//     }
//   }
// }
</style>
