<template>
  <div class="root">
    <h3>表格测试用demo</h3>
    <div class="table_1">
      <el-table
        border
        :data="tableData"
        highlight-current-row
        scrollbar-always-on
        height="250"
        style="width: 100%"
        v-el-table-infinite-scroll="onTableScroll"
        infinite-scroll-delay="500"
        infinite-scroll-distance="150"
        :infinite-scroll-immediate="false"
        @row-click="onTableSelection"
      >
        <el-table-column fixed sortable prop="date" label="日期" width="150" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="state" label="状态" width="120" />
        <el-table-column prop="city" label="城市" show-overflow-tooltip width="200" />
        <el-table-column prop="address" label="住址" show-overflow-tooltip width="150" />
        <el-table-column prop="zip" label="编号" width="120" />
        <el-table-column fixed="right" header-align="center" label="操作">
          <div style="text-align: center">
            <el-button type="primary" size="small">编辑</el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts" name="myTableDemo">
import { ref } from 'vue'
import { ElButton, ElTable, ElTableColumn } from 'element-plus'
import type {} from 'element-plus'
import { debounce } from 'lodash'

/** 表格数据对象类型 */
interface tableDataType {
  date: string
  name: string
  state: string
  city: string
  address: string
  zip: string
}
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
const tableData = ref<tableDataType[]>([
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

function onTableScroll() {
  console.log('监听表格滚动事件：')
  tableData.value = [...tableData.value, ...baseData.value]
}

function onTableSelection(row: any, column: number, cell: any, event: any) {
  console.log('选择表格：')
  console.log('row: ', row)
  console.log('column: ', column)
  console.log('cell: ', cell)
  console.log('event: ', event)
}
</script>

<style scoped lang="scss">
.root {
  width: 100%;
  height: 100%;
  background: rgb(246, 246, 246);
  vertical-align: middle;

  .img-404 {
    height: 100%;
    // width: 100%;
  }
}
</style>
