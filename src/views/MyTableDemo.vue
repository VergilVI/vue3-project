<template>
  <div class="root">
    <h3>表格测试用demo</h3>
    <!-- 模拟表格[1] -->
    <el-table
      class="table-1"
      style="width: 100%"
      ref="table1_Ref"
      border
      :data="tablesData.table1"
      highlight-current-row
      scrollbar-always-on
      height="250"
      v-el-table-infinite-scroll="() => onTableLoad('table1')"
      infinite-scroll-delay="500"
      infinite-scroll-distance="150"
      :infinite-scroll-immediate="true"
      current-row-key="id"
      :cell-class-name="customCellClassName"
      @cell-mouse-enter="onTableEnter"
      @cell-mouse-leave="onTableLeave"
      @cell-contextmenu="(row, column) => onTableContextMenu(row, column, 'table1')"
      @current-change="onTableCurrentChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column fixed align="center" header-align="center" label="序号" width="60">
        <template #default="scop">
          <div>{{ scop.$index + 1 }}</div>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="date"
        align="center"
        header-align="center"
        label="日期"
        width="120"
      />
      <el-table-column prop="name" align="center" header-align="center" label="姓名" />
      <el-table-column prop="state" align="center" header-align="center" label="状态" />
      <el-table-column
        prop="city"
        align="center"
        header-align="center"
        label="城市"
        show-overflow-tooltip
      />
      <el-table-column
        prop="address"
        align="center"
        header-align="center"
        label="住址"
        show-overflow-tooltip
      />
      <el-table-column prop="zip" align="center" header-align="center" label="编号" />
      <el-table-column fixed="right" align="center" header-align="center" label="操作" width="80">
        <div style="text-align: center">
          <el-button type="primary" size="small">编辑</el-button>
        </div>
      </el-table-column>
    </el-table>

    <div class="inline_box">
      <!-- 模拟表格[2] -->
      <el-table
        class="table-2"
        style="width: 100%"
        border
        :data="tablesData.table2"
        highlight-current-row
        scrollbar-always-on
        height="250"
        v-el-table-infinite-scroll="() => onTableLoad('table2')"
        infinite-scroll-delay="500"
        infinite-scroll-distance="150"
        :infinite-scroll-immediate="true"
        @row-contextmenu="onTableContextMenu"
      >
        <el-table-column fixed align="center" header-align="center" label="序号" width="60">
          <template #default="scop">
            <div>
              {{ scop.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="date"
          align="center"
          header-align="center"
          label="日期"
          width="120"
        />
        <el-table-column
          prop="name"
          align="center"
          header-align="center"
          label="姓名"
          width="120"
        />
        <el-table-column
          prop="state"
          align="center"
          header-align="center"
          label="状态"
          width="120"
        />
        <el-table-column
          prop="city"
          align="center"
          header-align="center"
          label="城市"
          show-overflow-tooltip
          width="200"
        />
        <el-table-column
          prop="address"
          align="center"
          header-align="center"
          label="住址"
          show-overflow-tooltip
          width="150"
        />
        <el-table-column prop="zip" align="center" header-align="center" label="编号" width="120" />
        <el-table-column fixed="right" align="center" header-align="center" label="操作">
          <div style="text-align: center">
            <el-button type="primary" size="small">编辑</el-button>
          </div>
        </el-table-column>
      </el-table>
      <!-- 模拟表格[3] -->
      <el-table
        class="table-3"
        style="width: 100%"
        border
        :data="tablesData.table3"
        highlight-current-row
        scrollbar-always-on
        height="250"
        v-el-table-infinite-scroll="() => onTableLoad('table3')"
        infinite-scroll-delay="500"
        infinite-scroll-distance="150"
        :infinite-scroll-immediate="false"
        @row-contextmenu="onTableContextMenu"
      >
        <el-table-column fixed align="center" header-align="center" label="序号" width="60">
          <template #default="scop">
            <div>
              {{ scop.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="date"
          align="center"
          header-align="center"
          label="日期"
          width="120"
        />
        <el-table-column
          prop="name"
          align="center"
          header-align="center"
          label="姓名"
          width="120"
        />
        <el-table-column
          prop="state"
          align="center"
          header-align="center"
          label="状态"
          width="120"
        />
        <el-table-column
          prop="city"
          align="center"
          header-align="center"
          label="城市"
          show-overflow-tooltip
          width="200"
        />
        <el-table-column
          prop="address"
          align="center"
          header-align="center"
          label="住址"
          show-overflow-tooltip
          width="150"
        />
        <el-table-column prop="zip" align="center" header-align="center" label="编号" width="120" />
        <el-table-column fixed="right" align="center" header-align="center" label="操作">
          <div style="text-align: center">
            <el-button type="primary" size="small">编辑</el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts" name="myTableDemo">
import { ref, onBeforeMount } from 'vue'
import { ElButton, ElTable, ElTableColumn } from 'element-plus'
import type { CellCls } from 'element-plus'
import { debounce } from 'lodash'
import { changeGlobalNodesTarget } from 'element-plus/es/utils'

//#region 生命周期
onBeforeMount(() => {
  // window.oncontextmenu = function (e: MouseEvent) {
  //   e.preventDefault()
  //   alert('1234')
  // }
})
//#endregion

/** 识别表格的字符 */
type tableDefineType = 'table1' | 'table2' | 'table3'

/** 表格内数据对象类型 */
interface tableDataType {
  date: string
  name: string
  state: string
  city: string
  address: string
  zip: string
  [propName: string]: any
}

/** 表格1的引用 */
const table1_Ref = ref<InstanceType<typeof ElTable>>()
/** 自定义单元格的className */
const customCellClassName = ref<CellCls<any>>(({ row, column, rowIndex, columnIndex }) => {
  row.index = rowIndex
  column.index = columnIndex
  return ''
})

/** 基础数据 */
const baseData = ref<tableDataType[]>([
  {
    date: '2016-05-03',
    name: 'Tom_0',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-02',
    name: 'Tom_1',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-04',
    name: 'Tom_2',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-01',
    name: 'Tom_3',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-08',
    name: 'Tom_4',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-06',
    name: 'Tom_5',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-07',
    name: 'Tom_6',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  }
])
/** 表格数据对象数组(展示视图用) */
const tablesData = ref<Record<tableDefineType, tableDataType[]>>({
  table1: [],
  table2: [],
  table3: []
})

/** 多表格加载数据方法
 * @param tableDef 需要加载表格的识别字符
 */
function onTableLoad(tableDef: tableDefineType) {
  console.log('当前加载数据的表格：', tableDef)
  const currentTable = tablesData.value[tableDef]
  const startId = currentTable.length
  currentTable.push(
    ...baseData.value.map((item, index) => {
      const newItem = { ...item }
      newItem.id = startId + index
      return newItem
    })
  )
  /** 处理请求数据做区分时可用switch */
  // switch (tableDef) {
  //   default:
  //     break
  //   case 'table1':
  //     break
  //   case 'table2':
  //     break
  //   case 'table3':
  //     break
  // }
}

/** 鼠标进入表格后 */
function onTableEnter() {
  window.oncontextmenu = function (e: MouseEvent) {
    e.preventDefault()
  }
}
/** 鼠标离开表格后 */
function onTableLeave() {
  window.oncontextmenu = null
}

/** 选中表格元素的方法 */
function onTableContextMenu(row: any, column: any, tableDef: tableDefineType) {
  console.log('右键点击表格的行时')
  console.log('row: ', row.index + 1)
  console.log('column: ', column.index + 1)
  table1_Ref.value?.setCurrentRow(tablesData.value[tableDef][row.index])
}

/** 当前内容发生改变时 */
function onTableCurrentChange(currentRow: any, oldCurrentRow: any) {
  console.log('当前内容：', currentRow)
  console.log('先前内容：', oldCurrentRow)
}
</script>

<style scoped lang="scss">
.root {
  width: 100%;
  height: 100%;
  background: rgb(246, 246, 246);
  vertical-align: middle;

  .table-1 {
    border: 1px solid green;
  }
  .inline_box {
    display: flex;
    .table-2 {
      border: 1px solid red;
    }
    .table-3 {
      border: 1px solid blue;
    }
  }
}
</style>
